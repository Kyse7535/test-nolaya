<script setup>
import { onMounted } from 'vue'
import { useRouter } from 'vue-router'
import {
  EXPERIENCE_HERO_ACCUEIL,
  EXPERIENCE_PILLARS,
} from '../../mocks/experienceSeed'
import { useExperienceStore } from '../../stores/experience'
import { useSettlementStore } from '../../stores/settlement'

const router = useRouter()
const experienceStore = useExperienceStore()
const settlementStore = useSettlementStore()

onMounted(() => {
  if (!settlementStore.settled) {
    settlementStore.ensureDemoSeed()
  }
  if (!settlementStore.settled) {
    router.replace({ name: 'settlement-accueil' })
    return
  }
  experienceStore.ensureDemoSeed()
  if (experienceStore.recorded) {
    router.replace({ name: 'experience-succes' })
  }
})

function goBack() {
  router.push({ name: 'home' })
}

function confirmExperience() {
  experienceStore.ensureDemoSeed()
  router.push({ name: 'experience-confirmation' })
}
</script>

<template>
  <div
    class="bg-background text-on-background antialiased min-h-screen flex flex-col"
  >
    <header
      class="fixed top-0 left-0 w-full z-50 flex items-center px-margin-mobile h-16 bg-surface border-b border-surface-container"
    >
      <button
        type="button"
        aria-label="Retour"
        class="w-11 h-11 flex items-center justify-center -ml-2 rounded-full hover:bg-surface-container-low transition-colors active:scale-95 text-primary"
        @click="goBack"
      >
        <span class="material-symbols-outlined">arrow_back</span>
      </button>
      <h1 class="font-headline-sm text-headline-sm text-primary font-semibold ml-2">
        Preuve d’expérience
      </h1>
    </header>

    <main
      class="flex-1 pt-[88px] pb-[140px] px-margin-mobile flex flex-col gap-xl max-w-2xl mx-auto w-full"
    >
      <section class="flex flex-col gap-sm">
        <div class="flex items-center gap-sm mb-2 flex-wrap">
          <span
            class="font-label-mono text-label-mono px-2 py-1 bg-surface-container text-on-surface border border-outline-variant rounded-sm uppercase tracking-wider"
          >
            SETTLED
          </span>
          <span
            class="font-label-sm text-label-sm px-2 py-1 bg-secondary-container text-on-secondary-container rounded-sm uppercase tracking-wider"
          >
            PREUVE
          </span>
          <span
            v-if="experienceStore.statusCode"
            class="font-label-mono text-[10px] text-on-surface-variant uppercase tracking-wider opacity-60"
          >
            {{ experienceStore.statusCode }}
          </span>
        </div>
        <h2 class="font-headline-lg-mobile text-headline-lg-mobile text-on-background text-balance">
          Votre expérience est prête à être enregistrée
        </h2>
        <p class="font-body-lg text-body-lg text-on-surface-variant mt-2">
          Le règlement est clos. On capture les faits de la prestation. Vous pourrez
          laisser un avis multidimensionnel — ou passer. L’historique reste disponible,
          et vous pourrez refaire la même prestation avec des champs à reconfirmer.
        </p>
      </section>

      <section
        class="relative w-full aspect-[4/3] rounded-lg overflow-hidden border border-surface-container bg-surface-container-low"
      >
        <img
          alt=""
          class="absolute inset-0 w-full h-full object-cover"
          :src="EXPERIENCE_HERO_ACCUEIL"
        />
        <div
          class="absolute inset-0 bg-gradient-to-t from-primary/80 via-primary/10 to-transparent"
        />
        <div class="absolute bottom-0 left-0 w-full p-md">
          <p
            class="font-headline-md text-headline-md text-on-primary text-balance leading-tight"
          >
            Une preuve factuelle, une relation qui continue.
          </p>
        </div>
      </section>

      <section class="flex flex-col gap-lg">
        <h3 class="font-headline-sm text-headline-sm text-on-background">
          Ce que vous allez faire
        </h3>
        <div class="grid grid-cols-1 gap-md">
          <div
            v-for="pillar in EXPERIENCE_PILLARS"
            :key="pillar.title"
            class="flex items-start gap-md p-md bg-surface-container-lowest border border-surface-container rounded-lg"
          >
            <div
              class="w-11 h-11 flex items-center justify-center rounded-full bg-surface-container-low shrink-0"
            >
              <span
                class="material-symbols-outlined text-secondary"
                :style="
                  pillar.filled
                    ? { fontVariationSettings: `'FILL' 1` }
                    : undefined
                "
              >
                {{ pillar.icon }}
              </span>
            </div>
            <div class="flex flex-col gap-xs pt-1">
              <h4 class="font-body-lg text-body-lg font-semibold text-on-background">
                {{ pillar.title }}
              </h4>
              <p class="font-body-md text-body-md text-on-surface-variant">
                {{ pillar.body }}
              </p>
            </div>
          </div>
        </div>
      </section>

      <p class="font-body-sm text-body-sm text-on-surface-variant">
        L’avis n’est jamais obligatoire. Pas de modération opérateur ni de galerie
        vérifiée obligatoire dans cette démo.
      </p>
    </main>

    <div
      class="fixed bottom-0 left-0 w-full bg-surface border-t border-surface-container px-margin-mobile pt-md pb-6 z-50"
    >
      <div class="max-w-2xl mx-auto">
        <button
          type="button"
          class="w-full bg-primary text-on-primary font-body-md text-body-md font-semibold h-12 rounded-lg flex items-center justify-center transition-opacity hover:opacity-90 active:scale-[0.98]"
          @click="confirmExperience"
        >
          Confirmer mon expérience
        </button>
      </div>
    </div>
  </div>
</template>
