<script setup>
import { computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { storeToRefs } from 'pinia'
import { statusBadgeLabel } from '../../domain/demand/labels'
import { ServiceLevel } from '../../domain/demand/model'
import {
  CLIENT_TASK_OPTIONS,
  PRIORITY_OPTIONS,
  PROTECTION_OPTIONS,
  SERVICE_LEVEL_OPTIONS,
} from '../../mocks/inspirations'
import { useDemandStore } from '../../stores/demand'

const router = useRouter()
const demandStore = useDemandStore()
const { currentDemand, zoneReady, serviceReady } = storeToRefs(demandStore)

const badge = computed(() => statusBadgeLabel(currentDemand.value?.status))
const protectionIds = computed(() => currentDemand.value?.protectionIds ?? [])
const serviceLevel = computed(() => currentDemand.value?.serviceLevel)
const clientTasks = computed(() => currentDemand.value?.clientTasks ?? [])
const searchPriority = computed(() => currentDemand.value?.searchPriority)
const isAssisted = computed(() => serviceLevel.value === ServiceLevel.ASSISTED)

const editorialSrc =
  'https://lh3.googleusercontent.com/aida-public/AB6AXuBVd3exob29il3NlLZQE3hbcZlUkfHpOKOEso3PPGgrZfODWdOEgcSIl_3QEEYKb_OPZUbSDkIwtUWBiG-rDs0uYXE0J62jgkKAUjkYqAofx4E9q-DoLUQqJog9r75eun0EtzYyoy7cRk-erGQhZlvXELbHMsHCKjjTZ3NAdBuDjZHaD4rnVNVMn7UhJ-8NSXLLjAOBdDITkE0Rn9K4mKu93WzZMnEQfJou1xblG94u_Z5ycqBd41bU'

onMounted(() => {
  if (!demandStore.currentDemand) demandStore.startDraft()
  if (!zoneReady.value) {
    router.replace({ name: 'demand-zone' })
  }
})

function goBack() {
  router.push({ name: 'demand-zone' })
}

function toggleProtection(id) {
  demandStore.toggleProtection(id)
}

function selectService(id) {
  demandStore.setServiceLevel(id)
}

function toggleTask(id) {
  demandStore.toggleClientTask(id)
}

function selectPriority(id) {
  demandStore.setSearchPriority(id)
}

function continueNext() {
  if (!serviceReady.value) return
  router.push({ name: 'demand-recap' })
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
        <span class="text-on-surface-variant">4 Zone</span>
        <span class="text-outline">·</span>
        <span class="text-secondary font-semibold">5 Service</span>
        <span class="text-outline">·</span>
        <span class="text-on-surface-variant/50">6 Résumé</span>
      </div>

      <h2 class="text-headline-lg-mobile font-headline-lg-mobile text-primary mb-sm">
        Protection & service
      </h2>

      <section class="mb-xl">
        <p class="text-body-md font-body-md text-on-surface-variant mb-md">
          Signalez ce qui doit être pris en compte (information, pas un diagnostic).
        </p>
        <div class="flex flex-col gap-sm">
          <button
            v-for="opt in PROTECTION_OPTIONS"
            :key="opt.id"
            type="button"
            class="w-full text-left px-md py-3 rounded-lg border transition-colors"
            :class="protectionIds.includes(opt.id) ? 'border-secondary bg-secondary-container/40' : 'border-outline-variant bg-surface-container-lowest'"
            @click="toggleProtection(opt.id)"
          >
            {{ opt.label }}
          </button>
        </div>
      </section>

      <section class="mb-xl">
        <p class="text-body-sm font-body-sm text-on-surface mb-sm">Niveau de service</p>
        <div class="flex flex-col gap-sm mb-md">
          <button
            v-for="opt in SERVICE_LEVEL_OPTIONS"
            :key="opt.id"
            type="button"
            class="w-full text-left px-md py-3 rounded-lg border transition-colors"
            :class="serviceLevel === opt.id ? 'border-secondary bg-secondary-container/40' : 'border-outline-variant bg-surface-container-lowest'"
            @click="selectService(opt.id)"
          >
            <span class="font-headline-sm text-headline-sm block mb-xs">{{ opt.label }}</span>
            <span class="text-body-sm font-body-sm text-on-surface-variant">{{
              opt.description
            }}</span>
          </button>
        </div>

        <div v-if="isAssisted" class="mt-md">
          <p class="text-body-sm font-body-sm text-on-surface mb-sm">
            Tâches que vous acceptez
          </p>
          <div class="flex flex-col gap-sm">
            <button
              v-for="opt in CLIENT_TASK_OPTIONS"
              :key="opt.id"
              type="button"
              class="w-full text-left px-md py-3 rounded-lg border transition-colors"
              :class="clientTasks.includes(opt.id) ? 'border-secondary bg-secondary-container/40' : 'border-outline-variant bg-surface-container-lowest'"
              @click="toggleTask(opt.id)"
            >
              {{ opt.label }}
            </button>
          </div>
        </div>
      </section>

      <section class="mb-xl">
        <p class="text-body-sm font-body-sm text-on-surface mb-sm">Priorité de recherche</p>
        <div class="flex flex-col gap-sm mb-sm">
          <button
            v-for="opt in PRIORITY_OPTIONS"
            :key="opt.id"
            type="button"
            class="w-full text-left px-md py-3 rounded-lg border transition-colors"
            :class="searchPriority === opt.id ? 'border-secondary bg-secondary-container/40' : 'border-outline-variant bg-surface-container-lowest'"
            @click="selectPriority(opt.id)"
          >
            <span class="font-headline-sm text-headline-sm block mb-xs">{{ opt.label }}</span>
            <span class="text-body-sm font-body-sm text-on-surface-variant">{{
              opt.description
            }}</span>
          </button>
        </div>
        <p class="text-body-sm font-body-sm text-on-surface-variant italic">
          La priorité guide le matching plus tard — pas ici.
        </p>
      </section>

      <div
        class="w-full h-40 rounded-lg bg-cover bg-center mb-lg"
        :style="{ backgroundImage: `url('${editorialSrc}')` }"
      />
    </main>

    <div
      class="fixed bottom-0 left-0 w-full bg-surface border-t border-surface-container p-container-margin z-50"
    >
      <button
        type="button"
        class="w-full max-w-[672px] mx-auto bg-primary text-on-primary font-button-text text-button-text py-3 rounded-lg disabled:opacity-50 block"
        :disabled="!serviceReady"
        @click="continueNext"
      >
        Voir le résumé
      </button>
    </div>
  </div>
</template>
