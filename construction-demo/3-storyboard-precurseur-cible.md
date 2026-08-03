Voici la version **cible** du storyboard précurseur Sarah (cadre + prestations + planning), après validation.

Source métier : `2-precurseur-cadre-prestations-planning.md`  
Source initiale : `3-storyboard-precurseur.md` (22 écrans)  
Méthode : `4-storyboard-validation.md`

Le parcours contient **19 écrans** : 17 écrans du produit et 2 réservés au dispositif de démonstration (démarrage + clôture intégrée au succès planning).

> **Retrait de la capacité.** Aucun écran n’ouvre une « capacité ». L’état d’arrivée est `SCHEDULE_ACTIVE` (cadre actif + offre active + planning actif). L’ancien `CAPACITY_OPEN` est retiré.

### Fusions appliquées

| Avant (`3-storyboard-precurseur.md`) | Après (ce fichier) |
| ------------------------------------ | ------------------ |
| Écrans 10 + 11 | **Écran 10** — Cadre actif → créer une prestation |
| Écrans 17 + 18 | **Écran 16** — Offre active → définir le planning |
| Écrans 21 + 22 | **Écran 19** — Planning actif (+ fin / enchaînement) |

### Décisions tranchées

| # | Point | Choix | Motif |
| - | ----- | ----- | ----- |
| D1 | Découpage métier | **P1 cadre · P2 prestations · P3 planning** | Sépare comment / quoi / quand ; retire l’objet capacité |
| D2 | État d’arrivée | **`SCHEDULE_ACTIVE`** (+ préconditions cadre + offre) | Remplace `CAPACITY_OPEN` ; prêt à matcher |
| D3 | Contenu planning | **Plages réelles** (mar–sam, 9 h–18 h, 1 RDV/jour) | Pas un créneau unique déguisé |
| D4 | Chaînage Inès | **15 août 9 h = conséquence** du planning, visible en aperçu | Démo-friendly sans fausse promesse « capacité » |
| D5 | Activation offre | **Récap + CTA explicite** avant planning | L’offre existe sans être encore disponible |
| D6 | Aide dashboard | **Bottom sheet**, pas second écran pédagogique | Garde le flux |
| D7 | Préparation | Consigne cliente (plus de « Niveau de service » / Pose / Finition) | Aligné `demo-precurseur` |
| D8 | Pause | **Non recalculée** dans les durées / créneaux | Fait exister le droit, sans usine à gaz |
| D9 | Tarif | **Prix par longueur** (réf. + adaptés) + option hors longueur | Conservé du modèle validé |
| D10 | Durée | **8–12 min** jusqu’à `SCHEDULE_ACTIVE`, +1–2 min feedback | Trois actes, encore jouable |
| D11 | Bandeau | **Étape 1 / 2 / 3 sur 8** | Aligné `demo-precurseur` (pas Scène/Acte) |
| D12 | Clôture | **Formulaire répondable** intégré au succès planning | Pas d’écran fin vide si elle enchaîne |

Corrections de contenu : durée 8–12 min · aide dashboard en bottom sheet · service « complet avec préparation cliente » · pause non recalculée · multi-longueurs + prix complets · planning réel avec aperçu 15 août.

La coiffeuse utilise réellement l’application. Aucune cliente n’intervient. Inès n’apparaît qu’en option à la sortie, si la démo enchaîne vers `3-storyboard.md`.

## Cadre visuel permanent de la démo

Un bandeau discret, absent de l’application finale, reste affiché en haut :

> **Mode démo — Créez votre offre · Étape 1 sur 8**

Il permet uniquement de :

* comprendre qu’il s’agit d’une démonstration ;
* voir l’avancement (P1 cadre / P2 prestations / P3 planning) ;
* réinitialiser le scénario ;
* quitter la démonstration.

| Phase | Étape bandeau | Contenu |
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

| Élément           | Contenu                                                                                     |
| ----------------- | ------------------------------------------------------------------------------------------- |
| Objectif          | Présenter la mission sans démarrer directement dans un formulaire                           |
| Titre             | « Créez votre offre professionnelle »                                                       |
| Persona           | Sarah, coiffeuse en tresses à Saint-Denis                                                   |
| Mission           | « Définissez comment vous travaillez, ce que vous proposez, puis quand vous êtes disponible » |
| Information       | Durée estimée : 8 à 12 minutes                                                              |
| Ce qu’elle verra  | Cadre professionnel → Prestations → Planning actif                                          |
| Action principale | **Commencer**                                                                               |
| Nature            | Écran exclusivement réservé à la démo                                                       |

