Voici la transformation du cas précurseur Sarah (cadre + prestations + planning) en storyboard d’écrans mobile-first. Le parcours contient **22 écrans** : 20 écrans du produit et 2 écrans réservés au dispositif de démonstration.

Source métier : `2-precurseur-cadre-prestations-planning.md`.

La coiffeuse utilise réellement l’application. Aucune cliente n’intervient. Inès n’apparaît qu’en option à la sortie, si la démo enchaîne vers `3-storyboard.md`.

> **Retrait de la capacité.** Ce storyboard ne contient plus d’objet « capacité » ni d’état `CAPACITY_OPEN`. La disponibilité est un **planning** (P3). L’état d’arrivée est `SCHEDULE_ACTIVE`.

## Cadre visuel permanent de la démo

Un bandeau discret, absent de l’application finale, reste affiché en haut :

> **Mode démo — Créez votre offre · Étape 1 sur 8**

Il permet uniquement de :

* comprendre qu’il s’agit d’une démonstration ;
* voir l’avancement (P1 cadre / P2 prestations / P3 planning) ;
* réinitialiser le scénario ;
* quitter la démonstration.

| Acte | Scène bandeau | Contenu |
| ---- | ------------- | ------- |
| P1 | 1/3 | Cadre professionnel |
| P2 | 2/3 | Prestations |
| P3 | 3/3 | Planning |

La navigation produit reste réaliste :

> Accueil · Demandes · Rendez-vous · Prestations · Profil · bientôt

Au début, Demandes et Rendez-vous sont vides. Prestations n’a encore aucune offre active. Aucun planning n’est défini.

---

# Acte P1 — Définir le cadre professionnel

## Écran 1 — Démarrer la démonstration

| Élément           | Contenu                                                                                              |
| ----------------- | ---------------------------------------------------------------------------------------------------- |
| Objectif          | Présenter la mission sans démarrer directement dans un formulaire                                    |
| Titre             | « Créez votre offre professionnelle »                                                                |
| Persona           | Sarah, coiffeuse en tresses à Saint-Denis                                                            |
| Mission           | « Définissez comment vous travaillez, ce que vous proposez, puis quand vous êtes disponible »          |
| Information       | Durée estimée : 8 à 12 minutes                                                                       |
| Ce qu’elle verra  | Cadre professionnel → Prestations → Planning actif                                                   |
| Action principale | **Commencer**                                                                                        |
| Nature            | Écran exclusivement réservé à la démo                                                                |

Pas de persona cliente ici. La valeur à capter est la mise en activité (cadre + offre + planning).

---

## Écran 2 — Tableau de bord de Sarah

Sarah arrive dans une application **sans cadre actif**, sans offre et sans planning.

| Zone                 | Contenu                                                         |
| -------------------- | --------------------------------------------------------------- |
| En-tête              | Bonjour Sarah                                                   |
| Indicateur principal | « Votre cadre professionnel n’est pas encore actif »            |
| Carte à traiter      | « Définir comment vous exercez »                                |
| Aide                 | Sans cadre actif, aucune prestation ni planning ne peut recevoir de demande |
| Action principale    | **Définir mon cadre**                                           |
| Action secondaire    | Voir ce qu’est un cadre professionnel                           |

Contrairement au storyboard transactionnel, il n’y a pas de brouillon de prestation prérempli à « finaliser ». Sarah crée.

**Sortie :** entrée dans le parcours cadre.

---

## Écran 3 — Accueil du cadre professionnel

Écran explicatif, sans saisie.

| Élément           | Contenu                                                                 |
| ----------------- | ----------------------------------------------------------------------- |
| Badge             | BROUILLON                                                               |
| Titre             | « Définissez comment vous travaillez. »                       |
| Message           | Ce n’est pas encore votre prestation. C’est le cadre dans lequel vous acceptez de travailler. |
| Piliers           | Contextes · Accueil · Pause · Communication & paiement · Politiques & sécurité |
| Note              | Certaines règles de sécurité sont déjà prévues par la plateforme        |
| Action principale | **Commencer**                                                           |

**Sortie :** intention comprise. Sarah sait qu’elle configure un mode d’exercice réutilisable.

---

## Écran 4 — Contextes d’exercice

| Champ                         | Valeur cible démo                          |
| ----------------------------- | ------------------------------------------ |
| Contextes                     | Salon sélectionné (chez moi / déplacement proposés) |
| Confidentialité de l’adresse  | Adresse masquée jusqu’à l’engagement       |
| Aide                          | Ces contextes s’appliquent par défaut à vos futures prestations |
| Action principale             | **Continuer**                              |

