<script setup>
import { computed } from 'vue'
import { storeToRefs } from 'pinia'
import { useRouter } from 'vue-router'
import { ENGAGEMENT_HERO_CONFIRM_PRO } from '../../mocks/engagementSeed'
import { useAppointmentStore } from '../../stores/appointment'
import { useEngagementStore } from '../../stores/engagement'
import { useProposalStore } from '../../stores/proposal'

const router = useRouter()
const engagementStore = useEngagementStore()
const appointmentStore = useAppointmentStore()
const proposalStore = useProposalStore()
const { currentEngagement, currentPayment } = storeToRefs(engagementStore)

const heroSrc = ENGAGEMENT_HERO_CONFIRM_PRO
const engagement = computed(() => currentEngagement.value)

const clientName = computed(() => engagement.value?.clientDisplayName || 'La cliente')

const dateLine = computed(() => engagement.value?.dateLabel || '—')
const timeLine = computed(() => {
  const e = engagement.value
  if (!e?.startTime) return ''
  return e.endTime ? `${e.startTime} – ${e.endTime}` : e.startTime
})

const serviceShort = computed(() => {
  const label = engagement.value?.serviceLabel || 'Prestation'
  if (label.toLowerCase().includes('vanille')) return 'Vanilles mi-longues'
  return label
})

const priceTotal = computed(() => engagement.value?.priceTotal ?? 0)
const deposit = computed(
  () => currentPayment.value?.amount ?? engagement.value?.depositAmount ?? 0,
)

function goClose() {
  router.push({ name: 'home' })
}

function goAppointment() {
  appointmentStore.ensureDemoSeed()
  router.push({ name: 'appointment-accueil' })
}

function goOffer() {
  if (proposalStore.currentProposal) {
    router.push({ name: 'proposal-succes' })
    return
  }
  router.push({ name: 'home' })
}
</script>

<template>
  <div
    v-if="engagement"
    class="bg-background text-on-background antialiased min-h-screen flex flex-col"
  >
    <header
      class="fixed top-0 left-0 w-full z-50 flex justify-between items-center px-container-margin h-16 bg-surface border-b border-surface-variant"
    >
      <button
        type="button"
        aria-label="Fermer"
        class="flex items-center justify-center p-2 -ml-2 text-primary hover:bg-surface-container-low transition-colors rounded-full"
        @click="goClose"
      >
        <span class="material-symbols-outlined">close</span>
      </button>
      <span class="font-headline-sm text-headline-sm text-primary">Engagement confirmé</span>
      <div class="w-10" />
    </header>

    <main class="flex-1 px-container-margin pt-[80px] pb-section-gap flex flex-col">
      <div
        class="w-full aspect-[4/5] mt-stack-sm rounded-lg overflow-hidden border border-surface-variant bg-surface-container-lowest"
      >
        <img alt="" class="w-full h-full object-cover" :src="heroSrc" />
      </div>

      <div class="mt-stack-lg flex flex-col items-start gap-stack-sm">
        <div
          class="bg-surface-container-high px-4 py-2 rounded-full border border-outline-variant inline-flex items-center"
        >
          <span class="font-label-caps text-label-caps text-primary tracking-widest uppercase">
            ENGAGÉ
          </span>
        </div>
        <p
          class="font-label-technical text-label-technical text-on-surface-variant uppercase tracking-wider"
        >
          COMMITTED · BOOKED
        </p>
      </div>

      <div class="mt-stack-md">
        <h1 class="font-display-lg-mobile text-display-lg-mobile text-primary">
          Engagement formé
        </h1>
        <p class="font-body-lg text-body-lg text-on-surface-variant mt-stack-md">
          {{ clientName }} a accepté votre offre et simulé l’acompte. Le créneau est passé de
          soft-hold à réservation ferme.
        </p>
      </div>

      <div
        class="mt-stack-lg border border-primary bg-surface p-stack-md flex flex-col gap-stack-sm relative"
      >
        <div class="absolute top-0 left-0 w-1 h-full bg-secondary-container" />
        <div class="flex justify-between items-start border-b border-surface-variant pb-stack-sm pl-2">
          <span class="font-body-sm text-body-sm text-on-surface-variant">Date &amp; Heure</span>
          <span class="font-body-sm text-body-sm text-primary text-right">
            {{ dateLine }}
            <template v-if="timeLine"><br />{{ timeLine }}</template>
          </span>
        </div>
        <div
          class="flex justify-between items-center border-b border-surface-variant py-stack-sm pl-2"
        >
          <span class="font-body-sm text-body-sm text-on-surface-variant">Prestation</span>
          <span class="font-body-sm text-body-sm text-primary">{{ serviceShort }}</span>
        </div>
        <div
          class="flex justify-between items-center border-b border-surface-variant py-stack-sm pl-2"
        >
          <span class="font-body-sm text-body-sm text-on-surface-variant">Total</span>
          <span class="font-body-sm text-body-sm text-primary">{{ priceTotal }} €</span>
        </div>
        <div class="flex justify-between items-center pt-stack-sm pl-2">
          <span class="font-body-sm text-body-sm text-on-surface-variant">Acompte (mock)</span>
          <span
            class="font-label-technical text-label-technical text-primary bg-surface-container-low px-2 py-1 rounded"
          >
            {{ deposit }} €
          </span>
        </div>
      </div>

      <div class="mt-section-gap flex flex-col gap-stack-md mt-auto pt-stack-lg">
        <p class="font-body-sm text-body-sm text-on-surface-variant text-center px-4">
          Aucune re-validation requise de votre côté.
        </p>
        <button
          type="button"
          class="w-full bg-primary-container hover:bg-tertiary transition-colors duration-200 text-on-primary py-4 px-6 border border-primary-container font-headline-sm text-headline-sm flex items-center justify-center gap-2 active:scale-[0.98]"
          @click="goAppointment"
        >
          <span class="material-symbols-outlined">content_cut</span>
          Préparer le rendez-vous
        </button>
        <button
          type="button"
          class="w-full bg-transparent hover:bg-surface-container-low transition-colors duration-200 text-primary py-4 px-6 border border-primary font-headline-sm text-headline-sm flex items-center justify-center gap-2 active:scale-[0.98]"
          @click="goOffer"
        >
          <span class="material-symbols-outlined">visibility</span>
          Voir l’offre
        </button>
      </div>
    </main>
  </div>
</template>
