<script setup>
import { computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { storeToRefs } from 'pinia'
import { catalogServices, getCatalogService } from '../../mocks/catalog'
import { useCapacityStore } from '../../stores/capacity'
import { useFrameworkStore } from '../../stores/framework'

const router = useRouter()
const capacityStore = useCapacityStore()
const frameworkStore = useFrameworkStore()
const { currentCapacity, prestationReady } = storeToRefs(capacityStore)

const selectedService = computed(() =>
  getCatalogService(currentCapacity.value?.prestation?.id),
)

const previewSrc = computed(
  () =>
    selectedService.value?.previewSrc ??
    'https://lh3.googleusercontent.com/aida-public/AB6AXuAgfXrWhlBKENHSkRYQE6ybm2oibWoHA-sbFG35liHUz9w8fet2h8mgkf8CK1K0k_E3QUpdIY7ygqliNGd2ScuXlSM53nwdNer-k9btabSMzSnDURBBsmJk8vbtUc3DxD9N_5sBuUbzX8RUEULahTGzi5hObNTidQriJkdotTfOkE-_ryCMrBLm0bHVQS7vYUyQYFGX7oGgyKz5dZddCuiqnaNJJAyml4zO04m-4Ggv7ekTONfXXSyQZw',
)

const tailleOptions = computed(() => selectedService.value?.variantes?.taille ?? [])
const longueurOptions = computed(() => selectedService.value?.variantes?.longueur ?? [])
const finitionOptions = computed(() => selectedService.value?.variantes?.finition ?? [])

const variante = computed(() => currentCapacity.value?.prestation?.variante ?? {})

onMounted(() => {
  if (!capacityStore.currentCapacity) {
    capacityStore.startDraft()
  }
})

function goBack() {
  router.push({ name: 'capacity-accueil' })
}

function selectPrestation(serviceId) {
  capacityStore.setPrestation(serviceId)
}

function selectVariante(key, value) {
  capacityStore.setVariante({ [key]: value })
}

function continueNext() {
  if (!prestationReady.value) return
  router.push({ name: 'capacity-galerie' })
}
</script>

<template>
  <div
    class="bg-surface text-on-surface font-body-md antialiased min-h-screen flex flex-col pb-24 md:pb-0"
  >
    <header
      class="bg-surface fixed top-0 w-full z-50 border-b border-surface-variant flex justify-between items-center px-container-margin h-16"
    >
      <button
        type="button"
        aria-label="Retour"
        class="flex items-center justify-center w-10 h-10 -ml-2 text-primary hover:bg-surface-container-low transition-colors rounded-full active:opacity-80"
        @click="goBack"
      >
        <span class="material-symbols-outlined">arrow_back</span>
      </button>
      <h1
        class="font-headline-sm text-headline-sm font-bold text-primary flex-1 text-center truncate px-4"
      >
        Capacité professionnelle
      </h1>
      <div class="flex items-center justify-center -mr-2">
        <span
          class="font-label-technical text-label-technical text-on-surface-variant bg-surface-variant px-2 py-1 rounded-sm uppercase tracking-widest"
        >
          BROUILLON
        </span>
      </div>
    </header>

    <main class="mt-16 flex-1 w-full max-w-3xl mx-auto md:flex md:gap-8 md:pt-8 md:px-container-margin">
      <aside
        class="md:w-64 shrink-0 px-container-margin py-lg md:px-0 md:py-0 border-b border-surface-variant md:border-b-0 md:border-r"
      >
        <nav aria-label="Progress">
          <ol
            class="flex md:flex-col items-center md:items-start gap-4 md:gap-6 overflow-x-auto hide-scrollbar md:overflow-visible pb-2 md:pb-0"
            role="list"
          >
            <li class="relative flex items-center md:items-start shrink-0">
              <div class="flex items-center md:items-start gap-3">
                <span
                  class="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-secondary text-on-secondary font-label-technical text-label-technical ring-2 ring-secondary ring-offset-2 ring-offset-surface"
                >
                  1
                </span>
                <span class="font-body-md text-primary font-bold whitespace-nowrap">Prestation</span>
              </div>
              <div
                aria-hidden="true"
                class="hidden md:block absolute top-7 left-3 -ml-px h-full w-px bg-surface-variant"
              />
            </li>
            <li
              v-for="(step, index) in ['Galerie', 'Service', 'Prix', 'Lieu']"
              :key="step"
              class="relative flex items-center md:items-start shrink-0"
            >
              <div
                aria-hidden="true"
                class="hidden md:block absolute -top-5 left-3 -ml-px h-5 w-px bg-surface-variant"
              />
              <div class="flex items-center md:items-start gap-3 opacity-50">
                <span
                  class="flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-outline text-outline font-label-technical text-label-technical"
                >
                  {{ index + 2 }}
                </span>
                <span class="font-body-md text-on-surface-variant whitespace-nowrap">{{ step }}</span>
              </div>
              <div
                v-if="index < 3"
                aria-hidden="true"
                class="hidden md:block absolute top-7 left-3 -ml-px h-full w-px bg-surface-variant"
              />
            </li>
          </ol>
        </nav>
      </aside>

      <div class="flex-1 flex flex-col gap-lg px-container-margin py-lg md:px-0">
        <div
          class="bg-surface-container flex items-center gap-2 p-3 rounded-lg border border-surface-variant"
        >
          <span class="material-symbols-outlined text-secondary" style="font-variation-settings: 'FILL' 1">
            info
          </span>
          <span class="font-body-md text-on-surface-variant">
            {{
              frameworkStore.isActive
                ? 'Cadre professionnel actif — hérité'
                : 'Cadre professionnel mock — hérité'
            }}
          </span>
        </div>

        <section class="flex flex-col gap-sm">
          <h2 class="font-display-lg-mobile md:text-display-lg text-primary">
            Prestation &amp; variante
          </h2>
          <p class="font-body-md text-on-surface-variant">
            Choisissez ce que vous rendez disponible. Une capacité = une prestation identifiable.
          </p>
        </section>

        <section class="flex flex-col gap-md">
          <div class="grid grid-cols-2 gap-sm">
            <label
              v-for="service in catalogServices"
              :key="service.id"
              class="relative cursor-pointer group"
            >
              <input
                class="peer sr-only"
                type="radio"
                name="prestation"
                :value="service.id"
                :checked="currentCapacity?.prestation?.id === service.id"
                @change="selectPrestation(service.id)"
              />
              <div
                class="h-full bg-surface-container-lowest border border-surface-variant rounded-lg p-md transition-colors peer-checked:border-primary peer-checked:ring-1 peer-checked:ring-primary hover:bg-surface-container-low flex flex-col items-center justify-center text-center gap-2"
              >
                <span class="font-headline-sm text-primary text-[16px] leading-snug">
                  {{ service.label }}
                </span>
              </div>
            </label>
          </div>
        </section>

        <section class="mt-sm">
          <div
            class="w-full h-48 rounded-lg overflow-hidden border border-surface-variant relative"
          >
            <img
              :src="previewSrc"
              alt="Aperçu de la prestation sélectionnée"
              class="object-cover w-full h-full"
            />
          </div>
        </section>

        <hr class="border-t border-surface-variant w-full my-sm" />

        <section v-if="selectedService" class="flex flex-col gap-lg">
          <h3 class="font-headline-md text-headline-md text-primary">Variante</h3>

          <div v-if="tailleOptions.length" class="flex flex-col gap-sm">
            <span class="font-body-md font-semibold text-primary">Taille</span>
            <div class="flex flex-wrap gap-sm">
              <label v-for="option in tailleOptions" :key="option" class="cursor-pointer">
                <input
                  class="capacity-chip sr-only"
                  type="radio"
                  name="taille"
                  :value="option"
                  :checked="variante.taille === option"
                  @change="selectVariante('taille', option)"
                />
                <div
                  class="px-md py-2 border border-surface-variant rounded-lg font-body-md text-on-surface-variant hover:bg-surface-container-low transition-colors"
                >
                  {{ option }}
                </div>
              </label>
            </div>
          </div>

          <div v-if="longueurOptions.length" class="flex flex-col gap-sm">
            <span class="font-body-md font-semibold text-primary">Longueur</span>
            <div class="flex flex-wrap gap-sm">
              <label v-for="option in longueurOptions" :key="option" class="cursor-pointer">
                <input
                  class="capacity-chip sr-only"
                  type="radio"
                  name="longueur"
                  :value="option"
                  :checked="variante.longueur === option"
                  @change="selectVariante('longueur', option)"
                />
                <div
                  class="px-md py-2 border border-surface-variant rounded-lg font-body-md text-on-surface-variant hover:bg-surface-container-low transition-colors"
                >
                  {{ option }}
                </div>
              </label>
            </div>
          </div>

          <div v-if="finitionOptions.length" class="flex flex-col gap-sm">
            <span class="font-body-md font-semibold text-primary">Finition (optionnel)</span>
            <div class="flex flex-wrap gap-sm">
              <label v-for="option in finitionOptions" :key="option" class="cursor-pointer">
                <input
                  class="capacity-chip sr-only"
                  type="radio"
                  name="finition"
                  :value="option"
                  :checked="variante.finition === option"
                  @change="selectVariante('finition', option)"
                />
                <div
                  class="px-md py-2 border border-surface-variant rounded-lg font-body-md text-on-surface-variant hover:bg-surface-container-low transition-colors"
                >
                  {{ option }}
                </div>
              </label>
            </div>
          </div>
        </section>

        <div class="h-20 md:h-0" />
      </div>
    </main>

    <div
      class="fixed bottom-0 left-0 w-full bg-surface/90 backdrop-blur-md border-t border-surface-variant p-4 md:static md:bg-transparent md:border-none md:p-0 md:mt-lg md:mb-lg z-40"
    >
      <div class="max-w-3xl mx-auto flex justify-end md:px-container-margin">
        <button
          type="button"
          class="w-full md:w-auto bg-primary-container text-on-primary font-headline-sm text-headline-sm py-3 px-6 rounded-lg transition-opacity flex items-center justify-center gap-2"
          :class="
            prestationReady
              ? 'hover:opacity-90'
              : 'opacity-50 cursor-not-allowed'
          "
          :disabled="!prestationReady"
          @click="continueNext"
        >
          Continuer
          <span class="material-symbols-outlined">arrow_forward</span>
        </button>
      </div>
    </div>
  </div>
</template>
