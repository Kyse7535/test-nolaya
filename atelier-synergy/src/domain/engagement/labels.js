import { EngagementStatus, PaymentStatus } from './model'

export function engagementStatusBadge(status) {
  if (status === EngagementStatus.AWAITING_CLIENT_ACCEPTANCE) return 'EN ATTENTE'
  if (status === EngagementStatus.AWAITING_PAYMENT) return 'PAIEMENT'
  if (status === EngagementStatus.COMMITTED) return 'ENGAGÉ'
  return status ?? '—'
}

export function engagementStatusCode(status) {
  return status ?? '—'
}

export function paymentStatusLabel(status) {
  if (status === PaymentStatus.CREATED) return 'Créé'
  if (status === PaymentStatus.SUCCEEDED) return 'Réussi'
  return status ?? '—'
}

export const STEPPER_STEPS = [
  { key: 'recap', label: 'RÉCAP' },
  { key: 'accord', label: 'ACCORD' },
  { key: 'paie', label: 'PAIE' },
]

/** Short display ref for firm offer (Stitch PROP-2026-0315 style). */
export function offerRefLabel(proposalId, offerVersion = 1) {
  if (!proposalId) return `PROP · v${offerVersion}`
  const short = String(proposalId).replace(/^prop_/, '').slice(0, 8).toUpperCase()
  return `PROP-${short}`
}
