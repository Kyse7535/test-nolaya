export const FrameworkStatus = {
  DRAFT: 'PROFESSIONAL_FRAMEWORK_DRAFT',
  ACTIVE: 'PROFESSIONAL_FRAMEWORK_ACTIVE',
}

export const STORAGE_KEY = 'as.mvp.professionalFramework'

/** Sensible MVP defaults (domain storytelling §9). */
export function createDefaultFramework() {
  return {
    status: FrameworkStatus.DRAFT,
    version: 1,
    contexts: ['home'],
    addressPrivacy: 'masked',
    companions: 'none',
    minors: 'tutor',
    accessNote: '',
    communicationDays: ['mar', 'mer', 'jeu', 'ven', 'sam'],
    responseDelay: '24h',
    paymentMethods: ['card', 'platform'],
    policyId: 'balanced',
    interruption: 'document',
    photoConsent: 'explicit',
    confirmed: false,
    activatedAt: null,
  }
}

export function canActivate(framework) {
  if (!framework) return false
  if (framework.status === FrameworkStatus.ACTIVE) return false

  const hasContext = Array.isArray(framework.contexts) && framework.contexts.length >= 1
  const hasPrivacy = Boolean(framework.addressPrivacy)
  const hasCompanions = Boolean(framework.companions)
  const hasMinors = Boolean(framework.minors)
  const hasCommunication =
    (Array.isArray(framework.communicationDays) && framework.communicationDays.length >= 1) ||
    Boolean(framework.responseDelay)
  const hasPayment =
    Array.isArray(framework.paymentMethods) && framework.paymentMethods.length >= 1
  const hasPolicy = Boolean(framework.policyId)
  const hasPhotos = Boolean(framework.photoConsent)
  const hasConfirmation = framework.confirmed === true

  return (
    hasContext &&
    hasPrivacy &&
    hasCompanions &&
    hasMinors &&
    hasCommunication &&
    hasPayment &&
    hasPolicy &&
    hasPhotos &&
    hasConfirmation
  )
}

export function canContinueContexts(framework) {
  return (
    Array.isArray(framework?.contexts) &&
    framework.contexts.length >= 1 &&
    Boolean(framework.addressPrivacy)
  )
}

export function canContinueAccess(framework) {
  return Boolean(framework?.companions) && Boolean(framework?.minors)
}

export function canContinueCommunication(framework) {
  const hasDays =
    Array.isArray(framework?.communicationDays) && framework.communicationDays.length >= 1
  const hasDelay = Boolean(framework?.responseDelay)
  const hasPayment =
    Array.isArray(framework?.paymentMethods) && framework.paymentMethods.length >= 1
  return (hasDays || hasDelay) && hasPayment
}

export function canContinuePolicies(framework) {
  return (
    Boolean(framework?.policyId) &&
    Boolean(framework?.interruption) &&
    Boolean(framework?.photoConsent)
  )
}
