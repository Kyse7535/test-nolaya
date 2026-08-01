<script setup>
import { computed, onMounted } from 'vue'
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
} from '../../domain/appointment/model'
import { APPOINTMENT_PRO_AVATAR } from '../../mocks/appointmentSeed'
import { useAppointmentStore } from '../../stores/appointment'

const router = useRouter()
const appointmentStore = useAppointmentStore()

const engagement = computed(() => appointmentStore.currentEngagement)
const blocking = computed(() =>
  appointmentStore.proActions.filter(
    (a) => a.criticality === ActionCriticality.BLOCKING,
  ),
)
const informative = computed(() =>
  appointmentStore.proActions.filter(
    (a) => a.criticality === ActionCriticality.INFORMATIVE,
  ),
)
const progress = computed(() => appointmentStore.proBlockingProgress)
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
  router.push({ name: 'appointment-plan' })
}

function confirm(actionId) {
  appointmentStore.confirmAction(actionId)
  if (appointmentStore.currentAppointment?.status === AppointmentStatus.READY) {
    router.push({ name: 'appointment-ready' })
  }
}
</script>

<template>
  <div class="bg-background text-on-background min-h-screen pb-48">
    <header
      class="fixed top-0 w-full z-50 bg-surface border-b border-surface-container-highest flex items-center h-16 px-margin-mobile"
    >
      <button
        type="button"
        aria-label="Retour"
        class="mr-3 text-primary hover:bg-surface-container rounded-full p-2 -ml-2"
        @click="goBack"
      >
        <span class="material-symbols-outlined">arrow_back</span>
      </button>
      <h1 class="font-headline-sm text-headline-sm text-primary flex-1">
        Checklist coiffeuse
      </h1>
      <span
        class="font-label-mono text-[10px] uppercase tracking-wider bg-surface-container text-on-surface-variant px-2 py-1 rounded"
      >
        {{ appointmentStatusBadge(status) }}
      </span>
    </header>

    <main class="pt-20 px-margin-mobile max-w-lg mx-auto flex flex-col gap-stack-lg">
      <section class="flex flex-col gap-2">
        <p class="font-body-md text-body-md text-on-surface-variant">
          Validez votre préparation opérationnelle. Sans les actions bloquantes, le RDV ne peut pas
          passer à READY.
        </p>
        <div
          v-if="engagement"
          class="flex items-center gap-3 py-3 px-3 bg-surface-container-lowest rounded-lg border border-surface-container"
        >
          <div class="w-12 h-12 rounded-full overflow-hidden bg-surface-container shrink-0">
            <img
              :alt="engagement.proDisplayName"
              class="w-full h-full object-cover"
              :src="APPOINTMENT_PRO_AVATAR"
            />
          </div>
          <div>
            <span class="font-headline-sm text-primary">{{ engagement.proDisplayName }}</span>
            <p class="font-label-mono text-[11px] text-on-surface-variant mt-0.5">
              {{ engagement.serviceLabel }} · {{ engagement.dateLabel }}
            </p>
          </div>
        </div>
      </section>

      <section class="flex flex-col">
        <h2 class="font-headline-sm text-primary mb-4 flex items-center gap-2">
          <span class="material-symbols-outlined text-[20px] text-error">warning</span>
          Actions bloquantes
        </h2>
        <div
          class="flex flex-col bg-surface rounded-xl border border-surface-container-highest overflow-hidden"
        >
          <div
            v-for="action in blocking"
            :key="action.id"
            class="p-4 flex flex-col gap-3 border-b border-surface-container-highest last:border-0"
            :class="
              action.status === ActionStatus.CONFIRMED
                ? 'bg-surface-container-low opacity-70'
                : ''
            "
          >
            <div class="flex justify-between items-start gap-4">
              <div class="flex flex-col gap-1 flex-1 min-w-0">
                <div class="flex items-center gap-2 flex-wrap mb-1">
                  <span
                    class="px-2 py-1 bg-error-container text-on-error-container font-label-mono rounded text-[10px]"
                  >
                    {{ criticalityLabel(action.criticality) }}
                  </span>
                  <span
                    class="px-2 py-1 font-label-mono rounded text-[10px]"
                    :class="
                      action.status === ActionStatus.CONFIRMED
                        ? 'bg-primary-container text-on-primary'
                        : 'bg-surface-container-highest text-on-surface'
                    "
                  >
                    {{ actionStatusLabel(action.status) }}
                  </span>
                </div>
                <h3
                  class="font-headline-sm text-primary text-base"
                  :class="
                    action.status === ActionStatus.CONFIRMED
                      ? 'line-through decoration-outline-variant'
                      : ''
                  "
                >
                  {{ action.title }}
                </h3>
                <p
                  v-if="action.helper"
                  class="font-body-md text-on-surface-variant text-sm"
                >
                  {{ action.helper }}
                </p>
              </div>
              <button
                v-if="action.status === ActionStatus.TO_DO"
                type="button"
                class="shrink-0 pt-1 text-primary"
                aria-label="Confirmer"
                @click="confirm(action.id)"
              >
                <span class="material-symbols-outlined text-[28px]">check_circle_outline</span>
              </button>
              <div v-else class="shrink-0 pt-1">
                <span class="material-symbols-outlined text-[24px] text-primary-container">
                  check_circle
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section class="flex flex-col">
        <h2 class="font-headline-sm text-primary mb-4 flex items-center gap-2">
          <span class="material-symbols-outlined text-[20px] text-secondary">info</span>
          Actions informatives
        </h2>
        <div
          class="flex flex-col bg-surface rounded-xl border border-surface-container-highest overflow-hidden"
        >
          <div
            v-for="action in informative"
            :key="action.id"
            class="p-4 flex flex-col gap-3 border-b border-surface-container-highest last:border-0"
          >
            <div class="flex justify-between items-start gap-4">
              <div class="flex flex-col gap-1 flex-1">
                <div class="flex items-center gap-2 mb-1">
                  <span
                    class="px-2 py-1 bg-secondary-container text-on-secondary-container font-label-mono rounded text-[10px]"
                  >
                    {{ criticalityLabel(action.criticality) }}
                  </span>
                </div>
                <h3 class="font-headline-sm text-primary text-base">{{ action.title }}</h3>
                <p
                  v-if="action.helper"
                  class="font-body-md text-on-surface-variant text-sm"
                >
                  {{ action.helper }}
                </p>
              </div>
              <button
                type="button"
                class="shrink-0 pt-1 text-primary"
                :aria-label="
                  action.status === ActionStatus.CONFIRMED
                    ? 'Confirmée'
                    : 'Confirmer'
                "
                @click="
                  action.status === ActionStatus.TO_DO ? confirm(action.id) : undefined
                "
              >
                <span class="material-symbols-outlined text-[28px]">
                  {{
                    action.status === ActionStatus.CONFIRMED
                      ? 'check_circle'
                      : 'check_circle_outline'
                  }}
                </span>
              </button>
            </div>
          </div>
        </div>
      </section>
    </main>

    <footer
      class="fixed bottom-0 left-0 w-full bg-surface/95 backdrop-blur border-t border-surface-container-highest px-margin-mobile py-4 flex flex-col gap-3 z-40 pb-safe"
    >
      <div class="flex justify-between items-center px-1 max-w-lg mx-auto w-full">
        <span class="font-label-mono text-primary">Bloquantes confirmées :</span>
        <span class="font-label-mono text-primary">
          <span :class="progress.confirmed < progress.total ? 'text-error' : ''">
            {{ progress.confirmed }}
          </span>
          / {{ progress.total }}
        </span>
      </div>
      <div
        class="w-full max-w-lg mx-auto h-1 bg-surface-container-highest rounded-full overflow-hidden"
      >
        <div
          class="h-full bg-primary-container rounded-full transition-all duration-300"
          :style="{
            width:
              progress.total === 0
                ? '0%'
                : `${(progress.confirmed / progress.total) * 100}%`,
          }"
        />
      </div>
      <button
        type="button"
        class="w-full max-w-lg mx-auto h-12 bg-primary-container text-on-primary rounded-lg font-headline-sm text-base flex justify-center items-center gap-2 active:scale-95 transition-transform"
        @click="goBack"
      >
        Retour au plan
      </button>
      <p class="font-caption text-on-surface-variant text-center mt-1 max-w-lg mx-auto">
        La plateforme recalcule READY quand toutes les bloquantes (cliente + coiffeuse) sont
        confirmées.
      </p>
    </footer>
  </div>
</template>
