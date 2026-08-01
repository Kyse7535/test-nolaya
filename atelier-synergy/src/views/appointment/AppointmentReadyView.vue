<script setup>
import { computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { partiesLine, slotSummary } from '../../domain/appointment/labels'
import { AppointmentStatus } from '../../domain/appointment/model'
import { APPOINTMENT_HERO_READY } from '../../mocks/appointmentSeed'
import { useAppointmentStore } from '../../stores/appointment'

const router = useRouter()
const appointmentStore = useAppointmentStore()

const engagement = computed(() => appointmentStore.currentEngagement)
const snapshot = computed(
  () => appointmentStore.currentAppointment?.readySnapshot ?? null,
)
const progress = computed(() => appointmentStore.blockingProgress)

onMounted(() => {
  appointmentStore.ensureDemoSeed()
  if (appointmentStore.currentAppointment?.status !== AppointmentStatus.READY) {
    router.replace({ name: 'appointment-plan' })
  }
})

function goHome() {
  router.push({ name: 'home' })
}

function goJourJ() {
  router.push({ name: 'execution-accueil' })
}

function goPlan() {
  router.push({ name: 'appointment-accueil' })
}
</script>

<template>
  <div
    class="bg-background text-on-background font-body-md min-h-screen flex flex-col items-center"
  >
    <div
      class="w-full max-w-md bg-surface min-h-screen flex flex-col relative pb-36"
    >
      <header
        class="flex items-center justify-between px-margin-mobile w-full h-16 bg-surface border-b border-surface-container-highest sticky top-0 z-10"
      >
        <button
          type="button"
          aria-label="Retour"
          class="p-2 -ml-2 text-primary hover:bg-surface-container transition-colors rounded-full active:opacity-70 flex items-center justify-center"
          @click="goHome"
        >
          <span class="material-symbols-outlined">arrow_back</span>
        </button>
        <h1 class="font-headline-sm text-headline-sm font-semibold text-primary">
          Préparation de Séance
        </h1>
        <div class="w-10" />
      </header>

      <main
        class="flex-1 flex flex-col px-margin-mobile pt-stack-lg pb-stack-lg gap-stack-lg overflow-y-auto"
      >
        <div
          class="w-full aspect-[4/5] bg-surface-container-low rounded-lg overflow-hidden relative border border-surface-container-highest"
        >
          <img
            class="w-full h-full object-cover object-center absolute inset-0"
            alt="Rendez-vous prêt"
            :src="APPOINTMENT_HERO_READY"
          />
        </div>

        <div class="flex flex-col items-center text-center gap-stack-sm">
          <div class="flex flex-col items-center gap-1 mb-2">
            <span
              class="bg-surface-container-highest text-primary px-3 py-1 rounded-full font-label-mono text-label-mono uppercase tracking-wider"
            >
              PRÊT
            </span>
            <span
              class="font-label-mono text-label-mono text-on-surface-variant uppercase tracking-widest text-[10px]"
            >
              Ready
            </span>
          </div>
          <h2 class="font-display-lg text-display-lg text-primary">
            Le rendez-vous est prêt
          </h2>
          <p class="font-body-lg text-body-lg text-on-surface-variant max-w-[280px]">
            Toutes les actions bloquantes sont confirmées. Cliente et coiffeuse peuvent réaliser la
            prestation.
          </p>
        </div>

        <div
          class="bg-surface-container-lowest border border-surface-container-highest rounded-lg p-stack-md flex flex-col gap-stack-md"
        >
          <h3 class="font-headline-sm text-headline-sm text-primary">
            Instantané de préparation
          </h3>
          <ul class="flex flex-col">
            <li class="flex items-start py-3 border-b border-surface-container gap-4">
              <span class="material-symbols-outlined text-secondary mt-0.5">check_circle</span>
              <div class="flex flex-col">
                <span class="font-body-md text-body-md text-primary font-medium">
                  Actions bloquantes
                </span>
                <span class="font-label-mono text-label-mono text-on-surface-variant mt-1">
                  {{ snapshot?.blockingConfirmed ?? progress.confirmed }} /
                  {{ snapshot?.blockingTotal ?? progress.total }} confirmées
                </span>
              </div>
            </li>
            <li class="flex items-start py-3 border-b border-surface-container gap-4">
              <span class="material-symbols-outlined text-on-surface-variant mt-0.5">cut</span>
              <div class="flex flex-col">
                <span class="font-body-md text-body-md text-primary font-medium">Prestation</span>
                <span class="font-label-mono text-label-mono text-on-surface-variant mt-1">
                  {{ snapshot?.serviceLabel ?? engagement?.serviceLabel }}
                </span>
              </div>
            </li>
            <li class="flex items-start py-3 border-b border-surface-container gap-4">
              <span class="material-symbols-outlined text-on-surface-variant mt-0.5">schedule</span>
              <div class="flex flex-col">
                <span class="font-body-md text-body-md text-primary font-medium">Créneau</span>
                <span class="font-label-mono text-label-mono text-on-surface-variant mt-1">
                  {{
                    snapshot
                      ? `${snapshot.dateLabel} · ${snapshot.startTime} – ${snapshot.endTime}`
                      : slotSummary(engagement)
                  }}
                </span>
              </div>
            </li>
            <li class="flex items-start py-3 border-b border-surface-container gap-4">
              <span class="material-symbols-outlined text-on-surface-variant mt-0.5">
                location_on
              </span>
              <div class="flex flex-col">
                <span class="font-body-md text-body-md text-primary font-medium">Lieu</span>
                <span class="font-label-mono text-label-mono text-on-surface-variant mt-1">
                  {{ snapshot?.placeLabel ?? engagement?.placeLabel }} · accès confirmé
                </span>
              </div>
            </li>
            <li class="flex items-start py-3 gap-4">
              <span class="material-symbols-outlined text-on-surface-variant mt-0.5">group</span>
              <div class="flex flex-col">
                <span class="font-body-md text-body-md text-primary font-medium">Parties</span>
                <span class="font-label-mono text-label-mono text-on-surface-variant mt-1">
                  {{
                    snapshot
                      ? `${snapshot.proDisplayName} · ${snapshot.clientDisplayName}`
                      : partiesLine(engagement)
                  }}
                </span>
              </div>
            </li>
          </ul>
        </div>

        <p class="text-center font-caption text-caption text-on-surface-variant px-4">
          READY signifie : on peut réaliser — pas seulement un e-mail de confirmation.
        </p>
      </main>

      <div
        class="fixed bottom-0 w-full max-w-md bg-surface border-t border-surface-container-highest p-margin-mobile flex flex-col gap-gutter-mobile z-50"
      >
        <button
          type="button"
          class="w-full bg-primary-container text-on-primary font-headline-sm text-headline-sm py-4 rounded-lg active:opacity-80 transition-opacity"
          @click="goJourJ"
        >
          Passer au jour J
        </button>
        <button
          type="button"
          class="w-full border border-primary-container text-primary-container font-headline-sm text-headline-sm py-4 rounded-lg active:bg-surface-container-low transition-colors"
          @click="goPlan"
        >
          Revoir l’accueil préparation
        </button>
        <button
          type="button"
          class="w-full text-on-surface-variant font-body-md text-body-md py-2 rounded-lg hover:bg-surface-container-low transition-colors"
          @click="goHome"
        >
          Retour aux blocs métier
        </button>
      </div>
    </div>
  </div>
</template>
