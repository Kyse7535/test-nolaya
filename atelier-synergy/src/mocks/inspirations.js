/** Catalogue inspirations mock (étape 1 — qualifier le besoin cliente). */

import { STORAGE_KEY_CATALOG } from '../domain/demand/model'

export const inspirationCatalog = [
  {
    id: 'knotless_medium',
    label: 'Knotless medium',
    popular: true,
    src: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDzsYFyvukjqn04TYnOXXPkHExVxjUHn8ZJJmquqMUj7qvaXAAlwe_lOfPieIsdFY_xjYJLHNUVGX1H-EGVaU6Paryw2HUWaMVp0F9lEB_mm8OnA4AHhuwiEpbcKiqR8_1aTNpmikUlOCsBSBdK6wraoDwbf69IyfPpIEVDOIUHatNBfrg56AK_ZqByUncfFw429ygxGi-PzqBy9rj-l4YjdxWOhSKzpywqhAuvao3IZllWlug9vaXo',
  },
  {
    id: 'twists',
    label: 'Twists',
    popular: false,
    src: 'https://lh3.googleusercontent.com/aida-public/AB6AXuD4Vzvs_e5wVJ_gTDgZOiZx9OWvPDqYsZldp4BQS5GJCKZ_597KLTmt88sC37x5zc5dzRwgFdn4cF5GrwuS9_iTmCrfh7_MkqP5gRH3NTLaOL8KAa8MSeuTQsP97Yis0MZoEWgHjDh9UPlfqibtbkcoTb65lcM3ssiXgQ0crHdrcB02rG8b_vldijw4lUW7DZ-DWbbfr1JJSm_A1Z2YG9alsA7zL5gaLeA-BTayQIg0jw_XEEEo-Vnw',
  },
  {
    id: 'locs',
    label: 'Locs',
    popular: false,
    src: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAzKkUngDjJLZGms7d61NCdwEC727PCKjOzq_XTir9UV4AJZZ7lRZQQpuXbJtrB_7IKMh8v3gO5ZZojq4-oUgWrZu5B31RWB6hGxjjRv1Cex9pbXTsiVnA5YQgL0PjeRv91TajlWSffL-EfAzvSW6p1eb1ignK-zkXP15PEwiJ9ZunqCkAPTIDzrA9IFKG0Lj0wxBvqsMGaM7r6lhUfJ22e3i5nXOQSyuTRIW5qvJ4PClNWqwtaZ4g4',
  },
  {
    id: 'vanilles',
    label: 'Vanilles',
    popular: false,
    src: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAGyy31qHFqbP4jhpM5jv4Qb45axQJf4qQIPC6iCo39W_Rl0JdR-ZhriyERZt8_lDHtVOPq37Ma8TjR5X4lXw7euSQSuMo6gN8wi6km9UR4Lke2ze5wefulXjTDCbPkMd8rb1wd8YeVzzI1OxnfeDBmZlK_QaJLmIKoEUCinzGTZUcAvubdcdzNe9czNXQVaOjI5jEzX0d08CEOAq0DkKflLz4M-NxyNk_WTjXgGEtI9xvGAIdIDUhX',
  },
  {
    id: 'ponytail',
    label: 'Ponytail',
    popular: false,
    src: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCd8Sk1EhBqxcbJ8kYy0ZXHVcwjQeaqlkJ_IYQY15t5MHDjhdUv-PUZRhg0n0RpnRhm8ApLePl5q9eKEElE8N0UjthMFq8kP4-MzLs_ak2n1mzU_9wakSJhCXE4D67QPpbjavt14nCwjYfKoJA3xTwxRGS2-oP6iTFK_k5vuJsOZsjgtlttNKInzEX-LQ8w4ecj33DvJlc7uETZVvLXeoYBU14R7binSezBonqQ_KPsI5vkibZ129st',
  },
  {
    id: 'natural_curls',
    label: 'Natural curls',
    popular: false,
    src: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC5tRdZaKdOT3-ZlwhpzZNB-TIbFAssZZsL0BY2RsGKE8HZRCZgJJTeDO2l7jtwt6Fr5is5-By5V6Asx3oVjqp8qQjV6hZ59mIjnI6TqY1QcK7mmEiq4WkSspeBT7kFu7OtZrH4_yr9JMe3ufV8qVnXGGwCNdyec4e8_WQvuGF7Eu1V2Z8F6f7Rld8UWeYuR7nlDkvJfGT2bGRqzPky6Y3tZDNaDMEVxhn6UzRjDHpnT0S7XEL1Z5ju',
  },
]

