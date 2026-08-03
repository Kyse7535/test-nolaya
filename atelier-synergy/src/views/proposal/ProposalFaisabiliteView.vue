<script setup>
import { computed, ref, watch } from 'vue'
import { useRouter } from 'vue-router'
import { storeToRefs } from 'pinia'
import ProposalStepper from '../../components/proposal/ProposalStepper.vue'
import { demandReminderLine } from '../../domain/proposal/labels'
import { FeasibilityDecision } from '../../domain/proposal/model'
import { useProposalStore } from '../../stores/proposal'
import { mockProfessional } from '../../mocks/platform'

const router = useRouter()
const proposalStore = useProposalStore()
const { currentProposal } = storeToRefs(proposalStore)

const decision = ref(currentProposal.value?.feasibility || FeasibilityDecision.EXACT)
const note = ref(currentProposal.value?.feasibilityNote || '')

const heroSrc =
  'https://lh3.googleusercontent.com/aida-public/AB6AXuBiYHWtdTZpYuxRqyQLmVbZeIFitdiKjeGbiEhhhOTtzHFfjDIOC8k03Z5s1Ay3Bt3DydFwMjKMVbuRognaLfHA3z5tBXBRem_Jm7tUtR0mESzJfkY6UV9m8kEW00y9dOk7ZcaQNNq0hmn5n8IG9KAgttomrJJWW_AljldqKQG7v8q5IqixeYLMtGUfeKAiBWkhIUCD9lA6XBuXscPbzSV4mr3meaysmwoh-eC_LIfytQmOlNkVXn6f'

const reminder = computed(() =>
  demandReminderLine(currentProposal.value?.frozenBrief),
)
const showVariantNote = computed(() => decision.value === FeasibilityDecision.VARIANT)
const canContinue = computed(
  () =>
    decision.value === FeasibilityDecision.EXACT ||
    decision.value === FeasibilityDecision.VARIANT,
)

watch(
  () => currentProposal.value,
  (p) => {
    if (!p) {
      router.replace({ name: 'proposal-accueil' })
      return
    }
    if (p.feasibility) decision.value = p.feasibility
    if (p.feasibilityNote) note.value = p.feasibilityNote
  },
  { immediate: true },
)

function goBack() {
  router.push({ name: 'proposal-synthese' })
}

function continueToOffer() {
  if (!canContinue.value) return
  proposalStore.setFeasibility(
    decision.value,
    decision.value === FeasibilityDecision.VARIANT ? note.value : null,
  )
  router.push({ name: 'proposal-offre' })
}
</script>

