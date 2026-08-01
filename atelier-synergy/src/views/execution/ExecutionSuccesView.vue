<script setup>
import { computed, onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'
import { AppointmentStatus } from '../../domain/appointment/model'
import { EXECUTION_HERO_SUCCES } from '../../mocks/executionSeed'
import { useExecutionStore } from '../../stores/execution'

const router = useRouter()
const executionStore = useExecutionStore()
const showDossier = ref(false)

const dossier = computed(() => executionStore.dossier)
const summary = computed(() => executionStore.engagementSummary)

onMounted(() => {
  executionStore.ensureDemoSeed()
  if (executionStore.currentAppointment?.status !== AppointmentStatus.COMPLETED) {
    router.replace({ name: 'execution-accueil' })
  }
})

function goHome() {
  router.push({ name: 'home' })
}

function toggleDossier() {
  showDossier.value = !showDossier.value
}
</script>

<template>
  <div
    class="bg-background text-on-background font-body-md min-h-screen flex flex-col relative"
  >
    <header
      class="w-full h-16 flex justify-center items-center bg-surface border-b border-surface-container z-40 fixed top-0"
    >
      <h1 class="font-headline-md text-headline-md text-primary tracking-tight">
        Atelier Synergy
      </h1>
    </header>

    <main class="flex-grow pt-16 pb-[160px] w-full max-w-lg mx-auto flex flex-col">
      <div class="w-full h-64 relative overflow-hidden">
        <img alt="" class="w-full h-full object-cover" :src="EXECUTION_HERO_SUCCES" />
        <div
          class="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent opacity-60"
        />
      </div>

      <div class="px-margin-mobile flex flex-col gap-lg -mt-6 relative z-10">
        <div class="flex flex-col gap-sm">
          <div class="flex items-center gap-sm">
            <span class="material-symbols-outlined text-secondary">check_circle</span>
            <div class="flex items-center gap-xs bg-surface-container px-2 py-1 rounded">
              <span class="font-label-mono text-label-mono text-on-surface uppercase">
                TERMINÉ
              </span>
              <span class="font-label-mono text-label-mono text-on-surface-variant">
                / COMPLETED
              </span>
            </div>
          </div>
          <h2 class="font-display-lg text-display-lg text-primary">Prestation terminée</h2>
          <p class="font-body-lg text-body-lg text-on-surface-variant">
            La prestation a démarré et s’est terminée. La cliente a confirmé. Le dossier est
            COMPLETED — prêt pour le règlement.
          </p>
        </div>

        <section
          class="border border-surface-container rounded-lg p-md bg-surface flex flex-col"
        >
          <div
            class="flex justify-between items-center py-md border-b border-surface-container"
          >
            <span class="font-body-md text-body-md text-on-surface-variant">Prestation</span>
            <span class="font-body-md font-semibold text-primary text-right">
              {{ dossier?.serviceLabel ?? summary.serviceLabel }}
            </span>
          </div>
          <div
            class="flex justify-between items-center py-md border-b border-surface-container"
          >
            <span class="font-body-md text-body-md text-on-surface-variant">Début</span>
            <span class="font-body-md font-semibold text-primary">
              {{
                dossier?.startedAt
                  ? executionStore.formatTime(dossier.startedAt)
                  : executionStore.startEvent
                    ? executionStore.formatTime(executionStore.startEvent.at)
                    : '—'
              }}
            </span>
          </div>
          <div
            class="flex justify-between items-center py-md border-b border-surface-container"
          >
            <span class="font-body-md text-body-md text-on-surface-variant">Fin</span>
            <span class="font-body-md font-semibold text-primary">
              {{
                dossier?.endedAt
                  ? executionStore.formatTime(dossier.endedAt)
                  : executionStore.endEvent
                    ? executionStore.formatTime(executionStore.endEvent.at)
                    : '—'
              }}
            </span>
          </div>
          <div
            class="flex justify-between items-center py-md border-b border-surface-container"
          >
            <span class="font-body-md text-body-md text-on-surface-variant">Issue</span>
            <div class="flex items-center gap-xs">
              <span class="w-2 h-2 rounded-full bg-secondary" />
              <span class="font-body-md font-semibold text-primary">Fin complète</span>
            </div>
          </div>
          <div class="flex justify-between items-center py-md">
            <span class="font-body-md text-body-md text-on-surface-variant">
              Confirmation cliente
            </span>
            <span class="font-body-md font-semibold text-primary">
              Oui ·
              {{
                dossier?.confirmedAt
                  ? executionStore.formatTime(dossier.confirmedAt)
                  : executionStore.confirmEvent
                    ? executionStore.formatTime(executionStore.confirmEvent.at)
                    : '—'
              }}
            </span>
          </div>
        </section>

        <div
          v-if="showDossier && dossier"
          class="border border-dashed border-outline-variant rounded-lg p-md bg-surface-container-low flex flex-col gap-2"
        >
          <p class="font-label-mono text-label-mono text-on-surface-variant uppercase">
            Dossier d’exécution
          </p>
          <p class="font-body-sm text-body-sm text-on-surface">
            Id · {{ dossier.id }}
          </p>
          <p class="font-body-sm text-body-sm text-on-surface">
            RDV · {{ dossier.appointmentId }}
          </p>
          <p class="font-body-sm text-body-sm text-on-surface">
            Statut · {{ dossier.status }} · {{ dossier.outcome }}
          </p>
          <p v-if="dossier.endNote" class="font-body-sm text-body-sm text-on-surface-variant">
            Note · {{ dossier.endNote }}
          </p>
          <p class="font-caption text-caption text-on-surface-variant">
            Persisté dans localStorage (`as.mvp.executionDossier`) — handoff étape 7.
          </p>
        </div>

        <p
          class="font-body-md text-body-md text-on-surface-variant text-center px-lg flex items-center justify-center gap-xs"
        >
          <span class="material-symbols-outlined text-sm">info</span>
          Prochaine étape : régler le solde (étape règlement — bientôt).
        </p>
      </div>
    </main>

    <div
      class="fixed bottom-0 left-0 w-full px-margin-mobile pt-md pb-margin-mobile bg-surface/90 backdrop-blur-md border-t border-surface-container z-50 flex flex-col gap-sm"
    >
      <div class="max-w-lg mx-auto w-full flex flex-col gap-sm">
        <button
          type="button"
          class="w-full h-12 bg-primary text-on-primary rounded flex items-center justify-center gap-sm hover:opacity-90 active:scale-[0.98] transition-all"
          @click="goHome"
        >
          <span class="font-body-md font-semibold">Continuer vers le règlement</span>
          <span class="material-symbols-outlined">arrow_forward</span>
        </button>
        <button
          type="button"
          class="w-full h-12 bg-transparent text-primary rounded hover:bg-surface-container-low active:scale-[0.98] transition-all flex items-center justify-center gap-sm"
          @click="toggleDossier"
        >
          <span class="font-body-md font-semibold">
            {{ showDossier ? 'Masquer le dossier' : 'Voir le dossier d’exécution' }}
          </span>
        </button>
      </div>
    </div>
  </div>
</template>
