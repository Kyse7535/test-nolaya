# User-flow cliente — MVP lancement

## Statut

**STEP 3 du cadrage cliente (D10–D18).** Inventaire d’écrans et URLs du parcours sans compte. Ce fichier n’est pas une table de transitions, ni une spec d’écrans, ni un prompt Stitch.

Transitions cliente (STEP 4) : [transitions.md](./transitions.md) — **à jour**. Specs d’écrans (STEP 5) : [screen-specs.md](./screen-specs.md) — **fait**. Prompts Stitch (STEP 6) : [prompts-stitch.md](./prompts-stitch.md) — **fait**.

## Sources verrouillées

- [D10–D18](../user-stories/decisions-produit.md)
- [storyboard.md](./storyboard.md)
- [README user stories](../user-stories/README.md)

« Coiffeuse trouvée » au lancement n’est **pas** le dossier **READY** de l’étape 8 (D04). C’est un oui humain consigné **et** la reconfirmation du lieu, du budget et de la période (D20).

Ce flux n’est **pas** le parcours produit complet : pas de comparaison 2–5, pas d’étape 5 autonome, pas d’OTP, pas d’onglet Rendez-vous.

## Principes

1. **Sans compte.** Découverte, qualification, soumission et suivi sans inscription (D08, D15).
2. **Deux fils, même inventaire.** Fil A (Inès, guidé) et fil B (Léa, libre) partagent S01–S13 ; le contenu de S03 et S11 diffère (D11).
3. **Chrome trois zones.** Découvrir · Ma demande · Suivi — jamais Rendez-vous (D18).
4. **Catalogue = offres réelles.** Découverte affiche des prestations identifiables avec coiffeuse, prix et disponibilité déclarés (D10).
5. **Layouts distincts.** Carrousels 1:1 **uniquement** sur Découverte ; masonry **uniquement** sur Résultats (D13).
6. **Une fiche offre.** `/offre/:id` fusionne inspiration et aperçu (D14). `/inspirations/:id` = redirection.
7. **Matching court.** Après QUALIFIED, 1 à 3 candidates — pas 5, pas comparaison simultanée (D16).
8. **Faire vérifier = match.** La conciergerie vérifie la pertinence du match, pas le téléphone de la cliente (D12).
9. **Coordonnées déclarées.** Enregistrées telles que saisies ; pas d’OTP au lancement (D15).
10. **Ville saisie.** Pas de géolocalisation navigateur, pas « autour de moi » (D17).
11. **Vérité d’engagement.** Jamais réservation, créneau bloqué, prix final ou RDV confirmé avant les jalons autorisés (E2E-INV-03).
12. **Pont admin.** S11–S13 créent le dossier ; l’outil `/interne/…` prend le relais ([user-flow-admin.md](./user-flow-admin.md)).

## Chrome cliente (trois zones — pas des écrans)

| Zone | Écrans où active | Si inactive |
| --- | --- | --- |
| **Découvrir** | S01, S02, S03 (`catalog`) | — (toujours ouvert) |
| **Ma demande** | S04–S11 (wizard, résumé, résultats, fiche `from_match`) | Visible, **inactive** — pas de destination inventée |
| **Suivi** | S13 | Visible, **inactive** sans jeton — pas de dossier au hasard |

Taper une zone n’ouvre **que** les destinations listées dans [transitions.md](./transitions.md).

## Inventaire (13 écrans)

