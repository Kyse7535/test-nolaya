import { DemoRole } from '../domain/demoRole'

/** @typedef {'client' | 'pro'} MetierRole */

/**
 * @type {Array<{
 *   id: string,
 *   order: string,
 *   title: string,
 *   description: string,
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
    routeName: 'matching-accueil',
    status: 'ready',
    roles: [DemoRole.CLIENT, DemoRole.PRO],
  },
  {
    id: 'etape-3',
    order: '3',
    title: 'Validation faisabilité',
    description: 'Confirmer que la prestation est réalisable.',
    routeName: 'proposal-accueil',
    status: 'ready',
    roles: [DemoRole.CLIENT, DemoRole.PRO],
  },
  {
    id: 'etape-4',
    order: '4',
    title: 'Former l’engagement',
    description: 'Formaliser l’accord entre les parties.',
    routeName: 'engagement-accueil',
    status: 'ready',
    roles: [DemoRole.CLIENT, DemoRole.PRO],
  },
  {
    id: 'etape-5',
    order: '5',
    title: 'Rendez-vous opérationnel',
    description: 'Planifier et préparer le rendez-vous.',
    routeName: 'appointment-accueil',
    status: 'ready',
    roles: [DemoRole.CLIENT, DemoRole.PRO],
  },
  {
    id: 'etape-6',
    order: '6',
    title: 'Réaliser la prestation',
    description: 'Exécuter le service convenu.',
    routeName: 'execution-accueil',
    status: 'ready',
    roles: [DemoRole.CLIENT, DemoRole.PRO],
  },
  {
    id: 'etape-7',
    order: '7',
    title: 'Régler',
    description: 'Encaisser et clôturer le paiement.',
    routeName: 'settlement-accueil',
    status: 'ready',
    roles: [DemoRole.CLIENT, DemoRole.PRO],
  },
  {
    id: 'etape-8',
    order: '8',
    title: 'Produire la preuve',
    description: 'Documenter la fin de prestation.',
    routeName: 'experience-accueil',
    status: 'ready',
    roles: [DemoRole.CLIENT, DemoRole.PRO],
  },
]

export function metierBlocksForRole(role) {
  return metierBlocks.filter((block) => block.roles.includes(role))
}
