<script setup>
import { computed, onMounted } from 'vue'
import { storeToRefs } from 'pinia'
import { useRouter } from 'vue-router'
import EngagementStepper from '../../components/engagement/EngagementStepper.vue'
import { canContinueToPayment } from '../../domain/engagement/model'
import { offerRefLabel } from '../../domain/engagement/labels'
import { useEngagementStore } from '../../stores/engagement'
import { useProposalStore } from '../../stores/proposal'

const router = useRouter()
const engagementStore = useEngagementStore()
const proposalStore = useProposalStore()
const { currentEngagement, policies, policyIds } = storeToRefs(engagementStore)
const { currentProposal } = storeToRefs(proposalStore)

onMounted(() => {
  if (!currentEngagement.value) {
    engagementStore.openFromFirmProposal()
  }
})

const engagement = computed(() => currentEngagement.value)
const offer = computed(() => currentProposal.value?.offer ?? null)

const canContinue = computed(() =>
  canContinueToPayment(engagement.value?.consents, policyIds.value),
)

const offerRefLine = computed(() => {
  const ref = offerRefLabel(
    engagement.value?.offerRef || currentProposal.value?.id,
    engagement.value?.offerVersion ?? 1,
  )
  const version = engagement.value?.offerVersion ?? 1
  return `Offre ${ref} · version ${version}`
})

const offerConsentDetail = computed(() => {
  const service = engagement.value?.serviceLabel || 'Prestation'
  const price = engagement.value?.priceTotal ?? offer.value?.priceTotal
  const date =
    engagement.value?.dateLabel ||
    offer.value?.slot?.dateLabel ||
    'créneau convenu'
  const pricePart = price != null ? `prix ${price} €` : 'prix convenu'
  const dateShort = String(date).replace(/^Samedi\s+/i, '').replace(/^Dimanche\s+/i, '')
  return `${service}, ${pricePart}, créneau du ${dateShort}`
})

function policyAcceptLabel(policy) {
  if (policy.kind === 'cancellation') return 'J’accepte la politique d’annulation'
  if (policy.kind === 'lateness') return 'J’accepte la politique de retard'
  return `J’accepte la ${policy.title.toLowerCase()}`
}

function goBack() {
  router.push({ name: 'engagement-recapitulatif' })
}

function toggleOffer(event) {
  engagementStore.setConsentOffer(event.target.checked)
}

function togglePolicy(policyId, event) {
  engagementStore.setConsentPolicy(policyId, event.target.checked)
}

function goNext() {
  const next = engagementStore.acceptConsents()
  if (!next) return
  router.push({ name: 'engagement-paiement' })
}
</script>

<template>
  <div class="bg-background text-on-background antialiased min-h-screen flex flex-col pb-40">
    <header
      class="bg-surface w-full sticky top-0 z-50 border-b border-surface-container"
    >
      <div class="flex items-center justify-between px-container-margin h-16 w-full">
        <button
          type="button"
          aria-label="Retour"
          class="text-primary hover:bg-surface-container-low transition-colors p-2 -ml-2 rounded-full active:opacity-70"
          @click="goBack"
        >
          <span class="material-symbols-outlined">arrow_back</span>
        </button>
        <h1 class="font-headline-sm text-headline-sm font-bold text-primary">Consentements</h1>
        <div class="w-10" />
      </div>
    </header>

    <main class="flex-1 overflow-y-auto">
      <div class="px-container-margin py-stack-lg">
        <div
          class="inline-block px-3 py-1 mb-stack-md bg-secondary-container rounded text-on-secondary-container"
        >
          <span class="font-label-technical text-label-technical">EN ATTENTE</span>
        </div>

        <div class="mb-section-gap">
          <EngagementStepper :step="2" />
        </div>

        <div class="mb-stack-lg">
          <h2 class="font-headline-md text-headline-md mb-stack-sm text-primary">Consentements</h2>
          <p class="font-body-lg text-body-lg text-on-surface-variant">
            Vous acceptez la même version de l’offre et des politiques applicables.
          </p>
        </div>

        <div
          class="bg-surface-container-low border border-surface-variant rounded-lg p-stack-md mb-section-gap flex items-center gap-3"
        >
          <span class="material-symbols-outlined text-outline">description</span>
          <span class="font-label-technical text-label-technical text-primary-container">
            {{ offerRefLine }}
          </span>
        </div>

        <div class="space-y-stack-md mb-section-gap">
          <label
            class="flex items-start gap-gutter p-stack-md border border-surface-container rounded-xl cursor-pointer hover:bg-surface-container-low transition-colors"
          >
            <div class="pt-1">
              <input
                type="checkbox"
                class="engagement-checkbox"
                :checked="engagement?.consents?.offerAccepted"
                @change="toggleOffer"
              />
            </div>
            <div class="flex-1">
              <p class="font-body-lg text-body-lg text-primary font-medium mb-1">
                J’accepte l’offre ferme telle que présentée
              </p>
              <p class="font-body-sm text-body-sm text-on-surface-variant">
                {{ offerConsentDetail }}
              </p>
            </div>
          </label>

          <label
            v-for="policy in policies"
            :key="policy.id"
            class="flex items-start gap-gutter p-stack-md border border-surface-container rounded-xl cursor-pointer hover:bg-surface-container-low transition-colors"
          >
            <div class="pt-1">
              <input
                type="checkbox"
                class="engagement-checkbox"
                :checked="engagement?.consents?.policiesAccepted?.[policy.id]"
                @change="togglePolicy(policy.id, $event)"
              />
            </div>
            <div class="flex-1">
              <div class="flex items-center gap-2 mb-1 flex-wrap">
                <p class="font-body-lg text-body-lg text-primary font-medium">
                  {{ policyAcceptLabel(policy) }}
                </p>
                <span
                  class="bg-surface-container px-2 py-0.5 rounded font-label-micro text-label-micro text-on-surface-variant"
                >
                  v{{ policy.version }}
                </span>
              </div>
              <p
                class="font-body-sm text-body-sm text-on-surface-variant border-l-2 border-surface-variant pl-3 py-1 mt-2 bg-surface-container-lowest"
              >
                {{ policy.summary }}
              </p>
            </div>
          </label>
        </div>

        <p class="font-body-sm text-body-sm text-outline text-center px-4">
          Ces consentements seront horodatés localement dans la démo.
        </p>
      </div>
    </main>

    <div
      class="fixed bottom-0 left-0 w-full bg-surface/95 backdrop-blur-sm border-t border-surface-container p-container-margin z-50 flex flex-col gap-stack-sm"
    >
      <button
        type="button"
        class="w-full bg-primary-container text-on-primary font-body-lg text-body-lg py-3 rounded-lg flex justify-center items-center gap-2 active:scale-95 transition-transform disabled:opacity-40"
        :disabled="!canContinue"
        @click="goNext"
      >
        Continuer vers le paiement
        <span class="material-symbols-outlined text-icon-md">arrow_forward</span>
      </button>
      <button
        type="button"
        class="w-full bg-surface text-primary border border-primary-container font-body-lg text-body-lg py-3 rounded-lg flex justify-center items-center active:scale-95 transition-transform"
        @click="goBack"
      >
        Revenir
      </button>
    </div>
  </div>
</template>
