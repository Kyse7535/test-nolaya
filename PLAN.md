# Plan de réalisation — Atelier Synergy (Vue.js + Tailwind)

> Objectif : reproduire fidèlement les 34 maquettes Stitch (`code.html` + `screen.png`) en application Vue.  
> Stack choisie volontairement **sans Next / sans Nuxt**.  
> Données de référence : `model.md` · Design system : `DESIGN.md` dans chaque pack.

---

## Stack

| Couche | Choix |
|--------|--------|
| Build | **Vite + Vue 3** (JavaScript, pas TypeScript) |
| Routing | **Vue Router** |
| State | **Pinia** |
| UI | **Tailwind CSS** |
| Icons | Material Symbols Outlined |
| Fonts | Manrope + JetBrains Mono |
| Data V1 | mocks JS (objets / JSON) |
| Backend | plus tard |

**Pourquoi pas Nuxt :** Vite + Vue Router suffit pour reproduire les maquettes. Nuxt n’apporte rien de nécessaire au début.

---

## Ce que contient le repo source

Pas d’app existante : **34 maquettes Stitch** + design system + `model.md`.

| Pack | Écrans | Rôle |
|------|--------|------|
| `stitch_capacit_professionnelle_0-1-2` | 13 | Config capacité, demande cliente, matching opérateur |
| `stitch_capacit_professionnelle_coiffeuse_3-4-5-6` | 15 | Offre ferme → engagement → préparation → jour J |
| `stitch_capacit_professionnelle_coiffeuse.-7-8zip` | 6 | Solde, avis, revenus, historique |

**3 personas :** Cliente · Styliste · Opérateur.

**Stratégie de fidélité visuelle :**
1. `screen.png` = vérité visuelle (pixel check)
2. `code.html` = source de markup/classes à porter (pas redesign)
3. `DESIGN.md` = tokens (couleurs, typo, radius, spacing)
4. `model.md` = données derrière les écrans

---

## Phase 0 — Setup projet (jour 1)

1. Créer le projet :
```bash
npm create vite@latest atelier-synergy -- --template vue
cd atelier-synergy
npm install
npm install vue-router pinia
npm install -D tailwindcss @tailwindcss/vite
```
2. Configurer Tailwind (plugin Vite) + fonts Google + Material Symbols dans `index.html`.
3. Porter les tokens depuis `DESIGN.md` / config Tailwind des HTML Stitch :
   - couleurs (`primary` charcoal, `secondary` gold, surfaces)
   - fonts (`font-manrope`, `font-mono`)
   - radius / spacing
4. Structure de dossiers :

```text
src/
  assets/
  components/
    ui/           # Button, Badge, Input, Stepper…
    domain/       # MatriceResponsabilites, StatusBadge…
  layouts/        # ClienteLayout, StylisteLayout, OperateurLayout
  views/
    cliente/
    styliste/
    operateur/
  router/
  stores/
  mocks/
  composables/
references/       # copier les screen.png pour QA visuelle
```

5. Router avec 3 préfixes : `/cliente`, `/styliste`, `/operateur`.
6. Role switcher temporaire en header (dev) pour changer de persona.

**Livrable :** app qui tourne, pages vides, design tokens OK.

---

## Phase 1 — Design system + écran pilote (2–3 j)

### 1.1 Composants UI réutilisés partout

Extraire depuis les HTML :
- `AppButton` (primary charcoal / ghost)
- `StatusBadge` (`CAPACITY_DRAFT`, `COMMITTED`, `READY`, `AT_RISK`…)
- `DomainStepper` (étapes Domain Storytelling)
- `ResponsibilityToggle` (STYLISTE / CLIENT)
- `MoneyText` (JetBrains Mono)
- `ScreenHeader` (back + titre + aide)

### 1.2 Écran pilote

Porter **`point_d_entr_e_qualifier_mon_besoin`** :
1. Ouvrir `code.html` + `screen.png` côte à côte.
2. Copier le markup → `<template>` Vue.
3. Remplacer classes Tailwind CDN par les tiennes.
4. Remplacer textes/actions par data mock + `@click` / `router.push`.
5. Comparer avec le PNG.

**Règle d’or :** ne pas redesign. Porter le HTML Stitch.

**Livrable :** 1 écran fidèle + composants de base.

---

## Phase 2 — Mocks & stores (1–2 j)

Basé sur `model.md`, créer des mocks JS :

```text
src/mocks/
  users.js
  demandes.js
  capacites.js
  invitations.js
  rendezVous.js
```

Stores Pinia minimaux :
- `useDemandeStore` — wizard demande cliente
- `useCapaciteStore` — wizard capacité styliste
- `useRdvStore` — cycle de vie RDV
- `useMatchingStore` — campagnes opérateur
- `useAuthStore` — rôle courant (`cliente` | `styliste` | `operateur`)

Pas de backend. Les stores lisent/écrivent les mocks en mémoire.

