<script setup>
import { computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { storeToRefs } from 'pinia'
import { qualifiedHeadline } from '../../domain/demand/labels'
import { DemandStatus } from '../../domain/demand/model'
import { useDemandStore } from '../../stores/demand'

const router = useRouter()
const demandStore = useDemandStore()
const { currentDemand, qualifiedDemands } = storeToRefs(demandStore)

const heroSrc =
  'https://lh3.googleusercontent.com/aida/AP1WRLuUss6DK_n3JdwQ1tkGMyU5vN7he_v2xnPSVHAaQgzOXWMcH3KxHsU02MXsvESzyyeMG_Tv0kZVLOshaFZdNAdrm3KV1Tu0gaeTmx0JVpG3e4pKSUr48s5vrgV4GNwYTpnJmHLZmY0hGwrEpwrwnsmDAA9a8Rd8hbEZhS_2sPIvpB5SKc2AgWP4mSiE9Jt-yDMIfVCHw7ohyx4ZE3xWIEiE-OypJy6FcJ8HX7gTfNI-6ZAWUxY7VYofFTM'

const demand = computed(() => {
  if (currentDemand.value?.status === DemandStatus.QUALIFIED) {
    return currentDemand.value
  }
  return qualifiedDemands.value[qualifiedDemands.value.length - 1] ?? null
})

const headline = computed(() => qualifiedHeadline(demand.value))

onMounted(() => {
  if (!demand.value) {
    router.replace({ name: 'demand-accueil' })
  }
})

function goHome() {
  router.push({ name: 'home' })
}

function goMatching() {
  router.push({ name: 'matching-accueil' })
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
          Atelier Synergy
        </h1>
      </header>

      <div class="relative w-full h-[320px] md:h-72 shrink-0">
        <img :src="heroSrc" alt="Succès de la demande" class="w-full h-full object-cover" />
        <div
          class="absolute inset-0 bg-gradient-to-t from-surface via-transparent to-transparent opacity-90"
        />
      </div>

      <div
        class="flex-1 flex flex-col px-margin-mobile pt-6 pb-8 -mt-6 rounded-t-3xl bg-surface relative z-10"
      >
        <div class="flex flex-col items-center text-center space-y-6 flex-1">
          <div class="flex flex-col items-center space-y-2">
            <div
              class="bg-secondary-container text-on-secondary-container px-4 py-1.5 rounded-full inline-flex items-center space-x-2 border border-secondary/20"
            >
              <span
                class="material-symbols-outlined text-secondary text-sm"
                style="font-variation-settings: 'FILL' 1"
              >
                check_circle
              </span>
              <span class="font-label-sm text-label-sm uppercase tracking-widest font-semibold">
                Qualifiée
              </span>
            </div>
            <span class="font-label-sm text-label-sm text-surface-tint opacity-60">
              DEMAND_QUALIFIED
            </span>
          </div>

          <div class="space-y-3">
            <h2 class="font-headline-lg-mobile text-headline-lg-mobile text-primary">
              Votre demande est prête
            </h2>
            <p class="font-body-md text-body-md text-on-surface-variant max-w-sm mx-auto leading-relaxed">
              J’ai décrit ce que je veux, mon budget et ma zone — ma demande est prête pour le
              matching.
            </p>
          </div>

          <div
            class="w-full bg-surface-container rounded-lg border border-outline-variant/30 p-4"
          >
            <p class="font-body-md text-body-md text-on-surface text-center">
              {{ headline }}
            </p>
          </div>
        </div>

        <div class="flex flex-col space-y-3 w-full mt-8">
          <button
            type="button"
            class="w-full bg-primary text-on-primary font-label-sm text-label-sm uppercase tracking-wide py-4 rounded-lg transition-colors"
            @click="goHome"
          >
            Retour à l’accueil
          </button>
          <button
            type="button"
            class="w-full border border-outline-variant text-primary font-label-sm text-label-sm uppercase tracking-wide py-4 rounded-lg hover:bg-surface-container-low transition-colors"
            @click="goMatching"
          >
            Apparier
          </button>
        </div>
      </div>
    </main>
  </div>
</template>
