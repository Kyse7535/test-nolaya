<script setup>
import { storeToRefs } from 'pinia'
import { DemoRole } from '../../domain/matching/model'
import { useMatchingStore } from '../../stores/matching'

const matchingStore = useMatchingStore()
const { demoRole } = storeToRefs(matchingStore)

function setRole(role) {
  matchingStore.setDemoRole(role)
}
</script>

<template>
  <div
    class="flex items-center justify-center gap-xs rounded-lg border border-outline-variant bg-surface-container-low p-unit"
    role="group"
    aria-label="Rôle démo"
  >
    <button
      type="button"
      class="flex-1 font-label-sm text-label-sm uppercase tracking-wider px-sm py-2 rounded transition-colors"
      :class="
        demoRole === DemoRole.CLIENT
          ? 'bg-primary text-on-primary'
          : 'text-on-surface-variant hover:bg-surface-container'
      "
      @click="setRole(DemoRole.CLIENT)"
    >
      Cliente
    </button>
    <button
      type="button"
      class="flex-1 font-label-sm text-label-sm uppercase tracking-wider px-sm py-2 rounded transition-colors"
      :class="
        demoRole === DemoRole.PRO
          ? 'bg-primary text-on-primary'
          : 'text-on-surface-variant hover:bg-surface-container'
      "
      @click="setRole(DemoRole.PRO)"
    >
      Coiffeuse
    </button>
  </div>
</template>
