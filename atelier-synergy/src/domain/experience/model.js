/** Étape 8 — Produire la preuve et prolonger la relation (MVP happy path). */

import { formatEuro } from '../settlement/model'

export { formatEuro }

export const ExperienceStatus = {
  PROOF_PENDING: 'PROOF_PENDING',
  EXPERIENCE_RECORDED: 'EXPERIENCE_RECORDED',
}

export const ReviewStatus = {
  REVIEW_SUBMITTED: 'REVIEW_SUBMITTED',
  REVIEW_PUBLISHED: 'REVIEW_PUBLISHED',
}

export const OutcomeKind = {
  AS_PLANNED: 'AS_PLANNED',
}

export const FeedbackDimension = {
  TECHNIQUE: 'technique',
  RESERVATION: 'reservation',
  COMMUNICATION: 'communication',
  PONCTUALITE: 'ponctualite',
  PRIX: 'prix',
}

export const FEEDBACK_DIMENSIONS = [
  FeedbackDimension.TECHNIQUE,
  FeedbackDimension.RESERVATION,
  FeedbackDimension.COMMUNICATION,
  FeedbackDimension.PONCTUALITE,
  FeedbackDimension.PRIX,
]

export const DemoRole = {
  CLIENT: 'client',
  PRO: 'pro',
}

export const PlaceOption = {
  STYLIST: 'stylist',
  HOME: 'home',
}

export const STORAGE_KEY_EXPERIENCES = 'as.mvp.experiences'
export const STORAGE_KEY_FEEDBACKS = 'as.mvp.feedbacks'
export const STORAGE_KEY_REVIEWS = 'as.mvp.reviews'
export const STORAGE_KEY_HISTORY = 'as.mvp.history'
export const STORAGE_KEY_REPEAT_DRAFT = 'as.mvp.repeatDraft'
export const STORAGE_KEY_EXPERIENCE_DEMO_ROLE = 'as.mvp.experienceDemoRole'

export function createExperienceId() {
  return `exp_${Date.now().toString(36)}_${Math.random().toString(36).slice(2, 7)}`
}

export function createFeedbackId() {
  return `fb_${Date.now().toString(36)}_${Math.random().toString(36).slice(2, 7)}`
}

export function createReviewId() {
  return `rev_${Date.now().toString(36)}_${Math.random().toString(36).slice(2, 7)}`
}

export function createHistoryId() {
  return `hist_${Date.now().toString(36)}_${Math.random().toString(36).slice(2, 7)}`
}

export function createRepeatDraftId() {
  return `rep_${Date.now().toString(36)}_${Math.random().toString(36).slice(2, 7)}`
}

/**
 * Auto ExperienceRecord from SETTLED settlement facts.
 * @param {object} settlement
 */
export function createExperienceFromSettlement(settlement) {
  const now = new Date().toISOString()
  return {
    id: createExperienceId(),
    status: ExperienceStatus.PROOF_PENDING,
    settlementId: settlement.id,
    appointmentId: settlement.appointmentId ?? null,
    engagementId: settlement.engagementId ?? null,
    executionDossierId: settlement.executionDossierId ?? null,
    serviceLabel: settlement.serviceLabel ?? 'Prestation',
    dateLabel: settlement.dateLabel ?? null,
    placeLabel: settlement.placeLabel ?? null,
    slotLabel: settlement.slotLabel ?? null,
    clientDisplayName: settlement.clientDisplayName ?? 'Cliente',
    proDisplayName: settlement.proDisplayName ?? 'Coiffeuse',
    proAvatarUrl: settlement.proAvatarUrl ?? null,
    priceEngaged: settlement.priceEngaged ?? 0,
    finalAmount: settlement.finalAmount ?? settlement.priceEngaged ?? 0,
    tipAmount: settlement.tipAmount ?? 0,
    outcome: null,
    outcomeConfirmedAt: null,
    reviewSkipped: false,
    favorite: false,
    recordedAt: null,
    createdAt: now,
  }
}

/**
 * Confirm happy outcome → EXPERIENCE_RECORDED.
 * @param {object} experience
 */
export function confirmOutcomeOk(experience) {
  const now = new Date().toISOString()
  return {
    ...experience,
    status: ExperienceStatus.EXPERIENCE_RECORDED,
    outcome: OutcomeKind.AS_PLANNED,
    outcomeConfirmedAt: now,
    recordedAt: experience.recordedAt ?? now,
  }
}

/**
 * @param {object} experience
 */
