# Specs d’écrans cliente — MVP lancement

## Statut

**STEP 5 du cadrage cliente (D10–D18).** Zones, copy et actions des treize écrans sans compte. Ce fichier n’est **pas** un prompt Stitch.

Prochaine étape du protocole : **prompts Stitch cliente** — **fait** depuis [prompts-stitch.md](./prompts-stitch.md). Stitch dessine l’apparence ; il n’invente ni écran, ni CTA, ni destination absents d’ici et de [transitions.md](./transitions.md).

## Sources verrouillées

- [D10–D18](../user-stories/decisions-produit.md)
- [storyboard.md](./storyboard.md)
- [user-flow.md](./user-flow.md)
- [transitions.md](./transitions.md)

## Conventions

Colonnes d’action : **Action** · **Condition** · **Résultat** · **Destination**.

**Destination** — ensemble fermé : **S01**–**S13**, **on reste**, **hors MVP** (pas de contrôle UI).

Les variantes (`loading`, `empty`, `catalog`, `from_match`, six statuts Suivi…) sont des **variantes de la même URL**, jamais une URL nouvelle.

Copy : français, **tutoiement** (tu / ta / tes). Pas de promesse « réservation », « créneau bloqué », « prix final », READY.

## Cadre visuel (tous les écrans)

Application mobile **~390×844**, scroll vertical si besoin.

| Règle | Application |
| --- | --- |
| Photos | **Pas de héroïque géante** (D13). Médias modestes ; portfolio / offres = coins **sharp (0px)**. |
| Carrousels 1:1 | **Découverte S02 uniquement** (D13). |
| Masonry | **Résultats S09 uniquement** (D13). |
| Géoloc | Absente (D17). |
| OTP / login | Absents (D15). |
| Chrome | **Découvrir · Ma demande · Suivi** — jamais Rendez-vous (D18). |

Design system Nolaya : Manrope UI, JetBrains Mono pour badges / montants / statuts / étapes ; charcoal `#000000` / `#1b1c1c` ; or `#775a19` / `#fed488` avec parcimonie ; surfaces `#fbf9f8` / `#ffffff` / `#efeded` ; erreur `#ba1a1a` ; rayons contrôles `0.25rem`. Pas de violet, neon, dark mode, emoji décoratif.

Identité visuelle : cheveux afro / texturés — femmes noires et métissées. Premium, réaliste, respectueux.

---

## Chrome cliente

Pas un écran. Présent sur **S01–S13**.

Spécifié **une fois**. Chaque écran y renvoie.

### Zones

| Zone | Copy | Active quand |
| --- | --- | --- |
| **Découvrir** | `Découvrir` | S01, S02, S03 `catalog` |
| **Ma demande** | `Ma demande` | S04–S11, S03 `from_match` |
| **Suivi** | `Suivi` | S13 ; aussi disponible depuis S12 |

### Actions chrome

| Action | Condition | Résultat | Destination |
| --- | --- | --- | --- |
| **Découvrir** | S01 / S02 / S03 `catalog` | Navigation autorisée seulement | **S01** / **S02** / **on reste** |
| **Ma demande** | Brouillon ou recherche active | — | **on reste** (écran courant) |
| **Ma demande** | Pas de brouillon | Zone inactive | **on reste** — pas de contrôle |
| **Suivi** | Jeton connu (post-envoi) | — | **S13** |
| **Suivi** | Pas de jeton | Zone inactive | **on reste** — pas de contrôle |
| **Rendez-vous** | — | N’existe pas | **hors MVP** |

---

## Redirections

| Action | Condition | Résultat | Destination |
| --- | --- | --- | --- |
| Ouvrir `/demande` | Brouillon en cours | Reprise wizard | **S04**–**S08** (étape courante) |
| Ouvrir `/demande` | Pas de brouillon | — | **S04** |
| Ouvrir `/inspirations/:id` | Offre active | Redirection | **S03** `/offre/:id` |
| Ouvrir `/inspirations/:id` | Offre morte | Message | **S01** `error` ou **S02** |

---