Pas de persona cliente ici. La valeur à capter est la mise en activité.

---

## Écran 2 — Tableau de bord de Sarah

Sarah arrive dans une application **sans cadre actif**, sans offre et sans planning.

| Zone                 | Contenu                                                             |
| -------------------- | ------------------------------------------------------------------- |
| En-tête              | Bonjour Sarah                                                       |
| Indicateur principal | « Votre cadre professionnel n’est pas encore actif »                |
| Carte à traiter      | « Définir comment vous exercez »                                    |
| Aide                 | Sans cadre actif, aucune prestation ni planning ne peut recevoir de demande |
| Action principale    | **Définir mon cadre**                                               |
| Action secondaire    | Aide courte (bottom sheet) : « Qu’est-ce qu’un cadre professionnel ? » |

L’action secondaire n’ouvre **pas** un second écran pédagogique. Elle affiche un sheet de 2–3 phrases, puis Sarah revient au dashboard ou enchaîne via le CTA principal vers l’écran 3.

Contrairement au storyboard transactionnel, il n’y a pas de brouillon de prestation prérempli à « finaliser ». Sarah crée.

**Sortie :** entrée dans le parcours cadre (écran 3).

---

## Écran 3 — Accueil du cadre professionnel

Écran explicatif, sans saisie.

| Élément           | Contenu                                                                          |
| ----------------- | -------------------------------------------------------------------------------- |
| Badge             | BROUILLON                                                                        |
| Titre             | « Définissez comment vous travaillez. »                                          |
| Message           | Ce n’est pas encore votre prestation. C’est le cadre dans lequel vous acceptez de travailler. |
| Piliers           | Contextes · Accueil · Pause · Communication & paiement · Politiques & sécurité   |
| Note              | Certaines règles de sécurité sont déjà prévues par la plateforme                 |
| Action principale | **Commencer**                                                                    |

**Sortie :** intention comprise. Sarah sait qu’elle configure un mode d’exercice réutilisable.

---

## Écran 4 — Contextes d’exercice

| Champ                        | Valeur cible démo                                           |
| ---------------------------- | ----------------------------------------------------------- |
| Contextes                    | Salon sélectionné (chez moi / déplacement proposés)         |
| Confidentialité de l’adresse | Adresse masquée jusqu’à l’engagement                        |
| Aide                         | Ces contextes s’appliquent par défaut à vos futures prestations |
| Action principale            | **Continuer**                                               |

Sarah peut modifier avant de continuer. Un défaut raisonnable peut être pré-coché, mais le choix reste le sien.

**Sortie :** contextes d’exercice déclarés.

---

## Écran 5 — Accueil et accès

| Champ             | Valeur cible démo            |
| ----------------- | ---------------------------- |
| Accompagnants     | Non autorisés                |
| Mineurs           | Acceptés avec accompagnateur |
| Consigne d’accès  | Sonner à l’entrée du salon   |
| Action principale | **Continuer**                |

**Sortie :** règles d’accueil et d’accès.

---

## Écran 6 — Vos pauses pendant une longue prestation

Cet écran matérialise une règle d’exercice souvent absente des outils de réservation classiques.

| Champ             | Valeur cible démo                                                            |
| ----------------- | ---------------------------------------------------------------------------- |
| Titre             | « Votre droit à la pause »                                                   |
| Message           | Pendant une prestation longue, vous pouvez prévoir des pauses. Elles font partie de votre cadre. |
| Pause par défaut  | 5 minutes toutes les heures                                                  |
| Options proposées | Aucune · 5 min / h · 10 min / h · Personnaliser                              |
| Effet annoncé     | Cette règle pourra être rappelée à la cliente avant l’engagement             |
| Action principale | **Continuer**                                                                |

Sarah peut garder le défaut ou le modifier. « Aucune » est un choix valide.

La démo **ne recalcule pas** automatiquement la durée des créneaux à partir de cette règle ; elle fait exister le droit.

**Sortie :** droit à la pause défini dans le cadre.

---

## Écran 7 — Communication et paiement

| Champ                      | Valeur cible démo                          |
| -------------------------- | ------------------------------------------ |
| Canal de communication     | Via la plateforme · Instagram (Insta) · TikTok |
| Temps de réponse habituel (indicatif) | Sous 2 heures pendant les créneaux ouverts |
| Moyens de paiement acceptés | Carte · Paiement via la plateforme         |
| Note solde                 | Reste à payer en fin de prestation (pas de choix) |
| Action principale          | **Continuer**                              |

