<script setup>
import { computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import ExperienceDemoRoleBar from '../../components/experience/ExperienceDemoRoleBar.vue'
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
      class="fixed top-0 left-0 w-full z-50 flex justify-between items-center h-16 px-margin-mobile bg-surface border-b border-surface-container"
    >
      <button
        type="button"
        aria-label="Retour"
        class="w-11 h-11 flex items-center justify-start text-on-surface-variant hover:text-on-background transition-colors"
        @click="goBack"
      >
        <span class="material-symbols-outlined text-[24px]">arrow_back</span>
      </button>
      <h1
        class="font-headline-sm text-headline-sm text-on-surface text-center flex-1 pr-11"
      >
        Confirmation de fin
      </h1>
    </header>

    <main
      v-if="experience"
      class="flex-1 pt-20 px-margin-mobile pb-[140px] max-w-lg mx-auto w-full"
    >
      <ExperienceDemoRoleBar class="mb-md" />

      <div class="mb-lg">
        <span
          class="inline-block bg-surface-container-high px-2 py-1 rounded font-label-mono text-label-mono text-on-background uppercase tracking-widest mb-sm"
        >
          SETTLED
        </span>
        <h2 class="font-headline-md text-headline-md text-on-background">
          Confirmez le déroulement de votre prestation.
        </h2>
      </div>

      <div
        class="bg-surface-container-lowest border border-on-background rounded-lg p-md mb-lg relative overflow-hidden"
      >
        <div class="flex items-start gap-sm">
          <span
            class="material-symbols-outlined text-on-background mt-0.5"
            style="font-variation-settings: 'FILL' 1"
          >
            radio_button_checked
          </span>
          <div>
            <h3 class="font-body-lg text-body-lg text-on-background font-semibold">
              Réalisée comme prévu
            </h3>
            <p class="font-body-md text-body-md text-on-surface-variant mt-xs">
              Happy path démo — outcome OK.
            </p>
          </div>
        </div>
      </div>

      <div
        class="w-full h-[200px] rounded-lg overflow-hidden mb-lg relative bg-surface-container"
      >
        <img
          alt=""
          class="w-full h-full object-cover object-center absolute inset-0"
          :src="EXPERIENCE_HERO_CONFIRMATION"
        />
      </div>

      <section
        class="bg-surface-container-lowest border border-surface-container rounded-lg p-md flex flex-col gap-sm"
      >
        <div class="flex justify-between items-center py-xs">
          <span class="font-body-md text-body-md text-on-surface-variant">Date</span>
          <span class="font-body-md text-body-md text-on-background font-semibold">
            {{ experience.dateLabel || '—' }}
          </span>
        </div>
        <div
          v-if="experience.slotLabel || experience.placeLabel"
          class="flex justify-between items-center py-xs"
        >
          <span class="font-body-md text-body-md text-on-surface-variant">Lieu</span>
          <span class="font-body-md text-body-md text-on-background font-semibold">
            {{ experience.placeLabel || experience.slotLabel || '—' }}
          </span>
        </div>
        <div class="flex justify-between items-center py-xs">
          <span class="font-body-md text-body-md text-on-surface-variant">
            Coiffeuse
          </span>
          <div class="flex items-center gap-2">
            <span class="font-body-md text-body-md text-on-background font-semibold">
              {{ experience.proDisplayName }}
            </span>
            <div
              class="w-8 h-8 rounded-full overflow-hidden bg-surface-container shrink-0 border border-surface-container"
            >
              <img alt="" class="w-full h-full object-cover" :src="avatarUrl" />
            </div>
          </div>
        </div>
        <div class="flex justify-between items-start py-xs">
          <span class="font-body-md text-body-md text-on-surface-variant w-1/3">
            Prestation
          </span>
          <span
            class="font-body-md text-body-md text-on-background font-semibold text-right w-2/3 leading-snug"
          >
            {{ experience.serviceLabel }}
          </span>
        </div>
        <div class="h-px w-full bg-surface-container my-xs" />
        <div class="flex justify-between items-center py-xs">
          <span class="font-body-md text-body-md text-on-background font-semibold">
            Prix final
          </span>
          <span
            class="font-label-mono text-label-mono text-on-background px-2 py-1 bg-surface-container-low rounded"
          >
            {{ formatEuro(experience.finalAmount) }}
          </span>
        </div>
      </section>
    </main>

    <div
      class="fixed bottom-0 left-0 w-full bg-surface border-t border-surface-container px-margin-mobile pt-md pb-6 flex flex-col gap-sm z-50"
    >
      <div class="max-w-lg mx-auto w-full flex flex-col gap-sm">
        <button
          type="button"
          class="w-full bg-primary text-on-primary font-body-md text-body-md font-semibold h-12 rounded-lg flex items-center justify-center transition-opacity hover:opacity-90 active:scale-[0.98]"
          @click="continueToReview"
        >
          Continuer vers l’évaluation
        </button>
        <button
          type="button"
          class="w-full text-on-surface-variant font-body-md text-body-md text-center py-2 underline decoration-surface-dim underline-offset-4 hover:text-on-background transition-colors"
          @click="skipReview"
        >
          Passer l’avis
        </button>
      </div>
    </div>
  </div>
</template>
