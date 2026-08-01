<script setup>
import { computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { storeToRefs } from 'pinia'
import { demandResultLabel } from '../../domain/matching/labels'
import { CampaignStatus } from '../../domain/matching/model'
import { useMatchingStore } from '../../stores/matching'

const router = useRouter()
const matchingStore = useMatchingStore()
const { currentCampaign, shortlist, acceptCount } = storeToRefs(matchingStore)

const snapshot = computed(() => currentCampaign.value?.demandSnapshot ?? null)
const inviteCount = computed(() => currentCampaign.value?.invitations?.length ?? 0)
const resultLabel = computed(() => demandResultLabel(snapshot.value))
const budgetMax = computed(() => Number(snapshot.value?.budgetMax) || 0)
const radiusKm = computed(() => snapshot.value?.radiusKm ?? null)

onMounted(() => {
  const campaign = currentCampaign.value
  if (!campaign) {
    router.replace({ name: 'matching-accueil' })
    return
  }
  if (campaign.status !== CampaignStatus.SHORTLIST_READY) {
    router.replace({ name: 'matching-suivi' })
  }
})

function goBack() {
  router.push({ name: 'matching-suivi' })
}

function goProposal() {
  router.push({ name: 'proposal-accueil' })
}

function goSuivi() {
  router.push({ name: 'matching-suivi' })
}
</script>

<template>
  <div class="bg-background text-on-background min-h-screen flex flex-col items-center">
    <header
      class="w-full sticky top-0 z-50 bg-background border-b border-outline-variant flex items-center justify-between px-margin-mobile h-16 max-w-7xl mx-auto"
    >
      <button
        type="button"
        aria-label="Retour"
        class="text-primary hover:opacity-80 transition-opacity active:scale-95 flex items-center justify-center p-sm"
        @click="goBack"
      >
        <span class="material-symbols-outlined">arrow_back</span>
      </button>
      <h1
        class="font-headline-lg-mobile text-headline-lg-mobile font-bold tracking-tight text-primary uppercase"
      >
        Nolaya
      </h1>
      <div class="w-10" />
    </header>

    <main class="w-full max-w-[390px] mx-auto flex-1 pb-2xl">
      <div class="px-margin-mobile pt-md">
      </div>

      <section
        class="px-margin-mobile pt-xl pb-lg border-b border-outline-variant bg-surface-container-lowest flex flex-col items-center text-center"
      >
        <div
          class="inline-flex items-center gap-xs px-sm py-[2px] bg-secondary-container rounded-sm mb-lg"
        >
          <span
            class="font-label-mono text-label-mono text-on-secondary-fixed uppercase tracking-wider"
          >
            SHORTLIST PRÊTE
          </span>
        </div>
        <h2 class="font-headline-lg-mobile text-headline-lg-mobile mb-md text-primary">
          Shortlist prête
        </h2>
        <p class="font-body-md text-body-md text-on-surface-variant max-w-sm mb-lg">
          Votre demande a été envoyée à {{ inviteCount }} coiffeuses ;
          {{ acceptCount }} ont accepté — vous pouvez passer aux offres fermes.
        </p>
        <div
          class="font-label-mono text-[10px] leading-4 tracking-widest text-on-tertiary-container uppercase"
        >
          SHORTLIST_READY · RESPONSES_TO_CONVERT
        </div>
      </section>

      <section class="px-margin-mobile py-lg border-b border-outline-variant bg-surface-container-low">
        <h3
          class="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider mb-sm"
        >
          Demande
        </h3>
        <div class="flex items-center gap-md font-body-sm text-body-sm text-on-surface flex-wrap">
          <span class="flex items-center gap-xs">
            <span class="material-symbols-outlined text-[16px] text-outline">content_cut</span>
            {{ resultLabel }}
          </span>
          <span class="text-outline-variant">•</span>
          <span class="flex items-center gap-xs">
            <span class="material-symbols-outlined text-[16px] text-outline">euro</span>
            max {{ budgetMax }} €
          </span>
          <template v-if="radiusKm">
            <span class="text-outline-variant">•</span>
            <span class="flex items-center gap-xs">
              <span class="material-symbols-outlined text-[16px] text-outline">location_on</span>
              {{ radiusKm }} km
            </span>
          </template>
        </div>
      </section>

      <section class="px-margin-mobile py-xl">
        <h3 class="font-headline-md text-headline-md mb-lg text-primary">
          Coiffeuses retenues
        </h3>
        <div class="flex flex-col gap-md">
          <article
            v-for="item in shortlist"
            :key="item.id"
            class="bg-surface-container-lowest border border-outline-variant rounded p-lg flex flex-col gap-md shadow-sm"
          >
            <div class="flex items-start gap-md">
              <div
                class="w-16 h-16 rounded overflow-hidden flex-shrink-0 bg-surface-variant"
              >
                <img
                  v-if="item.avatarUrl"
                  class="w-full h-full object-cover grayscale opacity-90 mix-blend-multiply"
                  :src="item.avatarUrl"
                  alt=""
                />
              </div>
              <div class="flex-1">
                <div class="flex justify-between items-start mb-xs">
                  <h4 class="font-body-lg text-body-lg font-semibold text-primary">
                    {{ item.displayName }}
                  </h4>
                  <span
                    class="material-symbols-outlined text-secondary"
                    style="font-variation-settings: 'FILL' 1"
                  >
                    verified
                  </span>
                </div>
                <p class="font-body-sm text-body-sm text-on-surface-variant mb-xs">
                  {{ item.styleTag }}
                </p>
                <div
                  class="inline-flex items-center gap-xs px-xs py-1 bg-surface-container rounded-xs border border-outline-variant"
                >
                  <span class="material-symbols-outlined text-[14px] text-primary">
                    check_circle
                  </span>
                  <span class="font-label-mono text-[10px] text-primary uppercase">
                    Acceptation exacte
                  </span>
                </div>
              </div>
            </div>
          </article>
        </div>
      </section>

      <section class="px-margin-mobile pt-md pb-2xl flex flex-col gap-lg">
        <div class="bg-surface-container p-md border-l-4 border-primary rounded-r">
          <p class="font-body-sm text-body-sm text-on-surface">
            <span class="font-semibold block mb-xs">Prochaine étape :</span>
            Vérifier la faisabilité et former une proposition ferme. Pas de réservation ici.
          </p>
        </div>
        <div class="flex flex-col gap-md mt-md">
          <button
            type="button"
            class="w-full bg-primary-container text-on-primary py-[16px] px-lg rounded font-label-sm text-label-sm uppercase tracking-widest hover:opacity-90 active:scale-[0.98] transition-all flex justify-center items-center gap-sm"
            @click="goProposal"
          >
            Continuer vers l’offre ferme
            <span class="material-symbols-outlined text-[18px]">arrow_forward</span>
          </button>
          <button
            type="button"
            class="w-full bg-surface-container-lowest text-primary border border-primary py-[16px] px-lg rounded font-label-sm text-label-sm uppercase tracking-widest hover:bg-surface-container transition-colors active:scale-[0.98]"
            @click="goSuivi"
          >
            Voir le détail des réponses
          </button>
        </div>
      </section>
    </main>
  </div>
</template>
