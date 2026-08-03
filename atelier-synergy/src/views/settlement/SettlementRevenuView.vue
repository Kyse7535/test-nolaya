<script setup>
import { computed, onMounted, watch } from 'vue'
import { useRouter } from 'vue-router'
import { commissionRateLabel } from '../../domain/settlement/labels'
import { formatEuro } from '../../domain/settlement/model'
import { SETTLEMENT_PRO_AVATAR_REVENU } from '../../mocks/settlementSeed'
import { useSettlementStore } from '../../stores/settlement'

const router = useRouter()
const settlementStore = useSettlementStore()

const settlement = computed(() => settlementStore.settlement)
const payout = computed(() => settlementStore.payout)
const downloadNote = computed(() => settlementStore.downloadNote)
const tipAmount = computed(() => settlement.value?.tipAmount ?? 0)

onMounted(() => {
  settlementStore.ensureDemoSeed()
  if (!settlementStore.settled) {
    router.replace({ name: 'settlement-accueil' })
  }
})

watch(
  () => settlementStore.demoRole,
  (role) => {
    if (role === settlementStore.DemoRole.CLIENT && settlementStore.settled) {
      router.replace({ name: 'settlement-succes' })
    }
  },
)

function goBack() {
  if (settlementStore.settled) {
    router.push({ name: 'settlement-succes' })
    return
  }
  router.push({ name: 'settlement-accueil' })
}

function downloadReleve() {
  settlementStore.acknowledgeDownloadReleve()
}
</script>

