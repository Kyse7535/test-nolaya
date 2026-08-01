<script setup>
import { computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { storeToRefs } from 'pinia'
import { statusBadgeLabel } from '../../domain/demand/labels'
import {
  MOBILITY_OPTIONS,
  PLACE_OPTIONS,
  RADIUS_OPTIONS,
} from '../../mocks/inspirations'
import { mockClient } from '../../mocks/platform'
import { useDemandStore } from '../../stores/demand'

const router = useRouter()
const demandStore = useDemandStore()
const { currentDemand, timingBudgetReady, zoneReady } = storeToRefs(demandStore)

const badge = computed(() => statusBadgeLabel(currentDemand.value?.status))
const areaLabel = computed(
  () => currentDemand.value?.zone?.areaLabel || mockClient.zoneLabel,
)
const radiusKm = computed(() => currentDemand.value?.zone?.radiusKm)
const mobility = computed(() => currentDemand.value?.zone?.mobility)
const placeIds = computed(() => currentDemand.value?.zone?.placeIds ?? [])

onMounted(() => {
  if (!demandStore.currentDemand) demandStore.startDraft()
  if (!timingBudgetReady.value) {
    router.replace({ name: 'demand-temps-budget' })
  }
})

function goBack() {
  router.push({ name: 'demand-temps-budget' })
}

function selectRadius(km) {
  demandStore.setRadius(km)
}

function selectMobility(id) {
  demandStore.setMobility(id)
}

function togglePlace(id) {
  demandStore.togglePlace(id)
}

function continueNext() {
  if (!zoneReady.value) return
  router.push({ name: 'demand-service' })
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
      <div class="flex items-center gap-2 mb-lg text-label-sm font-label-sm">
        <span class="text-on-surface-variant">3 Temps</span>
        <span class="text-outline">·</span>
        <span class="text-secondary font-semibold">4 Zone</span>
        <span class="text-outline">·</span>
        <span class="text-on-surface-variant/50">5 Service</span>
      </div>

      <h2 class="text-headline-lg-mobile font-headline-lg-mobile text-primary mb-sm">
        Zone & mobilité
      </h2>
      <p class="text-body-md font-body-md text-on-surface-variant mb-lg">
        Indiquez où la prestation peut avoir lieu. L’adresse exacte viendra plus tard.
      </p>

      <section class="mb-xl">
        <p class="text-body-sm font-body-sm text-on-surface mb-xs">Votre zone</p>
        <div
          class="rounded-lg border border-outline-variant bg-surface-container-low px-md py-3 mb-md flex items-center gap-sm"
        >
          <span class="material-symbols-outlined text-secondary">location_on</span>
          <span class="font-mono-data text-mono-data text-on-surface">{{ areaLabel }}</span>
        </div>

        <p class="text-body-sm font-body-sm text-on-surface mb-sm">Rayon de recherche</p>
        <div class="grid grid-cols-4 gap-sm">
          <button
            v-for="opt in RADIUS_OPTIONS"
            :key="opt.id"
            type="button"
            class="py-3 rounded-lg border text-label-sm font-label-sm transition-colors"
            :class="
              radiusKm === opt.id
                ? 'border-secondary bg-secondary-container text-on-secondary-container'
                : 'border-outline-variant bg-surface-container-lowest'
            "
            @click="selectRadius(opt.id)"
          >
            {{ opt.label }}
          </button>
        </div>
      </section>

      <section class="mb-xl">
        <p class="text-body-sm font-body-sm text-on-surface mb-sm">Qui se déplace ?</p>
        <div class="flex flex-col gap-sm">
          <button
            v-for="opt in MOBILITY_OPTIONS"
            :key="opt.id"
            type="button"
            class="w-full text-left px-md py-3 rounded-lg border transition-colors"
            :class="
              mobility === opt.id
                ? 'border-secondary bg-secondary-container/40'
                : 'border-outline-variant bg-surface-container-lowest'
            "
            @click="selectMobility(opt.id)"
          >
            {{ opt.label }}
          </button>
        </div>
      </section>

      <section class="mb-xl">
        <p class="text-body-sm font-body-sm text-on-surface mb-sm">Lieux acceptés</p>
        <div class="flex flex-col gap-sm mb-sm">
          <button
            v-for="opt in PLACE_OPTIONS"
            :key="opt.id"
            type="button"
            class="w-full text-left px-md py-3 rounded-lg border flex items-center justify-between transition-colors"
            :class="
              placeIds.includes(opt.id)
                ? 'border-secondary bg-secondary-container/40'
                : 'border-outline-variant bg-surface-container-lowest'
            "
            @click="togglePlace(opt.id)"
          >
            <span>{{ opt.label }}</span>
            <span
              v-if="placeIds.includes(opt.id)"
              class="material-symbols-outlined text-secondary text-[20px]"
            >
              check
            </span>
          </button>
        </div>
        <p class="text-body-sm font-body-sm text-on-surface-variant">
          Choisissez au moins un lieu accepté.
        </p>
        <p class="text-body-sm font-body-sm text-on-surface-variant italic mt-md">
          Pas de matching ici — seulement le cadre géographique de votre demande.
        </p>
      </section>
    </main>

    <div
      class="fixed bottom-0 left-0 w-full bg-surface border-t border-surface-container p-container-margin z-50"
    >
      <button
        type="button"
        class="w-full max-w-[672px] mx-auto bg-primary text-on-primary font-button-text text-button-text py-3 rounded-lg disabled:opacity-50 block"
        :disabled="!zoneReady"
        @click="continueNext"
      >
        Continuer
      </button>
    </div>
  </div>
</template>
