/** Étape 4 — Former l’engagement (MVP happy path). */

export const EngagementStatus = {
  AWAITING_CLIENT_ACCEPTANCE: 'AWAITING_CLIENT_ACCEPTANCE',
  AWAITING_PAYMENT: 'AWAITING_PAYMENT',
  COMMITTED: 'COMMITTED',
}

export const PaymentStatus = {
  CREATED: 'CREATED',
  SUCCEEDED: 'SUCCEEDED',
}

/** Soft-hold slot status after engagement (also written on softHolds). */
export const SlotBookingStatus = {
  SOFT_HOLD: 'SOFT_HOLD',
  BOOKED: 'BOOKED',
}

export const STORAGE_KEY_ENGAGEMENTS = 'as.mvp.engagements'
export const STORAGE_KEY_CURRENT_ENGAGEMENT_ID = 'as.mvp.currentEngagementId'
export const STORAGE_KEY_PAYMENTS = 'as.mvp.payments'
export const STORAGE_KEY_POLICIES = 'as.mvp.policies'

/** Mock deposit ratio (Stitch S04: 66 € on 220 €). */
export const DEPOSIT_RATIO = 0.3

export function createEngagementId() {
  return `eng_${Date.now().toString(36)}_${Math.random().toString(36).slice(2, 7)}`
}

export function createPaymentId() {
  return `pay_${Date.now().toString(36)}_${Math.random().toString(36).slice(2, 7)}`
}

/**
 * Display fields used by étape 5+ (appointment / execution).
 * @param {object} seed
 */
export function engagementDisplayFields(seed) {
  return {
    serviceLabel: seed.serviceLabel ?? 'Prestation',
    dateLabel: seed.dateLabel ?? null,
    startTime: seed.startTime ?? null,
    endTime: seed.endTime ?? null,
    placeLabel: seed.placeLabel ?? null,
    clientDisplayName: seed.clientDisplayName ?? 'Cliente',
    proDisplayName: seed.proDisplayName ?? 'Coiffeuse',
    thumbnailUrl: seed.thumbnailUrl ?? null,
  }
}

/**
 * COMMITTED engagement (superset compatible with étape 5 seed shape).
 * @param {object} seed
 */
export function createEngagementCommitted(seed) {
  const display = engagementDisplayFields(seed)
  const priceTotal =
    seed.priceTotal != null ? Number(seed.priceTotal) : null
  const depositAmount =
    seed.depositAmount != null
      ? Number(seed.depositAmount)
      : priceTotal != null
        ? computeDeposit(priceTotal)
        : null
  const balanceAmount =
    seed.balanceAmount != null
      ? Number(seed.balanceAmount)
      : priceTotal != null && depositAmount != null
        ? priceTotal - depositAmount
        : null
  return {
    id: seed.id ?? createEngagementId(),
    status: EngagementStatus.COMMITTED,
    ...display,
    proposalId: seed.proposalId ?? null,
    softHoldId: seed.softHoldId ?? null,
    paymentId: seed.paymentId ?? null,
    offerVersion: seed.offerVersion ?? 1,
    offerRef: seed.offerRef ?? null,
    priceTotal,
    depositAmount,
    balanceAmount,
    consents: seed.consents ?? null,
    acceptedPolicyIds: seed.acceptedPolicyIds ?? [],
    proof: seed.proof ?? null,
    committedAt: seed.committedAt ?? new Date().toISOString(),
    createdAt: seed.createdAt ?? new Date().toISOString(),
  }
}

/**
 * Draft engagement from a firm proposal + active soft-hold.
 * @param {{
 *   proposal: object,
 *   softHold: object | null,
 *   policies: object[],
 * }} params
 */
