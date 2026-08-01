<script setup>
import { useRouter } from 'vue-router'
import { storeToRefs } from 'pinia'
import {
  PAYMENT_OPTIONS,
  RESPONSE_DELAY_OPTIONS,
  WEEKDAYS,
} from '../../mocks/platform'
import { useFrameworkStore } from '../../stores/framework'

const router = useRouter()
const store = useFrameworkStore()
const { framework, communicationReady } = storeToRefs(store)

const sideImage =
  'https://lh3.googleusercontent.com/aida-public/AB6AXuB-SbUGqT_VnO7hlRjbur0BUr7z6GEcoZTZVM_57BMRFByFmaUaJdwlcyODNFuEvDB37YXNN38WoSxqiHv8t_fjfMPmMZG_yw8PIZhiIfs4dI5L-8j3pnqeqJcz-DlfLvEp9i4w-SY82vqwPnfdrTu5SmFgNuozQi2aHrd7OPTGXFqvUGqQ9LDz6-R32ujTnpRTQjaxWEFEi_-AMzu3YgTVLY-sjqLrrpdGgNfXUKFc_qBNXLn2HZoiMw'

function goBack() {
  router.push({ name: 'framework-accueil-acces' })
}

function continueNext() {
  if (!communicationReady.value) return
  router.push({ name: 'framework-politiques' })
}
</script>

