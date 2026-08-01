import { computed, ref, watch } from 'vue'
import { defineStore } from 'pinia'
import { AppointmentStatus } from '../domain/appointment/model'
import {
  DemoRole,
  ExecutionEventType,
  STORAGE_KEY_EXECUTION_DEMO_ROLE,
  STORAGE_KEY_EXECUTION_DOSSIER,
  STORAGE_KEY_EXECUTION_EVENTS,
  createEvent,
  createExecutionDossier,
  eventsForAppointment,
  findEvent,
  formatEventTime,
  hasBothArrivals,
  isExecutionActiveStatus,
} from '../domain/execution/model'
import {
  contextLine,
  eventTimelineLine,
  executionStatusBadge,
  executionStatusCode,
} from '../domain/execution/labels'
import { useAppointmentStore } from './appointment'

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

function readJsonObject(key) {
  try {
    const raw = localStorage.getItem(key)
    if (!raw) return null
    const parsed = JSON.parse(raw)
    return parsed && typeof parsed === 'object' && !Array.isArray(parsed)
      ? parsed
      : null
  } catch {
    return null
  }
}

function readDemoRole() {
  try {
    const value = localStorage.getItem(STORAGE_KEY_EXECUTION_DEMO_ROLE)
    if (value === DemoRole.PRO || value === DemoRole.CLIENT) return value
    return DemoRole.CLIENT
  } catch {
    return DemoRole.CLIENT
  }
}

function writeJson(key, value) {
  localStorage.setItem(key, JSON.stringify(value))
}

function writeDemoRole(role) {
  localStorage.setItem(STORAGE_KEY_EXECUTION_DEMO_ROLE, role)
}

