import { computed, ref, watch } from 'vue'
import { defineStore } from 'pinia'
import {
  CapacityStatus,
  GalleryItemStatus,
  ProofLevel,
  ServiceLevel,
  STORAGE_KEY_CAPACITIES,
  STORAGE_KEY_CURRENT_ID,
  TaskOwner,
  canActivate,
  canContinueGallery,
  canContinueLocation,
  canContinuePrestation,
  canContinuePricing,
  canContinueService,
  createDefaultCapacity,
} from '../domain/capacity/model'
import {
  LOCATION_OPTIONS,
  buildDefaultTasks,
  getCatalogService,
} from '../mocks/catalog'
import { isSeedCapacityId } from '../mocks/matchingPool'
import { isImmersionCapacityId } from '../mocks/immersionIds'
import { seedImmersionAfterCapacityOpen } from '../mocks/immersionTree'

function createGalleryId() {
  return `g_${Date.now().toString(36)}_${Math.random().toString(36).slice(2, 6)}`
}

function readCapacities() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY_CAPACITIES)
    if (!raw) return []
    const parsed = JSON.parse(raw)
    return Array.isArray(parsed) ? parsed : []
  } catch {
    return []
  }
}

function readCurrentId() {
  try {
    return localStorage.getItem(STORAGE_KEY_CURRENT_ID)
  } catch {
    return null
  }
}

function writeCapacities(list) {
  localStorage.setItem(STORAGE_KEY_CAPACITIES, JSON.stringify(list))
}

function writeCurrentId(id) {
  if (id) localStorage.setItem(STORAGE_KEY_CURRENT_ID, id)
  else localStorage.removeItem(STORAGE_KEY_CURRENT_ID)
}