export function createHistoryEntry(experience) {
  return {
    id: createHistoryId(),
    experienceId: experience.id,
    settlementId: experience.settlementId,
    appointmentId: experience.appointmentId,
    serviceLabel: experience.serviceLabel,
    dateLabel: experience.dateLabel,
    placeLabel: experience.placeLabel,
    proDisplayName: experience.proDisplayName,
    proAvatarUrl: experience.proAvatarUrl,
    finalAmount: experience.finalAmount,
    status: experience.status,
    createdAt: new Date().toISOString(),
  }
}

/**
 * @param {object} experience
 * @param {{
 *   ratings: Record<string, number>,
 *   comment?: string,
 *   favorite?: boolean,
 * }} payload
 */
export function createFeedback(experience, { ratings, comment = '', favorite = false }) {
  const now = new Date().toISOString()
  return {
    id: createFeedbackId(),
    experienceId: experience.id,
    ratings: { ...ratings },
    comment: String(comment || '').trim(),
    favorite: Boolean(favorite),
    createdAt: now,
  }
}

/**
 * MVP: publish immediately (no moderation queue).
 * @param {object} experience
 * @param {object} feedback
 */
export function createPublishedReview(experience, feedback) {
  const now = new Date().toISOString()
  return {
    id: createReviewId(),
    experienceId: experience.id,
    feedbackId: feedback.id,
    status: ReviewStatus.REVIEW_PUBLISHED,
    clientDisplayName: experience.clientDisplayName,
    proDisplayName: experience.proDisplayName,
    comment: feedback.comment,
    ratings: { ...feedback.ratings },
    stylistReply: null,
    stylistRepliedAt: null,
    publishedAt: now,
    createdAt: now,
  }
}

/**
 * @param {object} review
 * @param {string} text
 */
export function applyStylistReply(review, text) {
  const reply = String(text || '').trim()
  if (!reply) return review
  return {
    ...review,
    stylistReply: reply,
    stylistRepliedAt: new Date().toISOString(),
  }
}

/**
 * Prefill + reconfirm payload for RepeatDemand.
 * @param {object} experience
 * @param {{
 *   priceConfirmed: number,
 *   dateLabel: string,
 *   placeOption: string,
 *   placeLabel?: string,
 * }} reconfirm
 */
export function createRepeatDraft(experience, reconfirm) {
  const now = new Date().toISOString()
  const placeLabel =
    reconfirm.placeLabel ||
    (reconfirm.placeOption === PlaceOption.HOME
      ? 'À domicile'
      : experience.placeLabel || 'Chez la coiffeuse')

  return {
    id: createRepeatDraftId(),
    experienceId: experience.id,
    serviceLabel: experience.serviceLabel,
    proDisplayName: experience.proDisplayName,
    proAvatarUrl: experience.proAvatarUrl,
    referencePrice: experience.priceEngaged ?? experience.finalAmount,
    priceConfirmed: Number(reconfirm.priceConfirmed) || 0,
    dateLabel: String(reconfirm.dateLabel || '').trim(),
    placeOption: reconfirm.placeOption,
    placeLabel,
    demandId: null,
    createdAt: now,
  }
}

/**
 * @param {{
 *   priceConfirmed?: number | string,
 *   dateLabel?: string,
 *   placeOption?: string,
 * }} reconfirm
 */
export function canConfirmRepeat(reconfirm) {
  const price = Number(reconfirm?.priceConfirmed)
  const dateOk = Boolean(String(reconfirm?.dateLabel || '').trim())
  const placeOk =
    reconfirm?.placeOption === PlaceOption.STYLIST ||
    reconfirm?.placeOption === PlaceOption.HOME
  return Number.isFinite(price) && price > 0 && dateOk && placeOk
}

export function isProofPending(experience) {
  return experience?.status === ExperienceStatus.PROOF_PENDING
}

export function isExperienceRecorded(experience) {
  return experience?.status === ExperienceStatus.EXPERIENCE_RECORDED
}

export function hasPublishedReview(review) {
  return review?.status === ReviewStatus.REVIEW_PUBLISHED
}

export function averageRating(ratings) {
  if (!ratings || typeof ratings !== 'object') return 0
  const values = FEEDBACK_DIMENSIONS.map((key) => Number(ratings[key]) || 0).filter(
    (n) => n > 0,
  )
  if (!values.length) return 0
  return Math.round((values.reduce((a, b) => a + b, 0) / values.length) * 10) / 10
}

export function emptyRatings() {
  return {
    [FeedbackDimension.TECHNIQUE]: 0,
    [FeedbackDimension.RESERVATION]: 0,
    [FeedbackDimension.COMMUNICATION]: 0,
    [FeedbackDimension.PONCTUALITE]: 0,
    [FeedbackDimension.PRIX]: 0,
  }
}

export function hasAnyRating(ratings) {
  return FEEDBACK_DIMENSIONS.some((key) => Number(ratings?.[key]) > 0)
}