Sarah peut modifier avant de continuer. Un défaut raisonnable peut être pré-coché, mais le choix reste le sien.

**Sortie :** contextes d’exercice déclarés.

---

## Écran 5 — Accueil et accès

| Champ              | Valeur cible démo                |
| ------------------ | -------------------------------- |
| Accompagnants      | Non autorisés                    |
| Mineurs            | Acceptés avec accompagnateur     |
| Consigne d’accès   | Sonner à l’entrée du salon       |
| Action principale  | **Continuer**                    |

**Sortie :** règles d’accueil et d’accès.

---

## Écran 6 — Vos pauses pendant une longue prestation

Cet écran matérialise une règle d’exercice souvent absente des outils de réservation classiques.

| Champ                 | Valeur cible démo                          |
| --------------------- | ------------------------------------------ |
| Titre                 | « Votre droit à la pause »                 |
| Message               | Pendant une prestation longue, vous pouvez prévoir des pauses. Elles font partie de votre cadre. |
| Pause par défaut      | 5 minutes toutes les heures                |
| Options proposées     | Aucune · 5 min / h · 10 min / h · Personnaliser |
| Effet annoncé         | Cette règle pourra être rappelée à la cliente avant l’engagement |
| Action principale     | **Continuer**                              |

Sarah peut garder le défaut ou le modifier. La démo ne calcule pas encore l’impact minute par minute sur chaque créneau ; elle fait exister le droit.

**Sortie :** droit à la pause défini dans le cadre.

---

## Écran 7 — Communication et paiement

| Champ                    | Valeur cible démo                         |
| ------------------------ | ----------------------------------------- |
| Canal de communication   | Via la plateforme                         |
| Temps de réponse habituel (indicatif) | Sous 2 heures pendant les créneaux ouverts |
| Moyens de paiement       | Carte · Paiement via la plateforme        |
| Note solde               | Reste à payer en fin de prestation (pas de choix) |
| Action principale        | **Continuer**                             |

**Sortie :** modalités de communication et de paiement.

---

## Écran 8 — Politiques, sécurité et photos

| Champ                         | Valeur cible démo                              |
| ----------------------------- | ---------------------------------------------- |
| Retard toléré                 | 15 minutes                                     |
| Annulation / report           | Politique catalogue sélectionnée               |
| Interruption pour sécurité    | Possible si douleur forte ou malaise       |
| Consentement photos           | Publication uniquement avec l’accord de la cliente   |
| Action principale             | **Continuer**                                  |

Sarah choisit des règles simples dans un catalogue court.

**Sortie :** politiques générales prêtes pour le récapitulatif.

---

## Écran 9 — Récapitulatif du cadre

L’écran regroupe toutes les décisions avant activation (CTA délibéré).

| Bloc                    | Contenu résumé                                      |
| ----------------------- | --------------------------------------------------- |
| Contextes               | Salon · adresse masquée                             |
| Accueil                 | Pas d’accompagnants · mineurs avec accompagnateur   |
| Pause                   | 5 minutes toutes les heures                         |
| Communication           | Via la plateforme · réponse sous 2 h                |
| Paiement                | Carte + plateforme · solde en fin de prestation     |
| Politiques              | Retard 15 min · annulation selon délai              |
| Photos                  | Uniquement avec l’accord de la cliente                             |
| Action secondaire       | Modifier une section                                |
| Action principale       | **Activer mon cadre professionnel**                 |

Pas d’activation implicite. Sarah doit confirmer.

**État produit :** `PROFESSIONAL_FRAMEWORK_ACTIVE`

---

## Écran 10 — Cadre actif — continuité

| Élément           | Contenu                                                                 |
| ----------------- | ----------------------------------------------------------------------- |
| Confirmation      | « Votre cadre professionnel est actif »                                 |
| Ce que ça change  | Vous pouvez maintenant créer ce que vous proposez                         |
| Rappel            | Le cadre s’applique par défaut. Vous ne le redéfinirez pas à chaque cliente. |
| Action principale | **Créer ma première prestation**                                        |
| Action secondaire | Revoir mon cadre                                                        |

Le bandeau démo passe à :

> **Mode démo — Créez votre offre · Étape 2 sur 8**

**Sortie :** entrée dans l’Acte P2.

---

# Acte P2 — Créer les prestations

## Écran 11 — Accueil des prestations