**Sortie :** modalités de communication et de paiement.

---

## Écran 8 — Politiques, sécurité et photos

| Champ                      | Valeur cible démo                            |
| -------------------------- | -------------------------------------------- |
| Retard toléré              | 15 minutes                                   |
| Annulation / report        | Définir ses règles d’annulation              |
| Interruption pour sécurité | Possible si douleur forte ou malaise (défaut plateforme, verrouillé, grisé, non cliquable) |
| Consentement photos        | Publication uniquement avec l’accord de la cliente |
| Action principale          | **Continuer**                                |

Sarah choisit des règles simples dans un catalogue court.

**Sortie :** politiques générales prêtes pour le récapitulatif.

---

## Écran 9 — Récapitulatif du cadre

L’écran regroupe toutes les décisions avant activation (CTA délibéré).

| Bloc              | Contenu résumé                                    |
| ----------------- | ------------------------------------------------- |
| Contextes         | Salon · adresse masquée                           |
| Accueil           | Pas d’accompagnants · mineurs avec accompagnateur |
| Pause             | 5 minutes toutes les heures                       |
| Communication     | Via la plateforme · réponse sous 2 h              |
| Paiement          | Carte + plateforme · reste à payer en fin de prestation |
| Politiques        | Retard 15 min · Définir ses règles d’annulation   |
| Photos            | Uniquement avec l’accord de la cliente            |
| Action secondaire | Modifier une section                              |
| Action principale | **Activer mon cadre professionnel**               |

Pas d’activation implicite. Sarah doit confirmer.

**État produit :** `PROFESSIONAL_FRAMEWORK_ACTIVE`

---

## Écran 10 — Cadre actif → créer une prestation

*Fusion des anciens écrans 10 (succès cadre) et 11 (accueil prestations).*

Un seul pont P1 → P2 : confirmation de l’activation + orientation vers la création d’offre.

| Élément           | Contenu                                                                 |
| ----------------- | ----------------------------------------------------------------------- |
| Confirmation      | « Votre cadre professionnel est actif »                                 |
| Ce que ça change  | Vous pouvez maintenant créer ce que vous proposez                         |
| Rappel            | Le cadre s’applique par défaut. Vous ne le redéfinirez pas à chaque cliente. |
| Bandeau statut    | « Cadre professionnel actif » (pas de « hérité »)                       |
| Titre suite       | « Créer ce que vous proposez »                                          |
| Message suite     | Choisissez une prestation, montrez comment elle se présente, dites qui prépare quoi, puis fixez prix et durée. Le planning viendra ensuite. |
| Piliers           | Prestation · Galerie · Préparation · Prix & durée                       |
| Action principale | **Créer une prestation**                                                |
| Action secondaire | Revoir mon cadre                                                        |

Le bandeau démo passe à :

> **Mode démo — Créez votre offre · Étape 2 sur 8**

**État produit / entrée P2 :** `OFFER_DRAFT`

**Sortie :** entrée directe dans la configuration de prestation (écran 11). Pas de second écran explicatif.

---

# Acte P2 — Créer les prestations

## Écran 11 — Prestation et longueurs

| Champ             | Valeur cible démo                          |
| ----------------- | ------------------------------------------ |
| Catalogue         | Knotless braids · Vanilles · Retwist…      |
| Choix de Sarah    | Knotless braids                            |
| Épaisseur         | Medium (multi-sélection possible)          |
| Longueurs offertes | Multi-sélection : Épaules · Mi-dos · Taille |
| Cible démo        | Épaules (référence) + Mi-dos ; Taille optionnelle |
| Aide              | Choisissez ce que vous proposez. Activez les longueurs : chacune aura ensuite son propre prix. |
| Action principale | **Continuer**                              |

Sarah crée / sélectionne volontairement. Le catalogue guide, mais ne décide pas à sa place. Les longueurs sont des **formats proposés**, pas une seule variante figée.

**Sortie :** prestation + épaisseur(s) + longueurs activées (≥ 1).

---

## Écran 12 — Galerie de la prestation

La galerie appartient aux knotless braids, pas à l’ensemble du portfolio de Sarah.

