import { computed, ref, watch } from 'vue'
import { defineStore } from 'pinia'
import {
  DemoRole,
  clearStoredDemoRole,
  demoRoleLabel,
  readStoredDemoRole,
  writeStoredDemoRole,
} from '../domain/demoRole'

export const useDemoRoleStore = defineStore('demoRole', () => {
  const demoRole = ref(readStoredDemoRole())

  watch(demoRole, (value) => {
    writeStoredDemoRole(value)
  })

  const isClient = computed(() => demoRole.value === DemoRole.CLIENT)
  const isPro = computed(() => demoRole.value === DemoRole.PRO)
  const label = computed(() => demoRoleLabel(demoRole.value))

  function setDemoRole(role) {
    if (role !== DemoRole.CLIENT && role !== DemoRole.PRO) return
    demoRole.value = role
  }

  function toggleDemoRole() {
    demoRole.value =
      demoRole.value === DemoRole.PRO ? DemoRole.CLIENT : DemoRole.PRO
  }

  function resetDemo() {
    demoRole.value = DemoRole.CLIENT
    clearStoredDemoRole()
    writeStoredDemoRole(DemoRole.CLIENT)
  }

  return {
    demoRole,
    isClient,
    isPro,
    label,
    setDemoRole,
    toggleDemoRole,
    resetDemo,
    DemoRole,
  }
})
