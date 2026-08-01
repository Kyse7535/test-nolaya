<script setup>
import { computed, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { storeToRefs } from 'pinia'
import MatchingDemoRoleBar from '../../components/matching/MatchingDemoRoleBar.vue'
import {
  capacityLinkLine,
  demandBudgetLine,
  demandPriorityLine,
  demandResultLabel,
  demandServiceLine,
  demandTimingLine,
  demandZoneLine,
  invitationStatusBadge,
} from '../../domain/matching/labels'
import { DemoRole, InvitationStatus } from '../../domain/matching/model'
import { useMatchingStore } from '../../stores/matching'

const route = useRoute()
const router = useRouter()
const matchingStore = useMatchingStore()
const { currentCampaign, demoRole } = storeToRefs(matchingStore)

const invitationId = computed(() => String(route.params.id || ''))
const invitation = computed(() => matchingStore.getInvitation(invitationId.value))
const snapshot = computed(() => currentCampaign.value?.demandSnapshot ?? null)
const alreadyAccepted = computed(
  () => invitation.value?.status === InvitationStatus.ACCEPTED,
)

const heroSrc = computed(
  () =>
    invitation.value?.avatarUrl ||
    'https://lh3.googleusercontent.com/aida-public/AB6AXuANhE9ra4xM1U9niamWQYydzUFW3095bN6o47fouPZ93JSn34TpMhax_Wq7zZEDavjnjAFZyiR87Hn2K2xELq_tI6fa-NbMLOmkn6gTKvcCO3LxOCHg_roIscjJ_LlxTL8iLdR1r34S8cKBjWiZwmjU2s6qkFsnXC-RSQDVXfkhyImOap6PVAdczAsDZEE2du98E5aIfUaG0zNsf42KRpjDOr90Zu5SKFKO57vXBMw1g4qeuYmciQQg',
)

onMounted(() => {
  if (!currentCampaign.value) {
    router.replace({ name: 'matching-accueil' })
    return
  }
  if (demoRole.value !== DemoRole.PRO) {
    router.replace({ name: 'matching-suivi' })
    return
  }
  if (!invitation.value) {
    router.replace({ name: 'matching-suivi' })
  }
})

function goBack() {
  router.push({ name: 'matching-suivi' })
}

function accept() {
  if (!invitation.value || alreadyAccepted.value) return
  matchingStore.acceptExact(invitation.value.id)
  router.push({ name: 'matching-suivi' })
}
</script>

<template>
  <div
    v-if="invitation"
    class="bg-background text-on-background font-body-md mx-auto max-w-md min-h-screen flex flex-col pb-[300px]"
  >
    <header class="w-full sticky top-0 z-50 border-b border-outline-variant bg-background">
      <div class="flex items-center justify-between px-margin-mobile h-16 w-full">
        <button
          type="button"
          aria-label="Retour"
          class="text-primary hover:opacity-80 transition-opacity active:scale-95 p-2 -ml-2"
          @click="goBack"
        >
          <span class="material-symbols-outlined">arrow_back</span>
        </button>
        <h1
          class="font-headline-lg-mobile text-headline-lg-mobile font-bold tracking-tight text-primary"
        >
          Nouvelle invitation
        </h1>
        <div class="w-10" />
      </div>
    </header>

    <main class="flex-grow px-margin-mobile pt-lg flex flex-col gap-xl">
      <MatchingDemoRoleBar />

      <section class="flex flex-col gap-sm">
        <div class="flex items-center gap-sm">
          <span
            class="bg-surface-container-highest text-on-surface px-2 py-1 rounded font-label-mono text-label-mono uppercase"
          >
            INVITATION
          </span>
          <span class="text-on-surface-variant font-label-mono text-label-mono uppercase">
            {{ invitationStatusBadge(invitation.status) }}
          </span>
        </div>
        <p class="font-body-lg text-body-lg text-on-background mt-2">
          Une cliente vous propose une prestation alignée avec votre capacité ouverte.
        </p>
        <p class="font-body-sm text-body-sm text-on-surface-variant">
          Destinataire démo : {{ invitation.displayName }}
        </p>
      </section>

      <section
        class="w-full h-48 rounded bg-surface-container-lowest border border-outline-variant overflow-hidden"
      >
        <div
          class="bg-cover bg-center w-full h-full"
          :style="{ backgroundImage: `url('${heroSrc}')` }"
        />
      </section>

      <section
        class="bg-surface-container-lowest border border-outline-variant rounded p-md flex flex-col gap-xs"
      >
        <span class="font-label-sm text-label-sm text-on-surface-variant uppercase">
          Capacité liée
        </span>
        <div class="flex items-center gap-2">
          <span class="material-symbols-outlined text-primary text-[18px]">link</span>
          <span class="font-label-mono text-label-mono text-primary">
            {{ capacityLinkLine(invitation) }}
          </span>
        </div>
      </section>

      <section
        class="flex flex-col gap-0 border border-outline-variant rounded bg-surface-container-lowest overflow-hidden"
      >
        <div class="flex items-start gap-md p-md border-b border-surface-variant">
          <span class="material-symbols-outlined text-on-surface-variant mt-1">auto_awesome</span>
          <div class="flex flex-col">
            <span class="font-label-sm text-label-sm text-on-surface-variant uppercase">
              Résultat
            </span>
            <span class="font-body-md text-body-md text-on-surface">
              {{ demandResultLabel(snapshot) }}
            </span>
          </div>
        </div>
        <div class="flex items-start gap-md p-md border-b border-surface-variant">
          <span class="material-symbols-outlined text-on-surface-variant mt-1">calendar_today</span>
          <div class="flex flex-col">
            <span class="font-label-sm text-label-sm text-on-surface-variant uppercase">Quand</span>
            <span class="font-body-md text-body-md text-on-surface">
              {{ demandTimingLine(snapshot) }}
            </span>
          </div>
        </div>
        <div class="flex items-start gap-md p-md border-b border-surface-variant">
          <span class="material-symbols-outlined text-on-surface-variant mt-1">payments</span>
          <div class="flex flex-col">
            <span class="font-label-sm text-label-sm text-on-surface-variant uppercase">
              Budget max
            </span>
            <span class="font-body-md text-body-md text-on-surface">
              {{ demandBudgetLine(snapshot) }}
            </span>
          </div>
        </div>
        <div class="flex items-start gap-md p-md border-b border-surface-variant">
          <span class="material-symbols-outlined text-on-surface-variant mt-1">location_on</span>
          <div class="flex flex-col">
            <span class="font-label-sm text-label-sm text-on-surface-variant uppercase">Zone</span>
            <span class="font-body-md text-body-md text-on-surface">
              {{ demandZoneLine(snapshot) }}
            </span>
          </div>
        </div>
        <div class="flex items-start gap-md p-md border-b border-surface-variant">
          <span class="material-symbols-outlined text-on-surface-variant mt-1">support_agent</span>
          <div class="flex flex-col">
            <span class="font-label-sm text-label-sm text-on-surface-variant uppercase">
              Service
            </span>
            <span class="font-body-md text-body-md text-on-surface">
              {{ demandServiceLine(snapshot) }}
            </span>
          </div>
        </div>
        <div class="flex items-start gap-md p-md">
          <span class="material-symbols-outlined text-on-surface-variant mt-1">flag</span>
          <div class="flex flex-col">
            <span class="font-label-sm text-label-sm text-on-surface-variant uppercase">
              Priorité cliente
            </span>
            <span class="font-body-md text-body-md text-on-surface">
              {{ demandPriorityLine(snapshot) }}
            </span>
          </div>
        </div>
      </section>
    </main>

    <div
      class="fixed bottom-0 w-full max-w-md bg-surface-container-lowest border-t border-outline-variant p-margin-mobile flex flex-col gap-sm z-40 shadow-[0_-4px_24px_rgba(27,28,28,0.04)]"
    >
      <button
        type="button"
        class="w-full bg-primary-container text-on-primary h-12 rounded flex items-center justify-center font-label-sm text-label-sm uppercase hover:opacity-90 transition-opacity disabled:opacity-50"
        :disabled="alreadyAccepted"
        @click="accept"
      >
        {{ alreadyAccepted ? 'Déjà acceptée' : 'Accepter' }}
      </button>
      <p class="font-body-sm text-body-sm text-on-surface-variant text-center">
        Acceptation exacte provisoire — pas encore d’engagement ferme.
      </p>
      <div class="flex flex-col gap-2 mt-2">
        <button
          type="button"
          disabled
          class="w-full bg-surface-container-lowest text-outline border border-surface-variant h-12 rounded flex items-center justify-center font-label-sm text-label-sm uppercase cursor-not-allowed opacity-50"
        >
          Accepter avec modification
        </button>
        <div class="flex gap-2">
          <button
            type="button"
            disabled
            class="flex-1 bg-surface-container-lowest text-outline border border-surface-variant h-12 rounded flex items-center justify-center font-label-sm text-label-sm uppercase cursor-not-allowed opacity-50"
          >
            Demander info
          </button>
          <button
            type="button"
            disabled
            class="flex-1 bg-surface-container-lowest text-outline border border-surface-variant h-12 rounded flex items-center justify-center font-label-sm text-label-sm uppercase cursor-not-allowed opacity-50"
          >
            Indisponible
          </button>
        </div>
      </div>
      <p class="font-label-mono text-[10px] text-outline text-center mt-2 uppercase">
        Seule l’acceptation exacte est active dans cette démo.
      </p>
    </div>
  </div>
</template>
