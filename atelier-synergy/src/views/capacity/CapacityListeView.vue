<script setup>
import { computed, onMounted, onUnmounted, ref } from 'vue'
import { useRouter } from 'vue-router'
import { storeToRefs } from 'pinia'
import { locationLabel, statusLabel } from '../../domain/capacity/labels'
import { CapacityStatus, formatVarianteList } from '../../domain/capacity/model'
import { LOCATION_OPTIONS } from '../../mocks/catalog'
import { useCapacityStore } from '../../stores/capacity'

const router = useRouter()
const capacityStore = useCapacityStore()
const { listedCapacities } = storeToRefs(capacityStore)

const menuOpenId = ref(null)

const hasItems = computed(() => listedCapacities.value.length > 0)

onMounted(() => {
  document.addEventListener('click', closeMenus)
})

onUnmounted(() => {
  document.removeEventListener('click', closeMenus)
})

function closeMenus() {
  menuOpenId.value = null
}

function goBack() {
  router.push({ name: 'home' })
}

function createNew() {
  capacityStore.createNewDraft()
  router.push({ name: 'capacity-prestation' })
}

function thumbnail(capacity) {
  return capacity.gallery?.[0]?.src ?? null
}

function locationIcon(capacity) {
  const context = capacity.location?.context
  return LOCATION_OPTIONS.find((o) => o.id === context)?.icon ?? 'location_on'
}

function isConfigured(capacity) {
  return Boolean(capacity.prestation?.id)
}

function openItem(capacity) {
  capacityStore.setCurrent(capacity.id)
  if (capacity.status === CapacityStatus.OPEN) {
    router.push({ name: 'capacity-succes' })
    return
  }
  if (capacity.status === CapacityStatus.DRAFT) {
    router.push({ name: 'capacity-prestation' })
    return
  }
  // CLOSED — read-only success-style summary via home liste stay
}

function toggleMenu(event, id) {
  event.stopPropagation()
  menuOpenId.value = menuOpenId.value === id ? null : id
}

function closeItem(event, id) {
  event.stopPropagation()
  capacityStore.closeCapacity(id)
  menuOpenId.value = null
}

function badgeClass(status) {
  if (status === CapacityStatus.OPEN) {
    return 'bg-secondary-container text-on-secondary-container border-secondary/20'
  }
  if (status === CapacityStatus.CLOSED) {
    return 'bg-surface-container text-on-surface-variant border-outline-variant'
  }
  return 'bg-surface-container-highest text-on-surface-variant border-outline-variant'
}
</script>