export function createEngagementAwaitingAcceptance({ proposal, softHold, policies = [] }) {
  const offer = proposal?.offer ?? {}
  const brief = proposal?.frozenBrief ?? {}
  const slot = offer.slot ?? softHold?.slot ?? {}
  const priceTotal = Number(offer.priceTotal) || 0

  return {
    id: createEngagementId(),
    status: EngagementStatus.AWAITING_CLIENT_ACCEPTANCE,
    ...engagementDisplayFields({
      serviceLabel: brief.prestationLabel || 'Prestation',
      dateLabel: slot.dateLabel ?? null,
      startTime: slot.startTime ?? null,
      endTime: slot.endTime ?? null,
      placeLabel: offer.placeLabel ?? null,
      clientDisplayName: brief.clientName ?? 'Cliente',
      proDisplayName: proposal?.proDisplayName ?? 'Coiffeuse',
      thumbnailUrl: proposal?.proAvatarUrl ?? brief.galleryUrls?.[0] ?? null,
    }),
    proposalId: proposal.id,
    softHoldId: softHold?.id ?? proposal.softHoldId ?? null,
    paymentId: null,
    offerVersion: 1,
    offerRef: proposal.id,
    priceTotal,
    depositAmount: computeDeposit(priceTotal),
    balanceAmount: computeBalance(priceTotal),
    consents: {
      offerAccepted: false,
      policiesAccepted: {},
      acceptedAt: null,
    },
    acceptedPolicyIds: (policies || []).map((p) => p.id),
    proof: null,
    committedAt: null,
    createdAt: new Date().toISOString(),
  }
}

export function computeDeposit(priceTotal) {
  const total = Number(priceTotal) || 0
  return Math.round(total * DEPOSIT_RATIO)
}

export function computeBalance(priceTotal) {
  const total = Number(priceTotal) || 0
  return total - computeDeposit(total)
}

/**
 * @param {{
 *   engagementId: string,
 *   amount: number,
 *   currency?: string,
 * }} params
 */
export function createPaymentCreated({ engagementId, amount, currency = 'EUR' }) {
  return {
    id: createPaymentId(),
    engagementId,
    amount: Number(amount) || 0,
    currency,
    status: PaymentStatus.CREATED,
    kind: 'DEPOSIT_MOCK',
    createdAt: new Date().toISOString(),
    succeededAt: null,
  }
}

/**
 * Local contractual proof written on COMMITTED.
 */
export function createContractProof({ engagement, payment, proposal, policies }) {
  return {
    engagementId: engagement.id,
    proposalId: engagement.proposalId,
    offerVersion: engagement.offerVersion,
    offerRef: engagement.offerRef,
    status: EngagementStatus.COMMITTED,
    consents: engagement.consents,
    policyVersions: (policies || []).map((p) => ({
      id: p.id,
      version: p.version,
      title: p.title,
    })),
    payment: payment
      ? {
          id: payment.id,
          amount: payment.amount,
          status: payment.status,
          succeededAt: payment.succeededAt,
        }
      : null,
    slot: {
      dateLabel: engagement.dateLabel,
      startTime: engagement.startTime,
      endTime: engagement.endTime,
      status: SlotBookingStatus.BOOKED,
    },
    priceTotal: engagement.priceTotal ?? proposal?.offer?.priceTotal ?? null,
    createdAt: new Date().toISOString(),
  }
}

export function isAwaitingAcceptance(engagement) {
  return engagement?.status === EngagementStatus.AWAITING_CLIENT_ACCEPTANCE
}

export function isAwaitingPayment(engagement) {
  return engagement?.status === EngagementStatus.AWAITING_PAYMENT
}

export function isCommitted(engagement) {
  return engagement?.status === EngagementStatus.COMMITTED
}

/**
 * All required consent checkboxes checked.
 * @param {object} consents
 * @param {string[]} policyIds
 */
export function canContinueToPayment(consents, policyIds) {
  if (!consents?.offerAccepted) return false
  const accepted = consents.policiesAccepted || {}
  return (policyIds || []).every((id) => accepted[id] === true)
}
