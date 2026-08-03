<script setup>
import { computed, onMounted, ref, watch } from 'vue'
import { useRouter } from 'vue-router'
import { averageRating, DemoRole } from '../../domain/experience/model'
import {
  DEFAULT_STYLIST_REPLY,
  EXPERIENCE_CLIENT_AVATAR,
  EXPERIENCE_PRO_REPLY_AVATAR,
} from '../../mocks/experienceSeed'
import { useExperienceStore } from '../../stores/experience'
import { useSettlementStore } from '../../stores/settlement'

const router = useRouter()
const experienceStore = useExperienceStore()
const settlementStore = useSettlementStore()

const experience = computed(() => experienceStore.currentExperience)
const review = computed(() => experienceStore.currentReview)
const isPro = computed(() => experienceStore.demoRole === DemoRole.PRO)
const replyDraft = ref('')
const starCount = computed(() =>
  Math.round(averageRating(review.value?.ratings) || 5),
)

onMounted(() => {
  if (!settlementStore.settled) {
    router.replace({ name: 'settlement-accueil' })
    return
  }
  experienceStore.ensureDemoSeed()
  if (!experienceStore.publishedReview) {
    router.replace(
      experienceStore.recorded
        ? { name: 'experience-succes' }
        : { name: 'experience-accueil' },
    )
    return
  }
  if (review.value?.stylistReply) {
    replyDraft.value = review.value.stylistReply
  }
})

watch(
  () => experienceStore.demoRole,
  (role) => {
    if (
      role === DemoRole.PRO &&
      review.value &&
      !review.value.stylistReply &&
      !replyDraft.value
    ) {
      replyDraft.value = DEFAULT_STYLIST_REPLY
    }
  },
)

function goBack() {
  router.push({ name: 'experience-succes' })
}

function saveReply() {
  experienceStore.replyAsPro(replyDraft.value)
}

function goHistory() {
  router.push({ name: 'experience-historique' })
}

function goSucces() {
  router.push({ name: 'experience-succes' })
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
        class="w-11 h-11 flex items-center justify-center -ml-2 text-primary active:scale-95 rounded-full hover:bg-surface-container-low transition-colors"
        @click="goBack"
      >
        <span class="material-symbols-outlined">arrow_back</span>
      </button>
      <h1 class="ml-2 font-headline-md text-headline-md text-primary truncate">
        Avis &amp; témoignage
      </h1>
    </header>

    <main
      v-if="experience && review"
      class="flex-grow pt-[112px] pb-[140px] px-margin-mobile max-w-lg mx-auto w-full"
    >
      <div class="mb-lg space-y-sm">
        <span
          class="inline-flex items-center px-3 py-1 rounded bg-surface-container text-primary font-label-sm text-label-sm uppercase"
        >
          {{ experienceStore.reviewBadge }}
        </span>
        <p class="font-body-lg text-body-lg text-on-surface-variant">
          Retour d'expérience suite à la prestation.
        </p>
      </div>

      <section
        class="bg-surface-container-lowest border border-surface-container rounded p-md mb-lg"
      >
        <div class="flex items-start gap-md mb-sm">
          <div
            class="flex-shrink-0 w-12 h-12 rounded-full overflow-hidden bg-surface-container"
          >
            <img
              alt=""
              class="w-full h-full object-cover"
              :src="EXPERIENCE_CLIENT_AVATAR"
            />
          </div>
          <div class="flex-grow">
            <h2 class="font-headline-sm text-headline-sm text-primary mb-xs">
              {{ experience.clientDisplayName }}
            </h2>
            <p class="font-label-mono text-label-mono text-on-surface-variant">
              {{ experience.serviceLabel }}
              <template v-if="experience.dateLabel">
                · {{ experience.dateLabel }}
              </template>
            </p>
          </div>
        </div>
        <div class="flex items-center gap-2 mb-sm flex-wrap">
          <div
            class="flex text-secondary"
            :aria-label="`${starCount} étoiles`"
          >
            <span
              v-for="n in 5"
              :key="n"
              class="material-symbols-outlined"
              :style="
                n <= starCount
                  ? { fontVariationSettings: `'FILL' 1` }
                  : undefined
              "
            >
              star
            </span>
          </div>
          <span
            class="inline-flex items-center gap-1 bg-surface-container-low px-2 py-0.5 rounded font-label-sm text-label-sm text-on-surface-variant border border-surface-container uppercase"
          >
            <span class="material-symbols-outlined text-icon-xs">verified</span>
            Expérience enregistrée
          </span>
        </div>
        <p
          v-if="review.comment"
          class="font-body-md text-body-md text-on-surface leading-relaxed"
        >
          « {{ review.comment }} »
        </p>
        <p
          v-else
          class="font-body-md text-body-md text-on-surface-variant leading-relaxed italic"
        >
          Notes publiées sans commentaire textuel.
        </p>
      </section>

      <section
        class="bg-surface-container-low border border-surface-container rounded p-md ml-lg"
      >
        <h3
          class="font-label-sm text-label-sm text-on-surface-variant mb-md uppercase"
        >
          Réponse de {{ experience.proDisplayName }}
        </h3>

        <div v-if="review.stylistReply && !isPro" class="flex items-start gap-md">
          <div
            class="flex-shrink-0 w-10 h-10 rounded-full overflow-hidden bg-surface-container"
          >
            <img
              alt=""
              class="w-full h-full object-cover"
              :src="EXPERIENCE_PRO_REPLY_AVATAR"
            />
          </div>
          <p class="font-body-md text-body-md text-on-surface leading-relaxed pt-1">
            « {{ review.stylistReply }} »
          </p>
        </div>

        <div v-else-if="isPro" class="flex flex-col gap-sm">
          <div class="flex items-start gap-md">
            <div
              class="flex-shrink-0 w-10 h-10 rounded-full overflow-hidden bg-surface-container"
            >
              <img
                alt=""
                class="w-full h-full object-cover"
                :src="EXPERIENCE_PRO_REPLY_AVATAR"
              />
            </div>
            <textarea
              v-model="replyDraft"
              rows="3"
              class="flex-1 bg-surface-container-lowest border border-surface-container rounded-lg p-sm font-body-md text-body-md text-on-surface focus:border-primary focus:ring-0 resize-none"
              placeholder="Répondre à la cliente…"
            />
          </div>
          <button
            type="button"
            class="self-end h-10 px-md bg-primary text-on-primary rounded-lg font-body-md text-body-md font-semibold disabled:opacity-40"
            :disabled="!replyDraft.trim()"
            @click="saveReply"
          >
            {{ review.stylistReply ? 'Mettre à jour' : 'Publier la réponse' }}
          </button>
        </div>

        <p
          v-else
          class="font-body-md text-body-md text-on-surface-variant italic"
        >
          Pas encore de réponse — basculez en Coiffeuse pour en ajouter une.
        </p>
      </section>
    </main>

    <div
      class="fixed bottom-0 left-0 w-full p-margin-mobile bg-surface/90 backdrop-blur-md border-t border-surface-container z-40"
    >
      <div class="max-w-lg mx-auto w-full flex flex-col gap-sm">
        <button
          type="button"
          class="w-full h-12 bg-primary text-on-primary font-headline-sm text-headline-sm rounded flex items-center justify-center active:opacity-90 transition-colors"
          @click="goSucces"
        >
          Continuer
        </button>
        <button
          type="button"
          class="w-full h-10 text-on-surface-variant font-body-md text-body-md"
          @click="goHistory"
        >
          Voir mon historique
        </button>
      </div>
    </div>
  </div>
</template>
