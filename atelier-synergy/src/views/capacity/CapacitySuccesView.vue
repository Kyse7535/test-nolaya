<script setup>
import { computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { storeToRefs } from 'pinia'
import { openCapacityHeadline } from '../../domain/capacity/labels'
import { CapacityStatus } from '../../domain/capacity/model'
import { useCapacityStore } from '../../stores/capacity'

const router = useRouter()
const capacityStore = useCapacityStore()
const { currentCapacity, userOpenCapacities } = storeToRefs(capacityStore)

const heroSrc =
  'https://lh3.googleusercontent.com/aida-public/AB6AXuAlFe6jTJ5DdvUsoyHM4Mxh62Tug7u-TOUCDPLp3Tx2ynLQeqJ7ZCDbAF_hlgnztIXlgS6DvqJXEwG4TB4f6YokmzFdYN6lhWxhh4itzYRXw284B9Ym_GipkW0EksOLDW5s1FEVZK7dTNcxJKhHO0-yIRdCeBbYP8xpl3qETBkzjVbnSPsKcNTdjlcw3Hd8vuKULWnDK3QUDaEknVRIFcrIShk3TS74uGTTWMVbSuVrX-W87cmqOtY8Nw'

const capacity = computed(() => {
  if (currentCapacity.value?.status === CapacityStatus.OPEN) {
    return currentCapacity.value
  }
  return userOpenCapacities.value[userOpenCapacities.value.length - 1] ?? null
})

const headline = computed(() => openCapacityHeadline(capacity.value))
const headlineParts = computed(() =>
  headline.value.split(' — ').filter((part) => part && part !== 'Capacité ouverte'),
)

onMounted(() => {
  if (!capacity.value) {
    router.replace({ name: 'capacity-accueil' })
  }
})

function goListe() {
  router.push({ name: 'capacity-liste' })
}

function goHome() {
  router.push({ name: 'home' })
}
</script>

<template>
  <div
    class="bg-surface text-on-surface font-body-md antialiased flex flex-col h-[calc(100dvh-var(--as-role-bar)-var(--as-bottom-nav)-env(safe-area-inset-bottom,0px))]"
  >
    <header
      class="shrink-0 w-full border-b border-outline-variant/30 flex justify-between items-center px-margin-mobile h-14 z-20"
    >
      <button
        type="button"
        aria-label="Retour"
        class="text-primary hover:bg-surface-container-low transition-colors active:scale-95 duration-150 p-2 -ml-2 rounded-full flex items-center justify-center"
        @click="goHome"
      >
        <span class="material-symbols-outlined">arrow_back</span>
      </button>
      <h1 class="font-headline-sm text-headline-sm font-bold text-primary tracking-tight">
        Nolaya
      </h1>
      <div class="w-10" />
    </header>

    <main
      class="flex-1 min-h-0 flex flex-col items-center justify-center px-margin-mobile py-md gap-md overflow-hidden"
    >
      <div
        class="w-full max-w-sm h-40 sm:h-48 rounded-xl overflow-hidden border border-outline-variant/30 shrink-0"
      >
        <img :src="heroSrc" alt="" class="w-full h-full object-cover object-top" />
      </div>

      <div class="flex flex-col items-center gap-xs shrink-0">
        <div
          class="bg-secondary-container text-on-secondary-container px-3 py-1 rounded-full inline-flex items-center gap-1.5 border border-secondary/20"
        >
          <span
            class="material-symbols-outlined text-secondary text-[16px]"
            style="font-variation-settings: 'FILL' 1"
          >
            check_circle
          </span>
          <span class="font-label-sm text-label-sm uppercase tracking-widest font-semibold">
            OUVERTE
          </span>
        </div>
        <span class="font-label-sm text-label-sm text-on-surface-variant tracking-wider opacity-70">
          CAPACITY_OPEN
        </span>
      </div>

      <div class="flex flex-col items-center text-center max-w-sm gap-sm shrink-0">
        <h2 class="font-display-lg-mobile text-display-lg-mobile text-primary">
          Votre capacité est ouverte
        </h2>
        <p class="font-body-md text-body-md text-on-surface-variant px-sm">
          Votre prestation est maintenant disponible. Vous pouvez recevoir des demandes sur cette
          configuration.
        </p>
      </div>

      <div
        v-if="headlineParts.length"
        class="w-full max-w-sm bg-surface-container rounded-lg border border-outline-variant/30 px-sm py-sm shrink-0"
      >
        <p class="font-body-sm text-body-sm text-on-surface text-center">
          <template v-for="(part, index) in headlineParts" :key="`${part}-${index}`">
            <span :class="index === 0 ? 'font-medium' : ''">{{ part }}</span>
            <span
              v-if="index < headlineParts.length - 1"
              class="text-on-surface-variant mx-1"
            >•</span>
          </template>
        </p>
      </div>
    </main>

    <div
      class="shrink-0 w-full bg-surface border-t border-outline-variant px-margin-mobile pt-md pb-md flex flex-col gap-sm z-20"
    >
      <button
        type="button"
        class="w-full h-11 bg-primary hover:bg-tertiary-container text-on-primary rounded-lg font-button-text text-button-text flex items-center justify-center gap-2 active:scale-95 transition-all duration-150"
        @click="goListe"
      >
        <span>Voir mes capacités</span>
        <span class="material-symbols-outlined text-[18px]">arrow_forward</span>
      </button>
      <button
        type="button"
        class="w-full h-11 bg-transparent border border-outline hover:bg-surface-container-low text-primary rounded-lg font-button-text text-button-text flex items-center justify-center active:scale-95 transition-all duration-150"
        @click="goHome"
      >
        Retour à l’accueil
      </button>
    </div>
  </div>
</template>
