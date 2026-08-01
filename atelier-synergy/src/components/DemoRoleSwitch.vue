<script setup>
import { inject } from 'vue'
import { storeToRefs } from 'pinia'
import { useRouter } from 'vue-router'
import { DemoRole, demoRoleLabel } from '../domain/demoRole'
import { firstTabId, navLocationForRoleHome, navLocationForTab } from '../mocks/demoNav'
import { useDemoRoleStore } from '../stores/demoRole'

const router = useRouter()
const demoRoleStore = useDemoRoleStore()
const { demoRole } = storeToRefs(demoRoleStore)
const openDemoWelcome = inject('openDemoWelcome', null)

function setRole(role) {
  demoRoleStore.setDemoRole(role)
  router.replace(navLocationForTab(firstTabId(role)))
}

function resetAll() {
  const ok = window.confirm(
    'Réinitialiser ? Cela restaure les données démo par défaut (coiffeuses + demande seed).',
  )
  if (!ok) return
  try {
    localStorage.clear()
  } catch {
    /* ignore */
  }
  router.replace(navLocationForRoleHome(demoRole.value)).finally(() => {
    window.location.reload()
  })
}
</script>

<template>
  <div
    data-demo-role-switch
    class="sticky top-0 z-[60] w-full border-b border-outline-variant bg-surface/95 backdrop-blur-sm"
    aria-label="Barre démo globale"
  >
    <div
      class="mx-auto flex max-w-lg items-center gap-sm px-margin-mobile py-unit"
      role="group"
      aria-label="Rôle démo global"
    >
      <span
        class="font-label-sm text-label-sm uppercase tracking-wider text-on-surface-variant shrink-0"
      >
        Vue
      </span>
      <div
        class="flex flex-1 items-center gap-unit rounded-lg border border-outline-variant bg-surface-container-low p-unit"
      >
        <button
          type="button"
          class="flex-1 font-label-sm text-label-sm uppercase tracking-wider px-sm py-2 rounded transition-colors"
          :class="
            demoRole === DemoRole.CLIENT
              ? 'bg-primary text-on-primary'
              : 'text-on-surface-variant hover:bg-surface-container'
          "
          :aria-pressed="demoRole === DemoRole.CLIENT"
          @click="setRole(DemoRole.CLIENT)"
        >
          {{ demoRoleLabel(DemoRole.CLIENT) }}
        </button>
        <button
          type="button"
          class="flex-1 font-label-sm text-label-sm uppercase tracking-wider px-sm py-2 rounded transition-colors"
          :class="
            demoRole === DemoRole.PRO
              ? 'bg-primary text-on-primary'
              : 'text-on-surface-variant hover:bg-surface-container'
          "
          :aria-pressed="demoRole === DemoRole.PRO"
          @click="setRole(DemoRole.PRO)"
        >
          {{ demoRoleLabel(DemoRole.PRO) }}
        </button>
      </div>
      <button
        v-if="openDemoWelcome"
        type="button"
        class="shrink-0 font-label-sm text-label-sm uppercase tracking-wider text-on-surface-variant underline-offset-2 hover:underline px-sm py-2"
        @click="openDemoWelcome"
      >
        Démo
      </button>
      <button
        type="button"
        class="shrink-0 font-label-sm text-label-sm uppercase tracking-wider text-secondary underline-offset-2 hover:underline px-sm py-2"
        @click="resetAll"
      >
        Réinitialiser
      </button>
    </div>
  </div>
</template>