Écran explicatif. Le cadre est désormais un fait acquis.

| Élément           | Contenu                                                                 |
| ----------------- | ----------------------------------------------------------------------- |
| Badge             | BROUILLON                                                               |
| Bandeau statut    | « Cadre professionnel actif »                                  |
| Titre             | « Créer ce que vous proposez »                                          |
| Message           | Choisissez une prestation, montrez comment elle se présente, dites qui prépare quoi, puis fixez prix et durée. Le planning viendra ensuite. |
| Piliers           | Prestation · Galerie · Préparation · Prix & durée                           |
| Action principale | **Créer une prestation**                                                |

**État d’entrée :** brouillon d’offre (`OFFER_DRAFT`).

---

## Écran 12 — Prestation et longueurs

| Champ              | Valeur cible démo                        |
| ------------------ | ---------------------------------------- |
| Catalogue          | Knotless braids · Vanilles · Retwist…    |
| Choix de Sarah     | Knotless braids                          |
| Épaisseur          | Medium (multi-sélection)                 |
| Longueurs offertes | Multi-sélection : Épaules · Mi-dos · Taille |
| Cible démo         | Épaules (référence) + Mi-dos ; Taille optionnelle |
| Aide               | Une prestation identifiable ; chaque longueur aura son prix (réf. puis adaptation) |
| Action principale  | **Continuer**                            |

Sarah crée / sélectionne volontairement. Le catalogue guide, mais ne décide pas à sa place.

**Sortie :** prestation + taille + longueurs activées (≥ 1).

---

## Écran 13 — Galerie de la prestation

La galerie appartient aux knotless braids, pas à l’ensemble du portfolio de Sarah.

| Élément              | Contenu                                            |
| -------------------- | -------------------------------------------------- |
| Contexte affiché     | Knotless braids moyen — longueurs sélectionnées   |
| Emplacements         | Trois photos à sélectionner ou ajouter             |
| Niveau de preuve     | Réalisation déclarée ou inspiration                |
| Interdit             | Mélanger vanilles, perruques ou autres prestations |
| Minimum              | Au moins une image pour continuer                  |
| Cible démo           | Trois réalisations                                 |
| Action principale    | **Continuer**                                      |

**Sortie :** `SERVICE_GALLERY` utilisable pour cette prestation.

---

## Écran 14 — Préparation avant le rendez-vous

| Champ                 | Valeur cible démo                         |
| --------------------- | ----------------------------------------- |
| Consigne pour la cliente | Cheveux lavés et démêlés avant le rendez-vous |
| Tâche — mèches        | Coiffeuse                                 |
| Tâche — lavage        | Cliente                                   |
| Tâche — démêlage      | Cliente                                   |
| Consigne cliente      | Cheveux lavés et démêlés avant le rendez-vous |
| Action principale     | **Continuer**                             |

**Sortie :** configuration de service claire, compréhensible plus tard par une cliente.

---

## Écran 15 — Prix par longueur (+ option hors longueur)

Modèle tarifaire :

1. **Longueur de référence** = la plus courte activée (ex. Épaules) → prix de base.
2. **Autres longueurs** → chacune un **prix complet** adapté.
3. **Option hors longueur** (ex. mèches) → montant en plus, indépendant du barème longueur.

| Longueur | Rôle | Prix cible | Durée cible |
| -------- | ---- | ---------: | ----------- |
| Épaules  | Référence | 120 € | 4 h |
| Mi-dos   | Adapté | 150 € | 5 h 30 |
| Taille   | Adapté | 180 € | 6 h 30 |

| Champ              | Valeur cible démo      |
| ------------------ | ---------------------- |
| Option hors longueur | Mèches fournies : +20 € |
| Aperçu devis       | Une ligne par longueur · « à partir de » = min des prix |
| Note pause         | Pause du cadre (5 min / h) rappelée en lecture seule, non recalculée dans la durée |
| Action principale  | **Continuer**          |

Les valeurs peuvent être pré-suggérées pour accélérer, mais Sarah les pose comme décisions de création.

**Sortie :** barème prix / durée par longueur (+ option hors longueur éventuelle).

---

## Écran 16 — Récapitulatif et activation de l’offre

