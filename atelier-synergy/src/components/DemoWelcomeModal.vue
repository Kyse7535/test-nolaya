<script setup>
defineProps({
  open: {
    type: Boolean,
    default: false,
  },
})

const emit = defineEmits(['close'])

function close() {
  emit('close')
}

const journey = ['Besoin ↔ offre', 'Appariement', 'Engagement', 'RDV', 'Paiement']
</script>

<template>
  <Teleport to="body">
    <Transition name="demo-welcome">
      <div
        v-if="open"
        class="fixed inset-0 z-[70] flex items-start justify-center bg-[#1b1c1b]/45 backdrop-blur-[2px] px-container-margin pt-[10vh]"
        role="dialog"
        aria-modal="true"
        aria-labelledby="demo-welcome-title"
        @click.self="close"
      >
        <div
          class="demo-welcome-panel relative w-full max-w-[22rem] overflow-hidden rounded-2xl border border-outline-variant/70 bg-surface-container-lowest shadow-[0_24px_48px_rgba(27,28,27,0.18)]"
        >
          <div
            class="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-secondary via-secondary-fixed to-secondary"
            aria-hidden="true"
          />

          <div class="flex flex-col gap-lg px-lg pb-lg pt-xl">
            <div class="flex flex-col gap-sm">
              <span
                class="inline-flex w-fit items-center gap-unit rounded-full border border-secondary/25 bg-secondary-container/40 px-sm py-unit font-label-sm text-label-sm uppercase tracking-[0.14em] text-on-secondary-container"
              >
                Démo de test
              </span>
              <h2
                id="demo-welcome-title"
                class="font-headline-md text-headline-md text-primary tracking-tight"
              >
                Ce n’est pas l’app finale
              </h2>
              <p class="font-body-md text-body-md text-on-surface-variant leading-relaxed">
                Explorez le parcours Nolaya pour repérer ce qui aide — ou bloque — cliente et
                coiffeuse.
              </p>
            </div>

            <div
              class="flex flex-wrap gap-unit rounded-xl bg-surface-container-low px-sm py-sm"
              aria-label="Étapes testées"
            >
              <span
                v-for="(step, index) in journey"
                :key="step"
                class="inline-flex items-center gap-unit"
              >
                <span
                  class="rounded-md bg-surface-container-lowest px-sm py-unit font-label-sm text-label-sm text-on-surface"
                >
                  {{ step }}
                </span>
                <span
                  v-if="index < journey.length - 1"
                  class="material-symbols-outlined text-[14px] text-outline"
                  aria-hidden="true"
                >
                  chevron_right
                </span>
              </span>
            </div>

            <div class="flex flex-col gap-sm">
              <div
                class="flex gap-sm rounded-xl border border-outline-variant/60 bg-surface px-md py-sm"
              >
                <span
                  class="mt-unit flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-secondary-container text-on-secondary-container"
                  aria-hidden="true"
                >
                  <span class="material-symbols-outlined text-[18px]">person</span>
                </span>
                <div class="min-w-0 flex flex-col gap-unit">
                  <span
                    class="font-label-sm text-label-sm uppercase tracking-wider text-secondary"
                  >
                    Cliente
                  </span>
                  <p class="font-body-md text-body-md text-on-surface leading-snug">
                    Clarifier le besoin, comprendre l’offre, oser s’engager.
                  </p>
                </div>
              </div>

              <div
                class="flex gap-sm rounded-xl border border-outline-variant/60 bg-surface px-md py-sm"
              >
                <span
                  class="mt-unit flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary text-on-primary"
                  aria-hidden="true"
                >
                  <span class="material-symbols-outlined text-[18px]">content_cut</span>
                </span>
                <div class="min-w-0 flex flex-col gap-unit">
                  <span
                    class="font-label-sm text-label-sm uppercase tracking-wider text-secondary"
                  >
                    Coiffeuse
                  </span>
                  <p class="font-body-md text-body-md text-on-surface leading-snug">
                    Être visible, recevoir des demandes prêtes, garder le contrôle.
                  </p>
                </div>
              </div>
            </div>

            <div class="flex flex-col gap-sm pt-unit">
              <button
                type="button"
                class="w-full rounded-xl bg-primary text-on-primary font-label-sm text-label-sm uppercase tracking-wider px-md py-3.5 hover:bg-primary/90 active:scale-[0.985] transition-all duration-200"
                @click="close"
              >
                Commencer
              </button>
              <p class="text-center font-body-sm text-body-sm text-on-surface-variant">
                Changez de rôle en haut pour les deux points de vue.
              </p>
            </div>
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<style scoped>
.demo-welcome-enter-active,
.demo-welcome-leave-active {
  transition: opacity 220ms ease;
}

.demo-welcome-enter-active .demo-welcome-panel,
.demo-welcome-leave-active .demo-welcome-panel {
  transition:
    opacity 220ms ease,
    transform 280ms cubic-bezier(0.22, 1, 0.36, 1);
}

.demo-welcome-enter-from,
.demo-welcome-leave-to {
  opacity: 0;
}

.demo-welcome-enter-from .demo-welcome-panel,
.demo-welcome-leave-to .demo-welcome-panel {
  opacity: 0;
  transform: translateY(-12px) scale(0.98);
}
</style>