## Inventaire (13 écrans)

| ID | Écran | URL | Variantes |
| --- | --- | --- | --- |
| S01 | Accueil | `/` | `loading` · `happy` · `error` |
| S02 | Découverte | `/decouverte` | `loading` · `empty` · `happy` |
| S03 | Fiche prestation | `/offre/:id` | `loading` · `catalog` · `from_match` · `error` |
| S04 | Résultat souhaité | `/demande/resultat` | `empty` · `happy` · `invalid` |
| S05 | Contraintes | `/demande/contraintes` | `empty` · `happy` · `invalid` |
| S06 | Où et quand | `/demande/ou-et-quand` | `empty` · `happy` · `invalid` |
| S07 | Budget et fournitures | `/demande/budget` | `empty` · `happy` · `invalid` |
| S08 | Résumé | `/demande/resume` | `incomplete` · `happy` |
| S09 | Résultats | `/recherche` | `matching` · `happy` |
| S10 | Aucun résultat | `/recherche/diagnostic` | `happy` · `no_lever` |
| S11 | Tes coordonnées | `/soumission` | `form` · `warning_unacked` · `invalid` · `readonly` |
| S12 | Demande envoyée | `/soumission/confirmation` | `happy` |
| S13 | Suivi | `/suivi/:jeton` | 6 statuts D20 |

---

## S01 — Accueil `/`

**Type :** entrée opérationnelle — promesse + deux portes (D13).

### Zones

| Zone | Contenu |
| --- | --- |
| En-tête | Wordmark `Nolaya` — typographique, discret |
| Corps | Headline + une phrase d’appui |
| Actions | Deux CTA pleine largeur empilés |
| Note | Une ligne « sans compte » |
| Chrome | Découvrir (actif) · Ma demande · Suivi (inactifs) |

### Copy

- Headline : `Trouve une coiffeuse qui te correspond`
- Body : `Nolaya t’aide à tomber juste — à partir d’une offre réelle, ou en décrivant ce que tu veux.`
- CTA 1 : `Explorer`
- CTA 2 : `Trouver ma coiffeuse`
- Note : `Sans compte. Ce n’est pas une réservation.`
- VARIANT `error` : `Cette offre n’est plus disponible.`

### Actions

| Action | Condition | Résultat | Destination |
| --- | --- | --- | --- |
| **Explorer** | — | Ouvre catalogue | **S02** |
| **Trouver ma coiffeuse** | — | Brouillon vide fil A | **S04** |
| Carrousel / carte offre | — | Interdit sur S01 | **hors MVP** |
| Ville / Autour de moi | — | — | **hors MVP** |

---

## S02 — Découverte `/decouverte`

**Type :** catalogue opérationnel — offres **réelles** (D10). Layout carrousels **1:1** (D13).

### Zones

| Zone | Contenu |
| --- | --- |
| En-tête | Retour · titre `Découverte` |
| Corps | Séries horizontales empilées (ex. Tresses & braids, Vanilles, À Paris) |
| Carte | Photo 1:1 · prénom · ville · prix + certitude · dispo déclarée |
| Pied | Lien `Décrire mon besoin` |
| Chrome | Découvrir actif |

### Copy (exemples)

- Sections : `Tresses & braids` · `Vanilles & twists` · `Protective styles`
- Carte : `Aïcha` / `Paris` / `180 € · déclaré` / `Mi-septembre · déclaré`
- Micro-certitude : `déclaré` ou `à confirmer` — jamais `confirmé` (créneau/RDV)
- VARIANT `empty` : `Aucune offre publiable pour le moment.` + CTA fil A
- VARIANT `loading` : squelettes carrés 1:1

### Actions

| Action | Condition | Résultat | Destination |
| --- | --- | --- | --- |
| Carte | Offre active | Fiche | **S03** `catalog` |
| **Décrire mon besoin** | — | Fil A | **S04** |
| **Retour** | — | — | **S01** |
| Scroll horizontal série | — | Reste sur S02 | **on reste** |
| Masonry / grille Pinterest | — | — | **hors MVP** |