export const VARIANTE_OPTIONS = [
  { id: 'short', label: 'Court / small' },
  { id: 'medium', label: 'Medium' },
  { id: 'long', label: 'Long / XL' },
]

export const CONTEXT_OPTIONS = [
  { id: 'daily', label: 'Quotidien' },
  { id: 'wedding', label: 'Mariage / cérémonie' },
  { id: 'event', label: 'Événement' },
  { id: 'transition', label: 'Transition / protection' },
]

export const HAIR_INCLUSION_OPTIONS = [
  { id: 'included', label: 'Incluses dans mon budget' },
  { id: 'extra', label: 'En plus de mon budget' },
  { id: 'unknown', label: 'Je ne sais pas encore' },
]

export const RADIUS_OPTIONS = [
  { id: 5, label: '5 km' },
  { id: 10, label: '10 km' },
  { id: 15, label: '15 km' },
  { id: 25, label: '25 km' },
]

export const MOBILITY_OPTIONS = [
  { id: 'client_travels', label: 'Je me déplace chez la coiffeuse' },
  { id: 'stylist_travels', label: 'La coiffeuse vient chez moi' },
  { id: 'both', label: 'Les deux me conviennent' },
]

export const PLACE_OPTIONS = [
  { id: 'home', label: 'Chez moi' },
  { id: 'stylist', label: 'Chez la coiffeuse / studio' },
  { id: 'salon', label: 'En salon' },
]

export const PROTECTION_OPTIONS = [
  { id: 'sensitive_scalp', label: 'Cuir chevelu sensible' },
  { id: 'fragile', label: 'Cheveux fragilisés / cassants' },
  { id: 'allergy', label: 'Allergie connue (à préciser plus tard)' },
  { id: 'none', label: 'Aucune contrainte particulière' },
]

export const CLIENT_TASK_OPTIONS = [
  { id: 'prep_wash', label: 'Préparation / lavage' },
  { id: 'detangle', label: 'Démêlage' },
  { id: 'bring_hair', label: 'Apport des mèches' },
]

export const PRIORITY_OPTIONS = [
  {
    id: 'result',
    label: 'Résultat',
    description: 'La fidélité au style prime.',
  },
  {
    id: 'price',
    label: 'Prix',
    description: 'Rester dans mon budget max.',
  },
  {
    id: 'proximity',
    label: 'Proximité',
    description: 'Minimiser les déplacements.',
  },
  {
    id: 'availability',
    label: 'Disponibilité',
    description: 'La date compte le plus.',
  },
]

export const SERVICE_LEVEL_OPTIONS = [
  {
    id: 'COMPLETE',
    label: 'Complet',
    description: 'La coiffeuse prend en charge l’ensemble de la prestation.',
  },
  {
    id: 'ASSISTED',
    label: 'Assisté',
    description: 'Vous participez à certaines tâches (préparation, détente…).',
  },
]

export function getInspiration(id) {
  return inspirationCatalog.find((item) => item.id === id) ?? null
}

/** Seed catalog into localStorage once (MVP §9). */
export function ensureInspirationCatalogSeeded() {
  try {
    if (localStorage.getItem(STORAGE_KEY_CATALOG)) return
    localStorage.setItem(STORAGE_KEY_CATALOG, JSON.stringify(inspirationCatalog))
  } catch {
    /* ignore */
  }
}
