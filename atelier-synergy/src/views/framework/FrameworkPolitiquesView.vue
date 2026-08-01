<script setup>
import { useRouter } from 'vue-router'
import { storeToRefs } from 'pinia'
import {
  INTERRUPTION_OPTIONS,
  PHOTO_CONSENT_OPTIONS,
  platformPolicies,
} from '../../mocks/platform'
import { useFrameworkStore } from '../../stores/framework'

const router = useRouter()
const store = useFrameworkStore()
const { framework, policiesReady } = storeToRefs(store)

const heroSrc =
  'https://lh3.googleusercontent.com/aida-public/AB6AXuB9yaCD8urGJ9Ku5urilxB-_mTCuJrrTAWB-OmOANde2pB54WWDHmNpoHTfMueATocBM0s_WkxBkQpwoNQQ2evARYTGFOBl82sSM6vPCyHo4oR8ep9dkRCeWWCTTPLE-JCtCOOYUng2QmTJt-Gc4ARcoIdPsRmknp-2CQPs1t9Q05ATWNxVq_JPF1iyAXBhH9P_cth4YQsSVw3DoX9wS47AhwsazazVJUQUtnoDToamuiNxjoCjeDn5iw'

function goBack() {
  router.push({ name: 'framework-communication' })
}

function continueNext() {
  if (!policiesReady.value) return
  router.push({ name: 'framework-recap' })
}
</script>

<template>
  <div class="text-on-background font-body-md min-h-screen flex flex-col pb-32 bg-background">
    <header
      class="bg-surface text-primary font-headline-sm text-headline-sm sticky top-0 border-b border-surface-container flex justify-between items-center px-margin-mobile h-14 w-full z-50"
    >
      <button
        type="button"
        aria-label="Retour"
        class="flex items-center justify-center p-2 rounded-full hover:bg-surface-container-low transition-colors"
        @click="goBack"
      >
        <span class="material-symbols-outlined">arrow_back</span>
      </button>
      <h1 class="font-bold">Cadre professionnel</h1>
      <div
        class="font-label-mono text-label-mono bg-surface-container text-on-surface-variant px-3 py-1 rounded-full uppercase tracking-wider"
      >
        BROUILLON
      </div>
    </header>

    <main class="flex-grow max-w-[1440px] mx-auto w-full px-margin-mobile md:px-margin-desktop py-lg">
      <div class="flex items-center justify-between mb-lg">
        <div class="flex-1 h-1 bg-surface-container rounded-full overflow-hidden">
          <div class="h-full bg-secondary w-full" />
        </div>
        <span class="font-label-mono text-label-mono ml-4 text-secondary">Étape 4 sur 4</span>
      </div>

      <div class="grid grid-cols-4 md:grid-cols-8 lg:grid-cols-12 gap-gutter">
        <div class="col-span-4 md:col-span-8 lg:col-span-8 lg:col-start-3">
          <h2 class="font-display-lg-mobile text-display-lg-mobile mb-2">
            Politiques &amp; sécurité
          </h2>
          <p class="font-body-lg text-body-lg text-on-surface-variant mb-xl">
            Définissez vos règles de fonctionnement générales.
          </p>

          <div
            class="w-full h-64 md:h-96 rounded-xl overflow-hidden mb-xl border border-surface-container"
          >
            <img alt="Portfolio editorial image" class="w-full h-full object-cover" :src="heroSrc" />
          </div>

          <div class="space-y-2xl">
            <section>
              <h3 class="font-headline-md text-headline-md mb-md">
                Politique de retard &amp; annulation
              </h3>
              <div class="grid grid-cols-1 md:grid-cols-3 gap-md">
                <button
                  v-for="policy in platformPolicies"
                  :key="policy.id"
                  type="button"
                  class="text-left border rounded-xl p-md bg-surface-container-lowest cursor-pointer transition-colors"
                  :class="
                    framework.policyId === policy.id
                      ? 'border-secondary shadow-[0px_4px_12px_rgba(27,28,28,0.04)]'
                      : 'border-surface-container hover:border-outline-variant group'
                  "
                  @click="store.patch({ policyId: policy.id })"
                >
                  <div class="flex items-center justify-between mb-sm">
                    <span
                      class="font-button-text text-button-text"
                      :class="framework.policyId === policy.id ? 'text-secondary' : ''"
                    >
                      {{ policy.label }}
                    </span>
                    <div
                      class="w-5 h-5 rounded-full flex items-center justify-center"
                      :class="
                        framework.policyId === policy.id
                          ? 'border-2 border-secondary'
                          : 'border border-outline group-hover:border-secondary'
                      "
                    >
                      <div
                        v-if="framework.policyId === policy.id"
                        class="w-2.5 h-2.5 bg-secondary rounded-full"
                      />
                    </div>
                  </div>
                  <p class="font-body-sm text-body-sm text-on-surface-variant">
                    {{ policy.description }}
                  </p>
                </button>
              </div>
            </section>

            <section>
              <h3 class="font-headline-md text-headline-md mb-md">Interruption de prestation</h3>
              <div class="space-y-sm">
                <label
                  v-for="option in INTERRUPTION_OPTIONS"
                  :key="option.id"
                  class="flex items-start p-md border border-surface-container rounded-lg bg-surface-container-lowest cursor-pointer hover:border-outline-variant"
                >
                  <input
                    class="mt-1 mr-md text-secondary focus:ring-secondary/20"
                    type="radio"
                    name="interruption"
                    :checked="framework.interruption === option.id"
                    @change="store.patch({ interruption: option.id })"
                  />
                  <span class="font-body-md text-body-md">{{ option.label }}</span>
                </label>
              </div>
            </section>

            <section>
              <h3 class="font-headline-md text-headline-md mb-md">Consentement photos</h3>
              <div class="space-y-sm">
                <label
                  v-for="option in PHOTO_CONSENT_OPTIONS"
                  :key="option.id"
                  class="flex items-start p-md border border-surface-container rounded-lg bg-surface-container-lowest cursor-pointer hover:border-outline-variant"
                >
                  <input
                    class="mt-1 mr-md text-secondary focus:ring-secondary/20"
                    type="radio"
                    name="consent"
                    :checked="framework.photoConsent === option.id"
                    @change="store.patch({ photoConsent: option.id })"
                  />
                  <span class="font-body-md text-body-md">{{ option.label }}</span>
                </label>
              </div>
            </section>

            <p
              class="font-body-sm text-body-sm text-on-surface-variant italic border-l-2 border-surface-container pl-md"
            >
              <span class="material-symbols-outlined text-lg align-bottom mr-1">info</span>
              Vous pourrez préciser une prestation plus tard ; ici c’est le cadre général.
            </p>
          </div>
        </div>
      </div>
    </main>

    <div
      class="fixed bottom-0 left-0 w-full bg-surface/90 backdrop-blur-md border-t border-surface-container p-4 md:p-6 z-40 flex justify-center"
    >
      <button
        type="button"
        class="bg-primary text-on-primary font-button-text text-button-text h-11 px-8 rounded flex items-center justify-center hover:bg-on-surface-variant transition-colors w-full md:w-auto min-w-[200px]"
        :class="{ 'opacity-50 cursor-not-allowed': !policiesReady }"
        :disabled="!policiesReady"
        @click="continueNext"
      >
        Voir le récapitulatif
      </button>
    </div>
  </div>
</template>