---

## S03 — Fiche prestation `/offre/:id`

**Type :** fiche offre unique (D14). Variantes **`catalog`** (Léa) et **`from_match`** (Inès).

### Zones communes

| Zone | Contenu |
| --- | --- |
| En-tête | Retour · titre prestation (ex. `Knotless braids mi-dos`) |
| Média | 1:1 ou 4:3 modeste ; 2–3 vignettes max |
| Identité | Prénom · ville · prix + certitude · dispo déclarée |
| Description | Court paragraphe résultat |
| CTA sticky | **Faire vérifier** |
| Helper | `Nolaya vérifie le match — pas un rendez-vous confirmé.` |

### Copy identité (exemple)

- `Aïcha · Paris`
- `180 € · déclaré`
- `Mi-septembre · disponibilité déclarée`

### VARIANT `catalog` (fil B)

| Zone | Contenu |
| --- | --- |
| Disclaimer 1.4 | `Décrire ton besoin augmente tes chances de tomber juste. Tu peux aussi poursuivre avec cette offre.` — **non bloquant** |
| Secondaire | `Décrire mon besoin` |
| Retour | → Découverte |
| Chrome | Découvrir actif |

### VARIANT `from_match` (fil A)

| Zone | Contenu |
| --- | --- |
| Bandeau | `Selon ta demande` + 2–3 raisons / écarts |
| Pas disclaimer 1.4 | — |
| Retour | → Résultats |
| Chrome | Ma demande actif |

### VARIANT `error`

- Message : `Cette offre n’est plus disponible.`
- Liens : `Accueil` · `Découverte`
- Pas de **Faire vérifier**

### Actions

| Action | Condition | Résultat | Destination |
| --- | --- | --- | --- |
| **Faire vérifier** | `catalog` | Offre seule → coords | **S11** |
| **Faire vérifier** | `from_match` | QUALIFIED + candidate | **S11** |
| **Décrire mon besoin** | `catalog` only | — | **S04** |
| **Retour** | `catalog` / `from_match` | — | **S02** / **S09** |
| Lire disclaimer | `catalog` | Pas d’ack requis | **on reste** |
| **Réserver** / tel coiffeuse | — | — | **hors MVP** |

---

## S04 — Résultat souhaité `/demande/resultat`

**Type :** formulaire wizard **1 / 5**.

### Zones

En-tête (`Résultat souhaité`, `1 / 5`) · helper · champs famille / variante / longueur / taille / couleur / finition · chips visuels compacts (pas carrousel offres) · **Continuer** sticky.

### Copy

- Helper : `Dis-nous le résultat que tu vises. "Je ne sais pas" est une réponse valable.`
- Options : `Tresses / braids` · `Vanilles` · `Je ne sais pas`
- VARIANT `invalid` : `Choisis au moins une direction exploitable.`

### Actions

| Action | Condition | Résultat | Destination |
| --- | --- | --- | --- |
| **Continuer** | Direction exploitable | DRAFT | **S05** |
| **Continuer** | Sans direction | Erreur inline | **on reste** |
| **Retour** | — | Brouillon conservé | **S01** / **S02** |

---

## S05 — Contraintes `/demande/contraintes`

**Type :** wizard **2 / 5**.

### Copy

- Helper : `Ce qui est obligatoire sera exclu du matching. Une seule priorité principale.`
- Exemples : `Refus de tension trop forte` · `Sensibilité du cuir chevelu`
- Priorité (une) : `Qualité` · `Prix` · `Disponibilité` · `Proximité` · `Confort` · `Durée`
- Tags : `Obligatoire` · `Préféré` · `Flexible`

### Actions

| Action | Condition | Destination |
| --- | --- | --- |
| **Continuer** | 0+ contraintes OK | **S06** |
| **Retour** | — | **S04** |

---

## S06 — Où et quand `/demande/ou-et-quand`

**Type :** wizard **3 / 5** · ville tapée (D17).

### Champs

Ville · Lieu souhaité (salon / domicile ville seule / à confirmer) · Date souhaitée · Date limite · Flexibilité.

