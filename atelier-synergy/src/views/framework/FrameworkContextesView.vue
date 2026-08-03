<script setup>
import { useRouter } from 'vue-router'
import { storeToRefs } from 'pinia'
import {
  ADDRESS_PRIVACY_OPTIONS,
  CONTEXT_OPTIONS,
} from '../../mocks/platform'
import { useFrameworkStore } from '../../stores/framework'

const router = useRouter()
const store = useFrameworkStore()
const { framework, contextsReady } = storeToRefs(store)

const heroSrc =
  'https://lh3.googleusercontent.com/aida-public/AB6AXuAZvMrv5NV8KIyJa0U53SuO-BOXsOqp_Fb9Sd7O_eCoJp7MqY4w53tHMtR4MpB7ldVpAKlkOj-yB_HDEQO-6MpOtHL--lGPTBHr1xOABaWv2LM4tpAR8-K8XpuHRXrS55wRJ24kZkszAoZziclxkdQ9rVAWZzng68GNvkL4Oi3j0vAqRJHPyM7U4K_dqpVMNGbwk2bvvhriH6_w_dFaMQ0prKpbzZJctQOehvF9OpjWOKPEsco08SPaYw'

function goBack() {
  router.push({ name: 'framework-accueil' })
}

function continueNext() {
  if (!contextsReady.value) return
  router.push({ name: 'framework-accueil-acces' })
}
</script>

