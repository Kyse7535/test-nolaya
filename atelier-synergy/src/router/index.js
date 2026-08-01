import { createRouter, createWebHistory } from 'vue-router'
import { CapacityStatus } from '../domain/capacity/model'
import { DemandStatus } from '../domain/demand/model'
import { CampaignStatus, DemoRole } from '../domain/matching/model'
import { AppointmentStatus } from '../domain/appointment/model'
import { ProposalStatus } from '../domain/proposal/model'
import { useAppointmentStore } from '../stores/appointment'
import { useCapacityStore } from '../stores/capacity'
import { useDemandStore } from '../stores/demand'
import { useFrameworkStore } from '../stores/framework'
import { useMatchingStore } from '../stores/matching'
import { useProposalStore } from '../stores/proposal'
import HomeView from '../views/HomeView.vue'
import FrameworkAccueilView from '../views/framework/FrameworkAccueilView.vue'
import FrameworkContextesView from '../views/framework/FrameworkContextesView.vue'
import FrameworkAccueilAccesView from '../views/framework/FrameworkAccueilAccesView.vue'
import FrameworkCommunicationView from '../views/framework/FrameworkCommunicationView.vue'
import FrameworkPolitiquesView from '../views/framework/FrameworkPolitiquesView.vue'
import FrameworkRecapView from '../views/framework/FrameworkRecapView.vue'
import FrameworkSuccesView from '../views/framework/FrameworkSuccesView.vue'
import CapacityAccueilView from '../views/capacity/CapacityAccueilView.vue'
import CapacityPrestationView from '../views/capacity/CapacityPrestationView.vue'
import CapacityGalerieView from '../views/capacity/CapacityGalerieView.vue'
import CapacityServiceView from '../views/capacity/CapacityServiceView.vue'
import CapacityPrixView from '../views/capacity/CapacityPrixView.vue'
import CapacityLieuView from '../views/capacity/CapacityLieuView.vue'
import CapacityRecapView from '../views/capacity/CapacityRecapView.vue'
import CapacitySuccesView from '../views/capacity/CapacitySuccesView.vue'
import CapacityListeView from '../views/capacity/CapacityListeView.vue'
import DemandAccueilView from '../views/demand/DemandAccueilView.vue'
import DemandEntreeView from '../views/demand/DemandEntreeView.vue'
import DemandResultatView from '../views/demand/DemandResultatView.vue'
import DemandTempsBudgetView from '../views/demand/DemandTempsBudgetView.vue'
import DemandZoneView from '../views/demand/DemandZoneView.vue'
import DemandServiceView from '../views/demand/DemandServiceView.vue'
import DemandRecapView from '../views/demand/DemandRecapView.vue'
import DemandSuccesView from '../views/demand/DemandSuccesView.vue'
import MatchingAccueilView from '../views/matching/MatchingAccueilView.vue'
import MatchingLanceView from '../views/matching/MatchingLanceView.vue'
import MatchingCampagneView from '../views/matching/MatchingCampagneView.vue'
import MatchingInvitationView from '../views/matching/MatchingInvitationView.vue'
import MatchingSuiviView from '../views/matching/MatchingSuiviView.vue'
import MatchingShortlistView from '../views/matching/MatchingShortlistView.vue'
import ProposalAccueilView from '../views/proposal/ProposalAccueilView.vue'
import ProposalSyntheseView from '../views/proposal/ProposalSyntheseView.vue'
import ProposalFaisabiliteView from '../views/proposal/ProposalFaisabiliteView.vue'
import ProposalOffreView from '../views/proposal/ProposalOffreView.vue'
import ProposalRecapView from '../views/proposal/ProposalRecapView.vue'
import ProposalSuccesView from '../views/proposal/ProposalSuccesView.vue'
import ProposalOffreClienteView from '../views/proposal/ProposalOffreClienteView.vue'
import AppointmentAccueilView from '../views/appointment/AppointmentAccueilView.vue'
import AppointmentPlanView from '../views/appointment/AppointmentPlanView.vue'
import AppointmentChecklistClienteView from '../views/appointment/AppointmentChecklistClienteView.vue'
import AppointmentChecklistCoiffeuseView from '../views/appointment/AppointmentChecklistCoiffeuseView.vue'
import AppointmentReadyView from '../views/appointment/AppointmentReadyView.vue'

const frameworkDraftNames = new Set([
  'framework-accueil',
  'framework-contextes',
  'framework-accueil-acces',
  'framework-communication',
  'framework-politiques',
  'framework-recap',
])

