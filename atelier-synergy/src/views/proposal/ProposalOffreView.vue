<script setup>
import { computed, ref, watch } from 'vue'
import { useRouter } from 'vue-router'
import { storeToRefs } from 'pinia'
import ProposalStepper from '../../components/proposal/ProposalStepper.vue'
import { useProposalStore } from '../../stores/proposal'

const router = useRouter()
const proposalStore = useProposalStore()
const { currentProposal } = storeToRefs(proposalStore)

const priceInput = ref(String(currentProposal.value?.offer?.priceTotal ?? 220))

const editorialSrc =
  'https://lh3.googleusercontent.com/aida-public/AB6AXuDCn58TXwgDrm80Az6xjF20ei1x_S9hftEVhXB6ynrfZrVbJ9NiFuwVhJqpPXq7pxm_KtafMjLNnZtgTV-6yyFHLCCQMNpfFClNyBCXjcyfbyAuaIRzM1zXh-yZ5c6pk4_69rLyqZp9y8GuA37PQJWG-Oc2WczDPWF1mqR9SRBpCVzMAzdORIIo46XnB5xrT1oxmksg3xgJZmGfgZ5ZXbInKkhYcTfZbrXEJOgfVE33YV2JB1eCw3Ns'

const offer = computed(() => currentProposal.value?.offer ?? null)
const breakdown = computed(() => offer.value?.priceBreakdown ?? {})
const priceValid = computed(() => {
  const n = Number(priceInput.value)
  return Number.isFinite(n) && n > 0
})

watch(
  () => currentProposal.value,
  (p) => {
    if (!p) {
      router.replace({ name: 'proposal-accueil' })
      return
    }
    if (!p.feasibility) {
      router.replace({ name: 'proposal-faisabilite' })
      return
    }
    priceInput.value = String(p.offer?.priceTotal ?? 220)
  },
  { immediate: true },
)

function goBack() {
  router.push({ name: 'proposal-faisabilite' })
}

function goRecap() {
  if (!priceValid.value) return
  proposalStore.updateOffer({ priceTotal: Number(priceInput.value) })
  router.push({ name: 'proposal-recap' })
}
</script>