### Copy

- Lieu : `Chez la coiffeuse` · `À domicile (ville seulement)` · `À confirmer`
- VARIANT `invalid` : `La date limite ne peut pas être avant la date souhaitée.`

### Actions

| Action | Condition | Destination |
| --- | --- | --- |
| **Continuer** | Dates cohérentes + ville | **S07** |
| **Continuer** | Limite < souhaitée | **on reste** |
| **Retour** | — | **S05** |
| **Autour de moi** | — | **hors MVP** |

---

## S07 — Budget `/demande/budget`

**Type :** wizard **4 / 5**.

### Copy

- Labels : `Budget cible` · `Maximum à ne pas dépasser` · `Fournitures`
- Choix item : `Je l’apporte` · `La coiffeuse le fournit` · `À confirmer`
- Helper : `"Fournir" ne veut pas dire gratuit.`
- VARIANT `invalid` : `Le cible ne peut pas dépasser le maximum.`

### Actions

| Action | Condition | Destination |
| --- | --- | --- |
| **Continuer** | cible ≤ max | **S08** |
| **Retour** | — | **S06** |

---

## S08 — Résumé `/demande/resume`

**Type :** recap wizard **5 / 5** — lance matching.

### Zones

Blocs Résultat · Contraintes · Où et quand · Budget · Inconnues — chacun avec **Modifier** · chip statut `BROUILLON` / `PRÊT` (JetBrains Mono) · **Rechercher** · ligne `Aucune coiffeuse n’est contactée à cette étape.`

### Copy

- Exemple recap : `Knotless braids mi-dos · Paris · mi-septembre · max 200 € · mèches à confirmer`
- Disabled : `Complète les champs indispensables pour lancer la recherche.`

### Actions

| Action | Condition | Destination |
| --- | --- | --- |
| **Modifier** (bloc) | — | **S04**–**S07** |
| **Rechercher** | Complet | QUALIFIED → | **S09** |
| **Rechercher** | Incomplet | — | **on reste** |
| **Retour** | — | **S07** |

---

## S09 — Résultats `/recherche`

**Type :** matching — **masonry** 1–3 cartes (D13, D16).

### Zones

En-tête + chip résumé + `Modifier ma demande` · grille masonry · par carte : identité, prix, dispo, raisons/écarts, **Faire vérifier** · helper match.

### Copy

- Chip : `Knotless braids · Paris · max 200 €`
- Carte : `Aïcha · Paris` · `180 € · déclaré` · `Correspond : longueur, ville` · `À confirmer : mèches`
- Count : `2 propositions` (1–3)
- VARIANT `matching` : `Recherche en cours…` + squelettes masonry

### Actions

| Action | Condition | Destination |
| --- | --- | --- |
| Carte | — | **S03** `from_match` |
| **Faire vérifier** | — | **S11** |
| **Modifier ma demande** | — | **S08** |
| **Retour** | — | **S08** |
| Zéro résultat (métier) | — | **S10** |
| Comparer 2–5 | — | **hors MVP** |

---

## S10 — Aucun résultat `/recherche/diagnostic`

**Type :** diagnostic — pas fausse grille.

### Copy

- Body : `Aucune offre active ne respecte toutes tes contraintes obligatoires pour Paris et mi-septembre.`
- Levier (si applicable) : `Assouplir la flexibilité des dates`
- Alternatives : `Modifier mes dates` · `Modifier ma demande`
- Note : `On ne relâche jamais une contrainte obligatoire en silence.`
- VARIANT `no_lever` : seulement `Modifier ma demande`

### Actions

| Action | Condition | Destination |
| --- | --- | --- |
| **Assouplir** | Levier accepté | **S09** |
| **Modifier mes dates** | — | **S06** |
| **Modifier ma demande** | — | **S08** |
| **Retour** | — | **S08** |

---

## S11 — Tes coordonnées `/soumission`

**Type :** formulaire + avertissement obligatoire (D15). Fil A et fil B.

### Zones

Recap compact · prénom · téléphone **ou** e-mail · bloc avertissement · ack · **Envoyer ma demande** · note non-réservation.

