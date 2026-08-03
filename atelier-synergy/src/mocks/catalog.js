/** Catalogue prestations mock (étape 0 — capacité professionnelle). */

const GALLERY_POOL = {
  knotless: [
    'https://lh3.googleusercontent.com/aida-public/AB6AXuCvbTpwr3VxNEJMr-MNRUKQG1lxVzw0W1Rx8wYEQew7cok5VUlhZ4kAIczZTzrBoqecd6VTdDHlnpQW02FpyQDcvG2U9fjA2lXxq94JX0pi3_RIloQX2q6XaZBYj33ak3IZQDRVkpBkQJIo405IpOQOK87Bp-exRyzRZnVJmnJovBt1qFwPw-S7se_sDwDrFzo-xzmA-_ULiNvmcHgOwhRX0dmlQOTTdKqweNmRH4vyicFh-RNXB8fAUg',
    'https://lh3.googleusercontent.com/aida-public/AB6AXuBDw0lrFGObr2p07EE876rB8tfTso5VdAncH3Kn0xp9Nrj1WQcEhI5ewU2gfEwp9AAo1nMcr-M2EzZs6gXLhi7zVsZ5zz-u_s3CnVvXO0t-8V4HFLGl4yZooLqmy3da0P52T51UEWmwFnWhhRxFwFs3gu7bvVsxzYBzDs32DLZBAC4w_3mXOED-idZwtWWJI6fbuj8WJLnK1qitL_GczH8-9Z7qlqe0h7EHrNPJFF89p9qQoZDtPmLoYQ',
    'https://lh3.googleusercontent.com/aida-public/AB6AXuAgfXrWhlBKENHSkRYQE6ybm2oibWoHA-sbFG35liHUz9w8fet2h8mgkf8CK1K0k_E3QUpdIY7ygqliNGd2ScuXlSM53nwdNer-k9btabSMzSnDURBBsmJk8vbtUc3DxD9N_5sBuUbzX8RUEULahTGzi5hObNTidQriJkdotTfOkE-_ryCMrBLm0bHVQS7vYUyQYFGX7oGgyKz5dZddCuiqnaNJJAyml4zO04m-4Ggv7ekTONfXXSyQZw',
  ],
  twists: [
    'https://lh3.googleusercontent.com/aida-public/AB6AXuD9AgKRyFI5Fmr377hfLZhfkyOmkR2e20V1s97_XcpOxOQW83QZyzXGsQI7hgpBCBp90PPI_GbVDrqUTZavzCjiYfC4HJPGPoV3PEN173qwhSF5iEjbJ_52z3AGobtsaU6bga4o4XfNbF5b2naUIDq0X1xmqN_1w32hmLywWYZEl--jFlFnYZWvd8yvXsDq-fcDAa__wGSjl7oXNkZEGwFE9QyDeOFKW4J79DZQudowJtooRi6fEArEeQ',
  ],
}

