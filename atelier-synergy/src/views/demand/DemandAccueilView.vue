<script setup>
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import { statusBadgeLabel } from '../../domain/demand/labels'
import { DemandStatus } from '../../domain/demand/model'
import { useDemandStore } from '../../stores/demand'

const router = useRouter()
const demandStore = useDemandStore()

const heroBase =
  'https://lh3.googleusercontent.com/aida-public/AB6AXuAHlTXJt6AmJMW7lhLX8dk6-gqqWwmKJugzpPzwVl4WNniJIcBsDwcwJfkENOIGAb5Cd7tGbyqVitxoTVDqRJv5wypupH3a-L6PAnCc0td0LZzPcALcc494vIHesahKKMjFfBsXeN7KR9to3yws3RaSgioua8hHBmX1qjq1BXC_PN_S3guhn7pBUVVkelj01eHJ9i-KKaL_C2TYvqwXs0iKCM160IZpWb8MlW1g9MbUIfo5fa5mZ6I0'

/** CDN width suffixes — 2× for sharpness at max display 672px. */
const heroSrc = `${heroBase}=w1344`
const heroSrcset = `${heroBase}=w672 672w, ${heroBase}=w1344 1344w`

const pillars = [
  {
    icon: 'palette',
    title: 'Résultat',
    body: 'Inspiration ou prestation, variante et contexte (mariage, quotidien…).',
  },
  {
    icon: 'schedule',
    title: 'Temps',
    body: 'Date préférée et dernière échéance acceptable.',
  },
  {
    icon: 'payments',
    title: 'Budget',
    body: 'Cible, maximum et si les mèches sont incluses.',
  },
  {
    icon: 'location_on',
    title: 'Zone',
    body: 'Rayon, mobilité et lieux d’accueil acceptés.',
  },
  {
    icon: 'stars',
    title: 'Service & priorité',
    body: 'Protection, niveau de service, tâches et priorité de recherche.',
  },
]

const badgeLabel = computed(() => {
  const status = demandStore.currentDemand?.status ?? DemandStatus.DRAFT
  return statusBadgeLabel(status)
})

function goBack() {
  router.push({ name: 'home' })
}

function start() {
  demandStore.startDraft()
  demandStore.markInProgress()
  router.push({ name: 'demand-entree' })
}
</script>

<template>
  <div
    class="bg-background text-on-background antialiased min-h-screen flex flex-col relative pb-[100px]"
  >
    <header
      class="fixed top-0 w-full z-50 bg-surface border-b border-surface-container flex items-center px-container-margin h-16"
    >
      <button
        type="button"
        aria-label="Retour"
        class="mr-stack-md text-on-surface hover:opacity-80 transition-opacity active:scale-95 duration-150"
        @click="goBack"
      >
        <span class="material-symbols-outlined text-[24px]">arrow_back</span>
      </button>
      <h1 class="font-headline-md text-headline-md-mobile text-primary tracking-tight">
        Qualifier mon besoin
      </h1>
    </header>

    <main class="flex-grow pt-24 px-container-margin">
      <div class="mb-stack-md">
        <span
          class="inline-block bg-primary-container text-on-primary font-label-caps text-label-caps uppercase px-2 py-1 rounded-[2px] tracking-wider"
        >
          {{ badgeLabel }}
        </span>
      </div>

      <section class="mb-section-gap max-w-2xl mx-auto">
        <h2 class="font-headline-lg-mobile text-headline-lg-mobile text-primary mb-stack-md">
          Décrivez ce que vous voulez, clairement
        </h2>
        <p class="font-body-lg text-body-lg text-on-surface-variant leading-relaxed">
          Transformez une envie floue en demande structurée : résultat, délais, budget, zone et
          niveau de service. Une fois validée, votre demande sera prête pour trouver des coiffeuses —
          pas encore ici.
        </p>
      </section>

      <section class="mb-section-gap max-w-[672px] mx-auto relative">
        <div
          class="w-full max-w-[672px] aspect-[4/5] md:aspect-video relative overflow-hidden bg-surface-variant"
        >
          <img
            alt="Cliente consultant son téléphone"
            class="w-full h-full max-w-[672px] object-cover"
            :src="heroSrc"
            :srcset="heroSrcset"
            sizes="(max-width: 672px) 100vw, 672px"
          />
          <div
            class="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent flex items-end"
          >
            <p class="font-headline-md text-headline-md-mobile text-white p-container-margin">
              Une demande claire, des réponses utiles.
            </p>
          </div>
        </div>
      </section>

      <section class="mb-section-gap max-w-2xl mx-auto">
        <h3
          class="font-headline-md text-headline-md text-primary mb-stack-lg border-b border-surface-container pb-stack-sm"
        >
          Ce que vous allez préciser
        </h3>
        <div class="space-y-stack-md">
          <div
            v-for="pillar in pillars"
            :key="pillar.title"
            class="flex items-start bg-surface-container-lowest border border-outline-variant rounded-lg p-stack-md"
          >
            <div class="mr-stack-md text-secondary mt-1">
              <span class="material-symbols-outlined text-[24px]">{{ pillar.icon }}</span>
            </div>
            <div>
              <h4 class="font-headline-md text-headline-md-mobile text-primary mb-unit">
                {{ pillar.title }}
              </h4>
              <p class="font-body-sm text-body-sm text-on-surface-variant">
                {{ pillar.body }}
              </p>
            </div>
          </div>
        </div>
      </section>

      <section class="mb-section-gap max-w-2xl mx-auto text-center">
        <p class="font-body-sm text-body-sm text-on-surface-variant/70 italic">
          Aucun matching ni réservation dans cette étape. Vous validez votre demande à la fin.
        </p>
      </section>
    </main>

    <div
      class="fixed bottom-0 left-0 w-full bg-surface/90 backdrop-blur-md border-t border-surface-container p-container-margin z-50"
    >
      <button
        type="button"
        class="w-full max-w-[672px] mx-auto bg-primary-container text-on-primary font-headline-md text-body-lg font-semibold py-4 rounded-lg hover:bg-inverse-surface transition-colors active:scale-[0.98] duration-150 flex items-center justify-center"
        @click="start"
      >
        Commencer ma demande
        <span class="material-symbols-outlined ml-stack-sm text-[20px]">arrow_forward</span>
      </button>
    </div>
  </div>
</template>
