/** Stable immersion id helpers (no store imports — safe for capacity/demand filters). */

export const STORAGE_KEY_IMMERSION = 'as.mvp.immersionTree'

export function isImmersionDemandId(id) {
  return Boolean(id && typeof id === 'string' && id.startsWith('dem_imm_'))
}

export function isImmersionCapacityId(id) {
  return Boolean(id && typeof id === 'string' && id.startsWith('cap_imm_'))
}

export function isImmersionSystemId(id) {
  if (!id || typeof id !== 'string') return false
  return (
    id.startsWith('dem_imm_') ||
    id.startsWith('cap_imm_') ||
    id.startsWith('camp_imm_') ||
    id.startsWith('prop_imm_') ||
    id.startsWith('eng_imm_') ||
    id.startsWith('appt_imm_') ||
    id.startsWith('hold_imm_') ||
    id.startsWith('pay_imm_') ||
    id.startsWith('set_imm_') ||
    id.startsWith('exp_imm_')
  )
}

export function readImmersionState() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY_IMMERSION)
    if (!raw) return { pro: null, client: null }
    const parsed = JSON.parse(raw)
    return {
      pro: parsed?.pro ?? null,
      client: parsed?.client ?? null,
    }
  } catch {
    return { pro: null, client: null }
  }
}

export function writeImmersionState(state) {
  localStorage.setItem(STORAGE_KEY_IMMERSION, JSON.stringify(state))
}

export function clearImmersionState() {
  try {
    localStorage.removeItem(STORAGE_KEY_IMMERSION)
  } catch {
    /* ignore */
  }
}
