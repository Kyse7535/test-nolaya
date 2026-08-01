import { computed, ref, watch } from 'vue'
import { defineStore } from 'pinia'
import {
  ActionOwner,
  ActionStatus,
  AppointmentStatus,
  DemoRole,
  STORAGE_KEY_APPOINTMENTS,
  STORAGE_KEY_APPOINTMENT_DEMO_ROLE,
  STORAGE_KEY_CURRENT_APPOINTMENT_ID,
  STORAGE_KEY_PREP_PLANS,
  STORAGE_KEY_PREP_TEMPLATES,
  blockingProgress as computeBlockingProgress,
  confirmActionOnPlan,
  createAppointmentFromEngagement,
  createPrepPlanFromTemplate,
  createReadySnapshot,
  isAppointmentReady,
  isReady as planIsReady,
  ownerBlockingProgress,
  remainingBlockingActions,
} from '../domain/appointment/model'
import { buildKnotlessPrepTemplate } from '../mocks/appointmentSeed'
import { useEngagementStore } from './engagement'

function readJsonArray(key) {
  try {
    const raw = localStorage.getItem(key)
    if (!raw) return []
    const parsed = JSON.parse(raw)
    return Array.isArray(parsed) ? parsed : []
  } catch {
    return []
  }
}

function readCurrentId() {
  try {
    return localStorage.getItem(STORAGE_KEY_CURRENT_APPOINTMENT_ID)
  } catch {
    return null
  }
}

function readDemoRole() {
  try {
    const value = localStorage.getItem(STORAGE_KEY_APPOINTMENT_DEMO_ROLE)
    if (value === DemoRole.PRO || value === DemoRole.CLIENT) return value
    return DemoRole.CLIENT
  } catch {
    return DemoRole.CLIENT
  }
}

function writeJson(key, value) {
  localStorage.setItem(key, JSON.stringify(value))
}

function writeCurrentId(id) {
  if (id) localStorage.setItem(STORAGE_KEY_CURRENT_APPOINTMENT_ID, id)
  else localStorage.removeItem(STORAGE_KEY_CURRENT_APPOINTMENT_ID)
}

function writeDemoRole(role) {
  localStorage.setItem(STORAGE_KEY_APPOINTMENT_DEMO_ROLE, role)
}

