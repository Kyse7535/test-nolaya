<script setup>
import { computed, onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'
import DemoRoleHandoff from '../../components/DemoRoleHandoff.vue'
import { AppointmentStatus } from '../../domain/appointment/model'
import { DemoRole } from '../../domain/execution/model'
import { EXECUTION_HERO_CONFIRM } from '../../mocks/executionSeed'
import { useExecutionStore } from '../../stores/execution'

const router = useRouter()
const executionStore = useExecutionStore()
const confirmed = ref(false)

const summary = computed(() => executionStore.engagementSummary)
const isClient = computed(() => executionStore.demoRole === DemoRole.CLIENT)
const canConfirm = computed(
  () =>
    confirmed.value &&
    isClient.value &&
    executionStore.endDeclared &&
    executionStore.currentAppointment?.status === AppointmentStatus.IN_PROGRESS,
)

onMounted(() => {
  executionStore.ensureDemoSeed()
  if (executionStore.currentAppointment?.status === AppointmentStatus.COMPLETED) {
    router.replace({ name: 'execution-succes' })
    return
  }
  if (!executionStore.endDeclared) {
    router.replace({ name: 'execution-fin' })
  }
})

function goBack() {
  router.push({ name: 'execution-suivi' })
}

function confirm() {
  const event = executionStore.confirmByClient()
  if (event) {
    router.push({ name: 'execution-succes' })
  }
}
</script>

<template>
  <div
    class="bg-background text-on-background font-body-md antialiased min-h-screen flex flex-col pb-28"
  >
    <header
      class="sticky top-0 w-full bg-surface/95 backdrop-blur-md z-50 border-b border-surface-container flex justify-between items-center px-margin-mobile h-14"
    >
      <button
        type="button"
        aria-label="Retour"
        class="w-10 h-10 flex items-center justify-center -ml-2 text-primary hover:opacity-80 transition-opacity active:scale-95"
        @click="goBack"
      >
        <span class="material-symbols-outlined">arrow_back</span>
      </button>
      <h1 class="font-body-md font-semibold text-primary">Confirmer</h1>
      <span
        class="font-label-mono text-label-mono text-secondary uppercase tracking-widest px-2 py-1 bg-surface-container-low border border-surface-container rounded-sm"
      >
        {{ executionStore.statusBadge }}
      </span>
    </header>

    <main class="flex-grow pt-4 px-margin-mobile flex flex-col gap-3 max-w-lg mx-auto w-full">
      <section class="flex flex-col gap-1">
        <h2 class="font-headline-md text-headline-md text-primary">
          Votre coiffeuse a déclaré la fin
        </h2>
        <p class="font-body-sm text-body-sm text-on-surface-variant">
          Confirmez que la prestation a bien été réalisée. Sans votre confirmation, le dossier ne
          passe pas à COMPLETED.
        </p>
      </section>

      <section class="w-full h-28 rounded-lg overflow-hidden border border-surface-container relative">
        <div class="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent z-10" />
        <img alt="" class="w-full h-full object-cover" :src="EXECUTION_HERO_CONFIRM" />
      </section>

      <section
        class="bg-surface-container-lowest border border-surface-container rounded-lg px-3 py-2 flex flex-col"
      >
        <h3
          class="font-label-mono text-label-mono text-primary uppercase tracking-wider py-1.5 border-b border-surface-container"
        >
          Résumé
        </h3>
        <div class="flex justify-between items-baseline py-1.5 border-b border-surface-container-low gap-3">
          <span class="font-body-sm text-body-sm text-on-surface-variant">Prestation</span>
          <span class="font-body-sm text-body-sm font-semibold text-primary text-right">
            {{ summary.serviceLabel }}
          </span>
        </div>
        <div class="flex justify-between items-baseline py-1.5 border-b border-surface-container-low gap-3">
          <span class="font-body-sm text-body-sm text-on-surface-variant">Coiffeuse</span>
          <span class="font-body-sm text-body-sm font-semibold text-primary text-right">
            {{ summary.proDisplayName }}
          </span>
        </div>
        <div class="flex justify-between items-baseline py-1.5 border-b border-surface-container-low gap-3">
          <span class="font-body-sm text-body-sm text-on-surface-variant">Début</span>
          <span class="font-body-sm text-body-sm font-semibold text-primary text-right">
            {{
              executionStore.startEvent
                ? executionStore.formatTime(executionStore.startEvent.at)
                : '—'
            }}
          </span>
        </div>
        <div class="flex justify-between items-baseline py-1.5 border-b border-surface-container-low gap-3">
          <span class="font-body-sm text-body-sm text-on-surface-variant">Fin déclarée</span>
          <span class="font-body-sm text-body-sm font-semibold text-primary text-right">
            {{
              executionStore.endEvent
                ? executionStore.formatTime(executionStore.endEvent.at)
                : '—'
            }}
          </span>
        </div>
        <div class="flex justify-between items-baseline py-1.5 gap-3">
          <span class="font-body-sm text-body-sm text-on-surface-variant">Issue</span>
          <span class="font-body-sm text-body-sm font-semibold text-secondary text-right">
            Fin complète
          </span>
        </div>
      </section>

      <section class="flex flex-col gap-xs">
        <label
          class="flex items-start gap-3 p-3 bg-surface-container-low border border-surface-container rounded-lg cursor-pointer hover:bg-surface-container transition-colors"
        >
          <div class="pt-1">
            <input
              v-model="confirmed"
              type="checkbox"
              class="w-5 h-5 accent-primary"
              :disabled="!isClient"
            />
          </div>
          <div class="flex flex-col gap-1">
            <span class="font-body-md font-semibold text-primary">
              Je confirme que la prestation a été réalisée
            </span>
            <span class="font-body-sm text-body-sm text-on-surface-variant">
              Ensuite le dossier d’exécution sera prêt pour le règlement.
            </span>
            <DemoRoleHandoff :target-role="DemoRole.CLIENT" action="confirmer" />
          </div>
        </label>
      </section>
    </main>

    <footer
      class="fixed bottom-0 w-full bg-surface/95 backdrop-blur-md border-t border-surface-container px-margin-mobile py-3 flex flex-col gap-1.5 z-40"
    >
      <div class="max-w-lg mx-auto w-full flex flex-col gap-1.5">
        <button
          type="button"
          class="w-full h-12 bg-primary-container text-on-primary rounded flex items-center justify-center font-body-md font-semibold transition-all duration-200 disabled:opacity-50 disabled:bg-surface-variant disabled:text-outline disabled:cursor-not-allowed hover:opacity-90 active:scale-[0.98]"
          :disabled="!canConfirm"
          @click="confirm"
        >
          Confirmer la réalisation
        </button>
        <button
          type="button"
          class="w-full h-10 bg-transparent text-primary rounded flex items-center justify-center font-body-sm font-semibold transition-all duration-200 hover:bg-surface-container-low active:scale-[0.98]"
          @click="goBack"
        >
          Revenir
        </button>
      </div>
    </footer>
  </div>
</template>
