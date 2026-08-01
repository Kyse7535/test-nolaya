<script setup>
import { onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { AppointmentStatus } from '../../domain/appointment/model'
import { APPOINTMENT_HERO_ACCUEIL } from '../../mocks/appointmentSeed'
import { useAppointmentStore } from '../../stores/appointment'

const router = useRouter()
const appointmentStore = useAppointmentStore()

const pillars = [
  {
    icon: 'map',
    title: 'Plan commun',
    body: 'Voir la progression des actions bloquantes partagées.',
  },
  {
    icon: 'fact_check',
    title: 'Checklist cliente',
    body: 'Confirmer ses obligations de préparation (ex. mèches, adresse).',
  },
  {
    icon: 'inventory_2',
    title: 'Checklist coiffeuse',
    body: 'Confirmer son matériel et sa disponibilité opérationnelle.',
  },
  {
    icon: 'done_all',
    title: 'READY',
    body: 'Obtenir le statut partagé : le rendez-vous peut se réaliser.',
    accent: true,
  },
]

onMounted(() => {
  appointmentStore.ensureDemoSeed()
})

function goBack() {
  router.push({ name: 'home' })
}

function goPlan() {
  appointmentStore.ensureDemoSeed()
  if (appointmentStore.currentAppointment?.status === AppointmentStatus.READY) {
    router.push({ name: 'appointment-ready' })
    return
  }
  router.push({ name: 'appointment-plan' })
}
</script>

<template>
  <div
    class="bg-background text-on-background font-body-lg min-h-screen pb-[100px] selection:bg-surface-dim"
  >
    <header
      class="fixed top-0 w-full z-50 bg-background border-b border-surface-container flex items-center h-16 px-margin-mobile"
    >
      <button
        type="button"
        aria-label="Retour"
        class="mr-4 text-on-surface-variant hover:bg-surface-container-low transition-colors active:opacity-70 rounded-full p-2 -ml-2"
        @click="goBack"
      >
        <span class="material-symbols-outlined">arrow_back</span>
      </button>
      <h1 class="font-headline-sm text-headline-sm text-primary">Préparation</h1>
    </header>

    <main class="pt-[88px] px-margin-mobile flex flex-col gap-stack-lg max-w-2xl mx-auto">
      <section class="flex flex-col gap-stack-sm mt-4">
        <div
          class="inline-flex items-center self-start px-2 py-1 bg-surface-container-low rounded border border-surface-container-high"
        >
          <span class="font-label-mono text-label-mono text-primary uppercase">
            EN PRÉPARATION
          </span>
        </div>
        <h2 class="font-display-lg text-display-lg text-primary mt-2">
          Rendre le rendez-vous réellement prêt
        </h2>
        <p class="font-body-lg text-body-lg text-on-surface-variant mt-2 max-w-prose">
          L’engagement est formé. Il reste à confirmer les actions bloquantes de préparation —
          côté cliente et côté coiffeuse. Quand toutes sont validées, le rendez-vous passe à READY
          : on peut réaliser.
        </p>
      </section>

      <div
        class="flex items-center gap-2 py-3 px-4 bg-surface-container-lowest rounded-lg border border-surface-container"
      >
        <span class="material-symbols-outlined text-secondary">info</span>
        <span class="font-body-md text-body-md text-on-surface-variant">
          Prestation mock : knotless / box braids · Engagement COMMITTED
        </span>
      </div>

      <div class="relative w-full h-[300px] rounded-lg overflow-hidden group">
        <img
          alt="Préparation du rendez-vous"
          class="w-full h-full object-cover rounded-lg group-hover:scale-105 transition-transform duration-700 ease-out"
          :src="APPOINTMENT_HERO_ACCUEIL"
        />
        <div
          class="absolute inset-0 bg-gradient-to-t from-primary/80 via-primary/20 to-transparent flex items-end p-6"
        >
          <p class="text-on-primary font-headline-md text-headline-md max-w-[280px]">
            Prêt à réaliser, pas seulement confirmé.
          </p>
        </div>
      </div>

      <section class="flex flex-col gap-stack-md mt-4">
        <h3 class="font-headline-sm text-headline-sm text-primary mb-2">
          Ce que vous allez faire
        </h3>
        <div class="grid grid-cols-1 gap-gutter-mobile">
          <div
            v-for="pillar in pillars"
            :key="pillar.title"
            class="bg-surface-container-lowest p-5 rounded-lg border border-surface-container flex flex-col gap-3"
          >
            <div
              class="w-10 h-10 rounded-full flex items-center justify-center"
              :class="
                pillar.accent
                  ? 'bg-secondary-container text-on-secondary-container'
                  : 'bg-surface-container-low text-primary'
              "
            >
              <span class="material-symbols-outlined">{{ pillar.icon }}</span>
            </div>
            <div>
              <h4 class="font-headline-sm text-[16px] font-semibold text-primary">
                {{ pillar.title }}
              </h4>
              <p class="font-body-md text-body-md text-on-surface-variant mt-1">
                {{ pillar.body }}
              </p>
            </div>
          </div>
        </div>
      </section>

      <p class="font-caption text-caption text-on-surface-variant text-center my-6 px-4">
        Pas d’alerte AT_RISK dans cette démo. Seules les actions bloquantes comptent pour READY.
      </p>
    </main>

    <div
      class="fixed bottom-0 left-0 w-full p-margin-mobile pb-safe bg-gradient-to-t from-background via-background to-transparent z-40"
    >
      <div class="max-w-2xl mx-auto">
        <button
          type="button"
          class="w-full bg-primary-container text-on-primary font-headline-sm text-[16px] py-4 rounded-lg flex items-center justify-center gap-2 hover:bg-opacity-90 active:scale-[0.98] transition-all shadow-sm"
          @click="goPlan"
        >
          <span>Voir le plan de préparation</span>
          <span class="material-symbols-outlined text-[20px]">arrow_forward</span>
        </button>
      </div>
    </div>
  </div>
</template>
