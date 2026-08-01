<script setup>
import { computed, onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'
import { storeToRefs } from 'pinia'
import { proofLevelLabel, prestationSummary } from '../../domain/capacity/labels'
import { ProofLevel } from '../../domain/capacity/model'
import { getCatalogService } from '../../mocks/catalog'
import { useCapacityStore } from '../../stores/capacity'

const router = useRouter()
const capacityStore = useCapacityStore()
const { currentCapacity, galleryReady, prestationReady } = storeToRefs(capacityStore)

const showPicker = ref(false)
const fileInput = ref(null)

const gallery = computed(() => currentCapacity.value?.gallery ?? [])
const contextChip = computed(() => prestationSummary(currentCapacity.value))

const availableMocks = computed(() => {
  const service = getCatalogService(currentCapacity.value?.prestation?.id)
  const usedSrcs = new Set(gallery.value.map((item) => item.src))
  return (service?.galleryMocks ?? []).filter((mock) => !usedSrcs.has(mock.src))
})

onMounted(() => {
  if (!capacityStore.currentCapacity) {
    capacityStore.startDraft()
  }
  if (!prestationReady.value) {
    router.replace({ name: 'capacity-prestation' })
  }
})

function goBack() {
  router.push({ name: 'capacity-prestation' })
}

function openPicker() {
  showPicker.value = true
}

function closePicker() {
  showPicker.value = false
}

function addMock(mock) {
  capacityStore.addGalleryItem({
    src: mock.src,
    proofLevel: mock.proofLevel ?? ProofLevel.DECLARED_REALIZATION,
  })
  showPicker.value = false
}

function triggerUpload() {
  fileInput.value?.click()
}

function onFileChange(event) {
  const file = event.target.files?.[0]
  if (!file || !file.type.startsWith('image/')) return

  const reader = new FileReader()
  reader.onload = () => {
    if (typeof reader.result === 'string') {
      capacityStore.addGalleryItem({
        src: reader.result,
        proofLevel: ProofLevel.DECLARED_REALIZATION,
      })
      showPicker.value = false
    }
  }
  reader.readAsDataURL(file)
  event.target.value = ''
}

function removeItem(id) {
  capacityStore.removeGalleryItem(id)
}

function toggleProof(id) {
  capacityStore.toggleGalleryProofLevel(id)
}

function continueNext() {
  if (!galleryReady.value) return
  router.push({ name: 'capacity-service' })
}
</script>

<template>
  <div
    class="flex flex-col bg-background text-on-background font-body-md antialiased h-[calc(100dvh-var(--as-role-bar)-var(--as-bottom-nav)-env(safe-area-inset-bottom,0px))]"
  >
    <header
      class="shrink-0 z-50 flex items-center justify-between px-container-margin h-14 w-full bg-surface border-b border-outline-variant"
    >
      <button
        type="button"
        class="flex items-center justify-center w-10 h-10 -ml-2 text-primary hover:bg-surface-container rounded-full transition-colors"
        @click="goBack"
      >
        <span class="material-symbols-outlined">arrow_back</span>
      </button>
      <h1 class="text-headline-sm font-bold text-primary truncate px-2 flex-1 text-center">
        Capacité Professionnelle
      </h1>
      <div
        class="px-2 py-1 bg-surface-container-highest rounded-sm border border-outline-variant"
      >
        <span
          class="font-label-technical text-label-technical text-on-surface-variant font-medium tracking-wider uppercase"
        >
          BROUILLON
        </span>
      </div>
    </header>

    <main
      class="flex-1 min-h-0 overflow-y-auto px-container-margin pt-md pb-md flex flex-col gap-lg max-w-3xl mx-auto w-full"
    >
      <section class="flex flex-col gap-md">
        <div
          class="inline-flex self-start items-center px-3 py-1.5 bg-surface-container-high rounded-full border border-outline-variant"
        >
          <span class="material-symbols-outlined text-[16px] mr-2 text-on-surface-variant">
            content_cut
          </span>
          <span class="font-label-caps text-label-caps text-on-surface">
            {{ contextChip }}
          </span>
        </div>

        <div class="flex items-center w-full gap-2">
          <div class="h-1 flex-1 bg-primary rounded-full" />
          <div class="h-1 flex-1 bg-primary rounded-full" />
          <div class="h-1 flex-1 bg-surface-variant rounded-full" />
          <div class="h-1 flex-1 bg-surface-variant rounded-full" />
          <div class="h-1 flex-1 bg-surface-variant rounded-full" />
        </div>

        <div class="pt-sm">
          <h2 class="font-headline-md text-headline-md text-on-surface mb-2">
            Galerie de la prestation
          </h2>
          <p class="font-body-md text-body-md text-on-surface-variant">
            Montrez cette prestation. Chaque photo indique si c’est une réalisation déclarée ou une
            inspiration.
          </p>
        </div>
      </section>

      <section class="grid grid-cols-2 gap-3">
        <div
          v-for="item in gallery"
          :key="item.id"
          class="relative aspect-square bg-surface-container border border-outline-variant group"
        >
          <img :src="item.src" alt="" class="w-full h-full object-cover" />
          <div class="absolute top-2 left-2 right-12">
            <button
              type="button"
              class="inline-block px-2 py-1 bg-surface/90 backdrop-blur-sm border border-outline-variant font-label-technical text-label-technical text-on-surface truncate max-w-full text-left"
              :title="'Basculer le niveau de preuve'"
              @click="toggleProof(item.id)"
            >
              {{
                item.proofLevel === ProofLevel.REFERENCE_INSPIRATION
                  ? 'Inspiration / référence'
                  : proofLevelLabel(item.proofLevel)
              }}
            </button>
          </div>
          <button
            type="button"
            class="absolute top-2 right-2 w-8 h-8 flex items-center justify-center bg-surface/90 backdrop-blur-sm border border-outline-variant text-on-surface-variant hover:text-error transition-colors"
            @click="removeItem(item.id)"
          >
            <span class="material-symbols-outlined text-[18px]">close</span>
          </button>
        </div>

        <button
          type="button"
          class="relative aspect-square bg-surface-bright border-2 border-dashed border-outline-variant hover:border-primary hover:bg-surface-container-low transition-colors flex flex-col items-center justify-center gap-2 group cursor-pointer"
          @click="openPicker"
        >
          <div
            class="w-10 h-10 rounded-full bg-surface-container flex items-center justify-center text-on-surface-variant group-hover:text-primary transition-colors"
          >
            <span class="material-symbols-outlined">add_a_photo</span>
          </div>
          <span
            class="font-body-md text-body-md text-on-surface-variant group-hover:text-on-surface transition-colors font-medium"
          >
            Ajouter une photo
          </span>
        </button>
      </section>

      <div
        class="flex items-start gap-3 p-4 bg-surface-container-low border border-outline-variant rounded-sm mt-4"
      >
        <span class="material-symbols-outlined text-on-surface-variant mt-0.5">info</span>
        <p class="font-body-md text-body-md text-on-surface-variant">
          Pas de validation opérateur. Les photos sont publiées dans votre brouillon. Touchez le
          badge pour basculer réalisation / inspiration.
        </p>
      </div>
    </main>

    <div
      class="shrink-0 w-full px-container-margin pt-md pb-md bg-surface border-t border-outline-variant z-40"
    >
      <button
        type="button"
        class="w-full h-12 bg-primary text-on-primary font-body-lg text-body-lg font-semibold rounded flex items-center justify-center hover:bg-on-surface transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        :disabled="!galleryReady"
        @click="continueNext"
      >
        Continuer
      </button>
    </div>

    <div
      v-if="showPicker"
      class="fixed inset-0 z-[60] bg-black/40 flex items-end sm:items-center justify-center p-container-margin"
      @click.self="closePicker"
    >
      <div
        class="w-full max-w-md bg-surface rounded-lg border border-outline-variant p-md flex flex-col gap-md"
      >
        <div class="flex items-center justify-between">
          <h3 class="font-headline-sm text-headline-sm text-primary">Ajouter une photo</h3>
          <button
            type="button"
            class="w-8 h-8 flex items-center justify-center rounded-full hover:bg-surface-container"
            @click="closePicker"
          >
            <span class="material-symbols-outlined">close</span>
          </button>
        </div>

        <div v-if="availableMocks.length" class="grid grid-cols-3 gap-sm">
          <button
            v-for="mock in availableMocks"
            :key="mock.id"
            type="button"
            class="aspect-square overflow-hidden border border-outline-variant hover:border-primary"
            @click="addMock(mock)"
          >
            <img :src="mock.src" alt="" class="w-full h-full object-cover" />
          </button>
        </div>
        <p v-else class="font-body-md text-body-md text-on-surface-variant">
          Toutes les photos mock de cette prestation sont déjà ajoutées.
        </p>

        <button
          type="button"
          class="w-full py-3 border border-outline-variant rounded font-body-md text-body-md font-semibold text-primary hover:bg-surface-container-low"
          @click="triggerUpload"
        >
          Importer depuis l’appareil
        </button>
        <input
          ref="fileInput"
          type="file"
          accept="image/*"
          class="hidden"
          @change="onFileChange"
        />
      </div>
    </div>
  </div>
</template>
