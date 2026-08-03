Oui. Voici un cas concret complet de Domain Storytelling pour une démo autonome destinée à une coiffeuse.

Je reprends le découpage métier actuel des étapes 0 à 8. Les anciennes étapes présentes dans les fichiers fournis sont donc réorganisées selon ce nouveau processus.

> **Précurseur :** lorsque Sarah doit **créer** son cadre professionnel, ses prestations et son planning (et non seulement les valider), utiliser d’abord `2-precurseur-cadre-prestations-planning.md` (Histoires P1, P2 et P3), puis reprendre ici à l’Histoire B. L’Histoire A ci-dessous reste le **chemin court** : cadre, offre et planning déjà définis, validation accélérée — sans objet « capacité » ni état `CAPACITY_OPEN`.

# Cas de démonstration

## Coiffeuse réelle

Sarah, coiffeuse spécialisée en tresses à Saint-Denis.

Elle propose :

* Knotless braids medium, longueur mi-dos ;
* prestation en salon ;
* prix de base : 150 € ;
* mèches fournies : +20 € ;
* durée estimée : 5 h 30 ;
* un rendez-vous maximum par jour ;
* retard toléré : 15 minutes ;
* planning actif : mardi–samedi, 9 h–18 h (créneaux dérivés, dont samedi 15 août dès 9 h).

## Cliente fictive

Inès, 27 ans, cheveux naturels, cuir chevelu sensible.

Sa demande :

* Knotless braids medium, longueur mi-dos ;
* samedi 15 août à 9 h ;
* budget maximum : 180 € ;
* prestation à Saint-Denis ;
* cheveux lavés et démêlés avant le rendez-vous ;
* mèches fournies par la coiffeuse.

Inès n’est pas une vraie utilisatrice. Toutes ses actions seront exécutées par le simulateur, mais elles resteront présentées comme des décisions appartenant à Inès.

## Contrat de la démo

* Durée : 12 à 15 minutes.
* Sarah prend réellement toutes les décisions professionnelles.
* Inès répond automatiquement lorsque son intervention est nécessaire.
* Les attentes de plusieurs jours sont comprimées.
* Le scénario est reproductible et réinitialisable.
* Une seule difficulté métier est introduite : une modification pendant la prestation.

---

# Histoire A — Sarah valide offre et planning

### Chemin court

Cette histoire suppose que Sarah a déjà un cadre de travail, une prestation et un planning définis. Elle les **valide et active**, sans les créer de zéro.

Pour la création réelle du cadre, des prestations et du planning, voir `2-precurseur-cadre-prestations-planning.md`.

### Étapes couvertes

Avant l’étape 0 et étape 0 (version accélérée).

| N° | Activité métier                                                                        | Exécution         | Objet produit                      |
| -: | -------------------------------------------------------------------------------------- | ----------------- | ---------------------------------- |
|  1 | Sarah consulte et valide ses règles générales de travail                               | Sarah, réellement | `PROFESSIONAL_FRAMEWORK_ACTIVE`    |
|  2 | Sarah vérifie la prestation « Knotless braids medium » préremplie                      | Sarah, réellement | Prestation                         |
|  3 | Sarah confirme le barème (mi-dos 150 €), la durée, les fournitures et les tâches        | Sarah, réellement | `OFFER_ACTIVE` (validée)           |
|  4 | Sarah sélectionne trois réalisations pour la galerie de cette prestation               | Sarah, réellement | Galerie de présentation            |
|  5 | Sarah confirme son planning (mar–sam, 9 h–18 h) et constate le créneau 15 août 9 h     | Sarah, réellement | Disponibilité dérivée du planning  |
|  6 | Sarah active son planning                                                              | Sarah, réellement | `SCHEDULE_ACTIVE`                  |

La démo ne demande pas à Sarah de construire tout son catalogue. Elle lui fait modifier et valider les informations qui permettent d’observer ses décisions métier — utile lorsque le temps est limité ou lorsque le précurseur a déjà été joué.

Le créneau du samedi 15 août à 9 h n’est pas une « capacité » à ouvrir : c’est une **conséquence** du planning actif, utilisée comme rail démo pour Inès.

---

# Histoire B — Sarah reçoit et traite une demande

