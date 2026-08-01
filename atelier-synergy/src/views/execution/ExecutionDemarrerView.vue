<script setup>
import { computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { AppointmentStatus } from '../../domain/appointment/model'
import { DemoRole } from '../../domain/execution/model'
import { EXECUTION_HERO_DEMARRER } from '../../mocks/executionSeed'
import { useExecutionStore } from '../../stores/execution'

const router = useRouter()
const executionStore = useExecutionStore()

const summary = computed(() => executionStore.engagementSummary)
const arrivalClient = computed(() => executionStore.arrivalClient)
const arrivalPro = computed(() => executionStore.arrivalPro)
const bothArrivals = computed(() => executionStore.bothArrivalsDeclared)
const isPro = computed(() => executionStore.demoRole === DemoRole.PRO)
const canStart = computed(
  () =>
    isPro.value &&
    bothArrivals.value &&
    executionStore.currentAppointment?.status === AppointmentStatus.READY,
)

onMounted(() => {
  executionStore.ensureDemoSeed()
  const status = executionStore.currentAppointment?.status
  if (status === AppointmentStatus.COMPLETED) {
    router.replace({ name: 'execution-succes' })
    return
  }
  if (status === AppointmentStatus.IN_PROGRESS) {
    router.replace({ name: 'execution-suivi' })
  }
})

function goBack() {
  router.push({ name: 'execution-suivi' })
}

function start() {
  const event = executionStore.startService()
  if (event) {
    router.push({ name: 'execution-suivi' })
  }
}
</script>

<template>
  <div class="bg-background text-on-background font-body-md antialiased min-h-screen flex flex-col">
    <header
      class="sticky top-0 w-full z-50 bg-surface/90 backdrop-blur-md border-b border-surface-container flex items-center px-margin-mobile h-14"
    >
      <button
        type="button"
        aria-label="Retour"
        class="mr-sm text-on-surface-variant hover:bg-surface-container-low p-2 rounded-full transition-colors active:opacity-80"
        @click="goBack"
      >
        <span class="material-symbols-outlined">arrow_back</span>
      </button>
      <h1 class="font-headline-sm text-headline-sm text-primary font-bold tracking-tight">
        Démarrer
      </h1>
    </header>

    <div class="w-full h-48 relative bg-surface-container">
      <img alt="" class="w-full h-full object-cover" :src="EXECUTION_HERO_DEMARRER" />
      <div class="absolute inset-0 bg-gradient-to-t from-surface via-surface/40 to-transparent" />
    </div>

    <main class="flex-1 px-margin-mobile -mt-8 relative z-10 max-w-lg mx-auto w-full pb-[160px]">
      <div class="mb-md">
      </div>

      <div class="bg-surface rounded-t-xl pt-sm">
        <div class="inline-flex items-center bg-surface-container-high px-2 py-1 rounded mb-md">
          <span class="font-label-mono text-label-mono text-on-surface-variant uppercase tracking-wider">
            {{ executionStore.statusBadge }}
          </span>
        </div>
        <h2 class="font-headline-md text-headline-md text-primary font-bold mb-xs">
          Confirmer le début
        </h2>
        <p class="font-body-lg text-body-lg text-on-surface-variant mb-xl leading-relaxed">
          En démarrant, le rendez-vous passe à
          <span class="font-label-mono text-xs">EN COURS</span>. L’heure de début est enregistrée.
        </p>
      </div>

      <section class="border border-surface-container bg-surface-container-lowest rounded-lg p-md mb-xl">
        <div class="flex items-center mb-sm">
          <span class="material-symbols-outlined text-on-surface-variant mr-sm text-[20px]">
            content_cut
          </span>
          <span class="font-label-mono text-label-mono text-on-surface-variant uppercase">
            Détails de la prestation
          </span>
        </div>
        <p class="font-headline-sm text-headline-sm text-primary mb-2">
          {{ summary.serviceLabel }}
        </p>
        <div class="w-full h-px bg-surface-container my-sm" />
        <div class="flex items-center">
          <div
            class="w-8 h-8 rounded-full bg-surface-container-high flex items-center justify-center mr-sm"
          >
            <span class="material-symbols-outlined text-on-surface text-[18px]">person</span>
          </div>
          <p class="font-body-lg text-body-lg text-primary">{{ summary.clientDisplayName }}</p>
        </div>
      </section>

      <section class="mb-xl">
        <h3 class="font-headline-sm text-headline-sm text-primary font-bold mb-md">Conditions</h3>
        <ul class="flex flex-col gap-sm">
          <li
            class="flex items-center justify-between p-md bg-surface border border-surface-container rounded-lg gap-2"
          >
            <div class="flex items-center">
              <span
                class="material-symbols-outlined mr-sm"
                :class="arrivalClient ? 'text-primary' : 'text-outline'"
              >
                {{ arrivalClient ? 'check_circle' : 'radio_button_unchecked' }}
              </span>
              <p class="font-body-md text-body-md text-primary">Arrivée cliente déclarée</p>
            </div>
            <span class="font-label-mono text-label-mono text-on-surface-variant shrink-0">
              {{
                arrivalClient
                  ? `OK · ${executionStore.formatTime(arrivalClient.at)}`
                  : 'En attente'
              }}
            </span>
          </li>
          <li
            class="flex items-center justify-between p-md bg-surface border border-surface-container rounded-lg gap-2"
          >
            <div class="flex items-center">
              <span
                class="material-symbols-outlined mr-sm"
                :class="arrivalPro ? 'text-primary' : 'text-outline'"
              >
                {{ arrivalPro ? 'check_circle' : 'radio_button_unchecked' }}
              </span>
              <p class="font-body-md text-body-md text-primary">Arrivée coiffeuse déclarée</p>
            </div>
            <span class="font-label-mono text-label-mono text-on-surface-variant shrink-0">
              {{
                arrivalPro ? `OK · ${executionStore.formatTime(arrivalPro.at)}` : 'En attente'
              }}
            </span>
          </li>
          <li
            class="flex items-center justify-between p-md bg-surface border border-surface-container rounded-lg gap-2"
          >
            <div class="flex items-center">
              <span class="material-symbols-outlined text-primary mr-sm">check_circle</span>
              <p class="font-body-md text-body-md text-primary">Préparation READY</p>
            </div>
            <span class="font-label-mono text-label-mono text-on-surface-variant">OK</span>
          </li>
        </ul>
      </section>

      <div
        class="flex items-start p-md bg-surface-container-low rounded-lg border border-surface-container"
      >
        <span class="material-symbols-outlined text-on-surface-variant mr-sm mt-0.5 text-[20px]">
          info
        </span>
        <p class="font-body-md text-body-md text-on-surface-variant">
          Un seul démarrage explicite — pas de démarrage implicite.
          <span v-if="!isPro" class="block mt-1">Passez en rôle Coiffeuse pour démarrer.</span>
        </p>
      </div>
    </main>

    <div
      class="fixed bottom-0 left-0 w-full bg-surface border-t border-surface-container p-margin-mobile z-50"
    >
      <div class="max-w-lg mx-auto flex flex-col gap-sm">
        <button
          type="button"
          class="w-full bg-primary-container text-on-primary min-h-[44px] rounded font-body-md font-semibold flex items-center justify-center transition-opacity hover:opacity-90 active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed"
          :disabled="!canStart"
          @click="start"
        >
          Démarrer la prestation
        </button>
        <button
          type="button"
          class="w-full bg-surface border border-primary-container text-primary-container min-h-[44px] rounded font-body-md font-semibold flex items-center justify-center transition-colors hover:bg-surface-container-low active:scale-[0.98]"
          @click="goBack"
        >
          Revenir au suivi
        </button>
      </div>
    </div>
  </div>
</template>
