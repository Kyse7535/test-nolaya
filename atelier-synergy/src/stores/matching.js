import { computed, ref, watch } from 'vue'
import { defineStore, storeToRefs } from 'pinia'
import { DemandStatus } from '../domain/demand/model'
import { CapacityStatus } from '../domain/capacity/model'
import { DemoRole } from '../domain/demoRole'
import {
  CampaignStatus,
  DEFAULT_THRESHOLD,
  InvitationStatus,
  POOL_SIZE,
  ResponseType,
  STORAGE_KEY_CAMPAIGNS,
  STORAGE_KEY_CURRENT_CAMPAIGN_ID,
  WAVE_1_SIZE,
  createCampaign,
  createDemandSnapshot,
  createInvitation,
  exactAcceptCount,
  isShortlistReady,
  shortlistedInvitations,
  thresholdReached,
} from '../domain/matching/model'
import {
  MATCHING_POOL_PROFILES,
  buildSeedOpenCapacity,
  buildSeedQualifiedDemand,
  isSeedCapacityId,
  poolEntryFromProfile,
  poolEntryFromUserCapacity,
} from '../mocks/matchingPool'
import { mockClient, mockProfessional } from '../mocks/platform'
import { useCapacityStore } from './capacity'
import { useDemoRoleStore } from './demoRole'
import { useDemandStore } from './demand'

function readCampaigns() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY_CAMPAIGNS)
    if (!raw) return []
    const parsed = JSON.parse(raw)
    return Array.isArray(parsed) ? parsed : []
  } catch {
    return []
  }
}

function readCurrentId() {
  try {
    return localStorage.getItem(STORAGE_KEY_CURRENT_CAMPAIGN_ID)
  } catch {
    return null
  }
}

function writeCampaigns(list) {
  localStorage.setItem(STORAGE_KEY_CAMPAIGNS, JSON.stringify(list))
}

function writeCurrentId(id) {
  if (id) localStorage.setItem(STORAGE_KEY_CURRENT_CAMPAIGN_ID, id)
  else localStorage.removeItem(STORAGE_KEY_CURRENT_CAMPAIGN_ID)
}

