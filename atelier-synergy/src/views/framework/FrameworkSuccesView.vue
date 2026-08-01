<script setup>
import { onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useFrameworkStore } from '../../stores/framework'

const router = useRouter()
const store = useFrameworkStore()

const heroSrc =
  'https://lh3.googleusercontent.com/aida-public/AB6AXuB2jVHbtpVjLwgvAAZNY2rayx3prDOy-zFeoVVqOFcIGebXrxXSo7HumQCqepYrcecmzwvhQOiP1j0Do25fkvZyVNCmdSVpgwXFkx04dauVRrDfK___v8DbKQf11w1c-2MDgbE9VaIFEBZoPafdclx_EIrtO59c5paqEOk98r6XMEB4j30vfupLXKIAP_zMDdXHbOAh21zHP1Q9TS-zEYnHA-e15IFa8gUHZjgvag4tqD5PN8YOnVqEkQ'

onMounted(() => {
  if (!store.isActive) {
    router.replace({ name: 'framework-accueil' })
  }
})

function goHome() {
  router.push({ name: 'home' })
}
</script>

<template>
  <div
    class="bg-background text-on-background font-body-md min-h-screen flex flex-col relative antialiased selection:bg-secondary-container selection:text-on-secondary-container"
  >
    <header
      class="bg-surface sticky top-0 w-full border-b border-surface-container flex justify-between items-center px-margin-mobile h-16 z-20"
    >
      <button
        type="button"
        class="text-primary hover:bg-surface-container-low transition-colors active:scale-95 duration-150 p-2 -ml-2 rounded-full flex items-center justify-center"
        @click="goHome"
      >
        <span class="material-symbols-outlined">arrow_back</span>
      </button>
      <div class="font-headline-sm text-headline-sm text-primary font-bold tracking-tight">
        Atelier Synergy
      </div>
      <button
        type="button"
        class="text-on-surface-variant hover:bg-surface-container-low transition-colors active:scale-95 duration-150 p-2 -mr-2 rounded-full flex items-center justify-center"
      >
        <span class="material-symbols-outlined">more_vert</span>
      </button>
    </header>

    <main
      class="flex-1 flex flex-col items-center px-margin-mobile pt-lg pb-[180px] overflow-y-auto"
    >
      <div
        class="w-full max-w-sm h-72 rounded-xl overflow-hidden mb-xl border border-surface-container shrink-0"
      >
        <img class="w-full h-full object-cover" :src="heroSrc" alt="" />
      </div>

      <div class="flex flex-col items-center mb-lg gap-xs">
        <span
          class="font-label-mono text-label-mono bg-secondary-container text-on-secondary-container px-sm py-[2px] rounded tracking-widest uppercase"
        >
          ACTIF
        </span>
        <span class="font-label-mono text-label-mono text-outline uppercase tracking-wider">
          PROFESSIONAL_FRAMEWORK_ACTIVE
        </span>
      </div>

      <div class="flex flex-col items-center text-center max-w-sm gap-sm">
        <h1 class="font-display-lg-mobile text-display-lg-mobile text-primary">
          Votre cadre est actif
        </h1>
        <p class="font-body-md text-body-md text-on-surface-variant px-sm">
          Vous avez défini comment vous exercez. Vous pouvez maintenant rendre une prestation
          disponible.
        </p>
      </div>
    </main>

    <div
      class="fixed bottom-0 left-0 w-full bg-surface border-t border-surface-container p-margin-mobile flex flex-col gap-sm pb-8 z-20"
    >
      <button
        type="button"
        class="w-full h-11 bg-primary text-on-primary rounded-lg font-button-text text-button-text flex items-center justify-center hover:bg-primary-container active:scale-95 transition-all duration-150 opacity-60 cursor-not-allowed"
        disabled
        title="Étape 0 — bientôt"
      >
        Ouvrir une capacité
      </button>
      <button
        type="button"
        class="w-full h-11 border border-secondary text-secondary bg-surface-container-lowest rounded-lg font-button-text text-button-text flex items-center justify-center hover:bg-surface-container-low active:scale-95 transition-all duration-150"
        @click="goHome"
      >
        Voir mon cadre
      </button>
    </div>
  </div>
</template>
