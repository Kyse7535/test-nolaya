<script setup>
import { onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { EngagementStatus } from '../../domain/engagement/model'
import {
  ENGAGEMENT_HERO_ACCUEIL,
  ENGAGEMENT_PILLARS,
} from '../../mocks/engagementSeed'
import { useEngagementStore } from '../../stores/engagement'

const router = useRouter()
const engagementStore = useEngagementStore()

const heroSrc = ENGAGEMENT_HERO_ACCUEIL
const pillars = ENGAGEMENT_PILLARS

onMounted(() => {
  engagementStore.ensureDemoPrerequisites()
  const engagement = engagementStore.currentEngagement
  if (engagement?.status === EngagementStatus.COMMITTED) {
    router.replace({ name: 'engagement-confirmation' })
  }
})

function goBack() {
  router.push({ name: 'home' })
}

function openRecap() {
  const engagement = engagementStore.openFromFirmProposal()
  if (!engagement) return
  if (engagement.status === EngagementStatus.COMMITTED) {
    router.push({ name: 'engagement-confirmation' })
    return
  }
  if (engagement.status === EngagementStatus.AWAITING_PAYMENT) {
    router.push({ name: 'engagement-paiement' })
    return
  }
  router.push({ name: 'engagement-recapitulatif' })
}
</script>

<template>
  <div class="bg-background text-on-surface antialiased min-h-screen flex flex-col pb-32">
    <header
      class="bg-surface border-b border-surface-container flex items-center justify-between px-container-margin h-16 w-full z-50 sticky top-0"
    >
      <div class="flex items-center gap-4 min-w-0">
        <button
          type="button"
          aria-label="Retour"
          class="text-primary hover:opacity-80 transition-opacity active:scale-95 duration-200 p-2 -ml-2"
          @click="goBack"
        >
          <span class="material-symbols-outlined">arrow_back</span>
        </button>
        <h1 class="font-headline-sm text-headline-sm font-bold text-primary truncate">
          Accepter l’offre
        </h1>
      </div>
      <span
        class="inline-flex items-center justify-center px-3 py-1 bg-secondary-container text-on-secondary-container font-label-technical text-label-technical rounded-sm uppercase tracking-wider shrink-0"
      >
        EN ATTENTE
      </span>
    </header>

    <main class="flex-grow flex flex-col">
      <section class="w-full relative h-[50vh] min-h-[320px]">
        <img
          alt=""
          class="absolute inset-0 w-full h-full object-cover"
          :src="heroSrc"
        />
        <div class="absolute inset-0 bg-primary/40 flex items-end p-container-margin">
          <h2 class="font-display-lg-mobile text-display-lg-mobile text-on-primary max-w-2xl">
            Une offre, un accord, un créneau réservé.
          </h2>
        </div>
      </section>

      <div class="px-container-margin py-stack-lg w-full">
        <div class="mb-section-gap">
          <h3 class="font-headline-md text-headline-md text-primary mb-stack-sm">
            Confirmer votre rendez-vous
          </h3>
          <p class="font-body-lg text-body-lg text-on-surface-variant">
            Vous acceptez la même version de l’offre et des politiques, puis vous simulez le
            versement de l’acompte. L’engagement devient ferme et le créneau passe en réservation.
          </p>
          <div
            class="mt-stack-md flex items-start gap-2 p-stack-sm bg-surface-container-low border border-outline-variant rounded"
          >
            <span class="material-symbols-outlined text-outline text-sm shrink-0">info</span>
            <span class="font-body-sm text-body-sm text-on-surface-variant italic">
              Créneau actuellement en soft-hold jusqu’à votre engagement.
            </span>
          </div>
          <p
            class="mt-stack-sm font-label-technical text-label-technical text-on-surface-variant opacity-60 uppercase tracking-wider"
          >
            AWAITING_CLIENT_ACCEPTANCE
          </p>
        </div>

        <div class="mb-section-gap">
          <h4
            class="font-headline-sm text-headline-sm text-primary mb-stack-md border-b border-surface-container pb-stack-sm"
          >
            Ce que vous allez faire
          </h4>
          <div class="grid grid-cols-1 gap-stack-md">
            <div
              v-for="pillar in pillars"
              :key="pillar.title"
              class="p-stack-md bg-surface-container-lowest border border-surface-container flex flex-col gap-stack-sm rounded"
            >
              <div class="flex items-center gap-3 text-primary">
                <span class="material-symbols-outlined">{{ pillar.icon }}</span>
                <span class="font-headline-sm text-headline-sm text-base">{{ pillar.title }}</span>
              </div>
              <p
                v-if="pillar.title !== 'Engagement'"
                class="font-body-sm text-body-sm text-on-surface-variant"
              >
                {{ pillar.body }}
              </p>
              <p v-else class="font-body-sm text-body-sm text-on-surface-variant">
                Obtenir
                <span
                  class="font-label-technical text-label-technical bg-surface-container px-1 py-0.5 rounded-sm"
                >COMMITTED</span>
                et un créneau
                <span
                  class="font-label-technical text-label-technical bg-surface-container px-1 py-0.5 rounded-sm"
                >BOOKED</span>.
              </p>
            </div>
          </div>
        </div>

        <div class="pt-stack-md border-t border-surface-container text-center">
          <p class="font-body-sm text-body-sm text-outline">
            Paiement mock uniquement. Aucun prestataire de paiement réel dans cette démo.
          </p>
        </div>
      </div>
    </main>

    <div
      class="fixed bottom-0 left-0 w-full bg-surface-container-lowest border-t border-surface-container p-container-margin flex justify-center z-50"
    >
      <button
        type="button"
        class="w-full max-w-md bg-primary-container text-on-primary py-4 px-6 rounded font-headline-sm text-headline-sm hover:opacity-90 active:scale-95 transition-all flex items-center justify-center gap-2"
        @click="openRecap"
      >
        <span>Voir le récapitulatif</span>
        <span class="material-symbols-outlined text-sm">arrow_forward</span>
      </button>
    </div>
  </div>
</template>
