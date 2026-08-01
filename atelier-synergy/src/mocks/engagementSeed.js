/**
 * Seeds & assets for étape 4 (Former l’engagement).
 */

export const ENGAGEMENT_HERO_ACCUEIL =
  'https://lh3.googleusercontent.com/aida-public/AB6AXuCYXUqdhMMtMJAqtLfZdACWvgY0sjLt0X3yrOjuMEqdbAY4NaIwoirGQqBh048SjeRv1WHSa74xJ7YsZwmHmInAqXEgsdrqvYGO2OltNlTJTvkIBFBoYIMmvyGP_BJxl-TZxZJ6CWS7zMYtNVW6qrwmyHWTHHAOPwHCpWs0S8hkXHaXF4Q0oPYHJLxd2onyZf0gRdnbO_Vu6hn0zBdoTN83ObT-p2M3odYPLOJOScbvjf5SpZ-62dir'

export const ENGAGEMENT_HERO_PAYMENT =
  'https://lh3.googleusercontent.com/aida/AP1WRLvgyCRHd788ZK6x73gkohC9XdlIpbPzdcGVxQ5tckzRkdDWoAxZDp6QQDw9kTCxMu2nM7RXGgGua5yjeilaxnj8KwodMB5l-PWGswqhP18KqZAGVvjjDRHlnMKCf6vD76OX5Pl2-D871x9dfL0Q_m-iHlXeRhZL7LhXrOQZjwmJCipFaHgEnBYo_d9olxtetaNVzg0tJYe6M14yWfKD1njpm__CkYqnHMZyjZlnRxeGMh2decj5ZR2DfJg'

export const ENGAGEMENT_HERO_CONFIRM_CLIENT =
  'https://lh3.googleusercontent.com/aida-public/AB6AXuDHlTEAe6XKWq07ygzydyynSULPak89DRRQJERUUev4O1jnvAac0rUWJlow_ifWhrAxR8TMZE5e0KyeuptxCXlYwisbBBDUe99M4C2lcKu5Ht0FFZtJbQ6DlYaiJ8KjOpMJIzAftnCfa64qBaoyu5CnokrgJasAE0WJKBxiw7WL5kDiP1RbA07rv36B6u9od53hNEc53OpaS37eXxbrRp6yXdCayCoE09xEPfESicQ8n61VweLkznOf'

export const ENGAGEMENT_HERO_CONFIRM_PRO =
  'https://lh3.googleusercontent.com/aida-public/AB6AXuD_ZyIshFdMBVlZfSKQny7Sg0mx1sPqZ9gphftl6xqYxc_EdMNMLrx58XVir_Ar09oLqnMe7-CLa3ITXzANPSdQ10vbFt9GHwWBjLd4TeLL9PRqEiX_6tQLzmhmD-kKk1hjFqGyKWMscTbxadkAwvNShKz2dAPtnMAETv9vIi7FqWsB_yAi_c3z951pBcH9xacn2ii-Etrud8KthXsUzc1uo7T4EUF7RddmpuRJotTsaenG9Bf0t9uF'

/** Versioned policies (Stitch S03). */
export function buildDefaultPolicies() {
  return [
    {
      id: 'pol_cancellation',
      kind: 'cancellation',
      title: 'Politique d’annulation',
      version: '1.2',
      summary:
        'Annulation < 48 h : acompte non remboursable. No-show : prestation due.',
    },
    {
      id: 'pol_lateness',
      kind: 'lateness',
      title: 'Politique de retard',
      version: '1.0',
      summary:
        'Retard > 20 min : créneau pouvant être raccourci ou reporté.',
    },
  ]
}

export const ENGAGEMENT_PILLARS = [
  {
    icon: 'receipt_long',
    title: 'Récapitulatif',
    body: 'Relire prestation, prix, lieu, créneau et obligations.',
  },
  {
    icon: 'verified_user',
    title: 'Consentements',
    body: 'Accepter l’offre et les politiques versionnées.',
  },
  {
    icon: 'payments',
    title: 'Paiement simulé',
    body: 'Valider l’acompte via un bouton de démo — pas de vraie carte.',
  },
  {
    icon: 'handshake',
    title: 'Engagement',
    body: 'Obtenir COMMITTED et un créneau BOOKED.',
  },
]
