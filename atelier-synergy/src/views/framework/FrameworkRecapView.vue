<script setup>
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import { storeToRefs } from 'pinia'
import {
  addressPrivacySummary,
  communicationSummary,
  companionsSummary,
  contextsSummary,
  interruptionSummary,
  minorsSummary,
  paymentsSummary,
  photoConsentSummary,
  policySummary,
} from '../../domain/framework/labels'
import { mockProfessional } from '../../mocks/platform'
import { useFrameworkStore } from '../../stores/framework'

const router = useRouter()
const store = useFrameworkStore()
const { framework, canActivateNow } = storeToRefs(store)

const payments = computed(() => paymentsSummary(framework.value))

const sections = computed(() => [
  {
    key: 'contextes',
    icon: 'location_on',
    title: 'Contextes',
    route: 'framework-contextes',
    lines: [contextsSummary(framework.value), addressPrivacySummary(framework.value)],
  },
  {
    key: 'accueil',
    icon: 'door_front',
    title: 'Accueil & accès',
    route: 'framework-accueil-acces',
    lines: [companionsSummary(framework.value), minorsSummary(framework.value)],
  },
  {
    key: 'communication',
    icon: 'forum',
    title: 'Communication',
    route: 'framework-communication',
    lines: [communicationSummary(framework.value)],
  },
  {
    key: 'paiements',
    icon: 'payments',
    title: 'Paiements',
    route: 'framework-communication',
    lines: payments.value,
  },
  {
    key: 'politique',
    icon: 'gavel',
    title: 'Politique',
    route: 'framework-politiques',
    lines: [policySummary(framework.value)],
  },
  {
    key: 'securite',
    icon: 'security',
    title: 'Sécurité',
    route: 'framework-politiques',
    lines: [interruptionSummary(framework.value)],
  },
  {
    key: 'photos',
    icon: 'photo_camera',
    title: 'Photos',
    route: 'framework-politiques',
    lines: [photoConsentSummary(framework.value)],
    wide: true,
  },
])

function goBack() {
  router.push({ name: 'framework-politiques' })
}

function editSection(routeName) {
  router.push({ name: routeName })
}

function activate() {
  if (!store.activate()) return
  router.push({ name: 'framework-succes' })
}
</script>

<template>
  <div class="bg-background text-on-surface min-h-screen flex flex-col pb-32">
    <header
      class="bg-surface sticky top-0 w-full border-b border-surface-container flex justify-between items-center px-margin-mobile h-16 z-40"
    >
      <button
        type="button"
        class="text-primary hover:bg-surface-container-low transition-colors active:scale-95 duration-150 p-2 rounded-full flex items-center justify-center"
        @click="goBack"
      >
        <span class="material-symbols-outlined">arrow_back</span>
      </button>
      <h1
        class="font-headline-md text-headline-md text-primary font-extrabold tracking-tight"
      >
        Nolaya
      </h1>
      <button
        type="button"
        class="text-primary hover:bg-surface-container-low transition-colors active:scale-95 duration-150 p-2 rounded-full flex items-center justify-center"
      >
        <span class="material-symbols-outlined">more_vert</span>
      </button>
    </header>

    <main
      class="flex-grow w-full max-w-[1440px] mx-auto px-margin-mobile md:px-margin-desktop py-lg md:py-2xl flex flex-col gap-lg"
    >
      <div class="flex flex-col gap-sm">
        <div class="flex items-center gap-sm mb-xs">
          <img
            class="w-10 h-10 rounded-full object-cover border border-surface-container"
            :src="mockProfessional.avatarUrl"
            alt=""
          />
          <span
            class="font-label-mono text-label-mono bg-secondary-fixed text-on-secondary-fixed-variant px-2 py-1 rounded"
          >
            BROUILLON
          </span>
        </div>
        <h2 class="font-display-lg-mobile text-display-lg-mobile text-primary">
          Vérifiez votre cadre
        </h2>
        <p class="font-body-lg text-body-lg text-on-surface-variant max-w-2xl">
          Une fois activé, ce cadre s'appliquera par défaut à vos prochaines capacités.
        </p>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-md mt-sm">
        <div
          v-for="section in sections"
          :key="section.key"
          class="bg-surface-container-lowest rounded-xl border border-surface-container p-md flex flex-col justify-between hover:border-outline-variant transition-colors group"
          :class="{ 'md:col-span-2': section.wide }"
        >
          <div class="flex justify-between items-start mb-sm">
            <h3 class="font-headline-sm text-headline-sm text-primary flex items-center gap-2">
              <span class="material-symbols-outlined text-outline">{{ section.icon }}</span>
              {{ section.title }}
            </h3>
            <button
              type="button"
              class="font-button-text text-button-text text-secondary hover:text-on-secondary-container transition-colors font-bold uppercase tracking-wider"
              @click="editSection(section.route)"
            >
              Modifier
            </button>
          </div>
          <div class="flex flex-col gap-1">
            <p
              v-for="(line, index) in section.lines"
              :key="`${section.key}-${index}`"
              :class="
                index === 0
                  ? 'font-body-md text-body-md text-on-surface'
                  : 'font-body-sm text-body-sm text-on-surface-variant'
              "
            >
              {{ line }}
            </p>
          </div>
        </div>
      </div>

      <div class="mt-lg p-md bg-surface-container-low rounded-xl border border-surface-container">
        <label class="flex items-start gap-md cursor-pointer group">
          <div class="relative flex items-center justify-center mt-1">
            <input
              class="peer appearance-none w-5 h-5 border-2 border-outline rounded bg-surface-container-lowest checked:bg-primary checked:border-primary focus:ring-2 focus:ring-secondary focus:ring-opacity-20 transition-all cursor-pointer"
              type="checkbox"
              :checked="framework.confirmed"
              @change="store.patch({ confirmed: $event.target.checked })"
            />
            <span
              class="material-symbols-outlined absolute text-on-primary opacity-0 peer-checked:opacity-100 pointer-events-none text-[16px]"
            >
              check
            </span>
          </div>
          <span
            class="font-body-md text-body-md text-on-surface group-hover:text-primary transition-colors select-none"
          >
            Je confirme que ce cadre représente ma façon réelle de travailler
          </span>
        </label>
      </div>
    </main>

    <div
      class="fixed bottom-0 left-0 w-full bg-surface/95 backdrop-blur-sm border-t border-surface-container px-margin-mobile md:px-margin-desktop py-md z-50 flex flex-col md:flex-row gap-sm md:justify-end ghost-shadow"
    >
      <button
        type="button"
        class="w-full md:w-auto px-xl py-3 rounded text-secondary font-button-text text-button-text font-bold uppercase tracking-wider hover:bg-surface-container-low transition-colors min-h-[44px]"
        @click="goBack"
      >
        Revenir
      </button>
      <button
        type="button"
        class="w-full md:w-auto px-xl py-3 rounded bg-primary text-on-primary font-button-text text-button-text font-bold tracking-wider hover:bg-primary-container transition-colors min-h-[44px] flex justify-center items-center"
        :class="{ 'opacity-50 cursor-not-allowed': !canActivateNow }"
        :disabled="!canActivateNow"
        @click="activate"
      >
        Activer mon cadre
      </button>
    </div>
  </div>
</template>
