/** Étape 7 — Régler et allouer la valeur (MVP happy path). */

export const SettlementStatus = {
  SETTLEMENT_PENDING: 'SETTLEMENT_PENDING',
  CALCULATED: 'CALCULATED',
  PAYMENT_PENDING: 'PAYMENT_PENDING',
  ALLOCATION_PENDING: 'ALLOCATION_PENDING',
  SETTLED: 'SETTLED',
}

export const PayoutStatus = {
  PENDING: 'PENDING',
  PAID_OUT: 'PAID_OUT',
}

export const DemoRole = {
  CLIENT: 'client',
  PRO: 'pro',
}

/** Fixed tip chips (€). */
export const TIP_OPTIONS = [0, 5, 10, 15]

/** One mock platform commission rate on engaged price only. */
export const PLATFORM_COMMISSION_RATE = 0.12

/** Stitch sample defaults when amont amounts are missing. */
export const DEFAULT_PRICE_ENGAGED = 220
export const DEFAULT_DEPOSIT = 66

export const STORAGE_KEY_SETTLEMENT = 'as.mvp.settlement'
export const STORAGE_KEY_LEDGER_LINES = 'as.mvp.ledgerLines'
export const STORAGE_KEY_PAYOUT = 'as.mvp.payout'
export const STORAGE_KEY_SETTLEMENT_DEMO_ROLE = 'as.mvp.settlementDemoRole'

export function createSettlementId() {
  return `set_${Date.now().toString(36)}_${Math.random().toString(36).slice(2, 7)}`
}

export function createPayoutId() {
  return `payo_${Date.now().toString(36)}_${Math.random().toString(36).slice(2, 7)}`
}

export function createLedgerLineId() {
  return `led_${Date.now().toString(36)}_${Math.random().toString(36).slice(2, 7)}`
}

export function roundMoney(value) {
  return Math.round((Number(value) || 0) * 100) / 100
}

export function formatEuro(amount) {
  return new Intl.NumberFormat('fr-FR', {
    style: 'currency',
    currency: 'EUR',
  }).format(roundMoney(amount))
}

/**
 * @param {number} priceEngaged
 * @param {number} tip
 * @param {number} deposit
 */
export function computeStatementAmounts(priceEngaged, tip, deposit) {
  const price = roundMoney(priceEngaged)
  const tipAmount = roundMoney(tip)
  const depositAmount = roundMoney(deposit)
  const finalAmount = roundMoney(price + tipAmount)
  const balance = roundMoney(finalAmount - depositAmount)
  const commission = roundMoney(price * PLATFORM_COMMISSION_RATE)
  const netStylist = roundMoney(price - commission + tipAmount)
  return {
    priceEngaged: price,
    tipAmount,
    depositAmount,
    finalAmount,
    balance,
    commissionRate: PLATFORM_COMMISSION_RATE,
    commission,
    netStylist,
  }
}

/**
 * @param {{
 *   engagement: object,
 *   appointment: object,
 *   executionDossier?: object | null,
 * }} params
 */
export function createSettlementPending({ engagement, appointment, executionDossier }) {
  const priceEngaged =
    Number(engagement?.priceTotal) ||
    Number(engagement?.proof?.priceTotal) ||
    DEFAULT_PRICE_ENGAGED
  const depositAmount =
    Number(engagement?.depositAmount) ||
    Number(engagement?.proof?.payment?.amount) ||
    DEFAULT_DEPOSIT

  const amounts = computeStatementAmounts(priceEngaged, 0, depositAmount)
  const snapshot = appointment?.readySnapshot ?? {}

  return {
    id: createSettlementId(),
    status: SettlementStatus.SETTLEMENT_PENDING,
    appointmentId: appointment?.id ?? null,
    engagementId: engagement?.id ?? appointment?.engagementId ?? null,
    executionDossierId: executionDossier?.id ?? null,
    serviceLabel:
      executionDossier?.serviceLabel ??
      snapshot.serviceLabel ??
      engagement?.serviceLabel ??
      'Prestation',
    dateLabel:
      executionDossier?.dateLabel ??
      snapshot.dateLabel ??
      engagement?.dateLabel ??
      null,
    placeLabel:
      executionDossier?.placeLabel ??
      snapshot.placeLabel ??
      engagement?.placeLabel ??
      null,
    clientDisplayName:
      executionDossier?.clientDisplayName ??
      snapshot.clientDisplayName ??
      engagement?.clientDisplayName ??
      'Cliente',
    proDisplayName:
      executionDossier?.proDisplayName ??
      snapshot.proDisplayName ??
      engagement?.proDisplayName ??
      'Coiffeuse',
    proAvatarUrl: engagement?.thumbnailUrl ?? null,
    priceEngaged: amounts.priceEngaged,
    depositAmount: amounts.depositAmount,
    tipAmount: 0,
    finalAmount: amounts.finalAmount,
    balance: amounts.balance,
    commissionRate: amounts.commissionRate,
    commission: amounts.commission,
    netStylist: amounts.netStylist,
    reference: buildReference(appointment?.id),
    calculatedAt: null,
    paidAt: null,
    settledAt: null,
    createdAt: new Date().toISOString(),
  }
}

