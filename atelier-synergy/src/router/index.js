import { createRouter, createWebHistory } from 'vue-router'
import { useFrameworkStore } from '../stores/framework'
import HomeView from '../views/HomeView.vue'
import FrameworkAccueilView from '../views/framework/FrameworkAccueilView.vue'
import FrameworkContextesView from '../views/framework/FrameworkContextesView.vue'
import FrameworkAccueilAccesView from '../views/framework/FrameworkAccueilAccesView.vue'
import FrameworkCommunicationView from '../views/framework/FrameworkCommunicationView.vue'
import FrameworkPolitiquesView from '../views/framework/FrameworkPolitiquesView.vue'
import FrameworkRecapView from '../views/framework/FrameworkRecapView.vue'
import FrameworkSuccesView from '../views/framework/FrameworkSuccesView.vue'

const frameworkDraftNames = new Set([
  'framework-accueil',
  'framework-contextes',
  'framework-accueil-acces',
  'framework-communication',
  'framework-politiques',
  'framework-recap',
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
  ],
  scrollBehavior() {
    return { top: 0 }
  },
})

router.beforeEach((to) => {
  const store = useFrameworkStore()
  if (store.isActive && frameworkDraftNames.has(to.name)) {
    return { name: 'framework-succes' }
  }
  return true
})

export default router
