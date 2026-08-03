<script setup>
import { computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { storeToRefs } from 'pinia'
import { statusBadgeLabel } from '../../domain/demand/labels'
import {
  CONTEXT_OPTIONS,
  VARIANTE_OPTIONS,
  inspirationCatalog,
} from '../../mocks/inspirations'
import { useDemandStore } from '../../stores/demand'

const router = useRouter()
const demandStore = useDemandStore()
const { currentDemand, entryReady, resultReady } = storeToRefs(demandStore)

const badge = computed(() => statusBadgeLabel(currentDemand.value?.status))
const selectedId = computed(() => currentDemand.value?.result?.inspirationId)
const selectedVariante = computed(() => currentDemand.value?.result?.variante)
const selectedContexts = computed(() => currentDemand.value?.result?.contextIds ?? [])

onMounted(() => {
  if (!demandStore.currentDemand) demandStore.startDraft()
  if (!entryReady.value) {
    router.replace({ name: 'demand-entree' })
  }
})

function goBack() {
  router.push({ name: 'demand-entree' })
}

function selectInspiration(id) {
  demandStore.setInspiration(id)
}

function selectVariante(id) {
  demandStore.setVariante(id)
}

function toggleContext(id) {
  demandStore.toggleContext(id)
}

function continueNext() {
  if (!resultReady.value) return
  router.push({ name: 'demand-temps-budget' })
}
</script>

<template>
  <div class="bg-background text-on-background font-body-md min-h-screen pb-24">
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
        Qualifier mon besoin
      </h1>
      <span
        class="text-label-caps font-label-caps bg-secondary-container text-on-secondary-container px-2 py-1 rounded"
      >
        {{ badge }}
      </span>
    </header>

    <main class="max-w-2xl mx-auto px-container-margin pt-md pb-lg">
      <div class="flex items-center gap-2 mb-lg overflow-x-auto">
        <span class="text-label-sm font-label-sm text-on-surface-variant whitespace-nowrap">
          1 Entrée
        </span>
        <span class="text-outline">·</span>
        <span class="text-label-sm font-label-sm text-secondary font-semibold whitespace-nowrap">
          2 Résultat
        </span>
        <span class="text-outline">·</span>
        <span class="text-label-sm font-label-sm text-on-surface-variant/50 whitespace-nowrap">
          3 Temps
        </span>
      </div>

      <h2 class="text-headline-lg-mobile font-headline-lg-mobile text-primary mb-sm">
        Votre résultat
      </h2>
      <p class="text-body-md font-body-md text-on-surface-variant mb-lg">
        Choisissez le style qui correspond à ce que vous voulez obtenir.
      </p>

      <h3 class="text-headline-sm font-headline-sm text-primary mb-md">Inspirations</h3>
      <div class="grid grid-cols-2 gap-sm mb-lg">
        <button
          v-for="item in inspirationCatalog"
          :key="item.id"
          type="button"
          class="relative aspect-[3/4] overflow-hidden bg-surface-variant text-left transition-all"
          :class="selectedId === item.id ? 'ring-2 ring-secondary outline outline-1 outline-primary' : 'opacity-90'"
          @click="selectInspiration(item.id)"
        >
          <img :src="item.src" :alt="item.label" class="w-full h-full object-cover" />
          <div
            class="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 to-transparent p-sm"
          >
            <p class="text-white text-caption font-caption">{{ item.label }}</p>
          </div>
          <span
            v-if="item.popular"
            class="absolute top-2 left-2 bg-secondary-container text-on-secondary-container text-label-sm font-label-sm px-1.5 py-0.5 uppercase"
          >
            Populaire
          </span>
        </button>
      </div>
      <p class="text-body-sm font-body-sm text-on-surface-variant mb-lg">
        Une seule inspiration principale pour cette démo.
      </p>

      <h3 class="text-headline-sm font-headline-sm text-primary mb-md">Variante</h3>
      <div class="flex flex-col gap-sm mb-lg">
        <button
          v-for="opt in VARIANTE_OPTIONS"
          :key="opt.id"
          type="button"
          class="w-full text-left px-md py-3 rounded-lg border transition-colors"
          :class="selectedVariante === opt.id ? 'border-secondary bg-secondary-container/40 text-on-secondary-container' : 'border-outline-variant bg-surface-container-lowest'"
          @click="selectVariante(opt.id)"
        >
          {{ opt.label }}
        </button>
      </div>

      <h3 class="text-headline-sm font-headline-sm text-primary mb-md">Contexte (optionnel)</h3>
      <div class="flex flex-wrap gap-sm mb-lg">
        <button
          v-for="opt in CONTEXT_OPTIONS"
          :key="opt.id"
          type="button"
          class="px-3 py-2 rounded-lg border text-body-sm font-body-sm transition-colors"
          :class="selectedContexts.includes(opt.id) ? 'border-secondary bg-secondary-container text-on-secondary-container' : 'border-outline-variant bg-surface-container-lowest'"
          @click="toggleContext(opt.id)"
        >
          {{ opt.label }}
        </button>
      </div>
    </main>

    <div
      class="fixed bottom-0 left-0 w-full bg-surface border-t border-surface-container p-container-margin z-50"
    >
      <button
        type="button"
        class="w-full max-w-[672px] mx-auto bg-primary text-on-primary font-button-text text-button-text py-3 rounded-lg disabled:opacity-50 block"
        :disabled="!resultReady"
        @click="continueNext"
      >
        Continuer
      </button>
    </div>
  </div>
</template>
