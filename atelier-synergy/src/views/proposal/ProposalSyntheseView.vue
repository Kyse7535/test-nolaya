<script setup>
import { computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { storeToRefs } from 'pinia'
import ProposalStepper from '../../components/proposal/ProposalStepper.vue'
import { budgetRangeLabel, proposalStatusBadge } from '../../domain/proposal/labels'
import { useProposalStore } from '../../stores/proposal'

const router = useRouter()
const proposalStore = useProposalStore()
const { currentProposal } = storeToRefs(proposalStore)

const brief = computed(() => currentProposal.value?.frozenBrief ?? null)
const badge = computed(() =>
  proposalStatusBadge(currentProposal.value?.status),
)
const budgetLabel = computed(() => budgetRangeLabel(brief.value))
const gallery = computed(() => brief.value?.galleryUrls ?? [])

onMounted(() => {
  if (!currentProposal.value) {
    router.replace({ name: 'proposal-accueil' })
  }
})

function goBack() {
  router.push({ name: 'proposal-accueil' })
}

function continueToFeasibility() {
  router.push({ name: 'proposal-faisabilite' })
}
</script>

<template>
  <div class="bg-background text-on-background antialiased min-h-screen pb-32">
    <header
      class="fixed top-0 left-0 w-full z-50 flex items-center px-margin-mobile h-16 bg-surface border-b border-surface-container"
    >
      <button
        type="button"
        aria-label="Retour"
        class="mr-4 text-on-surface-variant hover:opacity-80 transition-opacity"
        @click="goBack"
      >
        <span class="material-symbols-outlined">arrow_back</span>
      </button>
      <h1
        class="font-headline-md text-headline-md text-primary uppercase tracking-tighter truncate flex-1"
      >
        Synthèse décisionnelle
      </h1>
      <div
        class="ml-4 px-2 py-1 bg-secondary-container rounded-sm flex items-center justify-center"
      >
        <span class="font-label-mono text-label-mono text-on-secondary-container uppercase">
          {{ badge }}
        </span>
      </div>
    </header>

    <main
      v-if="brief"
      class="pt-24 px-margin-mobile max-w-3xl mx-auto space-y-stack-lg"
    >
      <ProposalStepper :step="1" />

      <section class="flex flex-col space-y-stack-sm border-b border-surface-container pb-stack-md">
        <div class="flex items-center space-x-4 mb-2">
          <img
            :alt="brief.clientName"
            class="w-12 h-12 rounded-full object-cover border border-surface-container"
            :src="brief.clientAvatarUrl"
          />
          <div>
            <h2 class="font-headline-md text-headline-md text-on-surface">
              {{ brief.clientName }}
            </h2>
            <span class="font-label-mono text-label-mono text-on-surface-variant">
              {{ brief.clientRole }}
            </span>
          </div>
        </div>
        <p
          class="font-body-md text-body-md text-on-surface-variant bg-surface-container-low p-4 rounded border border-surface-container italic"
        >
          Ces éléments sont figés. Ils servent de base à votre offre — pas de négociation ici.
        </p>
      </section>

      <section class="grid grid-cols-1 md:grid-cols-2 gap-gutter">
        <div
          class="bg-surface-container-lowest p-5 rounded border border-surface-container flex flex-col space-y-2"
        >
          <span
            class="font-label-mono text-label-mono text-on-surface-variant opacity-80 uppercase tracking-widest flex items-center gap-2"
          >
            <span class="material-symbols-outlined text-[16px]">style</span>
            Prestation
          </span>
          <p class="font-body-lg text-body-lg text-on-surface">{{ brief.prestationLabel }}</p>
        </div>
        <div
          class="bg-surface-container-lowest p-5 rounded border border-surface-container flex flex-col space-y-2"
        >
          <span
            class="font-label-mono text-label-mono text-on-surface-variant opacity-80 uppercase tracking-widest flex items-center gap-2"
          >
            <span class="material-symbols-outlined text-[16px]">psychology</span>
            Résultat attendu
          </span>
          <p class="font-body-md text-body-md text-on-surface">{{ brief.resultExpected }}</p>
        </div>
        <div
          class="bg-surface-container-lowest p-5 rounded border border-surface-container flex flex-col space-y-2"
        >
          <span
            class="font-label-mono text-label-mono text-on-surface-variant opacity-80 uppercase tracking-widest flex items-center gap-2"
          >
            <span class="material-symbols-outlined text-[16px]">payments</span>
            Budget indicatif
          </span>
          <p class="font-body-lg text-body-lg text-on-surface">{{ budgetLabel }}</p>
        </div>
        <div
          class="bg-surface-container-lowest p-5 rounded border border-surface-container flex flex-col space-y-2"
        >
          <span
            class="font-label-mono text-label-mono text-on-surface-variant opacity-80 uppercase tracking-widest flex items-center gap-2"
          >
            <span class="material-symbols-outlined text-[16px]">warning</span>
            Contraintes
          </span>
          <div class="flex flex-wrap gap-2 mt-1">
            <span
              v-for="tag in brief.constraints"
              :key="tag"
              class="inline-flex items-center px-2 py-1 rounded bg-surface-container-low border border-surface-container font-label-mono text-label-mono text-on-surface-variant"
            >
              {{ tag }}
            </span>
          </div>
        </div>
        <div
          class="bg-surface-container-lowest p-5 rounded border border-surface-container flex flex-col space-y-2"
        >
          <span
            class="font-label-mono text-label-mono text-on-surface-variant opacity-80 uppercase tracking-widest flex items-center gap-2"
          >
            <span class="material-symbols-outlined text-[16px]">location_on</span>
            Lieu souhaité
          </span>
          <p class="font-body-md text-body-md text-on-surface">{{ brief.placeDesired }}</p>
        </div>
        <div
          class="bg-surface-container-lowest p-5 rounded border border-surface-container flex flex-col space-y-2"
        >
          <span
            class="font-label-mono text-label-mono text-on-surface-variant opacity-80 uppercase tracking-widest flex items-center gap-2"
          >
            <span class="material-symbols-outlined text-[16px]">calendar_month</span>
            Créneau préféré
          </span>
          <p class="font-body-md text-body-md text-on-surface">{{ brief.preferredSlot }}</p>
        </div>
      </section>

      <section class="space-y-4 pt-stack-sm border-t border-surface-container">
        <h3
          class="font-label-mono text-label-mono text-on-surface-variant uppercase tracking-widest flex justify-between items-end"
        >
          Références de la capacité
          <span class="text-[10px] lowercase text-outline">Galerie prestation — lecture seule</span>
        </h3>
        <div class="flex overflow-x-auto space-x-gutter pb-4 snap-x">
          <div
            v-for="(url, i) in gallery"
            :key="i"
            class="snap-start flex-none w-[200px] aspect-[4/5] rounded border border-surface-container overflow-hidden relative"
          >
            <img class="w-full h-full object-cover" alt="" :src="url" />
          </div>
        </div>
      </section>
    </main>

    <div
      class="fixed bottom-0 left-0 w-full z-40 bg-surface/95 backdrop-blur-sm border-t border-surface-container p-margin-mobile flex flex-col items-center justify-center"
    >
      <span class="font-body-sm text-body-sm text-outline mb-3 italic">
        Aucune demande de précision dans cette démo.
      </span>
      <button
        type="button"
        class="w-full max-w-md bg-primary-container text-on-primary py-4 px-6 rounded font-body-lg font-medium hover:opacity-90 transition-opacity flex items-center justify-center space-x-2"
        @click="continueToFeasibility"
      >
        <span>Continuer vers la faisabilité</span>
        <span class="material-symbols-outlined">arrow_forward</span>
      </button>
    </div>
  </div>
</template>
