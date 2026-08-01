<script setup>
import { computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { storeToRefs } from 'pinia'
import {
  budgetSummary,
  clientTaskLabels,
  contextLabels,
  priorityLabel,
  protectionLabels,
  resultSummary,
  serviceLevelLabel,
  statusBadgeLabel,
  timingSummary,
  zoneSummary,
} from '../../domain/demand/labels'
import { getInspiration } from '../../mocks/inspirations'
import { mockClient } from '../../mocks/platform'
import { useDemandStore } from '../../stores/demand'

const router = useRouter()
const demandStore = useDemandStore()
const { currentDemand, serviceReady, canQualifyNow } = storeToRefs(demandStore)

const badge = computed(() => statusBadgeLabel(currentDemand.value?.status))
const demand = computed(() => currentDemand.value)
const thumb = computed(() => getInspiration(demand.value?.result?.inspirationId)?.src)
const confirmed = computed(() => Boolean(demand.value?.confirmed))

onMounted(() => {
  if (!demandStore.currentDemand) demandStore.startDraft()
  if (!serviceReady.value) {
    router.replace({ name: 'demand-service' })
  }
})

function goBack() {
  router.push({ name: 'demand-service' })
}

function editSection(routeName) {
  router.push({ name: routeName })
}

function onConfirm(event) {
  demandStore.setConfirmed(event.target.checked)
}

function qualify() {
  if (!demandStore.qualify()) return
  router.push({ name: 'demand-succes' })
}
</script>

<template>
  <div class="bg-background text-on-background font-body-md min-h-screen pb-28">
    <header
      class="bg-background sticky top-0 w-full z-50 border-b border-surface-container flex items-center justify-between px-container-margin h-16"
    >
      <button
        type="button"
        aria-label="Retour"
        class="text-primary hover:opacity-80 active:scale-95"
        @click="goBack"
      >
        <span class="material-symbols-outlined">arrow_back</span>
      </button>
      <h1 class="text-headline-md font-headline-md text-primary font-bold tracking-tight">
        Résumé de ma demande
      </h1>
      <span
        class="text-label-caps font-label-caps bg-secondary-container text-on-secondary-container px-2 py-1 rounded"
      >
        {{ badge }}
      </span>
    </header>

    <main class="max-w-2xl mx-auto px-container-margin pt-md pb-lg">
      <div class="flex items-center gap-md mb-lg">
        <img
          :src="mockClient.avatarUrl"
          alt=""
          class="w-12 h-12 rounded-full object-cover border border-surface-container"
        />
        <div>
          <p class="font-headline-sm text-headline-sm text-primary">{{ mockClient.firstName }}</p>
          <p class="font-body-sm text-body-sm text-on-surface-variant">
            Vérifiez puis validez votre demande structurée.
          </p>
        </div>
      </div>

      <section
        class="bg-surface-container-lowest border border-outline-variant rounded-lg p-md mb-md"
      >
        <div class="flex items-start justify-between gap-md mb-sm">
          <h3 class="font-headline-sm text-headline-sm text-primary">Résultat</h3>
          <button
            type="button"
            class="text-secondary text-body-sm font-body-sm underline-offset-2 hover:underline"
            @click="editSection('demand-resultat')"
          >
            Modifier
          </button>
        </div>
        <div class="flex gap-md items-center">
          <div
            v-if="thumb"
            class="w-16 h-16 shrink-0 overflow-hidden bg-surface-variant rounded"
          >
            <img :src="thumb" alt="" class="w-full h-full object-cover" />
          </div>
          <div>
            <p class="font-body-md text-body-md text-on-surface">{{ resultSummary(demand) }}</p>
            <p class="font-body-sm text-body-sm text-on-surface-variant mt-xs">
              {{ contextLabels(demand?.result?.contextIds) }}
            </p>
          </div>
        </div>
      </section>

      <section
        class="bg-surface-container-lowest border border-outline-variant rounded-lg p-md mb-md"
      >
        <div class="flex items-start justify-between gap-md mb-sm">
          <h3 class="font-headline-sm text-headline-sm text-primary">Temps & budget</h3>
          <button
            type="button"
            class="text-secondary text-body-sm font-body-sm underline-offset-2 hover:underline"
            @click="editSection('demand-temps-budget')"
          >
            Modifier
          </button>
        </div>
        <p class="font-body-md text-body-md text-on-surface">{{ timingSummary(demand) }}</p>
        <p class="font-body-sm text-body-sm text-on-surface-variant mt-xs">
          {{ budgetSummary(demand) }}
        </p>
      </section>

      <section
        class="bg-surface-container-lowest border border-outline-variant rounded-lg p-md mb-md"
      >
        <div class="flex items-start justify-between gap-md mb-sm">
          <h3 class="font-headline-sm text-headline-sm text-primary">Zone & mobilité</h3>
          <button
            type="button"
            class="text-secondary text-body-sm font-body-sm underline-offset-2 hover:underline"
            @click="editSection('demand-zone')"
          >
            Modifier
          </button>
        </div>
        <p class="font-body-md text-body-md text-on-surface">{{ zoneSummary(demand) }}</p>
      </section>

      <section
        class="bg-surface-container-lowest border border-outline-variant rounded-lg p-md mb-md"
      >
        <div class="flex items-start justify-between gap-md mb-sm">
          <h3 class="font-headline-sm text-headline-sm text-primary">Protection & service</h3>
          <button
            type="button"
            class="text-secondary text-body-sm font-body-sm underline-offset-2 hover:underline"
            @click="editSection('demand-service')"
          >
            Modifier
          </button>
        </div>
        <p class="font-body-md text-body-md text-on-surface">
          {{ serviceLevelLabel(demand?.serviceLevel) }} · priorité
          {{ priorityLabel(demand?.searchPriority) }}
        </p>
        <p class="font-body-sm text-body-sm text-on-surface-variant mt-xs">
          {{ protectionLabels(demand?.protectionIds) }}
        </p>
        <p
          v-if="demand?.clientTasks?.length"
          class="font-body-sm text-body-sm text-on-surface-variant mt-xs"
        >
          Tâches : {{ clientTaskLabels(demand?.clientTasks) }}
        </p>
      </section>

      <label
        class="flex items-start gap-md p-md rounded-lg border border-outline-variant bg-surface-container-low cursor-pointer"
      >
        <input
          type="checkbox"
          class="mt-1 rounded border-outline text-secondary focus:ring-secondary"
          :checked="confirmed"
          @change="onConfirm"
        />
        <span class="font-body-sm text-body-sm text-on-surface">
          Je confirme que cette demande décrit correctement mon besoin. Elle sera marquée
          DEMAND_QUALIFIED.
        </span>
      </label>

      <p class="text-center mt-md">
        <span class="text-label-sm font-label-sm text-outline">→ DEMAND_QUALIFIED</span>
      </p>
    </main>

    <div
      class="fixed bottom-0 left-0 w-full bg-surface border-t border-surface-container p-container-margin z-50"
    >
      <button
        type="button"
        class="w-full max-w-[672px] mx-auto bg-primary text-on-primary font-button-text text-button-text py-3 rounded-lg disabled:opacity-50 block"
        :disabled="!canQualifyNow"
        @click="qualify"
      >
        Valider ma demande
      </button>
    </div>
  </div>
</template>
