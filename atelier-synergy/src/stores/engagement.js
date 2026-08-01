import { computed, ref, watch } from 'vue'
import { defineStore } from 'pinia'
import {
  EngagementStatus,
  PaymentStatus,
  STORAGE_KEY_CURRENT_ENGAGEMENT_ID,
  STORAGE_KEY_ENGAGEMENTS,
  STORAGE_KEY_PAYMENTS,
  STORAGE_KEY_POLICIES,
  canContinueToPayment,
  createContractProof,
  createEngagementAwaitingAcceptance,
  createEngagementCommitted,
  createPaymentCreated,
  isAwaitingAcceptance,
  isAwaitingPayment,
  isCommitted,
} from '../domain/engagement/model'
import { ProposalStatus, SoftHoldStatus } from '../domain/proposal/model'
import { buildDefaultPolicies } from '../mocks/engagementSeed'
import { buildSeedEngagement } from '../mocks/appointmentSeed'
import { useProposalStore } from './proposal'

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

function readCurrentId() {
  try {
    return localStorage.getItem(STORAGE_KEY_CURRENT_ENGAGEMENT_ID)
  } catch {
    return null
  }
}

function writeJson(key, value) {
  localStorage.setItem(key, JSON.stringify(value))
}

function writeCurrentId(id) {
  if (id) localStorage.setItem(STORAGE_KEY_CURRENT_ENGAGEMENT_ID, id)
  else localStorage.removeItem(STORAGE_KEY_CURRENT_ENGAGEMENT_ID)
}

function readOrSeedPolicies() {
  const existing = readJsonArray(STORAGE_KEY_POLICIES)
  if (existing.length) return existing
  const seeded = buildDefaultPolicies()
  writeJson(STORAGE_KEY_POLICIES, seeded)
  return seeded
}

