export const DemoRole = {
  CLIENT: 'client',
  PRO: 'pro',
}

export const STORAGE_KEY_DEMO_ROLE = 'as.mvp.demoRole'

/** Legacy per-bloc keys — migrated once into the global key. */
const LEGACY_DEMO_ROLE_KEYS = [
  'as.mvp.appointmentDemoRole',
  'as.mvp.executionDemoRole',
  'as.mvp.settlementDemoRole',
  'as.mvp.experienceDemoRole',
]

export function readStoredDemoRole() {
  try {
    const value = localStorage.getItem(STORAGE_KEY_DEMO_ROLE)
    if (value === DemoRole.PRO || value === DemoRole.CLIENT) return value

    for (const key of LEGACY_DEMO_ROLE_KEYS) {
      const legacy = localStorage.getItem(key)
      if (legacy === DemoRole.PRO || legacy === DemoRole.CLIENT) {
        localStorage.setItem(STORAGE_KEY_DEMO_ROLE, legacy)
        return legacy
      }
    }

    return DemoRole.CLIENT
  } catch {
    return DemoRole.CLIENT
  }
}

export function writeStoredDemoRole(role) {
  localStorage.setItem(STORAGE_KEY_DEMO_ROLE, role)
}

export function clearStoredDemoRole() {
  localStorage.removeItem(STORAGE_KEY_DEMO_ROLE)
  for (const key of LEGACY_DEMO_ROLE_KEYS) {
    localStorage.removeItem(key)
  }
}

export function demoRoleLabel(role) {
  if (role === DemoRole.PRO) return 'Coiffeuse'
  return 'Cliente'
}