| ID | Écran | URL | Fil | Variantes (même URL) |
| --- | --- | --- | --- | --- |
| **S01** | Accueil | `/` | A + B | `loading` · `happy` · `error` |
| **S02** | Découverte | `/decouverte` | B | `loading` · `empty` · `happy` |
| **S03** | Fiche prestation | `/offre/:id` | B `catalog` · A `from_match` | `loading` · `catalog` · `from_match` · `error` |
| **S04** | Résultat souhaité | `/demande/resultat` | A | `empty` · `happy` · `invalid` |
| **S05** | Contraintes importantes | `/demande/contraintes` | A | `empty` · `happy` · `invalid` |
| **S06** | Où et quand | `/demande/ou-et-quand` | A | `empty` · `happy` · `invalid` |
| **S07** | Budget et fournitures | `/demande/budget` | A | `empty` · `happy` · `invalid` |
| **S08** | Résumé | `/demande/resume` | A | `incomplete` · `happy` |
| **S09** | Résultats | `/recherche` | A | `matching` · `happy` (1–3) |
| **S10** | Aucun résultat | `/recherche/diagnostic` | A | `happy` · `no_lever` |
| **S11** | Tes coordonnées | `/soumission` | A + B | `form` · `warning_unacked` · `invalid` · `readonly` |
| **S12** | Demande envoyée | `/soumission/confirmation` | A + B | `happy` |
| **S13** | Suivi | `/suivi/:jeton` | A + B | six statuts D20 |

### Redirections (pas des écrans)

| Adresse | Comportement |
| --- | --- |
| `/demande` (sans suffixe) | Redirige vers l’étape de qualification **en cours**, sinon **Résultat souhaité** S04 |
| `/inspirations/:id` | Offre active → **Fiche prestation** `/offre/:id` ; lien mort / offre retirée → message + Accueil ou Découverte |

---

## S01 — Accueil `/`

**Moments storyboard 1.1 · US-01.1**

**Entrées**

- Arrivée directe `/`.
- Redirection depuis lien mort (`/inspirations/:id`, offre inactive).

**Contenu**

- Promesse : trouver une coiffeuse qui correspond — pas un moteur de réservation.
- Deux CTA : **Explorer** (fil B) · **Trouver ma coiffeuse** (fil A).
- Note discrète : sans compte, sans réservation.
- **Pas** de carrousels, grille d’offres, photo héroïque géante, champ ville (D13).

**Sorties**

- **Explorer** → S02 `/decouverte`.
- **Trouver ma coiffeuse** → S04 `/demande/resultat` (brouillon vide fil A).
- Chrome **Découvrir** : reste.
- Chrome **Ma demande** / **Suivi** : inactifs.

**Variante `error`**

- Bannière « Cette offre n’est plus disponible. » + mêmes deux CTA.

---

## S02 — Découverte `/decouverte`

**Moments 1.2 · US-01.2 · D10**

**Entrées**

- **Explorer** depuis S01.
- Chrome **Découvrir** depuis un écran autorisé.

**Contenu**

- Plusieurs carrousels horizontaux empilés (ex. Tresses, Vanilles, À Paris).
- Cartes **1:1**, peu de texte : prénom coiffeuse, ville, prix + certitude, dispo déclarée.
- Lien secondaire **Décrire mon besoin** → fil A.
- **Pas** masonry, pas géoloc (D13, D17).

**Sorties**

- Carte → S03 `/offre/:id` (`catalog`).
- **Décrire mon besoin** → S04.
- Retour → S01.

**Variantes**

- `empty` : message + CTA vers fil A.
- `loading` : squelettes carrousels.

---

## S03 — Fiche prestation `/offre/:id`

**Moments 1.3–1.5, 3.2 · D14**

**Entrées**

- Carte Découverte (fil B, `catalog`).
- Carte Résultats (fil A, `from_match`).
- Redirection `/inspirations/:id`.

**Contenu commun**

- Média modeste (1:1 ou 4:3), identité, prix, dispo, description.
- CTA primaire **Faire vérifier** + helper « Nolaya vérifie le match — pas un rendez-vous confirmé. »

**Variante `catalog` (fil B)**

- Disclaimer 1.4 **non bloquant** (D11).
- Secondaire **Décrire mon besoin**.
- Retour → S02.

**Variante `from_match` (fil A)**

- Bandeau « Selon ta demande » (raisons / écarts).
- Pas de disclaimer 1.4.
- Retour → S09.

**Sorties**

- **Faire vérifier** → S11 (fil B : offre seule ; fil A : QUALIFIED + candidate).
- **Décrire mon besoin** (`catalog` only) → S04.
- `error` : offre morte → S01 ou S02.

---

## S04 — S08 — Wizard qualification (fil A)

