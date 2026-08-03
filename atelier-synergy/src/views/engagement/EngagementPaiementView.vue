<script setup>
import { computed, onMounted } from 'vue'
import { storeToRefs } from 'pinia'
import { useRouter } from 'vue-router'
import EngagementStepper from '../../components/engagement/EngagementStepper.vue'
import { EngagementStatus } from '../../domain/engagement/model'
import { ENGAGEMENT_HERO_PAYMENT } from '../../mocks/engagementSeed'
import { useEngagementStore } from '../../stores/engagement'

const router = useRouter()
const engagementStore = useEngagementStore()
const { currentEngagement } = storeToRefs(engagementStore)

const heroSrc = ENGAGEMENT_HERO_PAYMENT

onMounted(() => {
  const engagement = currentEngagement.value
  if (!engagement) {
    router.replace({ name: 'engagement-accueil' })
    return
  }
  if (engagement.status === EngagementStatus.COMMITTED) {
    router.replace({ name: 'engagement-confirmation' })
  }
})

const deposit = computed(() => currentEngagement.value?.depositAmount ?? 0)
const total = computed(() => currentEngagement.value?.priceTotal ?? 0)
const balance = computed(() => currentEngagement.value?.balanceAmount ?? 0)

function goBack() {
  router.push({ name: 'engagement-consentements' })
}

function simulate() {
  const committed = engagementStore.simulatePaymentSuccess()
  if (!committed) return
  router.push({ name: 'engagement-confirmation' })
}

function cancel() {
  router.push({ name: 'engagement-accueil' })
}
</script>

<template>
  <div class="bg-background text-on-background min-h-screen flex flex-col relative pb-40">
    <header
      class="bg-surface sticky top-0 z-40 border-b border-surface-container flex justify-between items-center w-full px-container-margin py-stack-md"
    >
      <button
        type="button"
        aria-label="Retour"
        class="text-on-surface-variant hover:opacity-80 transition-opacity flex items-center justify-center p-2 -ml-2"
        @click="goBack"
      >
        <span class="material-symbols-outlined">arrow_back</span>
      </button>
      <h1 class="font-headline-sm text-headline-sm text-primary font-semibold text-center flex-1">
        Paiement (démo)
      </h1>
      <span
        class="font-label-technical text-label-technical bg-secondary-container text-on-secondary-container px-2 py-1 rounded-sm uppercase tracking-wider shrink-0"
      >
        AWAITING_PAYMENT
      </span>
    </header>

    <main
      class="flex-1 px-container-margin pt-stack-lg pb-section-gap flex flex-col gap-stack-lg w-full"
    >
      <EngagementStepper :step="3" />

      <div class="inline-flex items-center self-start">
        <span
          class="font-label-technical text-label-technical bg-secondary-container text-on-secondary-container px-3 py-1.5 rounded-sm tracking-widest border border-secondary-container/20"
        >
          AWAITING_PAYMENT
        </span>
      </div>

      <div
        class="bg-surface-container-low border border-primary p-stack-md rounded flex items-start gap-stack-sm"
      >
        <span class="material-symbols-outlined text-primary mt-1">info</span>
        <p class="font-body-sm text-body-sm text-on-surface">
          <strong>MODE DÉMO</strong> — Aucun paiement réel. Aucune carte bancaire n’est collectée.
        </p>
      </div>

      <section
        class="flex flex-col items-center justify-center py-section-gap border-b border-surface-container"
      >
        <h2
          class="font-display-lg-mobile text-display-lg-mobile text-primary font-label-technical"
        >
          {{ deposit }} €
        </h2>
        <p class="font-body-sm text-body-sm text-on-surface-variant mt-unit">Acompte à simuler</p>
        <p class="font-label-caps text-label-caps text-on-surface-variant mt-stack-md text-center">
          Sur un total de {{ total }} € · solde {{ balance }} € le jour J
        </p>
      </section>

      <p class="font-body-lg text-body-lg text-on-surface leading-relaxed">
        En simulant le succès, l’engagement passe à
        <span
          class="font-label-technical text-label-technical bg-surface-container px-1 rounded-sm"
        >COMMITTED</span>
        et le créneau soft-hold devient
        <span
          class="font-label-technical text-label-technical bg-surface-container px-1 rounded-sm"
        >BOOKED</span>.
      </p>

      <div class="w-full h-28 rounded-lg overflow-hidden border border-surface-container">
        <img alt="" class="w-full h-full object-cover" :src="heroSrc" />
      </div>
    </main>

    <nav
      class="fixed bottom-0 left-0 w-full z-50 flex flex-col gap-stack-sm px-container-margin pb-container-margin pt-stack-md bg-surface border-t border-surface-container"
    >
      <p
        class="font-label-caps text-label-caps text-on-surface-variant text-center mb-stack-sm w-full opacity-70"
      >
        Aucun prélèvement · aucun prestataire de paiement
      </p>
      <button
        type="button"
        class="bg-primary text-on-primary rounded-lg w-full flex items-center justify-center py-stack-md hover:brightness-110 active:scale-[0.98] transition-transform font-body-lg text-body-lg"
        @click="simulate"
      >
        Simuler le succès
        <span class="material-symbols-outlined ml-2">arrow_forward</span>
      </button>
      <button
        type="button"
        class="text-on-surface w-full flex items-center justify-center py-stack-md border border-primary rounded-lg hover:bg-surface-container-low active:scale-[0.98] transition-transform font-body-lg text-body-lg"
        @click="cancel"
      >
        Annuler
        <span class="material-symbols-outlined ml-2">close</span>
      </button>
    </nav>
  </div>
</template>