| Bloc           | Contenu résumé                                      |
| -------------- | --------------------------------------------------- |
| Cadre actif   | Actif · pause 5 min / h · retard 15 min             |
| Prestation     | Knotless braids moyen · longueurs activées         |
| Galerie        | 3 réalisations                                      |
| Service        | Complet avec préparation cliente · lavage/démêlage cliente · mèches Sarah |
| Barème         | Ex. Épaules 120 € · Mi-dos 150 € / 5 h 30 · + 20 € mèches |
| Action secondaire | Modifier une section                             |
| Action principale | **Activer cette prestation**                     |

Confirmation requise via le CTA d’activation. **Pas de lieu ni de créneau ici** — c’est le rôle du planning.

**État produit :** `OFFER_ACTIVE`

---

## Écran 17 — Offre active — continuité

| Élément           | Contenu                                                                 |
| ----------------- | ----------------------------------------------------------------------- |
| Confirmation      | « Votre prestation est active »                                         |
| Synthèse          | Knotless braids moyen · barème longueurs · à partir de X €             |
| Ce que ça change  | Vous pouvez maintenant définir quand vous êtes disponible               |
| Rappel            | Sans planning actif, aucune demande ne peut encore vous être adressée   |
| Action principale | **Définir mon planning**                                                |
| Action secondaire | Revoir ma prestation                                                    |

Le bandeau démo passe à :

> **Mode démo — Créez votre offre · Étape 3 sur 8**

**Sortie :** entrée dans l’Acte P3.

---

# Acte P3 — Définir le planning

## Écran 18 — Accueil du planning

Écran explicatif. Cadre et offre sont des faits acquis.

| Élément           | Contenu                                                                 |
| ----------------- | ----------------------------------------------------------------------- |
| Badge             | BROUILLON                                                               |
| Bandeau statut    | « Cadre actif · Offre active »                                |
| Titre             | « Quand vous êtes disponible »                                          |
| Message           | Indiquez vos jours, vos horaires et votre charge. Les créneaux possibles en découlent — ce n’est pas une « capacité » à ouvrir une par une. |
| Piliers           | Lieu · Jours · Horaires · Rendez-vous max. / jour                              |
| Action principale | **Configurer mon planning**                                             |

**État d’entrée :** brouillon de planning (`SCHEDULE_DRAFT`).

---

## Écran 19 — Configurer le planning

| Champ                 | Valeur cible démo                 |
| --------------------- | --------------------------------- |
| Contexte d’accueil    | En salon (issu du cadre)           |
| Lieu                  | Saint-Denis                       |
| Jours ouvrés          | Mardi à samedi                    |
| Horaires              | 9 h – 18 h                        |
| Rendez-vous max. / jour      | 1 rendez-vous maximum par jour    |
| Aperçu                | Mini-calendrier : semaine du 12–18 août ; samedi 15 août dès 9 h apparaît comme créneau possible |
| Aide                  | Ce créneau n’est pas une capacité ouverte à part : il découle de vos règles de planning |
| Action principale     | **Continuer**                     |

Sarah pose un **planning réel**. Le 15 août à 9 h est visible comme **conséquence**, pour rester chaînable vers Inès, sans être présenté comme un objet « capacité ».

**Sortie :** planning situé (lieu, plages, limite).

---

## Écran 20 — Récapitulatif et activation du planning

| Bloc           | Contenu résumé                                      |
| -------------- | --------------------------------------------------- |
| Cadre actif   | Actif · pause 5 min / h · retard 15 min             |
| Offre active  | Knotless braids moyen · barème longueurs           |
| Lieu           | Salon Saint-Denis                                   |
| Planning       | Mar–sam · 9 h–18 h · 1 RDV / jour                   |
| Conséquence    | Créneaux possibles incluent samedi 15 août dès 9 h  |
| Action secondaire | Modifier                                             |
| Action principale | **Activer mon planning**                           |

Confirmation requise via le CTA d’activation.

**État produit :** `SCHEDULE_ACTIVE`

---

## Écran 21 — Planning actif

| Élément           | Contenu                                                                 |
| ----------------- | ----------------------------------------------------------------------- |
| Confirmation      | « Vous pouvez maintenant recevoir des demandes »            |
| Synthèse          | Offre active · planning Mar–sam 9 h–18 h · Saint-Denis                  |
| État              | `SCHEDULE_ACTIVE` (avec cadre + offre)                                  |
| Action principale | **Voir mon planning**                                                   |
| Action alternative A | **Continuer vers une demande cliente** *(enchaînement démo)*         |
| Action alternative B | **Donner mon avis sur cette étape**                                     |

