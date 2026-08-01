<script setup>
import { computed, onMounted, reactive, watch } from 'vue'
import { useRouter } from 'vue-router'
import ExperienceDemoRoleBar from '../../components/experience/ExperienceDemoRoleBar.vue'
import {
  PlaceOption,
  canConfirmRepeat,
  formatEuro,
} from '../../domain/experience/model'
import {
  EXPERIENCE_HISTORY_PRO_AVATAR,
  EXPERIENCE_PRO_AVATAR,
} from '../../mocks/experienceSeed'
import { useExperienceStore } from '../../stores/experience'
import { useSettlementStore } from '../../stores/settlement'

const router = useRouter()
const experienceStore = useExperienceStore()
const settlementStore = useSettlementStore()

const experience = computed(() => experienceStore.currentExperience)
const historyItems = computed(() => experienceStore.history)
const panelOpen = computed(() => experienceStore.repeatPanelOpen)
const avatarUrl = computed(
  () =>
    experience.value?.proAvatarUrl ||
    EXPERIENCE_HISTORY_PRO_AVATAR ||
    EXPERIENCE_PRO_AVATAR,
)

const reconfirm = reactive({
  priceConfirmed: '',
  dateLabel: '',
  placeOption: PlaceOption.STYLIST,
})

const canCreate = computed(() => canConfirmRepeat(reconfirm))

onMounted(() => {
  if (!settlementStore.settled) {
    router.replace({ name: 'settlement-accueil' })
    return
  }
  experienceStore.ensureDemoSeed()
  if (!experienceStore.recorded) {
    router.replace({ name: 'experience-accueil' })
    return
  }
  seedReconfirm()
})

watch(
  () => experience.value?.id,
  () => seedReconfirm(),
)

function seedReconfirm() {
  const exp = experience.value
  if (!exp) return
  reconfirm.priceConfirmed = String(exp.priceEngaged || exp.finalAmount || '')
  reconfirm.dateLabel = ''
  reconfirm.placeOption = PlaceOption.STYLIST
}

function goBack() {
  router.push({ name: 'experience-succes' })
}

function togglePanel() {
  if (panelOpen.value) experienceStore.closeRepeatPanel()
  else experienceStore.openRepeatPanel()
}

function createDemand() {
  const result = experienceStore.confirmRepeatDemand({
    priceConfirmed: Number(reconfirm.priceConfirmed),
    dateLabel: reconfirm.dateLabel,
    placeOption: reconfirm.placeOption,
  })
  if (!result) return
  router.push({ name: 'demand-accueil' })
}
</script>

