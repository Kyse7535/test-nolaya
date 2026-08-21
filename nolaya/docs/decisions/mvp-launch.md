# Décision produit — MVP Nolaya (lancement)

## Objectif

Valider qu’une visiteuse peut partir d’**offres réelles** ou d’une **demande qualifiée**, produire **1 à 3 candidates** issues du catalogue persisté, puis aboutir — via conciergerie humaine — à une **coiffeuse trouvée** au sens lancement (D04, D20) : réponse positive **et** reconfirmation lieu / budget / période.

## Inclus au lancement

- **Découverte** : catalogue d’**offres réelles** (coiffeuse, ville, prix, dispo déclarée) — pas d’inspirations éditoriales sans disponibilité (D10) ;
- **deux fils** : A guidé (wizard 5 écrans) et B libre (parcours catalogue → fiche) (D11) ;
- fiche unique **`/offre/:id`** (D14) ;
- matching sur offres professionnelles persistées, **1–3** résultats en masonry (D13, D16) ;
- soumission minimale : prénom + canal, coordonnées **déclarées**, pas d’OTP (D15) ;
- pont **Faire vérifier** → dossier → **Suivi** ( trois zones chrome, pas Rendez-vous ) (D12, D18) ;
- conciergerie interne et administration minimale des offres (D19–D20).

## Masqué mais conservé dans le code / la doc produit complet

- géolocalisation « autour de moi » (D17 — présent US étape 1, absent lancement) ;
- vérification OTP du canal cliente ;
- comparaison multi-offres 2–5, sélection 1–5, étape 5 configuration multi-destinataires ;
- accord versionné, paiement, onglet **Rendez-vous**, préparation, avis ;
- espace professionnel self-service.

## Définition d’un match confirmé (lancement)

Une candidate algorithmique ne devient **Coiffeuse trouvée** (Suivi) qu’après :

1. une réponse professionnelle humaine positive consignée ;
2. la reconfirmation du **lieu**, du **budget** et de la **période**.

Ce jalon n’est **pas** le dossier **READY** de l’étape 8 (accord opérationnel + RDV).

## Mesures

- demandes qualifiées (fil A) ;
- demandes fil B (offre seule) ;
- demandes avec au moins une candidate algorithmique ;
- demandes avec statut Suivi **Coiffeuse trouvée** ;
- délai jusqu’au premier résultat et jusqu’à la confirmation conciergerie ;
- motifs de non-match, refus et abandon.

## Artefacts de cadrage

| Domaine | Protocole |
| --- | --- |
| Cliente | [protocole-conception-mvp.md](../protocole-conception-mvp.md) — STEP 0–6 |
| Admin | D19–D21 + docs `-admin` |
