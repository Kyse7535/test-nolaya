<script setup>
import { useRouter } from 'vue-router'
import { platformPrinciples } from '../../mocks/platform'

const router = useRouter()

const heroSrc =
  'https://lh3.googleusercontent.com/aida-public/AB6AXuCKpWBmlswVWHpZ51Y_4H6313KGDOOpufLCQqG7dCYA3wx1Rwnzkgd7XCEng2MxSHYhzToqqB2GznozhQIecJIcmAUPBxcufOj9_tVqWZIJ8NTZcLN_FSQgHhGj1k0nvr4yDWzrw076ULSTM78m6TN0CE4orOSjm0MHefwg465t_rau7W1y8zdCvgwTVEFFDmf5uLtOsgcYCYayccqWSCS_sIAmz1nwnhDAOZDwz5QYBQYVKluiMIXjTg'

const pillars = [
  {
    icon: 'location_on',
    title: 'Contextes',
    body: 'Où vous exercez en général et si l’adresse reste confidentielle.',
  },
  {
    icon: 'group',
    title: 'Accueil',
    body: 'Accompagnants, mineurs, règles d’accès.',
  },
  {
    icon: 'payments',
    title: 'Communication & paiement',
    body: 'Quand vous répondez et comment vous êtes payée.',
  },
  {
    icon: 'gavel',
    title: 'Politiques & sécurité',
    body: 'Retard, annulation, interruption et consentement photos.',
  },
]

function goBack() {
  router.push({ name: 'home' })
}

function start() {
  router.push({ name: 'framework-contextes' })
}
</script>

<template>
  <div class="bg-background text-on-surface font-body-md antialiased min-h-screen pb-24">
    <header
      class="sticky top-0 w-full z-50 bg-surface border-b border-surface-container flex justify-between items-center px-margin-mobile h-16 transition-colors"
    >
      <button
        type="button"
        class="w-10 h-10 flex items-center justify-center text-on-surface hover:bg-surface-container-low rounded-lg active:scale-95 duration-150"
        @click="goBack"
      >
        <span class="material-symbols-outlined text-[24px]">arrow_back</span>
      </button>
      <h1 class="font-headline-sm text-headline-sm text-primary font-bold tracking-tight">
        Cadre professionnel
      </h1>
      <div class="w-10" />
    </header>

    <main class="w-full max-w-screen-md mx-auto relative">
      <div class="pt-6 px-margin-mobile flex justify-center">
        <span
          class="font-label-mono text-label-mono bg-surface-container-low text-on-surface-variant px-3 py-1 rounded border border-surface-container tracking-wider uppercase"
        >
          BROUILLON
        </span>
      </div>

      <section class="mt-8 px-margin-mobile relative">
        <div class="relative w-full h-[320px] rounded-xl overflow-hidden border border-surface-container">
          <div class="absolute inset-0 bg-black/20 z-10" />
          <img
            alt="Professional hairstylist in studio"
            class="absolute inset-0 w-full h-full object-cover"
            :src="heroSrc"
          />
          <div class="absolute inset-0 z-20 flex items-end p-lg">
            <h2 class="font-headline-md text-headline-md text-white drop-shadow-md">
              Rendre votre pratique prévisible.
            </h2>
          </div>
        </div>
      </section>

      <section class="mt-xl px-margin-mobile">
        <h3 class="font-display-lg-mobile text-display-lg-mobile text-primary mb-md">
          Comment vous travaillez, une fois pour toutes
        </h3>
        <p class="font-body-lg text-body-lg text-on-surface-variant leading-relaxed">
          Ce n’est pas ce que vous vendez. C’est le cadre dans lequel vous acceptez d’exercer :
          accueil, communication, paiement, sécurité et photos. Vous l’activez ensuite pour
          l’utiliser dans vos capacités.
        </p>
      </section>

      <section class="mt-2xl px-margin-mobile pb-3xl">
        <h4
          class="font-headline-sm text-headline-sm text-primary mb-lg border-b border-surface-container pb-sm"
        >
          Ce que vous allez définir
        </h4>
        <div class="grid grid-cols-1 gap-md">
          <div
            v-for="pillar in pillars"
            :key="pillar.title"
            class="bg-white rounded-xl border border-surface-container p-lg flex items-start gap-md hover:border-outline-variant transition-colors group cursor-default"
          >
            <div
              class="w-12 h-12 rounded-lg bg-surface-container-low flex items-center justify-center shrink-0 group-hover:bg-secondary-container transition-colors"
            >
              <span
                class="material-symbols-outlined text-on-surface-variant group-hover:text-secondary"
                style="font-variation-settings: 'FILL' 1"
              >
                {{ pillar.icon }}
              </span>
            </div>
            <div>
              <h5 class="font-headline-sm text-headline-sm text-primary mb-xs">
                {{ pillar.title }}
              </h5>
              <p class="font-body-md text-body-md text-on-surface-variant">
                {{ pillar.body }}
              </p>
            </div>
          </div>
        </div>

        <div class="mt-lg p-md bg-surface-container-low rounded-lg border border-surface-container">
          <p class="font-body-sm text-body-sm text-on-surface-variant italic text-center">
            {{ platformPrinciples.body }}
          </p>
        </div>
      </section>
    </main>

    <div
      class="fixed bottom-0 left-0 w-full bg-surface border-t border-surface-container px-margin-mobile py-md z-50 shadow-[0px_-4px_12px_rgba(27,28,28,0.04)]"
    >
      <div class="max-w-screen-md mx-auto">
        <button
          type="button"
          class="w-full h-[48px] bg-primary-container text-on-primary rounded-lg font-button-text text-button-text flex items-center justify-center hover:bg-primary transition-colors active:scale-95 duration-150 shadow-sm"
          @click="start"
        >
          Commencer la configuration
        </button>
      </div>
    </div>
  </div>
</template>