function buildReference(appointmentId) {
  if (!appointmentId) return '#B2C-0315'
  const short = String(appointmentId).slice(-4).toUpperCase()
  return `#B2C-${short}`
}

/**
 * Apply tip and mark CALCULATED / PAYMENT_PENDING.
 * @param {object} settlement
 * @param {number} tipAmount
 */
export function applyTip(settlement, tipAmount) {
  const tip = TIP_OPTIONS.includes(Number(tipAmount))
    ? Number(tipAmount)
    : 0
  const amounts = computeStatementAmounts(
    settlement.priceEngaged,
    tip,
    settlement.depositAmount,
  )
  return {
    ...settlement,
    status:
      settlement.status === SettlementStatus.SETTLED
        ? SettlementStatus.SETTLED
        : SettlementStatus.PAYMENT_PENDING,
    tipAmount: amounts.tipAmount,
    finalAmount: amounts.finalAmount,
    balance: amounts.balance,
    commission: amounts.commission,
    netStylist: amounts.netStylist,
    calculatedAt: settlement.calculatedAt ?? new Date().toISOString(),
  }
}

/**
 * Mock balance payment → SETTLED (+ amounts frozen).
 * @param {object} settlement
 */
export function settleMock(settlement) {
  const now = new Date().toISOString()
  const withTip = applyTip(settlement, settlement.tipAmount ?? 0)
  return {
    ...withTip,
    status: SettlementStatus.SETTLED,
    paidAt: now,
    settledAt: now,
  }
}

/**
 * @param {object} settlement
 */
export function createPayoutPaidOut(settlement) {
  const now = new Date().toISOString()
  return {
    id: createPayoutId(),
    settlementId: settlement.id,
    appointmentId: settlement.appointmentId,
    status: PayoutStatus.PAID_OUT,
    amount: settlement.netStylist,
    commission: settlement.commission,
    tipAmount: settlement.tipAmount,
    paidOutAt: now,
    createdAt: now,
  }
}

/**
 * Light ledger lines after settlement.
 * @param {object} settlement
 */
export function createLedgerLines(settlement) {
  const at = settlement.settledAt ?? new Date().toISOString()
  const base = {
    settlementId: settlement.id,
    appointmentId: settlement.appointmentId,
    at,
  }
  return [
    {
      ...base,
      id: createLedgerLineId(),
      kind: 'PRICE_ENGAGED',
      label: 'Prix engagé',
      amount: settlement.priceEngaged,
      side: 'credit',
    },
    {
      ...base,
      id: createLedgerLineId(),
      kind: 'DEPOSIT',
      label: 'Acompte imputé',
      amount: -settlement.depositAmount,
      side: 'debit',
    },
    {
      ...base,
      id: createLedgerLineId(),
      kind: 'TIP',
      label: 'Pourboire',
      amount: settlement.tipAmount,
      side: 'credit',
    },
    {
      ...base,
      id: createLedgerLineId(),
      kind: 'BALANCE_PAID',
      label: 'Solde payé (mock)',
      amount: settlement.balance,
      side: 'credit',
    },
    {
      ...base,
      id: createLedgerLineId(),
      kind: 'COMMISSION',
      label: `Commission plateforme (${Math.round(PLATFORM_COMMISSION_RATE * 100)} %)`,
      amount: -settlement.commission,
      side: 'debit',
    },
    {
      ...base,
      id: createLedgerLineId(),
      kind: 'NET_STYLIST',
      label: 'Net styliste',
      amount: settlement.netStylist,
      side: 'credit',
    },
  ]
}

export function isSettled(settlement) {
  return settlement?.status === SettlementStatus.SETTLED
}

export function isSettlementOpen(settlement) {
  if (!settlement) return false
  return settlement.status !== SettlementStatus.SETTLED
}
