import { createRouter, createWebHistory } from 'vue-router'
import { CapacityStatus } from '../domain/capacity/model'
import { useCapacityStore } from '../stores/capacity'
import { useFrameworkStore } from '../stores/framework'
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

  return true
})

export default router
