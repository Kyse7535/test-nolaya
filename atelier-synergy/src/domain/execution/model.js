import { AppointmentStatus } from '../appointment/model'

export const ExecutionEventType = {
  ARRIVAL_CLIENT: 'ARRIVAL_CLIENT',
  ARRIVAL_PRO: 'ARRIVAL_PRO',
  START: 'START',
  END_DECLARED: 'END_DECLARED',
  CLIENT_CONFIRM: 'CLIENT_CONFIRM',
}

export { DemoRole } from '../demoRole'

export const STORAGE_KEY_EXECUTION_EVENTS = 'as.mvp.executionEvents'
export const STORAGE_KEY_EXECUTION_DOSSIER = 'as.mvp.executionDossier'

export function createEventId() {
  return `evt_${Date.now().toString(36)}_${Math.random().toString(36).slice(2, 7)}`
}

export function createDossierId() {
  return `exd_${Date.now().toString(36)}_${Math.random().toString(36).slice(2, 7)}`
}

/**
 * @param {{
 *   appointmentId: string,
 *   type: string,
 *   actorRole: string,
 *   note?: string | null,
 *   at?: string,
 * }} params
 */
export function createEvent({ appointmentId, type, actorRole, note = null, at }) {
  return {
    id: createEventId(),
    appointmentId,
    type,
    actorRole,
    note: note ?? null,
    at: at ?? new Date().toISOString(),
  }
}

export function findEvent(events, type, appointmentId) {
  if (!Array.isArray(events)) return null
  return (
    events.find(
      (e) => e.type === type && (!appointmentId || e.appointmentId === appointmentId),
    ) ?? null
  )
}

export function eventsForAppointment(events, appointmentId) {
  if (!Array.isArray(events) || !appointmentId) return []
  return events
    .filter((e) => e.appointmentId === appointmentId)
    .slice()
    .sort((a, b) => String(a.at).localeCompare(String(b.at)))
}

export function hasBothArrivals(events, appointmentId) {
  const list = eventsForAppointment(events, appointmentId)
  return (
    list.some((e) => e.type === ExecutionEventType.ARRIVAL_CLIENT) &&
    list.some((e) => e.type === ExecutionEventType.ARRIVAL_PRO)
  )
}

export function formatEventTime(iso) {
  if (!iso) return '—'
  try {
    const date = new Date(iso)
    if (Number.isNaN(date.getTime())) return '—'
    return date.toLocaleTimeString('fr-FR', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: false,
    })
  } catch {
    return '—'
  }
}

/**
 * @param {{
 *   appointment: object,
 *   engagement: object | null,
 *   events: Array<object>,
 * }} params
 */
export function createExecutionDossier({ appointment, engagement, events }) {
  const list = eventsForAppointment(events, appointment.id)
  const start = findEvent(list, ExecutionEventType.START)
  const end = findEvent(list, ExecutionEventType.END_DECLARED)
  const confirm = findEvent(list, ExecutionEventType.CLIENT_CONFIRM)
  const arrivalClient = findEvent(list, ExecutionEventType.ARRIVAL_CLIENT)
  const arrivalPro = findEvent(list, ExecutionEventType.ARRIVAL_PRO)
  const snapshot = appointment.readySnapshot ?? {}

  return {
    id: createDossierId(),
    appointmentId: appointment.id,
    engagementId: appointment.engagementId,
    status: AppointmentStatus.COMPLETED,
    outcome: 'COMPLETE',
    serviceLabel: snapshot.serviceLabel ?? engagement?.serviceLabel ?? null,
    dateLabel: snapshot.dateLabel ?? engagement?.dateLabel ?? null,
    placeLabel: snapshot.placeLabel ?? engagement?.placeLabel ?? null,
    clientDisplayName:
      snapshot.clientDisplayName ?? engagement?.clientDisplayName ?? null,
    proDisplayName: snapshot.proDisplayName ?? engagement?.proDisplayName ?? null,
    arrivalClientAt: arrivalClient?.at ?? null,
    arrivalProAt: arrivalPro?.at ?? null,
    startedAt: start?.at ?? null,
    endedAt: end?.at ?? null,
    endNote: end?.note ?? null,
    confirmedAt: confirm?.at ?? null,
    createdAt: new Date().toISOString(),
  }
}

export function isExecutionActiveStatus(status) {
  return (
    status === AppointmentStatus.READY ||
    status === AppointmentStatus.IN_PROGRESS ||
    status === AppointmentStatus.COMPLETED
  )
}
