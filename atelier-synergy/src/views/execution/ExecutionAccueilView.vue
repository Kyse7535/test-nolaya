<script setup>
import { computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { AppointmentStatus } from '../../domain/appointment/model'
import { EXECUTION_HERO_ACCUEIL } from '../../mocks/executionSeed'
import { useExecutionStore } from '../../stores/execution'

const router = useRouter()
const executionStore = useExecutionStore()

const summary = computed(() => executionStore.engagementSummary)
const context = computed(() => executionStore.contextSummary)
const statusBadge = computed(() => executionStore.statusBadge)

const pillars = [
  {
    n: '1',
    title: 'Arrivées',
    body: 'Cliente et coiffeuse déclarent être sur place.',
  },
  {
    n: '2',
    title: 'Démarrage',
    body: 'La coiffeuse démarre explicitement → IN_PROGRESS.',
  },
  {
    n: '3',
    title: 'Fin complète',
    body: 'Déclarer la fin de la prestation (complète uniquement).',
  },
  {
    n: '4',
    title: 'Confirmation',
    body: 'La cliente confirme → COMPLETED, puis règlement.',
  },
]

onMounted(() => {
  executionStore.ensureDemoSeed()
  const status = executionStore.currentAppointment?.status
  if (status === AppointmentStatus.COMPLETED) {
    router.replace({ name: 'execution-succes' })
  }
})

function goBack() {
  router.push({ name: 'home' })
}

function openSuivi() {
  executionStore.ensureDemoSeed()
  const status = executionStore.currentAppointment?.status
  if (status === AppointmentStatus.COMPLETED) {
    router.push({ name: 'execution-succes' })
    return
  }
  router.push({ name: 'execution-suivi' })
}
</script>

<template>
  <div class="bg-background text-on-background font-body-md min-h-screen pb-28">
    <header
      class="sticky top-0 w-full z-50 bg-surface/90 backdrop-blur-md border-b border-outline-variant flex items-center px-margin-mobile h-14"
    >
      <button
        type="button"
        aria-label="Retour"
        class="text-on-surface-variant hover:opacity-80 transition-opacity active:scale-95 p-2 -ml-2 rounded-full"
        @click="goBack"
      >
        <span class="material-symbols-outlined">arrow_back</span>
      </button>
      <h1 class="font-headline-md text-headline-md font-bold tracking-tight text-primary ml-2">
        Jour J
      </h1>
    </header>

    <main class="pt-4 px-margin-mobile max-w-lg mx-auto flex flex-col gap-4">
      <section class="flex flex-col gap-2">
        <div
          class="inline-flex items-center self-start gap-2 px-2 py-1 bg-surface-container border border-outline-variant rounded-sm"
        >
          <span class="w-2 h-2 rounded-full bg-secondary" />
          <span class="font-label-mono text-label-mono text-on-surface uppercase">
            {{ statusBadge }}
          </span>
        </div>
        <h2 class="font-headline-md text-headline-md text-primary">Réaliser la prestation</h2>
        <p class="font-body-sm text-body-sm text-on-surface-variant">
          Le rendez-vous est READY. Aujourd’hui vous déclarez les arrivées, démarrez la prestation,
          déclarez une fin complète, puis la cliente confirme. Le dossier devient COMPLETED, prêt
          pour le règlement.
        </p>
        <div
          class="flex items-center gap-sm p-sm bg-surface-container rounded-sm border border-outline-variant"
        >
          <span class="material-symbols-outlined text-outline text-[18px]">event</span>
          <span class="font-label-mono text-label-mono text-on-surface-variant">
            {{ context }}
          </span>
        </div>
      </section>

      <section class="relative w-full h-28 rounded-lg overflow-hidden bg-surface-container">
        <img
          alt=""
          class="w-full h-full object-cover"
          :src="EXECUTION_HERO_ACCUEIL"
        />
        <div
          class="absolute bottom-0 left-0 w-full p-3 bg-gradient-to-t from-black/60 to-transparent"
        >
          <p class="font-headline-sm text-headline-sm text-white font-bold tracking-tight">
            Du prêt au fait d’exécution.
          </p>
        </div>
      </section>

      <section class="flex flex-col gap-2">
        <h3 class="font-label-mono text-label-mono text-on-surface-variant uppercase tracking-wider">
          Ce que vous allez faire
        </h3>
        <div class="border border-outline-variant rounded-lg overflow-hidden divide-y divide-outline-variant bg-surface-container-lowest">
          <div
            v-for="pillar in pillars"
            :key="pillar.n"
            class="px-3 py-2.5 flex gap-3 items-start"
          >
            <div
              class="w-7 h-7 rounded-full bg-surface-container-highest flex items-center justify-center shrink-0 border border-outline-variant"
            >
              <span class="font-label-mono text-label-mono text-on-surface">{{ pillar.n }}</span>
            </div>
            <div class="min-w-0">
              <h4 class="font-body-md text-body-md font-bold text-primary">
                {{ pillar.title }}
              </h4>
              <p class="font-body-sm text-body-sm text-on-surface-variant">{{ pillar.body }}</p>
            </div>
          </div>
        </div>
      </section>

      <section
        class="p-md bg-surface-container-low rounded border border-outline-variant border-dashed"
      >
        <p class="font-body-sm text-body-sm text-on-surface-variant italic flex items-center gap-sm">
          <span class="material-symbols-outlined text-outline text-icon">info</span>
          Pas de retard, d’avenant ni d’incident dans cette démo.
        </p>
      </section>

      <p
        v-if="summary.clientDisplayName"
        class="font-caption text-caption text-on-surface-variant text-center"
      >
        {{ summary.clientDisplayName }} · {{ summary.proDisplayName }}
      </p>
    </main>

    <div
      class="fixed bottom-0 left-0 w-full p-margin-mobile bg-surface/90 backdrop-blur-md border-t border-outline-variant z-40"
    >
      <div class="max-w-lg mx-auto">
        <button
          type="button"
          class="w-full bg-primary text-on-primary font-body-md text-body-md font-bold py-3 px-6 rounded hover:opacity-90 active:scale-95 transition-all"
          @click="openSuivi"
        >
          Ouvrir le suivi
        </button>
      </div>
    </div>
  </div>
</template>
