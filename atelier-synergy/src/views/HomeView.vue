<script setup>
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import { DemandStatus } from '../domain/demand/model'
import { metierBlocks } from '../mocks/metierBlocks'
import { mockProfessional } from '../mocks/platform'
import { useCapacityStore } from '../stores/capacity'
import { useDemandStore } from '../stores/demand'
import { useFrameworkStore } from '../stores/framework'

const router = useRouter()
const frameworkStore = useFrameworkStore()
const capacityStore = useCapacityStore()
const demandStore = useDemandStore()

const capacityCountLabel = computed(() => {
  const open = capacityStore.openCapacities.length
  const drafts = capacityStore.draftCapacities.length
  const parts = []
  if (open) parts.push(`${open} ouverte${open > 1 ? 's' : ''}`)
  if (drafts) parts.push(`${drafts} brouillon${drafts > 1 ? 's' : ''}`)
  return parts.join(' · ') || 'aucune'
})

const hasCapacities = computed(
  () =>
    capacityStore.openCapacities.length > 0 ||
    capacityStore.draftCapacities.length > 0 ||
    capacityStore.closedCapacities.length > 0,
)

const hasDemands = computed(
  () =>
    demandStore.draftOrInProgress.length > 0 || demandStore.qualifiedDemands.length > 0,
)

const demandCountLabel = computed(() => {
  const drafts = demandStore.draftOrInProgress.length
  const qualified = demandStore.qualifiedDemands.length
  const parts = []
  if (qualified) parts.push(`${qualified} qualifiée${qualified > 1 ? 's' : ''}`)
  if (drafts) parts.push(`${drafts} brouillon${drafts > 1 ? 's' : ''}`)
  return parts.join(' · ') || 'aucune'
})

function openBlock(block) {
  if (block.status !== 'ready' || !block.routeName) return
  if (block.id === 'etape-0' && hasCapacities.value) {
    router.push({ name: 'capacity-liste' })
    return
  }
  if (block.id === 'etape-1') {
    const current = demandStore.currentDemand
    if (current?.status === DemandStatus.QUALIFIED) {
      router.push({ name: 'demand-succes' })
      return
    }
    if (demandStore.draftOrInProgress.length) {
      demandStore.startDraft()
      router.push({ name: 'demand-accueil' })
      return
    }
  }
  router.push({ name: block.routeName })
}

function resetFrameworkDemo() {
  frameworkStore.resetDemo()
}

function resetCapacityDemo() {
  capacityStore.resetDemo()
}

function resetDemandDemo() {
  demandStore.resetDemo()
}

function goCapacityListe() {
  router.push({ name: 'capacity-liste' })
}

function goCapacityStart() {
  capacityStore.startDraft()
  router.push({ name: 'capacity-accueil' })
}

function goDemandStart() {
  demandStore.startDraft()
  router.push({ name: 'demand-accueil' })
}
</script>

