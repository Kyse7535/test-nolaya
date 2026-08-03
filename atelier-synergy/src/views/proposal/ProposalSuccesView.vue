<script setup>
import { computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { storeToRefs } from 'pinia'
import DemoRoleHandoff from '../../components/DemoRoleHandoff.vue'
import { DemoRole } from '../../domain/demoRole'
import { ProposalStatus } from '../../domain/proposal/model'
import { useDemoRoleStore } from '../../stores/demoRole'
import { useProposalStore } from '../../stores/proposal'

const router = useRouter()
const proposalStore = useProposalStore()
const { currentProposal, currentSoftHold } = storeToRefs(proposalStore)
const { demoRole } = storeToRefs(useDemoRoleStore())
const isPro = computed(() => demoRole.value === DemoRole.PRO)

function goOffreCliente() {
  router.push({ name: 'proposal-offre-cliente' })
}

const heroSrc =
  'https://lh3.googleusercontent.com/aida-public/AB6AXuC9BWZucOXpYY5ODxCRHg4_TMc3InRzbC87gg3ch-hlhHoBa1SkMkHgGO3IYrRn8L5SLUqp2wAGWYmzkaKNpLVWkqgKarEtj5LRD6Kl3fZ7GKENPPx9KFA6MdeAm2t-lDfpxB5Dw2bx0qOHZ5Lnt0ZpLYFTnv_MkFE728YMXMxni39h_gSgmjyCT070NRsIPzRVVkIPjtHZeFqCBRyB_TDi1roFkKrMp9GWL4Jrl6zbxpr5qvTQIZbl'

const offer = computed(() => currentProposal.value?.offer ?? null)
const brief = computed(() => currentProposal.value?.frozenBrief ?? null)
const slot = computed(() => offer.value?.slot ?? currentSoftHold.value?.slot ?? null)

const softHoldCopy = computed(() => {
  const s = slot.value
  if (!s?.dateLabel) {
    return 'Votre proposition est datée. Le créneau est en soft-hold en attendant l’acceptation de la cliente.'
  }
  const time = s.startTime ? ` à ${s.startTime}` : ''
  return `Votre proposition est datée. Le créneau du ${s.dateLabel.toLowerCase()}${time} est en soft-hold en attendant l’acceptation de la cliente.`
})

const prestationShort = computed(() => {
  const label = brief.value?.prestationLabel || 'Prestation'
  if (label.toLowerCase().includes('vanille')) return 'Vanilles mi-longues'
  return label
})

onMounted(() => {
  const p = currentProposal.value
  if (!p || p.status !== ProposalStatus.FIRM) {
    router.replace({ name: 'proposal-accueil' })
  }
})

function goHome() {
  router.push({ name: 'home' })
}
</script>

<template>
  <div
    v-if="offer"
    class="bg-surface min-h-screen flex flex-col items-center text-on-surface antialiased w-full max-w-md mx-auto relative"
  >
    <main class="flex-1 w-full flex flex-col relative pt-8 pb-32">
      <section class="w-full px-margin-mobile mb-stack-lg relative z-10">
        <div
          class="relative w-full h-36 bg-surface-container-low rounded-lg overflow-hidden border border-outline-variant p-1"
        >
          <div class="w-full h-full rounded border border-surface-variant relative overflow-hidden">
            <img class="w-full h-full object-cover" alt="" :src="heroSrc" />
            <div
              class="absolute inset-0 bg-gradient-to-t from-primary/20 to-transparent pointer-events-none"
            />
          </div>
        </div>
      </section>

      <section class="w-full px-margin-mobile flex flex-col items-center text-center z-20">
        <div class="flex flex-col items-center gap-stack-sm mb-stack-md">
          <span
            class="inline-flex items-center justify-center bg-surface-bright text-secondary font-label-mono text-label-mono px-3 py-1.5 rounded-full border border-secondary-container"
          >
            OFFRE FERME
          </span>
          <div
            class="flex items-center gap-2 text-on-surface-variant font-label-mono text-label-status opacity-60"
          >
            <span>FIRM_PROPOSAL</span>
            <span class="w-1 h-1 rounded-full bg-outline-variant" />
            <span>SOFT_HOLD</span>
          </div>
        </div>

        <div class="flex flex-col gap-stack-sm mb-stack-lg w-full max-w-[320px] mx-auto">
          <h1 class="font-headline-lg-mobile text-headline-lg-mobile text-on-surface">
            Offre ferme publiée
          </h1>
          <p class="font-body-md text-body-md text-on-surface-variant">
            {{ softHoldCopy }}
          </p>
        </div>

        <div
          class="w-full py-4 border-y border-surface-variant flex flex-col items-center gap-2 bg-surface-bright"
        >
          <div
            class="flex items-center justify-center gap-3 font-body-sm text-body-sm text-on-surface-variant flex-wrap"
          >
            <span class="font-medium text-on-surface">{{ offer.priceTotal }} €</span>
            <span class="w-1 h-1 rounded-full bg-outline-variant" />
            <span>{{ prestationShort }}</span>
            <span class="w-1 h-1 rounded-full bg-outline-variant" />
            <span>{{ offer.durationLabel }}</span>
          </div>
        </div>
      </section>
    </main>

    <div
      class="fixed bottom-0 left-0 w-full bg-gradient-to-t from-surface via-surface to-transparent pt-12 pb-8 px-margin-mobile flex flex-col gap-unit z-50"
    >
      <div class="w-full max-w-md mx-auto flex flex-col gap-stack-sm items-stretch">
        <DemoRoleHandoff
          v-if="isPro"
          class="mx-auto"
          :target-role="DemoRole.CLIENT"
          action="voir l’offre"
        />
        <button
          v-if="!isPro"
          type="button"
          class="w-full h-[56px] flex items-center justify-center bg-primary text-on-primary rounded font-body-md text-body-md transition-colors hover:opacity-90 active:scale-[0.98]"
          @click="goOffreCliente"
        >
          Voir l’offre reçue
        </button>
        <button
          type="button"
          class="w-full h-[56px] flex items-center justify-center rounded font-body-md text-body-md transition-colors active:scale-[0.98]"
          :class="
            isPro
              ? 'bg-primary text-on-primary hover:opacity-90'
              : 'bg-transparent text-primary border border-outline-variant hover:bg-surface-container-low'
          "
          @click="goHome"
        >
          Retour à l’accueil
        </button>
      </div>
    </div>
  </div>
</template>
