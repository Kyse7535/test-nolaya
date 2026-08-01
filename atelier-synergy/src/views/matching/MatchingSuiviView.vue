<script setup>
import { computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { storeToRefs } from 'pinia'
import { invitationStatusLabel } from '../../domain/matching/labels'
import { CampaignStatus, DemoRole, InvitationStatus } from '../../domain/matching/model'
import { useMatchingStore } from '../../stores/matching'

const router = useRouter()
const matchingStore = useMatchingStore()
const {
  currentCampaign,
  acceptCount,
  isThresholdReached,
  demoRole,
  isProRole,
} = storeToRefs(matchingStore)

const invitations = computed(() => currentCampaign.value?.invitations ?? [])
const threshold = computed(() => currentCampaign.value?.threshold ?? 2)
const progressPct = computed(() => {
  const t = threshold.value || 1
  return Math.min(100, (acceptCount.value / t) * 100)
})

onMounted(() => {
  if (!currentCampaign.value) {
    router.replace({ name: 'matching-accueil' })
  }
})

function goBack() {
  router.push({ name: 'matching-lance' })
}

function goShortlist() {
  router.push({ name: 'matching-shortlist' })
}

function onRowClick(invitation) {
  if (demoRole.value !== DemoRole.PRO) return
  router.push({ name: 'matching-invitation', params: { id: invitation.id } })
}

function isAccepted(invitation) {
  return invitation.status === InvitationStatus.ACCEPTED
}
</script>

<template>
  <div
    class="bg-background text-on-background font-body-md min-h-screen pb-[100px] antialiased"
  >
    <header
      class="w-full sticky top-0 z-50 bg-background border-b border-outline-variant flex items-center justify-between px-margin-mobile h-16 max-w-7xl mx-auto"
    >
      <button
        type="button"
        aria-label="Retour"
        class="text-primary hover:opacity-80 transition-opacity active:scale-95 flex items-center justify-center w-10 h-10 -ml-2 rounded-full"
        @click="goBack"
      >
        <span class="material-symbols-outlined text-[24px]">arrow_back</span>
      </button>
      <h1
        class="font-headline-lg-mobile text-headline-lg-mobile font-bold tracking-tight text-primary uppercase absolute left-1/2 -translate-x-1/2 whitespace-nowrap"
      >
        Nolaya
      </h1>
      <div class="w-10" />
    </header>

    <main class="w-full max-w-7xl mx-auto px-margin-mobile pt-lg pb-2xl">
      <div class="flex flex-col gap-sm mb-xl">
        <div class="flex items-center justify-between w-full">
          <span
            class="inline-block bg-surface-container-high px-sm py-[2px] rounded font-label-mono text-label-mono text-on-surface uppercase border border-outline-variant"
          >
            VAGUE 1
          </span>
          <button
            type="button"
            aria-label="Rafraîchir les données"
            class="text-on-surface-variant hover:text-primary transition-colors flex items-center justify-center p-2 -mr-2 rounded-full"
            @click="() => {}"
          >
            <span class="material-symbols-outlined text-[20px]">refresh</span>
          </button>
        </div>
        <h2 class="font-headline-lg-mobile text-headline-lg-mobile text-primary">
          Suivi des invitations
        </h2>
        <p
          v-if="isProRole"
          class="font-body-sm text-body-sm text-on-surface-variant"
        >
          Mode coiffeuse : ouvrez une invitation en attente pour accepter.
        </p>
      </div>

      <section
        class="bg-surface-container-lowest border border-outline-variant rounded-lg p-lg mb-xl"
      >
        <div class="flex flex-col md:flex-row md:items-end justify-between gap-md mb-md">
          <div>
            <p class="font-label-mono text-label-mono text-on-surface-variant uppercase mb-xs">
              Progression
            </p>
            <div class="flex items-baseline gap-xs">
              <span
                class="font-headline-lg-mobile text-headline-lg-mobile text-primary tracking-tight font-label-mono"
              >
                {{ acceptCount }} / {{ threshold }}
              </span>
              <span class="font-body-md text-body-md text-on-surface-variant">
                acceptations exactes
              </span>
            </div>
          </div>
          <div
            v-if="isThresholdReached"
            class="bg-secondary-fixed/20 border border-secondary-fixed-dim px-md py-xs rounded flex items-center gap-xs"
          >
            <span
              class="material-symbols-outlined text-[16px] text-on-secondary-fixed-variant"
              style="font-variation-settings: 'FILL' 1"
            >
              check_circle
            </span>
            <span
              class="font-label-sm text-label-sm text-on-secondary-fixed-variant uppercase tracking-wider"
            >
              Seuil atteint
            </span>
          </div>
        </div>
        <div class="w-full h-1 bg-surface-container-high rounded-full overflow-hidden mt-sm">
          <div
            class="h-full bg-primary rounded-full transition-all duration-1000 ease-out"
            :style="{ width: `${progressPct}%` }"
          />
        </div>
      </section>

      <section class="mb-lg">
        <div class="flex flex-col border-t border-outline-variant">
          <button
            v-for="invitation in invitations"
            :key="invitation.id"
            type="button"
            class="flex items-center justify-between py-md border-b border-outline-variant transition-colors w-full text-left"
            :class="
              isProRole && !isAccepted(invitation)
                ? 'hover:bg-surface-container-low/50 cursor-pointer'
                : 'cursor-default'
            "
            :disabled="!isProRole"
            @click="onRowClick(invitation)"
          >
            <div class="flex items-center gap-md">
              <div
                class="w-12 h-12 rounded-full overflow-hidden border border-outline-variant bg-surface-container flex-shrink-0"
                :class="{
                  'opacity-80 mix-blend-luminosity grayscale-[20%]': !isAccepted(invitation),
                }"
              >
                <img
                  v-if="invitation.avatarUrl"
                  class="w-full h-full object-cover"
                  :src="invitation.avatarUrl"
                  alt=""
                />
              </div>
              <div class="flex flex-col">
                <span
                  class="font-body-md text-body-md font-medium"
                  :class="isAccepted(invitation) ? 'text-primary' : 'text-on-surface-variant'"
                >
                  {{ invitation.displayName }}
                </span>
                <span
                  class="font-label-mono text-label-mono uppercase mt-[2px]"
                  :class="isAccepted(invitation) ? 'text-on-surface-variant' : 'text-outline'"
                >
                  {{ invitation.styleTag }}
                </span>
              </div>
            </div>
            <div class="flex-shrink-0">
              <span
                class="inline-flex items-center justify-center px-sm py-[2px] rounded font-label-mono text-label-mono uppercase tracking-wide border"
                :class="
                  isAccepted(invitation)
                    ? 'bg-secondary-fixed text-on-secondary-fixed-variant border-secondary-fixed-dim'
                    : 'bg-surface-container-high text-on-surface-variant border-outline-variant'
                "
              >
                {{ invitationStatusLabel(invitation.status) }}
              </span>
            </div>
          </button>
        </div>
      </section>

      <div
        class="flex items-start gap-sm bg-surface-bright border border-outline-variant p-md rounded"
      >
        <span class="material-symbols-outlined text-[18px] text-on-surface-variant mt-[2px]">
          info
        </span>
        <p class="font-body-sm text-body-sm text-on-surface-variant">
          {{ threshold }} acceptations exactes suffisent pour constituer la shortlist.
        </p>
      </div>
    </main>

    <div
      v-if="isThresholdReached || currentCampaign?.status === CampaignStatus.SHORTLIST_READY"
      class="fixed bottom-0 left-0 w-full bg-background/95 backdrop-blur-md border-t border-outline-variant p-margin-mobile z-40 flex justify-center pb-[max(16px,env(safe-area-inset-bottom))]"
    >
      <div class="w-full max-w-7xl mx-auto flex justify-center">
        <button
          type="button"
          class="w-full md:w-auto bg-primary hover:bg-on-primary-fixed-variant text-on-primary font-label-sm text-label-sm uppercase tracking-wider px-16 py-4 rounded transition-colors active:scale-[0.98] flex items-center justify-center gap-sm"
          @click="goShortlist"
        >
          <span>Voir la shortlist</span>
          <span class="material-symbols-outlined text-[18px]">arrow_forward</span>
        </button>
      </div>
    </div>
  </div>
</template>
