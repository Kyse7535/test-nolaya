import { computed, ref, watch } from 'vue'
import { defineStore, storeToRefs } from 'pinia'
import { DemoRole } from '../domain/demoRole'
import {
  STORAGE_KEY_EXPERIENCES,
  STORAGE_KEY_FEEDBACKS,
  STORAGE_KEY_HISTORY,
  STORAGE_KEY_REPEAT_DRAFT,
  STORAGE_KEY_REVIEWS,
  applyStylistReply,
  canConfirmRepeat,
  confirmOutcomeOk,
  createExperienceFromSettlement,
  createFeedback,
  createHistoryEntry,
  createPublishedReview,
  createRepeatDraft,
  hasPublishedReview,
  isExperienceRecorded,
  isProofPending,
} from '../domain/experience/model'
import {
  experienceStatusBadge,
  experienceStatusCode,
  reviewStatusBadge,
} from '../domain/experience/labels'
import { DemandStatus, EntryPath, createDefaultDemand } from '../domain/demand/model'
import { mockClient } from '../mocks/platform'
import { useDemoRoleStore } from './demoRole'
import { useDemandStore } from './demand'
import { useSettlementStore } from './settlement'

function readJsonObject(key) {
  try {
    const raw = localStorage.getItem(key)
    if (!raw) return null
    const parsed = JSON.parse(raw)
    return parsed && typeof parsed === 'object' && !Array.isArray(parsed)
      ? parsed
      : null
  } catch {
    return null
  }
}

function readJsonArray(key) {
  try {
    const raw = localStorage.getItem(key)
    if (!raw) return []
    const parsed = JSON.parse(raw)
    return Array.isArray(parsed) ? parsed : []
  } catch {
    return []
  }
}

function writeJson(key, value) {
  if (value == null) localStorage.removeItem(key)
  else localStorage.setItem(key, JSON.stringify(value))
}