<template>
  <div
    class="bg-background text-on-background font-body-md antialiased pt-16 pb-3xl selection:bg-secondary selection:text-white"
  >
    <header
      class="fixed top-0 w-full z-50 bg-surface border-b border-surface-variant flex justify-between items-center px-margin-mobile h-16"
    >
      <button
        type="button"
        class="text-on-surface-variant hover:bg-surface-container-low transition-colors rounded-full p-2 -ml-2 active:scale-95 duration-150 flex items-center justify-center h-10 w-10"
        @click="goBack"
      >
        <span class="material-symbols-outlined text-on-background">arrow_back</span>
      </button>
      <h1 class="font-headline-sm text-headline-sm font-bold text-primary">Cadre professionnel</h1>
      <div class="flex items-center">
        <span
          class="font-label-mono text-label-mono bg-surface-container px-2 py-1 rounded text-on-surface-variant"
        >
          BROUILLON
        </span>
      </div>
    </header>

    <main
      class="max-w-[720px] mx-auto px-margin-mobile md:px-0 pt-lg relative grid grid-cols-1 md:grid-cols-12 gap-gutter"
    >
      <aside class="hidden md:block md:col-span-3 pt-xl sticky top-24 h-[calc(100vh-6rem)]">
        <nav aria-label="Progress">
          <ol class="overflow-hidden" role="list">
            <li class="relative pb-8">
              <div
                aria-hidden="true"
                class="absolute top-4 left-4 -ml-px h-full w-0.5 bg-surface-variant"
              />
              <div class="relative flex items-start group">
                <span class="h-9 flex items-center">
                  <span
                    class="relative z-10 w-8 h-8 flex items-center justify-center bg-secondary rounded-full"
                  >
                    <span class="text-white font-label-mono text-label-mono">1</span>
                  </span>
                </span>
                <span class="ml-4 min-w-0 flex flex-col">
                  <span class="font-button-text text-button-text text-secondary tracking-wide">
                    Contextes
                  </span>
                </span>
              </div>
            </li>
            <li class="relative pb-8">
              <div
                aria-hidden="true"
                class="absolute top-4 left-4 -ml-px h-full w-0.5 bg-surface-variant"
              />
              <div class="relative flex items-start group">
                <span class="h-9 flex items-center">
                  <span
                    class="relative z-10 w-8 h-8 flex items-center justify-center bg-surface-container border-2 border-surface-variant rounded-full"
                  >
                    <span class="text-on-surface-variant font-label-mono text-label-mono">2</span>
                  </span>
                </span>
                <span class="ml-4 min-w-0 flex flex-col">
                  <span class="font-body-sm text-body-sm text-on-surface-variant">Accueil</span>
                </span>
              </div>
            </li>
            <li class="relative pb-8">
              <div
                aria-hidden="true"
                class="absolute top-4 left-4 -ml-px h-full w-0.5 bg-surface-variant"
              />
              <div class="relative flex items-start group">
                <span class="h-9 flex items-center">
                  <span
                    class="relative z-10 w-8 h-8 flex items-center justify-center bg-surface-container border-2 border-surface-variant rounded-full"
                  >
                    <span class="text-on-surface-variant font-label-mono text-label-mono">3</span>
                  </span>
                </span>
                <span class="ml-4 min-w-0 flex flex-col">
                  <span class="font-body-sm text-body-sm text-on-surface-variant">Communication</span>
                </span>
              </div>
            </li>
            <li class="relative">
              <div class="relative flex items-start group">
                <span class="h-9 flex items-center">
                  <span
                    class="relative z-10 w-8 h-8 flex items-center justify-center bg-surface-container border-2 border-surface-variant rounded-full"
                  >
                    <span class="text-on-surface-variant font-label-mono text-label-mono">4</span>
                  </span>
                </span>
                <span class="ml-4 min-w-0 flex flex-col">
                  <span class="font-body-sm text-body-sm text-on-surface-variant">Politiques</span>
                </span>
              </div>
            </li>
          </ol>
        </nav>
      </aside>

      <div class="md:col-span-9 flex flex-col space-y-xl">
        <div class="md:hidden flex items-center justify-center space-x-2 pt-4">
          <div class="h-2 w-8 bg-secondary rounded-full" />
          <div class="h-2 w-8 bg-surface-variant rounded-full" />
          <div class="h-2 w-8 bg-surface-variant rounded-full" />
          <div class="h-2 w-8 bg-surface-variant rounded-full" />
        </div>

        <div class="w-full h-48 md:h-64 rounded-xl overflow-hidden bg-surface-container">
          <img class="w-full h-full object-cover" :src="heroSrc" alt="" />
        </div>

        <div class="space-y-lg">
          <div class="space-y-sm">
            <h2 class="font-headline-md text-headline-md text-primary">Contextes d’exercice</h2>
            <p class="font-body-md text-body-md text-on-surface-variant">
              Indiquez où vous acceptez d’exercer en général. Les lieux précis d’une prestation se
              définiront plus tard.
            </p>
          </div>

          <div class="space-y-md">
            <label
              v-for="option in CONTEXT_OPTIONS"
              :key="option.id"
              class="relative flex cursor-pointer rounded-xl border border-surface-variant bg-white p-4 hover:border-outline-variant transition-colors group has-[:checked]:border-secondary has-[:checked]:bg-[#fdfbf6]"
            >
              <div class="flex flex-1 items-center justify-between">
                <div class="flex flex-col">
                  <span class="font-button-text text-button-text text-on-surface">
                    {{ option.label }}
                  </span>
                  <span class="font-body-sm text-body-sm text-on-surface-variant mt-1">
                    {{ option.description }}
                  </span>
                </div>
                <div class="ml-4 flex h-6 items-center">
                  <input
                    class="h-5 w-5 rounded border-outline-variant text-secondary focus:ring-secondary/20 focus:ring-offset-0 bg-transparent transition-all"
                    type="checkbox"
                    :checked="framework.contexts.includes(option.id)"
                    @change="store.toggleInArray('contexts', option.id)"
                  />
                </div>
              </div>
            </label>
          </div>

          <p class="font-body-sm text-body-sm text-on-surface-variant flex items-center">
            <span class="material-symbols-outlined text-icon-sm mr-2">info</span>
            Choisissez au moins un contexte.
          </p>
        </div>

        <div class="space-y-lg border-t border-surface-variant pt-lg mt-lg">
          <h3 class="font-headline-sm text-headline-sm text-primary">
            Confidentialité de l’adresse
          </h3>
          <div class="space-y-md">
            <label
              v-for="option in ADDRESS_PRIVACY_OPTIONS"
              :key="option.id"
              class="relative flex cursor-pointer rounded-xl border border-surface-variant bg-white p-4 hover:border-outline-variant transition-colors group has-[:checked]:border-secondary has-[:checked]:bg-[#fdfbf6]"
            >
              <div class="flex flex-1 items-center justify-between">
                <span class="font-button-text text-button-text text-on-surface">
                  {{ option.label }}
                </span>
                <div class="ml-4 flex h-6 items-center">
                  <input
                    class="h-5 w-5 border-outline-variant text-secondary focus:ring-secondary/20 focus:ring-offset-0 bg-transparent transition-all"
                    type="radio"
                    name="privacy"
                    :checked="framework.addressPrivacy === option.id"
                    @change="store.patch({ addressPrivacy: option.id })"
                  />
                </div>
              </div>
            </label>
          </div>
        </div>
      </div>
    </main>

    <div
      class="fixed bottom-0 w-full bg-surface border-t border-surface-variant p-4 z-40 shadow-[0px_-4px_12px_rgba(27,28,28,0.02)]"
    >
      <div class="max-w-[720px] mx-auto flex justify-end">
        <button
          type="button"
          class="bg-primary-container text-white font-button-text text-button-text px-6 h-11 rounded transition-opacity flex items-center justify-center min-w-[120px]"
          :class="contextsReady ? 'hover:bg-tertiary shadow-sm' : 'opacity-50 cursor-not-allowed hover:opacity-60'"
          :disabled="!contextsReady"
          @click="continueNext"
        >
          Continuer
        </button>
      </div>
    </div>
    <div class="h-24" />
  </div>
</template>
