import {
  ActionCriticality,
  ActionOwner,
  ActionStatus,
  createActionId,
} from '../domain/appointment/model'

export const DEMO_ENGAGEMENT_ID = 'eng_seed_knotless'
export const DEMO_TEMPLATE_ID = 'tpl_knotless'

export const APPOINTMENT_HERO_ACCUEIL =
  'https://lh3.googleusercontent.com/aida-public/AB6AXuAzOQ1miWtR5d3WzgBLGX0Wi2kKeVKjXb-_YQ68eFaIhWHxSmtkzM1TpShULCVNMcrR-n_SKfup9YDkbrKInKexeHUz8fDptUsalHyB6a240mtFbtoc81IXbDYWBH-xlm9yF8TpaQvCD_o0XvfbtXGbGzXFG_Rf8CNq_BZR8f7qByl2CUeluHM9DztlDSBUYgVQ4iXF8isLuhvcOYhN2xfg048WlU5qNyRXmhQGPBCJ2N5-KlNA1r-1SA'

export const APPOINTMENT_THUMBNAIL =
  'https://lh3.googleusercontent.com/aida-public/AB6AXuCtuE2TzVnyici5CImVEGi08U789Ok5G5IImv3hcCrB74rYtmNj6jzh0ou1N9nP0K-Kn6jbo82RtHXcYfxyMJxSrLCbZZmCi6ejgBcK_rJRMz-Z_7gOb8rA-MxLV3CDp_6KiSoPzbCkDKO5sc85ezeqJkJA0ybr3ZuXrkC9f1dg9c5gQwoFh7qQLOHwRmKm-TevQVAalhFAQ-tBAlpbi1dnA0Q4HFkgT1tyjNMnEgO5t7Pfrtw-bPHLgg'

export const APPOINTMENT_HERO_READY =
  'https://lh3.googleusercontent.com/aida-public/AB6AXuC5gZJ7iRFZbmYM8c0uMsqowyeVw73liEAvoXgQrDv-UG8WGKGq9RujSdhqYcqFg-b0V3Dw-D4bwes8UWmf0oCG0yCrw_eCZpNXKilsitYZawB5R1YocoagY6uBnRBynvSgbpMhX0w4t7XSjoeYurx8jw_93qVTppMcsNeLssu0_WxOpNXWFVOh-6jWea2EBdckffeixkWjkyjZsheUHo1SFoyGWr-k3XdbOCIZj5ggS9QFvPYykDHhjw'

export const APPOINTMENT_CHECKLIST_CLIENT_HERO =
  'https://lh3.googleusercontent.com/aida/AP1WRLtloxRNFlURojzJAp6HcO-9NEMA9G8VsBWFFE7MgyYquWy3EW3tURydckICnxvAZ9WZzYLBQALft4SEf1iFASxfWdzqHbPOlSJSQKGHYmEzAqj62gT8iCTlx9KTPyjIymmD1nT8KPA5-XIvX7vXid014TBhr4GBrI-wBFa51A2XXWOw7i0IbedVkBzqd5GJuaMPmpeuCreYG8n4_xHqoSLXgoXKFwddsYp3kXb941wpPdbhVQC76oSBoOgu'

export const APPOINTMENT_PRO_AVATAR =
  'https://lh3.googleusercontent.com/aida-public/AB6AXuDiMEQ70K6Dve1ZUhji3OwxIopzHpAVz-ytC_nHddaMEnWOeYpgjvUMY_SDp_LvOcoj4oEtWixo2d60puxy1EGrfNMjfXe-SMpETAj7ar71A3FQhG6f7M1hkIiHxeY4m4wv1lgXdIqOZD4m8kK-xMSU0BfLC2vAc65RFaJdWYMVtMOaSG_gss038OZUsijep7C23qC8kaEIFOZBwaV552Ngze01Cv7tTrMG6Tbprh0qLvCxdrP6iRhJkA'

