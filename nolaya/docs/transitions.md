# Transitions cliente — MVP lancement

## Statut

**STEP 4 du cadrage cliente (D10–D18).** Table de transitions entre S01–S13. Ce fichier n’est pas une spec d’écrans, ni un prompt Stitch.

Prochaine étape du protocole au moment de la rédaction initiale : **screen-specs** — **fait** depuis [screen-specs.md](./screen-specs.md).

## Sources verrouillées

- [D10–D18](../user-stories/decisions-produit.md)
- [storyboard.md](./storyboard.md)
- [user-flow.md](./user-flow.md) (écrans S01–S13, URLs, sorties)

« Coiffeuse trouvée » au lancement n’est **pas** le dossier **READY** de l’étape 8 (D04). C’est un oui humain consigné **et** la reconfirmation du lieu, du budget et de la période (D20).

## Conventions

Colonnes : **De** · **Tu fais** · **Tu arrives** · **Ce qui se passe** · **Règle**.

**Tu** = cliente (Inès ou Léa), sauf lignes admin hors scène.

**Tu arrives** — ensemble fermé :

| Valeur | Signification |
| --- | --- |
| **S01** `/` | Accueil |
| **S02** `/decouverte` | Découverte |
| **S03** `/offre/:id` | Fiche prestation |
| **S04**–**S08** | Wizard qualification |
| **S09** `/recherche` | Résultats |
| **S10** `/recherche/diagnostic` | Aucun résultat |
| **S11** `/soumission` | Tes coordonnées |
| **S12** `/soumission/confirmation` | Demande envoyée |
| **S13** `/suivi/:jeton` | Suivi |
| **on reste** | Même écran (éventuellement autre variante). Pas d’URL nouvelle. |
| **hors MVP** | Geste absent ou refusé. Pas d’écran, pas de branche. |

L’outil admin `/interne/…` n’est **jamais** une destination de cette table.

---

## Redirections (pas des écrans)

| De | Tu fais | Tu arrives | Ce qui se passe | Règle |
| --- | --- | --- | --- | --- |
| `/demande` | Tu ouvres sans suffixe | **S04** ou étape wizard **en cours** | Reprise du brouillon fil A. | user-flow |
| `/inspirations/:id` | Offre active | **S03** `/offre/:id` | Même offre, variante `catalog`. | D14 |
| `/inspirations/:id` | Lien mort / offre retirée | **S01** (`error`) ou **S02** | Message ; pas de fiche utilisable. | D14 |

---

## Chrome cliente (pas un écran)

| De | Tu fais | Tu arrives | Ce qui se passe | Règle |
| --- | --- | --- | --- | --- |
| **S01** / **S02** / **S03** `catalog` | Tu tapes **Découvrir** | **on reste** ou **S01** / **S02** | Destinations listées seulement. | D18 |
| **S04**–**S11** | Tu tapes **Ma demande** | **on reste** | Zone active sur le wizard / résultats / soumission. | D18 |
| Sans brouillon ni recherche | Tu tapes **Ma demande** | **on reste** | Zone visible, **inactive** — pas de destination inventée. | D18 |
| Sans jeton | Tu tapes **Suivi** | **on reste** | Zone visible, **inactive**. | D18 |
| **S12** / **S13** | Tu tapes **Suivi** | **S13** `/suivi/:jeton` | Jeton émis à l’envoi. | D18 |
| N’importe où | Tu tapes **Rendez-vous** | **hors MVP** | 4ᵉ onglet n’existe pas. | D18, D21 |
| **S13** | Jeton invalide / abandonné | **S01** (`error`) | Pas un 7ᵉ écran Suivi. | D08 |

---

## S01 — Accueil `/`

| De | Tu fais | Tu arrives | Ce qui se passe | Règle |
| --- | --- | --- | --- | --- |
| **S01** | Tu choisis **Explorer** | **S02** `/decouverte` | Catalogue offres réelles. | D10, D11 |
| **S01** | Tu choisis **Trouver ma coiffeuse** | **S04** `/demande/resultat` | Brouillon vide fil A. | D11 |
| **S01** | Tu ouvres un carrousel / teaser offre | **hors MVP** | Accueil = promesse + 2 CTA seulement. | D13 |
| **S01** | Tu saisis une ville / **Autour de moi** | **hors MVP** | Pas de géoloc au lancement. | D17 |
| Redirection lien mort | Tu lis la bannière | **on reste** (S01 `error`) | Mêmes deux CTA. | D14 |

---

## S02 — Découverte `/decouverte`

