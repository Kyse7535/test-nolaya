<script setup>
import { computed, onMounted } from 'vue'
import { storeToRefs } from 'pinia'
import { useRouter } from 'vue-router'
import { DemoRole } from '../../domain/demoRole'
import { ProposalStatus } from '../../domain/proposal/model'
import { useDemoRoleStore } from '../../stores/demoRole'
import { useProposalStore } from '../../stores/proposal'

const router = useRouter()
const proposalStore = useProposalStore()
const { demoRole } = storeToRefs(useDemoRoleStore())
const { currentProposal } = storeToRefs(proposalStore)

const heroSrc =
  'https://lh3.googleusercontent.com/aida-public/AB6AXuDP8tXt8vnkPHjVMUvAwlX2bqpkigy_vUcm_1u5gztgNphuzHMmNhUpbFqMDC2_13G6MKItkhBhS0BIrHsOlTBRHminaWFC_Pp-a1Ly2lLKzqiYQjIgWCpyVEoaMvAusRXqgYt12FCxZb9k6HbmIft6ZKiWGp6yo5h6CWdSNfN9x8oOBaaAWwr1YJiEYWXWMkBsex4Szefr6x-Iop4U4QJJ9kUgsocPThpQ1E9CHSd_4iNntqwq-yZz'

const fallbackAvatar =
  'https://lh3.googleusercontent.com/aida-public/AB6AXuCDmBbSAbV138TMyyAkAJnjd17caQ5rHKDVTMFLM8bXcRhs9r4rr2UuT6Um-kp0wK1lKpUSCYVjO8YzTut4tNwdiKjPwRMUEnTkYClm2sD85zM-JuzHk7veLG8WeTk4Fbigrxe4X96X568O_tRIhRqAFJ7lCw8Y1LmS1Y3PAGIfAHxXP1FgwjXeb8s51e5JlpqgQ3FXXm-q761KqHrsirrl9hHCQW02kyHrE0G397TZ4dQJ7KeDA-P_'

const proposal = computed(() => currentProposal.value)
const offer = computed(() => proposal.value?.offer ?? null)
const brief = computed(() => proposal.value?.frozenBrief ?? null)

const proName = computed(() => proposal.value?.proDisplayName || 'Coiffeuse')
const proAvatar = computed(() => proposal.value?.proAvatarUrl || fallbackAvatar)
const proSpecialty = computed(
  () => proposal.value?.proSpecialty || 'Spécialiste vanilles & braids',
)

const prestationShort = computed(() => {
  const label = brief.value?.prestationLabel || 'Prestation'
  if (label.toLowerCase().includes('vanille')) return 'Vanilles mi-longues'
  return label
})

const clientTask = computed(() => {
  const task = offer.value?.tasks?.find((t) => t.id === 'task_client')
  return task?.detail || 'Cheveux lavés et démêlés la veille.'
})

const suppliesLine = computed(() => {
  const task = offer.value?.tasks?.find((t) => t.id === 'task_supplies')
  return task?.detail || 'Mèches incluses dans le tarif.'
})

onMounted(() => {
  if (demoRole.value === DemoRole.PRO) {
    router.replace({
      name:
        currentProposal.value?.status === ProposalStatus.FIRM
          ? 'proposal-succes'
          : 'proposal-accueil',
    })
    return
  }
  const p = currentProposal.value
  if (!p || p.status !== ProposalStatus.FIRM) {
    router.replace({ name: 'proposal-accueil' })
  }
})

function goBack() {
  router.push({ name: 'home' })
}

function goHome() {
  router.push({ name: 'home' })
}

function goEngagement() {
  router.push({ name: 'engagement-accueil' })
}
</script>

