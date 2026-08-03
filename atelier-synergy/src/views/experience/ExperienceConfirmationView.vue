<script setup>
import { computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { formatEuro } from '../../domain/experience/model'
import {
  EXPERIENCE_HERO_CONFIRMATION,
  EXPERIENCE_PRO_AVATAR,
} from '../../mocks/experienceSeed'
import { useExperienceStore } from '../../stores/experience'
import { useSettlementStore } from '../../stores/settlement'

const router = useRouter()
const experienceStore = useExperienceStore()
const settlementStore = useSettlementStore()

const experience = computed(() => experienceStore.currentExperience)
const avatarUrl = computed(
  () => experience.value?.proAvatarUrl || EXPERIENCE_PRO_AVATAR,
)

onMounted(() => {
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
  router.push({ name: 'experience-accueil' })
}

function continueToReview() {
  experienceStore.confirmOutcome()
  router.push({ name: 'experience-avis' })
}

function skipReview() {
  experienceStore.skipReview()
  router.push({ name: 'experience-succes' })
}
</script>

<template>
  <div
    class="bg-background text-on-background font-body-md antialiased min-h-screen flex flex-col"
  >
    <header
      class="sticky top-0 left-0 w-full z-50 flex items-center h-14 px-margin-mobile bg-surface border-b border-surface-container"
    >
      <button
        type="button"
        aria-label="Retour"
        class="w-10 h-10 flex items-center justify-center -ml-2 text-on-surface-variant hover:text-on-background transition-colors shrink-0"
        @click="goBack"
      >
        <span class="material-symbols-outlined">arrow_back</span>
      </button>
      <h1 class="font-headline-sm text-headline-sm text-on-surface flex-1 truncate ml-1">
        Confirmation de fin
      </h1>
      <span
        class="bg-surface-container-high px-2 py-1 rounded font-label-mono text-label-mono text-on-background uppercase tracking-widest shrink-0"
      >
        SETTLED
      </span>
    </header>

    <main
      v-if="experience"
      class="flex-1 pt-4 px-margin-mobile pb-28 max-w-lg mx-auto w-full flex flex-col gap-3"
    >
      <h2 class="font-headline-md text-headline-md text-on-background">
        Confirmez le déroulement de votre prestation.
      </h2>

      <div
        class="bg-surface-container-lowest border border-on-background rounded-lg px-3 py-2.5 flex items-start gap-2"
      >
        <span
          class="material-symbols-outlined text-on-background text-[20px] mt-0.5"
          style="font-variation-settings: 'FILL' 1"
        >
          radio_button_checked
        </span>
        <div class="min-w-0">
          <h3 class="font-body-md text-body-md text-on-background font-semibold">
            Réalisée comme prévu
          </h3>
          <p class="font-body-sm text-body-sm text-on-surface-variant">
            Happy path démo — outcome OK.
          </p>
        </div>
      </div>

      <div
        class="w-full h-28 rounded-lg overflow-hidden relative bg-surface-container border border-surface-container"
      >
        <img
          alt=""
          class="w-full h-full object-cover object-center absolute inset-0"
          :src="EXPERIENCE_HERO_CONFIRMATION"
        />
      </div>

      <section
        class="bg-surface-container-lowest border border-surface-container rounded-lg px-3 py-2 flex flex-col"
      >
        <div class="flex justify-between items-center py-1.5 gap-3">
          <span class="font-body-sm text-body-sm text-on-surface-variant">Date</span>
          <span class="font-body-sm text-body-sm text-on-background font-semibold">
            {{ experience.dateLabel || '—' }}
          </span>
        </div>
        <div
          v-if="experience.slotLabel || experience.placeLabel"
          class="flex justify-between items-center py-1.5 gap-3"
        >
          <span class="font-body-sm text-body-sm text-on-surface-variant">Lieu</span>
          <span class="font-body-sm text-body-sm text-on-background font-semibold">
            {{ experience.placeLabel || experience.slotLabel || '—' }}
          </span>
        </div>
        <div class="flex justify-between items-center py-1.5 gap-3">
          <span class="font-body-sm text-body-sm text-on-surface-variant">
            Coiffeuse
          </span>
          <div class="flex items-center gap-2 min-w-0">
            <span class="font-body-sm text-body-sm text-on-background font-semibold truncate">
              {{ experience.proDisplayName }}
            </span>
            <div
              class="w-7 h-7 rounded-full overflow-hidden bg-surface-container shrink-0 border border-surface-container"
            >
              <img alt="" class="w-full h-full object-cover" :src="avatarUrl" />
            </div>
          </div>
        </div>
        <div class="flex justify-between items-start py-1.5 gap-3">
          <span class="font-body-sm text-body-sm text-on-surface-variant shrink-0">
            Prestation
          </span>
          <span
            class="font-body-sm text-body-sm text-on-background font-semibold text-right leading-snug"
          >
            {{ experience.serviceLabel }}
          </span>
        </div>
        <div class="h-px w-full bg-surface-container my-1" />
        <div class="flex justify-between items-center py-1.5 gap-3">
          <span class="font-body-sm text-body-sm text-on-background font-semibold">
            Prix final
          </span>
          <span
            class="font-label-mono text-label-mono text-on-background px-2 py-0.5 bg-surface-container-low rounded"
          >
            {{ formatEuro(experience.finalAmount) }}
          </span>
        </div>
      </section>
    </main>

    <div
      class="fixed bottom-0 left-0 w-full bg-surface/95 backdrop-blur-sm border-t border-surface-container px-margin-mobile py-3 flex flex-col gap-1.5 z-50"
    >
      <div class="max-w-lg mx-auto w-full flex flex-col gap-1.5">
        <button
          type="button"
          class="w-full bg-primary text-on-primary font-body-md text-body-md font-semibold h-12 rounded-lg flex items-center justify-center transition-opacity hover:opacity-90 active:scale-[0.98]"
          @click="continueToReview"
        >
          Continuer vers l’évaluation
        </button>
        <button
          type="button"
          class="w-full text-on-surface-variant font-body-sm text-body-sm text-center py-1.5 underline decoration-surface-dim underline-offset-4 hover:text-on-background transition-colors"
          @click="skipReview"
        >
          Passer l’avis
        </button>
      </div>
    </div>
  </div>
</template>