<template>
  <div
    class="bg-background text-on-background font-body-md antialiased min-h-screen flex flex-col selection:bg-secondary-container selection:text-on-secondary-container"
  >
    <header class="bg-background border-b border-outline-variant sticky top-0 z-40">
      <div
        class="flex justify-between items-center w-full px-margin-mobile md:px-margin-desktop py-4 max-w-[1280px] mx-auto"
      >
        <div class="flex items-center gap-4">
          <button
            type="button"
            class="text-primary hover:opacity-80 transition-opacity active:scale-95 duration-150 p-2 -ml-2 rounded-full hover:bg-surface-variant"
            @click="goBack"
          >
            <span class="material-symbols-outlined text-icon-lg">arrow_back</span>
          </button>
          <h1 class="text-headline-md font-headline-md font-bold tracking-tight text-primary">
            Mes capacités
          </h1>
        </div>
        <span
          class="text-label-sm font-label-sm text-primary-fixed-dim border border-outline-variant px-3 py-1 rounded bg-surface-container-low hidden md:inline-block"
        >
          MVP
        </span>
      </div>
    </header>

    <main
      class="flex-grow w-full max-w-[800px] mx-auto px-margin-mobile md:px-margin-desktop pt-8 pb-12"
    >
      <div class="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
        <div class="max-w-xl">
          <p class="text-body-md font-body-md text-on-surface-variant mt-2">
            Prestations que vous avez rendues disponibles.
          </p>
        </div>
        <button
          type="button"
          class="bg-primary text-on-primary hover:opacity-90 transition-opacity rounded px-5 py-3 flex items-center justify-center gap-2 text-label-sm font-label-sm font-bold shadow-sm active:scale-95 flex-shrink-0"
          @click="createNew"
        >
          <span class="material-symbols-outlined text-icon-md">add</span>
          Nouvelle capacité
        </button>
      </div>

      <div v-if="!hasItems" class="bg-surface-container-low border border-outline-variant rounded-lg p-6">
        <p class="font-body-md text-body-md text-on-surface-variant mb-4">
          Aucune capacité pour l’instant. Ouvrez-en une pour la rendre disponible.
        </p>
        <button
          type="button"
          class="text-secondary font-label-sm text-label-sm font-bold underline underline-offset-2"
          @click="createNew"
        >
          Ouvrir une capacité
        </button>
      </div>

      <div v-else class="space-y-4">
        <div
          v-for="capacity in listedCapacities"
          :key="capacity.id"
          class="border border-outline-variant rounded-lg p-4 flex flex-col sm:flex-row gap-4 transition-shadow duration-300 relative group cursor-pointer"
          :class="capacity.status === CapacityStatus.OPEN ? 'bg-surface-container-low hover:shadow-[0_4px_12px_rgba(0,0,0,0.05)]' : capacity.status === CapacityStatus.CLOSED ? 'bg-surface opacity-60' : 'bg-surface opacity-90 hover:shadow-[0_4px_12px_rgba(0,0,0,0.02)]'"
          @click="openItem(capacity)"
        >
          <div
            class="w-full sm:w-24 h-48 sm:h-24 flex-shrink-0 rounded bg-surface-container-high overflow-hidden border border-outline-variant/50"
            :class="{ 'grayscale-[30%]': capacity.status !== CapacityStatus.OPEN }"
          >
            <img
              v-if="thumbnail(capacity)"
              :src="thumbnail(capacity)"
              alt=""
              class="w-full h-full object-cover"
            />
            <div
              v-else
              class="w-full h-full flex items-center justify-center text-on-surface-variant"
            >
              <span class="material-symbols-outlined">content_cut</span>
            </div>
          </div>

          <div class="flex-grow flex flex-col justify-between">
            <div class="flex justify-between items-start gap-4">
              <div>
                <div class="flex items-center gap-2 mb-1 flex-wrap">
                  <h2
                    class="text-headline-md font-headline-md font-bold"
                    :class="capacity.status === CapacityStatus.OPEN ? 'text-primary' : 'text-on-surface-variant'"
                  >
                    {{ capacity.prestation?.label || 'Nouvelle capacité' }}
                  </h2>
                  <span
                    class="font-label-micro text-label-micro px-2 py-0.5 rounded tracking-wide uppercase font-bold border"
                    :class="badgeClass(capacity.status)"
                  >
                    {{ statusLabel(capacity.status) }}
                  </span>
                </div>

                <p
                  v-if="capacity.status === CapacityStatus.DRAFT && !isConfigured(capacity)"
                  class="text-body-md font-body-md text-on-surface-variant/70 italic"
                >
                  Paramètres non configurés…
                </p>
                <p
                  v-else
                  class="text-body-md font-body-md text-on-surface-variant flex items-center gap-1.5 flex-wrap"
                >
                  <template v-if="formatVarianteList(capacity.prestation?.variante?.taille)">
                    <span>{{ formatVarianteList(capacity.prestation.variante.taille) }}</span>
                    <span class="text-outline text-label-micro">•</span>
                  </template>
                  <template v-if="formatVarianteList(capacity.prestation?.variante?.longueur)">
                    <span>{{ formatVarianteList(capacity.prestation.variante.longueur) }}</span>
                    <span class="text-outline text-label-micro">•</span>
                  </template>
                  <span v-if="capacity.pricing?.basePrice" class="font-semibold text-primary">
                    {{ capacity.pricing.basePrice }} €
                  </span>
                  <template v-if="capacity.location?.context">
                    <span class="text-outline text-label-micro">•</span>
                    <span class="flex items-center gap-1">
                      <span class="material-symbols-outlined text-icon-sm">
                        {{ locationIcon(capacity) }}
                      </span>
                      {{ locationLabel(capacity.location.context) }}
                    </span>
                  </template>
                </p>
              </div>

              <div
                v-if="capacity.status === CapacityStatus.OPEN"
                class="hidden sm:flex flex-col items-end gap-2"
              >
                <div class="relative">
                  <button
                    type="button"
                    aria-label="Options"
                    class="text-on-surface-variant hover:text-primary transition-colors p-1 rounded hover:bg-surface-variant"
                    @click="toggleMenu($event, capacity.id)"
                  >
                    <span class="material-symbols-outlined">more_vert</span>
                  </button>
                  <div
                    v-if="menuOpenId === capacity.id"
                    class="absolute right-0 top-full mt-1 w-48 bg-surface-container-highest border border-outline-variant rounded shadow-lg z-10 py-1"
                    @click.stop
                  >
                    <button
                      type="button"
                      class="w-full text-left px-4 py-2 text-label-sm font-label-sm text-error hover:bg-surface-variant flex items-center gap-2"
                      @click="closeItem($event, capacity.id)"
                    >
                      <span class="material-symbols-outlined text-icon">close</span>
                      Fermer la capacité
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <div
              class="mt-4 sm:mt-0 pt-4 sm:pt-0 border-t border-outline-variant/30 sm:border-0 flex justify-between items-end"
            >
              <span
                class="font-label-sm text-label-sm tracking-wider"
                :class="capacity.status === CapacityStatus.OPEN ? 'text-on-surface-variant/60' : 'text-on-surface-variant/40'"
              >
                CODE: {{ capacity.status }}
              </span>
              <button
                v-if="capacity.status === CapacityStatus.OPEN"
                type="button"
                class="sm:hidden text-error hover:opacity-80 transition-colors flex items-center gap-1 text-label-sm font-label-sm border border-outline-variant rounded px-2 py-1"
                @click="closeItem($event, capacity.id)"
              >
                <span class="material-symbols-outlined text-icon-sm">close</span>
                Fermer
              </button>
              <button
                v-else-if="capacity.status === CapacityStatus.DRAFT"
                type="button"
                class="sm:hidden text-on-surface-variant hover:text-primary transition-colors flex items-center gap-1 text-label-sm font-label-sm border border-outline-variant rounded px-2 py-1"
                @click.stop="openItem(capacity)"
              >
                <span class="material-symbols-outlined text-icon-sm">edit</span>
                Éditer
              </button>
            </div>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>