<template>
  <div
    v-if="proposal && offer"
    class="bg-background text-on-background min-h-screen flex flex-col"
  >
    <header
      class="fixed top-0 w-full z-50 bg-surface border-b border-surface-container flex items-center px-margin-mobile h-16"
    >
      <button
        type="button"
        aria-label="Retour"
        class="mr-3 text-on-surface-variant hover:opacity-80"
        @click="goBack"
      >
        <span class="material-symbols-outlined">arrow_back</span>
      </button>
      <h1 class="font-headline-md text-headline-md text-primary truncate flex-1">
        Offre reçue
      </h1>
    </header>

    <main class="flex-1 overflow-y-auto pt-16 pb-32">
      <div class="px-margin-mobile py-4 space-y-4">
        <section class="space-y-1.5">
          <div class="flex flex-wrap gap-1.5">
            <span
              class="inline-flex items-center px-2 py-1 rounded bg-secondary-container text-on-secondary-container font-label-status text-label-status"
            >
              OFFRE FERME
            </span>
            <span
              class="inline-flex items-center px-2 py-1 rounded bg-surface-container-high text-on-surface-variant font-label-status text-label-status"
            >
              EN ATTENTE D’ACCEPTATION
            </span>
          </div>
          <h2 class="font-headline-md text-headline-md text-primary">
            Proposition de prestation
          </h2>
          <p class="font-body-sm text-body-sm text-on-surface-variant">
            {{ proName }} vous a envoyé une offre ferme. Vérifiez les détails avant d’accepter.
          </p>
        </section>

        <section
          class="flex items-center gap-3 bg-surface-container-lowest p-3 rounded-lg border border-surface-container"
        >
          <div
            class="relative w-10 h-10 rounded-full overflow-hidden border border-surface-container shrink-0"
          >
            <img class="w-full h-full object-cover" alt="" :src="proAvatar" />
          </div>
          <div class="min-w-0">
            <h3 class="font-body-md text-body-md font-semibold text-primary truncate">{{ proName }}</h3>
            <p class="font-body-sm text-body-sm text-on-surface-variant">{{ proSpecialty }}</p>
          </div>
        </section>

        <section
          class="w-full h-32 rounded-lg overflow-hidden border border-surface-container relative"
        >
          <img class="w-full h-full object-cover" alt="" :src="heroSrc" />
          <div
            class="absolute bottom-2 left-2 right-2 bg-surface-container-lowest/90 backdrop-blur-sm px-3 py-2 rounded-lg border border-surface-container"
          >
            <p class="font-body-sm text-body-sm text-on-surface-variant">
              Prestation proposée
            </p>
            <p class="font-body-md text-body-md text-primary font-medium">
              {{ prestationShort }}
            </p>
          </div>
        </section>

        <section class="grid grid-cols-1 gap-4">
          <div class="grid grid-cols-2 gap-4">
            <div
              class="bg-surface-container-lowest p-4 rounded-lg border border-surface-container flex flex-col justify-center"
            >
              <span class="font-body-sm text-body-sm text-on-surface-variant mb-1 block">
                Prix convenu
              </span>
              <span class="font-label-mono text-headline-sm font-bold text-primary">
                {{ offer.priceTotal }} €
              </span>
            </div>
            <div
              class="bg-surface-container-lowest p-4 rounded-lg border border-surface-container"
            >
              <span
                class="font-body-sm text-body-sm text-on-surface-variant mb-1 flex items-center gap-1"
              >
                <span class="material-symbols-outlined text-icon-sm">schedule</span>
                Créneau
              </span>
              <span class="font-label-mono text-label-mono text-primary whitespace-pre-line">
                {{ offer.slot.dateLabel }}
{{ offer.slot.startTime }}–{{ offer.slot.endTime }}
              </span>
            </div>
          </div>

          <div
            class="bg-surface-container-lowest p-4 rounded-lg border border-surface-container flex items-start gap-3"
          >
            <span class="material-symbols-outlined text-on-surface-variant mt-1">location_on</span>
            <div>
              <span class="font-body-sm text-body-sm text-on-surface-variant mb-1 block">
                Lieu de rendez-vous
              </span>
              <span class="font-body-md text-body-md text-primary">Chez la coiffeuse</span>
              <span class="font-body-sm text-body-sm text-on-surface-variant block mt-1">
                (adresse exacte communiquée après engagement)
              </span>
            </div>
          </div>

          <div
            class="bg-surface-container-lowest p-4 rounded-lg border border-surface-container space-y-4"
          >
            <div>
              <span
                class="font-body-sm text-body-sm text-on-surface-variant mb-1 flex items-center gap-1"
              >
                <span class="material-symbols-outlined text-icon-sm">check_circle</span>
                Ce qui est inclus
              </span>
              <p class="font-body-md text-body-md text-primary">{{ suppliesLine }}</p>
            </div>
            <div class="h-px bg-surface-container w-full" />
            <div>
              <span
                class="font-body-sm text-body-sm text-on-surface-variant mb-1 flex items-center gap-1"
              >
                <span class="material-symbols-outlined text-icon-sm">info</span>
                À préparer
              </span>
              <p class="font-body-md text-body-md text-primary">{{ clientTask }}</p>
            </div>
          </div>
        </section>

        <section
          class="bg-secondary-container/30 border border-secondary-container rounded-lg p-4 flex items-start gap-3"
        >
          <span
            class="material-symbols-outlined text-secondary mt-1"
            style="font-variation-settings: 'FILL' 1"
          >lock_clock</span>
          <p class="font-body-sm text-body-sm text-on-secondary-container">
            Créneau réservé temporairement (soft-hold) jusqu’à votre acceptation formelle.
          </p>
        </section>
      </div>
    </main>

    <div
      class="fixed bottom-0 left-0 w-full bg-surface/90 backdrop-blur-md border-t border-surface-container px-margin-mobile py-4 flex flex-col gap-3 z-50"
    >
      <button
        type="button"
        class="w-full bg-primary-container text-on-primary h-12 rounded flex items-center justify-center font-body-md text-body-md font-medium transition-transform active:scale-[0.98]"
        @click="goEngagement"
      >
        Examiner pour accepter
      </button>
      <button
        type="button"
        class="w-full bg-transparent border border-primary-container text-primary h-12 rounded flex items-center justify-center font-body-md text-body-md font-medium transition-colors hover:bg-surface-container-low"
        @click="goHome"
      >
        Plus tard
      </button>
    </div>
  </div>
</template>
