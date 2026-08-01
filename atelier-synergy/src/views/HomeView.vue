<script setup>
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import { AppointmentStatus } from '../domain/appointment/model'
import { DemandStatus } from '../domain/demand/model'
import { EngagementStatus } from '../domain/engagement/model'
import { CampaignStatus } from '../domain/matching/model'
import { ProposalStatus } from '../domain/proposal/model'
import { metierBlocks } from '../mocks/metierBlocks'
import { mockProfessional } from '../mocks/platform'
import { useAppointmentStore } from '../stores/appointment'
import { useCapacityStore } from '../stores/capacity'
import { useDemandStore } from '../stores/demand'
import { useEngagementStore } from '../stores/engagement'
import { useExecutionStore } from '../stores/execution'
import { useFrameworkStore } from '../stores/framework'
import { useMatchingStore } from '../stores/matching'
import { useProposalStore } from '../stores/proposal'

const router = useRouter()
const frameworkStore = useFrameworkStore()
const capacityStore = useCapacityStore()
const demandStore = useDemandStore()
const matchingStore = useMatchingStore()
const proposalStore = useProposalStore()
const engagementStore = useEngagementStore()
const appointmentStore = useAppointmentStore()
const executionStore = useExecutionStore()

const capacityCountLabel = computed(() => {
  const open = capacityStore.openCapacities.length
  const drafts = capacityStore.draftCapacities.length
  const parts = []
  if (open) parts.push(`${open} ouverte${open > 1 ? 's' : ''}`)
  if (drafts) parts.push(`${drafts} brouillon${drafts > 1 ? 's' : ''}`)
  return parts.join(' · ') || 'aucune'
})

const hasCapacities = computed(
  () =>
    capacityStore.openCapacities.length > 0 ||
    capacityStore.draftCapacities.length > 0 ||
    capacityStore.closedCapacities.length > 0,
)

const hasDemands = computed(
  () =>
    demandStore.draftOrInProgress.length > 0 || demandStore.qualifiedDemands.length > 0,
)

const demandCountLabel = computed(() => {
  const drafts = demandStore.draftOrInProgress.length
  const qualified = demandStore.qualifiedDemands.length
  const parts = []
  if (qualified) parts.push(`${qualified} qualifiée${qualified > 1 ? 's' : ''}`)
  if (drafts) parts.push(`${drafts} brouillon${drafts > 1 ? 's' : ''}`)
  return parts.join(' · ') || 'aucune'
})

const hasMatching = computed(() => matchingStore.campaigns.length > 0)

const matchingCountLabel = computed(() => {
  const campaign = matchingStore.currentCampaign
  if (!campaign) return 'aucune'
  if (campaign.status === CampaignStatus.SHORTLIST_READY) return 'shortlist prête'
  if (campaign.status === CampaignStatus.OPEN) {
    return `campagne · ${matchingStore.acceptCount}/${campaign.threshold}`
  }
  return 'campagne'
})

const hasProposal = computed(() => proposalStore.proposals.length > 0)

const proposalCountLabel = computed(() => {
  const proposal = proposalStore.currentProposal
  if (!proposal) return 'aucune'
  if (proposal.status === ProposalStatus.FIRM) return 'offre ferme'
  if (proposal.status === ProposalStatus.PENDING) return 'en attente'
  return 'dossier'
})

const hasEngagement = computed(() => engagementStore.engagements.length > 0)

const engagementCountLabel = computed(() => {
  const engagement = engagementStore.currentEngagement
  if (!engagement) return 'aucune'
  if (engagement.status === EngagementStatus.COMMITTED) return 'COMMITTED'
  if (engagement.status === EngagementStatus.AWAITING_PAYMENT) return 'paiement'
  if (engagement.status === EngagementStatus.AWAITING_CLIENT_ACCEPTANCE) {
    return 'en attente'
  }
  return 'dossier'
})

const hasAppointment = computed(() => appointmentStore.appointments.length > 0)

const appointmentCountLabel = computed(() => {
  const appointment = appointmentStore.currentAppointment
  if (!appointment) return 'aucune'
  if (appointment.status === AppointmentStatus.COMPLETED) return 'COMPLETED'
  if (appointment.status === AppointmentStatus.IN_PROGRESS) return 'EN COURS'
  if (appointment.status === AppointmentStatus.READY) return 'READY'
  if (appointment.status === AppointmentStatus.READINESS_PENDING) {
    const { percent } = appointmentStore.blockingProgress
    return `en préparation · ${percent}%`
  }
  return 'dossier'
})

