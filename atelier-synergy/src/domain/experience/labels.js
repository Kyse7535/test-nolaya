import {
  ExperienceStatus,
  FEEDBACK_DIMENSIONS,
  FeedbackDimension,
  ReviewStatus,
} from './model'

export function experienceStatusBadge(status) {
  if (status === ExperienceStatus.EXPERIENCE_RECORDED) return 'ENREGISTRÉE'
  if (status === ExperienceStatus.PROOF_PENDING) return 'PREUVE'
  return '—'
}

export function experienceStatusCode(status) {
  return status ?? '—'
}

export function reviewStatusBadge(status) {
  if (status === ReviewStatus.REVIEW_PUBLISHED) return 'PUBLIÉ'
  if (status === ReviewStatus.REVIEW_SUBMITTED) return 'SOUMIS'
  return '—'
}

export const FEEDBACK_DIMENSION_META = {
  [FeedbackDimension.TECHNIQUE]: {
    label: 'Technique',
    hint: 'Qualité du résultat',
  },
  [FeedbackDimension.RESERVATION]: {
    label: 'Réservation',
    hint: 'Fluidité de la prise de rendez-vous',
  },
  [FeedbackDimension.COMMUNICATION]: {
    label: 'Communication',
    hint: 'Échanges avec la coiffeuse',
  },
  [FeedbackDimension.PONCTUALITE]: {
    label: 'Ponctualité',
    hint: "Respect de l'horaire",
  },
  [FeedbackDimension.PRIX]: {
    label: 'Prix',
    hint: 'Rapport au prix engagé',
  },
}

export function feedbackDimensionRows() {
  return FEEDBACK_DIMENSIONS.map((key) => ({
    key,
    ...FEEDBACK_DIMENSION_META[key],
  }))
}

export function outcomeLabel(outcome) {
  if (outcome === 'AS_PLANNED') return 'Réalisée comme prévu'
  return '—'
}
