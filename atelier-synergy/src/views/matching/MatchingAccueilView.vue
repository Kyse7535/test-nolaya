<script setup>
import { onMounted } from 'vue'
import { useRouter } from 'vue-router'
import MatchingDemoRoleBar from '../../components/matching/MatchingDemoRoleBar.vue'
import { CampaignStatus } from '../../domain/matching/model'
import { useMatchingStore } from '../../stores/matching'

const router = useRouter()
const matchingStore = useMatchingStore()

const heroSrc =
  'https://lh3.googleusercontent.com/aida-public/AB6AXuAqwHxHipjdQ-JbRfO2dBsTHq2RBAfmfNDPKbzd6GOYbudCnFtCqy9wbutuR1ZJ7vTEzHvdAZD-dC57PVzxswYPBpgNBy2U4ZO24vGK5_YKxvA7g8j_fRMJeklXq9ljJpFKP7GnZaS5a6dkSgTIG2pFTgjuO8K5aPv_FdUmf8RQ6Hz6kDFlyfefLgyT5-glSc35CzFTFLpsSivT1pQjT70A_S9tSHd72V_7uCU_gTeDwfd4RB9WNw_i'

const pillars = [
  {
    icon: 'campaign',
    title: 'Campagne',
    body: 'Votre demande figée ouvre une campagne avec un seuil de réponses.',
  },
  {
    icon: 'groups',
    title: 'Vivier',
    body: 'Des capacités éligibles sont préremplies automatiquement.',
  },
  {
    icon: 'mail',
    title: 'Vague 1',
    body: '2 à 3 coiffeuses reçoivent une invitation.',
  },
  {
    icon: 'fact_check',
    title: 'Shortlist',
    body: 'Les acceptations exactes forment la liste pour l’étape suivante.',
  },
]

onMounted(() => {
  matchingStore.ensureDemoPrerequisites()
  const campaign = matchingStore.currentCampaign
  if (campaign?.status === CampaignStatus.SHORTLIST_READY) {
    router.replace({ name: 'matching-shortlist' })
    return
  }
  if (campaign?.status === CampaignStatus.OPEN) {
    router.replace({ name: 'matching-lance' })
  }
})

function goBack() {
  router.push({ name: 'home' })
}

function launch() {
  matchingStore.setDemoRole('client')
  const campaign = matchingStore.launchCampaign()
  if (!campaign) return
  router.push({ name: 'matching-lance' })
}
</script>

<template>
  <div class="bg-background text-on-background font-body-md min-h-screen flex flex-col pb-2xl">
    <header
      class="w-full sticky top-0 z-50 border-b border-outline-variant bg-background flex items-center justify-between px-margin-mobile h-16 max-w-7xl mx-auto"
    >
      <button
        type="button"
        aria-label="Retour"
        class="text-primary hover:opacity-80 transition-opacity active:scale-95 flex items-center justify-center p-2 -ml-2"
        @click="goBack"
      >
        <span class="material-symbols-outlined text-[24px]">arrow_back</span>
      </button>
      <h1 class="font-headline-lg-mobile text-headline-lg-mobile uppercase font-bold tracking-tight text-primary">
        Appariement
      </h1>
      <div class="w-10" />
    </header>

    <main class="flex-1 max-w-7xl mx-auto w-full">
      <section class="px-margin-mobile pt-lg pb-md">
        <MatchingDemoRoleBar class="mb-md" />
        <div
          class="inline-block bg-surface-container-high border border-outline-variant rounded px-2 py-1 mb-md"
        >
          <span class="font-label-mono text-label-mono text-on-surface-variant uppercase">
            DEMANDE QUALIFIÉE
          </span>
        </div>
        <h2 class="font-headline-md text-headline-md text-primary mb-sm">
          Trouver des coiffeuses disponibles
        </h2>
        <p class="font-body-md text-body-md text-on-surface-variant max-w-prose">
          Votre demande qualifiée va être proposée à des capacités ouvertes. Les coiffeuses
          répondent par une acceptation provisoire. Quand assez de réponses exactes arrivent, une
          shortlist est prête pour les offres fermes.
        </p>
      </section>

      <section class="w-full relative h-[300px] mb-lg bg-surface-container overflow-hidden">
        <img
          alt="Professionnelle coiffure"
          class="w-full h-full object-cover"
          :src="heroSrc"
        />
        <div class="absolute inset-0 bg-primary/30 flex items-center justify-center">
          <p
            class="font-headline-md text-headline-md text-on-primary text-center px-margin-mobile tracking-wide"
          >
            Inviter. Répondre. Shortlister.
          </p>
        </div>
      </section>

      <section class="px-margin-mobile pb-xl">
        <h3
          class="font-label-sm text-label-sm uppercase text-on-surface-variant mb-md tracking-widest border-b border-outline-variant pb-2"
        >
          Ce qui va se passer
        </h3>
        <div class="space-y-md">
          <div
            v-for="pillar in pillars"
            :key="pillar.title"
            class="flex gap-md p-md bg-surface-container-lowest border border-outline-variant rounded"
          >
            <div
              class="flex-shrink-0 flex items-center justify-center w-10 h-10 bg-surface-container rounded-full text-primary"
            >
              <span class="material-symbols-outlined">{{ pillar.icon }}</span>
            </div>
            <div>
              <h4 class="font-label-sm text-label-sm uppercase text-primary mb-xs">
                {{ pillar.title }}
              </h4>
              <p class="font-body-sm text-body-sm text-on-surface-variant">
                {{ pillar.body }}
              </p>
            </div>
          </div>
        </div>
        <p class="font-body-sm text-body-sm text-outline mt-lg text-center px-4">
          Pas d’élargissement ni de décision opérateur dans cette démo.
        </p>
      </section>
    </main>

    <div
      class="fixed bottom-0 w-full z-50 bg-background/90 backdrop-blur-sm border-t border-outline-variant p-4"
    >
      <button
        type="button"
        class="w-full max-w-7xl mx-auto bg-primary text-on-primary hover:opacity-90 active:scale-[0.98] transition-all font-label-sm text-label-sm uppercase py-4 px-6 rounded flex items-center justify-center gap-2 border border-primary"
        @click="launch"
      >
        Lancer le matching
        <span class="material-symbols-outlined text-secondary-container">auto_awesome</span>
      </button>
    </div>
  </div>
</template>