<template>
  <div
    class="bg-surface text-on-surface font-body-md antialiased min-h-screen pb-24"
  >
    <header
      class="fixed top-0 left-0 w-full z-50 flex items-center px-margin-mobile h-16 bg-surface border-b border-surface-container"
    >
      <button
        type="button"
        aria-label="Retour"
        class="w-11 h-11 flex items-center justify-center -ml-2 text-primary rounded-full hover:bg-surface-container-low"
        @click="goBack"
      >
        <span class="material-symbols-outlined">arrow_back</span>
      </button>
      <h1 class="ml-2 font-headline-sm text-headline-sm text-primary font-semibold">
        Mes expériences
      </h1>
    </header>

    <main
      v-if="experience"
      class="pt-24 px-margin-mobile max-w-lg mx-auto flex flex-col gap-lg"
    >
      <ExperienceDemoRoleBar />

      <section>
        <p class="font-body-md text-body-md text-on-surface-variant max-w-xl">
          Historique de vos prestations — disponible même sans avis.
        </p>
      </section>

      <section
        class="bg-surface-container-lowest border border-surface-container rounded-lg p-md flex flex-col gap-md"
      >
        <div class="flex justify-between items-start w-full gap-sm flex-wrap">
          <span
            class="font-label-sm text-label-sm bg-surface-container px-sm py-xs rounded text-primary uppercase"
          >
            Dernier rendez-vous
          </span>
          <span
            class="font-label-mono text-label-mono text-on-surface-variant flex items-center gap-xs"
          >
            <span class="material-symbols-outlined text-[16px]">verified</span>
            EXPERIENCE_RECORDED
          </span>
        </div>
        <div>
          <h2 class="font-headline-md text-headline-md text-primary mb-xs">
            {{ experience.serviceLabel }}
          </h2>
          <p class="font-body-md text-body-md text-on-surface-variant">
            {{ experience.dateLabel || '—' }}
          </p>
        </div>
        <div class="flex items-center gap-sm mt-xs">
          <img
            alt=""
            class="w-12 h-12 rounded-full object-cover border border-surface-container"
            :src="avatarUrl"
          />
          <div>
            <p class="font-body-md text-body-md font-semibold text-primary">
              {{ experience.proDisplayName }}
            </p>
            <p class="font-body-md text-body-md text-on-surface-variant">
              Coiffeuse experte
            </p>
          </div>
        </div>
        <div
          class="bg-surface-container-low p-sm rounded border border-surface-container mt-xs"
        >
          <p
            class="font-body-md text-body-md text-on-surface-variant leading-relaxed"
          >
            La reprise préremplit votre demande, mais vous devez reconfirmer le prix,
            la date et le lieu. L’ancien prix est une référence, jamais appliqué
            silencieusement.
          </p>
        </div>
        <div class="flex flex-col gap-sm mt-sm">
          <button
            type="button"
            class="bg-primary text-on-primary font-body-lg text-body-lg px-lg py-sm rounded active:scale-95 transition-transform w-full font-medium"
            @click="togglePanel"
          >
            Refaire cette prestation
          </button>
          <button
            type="button"
            class="border border-primary text-primary font-body-lg text-body-lg px-lg py-sm rounded hover:bg-surface-container-low active:scale-95 transition-transform w-full font-medium"
            @click="goBack"
          >
            Voir les détails
          </button>
        </div>
      </section>

      <section
        v-if="panelOpen"
        class="bg-surface-container-lowest border border-surface-container rounded-lg p-md flex flex-col gap-md relative overflow-hidden"
      >
        <h3
          class="font-headline-sm text-headline-sm text-primary border-b border-surface-container pb-sm"
        >
          Nouvelle demande préremplie
        </h3>

        <div class="flex flex-col gap-sm">
          <div class="bg-surface-container-low p-sm rounded">
            <label
              class="font-label-sm text-label-sm text-on-surface-variant block mb-unit uppercase"
            >
              Prestation
            </label>
            <p class="font-body-md text-body-md text-primary font-medium">
              {{ experience.serviceLabel }}
            </p>
          </div>
          <div
            class="bg-surface-container-low p-sm rounded flex items-center gap-sm"
          >
            <img
              alt=""
              class="w-8 h-8 rounded-full object-cover"
              :src="avatarUrl"
            />
            <div>
              <label
                class="font-label-sm text-label-sm text-on-surface-variant block mb-unit uppercase"
              >
                Coiffeuse de référence
              </label>
              <p class="font-body-md text-body-md text-primary font-medium">
                {{ experience.proDisplayName }}
              </p>
            </div>
          </div>
        </div>

        <div class="flex flex-col gap-md">
          <div class="flex flex-col gap-unit">
            <label class="font-body-md text-body-md text-primary">
              Prix de référence à reconfirmer
            </label>
            <input
              v-model="reconfirm.priceConfirmed"
              type="number"
              min="1"
              step="1"
              class="w-full bg-surface-container-lowest border border-surface-container rounded px-sm py-[10px] font-label-mono text-label-mono text-primary focus:border-primary focus:ring-0 outline-none transition-colors"
            />
            <p class="font-body-md text-[12px] text-on-surface-variant">
              Référence historique :
              {{ formatEuro(experience.priceEngaged || experience.finalAmount) }}
              — non appliqué automatiquement
            </p>
          </div>

          <div class="flex flex-col gap-unit">
            <label class="font-body-md text-body-md text-primary" for="repeat-date">
              Date &amp; créneau
            </label>
            <input
              id="repeat-date"
              v-model="reconfirm.dateLabel"
              type="text"
              placeholder="Choisir une nouvelle date"
              class="w-full bg-surface-container-lowest border border-surface-container rounded px-sm py-[10px] font-body-md text-body-md text-primary focus:border-primary focus:ring-0 outline-none"
            />
          </div>

          <div class="flex flex-col gap-unit">
            <label class="font-body-md text-body-md text-primary">Lieu</label>
            <div class="flex gap-sm">
              <label class="flex-1 cursor-pointer">
                <input
                  v-model="reconfirm.placeOption"
                  class="peer sr-only"
                  type="radio"
                  :value="PlaceOption.STYLIST"
                />
                <div
                  class="w-full text-center border border-surface-container rounded py-sm font-body-md text-body-md text-on-surface-variant peer-checked:border-primary peer-checked:bg-surface-container-low peer-checked:text-primary transition-all"
                >
                  Chez la coiffeuse
                </div>
              </label>
              <label class="flex-1 cursor-pointer">
                <input
                  v-model="reconfirm.placeOption"
                  class="peer sr-only"
                  type="radio"
                  :value="PlaceOption.HOME"
                />
                <div
                  class="w-full text-center border border-surface-container rounded py-sm font-body-md text-body-md text-on-surface-variant peer-checked:border-primary peer-checked:bg-surface-container-low peer-checked:text-primary transition-all"
                >
                  À domicile
                </div>
              </label>
            </div>
          </div>
        </div>

        <div
          class="flex flex-col-reverse gap-sm mt-md pt-sm border-t border-surface-container"
        >
          <button
            type="button"
            class="text-on-surface-variant font-body-lg text-body-lg px-lg py-sm rounded hover:bg-surface-container-low active:scale-95 transition-transform w-full font-medium"
            @click="experienceStore.closeRepeatPanel()"
          >
            Annuler
          </button>
          <button
            type="button"
            class="bg-primary text-on-primary font-body-lg text-body-lg px-lg py-sm rounded active:scale-95 transition-transform w-full font-medium disabled:opacity-40 disabled:cursor-not-allowed"
            :disabled="!canCreate"
            @click="createDemand"
          >
            Créer la nouvelle demande
          </button>
        </div>
      </section>

      <section class="mt-md">
        <h3 class="font-headline-sm text-headline-sm text-primary mb-md">
          Historique
        </h3>
        <div class="flex flex-col gap-sm">
          <div
            v-for="item in historyItems"
            :key="item.id"
            class="bg-surface-container-lowest border border-surface-container rounded flex items-center justify-between p-sm"
          >
            <div class="flex items-center gap-md">
              <div
                class="w-10 h-10 bg-surface-container flex items-center justify-center rounded-full text-on-surface-variant"
              >
                <span class="material-symbols-outlined text-[20px]">
                  content_cut
                </span>
              </div>
              <div class="flex flex-col">
                <span class="font-body-md text-body-md font-medium text-primary">
                  {{ item.serviceLabel }}
                </span>
                <span
                  class="font-body-md text-body-md text-on-surface-variant flex items-center gap-xs"
                >
                  {{ item.dateLabel || '—' }}
                  <span
                    class="w-1 h-1 bg-surface-variant rounded-full mx-1"
                  />
                  {{ item.proDisplayName }}
                </span>
              </div>
            </div>
            <span class="material-symbols-outlined text-on-surface-variant">
              chevron_right
            </span>
          </div>
          <p
            v-if="!historyItems.length"
            class="font-body-md text-body-md text-on-surface-variant"
          >
            Aucune entrée pour l’instant.
          </p>
        </div>
      </section>
    </main>
  </div>
</template>
