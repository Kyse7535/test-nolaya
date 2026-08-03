<script setup>
import { computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { storeToRefs } from 'pinia'
import { statusBadgeLabel } from '../../domain/demand/labels'
import { HAIR_INCLUSION_OPTIONS } from '../../mocks/inspirations'
import { useDemandStore } from '../../stores/demand'

const router = useRouter()
const demandStore = useDemandStore()
const { currentDemand, resultReady, timingBudgetReady } = storeToRefs(demandStore)

const editorialSrc =
  'https://lh3.googleusercontent.com/aida-public/AB6AXuAT-vRkvzZklH7XdAzaf2TxEpwhCNK2JLaB4E6rQS15KLHUa0uNN886xOw8W-Tlm4-158c7fvr5B3ToB7v1mHFktZUMOrEEYjo9JXrojSVszetLiWnuRZfCYdvCVKJQ2AM33Jp5Lc1RTSXC-hqPVGNyqpGERJV60Pc2br-sr9WLmPUMrkREqiKzvjasvu1qbgwiNlHPHhnLcbMfzB4NWu7oStiyuqq-KZpR5X-nkS7ZnUaAQmO16Amj'

const badge = computed(() => statusBadgeLabel(currentDemand.value?.status))
const preferredDate = computed(() => currentDemand.value?.timing?.preferredDate ?? '')
const deadline = computed(() => currentDemand.value?.timing?.deadline ?? '')
const target = computed(() => currentDemand.value?.budget?.target || '')
const max = computed(() => currentDemand.value?.budget?.max || '')
const hairInclusion = computed(() => currentDemand.value?.budget?.hairInclusion)

onMounted(() => {
  if (!demandStore.currentDemand) demandStore.startDraft()
  if (!resultReady.value) {
    router.replace({ name: 'demand-resultat' })
  }
})

function goBack() {
  router.push({ name: 'demand-resultat' })
}

function onPreferred(event) {
  demandStore.setTiming({ preferredDate: event.target.value })
}

function onDeadline(event) {
  demandStore.setTiming({ deadline: event.target.value })
}

function onTarget(event) {
  demandStore.setBudget({ target: event.target.value })
}

function onMax(event) {
  demandStore.setBudget({ max: event.target.value })
}

function selectHair(id) {
  demandStore.setBudget({ hairInclusion: id })
}

function continueNext() {
  if (!timingBudgetReady.value) return
  router.push({ name: 'demand-zone' })
}
</script>

<template>
  <div class="bg-background text-on-background font-body-md min-h-screen pb-24">
    <header
      class="bg-background sticky top-0 w-full z-50 border-b border-surface-container flex items-center justify-between px-container-margin h-16"
    >
      <button
        type="button"
        aria-label="Retour"
        class="text-primary hover:opacity-80 active:scale-95"
        @click="goBack"
      >
        <span class="material-symbols-outlined">arrow_back</span>
      </button>
      <h1 class="text-headline-md font-headline-md text-primary font-bold tracking-tight">
        Qualifier mon besoin
      </h1>
      <span
        class="text-label-caps font-label-caps bg-secondary-container text-on-secondary-container px-2 py-1 rounded"
      >
        {{ badge }}
      </span>
    </header>

    <main class="max-w-2xl mx-auto px-container-margin pt-md pb-lg">
      <div class="flex items-center gap-2 mb-lg text-label-sm font-label-sm">
        <span class="text-on-surface-variant">2 Résultat</span>
        <span class="text-outline">·</span>
        <span class="text-secondary font-semibold">3 Temps & budget</span>
        <span class="text-outline">·</span>
        <span class="text-on-surface-variant/50">4 Zone</span>
      </div>

      <h2 class="text-headline-lg-mobile font-headline-lg-mobile text-primary mb-lg">
        Temps & budget
      </h2>

      <section class="mb-xl">
        <p class="text-body-md font-body-md text-on-surface-variant mb-md">
          Quand souhaitez-vous la prestation ?
        </p>
        <label class="block mb-md">
          <span class="text-body-sm font-body-sm text-on-surface mb-xs block">Date préférée</span>
          <input
            type="date"
            class="w-full rounded-lg border-outline-variant bg-surface-container-lowest px-md py-3 font-mono-data text-mono-data"
            :value="preferredDate"
            @input="onPreferred"
          />
        </label>
        <label class="block mb-sm">
          <span class="text-body-sm font-body-sm text-on-surface mb-xs block">
            Dernière échéance acceptable
          </span>
          <input
            type="date"
            class="w-full rounded-lg border-outline-variant bg-surface-container-lowest px-md py-3 font-mono-data text-mono-data"
            :value="deadline"
            @input="onDeadline"
          />
        </label>
        <p class="text-body-sm font-body-sm text-on-surface-variant">
          Indiquez au moins une date préférée ou une échéance.
        </p>
      </section>

      <section class="mb-xl">
        <p class="text-body-md font-body-md text-on-surface-variant mb-md">
          Combien êtes-vous prête à investir ?
        </p>
        <div class="grid grid-cols-2 gap-md mb-md">
          <label class="block">
            <span class="text-body-sm font-body-sm text-on-surface mb-xs block">Budget cible</span>
            <div class="relative">
              <input
                type="number"
                min="0"
                placeholder="Ex. 100"
                class="w-full rounded-lg border-outline-variant bg-surface-container-lowest px-md py-3 pr-10 font-mono-data text-mono-data"
                :value="target"
                @input="onTarget"
              />
              <span
                class="absolute right-3 top-1/2 -translate-y-1/2 text-on-surface-variant font-label-sm"
              >
                €
              </span>
            </div>
          </label>
          <label class="block">
            <span class="text-body-sm font-body-sm text-on-surface mb-xs block">Budget maximum</span>
            <div class="relative">
              <input
                type="number"
                min="0"
                placeholder="Ex. 120"
                class="w-full rounded-lg border-outline-variant bg-surface-container-lowest px-md py-3 pr-10 font-mono-data text-mono-data"
                :value="max"
                @input="onMax"
              />
              <span
                class="absolute right-3 top-1/2 -translate-y-1/2 text-on-surface-variant font-label-sm"
              >
                €
              </span>
            </div>
          </label>
        </div>

        <p class="text-body-sm font-body-sm text-on-surface mb-sm">Les mèches / extensions</p>
        <div class="flex flex-col gap-sm mb-md">
          <button
            v-for="opt in HAIR_INCLUSION_OPTIONS"
            :key="opt.id"
            type="button"
            class="w-full text-left px-md py-3 rounded-lg border transition-colors"
            :class="hairInclusion === opt.id ? 'border-secondary bg-secondary-container/40' : 'border-outline-variant bg-surface-container-lowest'"
            @click="selectHair(opt.id)"
          >
            {{ opt.label }}
          </button>
        </div>
        <p class="text-body-sm font-body-sm text-on-surface-variant italic">
          Ce n’est pas un devis. Les coiffeuses répondront ensuite dans ce cadre.
        </p>
      </section>

      <div class="rounded-lg overflow-hidden aspect-[16/9] bg-surface-variant mb-lg">
        <img :src="editorialSrc" alt="" class="w-full h-full object-cover" />
      </div>
    </main>

    <div
      class="fixed bottom-0 left-0 w-full bg-surface border-t border-surface-container p-container-margin z-50"
    >
      <button
        type="button"
        class="w-full max-w-[672px] mx-auto bg-primary text-on-primary font-button-text text-button-text py-3 rounded-lg disabled:opacity-50 block"
        :disabled="!timingBudgetReady"
        @click="continueNext"
      >
        Continuer
      </button>
    </div>
  </div>
</template>
