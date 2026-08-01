<script setup>
import { STEPPER_STEPS } from '../../domain/proposal/labels'

defineProps({
  /** 1-based active step (1=Synthèse … 4=Publier) */
  step: {
    type: Number,
    required: true,
  },
  /** 'circles' | 'bars' */
  variant: {
    type: String,
    default: 'circles',
  },
})
</script>

<template>
  <div
    v-if="variant === 'bars'"
    class="flex items-center justify-between gap-1 w-full max-w-sm mx-auto"
  >
    <div
      v-for="(s, i) in STEPPER_STEPS"
      :key="s.key"
      class="h-1 flex-1 rounded-full"
      :class="i < step ? 'bg-primary' : 'bg-primary-fixed'"
    />
  </div>
  <div v-else class="flex items-center justify-between relative py-2">
    <div class="absolute left-0 right-0 top-1/2 h-px bg-surface-container -z-10" />
    <div
      v-for="(s, i) in STEPPER_STEPS"
      :key="s.key"
      class="flex flex-col items-center gap-1 bg-background px-1"
    >
      <div
        class="w-7 h-7 rounded-full flex items-center justify-center font-label-mono text-label-mono"
        :class="
          i + 1 < step
            ? 'bg-primary text-on-primary'
            : i + 1 === step
              ? 'bg-secondary-container text-on-secondary-container border border-secondary'
              : 'bg-surface-container text-on-surface-variant'
        "
      >
        <span v-if="i + 1 < step" class="material-symbols-outlined text-[14px]">check</span>
        <span v-else>{{ i + 1 }}</span>
      </div>
      <span
        class="font-label-status text-label-status text-center"
        :class="
          i + 1 === step
            ? 'text-secondary font-semibold'
            : i + 1 < step
              ? 'text-on-surface-variant'
              : 'text-on-surface-variant opacity-60'
        "
      >
        {{ s.label }}
      </span>
    </div>
  </div>
</template>
