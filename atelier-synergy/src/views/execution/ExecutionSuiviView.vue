<script setup>
import { computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { AppointmentStatus } from '../../domain/appointment/model'
import { DemoRole } from '../../domain/execution/model'
import { useExecutionStore } from '../../stores/execution'

const router = useRouter()
const executionStore = useExecutionStore()

const summary = computed(() => executionStore.engagementSummary)
const statusBadge = computed(() => executionStore.statusBadge)
const demoRole = computed(() => executionStore.demoRole)
const arrivalClient = computed(() => executionStore.arrivalClient)
const arrivalPro = computed(() => executionStore.arrivalPro)
const bothArrivals = computed(() => executionStore.bothArrivalsDeclared)
const timeline = computed(() => executionStore.timelineLines)
const appointment = computed(() => executionStore.currentAppointment)

const isReady = computed(() => appointment.value?.status === AppointmentStatus.READY)
const isInProgress = computed(
  () => appointment.value?.status === AppointmentStatus.IN_PROGRESS,
)
const endDeclared = computed(() => executionStore.endDeclared)

const stickyLabel = computed(() => {
  if (isInProgress.value && endDeclared.value) return 'Confirmer la réalisation'
  if (isInProgress.value) return 'Déclarer la fin'
  if (bothArrivals.value) return 'Démarrer la prestation'
  if (demoRole.value === DemoRole.CLIENT) {
    return arrivalClient.value ? 'Arrivée déjà déclarée' : 'Déclarer mon arrivée'
  }
  return arrivalPro.value ? 'Arrivée déjà déclarée' : 'Déclarer mon arrivée'
})

const stickyDisabled = computed(() => {
  if (isInProgress.value) return false
  if (bothArrivals.value) return demoRole.value !== DemoRole.PRO
  if (demoRole.value === DemoRole.CLIENT) return Boolean(arrivalClient.value)
  return Boolean(arrivalPro.value)
})

onMounted(() => {
  executionStore.ensureDemoSeed()
  if (appointment.value?.status === AppointmentStatus.COMPLETED) {
    router.replace({ name: 'execution-succes' })
  }
})

function goBack() {
  router.push({ name: 'execution-accueil' })
}

function declareMine() {
  executionStore.declareArrival()
}

function onSticky() {
  if (isInProgress.value && endDeclared.value) {
    router.push({ name: 'execution-confirmation' })
    return
  }
  if (isInProgress.value) {
    router.push({ name: 'execution-fin' })
    return
  }
  if (bothArrivals.value) {
    router.push({ name: 'execution-demarrer' })
    return
  }
  declareMine()
}

function goDemarrer() {
  router.push({ name: 'execution-demarrer' })
}
</script>

<template>
  <div class="bg-background text-on-background font-body-md antialiased min-h-screen pb-28">
    <header
      class="flex justify-between items-center w-full px-margin-mobile h-14 bg-surface border-b border-surface-container sticky top-0 z-10"
    >
      <div class="flex items-center gap-sm min-w-0">
        <button
          type="button"
          aria-label="Retour"
          class="flex items-center justify-center w-10 h-10 hover:bg-surface-container-low transition-colors rounded-full active:scale-95 shrink-0"
          @click="goBack"
        >
          <span class="material-symbols-outlined">arrow_back</span>
        </button>
        <h1 class="font-headline-sm text-headline-sm truncate">Suivi jour J</h1>
      </div>
      <div
        class="bg-surface-container-high px-sm py-xs rounded font-label-mono text-label-mono text-on-surface uppercase shrink-0"
      >
        {{ statusBadge }}
      </div>
    </header>

    <main class="px-margin-mobile pt-4 flex flex-col gap-4 max-w-lg mx-auto">
      <p class="font-body-sm text-body-sm text-on-surface-variant">
        Déclarez votre arrivée. Ces événements comptent pour l’exécution.
      </p>

      <section
        class="bg-surface-container-lowest border border-surface-container p-3 rounded-lg flex flex-col gap-1.5"
      >
        <h2 class="font-headline-sm text-headline-sm text-primary">
          {{ summary.serviceLabel }}
        </h2>
        <p class="font-body-sm text-body-sm text-on-surface-variant flex items-center gap-xs">
          <span class="material-symbols-outlined text-[18px]">calendar_today</span>
          {{ summary.dateLabel }} · {{ summary.startTime }}
        </p>
        <p class="font-body-sm text-body-sm text-on-surface-variant flex items-center gap-xs">
          <span class="material-symbols-outlined text-[18px]">location_on</span>
          {{ summary.placeLabel }}
        </p>
        <div
          class="mt-1 pt-2 border-t border-surface-container flex items-center gap-sm"
        >
          <span class="material-symbols-outlined text-secondary text-[20px]">lock</span>
          <p class="font-body-sm text-body-sm text-on-surface">Accès confirmé · digicode ****</p>
        </div>
      </section>

      <section class="flex flex-col gap-2">
        <h3 class="font-label-mono text-label-mono text-on-surface-variant uppercase tracking-wider">
          Arrivées
        </h3>

        <div
          class="border border-surface-container rounded-lg overflow-hidden bg-surface-container-lowest divide-y divide-surface-container"
        >
          <div class="flex flex-col gap-2 p-3">
            <div class="flex justify-between items-center gap-2">
              <p class="font-body-md text-body-md font-semibold text-primary min-w-0 truncate">
                Cliente — {{ summary.clientDisplayName }}
              </p>
              <span
                class="font-label-mono text-label-mono px-sm py-xs rounded shrink-0"
                :class="arrivalClient ? 'bg-secondary-container text-on-secondary-container' : 'bg-surface-container-high text-on-surface-variant'"
              >
                {{
                  arrivalClient
                    ? `ARRIVÉE · ${executionStore.formatTime(arrivalClient.at)}`
                    : 'NON DÉCLARÉE'
                }}
              </span>
            </div>
            <button
              v-if="isReady && demoRole === DemoRole.CLIENT && !arrivalClient"
              type="button"
              class="w-full h-10 bg-secondary text-on-secondary font-body-md font-semibold rounded flex items-center justify-center hover:opacity-90 transition-opacity active:scale-[0.98]"
              @click="declareMine"
            >
              Je suis arrivée
            </button>
          </div>

          <div class="flex flex-col gap-2 p-3">
            <div class="flex justify-between items-center gap-2">
              <p class="font-body-md text-body-md font-semibold text-primary min-w-0 truncate">
                Coiffeuse — {{ summary.proDisplayName }}
              </p>
              <span
                class="font-label-mono text-label-mono px-sm py-xs rounded shrink-0"
                :class="arrivalPro ? 'bg-secondary-container text-on-secondary-container' : 'bg-surface-container-high text-on-surface-variant'"
              >
                {{
                  arrivalPro
                    ? `ARRIVÉE · ${executionStore.formatTime(arrivalPro.at)}`
                    : 'NON DÉCLARÉE'
                }}
              </span>
            </div>
            <button
              v-if="isReady && demoRole === DemoRole.PRO && !arrivalPro"
              type="button"
              class="w-full h-10 bg-surface border border-outline text-primary font-body-md font-semibold rounded flex items-center justify-center hover:bg-surface-container-low transition-colors active:scale-[0.98]"
              @click="declareMine"
            >
              Je suis sur place
            </button>
          </div>
        </div>
      </section>

      <section class="flex flex-col gap-2 pb-2">
        <h3 class="font-label-mono text-label-mono text-on-surface-variant uppercase tracking-wider">
          Événements
        </h3>
        <div
          v-if="!timeline.length"
          class="border border-surface-container rounded-lg px-3 py-4 bg-surface-container-lowest flex items-center justify-center gap-2 text-center"
        >
          <span class="material-symbols-outlined text-outline text-[22px]">history</span>
          <p class="font-body-sm text-body-sm text-on-surface-variant">
            Aucun événement pour l’instant
          </p>
        </div>
        <ul
          v-else
          class="border border-surface-container rounded-lg px-3 py-2.5 bg-surface-container-lowest flex flex-col gap-1.5"
        >
          <li
            v-for="line in timeline"
            :key="line.id"
            class="font-label-mono text-label-mono text-on-surface"
          >
            {{ line.label }}
          </li>
        </ul>

        <p
          v-if="isReady && bothArrivals && demoRole === DemoRole.PRO"
          class="font-body-sm text-body-sm text-on-surface-variant text-center pt-1"
        >
          Les arrivées sont déclarées —
          <button
            type="button"
            class="underline text-primary font-semibold"
            @click="goDemarrer"
          >
            démarrer la prestation
          </button>
        </p>
        <p
          v-else-if="isReady"
          class="font-body-sm text-body-sm text-on-surface-variant text-center pt-1"
        >
          Ensuite, la coiffeuse pourra démarrer la prestation.
        </p>
      </section>
    </main>

    <div
      class="fixed bottom-0 left-0 w-full bg-surface/95 backdrop-blur-sm border-t border-surface-container px-margin-mobile py-3 z-40"
    >
      <div class="max-w-lg mx-auto">
        <button
          type="button"
          class="w-full h-12 bg-primary text-on-primary font-body-md font-semibold rounded flex items-center justify-center hover:bg-primary-container transition-colors active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed"
          :disabled="stickyDisabled"
          @click="onSticky"
        >
          {{ stickyLabel }}
        </button>
      </div>
    </div>
  </div>
</template>
