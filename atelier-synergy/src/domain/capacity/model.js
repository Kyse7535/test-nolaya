export const CapacityStatus = {
  DRAFT: 'CAPACITY_DRAFT',
  OPEN: 'CAPACITY_OPEN',
  CLOSED: 'CAPACITY_CLOSED',
}

export const GalleryItemStatus = {
  DRAFT: 'GALLERY_ITEM_DRAFT',
  PUBLISHED: 'GALLERY_ITEM_PUBLISHED',
}

export const ProofLevel = {
  DECLARED_REALIZATION: 'DECLARED_REALIZATION',
  REFERENCE_INSPIRATION: 'REFERENCE_INSPIRATION',
}

export const ServiceLevel = {
  COMPLETE: 'COMPLETE',
  ASSISTED: 'ASSISTED',
}

export const TaskOwner = {
  STYLIST: 'STYLIST',
  CLIENT: 'CLIENT',
}

export const STORAGE_KEY_CAPACITIES = 'as.mvp.capacities'
export const STORAGE_KEY_CURRENT_ID = 'as.mvp.currentCapacityId'
export const STORAGE_KEY_CATALOG = 'as.mvp.catalog.services'

export function createCapacityId() {
  return `cap_${Date.now().toString(36)}_${Math.random().toString(36).slice(2, 7)}`
}

/** Empty draft capacity (domain storytelling §9). */
export function createDefaultCapacity(overrides = {}) {
  return {
    id: createCapacityId(),
    status: CapacityStatus.DRAFT,
    frameworkVersionId: 'fw_mock_v1',
    prestation: {
      id: null,
      label: null,
      variante: { taille: [], longueur: [], finition: [] },
    },
    gallery: [],
    serviceLevel: null,
    tasks: [],
    pricing: {
      basePrice: 0,
      currency: 'EUR',
      durationMinutes: 0,
      supplements: [],
    },
    location: { context: null, label: null },
    availability: {
      days: [],
      slots: [],
    },
    capacityMax: 0,
    desiredDemandVolume: 0,
    confirmed: false,
    openedAt: null,
    closedAt: null,
    createdAt: new Date().toISOString(),
    ...overrides,
  }
}

/** Normalize a variante field to a string list (supports legacy single values). */
export function asVarianteList(value) {
  if (Array.isArray(value)) return value.filter((item) => item != null && item !== '')
  if (value == null || value === '') return []
  return [value]
}

export function formatVarianteList(value, separator = ', ') {
  const list = asVarianteList(value)
  return list.length ? list.join(separator) : null
}

export function normalizeVariante(variante = {}) {
  return {
    taille: asVarianteList(variante?.taille),
    longueur: asVarianteList(variante?.longueur),
    finition: asVarianteList(variante?.finition),
  }
}

export function canContinuePrestation(capacity) {
  return Boolean(capacity?.prestation?.id)
}

export function canContinueGallery(capacity) {
  return Array.isArray(capacity?.gallery) && capacity.gallery.length >= 1
}

export function canContinueService(capacity) {
  if (!capacity?.serviceLevel) return false
  const tasks = capacity.tasks ?? []
  if (tasks.length < 1) return false
  return tasks.every((task) => task.owner === TaskOwner.STYLIST || task.owner === TaskOwner.CLIENT)
}

export function canContinuePricing(capacity) {
  const pricing = capacity?.pricing
  if (!pricing) return false
  return Number(pricing.basePrice) > 0 && Number(pricing.durationMinutes) > 0
}

export function canContinueLocation(capacity) {
  const hasLocation = Boolean(capacity?.location?.context)
  const hasAvailability =
    Array.isArray(capacity?.availability?.days) && capacity.availability.days.length >= 1
  const hasCapacity = Number(capacity?.capacityMax) >= 1
  const hasVolume = Number(capacity?.desiredDemandVolume) >= 1
  return hasLocation && hasAvailability && hasCapacity && hasVolume
}

/** Minimal field checks for CAPACITY_OPEN (MVP §8). */
export function canActivate(capacity) {
  if (!capacity) return false
  if (capacity.status !== CapacityStatus.DRAFT) return false
  if (!canContinuePrestation(capacity)) return false
  if (!canContinueGallery(capacity)) return false
  if (!canContinueService(capacity)) return false
  if (!canContinuePricing(capacity)) return false
  if (!canContinueLocation(capacity)) return false
  return capacity.confirmed === true
}
