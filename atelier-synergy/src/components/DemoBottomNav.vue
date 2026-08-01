<script setup>
import { computed } from 'vue'
import { storeToRefs } from 'pinia'
import { useRoute, useRouter } from 'vue-router'
import { useOpenMetierBlock } from '../composables/useOpenMetierBlock'
import {
  activeTabId,
  navLocationForTab,
  tabBadgeCount,
  tabsForRole,
} from '../mocks/demoNav'
import { useDemoRoleStore } from '../stores/demoRole'

const route = useRoute()
const router = useRouter()
const demoRoleStore = useDemoRoleStore()
const { demoRole } = storeToRefs(demoRoleStore)
const { blockBadges } = useOpenMetierBlock()

const tabs = computed(() => tabsForRole(demoRole.value))

const currentTabId = computed(() =>
  activeTabId({
    role: demoRole.value,
    routeName: route.name,
    tabParam: route.params.tabId,
  }),
)

function badgeForTab(tab) {
  return tabBadgeCount(tab, blockBadges.value)
}

function goTab(tab) {
  if (currentTabId.value === tab.id && route.name === 'nav-tab') return
  router.push(navLocationForTab(tab.id))
}
</script>

<template>
  <!-- Teleport hors de #app : le transform du shell casserait position:fixed au scroll -->
  <Teleport to="body">
    <nav
      data-demo-bottom-nav
      class="as-bottom-nav"
      aria-label="Navigation démo"
    >
      <div class="as-bottom-nav__inner">
        <button
          v-for="tab in tabs"
          :key="tab.id"
          type="button"
          class="as-bottom-nav__item"
          :class="{ 'as-bottom-nav__item--active': currentTabId === tab.id }"
          :aria-current="currentTabId === tab.id ? 'page' : undefined"
          @click="goTab(tab)"
        >
          <span
            v-if="badgeForTab(tab) > 0"
            class="as-badge-bounce as-bottom-nav__badge"
            :aria-label="`${badgeForTab(tab)} à voir`"
          >
            {{ badgeForTab(tab) > 9 ? '9+' : badgeForTab(tab) }}
          </span>
          <span
            class="material-symbols-outlined as-bottom-nav__icon"
            :class="{ 'as-icon-filled': currentTabId === tab.id }"
            aria-hidden="true"
          >
            {{ tab.icon }}
          </span>
          <span class="as-bottom-nav__label">{{ tab.label }}</span>
        </button>
      </div>
    </nav>
  </Teleport>
</template>
