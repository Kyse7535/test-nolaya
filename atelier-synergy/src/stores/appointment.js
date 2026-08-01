import { computed, ref, watch } from 'vue'
import { defineStore } from 'pinia'
import {
  ActionOwner,
  AppointmentStatus,
  DemoRole,
  STORAGE_KEY_APPOINTMENTS,
  STORAGE_KEY_APPOINTMENT_DEMO_ROLE,
  STORAGE_KEY_CURRENT_APPOINTMENT_ID,
  STORAGE_KEY_ENGAGEMENTS,
  STORAGE_KEY_PREP_PLANS,
  STORAGE_KEY_PREP_TEMPLATES,
  blockingProgress as computeBlockingProgress,
  confirmActionOnPlan,
  createAppointmentFromEngagement,
  createEngagementCommitted,
  createPrepPlanFromTemplate,
  createReadySnapshot,
  isAppointmentReady,
  isReady as planIsReady,
  ownerBlockingProgress,
  remainingBlockingActions,
} from '../domain/appointment/model'
import {
  buildKnotlessPrepTemplate,
  buildSeedEngagement,
} from '../mocks/appointmentSeed'

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
  const engagements = ref(readJsonArray(STORAGE_KEY_ENGAGEMENTS))
  const appointments = ref(readJsonArray(STORAGE_KEY_APPOINTMENTS))
  const prepPlans = ref(readJsonArray(STORAGE_KEY_PREP_PLANS))
  const prepTemplates = ref(readJsonArray(STORAGE_KEY_PREP_TEMPLATES))
  const currentAppointmentId = ref(readCurrentId())
  const demoRole = ref(readDemoRole())

  watch(engagements, (value) => writeJson(STORAGE_KEY_ENGAGEMENTS, value), {
    deep: true,
  })
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
    return (
      engagements.value.find((e) => e.id === appointment.engagementId) ?? null
    )
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

    const engagementSeed = buildSeedEngagement()
    const engagement = createEngagementCommitted(engagementSeed)
    const template = buildKnotlessPrepTemplate()
    const appointment = createAppointmentFromEngagement(engagement)
    const plan = createPrepPlanFromTemplate({
      template,
      appointmentId: appointment.id,
      engagementId: engagement.id,
    })
    appointment.prepPlanId = plan.id

    engagements.value = [engagement]
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
    engagements.value = []
    appointments.value = []
    prepPlans.value = []
    prepTemplates.value = []
    currentAppointmentId.value = null
    demoRole.value = DemoRole.CLIENT
    try {
      localStorage.removeItem(STORAGE_KEY_ENGAGEMENTS)
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
    engagements,
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
    openDemo,
    setDemoRole,
    confirmAction,
    resetDemo,
    DemoRole,
  }
})