**Livrable :** données cohérentes (Emma, Julianne, demande #7492…) partagées entre écrans.

---

## Phase 3 — Parcours Cliente (écran par écran)

Pour **chaque** écran : `code.html` → `views/cliente/XxxView.vue` → mock → check PNG → brancher la navigation.

| Ordre | Vue | Source Stitch | Route |
|------|-----|---------------|-------|
| 1 | `AccueilBesoinView` | `accueil_explicatif_qualifier_mon_besoin` | `/cliente/besoin` |
| 2 | `PointEntreeBesoinView` | `point_d_entr_e_qualifier_mon_besoin` | `/cliente/besoin/entree` |
| 3 | `InspirationsVariantesView` | `votre_r_sultat_inspirations_et_variantes` | `/cliente/style` |
| 4 | `TempsBudgetView` | `temps_budget_qualifier_mon_besoin` | `/cliente/temps-budget` |
| 5 | `ZoneMobiliteView` | `zone_mobilit_qualifier_mon_besoin` | `/cliente/zone` |
| 6 | `ProtectionServiceView` | `protection_service_qualifier_mon_besoin` | `/cliente/protection` |
| 7 | `ResumeDemandeView` | `r_sum_de_ma_demande_qualifier_mon_besoin` | `/cliente/resume` |
| 8 | `SuccesDemandeView` | `succ_s_demande_qualifi_e` | `/cliente/succes` |
| 9 | `AccepterOffreView` | `accepter_l_offre` | `/cliente/accepter` |
| 10 | `RecapContractuelView` | `s02_r_capitulatif_contractuel` | `/cliente/recap-contrat` |
| 11 | `ConsentementsView` | `consentements_politiques_versionn_s` | `/cliente/consentements` |
| 12 | `PaiementMockView` | `paiement_mock_atelier_synergy` | `/cliente/paiement` |
| 13 | `EngagementClienteView` | `s05_confirmation_cliente_committed` | `/cliente/engage` |
| 14 | `AccueilPreparationView` | `s01_accueil_pr_paration_rdv` | `/cliente/preparation` |
| 15 | `PlanPreparationView` | `plan_de_pr_paration_s02` | `/cliente/preparation/plan` |
| 16 | `ChecklistClienteView` | `checklist_cliente` | `/cliente/preparation/checklist` |
| 17 | `RdvReadyView` | `rdv_ready_s05` | `/cliente/ready` |
| 18 | `AccueilJourJView` | `jour_j_accueil_explicatif` | `/cliente/jour-j` |
| 19 | `SuiviArriveesView` | `suivi_op_rationnel_arriv_es` | `/cliente/jour-j/suivi` |
| 20 | `ConfirmationRealisationView` | `confirmation_cliente` | `/cliente/jour-j/confirm` |
| 21 | `SuccesCompletedView` | `succ_s_completed_pont_r_glement` | `/cliente/jour-j/succes` |
| 22 | `AccueilPreuveView` | `preuve_d_exp_rience_introduction` | `/cliente/preuve` |
| 23 | `ConfirmationPreuveView` | `confirmation_de_fin_de_prestation` | `/cliente/preuve/confirm` |
| 24 | `AccueilReglementView` | `accueil_explicatif_d_compte_r_glement` | `/cliente/solde` |
| 25 | `ReglementFinalView` | `r_glement_final_atelier_synergy` | `/cliente/solde/paiement` |
| 26 | `RecuSuccesView` | `re_u_succ_s_atelier_synergy` | `/cliente/solde/succes` |
| 27 | `RetourExperienceView` | `votre_retour_d_exp_rience` | `/cliente/avis` |
| 28 | `AvisPublicView` | `avis_t_moignage_public_review` | `/cliente/avis/public` |
| 29 | `HistoriqueView` | `mes_exp_riences_historique_refaire` | `/cliente/historique` |
| 30 | `SuccesExperienceView` | `succ_s_experience_recorded` | `/cliente/preuve/succes` |

Wizard demande = steps 1→8 avec `DomainStepper` + `demandeStore`.

**Livrable :** cliente peut enchaîner le happy path en mock.

---

## Phase 4 — Parcours Styliste

### 4.1 Wizard capacité (config service)

| Ordre | Vue | Source |
|------|-----|--------|
| 1 | Accueil capacité | `accueil_explicatif_capacit_professionnelle` |
| 2 | Prestation + variante | `prestation_variante` |
| 3 | Galerie | `galerie_de_la_prestation_capacit_professionnelle` |
| 4 | Niveau de service + tâches | `niveau_de_service_t_ches_atelier_synergy` |
| 5 | Prix + durée + suppléments | `prix_dur_e_suppl_ments` |
| 6 | Lieu + dispos + volume | `lieu_disponibilit_s_volume_capacit_professionnelle` |
| 7 | Récap activation | `r_capitulatif_activation_atelier_synergy` |
| 8 | Succès | `succ_s_capacit_ouverte` |
| 9 | Liste capacités (bonus) | `liste_de_mes_capacit_s_atelier_synergy` |

Store : `capaciteStore` (brouillon → open).

### 4.2 Matching → offre → commit

| Ordre | Vue | Source |
|------|-----|--------|
| 1 | Accueil appariement | `s01_accueil_explicatif_appariement` |
| 2 | Matching lancé | `matching_lanc` |
| 3 | Campagne / vivier | `campagne_vivier_s03` |
| 4 | Invitation | `s04_invitation_une_prestation_coiffeuse` |
| 5 | Suivi invitations | `suivi_des_invitations` |
| 6 | Shortlist prête | `shortlist_pr_te` |
| 7 | Accueil proposition ferme | `accueil_explicatif_proposition_ferme` |
| 8 | Synthèse décisionnelle | `synth_se_d_cisionnelle` |
| 9 | Décision faisabilité | `d_cision_de_faisabilit` |
| 10 | Config offre ferme | `configuration_de_l_offre_ferme` |
| 11 | Publier proposition | `r_capitulatif_publier_proposition_ferme` |
| 12 | Succès offre publiée | `offre_ferme_publi_e_succ_s` |
| 13 | Offre reçue (cliente) | `offre_re_ue_vue_cliente` |
| 14 | Confirm coiffeuse | `s06_confirmation_coiffeuse_committed` |

### 4.3 Préparation / jour J / post

| Ordre | Vue | Source |
|------|-----|--------|
| 1 | Accueil préparation | `s01_accueil_pr_paration_rdv` |
| 2 | Plan de préparation | `plan_de_pr_paration_s02` |
| 3 | Checklist coiffeuse | `checklist_coiffeuse_s04` |
| 4 | RDV READY | `rdv_ready_s05` |
| 5 | Démarrer prestation | `d_marrer_la_prestation` |
| 6 | Synthèse de fin | `synth_se_de_fin_fin_compl_te` |
| 7 | Succès COMPLETED | `succ_s_completed_pont_r_glement` |
| 8 | Revenu | `mon_revenu_reversement` |
| 9 | Réponse avis | `avis_t_moignage_public_review` |

AT_RISK, retard et avenant hors MVP (non générés).

**Livrable :** parcours styliste complet en mock.

---

## Phase 5 — Parcours Opérateur

Matching MVP = auto (pas de décisions opérateur). Les écrans campagne / suivi vivent dans le parcours matching cliente–coiffeuse (`campagne_vivier_s03`, `suivi_des_invitations`). Élargissement hors MVP.

Layout sidebar admin (Dashboard / Stylists / Zones) reporté hors happy path.

**Livrable :** lecture seule éventuelle sur `matchingStore` — décisions opérateur hors scope démo.

---

## Phase 6 — Navigation & machine à états

Dans `rdvStore`, encoder les statuts vus dans les maquettes :

```text
SOFT_HOLD → BOOKED → COMMITTED → READINESS_PENDING
  → READY | AT_RISK → JOUR_J → SETTLED
```

Règles simples :
- CTA d’un écran = `store.action()` + `router.push(...)`
- Badges lus depuis `rdv.statut`
- Une seule « story » mock partagée (même RDV côté cliente et styliste)

**Livrable :** les 3 rôles racontent la même histoire de bout en bout.

---

## Phase 7 — QA visuelle (continu, pas à la fin)

Pour chaque écran fini :
1. Ouvrir `references/.../screen.png`
2. Ouvrir la route Vue
3. Checklist :
   - Manrope / JetBrains Mono
   - Material Symbols (pas d’autres icônes)
   - couleurs tokens (pas de purple / gradients inventés)
   - radius soft (~0.25rem)
   - badges uppercase mono
   - espacements proches du PNG
4. Corriger avant de passer à l’écran suivant

---

## Phase 8 — Backend (seulement après UI)

Quand les 34 écrans sont fidèles :
1. API (Node/Express ou autre) calquée sur `model.md`
2. Remplacer les mocks dans les stores par `fetch` / axios
3. Auth (cliente / styliste / opérateur)
4. Paiement réel (Stripe) si besoin — les écrans existent déjà

L’UI ne change pas.

---

## Méthode de portage d’un écran (répéter 34×)

```text
1. Lire screen.png (cible visuelle)
2. Lire code.html (markup + classes)
3. Créer XxxView.vue
4. Coller le body HTML dans <template>
5. Nettoyer : html/body → div, scripts CDN → déjà en global
6. Extraire blocs répétés → composants
7. Brancher data (props / store / mock)
8. Brancher actions (router + store)
9. Check PNG
10. Commit
```

Cadence réaliste : **1 à 2 écrans/jour** une fois le design system en place.

---

## Ordre de travail recommandé

1. Setup Vite + Vue + Tailwind + tokens
2. UI kit + écran pilote `point_d_entr_e_qualifier_mon_besoin`
3. Mocks + Pinia
4. Happy path **cliente**
5. Wizard **styliste** capacité
6. Offre ferme → commit
7. Jour J + post
8. **Opérateur**
9. Polish QA
10. Backend

---

## Livrable V1 (sans backend)

Une SPA Vue qui :
- reproduit les 34 écrans fidèlement
- navigue selon les 3 rôles
- utilise les mêmes tokens / fonts / icons que Stitch
- s’appuie sur le modèle de `model.md` en mocks
