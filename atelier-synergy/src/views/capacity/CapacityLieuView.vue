<script setup>
import { computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { storeToRefs } from 'pinia'
import {
  AVAILABILITY_DAYS,
  AVAILABILITY_SLOTS,
  LOCATION_OPTIONS,
} from '../../mocks/catalog'
import { useCapacityStore } from '../../stores/capacity'

const router = useRouter()
const capacityStore = useCapacityStore()
const { currentCapacity, locationReady, pricingReady } = storeToRefs(capacityStore)

const selectedLocation = computed(() => currentCapacity.value?.location?.context)
const selectedDays = computed(() => currentCapacity.value?.availability?.days ?? [])
const selectedSlots = computed(() => currentCapacity.value?.availability?.slots ?? [])

onMounted(() => {
  if (!capacityStore.currentCapacity) {
    capacityStore.startDraft()
  }
  if (!pricingReady.value) {
    router.replace({ name: 'capacity-prix' })
  }
})

function goBack() {
  router.push({ name: 'capacity-prix' })
}

function selectLocation(id) {
  capacityStore.setLocation(id)
}

function toggleDay(id) {
  capacityStore.toggleAvailabilityDay(id)
}

function toggleSlot(id) {
  capacityStore.toggleAvailabilitySlot(id)
}

function onCapacityMax(event) {
  capacityStore.setVolumeFields({ capacityMax: event.target.value })
}

function onVolume(event) {
  capacityStore.setVolumeFields({ desiredDemandVolume: event.target.value })
}

function continueNext() {
  if (!locationReady.value) return
  router.push({ name: 'capacity-recap' })
}
</script>

<template>
  <div class="bg-surface text-on-surface font-body-md antialiased pb-32 min-h-screen">
    <header
      class="bg-surface text-primary font-headline-sm text-headline-sm sticky top-0 w-full border-b border-outline-variant z-50"
    >
      <div class="flex items-center px-container-margin h-16 w-full max-w-screen-xl mx-auto">
        <button
          type="button"
          class="active:scale-95 transition-transform hover:bg-surface-container rounded-full p-2 -ml-2 text-on-surface-variant"
          @click="goBack"
        >
          <span class="material-symbols-outlined">arrow_back</span>
        </button>
        <h1 class="ml-4 font-headline-sm text-headline-sm font-bold text-primary">
          Capacité professionnelle
        </h1>
        <div class="ml-auto">
          <span
            class="font-label-technical text-label-technical bg-secondary-fixed text-on-secondary-fixed-variant px-2 py-1 rounded-sm uppercase"
          >
            Brouillon
          </span>
        </div>
      </div>
    </header>

    <main class="px-container-margin py-lg max-w-md mx-auto">
      <div class="flex items-center justify-between mb-lg">
        <div class="flex gap-2">
          <div class="w-8 h-1 rounded-full bg-primary-fixed" />
          <div class="w-8 h-1 rounded-full bg-primary-fixed" />
          <div class="w-8 h-1 rounded-full bg-primary-fixed" />
          <div class="w-8 h-1 rounded-full bg-primary-fixed" />
          <div class="w-8 h-1 rounded-full bg-primary" />
        </div>
        <span class="font-label-technical text-label-technical text-on-surface-variant">
          Étape 5/5
        </span>
      </div>

      <section class="mb-xl">
        <h2 class="font-display-lg-mobile text-display-lg-mobile mb-sm">
          Lieu, disponibilités &amp; volume
        </h2>
        <p class="font-body-md text-body-md text-on-surface-variant">
          Indiquez où et quand cette prestation est réalisable, et combien de demandes vous
          souhaitez.
        </p>
      </section>

      <section class="mb-xl">
        <h3 class="font-headline-sm text-headline-sm mb-md">Contexte d'exécution</h3>
        <div class="grid gap-md">
          <label
            v-for="option in LOCATION_OPTIONS"
            :key="option.id"
            class="cursor-pointer relative"
          >
            <input
              class="capacity-location peer sr-only"
              type="radio"
              name="location"
              :value="option.id"
              :checked="selectedLocation === option.id"
              @change="selectLocation(option.id)"
            />
            <div
              class="border border-outline-variant rounded-lg p-md bg-surface-container-lowest transition-colors flex items-start gap-md"
            >
              <span class="material-symbols-outlined text-outline radio-icon mt-0.5">
                {{ option.icon }}
              </span>
              <div>
                <span class="block font-headline-sm text-headline-sm mb-xs">{{ option.label }}</span>
                <span class="block font-body-md text-body-md text-on-surface-variant">
                  {{ option.description }}
                </span>
              </div>
            </div>
          </label>
        </div>
      </section>

      <section class="mb-xl">
        <h3 class="font-headline-sm text-headline-sm mb-md">Disponibilités</h3>
        <div class="mb-md">
          <span class="block font-label-caps text-label-caps text-on-surface-variant mb-sm">
            JOURS
          </span>
          <div class="flex gap-sm overflow-x-auto hide-scrollbar pb-xs">
            <label
              v-for="day in AVAILABILITY_DAYS"
              :key="day.id"
              class="cursor-pointer shrink-0"
            >
              <input
                class="capacity-day peer sr-only"
                type="checkbox"
                :checked="selectedDays.includes(day.id)"
                @change="toggleDay(day.id)"
              />
              <div
                class="px-md py-sm border border-outline-variant rounded-full font-label-caps text-label-caps text-on-surface transition-colors bg-surface-container-lowest"
              >
                {{ day.label.toUpperCase() }}
              </div>
            </label>
          </div>
        </div>
        <div>
          <span class="block font-label-caps text-label-caps text-on-surface-variant mb-sm">
            CRÉNEAUX
          </span>
          <div class="flex flex-wrap gap-sm">
            <label v-for="slot in AVAILABILITY_SLOTS" :key="slot.id" class="cursor-pointer">
              <input
                class="capacity-slot peer sr-only"
                type="checkbox"
                :checked="selectedSlots.includes(slot.id)"
                @change="toggleSlot(slot.id)"
              />
              <div
                class="px-md py-sm border border-outline-variant rounded-full font-label-technical text-label-technical text-on-surface transition-colors bg-surface-container-lowest"
              >
                {{ slot.label }}
              </div>
            </label>
          </div>
        </div>
      </section>

      <section class="mb-xl">
        <h3 class="font-headline-sm text-headline-sm mb-md">Volume</h3>
        <div class="grid gap-md">
          <div>
            <label
              class="block font-body-md text-body-md text-on-surface mb-xs"
              for="capacity"
            >
              Capacité max (RDV / jour)
            </label>
            <input
              id="capacity"
              type="number"
              min="0"
              class="w-full bg-surface-container-lowest border border-outline-variant rounded px-md py-sm font-label-technical text-label-technical focus:ring-1 focus:ring-primary focus:border-primary outline-none transition-colors"
              :value="currentCapacity?.capacityMax || ''"
              @input="onCapacityMax"
            />
          </div>
          <div>
            <label class="block font-body-md text-body-md text-on-surface mb-xs" for="volume">
              Volume de demandes souhaité
            </label>
            <input
              id="volume"
              type="number"
              min="0"
              class="w-full bg-surface-container-lowest border border-outline-variant rounded px-md py-sm font-label-technical text-label-technical focus:ring-1 focus:ring-primary focus:border-primary outline-none transition-colors"
              :value="currentCapacity?.desiredDemandVolume || ''"
              @input="onVolume"
            />
          </div>
        </div>
      </section>
    </main>

    <div
      class="fixed bottom-0 left-0 w-full bg-surface-container-lowest border-t border-outline-variant p-md z-40 pb-safe"
    >
      <button
        type="button"
        class="w-full bg-primary text-on-primary font-body-md text-body-md py-sm px-md rounded-lg flex items-center justify-center gap-sm active:scale-95 transition-transform disabled:opacity-50 disabled:cursor-not-allowed"
        :disabled="!locationReady"
        @click="continueNext"
      >
        Voir le récapitulatif
        <span class="material-symbols-outlined text-on-primary">arrow_forward</span>
      </button>
    </div>
  </div>
</template>
