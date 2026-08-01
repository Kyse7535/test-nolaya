import { computed, ref, watch } from 'vue'
import { defineStore } from 'pinia'
import {
  FrameworkStatus,
  STORAGE_KEY,
  canActivate,
  canContinueAccess,
  canContinueCommunication,
  canContinueContexts,
  canContinuePolicies,
  createDefaultFramework,
} from '../domain/framework/model'

function readStored() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return null
    return { ...createDefaultFramework(), ...JSON.parse(raw) }
  } catch {
    return null
  }
}

function writeStored(framework) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(framework))
}

export const useFrameworkStore = defineStore('framework', () => {
  const framework = ref(readStored() ?? createDefaultFramework())

  watch(
    framework,
    (value) => {
      writeStored(value)
    },
    { deep: true },
  )

  const isDraft = computed(() => framework.value.status === FrameworkStatus.DRAFT)
  const isActive = computed(() => framework.value.status === FrameworkStatus.ACTIVE)
  const canActivateNow = computed(() => canActivate(framework.value))
  const contextsReady = computed(() => canContinueContexts(framework.value))
  const accessReady = computed(() => canContinueAccess(framework.value))
  const communicationReady = computed(() => canContinueCommunication(framework.value))
  const policiesReady = computed(() => canContinuePolicies(framework.value))

  function patch(partial) {
    if (framework.value.status === FrameworkStatus.ACTIVE) return
    framework.value = { ...framework.value, ...partial }
  }

  function toggleInArray(key, id) {
    if (framework.value.status === FrameworkStatus.ACTIVE) return
    const current = framework.value[key] ?? []
    const next = current.includes(id)
      ? current.filter((item) => item !== id)
      : [...current, id]
    patch({ [key]: next })
  }

  function activate() {
    if (!canActivate(framework.value)) return false
    framework.value = {
      ...framework.value,
      status: FrameworkStatus.ACTIVE,
      activatedAt: new Date().toISOString(),
      version: (framework.value.version ?? 1) + 1,
    }
    return true
  }

  function resetDemo() {
    framework.value = createDefaultFramework()
  }

  return {
    framework,
    isDraft,
    isActive,
    canActivateNow,
    contextsReady,
    accessReady,
    communicationReady,
    policiesReady,
    patch,
    toggleInArray,
    activate,
    resetDemo,
  }
})
