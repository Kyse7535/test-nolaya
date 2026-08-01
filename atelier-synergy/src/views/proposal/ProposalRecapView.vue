<script setup>
import { computed, ref, watch } from 'vue'
import { useRouter } from 'vue-router'
import { storeToRefs } from 'pinia'
import ProposalStepper from '../../components/proposal/ProposalStepper.vue'
import { feasibilityLabel, proposalStatusBadge } from '../../domain/proposal/labels'
import { slotSummary } from '../../domain/proposal/model'
import { useProposalStore } from '../../stores/proposal'

const router = useRouter()
const proposalStore = useProposalStore()
const { currentProposal, canPublish } = storeToRefs(proposalStore)

const confirmed = ref(false)

const proposal = computed(() => currentProposal.value)
const offer = computed(() => proposal.value?.offer ?? null)
const brief = computed(() => proposal.value?.frozenBrief ?? null)
const decisionLabel = computed(() => feasibilityLabel(proposal.value?.feasibility))
const badge = computed(() => proposalStatusBadge(proposal.value?.status))
const slotLine = computed(() => slotSummary(offer.value?.slot))
const taskHighlights = computed(() => {
  const tasks = offer.value?.tasks ?? []
  return tasks
    .filter((t) => t.id === 'task_supplies' || t.id === 'task_client')
    .map((t) => t.detail)
})

watch(
  () => currentProposal.value,
  (p) => {
    if (!p) {
      router.replace({ name: 'proposal-accueil' })
      return
    }
    if (!p.feasibility) {
      router.replace({ name: 'proposal-faisabilite' })
    }
  },
  { immediate: true },
)

function goBack() {
  router.push({ name: 'proposal-offre' })
}

function goNav(name) {
  router.push({ name })
}

function publish() {
  if (!confirmed.value || !canPublish.value) return
  const firm = proposalStore.publishFirm()
  if (!firm) return
  router.push({ name: 'proposal-succes' })
}
</script>

