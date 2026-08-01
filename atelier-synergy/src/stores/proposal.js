import { computed, ref, watch } from 'vue'
import { defineStore } from 'pinia'
import {
  CampaignStatus,
  DEFAULT_THRESHOLD,
  shortlistedInvitations,
} from '../domain/matching/model'
import {
  FeasibilityDecision,
  ProposalStatus,
  SoftHoldStatus,
  STORAGE_KEY_CURRENT_PROPOSAL_ID,
  STORAGE_KEY_PROPOSALS,
  STORAGE_KEY_SOFT_HOLDS,
  canPublish as canPublishProposal,
  createProposalPending,
  createSoftHold,
  isFirm as isFirmProposal,
  isPending as isPendingProposal,
} from '../domain/proposal/model'
import { buildFrozenDemandBrief, defaultProSpecialty } from '../mocks/proposalSeed'
import { useMatchingStore } from './matching'

function readProposals() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY_PROPOSALS)
    if (!raw) return []
    const parsed = JSON.parse(raw)
    return Array.isArray(parsed) ? parsed : []
  } catch {
    return []
  }
}

function readCurrentId() {
  try {
    return localStorage.getItem(STORAGE_KEY_CURRENT_PROPOSAL_ID)
  } catch {
    return null
  }
}

function readSoftHolds() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY_SOFT_HOLDS)
    if (!raw) return []
    const parsed = JSON.parse(raw)
    return Array.isArray(parsed) ? parsed : []
  } catch {
    return []
  }
}

function writeProposals(list) {
  localStorage.setItem(STORAGE_KEY_PROPOSALS, JSON.stringify(list))
}

function writeCurrentId(id) {
  if (id) localStorage.setItem(STORAGE_KEY_CURRENT_PROPOSAL_ID, id)
  else localStorage.removeItem(STORAGE_KEY_CURRENT_PROPOSAL_ID)
}

function writeSoftHolds(list) {
  localStorage.setItem(STORAGE_KEY_SOFT_HOLDS, JSON.stringify(list))
}

