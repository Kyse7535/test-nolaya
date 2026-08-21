# Protocole de conception MVP — parcours cliente

## Objet

Ce protocole ordonne la production des artefacts de cadrage **cliente** du MVP Nolaya. Chaque livrable a un rôle fixe ; aucun ne remplace un autre.

Au **lancement**, le périmètre cliente est volontairement réduit : **13 écrans**, **deux fils** (A guidé / B libre), **trois zones** de chrome (D18), pont **Faire vérifier → dossier → Suivi** (D12, D19–D20). Le produit complet (étapes 5–11, comparaison 2–5, OTP, Rendez-vous) reste documenté ailleurs mais **hors** ce protocole.

## Chaîne des artefacts

| STEP | Livrable | Rôle | Ne fait pas |
| --- | --- | --- | --- |
| **0** | [Décisions D10–D18](../user-stories/decisions-produit.md) | Verrouille les choix produit lancement | Décrire des écrans |
| **1** | User stories existantes (étapes 1–3, 6) | Contrat métier de haut niveau | Inventaire d’URL |
| **2** | [storyboard.md](./storyboard.md) | Histoire observable (Inès, Léa) | Table de transitions |
| **3** | [user-flow.md](./user-flow.md) | Inventaire S01–S13, URLs, principes | Copy détaillée par zone |
| **4** | [transitions.md](./transitions.md) | Ensemble fermé des destinations | Layout visuel |
| **5** | [screen-specs.md](./screen-specs.md) | Zones, copy, actions par écran | Prompt Stitch |
| **6** | [prompts-stitch.md](./prompts-stitch.md) | Apparence pour Google Stitch | Navigation nouvelle |

**Ordre obligatoire :** STEP 0 → 2 → 3 → 4 → 5 → 6. Ne pas générer de prompts Stitch avant les screen-specs.

## Règles transverses

### Stitch et maquettes

- Stitch dessine **l’apparence** à partir des screen-specs.
- Stitch **n’invente** ni écran, ni onglet, ni CTA, ni URL absente du contrat.
- Les états (`loading`, `empty`, `error`, `catalog` / `from_match`, six statuts Suivi) sont des **variantes de la même URL**, jamais un 14ᵉ écran.

### Vérité d’engagement (E2E-INV-03)

Avant le dossier **READY** (produit complet, hors lancement) :

- une offre catalogue **≠** disponibilité confirmée ;
- une candidate de matching **≠** coiffeuse confirmée ;
- **Faire vérifier** **≠** réservation, créneau bloqué ou prix final ;
- **Coiffeuse trouvée** (Suivi lancement) = réponse humaine **et** lieu + budget + période reconfirmés (D04, D20).

### Layout (D13)

| Zone | Layout autorisé |
| --- | --- |
| **Découverte** S02 | Carrousels horizontaux, cartes **1:1** uniquement |
| **Résultats** S09 | **Masonry** / hauteurs variables — pas de carrousels |
| **Accueil** S01 | Promesse + deux CTA — pas de listing, pas de photo héroïque géante |
| **Autres écrans** | Pas de carrousels d’annonces ; pas de masonry hors S09 |

### Chrome cliente (D18)

Trois zones, **pas des écrans** : **Découvrir** · **Ma demande** · **Suivi**. Jamais de 4ᵉ onglet **Rendez-vous**.

### Deux fils (D11)

| Fil | Persona | Entrée | Arrivée soumission |
| --- | --- | --- | --- |
| **A — guidé** | **Inès** | Trouver ma coiffeuse → wizard 5 étapes → matching 1–3 | Demande QUALIFIED + candidate |
| **B — libre** | **Léa** | Explorer → Découverte → fiche offre | Offre seule, sans QUALIFIED |

Les deux fils convergent sur **Tes coordonnées** S11, **Demande envoyée** S12, **Suivi** S13.

### Pont admin (D19–D20)

Les écrans cliente S11–S13 créent le dossier ; l’outil interne `/interne/…` prend le relais. Voir [user-flow-admin.md](./user-flow-admin.md). Ne pas dupliquer I01–I05 ici.

## Hors scope de ce protocole

- admin / conciergerie (artefacts `-admin` et D19–D21) ;
- géolocalisation et « autour de moi » (D17) ;
- OTP / vérification du canal (D15, D21) ;
- comparaison 2–5, sélection multi-offres, étape 5 produit complet ;
- paiement, accord versionné, onglet Rendez-vous ;
- espace coiffeuse self-service ;
- copies d’anciens dossiers Stitch / `ui-design/` ;
- écran **Inspiration** séparé, écran **Aperçu** séparé (fusionnés en S03 `/offre/:id`, D14).

## Statut du cadrage cliente

| STEP | Livrable | Statut |
| --- | --- | --- |
| 0 | D10–D18 | **Fait** — [decisions-produit.md](../user-stories/decisions-produit.md) |
| 1 | User stories étapes 1–3, 6 (adaptées MVP) | **Existant** — [user-stories/](../user-stories/) |
| 2 | Storyboard cliente | **Fait** — [storyboard.md](./storyboard.md) |
| 3 | User-flow cliente | **Fait** — [user-flow.md](./user-flow.md) |
| 4 | Transitions cliente | **Fait** — [transitions.md](./transitions.md) |
| 5 | Screen-specs cliente | **Fait** — [screen-specs.md](./screen-specs.md) |
| 6 | Prompts Stitch cliente | **Fait** — [prompts-stitch.md](./prompts-stitch.md) |

Cadrage cliente lancement **clos** (STEP 0–6). Suite : audit / implémentation — pas un 7ᵉ livrable de cadrage.

## Références

- [Décision MVP lancement](./decisions/mvp-launch.md)
- [Prompts Stitch admin](./prompts-stitch-admin.md) — format miroir (batch, English prompt, French UI)
- [Spécifications E2E transverses](../user-stories/specifications-e2e-transverses.md)