| De | Tu fais | Tu arrives | Ce qui se passe | Règle |
| --- | --- | --- | --- | --- |
| **S02** | Tu ouvres une carte | **S03** `/offre/:id` (`catalog`) | Parcours ne crée pas QUALIFIED. | D10 |
| **S02** | Tu choisis **Décrire mon besoin** | **S04** `/demande/resultat` | Entrée fil A. | D11 |
| **S02** `empty` | Tu choisis **Trouver ma coiffeuse** | **S04** | Même destination. | D11 |
| **S02** | Tu scrolles une série horizontale | **on reste** | Pas un nouvel écran en fin de série. | D13 |
| **S02** | Retour | **S01** `/` | — | — |
| **S02** | Tu demandes masonry / grille Pinterest | **hors MVP** | Layout Découverte = carrousels 1:1. | D13 |

---

## S03 — Fiche prestation `/offre/:id`

| De | Tu fais | Tu arrives | Ce qui se passe | Règle |
| --- | --- | --- | --- | --- |
| **S03** `catalog` | Retour | **S02** `/decouverte` | — | — |
| **S03** `from_match` | Retour | **S09** `/recherche` | — | — |
| **S03** `catalog` | **Faire vérifier** | **S11** `/soumission` | Offre seule, pas QUALIFIED. Personne contacté. | D11, D12, D16 |
| **S03** `from_match` | **Faire vérifier** | **S11** | QUALIFIED + cette candidate. | D12, D16 |
| **S03** `catalog` | **Décrire mon besoin** | **S04** | Disclaimer 1.4 non bloquant — pas d’ack requis. | D11 |
| **S03** `catalog` | Tu lis le disclaimer 1.4 | **on reste** | Pas de modal bloquante. | D11 |
| **S03** `error` | **Accueil** / **Découverte** | **S01** / **S02** | Offre morte. | D14 |
| **S03** | Tu appelles / réserve la coiffeuse | **hors MVP** | Pas de contact direct. | D08 |
| **S03** `catalog` | Wizard obligatoire avant Faire vérifier | **hors MVP** | Fil B autorise l’envoi offre seule. | D11 |

---

## S04 — Résultat souhaité `/demande/resultat`

| De | Tu fais | Tu arrives | Ce qui se passe | Règle |
| --- | --- | --- | --- | --- |
| **S04** | **Continuer** (direction exploitable) | **S05** `/demande/contraintes` | Brouillon DRAFT. | US-02.2 |
| **S04** | **Continuer** sans direction | **on reste** (`invalid`) | — | — |
| **S04** | **Je ne sais pas** puis **Continuer** | **S05** | Inconnu explicite OK. | US-02.2 |
| **S04** | Retour (depuis accueil / découverte) | **S01** / **S02** | Brouillon conservé. | — |
| **S04** | Lancer matching / coords | **hors MVP** | Wizard seulement. | — |

---

## S05 — Contraintes `/demande/contraintes`

| De | Tu fais | Tu arrives | Ce qui se passe | Règle |
| --- | --- | --- | --- | --- |
| **S05** | **Continuer** | **S06** `/demande/ou-et-quand` | 0 contrainte OK. | US-02.5 |
| **S05** | Retour | **S04** | Brouillon conservé. | — |

---

## S06 — Où et quand `/demande/ou-et-quand`

| De | Tu fais | Tu arrives | Ce qui se passe | Règle |
| --- | --- | --- | --- | --- |
| **S06** | **Continuer** (dates cohérentes) | **S07** `/demande/budget` | Ville saisie. | D17 |
| **S06** | **Continuer** (limite avant souhaitée) | **on reste** (`invalid`) | — | US-02.3 |
| **S06** | Retour | **S05** | — | — |
| **S06** | **Autour de moi** / permission GPS | **hors MVP** | Ville tapée seulement. | D17 |

---

## S07 — Budget `/demande/budget`

| De | Tu fais | Tu arrives | Ce qui se passe | Règle |
| --- | --- | --- | --- | --- |
| **S07** | **Continuer** (cible ≤ max) | **S08** `/demande/resume` | — | US-02.4 |
| **S07** | **Continuer** (cible > max) | **on reste** (`invalid`) | — | — |
| **S07** | Retour | **S06** | — | — |

---

## S08 — Résumé `/demande/resume`

| De | Tu fais | Tu arrives | Ce qui se passe | Règle |
| --- | --- | --- | --- | --- |
| **S08** | **Modifier** (bloc) | **S04**–**S07** (bloc ciblé) | Autres réponses conservées. | US-02.6 |
| **S08** | **Rechercher** (complet) | **S09** `/recherche` | Version **QUALIFIED** ; matching démarre. Personne contacté. | US-02.6 |
| **S08** `incomplete` | **Rechercher** | **on reste** | Bloc manquant signalé. | — |
| **S08** | Retour | **S07** | — | — |
| **S08** | Voir candidates ici | **hors MVP** | Résultats = S09. | D16 |

---

## S09 — Résultats `/recherche`