const capacityWizardNames = new Set([
  'capacity-prestation',
  'capacity-galerie',
  'capacity-service',
  'capacity-prix',
  'capacity-lieu',
  'capacity-recap',
])

const demandWizardNames = new Set([
  'demand-entree',
  'demand-resultat',
  'demand-temps-budget',
  'demand-zone',
  'demand-service',
  'demand-recap',
])

const matchingNeedsCampaign = new Set([
  'matching-lance',
  'matching-campagne',
  'matching-invitation',
  'matching-suivi',
  'matching-shortlist',
])

const matchingUpstreamWhenShortlist = new Set(['matching-accueil', 'matching-lance'])

const proposalWizardNames = new Set([
  'proposal-synthese',
  'proposal-faisabilite',
  'proposal-offre',
  'proposal-recap',
])

const proposalFirmOnlyNames = new Set(['proposal-succes', 'proposal-offre-cliente'])

const appointmentNeedsCurrent = new Set([
  'appointment-plan',
  'appointment-checklist-cliente',
  'appointment-checklist-coiffeuse',
  'appointment-ready',
])

const appointmentPrepNames = new Set([
  'appointment-plan',
  'appointment-checklist-cliente',
  'appointment-checklist-coiffeuse',
])

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/cadre',
      name: 'framework-accueil',
      component: FrameworkAccueilView,
    },
    {
      path: '/cadre/contextes',
      name: 'framework-contextes',
      component: FrameworkContextesView,
    },
    {
      path: '/cadre/accueil-acces',
      name: 'framework-accueil-acces',
      component: FrameworkAccueilAccesView,
    },
    {
      path: '/cadre/communication-paiement',
      name: 'framework-communication',
      component: FrameworkCommunicationView,
    },
    {
      path: '/cadre/politiques-securite',
      name: 'framework-politiques',
      component: FrameworkPolitiquesView,
    },
    {
      path: '/cadre/recapitulatif',
      name: 'framework-recap',
      component: FrameworkRecapView,
    },
    {
      path: '/cadre/succes',
      name: 'framework-succes',
      component: FrameworkSuccesView,
    },
    {
      path: '/capacite',
      name: 'capacity-accueil',
      component: CapacityAccueilView,
    },
    {
      path: '/capacite/prestation',
      name: 'capacity-prestation',
      component: CapacityPrestationView,
    },
    {
      path: '/capacite/galerie',
      name: 'capacity-galerie',
      component: CapacityGalerieView,
    },
    {
      path: '/capacite/service',
      name: 'capacity-service',
      component: CapacityServiceView,
    },
    {
      path: '/capacite/prix',
      name: 'capacity-prix',
      component: CapacityPrixView,
    },
    {
      path: '/capacite/lieu',
      name: 'capacity-lieu',
      component: CapacityLieuView,
    },
    {
      path: '/capacite/recapitulatif',
      name: 'capacity-recap',
      component: CapacityRecapView,
    },
    {
      path: '/capacite/succes',
      name: 'capacity-succes',
      component: CapacitySuccesView,
    },
    {
      path: '/capacite/liste',
      name: 'capacity-liste',
      component: CapacityListeView,
    },
    {
      path: '/demande',
      name: 'demand-accueil',
      component: DemandAccueilView,
    },
    {
      path: '/demande/entree',
      name: 'demand-entree',
      component: DemandEntreeView,
    },
    {
      path: '/demande/resultat',
      name: 'demand-resultat',
      component: DemandResultatView,
    },
    {
      path: '/demande/temps-budget',
      name: 'demand-temps-budget',
      component: DemandTempsBudgetView,
    },
    {
      path: '/demande/zone',
      name: 'demand-zone',
      component: DemandZoneView,
    },
    {
      path: '/demande/service',
      name: 'demand-service',
      component: DemandServiceView,
    },
    {
      path: '/demande/recapitulatif',
      name: 'demand-recap',
      component: DemandRecapView,
    },
    {
      path: '/demande/succes',
      name: 'demand-succes',
      component: DemandSuccesView,
    },
    {
      path: '/appariement',
      name: 'matching-accueil',
      component: MatchingAccueilView,
    },
    {
      path: '/appariement/lance',
      name: 'matching-lance',
      component: MatchingLanceView,
    },
    {
      path: '/appariement/campagne',
      name: 'matching-campagne',
      component: MatchingCampagneView,
    },
    {
      path: '/appariement/invitation/:id',
      name: 'matching-invitation',
      component: MatchingInvitationView,
    },
    {
      path: '/appariement/suivi',
      name: 'matching-suivi',
      component: MatchingSuiviView,
    },
    {
      path: '/appariement/shortlist',
      name: 'matching-shortlist',
      component: MatchingShortlistView,
    },
    {
      path: '/proposition',
      name: 'proposal-accueil',
      component: ProposalAccueilView,
    },
    {
      path: '/proposition/synthese',
      name: 'proposal-synthese',
      component: ProposalSyntheseView,
    },
    {
      path: '/proposition/faisabilite',
      name: 'proposal-faisabilite',
      component: ProposalFaisabiliteView,
    },
    {
      path: '/proposition/offre',
      name: 'proposal-offre',
      component: ProposalOffreView,
    },
    {
      path: '/proposition/recapitulatif',
      name: 'proposal-recap',
      component: ProposalRecapView,
    },
    {
      path: '/proposition/succes',
      name: 'proposal-succes',
      component: ProposalSuccesView,
    },
    {
      path: '/proposition/offre-recue',
      name: 'proposal-offre-cliente',
      component: ProposalOffreClienteView,
    },
    {
      path: '/rdv',
      name: 'appointment-accueil',
      component: AppointmentAccueilView,
    },
    {
      path: '/rdv/plan',
      name: 'appointment-plan',
      component: AppointmentPlanView,
    },
    {
      path: '/rdv/checklist-cliente',
      name: 'appointment-checklist-cliente',
      component: AppointmentChecklistClienteView,
    },
    {
      path: '/rdv/checklist-coiffeuse',
      name: 'appointment-checklist-coiffeuse',
      component: AppointmentChecklistCoiffeuseView,
    },
    {
      path: '/rdv/ready',
      name: 'appointment-ready',
      component: AppointmentReadyView,
    },
  ],
  scrollBehavior() {
    return { top: 0 }
  },
})

