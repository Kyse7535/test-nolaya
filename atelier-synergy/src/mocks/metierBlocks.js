import { DemoRole } from '../domain/demoRole'

/** @typedef {'client' | 'pro'} MetierRole */

/**
 * @type {Array<{
 *   id: string,
 *   order: string,
 *   title: string,
 *   description: string,
 *   titleByRole?: Partial<Record<MetierRole, string>>,
 *   descriptionByRole?: Partial<Record<MetierRole, string>>,
 *   routeName: string,
 *   status: 'ready' | 'soon',
 *   roles: MetierRole[],
 * }>}
 */
export const metierBlocks = [
  {
    id: 'avant-0',
    order: '_0',
    title: 'Définir le cadre professionnel',
    description: 'Comment vous travaillez, une fois pour toutes.',
    routeName: 'framework-accueil',
    status: 'ready',
    roles: [DemoRole.PRO],
  },
  {
    id: 'etape-0',
    order: '0',
    title: 'Capacité professionnelle',
    description: 'Ouvrir une prestation disponible.',
    routeName: 'capacity-accueil',
    status: 'ready',
    roles: [DemoRole.PRO],
  },
  {
    id: 'etape-1',
    order: '1',
    title: 'Recherche besoin cliente',
    description: 'Exprimer et cadrer le besoin.',
    routeName: 'demand-accueil',
    status: 'ready',
    roles: [DemoRole.CLIENT],
  },
  {
    id: 'etape-2',
    order: '2',
    title: 'Apparier la demande',
    description: 'Mettre en relation coiffeuse et cliente.',
    titleByRole: {
      [DemoRole.CLIENT]: 'Apparier la demande',
      [DemoRole.PRO]: 'Invitations reçues',
    },
    descriptionByRole: {
      [DemoRole.CLIENT]: 'Lancer la recherche et constituer la shortlist.',
      [DemoRole.PRO]: 'Répondre aux invitations de prestation.',
    },
    routeName: 'matching-accueil',
    status: 'ready',
    roles: [DemoRole.CLIENT, DemoRole.PRO],
  },
  {
    id: 'etape-3',
    order: '3',
    title: 'Validation faisabilité',
    description: 'Confirmer que la prestation est réalisable.',
    titleByRole: {
      [DemoRole.CLIENT]: 'Offres reçues',
      [DemoRole.PRO]: 'Validation faisabilité',
    },
    descriptionByRole: {
      [DemoRole.CLIENT]: 'Consulter les offres fermes des coiffeuses.',
      [DemoRole.PRO]: 'Confirmer que la prestation est réalisable.',
    },
    routeName: 'proposal-accueil',
    status: 'ready',
    roles: [DemoRole.CLIENT, DemoRole.PRO],
  },
  {
    id: 'etape-4',
    order: '4',
    title: 'Former l’engagement',
    description: 'Accepter l’offre et formaliser l’accord.',
    routeName: 'engagement-accueil',
    status: 'ready',
    // Hub cliente only — la coiffeuse reçoit la confirmation dans le flux, pas via carte hub.
    roles: [DemoRole.CLIENT],
  },
  {
    id: 'etape-5',
    order: '5',
    title: 'Ma checklist RDV',
    description: 'Préparer le rendez-vous.',
    routeName: 'appointment-accueil',
    status: 'ready',
    roles: [DemoRole.CLIENT, DemoRole.PRO],
  },
  {
    id: 'etape-6',
    order: '6',
    title: 'Réaliser la prestation',
    description: 'Exécuter le service convenu.',
    titleByRole: {
      [DemoRole.CLIENT]: 'Suivre la prestation',
      [DemoRole.PRO]: 'Réaliser la prestation',
    },
    descriptionByRole: {
      [DemoRole.CLIENT]: 'Arrivée et confirmation de réalisation.',
      [DemoRole.PRO]: 'Exécuter le service convenu.',
    },
    routeName: 'execution-accueil',
    status: 'ready',
    roles: [DemoRole.CLIENT, DemoRole.PRO],
  },
  {
    id: 'etape-7',
    order: '7',
    title: 'Régler',
    description: 'Clôturer le paiement.',
    titleByRole: {
      [DemoRole.CLIENT]: 'Payer le solde',
      [DemoRole.PRO]: 'Voir mon revenu',
    },
    descriptionByRole: {
      [DemoRole.CLIENT]: 'Régler le décompte final.',
      [DemoRole.PRO]: 'Consulter le net après règlement.',
    },
    routeName: 'settlement-accueil',
    status: 'ready',
    roles: [DemoRole.CLIENT, DemoRole.PRO],
  },
  {
    id: 'etape-8',
    order: '8',
    title: 'Produire la preuve',
    description: 'Documenter la fin de prestation.',
    titleByRole: {
      [DemoRole.CLIENT]: 'Confirmer & avis',
      [DemoRole.PRO]: 'Avis reçus',
    },
    descriptionByRole: {
      [DemoRole.CLIENT]: 'Confirmer l’outcome et laisser un avis.',
      [DemoRole.PRO]: 'Consulter les retours clientes.',
    },
    routeName: 'experience-accueil',
    status: 'ready',
    roles: [DemoRole.CLIENT, DemoRole.PRO],
  },
]

/** Resolve display copy for the active demo role. */
export function resolveBlockCopy(block, role) {
  return {
    ...block,
    title: block.titleByRole?.[role] ?? block.title,
    description: block.descriptionByRole?.[role] ?? block.description,
  }
}

export function metierBlocksForRole(role) {
  return metierBlocks
    .filter((block) => block.roles.includes(role))
    .map((block, index) => ({
      ...resolveBlockCopy(block, role),
      order: String(index + 1),
    }))
}
