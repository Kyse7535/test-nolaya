export const ProposalStatus = {
  PENDING: 'PROPOSAL_PENDING',
  FIRM: 'FIRM_PROPOSAL',
}

export const FeasibilityDecision = {
  EXACT: 'exact',
  VARIANT: 'variant',
}

export const SoftHoldStatus = {
  ACTIVE: 'ACTIVE',
}

export const STORAGE_KEY_PROPOSALS = 'as.mvp.proposals'
export const STORAGE_KEY_CURRENT_PROPOSAL_ID = 'as.mvp.currentProposalId'
export const STORAGE_KEY_SOFT_HOLDS = 'as.mvp.softHolds'

/** Mock soft-hold TTL for the demo. */
export const SOFT_HOLD_HOURS = 48

export function createProposalId() {
  return `prop_${Date.now().toString(36)}_${Math.random().toString(36).slice(2, 7)}`
}

export function createSoftHoldId() {
  return `hold_${Date.now().toString(36)}_${Math.random().toString(36).slice(2, 7)}`
}

/**
 * Prefill firm-offer draft (Stitch S04 values).
 */
export function createOfferDraft() {
  return {
    priceTotal: 220,
    priceBreakdown: {
      prestation: 165,
      supplies: 25,
      prep: 30,
    },
    durationLabel: '4 h 30',
    durationMinutes: 270,
    slot: {
      dateLabel: 'Samedi 15 mars',
      startTime: '09:30',
      endTime: '14:00',
      availability: 'Disponible',
    },
    placeLabel: 'Chez moi',
    placeNote: '(adresse masquée jusqu’à l’engagement)',
    tasks: [
      {
        id: 'task_pro',
        role: 'Coiffeuse',
        icon: 'content_cut',
        detail: 'Pose des vanilles, finitions',
      },
      {
        id: 'task_client',
        role: 'Cliente',
        icon: 'person',
        detail: 'Cheveux lavés et démêlés la veille',
      },
      {
        id: 'task_supplies',
        role: 'Fournitures',
        icon: 'inventory_2',
        detail: 'Mèches fournies par la coiffeuse',
      },
    ],
  }
}

/**
 * @param {{
 *   campaignId: string,
 *   invitationId: string,
 *   capacityId: string,
 *   demandId: string | null,
 *   demandSnapshot: object | null,
 *   frozenBrief: object,
 *   proDisplayName: string,
 *   proAvatarUrl?: string | null,
 *   proSpecialty?: string | null,
 * }} params
 */
export function createProposalPending({
  campaignId,
  invitationId,
  capacityId,
  demandId,
  demandSnapshot,
  frozenBrief,
  proDisplayName,
  proAvatarUrl = null,
  proSpecialty = null,
}) {
  return {
    id: createProposalId(),
    status: ProposalStatus.PENDING,
    campaignId,
    invitationId,
    capacityId,
    demandId: demandId ?? null,
    demandSnapshot: demandSnapshot ?? null,
    frozenBrief,
    proDisplayName,
    proAvatarUrl,
    proSpecialty,
    feasibility: null,
    feasibilityNote: null,
    offer: createOfferDraft(),
    softHoldId: null,
    confirmedAt: null,
    publishedAt: null,
    createdAt: new Date().toISOString(),
  }
}

/**
 * @param {{
 *   proposalId: string,
 *   slot: object,
 *   expiresAt?: string,
 * }} params
 */
export function createSoftHold({ proposalId, slot, expiresAt }) {
  const expires =
    expiresAt ||
    new Date(Date.now() + SOFT_HOLD_HOURS * 60 * 60 * 1000).toISOString()
  return {
    id: createSoftHoldId(),
    proposalId,
    status: SoftHoldStatus.ACTIVE,
    slot: {
      dateLabel: slot?.dateLabel ?? null,
      startTime: slot?.startTime ?? null,
      endTime: slot?.endTime ?? null,
    },
    expiresAt: expires,
    createdAt: new Date().toISOString(),
  }
}

export function isFirm(proposal) {
  return proposal?.status === ProposalStatus.FIRM
}

export function isPending(proposal) {
  return proposal?.status === ProposalStatus.PENDING
}

/**
 * Minimal publish gate (MVP §8).
 */
export function canPublish(proposal) {
  if (!proposal || proposal.status !== ProposalStatus.PENDING) return false
  if (
    proposal.feasibility !== FeasibilityDecision.EXACT &&
    proposal.feasibility !== FeasibilityDecision.VARIANT
  ) {
    return false
  }
  const offer = proposal.offer
  if (!offer) return false
  const price = Number(offer.priceTotal)
  if (!Number.isFinite(price) || price <= 0) return false
  if (!offer.durationLabel && !offer.durationMinutes) return false
  if (!offer.slot?.dateLabel || !offer.slot?.startTime) return false
  if (!offer.placeLabel) return false
  if (!Array.isArray(offer.tasks) || offer.tasks.length < 1) return false
  return true
}

export function slotSummary(slot) {
  if (!slot?.dateLabel) return '—'
  const time =
    slot.startTime && slot.endTime
      ? `${slot.startTime} – ${slot.endTime}`
      : slot.startTime || ''
  return time ? `${slot.dateLabel}, ${time}` : slot.dateLabel
}