| Élément           | Contenu                                            |
| ----------------- | -------------------------------------------------- |
| Contexte affiché  | Knotless braids moyen — longueurs sélectionnées   |
| Emplacements      | Trois photos à sélectionner ou ajouter             |
| Niveau de preuve  | Réalisation déclarée ou inspiration                |
| Interdit          | Mélanger vanilles, perruques ou autres prestations |
| Minimum           | Au moins une image pour continuer                  |
| Cible démo        | Trois réalisations                                 |
| Action principale | **Continuer**                                      |

**Sortie :** `SERVICE_GALLERY` utilisable pour cette prestation.

---

## Écran 13 — Préparation avant le rendez-vous

Plus de onglet « Niveau de service » ni de répartition de tâches (Pose / Finition retirés).

| Champ             | Valeur cible démo                                     |
| ----------------- | ----------------------------------------------------- |
| Titre             | Préparation avant le rendez-vous                      |
| Message           | Indiquez clairement ce que la cliente doit préparer avant de venir |
| Consigne pour la cliente | Cheveux lavés et démêlés avant le rendez-vous |
| Aide              | Cette consigne sera visible côté cliente avec votre prestation |
| Action principale | **Continuer**                                         |

**Sortie :** consigne de préparation cliente, visible côté cliente.

---

## Écran 14 — Prix par longueur (+ option hors longueur)

Modèle tarifaire :

1. **Longueur de référence** = la plus courte activée (ex. Épaules) → prix de base de la prestation.
2. **Autres longueurs** → chacune a son **prix complet**, adapté par Sarah (ce n’est pas un « supplément longueur »).
3. **Option hors longueur** (ex. mèches) → montant en plus du prix de la longueur choisie, indépendant du barème longueur.

| Longueur | Rôle | Prix cible | Durée cible |
| -------- | ---- | ---------: | ----------- |
| Épaules  | Référence | 120 € | 4 h |
| Mi-dos   | Adapté | 150 € | 5 h 30 |
| Taille   | Adapté | 180 € | 6 h 30 |

| Champ             | Valeur cible démo                                      |
| ----------------- | ------------------------------------------------------ |
| Option hors longueur | Mèches fournies : +20 € (distinct du barème longueur) |
| Aperçu devis      | Une ligne par longueur · « à partir de » = min des prix · + option si renseignée |
| Note pause        | « Pause du cadre : 5 min / h — rappelée à la cliente, non ajoutée automatiquement à cette durée » |
| Action principale | **Continuer**                                          |

Les valeurs peuvent être pré-suggérées pour accélérer, mais Sarah les pose comme décisions de création. Chaque longueur active doit avoir un prix > 0.

**Sortie :** barème prix / durée par longueur (+ option hors longueur éventuelle).

---

## Écran 15 — Récapitulatif et activation de l’offre

L’écran doit montrer la prestation **telle qu’elle apparaît côté cliente** (aperçu).

| Bloc              | Contenu résumé                                                      |
| ----------------- | ------------------------------------------------------------------- |
| Cadre actif      | Actif · pause 5 min / h · retard 15 min                             |
| Prestation        | Knotless braids moyen · longueurs activées                         |
| Galerie           | 3 réalisations                                                      |
| Service           | Complet avec préparation cliente · lavage/démêlage cliente · mèches Sarah |
| Barème            | Ex. Épaules 120 € · Mi-dos 150 € / 5 h 30 · + 20 € mèches           |
| Action secondaire | Modifier une section                                                |
| Action principale | **Activer cette prestation**                                        |

Confirmation requise via le CTA d’activation. **Pas de lieu ni de créneau** sur cet écran.

**État produit :** `OFFER_ACTIVE`

---

## Écran 16 — Offre active → définir le planning

Affiche une **vue cliente** de la prestation active avant d’orienter vers le planning.

*Fusion des anciens écrans 17 (succès offre) et 18 (accueil planning).*

Un seul pont P2 → P3 : confirmation de l’offre + orientation vers le planning.

| Élément           | Contenu                                                                 |
| ----------------- | ----------------------------------------------------------------------- |
| Confirmation      | « Votre prestation est active »                                         |
| Synthèse          | Knotless braids moyen · barème longueurs · à partir de X €             |
| Ce que ça change  | Vous pouvez maintenant définir quand vous êtes disponible               |
| Rappel            | Sans planning actif, aucune demande ne peut encore vous être adressée   |
| Bandeau statut    | « Cadre actif · Offre active » (pas de « hérité »)                      |
| Titre suite       | « Quand vous êtes disponible »                                          |
| Message suite     | Indiquez vos jours, vos horaires et votre charge. Les créneaux possibles en découlent. |
| Piliers           | Lieu · Jours & horaires · Rendez-vous max. / jour                              |
| Action principale | **Configurer mon planning**                                             |
| Action secondaire | Revoir ma prestation                                                    |

