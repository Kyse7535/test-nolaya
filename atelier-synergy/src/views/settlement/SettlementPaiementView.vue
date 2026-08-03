<script setup>
import { computed, onMounted } from 'vue'
import { storeToRefs } from 'pinia'
import { useRouter } from 'vue-router'
import { DemoRole } from '../../domain/demoRole'
import { tipChipLabel } from '../../domain/settlement/labels'
import { formatEuro } from '../../domain/settlement/model'
import { SETTLEMENT_PRO_AVATAR } from '../../mocks/settlementSeed'
import { useDemoRoleStore } from '../../stores/demoRole'
import { useSettlementStore } from '../../stores/settlement'

const router = useRouter()
const settlementStore = useSettlementStore()
const { demoRole } = storeToRefs(useDemoRoleStore())

const settlement = computed(() => settlementStore.settlement)
const tipAmount = computed(() => settlement.value?.tipAmount ?? 0)
const balance = computed(() => settlement.value?.balance ?? 0)
const isZeroBalance = computed(() => Number(balance.value) <= 0)

const proAvatar = computed(
  () => settlement.value?.proAvatarUrl || SETTLEMENT_PRO_AVATAR,
)

onMounted(() => {
  // Paiement solde = parcours cliente uniquement
  if (demoRole.value === DemoRole.PRO) {
    router.replace({
      name: settlementStore.settled
        ? 'settlement-revenu'
        : 'settlement-accueil',
    })
    return
  }
  settlementStore.ensureCalculated()
  if (settlementStore.settled) {
    router.replace({ name: 'settlement-succes' })
  }
})

function goBack() {
  router.push({ name: 'settlement-accueil' })
}

function selectTip(amount) {
  settlementStore.setTip(amount)
}

function pay() {
  if (demoRole.value === DemoRole.PRO) return
  settlementStore.payBalanceMock()
  router.push({ name: 'settlement-succes' })
}
</script>