export const useCapacityStore = defineStore('capacity', () => {
  const capacities = ref(readCapacities())
  const currentCapacityId = ref(readCurrentId())

  watch(
    capacities,
    (value) => {
      writeCapacities(value)
    },
    { deep: true },
  )

  watch(currentCapacityId, (value) => {
    writeCurrentId(value)
  })

  const currentCapacity = computed(() => {
    if (!currentCapacityId.value) return null
    return capacities.value.find((c) => c.id === currentCapacityId.value) ?? null
  })

  const openCapacities = computed(() =>
    capacities.value.filter((c) => c.status === CapacityStatus.OPEN),
  )

  const draftCapacities = computed(() =>
    capacities.value.filter((c) => c.status === CapacityStatus.DRAFT),
  )

  const closedCapacities = computed(() =>
    capacities.value.filter((c) => c.status === CapacityStatus.CLOSED),
  )

  /** User-owned only (excludes matching vivier + immersion mirror capacities). */
  const userCapacities = computed(() =>
    capacities.value.filter(
      (c) => !isSeedCapacityId(c.id) && !isImmersionCapacityId(c.id),
    ),
  )

  const userOpenCapacities = computed(() =>
    userCapacities.value.filter((c) => c.status === CapacityStatus.OPEN),
  )

  const userDraftCapacities = computed(() =>
    userCapacities.value.filter((c) => c.status === CapacityStatus.DRAFT),
  )

  const userClosedCapacities = computed(() =>
    userCapacities.value.filter((c) => c.status === CapacityStatus.CLOSED),
  )

  /** Open first, then drafts, then closed — newest first within each group. User-owned only. */
  const listedCapacities = computed(() => {
    const rank = {
      [CapacityStatus.OPEN]: 0,
      [CapacityStatus.DRAFT]: 1,
      [CapacityStatus.CLOSED]: 2,
    }
    return [...userCapacities.value].sort((a, b) => {
      const byStatus = (rank[a.status] ?? 9) - (rank[b.status] ?? 9)
      if (byStatus !== 0) return byStatus
      return String(b.createdAt ?? '').localeCompare(String(a.createdAt ?? ''))
    })
  })

  const isDraft = computed(() => currentCapacity.value?.status === CapacityStatus.DRAFT)
  const isOpen = computed(() => currentCapacity.value?.status === CapacityStatus.OPEN)

  const canActivateNow = computed(() => canActivate(currentCapacity.value))
  const prestationReady = computed(() => canContinuePrestation(currentCapacity.value))
  const galleryReady = computed(() => canContinueGallery(currentCapacity.value))
  const serviceReady = computed(() => canContinueService(currentCapacity.value))
  const pricingReady = computed(() => canContinuePricing(currentCapacity.value))
  const locationReady = computed(() => canContinueLocation(currentCapacity.value))

  function upsert(capacity) {
    const index = capacities.value.findIndex((c) => c.id === capacity.id)
    if (index === -1) {
      capacities.value = [...capacities.value, capacity]
    } else {
      const next = [...capacities.value]
      next[index] = capacity
      capacities.value = next
    }
  }

  /**
   * Start or resume a draft for the wizard.
   * @param {{ forceNew?: boolean }} [options]
   */
  function startDraft({ forceNew = false } = {}) {
    if (!forceNew) {
      const existingDraft = capacities.value.find((c) => c.status === CapacityStatus.DRAFT)
      if (existingDraft) {
        currentCapacityId.value = existingDraft.id
        return existingDraft
      }
    }

    const capacity = createDefaultCapacity({
      tasks: buildDefaultTasks(),
    })
    upsert(capacity)
    currentCapacityId.value = capacity.id
    return capacity
  }

  function createNewDraft() {
    return startDraft({ forceNew: true })
  }

  function setCurrent(id) {
    currentCapacityId.value = id
  }

  function patch(partial) {
    const current = currentCapacity.value
    if (!current || current.status !== CapacityStatus.DRAFT) return
    upsert({ ...current, ...partial })
  }

  function patchNested(key, nestedPartial) {
    const current = currentCapacity.value
    if (!current || current.status !== CapacityStatus.DRAFT) return
    upsert({
      ...current,
      [key]: { ...current[key], ...nestedPartial },
    })
  }

  function setPrestation(serviceId) {
    const current = currentCapacity.value
    if (!current || current.status !== CapacityStatus.DRAFT) return
    const service = getCatalogService(serviceId)
    if (!service) return

    const changing = current.prestation?.id !== serviceId
    upsert({
      ...current,
      prestation: {
        id: service.id,
        label: service.label,
        variante: { ...service.defaultVariante },
      },
      gallery: changing ? [] : current.gallery,
      pricing: changing
        ? {
            ...current.pricing,
            basePrice: service.suggestedPrice,
            durationMinutes: service.suggestedDurationMinutes,
          }
        : current.pricing,
    })
  }

  function setVariante(partial) {
    const current = currentCapacity.value
    if (!current || current.status !== CapacityStatus.DRAFT) return
    upsert({
      ...current,
      prestation: {
        ...current.prestation,
        variante: {
          ...current.prestation.variante,
          ...partial,
        },
      },
    })
  }

  function addGalleryItem({ src, proofLevel = ProofLevel.DECLARED_REALIZATION }) {
    const current = currentCapacity.value
    if (!current || current.status !== CapacityStatus.DRAFT) return null
    if (!src) return null

    const item = {
      id: createGalleryId(),
      src,
      proofLevel,
      status: GalleryItemStatus.PUBLISHED,
    }
    upsert({
      ...current,
      gallery: [...(current.gallery ?? []), item],
    })
    return item
  }

  function removeGalleryItem(itemId) {
    const current = currentCapacity.value
    if (!current || current.status !== CapacityStatus.DRAFT) return
    upsert({
      ...current,
      gallery: (current.gallery ?? []).filter((item) => item.id !== itemId),
    })
  }

  function setGalleryProofLevel(itemId, proofLevel) {
    const current = currentCapacity.value
    if (!current || current.status !== CapacityStatus.DRAFT) return
    upsert({
      ...current,
      gallery: (current.gallery ?? []).map((item) =>
        item.id === itemId ? { ...item, proofLevel } : item,
      ),
    })
  }

  function toggleGalleryProofLevel(itemId) {
    const current = currentCapacity.value
    if (!current || current.status !== CapacityStatus.DRAFT) return
    const item = (current.gallery ?? []).find((entry) => entry.id === itemId)
    if (!item) return
    const next =
      item.proofLevel === ProofLevel.DECLARED_REALIZATION
        ? ProofLevel.REFERENCE_INSPIRATION
        : ProofLevel.DECLARED_REALIZATION
    setGalleryProofLevel(itemId, next)
  }

  function setServiceLevel(level) {
    const current = currentCapacity.value
    if (!current || current.status !== CapacityStatus.DRAFT) return
    if (level !== ServiceLevel.COMPLETE && level !== ServiceLevel.ASSISTED) return

    let tasks = current.tasks?.length ? current.tasks : buildDefaultTasks()
    if (level === ServiceLevel.COMPLETE) {
      tasks = tasks.map((task) => ({
        ...task,
        owner: TaskOwner.STYLIST,
        note: '',
      }))
    }

    upsert({
      ...current,
      serviceLevel: level,
      tasks,
    })
  }

  function setTaskOwner(taskId, owner) {
    const current = currentCapacity.value
    if (!current || current.status !== CapacityStatus.DRAFT) return
    if (owner !== TaskOwner.STYLIST && owner !== TaskOwner.CLIENT) return

    upsert({
      ...current,
      tasks: (current.tasks ?? []).map((task) => {
        if (task.id !== taskId) return task
        if (task.stylistOnly && owner === TaskOwner.CLIENT) return task
        return {
          ...task,
          owner,
          note: owner === TaskOwner.CLIENT ? task.note : '',
        }
      }),
    })
  }

  function setTaskNote(taskId, note) {
    const current = currentCapacity.value
    if (!current || current.status !== CapacityStatus.DRAFT) return
    upsert({
      ...current,
      tasks: (current.tasks ?? []).map((task) =>
        task.id === taskId ? { ...task, note } : task,
      ),
    })
  }

  function setPricingFields({ basePrice, durationMinutes }) {
    const current = currentCapacity.value
    if (!current || current.status !== CapacityStatus.DRAFT) return
    const pricing = { ...current.pricing }
    if (basePrice !== undefined) {
      pricing.basePrice = Math.max(0, Number(basePrice) || 0)
    }
    if (durationMinutes !== undefined) {
      pricing.durationMinutes = Math.max(0, Number(durationMinutes) || 0)
    }
    upsert({ ...current, pricing })
  }

  function addSupplement() {
    const current = currentCapacity.value
    if (!current || current.status !== CapacityStatus.DRAFT) return
    const supplements = current.pricing?.supplements ?? []
    if (supplements.length >= 2) return
    upsert({
      ...current,
      pricing: {
        ...current.pricing,
        supplements: [...supplements, { label: '', amount: 0 }],
      },
    })
  }

  function updateSupplement(index, partial) {
    const current = currentCapacity.value
    if (!current || current.status !== CapacityStatus.DRAFT) return
    const supplements = [...(current.pricing?.supplements ?? [])]
    if (!supplements[index]) return
    supplements[index] = {
      ...supplements[index],
      ...partial,
      amount:
        partial.amount !== undefined
          ? Math.max(0, Number(partial.amount) || 0)
          : supplements[index].amount,
    }
    upsert({
      ...current,
      pricing: { ...current.pricing, supplements },
    })
  }

  function removeSupplement(index) {
    const current = currentCapacity.value
    if (!current || current.status !== CapacityStatus.DRAFT) return
    const supplements = (current.pricing?.supplements ?? []).filter((_, i) => i !== index)
    upsert({
      ...current,
      pricing: { ...current.pricing, supplements },
    })
  }

  function setLocation(contextId) {
    const current = currentCapacity.value
    if (!current || current.status !== CapacityStatus.DRAFT) return
    const option = LOCATION_OPTIONS.find((item) => item.id === contextId)
    if (!option) return
    upsert({
      ...current,
      location: { context: option.id, label: option.label },
    })
  }

  function toggleAvailabilityDay(dayId) {
    const current = currentCapacity.value
    if (!current || current.status !== CapacityStatus.DRAFT) return
    const days = current.availability?.days ?? []
    const next = days.includes(dayId)
      ? days.filter((id) => id !== dayId)
      : [...days, dayId]
    upsert({
      ...current,
      availability: { ...current.availability, days: next },
    })
  }

  function toggleAvailabilitySlot(slotId) {
    const current = currentCapacity.value
    if (!current || current.status !== CapacityStatus.DRAFT) return
    const slots = current.availability?.slots ?? []
    const next = slots.includes(slotId)
      ? slots.filter((id) => id !== slotId)
      : [...slots, slotId]
    upsert({
      ...current,
      availability: { ...current.availability, slots: next },
    })
  }

  function setVolumeFields({ capacityMax, desiredDemandVolume }) {
    const current = currentCapacity.value
    if (!current || current.status !== CapacityStatus.DRAFT) return
    const next = { ...current }
    if (capacityMax !== undefined) {
      next.capacityMax = Math.max(0, Number(capacityMax) || 0)
    }
    if (desiredDemandVolume !== undefined) {
      next.desiredDemandVolume = Math.max(0, Number(desiredDemandVolume) || 0)
    }
    upsert(next)
  }

  function setConfirmed(confirmed) {
    const current = currentCapacity.value
    if (!current || current.status !== CapacityStatus.DRAFT) return
    upsert({ ...current, confirmed: Boolean(confirmed) })
  }

  function activate() {
    const current = currentCapacity.value
    if (!canActivate(current)) return false
    const opened = {
      ...current,
      status: CapacityStatus.OPEN,
      openedAt: new Date().toISOString(),
      confirmed: true,
    }
    upsert(opened)
    try {
      seedImmersionAfterCapacityOpen(opened)
    } catch (error) {
      console.warn('[immersion] capacity tree failed', error)
    }
    return true
  }

  function closeCapacity(id = currentCapacityId.value) {
    const target = capacities.value.find((c) => c.id === id)
    if (!target || target.status !== CapacityStatus.OPEN) return false
    upsert({
      ...target,
      status: CapacityStatus.CLOSED,
      closedAt: new Date().toISOString(),
    })
    return true
  }

  function resetDemo() {
    capacities.value = []
    currentCapacityId.value = null
  }

  /** Upsert a prebuilt capacity (e.g. matching demo seed). */
  function importCapacity(capacity, { setAsCurrent = false } = {}) {
    if (!capacity?.id) return null
    upsert(capacity)
    if (setAsCurrent) currentCapacityId.value = capacity.id
    return capacity
  }

  return {
    capacities,
    currentCapacityId,
    currentCapacity,
    openCapacities,
    draftCapacities,
    closedCapacities,
    userCapacities,
    userOpenCapacities,
    userDraftCapacities,
    userClosedCapacities,
    listedCapacities,
    isDraft,
    isOpen,
    canActivateNow,
    prestationReady,
    galleryReady,
    serviceReady,
    pricingReady,
    locationReady,
    startDraft,
    createNewDraft,
    setCurrent,
    patch,
    patchNested,
    setPrestation,
    setVariante,
    addGalleryItem,
    removeGalleryItem,
    setGalleryProofLevel,
    toggleGalleryProofLevel,
    setServiceLevel,
    setTaskOwner,
    setTaskNote,
    setPricingFields,
    addSupplement,
    updateSupplement,
    removeSupplement,
    setLocation,
    toggleAvailabilityDay,
    toggleAvailabilitySlot,
    setVolumeFields,
    setConfirmed,
    activate,
    closeCapacity,
    importCapacity,
    resetDemo,
  }
})
