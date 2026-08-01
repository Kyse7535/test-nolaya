<script setup>
import { computed, onMounted, onUnmounted, ref } from 'vue'
import { useRouter } from 'vue-router'
import {
  actionStatusLabel,
  appointmentStatusBadge,
  criticalityLabel,
} from '../../domain/appointment/labels'
import {
  ActionCriticality,
  ActionStatus,
  AppointmentStatus,
  DemoRole,
} from '../../domain/appointment/model'
import { APPOINTMENT_CHECKLIST_CLIENT_HERO } from '../../mocks/appointmentSeed'
import { useAppointmentStore } from '../../stores/appointment'

const router = useRouter()
const appointmentStore = useAppointmentStore()

const engagement = computed(() => appointmentStore.currentEngagement)
const isPro = computed(() => appointmentStore.demoRole === DemoRole.PRO)
const canEdit = computed(() => !isPro.value)
const blocking = computed(() =>
  appointmentStore.clientActions.filter(
    (a) => a.criticality === ActionCriticality.BLOCKING,
  ),
)
const informative = computed(() =>
  appointmentStore.clientActions.filter(
    (a) => a.criticality === ActionCriticality.INFORMATIVE,
  ),
)
const progress = computed(() => appointmentStore.clientBlockingProgress)
const status = computed(
  () =>
    appointmentStore.currentAppointment?.status ??
    AppointmentStatus.READINESS_PENDING,
)

const remindSent = ref(false)
let remindTimer = null

onMounted(() => {
  appointmentStore.ensureDemoSeed()
  if (appointmentStore.currentAppointment?.status === AppointmentStatus.READY) {
    router.replace({ name: 'appointment-ready' })
  }
})

onUnmounted(() => {
  if (remindTimer) clearTimeout(remindTimer)
})

function goBack() {
  router.push({ name: 'appointment-plan' })
}

function confirm(actionId) {
  if (!canEdit.value) return
  appointmentStore.confirmAction(actionId)
  if (appointmentStore.currentAppointment?.status === AppointmentStatus.READY) {
    router.push({ name: 'appointment-ready' })
  }
}

function remindClient() {
  if (!isPro.value) return
  remindSent.value = true
  if (remindTimer) clearTimeout(remindTimer)
  remindTimer = setTimeout(() => {
    remindSent.value = false
    remindTimer = null
  }, 3200)
}
</script>

