import {
  ActionCriticality,
  ActionOwner,
  ActionStatus,
  AppointmentStatus,
} from './model'

export function appointmentStatusBadge(status) {
  if (status === AppointmentStatus.READINESS_PENDING) return 'EN PRÉPARATION'
  if (status === AppointmentStatus.READY) return 'PRÊT'
  return status ?? '—'
}

export function appointmentStatusCode(status) {
  if (status === AppointmentStatus.READINESS_PENDING) return 'READINESS_PENDING'
  if (status === AppointmentStatus.READY) return 'READY'
  return status ?? '—'
}

export function actionStatusLabel(status) {
  if (status === ActionStatus.TO_DO) return 'À FAIRE'
  if (status === ActionStatus.CONFIRMED) return 'CONFIRMÉE'
  return status ?? '—'
}

export function criticalityLabel(criticality) {
  if (criticality === ActionCriticality.BLOCKING) return 'BLOQUANTE'
  if (criticality === ActionCriticality.INFORMATIVE) return 'INFORMATION'
  return criticality ?? '—'
}

export function ownerLabel(owner) {
  if (owner === ActionOwner.CLIENT) return 'CLIENTE'
  if (owner === ActionOwner.PRO) return 'COIFFEUSE'
  return owner ?? '—'
}

export function slotSummary(engagement) {
  if (!engagement) return '—'
  const time =
    engagement.startTime && engagement.endTime
      ? `${engagement.startTime} – ${engagement.endTime}`
      : engagement.startTime || ''
  if (engagement.dateLabel && time) return `${engagement.dateLabel} · ${time}`
  return engagement.dateLabel || time || '—'
}

export function partiesLine(engagement) {
  if (!engagement) return '—'
  const pro = engagement.proDisplayName || '—'
  const client = engagement.clientDisplayName || '—'
  return `${pro} · ${client}`
}