| De | Tu fais | Tu arrives | Ce qui se passe | Règle |
| --- | --- | --- | --- | --- |
| **S09** `matching` | Tu attends | **on reste** | Même URL, squelettes masonry. | — |
| **S09** | Tu ouvres une carte | **S03** `from_match` | — | D14 |
| **S09** | **Faire vérifier** (carte) | **S11** | QUALIFIED + candidate. | D12 |
| **S09** | **Modifier ma demande** | **S08** | — | — |
| **S09** | Retour | **S08** | — | — |
| **S09** | Zéro résultat (état métier) | **S10** `/recherche/diagnostic` | Pas masonry vide sur S09. | — |
| **S09** | Comparer 2–5 / Retenir 1–5 | **hors MVP** | 1–3 candidates max. | D16 |
| **S09** | Layout carrousels Découverte | **hors MVP** | Masonry ici seulement. | D13 |

---

## S10 — Aucun résultat `/recherche/diagnostic`

| De | Tu fais | Tu arrives | Ce qui se passe | Règle |
| --- | --- | --- | --- | --- |
| **S10** | **Assouplir** (levier nommé) | **S09** | Nouvelle recherche ; levier explicite. | US-03.8 adapté |
| **S10** | **Modifier mes dates** | **S06** | — | — |
| **S10** | **Modifier ma demande** / aucun levier | **S08** | — | — |
| **S10** | Retour | **S08** | — | — |
| **S10** | Relâchement silencieux contrainte obligatoire | **hors MVP** | Interdit. | E2E-INV-02 |

---

## S11 — Tes coordonnées `/soumission`

| De | Tu fais | Tu arrives | Ce qui se passe | Règle |
| --- | --- | --- | --- | --- |
| **S11** | **Envoyer** (champs valides + ack) | **S12** `/soumission/confirmation` | Dossier unique ; personne contacté ; Suivi **Demande reçue** ; file admin. | D12, D15, D19 |
| **S11** | **Envoyer** sans ack | **on reste** (`warning_unacked`) | — | D15 |
| **S11** | Champs invalides | **on reste** (`invalid`) | Pas d’OTP. | D15 |
| **S11** `readonly` | Déjà envoyé | **on reste** ou **S13** via **Voir le suivi** | Pas de 2ᵉ dossier. | D05 adapté |
| **S11** fil B | Retour | **S03** `catalog` | — | — |
| **S11** fil A | Retour | **S03** `from_match` ou **S09** | — | — |
| **S11** | OTP / vérifier le téléphone | **hors MVP** | Coordonnées déclarées. | D15, D21 |
| **S11** | **Faire vérifier** = vérifier le canal | **hors MVP** | Faire vérifier = match (D12). | D12 |

---

## S12 — Demande envoyée `/soumission/confirmation`

| De | Tu fais | Tu arrives | Ce qui se passe | Règle |
| --- | --- | --- | --- | --- |
| **S12** | **Suivre ma demande** | **S13** `/suivi/:jeton` | Jeton opaque. | D08 |
| **S12** | Chrome **Suivi** | **S13** | — | D18 |
| **S12** | Rouvrir formulaire coords vierge | **hors MVP** | Pas un nouveau dossier. | — |

---

## S13 — Suivi `/suivi/:jeton`

Six **variantes** même URL (badges D20). Pas de navigation métier supplémentaire au lancement.

| De | Tu fais | Tu arrives | Ce qui se passe | Règle |
| --- | --- | --- | --- | --- |
| **S13** | Chrome **Découvrir** | **S01** ou **S02** | Pas de 3ᵉ écran discover. | D18 |
| **S13** | Chrome **Ma demande** | **on reste** | Recap readonly ; pas 2ᵉ dossier. | — |
| **S13** | **Appeler Aïcha** / **Payer** / **Modifier RDV** | **hors MVP** | — | D21 |
| Jeton invalide | Tu ouvres l’URL | **S01** (`error`) | — | D08 |

### Effets admin (hors navigation cliente)

| Fait interne (Alex) | Variante Suivi |
| --- | --- |
| Dossier créé, aucun contact | **Demande reçue** |
| Contact consigné | **Recherche en cours** |
| Issue précision | **Précision nécessaire** |
| Match confirmé (oui + 3 reconfirmations) | **Coiffeuse trouvée** |
| Épuisement sans confirmation | **Aucune coiffeuse confirmée** |
| Dossier inactif | **Demande abandonnée** |

---

## Synthèse fil A (Inès) et fil B (Léa)

| Étape | Inès (A) | Léa (B) |
| --- | --- | --- |
| Entrée | S01 → S04 | S01 → S02 |
| Qualification | S04–S08 → QUALIFIED | — |
| Matching | S09 (1–3) ou S10 | — |
| Fiche | S03 `from_match` | S03 `catalog` + disclaimer 1.4 |
| Soumission | S11 (QUALIFIED + candidate) | S11 (offre seule) |
| Fin | S12 → S13 | S12 → S13 |

Les deux créent un dossier en file admin ; fil et contenu diffèrent (D11, D19).
