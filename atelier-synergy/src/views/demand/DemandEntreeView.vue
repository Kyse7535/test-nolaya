<script setup>
import { computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { storeToRefs } from 'pinia'
import { statusBadgeLabel } from '../../domain/demand/labels'
import { EntryPath } from '../../domain/demand/model'
import { useDemandStore } from '../../stores/demand'

const router = useRouter()
const demandStore = useDemandStore()
const { currentDemand, entryReady } = storeToRefs(demandStore)

const knownImg =
  'https://lh3.googleusercontent.com/aida-public/AB6AXuDgY_mIX14IK7nCaYfHp9Ogjzlv9-F5Jh4PM3D7l9077LlTFKJAdtX2CRfzhC39qC4CdqvZtc2zubXzgV2BMZKkXSiMsI0_1P4XYb5HbFDUrdr7_ZHKeCFDlBeoIeyKy5an-Y3mn65_7ctk4DjFnrfgqNKkydIUw7su7Hey4Hb-tvwiw14QMzqGFHaxrzk0U8NM0HIoraLy7MOzoPCT9C8GeWWaPeRlz2sASNsAA9i14hbxidHKcKtr'
const catalogImg =
  'https://lh3.googleusercontent.com/aida-public/AB6AXuAfDFN60g-n3BpKDIK5VnHN-xo7omDiUyqmx_e-ygWGahGviGGD5M4emwICApedig043yG4i5rzl6IjG4oDxzIdbxiuv-BsRnOnbxsoNP7h31Vpl7cyu6sQZHczI1lM9mbYpeT4ml1mc9WxsIfhPZDJMB9RHH-lbwMAtPvUTTRtPinXzBycukRmVseukTFmDJml1Zh_QdWuePBUO3KUMfiZ4nTME7MmUND5Y8bgaCgYf9DDT_ZVTH2f'

const badge = computed(() => statusBadgeLabel(currentDemand.value?.status))
const selected = computed(() => currentDemand.value?.entryPath ?? null)

onMounted(() => {
  if (!demandStore.currentDemand) demandStore.startDraft()
  demandStore.markInProgress()
})

function goBack() {
  router.push({ name: 'demand-accueil' })
}

function select(path) {
  demandStore.setEntryPath(path)
}

function continueNext() {
  if (!entryReady.value) return
  router.push({ name: 'demand-resultat' })
}
</script>

<template>
  <div class="bg-background text-on-background font-body-lg min-h-screen flex flex-col relative pb-24">
    <header
      class="bg-background fixed top-0 w-full z-50 border-b border-surface-container-highest flex items-center justify-between px-container-margin h-16"
    >
      <button
        type="button"
        aria-label="Retour"
        class="text-primary hover:opacity-80 transition-opacity active:scale-95"
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

    <main class="flex-grow pt-24 px-container-margin pb-stack-lg max-w-2xl mx-auto w-full">
      <div class="flex items-center justify-between mb-stack-md w-full px-2">
        <div class="flex flex-col items-center">
          <div class="w-2 h-2 rounded-full bg-secondary mb-1" />
          <span class="text-label-sm font-label-sm text-secondary">Entrée</span>
        </div>
        <div class="flex-1 border-t border-surface-container-highest mx-2" />
        <div class="flex flex-col items-center opacity-50">
          <div class="w-2 h-2 rounded-full bg-outline-variant mb-1" />
          <span class="text-label-sm font-label-sm">Résultat</span>
        </div>
        <div class="flex-1 border-t border-surface-container-highest mx-2" />
        <div class="flex flex-col items-center opacity-50">
          <div class="w-2 h-2 rounded-full bg-outline-variant mb-1" />
          <span class="text-label-sm font-label-sm">Temps</span>
        </div>
      </div>

      <section class="mb-section-gap flex flex-col gap-stack-sm">
        <h2 class="text-headline-lg-mobile font-headline-lg-mobile text-on-background">
          Comment démarrer ?
        </h2>
        <p class="text-body-lg font-body-lg text-on-surface-variant">
          Choisissez le point d’entrée le plus simple pour vous.
        </p>
      </section>

      <section class="flex flex-col gap-stack-md mb-stack-lg">
        <button
          type="button"
          class="text-left bg-surface-container-lowest border rounded-lg p-container-margin flex gap-gutter items-center transition-colors"
          :class="selected === EntryPath.KNOWN ? 'border-secondary ring-1 ring-secondary' : 'border-surface-container-highest hover:bg-surface-bright'"
          @click="select(EntryPath.KNOWN)"
        >
          <div class="w-16 h-16 shrink-0 bg-surface-variant rounded overflow-hidden">
            <img class="w-full h-full object-cover" :src="knownImg" alt="" />
          </div>
          <div class="flex-1">
            <h3 class="text-headline-md font-headline-md text-on-background mb-unit">
              Je connais déjà la prestation
            </h3>
            <p class="text-body-sm font-body-sm text-on-surface-variant">
              Knotless, vanilles, twists… Je sais ce que je veux et je précise ensuite.
            </p>
          </div>
          <div
            class="w-6 h-6 rounded-full border border-outline flex items-center justify-center transition-colors"
            :class="selected === EntryPath.KNOWN ? 'border-primary bg-primary' : ''"
          >
            <span
              v-if="selected === EntryPath.KNOWN"
              class="material-symbols-outlined text-on-primary text-icon-sm"
            >
              check
            </span>
          </div>
        </button>

        <button
          type="button"
          class="text-left bg-surface-container-lowest border rounded-lg p-container-margin flex gap-gutter items-center transition-colors"
          :class="selected === EntryPath.CATALOG ? 'border-secondary ring-1 ring-secondary' : 'border-surface-container-highest hover:bg-surface-bright'"
          @click="select(EntryPath.CATALOG)"
        >
          <div class="w-16 h-16 shrink-0 bg-surface-variant rounded overflow-hidden">
            <img class="w-full h-full object-cover" :src="catalogImg" alt="" />
          </div>
          <div class="flex-1">
            <h3 class="text-headline-md font-headline-md text-on-background mb-unit">
              Je parcours le catalogue
            </h3>
            <p class="text-body-sm font-body-sm text-on-surface-variant">
              Je m’inspire d’images de styles afro pour choisir un résultat.
            </p>
          </div>
          <div
            class="w-6 h-6 rounded-full border border-outline flex items-center justify-center transition-colors"
            :class="selected === EntryPath.CATALOG ? 'border-primary bg-primary' : ''"
          >
            <span
              v-if="selected === EntryPath.CATALOG"
              class="material-symbols-outlined text-on-primary text-icon-sm"
            >
              check
            </span>
          </div>
        </button>
      </section>

      <p class="text-body-sm font-body-sm text-on-surface-variant text-center mb-section-gap">
        Les deux chemins aboutissent à la même demande structurée.
      </p>
    </main>

    <div
      class="fixed bottom-0 left-0 w-full bg-surface-container-lowest border-t border-surface-container-highest p-container-margin z-50"
    >
      <button
        type="button"
        class="w-full max-w-[672px] mx-auto bg-primary text-on-primary font-body-lg rounded-lg px-8 py-3 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-primary-container transition-colors block"
        :disabled="!entryReady"
        @click="continueNext"
      >
        Continuer
      </button>
    </div>
  </div>
</template>