| ID | URL | Étape | Objet |
| --- | --- | --- | --- |
| S04 | `/demande/resultat` | 1/5 | Résultat souhaité |
| S05 | `/demande/contraintes` | 2/5 | Contraintes obligatoires / priorité |
| S06 | `/demande/ou-et-quand` | 3/5 | Ville, lieu, dates (D17) |
| S07 | `/demande/budget` | 4/5 | Budget cible / max, fournitures |
| S08 | `/demande/resume` | 5/5 | Récap + **Rechercher** → QUALIFIED |

**Principes communs**

- Brouillon anonyme ; personne contactée.
- **Continuer** avance ; **Retour** conserve le brouillon.
- Chrome **Ma demande** actif.
- S08 : **Rechercher** enabled seulement si complet → S09 ; sinon reste ou renvoie au bloc manquant.

---

## S09 — Résultats `/recherche`

**Moment 3.1 · D13, D16**

**Entrées**

- **Rechercher** depuis S08 (QUALIFIED).

**Contenu**

- Chip résumé QUALIFIED + lien modifier.
- **Masonry** : 1 à 3 cartes hauteur variable.
- Par carte : **Faire vérifier** ou ouverture fiche `from_match`.
- **Pas** carrousels Découverte.

**Sorties**

- Carte → S03 `from_match`.
- **Faire vérifier** → S11.
- **Modifier ma demande** → S08.
- Zéro résultat → S10 (pas layout vide ici).

**Variante `matching`**

- Même URL, squelettes masonry, « Recherche en cours… ».

---

## S10 — Aucun résultat `/recherche/diagnostic`

**Moment 3.A**

**Contenu**

- Explication des critères bloquants.
- **Un** levier explicite max (si applicable).
- Alternatives : modifier dates → S06 ; modifier demande → S08.

**Interdit**

- Relâcher une contrainte obligatoire en silence.
- Faux résultats ou masonry vide.

---

## S11 — Tes coordonnées `/soumission`

**Moment 6.1 · D12, D15**

**Entrées**

- **Faire vérifier** depuis S03 ou S09.

**Contenu**

- Recap fil A ou fil B.
- Prénom + téléphone **ou** e-mail.
- Avertissement + accusé obligatoire avant **Envoyer ma demande**.
- Pas d’OTP.

**Sorties**

- **Envoyer** (valid + ack) → S12.
- **Retour** → S03 (catalog ou from_match selon fil).
- `readonly` : déjà envoyé — pas de second dossier.

---

## S12 — Demande envoyée `/soumission/confirmation`

**Moment 6.2**

**Contenu**

- Confirmation réception ; pas une réservation.
- Référence NOL-… (non suffisante seule).
- **Suivre ma demande** → S13 avec jeton.

**Effet**

- Dossier créé ; personne contacté ; Suivi = **Demande reçue** ; apparition file admin (D19).

---

## S13 — Suivi `/suivi/:jeton`

**Moment 6.3 · D18, D20**

**Contenu**

- Badge statut (six variantes D20).
- Recap readonly de ce qui a été envoyé.
- Pas de chat coiffeuse, pas de journal admin.

**Jeton invalide**

- **Pas** S13 — redirection S01 `error`.

---

## Pont cliente ↔ admin

| Côté cliente | Côté admin |
| --- | --- |
| S11 **Envoyer** | Dossier apparaît I02 |
| S12 confirmation | Suivi **Demande reçue** |
| S13 six états | Effets I03–I05 (D20) |

Détail : [user-flow-admin.md](./user-flow-admin.md) — ne pas dupliquer I01–I05 ici.

---

## Hors MVP — ne pas inventer d’URL

- login / compte / OTP ;
- `/rendez-vous`, onglet Rendez-vous ;
- comparaison 2–5, `/recherche/comparer` ;
- géoloc, carte, « autour de moi » ;
- paiement, accord, étape 5 produit complet ;
- écran Inspiration ou Aperçu séparé ;
- messagerie avec la coiffeuse ;
- `/interne/…` (outil admin).

Voir D10–D18 et [transitions.md](./transitions.md).
