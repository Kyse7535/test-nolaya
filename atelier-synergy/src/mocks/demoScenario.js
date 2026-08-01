/**
 * Central demo scenario: qualified demand + OPEN capacity vivier.
 * Idempotent — safe at bootstrap and after reset.
 */

import { POOL_SIZE } from '../domain/matching/model'
import { useCapacityStore } from '../stores/capacity'
import { useDemandStore } from '../stores/demand'
import {
  MATCHING_POOL_PROFILES,
  SEED_DEMAND_ID,
  buildSeedOpenCapacity,
  buildSeedQualifiedDemand,
} from './matchingPool'

export function isSeedDemandId(id) {
  if (!id || typeof id !== 'string') return false
  return id === SEED_DEMAND_ID || id.startsWith('dem_seed_')
}

/**
 * Ensure seed qualified demand + enough OPEN seed capacities exist.
 * Does not create a campaign.
 * @returns {{ demand: object, openCapacities: object[] }}
 */
export function seedDemoScenario() {
  const demandStore = useDemandStore()
  const capacityStore = useCapacityStore()

  let demand =
    demandStore.qualifiedDemands[demandStore.qualifiedDemands.length - 1] ?? null
  if (!demand) {
    demand = buildSeedQualifiedDemand()
    demandStore.importDemand(demand, { setAsCurrent: true })
  } else if (demandStore.currentDemandId !== demand.id) {
    demandStore.setCurrent(demand.id)
  }

  if (capacityStore.openCapacities.length < POOL_SIZE) {
    const existingIds = new Set(capacityStore.capacities.map((c) => c.id))
    for (const profile of MATCHING_POOL_PROFILES) {
      if (existingIds.has(profile.capacityId)) continue
      if (capacityStore.openCapacities.length >= POOL_SIZE) break
      capacityStore.importCapacity(buildSeedOpenCapacity(profile))
    }
    // If still short (ids collided with closed/draft), pad remaining profiles with new ids
    let pad = 0
    while (capacityStore.openCapacities.length < POOL_SIZE && pad < MATCHING_POOL_PROFILES.length) {
      const profile = MATCHING_POOL_PROFILES[pad]
      const id = `${profile.capacityId}_pad${pad}`
      if (!capacityStore.capacities.some((c) => c.id === id)) {
        capacityStore.importCapacity({
          ...buildSeedOpenCapacity(profile),
          id,
        })
      }
      pad += 1
    }
  }

  return { demand, openCapacities: capacityStore.openCapacities }
}
