<script setup>
import { computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import {
  appointmentStatusBadge,
  appointmentStatusCode,
  actionStatusLabel,
  ownerLabel,
} from '../../domain/appointment/labels'
import { ActionOwner, AppointmentStatus } from '../../domain/appointment/model'
import { useAppointmentStore } from '../../stores/appointment'

const router = useRouter()
const appointmentStore = useAppointmentStore()

const engagement = computed(() => appointmentStore.currentEngagement)
const progress = computed(() => appointmentStore.blockingProgress)
const clientProgress = computed(() => appointmentStore.clientBlockingProgress)
const proProgress = computed(() => appointmentStore.proBlockingProgress)
const remaining = computed(() => appointmentStore.remainingBlocking)
const status = computed(
  () =>
    appointmentStore.currentAppointment?.status ??
    AppointmentStatus.READINESS_PENDING,
)

onMounted(() => {
  appointmentStore.ensureDemoSeed()
  if (appointmentStore.currentAppointment?.status === AppointmentStatus.READY) {
    router.replace({ name: 'appointment-ready' })
  }
})

function goBack() {
  router.push({ name: 'appointment-accueil' })
}

function goClientChecklist() {
  router.push({ name: 'appointment-checklist-cliente' })
}

function goProChecklist() {
  router.push({ name: 'appointment-checklist-coiffeuse' })
}
</script>

<template>
  <div class="bg-background text-on-background antialiased min-h-screen pb-24">
    <header
      class="flex items-center justify-between px-margin-mobile w-full h-16 bg-surface border-b border-surface-container-highest sticky top-0 z-40"
    >
      <button
        type="button"
        aria-label="Retour"
        class="w-10 h-10 flex items-center justify-center text-on-surface-variant hover:bg-surface-container transition-colors rounded-full active:opacity-70"
        @click="goBack"
      >
        <span class="material-symbols-outlined">arrow_back</span>
      </button>
      <h1 class="font-headline-sm text-headline-sm font-semibold text-primary">
        Plan de préparation
      </h1>
      <div class="w-10" />
    </header>

    <main class="px-margin-mobile pt-stack-md flex flex-col gap-stack-lg max-w-3xl mx-auto">
      <section class="flex flex-col gap-stack-sm">
        <div class="flex items-center justify-between gap-2 flex-wrap">
          <h2 class="font-display-lg text-display-lg text-primary">Plan de préparation</h2>
          <div class="bg-surface-container px-3 py-1 rounded inline-flex items-center gap-2">
            <span class="w-2 h-2 rounded-full bg-secondary" />
            <span
              class="font-label-mono text-label-mono text-on-surface-variant uppercase tracking-wider"
            >
              {{ appointmentStatusBadge(status) }}
            </span>
          </div>
        </div>
        <p class="font-body-md text-body-md text-on-surface-variant">
          Progression basée uniquement sur les actions bloquantes.
        </p>
        <div class="mt-2">
          <div class="flex justify-between items-end mb-2">
            <span class="font-label-mono text-label-mono text-on-surface-variant">
              {{ appointmentStatusCode(status) }}
            </span>
            <span class="font-label-mono text-label-mono text-primary font-bold">
              {{ progress.percent }}%
            </span>
          </div>
          <div class="h-1 w-full bg-surface-container-highest rounded-full overflow-hidden">
            <div
              class="h-full bg-primary rounded-full transition-all duration-300"
              :style="{ width: `${progress.percent}%` }"
            />
          </div>
          <p class="font-caption text-caption text-on-surface-variant mt-2 text-right">
            {{ progress.confirmed }} sur {{ progress.total }} actions bloquantes confirmées
          </p>
          <div class="flex gap-4 mt-2">
            <span class="font-label-mono text-[11px] text-on-surface-variant">
              Confirmées · {{ progress.confirmed }}
            </span>
            <span class="font-label-mono text-[11px] text-on-surface-variant">
              À faire · {{ progress.remaining }}
            </span>
          </div>
        </div>
      </section>

      <section
        v-if="engagement"
        class="bg-surface-container-lowest border border-surface-container p-4 rounded-lg flex gap-4 items-center relative overflow-hidden"
      >
        <div class="w-16 h-16 shrink-0 rounded overflow-hidden bg-surface-container">
          <img
            v-if="engagement.thumbnailUrl"
            class="w-full h-full object-cover"
            alt=""
            :src="engagement.thumbnailUrl"
          />
        </div>
        <div class="flex-1 flex flex-col justify-center min-w-0">
          <h3 class="font-headline-sm text-headline-sm text-primary">
            {{ engagement.serviceLabel }}
          </h3>
          <div
            class="flex items-center gap-2 mt-1 font-body-md text-body-md text-on-surface-variant"
          >
            <span class="material-symbols-outlined text-[16px]">calendar_today</span>
            <span>{{ engagement.dateLabel }}, {{ engagement.startTime }}</span>
          </div>
          <div class="flex items-center gap-2 mt-2 font-body-md text-body-md text-primary">
            <span class="font-medium">{{ engagement.clientDisplayName }}</span>
            <span class="material-symbols-outlined text-[14px] text-outline">sync_alt</span>
            <span class="font-medium">{{ engagement.proDisplayName }}</span>
          </div>
        </div>
      </section>

      <section class="flex flex-col gap-stack-md">
        <h3 class="font-headline-md text-headline-md text-primary">Accéder aux checklists</h3>
        <div class="grid grid-cols-2 gap-gutter-mobile">
          <button
            type="button"
            class="bg-surface-container-lowest border border-surface-container rounded-lg p-4 flex flex-col justify-between hover:bg-surface transition-colors active:scale-[0.98] text-left"
            @click="goClientChecklist"
          >
            <div class="flex justify-between items-start mb-4 w-full">
              <div
                class="w-10 h-10 rounded-full bg-surface-container flex items-center justify-center text-primary"
              >
                <span class="material-symbols-outlined">person</span>
              </div>
              <span class="font-label-mono text-label-mono text-on-surface-variant">
                {{ clientProgress.confirmed }}/{{ clientProgress.total }}
              </span>
            </div>
            <div>
              <h4 class="font-headline-sm text-headline-sm text-primary mb-1">
                Checklist cliente
              </h4>
              <p class="font-caption text-caption text-on-surface-variant">
                {{ clientProgress.confirmed }} / {{ clientProgress.total }} bloquantes confirmées
              </p>
            </div>
          </button>

          <button
            type="button"
            class="bg-surface-container-lowest border border-surface-container rounded-lg p-4 flex flex-col justify-between hover:bg-surface transition-colors active:scale-[0.98] text-left"
            @click="goProChecklist"
          >
            <div class="flex justify-between items-start mb-4 w-full">
              <div
                class="w-10 h-10 rounded-full bg-secondary-container flex items-center justify-center text-secondary"
              >
                <span class="material-symbols-outlined">content_cut</span>
              </div>
              <span class="font-label-mono text-label-mono text-on-surface-variant">
                {{ proProgress.confirmed }}/{{ proProgress.total }}
              </span>
            </div>
            <div>
              <h4 class="font-headline-sm text-headline-sm text-primary mb-1">
                Checklist coiffeuse
              </h4>
              <p class="font-caption text-caption text-on-surface-variant">
                {{ proProgress.confirmed }} / {{ proProgress.total }} bloquantes confirmées
              </p>
            </div>
          </button>
        </div>
      </section>

      <section class="flex flex-col gap-stack-md pb-stack-lg">
        <h3
          class="font-headline-md text-headline-md text-primary border-b border-surface-container-highest pb-2"
        >
          Restant à confirmer
        </h3>
        <ul v-if="remaining.length" class="flex flex-col">
          <li
            v-for="action in remaining"
            :key="action.id"
            class="flex items-start gap-4 py-3 border-b border-surface-container-highest last:border-0"
          >
            <div class="mt-1">
              <span class="material-symbols-outlined text-outline">radio_button_unchecked</span>
            </div>
            <div class="flex-1 min-w-0">
              <p class="font-body-lg text-body-lg text-primary">{{ action.title }}</p>
              <div class="flex items-center gap-2 mt-1">
                <span
                  class="font-label-mono text-label-mono"
                  :class="
                    action.owner === ActionOwner.PRO
                      ? 'text-secondary'
                      : 'text-on-surface-variant'
                  "
                >
                  {{ ownerLabel(action.owner) }}
                </span>
              </div>
            </div>
            <div class="bg-surface-container px-2 py-1 rounded shrink-0">
              <span class="font-label-mono text-[10px] text-primary tracking-wide">
                {{ actionStatusLabel(action.status) }}
              </span>
            </div>
          </li>
        </ul>
        <p v-else class="font-body-md text-body-md text-on-surface-variant">
          Toutes les actions bloquantes sont confirmées.
        </p>
        <p class="font-caption text-caption text-on-surface-variant text-center mt-2">
          Les actions informatives n’empêchent pas le passage à READY. READY = 100 % des actions
          bloquantes confirmées.
        </p>
      </section>
    </main>
  </div>
</template>
