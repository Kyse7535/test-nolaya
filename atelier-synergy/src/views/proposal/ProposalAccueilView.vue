<script setup>
import { onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { ProposalStatus } from '../../domain/proposal/model'
import { useProposalStore } from '../../stores/proposal'

const router = useRouter()
const proposalStore = useProposalStore()

const heroSrc =
  'https://lh3.googleusercontent.com/aida-public/AB6AXuARMdHkZCioqVH32cWoaacEcRzO9E3CYDqO2Mdhw4e-JDsDN8XHdAYs6JLjwcMyjP2XPrLfRVu4mp0HUiimGZ8Rpf5GnFkOkBycmT6tIjyu-xdOOkMC9uZWifl6WrCzrZ8InjKkDCX2RG8rANGoftgDjaNrAqJyqVEUYKUHBNBp6BmhioNCIppef4F97tGx6LRf2ostCkOaK7fwmSwyN94xFx_ZiKGvd7_ADwuFyY1LiGmndpJve1rU'

const pillars = [
  {
    icon: 'summarize',
    title: 'Synthèse',
    body: 'Relire le besoin figé : prestation, budget, contraintes.',
  },
  {
    icon: 'verified',
    title: 'Faisabilité',
    body: 'Confirmer que c’est réalisable exactement (variante light optionnelle).',
  },
  {
    icon: 'edit_document',
    title: 'Offre',
    body: 'Fixer prix, durée, créneau, lieu et tâches.',
  },
  {
    icon: 'publish',
    title: 'Publication',
    body: 'Publier l’offre ferme et créer le soft-hold.',
  },
]

onMounted(() => {
  proposalStore.ensureDemoPrerequisites()
  const proposal = proposalStore.currentProposal
  if (proposal?.status === ProposalStatus.FIRM) {
    router.replace({ name: 'proposal-succes' })
  }
})

function goBack() {
  router.push({ name: 'home' })
}

function openDossier() {
  const proposal = proposalStore.openFromShortlist()
  if (!proposal) return
  if (proposal.status === ProposalStatus.FIRM) {
    router.push({ name: 'proposal-succes' })
    return
  }
  router.push({ name: 'proposal-synthese' })
}
</script>

<template>
  <div class="bg-background text-on-background antialiased min-h-screen flex flex-col pt-16 pb-24">
    <header
      class="fixed top-0 w-full z-50 bg-surface border-b border-surface-container flex items-center px-margin-mobile h-16"
    >
      <button
        type="button"
        aria-label="Retour"
        class="flex items-center justify-center p-2 -ml-2 mr-2 text-on-surface-variant hover:opacity-80 transition-opacity active:scale-95"
        @click="goBack"
      >
        <span class="material-symbols-outlined">arrow_back</span>
      </button>
      <h1 class="font-headline-md text-headline-md font-bold tracking-tight text-primary truncate flex-1">
        Proposition ferme
      </h1>
      <div class="w-10" />
    </header>

    <main class="flex-1 flex flex-col w-full max-w-4xl mx-auto">
      <section class="px-margin-mobile pt-stack-lg pb-stack-md flex flex-col gap-stack-md">
        <div
          class="inline-flex self-start px-2 py-1 bg-secondary-fixed rounded-sm border border-secondary-container items-center gap-1"
        >
          <span
            class="material-symbols-outlined text-[14px] text-secondary"
            style="font-variation-settings: 'FILL' 1"
          >schedule</span>
          <span class="font-label-status text-label-status text-secondary uppercase tracking-wider">
            EN ATTENTE
          </span>
        </div>
        <div class="flex flex-col gap-stack-sm">
          <h2 class="font-headline-lg-mobile text-headline-lg-mobile text-on-surface">
            Transformer votre acceptation en offre ferme
          </h2>
          <p class="font-body-md text-body-md text-on-surface-variant max-w-2xl">
            La demande cliente est figée. Vous confirmez que c’est faisable, vous fixez prix, durée,
            créneau, lieu et tâches, puis vous publiez une offre datée avec créneau réservé
            temporairement.
          </p>
        </div>
      </section>

      <section class="w-full relative h-[320px] min-h-[260px] bg-surface-container mb-stack-lg">
        <img
          class="w-full h-full object-cover"
          alt="Coiffeuse consultant un dossier sur son téléphone"
          :src="heroSrc"
        />
        <div
          class="absolute inset-0 bg-gradient-to-t from-primary/80 via-primary/30 to-transparent flex items-end p-margin-mobile"
        >
          <h3 class="font-headline-md text-headline-md text-on-primary max-w-lg">
            Une offre claire, un créneau protégé.
          </h3>
        </div>
      </section>

      <section class="px-margin-mobile mb-stack-lg flex flex-col gap-stack-md">
        <h3
          class="font-body-lg text-body-lg font-semibold text-on-surface mb-stack-sm border-b border-surface-container pb-2"
        >
          Ce que vous allez faire
        </h3>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-stack-md">
          <div
            v-for="pillar in pillars"
            :key="pillar.title"
            class="bg-surface-container-lowest border border-surface-container rounded p-4 flex gap-4 items-start"
          >
            <div
              class="w-10 h-10 rounded-full bg-surface-container-low flex items-center justify-center shrink-0 border border-surface-container"
            >
              <span class="material-symbols-outlined text-primary">{{ pillar.icon }}</span>
            </div>
            <div class="flex flex-col gap-1">
              <h4 class="font-body-md text-body-md font-semibold text-on-surface">
                {{ pillar.title }}
              </h4>
              <p class="font-body-sm text-body-sm text-on-surface-variant">
                {{ pillar.body }}
              </p>
            </div>
          </div>
        </div>
        <div
          class="mt-stack-sm p-4 bg-surface-container-low border border-surface-container rounded-sm flex items-start gap-3"
        >
          <span class="material-symbols-outlined text-outline text-[20px] shrink-0 mt-0.5">info</span>
          <p class="font-body-sm text-body-sm text-on-surface-variant italic">
            Pas de demande de précision ni de refus dans cette démo. Le paiement se fera plus tard,
            côté cliente.
          </p>
        </div>
      </section>
    </main>

    <div
      class="fixed bottom-0 left-0 w-full bg-surface/95 backdrop-blur-md border-t border-surface-container px-margin-mobile py-4 z-40 flex justify-center"
    >
      <button
        type="button"
        class="w-full max-w-md bg-primary-container text-on-primary font-body-md text-body-md font-semibold h-14 rounded flex items-center justify-center gap-2 hover:opacity-90 active:scale-[0.98] transition-all"
        @click="openDossier"
      >
        Ouvrir le dossier
        <span class="material-symbols-outlined text-[20px]">arrow_forward</span>
      </button>
    </div>
  </div>
</template>