<template>
  <div
    v-if="proposal && offer"
    class="bg-background text-on-background antialiased font-body-md min-h-screen flex flex-col pb-72"
  >
    <header class="w-full top-0 sticky z-40 bg-surface border-b border-outline-variant flex flex-col">
      <div class="flex items-center justify-between px-margin-mobile h-16">
        <button
          type="button"
          aria-label="Retour"
          class="text-primary hover:opacity-80 transition-opacity active:scale-95 flex items-center justify-center p-2 -ml-2"
          @click="goBack"
        >
          <span class="material-symbols-outlined">arrow_back</span>
        </button>
        <h1 class="font-headline-md text-headline-md tracking-tight text-primary">
          Nolaya
        </h1>
        <div class="w-10" />
      </div>
      <div class="px-margin-mobile pb-3">
        <ProposalStepper :step="4" variant="bars" />
      </div>
    </header>

    <main
      class="flex-1 px-margin-mobile py-stack-lg flex flex-col gap-stack-lg max-w-lg mx-auto w-full"
    >
      <section class="flex flex-col gap-stack-sm">
        <div class="flex items-center justify-between gap-2">
          <h2 class="font-headline-lg-mobile text-headline-lg-mobile text-primary">
            Vérifiez avant publication
          </h2>
          <span
            class="font-label-status text-label-status text-secondary bg-surface-container-low px-2 py-1 rounded border border-surface-container shrink-0"
          >
            {{ badge }}
          </span>
        </div>
        <p class="font-body-md text-body-md text-on-surface-variant">
          En publiant, vous créez une offre ferme datée et réservez temporairement le créneau
          (soft-hold).
        </p>
      </section>

      <section class="flex flex-col gap-stack-md">
        <div
          class="bg-surface-container-lowest border border-surface-container rounded p-4 flex flex-col gap-3"
        >
          <div class="flex items-center justify-between border-b border-surface-container pb-3">
            <div>
              <span class="block font-label-mono text-label-mono text-primary/60 mb-1 uppercase">
                Décision
              </span>
              <span class="font-body-md text-body-md text-primary font-semibold">
                {{ decisionLabel }}
              </span>
            </div>
            <button
              type="button"
              class="text-on-surface-variant hover:text-primary transition-colors text-sm font-medium underline underline-offset-2"
              @click="goNav('proposal-faisabilite')"
            >
              modifier
            </button>
          </div>
          <div>
            <span class="block font-label-mono text-label-mono text-primary/60 mb-1 uppercase">
              Prestation
            </span>
            <span class="font-body-md text-body-md text-primary">
              {{ brief?.prestationLabel }}
            </span>
          </div>
        </div>

        <div class="grid grid-cols-2 gap-stack-sm">
          <div
            class="bg-surface-container-lowest border border-surface-container rounded p-4 flex flex-col justify-center"
          >
            <div class="flex items-start justify-between w-full mb-1">
              <span class="font-label-mono text-label-mono text-primary/60 uppercase">Prix</span>
              <button
                type="button"
                class="text-on-surface-variant hover:text-primary"
                @click="goNav('proposal-offre')"
              >
                <span class="material-symbols-outlined text-[16px]">edit</span>
              </button>
            </div>
            <span class="font-label-mono text-label-mono text-primary text-lg">
              {{ offer.priceTotal }} €
            </span>
          </div>
          <div
            class="bg-surface-container-lowest border border-surface-container rounded p-4 flex flex-col justify-center"
          >
            <div class="flex items-start justify-between w-full mb-1">
              <span class="font-label-mono text-label-mono text-primary/60 uppercase">Durée</span>
              <button
                type="button"
                class="text-on-surface-variant hover:text-primary"
                @click="goNav('proposal-offre')"
              >
                <span class="material-symbols-outlined text-[16px]">edit</span>
              </button>
            </div>
            <span class="font-label-mono text-label-mono text-primary text-lg">
              {{ offer.durationLabel }}
            </span>
          </div>
        </div>

        <div
          class="bg-surface-container-lowest border border-surface-container rounded p-4 flex flex-col gap-3"
        >
          <div class="flex items-center justify-between border-b border-surface-container pb-3">
            <div>
              <span class="block font-label-mono text-label-mono text-primary/60 mb-1 uppercase">
                Créneau
              </span>
              <span class="font-label-mono text-label-mono text-primary text-sm">
                {{ slotLine }}
              </span>
            </div>
            <button
              type="button"
              class="text-on-surface-variant hover:text-primary transition-colors text-sm font-medium underline underline-offset-2"
              @click="goNav('proposal-offre')"
            >
              modifier
            </button>
          </div>
          <div class="flex items-center justify-between border-b border-surface-container pb-3 pt-1">
            <div>
              <span class="block font-label-mono text-label-mono text-primary/60 mb-1 uppercase">
                Lieu
              </span>
              <span class="font-body-md text-body-md text-primary flex items-center gap-2">
                <span class="material-symbols-outlined text-[18px] text-on-surface-variant">home</span>
                {{ offer.placeLabel }}
              </span>
            </div>
          </div>
          <div class="flex flex-col pt-1">
            <span class="block font-label-mono text-label-mono text-primary/60 mb-2 uppercase">
              Tâches
            </span>
            <ul class="flex flex-col gap-2">
              <li
                v-for="(line, i) in taskHighlights"
                :key="i"
                class="flex items-start gap-2"
              >
                <span class="material-symbols-outlined text-[16px] text-secondary mt-0.5">
                  check_circle
                </span>
                <span class="font-body-sm text-body-sm text-primary">{{ line }}</span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      <div
        class="bg-surface-container flex items-start gap-3 p-4 rounded border border-outline-variant/30"
      >
        <span class="material-symbols-outlined text-secondary shrink-0 mt-0.5">info</span>
        <p class="font-body-sm text-body-sm text-on-surface-variant leading-relaxed">
          <strong class="text-primary font-semibold">Soft-hold :</strong>
          le créneau sera immobilisé temporairement jusqu’à acceptation cliente.
        </p>
      </div>
    </main>

    <div
      class="fixed bottom-[72px] left-0 right-0 w-full px-margin-mobile pb-4 pt-8 z-40 flex flex-col gap-3 max-w-lg mx-auto pointer-events-none bg-gradient-to-t from-background via-background to-transparent"
    >
      <div class="flex items-start gap-3 py-1 pointer-events-auto">
        <input
          id="confirm-offer"
          v-model="confirmed"
          class="w-5 h-5 shrink-0 border border-outline-variant rounded text-primary focus:ring-primary bg-surface-container-lowest mt-0.5 cursor-pointer"
          type="checkbox"
        />
        <label
          class="font-body-sm text-body-sm text-primary cursor-pointer select-none"
          for="confirm-offer"
        >
          Je confirme que cette offre correspond à ce que je peux réaliser
        </label>
      </div>
      <button
        type="button"
        class="w-full font-body-md font-medium py-3 rounded transition-all duration-200 pointer-events-auto"
        :class="
          confirmed && canPublish
            ? 'bg-primary text-on-primary active:scale-[0.98]'
            : 'bg-primary/40 text-on-primary opacity-50 cursor-not-allowed'
        "
        :disabled="!confirmed || !canPublish"
        @click="publish"
      >
        Publier l’offre ferme
      </button>
      <button
        type="button"
        class="w-full bg-transparent text-primary border border-primary font-body-md font-medium py-3 rounded hover:bg-surface-container-lowest transition-colors active:scale-[0.98] pointer-events-auto"
        @click="goBack"
      >
        Revenir
      </button>
    </div>

    <nav
      class="fixed bottom-0 left-0 w-full z-50 flex justify-around items-center px-2 py-3 bg-surface shadow-[0_-4px_24px_rgba(0,0,0,0.02)] md:hidden"
    >
      <button
        type="button"
        class="flex flex-col items-center justify-center text-on-primary-container opacity-60 hover:text-secondary w-16"
        @click="goNav('proposal-synthese')"
      >
        <span class="material-symbols-outlined mb-1">analytics</span>
        <span class="font-label-mono text-label-mono truncate w-full text-center">Synthèse</span>
      </button>
      <button
        type="button"
        class="flex flex-col items-center justify-center text-on-primary-container opacity-60 hover:text-secondary w-16"
        @click="goNav('proposal-faisabilite')"
      >
        <span class="material-symbols-outlined mb-1">check_circle</span>
        <span class="font-label-mono text-label-mono truncate w-full text-center">Faisabilité</span>
      </button>
      <button
        type="button"
        class="flex flex-col items-center justify-center text-on-primary-container opacity-60 hover:text-secondary w-16"
        @click="goNav('proposal-offre')"
      >
        <span class="material-symbols-outlined mb-1">local_offer</span>
        <span class="font-label-mono text-label-mono truncate w-full text-center">Offre</span>
      </button>
      <button
        type="button"
        class="flex flex-col items-center justify-center text-secondary w-16"
      >
        <span class="material-symbols-outlined mb-1">send</span>
        <span class="font-label-mono text-label-mono truncate w-full text-center">Publier</span>
      </button>
    </nav>
  </div>
</template>