router.beforeEach((to) => {
  const frameworkStore = useFrameworkStore()
  if (frameworkStore.isActive && frameworkDraftNames.has(to.name)) {
    return { name: 'framework-succes' }
  }

  const capacityStore = useCapacityStore()
  const current = capacityStore.currentCapacity
  if (current?.status === CapacityStatus.OPEN && capacityWizardNames.has(to.name)) {
    return { name: 'capacity-succes' }
  }

  const demandStore = useDemandStore()
  const demand = demandStore.currentDemand
  if (demand?.status === DemandStatus.QUALIFIED && demandWizardNames.has(to.name)) {
    return { name: 'demand-succes' }
  }

  const matchingStore = useMatchingStore()
  const campaign = matchingStore.currentCampaign

  if (matchingNeedsCampaign.has(to.name) && !campaign) {
    return { name: 'matching-accueil' }
  }

  if (
    campaign?.status === CampaignStatus.SHORTLIST_READY &&
    matchingUpstreamWhenShortlist.has(to.name)
  ) {
    return { name: 'matching-shortlist' }
  }

  if (to.name === 'matching-invitation' && matchingStore.demoRole !== DemoRole.PRO) {
    return { name: 'matching-suivi' }
  }

  if (
    to.name === 'matching-shortlist' &&
    campaign &&
    campaign.status !== CampaignStatus.SHORTLIST_READY
  ) {
    return { name: 'matching-suivi' }
  }

  const proposalStore = useProposalStore()
  const proposal = proposalStore.currentProposal

  if (proposalWizardNames.has(to.name) && !proposal) {
    return { name: 'proposal-accueil' }
  }

  if (
    proposal?.status === ProposalStatus.FIRM &&
    proposalWizardNames.has(to.name)
  ) {
    return { name: 'proposal-succes' }
  }

  if (
    proposalFirmOnlyNames.has(to.name) &&
    (!proposal || proposal.status !== ProposalStatus.FIRM)
  ) {
    return { name: 'proposal-accueil' }
  }

  const appointmentStore = useAppointmentStore()
  const appointment = appointmentStore.currentAppointment

  if (appointmentNeedsCurrent.has(to.name) && !appointment) {
    appointmentStore.ensureDemoSeed()
  }

  const currentAppointment = appointmentStore.currentAppointment

  if (
    currentAppointment?.status === AppointmentStatus.READY &&
    appointmentPrepNames.has(to.name)
  ) {
    return { name: 'appointment-ready' }
  }

  if (
    to.name === 'appointment-ready' &&
    (!currentAppointment || currentAppointment.status !== AppointmentStatus.READY)
  ) {
    return currentAppointment
      ? { name: 'appointment-plan' }
      : { name: 'appointment-accueil' }
  }

  return true
})

export default router