<template>
  <div class="text-on-surface font-body-md min-h-screen flex flex-col pb-24 md:pb-0 bg-background">
    <header
      class="bg-surface fixed top-0 w-full z-50 border-b border-surface-variant flex justify-between items-center px-margin-mobile md:px-margin-desktop h-16 transition-colors"
    >
      <button
        type="button"
        aria-label="Retour"
        class="flex items-center justify-center p-2 rounded-full hover:bg-surface-container-low active:scale-95 transition-transform duration-150 text-primary"
        @click="goBack"
      >
        <span class="material-symbols-outlined text-[24px]">arrow_back</span>
      </button>
      <h1 class="font-headline-sm text-headline-sm font-bold text-primary flex-1 text-center">
        Cadre professionnel
      </h1>
      <div class="flex items-center">
        <span
          class="font-label-mono text-label-mono bg-surface-container text-on-surface-variant px-2 py-1 rounded"
        >
          BROUILLON
        </span>
      </div>
    </header>

    <main
      class="flex-1 mt-16 max-w-[1440px] mx-auto w-full grid grid-cols-4 md:grid-cols-8 lg:grid-cols-12 gap-gutter px-margin-mobile md:px-margin-desktop py-xl"
    >
      <div class="col-span-4 md:col-span-8 lg:col-span-6 xl:col-span-5 flex flex-col gap-2xl">
        <div class="flex items-center gap-2">
          <div class="flex-1 h-1 bg-surface-container rounded-full overflow-hidden">
            <div class="h-full bg-primary w-full" />
          </div>
          <div class="flex-1 h-1 bg-surface-container rounded-full overflow-hidden">
            <div class="h-full bg-primary w-full" />
          </div>
          <div class="flex-1 h-1 bg-surface-container rounded-full overflow-hidden">
            <div class="h-full bg-secondary w-full" />
          </div>
          <div class="flex-1 h-1 bg-surface-container rounded-full overflow-hidden">
            <div class="h-full bg-transparent w-full" />
          </div>
          <span class="font-label-mono text-label-mono text-on-surface-variant ml-2">3/4</span>
        </div>

        <section
          class="flex flex-col gap-lg bg-surface-container-lowest p-lg rounded-xl border border-surface-variant"
        >
          <div>
            <h2 class="font-headline-md text-headline-md text-primary mb-2">Communication</h2>
            <p class="font-body-md text-body-md text-on-surface-variant">
              Quand les clientes peuvent vous écrire, et en combien de temps vous répondez.
            </p>
          </div>

          <div class="flex flex-col gap-sm">
            <label class="font-body-sm text-body-sm text-on-surface-variant font-semibold">
              Jours de disponibilité
            </label>
            <div class="flex flex-wrap gap-2">
              <div v-for="day in WEEKDAYS" :key="day.id" class="relative">
                <input
                  :id="`day-${day.id}`"
                  class="chip-checkbox peer sr-only"
                  type="checkbox"
                  :checked="framework.communicationDays.includes(day.id)"
                  @change="store.toggleInArray('communicationDays', day.id)"
                />
                <label
                  class="cursor-pointer font-label-mono text-label-mono px-4 py-2 rounded-full border border-outline-variant bg-surface-container-lowest text-on-surface hover:bg-surface-container-low transition-colors inline-block"
                  :for="`day-${day.id}`"
                >
                  {{ day.label }}
                </label>
              </div>
            </div>
          </div>

          <div class="flex flex-col gap-sm">
            <label class="font-body-sm text-body-sm text-on-surface-variant font-semibold">
              Délai de réponse indicatif
            </label>
            <div class="flex flex-col gap-2">
              <div v-for="option in RESPONSE_DELAY_OPTIONS" :key="option.id" class="relative">
                <input
                  :id="`delay-${option.id}`"
                  class="delay-radio peer sr-only"
                  type="radio"
                  name="delay"
                  :checked="framework.responseDelay === option.id"
                  @change="store.patch({ responseDelay: option.id })"
                />
                <label
                  class="cursor-pointer flex items-center p-4 border border-outline-variant rounded-lg bg-surface-container-lowest hover:bg-surface-container-low transition-all"
                  :for="`delay-${option.id}`"
                >
                  <span class="font-body-md text-body-md">{{ option.label }}</span>
                  <span
                    class="material-symbols-outlined ml-auto text-secondary transition-opacity"
                    :class="framework.responseDelay === option.id ? 'opacity-100' : 'opacity-0'"
                  >
                    check_circle
                  </span>
                </label>
              </div>
            </div>
          </div>
        </section>

        <section
          class="flex flex-col gap-lg bg-surface-container-lowest p-lg rounded-xl border border-surface-variant"
        >
          <div>
            <h2 class="font-headline-md text-headline-md text-primary mb-2">Paiement</h2>
            <p class="font-body-md text-body-md text-on-surface-variant">
              Moyens que vous acceptez (information, pas de paiement ici).
            </p>
          </div>
          <div class="flex flex-col gap-2">
            <label
              v-for="option in PAYMENT_OPTIONS"
              :key="option.id"
              class="flex items-center gap-3 p-4 border border-outline-variant rounded-lg bg-surface-container-lowest cursor-pointer hover:bg-surface-container-low transition-colors"
            >
              <input
                class="w-5 h-5 text-primary bg-surface-container-lowest border-outline-variant rounded focus:ring-primary focus:ring-2"
                type="checkbox"
                :checked="framework.paymentMethods.includes(option.id)"
                @change="store.toggleInArray('paymentMethods', option.id)"
              />
              <span class="font-body-md text-body-md">{{ option.label }}</span>
            </label>
          </div>
        </section>

        <div class="h-20 md:hidden" />
      </div>

      <div class="hidden lg:block lg:col-span-6 xl:col-span-7 h-full">
        <div class="sticky top-24 h-[calc(100vh-8rem)] rounded-xl overflow-hidden shadow-sm">
          <img class="w-full h-full object-cover" :src="sideImage" alt="" />
        </div>
      </div>
    </main>

    <div
      class="fixed bottom-0 left-0 w-full bg-surface/90 backdrop-blur-sm border-t border-surface-variant p-4 md:p-6 z-40 lg:hidden"
    >
      <div class="max-w-[1440px] mx-auto flex justify-end px-0 md:px-margin-desktop">
        <button
          type="button"
          class="w-full md:w-auto bg-primary text-on-primary font-button-text text-button-text py-3 px-8 rounded-lg hover:bg-inverse-surface transition-colors active:scale-95 duration-150 shadow-sm min-h-[44px]"
          :class="{ 'opacity-50 cursor-not-allowed': !communicationReady }"
          :disabled="!communicationReady"
          @click="continueNext"
        >
          Continuer
        </button>
      </div>
    </div>

    <div
      class="hidden lg:flex max-w-[1440px] mx-auto w-full px-margin-desktop py-lg justify-end col-span-12"
    >
      <button
        type="button"
        class="bg-primary text-on-primary font-button-text text-button-text py-3 px-8 rounded-lg hover:bg-inverse-surface transition-colors active:scale-95 duration-150 shadow-sm min-h-[44px]"
        :class="{ 'opacity-50 cursor-not-allowed': !communicationReady }"
        :disabled="!communicationReady"
        @click="continueNext"
      >
        Continuer
      </button>
    </div>
  </div>
</template>
