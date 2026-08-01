<script setup>
import { computed, onMounted } from 'vue'
import { storeToRefs } from 'pinia'
import { useRouter } from 'vue-router'
import { DemoRole } from '../../domain/demoRole'
import {
  SETTLEMENT_HERO_ACCUEIL,
  SETTLEMENT_PILLARS,
  SETTLEMENT_PILLARS_PRO,
} from '../../mocks/settlementSeed'
import { useDemoRoleStore } from '../../stores/demoRole'
import { useSettlementStore } from '../../stores/settlement'

const router = useRouter()
const settlementStore = useSettlementStore()
const { demoRole } = storeToRefs(useDemoRoleStore())

const isPro = computed(() => demoRole.value === DemoRole.PRO)
const pillars = computed(() =>
  isPro.value ? SETTLEMENT_PILLARS_PRO : SETTLEMENT_PILLARS,
)

onMounted(() => {
  settlementStore.ensureDemoSeed()
  if (settlementStore.settled) {
    router.replace({
      name: isPro.value ? 'settlement-revenu' : 'settlement-succes',
    })
  }
})

function goBack() {
  router.push({ name: 'home' })
}

function openDecompte() {
  settlementStore.ensureCalculated()
  if (settlementStore.settled) {
    router.push({
      name: isPro.value ? 'settlement-revenu' : 'settlement-succes',
    })
    return
  }
  if (isPro.value) {
    // Coiffeuse : pas le parcours « payer le solde »
    goBack()
    return
  }
  router.push({ name: 'settlement-solde' })
}
</script>

<template>
  <div
    class="bg-background text-on-surface font-body-sm antialiased min-h-screen flex flex-col"
  >
    <header
      class="fixed top-0 w-full flex items-center h-16 px-margin-mobile z-50 bg-background border-b border-surface-variant"
    >
      <button
        type="button"
        aria-label="Retour"
        class="flex items-center justify-center w-10 h-10 -ml-2 text-primary hover:bg-surface-container-low transition-colors rounded-full active:scale-95"
        @click="goBack"
      >
        <span class="material-symbols-outlined text-[24px]">arrow_back</span>
      </button>
      <h1 class="ml-2 font-headline-sm text-headline-sm text-primary">
        {{ isPro ? 'Mon revenu' : 'Règlement' }}
      </h1>
    </header>

    <main class="flex-1 mt-16 px-margin-mobile pb-32">
      <div class="mt-lg">
        <div
          class="inline-flex items-center px-sm py-xs bg-secondary-fixed/20 rounded"
        >
          <span
            class="font-label-mono text-label-mono text-on-secondary-fixed-variant"
          >
            {{ settlementStore.statusBadge }}
          </span>
          <span
            class="ml-2 font-label-mono text-[10px] text-on-surface-variant uppercase tracking-wider opacity-60"
          >
            {{ settlementStore.statusCode }}
          </span>
        </div>
        <h2 class="mt-md font-headline-md text-headline-md text-on-surface">
          {{
            isPro
              ? 'Votre revenu après le paiement cliente'
              : 'Voici votre décompte'
          }}
        </h2>
        <p class="mt-sm font-body-lg text-body-lg text-on-surface-variant">
          <template v-if="isPro">
            La prestation est terminée. Dès que la cliente règle le solde, le dossier
            passe à SETTLED et votre net styliste (commission déduite, tip inclus)
            devient consultable ici.
          </template>
          <template v-else>
            La prestation est terminée. On calcule le montant final à partir du prix
            engagé, on impute l’acompte déjà versé, vous pouvez ajouter un pourboire
            optionnel, puis vous simulez le paiement du solde.
          </template>
        </p>
      </div>

      <div
        class="relative -mx-margin-mobile mt-xl h-[320px] bg-surface-container overflow-hidden"
      >
        <img
          alt=""
          class="w-full h-full object-cover"
          :src="SETTLEMENT_HERO_ACCUEIL"
        />
        <div
          class="absolute inset-0 bg-gradient-to-t from-primary/80 via-primary/30 to-transparent flex items-end p-margin-mobile"
        >
          <p class="font-headline-md text-headline-md text-on-primary">
            {{
              isPro
                ? 'Un net clair, dès que c’est payé.'
                : 'Un solde clair, un dossier clos.'
            }}
          </p>
        </div>
      </div>

      <div class="mt-xl">
        <h3 class="font-headline-sm text-headline-sm text-on-surface mb-md">
          {{ isPro ? 'Ce que vous allez voir' : 'Ce que vous allez faire' }}
        </h3>
        <div class="grid grid-cols-1 gap-sm">
          <div
            v-for="pillar in pillars"
            :key="pillar.title"
            class="flex items-start p-md bg-surface-container-lowest border border-surface-variant rounded-xl"
          >
            <div
              class="w-10 h-10 rounded-full flex items-center justify-center mr-md shrink-0"
              :class="
                pillar.filled
                  ? 'bg-secondary-fixed/30'
                  : 'bg-surface-container'
              "
            >
              <span
                class="material-symbols-outlined"
                :class="pillar.filled ? 'text-secondary' : 'text-on-surface-variant'"
                :style="
                  pillar.filled ? { fontVariationSettings: `'FILL' 1` } : undefined
                "
              >
                {{ pillar.icon }}
              </span>
            </div>
            <div>
              <h4 class="font-headline-sm text-[16px] text-on-surface mb-xs">
                {{ pillar.title }}
              </h4>
              <p class="font-body-sm text-body-sm text-on-surface-variant">
                {{ pillar.body }}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div
        class="mt-xl p-md bg-surface-container-low rounded-lg border border-surface-variant"
      >
        <p class="font-caption text-caption text-on-surface-variant">
          <template v-if="isPro">
            Formule net : prix engagé − commission (+ tip intégral). Pas de
            remboursement dans cette démo.
          </template>
          <template v-else>
            Formule : final = prix engagé (+ tip) ; solde = final − acompte. Une seule
            commission plateforme côté styliste. Pas de remboursement dans cette démo.
          </template>
        </p>
      </div>
    </main>

    <div
      class="fixed bottom-0 w-full px-margin-mobile pt-md pb-margin-mobile bg-background/95 backdrop-blur-md border-t border-surface-variant z-50"
    >
      <div class="max-w-lg mx-auto w-full">
        <button
          type="button"
          class="w-full h-12 bg-primary text-on-primary font-headline-sm text-[16px] rounded-lg transition-transform active:scale-[0.98] flex items-center justify-center"
          @click="openDecompte"
        >
          {{ isPro ? 'Compris — retour' : 'Voir mon décompte' }}
        </button>
      </div>
    </div>
  </div>
</template>
