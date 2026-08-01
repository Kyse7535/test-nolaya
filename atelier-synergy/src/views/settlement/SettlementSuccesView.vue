<script setup>
import { computed, onMounted, watch } from 'vue'
import { useRouter } from 'vue-router'
import { tipDisplay } from '../../domain/settlement/labels'
import { formatEuro } from '../../domain/settlement/model'
import { SETTLEMENT_HERO_SUCCES } from '../../mocks/settlementSeed'
import { useSettlementStore } from '../../stores/settlement'

const router = useRouter()
const settlementStore = useSettlementStore()

const settlement = computed(() => settlementStore.settlement)

onMounted(() => {
  settlementStore.ensureDemoSeed()
  if (!settlementStore.settled) {
    router.replace({ name: 'settlement-accueil' })
    return
  }
  if (settlementStore.demoRole === settlementStore.DemoRole.PRO) {
    router.replace({ name: 'settlement-revenu' })
  }
})

watch(
  () => settlementStore.demoRole,
  (role) => {
    if (role === settlementStore.DemoRole.PRO && settlementStore.settled) {
      router.replace({ name: 'settlement-revenu' })
    }
  },
)

function goHome() {
  router.push({ name: 'home' })
}

function goExperience() {
  router.push({ name: 'experience-accueil' })
}

function goRevenu() {
  settlementStore.setDemoRole(settlementStore.DemoRole.PRO)
  router.push({ name: 'settlement-revenu' })
}

function goBack() {
  router.push({ name: 'home' })
}
</script>

<template>
  <div
    class="bg-background text-on-background min-h-screen flex flex-col pt-16"
  >
    <header
      class="fixed top-0 w-full z-50 bg-background border-b border-outline-variant flex items-center justify-between px-margin-mobile h-16"
    >
      <button
        type="button"
        aria-label="Retour"
        class="p-2 -ml-2 text-primary active:opacity-70 transition-opacity rounded-full hover:bg-surface-container-low"
        @click="goBack"
      >
        <span class="material-symbols-outlined">arrow_back</span>
      </button>
      <div class="font-headline-sm text-headline-sm text-primary tracking-tight font-bold">
        Reçu
      </div>
      <div class="w-10" />
    </header>

    <main
      v-if="settlement"
      class="flex-grow px-margin-mobile pt-lg pb-[200px] space-y-xl max-w-md mx-auto w-full"
    >
      <section class="flex flex-col items-center text-center space-y-md">
        <div
          class="w-full aspect-[4/3] rounded-xl overflow-hidden bg-surface-container-low mb-sm"
        >
          <img
            class="w-full h-full object-cover"
            alt=""
            :src="SETTLEMENT_HERO_SUCCES"
          />
        </div>
        <div class="space-y-sm">
          <h1 class="font-display-lg text-display-lg text-primary">
            Votre solde est réglé
          </h1>
          <p class="font-body-lg text-body-lg text-on-surface-variant max-w-md mx-auto">
            Le paiement du solde a été simulé avec succès. Le dossier est clos financièrement.
            Vous pouvez maintenant enregistrer votre expérience.
          </p>
        </div>
        <div class="flex flex-col items-center space-y-xs pt-xs">
          <div
            class="bg-secondary-fixed-dim/20 px-lg py-xs rounded-full border border-secondary/30"
          >
            <span
              class="font-headline-sm text-headline-sm text-secondary font-bold tracking-wider"
            >
              RÉGLÉ
            </span>
          </div>
          <div
            class="font-label-mono text-label-mono text-outline tracking-widest mt-xs uppercase"
          >
            SETTLED
          </div>
        </div>
      </section>

      <section
        class="bg-surface-container-lowest border border-outline-variant rounded-xl p-md"
      >
        <h2
          class="font-headline-md text-headline-md text-primary mb-md border-b border-outline-variant pb-sm"
        >
          Reçu cliente
        </h2>
        <div class="space-y-sm font-body-sm text-body-sm text-on-surface">
          <div
            class="flex justify-between items-start py-xs border-b border-surface-container-low"
          >
            <span class="text-on-surface-variant">Prestation</span>
            <span class="font-medium text-right">{{ settlement.serviceLabel }}</span>
          </div>
          <div
            class="flex justify-between items-start py-xs border-b border-surface-container-low"
          >
            <span class="text-on-surface-variant">Coiffeuse</span>
            <span class="font-medium">{{ settlement.proDisplayName }}</span>
          </div>
          <div
            class="flex justify-between items-start py-xs border-b border-surface-container-low"
          >
            <span class="text-on-surface-variant">Prix engagé</span>
            <span class="font-label-mono text-label-mono">
              {{ formatEuro(settlement.priceEngaged) }}
            </span>
          </div>
          <div
            class="flex justify-between items-start py-xs border-b border-surface-container-low"
          >
            <span class="text-on-surface-variant">Pourboire</span>
            <span class="font-label-mono text-label-mono">
              {{ tipDisplay(settlement.tipAmount) }}
            </span>
          </div>
          <div
            class="flex justify-between items-center py-sm border-b border-outline-variant mt-sm"
          >
            <span class="font-bold text-primary">Total final</span>
            <span class="font-label-mono text-label-mono font-bold text-primary">
              {{ formatEuro(settlement.finalAmount) }}
            </span>
          </div>
          <div class="flex justify-between items-center py-xs text-on-surface-variant">
            <span>Acompte</span>
            <span class="font-label-mono text-label-mono">
              − {{ formatEuro(settlement.depositAmount) }}
            </span>
          </div>
          <div
            class="flex justify-between items-center p-sm mt-md bg-secondary-fixed/20 border border-secondary-fixed-dim rounded-lg"
          >
            <span class="font-bold text-on-secondary-container">Solde payé (mock)</span>
            <span
              class="font-label-mono text-label-mono font-bold text-on-secondary-container text-lg"
            >
              {{ formatEuro(settlement.balance) }}
            </span>
          </div>
        </div>
        <div class="mt-md pt-sm border-t border-outline-variant border-dashed">
          <p class="font-caption text-caption text-outline flex items-start">
            <span class="material-symbols-outlined text-[16px] mr-xs mt-[2px]">info</span>
            Paiement mock — aucun débit réel. Pas de remboursement dans cette démo.
          </p>
        </div>
      </section>
    </main>

    <div
      class="fixed bottom-0 left-0 w-full bg-background border-t border-outline-variant p-margin-mobile z-40 flex flex-col gap-sm"
    >
      <div class="max-w-md mx-auto w-full flex flex-col gap-sm">
        <button
          type="button"
          class="w-full bg-primary text-on-primary h-14 rounded-lg font-headline-sm text-headline-sm flex items-center justify-center transition-transform active:scale-[0.98]"
          @click="goExperience"
        >
          Continuer vers la preuve d’expérience
        </button>
        <button
          type="button"
          class="w-full bg-transparent text-primary border border-outline-variant h-12 rounded-lg font-headline-sm text-headline-sm flex items-center justify-center transition-colors hover:bg-surface-container-low"
          @click="goRevenu"
        >
          Voir le revenu styliste
        </button>
        <button
          type="button"
          class="w-full bg-transparent text-on-surface-variant h-10 rounded-lg font-body-sm text-body-sm flex items-center justify-center hover:bg-surface-container-low"
          @click="goHome"
        >
          Accueil
        </button>
      </div>
    </div>
  </div>
</template>