### Copy

- Recap B : `Offre choisie : Aïcha · Knotless braids · Paris`
- Recap A : `Ta demande + Aïcha`
- Helper : `Un prénom et un canal suffisent. Pas de compte.`
- Avertissement : `Tes coordonnées sont enregistrées telles que tu les saisis. Nolaya ne les confirme pas. Vérifie-les avant d’envoyer.`
- Ack : `J’ai vérifié, ces informations sont correctes.`
- Primary : `Envoyer ma demande`
- Note : `Ce n’est pas une réservation. Aucune coiffeuse n’est contactée tout de suite.`
- VARIANT `readonly` : `Tu as déjà envoyé cette demande.` · **Voir le suivi**

### Actions

| Action | Condition | Destination |
| --- | --- | --- |
| **Envoyer** | Valide + ack | Dossier créé | **S12** |
| **Envoyer** | Sans ack | — | **on reste** |
| **Retour** | Fil B / A | — | **S03** / **S09** |
| OTP | — | — | **hors MVP** |

---

## S12 — Demande envoyée `/soumission/confirmation`

**Type :** confirmation opérationnelle.

### Copy

- Headline : `On a bien reçu ta demande`
- Body : `Nolaya va vérifier le match. Ce n’est pas une réservation, ni un rendez-vous confirmé.`
- Référence : `Référence NOL-1842` (JetBrains Mono)
- Note : `L’identifiant affiché ne suffit pas à ouvrir ton suivi.`
- Primary : `Suivre ma demande`

### Actions

| Action | Condition | Destination |
| --- | --- | --- |
| **Suivre ma demande** | — | **S13** |
| Chrome **Suivi** | — | **S13** |

---

## S13 — Suivi `/suivi/:jeton`

**Type :** hub post-envoi — **six variantes** même URL (D20).

### Squelette commun

En-tête `Suivi` · référence · badge statut (JetBrains Mono uppercase) · explication · recap readonly · chrome Suivi actif · Ma demande readonly.

### Copy par variante

| Variante | Badge | Body (intent) |
| --- | --- | --- |
| `received` | `DEMANDE REÇUE` | Demande arrivée ; match pas confirmé |
| `searching` | `RECHERCHE EN COURS` | Traitement ; pas de RDV confirmé |
| `need_precision` | `PRÉCISION NÉCESSAIRE` | Point à clarifier |
| `found` | `COIFFEUSE TROUVÉE` | Oui + lieu, budget, période reconfirmés |
| `none_confirmed` | `AUCUNE COIFFEUSE CONFIRMÉE` | Aucune confirmation pour cette demande |
| `abandoned` | `DEMANDE ABANDONNÉE` | Demande inactive |

Shared : recap titre `Ta demande` · jamais `Réservé` / `Créneau bloqué` / `Prix final` comme acquis.

### Actions

| Action | Condition | Destination |
| --- | --- | --- |
| Chrome **Découvrir** | — | **S01** / **S02** |
| Chrome **Ma demande** | — | Recap readonly · **on reste** |
| **Appeler** / **Payer** / **RDV** | — | **hors MVP** |
| Jeton invalide | — | **S01** `error` |

---

## Anti-patterns globaux

- Violet / indigo, glow, dark mode, card spam, ombres lourdes
- Photo héroïque géante (D13)
- Carrousels hors S02 ; masonry hors S09
- Géoloc, OTP, login, paiement, comparaison 2–5
- 4ᵉ onglet Rendez-vous (D18)
- Candidate = coiffeuse confirmée ; Faire vérifier = vérifier le téléphone (D12)
- Écrans Inspiration / Aperçu séparés (D14)
- 7ᵉ écran Suivi pour jeton mort

## Ce que STEP 6 fixe (prompts Stitch)

- English prompt blocks, un écran par bloc
- Reprise verbatim des destinations fermées ci-dessus
- Variantes décrites **dans** le prompt, pas comme frames séparées

Voir [prompts-stitch.md](./prompts-stitch.md).