### Étapes couvertes

Étapes 1, 2 et 3.

| N° | Activité métier                                                                                   | Exécution         | Objet ou état           |
| -: | ------------------------------------------------------------------------------------------------- | ----------------- | ----------------------- |
|  7 | Inès décrit le résultat souhaité, ses cheveux, son budget, son lieu et sa date                    | Cliente simulée   | `DEMAND_QUALIFIED`      |
|  8 | La plateforme vérifie la compatibilité avec le cadre, l’offre et le planning actifs de Sarah      | Plateforme        | Compatibilité expliquée |
|  9 | La plateforme adresse une invitation à Sarah                                                      | Plateforme        | Invitation              |
| 10 | Sarah consulte la synthèse de la demande                                                          | Sarah, réellement | Demande examinée        |
| 11 | Sarah constate qu’il manque une photo récente des cheveux                                         | Sarah, réellement | Point à clarifier       |
| 12 | Sarah demande une photo et la date du dernier traitement chimique                                 | Sarah, réellement | Demande de précision    |
| 13 | Inès fournit une photo et indique qu’elle n’a pas fait de défrisage depuis huit mois              | Cliente simulée   | Demande enrichie        |
| 14 | Sarah valide la faisabilité technique                                                             | Sarah, réellement | Validation technique    |
| 15 | Sarah propose une réalisation avec tension légère adaptée au cuir chevelu sensible                | Sarah, réellement | Variante                |
| 16 | Sarah confirme le prix de 170 €, la durée de 5 h 30, le créneau, le lieu et les tâches de chacune | Sarah, réellement | `FIRM_PROPOSAL`         |
| 17 | La plateforme réserve temporairement le créneau                                                   | Plateforme        | `SOFT_HOLD`             |

La valeur démontrée ici est concrète : Sarah reçoit un dossier structuré, pose une question ciblée et produit une proposition sans reprendre toute la demande dans des DM.

---

# Histoire C — L’engagement est formé et le rendez-vous préparé

### Étapes couvertes

Étapes 4 et 5.

| N° | Activité métier                                                                                | Exécution         | Objet ou état        |
| -: | ---------------------------------------------------------------------------------------------- | ----------------- | -------------------- |
| 18 | Inès accepte exactement la proposition de Sarah                                                | Cliente simulée   | Proposition acceptée |
| 19 | Inès accepte les règles de retard, d’annulation et de préparation                              | Cliente simulée   | Consentement         |
| 20 | Inès verse 50 €                                                                                | Cliente simulée   | Paiement initial     |
| 21 | La plateforme conserve la version acceptée, la preuve du consentement et la preuve du paiement | Plateforme        | Engagement           |
| 22 | La plateforme confirme définitivement le rendez-vous                                           | Plateforme        | `COMMITTED`          |
| 23 | La plateforme crée les checklists de préparation                                               | Plateforme        | `READINESS_PENDING`  |
| 24 | Sarah confirme qu’elle dispose des mèches et du matériel nécessaire                            | Sarah, réellement | Checklist coiffeuse  |
| 25 | Inès confirme que ses cheveux sont lavés, démêlés et prêts                                     | Cliente simulée   | Checklist cliente    |
| 26 | La plateforme vérifie que toutes les conditions nécessaires sont satisfaites                   | Plateforme        | `READY`              |

La notification de confirmation n’est donc pas suffisante. La démo montre à Sarah que le système sait si le rendez-vous est réellement prêt.

---

# Histoire D — Sarah réalise et sécurise la prestation

### Étape couverte

Étape 6.

| N° | Activité métier                                                     | Exécution         | Objet ou état            |
| -: | ------------------------------------------------------------------- | ----------------- | ------------------------ |
| 27 | Inès signale son arrivée                                            | Cliente simulée   | Présence cliente         |
| 28 | Sarah confirme le début de la prestation                            | Sarah, réellement | `IN_PROGRESS`            |
| 29 | Inès demande l’ajout de perles au résultat prévu                    | Cliente simulée   | Demande de modification  |
| 30 | Sarah évalue les conséquences de cette modification                 | Sarah, réellement | Décision professionnelle |
| 31 | Sarah propose un supplément de 10 € et 20 minutes supplémentaires   | Sarah, réellement | Modification proposée    |
| 32 | Inès accepte explicitement la modification                          | Cliente simulée   | Consentement             |
| 33 | La plateforme conserve l’ancienne version et enregistre la nouvelle | Plateforme        | Engagement modifié       |
| 34 | La plateforme met à jour le prix à 180 € et la durée à 5 h 50       | Plateforme        | Prix et durée actualisés |
| 35 | Sarah confirme la fin de la prestation                              | Sarah, réellement | `COMPLETED`              |

