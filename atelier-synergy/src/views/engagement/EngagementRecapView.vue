<script setup>
import { computed, onMounted } from 'vue'
import { storeToRefs } from 'pinia'
import { useRouter } from 'vue-router'
import EngagementStepper from '../../components/engagement/EngagementStepper.vue'
import { offerRefLabel } from '../../domain/engagement/labels'
import { slotSummary } from '../../domain/proposal/model'
import { useEngagementStore } from '../../stores/engagement'
import { useProposalStore } from '../../stores/proposal'

const router = useRouter()
const engagementStore = useEngagementStore()
const proposalStore = useProposalStore()
const { currentEngagement } = storeToRefs(engagementStore)
const { currentProposal, currentSoftHold } = storeToRefs(proposalStore)

const fallbackAvatar =
  'https://lh3.googleusercontent.com/aida-public/AB6AXuBbmLKyLgwoe51Y7bkWzhyix15Pe4mcQwgXac7O5SVLnxYGxpzUkwMaoAQM1tAeQaS9fUEHyGBDlYA8o_uPVTGIGoetcpFN9QmUD1-wreYJMnfmPMfhXTTFiaRvnWQAfsPYkM_qnQL1xNFeMtOfSYy0p9PeskFR-y33_mgpQioGY6PRPSHeJxrC2LymKXQawAwS3BmnlFQQoE5sbP_G_QBzqRa9Ues8dzNp9V6MDWpZmf8abw9jNgl0'

onMounted(() => {
  if (!currentEngagement.value) {
    engagementStore.openFromFirmProposal()
  }
})

const proposal = computed(() => currentProposal.value)
const offer = computed(() => proposal.value?.offer ?? null)
const brief = computed(() => proposal.value?.frozenBrief ?? null)
const engagement = computed(() => currentEngagement.value)

const proName = computed(
  () => engagement.value?.proDisplayName || proposal.value?.proDisplayName || 'Coiffeuse',
)
const proAvatar = computed(
  () => proposal.value?.proAvatarUrl || engagement.value?.thumbnailUrl || fallbackAvatar,
)

const offerRef = computed(() =>
  offerRefLabel(engagement.value?.offerRef || proposal.value?.id, engagement.value?.offerVersion ?? 1),
)

const serviceLabel = computed(
  () => engagement.value?.serviceLabel || brief.value?.prestationLabel || 'Prestation',
)

const resultExpected = computed(
  () => brief.value?.resultExpected || 'Résultat convenu dans l’offre ferme',
)

const includedLine = computed(() => {
  const supplies = offer.value?.tasks?.find((t) => t.id === 'task_supplies')
  const pro = offer.value?.tasks?.find((t) => t.id === 'task_pro')
  const parts = []
  if (pro?.detail) parts.push(pro.detail)
  if (supplies?.detail) parts.push(supplies.detail)
  return parts.length ? parts.join(', ') : 'Pose, finitions, fournitures convenues'
})

const excludedLine = computed(() => 'Coloration, entretien post-pose')

const slotLine = computed(() => {
  const slot = offer.value?.slot || currentSoftHold.value?.slot
  if (!slot?.dateLabel) {
    const e = engagement.value
    if (e?.dateLabel && e?.startTime) {
      return `${e.dateLabel} · ${e.startTime}${e.endTime ? ` – ${e.endTime}` : ''}`
    }
    return slotSummary(slot)
  }
  const time =
    slot.startTime && slot.endTime
      ? `${slot.startTime} – ${slot.endTime}`
      : slot.startTime || ''
  return time ? `${slot.dateLabel} · ${time}` : slot.dateLabel
})

const placeLine = computed(() => {
  const place = offer.value?.placeLabel || engagement.value?.placeLabel || 'Chez la coiffeuse'
  return `${place} · adresse communiquée après engagement`
})

const priceTotal = computed(
  () => engagement.value?.priceTotal ?? offer.value?.priceTotal ?? 0,
)
const deposit = computed(
  () => engagement.value?.depositAmount ?? Math.round(Number(priceTotal.value) * 0.3),
)
const balance = computed(
  () => engagement.value?.balanceAmount ?? Number(priceTotal.value) - Number(deposit.value),
)

function goBack() {
  router.push({ name: 'engagement-accueil' })
}

function goNext() {
  router.push({ name: 'engagement-consentements' })
}
</script>

