import {
  CONTEXT_OPTIONS,
  CLIENT_TASK_OPTIONS,
  HAIR_INCLUSION_OPTIONS,
  MOBILITY_OPTIONS,
  PLACE_OPTIONS,
  PRIORITY_OPTIONS,
  PROTECTION_OPTIONS,
  VARIANTE_OPTIONS,
  getInspiration,
} from '../../mocks/inspirations'
import { DemandStatus, ServiceLevel } from './model'

export function statusLabel(status) {
  if (status === DemandStatus.DRAFT) return 'Brouillon'
  if (status === DemandStatus.IN_PROGRESS) return 'En cours'
  if (status === DemandStatus.QUALIFIED) return 'Qualifiée'
  return status ?? '—'
}

export function statusBadgeLabel(status) {
  if (status === DemandStatus.DRAFT) return 'BROUILLON'
  if (status === DemandStatus.IN_PROGRESS) return 'EN COURS'
  if (status === DemandStatus.QUALIFIED) return 'QUALIFIÉE'
  return status ?? '—'
}

export function serviceLevelLabel(level) {
  if (level === ServiceLevel.COMPLETE) return 'Complet'
  if (level === ServiceLevel.ASSISTED) return 'Assisté'
  return '—'
}

export function hairInclusionLabel(value) {
  return HAIR_INCLUSION_OPTIONS.find((o) => o.id === value)?.label ?? '—'
}

export function mobilityLabel(value) {
  return MOBILITY_OPTIONS.find((o) => o.id === value)?.label ?? '—'
}

export function priorityLabel(value) {
  return PRIORITY_OPTIONS.find((o) => o.id === value)?.label ?? '—'
}

export function varianteLabel(value) {
  return VARIANTE_OPTIONS.find((o) => o.id === value)?.label ?? value ?? '—'
}

export function contextLabels(ids = []) {
  if (!ids.length) return '—'
  return ids
    .map((id) => CONTEXT_OPTIONS.find((o) => o.id === id)?.label ?? id)
    .join(', ')
}

export function protectionLabels(ids = []) {
  if (!ids.length) return '—'
  return ids
    .map((id) => PROTECTION_OPTIONS.find((o) => o.id === id)?.label ?? id)
    .join(', ')
}

export function placeLabels(ids = []) {
  if (!ids.length) return '—'
  return ids
    .map((id) => PLACE_OPTIONS.find((o) => o.id === id)?.label ?? id)
    .join(', ')
}

export function clientTaskLabels(ids = []) {
  if (!ids.length) return '—'
  return ids
    .map((id) => CLIENT_TASK_OPTIONS.find((o) => o.id === id)?.label ?? id)
    .join(', ')
}

export function formatMoney(amount) {
  const value = Number(amount) || 0
  return `${value} €`
}

export function formatDate(value) {
  if (!value) return '—'
  try {
    const date = new Date(`${value}T12:00:00`)
    if (Number.isNaN(date.getTime())) return value
    return date.toLocaleDateString('fr-FR', {
      weekday: 'short',
      day: 'numeric',
      month: 'short',
    })
  } catch {
    return value
  }
}

export function resultSummary(demand) {
  const label = demand?.result?.label ?? getInspiration(demand?.result?.inspirationId)?.label
  if (!label) return '—'
  const variante = varianteLabel(demand?.result?.variante)
  return variante && variante !== '—' ? `${label} · ${variante}` : label
}

export function timingSummary(demand) {
  const preferred = formatDate(demand?.timing?.preferredDate)
  const deadline = formatDate(demand?.timing?.deadline)
  if (preferred === '—' && deadline === '—') return '—'
  if (preferred !== '—' && deadline !== '—') {
    return `Préférée ${preferred} · Échéance ${deadline}`
  }
  if (preferred !== '—') return `Préférée ${preferred}`
  return `Échéance ${deadline}`
}

export function budgetSummary(demand) {
  const target = Number(demand?.budget?.target) || 0
  const max = Number(demand?.budget?.max) || 0
  if (max <= 0 && target <= 0) return '—'
  const parts = []
  if (target > 0) parts.push(`cible ${formatMoney(target)}`)
  if (max > 0) parts.push(`max ${formatMoney(max)}`)
  const hair = hairInclusionLabel(demand?.budget?.hairInclusion)
  if (hair !== '—') parts.push(hair)
  return parts.join(' · ')
}

export function zoneSummary(demand) {
  const area = demand?.zone?.areaLabel || '—'
  const radius = demand?.zone?.radiusKm ? `${demand.zone.radiusKm} km` : null
  const mobility = mobilityLabel(demand?.zone?.mobility)
  const places = placeLabels(demand?.zone?.placeIds ?? [])
  return [area, radius, mobility !== '—' ? mobility : null, places !== '—' ? places : null]
    .filter(Boolean)
    .join(' · ')
}

export function qualifiedHeadline(demand) {
  const result = resultSummary(demand)
  const max = Number(demand?.budget?.max) || 0
  const radius = demand?.zone?.radiusKm
  const parts = [
    result !== '—' ? result : 'Demande',
    max > 0 ? `max ${formatMoney(max)}` : null,
    radius ? `${radius} km` : null,
    'Demande qualifiée',
  ].filter(Boolean)
  return parts.join(' — ')
}
