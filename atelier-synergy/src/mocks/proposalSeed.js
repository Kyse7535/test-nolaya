/**
 * Display defaults for étape 3 Stitch screens (frozen brief + gallery).
 * Linked to matching campaign snapshot when available.
 */

export const PROPOSAL_GALLERY_URLS = [
  'https://lh3.googleusercontent.com/aida-public/AB6AXuBnp5KwDTAvX3mLXUYikGY0ch3wkVT74F-BTn32tbJ2COOS6xsUafvruaLfPZZOcpStGtYvjH8yML56C2usTq_ryzIzk95bxUOASk1DtvTp7NRfv5aBPXmZU-nwgZk_9j9pumyLZucKkFuZFXaOF--lTlSh8ePOUogD0CPkfbr6SItALAH6e4jvqshTXvMIPhs0Ac-sVs5IXWUHnZAhlRbuyTVZMdst-4emAKxzNHmVM9fHcRp2HBJV',
  'https://lh3.googleusercontent.com/aida-public/AB6AXuA618aHjU7iz8mmPJOs2iO5RbLW_y3bxqipkdp7dOogVDmdJpO3f9cILp3pIonRNQqxCXRKWlTSTHwHa5Xa1_ZWXukywZIRXas6OUQpYaKgR_Uba5INogyINl6MUUrdtVfL6LKB39P6ba4XEcOJRklwK92-P04cMZktizhicJhZqgPrRf5BnU6x5eSsJeVevVswplfdYtC55-OJ1rN8w-XMu-bwQtlEcVT47IiCWLfPl8TutCUdsqdO',
  'https://lh3.googleusercontent.com/aida-public/AB6AXuCuDHL8VqadRoBuS6bfPELCCvvq-CnW9ce_7ph5JECp62VOClztx4N7nnvwn-eoMprePI0AZ8RuikSA1wRsFCDOk5sdAd6HmKDO5sk2nK5uMs0mNed2gD_iR5MS8yHXfal_9so363h9FOQjnP_WtsW5Y684q15FcVP_Lfx1mJfu-Cvux8EZO4MdsHlWg8e5TuVBc3ryX5wG1a5NLyxbLpT9j_28Y6lpAtphF6UEljkkUmZp6Pc97KUr',
]

export const CLIENT_AVATAR_URL =
  'https://lh3.googleusercontent.com/aida-public/AB6AXuDFPc8XNcTrByFBQYaSi85fz5Cs-Iob59JWA9UbOp5vYBRUmKv6P_JLulKQzKT0ZULNnwPw8BjaMgBmvs3CClG9bGSyM7CJnrnwDU6HFOx1nHBN0GOJ4BuNG1oeUHD1nJBBhILyRvF1BJAlkkSNFWZaMEfSJdeqLhSJrkVTMqHXOwNwG3H3U5-MZv6d-ioJSZ3CjjWmSmwD8wTJfDSjnXAW3soqRMgyQVC6tsPLLevnMF324obup5Ns'

/**
 * Build a frozen demand brief for S02 (lecture seule).
 * @param {object | null} snapshot — matching demandSnapshot
 */
export function buildFrozenDemandBrief(snapshot) {
  const resultLabel = snapshot?.resultLabel || 'Vanilles / twists mi-longues'
  const budgetMax = Number(snapshot?.budgetMax) || 220
  const budgetMin = Math.min(180, budgetMax)

  return {
    clientName: 'Awa D.',
    clientRole: 'CLIENTE',
    clientAvatarUrl: CLIENT_AVATAR_URL,
    prestationLabel: resultLabel.includes('Vanilles')
      ? 'Vanilles / twists mi-longues'
      : resultLabel,
    resultExpected: 'Vanilles soignées, longueur épaules, rendu naturel',
    budgetMin,
    budgetMax: Math.max(budgetMax, 220),
    constraints: ['4C', 'Mi-dos', 'Pas de colo'],
    placeDesired: 'Chez la coiffeuse',
    preferredSlot: 'Samedi matin',
    galleryUrls: [...PROPOSAL_GALLERY_URLS],
  }
}

export function defaultProSpecialty(styleTag) {
  if (!styleTag) return 'Spécialiste vanilles & braids'
  return `Spécialiste ${styleTag.toLowerCase()}`
}
