<script setup>
import { computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { storeToRefs } from 'pinia'
import MatchingDemoRoleBar from '../../components/matching/MatchingDemoRoleBar.vue'
import {
  demandBudgetLine,
  demandResultLabel,
  demandZoneLine,
} from '../../domain/matching/labels'
import { CampaignStatus } from '../../domain/matching/model'
import { useMatchingStore } from '../../stores/matching'

const router = useRouter()
const matchingStore = useMatchingStore()
const { currentCampaign, acceptCount, isThresholdReached } = storeToRefs(matchingStore)

const snapshot = computed(() => currentCampaign.value?.demandSnapshot ?? null)
const inviteCount = computed(() => currentCampaign.value?.invitations?.length ?? 0)
const threshold = computed(() => currentCampaign.value?.threshold ?? 2)
const resultLabel = computed(() => demandResultLabel(snapshot.value))
const budgetLabel = computed(() => demandBudgetLine(snapshot.value))
const zoneLabel = computed(() => {
  const km = snapshot.value?.radiusKm
  return km ? `${km} km` : demandZoneLine(snapshot.value)
})
const progressPct = computed(() => {
  const t = threshold.value || 1
  const pct = (acceptCount.value / t) * 100
  return Math.max(5, Math.min(100, pct || 5))
})
const avatars = computed(() =>
  (currentCampaign.value?.invitations ?? []).map((inv) => inv.avatarUrl).filter(Boolean),
)

onMounted(() => {
  const campaign = currentCampaign.value
  if (!campaign) {
    router.replace({ name: 'matching-accueil' })
    return
  }
  if (campaign.status === CampaignStatus.SHORTLIST_READY) {
    router.replace({ name: 'matching-shortlist' })
  }
})

function goBack() {
  router.push({ name: 'home' })
}

function goSuivi() {
  router.push({ name: 'matching-suivi' })
}

function goCampagne() {
  router.push({ name: 'matching-campagne' })
}

function goDemand() {
  router.push({ name: 'demand-succes' })
}
</script>

<template>
  <div class="bg-surface text-on-surface font-body-md pb-24 min-h-screen">
    <header
      class="fixed top-0 left-0 w-full z-50 flex items-center justify-between px-margin-mobile h-16 bg-surface border-b border-outline-variant"
    >
      <button
        type="button"
        aria-label="Retour"
        class="flex items-center justify-center p-2 rounded-full hover:bg-surface-container-low transition-colors active:scale-95 text-primary"
        @click="goBack"
      >
        <span class="material-symbols-outlined">arrow_back</span>
      </button>
      <h1 class="font-headline-lg-mobile text-headline-lg-mobile font-bold text-primary">
        Matching
      </h1>
      <div class="w-10" />
    </header>

    <main class="pt-24 px-margin-mobile max-w-screen-md mx-auto">
      <MatchingDemoRoleBar class="mb-lg" />

      <div class="flex flex-col items-center text-center mb-xl">
        <div
          class="inline-flex items-center px-3 py-1 mb-md bg-secondary-fixed text-on-secondary-fixed-variant rounded font-label-mono text-label-mono uppercase tracking-widest border border-secondary-container"
        >
          <span class="w-2 h-2 rounded-full bg-secondary mr-2 animate-pulse" />
          CAMPAGNE OUVERTE
        </div>
        <h2 class="font-headline-lg-mobile text-headline-lg-mobile text-primary mb-md">
          Votre demande a été envoyée
        </h2>
        <p class="font-body-md text-body-md text-on-surface-variant max-w-md">
          {{ inviteCount }} coiffeuses ont reçu une invitation pour votre
          {{ resultLabel }}. Il faut {{ threshold }} acceptations exactes pour constituer la
          shortlist.
        </p>
      </div>

      <div
        class="bg-surface-container-lowest border border-outline-variant rounded p-lg mb-xl"
      >
        <h3
          class="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-widest mb-md"
        >
          Détails de la demande
        </h3>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-md">
          <div>
            <span class="font-label-sm text-label-sm text-on-surface-variant block mb-1">
              Résultat
            </span>
            <span class="font-body-md text-body-md text-primary font-semibold">
              {{ resultLabel }}
            </span>
          </div>
          <div>
            <span class="font-label-sm text-label-sm text-on-surface-variant block mb-1">
              Budget max
            </span>
            <span
              class="font-label-mono text-label-mono text-primary bg-surface-container-low px-2 py-1 rounded"
            >
              {{ budgetLabel }}
            </span>
          </div>
          <div>
            <span class="font-label-sm text-label-sm text-on-surface-variant block mb-1">
              Zone
            </span>
            <span class="font-body-md text-body-md text-primary">{{ zoneLabel }}</span>
          </div>
        </div>
      </div>

      <div class="mb-xl">
        <div class="flex justify-between items-end mb-sm">
          <span class="font-label-sm text-label-sm text-primary uppercase">
            Seuil d'acceptation
          </span>
          <span class="font-label-mono text-label-mono text-primary">
            {{ acceptCount }} / {{ threshold }} acceptations
          </span>
        </div>
        <div class="w-full h-2 bg-surface-container-high rounded-full overflow-hidden mb-md">
          <div
            class="h-full bg-secondary-fixed transition-all duration-1000 ease-in-out"
            :style="{ width: `${progressPct}%` }"
          />
        </div>
        <div class="flex items-center justify-between border-t border-outline-variant pt-md mt-md">
          <span class="font-body-sm text-body-sm text-on-surface-variant">
            Invitations envoyées ({{ inviteCount }})
          </span>
          <div class="flex -space-x-2">
            <img
              v-for="(src, i) in avatars"
              :key="i"
              class="w-8 h-8 rounded-full border border-surface-container-lowest object-cover"
              :src="src"
              alt=""
            />
          </div>
        </div>
      </div>

      <div class="mb-xl relative">
        <div class="absolute left-[15px] top-4 bottom-4 w-px bg-outline-variant" />
        <div class="flex items-start mb-lg relative">
          <div
            class="w-8 h-8 rounded-full bg-primary text-on-primary flex items-center justify-center shrink-0 z-10 border-2 border-surface"
          >
            <span class="material-symbols-outlined text-[16px]">check</span>
          </div>
          <div class="ml-md pt-1">
            <p class="font-body-md text-body-md text-primary font-semibold">Campagne créée</p>
          </div>
        </div>
        <div class="flex items-start mb-lg relative">
          <div
            class="w-8 h-8 rounded-full bg-primary text-on-primary flex items-center justify-center shrink-0 z-10 border-2 border-surface"
          >
            <span class="material-symbols-outlined text-[16px]">check</span>
          </div>
          <div class="ml-md pt-1">
            <p class="font-body-md text-body-md text-primary font-semibold">Vague 1 envoyée</p>
          </div>
        </div>
        <div class="flex items-start relative">
          <div
            class="w-8 h-8 rounded-full flex items-center justify-center shrink-0 z-10 border-2 border-surface"
            :class="
              isThresholdReached
                ? 'bg-primary text-on-primary'
                : 'bg-secondary-fixed text-on-secondary-fixed-variant'
            "
          >
            <span
              class="material-symbols-outlined text-[16px]"
              :class="{ 'animate-spin': !isThresholdReached }"
            >
              {{ isThresholdReached ? 'check' : 'sync' }}
            </span>
          </div>
          <div class="ml-md pt-1">
            <p class="font-body-md text-body-md text-primary font-semibold">
              {{ isThresholdReached ? 'Seuil atteint' : 'Réponses en cours' }}
            </p>
            <p
              v-if="!isThresholdReached"
              class="font-body-sm text-body-sm text-on-surface-variant mt-1"
            >
              En attente des retours coiffeuses.
            </p>
          </div>
        </div>
      </div>

      <div class="flex items-start bg-surface-container p-md rounded mb-xl">
        <span
          class="material-symbols-outlined text-outline mr-sm"
          style="font-variation-settings: 'FILL' 1"
        >
          info
        </span>
        <p class="font-body-sm text-body-sm text-on-surface-variant">
          Une acceptation est provisoire : ce n’est pas encore une réservation.
        </p>
      </div>

      <div class="flex flex-col gap-sm mt-xl mb-xl">
        <button
          type="button"
          class="w-full bg-primary text-on-primary font-label-sm text-label-sm uppercase py-4 px-gutter rounded flex items-center justify-center hover:bg-inverse-surface transition-colors"
          @click="goSuivi"
        >
          Voir le suivi
        </button>
        <button
          type="button"
          class="w-full bg-surface-container-lowest text-primary border border-outline-variant font-label-sm text-label-sm uppercase py-4 px-gutter rounded flex items-center justify-center hover:border-primary transition-colors"
          @click="goCampagne"
        >
          Voir la campagne
        </button>
        <button
          type="button"
          class="w-full bg-surface-container-lowest text-primary border border-outline-variant font-label-sm text-label-sm uppercase py-4 px-gutter rounded flex items-center justify-center hover:border-primary transition-colors"
          @click="goDemand"
        >
          Voir ma demande
        </button>
      </div>
    </main>
  </div>
</template>
