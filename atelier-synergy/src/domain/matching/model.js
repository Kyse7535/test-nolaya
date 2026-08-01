export const CampaignStatus = {
  OPEN: 'CAMPAIGN_OPEN',
  SHORTLIST_READY: 'SHORTLIST_READY',
}

export const InvitationStatus = {
  SENT: 'SENT',
  ACCEPTED: 'ACCEPTED',
}

export const ResponseType = {
  ACCEPT_EXACT: 'ACCEPT_EXACT',
}

export { DemoRole, STORAGE_KEY_DEMO_ROLE } from '../demoRole'

export const STORAGE_KEY_CAMPAIGNS = 'as.mvp.campaigns'
export const STORAGE_KEY_CURRENT_CAMPAIGN_ID = 'as.mvp.currentCampaignId'

export const DEFAULT_THRESHOLD = 2
export const WAVE_1_SIZE = 3
export const POOL_SIZE = 6

export function createCampaignId() {
  return `camp_${Date.now().toString(36)}_${Math.random().toString(36).slice(2, 7)}`
}

export function createInvitationId() {
  return `inv_${Date.now().toString(36)}_${Math.random().toString(36).slice(2, 7)}`
}

/**
 * Snapshot of a qualified demand for campaign display.
 * @param {object} demand
 * @param {{ clientName?: string, clientAvatarUrl?: string } | null} [client]
 */
export function createDemandSnapshot(demand, client = null) {
  if (!demand) return null
  return {
    id: demand.id,
    clientName: demand.clientName ?? client?.firstName ?? client?.clientName ?? null,
    clientAvatarUrl:
      demand.clientAvatarUrl ?? client?.avatarUrl ?? client?.clientAvatarUrl ?? null,
    resultLabel: demand.result?.label ?? null,
    variante: demand.result?.variante ?? null,
    preferredDate: demand.timing?.preferredDate ?? null,
    deadline: demand.timing?.deadline ?? null,
    budgetMax: Number(demand.budget?.max) || 0,
    hairInclusion: demand.budget?.hairInclusion ?? null,
    radiusKm: demand.zone?.radiusKm ?? null,
    areaLabel: demand.zone?.areaLabel ?? null,
    mobility: demand.zone?.mobility ?? null,
    serviceLevel: demand.serviceLevel ?? null,
    searchPriority: demand.searchPriority ?? null,
  }
}

export function createInvitation({ capacityId, displayName, styleTag, avatarUrl, distanceKm }) {
  return {
    id: createInvitationId(),
    capacityId,
    displayName,
    styleTag,
    avatarUrl: avatarUrl ?? null,
    distanceKm: distanceKm ?? null,
    status: InvitationStatus.SENT,
    responseType: null,
    respondedAt: null,
    createdAt: new Date().toISOString(),
  }
}

/**
 * @param {{
 *   demandId: string,
 *   demandSnapshot: object,
 *   pool: Array<object>,
 *   invitations: Array<object>,
 *   threshold?: number,
 * }} params
 */
export function createCampaign({
  demandId,
  demandSnapshot,
  pool,
  invitations,
  threshold = DEFAULT_THRESHOLD,
}) {
  return {
    id: createCampaignId(),
    demandId,
    demandSnapshot,
    mode: 'resultat',
    threshold,
    delayLabel: '24 h (mock)',
    pool,
    invitations,
    status: CampaignStatus.OPEN,
    outcome: null,
    createdAt: new Date().toISOString(),
    shortlistedAt: null,
  }
}

export function exactAcceptCount(campaign) {
  if (!campaign?.invitations) return 0
  return campaign.invitations.filter(
    (inv) =>
      inv.status === InvitationStatus.ACCEPTED &&
      inv.responseType === ResponseType.ACCEPT_EXACT,
  ).length
}

export function thresholdReached(campaign) {
  if (!campaign) return false
  const threshold = Number(campaign.threshold) || DEFAULT_THRESHOLD
  return exactAcceptCount(campaign) >= threshold
}

export function shortlistedInvitations(campaign) {
  if (!campaign?.invitations) return []
  return campaign.invitations.filter(
    (inv) =>
      inv.status === InvitationStatus.ACCEPTED &&
      inv.responseType === ResponseType.ACCEPT_EXACT,
  )
}

export function wave1Invitations(campaign) {
  return campaign?.invitations ?? []
}

export function isShortlistReady(campaign) {
  return campaign?.status === CampaignStatus.SHORTLIST_READY
}
