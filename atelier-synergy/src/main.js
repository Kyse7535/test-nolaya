import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'
import { platformPolicies, platformPrinciples } from './mocks/platform'
import './assets/main.css'

if (!localStorage.getItem('as.mvp.platform.policies')) {
  localStorage.setItem('as.mvp.platform.policies', JSON.stringify(platformPolicies))
}
if (!localStorage.getItem('as.mvp.platform.principles')) {
  localStorage.setItem('as.mvp.platform.principles', JSON.stringify(platformPrinciples))
}

createApp(App).use(createPinia()).use(router).mount('#app')
