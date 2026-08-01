<script setup>
import { computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import ExperienceDemoRoleBar from '../../components/experience/ExperienceDemoRoleBar.vue'
import {
  EXPERIENCE_HERO_SUCCES,
  EXPERIENCE_TEXTURE_THUMB,
} from '../../mocks/experienceSeed'
import { useExperienceStore } from '../../stores/experience'
import { useSettlementStore } from '../../stores/settlement'

const router = useRouter()
const experienceStore = useExperienceStore()
const settlementStore = useSettlementStore()

const experience = computed(() => experienceStore.currentExperience)
const hasReview = computed(() => experienceStore.publishedReview)

onMounted(() => {
  if (!settlementStore.settled) {
    router.replace({ name: 'settlement-accueil' })
    return
  }
  experienceStore.ensureDemoSeed()
  if (!experienceStore.recorded) {
    router.replace({ name: 'experience-accueil' })
  }
})

function goBack() {
  router.push({ name: 'home' })
}

function goHistory() {
  router.push({ name: 'experience-historique' })
}

function goRepeat() {
  experienceStore.openRepeatPanel()
  router.push({ name: 'experience-historique' })
}
</script>

<template>
  <div
    class="bg-surface text-on-surface font-body-md antialiased min-h-screen flex flex-col"
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
      <h1
        class="ml-2 font-headline-sm text-headline-sm text-primary font-semibold flex-1 text-center pr-9"
      >
        Preuve d’expérience
      </h1>
    </header>

    <main v-if="experience" class="flex-1 pt-16 pb-xxl flex flex-col">
      <div class="w-full h-64 relative overflow-hidden">
        <img
          alt=""
          class="absolute inset-0 w-full h-full object-cover object-top"
          :src="EXPERIENCE_HERO_SUCCES"
        />
        <div
          class="absolute inset-0 bg-gradient-to-t from-surface via-transparent to-transparent opacity-80"
        />
      </div>

      <div class="px-margin-mobile flex flex-col gap-lg -mt-4 relative z-10">
        <ExperienceDemoRoleBar />

        <div class="flex flex-col items-center text-center gap-sm mt-2">
          <div
            class="inline-flex items-center justify-center w-8 h-8 rounded-full bg-primary text-on-primary mb-2"
          >
            <span
              class="material-symbols-outlined text-[18px]"
              style="font-variation-settings: 'FILL' 1"
            >
              check
            </span>
          </div>
          <h2 class="font-display-lg text-display-lg text-primary">
            Expérience enregistrée
          </h2>
          <div class="flex flex-wrap items-center justify-center gap-2 mt-xs">
            <span
              class="px-3 py-1 bg-surface-container-low border border-surface-container rounded font-label-sm text-label-sm text-on-surface uppercase"
            >
              ENREGISTRÉE
            </span>
            <span
              class="px-3 py-1 bg-surface-container-low border border-surface-container rounded font-label-mono text-label-mono text-on-surface-variant"
            >
              EXPERIENCE_RECORDED
            </span>
          </div>
        </div>

        <p
          class="font-body-lg text-body-lg text-on-surface-variant text-center max-w-[320px] mx-auto"
        >
          Votre preuve d’expérience est créée. Vous pouvez retrouver cette prestation
          dans l’historique et la refaire plus tard en reconfirmant prix, date et lieu.
        </p>

        <div
          class="bg-surface-container-lowest border border-surface-container rounded-lg p-md relative overflow-hidden"
        >
          <div class="absolute top-0 left-0 w-1 h-full bg-primary" />
          <div class="flex items-start justify-between">
            <div class="flex flex-col gap-xs">
              <span class="font-headline-sm text-headline-sm text-primary">
                {{ experience.serviceLabel }}
              </span>
              <span
                class="font-body-md text-body-md text-on-surface-variant flex items-center gap-1"
              >
                <span class="material-symbols-outlined text-[16px]">person</span>
                {{ experience.proDisplayName }}
              </span>
              <span
                class="font-body-md text-body-md text-on-surface-variant flex items-center gap-1"
              >
                <span class="material-symbols-outlined text-[16px]">
                  calendar_today
                </span>
                {{ experience.dateLabel || '—' }}
              </span>
            </div>
            <div
              class="w-12 h-12 rounded-full overflow-hidden border border-surface-container flex-shrink-0"
            >
              <img
                alt=""
                class="w-full h-full object-cover"
                :src="EXPERIENCE_TEXTURE_THUMB"
              />
            </div>
          </div>
          <div
            class="mt-md pt-md border-t border-surface-container flex items-center gap-2"
          >
            <span
              class="material-symbols-outlined text-secondary"
              style="font-variation-settings: 'FILL' 1"
            >
              {{ hasReview ? 'star' : 'history' }}
            </span>
            <span class="font-label-mono text-label-mono text-secondary">
              {{ hasReview ? 'Avis publié' : 'Sans avis — historique créé' }}
            </span>
          </div>
        </div>

        <div class="flex flex-col gap-md mt-md">
          <button
            type="button"
            class="w-full h-12 bg-primary text-on-primary font-headline-sm text-headline-sm font-semibold rounded-lg flex items-center justify-center transition-colors active:scale-95"
            @click="goHistory"
          >
            Voir mon historique
          </button>
          <button
            type="button"
            class="w-full h-12 bg-transparent border border-primary text-primary font-headline-sm text-headline-sm font-semibold rounded-lg flex items-center justify-center transition-colors active:scale-95"
            @click="goRepeat"
          >
            Refaire cette prestation
          </button>
        </div>

        <div class="mt-lg text-center pb-8">
          <p
            class="font-label-mono text-label-mono text-on-surface-variant text-[11px] opacity-70"
          >
            Pas de modération opérateur.<br />
            Galerie vérifiée hors cœur de cette démo.
          </p>
        </div>
      </div>
    </main>
  </div>
</template>
