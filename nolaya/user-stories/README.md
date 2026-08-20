# User stories du parcours cliente Nolaya

## Statut

Ce dossier constitue le contrat produit de haut niveau du parcours cliente. Il décrit les résultats attendus et les interactions observables, indépendamment du découpage actuel des écrans ou de l’état d’avancement du prototype.

Les critères d’acceptation sont formulés pour pouvoir devenir ultérieurement des tests E2E.

## Promesse produit

Nolaya aide une cliente à transformer un besoin parfois flou en un rendez-vous réellement faisable, compris et accepté par elle et par une coiffeuse.

Une coiffeuse n’est pas considérée comme trouvée au premier résultat :

| Jalon | Signification |
|---|---|
| Résultats compatibles | Des prestations potentiellement adaptées sont identifiées. |
| Offre principale | La cliente a exprimé une préférence, sans contact professionnel. |
| Proposition retenue | Une coiffeuse a réellement répondu, mais l’accord reste à former. |
| Dossier READY | Cliente et coiffeuse ont accepté la même version et disposent d’un rendez-vous opérationnel. |

Le jalon **produit complet** « coiffeuse trouvée » est le dossier **READY** de l’étape 8 (D04).

Au **lancement** (D20), le Suivi peut afficher **Coiffeuse trouvée** dès qu’une réponse humaine positive est consignée **et** que le lieu, le budget et la période sont reconfirmés. Ce n’est pas READY, ni un rendez-vous opérationnel.

## Chaîne de valeur

| Étape métier | Question de la cliente | Valeur obtenue |
|---|---|---|
| 1. Accueil et découverte | Est-ce que Nolaya peut m’aider ? | Inspiration et première piste sans engagement |
| 2. Qualification | Qu’est-ce que je veux réellement ? | Besoin structuré, compréhensible et modifiable |
| 3. Recherche, comparaison et présélection | Quelles options me correspondent et laquelle privilégier ? | Une offre principale et jusqu’à deux alternatives |
| 5. Vérification des conditions | Qu’est-ce que je demande exactement à chaque coiffeuse ? | Configuration commune et conditions propres aux offres |
| 6. Soumission | Qui puis-je autoriser à recevoir ma demande ? | Dossier unique, sécurisé et traçable |
| 7. Réponse et conciergerie | Quelle coiffeuse peut réellement poursuivre ? | Proposition professionnelle exploitable — **hors lancement** (voir US-ADM) |
| 8. Accord et préparation | Sommes-nous d’accord sur la même chose ? | Coiffeuse trouvée (READY) et rendez-vous opérationnel |
| 9. Réalisation et issue | Que s’est-il réellement passé ? | Issue qualifiée et traçable |
| 10. Évaluation et avis | Comment s’est passée l’expérience ? | Avis fiable et contextualisé |
| 11. Retour et nouvelle demande | Que veux-je faire ensuite ? | Reprise, alternative, recommandation ou rappel |

L’ancienne étape 4 n’est plus une étape autonome. Ses capacités de comparaison et de choix ont été absorbées dans l’étape 3.

## Parcours visible par la cliente

Les numéros d’étapes sont une cartographie métier interne. L’interface cliente **produit complet** utilise quatre zones compréhensibles :

1. **Découvrir**
2. **Ma demande**
3. **Suivi**
4. **Rendez-vous**

Au **lancement** (D18, D19) : trois zones seulement — **Découvrir**, **Ma demande**, **Suivi**. Pas d’onglet Rendez-vous.

Les étapes 9 à 11 sont déclenchées après le rendez-vous et ne prolongent pas artificiellement le stepper initial.

## Dossiers

- [Étape 1 — Accueil et découverte](01-accueil-et-decouverte/user-stories.md)
- [Étape 2 — Qualification du besoin](02-qualification-du-besoin/user-stories.md)
- [Étape 3 — Recherche, comparaison et présélection](03-recherche-comparaison-et-preselection/user-stories.md)
- [Étape 5 — Vérification des conditions](05-verification-des-conditions/user-stories.md)
- [Étape 6 — Soumission de la demande](06-soumission-de-la-demande/user-stories.md) — produit complet ; le pont lancement est **Faire vérifier**, pas ce workflow (OTP, stratégie, multi-destinataires)
- [Étape 7 — Réponse professionnelle et conciergerie](07-reponse-professionnelle-et-conciergerie/user-stories.md) — **hors lancement** (produit complet US-07.1 à US-07.5)
- [Admin / conciergerie de lancement](admin-conciergerie-lancement/user-stories.md) — STEP 0–1 (D19–D21, US-ADM-01 à 09)
- [Étape 8 — Accord final et préparation](08-accord-final-et-preparation/user-stories.md)
- [Étape 9 — Réalisation et issue](09-realisation-et-issue/user-stories.md)
- [Étape 10 — Évaluation et avis](10-evaluation-et-avis/user-stories.md)
- [Étape 11 — Retour, recommandation et nouvelle demande](11-retour-recommandation-et-nouvelle-demande/user-stories.md)

## Documents transverses

- [Décisions produit retenues](decisions-produit.md)
- [Spécifications E2E transverses](specifications-e2e-transverses.md)

Prompts Stitch cliente : `docs/prompts-stitch.md` (13 écrans).

### Cadrage admin lancement

| STEP | Livrable | Statut |
|---|---|---|
| 0 | Décisions D19–D21 | Fait — [decisions-produit.md](decisions-produit.md) |
| **1** | User stories admin / conciergerie | **Fait** — [admin-conciergerie-lancement/user-stories.md](admin-conciergerie-lancement/user-stories.md) |
| 2–6 | Storyboard, flow, transitions, screen specs, Stitch | PR suivante |

L’étape 7 produit complet (US-07) reste dans le dépôt comme contrat hors lancement. Ne pas s’en servir comme vérité de l’outil interne de lancement.

## Convention de rédaction

Chaque story contient :

- un résultat utilisateur formulé « En tant que / je veux / afin de » ;
- des préconditions métier ;
- des interactions observables ;
- des critères d’acceptation testables ;
- les branches et erreurs importantes ;
- l’état ou la donnée remis à l’étape suivante.

Une story n’est pas équivalente à un écran. Plusieurs écrans peuvent participer au même résultat utilisateur.
