<script setup>
import { computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { storeToRefs } from 'pinia'
import {
  formatDuration,
  formatMoney,
  pricingTotal,
  supplementsTotal,
} from '../../domain/capacity/labels'
import { useCapacityStore } from '../../stores/capacity'

const router = useRouter()
const capacityStore = useCapacityStore()
const { currentCapacity, pricingReady, serviceReady } = storeToRefs(capacityStore)

const pricing = computed(() => currentCapacity.value?.pricing ?? {})
const supplements = computed(() => pricing.value.supplements ?? [])
const canAddSupplement = computed(() => supplements.value.length < 2)
const basePrice = computed(() => Number(pricing.value.basePrice) || 0)
const durationMinutes = computed(() => Number(pricing.value.durationMinutes) || 0)
const extrasTotal = computed(() => supplementsTotal(currentCapacity.value))
const total = computed(() => pricingTotal(currentCapacity.value))
const prestationLabel = computed(
  () => currentCapacity.value?.prestation?.label ?? 'Prestation',
)

onMounted(() => {
  if (!capacityStore.currentCapacity) {
    capacityStore.startDraft()
  }
  if (!serviceReady.value) {
    router.replace({ name: 'capacity-service' })
  }
})

function goBack() {
  router.push({ name: 'capacity-service' })
}

function onBasePrice(event) {
  capacityStore.setPricingFields({ basePrice: event.target.value })
}

function onDuration(event) {
  capacityStore.setPricingFields({ durationMinutes: event.target.value })
}

function addSupplement() {
  capacityStore.addSupplement()
}

function updateLabel(index, event) {
  capacityStore.updateSupplement(index, { label: event.target.value })
}

function updateAmount(index, event) {
  capacityStore.updateSupplement(index, { amount: event.target.value })
}

function removeSupplement(index) {
  capacityStore.removeSupplement(index)
}

function continueNext() {
  if (!pricingReady.value) return
  router.push({ name: 'capacity-lieu' })
}
</script>

<template>
  <div
    class="bg-surface font-body-md text-on-surface antialiased flex flex-col h-[calc(100dvh-var(--as-role-bar)-var(--as-bottom-nav)-env(safe-area-inset-bottom,0px))]"
  >
    <header
      class="shrink-0 z-50 bg-surface border-b border-surface-variant"
    >
      <div class="flex justify-between items-center px-container-margin h-14 w-full">
        <button
          type="button"
          aria-label="Retour"
          class="flex items-center justify-center p-2 -ml-2 text-primary hover:bg-surface-container-low transition-colors rounded-full active:opacity-80"
          @click="goBack"
        >
          <span class="material-symbols-outlined">arrow_back</span>
        </button>
        <h1 class="font-headline-sm text-headline-sm font-bold text-primary truncate px-4">
          Capacité professionnelle
        </h1>
        <span
          class="font-label-caps text-label-caps text-on-surface-variant bg-surface-container-high px-2 py-1 rounded"
        >
          BROUILLON
        </span>
      </div>
    </header>

    <main class="flex-1 min-h-0 overflow-y-auto w-full max-w-lg mx-auto">
      <section class="px-container-margin pt-md pb-sm">
        <div class="flex items-center gap-sm mb-sm">
          <div class="flex-1 h-1 bg-primary rounded-full" />
          <div class="flex-1 h-1 bg-primary rounded-full" />
          <div class="flex-1 h-1 bg-primary rounded-full" />
          <div class="flex-1 h-1 bg-primary rounded-full" />
          <div class="flex-1 h-1 bg-surface-container-high rounded-full" />
        </div>
        <h2 class="font-headline-md text-headline-md text-primary mb-xs">
          Prix, durée &amp; suppléments
        </h2>
        <p class="font-body-sm text-body-sm text-on-surface-variant">
          Étape 4 sur 5. Définissez la valeur et le temps pour cette prestation.
        </p>
      </section>

      <section class="px-container-margin pb-md flex flex-col gap-md">
        <div class="bg-surface-container-lowest rounded border border-surface-variant p-sm">
          <div class="grid grid-cols-2 gap-sm">
            <div>
              <label
                class="block font-body-sm text-body-sm text-on-surface mb-xs"
                for="basePrice"
              >
                Prix de base (€)
              </label>
              <div class="relative">
                <input
                  id="basePrice"
                  type="number"
                  min="0"
                  step="1"
                  class="w-full bg-surface-container-lowest border border-surface-variant rounded h-11 px-sm pl-12 font-label-technical text-label-technical text-primary focus:border-primary transition-colors text-right"
                  placeholder="0"
                  :value="basePrice || ''"
                  @input="onBasePrice"
                />
                <span
                  class="absolute left-sm top-1/2 -translate-y-1/2 font-label-technical text-label-technical text-on-surface-variant"
                >
                  EUR
                </span>
              </div>
            </div>
            <div>
              <label class="block font-body-sm text-body-sm text-on-surface mb-xs" for="duration">
                Durée (min)
              </label>
              <div class="relative">
                <input
                  id="duration"
                  type="number"
                  min="0"
                  step="15"
                  class="w-full bg-surface-container-lowest border border-surface-variant rounded h-11 px-sm pl-12 font-label-technical text-label-technical text-primary focus:border-primary transition-colors text-right"
                  placeholder="0"
                  :value="durationMinutes || ''"
                  @input="onDuration"
                />
                <span
                  class="absolute left-sm top-1/2 -translate-y-1/2 font-label-technical text-label-technical text-on-surface-variant"
                >
                  MIN
                </span>
              </div>
            </div>
          </div>
        </div>

        <div>
          <div class="flex justify-between items-center mb-xs">
            <label class="block font-body-md text-body-md font-semibold text-primary">
              Suppléments (0 à 2)
            </label>
            <button
              type="button"
              aria-label="Ajouter un supplément"
              class="text-primary hover:bg-surface-container p-1 rounded transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
              :disabled="!canAddSupplement"
              @click="addSupplement"
            >
              <span class="material-symbols-outlined">add_circle</span>
            </button>
          </div>

          <div class="flex flex-col gap-xs">
            <div
              v-for="(supplement, index) in supplements"
              :key="index"
              class="flex gap-sm items-center bg-surface-container-lowest rounded border border-surface-variant p-sm"
            >
              <div class="flex-1">
                <input
                  type="text"
                  class="w-full bg-transparent border-none font-body-md text-body-md text-primary focus:ring-0 p-0"
                  placeholder="Nom du supplément"
                  :value="supplement.label"
                  @input="updateLabel(index, $event)"
                />
              </div>
              <div class="w-24 relative">
                <input
                  type="number"
                  min="0"
                  class="w-full bg-surface border border-surface-variant rounded h-10 px-xs pl-5 font-label-technical text-label-technical text-primary text-right focus:border-primary transition-colors"
                  :value="supplement.amount || ''"
                  @input="updateAmount(index, $event)"
                />
                <span
                  class="absolute left-xs top-1/2 -translate-y-1/2 font-label-technical text-label-technical text-on-surface-variant"
                >
                  €
                </span>
              </div>
              <button
                type="button"
                aria-label="Supprimer"
                class="text-outline hover:text-error transition-colors p-1"
                @click="removeSupplement(index)"
              >
                <span class="material-symbols-outlined text-[20px]">delete</span>
              </button>
            </div>
          </div>
        </div>

        <div class="bg-surface-container rounded-lg p-sm relative overflow-hidden">
          <div class="absolute top-0 left-0 w-full h-1 bg-secondary-container" />
          <h3 class="font-body-md text-body-md font-semibold text-primary flex items-center gap-xs mb-sm pt-xs">
            <span class="material-symbols-outlined text-[20px]">receipt_long</span>
            Aperçu devis
          </h3>
          <div class="flex flex-col gap-xs">
            <div class="flex justify-between items-center border-b border-surface-variant pb-xs">
              <span class="font-body-sm text-body-sm text-on-surface-variant truncate pr-2">
                Prestation ({{ prestationLabel }})
              </span>
              <span class="font-label-technical text-label-technical text-primary shrink-0">
                {{ formatMoney(basePrice) }}
              </span>
            </div>
            <div class="flex justify-between items-center border-b border-surface-variant pb-xs">
              <span class="font-body-sm text-body-sm text-on-surface-variant">
                Suppléments ({{ supplements.length }})
              </span>
              <span class="font-label-technical text-label-technical text-primary">
                + {{ formatMoney(extrasTotal) }}
              </span>
            </div>
            <div class="flex justify-between items-center">
              <span class="font-body-sm text-body-sm font-bold text-primary">
                Prix total estimé
              </span>
              <span class="font-label-technical text-label-technical font-bold text-primary">
                {{ formatMoney(total) }}
              </span>
            </div>
            <div class="flex justify-between items-center">
              <span class="font-body-sm text-body-sm text-on-surface-variant">
                Durée estimée totale
              </span>
              <span class="font-label-technical text-label-technical text-primary">
                {{ formatDuration(durationMinutes) }}
              </span>
            </div>
          </div>
        </div>
      </section>
    </main>

    <div
      class="shrink-0 w-full px-container-margin pt-md pb-md bg-surface border-t border-outline-variant z-40"
    >
      <button
        type="button"
        class="w-full h-12 bg-primary text-on-primary font-body-lg text-body-lg font-semibold rounded flex items-center justify-center gap-sm hover:bg-on-surface transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        :disabled="!pricingReady"
        @click="continueNext"
      >
        Continuer
        <span class="material-symbols-outlined">arrow_forward</span>
      </button>
    </div>
  </div>
</template>