<template>
  <div
    class="bg-surface text-on-surface antialiased flex flex-col min-h-screen"
  >
    <header
      class="fixed top-0 w-full z-50 bg-surface border-b border-surface-container-high h-16 flex items-center justify-between px-margin-mobile"
    >
      <button
        type="button"
        aria-label="Retour"
        class="flex items-center justify-center p-2 -ml-2 text-primary hover:opacity-80 transition-opacity"
        @click="goBack"
      >
        <span class="material-symbols-outlined">arrow_back</span>
      </button>
      <h1
        class="font-headline-sm text-headline-sm text-primary tracking-tight truncate px-4 flex-1 text-center"
      >
        Mon revenu &amp; reversement
      </h1>
      <div
        class="w-10 h-10 rounded-full overflow-hidden border border-outline-variant shrink-0"
      >
        <img
          alt=""
          class="w-full h-full object-cover"
          :src="SETTLEMENT_PRO_AVATAR_REVENU"
        />
      </div>
    </header>

    <main
      v-if="settlement && payout"
      class="pt-24 pb-8 px-margin-mobile flex-1 flex flex-col gap-xl max-w-md mx-auto w-full"
    >
      <section class="flex flex-col items-center text-center">
        <div
          class="inline-flex items-center gap-2 bg-secondary-container/10 px-3 py-1 rounded mb-4"
        >
          <span
            class="font-label-mono text-label-mono text-secondary uppercase tracking-wider"
          >
            {{ settlementStore.payoutBadge }}
          </span>
          <span class="material-symbols-outlined text-secondary text-icon-xs">check_circle</span>
        </div>
        <p class="font-body-sm text-body-sm text-on-surface-variant mb-1">
          Montant net reversé
        </p>
        <h2
          class="font-label-mono text-display-lg text-primary tracking-tight mb-6"
        >
          {{ formatEuro(settlement.netStylist) }}
        </h2>

        <div
          class="flex flex-row justify-between w-full p-4 bg-surface-container-lowest border border-outline-variant rounded-xl"
        >
          <div class="flex flex-col items-start">
            <span class="font-caption text-caption text-on-surface-variant mb-1">
              Date de prestation
            </span>
            <span class="font-body-sm text-body-sm text-primary font-medium">
              {{ settlement.dateLabel || '—' }}
            </span>
          </div>
          <div class="w-px bg-outline-variant opacity-50" />
          <div class="flex flex-col items-end">
            <span class="font-caption text-caption text-on-surface-variant mb-1">
              Statut
            </span>
            <span class="font-body-sm text-body-sm text-primary font-medium">
              Reversement immédiat
            </span>
          </div>
        </div>
        <p class="font-label-micro text-label-micro text-outline mt-2 uppercase tracking-wider">
          PAID_OUT
        </p>
      </section>

      <section
        v-if="tipAmount > 0"
        class="bg-surface-container-lowest border border-secondary-container rounded-xl p-md flex items-start gap-4 relative overflow-hidden"
      >
        <div
          class="bg-secondary-container/20 p-2 rounded-lg shrink-0"
        >
          <span class="material-symbols-outlined text-secondary">favorite</span>
        </div>
        <div class="flex-1">
          <div class="flex justify-between items-center mb-1">
            <h3 class="font-body-md text-body-md font-semibold text-primary">
              Pourboire cliente
            </h3>
            <span class="font-label-mono text-body-sm text-secondary font-bold">
              + {{ formatEuro(tipAmount) }}
            </span>
          </div>
          <p class="font-body-sm text-body-sm text-on-surface-variant leading-tight">
            100 % du pourboire vous est reversé, sans commission.
          </p>
        </div>
      </section>

      <section
        class="flex flex-col gap-0 bg-surface-container-lowest border border-outline-variant rounded-xl overflow-hidden"
      >
        <div
          class="p-md flex justify-between items-center border-b border-outline-variant/50 bg-surface"
        >
          <h3 class="font-body-md text-body-md font-semibold text-primary">
            Détail comptable
          </h3>
          <span class="font-label-mono text-caption text-on-surface-variant">
            Réf: {{ settlement.reference }}
          </span>
        </div>
        <div class="p-md flex flex-col gap-4">
          <div class="flex justify-between items-center">
            <span class="font-body-sm text-body-sm text-on-surface-variant">
              Prestation (prix engagé)
            </span>
            <span class="font-label-mono text-body-sm text-primary">
              {{ formatEuro(settlement.priceEngaged) }}
            </span>
          </div>
          <div class="flex justify-between items-center">
            <span class="font-body-sm text-body-sm text-on-surface-variant">
              Commission plateforme ({{ commissionRateLabel() }})
            </span>
            <span class="font-label-mono text-body-sm text-error">
              − {{ formatEuro(settlement.commission) }}
            </span>
          </div>
          <div class="flex justify-between items-center">
            <span class="font-body-sm text-body-sm text-on-surface-variant">
              Pourboire (exonéré)
            </span>
            <span class="font-label-mono text-body-sm text-secondary">
              + {{ formatEuro(tipAmount) }}
            </span>
          </div>
        </div>
        <div
          class="p-md bg-surface-container-high flex justify-between items-center border-t border-outline-variant"
        >
          <span class="font-body-md text-body-md font-semibold text-primary">
            Total net à reverser
          </span>
          <span class="font-label-mono text-headline-sm text-primary font-bold">
            {{ formatEuro(settlement.netStylist) }}
          </span>
        </div>
      </section>

      <p class="font-caption text-caption text-on-surface-variant text-center px-4 italic">
        Un seul taux de commission mock. Pas de frais PSP supplémentaires dans cette démo.
      </p>

      <div class="flex flex-col gap-3 mt-auto pt-4">
        <button
          type="button"
          class="w-full py-4 px-6 rounded border border-outline-variant text-primary font-headline-sm text-body-lg flex justify-center items-center gap-2 hover:bg-surface-container-highest active:scale-[0.98] transition-all"
          @click="downloadReleve"
        >
          <span class="material-symbols-outlined">download</span>
          Télécharger le relevé (PDF)
        </button>
        <p
          v-if="downloadNote"
          class="font-caption text-caption text-secondary text-center"
        >
          {{ downloadNote }}
        </p>
      </div>
    </main>
  </div>
</template>
