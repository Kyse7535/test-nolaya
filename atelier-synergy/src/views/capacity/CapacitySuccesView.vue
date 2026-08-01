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
    class="bg-surface text-on-surface antialiased min-h-screen flex flex-col items-center justify-center font-body-md"
  >
    <main
      class="w-full max-w-lg mx-auto flex flex-col h-screen md:h-auto md:bg-surface-container-low md:rounded-xl md:border md:border-outline-variant/30 overflow-hidden relative shadow-sm"
    >
      <header class="w-full px-margin-mobile py-4 flex justify-center items-center absolute top-0 z-10">
        <h1
          class="font-headline-md text-headline-md font-bold text-primary tracking-tight bg-white/70 backdrop-blur-sm px-4 py-1 rounded-full shadow-sm border border-outline-variant/20"
        >
          Nolaya
        </h1>
      </header>

      <div class="relative w-full h-[397px] md:h-80 shrink-0">
        <img :src="heroSrc" alt="Portrait styliste" class="w-full h-full object-cover object-top" />
        <div
          class="absolute inset-0 bg-gradient-to-t from-surface via-transparent to-transparent opacity-90 md:opacity-60"
        />
      </div>

      <div
        class="flex-1 flex flex-col px-margin-mobile md:px-8 pt-8 pb-8 -mt-6 rounded-t-3xl bg-surface relative z-10 md:-mt-0 md:rounded-none"
      >
        <div class="flex flex-col items-center text-center space-y-6 flex-1">
          <div class="flex flex-col items-center space-y-2">
            <div
              class="bg-secondary-container text-on-secondary-container px-4 py-1.5 rounded-full inline-flex items-center space-x-2 border border-secondary/20 shadow-sm"
            >
              <span
                class="material-symbols-outlined text-secondary text-sm"
                style="font-variation-settings: 'FILL' 1"
              >
                check_circle
              </span>
              <span class="font-label-sm text-label-sm uppercase tracking-widest font-semibold">
                OUVERTE
              </span>
            </div>
            <span
              class="font-label-sm text-label-sm text-on-surface-variant tracking-wider opacity-70"
            >
              CAPACITY_OPEN
            </span>
          </div>

          <div class="space-y-3">
            <h2
              class="font-headline-lg-mobile md:text-headline-lg text-headline-lg-mobile text-primary"
            >
              Votre capacité est ouverte
            </h2>
            <p
              class="font-body-md text-body-md text-on-surface-variant max-w-sm mx-auto leading-relaxed"
            >
              Votre prestation est maintenant disponible. Vous pouvez recevoir des demandes sur
              cette configuration.
            </p>
          </div>

          <div class="w-full bg-surface-container rounded-lg border border-outline-variant/30 p-4 mt-2">
            <p class="font-body-md text-body-md text-on-surface text-center">
              <template v-for="(part, index) in headlineParts" :key="`${part}-${index}`">
                <span :class="index === 0 ? 'font-medium' : ''">{{ part }}</span>
                <span class="text-on-surface-variant mx-1">•</span>
              </template>
              Capacité ouverte
            </p>
          </div>
        </div>

        <div class="flex flex-col space-y-3 w-full mt-8 md:mt-12">
          <button
            type="button"
            class="w-full bg-primary hover:bg-tertiary-container text-on-primary font-label-sm text-label-sm uppercase tracking-wide py-4 rounded-lg transition-colors flex items-center justify-center space-x-2 shadow-sm"
            @click="goListe"
          >
            <span>Voir mes capacités</span>
            <span class="material-symbols-outlined text-sm">arrow_forward</span>
          </button>
          <button
            type="button"
            class="w-full bg-transparent border border-outline hover:bg-surface-container-low text-primary font-label-sm text-label-sm uppercase tracking-wide py-4 rounded-lg transition-colors flex items-center justify-center space-x-2"
            @click="goHome"
          >
            <span>Retour à l’accueil</span>
          </button>
        </div>
      </div>
    </main>
  </div>
</template>
