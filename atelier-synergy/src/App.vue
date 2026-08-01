<script setup>
import { onMounted, provide, ref } from 'vue'
import DemoBottomNav from './components/DemoBottomNav.vue'
import DemoRoleSwitch from './components/DemoRoleSwitch.vue'
import DemoWelcomeModal from './components/DemoWelcomeModal.vue'

const WELCOME_KEY = 'as-demo-welcome-seen'
const welcomeOpen = ref(false)

function openWelcome() {
  welcomeOpen.value = true
}

function closeWelcome() {
  welcomeOpen.value = false
  try {
    localStorage.setItem(WELCOME_KEY, '1')
  } catch {
    /* ignore */
  }
}

onMounted(() => {
  try {
    if (!localStorage.getItem(WELCOME_KEY)) {
      welcomeOpen.value = true
    }
  } catch {
    welcomeOpen.value = true
  }
})

provide('openDemoWelcome', openWelcome)
</script>

<template>
  <div class="as-app-shell">
    <DemoRoleSwitch />
    <RouterView />
    <DemoBottomNav />
    <DemoWelcomeModal :open="welcomeOpen" @close="closeWelcome" />
  </div>
</template>