Si Sarah choisit l’enchaînement, le simulateur injecte la demande d’Inès et le récit rejoint l’Écran 6 de `3-storyboard.md` (Nouvelle demande). L’Histoire A / Acte A du storyboard transactionnel est alors sautée.

---

## Écran 22 — Fin de la démonstration précurseur

Cet écran appartient uniquement au protocole de test, lorsque la démo s’arrête à `SCHEDULE_ACTIVE`.

### Résumé montré à Sarah

> Vous avez défini comment vous travaillez, créé une prestation identifiable, fixé vos conditions et défini un planning réellement disponible.

### Questions de recherche

* Avez-vous compris la différence entre cadre, prestation et planning ?
* Créer votre offre vous a-t-il semblé utile ou administratif ?
* Le droit à la pause a-t-il sa place dans ce cadre ?
* Le prix par longueur (référence puis adaptation) est-il clair ?
* La galerie par prestation est-elle plus claire qu’une galerie générale ?
* Le planning vous paraît-il un vrai outil de disponibilité ?
* Le récapitulatif avant activation vous a-t-il donné confiance ?
* Après activation du planning, comprenez-vous que vous pouvez recevoir une demande ?
* À quel moment le parcours vous a-t-il paru artificiel ?

Actions :

* `Recommencer le scénario`
* `Enchaîner avec une demande cliente`
* `Terminer`

---

## Enchaînement fonctionnel final

| Écrans   | Décision principale de Sarah        | Effet plateforme                         | État obtenu                       |
| -------- | ----------------------------------- | ---------------------------------------- | --------------------------------- |
| 1 à 2    | Entrer dans la démo                 | Orientée vers la création                | Intention de démarrage            |
| 3 à 8    | Configurer son mode d’exercice      | Brouillon de cadre enrichi               | `PROFESSIONAL_FRAMEWORK_DRAFT`    |
| 9 à 10   | Activer le cadre                    | Débloque les prestations                 | `PROFESSIONAL_FRAMEWORK_ACTIVE`   |
| 11 à 15  | Créer prestation, galerie, conditions | Brouillon d’offre cohérent             | `OFFER_DRAFT`                     |
| 16 à 17  | Activer l’offre                     | Débloque le planning                     | `OFFER_ACTIVE`                    |
| 18 à 19  | Définir le planning                 | Brouillon de planning cohérent           | `SCHEDULE_DRAFT`                  |
| 20 à 21  | Activer le planning                 | Créneaux éligibles au matching           | `SCHEDULE_ACTIVE`                 |
| 22       | Clôturer ou enchaîner               | Fin de test ou injection demande Inès    | Relation avec `3-storyboard.md`   |

## Correspondance avec le cas métier

| Activités `2-precurseur-cadre-prestations-planning.md` | Écrans |
| -------------------------------------------- | ------ |
| 1 — Comprendre le cadre                      | 3      |
| 2 — Contextes                                | 4      |
| 3 — Accueil et accès                         | 5      |
| 4 — Vos pauses pendant une longue prestation                         | 6      |
| 5 — Communication et paiement                | 7      |
| 6 — Politiques et sécurité                   | 8      |
| 7 — Activer le cadre                         | 9–10   |
| 8 — Comprendre l’offre                       | 11     |
| 9 — Prestation et longueurs                  | 12     |
| 10 — Galerie                                 | 13     |
| 11 — Service et tâches                       | 14     |
| 12 — Barème par longueur                     | 15     |
| 13 — Activer l’offre                         | 16–17  |
| 14–18 — Planning (lieu, plages, limite, aperçu) | 18–19 |
| 19 — Activer le planning                     | 20–21  |
| 20 — Retour de démo collecté                 | 22     |

## Relation avec `3-storyboard.md`

| Parcours | Storyboard | Point d’entrée / sortie |
| -------- | ---------- | ----------------------- |
| Précurseur seul | Ce document | Écran 1 → Écran 22 |
| Précurseur puis transaction | Ce document puis `3-storyboard.md` | Écran 21 « Continuer vers une demande » → Écran 6 du storyboard transactionnel |
| Transaction court | `3-storyboard.md` / `3-storyboard-cible.md` seul | Écrans 1–5 (validation accélérée offre + planning → `SCHEDULE_ACTIVE`) |

Le principe directeur est le même : un écran n’existe que s’il aide Sarah à comprendre une situation, prendre une décision professionnelle ou vérifier une preuve. Ici, aucune réaction cliente ne progresse le scénario — seules les décisions de création de Sarah le font.

Version cible après validation : `3-storyboard-precurseur-cible.md`.
