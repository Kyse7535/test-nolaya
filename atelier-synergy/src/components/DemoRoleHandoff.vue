<script setup>
import { computed } from 'vue'
import { storeToRefs } from 'pinia'
import { DemoRole, demoRoleLabel } from '../domain/demoRole'
import { useDemoRoleStore } from '../stores/demoRole'

const props = defineProps({
  targetRole: {
    type: String,
    required: true,
    validator: (value) => value === DemoRole.CLIENT || value === DemoRole.PRO,
  },
  action: {
    type: String,
    required: true,
  },
})

const demoRoleStore = useDemoRoleStore()
const { demoRole } = storeToRefs(demoRoleStore)

const visible = computed(() => demoRole.value !== props.targetRole)

const label = computed(
  () => `Passer en rôle ${demoRoleLabel(props.targetRole)} pour ${props.action}`,
)

function switchRole() {
  demoRoleStore.setDemoRole(props.targetRole)
}
</script>

<template>
  <button
    v-if="visible"
    type="button"
    class="font-body-sm text-body-sm text-secondary underline underline-offset-2 text-left w-fit"
    @click="switchRole"
  >
    {{ label }}
  </button>
</template>