<template>
  <div class="bg-background text-on-background min-h-screen pb-28">
    <header
      class="bg-background text-primary sticky top-0 w-full z-50 border-b border-surface-variant flex items-center px-margin-mobile h-14"
    >
      <button
        type="button"
        aria-label="Retour"
        class="hover:bg-surface-container transition-colors active:opacity-70 p-2 -ml-2 rounded-full flex items-center justify-center text-primary shrink-0"
        @click="goBack"
      >
        <span class="material-symbols-outlined">arrow_back</span>
      </button>
      <h1 class="font-headline-sm text-headline-sm font-bold tracking-tight text-primary ml-1 flex-1 truncate">
        Règlement final &amp; solde
      </h1>
      <span
        class="font-label-mono text-label-mono bg-secondary-container/10 text-on-secondary-container px-2 py-1 rounded border border-secondary-container/20 uppercase tracking-widest shrink-0"
      >
        {{ settlementStore.statusBadge }}
      </span>
    </header>

    <main
      v-if="settlement"
      class="pt-4 px-margin-mobile max-w-md mx-auto flex flex-col gap-4"
    >
      <div
        class="bg-surface-container-low border border-surface-container-high rounded-lg px-3 py-2 flex gap-2 items-start"
      >
        <span class="material-symbols-outlined text-outline text-[20px] mt-0.5">info</span>
        <p class="font-body-sm text-body-sm text-on-surface-variant">
          MODE DÉMO — Aucun paiement réel. Aucune carte bancaire n’est collectée.
        </p>
      </div>

      <div
        class="flex items-center gap-3 px-3 py-2.5 bg-surface-container-lowest border border-surface-container rounded-lg"
      >
        <img
          class="w-10 h-10 rounded-full object-cover border border-surface-variant shrink-0"
          alt=""
          :src="proAvatar"
        />
        <div class="flex flex-col min-w-0">
          <span class="font-caption text-caption text-outline uppercase tracking-wider">
            Prestation réalisée par
          </span>
          <span class="font-body-md text-body-md font-medium text-primary truncate">
            {{ settlement.proDisplayName }}
          </span>
        </div>
      </div>

      <section
        class="bg-surface-container-lowest border border-surface-container rounded-lg p-3 flex flex-col gap-0"
      >
        <div
          class="flex justify-between items-start py-2 border-b border-surface-container-high/50 gap-3"
        >
          <span class="font-body-sm text-body-sm text-on-surface-variant">
            {{ settlement.serviceLabel }} (Prix engagé)
          </span>
          <span class="font-label-mono text-label-mono text-primary shrink-0">
            {{ formatEuro(settlement.priceEngaged) }}
          </span>
        </div>
        <div
          class="flex justify-between items-start py-2 border-b border-surface-container-high/50 gap-3"
        >
          <span class="font-body-sm text-body-sm text-on-surface-variant">
            Acompte versé
          </span>
          <span
            class="font-label-mono text-label-mono text-secondary shrink-0 bg-secondary-container/10 px-xs py-0.5 rounded"
          >
            − {{ formatEuro(settlement.depositAmount) }}
          </span>
        </div>
        <div
          class="flex justify-between items-center py-2 border-b border-surface-container-high/50 gap-3"
        >
          <span class="font-body-sm text-body-sm text-on-surface-variant">Pourboire</span>
          <span class="font-label-mono text-label-mono text-primary shrink-0">
            {{ tipAmount > 0 ? `+ ${formatEuro(tipAmount)}` : formatEuro(0) }}
          </span>
        </div>
        <div class="flex justify-between items-end pt-2.5 gap-3">
          <span class="font-body-md text-body-md font-semibold text-primary">
            Solde restant à payer
          </span>
          <span class="font-label-mono text-body-lg font-bold text-primary shrink-0">
            {{ formatEuro(balance) }}
          </span>
        </div>
        <p class="font-label-micro text-label-micro text-outline text-center pt-2">
          Final = prix engagé (+ tip) · Solde = final − acompte
        </p>
      </section>

      <section class="flex flex-col gap-2">
        <div class="flex flex-col">
          <h2 class="font-body-md text-body-md font-semibold text-primary">
            Ajouter un pourboire (optionnel)
          </h2>
          <p class="font-caption text-caption text-outline">
            Facultatif — une façon de remercier votre coiffeuse.
          </p>
        </div>
        <div class="flex gap-2 flex-wrap">
          <button
            v-for="tip in settlementStore.tipOptions"
            :key="tip"
            type="button"
            class="font-body-sm text-body-sm px-3 py-1.5 rounded-full border transition-colors"
            :class="tipAmount === tip ? 'border-2 border-secondary bg-secondary-container/10 text-on-secondary-container font-medium' : 'border-surface-container text-on-surface-variant hover:border-secondary'"
            @click="selectTip(tip)"
          >
            {{ tipChipLabel(tip) }}
          </button>
        </div>
      </section>
    </main>

    <div
      class="fixed bottom-0 left-0 w-full bg-surface-container-lowest/90 backdrop-blur-md border-t border-surface-variant px-margin-mobile py-3 flex flex-col gap-1.5 z-50"
    >
      <div class="max-w-md mx-auto w-full flex flex-col gap-1.5">
        <button
          type="button"
          class="w-full bg-primary text-on-primary font-body-md text-body-md font-semibold h-12 rounded-lg flex items-center justify-center gap-2 hover:opacity-90 active:scale-[0.98]"
          @click="pay"
        >
          <span class="material-symbols-outlined text-[20px]">lock</span>
          {{ isZeroBalance ? 'Clôturer (solde nul)' : 'Payer le solde' }}
        </button>
        <p class="font-caption text-caption text-outline text-center">
          Paiement mock · aucun prélèvement · aucun prestataire de paiement
        </p>
      </div>
    </div>
  </div>
</template>