<template>
  <div class="bg-background text-on-surface font-body-md antialiased min-h-screen">
    <header
      class="sticky top-0 z-40 w-full bg-surface border-b border-surface-container flex items-center justify-between px-margin-mobile h-16"
    >
      <div class="font-headline-sm text-headline-sm text-primary font-bold tracking-tight">
        Atelier Synergy
      </div>
      <span
        class="font-label-mono text-label-mono bg-surface-container text-on-surface-variant px-2 py-1 rounded uppercase"
      >
        MVP
      </span>
    </header>

    <main class="max-w-lg mx-auto w-full px-margin-mobile py-xl pb-3xl">
      <div class="flex items-center gap-md mb-lg">
        <img
          :src="mockProfessional.avatarUrl"
          alt=""
          class="w-12 h-12 rounded-full object-cover border border-surface-container"
        />
        <div>
          <p class="font-headline-sm text-headline-sm text-primary">
            {{ mockProfessional.firstName }}
          </p>
          <p class="font-body-sm text-body-sm text-on-surface-variant">
            {{ mockProfessional.role }} · {{ mockProfessional.specialty }}
          </p>
        </div>
      </div>

      <h1 class="font-display-lg-mobile text-display-lg-mobile text-primary mb-sm">
        Blocs métier
      </h1>
      <p class="font-body-md text-body-md text-on-surface-variant mb-xl">
        Parcours MVP démontrable, bloc par bloc. Cadre, capacité, puis besoin cliente.
      </p>

      <div
        v-if="frameworkStore.isActive"
        class="mb-lg p-md rounded-xl border border-secondary-container bg-secondary-container/30 flex flex-col gap-sm"
      >
        <div class="flex items-center justify-between gap-sm">
          <span
            class="font-label-mono text-label-mono bg-secondary-container text-on-secondary-container px-2 py-1 rounded uppercase"
          >
            Cadre ACTIF
          </span>
          <button
            type="button"
            class="font-button-text text-button-text text-secondary underline-offset-2 hover:underline"
            @click="resetFrameworkDemo"
          >
            Réinitialiser
          </button>
        </div>
        <p class="font-body-sm text-body-sm text-on-surface-variant">
          PROFESSIONAL_FRAMEWORK_ACTIVE — hérité par les capacités.
        </p>
      </div>

      <div
        v-if="hasCapacities"
        class="mb-lg p-md rounded-xl border border-surface-container bg-surface-container-low flex flex-col gap-sm"
      >
        <div class="flex items-center justify-between gap-sm">
          <span
            class="font-label-mono text-label-mono bg-surface-container text-on-surface-variant px-2 py-1 rounded uppercase"
          >
            Capacité · {{ capacityCountLabel }}
          </span>
          <button
            type="button"
            class="font-button-text text-button-text text-secondary underline-offset-2 hover:underline"
            @click="resetCapacityDemo"
          >
            Réinitialiser
          </button>
        </div>
        <p class="font-body-sm text-body-sm text-on-surface-variant">
          Persisté dans localStorage (`as.mvp.capacities`).
        </p>
        <div class="flex flex-wrap gap-sm pt-xs">
          <button
            type="button"
            class="font-button-text text-button-text bg-primary text-on-primary px-3 py-2 rounded"
            @click="goCapacityListe"
          >
            Voir mes capacités
          </button>
          <button
            type="button"
            class="font-button-text text-button-text border border-outline-variant text-primary px-3 py-2 rounded"
            @click="goCapacityStart"
          >
            Nouvelle
          </button>
        </div>
      </div>

      <div
        v-if="hasDemands"
        class="mb-lg p-md rounded-xl border border-surface-container bg-surface-container-low flex flex-col gap-sm"
      >
        <div class="flex items-center justify-between gap-sm">
          <span
            class="font-label-mono text-label-mono bg-surface-container text-on-surface-variant px-2 py-1 rounded uppercase"
          >
            Demande · {{ demandCountLabel }}
          </span>
          <button
            type="button"
            class="font-button-text text-button-text text-secondary underline-offset-2 hover:underline"
            @click="resetDemandDemo"
          >
            Réinitialiser
          </button>
        </div>
        <p class="font-body-sm text-body-sm text-on-surface-variant">
          Persisté dans localStorage (`as.mvp.demands`).
        </p>
        <div class="flex flex-wrap gap-sm pt-xs">
          <button
            type="button"
            class="font-button-text text-button-text bg-primary text-on-primary px-3 py-2 rounded"
            @click="goDemandStart"
          >
            Continuer / ouvrir
          </button>
        </div>
      </div>

      <ul class="flex flex-col gap-md">
        <li v-for="block in metierBlocks" :key="block.id">
          <button
            type="button"
            class="w-full text-left rounded-xl border p-lg transition-colors"
            :class="
              block.status === 'ready'
                ? 'bg-surface-container-lowest border-surface-container hover:border-outline-variant cursor-pointer'
                : 'bg-surface-container-low border-surface-container opacity-70 cursor-not-allowed'
            "
            :disabled="block.status !== 'ready'"
            @click="openBlock(block)"
          >
            <div class="flex items-start justify-between gap-md mb-sm">
              <span
                class="font-label-mono text-label-mono text-on-surface-variant uppercase tracking-wider"
              >
                {{ block.order }}
              </span>
              <span
                class="font-label-mono text-label-mono px-2 py-0.5 rounded uppercase"
                :class="
                  block.status === 'ready'
                    ? 'bg-secondary-container text-on-secondary-container'
                    : 'bg-surface-container text-on-surface-variant'
                "
              >
                {{ block.status === 'ready' ? 'Dispo' : 'Bientôt' }}
              </span>
            </div>
            <h2 class="font-headline-sm text-headline-sm text-primary mb-xs">
              {{ block.title }}
            </h2>
            <p class="font-body-sm text-body-sm text-on-surface-variant">
              {{
                block.id === 'etape-0' && hasCapacities
                  ? `Voir la liste (${capacityCountLabel}).`
                  : block.id === 'etape-1' && hasDemands
                    ? `État : ${demandCountLabel}.`
                    : block.description
              }}
            </p>
          </button>
        </li>
      </ul>
    </main>
  </div>
</template>