/** Stable demo engagement (COMMITTED). */
export function buildSeedEngagement() {
  return {
    id: DEMO_ENGAGEMENT_ID,
    serviceLabel: 'Knotless / box braids',
    dateLabel: 'Samedi 15 mars',
    startTime: '09:30',
    endTime: '14:00',
    placeLabel: 'Chez la coiffeuse',
    clientDisplayName: 'Amina K.',
    proDisplayName: 'Sarah M.',
    thumbnailUrl: APPOINTMENT_THUMBNAIL,
    priceTotal: 220,
    depositAmount: 66,
    balanceAmount: 154,
    createdAt: '2026-03-01T10:00:00.000Z',
  }
}

/**
 * Knotless prep template — 5 blocking (2 already CONFIRMED ≈ 40%) + informatives.
 */
export function buildKnotlessPrepTemplate() {
  return {
    id: DEMO_TEMPLATE_ID,
    serviceKey: 'knotless',
    label: 'Knotless / box braids',
    actions: [
      {
        id: createActionId('client_meeches'),
        title: 'Acheter les mèches',
        helper: 'Quantité et couleur convenues dans l’engagement',
        owner: ActionOwner.CLIENT,
        criticality: ActionCriticality.BLOCKING,
        status: ActionStatus.TO_DO,
        dueHint: 'Avant le jour J',
      },
      {
        id: createActionId('client_adresse'),
        title: 'Confirmer l’adresse et l’accès',
        helper: 'Adresse exacte + digicode / étage',
        owner: ActionOwner.CLIENT,
        criticality: ActionCriticality.BLOCKING,
        status: ActionStatus.TO_DO,
        dueHint: '48 h avant',
      },
      {
        id: createActionId('client_cuir'),
        title: 'Préparer le cuir chevelu',
        helper: 'Cheveux propres, démêlés, sans produit gras',
        owner: ActionOwner.CLIENT,
        criticality: ActionCriticality.BLOCKING,
        status: ActionStatus.CONFIRMED,
        dueHint: 'La veille',
      },
      {
        id: createActionId('client_tenue'),
        title: 'Prévoir une tenue confortable',
        helper: '',
        owner: ActionOwner.CLIENT,
        criticality: ActionCriticality.INFORMATIVE,
        status: ActionStatus.TO_DO,
      },
      {
        id: createActionId('client_telephone'),
        title: 'Charger mon téléphone',
        helper: '',
        owner: ActionOwner.CLIENT,
        criticality: ActionCriticality.INFORMATIVE,
        status: ActionStatus.TO_DO,
      },
      {
        id: createActionId('pro_poste'),
        title: 'Préparer le poste et le matériel',
        helper: 'Crochets, peignes, gels, élastiques, siège prêt',
        owner: ActionOwner.PRO,
        criticality: ActionCriticality.BLOCKING,
        status: ActionStatus.TO_DO,
        dueHint: 'Avant l’arrivée',
      },
      {
        id: createActionId('pro_creneau'),
        title: 'Bloquer le créneau sans conflit',
        helper: 'Aucun autre RDV chevauchant',
        owner: ActionOwner.PRO,
        criticality: ActionCriticality.BLOCKING,
        status: ActionStatus.CONFIRMED,
        dueHint: 'Dès l’engagement',
      },
      {
        id: createActionId('pro_prefs'),
        title: 'Relire les préférences cliente',
        helper: 'Tension, longueur, parting',
        owner: ActionOwner.PRO,
        criticality: ActionCriticality.INFORMATIVE,
        status: ActionStatus.TO_DO,
      },
      {
        id: createActionId('pro_hydratation'),
        title: 'Prévoir une pause hydratation',
        helper: '',
        owner: ActionOwner.PRO,
        criticality: ActionCriticality.INFORMATIVE,
        status: ActionStatus.TO_DO,
      },
    ],
  }
}
