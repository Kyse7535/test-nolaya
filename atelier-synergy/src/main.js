import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'
import { catalogServices } from './mocks/catalog'
import { platformPolicies, platformPrinciples } from './mocks/platform'
import { STORAGE_KEY_CATALOG } from './domain/capacity/model'
import './assets/main.css'

if (!localStorage.getItem('as.mvp.platform.policies')) {
  localStorage.setItem('as.mvp.platform.policies', JSON.stringify(platformPolicies))
}
if (!localStorage.getItem('as.mvp.platform.principles')) {
  localStorage.setItem('as.mvp.platform.principles', JSON.stringify(platformPrinciples))
}
if (!localStorage.getItem(STORAGE_KEY_CATALOG)) {
  localStorage.setItem(STORAGE_KEY_CATALOG, JSON.stringify(catalogServices))
}

createApp(App).use(createPinia()).use(router).mount('#app')
