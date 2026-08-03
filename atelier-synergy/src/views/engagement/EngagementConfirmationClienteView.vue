<script setup>
import { computed } from 'vue'
import { storeToRefs } from 'pinia'
import { useRouter } from 'vue-router'
import { DemoRole } from '../../domain/demoRole'
import { ENGAGEMENT_HERO_CONFIRM_CLIENT } from '../../mocks/engagementSeed'
import { useAppointmentStore } from '../../stores/appointment'
import { useDemoRoleStore } from '../../stores/demoRole'
import { useEngagementStore } from '../../stores/engagement'

const router = useRouter()
const engagementStore = useEngagementStore()
const appointmentStore = useAppointmentStore()
const demoRoleStore = useDemoRoleStore()
const { currentEngagement, currentPayment } = storeToRefs(engagementStore)

const heroSrc = ENGAGEMENT_HERO_CONFIRM_CLIENT
const engagement = computed(() => currentEngagement.value)

const slotLine = computed(() => {
  const e = engagement.value
  if (!e?.dateLabel) return '—'
  const time = e.startTime || ''
  return time ? `${e.dateLabel} · ${time}` : e.dateLabel
})

const deposit = computed(
  () => currentPayment.value?.amount ?? engagement.value?.depositAmount ?? 0,
)

const proName = computed(() => engagement.value?.proDisplayName || 'Coiffeuse')

function goAppointment() {
  appointmentStore.ensureDemoSeed()
  router.push({ name: 'appointment-accueil' })
}

function goPro() {
  demoRoleStore.setDemoRole(DemoRole.PRO)
  router.push({ name: 'engagement-confirmation-pro' })
}

function goHome() {
  router.push({ name: 'home' })
}
</script>

<template>
  <div
    v-if="engagement"
    class="bg-background text-on-background font-body-lg min-h-screen flex flex-col antialiased"
  >
    <header
      class="fixed top-0 left-0 w-full z-50 flex items-center justify-between px-container-margin h-16 bg-surface border-b border-surface-variant"
    >
      <button
        type="button"
        aria-label="Retour"
        class="flex items-center justify-center p-2 -ml-2 text-primary hover:bg-surface-container-low transition-colors rounded-full"
        @click="goHome"
      >
        <span class="material-symbols-outlined">arrow_back</span>
      </button>
      <span class="font-headline-sm text-headline-sm text-primary">Engagement confirmé</span>
      <div class="w-10" />
    </header>

    <main class="flex-grow flex flex-col pt-[80px] px-container-margin pb-stack-lg">
      <div
        class="w-full h-36 mb-4 relative overflow-hidden bg-surface-container-low rounded-lg"
      >
        <img
          class="w-full h-full object-cover grayscale-[20%]"
          alt=""
          :src="heroSrc"
        />
        <div class="absolute inset-0 flex items-center justify-center bg-background/10">
          <div
            class="w-14 h-14 bg-background/90 rounded-full flex items-center justify-center border border-outline-variant shadow-sm backdrop-blur-sm"
          >
            <span
              class="material-symbols-outlined text-[32px] text-primary"
              style="font-variation-settings: 'FILL' 1"
            >check_circle</span>
          </div>
        </div>
      </div>

      <div class="flex flex-wrap gap-stack-sm mb-stack-md">
        <span
          class="px-3 py-1 bg-surface-container border border-outline-variant font-label-caps text-label-caps text-on-background rounded"
        >
          ENGAGÉ
        </span>
        <span
          class="px-3 py-1 bg-secondary-container font-label-technical text-label-technical text-on-secondary-container rounded"
        >
          COMMITTED
        </span>
        <span
          class="px-3 py-1 bg-secondary-container font-label-technical text-label-technical text-on-secondary-container rounded"
        >
          BOOKED
        </span>
        <span
          class="px-3 py-1 bg-secondary-container font-label-technical text-label-technical text-on-secondary-container rounded"
        >
          PAYMENT_SUCCEEDED
        </span>
      </div>

      <div class="mb-section-gap">
        <h1 class="font-display-lg-mobile text-display-lg-mobile text-primary mb-stack-sm tracking-tight">
          Votre rendez-vous est engagé
        </h1>
        <p class="font-body-lg text-body-lg text-on-surface-variant">
          Vous avez accepté l’offre et simulé l’acompte. Le créneau est désormais réservé
          définitivement.
        </p>
      </div>

      <div
        class="border border-outline-variant rounded-lg p-stack-md bg-surface mb-section-gap"
      >
        <div class="flex items-start gap-stack-md">
          <div
            class="w-12 h-12 bg-surface-container-low rounded flex items-center justify-center shrink-0"
          >
            <span class="material-symbols-outlined text-on-surface-variant">event_available</span>
          </div>
          <div>
            <p class="font-body-sm text-body-sm text-on-background font-semibold">
              {{ slotLine }}
            </p>
            <p class="font-body-sm text-body-sm text-on-surface-variant">{{ proName }}</p>
            <div class="mt-2 pt-2 border-t border-outline-variant">
              <p class="font-body-sm text-body-sm text-on-surface-variant">
                Acompte simulé
                <span class="text-primary font-semibold">{{ deposit }} €</span>
              </p>
            </div>
          </div>
        </div>
      </div>

      <div class="mt-auto flex flex-col gap-stack-sm">
        <button
          type="button"
          class="w-full bg-primary-container text-on-primary h-14 flex items-center justify-center rounded font-headline-sm text-headline-sm transition-opacity hover:opacity-90 active:scale-[0.98]"
          @click="goAppointment"
        >
          Voir mon rendez-vous
        </button>
        <button
          type="button"
          class="w-full border border-primary-container text-primary-container h-14 flex items-center justify-center rounded font-headline-sm text-headline-sm transition-colors hover:bg-surface-container-low active:scale-[0.98]"
          @click="goPro"
        >
          Voir côté coiffeuse
        </button>
        <button
          type="button"
          class="w-full border border-outline-variant text-on-surface-variant h-12 flex items-center justify-center rounded font-body-sm text-body-sm transition-colors hover:bg-surface-container-low active:scale-[0.98]"
          @click="goHome"
        >
          Accueil
        </button>
        <p class="text-center mt-stack-md font-body-sm text-body-sm text-on-surface-variant italic">
          Paiement mock — aucun débit réel.
        </p>
      </div>
    </main>
  </div>
</template>