<template>
  <div class="bg-background text-on-background font-body-md min-h-screen pb-28">
    <header
      class="bg-surface border-b border-surface-container flex items-center justify-between px-margin-mobile w-full h-16 z-50 sticky top-0"
    >
      <button
        type="button"
        aria-label="Retour"
        class="hover:bg-surface-container-low transition-colors active:opacity-80 p-2 -ml-2 rounded-full flex items-center justify-center"
        @click="goBack"
      >
        <span class="material-symbols-outlined text-primary text-icon-lg">arrow_back</span>
      </button>
      <div class="font-headline-md text-headline-md font-bold text-primary">
        Nolaya
      </div>
      <div class="w-8 h-8 rounded-full overflow-hidden border border-surface-container-highest">
        <img
          alt=""
          class="w-full h-full object-cover"
          :src="mockProfessional.avatarUrl"
        />
      </div>
    </header>

    <div class="w-full h-32 md:h-40 bg-surface-container-low relative">
      <img alt="" class="w-full h-full object-cover absolute inset-0" :src="heroSrc" />
      <div class="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />
    </div>

    <main
      class="px-margin-mobile max-w-4xl mx-auto -mt-6 relative z-10 space-y-4"
    >
      <div class="flex flex-col gap-stack-sm">
        <div class="flex items-center justify-between gap-2 flex-wrap">
          <span
            class="font-label-status text-label-status bg-surface-bright text-secondary border border-surface-container px-3 py-1 rounded flex items-center gap-2 tracking-wider"
          >
            <span class="w-2 h-2 rounded-full bg-secondary" />
            EN ATTENTE (PROPOSAL_PENDING)
          </span>
          <ProposalStepper :step="2" variant="bars" class="w-36" />
        </div>
        <div class="mt-4">
          <h1 class="font-headline-lg-mobile text-headline-lg-mobile text-primary mb-2">
            Décision de faisabilité
          </h1>
          <p class="font-body-lg text-body-lg text-on-surface-variant max-w-xl">
            Confirmez explicitement que vous pouvez répondre à cette demande.
          </p>
        </div>
      </div>

      <div
        class="bg-surface border border-surface-container rounded p-4 flex items-center gap-4"
      >
        <div
          class="w-12 h-12 rounded-full bg-surface-container-low flex items-center justify-center shrink-0"
        >
          <span class="material-symbols-outlined text-on-surface-variant">cut</span>
        </div>
        <div class="flex flex-col">
          <span
            class="font-body-sm text-body-sm text-on-surface-variant uppercase tracking-wider"
          >Rappel de la demande</span>
          <span class="font-body-md text-body-md text-primary mt-1">{{ reminder }}</span>
        </div>
      </div>

      <div class="space-y-stack-md">
        <label class="block cursor-pointer">
          <input
            v-model="decision"
            class="peer sr-only"
            type="radio"
            :value="FeasibilityDecision.EXACT"
          />
          <div
            class="bg-surface border border-surface-container peer-checked:border-primary peer-checked:bg-surface-bright p-5 rounded transition-all flex items-start gap-4 hover:border-outline-variant"
          >
            <div
              class="mt-1 flex items-center justify-center w-5 h-5 rounded-full border border-outline"
              :class="decision === FeasibilityDecision.EXACT ? 'border-primary' : ''"
            >
              <div
                class="w-2.5 h-2.5 rounded-full bg-primary transition-opacity"
                :class="decision === FeasibilityDecision.EXACT ? 'opacity-100' : 'opacity-0'"
              />
            </div>
            <div>
              <span class="block font-headline-md text-headline-md text-primary">Faisable exactement</span>
              <span class="block font-body-sm text-body-sm text-on-surface-variant mt-1">
                Je respecte la demande telle qu’exprimée.
              </span>
            </div>
          </div>
        </label>

        <label class="block cursor-pointer">
          <input
            v-model="decision"
            class="peer sr-only"
            type="radio"
            :value="FeasibilityDecision.VARIANT"
          />
          <div
            class="bg-surface border border-surface-container peer-checked:border-primary peer-checked:bg-surface-bright p-5 rounded transition-all flex items-start gap-4 hover:border-outline-variant"
          >
            <div
              class="mt-1 flex items-center justify-center w-5 h-5 rounded-full border border-outline"
              :class="decision === FeasibilityDecision.VARIANT ? 'border-primary' : ''"
            >
              <div
                class="w-2.5 h-2.5 rounded-full bg-primary transition-opacity"
                :class="decision === FeasibilityDecision.VARIANT ? 'opacity-100' : 'opacity-0'"
              />
            </div>
            <div class="flex-col w-full">
              <span class="block font-headline-md text-headline-md text-primary">
                Faisable avec une variante
              </span>
              <span class="block font-body-sm text-body-sm text-on-surface-variant mt-1">
                J’adapte un élément (technique, longueur, horaire…). La cliente verra la différence.
              </span>
              <div v-if="showVariantNote" class="mt-4">
                <label
                  class="block font-label-mono text-label-mono text-on-surface-variant opacity-60 mb-2"
                >Ce qui change (optionnel)</label>
                <textarea
                  v-model="note"
                  class="w-full bg-transparent border border-surface-container rounded p-3 font-body-md text-body-md text-primary placeholder:text-outline-variant focus:border-primary focus:ring-0 transition-colors"
                  placeholder="Ex. Longueur légèrement plus courte pour respecter le budget"
                  rows="2"
                />
              </div>
            </div>
          </div>
        </label>
      </div>

      <p class="font-body-sm text-body-sm text-on-surface-variant opacity-70 italic text-center pb-4">
        Refus et demande de précision non disponibles dans cette démo.
      </p>
    </main>

    <div
      class="fixed bottom-0 w-full p-margin-mobile z-40 flex justify-center pb-4"
    >
      <button
        type="button"
        class="w-full md:max-w-md bg-primary text-on-primary font-body-md text-body-md font-semibold py-4 rounded hover:opacity-90 transition-colors flex items-center justify-center gap-2 disabled:opacity-40"
        :disabled="!canContinue"
        @click="continueToOffer"
      >
        Configurer l’offre
        <span class="material-symbols-outlined text-icon">arrow_forward</span>
      </button>
    </div>
  </div>
</template>