Le bandeau démo passe à :

> **Mode démo — Créez votre offre · Étape 3 sur 8**

**État produit / entrée P3 :** `SCHEDULE_DRAFT`

**Sortie :** entrée directe dans la configuration du planning (écran 17).

---

# Acte P3 — Définir le planning

## Écran 17 — Configurer le planning

| Champ              | Valeur cible démo |
| ------------------ | ----------------- |
| Contexte d’accueil | En salon (dynamique, issu du cadre — pas « hérité ») |
| Lieu               | Saint-Denis (éditable, affiché avec le contexte) |
| Jours ouvrés et horaires | Mardi à samedi · horaires proposés par jour (ex. 9 h – 18 h) |
| Rendez-vous max. / jour   | 1 rendez-vous maximum par jour |
| Aperçu             | Mini-calendrier semaine du 12–18 août ; **samedi 15 août dès 9 h** visible comme créneau possible |
| Aide               | Ce n’est pas une capacité à ouvrir : ce créneau découle de vos règles de planning |
| Action principale  | **Continuer** |

**Décision D3/D4 — tranchée :** Sarah définit un planning réel. Le 15 août à 9 h est une **conséquence affichée**, pas un objet métier séparé, pour rester chaînable vers Inès sans fausse promesse.

**Sortie :** planning situé (lieu, plages, limite) + compréhension de la conséquence.

---

## Écran 18 — Récapitulatif et activation du planning

| Bloc              | Contenu résumé |
| ----------------- | -------------- |
| Cadre actif      | Actif · pause 5 min / h · retard 15 min |
| Offre active     | Knotless braids moyen · barème longueurs |
| Lieu              | Salon Saint-Denis |
| Planning          | Mar–sam · 9 h–18 h · 1 RDV / jour |
| Conséquence       | Créneaux possibles incluent samedi 15 août dès 9 h |
| Action secondaire | Modifier |
| Action principale | **Activer mon planning** |

Confirmation requise via le CTA d’activation.

**État produit :** `SCHEDULE_ACTIVE`

---

## Écran 19 — Planning actif (+ fin / enchaînement)

*Fusion des anciens écrans 21 (succès) et 22 (fin de démonstration).*

| Élément              | Contenu |
| -------------------- | ------- |
| Confirmation         | « Vous pouvez maintenant recevoir des demandes » |
| Synthèse             | Offre active · planning Mar–sam 9 h–18 h · Saint-Denis · à partir de X € |
| État                 | `SCHEDULE_ACTIVE` (cadre + offre + planning) |
| Action principale    | **Voir mon planning** |
| Action alternative A | **Continuer vers une demande cliente** *(enchaînement démo)* |
| Action alternative B | **Donner mon avis sur cette étape** |

### Branche A — Enchaînement

Si Sarah choisit l’enchaînement, le simulateur injecte la demande d’Inès et le récit rejoint l’Écran 6 de `3-storyboard.md` (Nouvelle demande). L’Acte A / Histoire A du storyboard transactionnel est alors sautée.

**Déclencheur :** `SCHEDULE_ACTIVE` (plus `CAPACITY_OPEN`).

### Branche B — Terminer

« Donner mon avis sur cette étape » ouvre un **formulaire de retour répondable** (sheet / modal du protocole de test). Les questions ne sont plus en lecture seule : Sarah répond, puis enregistre.

#### Résumé montré à Sarah

> Vous avez défini comment vous travaillez, créé une prestation identifiable, fixé vos conditions et défini un planning réellement disponible.

#### Questions (saisie obligatoire pour enregistrer)

| # | Question | Type de réponse |
| - | -------- | --------------- |
| 1 | Avez-vous compris la différence entre cadre, prestation et planning ? | Oui / Partiellement / Non |
| 2 | Créer votre offre vous a-t-il semblé utile ou administratif ? | Utile / Mitigé / Administratif |
| 3 | Le droit à la pause a-t-il sa place dans ce cadre ? | Oui / Partiellement / Non |
| 4 | Le prix par longueur (référence puis adaptation) est-il clair ? | Oui / Partiellement / Non |
| 5 | La galerie par prestation est-elle plus claire qu’une galerie générale ? | Oui / Partiellement / Non |
| 6 | Le planning vous paraît-il un vrai outil de disponibilité ? | Oui / Partiellement / Non |
| 7 | Le récapitulatif avant activation vous a-t-il donné confiance ? | Oui / Partiellement / Non |
| 8 | Après activation du planning, comprenez-vous que vous pouvez recevoir une demande ? | Oui / Partiellement / Non |
| 9 | À quel moment le parcours vous a-t-il paru artificiel ? | Texte libre |
| 10 | Commentaire libre (optionnel) | Texte libre |