<template>
  <div
    v-if="offer"
    class="bg-surface text-on-surface font-body-md text-body-md antialiased min-h-screen pb-32"
  >
    <header
      class="fixed top-0 w-full z-50 bg-surface border-b border-surface-container flex items-center px-margin-mobile h-16"
    >
      <button
        type="button"
        aria-label="Retour"
        class="w-10 h-10 flex items-center justify-center -ml-2 text-primary active:scale-95 transition-transform"
        @click="goBack"
      >
        <span class="material-symbols-outlined">arrow_back</span>
      </button>
      <h1 class="ml-2 font-headline-md text-headline-md font-bold tracking-tight text-primary">
        Configurer l'offre
      </h1>
    </header>

    <main class="pt-24 px-margin-mobile max-w-3xl mx-auto space-y-stack-lg">
      <div class="space-y-stack-sm">
        <span
          class="font-label-status text-label-status bg-surface-container-high text-on-surface-variant px-2 py-1 rounded-sm uppercase tracking-wider"
        >
          BROUILLON / EN ATTENTE
        </span>
        <p class="font-body-lg text-body-lg text-on-surface-variant">
          Ces éléments composeront l'offre ferme publiée à la cliente.
        </p>
      </div>

      <ProposalStepper :step="3" />

      <div
        class="w-full aspect-[4/3] relative rounded overflow-hidden border border-surface-container"
      >
        <img class="w-full h-full object-cover" alt="" :src="editorialSrc" />
      </div>

      <section class="space-y-4">
        <div
          class="p-6 bg-surface-container-lowest border border-surface-container rounded space-y-4 relative overflow-hidden"
        >
          <div class="absolute top-0 left-0 w-1 h-full bg-primary" />
          <label
            class="font-label-mono text-label-mono text-on-surface-variant uppercase tracking-wider block"
          >Prix total proposé</label>
          <div class="flex items-baseline gap-2">
            <input
              v-model="priceInput"
              class="font-headline-xl text-headline-xl text-primary bg-transparent border-b-2 border-surface-container focus:border-primary focus:ring-0 w-28 p-0 text-center font-bold font-mono"
              type="number"
              min="1"
              inputmode="decimal"
            />
            <span class="font-headline-lg text-headline-lg text-on-surface-variant font-mono">€</span>
          </div>
          <p class="font-body-sm text-body-sm text-on-surface-variant">
            Inclut prestation + fournitures de base.
          </p>
          <div class="pt-4 border-t border-surface-container flex flex-col gap-2">
            <div class="flex justify-between items-center">
              <span class="font-body-sm text-body-sm text-on-surface">Prestations</span>
              <span class="font-label-mono text-label-mono text-on-surface">
                {{ breakdown.prestation }} €
              </span>
            </div>
            <div class="flex justify-between items-center">
              <span class="font-body-sm text-body-sm text-on-surface">Fournitures</span>
              <span class="font-label-mono text-label-mono text-on-surface">
                {{ breakdown.supplies }} €
              </span>
            </div>
            <div class="flex justify-between items-center">
              <span class="font-body-sm text-body-sm text-on-surface">Préparation</span>
              <span class="font-label-mono text-label-mono text-on-surface">
                {{ breakdown.prep }} €
              </span>
            </div>
          </div>
        </div>
      </section>

      <section class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div class="p-4 bg-surface border border-surface-container rounded space-y-1">
          <div class="flex items-center gap-2 text-on-surface-variant mb-2">
            <span class="material-symbols-outlined text-[20px]">schedule</span>
            <span class="font-label-mono text-label-mono uppercase tracking-wider">Durée prévue</span>
          </div>
          <div class="font-headline-md text-headline-md text-primary font-mono">
            {{ offer.durationLabel }}
          </div>
        </div>
        <div class="p-4 bg-surface border border-surface-container rounded space-y-1">
          <div class="flex items-center gap-2 text-on-surface-variant mb-2">
            <span class="material-symbols-outlined text-[20px]">location_on</span>
            <span class="font-label-mono text-label-mono uppercase tracking-wider">Lieu</span>
          </div>
          <div class="font-body-md text-body-md text-primary font-medium">{{ offer.placeLabel }}</div>
          <div class="font-body-sm text-body-sm text-on-surface-variant">{{ offer.placeNote }}</div>
        </div>
      </section>

      <section class="space-y-3">
        <h3 class="font-label-mono text-label-mono text-on-surface-variant uppercase tracking-wider">
          Créneau
        </h3>
        <div
          class="p-4 bg-surface-container-lowest border border-primary rounded flex items-center justify-between"
        >
          <div class="flex items-center gap-3">
            <div
              class="w-10 h-10 rounded-full bg-secondary-container flex items-center justify-center text-on-secondary-container"
            >
              <span class="material-symbols-outlined">event</span>
            </div>
            <div>
              <div class="font-body-md text-body-md font-semibold text-primary">
                {{ offer.slot.dateLabel }}
              </div>
              <div class="font-body-sm text-body-sm text-on-surface-variant">
                {{ offer.slot.startTime }} – {{ offer.slot.endTime }}
              </div>
            </div>
          </div>
          <span
            class="font-label-status text-label-status bg-surface text-secondary border border-surface-container px-2 py-1 rounded-sm uppercase tracking-wider"
          >
            {{ offer.slot.availability }}
          </span>
        </div>
      </section>

      <section class="space-y-3 pb-8">
        <h3 class="font-label-mono text-label-mono text-on-surface-variant uppercase tracking-wider">
          Tâches &amp; Fournitures
        </h3>
        <ul class="space-y-3">
          <li
            v-for="task in offer.tasks"
            :key="task.id"
            class="flex items-start gap-3 p-3 bg-surface border border-surface-container rounded"
          >
            <span class="material-symbols-outlined text-on-surface-variant mt-0.5">
              {{ task.icon }}
            </span>
            <div>
              <span class="font-body-sm text-body-sm font-semibold block text-primary">
                {{ task.role }}
              </span>
              <span class="font-body-sm text-body-sm text-on-surface-variant">
                {{ task.detail }}
              </span>
            </div>
          </li>
        </ul>
      </section>
    </main>

    <div
      class="fixed bottom-0 w-full bg-surface/95 backdrop-blur-sm border-t border-surface-container p-margin-mobile z-40"
    >
      <button
        type="button"
        class="w-full bg-primary text-on-primary font-body-md text-body-md font-semibold h-14 rounded flex items-center justify-center gap-2 hover:opacity-90 active:scale-[0.98] transition-all disabled:opacity-40"
        :disabled="!priceValid"
        @click="goRecap"
      >
        <span>Voir le récapitulatif</span>
        <span class="material-symbols-outlined text-[20px]">arrow_forward</span>
      </button>
    </div>
  </div>
</template>
