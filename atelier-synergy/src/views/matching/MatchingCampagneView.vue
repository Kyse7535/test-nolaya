<script setup>
import { computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { storeToRefs } from 'pinia'
import MatchingDemoRoleBar from '../../components/matching/MatchingDemoRoleBar.vue'
import { campaignStatusChip, poolWaveLabel } from '../../domain/matching/labels'
import { CampaignStatus } from '../../domain/matching/model'
import { useMatchingStore } from '../../stores/matching'

const router = useRouter()
const matchingStore = useMatchingStore()
const { currentCampaign } = storeToRefs(matchingStore)

const pool = computed(() => currentCampaign.value?.pool ?? [])
const statusChip = computed(() =>
  campaignStatusChip(currentCampaign.value?.status ?? CampaignStatus.OPEN),
)

onMounted(() => {
  if (!currentCampaign.value) {
    router.replace({ name: 'matching-accueil' })
  }
})

function goBack() {
  router.push({ name: 'matching-lance' })
}

function goSuivi() {
  router.push({ name: 'matching-suivi' })
}

function initial(name) {
  return (name || '?').charAt(0).toUpperCase()
}
</script>

<template>
  <div
    class="bg-surface text-on-surface font-body-md antialiased pb-32 min-h-screen selection:bg-secondary-container selection:text-on-secondary-container"
  >
    <header
      class="fixed top-0 w-full z-50 border-b border-outline-variant bg-surface flex items-center justify-between px-margin-mobile h-16 max-w-screen-xl mx-auto"
    >
      <button
        type="button"
        aria-label="Retour"
        class="text-primary hover:bg-surface-container-low transition-colors p-2 rounded-full flex items-center justify-center active:opacity-70"
        @click="goBack"
      >
        <span class="material-symbols-outlined">arrow_back</span>
      </button>
      <h1
        class="font-headline-lg-mobile text-headline-lg-mobile tracking-tight text-primary uppercase"
      >
        Atelier Synergy
      </h1>
      <div class="w-10" />
    </header>

    <main class="pt-24 px-margin-mobile max-w-screen-md mx-auto">
      <MatchingDemoRoleBar class="mb-lg" />

      <section class="mb-xl">
        <div class="flex items-center gap-sm mb-4">
          <span
            class="font-label-mono text-label-mono bg-secondary-container text-on-secondary-container px-2 py-1 rounded"
          >
            {{ statusChip }}
          </span>
          <span class="font-label-mono text-label-mono text-on-surface-variant">
            {{ currentCampaign?.status }}
          </span>
        </div>
        <h2 class="font-headline-md text-headline-md text-primary mb-2">
          Campagne de matching
        </h2>
        <p class="font-body-md text-body-md text-on-surface-variant max-w-prose">
          Vivier et vague 1 préremplis automatiquement pour la démo.
        </p>
      </section>

      <section
        class="bg-surface-container-lowest border border-outline-variant rounded-lg p-lg mb-xl"
      >
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div class="flex flex-col">
            <span
              class="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wide mb-1"
            >
              Mode
            </span>
            <span class="font-body-md text-body-md font-medium text-primary">Résultat</span>
          </div>
          <div class="flex flex-col">
            <span
              class="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wide mb-1"
            >
              Seuil
            </span>
            <span class="font-body-md text-body-md font-medium text-primary">
              {{ currentCampaign?.threshold ?? 2 }} acceptations exactes
            </span>
          </div>
          <div class="flex flex-col">
            <span
              class="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wide mb-1"
            >
              Délai indicatif
            </span>
            <span class="font-body-md text-body-md font-medium text-primary">
              {{ currentCampaign?.delayLabel ?? '24 h (mock)' }}
            </span>
          </div>
        </div>
      </section>

      <section class="mb-xl">
        <h3 class="font-headline-md text-headline-md text-primary mb-6">
          Vivier éligible ({{ pool.length }})
        </h3>
        <div class="flex flex-col border-t border-outline-variant">
          <div
            v-for="entry in pool"
            :key="entry.capacityId"
            class="py-md border-b border-outline-variant flex items-start gap-4"
            :class="{ 'opacity-75': entry.wave !== 1 }"
          >
            <img
              v-if="entry.avatarUrl"
              class="w-12 h-12 rounded-full object-cover shrink-0 mt-1"
              :src="entry.avatarUrl"
              alt=""
            />
            <div
              v-else
              class="w-12 h-12 rounded-full bg-surface-container-high flex items-center justify-center shrink-0 mt-1"
            >
              <span class="font-headline-md text-headline-md text-on-surface-variant">
                {{ initial(entry.displayName) }}
              </span>
            </div>
            <div class="flex-1 min-w-0">
              <div class="flex items-center justify-between mb-1">
                <span
                  class="font-label-sm text-label-sm uppercase tracking-wider"
                  :class="entry.wave === 1 ? 'text-secondary' : 'text-on-surface-variant'"
                >
                  {{ poolWaveLabel(entry.wave) }}
                </span>
                <span
                  v-if="entry.wave === 1"
                  class="font-label-mono text-label-mono bg-surface-container-high text-on-surface-variant px-1.5 py-0.5 rounded"
                >
                  OPEN
                </span>
              </div>
              <div class="flex items-center justify-between">
                <h4 class="font-body-md text-body-md font-medium text-primary truncate pr-2">
                  {{ entry.displayName }}
                </h4>
                <span class="font-label-mono text-label-mono text-on-surface-variant shrink-0">
                  {{ entry.distanceKm }} km
                </span>
              </div>
              <p class="font-body-sm text-body-sm text-on-surface-variant truncate">
                {{ entry.styleDetail || entry.styleTag }}
              </p>
            </div>
          </div>
        </div>
      </section>

      <p class="font-body-sm text-body-sm text-on-surface-variant text-center mt-xl mb-xl italic">
        Aucune décision opérateur. Pas d’élargissement dans ce parcours.
      </p>
    </main>

    <div
      class="fixed bottom-0 left-0 w-full px-margin-mobile py-4 bg-surface/90 backdrop-blur-md border-t border-outline-variant z-40 flex justify-center"
    >
      <button
        type="button"
        class="w-full max-w-md bg-primary text-on-primary font-body-lg text-body-lg h-[56px] rounded flex items-center justify-center hover:bg-inverse-surface transition-colors"
        @click="goSuivi"
      >
        Voir le suivi des réponses
      </button>
    </div>
  </div>
</template>
