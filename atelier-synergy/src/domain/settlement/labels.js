import {
  PLATFORM_COMMISSION_RATE,
  SettlementStatus,
  formatEuro,
} from './model'

export function settlementStatusBadge(status) {
  if (status === SettlementStatus.SETTLED) return 'RÉGLÉ'
  if (status === SettlementStatus.PAYMENT_PENDING) return 'À PAYER'
  if (status === SettlementStatus.CALCULATED) return 'À PAYER'
  if (status === SettlementStatus.ALLOCATION_PENDING) return 'ALLOCATION'
  if (status === SettlementStatus.SETTLEMENT_PENDING) return 'SOLDE À RÉGLER'
  return '—'
}

export function settlementStatusCode(status) {
  return status ?? '—'
}

export function payoutStatusBadge(status) {
  if (status === 'PAID_OUT') return 'REVERSÉ'
  return 'EN ATTENTE'
}

export function tipChipLabel(amount) {
  if (!amount) return 'Aucun'
  return `${amount} €`
}

export function commissionRateLabel() {
  return `${Math.round(PLATFORM_COMMISSION_RATE * 100)} %`
}

export function tipDisplay(amount) {
  const value = Number(amount) || 0
  if (value <= 0) return '—'
  return formatEuro(value)
}

export function signedEuro(amount) {
  const value = roundSigned(amount)
  if (value < 0) return `− ${formatEuro(Math.abs(value))}`
  if (value > 0) return `+ ${formatEuro(value)}`
  return formatEuro(0)
}

function roundSigned(amount) {
  return Math.round((Number(amount) || 0) * 100) / 100
}
