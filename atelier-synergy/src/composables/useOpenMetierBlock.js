import { computed } from 'vue'
import { storeToRefs } from 'pinia'
import { useRouter } from 'vue-router'
import { AppointmentStatus } from '../domain/appointment/model'
import { DemandStatus } from '../domain/demand/model'
import { EngagementStatus } from '../domain/engagement/model'
import { CampaignStatus, InvitationStatus } from '../domain/matching/model'
import { ProposalStatus } from '../domain/proposal/model'
import { isSeedDemandId } from '../mocks/demoScenario'
import { immersionBlockCounts } from '../mocks/immersionTree'
import { useAppointmentStore } from '../stores/appointment'
import { useCapacityStore } from '../stores/capacity'
import { useDemandStore } from '../stores/demand'
import { useDemoRoleStore } from '../stores/demoRole'
import { useEngagementStore } from '../stores/engagement'
import { useExecutionStore } from '../stores/execution'
import { useExperienceStore } from '../stores/experience'
import { useMatchingStore } from '../stores/matching'
import { useProposalStore } from '../stores/proposal'
import { useSettlementStore } from '../stores/settlement'

/** Shared “open the right screen for this métier block” navigation + immersion badges. */
export function useOpenMetierBlock() {
  const router = useRouter()
  const demoRoleStore = useDemoRoleStore()
  const { isClient, isPro } = storeToRefs(demoRoleStore)
  const capacityStore = useCapacityStore()
  const demandStore = useDemandStore()
  const matchingStore = useMatchingStore()
  const proposalStore = useProposalStore()
  const engagementStore = useEngagementStore()
  const appointmentStore = useAppointmentStore()
  const executionStore = useExecutionStore()
  const settlementStore = useSettlementStore()
  const experienceStore = useExperienceStore()

  const hasCapacities = computed(
    () =>
      capacityStore.userOpenCapacities.length > 0 ||
      capacityStore.userDraftCapacities.length > 0 ||
      capacityStore.userClosedCapacities.length > 0,
  )

  const blockBadges = computed(() =>
    immersionBlockCounts({
      isPro: isPro.value,
      capacityStore,
      demandStore,
      matchingStore,
      proposalStore,
      engagementStore,
      appointmentStore,
      settlementStore,
      experienceStore,
      isSeedDemandId,
    }),
  )

  function badgeFor(blockId) {
    return Number(blockBadges.value?.[blockId]) || 0
  }

  function openBlock(block) {
    if (block.status !== 'ready' || !block.routeName) return
    if (block.id === 'etape-0' && hasCapacities.value) {
      router.push({ name: 'capacity-liste' })
      return
    }
    if (block.id === 'etape-1') {
      const current = demandStore.currentDemand
      if (current?.status === DemandStatus.QUALIFIED) {
        router.push({ name: 'demand-succes' })
        return
      }
      if (demandStore.draftOrInProgress.length) {
        demandStore.startDraft()
      }
      router.push({ name: 'demand-accueil' })
      return
    }
    if (block.id === 'etape-2') {
      const campaign = matchingStore.currentCampaign
      if (isPro.value) {
        // Invitations reçues — jamais shortlist / lance (parcours cliente)
        if (!campaign) {
          router.push({ name: 'matching-accueil' })
          return
        }
        const userCapacityIds = new Set(
          capacityStore.userCapacities.map((c) => c.id),
        )
        const pending = (campaign.invitations || []).find(
          (inv) =>
            inv.status === InvitationStatus.SENT &&
            userCapacityIds.has(inv.capacityId),
        )
        if (pending) {
          router.push({
            name: 'matching-invitation',
            params: { id: pending.id },
          })
          return
        }
        router.push({ name: 'matching-suivi' })
        return
      }
      if (campaign?.status === CampaignStatus.SHORTLIST_READY) {
        router.push({ name: 'matching-shortlist' })
        return
      }
      if (campaign?.status === CampaignStatus.OPEN) {
        router.push({ name: 'matching-lance' })
        return
      }
    }
    if (block.id === 'etape-3') {
      if (isClient.value) {
        // Offres reçues — lecture offre ferme, pas le wizard faisabilité pro
        let proposal = proposalStore.currentProposal
        if (proposal?.status !== ProposalStatus.FIRM) {
          const firm = proposalStore.proposals.find(
            (p) => p.status === ProposalStatus.FIRM,
          )
          if (firm) {
            proposalStore.importProposal(firm, { setAsCurrent: true })
            proposal = firm
          }
        }
        if (proposal?.status === ProposalStatus.FIRM) {
          router.push({ name: 'proposal-offre-cliente' })
          return
        }
        router.push({
          name: matchingStore.hasShortlistReady
            ? 'matching-shortlist'
            : matchingStore.currentCampaign
              ? 'matching-lance'
              : 'matching-accueil',
        })
        return
      }
      const proposal = proposalStore.currentProposal
      if (proposal?.status === ProposalStatus.FIRM) {
        router.push({ name: 'proposal-succes' })
        return
      }
      if (proposal?.status === ProposalStatus.PENDING) {
        router.push({ name: 'proposal-synthese' })
        return
      }
      router.push({ name: 'proposal-accueil' })
      return
    }
    if (block.id === 'etape-4') {
      const engagement = engagementStore.currentEngagement
      if (engagement?.status === EngagementStatus.COMMITTED) {
        router.push({
          name: isPro.value
            ? 'engagement-confirmation-pro'
            : 'engagement-confirmation',
        })
        return
      }
      if (engagement?.status === EngagementStatus.AWAITING_PAYMENT) {
        router.push({
          name: isPro.value ? 'engagement-accueil' : 'engagement-paiement',
        })
        return
      }
      if (engagement?.status === EngagementStatus.AWAITING_CLIENT_ACCEPTANCE) {
        router.push({ name: 'engagement-accueil' })
        return
      }
    }
    if (block.id === 'etape-5') {
      appointmentStore.ensureDemoSeed()
      const appointment = appointmentStore.currentAppointment
      if (
        appointment?.status === AppointmentStatus.IN_PROGRESS ||
        appointment?.status === AppointmentStatus.COMPLETED
      ) {
        router.push({ name: 'execution-accueil' })
        return
      }
      if (appointment?.status === AppointmentStatus.READY) {
        router.push({ name: 'appointment-ready' })
        return
      }
      if (appointment?.status === AppointmentStatus.READINESS_PENDING) {
        router.push({
          name: isPro.value
            ? 'appointment-checklist-coiffeuse'
            : 'appointment-checklist-cliente',
        })
        return
      }
    }
    if (block.id === 'etape-6') {
      executionStore.ensureDemoSeed()
      const appointment = appointmentStore.currentAppointment
      if (appointment?.status === AppointmentStatus.COMPLETED) {
        router.push({ name: 'execution-succes' })
        return
      }
      if (appointment?.status === AppointmentStatus.IN_PROGRESS) {
        router.push({ name: 'execution-suivi' })
        return
      }
      router.push({ name: 'execution-accueil' })
      return
    }
    if (block.id === 'etape-7') {
      settlementStore.ensureDemoSeed()
      if (isPro.value) {
        // Voir mon revenu — pas le parcours « payer le solde »
        router.push({
          name: settlementStore.settled
            ? 'settlement-revenu'
            : 'settlement-accueil',
        })
        return
      }
      if (settlementStore.settled) {
        router.push({ name: 'settlement-succes' })
        return
      }
      router.push({ name: 'settlement-accueil' })
      return
    }
    if (block.id === 'etape-8') {
      settlementStore.ensureDemoSeed()
      if (!settlementStore.settled) {
        router.push({
          name: isPro.value ? 'settlement-revenu' : 'settlement-accueil',
        })
        return
      }
      experienceStore.ensureDemoSeed()
      if (isPro.value) {
        // Avis reçus — témoignage / historique, pas la preuve cliente
        if (experienceStore.publishedReview) {
          router.push({ name: 'experience-temoignage' })
          return
        }
        if (experienceStore.recorded) {
          router.push({ name: 'experience-historique' })
          return
        }
        router.push({ name: 'experience-succes' })
        return
      }
      if (experienceStore.recorded) {
        router.push({ name: 'experience-succes' })
        return
      }
      router.push({ name: 'experience-accueil' })
      return
    }
    router.push({ name: block.routeName })
  }

  return {
    blockBadges,
    badgeFor,
    openBlock,
  }
}