export const useEngagementStore = defineStore('engagement', () => {
  const engagements = ref(readJsonArray(STORAGE_KEY_ENGAGEMENTS))
  const payments = ref(readJsonArray(STORAGE_KEY_PAYMENTS))
  const policies = ref(readOrSeedPolicies())
  const currentEngagementId = ref(readCurrentId())

  watch(engagements, (value) => writeJson(STORAGE_KEY_ENGAGEMENTS, value), {
    deep: true,
  })
  watch(payments, (value) => writeJson(STORAGE_KEY_PAYMENTS, value), {
    deep: true,
  })
  watch(policies, (value) => writeJson(STORAGE_KEY_POLICIES, value), {
    deep: true,
  })
  watch(currentEngagementId, (value) => writeCurrentId(value))

  const currentEngagement = computed(() => {
    if (!currentEngagementId.value) return null
    return (
      engagements.value.find((e) => e.id === currentEngagementId.value) ?? null
    )
  })

  const currentPayment = computed(() => {
    const engagement = currentEngagement.value
    if (!engagement?.paymentId) return null
    return payments.value.find((p) => p.id === engagement.paymentId) ?? null
  })

  const currentCommitted = computed(() => {
    const current = currentEngagement.value
    if (current && isCommitted(current)) return current
    return (
      [...engagements.value].reverse().find((e) => isCommitted(e)) ?? null
    )
  })

  const policyIds = computed(() => policies.value.map((p) => p.id))

  const canPay = computed(() => {
    const engagement = currentEngagement.value
    if (!isAwaitingPayment(engagement)) return false
    return Boolean(engagement.paymentId)
  })

  function upsertEngagement(engagement) {
    const index = engagements.value.findIndex((e) => e.id === engagement.id)
    if (index === -1) {
      engagements.value = [...engagements.value, engagement]
    } else {
      const next = [...engagements.value]
      next[index] = engagement
      engagements.value = next
    }
  }

  function upsertPayment(payment) {
    const index = payments.value.findIndex((p) => p.id === payment.id)
    if (index === -1) {
      payments.value = [...payments.value, payment]
    } else {
      const next = [...payments.value]
      next[index] = payment
      payments.value = next
    }
  }

  /**
   * Ensure FIRM_PROPOSAL + SOFT_HOLD exist (seeds amont via proposal store).
   */
  function ensureDemoPrerequisites() {
    const proposalStore = useProposalStore()
    proposalStore.ensureDemoPrerequisites()

    let proposal = proposalStore.currentProposal
    if (!proposal) {
      proposal = proposalStore.openFromShortlist()
    }

    if (proposal?.status === ProposalStatus.PENDING) {
      proposalStore.setFeasibility('exact')
      proposalStore.publishFirm()
      proposal = proposalStore.currentProposal
    }

    return {
      proposal: proposalStore.currentProposal,
      softHold: proposalStore.currentSoftHold,
    }
  }

  /**
   * Create or resume engagement from firm proposal.
   */
  function openFromFirmProposal() {
    const { proposal, softHold } = ensureDemoPrerequisites()
    if (!proposal || proposal.status !== ProposalStatus.FIRM) return null

    const existing = engagements.value.find(
      (e) =>
        e.proposalId === proposal.id &&
        (e.status === EngagementStatus.AWAITING_CLIENT_ACCEPTANCE ||
          e.status === EngagementStatus.AWAITING_PAYMENT ||
          e.status === EngagementStatus.COMMITTED),
    )
    if (existing) {
      currentEngagementId.value = existing.id
      return existing
    }

    const engagement = createEngagementAwaitingAcceptance({
      proposal,
      softHold,
      policies: policies.value,
    })

    upsertEngagement(engagement)
    currentEngagementId.value = engagement.id
    return engagement
  }

  /**
   * Stable COMMITTED seed for étape 5 demo autonomy (same LS key).
   */
  function ensureCommittedSeed() {
    const committed = currentCommitted.value
    if (committed) {
      currentEngagementId.value = committed.id
      return committed
    }

    const seed = buildSeedEngagement()
    const engagement = createEngagementCommitted(seed)
    upsertEngagement(engagement)
    currentEngagementId.value = engagement.id
    return engagement
  }

  function findById(id) {
    if (!id) return null
    return engagements.value.find((e) => e.id === id) ?? null
  }

  function setConsentOffer(accepted) {
    const engagement = currentEngagement.value
    if (!engagement || !isAwaitingAcceptance(engagement)) return false
    upsertEngagement({
      ...engagement,
      consents: {
        ...engagement.consents,
        offerAccepted: Boolean(accepted),
      },
    })
    return true
  }

  function setConsentPolicy(policyId, accepted) {
    const engagement = currentEngagement.value
    if (!engagement || !isAwaitingAcceptance(engagement)) return false
    upsertEngagement({
      ...engagement,
      consents: {
        ...engagement.consents,
        policiesAccepted: {
          ...(engagement.consents?.policiesAccepted || {}),
          [policyId]: Boolean(accepted),
        },
      },
    })
    return true
  }

  /**
   * Validate consents → AWAITING_PAYMENT + payment CREATED.
   */
  function acceptConsents() {
    const engagement = currentEngagement.value
    if (!engagement || !isAwaitingAcceptance(engagement)) return null
    if (!canContinueToPayment(engagement.consents, policyIds.value)) return null

    const acceptedAt = new Date().toISOString()
    const payment = createPaymentCreated({
      engagementId: engagement.id,
      amount: engagement.depositAmount,
    })
    upsertPayment(payment)

    const next = {
      ...engagement,
      status: EngagementStatus.AWAITING_PAYMENT,
      paymentId: payment.id,
      consents: {
        ...engagement.consents,
        acceptedAt,
      },
    }
    upsertEngagement(next)
    return next
  }

  /**
   * Mock payment success → COMMITTED + BOOKED + proof.
   */
  function simulatePaymentSuccess() {
    const engagement = currentEngagement.value
    if (!engagement || !isAwaitingPayment(engagement)) return null

    let payment = currentPayment.value
    if (!payment) return null

    payment = {
      ...payment,
      status: PaymentStatus.SUCCEEDED,
      succeededAt: new Date().toISOString(),
    }
    upsertPayment(payment)

    const proposalStore = useProposalStore()
    if (engagement.softHoldId) {
      proposalStore.markSoftHoldBooked(engagement.softHoldId)
    }

    const proposal = proposalStore.proposals.find(
      (p) => p.id === engagement.proposalId,
    )

    const committedAt = new Date().toISOString()
    const withMeta = {
      ...engagement,
      status: EngagementStatus.COMMITTED,
      paymentId: payment.id,
      committedAt,
    }
    const proof = createContractProof({
      engagement: withMeta,
      payment,
      proposal: proposal ?? null,
      policies: policies.value,
    })

    const committed = {
      ...withMeta,
      proof,
    }
    upsertEngagement(committed)
    return committed
  }

  function resetDemo() {
    engagements.value = []
    payments.value = []
    policies.value = buildDefaultPolicies()
    currentEngagementId.value = null
    try {
      localStorage.removeItem(STORAGE_KEY_ENGAGEMENTS)
      localStorage.removeItem(STORAGE_KEY_PAYMENTS)
      localStorage.removeItem(STORAGE_KEY_CURRENT_ENGAGEMENT_ID)
      writeJson(STORAGE_KEY_POLICIES, policies.value)
    } catch {
      /* ignore */
    }
  }

  return {
    engagements,
    payments,
    policies,
    currentEngagementId,
    currentEngagement,
    currentPayment,
    currentCommitted,
    policyIds,
    canPay,
    ensureDemoPrerequisites,
    openFromFirmProposal,
    ensureCommittedSeed,
    findById,
    setConsentOffer,
    setConsentPolicy,
    acceptConsents,
    simulatePaymentSuccess,
    resetDemo,
    isAwaitingAcceptance,
    isAwaitingPayment,
    isCommitted,
  }
})
