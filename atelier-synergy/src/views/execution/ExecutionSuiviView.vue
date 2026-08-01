<script setup>
import { computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { AppointmentStatus } from '../../domain/appointment/model'
import { DemoRole } from '../../domain/execution/model'
import { EXECUTION_HERO_SUIVI } from '../../mocks/executionSeed'
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
  <div class="bg-background text-on-background font-body-md antialiased min-h-screen pb-[120px]">
    <header
      class="flex justify-between items-center w-full px-margin-mobile h-14 bg-surface border-b border-surface-container sticky top-0 z-10"
    >
      <div class="flex items-center gap-sm">
        <button
          type="button"
          aria-label="Retour"
          class="flex items-center justify-center w-10 h-10 hover:bg-surface-container-low transition-colors rounded-full active:scale-95"
          @click="goBack"
        >
          <span class="material-symbols-outlined">arrow_back</span>
        </button>
        <h1 class="font-headline-sm text-headline-sm">Suivi jour J</h1>
      </div>
      <div
        class="bg-surface-container-high px-sm py-xs rounded font-label-mono text-label-mono text-on-surface uppercase"
      >
        {{ statusBadge }}
      </div>
    </header>

    <main class="px-margin-mobile pt-lg flex flex-col gap-xl max-w-lg mx-auto">
      <section>
        <p class="font-body-lg text-body-lg text-on-surface-variant">
          Déclarez votre arrivée. Ces événements comptent pour l’exécution.
        </p>
      </section>

      <div class="w-full h-48 rounded-lg overflow-hidden border border-outline-variant">
        <img alt="" class="w-full h-full object-cover" :src="EXECUTION_HERO_SUIVI" />
      </div>

      <section
        class="bg-surface-container-lowest border border-surface-container p-md rounded-lg flex flex-col gap-sm"
      >
        <h2 class="font-headline-md text-headline-md text-primary">
          {{ summary.serviceLabel }}
        </h2>
        <p class="font-body-md text-body-md text-on-surface-variant flex items-center gap-xs mt-xs">
          <span class="material-symbols-outlined text-[16px]">calendar_today</span>
          {{ summary.dateLabel }} · {{ summary.startTime }}
        </p>
        <p class="font-body-md text-body-md text-on-surface-variant flex items-center gap-xs mt-xs">
          <span class="material-symbols-outlined text-[16px]">location_on</span>
          {{ summary.placeLabel }}
        </p>
        <div
          class="mt-sm pt-sm border-t border-surface-container flex items-center gap-sm bg-surface-container-low p-sm rounded"
        >
          <span class="material-symbols-outlined text-secondary text-[20px]">lock</span>
          <p class="font-body-md text-body-md text-on-surface">Accès confirmé · digicode ****</p>
        </div>
      </section>

      <section class="flex flex-col gap-md">
        <h3 class="font-headline-sm text-headline-sm text-on-surface">Arrivées</h3>

        <div
          class="flex flex-col gap-sm border border-surface-container rounded-lg p-md bg-surface-container-lowest"
        >
          <div class="flex justify-between items-center gap-2">
            <p class="font-body-lg text-body-lg font-bold">
              Cliente — {{ summary.clientDisplayName }}
            </p>
            <span
              class="font-label-mono text-label-mono px-sm py-xs rounded shrink-0"
              :class="
                arrivalClient
                  ? 'bg-secondary-container text-on-secondary-container'
                  : 'bg-surface-container-high text-on-surface-variant'
              "
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
            class="mt-sm w-full h-[44px] bg-secondary text-on-secondary font-body-md font-semibold rounded flex items-center justify-center hover:opacity-90 transition-opacity active:scale-[0.98]"
            @click="declareMine"
          >
            Je suis arrivée
          </button>
        </div>

        <div
          class="flex flex-col gap-sm border border-surface-container rounded-lg p-md bg-surface-container-lowest"
        >
          <div class="flex justify-between items-center gap-2">
            <p class="font-body-lg text-body-lg font-bold">
              Coiffeuse — {{ summary.proDisplayName }}
            </p>
            <span
              class="font-label-mono text-label-mono px-sm py-xs rounded shrink-0"
              :class="
                arrivalPro
                  ? 'bg-secondary-container text-on-secondary-container'
                  : 'bg-surface-container-high text-on-surface-variant'
              "
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
            class="mt-sm w-full h-[44px] bg-surface-container-lowest border border-outline text-primary font-body-md font-semibold rounded flex items-center justify-center hover:bg-surface-container-low transition-colors active:scale-[0.98]"
            @click="declareMine"
          >
            Je suis sur place
          </button>
        </div>
      </section>

      <section class="flex flex-col gap-md">
        <h3 class="font-headline-sm text-headline-sm text-on-surface">Événements</h3>
        <div
          v-if="!timeline.length"
          class="border border-surface-container rounded-lg p-lg bg-surface-container-lowest flex flex-col items-center justify-center text-center gap-sm"
        >
          <span class="material-symbols-outlined text-outline text-[32px]">history</span>
          <p class="font-body-md text-body-md text-on-surface-variant">
            Aucun événement pour l’instant
          </p>
        </div>
        <ul
          v-else
          class="border border-surface-container rounded-lg p-md bg-surface-container-lowest flex flex-col gap-sm"
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
          class="font-body-md text-body-md text-on-surface-variant text-center"
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
          class="font-body-md text-body-md text-on-surface-variant text-center"
        >
          Ensuite, la coiffeuse pourra démarrer la prestation.
        </p>
      </section>
    </main>

    <div
      class="fixed bottom-0 left-0 w-full bg-surface border-t border-surface-container p-margin-mobile z-40"
    >
      <div class="max-w-lg mx-auto">
        <button
          type="button"
          class="w-full h-[44px] bg-primary text-on-primary font-body-md font-semibold rounded flex items-center justify-center hover:bg-primary-container transition-colors active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed"
          :disabled="stickyDisabled"
          @click="onSticky"
        >
          {{ stickyLabel }}
        </button>
      </div>
    </div>
  </div>
</template>
