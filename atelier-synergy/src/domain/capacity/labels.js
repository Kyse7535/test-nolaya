import {
  AVAILABILITY_DAYS,
  catalogServices,
  LOCATION_OPTIONS,
} from '../../mocks/catalog'
import {
  CapacityStatus,
  ProofLevel,
  ServiceLevel,
  TaskOwner,
} from './model'

export function statusLabel(status) {
  if (status === CapacityStatus.DRAFT) return 'Brouillon'
  if (status === CapacityStatus.OPEN) return 'Ouverte'
  if (status === CapacityStatus.CLOSED) return 'Fermée'
  return status ?? '—'
}

export function serviceLevelLabel(level) {
  if (level === ServiceLevel.COMPLETE) return 'Service complet'
  if (level === ServiceLevel.ASSISTED) return 'Service assisté'
  return '—'
}

export function proofLevelLabel(level) {
  if (level === ProofLevel.DECLARED_REALIZATION) return 'Réalisation déclarée'
  if (level === ProofLevel.REFERENCE_INSPIRATION) return 'Inspiration'
  return '—'
}

export function taskOwnerLabel(owner) {
  if (owner === TaskOwner.STYLIST) return 'Styliste'
  if (owner === TaskOwner.CLIENT) return 'Cliente'
  return '—'
}

export function locationLabel(context) {
  return LOCATION_OPTIONS.find((o) => o.id === context)?.label ?? '—'
}

export function prestationSummary(capacity) {
  const id = capacity?.prestation?.id
  if (!id) return '—'
  const fromCatalog = catalogServices.find((s) => s.id === id)
  const label = capacity.prestation.label ?? fromCatalog?.label ?? id
  const taille = capacity.prestation.variante?.taille
  const longueur = capacity.prestation.variante?.longueur
  const parts = [label, taille, longueur].filter(Boolean)
  return parts.join(' · ')
}

export function pricingSummary(capacity) {
  const price = Number(capacity?.pricing?.basePrice ?? 0)
  const minutes = Number(capacity?.pricing?.durationMinutes ?? 0)
  if (price <= 0 && minutes <= 0) return '—'
  const euros = price > 0 ? `${price} €` : null
  const duration = minutes > 0 ? `${minutes} min` : null
  return [euros, duration].filter(Boolean).join(' · ')
}

export function formatMoney(amount) {
  const value = Number(amount) || 0
  return `${value.toFixed(2)} €`
}

export function formatDuration(minutes) {
  const total = Math.max(0, Number(minutes) || 0)
  const hours = Math.floor(total / 60)
  const mins = total % 60
  if (hours === 0) return `~ ${mins} min`
  if (mins === 0) return `~ ${hours}h`
  return `~ ${hours}h ${String(mins).padStart(2, '0')}min`
}

export function supplementsTotal(capacity) {
  return (capacity?.pricing?.supplements ?? []).reduce(
    (sum, item) => sum + (Number(item.amount) || 0),
    0,
  )
}

export function pricingTotal(capacity) {
  return (Number(capacity?.pricing?.basePrice) || 0) + supplementsTotal(capacity)
}

/** Demo line for success screen, e.g. "Knotless braids — Medium — 180 € — Chez moi — Capacité ouverte". */
export function openCapacityHeadline(capacity) {
  const label = capacity?.prestation?.label ?? 'Prestation'
  const taille = capacity?.prestation?.variante?.taille
  const price = Number(capacity?.pricing?.basePrice ?? 0)
  const place = locationLabel(capacity?.location?.context)
  const parts = [label, taille, price > 0 ? `${price} €` : null, place, 'Capacité ouverte'].filter(
    Boolean,
  )
  return parts.join(' — ')
}

export function gallerySummary(capacity) {
  const gallery = capacity?.gallery ?? []
  if (!gallery.length) return 'Aucune photo'
  const declared = gallery.filter(
    (item) => item.proofLevel === ProofLevel.DECLARED_REALIZATION,
  ).length
  const inspiration = gallery.length - declared
  return `${gallery.length} photo${gallery.length > 1 ? 's' : ''} (${declared} réalisation, ${inspiration} inspiration)`
}

export function availabilityDaysSummary(capacity) {
  const days = capacity?.availability?.days ?? []
  if (!days.length) return '—'
  const labels = days
    .map((id) => AVAILABILITY_DAYS.find((d) => d.id === id)?.label ?? id)
    .filter(Boolean)
  if (labels.length === 1) return labels[0]
  if (labels.length === 2) return labels.join('–')
  return `${labels[0]}–${labels[labels.length - 1]}`
}

export function volumeSummary(capacity) {
  const max = Number(capacity?.capacityMax) || 0
  const volume = Number(capacity?.desiredDemandVolume) || 0
  return `Capacité max ${max} · Volume ${volume}`
}
