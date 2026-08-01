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
  <div class="bg-background text-on-background min-h-screen pb-[140px]">
    <header
      class="bg-background text-primary font-headline-sm text-headline-sm fixed top-0 w-full z-50 border-b border-surface-variant flex items-center px-margin-mobile h-16"
    >
      <button
        type="button"
        aria-label="Retour"
        class="hover:bg-surface-container transition-colors active:opacity-70 p-2 -ml-2 rounded-full flex items-center justify-center text-primary"
        @click="goBack"
      >
        <span class="material-symbols-outlined">arrow_back</span>
      </button>
      <h1 class="font-headline-sm text-headline-sm font-bold tracking-tight text-primary ml-2">
        Règlement final &amp; solde
      </h1>
    </header>

    <main
      v-if="settlement"
      class="pt-24 px-margin-mobile max-w-md mx-auto flex flex-col gap-xl"
    >
      <section class="flex flex-col gap-md">
        <div class="flex flex-col gap-xs">
          <span
            class="font-label-mono text-label-mono bg-secondary-container/10 text-on-secondary-container px-xs py-1 rounded w-fit border border-secondary-container/20 uppercase tracking-widest"
          >
            {{ settlementStore.statusBadge }}
          </span>
          <span class="font-label-mono text-[10px] text-outline">
            {{ settlementStore.statusCode }}
          </span>
        </div>

        <div
          class="bg-surface-container-low border border-surface-container-high rounded-lg p-md flex gap-md items-start"
        >
          <span class="material-symbols-outlined text-outline mt-1 text-[20px]">info</span>
          <p class="font-body-sm text-body-sm text-on-surface-variant">
            MODE DÉMO — Aucun paiement réel. Aucune carte bancaire n’est collectée.
          </p>
        </div>

        <div
          class="flex items-center gap-md p-md bg-surface-container-lowest border border-surface-container rounded-lg"
        >
          <img
            class="w-12 h-12 rounded-full object-cover border border-surface-variant"
            alt=""
            :src="proAvatar"
          />
          <div class="flex flex-col">
            <span class="font-caption text-caption text-outline uppercase tracking-wider">
              Prestation réalisée par
            </span>
            <span class="font-body-lg text-body-lg font-medium text-primary">
              {{ settlement.proDisplayName }}
            </span>
          </div>
        </div>
      </section>

      <section
        class="bg-surface-container-lowest border border-surface-container rounded-xl p-md flex flex-col gap-md"
      >
        <div class="flex flex-col gap-sm">
          <div
            class="flex justify-between items-start py-sm border-b border-surface-container-high/50"
          >
            <span class="font-body-sm text-body-sm text-on-surface-variant max-w-[60%]">
              {{ settlement.serviceLabel }} (Prix engagé)
            </span>
            <span class="font-label-mono text-label-mono text-primary mt-1">
              {{ formatEuro(settlement.priceEngaged) }}
            </span>
          </div>
          <div
            class="flex justify-between items-start py-sm border-b border-surface-container-high/50"
          >
            <span class="font-body-sm text-body-sm text-on-surface-variant">
              Acompte versé (Déjà confirmé)
            </span>
            <span
              class="font-label-mono text-label-mono text-secondary mt-1 bg-secondary-container/10 px-xs py-1 rounded"
            >
              − {{ formatEuro(settlement.depositAmount) }}
            </span>
          </div>
        </div>
      </section>

      <section class="flex flex-col gap-sm">
        <div class="flex flex-col">
          <h2 class="font-headline-sm text-[16px] font-semibold text-primary">
            Ajouter un pourboire (optionnel)
          </h2>
          <p class="font-caption text-caption text-outline">
            Facultatif — une façon de remercier votre coiffeuse.
          </p>
        </div>
        <div class="flex gap-sm overflow-x-auto hide-scrollbar py-2">
          <button
            v-for="tip in settlementStore.tipOptions"
            :key="tip"
            type="button"
            class="flex-shrink-0 font-body-sm text-body-sm px-md py-sm rounded-full border transition-colors"
            :class="
              tipAmount === tip
                ? 'border-2 border-secondary bg-secondary-container/10 text-on-secondary-container font-medium'
                : 'border-surface-container text-on-surface-variant hover:border-secondary'
            "
            @click="selectTip(tip)"
          >
            {{ tipChipLabel(tip) }}
          </button>
        </div>
      </section>

      <section
        class="bg-surface-container-lowest border border-surface-container rounded-xl p-md flex flex-col gap-md"
      >
        <div
          class="flex justify-between items-center py-sm border-b border-surface-container-high/50"
        >
          <span class="font-body-sm text-body-sm text-on-surface-variant">Pourboire</span>
          <span class="font-label-mono text-label-mono text-primary">
            {{ tipAmount > 0 ? `+ ${formatEuro(tipAmount)}` : formatEuro(0) }}
          </span>
        </div>
        <div class="flex justify-between items-end py-sm">
          <span class="font-body-lg text-body-lg font-semibold text-primary">
            Solde restant à payer
          </span>
          <span class="font-label-mono text-[18px] font-bold text-primary">
            {{ formatEuro(balance) }}
          </span>
        </div>
        <div
          class="bg-surface px-md py-sm rounded-lg border border-surface-container-high/30"
        >
          <p
            class="font-label-mono text-[10px] text-outline text-center leading-relaxed"
          >
            Final = prix engagé (+ tip) · Solde = final − acompte
          </p>
        </div>
      </section>
    </main>

    <div
      class="fixed bottom-0 left-0 w-full bg-surface-container-lowest/90 backdrop-blur-md border-t border-surface-variant p-margin-mobile flex flex-col gap-sm z-50"
    >
      <div class="max-w-md mx-auto w-full flex flex-col gap-sm">
        <button
          type="button"
          class="w-full bg-primary text-on-primary font-body-lg text-body-lg font-semibold h-14 rounded-lg flex items-center justify-center gap-2 hover:opacity-90 active:scale-[0.98]"
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