Cette séquence démontre une protection essentielle : si Inès conteste ultérieurement les 10 €, Sarah dispose d’une preuve de la demande et du consentement.

---

# Histoire E — Sarah est réglée et la relation est prolongée

### Étapes couvertes

Étapes 7 et 8.

| N° | Activité métier                                                                               | Exécution         | Objet ou état            |
| -: | --------------------------------------------------------------------------------------------- | ----------------- | ------------------------ |
| 36 | La plateforme impute les 50 € déjà versés                                                     | Plateforme        | Versement initial imputé |
| 37 | La plateforme calcule le solde de 130 €                                                       | Plateforme        | Solde                    |
| 38 | Inès règle les 130 € restants                                                                 | Cliente simulée   | Paiement final           |
| 39 | La plateforme produit la preuve de paiement et indique le montant dû à Sarah                  | Plateforme        | `SETTLED`                |
| 40 | Inès confirme que la prestation a été réalisée                                                | Cliente simulée   | Résultat confirmé        |
| 41 | Inès évalue la technique, la communication, la ponctualité et la conformité du prix           | Cliente simulée   | Avis vérifié             |
| 42 | Sarah consulte l’avis et y répond                                                             | Sarah, réellement | Réponse coiffeuse        |
| 43 | Inès ajoute Sarah à ses favorites et accepte de mémoriser ses préférences                     | Cliente simulée   | Préférences consenties   |
| 44 | La plateforme ajoute le rendez-vous à l’historique et rend la prestation réservable à nouveau | Plateforme        | Relation réactivable     |

---

# Chorégraphie du simulateur

Les actions clientes ne se déclenchent pas de manière aléatoire. Elles répondent aux actions de Sarah.

| Action de Sarah                   | Réaction automatique d’Inès                  |
| --------------------------------- | -------------------------------------------- |
| Sarah active son planning (`SCHEDULE_ACTIVE`) | La demande qualifiée est injectée   |
| Sarah demande une précision       | Inès fournit la photo et la réponse préparée |
| Sarah envoie sa proposition ferme | Inès l’accepte et verse 50 €                 |
| Sarah termine sa checklist        | Inès complète sa propre checklist            |
| Sarah démarre la prestation       | Inès demande l’ajout des perles              |
| Sarah propose la modification     | Inès l’accepte                               |
| Sarah termine la prestation       | Inès règle le solde puis publie son avis     |

Entre deux scènes, un contrôle « Continuer la démonstration » peut accélérer la temporalité. Sarah ne doit jamais attendre réellement le rendez-vous ou le paiement.

# Ce que la démo permet de tester

Après la démonstration, on peut poser à Sarah des questions très concrètes :

1. La demande contenait-elle suffisamment d’informations pour prendre une décision ?
2. Qu’aurait-elle encore demandé par WhatsApp ou Instagram ?
3. A-t-elle compris pourquoi cette demande lui avait été envoyée ?
4. Était-elle suffisamment libre de fixer ses propres conditions ?
5. Le versement initial et le solde étaient-ils compréhensibles ?
6. La checklist aurait-elle évité un problème réel qu’elle rencontre aujourd’hui ?
7. La preuve de la modification des perles lui paraît-elle suffisamment protectrice ?
8. À quel moment la démonstration lui a-t-elle semblé artificielle ?
9. Utiliserait-elle ce processus pour une vraie cliente ?

Voilà comment le plan devient un cas testable : une transaction métier précise, des décisions réelles prises par la coiffeuse et une cliente simulée uniquement lorsqu’une intervention extérieure est nécessaire. Ce Domain Storytelling peut ensuite être transformé en storyboard d’écrans.