export const useExecutionStore = defineStore('execution', () => {
  const events = ref(readJsonArray(STORAGE_KEY_EXECUTION_EVENTS))
  const dossier = ref(readJsonObject(STORAGE_KEY_EXECUTION_DOSSIER))
  const demoRole = ref(readDemoRole())

  watch(events, (value) => writeJson(STORAGE_KEY_EXECUTION_EVENTS, value), {
    deep: true,
  })
  watch(
    dossier,
    (value) => {
      if (value) writeJson(STORAGE_KEY_EXECUTION_DOSSIER, value)
      else localStorage.removeItem(STORAGE_KEY_EXECUTION_DOSSIER)
    },
    { deep: true },
  )
  watch(demoRole, (value) => writeDemoRole(value))

  const appointmentStore = useAppointmentStore()

  const currentAppointment = computed(() => appointmentStore.currentAppointment)
  const currentEngagement = computed(() => appointmentStore.currentEngagement)

  const appointmentEvents = computed(() =>
    eventsForAppointment(events.value, currentAppointment.value?.id),
  )

  const engagementSummary = computed(() => {
    const appointment = currentAppointment.value
    const engagement = currentEngagement.value
    const snapshot = appointment?.readySnapshot
    return {
      serviceLabel: snapshot?.serviceLabel ?? engagement?.serviceLabel ?? null,
      dateLabel: snapshot?.dateLabel ?? engagement?.dateLabel ?? null,
      startTime: snapshot?.startTime ?? engagement?.startTime ?? null,
      endTime: snapshot?.endTime ?? engagement?.endTime ?? null,
      placeLabel: snapshot?.placeLabel ?? engagement?.placeLabel ?? null,
      clientDisplayName:
        snapshot?.clientDisplayName ?? engagement?.clientDisplayName ?? null,
      proDisplayName:
        snapshot?.proDisplayName ?? engagement?.proDisplayName ?? null,
      thumbnailUrl: engagement?.thumbnailUrl ?? null,
    }
  })

  const contextSummary = computed(() => contextLine(engagementSummary.value))

  const arrivalClient = computed(() =>
    findEvent(appointmentEvents.value, ExecutionEventType.ARRIVAL_CLIENT),
  )
  const arrivalPro = computed(() =>
    findEvent(appointmentEvents.value, ExecutionEventType.ARRIVAL_PRO),
  )
  const startEvent = computed(() =>
    findEvent(appointmentEvents.value, ExecutionEventType.START),
  )
  const endEvent = computed(() =>
    findEvent(appointmentEvents.value, ExecutionEventType.END_DECLARED),
  )
  const confirmEvent = computed(() =>
    findEvent(appointmentEvents.value, ExecutionEventType.CLIENT_CONFIRM),
  )

  const bothArrivalsDeclared = computed(() =>
    hasBothArrivals(events.value, currentAppointment.value?.id),
  )

  const endDeclared = computed(() => Boolean(endEvent.value))

  const statusBadge = computed(() =>
    executionStatusBadge(currentAppointment.value, endDeclared.value),
  )

  const statusCode = computed(() =>
    executionStatusCode(currentAppointment.value, endDeclared.value),
  )

  const timelineLines = computed(() =>
    appointmentEvents.value.map((event) => ({
      id: event.id,
      label: eventTimelineLine(event),
      at: event.at,
      type: event.type,
    })),
  )

  function ensureDemoSeed() {
    const appointment = appointmentStore.ensureReadyForExecution()
    return appointment
  }

  function setDemoRole(role) {
    if (role === DemoRole.CLIENT || role === DemoRole.PRO) {
      demoRole.value = role
    }
  }

  function appendEvent(type, actorRole, note = null) {
    const appointment = currentAppointment.value
    if (!appointment) return null
    const existing = findEvent(appointmentEvents.value, type)
    if (existing) return existing
    const event = createEvent({
      appointmentId: appointment.id,
      type,
      actorRole,
      note,
    })
    events.value = [...events.value, event]
    return event
  }

  function declareArrival(role = demoRole.value) {
    const appointment = currentAppointment.value
    if (!appointment || appointment.status !== AppointmentStatus.READY) {
      return null
    }
    if (role === DemoRole.CLIENT) {
      if (demoRole.value !== DemoRole.CLIENT) return null
      return appendEvent(ExecutionEventType.ARRIVAL_CLIENT, DemoRole.CLIENT)
    }
    if (role === DemoRole.PRO) {
      if (demoRole.value !== DemoRole.PRO) return null
      return appendEvent(ExecutionEventType.ARRIVAL_PRO, DemoRole.PRO)
    }
    return null
  }

  function startService() {
    const appointment = currentAppointment.value
    if (!appointment || appointment.status !== AppointmentStatus.READY) {
      return null
    }
    if (demoRole.value !== DemoRole.PRO) return null
    if (!bothArrivalsDeclared.value) return null
    if (startEvent.value) return startEvent.value

    const event = appendEvent(ExecutionEventType.START, DemoRole.PRO)
    appointmentStore.markInProgress(event.at)
    return event
  }

  function declareCompleteEnd(note = null) {
    const appointment = currentAppointment.value
    if (!appointment || appointment.status !== AppointmentStatus.IN_PROGRESS) {
      return null
    }
    if (demoRole.value !== DemoRole.PRO) return null
    if (endEvent.value) return endEvent.value
    return appendEvent(
      ExecutionEventType.END_DECLARED,
      DemoRole.PRO,
      note ? String(note).slice(0, 120) : null,
    )
  }

  function confirmByClient() {
    const appointment = currentAppointment.value
    if (!appointment || appointment.status !== AppointmentStatus.IN_PROGRESS) {
      return null
    }
    if (demoRole.value !== DemoRole.CLIENT) return null
    if (!endEvent.value) return null
    if (confirmEvent.value) return confirmEvent.value

    const event = appendEvent(ExecutionEventType.CLIENT_CONFIRM, DemoRole.CLIENT)
    const completed = appointmentStore.markCompleted(event.at)
    if (completed) {
      dossier.value = createExecutionDossier({
        appointment: completed,
        engagement: currentEngagement.value,
        events: events.value,
      })
    }
    return event
  }

  function resetDemo() {
    events.value = []
    dossier.value = null
    demoRole.value = DemoRole.CLIENT
    try {
      localStorage.removeItem(STORAGE_KEY_EXECUTION_EVENTS)
      localStorage.removeItem(STORAGE_KEY_EXECUTION_DOSSIER)
      localStorage.removeItem(STORAGE_KEY_EXECUTION_DEMO_ROLE)
    } catch {
      /* ignore */
    }
    appointmentStore.resetExecutionStatus()
  }

  function formatTime(iso) {
    return formatEventTime(iso)
  }

  function isActiveAppointment(appointment = currentAppointment.value) {
    return isExecutionActiveStatus(appointment?.status)
  }

  return {
    events,
    dossier,
    demoRole,
    currentAppointment,
    currentEngagement,
    appointmentEvents,
    engagementSummary,
    contextSummary,
    arrivalClient,
    arrivalPro,
    startEvent,
    endEvent,
    confirmEvent,
    bothArrivalsDeclared,
    endDeclared,
    statusBadge,
    statusCode,
    timelineLines,
    ensureDemoSeed,
    setDemoRole,
    declareArrival,
    startService,
    declareCompleteEnd,
    confirmByClient,
    resetDemo,
    formatTime,
    isActiveAppointment,
    DemoRole,
    ExecutionEventType,
  }
})