export const useProposalStore = defineStore('proposal', () => {
  const proposals = ref(readProposals())
  const currentProposalId = ref(readCurrentId())
  const softHolds = ref(readSoftHolds())

  watch(
    proposals,
    (value) => {
      writeProposals(value)
    },
    { deep: true },
  )

  watch(currentProposalId, (value) => {
    writeCurrentId(value)
  })

  watch(
    softHolds,
    (value) => {
      writeSoftHolds(value)
    },
    { deep: true },
  )

  const currentProposal = computed(() => {
    if (!currentProposalId.value) return null
    return proposals.value.find((p) => p.id === currentProposalId.value) ?? null
  })

  const currentSoftHold = computed(() => {
    const proposal = currentProposal.value
    if (!proposal?.softHoldId) return null
    return softHolds.value.find((h) => h.id === proposal.softHoldId) ?? null
  })

  const isPending = computed(() => isPendingProposal(currentProposal.value))
  const isFirm = computed(() => isFirmProposal(currentProposal.value))
  const canPublish = computed(() => canPublishProposal(currentProposal.value))

  function upsert(proposal) {
    const index = proposals.value.findIndex((p) => p.id === proposal.id)
    if (index === -1) {
      proposals.value = [...proposals.value, proposal]
    } else {
      const next = [...proposals.value]
      next[index] = proposal
      proposals.value = next
    }
  }

  function upsertSoftHold(hold) {
    const index = softHolds.value.findIndex((h) => h.id === hold.id)
    if (index === -1) {
      softHolds.value = [...softHolds.value, hold]
    } else {
      const next = [...softHolds.value]
      next[index] = hold
      softHolds.value = next
    }
  }

  /**
   * Ensure shortlist-ready campaign exists (seed amont if needed).
   */
  function ensureDemoPrerequisites() {
    const matchingStore = useMatchingStore()
    matchingStore.ensureDemoPrerequisites()

    let campaign = matchingStore.currentCampaign
    if (!campaign || campaign.status !== CampaignStatus.SHORTLIST_READY) {
      campaign = matchingStore.launchCampaign()
    }

    if (campaign && campaign.status === CampaignStatus.OPEN) {
      const threshold = Number(campaign.threshold) || DEFAULT_THRESHOLD
      const ids = (campaign.invitations || []).slice(0, threshold).map((inv) => inv.id)
      for (const id of ids) {
        matchingStore.acceptExact(id)
      }
      campaign = matchingStore.currentCampaign
    }

    return {
      campaign,
      shortlist: shortlistedInvitations(campaign),
    }
  }

  /**
   * Create or resume PROPOSAL_PENDING from the first shortlisted invitation.
   */
  function openFromShortlist() {
    const { campaign, shortlist } = ensureDemoPrerequisites()
    if (!campaign || campaign.status !== CampaignStatus.SHORTLIST_READY) return null
    if (!shortlist.length) return null

    const invitation = shortlist[0]

    const existing = proposals.value.find(
      (p) =>
        p.campaignId === campaign.id &&
        p.invitationId === invitation.id &&
        (p.status === ProposalStatus.PENDING || p.status === ProposalStatus.FIRM),
    )
    if (existing) {
      currentProposalId.value = existing.id
      return existing
    }

    const proposal = createProposalPending({
      campaignId: campaign.id,
      invitationId: invitation.id,
      capacityId: invitation.capacityId,
      demandId: campaign.demandId ?? null,
      demandSnapshot: campaign.demandSnapshot ?? null,
      frozenBrief: buildFrozenDemandBrief(campaign.demandSnapshot),
      proDisplayName: invitation.displayName || 'Coiffeuse',
      proAvatarUrl: invitation.avatarUrl ?? null,
      proSpecialty: defaultProSpecialty(invitation.styleTag),
    })

    upsert(proposal)
    currentProposalId.value = proposal.id
    return proposal
  }

  function setFeasibility(decision, note = null) {
    const proposal = currentProposal.value
    if (!proposal || proposal.status !== ProposalStatus.PENDING) return false
    if (
      decision !== FeasibilityDecision.EXACT &&
      decision !== FeasibilityDecision.VARIANT
    ) {
      return false
    }
    upsert({
      ...proposal,
      feasibility: decision,
      feasibilityNote:
        decision === FeasibilityDecision.VARIANT ? note?.trim() || null : null,
    })
    return true
  }

  function updateOffer(partial) {
    const proposal = currentProposal.value
    if (!proposal || proposal.status !== ProposalStatus.PENDING) return false
    const nextOffer = {
      ...proposal.offer,
      ...partial,
    }
    if (partial?.slot) {
      nextOffer.slot = { ...proposal.offer.slot, ...partial.slot }
    }
    if (partial?.priceBreakdown) {
      nextOffer.priceBreakdown = {
        ...proposal.offer.priceBreakdown,
        ...partial.priceBreakdown,
      }
    }
    if (partial?.priceTotal !== undefined) {
      nextOffer.priceTotal = Number(partial.priceTotal) || 0
    }
    upsert({
      ...proposal,
      offer: nextOffer,
    })
    return true
  }

  /**
   * Publish FIRM_PROPOSAL and create SOFT_HOLD.
   */
  function publishFirm() {
    const proposal = currentProposal.value
    if (!canPublishProposal(proposal)) return null

    const hold = createSoftHold({
      proposalId: proposal.id,
      slot: proposal.offer.slot,
    })
    upsertSoftHold(hold)

    const firm = {
      ...proposal,
      status: ProposalStatus.FIRM,
      softHoldId: hold.id,
      confirmedAt: new Date().toISOString(),
      publishedAt: new Date().toISOString(),
      offer: {
        ...proposal.offer,
        slot: {
          ...proposal.offer.slot,
          availability: 'SOFT_HOLD',
        },
      },
    }
    upsert(firm)
    return firm
  }

  /**
   * Transform soft-hold ACTIVE → BOOKED (étape 4 COMMITTED).
   * @param {string} softHoldId
   */
  function markSoftHoldBooked(softHoldId) {
    if (!softHoldId) return null
    const hold = softHolds.value.find((h) => h.id === softHoldId)
    if (!hold) return null

    const booked = {
      ...hold,
      status: SoftHoldStatus.BOOKED,
      bookedAt: new Date().toISOString(),
    }
    upsertSoftHold(booked)

    const proposal = proposals.value.find((p) => p.softHoldId === softHoldId)
    if (proposal?.offer?.slot) {
      upsert({
        ...proposal,
        offer: {
          ...proposal.offer,
          slot: {
            ...proposal.offer.slot,
            availability: 'BOOKED',
          },
        },
      })
    }
    return booked
  }

  function resetDemo() {
    proposals.value = []
    softHolds.value = []
    currentProposalId.value = null
  }

  return {
    proposals,
    currentProposalId,
    softHolds,
    currentProposal,
    currentSoftHold,
    isPending,
    isFirm,
    canPublish,
    ensureDemoPrerequisites,
    openFromShortlist,
    setFeasibility,
    updateOffer,
    publishFirm,
    markSoftHoldBooked,
    resetDemo,
  }
})
