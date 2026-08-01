<script setup>
import { STEPPER_STEPS } from '../../domain/engagement/labels'

defineProps({
  /** 1-based active step (1=Récap, 2=Accord, 3=Paie) */
  step: {
    type: Number,
    required: true,
  },
})
</script>

<template>
  <div class="flex items-center justify-between relative py-2 w-full">
    <div class="absolute left-0 right-0 top-1/2 h-px bg-surface-container -z-10" />
    <div
      class="absolute top-1/2 left-0 h-px bg-primary-container -z-10 transition-all"
      :style="{ width: step <= 1 ? '0%' : step === 2 ? '50%' : '100%' }"
    />
    <div
      v-for="(s, i) in STEPPER_STEPS"
      :key="s.key"
      class="flex flex-col items-center gap-2 bg-background px-1"
    >
      <div
        class="w-6 h-6 rounded-full flex items-center justify-center font-label-technical text-label-technical border"
        :class="
          i + 1 < step
            ? 'bg-primary-container text-on-primary border-primary-container'
            : i + 1 === step
              ? 'bg-secondary-container text-on-secondary-container border-secondary-container'
              : 'bg-surface border-outline-variant text-on-surface-variant'
        "
      >
        <span v-if="i + 1 < step" class="material-symbols-outlined text-[14px]">check</span>
        <span v-else>{{ i + 1 }}</span>
      </div>
      <span
        class="font-label-caps text-[9px] tracking-wider uppercase text-center"
        :class="
          i + 1 === step
            ? 'text-primary'
            : i + 1 < step
              ? 'text-primary-container'
              : 'text-on-surface-variant'
        "
      >
        {{ s.label }}
      </span>
    </div>
  </div>
</template>
