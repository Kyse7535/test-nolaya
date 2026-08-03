<script setup>
import { computed, onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'
import DemoRoleHandoff from '../../components/DemoRoleHandoff.vue'
import { AppointmentStatus } from '../../domain/appointment/model'
import { DemoRole } from '../../domain/execution/model'
import { EXECUTION_HERO_FIN } from '../../mocks/executionSeed'
import { useExecutionStore } from '../../stores/execution'

const router = useRouter()
const executionStore = useExecutionStore()
const note = ref('')

const summary = computed(() => executionStore.engagementSummary)
const isPro = computed(() => executionStore.demoRole === DemoRole.PRO)
const canDeclare = computed(
  () =>
    isPro.value &&
    executionStore.currentAppointment?.status === AppointmentStatus.IN_PROGRESS &&
    !executionStore.endDeclared,
)

onMounted(() => {
  executionStore.ensureDemoSeed()
  const appointment = executionStore.currentAppointment
  if (appointment?.status === AppointmentStatus.COMPLETED) {
    router.replace({ name: 'execution-succes' })
    return
  }
  if (executionStore.endDeclared) {
    router.replace({ name: 'execution-confirmation' })
    return
  }
  if (appointment?.status !== AppointmentStatus.IN_PROGRESS) {
    router.replace({ name: 'execution-suivi' })
  }
})

function goBack() {
  router.push({ name: 'execution-suivi' })
}

function declareEnd() {
  const event = executionStore.declareCompleteEnd(note.value)
  if (event) {
    router.push({ name: 'execution-confirmation' })
  }
}
</script>

<template>
  <div class="bg-background text-on-background font-body-md antialiased min-h-screen flex flex-col pb-[180px]">
    <header
      class="fixed top-0 w-full z-50 flex items-center px-margin-mobile h-[56px] bg-surface border-b border-surface-container-highest"
    >
      <button
        type="button"
        class="text-primary hover:bg-surface-container-low transition-colors rounded-full p-2 -ml-2 active:opacity-80 flex items-center justify-center"
        @click="goBack"
      >
        <span class="material-symbols-outlined">arrow_back</span>
      </button>
      <h1 class="font-headline-sm text-headline-sm text-primary tracking-tight ml-2">
        Fin de prestation
      </h1>
    </header>

    <main class="flex-grow pt-[72px] px-margin-mobile pb-lg max-w-lg mx-auto w-full">
      <div class="mb-md">
      </div>

      <div class="mb-lg">
        <div
          class="inline-flex items-center px-2 py-1 rounded bg-secondary-fixed text-on-secondary-fixed-variant font-label-mono text-label-mono uppercase tracking-wider mb-sm"
        >
          {{ executionStore.statusBadge }}
        </div>
        <p class="font-body-lg text-body-lg text-on-surface-variant mt-sm">
          Vérifiez le déroulé puis déclarez une fin complète.
        </p>
      </div>

      <div class="bg-surface-container-lowest border border-surface-container rounded-lg p-md mb-lg">
        <h2 class="font-headline-md text-headline-md text-primary mb-md">Résumé de l’exécution</h2>
        <div class="flex flex-col gap-sm">
          <div class="flex items-start gap-3">
            <span class="material-symbols-outlined text-outline mt-1">schedule</span>
            <div>
              <p class="font-body-md text-body-md text-on-surface">
                Début :
                {{
                  executionStore.startEvent
                    ? executionStore.formatTime(executionStore.startEvent.at)
                    : '—'
                }}
              </p>
              <p class="font-body-md text-body-md text-on-surface-variant opacity-80">
                Créneau prévu : {{ summary.startTime }} – {{ summary.endTime }}
              </p>
            </div>
          </div>
          <div class="h-px bg-surface-container w-full my-xs" />
          <div class="flex items-start gap-3">
            <span class="material-symbols-outlined text-outline mt-1">face</span>
            <div>
              <p class="font-body-md text-body-md text-on-surface font-semibold">
                {{ summary.clientDisplayName }}
              </p>
              <p class="font-body-md text-body-md text-on-surface-variant opacity-80">
                {{ summary.serviceLabel }}
              </p>
            </div>
          </div>
          <div class="h-px bg-surface-container w-full my-xs" />
          <div class="flex items-start gap-3">
            <span class="material-symbols-outlined text-outline mt-1">location_on</span>
            <div>
              <p class="font-body-md text-body-md text-on-surface">{{ summary.placeLabel }}</p>
              <div class="mt-xs bg-surface-container-low p-2 rounded flex flex-col gap-1">
                <p class="font-label-mono text-label-mono text-on-surface-variant">ARRIVÉES</p>
                <p class="font-body-md text-body-md text-on-surface">
                  Cliente :
                  {{
                    executionStore.arrivalClient
                      ? executionStore.formatTime(executionStore.arrivalClient.at)
                      : '—'
                  }}
                </p>
                <p class="font-body-md text-body-md text-on-surface">
                  Coiffeuse :
                  {{
                    executionStore.arrivalPro
                      ? executionStore.formatTime(executionStore.arrivalPro.at)
                      : '—'
                  }}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="mb-3 rounded-lg overflow-hidden h-28 bg-surface-container">
        <img alt="" class="w-full h-full object-cover" :src="EXECUTION_HERO_FIN" />
      </div>

      <section class="mb-lg">
        <h3 class="font-headline-sm text-headline-sm text-primary mb-sm">Issue</h3>
        <div
          class="bg-surface border border-surface-container rounded-lg p-md relative overflow-hidden"
        >
          <div class="absolute top-0 left-0 w-1 h-full bg-primary" />
          <div class="flex items-start gap-3">
            <span class="material-symbols-outlined text-primary mt-1">check_circle</span>
            <div>
              <h4 class="font-body-lg text-body-lg font-semibold text-primary">Fin complète</h4>
              <p class="font-body-md text-body-md text-on-surface-variant mt-xs">
                La prestation a été réalisée comme prévu.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section class="mb-xl">
        <label class="block font-body-md text-body-md font-bold text-primary mb-xs" for="optional-note">
          Note (optionnel)
        </label>
        <textarea
          id="optional-note"
          v-model="note"
          maxlength="120"
          rows="3"
          class="w-full bg-surface border border-surface-container rounded-lg p-3 font-body-md text-body-md text-on-surface placeholder:text-outline-variant focus:ring-1 focus:ring-primary focus:border-primary transition-shadow resize-none"
          placeholder="Ex. Résultat conforme, cliente satisfaite…"
        />
      </section>
    </main>

    <div
      class="fixed bottom-0 left-0 w-full bg-surface border-t border-surface-container-highest p-margin-mobile flex flex-col gap-3 z-40"
    >
      <div class="flex flex-col items-center gap-xs">
        <p class="font-body-md text-body-md text-on-surface-variant text-center opacity-80">
          La cliente devra encore confirmer la réalisation pour passer à COMPLETED.
        </p>
        <DemoRoleHandoff :target-role="DemoRole.PRO" action="déclarer la fin" />
      </div>
      <button
        type="button"
        class="w-full bg-primary text-on-primary font-body-md font-semibold h-[44px] rounded flex items-center justify-center active:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed"
        :disabled="!canDeclare"
        @click="declareEnd"
      >
        Déclarer la fin complète
      </button>
      <button
        type="button"
        class="w-full bg-surface-container-lowest text-primary border border-surface-container font-body-md font-semibold h-[44px] rounded flex items-center justify-center active:bg-surface-container-low transition-colors"
        @click="goBack"
      >
        Revenir
      </button>
    </div>
  </div>
</template>
