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
    class="bg-surface text-on-surface font-body-md text-body-md antialiased min-h-screen pb-28"
  >
    <header
      class="sticky top-0 z-50 bg-surface border-b border-surface-container"
    >
      <div class="flex items-center px-margin-mobile h-14">
        <button
          type="button"
          aria-label="Retour"
          class="w-10 h-10 flex items-center justify-center -ml-2 text-primary active:scale-95 transition-transform"
          @click="goBack"
        >
          <span class="material-symbols-outlined">arrow_back</span>
        </button>
        <h1 class="ml-1 font-headline-md text-headline-md font-bold tracking-tight text-primary flex-1 truncate">
          Configurer l'offre
        </h1>
        <span
          class="font-label-status text-label-status bg-surface-container-high text-on-surface-variant px-2 py-1 rounded-sm uppercase tracking-wider shrink-0"
        >
          BROUILLON
        </span>
      </div>
      <div class="px-margin-mobile pb-3">
        <ProposalStepper :step="3" variant="bars" />
      </div>
    </header>

    <main class="px-margin-mobile pt-4 max-w-3xl mx-auto space-y-4">
      <p class="font-body-sm text-body-sm text-on-surface-variant">
        Ces éléments composeront l'offre ferme publiée à la cliente.
      </p>

      <section
        class="p-4 bg-surface-container-lowest border border-surface-container rounded space-y-3 relative overflow-hidden"
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
        <div class="pt-3 border-t border-surface-container flex flex-col gap-1.5">
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
      </section>

      <section class="grid grid-cols-2 gap-3">
        <div class="p-3 bg-surface border border-surface-container rounded space-y-1">
          <div class="flex items-center gap-1.5 text-on-surface-variant">
            <span class="material-symbols-outlined text-icon">schedule</span>
            <span class="font-label-mono text-label-mono uppercase tracking-wider">Durée</span>
          </div>
          <div class="font-headline-md text-headline-md text-primary font-mono">
            {{ offer.durationLabel }}
          </div>
        </div>
        <div class="p-3 bg-surface border border-surface-container rounded space-y-1">
          <div class="flex items-center gap-1.5 text-on-surface-variant">
            <span class="material-symbols-outlined text-icon">location_on</span>
            <span class="font-label-mono text-label-mono uppercase tracking-wider">Lieu</span>
          </div>
          <div class="font-body-md text-body-md text-primary font-medium">{{ offer.placeLabel }}</div>
          <div class="font-body-sm text-body-sm text-on-surface-variant leading-snug">
            {{ offer.placeNote }}
          </div>
        </div>
      </section>

      <section
        class="p-3 bg-surface-container-lowest border border-primary rounded flex items-center justify-between gap-3"
      >
        <div class="flex items-center gap-3 min-w-0">
          <div
            class="w-9 h-9 rounded-full bg-secondary-container flex items-center justify-center text-on-secondary-container shrink-0"
          >
            <span class="material-symbols-outlined text-icon-md">event</span>
          </div>
          <div class="min-w-0">
            <div class="font-label-mono text-label-mono text-on-surface-variant uppercase tracking-wider mb-0.5">
              Créneau
            </div>
            <div class="font-body-md text-body-md font-semibold text-primary truncate">
              {{ offer.slot.dateLabel }}
            </div>
            <div class="font-body-sm text-body-sm text-on-surface-variant">
              {{ offer.slot.startTime }} – {{ offer.slot.endTime }}
            </div>
          </div>
        </div>
        <span
          class="font-label-status text-label-status bg-surface text-secondary border border-surface-container px-2 py-1 rounded-sm uppercase tracking-wider shrink-0"
        >
          {{ offer.slot.availability }}
        </span>
      </section>

      <section class="space-y-2 pb-4">
        <h3 class="font-label-mono text-label-mono text-on-surface-variant uppercase tracking-wider">
          Tâches &amp; Fournitures
        </h3>
        <ul class="divide-y divide-surface-container border border-surface-container rounded overflow-hidden">
          <li
            v-for="task in offer.tasks"
            :key="task.id"
            class="flex items-start gap-3 px-3 py-2.5 bg-surface"
          >
            <span class="material-symbols-outlined text-on-surface-variant mt-0.5 text-icon-md">
              {{ task.icon }}
            </span>
            <div class="min-w-0">
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
      class="fixed bottom-0 w-full bg-surface/95 backdrop-blur-sm border-t border-surface-container px-margin-mobile py-3 z-40"
    >
      <button
        type="button"
        class="w-full bg-primary text-on-primary font-body-md text-body-md font-semibold h-12 rounded flex items-center justify-center gap-2 hover:opacity-90 active:scale-[0.98] transition-all disabled:opacity-40"
        :disabled="!priceValid"
        @click="goRecap"
      >
        <span>Voir le récapitulatif</span>
        <span class="material-symbols-outlined text-icon-md">arrow_forward</span>
      </button>
    </div>
  </div>
</template>
