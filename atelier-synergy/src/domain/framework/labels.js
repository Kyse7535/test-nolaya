import {
  ADDRESS_PRIVACY_OPTIONS,
  COMPANION_OPTIONS,
  CONTEXT_OPTIONS,
  INTERRUPTION_OPTIONS,
  MINORS_OPTIONS,
  PAYMENT_OPTIONS,
  PHOTO_CONSENT_OPTIONS,
  RESPONSE_DELAY_OPTIONS,
  platformPolicies,
} from '../../mocks/platform'

function labelOf(options, id) {
  return options.find((o) => o.id === id)?.label ?? '—'
}

export function contextsSummary(framework) {
  const labels = (framework.contexts ?? [])
    .map((id) => labelOf(CONTEXT_OPTIONS, id))
    .filter(Boolean)
  return labels.length ? labels.join(' + ') : '—'
}

export function addressPrivacySummary(framework) {
  if (framework.addressPrivacy === 'masked') return 'Adresse masquée'
  if (framework.addressPrivacy === 'visible') return 'Adresse visible'
  return labelOf(ADDRESS_PRIVACY_OPTIONS, framework.addressPrivacy)
}

export function companionsSummary(framework) {
  if (framework.companions === 'none') return "Pas d'accompagnant"
  return labelOf(COMPANION_OPTIONS, framework.companions)
}

export function minorsSummary(framework) {
  if (framework.minors === 'tutor') return 'Mineurs avec tuteur'
  return labelOf(MINORS_OPTIONS, framework.minors)
}

export function communicationSummary(framework) {
  return labelOf(RESPONSE_DELAY_OPTIONS, framework.responseDelay)
}

export function paymentsSummary(framework) {
  return (framework.paymentMethods ?? []).map((id) => labelOf(PAYMENT_OPTIONS, id))
}

export function policySummary(framework) {
  const policy = platformPolicies.find((p) => p.id === framework.policyId)
  return policy ? `Politique ${policy.label}` : '—'
}

export function interruptionSummary(framework) {
  return labelOf(INTERRUPTION_OPTIONS, framework.interruption)
}

export function photoConsentSummary(framework) {
  if (framework.photoConsent === 'explicit') return 'Photos avec consentement'
  return labelOf(PHOTO_CONSENT_OPTIONS, framework.photoConsent)
}
