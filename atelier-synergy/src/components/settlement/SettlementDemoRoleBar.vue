<script setup>
import { storeToRefs } from 'pinia'
import { DemoRole } from '../../domain/settlement/model'
import { useSettlementStore } from '../../stores/settlement'

const settlementStore = useSettlementStore()
const { demoRole } = storeToRefs(settlementStore)

function setRole(role) {
  settlementStore.setDemoRole(role)
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
