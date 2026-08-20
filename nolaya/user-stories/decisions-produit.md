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

## Décisions admin lancement

*20 août 2026. Les décisions cliente D10–D18 ne sont pas rouvertes.*

## D19 — Conciergerie interne, pas un espace coiffeuse

**Décision : acceptée.**

Au lancement, la confirmation humaine est opérée par **Nolaya interne**, sous un rôle **admin / conciergerie**. Ce n’est pas un espace professionnel self-service : la coiffeuse n’a ni compte, ni file, ni écran de réponse.

L’administration minimale des offres (`/admin`) reste distincte de cet outil de dossiers.

Pont cliente : **Faire vérifier** (D12 : vérifier le *match*, pas le téléphone) crée un dossier ; personne n’est contacté à cet instant. Le dossier entre dans une **file interne**. L’effet visible côté cliente est uniquement le **Suivi** (D18 : pas d’onglet Rendez-vous).

## D20 — Gestes MVP de l’outil interne

**Décision : acceptée.**

L’admin peut :

1. ouvrir un dossier issu de Faire vérifier (fil A : demande qualifiée + candidate ; fil B : offre seule) ;
2. lire la synthèse (besoin ou offre, raisons de matching, éléments à confirmer) ;
3. contacter la ou les coiffeuse(s) autorisée(s) **hors application** (téléphone, WhatsApp ou messagerie habituelle) ;
4. consigner chaque contact (canal, horodatage, interlocutrice) ;
5. enregistrer l’issue : **accepte**, **refuse**, **précision**, **adaptation**, ou **aucune réponse**.

Aucune candidate n’est présentée comme confirmée avant une réponse réelle consignée. Un match confirmé exige une réponse humaine positive **et** la reconfirmation du lieu, du budget et de la période.

| Issue consignée | Suivi cliente |
|---|---|
| Dossier créé, pas encore de contact réel | Demande reçue |
| Traitement ou contact en cours | Recherche en cours |
| Question ciblée nécessaire | Précision nécessaire |
| Acceptation + reconfirmation lieu / budget / période | Coiffeuse trouvée |
| Politique de contact épuisée sans confirmation | Aucune coiffeuse confirmée |
| Dossier retiré ou inactif | Demande abandonnée |

La cliente ne voit pas le journal, les canaux ni les motifs internes.

## D21 — Hors MVP admin et suite du protocole

**Décision : acceptée.**

Hors MVP :

- espace coiffeuse self-service, compte professionnel, lien de réponse autonome ;
- interface complète de conciergerie (plan de vague, stratégies de présélection, relances automatiques, messagerie libre) ;
- OTP / vérification du canal cliente ;
- accord versionné, double validation, paiement, fiche et onglet Rendez-vous, préparation, avis ;
- contacter une coiffeuse non autorisée ; accepter une modification **au nom** de la cliente ; simuler un contact ou une réponse.

Prochaine étape du protocole : **STEP 1 — user stories admin** (gestes D20, pont Faire vérifier → file → Suivi). Pas de storyboard, flux, specs d’écrans ni prompts Stitch à cette étape.