export const useExperienceStore = defineStore('experience', () => {
  const experiences = ref(readJsonArray(STORAGE_KEY_EXPERIENCES))
  const feedbacks = ref(readJsonArray(STORAGE_KEY_FEEDBACKS))
  const reviews = ref(readJsonArray(STORAGE_KEY_REVIEWS))
  const history = ref(readJsonArray(STORAGE_KEY_HISTORY))
  const repeatDraft = ref(readJsonObject(STORAGE_KEY_REPEAT_DRAFT))
  const demoRoleStore = useDemoRoleStore()
  const { demoRole } = storeToRefs(demoRoleStore)
  const repeatPanelOpen = ref(false)

  watch(
    experiences,
    (value) => writeJson(STORAGE_KEY_EXPERIENCES, value),
    { deep: true },
  )
  watch(
    feedbacks,
    (value) => writeJson(STORAGE_KEY_FEEDBACKS, value),
    { deep: true },
  )
  watch(
    reviews,
    (value) => writeJson(STORAGE_KEY_REVIEWS, value),
    { deep: true },
  )
  watch(
    history,
    (value) => writeJson(STORAGE_KEY_HISTORY, value),
    { deep: true },
  )
  watch(
    repeatDraft,
    (value) => writeJson(STORAGE_KEY_REPEAT_DRAFT, value),
    { deep: true },
  )

  const settlementStore = useSettlementStore()

  const currentExperience = computed(() => {
    if (!experiences.value.length) return null
    return experiences.value[experiences.value.length - 1]
  })

  const currentFeedback = computed(() => {
    const exp = currentExperience.value
    if (!exp) return null
    return feedbacks.value.find((f) => f.experienceId === exp.id) ?? null
  })

  const currentReview = computed(() => {
    const exp = currentExperience.value
    if (!exp) return null
    return reviews.value.find((r) => r.experienceId === exp.id) ?? null
  })

  const statusBadge = computed(() =>
    experienceStatusBadge(currentExperience.value?.status),
  )
  const statusCode = computed(() =>
    experienceStatusCode(currentExperience.value?.status),
  )
  const reviewBadge = computed(() =>
    reviewStatusBadge(currentReview.value?.status),
  )
  const recorded = computed(() => isExperienceRecorded(currentExperience.value))
  const proofPending = computed(() => isProofPending(currentExperience.value))
  const publishedReview = computed(() => hasPublishedReview(currentReview.value))

  function upsertExperience(experience) {
    const index = experiences.value.findIndex((e) => e.id === experience.id)
    if (index === -1) {
      experiences.value = [...experiences.value, experience]
    } else {
      const next = [...experiences.value]
      next[index] = experience
      experiences.value = next
    }
  }

  function upsertReview(review) {
    const index = reviews.value.findIndex((r) => r.id === review.id)
    if (index === -1) {
      reviews.value = [...reviews.value, review]
    } else {
      const next = [...reviews.value]
      next[index] = review
      reviews.value = next
    }
  }

  /**
   * Gate: SETTLED settlement required. Creates PROOF_PENDING experience if needed.
   */
  function ensureDemoSeed() {
    settlementStore.ensureDemoSeed()
    if (!settlementStore.settled) return null

    const settlement = settlementStore.settlement
    const existing = currentExperience.value
    if (
      existing &&
      existing.settlementId === settlement.id &&
      existing.appointmentId === settlement.appointmentId
    ) {
      return existing
    }

    const next = createExperienceFromSettlement(settlement)
    if (!next.proAvatarUrl) {
      next.proAvatarUrl = settlement.proAvatarUrl
    }
    experiences.value = [next]
    feedbacks.value = []
    reviews.value = []
    history.value = history.value.filter((h) => h.settlementId !== settlement.id)
    repeatDraft.value = null
    repeatPanelOpen.value = false
    return next
  }

  function setDemoRole(role) {
    demoRoleStore.setDemoRole(role)
  }

  function confirmOutcome() {
    const current = ensureDemoSeed()
    if (!current) return null
    if (isExperienceRecorded(current)) return current

    const recordedExp = confirmOutcomeOk(current)
    upsertExperience(recordedExp)

    const already = history.value.some((h) => h.experienceId === recordedExp.id)
    if (!already) {
      history.value = [createHistoryEntry(recordedExp), ...history.value]
    }
    return recordedExp
  }

  function skipReview() {
    const current = confirmOutcome()
    if (!current) return null
    upsertExperience({ ...current, reviewSkipped: true })
    return currentExperience.value
  }

  /**
   * @param {{
   *   ratings: Record<string, number>,
   *   comment?: string,
   *   favorite?: boolean,
   * }} payload
   */
  function publishReview(payload) {
    const current = confirmOutcome()
    if (!current) return null

    const feedback = createFeedback(current, payload)
    feedbacks.value = [
      ...feedbacks.value.filter((f) => f.experienceId !== current.id),
      feedback,
    ]

    const review = createPublishedReview(current, feedback)
    reviews.value = [
      ...reviews.value.filter((r) => r.experienceId !== current.id),
      review,
    ]

    upsertExperience({
      ...current,
      reviewSkipped: false,
      favorite: Boolean(payload.favorite),
    })

    return currentReview.value
  }

  function replyAsPro(text) {
    const review = currentReview.value
    if (!review || !hasPublishedReview(review)) return null
    const next = applyStylistReply(review, text)
    upsertReview(next)
    return next
  }

  function openRepeatPanel() {
    repeatPanelOpen.value = true
  }

  function closeRepeatPanel() {
    repeatPanelOpen.value = false
  }

  /**
   * Write repeatDraft + create prefilled demand → étape 1.
   * @param {{
   *   priceConfirmed: number | string,
   *   dateLabel: string,
   *   placeOption: string,
   * }} reconfirm
   */
  function confirmRepeatDemand(reconfirm) {
    const current = currentExperience.value
    if (!current || !isExperienceRecorded(current)) return null
    if (!canConfirmRepeat(reconfirm)) return null

    const draft = createRepeatDraft(current, reconfirm)
    const demandStore = useDemandStore()

    const placeLabel =
      draft.placeOption === 'home'
        ? 'À domicile'
        : draft.placeLabel || current.placeLabel || 'Chez la coiffeuse'

    const demand = createDefaultDemand({
      status: DemandStatus.IN_PROGRESS,
      entryPath: EntryPath.KNOWN,
      result: {
        inspirationId: null,
        label: current.serviceLabel,
        variante: null,
        contextIds: [],
      },
      timing: {
        preferredDate: draft.dateLabel,
        deadline: null,
      },
      budget: {
        target: draft.priceConfirmed,
        max: draft.priceConfirmed,
        hairInclusion: null,
      },
      zone: {
        areaLabel: mockClient.zoneLabel || placeLabel,
        radiusKm: null,
        mobility: draft.placeOption === 'home' ? 'stylist_travels' : 'client_travels',
        placeIds: [],
      },
      confirmed: false,
    })

    demandStore.importDemand(demand, { setAsCurrent: true })
    draft.demandId = demand.id
    repeatDraft.value = draft
    repeatPanelOpen.value = false
    return { draft, demand }
  }

  function resetDemo() {
    experiences.value = []
    feedbacks.value = []
    reviews.value = []
    history.value = []
    repeatDraft.value = null
    repeatPanelOpen.value = false
    try {
      localStorage.removeItem(STORAGE_KEY_EXPERIENCES)
      localStorage.removeItem(STORAGE_KEY_FEEDBACKS)
      localStorage.removeItem(STORAGE_KEY_REVIEWS)
      localStorage.removeItem(STORAGE_KEY_HISTORY)
      localStorage.removeItem(STORAGE_KEY_REPEAT_DRAFT)
    } catch {
      /* ignore */
    }
  }

  return {
    experiences,
    feedbacks,
    reviews,
    history,
    repeatDraft,
    demoRole,
    repeatPanelOpen,
    currentExperience,
    currentFeedback,
    currentReview,
    statusBadge,
    statusCode,
    reviewBadge,
    recorded,
    proofPending,
    publishedReview,
    ensureDemoSeed,
    setDemoRole,
    confirmOutcome,
    skipReview,
    publishReview,
    replyAsPro,
    openRepeatPanel,
    closeRepeatPanel,
    confirmRepeatDemand,
    resetDemo,
    DemoRole,
  }
})