export const catalogServices = [
  {
    id: 'knotless_braids',
    label: 'Knotless braids',
    description: 'Tresses sans nœud, rendu naturel et durable.',
    previewSrc: GALLERY_POOL.knotless[2],
    defaultVariante: { taille: ['Medium'], longueur: ['Waist'], finition: ['Standard'] },
    variantes: {
      taille: ['Small', 'Medium', 'Large'],
      longueur: ['Shoulder', 'Waist', 'Mid-back'],
      finition: ['Standard', 'Curly ends'],
    },
    suggestedPrice: 180,
    suggestedDurationMinutes: 240,
    galleryMocks: GALLERY_POOL.knotless.map((src, index) => ({
      id: `knotless-${index + 1}`,
      src,
      proofLevel: index === 1 ? 'REFERENCE_INSPIRATION' : 'DECLARED_REALIZATION',
    })),
  },
  {
    id: 'vanilles',
    label: 'Vanilles / twists',
    description: 'Twists vanille, entretien et volume maîtrisés.',
    previewSrc: GALLERY_POOL.twists[0],
    defaultVariante: { taille: ['Medium'], longueur: ['Shoulder'], finition: ['Standard'] },
    variantes: {
      taille: ['Small', 'Medium', 'Large'],
      longueur: ['Shoulder', 'Waist'],
      finition: ['Standard', 'Curly ends'],
    },
    suggestedPrice: 120,
    suggestedDurationMinutes: 180,
    galleryMocks: GALLERY_POOL.twists.map((src, index) => ({
      id: `vanilles-${index + 1}`,
      src,
      proofLevel: 'DECLARED_REALIZATION',
    })),
  },
  {
    id: 'retwist',
    label: 'Retwist locs',
    description: 'Entretien des locs, ligne propre et confort.',
    previewSrc: GALLERY_POOL.knotless[0],
    defaultVariante: { taille: ['Standard'], longueur: [], finition: ['Standard'] },
    variantes: {
      taille: ['Standard', 'Tight'],
      longueur: [],
      finition: ['Standard'],
    },
    suggestedPrice: 70,
    suggestedDurationMinutes: 90,
    galleryMocks: [
      {
        id: 'retwist-1',
        src: GALLERY_POOL.knotless[0],
        proofLevel: 'DECLARED_REALIZATION',
      },
    ],
  },
  {
    id: 'ponytail',
    label: 'Ponytail',
    description: 'Queue de cheval installée, finition soignée.',
    previewSrc: GALLERY_POOL.knotless[1],
    defaultVariante: { taille: ['Medium'], longueur: ['Waist'], finition: ['Standard'] },
    variantes: {
      taille: ['Small', 'Medium', 'Large'],
      longueur: ['Shoulder', 'Waist', 'Mid-back'],
      finition: ['Standard', 'Curly ends'],
    },
    suggestedPrice: 90,
    suggestedDurationMinutes: 120,
    galleryMocks: [
      {
        id: 'ponytail-1',
        src: GALLERY_POOL.knotless[1],
        proofLevel: 'DECLARED_REALIZATION',
      },
    ],
  },
]

export const DEFAULT_TASK_TEMPLATES = [
  {
    id: 'buy_hair',
    label: 'Achat des mèches',
    defaultOwner: 'CLIENT',
    stylistOnly: false,
    notePlaceholder: 'Ex. Apporter 3 paquets de mèches pré-étirées…',
  },
  {
    id: 'wash',
    label: 'Lavage',
    defaultOwner: 'STYLIST',
    stylistOnly: false,
    notePlaceholder: 'Ex. Cheveux lavés et séchés avant le RDV…',
  },
  {
    id: 'install',
    label: 'Pose',
    defaultOwner: 'STYLIST',
    stylistOnly: true,
    notePlaceholder: '',
  },
  {
    id: 'finish',
    label: 'Finition',
    defaultOwner: 'STYLIST',
    stylistOnly: true,
    notePlaceholder: '',
  },
  {
    id: 'aftercare',
    label: 'Entretien conseillé',
    defaultOwner: 'CLIENT',
    stylistOnly: false,
    notePlaceholder: 'Ex. Utiliser un bonnet en satin chaque nuit…',
  },
]

export const LOCATION_OPTIONS = [
  {
    id: 'AT_STYLIST',
    label: 'Chez moi',
    description: 'Espace personnel / studio à domicile',
    icon: 'home',
  },
  {
    id: 'SALON',
    label: 'En salon',
    description: 'Espace professionnel partenaire',
    icon: 'storefront',
  },
  {
    id: 'TRAVEL',
    label: 'Déplacement',
    description: 'Je me rends chez la cliente',
    icon: 'directions_car',
  },
]

export const AVAILABILITY_DAYS = [
  { id: 'lun', label: 'Lun' },
  { id: 'mar', label: 'Mar' },
  { id: 'mer', label: 'Mer' },
  { id: 'jeu', label: 'Jeu' },
  { id: 'ven', label: 'Ven' },
  { id: 'sam', label: 'Sam' },
  { id: 'dim', label: 'Dim' },
]

export const AVAILABILITY_SLOTS = [
  { id: '09:00-13:00', label: '09:00 – 13:00' },
  { id: '14:00-18:00', label: '14:00 – 18:00' },
  { id: '18:00-21:00', label: '18:00 – 21:00' },
]

export function buildDefaultTasks() {
  return DEFAULT_TASK_TEMPLATES.map((task) => ({
    id: task.id,
    label: task.label,
    owner: task.defaultOwner,
    note: '',
    stylistOnly: Boolean(task.stylistOnly),
    notePlaceholder: task.notePlaceholder ?? '',
  }))
}

export function getCatalogService(id) {
  return catalogServices.find((service) => service.id === id) ?? null
}
