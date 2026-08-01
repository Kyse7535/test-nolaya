import {
  hairInclusionLabel,
  mobilityLabel,
  priorityLabel,
  serviceLevelLabel,
  varianteLabel,
} from '../demand/labels'
import { CampaignStatus, InvitationStatus, ResponseType } from './model'

export function campaignStatusBadge(status) {
  if (status === CampaignStatus.OPEN) return 'CAMPAGNE OUVERTE'
  if (status === CampaignStatus.SHORTLIST_READY) return 'SHORTLIST PRÊTE'
  return status ?? '—'
}

export function campaignStatusChip(status) {
  if (status === CampaignStatus.OPEN) return 'OUVERTE'
  if (status === CampaignStatus.SHORTLIST_READY) return 'PRÊTE'
  return status ?? '—'
}

export function invitationStatusLabel(status) {
  if (status === InvitationStatus.SENT) return 'En attente'
  if (status === InvitationStatus.ACCEPTED) return 'Acceptée'
  return status ?? '—'
}

export function invitationStatusBadge(status) {
  if (status === InvitationStatus.SENT) return 'ENVOYÉE'
  if (status === InvitationStatus.ACCEPTED) return 'ACCEPTÉE'
  return status ?? '—'
}

export function responseTypeLabel(type) {
  if (type === ResponseType.ACCEPT_EXACT) return 'Acceptation exacte'
  return type ?? '—'
}

export function demoRoleLabel(role) {
  if (role === 'pro') return 'Coiffeuse'
  return 'Cliente'
}

export function poolWaveLabel(wave) {
  if (wave === 1) return 'Vague 1 — invitée'
  return 'En réserve'
}

export function demandResultLabel(snapshot) {
  if (!snapshot) return '—'
  const label = snapshot.resultLabel || 'Demande'
  const variante = varianteLabel(snapshot.variante)
  if (variante && variante !== '—') return `${label} · ${variante}`
  return label
}

export function demandBudgetLine(snapshot) {
  if (!snapshot) return '—'
  const max = Number(snapshot.budgetMax) || 0
  const parts = []
  if (max > 0) parts.push(`${max} €`)
  const hair = hairInclusionLabel(snapshot.hairInclusion)
  if (hair !== '—') parts.push(hair)
  return parts.join(' · ') || '—'
}

export function demandZoneLine(snapshot) {
  if (!snapshot) return '—'
  const parts = []
  if (snapshot.radiusKm) parts.push(`${snapshot.radiusKm} km`)
  const mobility = mobilityLabel(snapshot.mobility)
  if (mobility !== '—') parts.push(mobility)
  else if (snapshot.areaLabel) parts.push(snapshot.areaLabel)
  return parts.join(' · ') || '—'
}

export function demandTimingLine(snapshot) {
  if (!snapshot) return '—'
  const parts = []
  if (snapshot.preferredDate) {
    try {
      const date = new Date(`${snapshot.preferredDate}T12:00:00`)
      if (!Number.isNaN(date.getTime())) {
        parts.push(
          date.toLocaleDateString('fr-FR', {
            weekday: 'long',
            day: 'numeric',
            month: 'short',
          }),
        )
      }
    } catch {
      parts.push(snapshot.preferredDate)
    }
  }
  if (snapshot.deadline) parts.push('échéance sous 10 jours')
  return parts.join(' · ') || '—'
}

export function demandServiceLine(snapshot) {
  if (!snapshot) return '—'
  return serviceLevelLabel(snapshot.serviceLevel)
}

export function demandPriorityLine(snapshot) {
  if (!snapshot) return '—'
  return priorityLabel(snapshot.searchPriority)
}

export function capacityLinkLine(invitation) {
  if (!invitation) return '—'
  const style = invitation.styleTag || 'Prestation'
  return `${style} · samedi · CAPACITY_OPEN`
}
