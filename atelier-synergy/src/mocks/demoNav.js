import { DemoRole } from '../domain/demoRole'

/**
 * Bottom-nav IA: group métier blocks into role-specific zones.
 * Hubs list the blocks; wizards stay linear underneath.
 */

/** @typedef {{ id: string, label: string, icon: string, blockIds: string[], description: string }} DemoNavTab */

/** @type {Record<string, DemoNavTab[]>} */
export const DEMO_NAV_TABS = {
  [DemoRole.PRO]: [
    {
      id: 'offre',
      label: 'Offre',
      icon: 'storefront',
      blockIds: ['avant-0', 'etape-0'],
      description: 'Cadre professionnel et prestations ouvertes.',
    },
    {
      id: 'demandes',
      label: 'Demandes',
      icon: 'inbox',
      blockIds: ['etape-2', 'etape-3'],
      description: 'Invitations reçues et validation de faisabilité.',
    },
    {
      id: 'missions',
      label: 'Missions',
      icon: 'event',
      // etape-4 stays for route→tab highlight only; hub card is client-only.
      blockIds: ['etape-4', 'etape-5', 'etape-6'],
      description: 'Checklist RDV et réalisation.',
    },
    {
      id: 'cloture',
      label: 'Clôture',
      icon: 'task_alt',
      blockIds: ['etape-7', 'etape-8'],
      description: 'Revenu et avis clientes.',
    },
  ],
  [DemoRole.CLIENT]: [
    {
      id: 'besoin',
      label: 'Besoin',
      icon: 'search',
      blockIds: ['etape-1'],
      description: 'Exprimer et cadrer le besoin.',
    },
    {
      id: 'recherche',
      label: 'Recherche',
      icon: 'group',
      blockIds: ['etape-2', 'etape-3'],
      description: 'Appariement et offres reçues.',
    },
    {
      id: 'rdv',
      label: 'Rendez-vous',
      icon: 'event',
      blockIds: ['etape-4', 'etape-5', 'etape-6'],
      description: 'Engagement, préparation et prestation.',
    },
    {
      id: 'suite',
      label: 'Suite',
      icon: 'task_alt',
      blockIds: ['etape-7', 'etape-8'],
      description: 'Paiement et avis.',
    },
  ],
}

const ROUTE_PREFIX_TO_BLOCK = {
  framework: 'avant-0',
  capacity: 'etape-0',
  demand: 'etape-1',
  matching: 'etape-2',
  proposal: 'etape-3',
  engagement: 'etape-4',
  appointment: 'etape-5',
  execution: 'etape-6',
  settlement: 'etape-7',
  experience: 'etape-8',
}

export function tabsForRole(role) {
  return DEMO_NAV_TABS[role] || DEMO_NAV_TABS[DemoRole.CLIENT]
}

export function firstTabId(role) {
  return tabsForRole(role)[0]?.id ?? 'besoin'
}

export function tabById(role, tabId) {
  return tabsForRole(role).find((tab) => tab.id === tabId) ?? null
}

export function tabIdForBlockId(role, blockId) {
  const tab = tabsForRole(role).find((t) => t.blockIds.includes(blockId))
  return tab?.id ?? firstTabId(role)
}

export function blockIdForRouteName(routeName) {
  if (!routeName || routeName === 'home' || routeName === 'nav-tab') return null
  const prefix = String(routeName).split('-')[0]
  return ROUTE_PREFIX_TO_BLOCK[prefix] ?? null
}

export function activeTabId({ role, routeName, tabParam }) {
  if (routeName === 'nav-tab' && tabParam) {
    return tabById(role, tabParam)?.id ?? null
  }
  if (routeName === 'home') return null
  const blockId = blockIdForRouteName(routeName)
  if (!blockId) return null
  return tabIdForBlockId(role, blockId)
}

export function navLocationForTab(tabId) {
  return { name: 'nav-tab', params: { tabId } }
}

export function navLocationForBlock(role, blockId) {
  return navLocationForTab(tabIdForBlockId(role, blockId))
}

export function navLocationForRoleHome(role) {
  return navLocationForTab(firstTabId(role))
}

export function tabBadgeCount(tab, blockBadges) {
  if (!tab?.blockIds?.length) return 0
  return tab.blockIds.reduce(
    (sum, id) => sum + (Number(blockBadges?.[id]) || 0),
    0,
  )
}
