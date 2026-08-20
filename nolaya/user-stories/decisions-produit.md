# Décisions produit retenues

## D01 — Absorber l’ancienne étape 4 dans l’étape 3

**Décision : acceptée.**

La comparaison n’est plus une étape autonome. L’étape 3 porte désormais :

- la recherche des correspondances ;
- la lecture des raisons et incertitudes ;
- la sélection de 1 à 5 offres ;
- la comparaison de 2 ou 3 offres lorsque plusieurs options existent ;
- le choix explicite d’une offre principale ;
- la conservation de 0 à 2 alternatives ;
- le cas d’une seule offre, sans blocage ni pression artificielle.

Aucune sollicitation professionnelle n’est créée à cette étape.

## D02 — Modèle canonique de sélection

**Décision : acceptée.**

| Objet | Cardinalité |
|---|---|
| Sélection courte | 1 à 5 offres |
| Comparaison simultanée | 2 à 3 offres |
| Offre principale | exactement 1 avant l’étape 5 |
| Alternatives conservées | 0 à 2 |

Une alternative est une autre offre ou coiffeuse. Un supplément ou une option de la prestation n’est jamais présenté comme une alternative professionnelle.

## D03 — Configuration commune et conditions propres à chaque offre

**Décision : acceptée.**

La cliente ne répète pas l’intégralité de l’étape 5 pour chaque coiffeuse :

1. elle valide une configuration commune de son besoin ;
2. elle consulte un instantané de conditions propre à chaque offre qu’elle pourra autoriser ;
3. elle voit les différences de prix, lieu, fourniture, préparation et incertitudes par destinataire ;
4. elle confirme les offres qu’elle accepte de soumettre.

L’offre principale reste la première option. Les alternatives peuvent être sollicitées uniquement si leur instantané a été présenté et explicitement autorisé.

## D04 — Définition de « coiffeuse trouvée »

**Décision : acceptée.**

Le produit peut utiliser les formulations suivantes :

| État | Formulation autorisée |
|---|---|
| Résultat de matching | Option compatible |
| Réponse professionnelle | Proposition disponible |
| Proposition retenue | Coiffeuse retenue, accord à finaliser |
| READY | Coiffeuse trouvée, rendez-vous confirmé et prêt |

Avant **READY**, les termes « réservation confirmée » ou « rendez-vous confirmé » sont interdits.

## D05 — Dossier unique et transaction unique

**Décision : acceptée.**

- un besoin produit un dossier unique ;
- un dossier peut contenir plusieurs sollicitations autorisées ;
- une seule proposition peut devenir la transaction active ;
- retenir une proposition arrête ou clôt les sollicitations devenues inutiles ;
- les corrections importantes créent une nouvelle version du même dossier.

## D06 — Paiement intermédiaire derrière une capacité activable

**Décision : acceptée.**

Le MVP peut atteindre **READY** sans paiement intégré.

Lorsque le paiement intermédiaire est activé et requis :

- il intervient après la formation de l’accord ;
- ses règles sont acceptées avant l’initiation ;
- les fonds sont sécurisés par un prestataire et non versés immédiatement à la coiffeuse ;
- **READY** attend la confirmation **FUNDS_SECURED** ;
- un échec conserve le même accord et permet une nouvelle tentative ;
- tout changement de montant crée une nouvelle version avant paiement.

Les scénarios sans paiement et avec paiement sont deux branches E2E distinctes.

## D07 — Délais pilotés par une politique explicite

**Décision : acceptée.**

Les fenêtres de priorité, délais d’attente, relances, déclarations d’issue et contestations sont des valeurs configurées par une politique métier.

Chaque valeur utilisée dans un parcours est :

- annoncée avant validation lorsqu’elle engage le choix de la cliente ;
- enregistrée dans le dossier ;
- disponible comme donnée de scénario E2E ;
- présentée comme estimation ou règle, jamais comme réponse professionnelle garantie.

Les valeurs calendaires de production seront définies séparément sans modifier les stories.

## D08 — Consentement et minimisation des données

**Décision : acceptée.**

- aucun compte n’est obligatoire dans le parcours MVP ;
- la géolocalisation, l’élargissement, les destinataires, le partage et les rappels demandent une action explicite ;
- les coordonnées directes et l’adresse exacte restent masquées avant le double consentement de mise en relation ;
- chaque accès sans compte est limité au dossier concerné, révocable et renouvelable après vérification du canal ;
- un identifiant de dossier n’est jamais suffisant pour ouvrir le dossier.

## D09 — Progression visible en quatre zones

**Décision : acceptée.**

Les onze numéros historiques ne sont pas exposés comme un long stepper. Les quatre zones visibles sont :

- Découvrir ;
- Ma demande ;
- Suivi ;
- Rendez-vous.

Les numéros d’étapes peuvent rester dans la documentation, les événements métier et les outils internes.
