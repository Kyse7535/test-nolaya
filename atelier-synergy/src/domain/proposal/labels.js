import { FeasibilityDecision, ProposalStatus } from './model'

export function proposalStatusBadge(status) {
  if (status === ProposalStatus.PENDING) return 'EN ATTENTE'
  if (status === ProposalStatus.FIRM) return 'OFFRE FERME'
  return status ?? '—'
}

export function proposalStatusCode(status) {
  if (status === ProposalStatus.PENDING) return 'PROPOSAL_PENDING'
  if (status === ProposalStatus.FIRM) return 'FIRM_PROPOSAL'
  return status ?? '—'
}

export function feasibilityLabel(decision) {
  if (decision === FeasibilityDecision.EXACT) return 'Faisable exactement'
  if (decision === FeasibilityDecision.VARIANT) return 'Faisable avec une variante'
  return decision ?? '—'
}

export const STEPPER_STEPS = [
  { key: 'synthese', label: 'Synthèse' },
  { key: 'faisabilite', label: 'Faisabilité' },
  { key: 'offre', label: 'Offre' },
  { key: 'publier', label: 'Publier' },
]

export function budgetRangeLabel(brief) {
  if (!brief) return '—'
  const min = Number(brief.budgetMin)
  const max = Number(brief.budgetMax)
  if (Number.isFinite(min) && Number.isFinite(max) && min > 0 && max > 0) {
    return `${min} € – ${max} €`
  }
  if (Number.isFinite(max) && max > 0) return `${max} €`
  return '—'
}

export function demandReminderLine(brief) {
  if (!brief) return '—'
  const parts = []
  if (brief.prestationLabel) parts.push(brief.prestationLabel)
  const min = Number(brief.budgetMin)
  const max = Number(brief.budgetMax)
  if (Number.isFinite(min) && Number.isFinite(max) && min > 0 && max > 0) {
    parts.push(`Budget ${min}–${max} €`)
  } else if (Number.isFinite(max) && max > 0) {
    parts.push(`Budget ${max} €`)
  }
  if (brief.placeDesired) {
    const place =
      brief.placeDesired === 'Chez la coiffeuse' ? 'Chez vous' : brief.placeDesired
    parts.push(place)
  }
  return parts.join(' · ') || '—'
}