<template>
  <div
    class="bg-background text-on-background min-h-screen"
    :class="isPro ? 'pb-52' : 'pb-40'"
  >
    <div
      v-if="remindSent"
      class="fixed top-20 left-1/2 z-[70] w-[calc(100%-2rem)] max-w-lg -translate-x-1/2 rounded-lg border border-primary-container bg-primary-container px-4 py-3 text-on-primary shadow-md"
      role="status"
      aria-live="polite"
    >
      <p class="font-body-md text-body-md flex items-start gap-2">
        <span class="material-symbols-outlined text-[20px] shrink-0">notifications_active</span>
        <span>
          Notification envoyée à
          {{ engagement?.clientDisplayName || 'la cliente' }}
          <span class="font-label-mono text-[10px] uppercase tracking-wider opacity-80">
            (mock)
          </span>
        </span>
      </p>
    </div>

    <header
      class="fixed top-0 w-full z-50 bg-surface border-b border-surface-container flex items-center h-16 px-margin-mobile"
    >
      <button
        type="button"
        aria-label="Retour"
        class="mr-3 text-on-surface-variant hover:bg-surface-container-low rounded-full p-2 -ml-2"
        @click="goBack"
      >
        <span class="material-symbols-outlined">arrow_back</span>
      </button>
      <h1 class="font-headline-sm text-headline-sm text-primary flex-1">Checklist cliente</h1>
      <span
        v-if="isPro"
        class="font-label-mono text-[10px] uppercase tracking-wider bg-secondary-container text-on-secondary-container px-2 py-1 rounded mr-2"
      >
        Lecture seule
      </span>
      <span
        class="font-label-mono text-[10px] uppercase tracking-wider bg-surface-container text-on-surface-variant px-2 py-1 rounded"
      >
        {{ appointmentStatusBadge(status) }}
      </span>
    </header>

    <main class="pt-20 px-margin-mobile max-w-lg mx-auto flex flex-col">
      <div class="mb-stack-md">
      </div>

      <p class="font-body-md text-body-md text-on-surface-variant mt-2">
        <template v-if="isPro">
          Vue lecture seule de la préparation cliente. Seule la cliente peut confirmer ses
          actions.
        </template>
        <template v-else>
          Confirmez chaque action lorsque c’est fait. Les actions bloquantes sont indispensables
          pour READY.
        </template>
      </p>
      <p
        v-if="engagement"
        class="font-label-mono text-[11px] text-on-surface-variant mt-2 uppercase tracking-wider"
      >
        {{ engagement.serviceLabel }} · {{ engagement.dateLabel }} ·
        {{ engagement.placeLabel }}
      </p>

      <div class="mt-4 rounded-lg overflow-hidden w-full h-48 bg-surface-container mb-stack-lg">
        <img
          alt="Préparation cliente"
          class="w-full h-full object-cover"
          :src="APPOINTMENT_CHECKLIST_CLIENT_HERO"
        />
      </div>

      <section class="mb-stack-lg">
        <h2
          class="font-headline-sm text-headline-sm text-on-surface mb-stack-md flex items-center gap-2 border-b border-surface-container pb-2"
        >
          <span class="material-symbols-outlined text-error">warning</span>
          Actions bloquantes
        </h2>
        <div class="flex flex-col gap-gutter-mobile">
          <div
            v-for="action in blocking"
            :key="action.id"
            class="rounded-lg p-4 border border-surface-container shadow-sm flex flex-col gap-stack-sm"
            :class="
              action.status === ActionStatus.CONFIRMED
                ? 'bg-surface-container-low opacity-80'
                : 'bg-surface'
            "
          >
            <div class="flex items-center gap-2 mb-1 flex-wrap">
              <span
                class="font-label-mono text-[10px] uppercase tracking-wider bg-error-container text-on-error-container px-1.5 py-0.5 rounded"
              >
                {{ criticalityLabel(action.criticality) }}
              </span>
              <span
                class="font-label-mono text-[10px] uppercase tracking-wider px-1.5 py-0.5 rounded flex items-center gap-1"
                :class="
                  action.status === ActionStatus.CONFIRMED
                    ? 'bg-surface-container-high text-on-surface'
                    : 'border border-surface-container text-on-surface-variant'
                "
              >
                <span
                  v-if="action.status === ActionStatus.CONFIRMED"
                  class="material-symbols-outlined text-[12px]"
                >
                  done_all
                </span>
                {{ actionStatusLabel(action.status) }}
              </span>
            </div>
            <h3
              class="font-headline-sm text-[16px] text-on-surface"
              :class="
                action.status === ActionStatus.CONFIRMED
                  ? 'line-through decoration-surface-variant'
                  : ''
              "
            >
              {{ action.title }}
            </h3>
            <p
              v-if="action.helper"
              class="font-body-md text-caption text-on-surface-variant mt-1"
            >
              {{ action.helper }}
            </p>
            <button
              v-if="canEdit && action.status === ActionStatus.TO_DO"
              type="button"
              class="mt-2 w-full bg-primary text-on-primary font-caption text-caption py-2.5 rounded hover:bg-opacity-90 transition-opacity flex items-center justify-center gap-2"
              @click="confirm(action.id)"
            >
              <span class="material-symbols-outlined text-[18px]">check_circle</span>
              Confirmer
            </button>
          </div>
        </div>
      </section>

      <section class="mb-stack-lg">
        <h2
          class="font-headline-sm text-[16px] text-on-surface-variant mb-stack-md flex items-center gap-2"
        >
          <span class="material-symbols-outlined text-[20px]">info</span>
          Actions informatives
        </h2>
        <div class="flex flex-col gap-2">
          <div
            v-for="action in informative"
            :key="action.id"
            class="flex items-center gap-3 py-3 px-4 bg-surface rounded-lg border border-surface-container"
          >
            <button
              v-if="canEdit"
              type="button"
              class="material-symbols-outlined text-secondary text-[20px]"
              :aria-label="
                action.status === ActionStatus.CONFIRMED
                  ? 'Déjà confirmée'
                  : 'Confirmer action informative'
              "
              @click="
                action.status === ActionStatus.TO_DO ? confirm(action.id) : undefined
              "
            >
              {{
                action.status === ActionStatus.CONFIRMED
                  ? 'check_box'
                  : 'check_box_outline_blank'
              }}
            </button>
            <span
              v-else
              class="material-symbols-outlined text-secondary text-[20px]"
              aria-hidden="true"
            >
              {{
                action.status === ActionStatus.CONFIRMED
                  ? 'check_box'
                  : 'check_box_outline_blank'
              }}
            </span>
            <div class="flex-1">
              <p class="font-body-md text-body-md text-on-surface">{{ action.title }}</p>
            </div>
            <span
              class="font-label-mono text-[10px] uppercase tracking-wider text-secondary"
            >
              INFO
            </span>
          </div>
        </div>
        <p class="font-caption text-[11px] text-on-surface-variant mt-6 text-center italic">
          <template v-if="isPro">
            Seule la cliente peut cocher ces actions.
          </template>
          <template v-else>
            Pas de preuve photo dans cette démo — une confirmation suffit.
          </template>
        </p>
      </section>
    </main>

    <div
      class="fixed bottom-0 w-full max-w-lg left-1/2 -translate-x-1/2 bg-surface border-t border-surface-container p-4 pb-safe flex flex-col gap-3 z-40"
    >
      <div class="flex justify-between items-center px-1">
        <span class="font-body-md text-body-md text-on-surface-variant">
          Bloquantes confirmées :
        </span>
        <span class="font-label-mono text-label-mono text-on-surface font-bold">
          {{ progress.confirmed }} / {{ progress.total }}
        </span>
      </div>
      <div class="w-full bg-surface-container rounded-full h-1.5 mb-1 overflow-hidden">
        <div
          class="bg-primary h-1.5 rounded-full transition-all duration-300"
          :style="{
            width:
              progress.total === 0
                ? '0%'
                : `${(progress.confirmed / progress.total) * 100}%`,
          }"
        />
      </div>
      <button
        v-if="isPro"
        type="button"
        class="w-full bg-primary text-on-primary font-headline-sm text-[16px] py-3 rounded-lg flex items-center justify-center gap-2 hover:bg-opacity-90 transition-opacity"
        @click="remindClient"
      >
        <span class="material-symbols-outlined text-[20px]">notifications</span>
        Rappeler la cliente
      </button>
      <button
        type="button"
        class="w-full bg-surface-container text-on-surface border border-outline-variant font-headline-sm text-[16px] py-3 rounded-lg flex items-center justify-center gap-2 hover:bg-surface-container-high transition-colors"
        @click="goBack"
      >
        <span class="material-symbols-outlined text-[20px]">arrow_back</span>
        Retour au plan
      </button>
    </div>
  </div>
</template>
