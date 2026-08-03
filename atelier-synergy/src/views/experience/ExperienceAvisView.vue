<script setup>
import { computed, onMounted, reactive, ref } from 'vue'
import { useRouter } from 'vue-router'
import { emptyRatings, hasAnyRating } from '../../domain/experience/model'
import { feedbackDimensionRows } from '../../domain/experience/labels'
import {
  EXPERIENCE_PRO_AVATAR_ALT,
} from '../../mocks/experienceSeed'
import { useExperienceStore } from '../../stores/experience'
import { useSettlementStore } from '../../stores/settlement'

const router = useRouter()
const experienceStore = useExperienceStore()
const settlementStore = useSettlementStore()

const experience = computed(() => experienceStore.currentExperience)
const dimensions = feedbackDimensionRows()
const ratings = reactive(emptyRatings())
const comment = ref('')
const favorite = ref(false)

const avatarUrl = computed(
  () => experience.value?.proAvatarUrl || EXPERIENCE_PRO_AVATAR_ALT,
)
const canPublish = computed(() => hasAnyRating(ratings))

onMounted(() => {
  if (!settlementStore.settled) {
    router.replace({ name: 'settlement-accueil' })
    return
  }
  experienceStore.ensureDemoSeed()
  if (!experienceStore.recorded) {
    experienceStore.confirmOutcome()
  }
  if (experienceStore.publishedReview) {
    router.replace({ name: 'experience-temoignage' })
  }
})

function setRating(key, value) {
  ratings[key] = value
}

function goBack() {
  if (experienceStore.recorded) {
    router.push({ name: 'experience-succes' })
    return
  }
  router.push({ name: 'experience-confirmation' })
}

function publish() {
  if (!canPublish.value) return
  experienceStore.publishReview({
    ratings: { ...ratings },
    comment: comment.value,
    favorite: favorite.value,
  })
  router.push({ name: 'experience-temoignage' })
}

function skip() {
  experienceStore.skipReview()
  router.push({ name: 'experience-succes' })
}
</script>

<template>
  <div class="bg-surface text-on-surface font-body-lg antialiased min-h-screen pb-28">
    <header
      class="sticky top-0 left-0 w-full z-50 flex justify-between items-center px-margin-mobile h-14 bg-surface border-b border-surface-variant"
    >
      <button
        type="button"
        aria-label="Retour"
        class="w-11 h-11 flex items-center justify-center text-on-surface-variant hover:opacity-80 transition-opacity"
        @click="goBack"
      >
        <span class="material-symbols-outlined text-headline-sm">arrow_back</span>
      </button>
      <h1
        class="font-headline-sm text-headline-sm text-primary flex-1 text-center pr-11"
      >
        Votre avis
      </h1>
    </header>

    <main v-if="experience" class="pt-4 px-margin-mobile max-w-lg mx-auto">
      <section class="flex flex-col items-center mb-4 text-center">
        <div class="relative w-14 h-14 mb-2">
          <img
            alt=""
            class="w-full h-full object-cover rounded-full border border-surface-container"
            :src="avatarUrl"
          />
          <div class="absolute -bottom-1 -right-1 bg-surface rounded-full p-0.5">
            <span
              class="inline-block bg-surface-container text-on-surface font-label-sm text-label-sm px-2 py-0.5 rounded-full border border-surface-variant uppercase"
            >
              Optionnel
            </span>
          </div>
        </div>
        <h2 class="font-headline-md text-headline-md text-primary mb-1">
          Votre retour d'expérience
        </h2>
        <p class="font-body-sm text-body-sm text-on-surface-variant max-w-sm">
          Votre avis aide {{ experience.proDisplayName }} et les autres clientes — il
          reste facultatif.
        </p>
      </section>

      <section class="mb-4">
        <div
          class="bg-surface-container-lowest border border-surface-variant rounded-lg p-3"
        >
          <div
            v-for="(dim, index) in dimensions"
            :key="dim.key"
            class="flex flex-col"
            :class="index < dimensions.length - 1 ? 'mb-3 pb-3 border-b border-surface-container-highest' : ''"
          >
            <div class="flex justify-between items-start mb-xs gap-sm">
              <label class="font-headline-sm text-body-lg text-primary">
                {{ dim.label }}
              </label>
              <div class="flex gap-1" role="group" :aria-label="dim.label">
                <button
                  v-for="n in 5"
                  :key="n"
                  type="button"
                  class="material-symbols-outlined text-icon-lg transition-colors"
                  :class="n <= ratings[dim.key] ? 'text-secondary' : 'text-outline-variant'"
                  :style="
                    n <= ratings[dim.key]
                      ? { fontVariationSettings: `'FILL' 1` }
                      : undefined
                  "
                  @click="setRating(dim.key, n)"
                >
                  star
                </button>
              </div>
            </div>
            <p class="font-body-md text-body-md text-on-surface-variant">
              {{ dim.hint }}
            </p>
          </div>
        </div>
      </section>

      <section class="mb-lg">
        <label
          class="block font-headline-sm text-body-lg text-primary mb-sm"
          for="review-comment"
        >
          Avis public (facultatif)
        </label>
        <textarea
          id="review-comment"
          v-model="comment"
          rows="4"
          placeholder="Partagez votre expérience avec la communauté…"
          class="w-full bg-surface-container-lowest border border-surface-variant rounded-lg p-md font-body-md text-body-md text-on-surface placeholder:text-on-surface-variant focus:border-primary focus:ring-0 transition-colors resize-none"
        />
      </section>

      <section class="mb-xl">
        <button
          type="button"
          class="w-full flex items-center justify-between p-md bg-surface-container-lowest border border-surface-variant rounded-lg"
          @click="favorite = !favorite"
        >
          <div class="flex items-center gap-sm text-left">
            <span
              class="material-symbols-outlined text-secondary"
              :style="
                favorite ? { fontVariationSettings: `'FILL' 1` } : undefined
              "
            >
              favorite
            </span>
            <div>
              <p class="font-body-md text-body-md font-semibold text-primary">
                Ajouter aux favoris
              </p>
              <p class="font-body-sm text-body-sm text-on-surface-variant">
                Optionnel — pour retrouver {{ experience.proDisplayName }} plus tard
              </p>
            </div>
          </div>
          <span
            class="material-symbols-outlined"
            :class="favorite ? 'text-primary' : 'text-outline-variant'"
          >
            {{ favorite ? 'toggle_on' : 'toggle_off' }}
          </span>
        </button>
      </section>
    </main>

    <div
      class="fixed bottom-0 left-0 w-full bg-surface border-t border-surface-variant px-margin-mobile pt-md pb-6 flex flex-col gap-sm z-50"
    >
      <div class="max-w-lg mx-auto w-full flex flex-col gap-sm">
        <button
          type="button"
          class="w-full h-12 rounded-lg font-body-md text-body-md font-semibold flex items-center justify-center transition-opacity active:scale-[0.98]"
          :class="canPublish ? 'bg-primary text-on-primary hover:opacity-90' : 'bg-surface-container text-on-surface-variant cursor-not-allowed'"
          :disabled="!canPublish"
          @click="publish"
        >
          Publier mon avis
        </button>
        <button
          type="button"
          class="w-full text-on-surface-variant font-body-md text-body-md text-center py-2 underline underline-offset-4 hover:text-on-background transition-colors"
          @click="skip"
        >
          Passer l’avis
        </button>
      </div>
    </div>
  </div>
</template>
