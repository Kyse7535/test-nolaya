<script setup>
import { computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { storeToRefs } from 'pinia'
import {
  availabilityDaysSummary,
  formatMoney,
  gallerySummary,
  locationLabel,
  serviceLevelLabel,
  taskOwnerLabel,
  volumeSummary,
} from '../../domain/capacity/labels'
import { ProofLevel } from '../../domain/capacity/model'
import { useCapacityStore } from '../../stores/capacity'
import { useFrameworkStore } from '../../stores/framework'

const router = useRouter()
const capacityStore = useCapacityStore()
const frameworkStore = useFrameworkStore()
const { currentCapacity, canActivateNow, locationReady } = storeToRefs(capacityStore)

const capacity = computed(() => currentCapacity.value)
const varianteLine = computed(() => {
  const v = capacity.value?.prestation?.variante ?? {}
  return [v.taille, v.longueur].filter(Boolean).join(' · ') || '—'
})
const galleryThumbs = computed(() => (capacity.value?.gallery ?? []).slice(0, 4))
const taskHighlights = computed(() => {
  const tasks = capacity.value?.tasks ?? []
  const preferred = ['buy_hair', 'install']
  const picked = preferred
    .map((id) => tasks.find((t) => t.id === id))
    .filter(Boolean)
  return picked.length ? picked : tasks.slice(0, 2)
})
const supplements = computed(() => capacity.value?.pricing?.supplements ?? [])

onMounted(() => {
  if (!capacityStore.currentCapacity) {
    capacityStore.startDraft()
  }
  if (!locationReady.value) {
    router.replace({ name: 'capacity-lieu' })
  }
})

function goBack() {
  router.push({ name: 'capacity-lieu' })
}

function editSection(routeName) {
  router.push({ name: routeName })
}

function onConfirm(event) {
  capacityStore.setConfirmed(event.target.checked)
}

function activate() {
  if (!capacityStore.activate()) return
  router.push({ name: 'capacity-succes' })
}
</script>

<template>
  <div class="bg-background text-on-background min-h-screen pb-24 antialiased font-body-md">
    <header
      class="w-full top-0 sticky z-40 bg-background border-b border-outline-variant/30 flex items-center justify-between px-margin-mobile md:px-margin-desktop py-4"
    >
      <div class="flex items-center gap-4">
        <button
          type="button"
          aria-label="Retour"
          class="text-on-surface-variant hover:opacity-80 transition-opacity cursor-pointer active:scale-95"
          @click="goBack"
        >
          <span class="material-symbols-outlined">close</span>
        </button>
        <h1 class="font-headline-md text-headline-md font-bold tracking-tight text-primary">
          Atelier Synergy
        </h1>
      </div>
    </header>

    <main class="max-w-3xl mx-auto px-margin-mobile md:px-margin-desktop pt-8 pb-12">
      <div class="mb-8">
        <div class="flex items-center gap-3 mb-2">
          <h2
            class="font-headline-lg-mobile md:text-headline-lg text-headline-lg-mobile text-primary"
          >
            Récapitulatif
          </h2>
          <span
            class="bg-surface-container-high text-on-surface font-label-sm text-label-sm px-2 py-1 rounded"
          >
            BROUILLON
          </span>
        </div>
        <p class="font-headline-md text-headline-md text-on-surface-variant mb-2">
          Vérifiez votre capacité
        </p>
        <p class="font-body-md text-body-md text-on-surface-variant">
          Une fois activée, cette prestation sera disponible pour recevoir des demandes.
        </p>
      </div>

      <div
        class="bg-surface-container-low border border-outline-variant/50 rounded-lg p-4 mb-8 flex items-start gap-3"
      >
        <span class="material-symbols-outlined text-on-surface-variant mt-0.5">domain</span>
        <div>
          <p class="font-body-md text-body-md font-medium text-primary">
            {{
              frameworkStore.isActive
                ? 'Cadre professionnel actif — hérité'
                : 'Cadre professionnel mock — hérité'
            }}
          </p>
        </div>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
        <div
          class="bg-surface-container rounded-lg p-5 border border-outline-variant/30 hover:shadow-sm transition-shadow"
        >
          <div class="flex justify-between items-start mb-3">
            <h3 class="font-body-md text-body-md font-semibold text-primary">Prestation</h3>
            <button
              type="button"
              class="font-label-sm text-label-sm text-on-surface-variant hover:text-primary transition-colors underline underline-offset-2"
              @click="editSection('capacity-prestation')"
            >
              Modifier
            </button>
          </div>
          <div class="flex flex-col gap-1">
            <p class="font-body-md text-body-md text-primary">
              {{ capacity?.prestation?.label || '—' }}
            </p>
            <p class="font-label-sm text-label-sm text-on-surface-variant">{{ varianteLine }}</p>
          </div>
        </div>

        <div
          class="bg-surface-container rounded-lg p-5 border border-outline-variant/30 hover:shadow-sm transition-shadow"
        >
          <div class="flex justify-between items-start mb-3">
            <h3 class="font-body-md text-body-md font-semibold text-primary">Galerie</h3>
            <button
              type="button"
              class="font-label-sm text-label-sm text-on-surface-variant hover:text-primary transition-colors underline underline-offset-2"
              @click="editSection('capacity-galerie')"
            >
              Modifier
            </button>
          </div>
          <p class="font-label-sm text-label-sm text-on-surface-variant mb-3">
            {{ gallerySummary(capacity) }}
          </p>
          <div class="flex gap-2">
            <img
              v-for="item in galleryThumbs"
              :key="item.id"
              :src="item.src"
              :alt="
                item.proofLevel === ProofLevel.REFERENCE_INSPIRATION
                  ? 'Inspiration'
                  : 'Réalisation'
              "
              class="w-16 h-16 object-cover border border-outline-variant/50"
            />
          </div>
        </div>

        <div
          class="bg-surface-container rounded-lg p-5 border border-outline-variant/30 hover:shadow-sm transition-shadow md:col-span-2"
        >
          <div class="flex justify-between items-start mb-3">
            <h3 class="font-body-md text-body-md font-semibold text-primary">Service &amp; tâches</h3>
            <button
              type="button"
              class="font-label-sm text-label-sm text-on-surface-variant hover:text-primary transition-colors underline underline-offset-2"
              @click="editSection('capacity-service')"
            >
              Modifier
            </button>
          </div>
          <div class="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <p class="font-label-sm text-label-sm text-on-surface-variant mb-1">Type</p>
              <p class="font-body-md text-body-md text-primary">
                {{ serviceLevelLabel(capacity?.serviceLevel) }}
              </p>
            </div>
            <div v-for="task in taskHighlights" :key="task.id">
              <p class="font-label-sm text-label-sm text-on-surface-variant mb-1">
                {{ task.label }}
              </p>
              <p class="font-body-md text-body-md text-primary">
                {{ taskOwnerLabel(task.owner) }}
              </p>
            </div>
          </div>
        </div>

        <div
          class="bg-surface-container rounded-lg p-5 border border-outline-variant/30 hover:shadow-sm transition-shadow"
        >
          <div class="flex justify-between items-start mb-3">
            <h3 class="font-body-md text-body-md font-semibold text-primary">Prix &amp; durée</h3>
            <button
              type="button"
              class="font-label-sm text-label-sm text-on-surface-variant hover:text-primary transition-colors underline underline-offset-2"
              @click="editSection('capacity-prix')"
            >
              Modifier
            </button>
          </div>
          <div class="flex flex-col gap-2">
            <div class="flex justify-between items-center border-b border-outline-variant/20 pb-2">
              <span class="font-body-md text-body-md text-on-surface-variant">Base</span>
              <span class="font-label-sm text-label-sm text-primary">
                {{ capacity?.pricing?.basePrice || 0 }} € ·
                {{ capacity?.pricing?.durationMinutes || 0 }} min
              </span>
            </div>
            <div
              v-for="(supplement, index) in supplements"
              :key="index"
              class="flex justify-between items-center pt-1"
            >
              <span class="font-body-md text-body-md text-on-surface-variant">
                {{ supplement.label || 'Supplément' }}
              </span>
              <span class="font-label-sm text-label-sm text-primary">
                +{{ formatMoney(supplement.amount) }}
              </span>
            </div>
          </div>
        </div>

        <div
          class="bg-surface-container rounded-lg p-5 border border-outline-variant/30 hover:shadow-sm transition-shadow"
        >
          <div class="flex justify-between items-start mb-3">
            <h3 class="font-body-md text-body-md font-semibold text-primary">Lieu &amp; dispo.</h3>
            <button
              type="button"
              class="font-label-sm text-label-sm text-on-surface-variant hover:text-primary transition-colors underline underline-offset-2"
              @click="editSection('capacity-lieu')"
            >
              Modifier
            </button>
          </div>
          <div class="flex flex-col gap-1">
            <p class="font-body-md text-body-md text-primary">
              {{ locationLabel(capacity?.location?.context) }}
            </p>
            <p class="font-label-sm text-label-sm text-on-surface-variant">
              {{ availabilityDaysSummary(capacity) }}
            </p>
            <p class="font-label-sm text-label-sm text-on-surface-variant mt-1">
              {{ volumeSummary(capacity) }}
            </p>
          </div>
        </div>
      </div>

      <div
        class="mt-8 mb-12 bg-surface-container-low p-4 rounded-lg border border-outline-variant/50"
      >
        <label class="flex items-start gap-3 cursor-pointer group">
          <input
            class="synergy-checkbox mt-1 w-5 h-5 rounded border-outline-variant text-primary focus:ring-primary transition-colors"
            type="checkbox"
            :checked="capacity?.confirmed"
            @change="onConfirm"
          />
          <span
            class="font-body-md text-body-md text-on-surface group-hover:text-primary transition-colors"
          >
            Je confirme que cette capacité représente bien ce que je propose
          </span>
        </label>
      </div>
    </main>

    <div
      class="fixed bottom-0 left-0 w-full bg-surface border-t border-outline-variant/30 p-4 md:px-margin-desktop z-50 flex flex-col md:flex-row-reverse gap-3 items-center justify-center md:justify-start shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)]"
    >
      <button
        type="button"
        class="w-full md:w-auto bg-primary text-on-primary font-label-sm text-label-sm px-6 py-3 rounded hover:opacity-90 transition-all"
        :class="
          canActivateNow ? 'cursor-pointer' : 'opacity-50 cursor-not-allowed'
        "
        :disabled="!canActivateNow"
        @click="activate"
      >
        Activer ma capacité
      </button>
      <button
        type="button"
        class="w-full md:w-auto bg-transparent border border-outline-variant text-primary font-label-sm text-label-sm px-6 py-3 rounded hover:bg-surface-container transition-colors"
        @click="goBack"
      >
        Revenir
      </button>
    </div>
  </div>
</template>
