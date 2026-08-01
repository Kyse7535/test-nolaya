<script setup>
import { useRouter } from 'vue-router'
import { storeToRefs } from 'pinia'
import { COMPANION_OPTIONS, MINORS_OPTIONS } from '../../mocks/platform'
import { useFrameworkStore } from '../../stores/framework'

const router = useRouter()
const store = useFrameworkStore()
const { framework, accessReady } = storeToRefs(store)

function goBack() {
  router.push({ name: 'framework-contextes' })
}

function continueNext() {
  if (!accessReady.value) return
  router.push({ name: 'framework-communication' })
}
</script>

<template>
  <div
    class="bg-background text-on-surface font-body-md antialiased min-h-screen flex flex-col relative pb-32"
  >
    <header
      class="sticky top-0 w-full bg-surface border-b border-surface-container flex justify-between items-center px-margin-mobile h-16 z-40"
    >
      <button
        type="button"
        class="text-primary hover:bg-surface-container-low transition-colors active:scale-95 duration-150 p-2 -ml-2 rounded-full"
        @click="goBack"
      >
        <span class="material-symbols-outlined">arrow_back</span>
      </button>
      <h1 class="font-headline-sm text-headline-sm text-primary font-bold">Cadre professionnel</h1>
      <div class="w-10" />
    </header>

    <main class="flex-grow px-margin-mobile pt-lg pb-3xl max-w-lg mx-auto w-full">
      <div class="flex items-center justify-between mb-lg">
        <span
          class="inline-flex items-center px-2 py-1 rounded bg-surface-container-low text-on-surface-variant font-label-mono text-label-mono border border-surface-container"
        >
          BROUILLON
        </span>
        <span class="font-label-mono text-label-mono text-on-surface-variant">2/4</span>
      </div>

      <div class="flex items-center mb-xl">
        <div class="flex-1 h-1 bg-surface-container-high rounded-l-full">
          <div class="h-full bg-primary rounded-l-full w-full" />
        </div>
        <div class="w-2 h-2 rounded-full bg-primary mx-1" />
        <div class="flex-1 h-1 bg-surface-container-high">
          <div class="h-full bg-secondary rounded-r-full w-1/2" />
        </div>
        <div class="w-2 h-2 rounded-full bg-surface-container-high mx-1" />
        <div class="flex-1 h-1 bg-surface-container-high" />
        <div class="w-2 h-2 rounded-full bg-surface-container-high mx-1" />
        <div class="flex-1 h-1 bg-surface-container-high rounded-r-full" />
      </div>

      <section class="space-y-xl">
        <div>
          <h2 class="font-headline-md text-headline-md text-primary mb-unit">Accueil &amp; accès</h2>
          <p class="font-body-md text-body-md text-on-surface-variant">
            Ces règles s’appliquent par défaut à vos futures prestations.
          </p>
        </div>

        <div class="space-y-sm">
          <h3 class="font-button-text text-button-text text-primary">Accompagnants</h3>
          <div class="space-y-unit">
            <label
              v-for="option in COMPANION_OPTIONS"
              :key="option.id"
              class="relative flex items-center cursor-pointer group"
            >
              <input
                class="peer sr-only custom-radio"
                type="radio"
                name="accompagnants"
                :value="option.id"
                :checked="framework.companions === option.id"
                @change="store.patch({ companions: option.id })"
              />
              <div
                class="flex items-center w-full p-md bg-surface-container-lowest border border-surface-container rounded-lg transition-all"
              >
                <div
                  class="w-5 h-5 rounded-full border border-outline-variant flex items-center justify-center mr-md"
                >
                  <div class="radio-inner w-3 h-3 rounded-full bg-transparent transition-colors" />
                </div>
                <span class="font-body-md text-body-md text-on-surface">{{ option.label }}</span>
              </div>
            </label>
          </div>
        </div>

        <div class="space-y-sm">
          <h3 class="font-button-text text-button-text text-primary">Mineurs</h3>
          <div class="space-y-unit">
            <label
              v-for="option in MINORS_OPTIONS"
              :key="option.id"
              class="relative flex items-center cursor-pointer group"
            >
              <input
                class="peer sr-only custom-radio"
                type="radio"
                name="mineurs"
                :value="option.id"
                :checked="framework.minors === option.id"
                @change="store.patch({ minors: option.id })"
              />
              <div
                class="flex items-center w-full p-md bg-surface-container-lowest border border-surface-container rounded-lg transition-all"
              >
                <div
                  class="w-5 h-5 rounded-full border border-outline-variant flex items-center justify-center mr-md"
                >
                  <div class="radio-inner w-3 h-3 rounded-full bg-transparent transition-colors" />
                </div>
                <span class="font-body-md text-body-md text-on-surface">{{ option.label }}</span>
              </div>
            </label>
          </div>
        </div>

        <div class="space-y-sm">
          <label class="block font-button-text text-button-text text-primary" for="note-acces">
            Note d’accès (optionnel)
          </label>
          <textarea
            id="note-acces"
            class="w-full p-md bg-surface-container-lowest border border-surface-container rounded-lg font-body-md text-body-md text-on-surface focus:border-secondary focus:ring-2 focus:ring-secondary/20 outline-none resize-none transition-all"
            rows="3"
            maxlength="120"
            placeholder="Ex. Sonner à l’interphone, retirer les chaussures…"
            :value="framework.accessNote"
            @input="store.patch({ accessNote: $event.target.value })"
          />
        </div>
      </section>
    </main>

    <div
      class="fixed bottom-0 left-0 w-full bg-surface border-t border-surface-container p-margin-mobile z-50 shadow-[0px_-4px_12px_rgba(27,28,28,0.04)]"
    >
      <div class="max-w-lg mx-auto">
        <button
          type="button"
          class="w-full bg-primary-container text-on-primary h-12 rounded-lg font-button-text text-button-text flex items-center justify-center hover:bg-on-background transition-colors active:scale-95 duration-150"
          :class="{ 'opacity-50 cursor-not-allowed': !accessReady }"
          :disabled="!accessReady"
          @click="continueNext"
        >
          Continuer
        </button>
      </div>
    </div>
  </div>
</template>
