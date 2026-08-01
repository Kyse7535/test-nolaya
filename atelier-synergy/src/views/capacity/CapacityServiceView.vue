<script setup>
import { computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { storeToRefs } from 'pinia'
import { ServiceLevel, TaskOwner } from '../../domain/capacity/model'
import { buildDefaultTasks } from '../../mocks/catalog'
import { useCapacityStore } from '../../stores/capacity'

const router = useRouter()
const capacityStore = useCapacityStore()
const { currentCapacity, serviceReady, galleryReady } = storeToRefs(capacityStore)

const heroSrc =
  'https://lh3.googleusercontent.com/aida/AP1WRLs76vXbJmU8egj3pbEvkgduL3I9FODre5N6Hva4RHM0KWUg1oGL_VDeIp-kbA9SO2CNxU3yki-IFoy4NVtYpgKJlkQfsVBCqz2EvTTxdG-KMq7RJFPWq632bQuRtsdx0biRiGGR1iUXC7cBBhiIluZuw4CWctER5ncE8zDGCIjgIt3L7gXvHPd8uL86ht5KS8EfVRAFWjoxTIOGhtU6H2sJETMA3EhW2MbG-DJLQzZx52jZxvlbzW3uUyj2'

const tasks = computed(() => currentCapacity.value?.tasks ?? [])
const serviceLevel = computed(() => currentCapacity.value?.serviceLevel)

onMounted(() => {
  if (!capacityStore.currentCapacity) {
    capacityStore.startDraft()
  }
  if (!galleryReady.value) {
    router.replace({ name: 'capacity-galerie' })
    return
  }
  if (!currentCapacity.value?.tasks?.length) {
    capacityStore.patch({ tasks: buildDefaultTasks() })
  }
  if (!serviceLevel.value) {
    capacityStore.setServiceLevel(ServiceLevel.ASSISTED)
  }
})

function goBack() {
  router.push({ name: 'capacity-galerie' })
}

function selectLevel(level) {
  capacityStore.setServiceLevel(level)
}

function setOwner(taskId, owner) {
  capacityStore.setTaskOwner(taskId, owner)
}

function setNote(taskId, event) {
  capacityStore.setTaskNote(taskId, event.target.value)
}

function continueNext() {
  if (!serviceReady.value) return
  router.push({ name: 'capacity-prix' })
}
</script>

<template>
  <div class="bg-background text-on-background font-body-md antialiased min-h-screen pb-24">
    <header
      class="bg-background sticky top-0 border-b border-outline-variant flex justify-between items-center w-full px-margin-mobile py-4 z-50"
    >
      <div class="flex items-center gap-4">
        <button
          type="button"
          class="text-primary hover:opacity-80 transition-opacity active:scale-95 duration-150"
          @click="goBack"
        >
          <span class="material-symbols-outlined">arrow_back</span>
        </button>
        <h1 class="text-headline-md font-headline-md font-bold tracking-tight text-primary">
          Atelier Synergy
        </h1>
      </div>
      <div class="bg-surface-container-high px-2 py-1 rounded border border-outline-variant">
        <span class="text-label-sm font-label-sm text-on-surface-variant uppercase tracking-widest">
          BROUILLON
        </span>
      </div>
    </header>

    <main class="max-w-container-max mx-auto w-full">
      <div class="w-full h-48 md:h-64 relative mb-6">
        <img :src="heroSrc" alt="" class="w-full h-full object-cover" />
        <div
          class="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent"
        />
      </div>

      <div class="px-margin-mobile md:px-margin-desktop space-y-8 -mt-16 relative z-10">
        <div class="space-y-4">
          <div class="flex items-center justify-between max-w-[240px] mb-2">
            <div class="h-1 flex-1 bg-primary rounded-full" />
            <div class="h-1 flex-1 bg-primary rounded-full mx-1" />
            <div class="h-1 flex-1 bg-secondary rounded-full mx-1" />
            <div class="h-1 flex-1 bg-surface-container-high rounded-full mx-1" />
            <div class="h-1 flex-1 bg-surface-container-high rounded-full" />
            <span class="text-label-sm font-label-sm text-on-surface-variant ml-3">3/5</span>
          </div>
          <h2 class="text-headline-lg-mobile md:text-headline-lg text-primary">
            Capacité professionnelle
          </h2>
          <p class="text-body-md text-on-surface-variant max-w-2xl">
            Clarifiez qui fait quoi. Une cliente doit comprendre le modèle avant de demander.
          </p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <label class="cursor-pointer group relative">
            <input
              class="peer sr-only"
              type="radio"
              name="service_level"
              :checked="serviceLevel === ServiceLevel.COMPLETE"
              @change="selectLevel(ServiceLevel.COMPLETE)"
            />
            <div
              class="h-full bg-surface-container-low border border-outline-variant rounded-xl p-6 transition-all peer-checked:border-primary peer-checked:shadow-[0_0_0_1px_rgba(0,1,1,1)] peer-checked:bg-surface-container hover:bg-surface-container-highest"
            >
              <div class="flex items-start justify-between mb-2">
                <span class="material-symbols-outlined text-primary mb-3">auto_awesome</span>
                <div
                  class="w-5 h-5 rounded-full border-2 flex items-center justify-center"
                  :class="
                    serviceLevel === ServiceLevel.COMPLETE
                      ? 'border-primary'
                      : 'border-outline-variant'
                  "
                >
                  <div
                    v-if="serviceLevel === ServiceLevel.COMPLETE"
                    class="w-2.5 h-2.5 rounded-full bg-primary"
                  />
                </div>
              </div>
              <h3 class="text-headline-md font-headline-md text-primary mb-2">Service complet</h3>
              <p class="text-body-md text-on-surface-variant">
                Vous prenez en charge l’essentiel de A à Z.
              </p>
            </div>
          </label>

          <label class="cursor-pointer group relative">
            <input
              class="peer sr-only"
              type="radio"
              name="service_level"
              :checked="serviceLevel === ServiceLevel.ASSISTED"
              @change="selectLevel(ServiceLevel.ASSISTED)"
            />
            <div
              class="h-full bg-surface-container-low border border-outline-variant rounded-xl p-6 transition-all peer-checked:border-primary peer-checked:shadow-[0_0_0_1px_rgba(0,1,1,1)] peer-checked:bg-surface-container hover:bg-surface-container-highest"
            >
              <div class="flex items-start justify-between mb-2">
                <span class="material-symbols-outlined text-on-surface-variant mb-3">group</span>
                <div
                  class="w-5 h-5 rounded-full border-2 flex items-center justify-center"
                  :class="
                    serviceLevel === ServiceLevel.ASSISTED
                      ? 'border-primary'
                      : 'border-outline-variant'
                  "
                >
                  <div
                    v-if="serviceLevel === ServiceLevel.ASSISTED"
                    class="w-2.5 h-2.5 rounded-full bg-primary"
                  />
                </div>
              </div>
              <h3 class="text-headline-md font-headline-md text-on-surface mb-2">Service assisté</h3>
              <p class="text-body-md text-on-surface-variant">
                La cliente réalise certaines tâches (ex. apport des mèches).
              </p>
            </div>
          </label>
        </div>

        <div class="space-y-4 pt-4">
          <h3 class="text-headline-md font-headline-md text-primary">Répartition des tâches</h3>
          <div class="space-y-3">
            <div
              v-for="task in tasks"
              :key="task.id"
              class="bg-surface-container-low border border-outline-variant rounded-xl p-4 transition-all"
            >
              <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <span class="text-body-md font-semibold text-on-surface">{{ task.label }}</span>
                <div class="flex bg-surface-container-high rounded-lg p-1">
                  <button
                    type="button"
                    class="flex-1 sm:w-24 py-1.5 text-label-sm font-label-sm rounded transition-colors text-center"
                    :class="
                      task.owner === TaskOwner.STYLIST
                        ? 'text-on-primary bg-primary shadow-sm'
                        : 'text-on-surface-variant hover:text-on-surface'
                    "
                    @click="setOwner(task.id, TaskOwner.STYLIST)"
                  >
                    Styliste
                  </button>
                  <button
                    type="button"
                    class="flex-1 sm:w-24 py-1.5 text-label-sm font-label-sm rounded transition-colors text-center"
                    :class="[
                      task.stylistOnly
                        ? 'cursor-not-allowed opacity-50'
                        : '',
                      task.owner === TaskOwner.CLIENT
                        ? 'text-on-primary bg-primary shadow-sm'
                        : 'text-on-surface-variant hover:text-on-surface',
                    ]"
                    :disabled="task.stylistOnly"
                    @click="setOwner(task.id, TaskOwner.CLIENT)"
                  >
                    Cliente
                  </button>
                </div>
              </div>

              <div
                v-if="task.owner === TaskOwner.CLIENT"
                class="mt-4 pt-4 border-t border-outline-variant"
              >
                <label class="block text-label-sm font-label-sm text-on-surface-variant mb-1">
                  Consigne courte (si cliente)
                </label>
                <input
                  type="text"
                  class="w-full bg-surface-container-lowest border border-outline-variant rounded px-3 py-2 text-body-md focus:border-primary focus:ring-0 outline-none transition-colors placeholder:text-outline"
                  :placeholder="task.notePlaceholder || 'Consigne courte…'"
                  :value="task.note"
                  @input="setNote(task.id, $event)"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>

    <div
      class="fixed bottom-0 left-0 w-full bg-background/90 backdrop-blur-sm border-t border-outline-variant px-margin-mobile py-4 z-40"
    >
      <div class="max-w-container-max mx-auto flex justify-end">
        <button
          type="button"
          class="bg-primary text-on-primary text-body-md font-semibold py-3 px-8 rounded-lg shadow-sm hover:opacity-90 transition-opacity active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
          :disabled="!serviceReady"
          @click="continueNext"
        >
          Continuer
        </button>
      </div>
    </div>
  </div>
</template>
