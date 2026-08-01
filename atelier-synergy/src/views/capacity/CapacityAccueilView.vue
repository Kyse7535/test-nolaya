<script setup>
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import { statusLabel } from '../../domain/capacity/labels'
import { CapacityStatus } from '../../domain/capacity/model'
import { useCapacityStore } from '../../stores/capacity'
import { useFrameworkStore } from '../../stores/framework'

const router = useRouter()
const capacityStore = useCapacityStore()
const frameworkStore = useFrameworkStore()

const heroSrc =
  'https://lh3.googleusercontent.com/aida-public/AB6AXuD9AgKRyFI5Fmr377hfLZhfkyOmkR2e20V1s97_XcpOxOQW83QZyzXGsQI7hgpBCBp90PPI_GbVDrqUTZavzCjiYfC4HJPGPoV3PEN173qwhSF5iEjbJ_52z3AGobtsaU6bga4o4XfNbF5b2naUIDq0X1xmqN_1w32hmLywWYZEl--jFlFnYZWvd8yvXsDq-fcDAa__wGSjl7oXNkZEGwFE9QyDeOFKW4J79DZQudowJtooRi6fEArEeQ'

const pillars = [
  {
    icon: 'content_cut',
    title: 'Prestation',
    body: 'Le service et la variante que vous proposez.',
  },
  {
    icon: 'photo_library',
    title: 'Galerie',
    body: 'Des photos de cette prestation, avec un niveau de preuve clair.',
  },
  {
    icon: 'group',
    title: 'Service',
    body: 'Complet ou assisté, et qui réalise chaque tâche.',
  },
  {
    icon: 'sell',
    title: 'Prix & durée',
    body: 'Tarif de base, durée, et 0 à 2 suppléments.',
  },
  {
    icon: 'location_on',
    title: 'Lieu & dispos',
    body: 'Où, quand, et combien de demandes vous souhaitez.',
  },
]

const badgeLabel = computed(() => {
  const status = capacityStore.currentCapacity?.status ?? CapacityStatus.DRAFT
  return statusLabel(status)
})

function goBack() {
  router.push({ name: 'home' })
}

function start() {
  capacityStore.startDraft()
  router.push({ name: 'capacity-prestation' })
}

function goListe() {
  router.push({ name: 'capacity-liste' })
}
</script>

<template>
  <div class="bg-background text-on-background font-body-md antialiased pb-24 min-h-screen">
    <header class="bg-surface sticky top-0 w-full border-b border-outline-variant z-40">
      <div class="flex items-center px-container-margin h-16 w-full max-w-screen-xl mx-auto">
        <button
          type="button"
          class="mr-4 text-on-surface-variant hover:bg-surface-container transition-colors active:scale-95 rounded-full p-2 -ml-2 flex items-center justify-center"
          @click="goBack"
        >
          <span class="material-symbols-outlined">arrow_back</span>
        </button>
        <h1 class="font-headline-sm text-headline-sm font-bold text-primary truncate">
          Capacité professionnelle
        </h1>
      </div>
    </header>

    <main class="w-full max-w-md mx-auto">
      <div class="px-container-margin pt-md">
        <span
          class="inline-block bg-surface-variant text-on-surface-variant font-label-technical text-label-technical px-2 py-1 rounded-sm uppercase tracking-widest border border-outline-variant"
        >
          {{ badgeLabel }}
        </span>
      </div>

      <div class="px-container-margin pt-lg">
        <div
          v-if="frameworkStore.isActive"
          class="bg-surface-container-low border border-outline-variant rounded p-md"
        >
          <div class="flex items-start gap-sm">
            <span class="material-symbols-outlined text-primary mt-xs text-[20px]">info</span>
            <div>
              <h3 class="font-body-md text-body-md font-semibold text-primary">
                Cadre professionnel actif — hérité
              </h3>
              <p class="font-body-md text-body-md text-on-surface-variant mt-xs">
                Vos règles générales d’exercice sont déjà en place. Vous ne les modifiez pas ici.
              </p>
            </div>
          </div>
        </div>
        <div
          v-else
          class="bg-surface-container-low border border-outline-variant rounded p-md"
        >
          <div class="flex items-start gap-sm">
            <span class="material-symbols-outlined text-secondary mt-xs text-[20px]">info</span>
            <div>
              <h3 class="font-body-md text-body-md font-semibold text-primary">
                Cadre professionnel mock — hérité
              </h3>
              <p class="font-body-md text-body-md text-on-surface-variant mt-xs">
                Pour cette démo, le cadre est considéré comme acquis. Vous pouvez activer le bloc
                Cadre pro séparément.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div class="px-container-margin pt-lg">
        <h2 class="font-headline-md text-headline-md text-primary mb-sm">
          Rendez une prestation disponible
        </h2>
        <p class="font-body-lg text-body-lg text-on-surface-variant">
          Vous allez choisir quoi vous vendez, montrer comment ça se présente, dire qui fait quoi,
          fixer prix et durée, puis indiquer où et quand. À la fin, vous activez explicitement.
        </p>
      </div>

      <div class="mt-lg w-full relative">
        <img
          :src="heroSrc"
          alt="Coiffeuse travaillant sur des cheveux afro texturés"
          class="w-full h-64 object-cover"
        />
        <div
          class="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-container-margin"
        >
          <p class="font-headline-sm text-headline-sm text-white">
            Une prestation claire, prête à recevoir des demandes.
          </p>
        </div>
      </div>

      <div class="px-container-margin pt-lg">
        <h3 class="font-headline-sm text-headline-sm text-primary mb-md">Ce que vous allez définir</h3>
        <div class="grid grid-cols-1 gap-md">
          <div
            v-for="pillar in pillars"
            :key="pillar.title"
            class="bg-surface-container-lowest border border-outline-variant rounded-lg p-md shadow-sm"
          >
            <div class="flex items-start gap-md">
              <div class="bg-surface-container p-2 rounded-full flex-shrink-0">
                <span class="material-symbols-outlined text-primary">{{ pillar.icon }}</span>
              </div>
              <div>
                <h4 class="font-headline-sm text-headline-sm text-primary text-[16px] mb-xs">
                  {{ pillar.title }}
                </h4>
                <p class="font-body-md text-body-md text-on-surface-variant">
                  {{ pillar.body }}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="px-container-margin pt-lg pb-xl text-center">
        <p class="font-label-technical text-label-technical text-outline max-w-[280px] mx-auto">
          Pas de contrôle opérateur dans cette démo. Activation instantanée après confirmation.
        </p>
        <button
          v-if="capacityStore.openCapacities.length || capacityStore.draftCapacities.length"
          type="button"
          class="mt-md font-label-technical text-label-technical text-secondary underline underline-offset-2"
          @click="goListe"
        >
          Voir mes capacités
        </button>
      </div>
    </main>

    <div
      class="fixed bottom-0 left-0 w-full bg-surface/95 backdrop-blur-sm border-t border-outline-variant p-container-margin z-50 pb-[calc(20px+env(safe-area-inset-bottom))] shadow-[0_-4px_20px_rgba(27,28,28,0.04)]"
    >
      <button
        type="button"
        class="w-full bg-primary-container text-on-primary font-body-md text-body-md font-semibold py-3 rounded active:scale-[0.98] transition-transform flex items-center justify-center gap-2"
        @click="start"
      >
        Ouvrir une capacité
        <span class="material-symbols-outlined text-[18px]">arrow_forward</span>
      </button>
    </div>
  </div>
</template>
