/**
 * Vivier mock étape 2 — vague 1 names aligned S05/S06.
 * Stable seed ids so campaigns can re-link after refresh.
 */

export const MATCHING_POOL_PROFILES = [
  {
    seedKey: 'awa',
    capacityId: 'cap_seed_awa',
    displayName: 'Awa D.',
    styleTag: 'Knotless',
    styleDetail: 'Knotless · braids',
    distanceKm: 4,
    wave: 1,
    avatarUrl:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuCmE-Ti6qLRRKB8gdN_FdP1gXRksj_VuBfsPO2jvg4mqfeWFD8SNFkztN9jX03aAuIq-5MhBeO7kf3NxN--LIfDvEr9Btt7AiEWZUjK_mTu13w6OoSa_yJ3Dk-ZDqxf3pPuv8SXqsFeOiVnXDgK-DSFFiyPUHZbm2HgwmoqpjUSuDACTdKGog0viqz5WzmyValhkGQVi6mO5zUPOQArNoDwcytWyQa2ATXSZdAwcWnxHxMvb8LvkFy_',
    prestationLabel: 'Knotless',
    prestationVariante: 'medium',
  },
  {
    seedKey: 'mariam',
    capacityId: 'cap_seed_mariam',
    displayName: 'Mariam K.',
    styleTag: 'Braids / twists',
    styleDetail: 'Braids · twists',
    distanceKm: 7,
    wave: 1,
    avatarUrl:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuAjeVyhLWlKQYZbRA4DmxRaQU6GnHZHzIN4K8zMSYY2lAQc-cMGJ4RIU6XtyYPtnLm9zZEHERb0uxKIS2Ran1bx-h0qQaHn-O2znRJxeUU61JXkBVHWQSqT9fGqDVoEHUcwTn2YXWmC1udQzHRJQNG2QuEcACCOjLGlMXlkpWPYYEJmynP-v3QYg3obHSxZg1qiCpDLz7Rtrh5d6YzSu7-vhZa98bqoQ9MPLrWTu9RFzJQqXCyNV3Au',
    prestationLabel: 'Braids / twists',
    prestationVariante: 'medium',
  },
  {
    seedKey: 'fatou',
    capacityId: 'cap_seed_fatou',
    displayName: 'Fatou B.',
    styleTag: 'Vanilles',
    styleDetail: 'Vanilles · twists',
    distanceKm: 5.2,
    wave: 1,
    avatarUrl:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuCOSTsl1h1oddDJMP2zT-SszeNGJu7RJjNtXY1ekkWSvGrbq1dHQJuxNYAHYHROGg6xEcJesrAljJSVvBlwey8L1OElR1YCZhbaBKF4FY8JAjy8Q4nqyGWPcS8Tnlrzic68RoZY2bs_pIh-jk74AwMQ0-eOEgKD4bLo56jzVilIIgscNCcn-qaw93mHAdGbmIX5RIO7j4wpgOwdCqEsI8X3l8L6EX8cgw742n_HCyoYtXTJKYbltvWy',
    prestationLabel: 'Vanilles',
    prestationVariante: 'medium',
  },
  {
    seedKey: 'chloe',
    capacityId: 'cap_seed_chloe',
    displayName: 'Chloe M.',
    styleTag: 'Knotless',
    styleDetail: 'Knotless · Box braids',
    distanceKm: 8.5,
    wave: null,
    avatarUrl: null,
    prestationLabel: 'Knotless',
    prestationVariante: 'medium',
  },
  {
    seedKey: 'sarah',
    capacityId: 'cap_seed_sarah',
    displayName: 'Sarah T.',
    styleTag: 'Weaves',
    styleDetail: 'Weaves · Custom wigs',
    distanceKm: 12,
    wave: null,
    avatarUrl: null,
    prestationLabel: 'Weaves',
    prestationVariante: 'custom',
  },
  {
    seedKey: 'nia',
    capacityId: 'cap_seed_nia',
    displayName: 'Nia L.',
    styleTag: 'Natural styling',
    styleDetail: 'Natural styling · Color',
    distanceKm: 15,
    wave: null,
    avatarUrl: null,
    prestationLabel: 'Natural styling',
    prestationVariante: 'color',
  },
]

