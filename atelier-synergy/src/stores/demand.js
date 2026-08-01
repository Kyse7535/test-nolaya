import { computed, ref, watch } from 'vue'
import { defineStore } from 'pinia'
import {
  DemandStatus,
  EntryPath,
  ServiceLevel,
  STORAGE_KEY_CURRENT_ID,
  STORAGE_KEY_DEMANDS,
  canContinueEntry,
  canContinueResult,
  canContinueService,
  canContinueTimingBudget,
  canContinueZone,
  canQualify,
  createDefaultDemand,
  isEditable,
} from '../domain/demand/model'
import {
  ensureInspirationCatalogSeeded,
  getInspiration,
} from '../mocks/inspirations'
import { mockClient } from '../mocks/platform'

ensureInspirationCatalogSeeded()

function readDemands() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY_DEMANDS)
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

function writeDemands(list) {
  localStorage.setItem(STORAGE_KEY_DEMANDS, JSON.stringify(list))
}

function writeCurrentId(id) {
  if (id) localStorage.setItem(STORAGE_KEY_CURRENT_ID, id)
  else localStorage.removeItem(STORAGE_KEY_CURRENT_ID)
}

export const useDemandStore = defineStore('demand', () => {
  const demands = ref(readDemands())
  const currentDemandId = ref(readCurrentId())

  watch(
    demands,
    (value) => {
      writeDemands(value)
    },
    { deep: true },
  )

  watch(currentDemandId, (value) => {
    writeCurrentId(value)
  })

  const currentDemand = computed(() => {
    if (!currentDemandId.value) return null
    return demands.value.find((d) => d.id === currentDemandId.value) ?? null
  })

  const draftOrInProgress = computed(() =>
    demands.value.filter(
      (d) => d.status === DemandStatus.DRAFT || d.status === DemandStatus.IN_PROGRESS,
    ),
  )

  const qualifiedDemands = computed(() =>
    demands.value.filter((d) => d.status === DemandStatus.QUALIFIED),
  )

  const isDraft = computed(() => currentDemand.value?.status === DemandStatus.DRAFT)
  const isInProgress = computed(
    () => currentDemand.value?.status === DemandStatus.IN_PROGRESS,
  )
  const isQualified = computed(
    () => currentDemand.value?.status === DemandStatus.QUALIFIED,
  )

  const entryReady = computed(() => canContinueEntry(currentDemand.value))
  const resultReady = computed(() => canContinueResult(currentDemand.value))
  const timingBudgetReady = computed(() => canContinueTimingBudget(currentDemand.value))
  const zoneReady = computed(() => canContinueZone(currentDemand.value))
  const serviceReady = computed(() => canContinueService(currentDemand.value))
  const canQualifyNow = computed(() => canQualify(currentDemand.value))

  function upsert(demand) {
    const index = demands.value.findIndex((d) => d.id === demand.id)
    if (index === -1) {
      demands.value = [...demands.value, demand]
    } else {
      const next = [...demands.value]
      next[index] = demand
      demands.value = next
    }
  }

  /**
   * Start or resume a non-qualified draft for the wizard.
   * @param {{ forceNew?: boolean }} [options]
   */
  function startDraft({ forceNew = false } = {}) {
    if (!forceNew) {
      const existing = demands.value.find(
        (d) => d.status === DemandStatus.DRAFT || d.status === DemandStatus.IN_PROGRESS,
      )
      if (existing) {
        currentDemandId.value = existing.id
        return existing
      }
    }

    const demand = createDefaultDemand({
      zone: {
        areaLabel: mockClient.zoneLabel,
        radiusKm: null,
        mobility: null,
        placeIds: [],
      },
    })
    upsert(demand)
    currentDemandId.value = demand.id
    return demand
  }

  function setCurrent(id) {
    currentDemandId.value = id
  }

  function markInProgress() {
    const current = currentDemand.value
    if (!current || current.status !== DemandStatus.DRAFT) return
    upsert({ ...current, status: DemandStatus.IN_PROGRESS })
  }

  function patchEditable(mutator) {
    const current = currentDemand.value
    if (!isEditable(current)) return
    const next = typeof mutator === 'function' ? mutator({ ...current }) : { ...current, ...mutator }
    if (next.status === DemandStatus.DRAFT) {
      next.status = DemandStatus.IN_PROGRESS
    }
    upsert(next)
  }

  function setEntryPath(path) {
    if (path !== EntryPath.KNOWN && path !== EntryPath.CATALOG) return
    patchEditable((current) => {
      const next = { ...current, entryPath: path }
      if (path === EntryPath.KNOWN && !current.result?.inspirationId) {
        const knotless = getInspiration('knotless_medium')
        if (knotless) {
          next.result = {
            ...current.result,
            inspirationId: knotless.id,
            label: knotless.label,
            variante: current.result?.variante ?? 'medium',
          }
        }
      }
      return next
    })
  }

  function setInspiration(inspirationId) {
    const item = getInspiration(inspirationId)
    if (!item) return
    patchEditable((current) => ({
      ...current,
      result: {
        ...current.result,
        inspirationId: item.id,
        label: item.label,
      },
    }))
  }

  function setVariante(variante) {
    patchEditable((current) => ({
      ...current,
      result: { ...current.result, variante },
    }))
  }

  function toggleContext(contextId) {
    patchEditable((current) => {
      const ids = current.result?.contextIds ?? []
      const next = ids.includes(contextId)
        ? ids.filter((id) => id !== contextId)
        : [...ids, contextId]
      return {
        ...current,
        result: { ...current.result, contextIds: next },
      }
    })
  }

  function setTiming({ preferredDate, deadline }) {
    patchEditable((current) => ({
      ...current,
      timing: {
        preferredDate:
          preferredDate !== undefined ? preferredDate || null : current.timing.preferredDate,
        deadline: deadline !== undefined ? deadline || null : current.timing.deadline,
      },
    }))
  }

  function setBudget({ target, max, hairInclusion }) {
    patchEditable((current) => {
      const budget = { ...current.budget }
      if (target !== undefined) budget.target = Math.max(0, Number(target) || 0)
      if (max !== undefined) budget.max = Math.max(0, Number(max) || 0)
      if (hairInclusion !== undefined) budget.hairInclusion = hairInclusion
      return { ...current, budget }
    })
  }

  function setZone({ areaLabel, radiusKm, mobility, placeIds }) {
    patchEditable((current) => {
      const zone = { ...current.zone }
      if (areaLabel !== undefined) zone.areaLabel = areaLabel
      if (radiusKm !== undefined) zone.radiusKm = radiusKm
      if (mobility !== undefined) zone.mobility = mobility
      if (placeIds !== undefined) zone.placeIds = placeIds
      return { ...current, zone }
    })
  }

  function setRadius(radiusKm) {
    setZone({ radiusKm })
  }

  function setMobility(mobility) {
    setZone({ mobility })
  }

  function togglePlace(placeId) {
    patchEditable((current) => {
      const ids = current.zone?.placeIds ?? []
      const next = ids.includes(placeId)
        ? ids.filter((id) => id !== placeId)
        : [...ids, placeId]
      return { ...current, zone: { ...current.zone, placeIds: next } }
    })
  }

  function setProtections(protectionIds) {
    patchEditable({ protectionIds: [...protectionIds] })
  }

  function toggleProtection(protectionId) {
    patchEditable((current) => {
      let ids = [...(current.protectionIds ?? [])]
      if (protectionId === 'none') {
        return { ...current, protectionIds: ids.includes('none') ? [] : ['none'] }
      }
      ids = ids.filter((id) => id !== 'none')
      if (ids.includes(protectionId)) {
        ids = ids.filter((id) => id !== protectionId)
      } else {
        ids = [...ids, protectionId]
      }
      return { ...current, protectionIds: ids }
    })
  }

  function setServiceLevel(level) {
    if (level !== ServiceLevel.COMPLETE && level !== ServiceLevel.ASSISTED) return
    patchEditable((current) => ({
      ...current,
      serviceLevel: level,
      clientTasks: level === ServiceLevel.COMPLETE ? [] : current.clientTasks,
    }))
  }

  function toggleClientTask(taskId) {
    patchEditable((current) => {
      if (current.serviceLevel !== ServiceLevel.ASSISTED) return current
      const ids = current.clientTasks ?? []
      const next = ids.includes(taskId)
        ? ids.filter((id) => id !== taskId)
        : [...ids, taskId]
      return { ...current, clientTasks: next }
    })
  }

  function setSearchPriority(priority) {
    patchEditable({ searchPriority: priority })
  }

  function setConfirmed(confirmed) {
    patchEditable({ confirmed: Boolean(confirmed) })
  }

  function qualify() {
    const current = currentDemand.value
    if (!canQualify(current)) return false
    upsert({
      ...current,
      status: DemandStatus.QUALIFIED,
      confirmed: true,
      qualifiedAt: new Date().toISOString(),
    })
    return true
  }

  function resetDemo() {
    demands.value = []
    currentDemandId.value = null
  }

  /** Upsert a prebuilt demand (e.g. matching demo seed). */
  function importDemand(demand, { setAsCurrent = true } = {}) {
    if (!demand?.id) return null
    upsert(demand)
    if (setAsCurrent) currentDemandId.value = demand.id
    return demand
  }

  return {
    demands,
    currentDemandId,
    currentDemand,
    draftOrInProgress,
    qualifiedDemands,
    isDraft,
    isInProgress,
    isQualified,
    entryReady,
    resultReady,
    timingBudgetReady,
    zoneReady,
    serviceReady,
    canQualifyNow,
    startDraft,
    setCurrent,
    markInProgress,
    setEntryPath,
    setInspiration,
    setVariante,
    toggleContext,
    setTiming,
    setBudget,
    setZone,
    setRadius,
    setMobility,
    togglePlace,
    setProtections,
    toggleProtection,
    setServiceLevel,
    toggleClientTask,
    setSearchPriority,
    setConfirmed,
    qualify,
    importDemand,
    resetDemo,
  }
})