export const useAppointmentStore = defineStore('appointment', () => {
  const appointments = ref(readJsonArray(STORAGE_KEY_APPOINTMENTS))
  const prepPlans = ref(readJsonArray(STORAGE_KEY_PREP_PLANS))
  const prepTemplates = ref(readJsonArray(STORAGE_KEY_PREP_TEMPLATES))
  const currentAppointmentId = ref(readCurrentId())
  const demoRole = ref(readDemoRole())

  watch(appointments, (value) => writeJson(STORAGE_KEY_APPOINTMENTS, value), {
    deep: true,
  })
  watch(prepPlans, (value) => writeJson(STORAGE_KEY_PREP_PLANS, value), {
    deep: true,
  })
  watch(prepTemplates, (value) => writeJson(STORAGE_KEY_PREP_TEMPLATES, value), {
    deep: true,
  })
  watch(currentAppointmentId, (value) => writeCurrentId(value))
  watch(demoRole, (value) => writeDemoRole(value))

  const currentAppointment = computed(() => {
    if (!currentAppointmentId.value) return null
    return (
      appointments.value.find((a) => a.id === currentAppointmentId.value) ?? null
    )
  })

  const currentEngagement = computed(() => {
    const appointment = currentAppointment.value
    if (!appointment?.engagementId) return null
    const engagementStore = useEngagementStore()
    return engagementStore.findById(appointment.engagementId)
  })

  const currentPlan = computed(() => {
    const appointment = currentAppointment.value
    if (!appointment?.prepPlanId) return null
    return prepPlans.value.find((p) => p.id === appointment.prepPlanId) ?? null
  })

  const blockingProgress = computed(() =>
    computeBlockingProgress(currentPlan.value),
  )

  const clientBlockingProgress = computed(() =>
    ownerBlockingProgress(currentPlan.value, ActionOwner.CLIENT),
  )

  const proBlockingProgress = computed(() =>
    ownerBlockingProgress(currentPlan.value, ActionOwner.PRO),
  )

  const remainingBlocking = computed(() =>
    remainingBlockingActions(currentPlan.value),
  )

  const clientActions = computed(() => {
    const plan = currentPlan.value
    if (!plan?.actions) return []
    return plan.actions.filter((a) => a.owner === ActionOwner.CLIENT)
  })

  const proActions = computed(() => {
    const plan = currentPlan.value
    if (!plan?.actions) return []
    return plan.actions.filter((a) => a.owner === ActionOwner.PRO)
  })

  const isReady = computed(() => isAppointmentReady(currentAppointment.value))

  function upsertList(listRef, item) {
    const index = listRef.value.findIndex((x) => x.id === item.id)
    if (index === -1) {
      listRef.value = [...listRef.value, item]
    } else {
      const next = [...listRef.value]
      next[index] = item
      listRef.value = next
    }
  }

  function ensureDemoSeed() {
    if (appointments.value.length > 0) {
      if (!currentAppointmentId.value) {
        currentAppointmentId.value = appointments.value[0].id
      }
      return currentAppointment.value
    }

    const engagementStore = useEngagementStore()
    const engagement = engagementStore.ensureCommittedSeed()
    const template = buildKnotlessPrepTemplate()
    const appointment = createAppointmentFromEngagement(engagement)
    const plan = createPrepPlanFromTemplate({
      template,
      appointmentId: appointment.id,
      engagementId: engagement.id,
    })
    appointment.prepPlanId = plan.id

    prepTemplates.value = [template]
    prepPlans.value = [plan]
    appointments.value = [appointment]
    currentAppointmentId.value = appointment.id
    return appointment
  }

  function openDemo() {
    return ensureDemoSeed()
  }

  function setDemoRole(role) {
    if (role === DemoRole.CLIENT || role === DemoRole.PRO) {
      demoRole.value = role
    }
  }

  /** Ensure a READY appointment with snapshot (for étape 6 demo autonomy). */
  function ensureReadyForExecution() {
    ensureDemoSeed()
    let appointment = currentAppointment.value
    let engagement = currentEngagement.value
    let plan = currentPlan.value
    if (!appointment || !engagement || !plan) return null

    if (
      appointment.status === AppointmentStatus.IN_PROGRESS ||
      appointment.status === AppointmentStatus.COMPLETED ||
      appointment.status === AppointmentStatus.READY
    ) {
      if (
        appointment.status === AppointmentStatus.READY &&
        !appointment.readySnapshot
      ) {
        const snapshot = createReadySnapshot({ appointment, plan, engagement })
        appointment = {
          ...appointment,
          readySnapshot: snapshot,
          readyAt: snapshot.createdAt,
        }
        upsertList(appointments, appointment)
      }
      return appointment
    }

    const confirmedPlan = {
      ...plan,
      actions: plan.actions.map((action) =>
        action.status === ActionStatus.CONFIRMED
          ? action
          : {
              ...action,
              status: ActionStatus.CONFIRMED,
              confirmedAt: new Date().toISOString(),
            },
      ),
    }
    upsertList(prepPlans, confirmedPlan)

    const snapshot = createReadySnapshot({
      appointment,
      plan: confirmedPlan,
      engagement,
    })
    const readyAppointment = {
      ...appointment,
      status: AppointmentStatus.READY,
      readySnapshot: snapshot,
      readyAt: snapshot.createdAt,
    }
    upsertList(appointments, readyAppointment)
    return readyAppointment
  }

  function markInProgress(startedAt) {
    const appointment = currentAppointment.value
    if (!appointment || appointment.status !== AppointmentStatus.READY) {
      return null
    }
    const next = {
      ...appointment,
      status: AppointmentStatus.IN_PROGRESS,
      startedAt: startedAt ?? new Date().toISOString(),
    }
    upsertList(appointments, next)
    return next
  }

  function markCompleted(completedAt) {
    const appointment = currentAppointment.value
    if (!appointment || appointment.status !== AppointmentStatus.IN_PROGRESS) {
      return null
    }
    const next = {
      ...appointment,
      status: AppointmentStatus.COMPLETED,
      completedAt: completedAt ?? new Date().toISOString(),
    }
    upsertList(appointments, next)
    return next
  }

  /** Force COMPLETED for étape 7 demo autonomy. */
  function ensureCompletedForSettlement() {
    const appointment = ensureReadyForExecution()
    if (!appointment) return null
    if (appointment.status === AppointmentStatus.COMPLETED) return appointment

    const now = new Date().toISOString()
    if (appointment.status === AppointmentStatus.READY) {
      upsertList(appointments, {
        ...appointment,
        status: AppointmentStatus.IN_PROGRESS,
        startedAt: now,
      })
    }

    const current = currentAppointment.value
    if (!current) return null
    if (current.status === AppointmentStatus.COMPLETED) return current

    const completed = {
      ...current,
      status: AppointmentStatus.COMPLETED,
      startedAt: current.startedAt ?? now,
      completedAt: now,
    }
    upsertList(appointments, completed)
    return completed
  }

  /** Reset execution statuses back to READY (keep prep snapshot). */
  function resetExecutionStatus() {
    const appointment = currentAppointment.value
    if (!appointment) return null
    if (
      appointment.status !== AppointmentStatus.IN_PROGRESS &&
      appointment.status !== AppointmentStatus.COMPLETED
    ) {
      return appointment
    }
    const next = {
      ...appointment,
      status: AppointmentStatus.READY,
      startedAt: null,
      completedAt: null,
    }
    upsertList(appointments, next)
    return next
  }

  function confirmAction(actionId) {
    const plan = currentPlan.value
    const appointment = currentAppointment.value
    const engagement = currentEngagement.value
    if (!plan || !appointment || !engagement) return null

    const nextPlan = confirmActionOnPlan(plan, actionId)
    if (!nextPlan) return null

    upsertList(prepPlans, nextPlan)

    if (
      appointment.status === AppointmentStatus.READINESS_PENDING &&
      planIsReady(nextPlan)
    ) {
      const snapshot = createReadySnapshot({
        appointment,
        plan: nextPlan,
        engagement,
      })
      const readyAppointment = {
        ...appointment,
        status: AppointmentStatus.READY,
        readySnapshot: snapshot,
        readyAt: snapshot.createdAt,
      }
      upsertList(appointments, readyAppointment)
      return readyAppointment
    }

    return appointment
  }

  function resetDemo() {
    appointments.value = []
    prepPlans.value = []
    prepTemplates.value = []
    currentAppointmentId.value = null
    demoRole.value = DemoRole.CLIENT
    try {
      localStorage.removeItem(STORAGE_KEY_APPOINTMENTS)
      localStorage.removeItem(STORAGE_KEY_PREP_PLANS)
      localStorage.removeItem(STORAGE_KEY_PREP_TEMPLATES)
      localStorage.removeItem(STORAGE_KEY_CURRENT_APPOINTMENT_ID)
      localStorage.removeItem(STORAGE_KEY_APPOINTMENT_DEMO_ROLE)
    } catch {
      /* ignore */
    }
  }

  return {
    appointments,
    prepPlans,
    prepTemplates,
    currentAppointmentId,
    demoRole,
    currentAppointment,
    currentEngagement,
    currentPlan,
    blockingProgress,
    clientBlockingProgress,
    proBlockingProgress,
    remainingBlocking,
    clientActions,
    proActions,
    isReady,
    ensureDemoSeed,
    ensureReadyForExecution,
    ensureCompletedForSettlement,
    openDemo,
    setDemoRole,
    confirmAction,
    markInProgress,
    markCompleted,
    resetExecutionStatus,
    resetDemo,
    DemoRole,
  }
})