export const SEED_DEMAND_ID = 'dem_seed_matching'

/** Qualified demand used when étape 1 has not run yet. */
export function buildSeedQualifiedDemand() {
  return {
    id: SEED_DEMAND_ID,
    status: 'DEMAND_QUALIFIED',
    entryPath: 'catalog',
    result: {
      inspirationId: 'insp_knotless',
      label: 'Knotless',
      variante: 'medium',
      contextIds: [],
    },
    timing: {
      preferredDate: nextSaturdayIso(),
      deadline: deadlineInDaysIso(10),
    },
    budget: {
      target: 100,
      max: 120,
      hairInclusion: 'included',
    },
    zone: {
      areaLabel: 'Paris 18e / nord de Paris',
      radiusKm: 15,
      mobility: 'both',
      placeIds: ['home', 'salon'],
    },
    protectionIds: [],
    serviceLevel: 'ASSISTED',
    clientTasks: ['wash'],
    searchPriority: 'result',
    confirmed: true,
    qualifiedAt: new Date().toISOString(),
    createdAt: new Date().toISOString(),
  }
}

export function buildSeedOpenCapacity(profile) {
  return {
    id: profile.capacityId,
    status: 'CAPACITY_OPEN',
    frameworkVersionId: 'fw_mock_v1',
    displayName: profile.displayName,
    prestation: {
      id: `svc_${profile.seedKey}`,
      label: profile.prestationLabel,
      variante: { taille: profile.prestationVariante, longueur: null, finition: null },
    },
    gallery: [
      {
        id: `g_${profile.seedKey}`,
        src:
          profile.avatarUrl ||
          'https://lh3.googleusercontent.com/aida-public/AB6AXuCmE-Ti6qLRRKB8gdN_FdP1gXRksj_VuBfsPO2jvg4mqfeWFD8SNFkztN9jX03aAuIq-5MhBeO7kf3NxN--LIfDvEr9Btt7AiEWZUjK_mTu13w6OoSa_yJ3Dk-ZDqxf3pPuv8SXqsFeOiVnXDgK-DSFFiyPUHZbm2HgwmoqpjUSuDACTdKGog0viqz5WzmyValhkGQVi6mO5zUPOQArNoDwcytWyQa2ATXSZdAwcWnxHxMvb8LvkFy_',
        proofLevel: 'DECLARED_REALIZATION',
        status: 'GALLERY_ITEM_PUBLISHED',
      },
    ],
    serviceLevel: 'ASSISTED',
    tasks: [{ id: 't1', label: 'Réalisation', owner: 'STYLIST' }],
    pricing: {
      basePrice: 100,
      currency: 'EUR',
      durationMinutes: 240,
      supplements: [],
    },
    location: { context: 'home', label: 'À domicile' },
    availability: {
      days: ['saturday'],
      slots: ['morning'],
    },
    capacityMax: 2,
    desiredDemandVolume: 3,
    confirmed: true,
    openedAt: new Date().toISOString(),
    closedAt: null,
    createdAt: new Date().toISOString(),
  }
}

function nextSaturdayIso() {
  const date = new Date()
  const day = date.getDay()
  const delta = (6 - day + 7) % 7 || 7
  date.setDate(date.getDate() + delta)
  return date.toISOString().slice(0, 10)
}

function deadlineInDaysIso(days) {
  const date = new Date()
  date.setDate(date.getDate() + days)
  return date.toISOString().slice(0, 10)
}

export function poolEntryFromProfile(profile, capacityId = profile.capacityId) {
  return {
    capacityId,
    displayName: profile.displayName,
    styleTag: profile.styleTag,
    styleDetail: profile.styleDetail,
    distanceKm: profile.distanceKm,
    wave: profile.wave,
    avatarUrl: profile.avatarUrl,
  }
}
