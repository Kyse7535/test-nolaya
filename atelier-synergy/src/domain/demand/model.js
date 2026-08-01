export const DemandStatus = {
  DRAFT: 'DEMAND_DRAFT',
  IN_PROGRESS: 'QUALIFICATION_IN_PROGRESS',
  QUALIFIED: 'DEMAND_QUALIFIED',
}

export const EntryPath = {
  KNOWN: 'known',
  CATALOG: 'catalog',
}

export const ServiceLevel = {
  COMPLETE: 'COMPLETE',
  ASSISTED: 'ASSISTED',
}

export const HairInclusion = {
  INCLUDED: 'included',
  EXTRA: 'extra',
  UNKNOWN: 'unknown',
}

export const Mobility = {
  CLIENT_TRAVELS: 'client_travels',
  STYLIST_TRAVELS: 'stylist_travels',
  BOTH: 'both',
}

export const SearchPriority = {
  RESULT: 'result',
  PRICE: 'price',
  PROXIMITY: 'proximity',
  AVAILABILITY: 'availability',
}

export const STORAGE_KEY_DEMANDS = 'as.mvp.demands'
export const STORAGE_KEY_CURRENT_ID = 'as.mvp.currentDemandId'
export const STORAGE_KEY_CATALOG = 'as.mvp.catalog.inspirations'

export function createDemandId() {
  return `dem_${Date.now().toString(36)}_${Math.random().toString(36).slice(2, 7)}`
}

/** Empty draft demand (domain storytelling étape 1 MVP §4 / §9). */
export function createDefaultDemand(overrides = {}) {
  return {
    id: createDemandId(),
    status: DemandStatus.DRAFT,
    entryPath: null,
    result: {
      inspirationId: null,
      label: null,
      variante: null,
      contextIds: [],
    },
    timing: {
      preferredDate: null,
      deadline: null,
    },
    budget: {
      target: 0,
      max: 0,
      hairInclusion: null,
    },
    zone: {
      areaLabel: 'Paris 18e / nord de Paris',
      radiusKm: null,
      mobility: null,
      placeIds: [],
    },
    protectionIds: [],
    serviceLevel: null,
    clientTasks: [],
    searchPriority: null,
    confirmed: false,
    qualifiedAt: null,
    createdAt: new Date().toISOString(),
    ...overrides,
  }
}

export function isEditable(demand) {
  if (!demand) return false
  return (
    demand.status === DemandStatus.DRAFT || demand.status === DemandStatus.IN_PROGRESS
  )
}

export function canContinueEntry(demand) {
  return Boolean(demand?.entryPath)
}

export function canContinueResult(demand) {
  return Boolean(demand?.result?.inspirationId && demand?.result?.variante)
}

export function canContinueTimingBudget(demand) {
  const hasTime = Boolean(demand?.timing?.preferredDate || demand?.timing?.deadline)
  const max = Number(demand?.budget?.max) || 0
  return hasTime && max > 0
}

export function canContinueZone(demand) {
  const hasRadius = Number(demand?.zone?.radiusKm) > 0
  const hasMobility = Boolean(demand?.zone?.mobility)
  const hasPlace =
    Array.isArray(demand?.zone?.placeIds) && demand.zone.placeIds.length >= 1
  return (hasRadius || hasMobility) && hasPlace
}

export function canContinueService(demand) {
  if (!demand?.serviceLevel || !demand?.searchPriority) return false
  if (demand.serviceLevel === ServiceLevel.ASSISTED) {
    return Array.isArray(demand.clientTasks) && demand.clientTasks.length >= 1
  }
  return true
}

/** Minimal field checks for DEMAND_QUALIFIED (MVP §8). */
export function canQualify(demand) {
  if (!demand) return false
  if (!isEditable(demand)) return false
  if (!canContinueEntry(demand)) return false
  if (!canContinueResult(demand)) return false
  if (!canContinueTimingBudget(demand)) return false
  if (!canContinueZone(demand)) return false
  if (!canContinueService(demand)) return false
  return demand.confirmed === true
}