export const useMatchingStore = defineStore('matching', () => {
  const campaigns = ref(readCampaigns())
  const currentCampaignId = ref(readCurrentId())
  const demoRoleStore = useDemoRoleStore()
  const { demoRole } = storeToRefs(demoRoleStore)

  watch(
    campaigns,
    (value) => {
      writeCampaigns(value)
    },
    { deep: true },
  )

  watch(currentCampaignId, (value) => {
    writeCurrentId(value)
  })

  const currentCampaign = computed(() => {
    if (!currentCampaignId.value) return null
    return campaigns.value.find((c) => c.id === currentCampaignId.value) ?? null
  })

  const acceptCount = computed(() => exactAcceptCount(currentCampaign.value))
  const isThresholdReached = computed(() => thresholdReached(currentCampaign.value))
  const shortlist = computed(() => shortlistedInvitations(currentCampaign.value))
  const hasOpenCampaign = computed(
    () => currentCampaign.value?.status === CampaignStatus.OPEN,
  )
  const hasShortlistReady = computed(() => isShortlistReady(currentCampaign.value))
  const isProRole = computed(() => demoRole.value === DemoRole.PRO)
  const isClientRole = computed(() => demoRole.value === DemoRole.CLIENT)

  const pendingInvitations = computed(() =>
    (currentCampaign.value?.invitations ?? []).filter(
      (inv) => inv.status === InvitationStatus.SENT,
    ),
  )

  function upsert(campaign) {
    const index = campaigns.value.findIndex((c) => c.id === campaign.id)
    if (index === -1) {
      campaigns.value = [...campaigns.value, campaign]
    } else {
      const next = [...campaigns.value]
      next[index] = campaign
      campaigns.value = next
    }
  }

  function setDemoRole(role) {
    demoRoleStore.setDemoRole(role)
  }

  function toggleDemoRole() {
    demoRoleStore.toggleDemoRole()
  }

  /**
   * Ensure a qualified demand + enough OPEN capacities exist for the demo.
   * Seeds into demand/capacity stores when missing.
   */
  function ensureDemoPrerequisites() {
    const demandStore = useDemandStore()
    const capacityStore = useCapacityStore()

    let demand =
      demandStore.qualifiedDemands[demandStore.qualifiedDemands.length - 1] ?? null
    if (!demand) {
      demand = buildSeedQualifiedDemand()
      demandStore.importDemand(demand, { setAsCurrent: true })
    } else if (demandStore.currentDemandId !== demand.id) {
      demandStore.setCurrent(demand.id)
    }

    const open = capacityStore.openCapacities
    const needed = POOL_SIZE - open.length
    if (needed > 0) {
      const existingIds = new Set(capacityStore.capacities.map((c) => c.id))
      for (const profile of MATCHING_POOL_PROFILES) {
        if (existingIds.has(profile.capacityId)) continue
        if (capacityStore.openCapacities.length >= POOL_SIZE) break
        capacityStore.importCapacity(buildSeedOpenCapacity(profile))
      }
      // If still short (ids collided with closed/draft), pad remaining profiles with new ids
      let pad = 0
      while (capacityStore.openCapacities.length < POOL_SIZE && pad < MATCHING_POOL_PROFILES.length) {
        const profile = MATCHING_POOL_PROFILES[pad]
        const id = `${profile.capacityId}_pad${pad}`
        if (!capacityStore.capacities.some((c) => c.id === id)) {
          capacityStore.importCapacity({
            ...buildSeedOpenCapacity(profile),
            id,
          })
        }
        pad += 1
      }
    }

    return { demand, openCapacities: capacityStore.openCapacities }
  }

  function buildPoolAndInvitations(openCapacities) {
    const pool = []
    const invitations = []
    const pushInvitation = (entry) => {
      if (invitations.length >= WAVE_1_SIZE) return
      invitations.push(
        createInvitation({
          capacityId: entry.capacityId,
          displayName: entry.displayName,
          styleTag: entry.styleTag,
          avatarUrl: entry.avatarUrl,
          distanceKm: entry.distanceKm,
        }),
      )
    }

    const userCapacities = openCapacities.filter((c) => !isSeedCapacityId(c.id))
    const seedCapacities = openCapacities.filter((c) => isSeedCapacityId(c.id))

    // Wave 1 first: real coiffeuse capacities (so client demand reaches the pro tab).
    for (const capacity of userCapacities) {
      const entry = poolEntryFromUserCapacity(capacity, {
        displayName: `${mockProfessional.firstName} · vous`,
        avatarUrl: mockProfessional.avatarUrl,
        distanceKm: 2.5,
        wave: 1,
      })
      if (capacity.displayName) entry.displayName = capacity.displayName
      pool.push(entry)
      pushInvitation(entry)
    }

    // Pad pool / wave 1 with seed vivier profiles.
    const availableSeeds = [...seedCapacities]
    const takeSeed = (preferredId) => {
      const exact = availableSeeds.findIndex((c) => c.id === preferredId)
      if (exact !== -1) return availableSeeds.splice(exact, 1)[0]
      return availableSeeds.shift() ?? null
    }

    for (const profile of MATCHING_POOL_PROFILES) {
      const capacity = takeSeed(profile.capacityId)
      if (!capacity) continue
      const entry = poolEntryFromProfile(profile, capacity.id)
      if (capacity.displayName) entry.displayName = capacity.displayName
      pool.push(entry)
      if (profile.wave === 1) pushInvitation(entry)
    }

    while (invitations.length < WAVE_1_SIZE && invitations.length < pool.length) {
      const entry = pool[invitations.length]
      if (!entry) break
      entry.wave = 1
      pushInvitation(entry)
    }

    return { pool, invitations }
  }

  /**
   * Launch a campaign on a qualified demand (or seed prerequisites first).
   * @param {string} [demandId]
   */
  function launchCampaign(demandId) {
    const { demand: ensuredDemand } = ensureDemoPrerequisites()
    const demandStore = useDemandStore()
    const capacityStore = useCapacityStore()

    const demand =
      (demandId && demandStore.demands.find((d) => d.id === demandId)) ||
      ensuredDemand ||
      demandStore.qualifiedDemands[demandStore.qualifiedDemands.length - 1]

    if (!demand || demand.status !== DemandStatus.QUALIFIED) return null

    // Resume existing open/shortlist campaign for this demand
    const existing = campaigns.value.find(
      (c) =>
        c.demandId === demand.id &&
        (c.status === CampaignStatus.OPEN || c.status === CampaignStatus.SHORTLIST_READY),
    )
    if (existing) {
      currentCampaignId.value = existing.id
      return existing
    }

    const open = capacityStore.openCapacities.filter(
      (c) => c.status === CapacityStatus.OPEN,
    )
    const { pool, invitations } = buildPoolAndInvitations(open)
    if (invitations.length < 1) return null

    const campaign = createCampaign({
      demandId: demand.id,
      demandSnapshot: createDemandSnapshot(demand, mockClient),
      pool,
      invitations,
      threshold: DEFAULT_THRESHOLD,
    })
    upsert(campaign)
    currentCampaignId.value = campaign.id
    return campaign
  }

  function acceptExact(invitationId) {
    const campaign = currentCampaign.value
    if (!campaign || campaign.status !== CampaignStatus.OPEN) return false
    const invitations = campaign.invitations ?? []
    const index = invitations.findIndex((inv) => inv.id === invitationId)
    if (index === -1) return false
    const invitation = invitations[index]
    if (invitation.status === InvitationStatus.ACCEPTED) return true

    const nextInvitations = [...invitations]
    nextInvitations[index] = {
      ...invitation,
      status: InvitationStatus.ACCEPTED,
      responseType: ResponseType.ACCEPT_EXACT,
      respondedAt: new Date().toISOString(),
    }

    let next = {
      ...campaign,
      invitations: nextInvitations,
    }

    if (thresholdReached(next)) {
      next = {
        ...next,
        status: CampaignStatus.SHORTLIST_READY,
        outcome: 'RESPONSES_TO_CONVERT',
        shortlistedAt: new Date().toISOString(),
      }
    }

    upsert(next)
    return true
  }

  function getInvitation(invitationId) {
    return (
      currentCampaign.value?.invitations?.find((inv) => inv.id === invitationId) ?? null
    )
  }

  function resetDemo() {
    campaigns.value = []
    currentCampaignId.value = null
  }

  return {
    campaigns,
    currentCampaignId,
    currentCampaign,
    demoRole,
    acceptCount,
    isThresholdReached,
    shortlist,
    hasOpenCampaign,
    hasShortlistReady,
    isProRole,
    isClientRole,
    pendingInvitations,
    setDemoRole,
    toggleDemoRole,
    ensureDemoPrerequisites,
    launchCampaign,
    acceptExact,
    getInvitation,
    resetDemo,
    DemoRole,
  }
})
