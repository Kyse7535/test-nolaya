<script setup>
import { computed, watch } from 'vue'
import { storeToRefs } from 'pinia'
import { useRoute, useRouter } from 'vue-router'
import { useOpenMetierBlock } from '../composables/useOpenMetierBlock'
import {
  firstTabId,
  navLocationForTab,
  tabById,
} from '../mocks/demoNav'
import { metierBlocksForRole } from '../mocks/metierBlocks'
import { useDemoRoleStore } from '../stores/demoRole'

const route = useRoute()
const router = useRouter()
const demoRoleStore = useDemoRoleStore()
const { demoRole } = storeToRefs(demoRoleStore)
const { badgeFor, openBlock } = useOpenMetierBlock()

const tabId = computed(() =>
  route.name === 'nav-tab' ? String(route.params.tabId || '') : '',
)

const activeTab = computed(() =>
  tabId.value ? tabById(demoRole.value, tabId.value) : null,
)

const visibleBlocks = computed(() => {
  const all = metierBlocksForRole(demoRole.value)
  if (!activeTab.value) return all
  const allowed = new Set(activeTab.value.blockIds)
  return all.filter((block) => allowed.has(block.id))
})

watch(
  [demoRole, () => route.name, tabId],
  ([role, name, id]) => {
    if (name !== 'nav-tab') return
    if (tabById(role, id)) return
    router.replace(navLocationForTab(firstTabId(role)))
  },
  { immediate: true },
)
</script>

<template>
  <div class="bg-background text-on-surface font-body-md antialiased min-h-screen">
    <main class="max-w-lg mx-auto w-full px-margin-mobile py-xl pb-[calc(5.5rem+env(safe-area-inset-bottom))]">
      <header v-if="activeTab" class="mb-lg">
        <h1 class="font-headline-sm text-headline-sm text-primary leading-tight">
          {{ activeTab.label }}
        </h1>
        <p class="font-body-sm text-body-sm text-on-surface-variant mt-xs leading-snug">
          {{ activeTab.description }}
        </p>
      </header>

      <ul class="flex flex-col gap-sm">
        <li v-for="block in visibleBlocks" :key="block.id">
          <button
            type="button"
            class="relative w-full text-left rounded-xl border px-md py-sm transition-colors"
            :class="
              block.status === 'ready'
                ? 'bg-surface-container-lowest border-surface-container hover:border-outline-variant cursor-pointer'
                : 'bg-surface-container-low border-surface-container opacity-70 cursor-not-allowed'
            "
            :disabled="block.status !== 'ready'"
            @click="openBlock(block)"
          >
            <span
              v-if="badgeFor(block.id) > 0"
              class="as-badge-bounce absolute -top-2 -right-2 font-label-mono text-label-mono min-w-[1.5rem] h-6 px-1.5 inline-flex items-center justify-center rounded-full bg-primary text-on-primary shadow-sm"
              :aria-label="`${badgeFor(block.id)} à voir`"
            >
              {{ badgeFor(block.id) }}
            </span>
            <div class="flex items-center justify-between gap-md mb-xs">
              <span
                class="font-label-mono text-label-mono text-on-surface-variant uppercase tracking-wider"
              >
                {{ block.order }}
              </span>
              <span
                v-if="badgeFor(block.id) > 0"
                class="font-label-mono text-label-mono px-2 py-0.5 rounded uppercase bg-primary text-on-primary"
              >
                Voir
              </span>
              <span
                v-else
                class="font-label-mono text-label-mono px-2 py-0.5 rounded uppercase"
                :class="
                  block.status === 'ready'
                    ? 'bg-secondary-container text-on-secondary-container'
                    : 'bg-surface-container text-on-surface-variant'
                "
              >
                {{ block.status === 'ready' ? 'Dispo' : 'Bientôt' }}
              </span>
            </div>
            <h2 class="font-headline-sm text-headline-sm text-primary leading-tight">
              {{ block.title }}
            </h2>
            <p class="font-body-sm text-body-sm text-on-surface-variant mt-xs leading-snug">
              {{ block.description }}
            </p>
          </button>
        </li>
      </ul>
    </main>
  </div>
</template>