#### Actions du panneau

1. `Enregistrer mon retour` → persistance locale du feedback, confirmation affichée
2. Puis : `Recommencer le scénario` · `Enchaîner avec une demande cliente` · `Fermer`

Sans enregistrement, le retour n’est pas considéré comme collecté.

---

## Enchaînement fonctionnel final

| Écrans  | Décision principale de Sarah           | Effet plateforme                         | État obtenu                     |
| ------- | -------------------------------------- | ---------------------------------------- | ------------------------------- |
| 1 à 2   | Entrer dans la démo                    | Orientée vers la création                | Intention de démarrage          |
| 3 à 8   | Configurer son mode d’exercice         | Brouillon de cadre enrichi               | `PROFESSIONAL_FRAMEWORK_DRAFT`  |
| 9       | Activer le cadre                       | Cadre actif                              | `PROFESSIONAL_FRAMEWORK_ACTIVE` |
| 10      | Passer aux prestations                 | Brouillon d’offre créé                   | `OFFER_DRAFT`                   |
| 11 à 14 | Créer prestation, galerie, conditions  | Brouillon d’offre cohérent               | `OFFER_DRAFT` enrichi           |
| 15      | Activer l’offre                        | Offre éligible (pas encore matchable)    | `OFFER_ACTIVE`                  |
| 16      | Passer au planning                     | Brouillon de planning créé               | `SCHEDULE_DRAFT`                |
| 17      | Définir plages et limite               | Planning cohérent                        | `SCHEDULE_DRAFT` enrichi        |
| 18      | Activer le planning                    | Créneaux éligibles au matching           | `SCHEDULE_ACTIVE`               |
| 19      | Voir / enchaîner / terminer + répondre | Liste, injection Inès, ou feedback       | Retour collecté / enchaînement  |

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
| 8 — Comprendre l’offre                       | 10     |
| 9 — Prestation et longueurs                  | 11     |
| 10 — Galerie                                 | 12     |
| 11 — Service et tâches                       | 13     |
| 12 — Barème par longueur                     | 14     |
| 13 — Activer l’offre                         | 15–16  |
| 14–18 — Planning (lieu, plages, limite, aperçu) | 16–17 |
| 19 — Activer le planning                     | 18–19  |
| 20 — Retour de démo collecté                 | 19 (branche Terminer) |

## Correspondance avec le storyboard initial

| `3-storyboard-precurseur.md` | Ce fichier |
| ---------------------------- | ---------- |
| 1 → 9                        | 1 → 9 (inchangés dans l’intention) |
| 10 + 11                      | **10** |
| 12 → 16                      | 11 → 15 |
| 17 + 18                      | **16** |
| 19 → 20                      | 17 → 18 |
| 21 + 22                      | **19** |

## Relation avec `3-storyboard.md`

| Parcours | Storyboard | Point d’entrée / sortie |
| -------- | ---------- | ----------------------- |
| Précurseur seul | Ce document | Écran 1 → Écran 19 |
| Précurseur puis transaction | Ce document puis `3-storyboard.md` | Écran 19 « Continuer vers une demande » → Écran 6 du storyboard transactionnel |
| Transaction court | `3-storyboard.md` / `3-storyboard-cible.md` seul | Écrans 1–5 (validation accélérée offre + planning → `SCHEDULE_ACTIVE`) |

### Note de raccord

Les docs transactionnels sont alignés sur ce précurseur :

* déclencheur d’injection Inès = activation du **planning** (`SCHEDULE_ACTIVE`) ;
* compatibilité = cadre + offre + créneau **dérivé du planning** ;
* l’Acte A court valide offre + planning (plus de capacité / `CAPACITY_OPEN`).

Le principe directeur reste : un écran n’existe que s’il aide Sarah à comprendre une situation, prendre une décision professionnelle ou vérifier une preuve. Ici, aucune réaction cliente ne progresse le scénario — seules les décisions de création de Sarah le font.