const hasExecution = computed(() => {
  const appointment = appointmentStore.currentAppointment
  if (!appointment) return false
  return (
    appointment.status === AppointmentStatus.READY ||
    appointment.status === AppointmentStatus.IN_PROGRESS ||
    appointment.status === AppointmentStatus.COMPLETED ||
    executionStore.appointmentEvents.length > 0 ||
    Boolean(executionStore.dossier)
  )
})

const executionCountLabel = computed(() => {
  const appointment = appointmentStore.currentAppointment
  if (!appointment) return 'aucune'
  if (appointment.status === AppointmentStatus.COMPLETED) return 'COMPLETED'
  if (appointment.status === AppointmentStatus.IN_PROGRESS) {
    return executionStore.endDeclared ? 'à confirmer' : 'EN COURS'
  }
  if (appointment.status === AppointmentStatus.READY) {
    return executionStore.bothArrivalsDeclared ? 'arrivées OK' : 'READY · jour J'
  }
  return 'dossier'
})

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
      router.push({ name: 'demand-accueil' })
      return
    }
  }
  if (block.id === 'etape-2') {
    const campaign = matchingStore.currentCampaign
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
    const proposal = proposalStore.currentProposal
    if (proposal?.status === ProposalStatus.FIRM) {
      router.push({ name: 'proposal-succes' })
      return
    }
    if (proposal?.status === ProposalStatus.PENDING) {
      router.push({ name: 'proposal-synthese' })
      return
    }
  }
  if (block.id === 'etape-4') {
    const engagement = engagementStore.currentEngagement
    if (engagement?.status === EngagementStatus.COMMITTED) {
      router.push({ name: 'engagement-confirmation' })
      return
    }
    if (engagement?.status === EngagementStatus.AWAITING_PAYMENT) {
      router.push({ name: 'engagement-paiement' })
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
      router.push({ name: 'appointment-plan' })
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
  router.push({ name: block.routeName })
}

function resetFrameworkDemo() {
  frameworkStore.resetDemo()
}

function resetCapacityDemo() {
  capacityStore.resetDemo()
}

function resetDemandDemo() {
  demandStore.resetDemo()
}

function resetMatchingDemo() {
  matchingStore.resetDemo()
}

function resetProposalDemo() {
  proposalStore.resetDemo()
}

function resetEngagementDemo() {
  engagementStore.resetDemo()
}

function resetAppointmentDemo() {
  executionStore.resetDemo()
  appointmentStore.resetDemo()
}

function resetExecutionDemo() {
  executionStore.resetDemo()
}

function goCapacityListe() {
  router.push({ name: 'capacity-liste' })
}

function goCapacityStart() {
  capacityStore.startDraft()
  router.push({ name: 'capacity-accueil' })
}

function goDemandStart() {
  demandStore.startDraft()
  router.push({ name: 'demand-accueil' })
}
</script>

<template>
  <div class="bg-background text-on-surface font-body-md antialiased min-h-screen">
    <header
      class="sticky top-0 z-40 w-full bg-surface border-b border-surface-container flex items-center justify-between px-margin-mobile h-16"
    >
      <div class="font-headline-sm text-headline-sm text-primary font-bold tracking-tight">
        Atelier Synergy
      </div>
      <span
        class="font-label-mono text-label-mono bg-surface-container text-on-surface-variant px-2 py-1 rounded uppercase"
      >
        MVP
      </span>
    </header>

    <main class="max-w-lg mx-auto w-full px-margin-mobile py-xl pb-3xl">
      <div class="flex items-center gap-md mb-lg">
        <img
          :src="mockProfessional.avatarUrl"
          alt=""
          class="w-12 h-12 rounded-full object-cover border border-surface-container"
        />
        <div>
          <p class="font-headline-sm text-headline-sm text-primary">
            {{ mockProfessional.firstName }}
          </p>
          <p class="font-body-sm text-body-sm text-on-surface-variant">
            {{ mockProfessional.role }} · {{ mockProfessional.specialty }}
          </p>
        </div>
      </div>

      <h1 class="font-display-lg-mobile text-display-lg-mobile text-primary mb-sm">
        Blocs métier
      </h1>
      <p class="font-body-md text-body-md text-on-surface-variant mb-xl">
        Parcours MVP démontrable, bloc par bloc. Cadre, capacité, puis besoin cliente.
      </p>

      <div
        v-if="frameworkStore.isActive"
        class="mb-lg p-md rounded-xl border border-secondary-container bg-secondary-container/30 flex flex-col gap-sm"
      >
        <div class="flex items-center justify-between gap-sm">
          <span
            class="font-label-mono text-label-mono bg-secondary-container text-on-secondary-container px-2 py-1 rounded uppercase"
          >
            Cadre ACTIF
          </span>
          <button
            type="button"
            class="font-button-text text-button-text text-secondary underline-offset-2 hover:underline"
            @click="resetFrameworkDemo"
          >
            Réinitialiser
          </button>
        </div>
        <p class="font-body-sm text-body-sm text-on-surface-variant">
          PROFESSIONAL_FRAMEWORK_ACTIVE — hérité par les capacités.
        </p>
      </div>

      <div
        v-if="hasCapacities"
        class="mb-lg p-md rounded-xl border border-surface-container bg-surface-container-low flex flex-col gap-sm"
      >
        <div class="flex items-center justify-between gap-sm">
          <span
            class="font-label-mono text-label-mono bg-surface-container text-on-surface-variant px-2 py-1 rounded uppercase"
          >
            Capacité · {{ capacityCountLabel }}
          </span>
          <button
            type="button"
            class="font-button-text text-button-text text-secondary underline-offset-2 hover:underline"
            @click="resetCapacityDemo"
          >
            Réinitialiser
          </button>
        </div>
        <p class="font-body-sm text-body-sm text-on-surface-variant">
          Persisté dans localStorage (`as.mvp.capacities`).
        </p>
        <div class="flex flex-wrap gap-sm pt-xs">
          <button
            type="button"
            class="font-button-text text-button-text bg-primary text-on-primary px-3 py-2 rounded"
            @click="goCapacityListe"
          >
            Voir mes capacités
          </button>
          <button
            type="button"
            class="font-button-text text-button-text border border-outline-variant text-primary px-3 py-2 rounded"
            @click="goCapacityStart"
          >
            Nouvelle
          </button>
        </div>
      </div>

      <div
        v-if="hasDemands"
        class="mb-lg p-md rounded-xl border border-surface-container bg-surface-container-low flex flex-col gap-sm"
      >
        <div class="flex items-center justify-between gap-sm">
          <span
            class="font-label-mono text-label-mono bg-surface-container text-on-surface-variant px-2 py-1 rounded uppercase"
          >
            Demande · {{ demandCountLabel }}
          </span>
          <button
            type="button"
            class="font-button-text text-button-text text-secondary underline-offset-2 hover:underline"
            @click="resetDemandDemo"
          >
            Réinitialiser
          </button>
        </div>
        <p class="font-body-sm text-body-sm text-on-surface-variant">
          Persisté dans localStorage (`as.mvp.demands`).
        </p>
        <div class="flex flex-wrap gap-sm pt-xs">
          <button
            type="button"
            class="font-button-text text-button-text bg-primary text-on-primary px-3 py-2 rounded"
            @click="goDemandStart"
          >
            Continuer / ouvrir
          </button>
        </div>
      </div>

      <div
        v-if="hasMatching"
        class="mb-lg p-md rounded-xl border border-surface-container bg-surface-container-low flex flex-col gap-sm"
      >
        <div class="flex items-center justify-between gap-sm">
          <span
            class="font-label-mono text-label-mono bg-surface-container text-on-surface-variant px-2 py-1 rounded uppercase"
          >
            Appariement · {{ matchingCountLabel }}
          </span>
          <button
            type="button"
            class="font-button-text text-button-text text-secondary underline-offset-2 hover:underline"
            @click="resetMatchingDemo"
          >
            Réinitialiser
          </button>
        </div>
        <p class="font-body-sm text-body-sm text-on-surface-variant">
          Persisté dans localStorage (`as.mvp.campaigns`).
        </p>
      </div>

      <div
        v-if="hasProposal"
        class="mb-lg p-md rounded-xl border border-surface-container bg-surface-container-low flex flex-col gap-sm"
      >
        <div class="flex items-center justify-between gap-sm">
          <span
            class="font-label-mono text-label-mono bg-surface-container text-on-surface-variant px-2 py-1 rounded uppercase"
          >
            Proposition · {{ proposalCountLabel }}
          </span>
          <button
            type="button"
            class="font-button-text text-button-text text-secondary underline-offset-2 hover:underline"
            @click="resetProposalDemo"
          >
            Réinitialiser
          </button>
        </div>
        <p class="font-body-sm text-body-sm text-on-surface-variant">
          Persisté dans localStorage (`as.mvp.proposals`, `as.mvp.softHolds`).
        </p>
      </div>

      <div
        v-if="hasEngagement"
        class="mb-lg p-md rounded-xl border border-surface-container bg-surface-container-low flex flex-col gap-sm"
      >
        <div class="flex items-center justify-between gap-sm">
          <span
            class="font-label-mono text-label-mono bg-surface-container text-on-surface-variant px-2 py-1 rounded uppercase"
          >
            Engagement · {{ engagementCountLabel }}
          </span>
          <button
            type="button"
            class="font-button-text text-button-text text-secondary underline-offset-2 hover:underline"
            @click="resetEngagementDemo"
          >
            Réinitialiser
          </button>
        </div>
        <p class="font-body-sm text-body-sm text-on-surface-variant">
          Persisté dans localStorage (`as.mvp.engagements`, `as.mvp.payments`,
          `as.mvp.policies`).
        </p>
      </div>

      <div
        v-if="hasAppointment"
        class="mb-lg p-md rounded-xl border border-surface-container bg-surface-container-low flex flex-col gap-sm"
      >
        <div class="flex items-center justify-between gap-sm">
          <span
            class="font-label-mono text-label-mono bg-surface-container text-on-surface-variant px-2 py-1 rounded uppercase"
          >
            RDV · {{ appointmentCountLabel }}
          </span>
          <button
            type="button"
            class="font-button-text text-button-text text-secondary underline-offset-2 hover:underline"
            @click="resetAppointmentDemo"
          >
            Réinitialiser
          </button>
        </div>
        <p class="font-body-sm text-body-sm text-on-surface-variant">
          Persisté dans localStorage (`as.mvp.appointments`, `as.mvp.prepPlans`).
        </p>
      </div>

      <div
        v-if="hasExecution"
        class="mb-lg p-md rounded-xl border border-surface-container bg-surface-container-low flex flex-col gap-sm"
      >
        <div class="flex items-center justify-between gap-sm">
          <span
            class="font-label-mono text-label-mono bg-surface-container text-on-surface-variant px-2 py-1 rounded uppercase"
          >
            Exécution · {{ executionCountLabel }}
          </span>
          <button
            type="button"
            class="font-button-text text-button-text text-secondary underline-offset-2 hover:underline"
            @click="resetExecutionDemo"
          >
            Réinitialiser
          </button>
        </div>
        <p class="font-body-sm text-body-sm text-on-surface-variant">
          Persisté dans localStorage (`as.mvp.executionEvents`, `as.mvp.executionDossier`).
        </p>
      </div>

      <ul class="flex flex-col gap-md">
        <li v-for="block in metierBlocks" :key="block.id">
          <button
            type="button"
            class="w-full text-left rounded-xl border p-lg transition-colors"
            :class="
              block.status === 'ready'
                ? 'bg-surface-container-lowest border-surface-container hover:border-outline-variant cursor-pointer'
                : 'bg-surface-container-low border-surface-container opacity-70 cursor-not-allowed'
            "
            :disabled="block.status !== 'ready'"
            @click="openBlock(block)"
          >
            <div class="flex items-start justify-between gap-md mb-sm">
              <span
                class="font-label-mono text-label-mono text-on-surface-variant uppercase tracking-wider"
              >
                {{ block.order }}
              </span>
              <span
                class="font-label-mono text-label-mono px-2 py-0.5 rounded uppercase"
                :class="
                  block.status === 'ready'
                    ? 'bg-secondary-container text-on-secondary-container'
                    : 'bg-surface-container text-on-surface-variant'
                "
              >
                {{ block.status === 'ready' ? 'Dispo' : 'Bientôt' }}
              </span>
            </div>
            <h2 class="font-headline-sm text-headline-sm text-primary mb-xs">
              {{ block.title }}
            </h2>
            <p class="font-body-sm text-body-sm text-on-surface-variant">
              {{
                block.id === 'etape-0' && hasCapacities
                  ? `Voir la liste (${capacityCountLabel}).`
                  : block.id === 'etape-1' && hasDemands
                    ? `État : ${demandCountLabel}.`
                    : block.id === 'etape-2' && hasMatching
                      ? `État : ${matchingCountLabel}.`
                      : block.id === 'etape-3' && hasProposal
                        ? `État : ${proposalCountLabel}.`
                        : block.id === 'etape-4' && hasEngagement
                          ? `État : ${engagementCountLabel}.`
                          : block.id === 'etape-5' && hasAppointment
                            ? `État : ${appointmentCountLabel}.`
                            : block.id === 'etape-6' && hasExecution
                              ? `État : ${executionCountLabel}.`
                              : block.description
              }}
            </p>
          </button>
        </li>
      </ul>
    </main>
  </div>
</template>
