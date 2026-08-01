import { AppointmentStatus } from '../appointment/model'
import { ExecutionEventType, formatEventTime } from './model'

export function executionStatusBadge(appointment, endDeclared = false) {
  const status = appointment?.status
  if (status === AppointmentStatus.COMPLETED) return 'TERMINÉ'
  if (status === AppointmentStatus.IN_PROGRESS && endDeclared) return 'À CONFIRMER'
  if (status === AppointmentStatus.IN_PROGRESS) return 'EN COURS'
  if (status === AppointmentStatus.READY) return 'PRÊT'
  return '—'
}

export function executionStatusCode(appointment, endDeclared = false) {
  const status = appointment?.status
  if (status === AppointmentStatus.COMPLETED) return 'COMPLETED'
  if (status === AppointmentStatus.IN_PROGRESS && endDeclared) {
    return 'AWAITING_CONFIRM'
  }
  if (status === AppointmentStatus.IN_PROGRESS) return 'IN_PROGRESS'
  if (status === AppointmentStatus.READY) return 'READY'
  return status ?? '—'
}

export function eventTypeLabel(type) {
  if (type === ExecutionEventType.ARRIVAL_CLIENT) return 'Arrivée cliente'
  if (type === ExecutionEventType.ARRIVAL_PRO) return 'Arrivée coiffeuse'
  if (type === ExecutionEventType.START) return 'Début de prestation'
  if (type === ExecutionEventType.END_DECLARED) return 'Fin complète déclarée'
  if (type === ExecutionEventType.CLIENT_CONFIRM) return 'Confirmation cliente'
  return type ?? '—'
}

export function eventTimelineLine(event) {
  if (!event) return '—'
  return `${formatEventTime(event.at)} — ${eventTypeLabel(event.type)}`
}

export function contextLine(summary) {
  if (!summary) return '—'
  const parts = [
    summary.serviceLabel,
    summary.dateLabel,
    summary.startTime,
    summary.placeLabel,
  ].filter(Boolean)
  return parts.join(' · ') || '—'
}
