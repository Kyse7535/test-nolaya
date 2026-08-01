export const platformPrinciples = {
  title: 'Principes plateforme',
  body: 'Les principes obligatoires de la plateforme sont déjà intégrés. Pas de contrôle opérateur dans cette démo.',
}

export const platformPolicies = [
  {
    id: 'flexible',
    label: 'Flexible',
    description: 'Report possible jusqu’à 24 h avant, sans frais.',
  },
  {
    id: 'balanced',
    label: 'Équilibrée',
    description: 'Annulation < 24 h : acompte partiellement retenu.',
  },
  {
    id: 'strict',
    label: 'Stricte',
    description: 'Annulation tardive : acompte non remboursable.',
  },
]

export const mockProfessional = {
  id: 'pro-coiffeuse-demo',
  firstName: 'Awa',
  role: 'Coiffeuse',
  specialty: 'Cheveux afro / texturés',
  avatarUrl:
    'https://lh3.googleusercontent.com/aida-public/AB6AXuBFVnmAfoVV6tufI_fUwlUk62BBBNex0CrQ5KtTLYWv9xvFjSWE9PthyzhFEqXwpCa1r7JlKrMJJKo5ek10JrRNqW-l0SXlw9wJmvNPZyaq0sKleFOVZl_HxusvWiSx4efVojIKw5FoGFDUuMsK3denJtRGvuhAXesNpv24Z1xp152Wy6RmCs4EtezZgSXk7QZx1UOh_qj7xC0NNvNgqFPskMtf0ziconVkr_6EVLqhYNkvDT5e3nPBQg',
}

export const CONTEXT_OPTIONS = [
  {
    id: 'home',
    label: 'Chez moi',
    description: 'Espace personnel / studio à domicile',
  },
  {
    id: 'salon',
    label: 'En salon',
    description: 'Espace professionnel partenaire',
  },
  {
    id: 'travel',
    label: 'Déplacement',
    description: 'Je me rends chez la cliente',
  },
]

export const ADDRESS_PRIVACY_OPTIONS = [
  {
    id: 'masked',
    label: 'Adresse masquée jusqu’à l’engagement',
  },
  {
    id: 'visible',
    label: 'Adresse visible aux clientes éligibles',
  },
]

export const COMPANION_OPTIONS = [
  { id: 'none', label: 'Non acceptés' },
  { id: 'one', label: 'Un accompagnant accepté' },
  { id: 'conditions', label: 'Accompagnants acceptés selon modalités' },
]

export const MINORS_OPTIONS = [
  { id: 'none', label: 'Non pris en charge' },
  { id: 'tutor', label: 'Acceptés avec tuteur présent' },
  { id: 'conditions', label: 'Acceptés selon conditions' },
]

export const WEEKDAYS = [
  { id: 'lun', label: 'Lun' },
  { id: 'mar', label: 'Mar' },
  { id: 'mer', label: 'Mer' },
  { id: 'jeu', label: 'Jeu' },
  { id: 'ven', label: 'Ven' },
  { id: 'sam', label: 'Sam' },
  { id: 'dim', label: 'Dim' },
]

export const RESPONSE_DELAY_OPTIONS = [
  { id: '2h', label: 'Sous 2 h' },
  { id: '24h', label: 'Sous 24 h' },
  { id: '48h', label: 'Sous 48 h' },
]

export const PAYMENT_OPTIONS = [
  { id: 'cash', label: 'Espèces' },
  { id: 'card', label: 'Carte bancaire' },
  { id: 'transfer', label: 'Virement' },
  { id: 'platform', label: 'Paiement via la plateforme' },
]

export const INTERRUPTION_OPTIONS = [
  {
    id: 'safety',
    label: 'Je peux interrompre si la sécurité n’est plus assurée',
  },
  {
    id: 'document',
    label: 'Procedure simple : prévenir la cliente et documenter',
  },
]

export const PHOTO_CONSENT_OPTIONS = [
  {
    id: 'explicit',
    label: 'Photos possibles avec consentement explicite',
  },
  {
    id: 'no_publish',
    label: 'Pas de publication sans accord séparé',
  },
]