<template>
  <div class="bg-background text-on-surface font-body-lg text-body-lg min-h-screen flex flex-col pb-36">
    <header
      class="fixed top-0 left-0 w-full z-50 flex justify-between items-center px-container-margin h-16 bg-surface border-b border-surface-variant"
    >
      <button
        type="button"
        aria-label="Retour"
        class="text-on-surface-variant hover:bg-surface-container-low p-2 rounded-full flex items-center justify-center transition-colors"
        @click="goBack"
      >
        <span class="material-symbols-outlined">arrow_back</span>
      </button>
      <h1 class="font-headline-md text-headline-md font-bold text-primary">Récapitulatif</h1>
      <div class="w-10" />
    </header>

    <main class="mt-16 px-container-margin pt-stack-lg pb-stack-lg flex-grow flex flex-col gap-section-gap">
      <section class="flex flex-col gap-stack-md">
        <div class="flex items-center gap-2 flex-wrap">
          <span
            class="inline-flex items-center px-3 py-1 rounded bg-secondary-container text-on-secondary-container font-label-technical text-label-technical uppercase tracking-widest"
          >
            EN ATTENTE
          </span>
          <span class="font-label-technical text-label-technical text-on-surface-variant">
            AWAITING_CLIENT_ACCEPTANCE
          </span>
        </div>
        <EngagementStepper :step="1" />
      </section>

      <section class="flex flex-col gap-stack-md">
        <h2 class="font-display-lg-mobile text-display-lg-mobile text-primary">
          Votre engagement en un coup d’œil
        </h2>
        <p class="font-body-lg text-body-lg text-on-surface-variant">
          Vérifiez que tout correspond avant d’accepter. Même version que l’offre publiée.
        </p>
      </section>

      <section
        class="bg-surface-container-lowest p-stack-md border border-surface-container rounded-lg flex flex-col gap-stack-lg"
      >
        <div
          class="flex justify-between items-center gap-3 border-b border-surface-container pb-stack-md"
        >
          <div class="flex items-center gap-gutter min-w-0">
            <img
              class="w-12 h-12 rounded-full object-cover shrink-0"
              alt=""
              :src="proAvatar"
            />
            <span class="font-headline-sm text-headline-sm truncate">
              Coiffeuse: {{ proName }}
            </span>
          </div>
          <span class="font-label-technical text-label-technical text-on-surface-variant shrink-0">
            {{ offerRef }}
          </span>
        </div>

        <div class="flex flex-col gap-stack-sm border-b border-surface-container pb-stack-md">
          <h3 class="font-label-caps text-label-caps text-on-surface-variant uppercase mb-2">
            Prestation
          </h3>
          <div class="flex items-start gap-3">
            <span class="material-symbols-outlined text-secondary">content_cut</span>
            <p class="font-body-lg text-body-lg font-bold">{{ serviceLabel }}</p>
          </div>
          <ul class="list-none pl-9 flex flex-col gap-2 mt-2">
            <li class="font-body-sm text-body-sm text-on-surface-variant flex items-start gap-2">
              <span class="w-1 h-1 rounded-full bg-secondary mt-2 shrink-0" />
              Résultat attendu: {{ resultExpected }}
            </li>
            <li class="font-body-sm text-body-sm text-on-surface-variant flex items-start gap-2">
              <span class="w-1 h-1 rounded-full bg-secondary mt-2 shrink-0" />
              Inclus: {{ includedLine }}
            </li>
            <li class="font-body-sm text-body-sm text-on-surface-variant flex items-start gap-2">
              <span class="w-1 h-1 rounded-full bg-surface-variant mt-2 shrink-0" />
              Exclus: {{ excludedLine }}
            </li>
          </ul>
        </div>

        <div class="flex flex-col gap-stack-sm border-b border-surface-container pb-stack-md">
          <h3 class="font-label-caps text-label-caps text-on-surface-variant uppercase mb-2">
            Créneau &amp; Lieu
          </h3>
          <div class="flex items-start gap-3 mb-2">
            <span class="material-symbols-outlined text-secondary">calendar_month</span>
            <div class="flex flex-col">
              <p class="font-body-lg text-body-lg font-bold">{{ slotLine }}</p>
              <span class="font-label-technical text-label-technical text-secondary mt-1">
                Soft-hold actif
              </span>
            </div>
          </div>
          <div class="flex items-start gap-3 mt-2">
            <span class="material-symbols-outlined text-secondary">location_on</span>
            <p class="font-body-lg text-body-lg">{{ placeLine }}</p>
          </div>
        </div>

        <div class="flex flex-col gap-stack-sm bg-surface-container-low p-stack-md rounded">
          <div class="flex justify-between items-center">
            <span class="font-body-lg text-body-lg">Prix total</span>
            <span class="font-headline-sm text-headline-sm">{{ priceTotal }} €</span>
          </div>
          <div
            class="flex justify-between items-center mt-2 pt-2 border-t border-outline-variant"
          >
            <span class="font-body-lg text-body-lg font-bold text-primary">Acompte à verser</span>
            <span class="font-headline-sm text-headline-sm font-bold text-primary">
              {{ deposit }} €
            </span>
          </div>
          <div class="flex justify-between items-center mt-2">
            <span class="font-body-sm text-body-sm text-on-surface-variant">Solde prévisionnel</span>
            <span class="font-body-sm text-body-sm text-on-surface-variant">
              {{ balance }} € le jour J
            </span>
          </div>
        </div>
      </section>

      <p class="font-body-sm text-body-sm text-center text-on-surface-variant">
        Les politiques d’annulation seront acceptées à l’écran suivant.
      </p>
    </main>

    <div
      class="fixed bottom-0 left-0 w-full bg-surface-container-lowest border-t border-surface-container p-container-margin flex flex-col gap-stack-sm z-50"
    >
      <button
        type="button"
        class="w-full bg-primary-container text-on-primary py-4 rounded font-headline-sm text-headline-sm flex items-center justify-center transition-opacity hover:opacity-90 active:scale-[0.98]"
        @click="goNext"
      >
        Continuer vers les consentements
      </button>
      <button
        type="button"
        class="w-full bg-transparent border border-primary text-primary py-4 rounded font-headline-sm text-headline-sm flex items-center justify-center transition-colors hover:bg-surface-container-low active:scale-[0.98]"
        @click="goBack"
      >
        Revenir
      </button>
    </div>
  </div>
</template>
