Voici la version **cible** du storyboard transactionnel Sarah/Inès, après validation. **Actes A–E tranchés** (critère max immersion / valeur ressentie, rail déterministe conservé).

Source métier : `2-exemple-concret.md`  
Source initiale : `3-storyboard.md` (18 écrans)  
Validation : `4-storyboard-validation.md`  
Modèle de format : `3-storyboard-precurseur-cible.md`  
Précurseur (création réelle) : `3-storyboard-precurseur-cible.md`

Le parcours contient **17 écrans** : 15 écrans du produit et 2 réservés au dispositif de démonstration (démarrage + clôture intégrée à l’avis / retour).

### Fusions appliquées

| Avant (`3-storyboard.md`) | Après (ce fichier) |
| ------------------------- | ------------------ |
| Écrans 17 + 18 | **Écran 17** — Avis, relation (+ fin / retour collecté) |

Corrections de contenu : durée 12–15 min · bandeau Étape 1–8 sur 8 · Acte A = chemin court hors capacité (validation offre + planning → `SCHEDULE_ACTIVE` ; 15 août 9 h = conséquence) · aligné sur le barème précurseur (mi-dos 150 € + option mèches) · immersion Acte A tranchée (1 CTA dashboard · édition cadre limitée hors pause · choix réels prestation/galerie · confirmation planning / créneau dérivé 15 août 9 h) · immersion Acte B tranchée (invitation 1 CTA + sheet · précision requise avant offre · sélection réelle de questions · refus récupérable · décision checklist avant offre sur rail) · immersion Acte C tranchée (preuves consentement/paiement consultables · checklist Sarah cochable · Inès auto après validation · compression temps par geste « Continuer la démonstration ») · immersion Acte D tranchée (événement perles immersif · micro-choix supplément/durée sur rail · séquence accord Inès + preuves V1/V2 consultables · qualification de fin réelle) · immersion Acte E tranchée (preuves règlement + détail frais consultables · avis lu + réponse réelle sur rail · constat favori/préférences immersif · formulaire de fin répondable allégé + clôture claire) · service « complet avec préparation cliente » · pause du cadre en lecture seule · clarification en panneau (pas messagerie libre) · décision intégrée en tête de la proposition · frais plateforme et revenu net explicites (18 € / 162 €) · formulaire de fin répondable avec persistance.

La coiffeuse utilise réellement l’application. Les actions d’Inès sont déclenchées automatiquement par les décisions de Sarah. Le simulateur est déterministe.

## Cadre visuel permanent de la démo

Un bandeau discret, absent de l’application finale, reste affiché en haut :

> **Mode démo — Inès est une cliente simulée · Étape X sur 8** (création: Créez votre offre · Étape 1–3)

| Phase | Étape bandeau | Contenu |
| ---- | ------------- | ------- |
| A | 1–3 sur 8 | Offre & planning |
| B | 4–5 sur 8 | Opportunité & proposition |
| C | 6 sur 8 | Engagement & préparation |
| D | 7 sur 8 | Réalisation & modification |
| E | 8 sur 8 | Règlement & relation |

Il permet uniquement de :

* comprendre que la cliente est simulée ;
* voir l’avancement ;
* réinitialiser le scénario ;
* quitter la démonstration.

La navigation produit reste réaliste :

> Accueil · Demandes · Rendez-vous · Prestations · Profil · bientôt

Au démarrage du chemin court, un brouillon de prestation existe déjà ; le cadre est présent mais à (re)valider. Demandes est vide jusqu’à l’injection de la demande d’Inès.

---

# Acte A — Valider offre et planning

*Chemin court.* Sarah **valide et active** un existant (cadre + offre + planning), sans les créer de zéro. Pas d’objet « capacité » ni d’état `CAPACITY_OPEN`. Pour la création réelle, voir `3-storyboard-precurseur-cible.md`. En parcours enchaîné depuis le précurseur, ce storyboard reprend à l’**Écran 6** (déclencheur Inès = `SCHEDULE_ACTIVE`).

### Décisions tranchées — Acte A *(critère : max immersion / valeur ressentie, rail déterministe conservé)*

| # | Point | Choix | Motif court |
| - | ----- | ----- | ----------- |
| A1 | Écran 2 — CTA | **1 CTA fort** + signal secondaire immersif *(pas 2 CTA → même écran)* | Évite le faux choix ; le sheet donne du contexte sans diluer l’intention |
| A2 | Écran 3 — Cadre | **Édition limitée** (catalogue), **pause lecture seule** | Sarah ajuste vraiment ses règles ; la pause reste figée et non recalculée |
| A3 | Écran 4 — Profondeur | **Choix réels sur rail** (mi-dos + mèches requis ; galerie sélectionnable) | Immersion par micro-choix ; transaction Inès reste mi-dos 150 € + mèches |
| A4 | Écran 5 — Planning | **Confirmer le planning** + apercevoir / sélectionner le créneau dérivé **15 août 9 h** | Planning réel ; 15 août = conséquence (rail Inès), pas une capacité |
| A5 | Écran 1 — Explicite parcours | **Arc actionnable** (verbes), sans spoiler montants / perles | Orienté mission, pas spoiler ; priorité basse honorée |

---

## Écran 1 — Démarrer la démonstration

| Élément           | Contenu                                                                                  |
| ----------------- | ---------------------------------------------------------------------------------------- |
| Objectif          | Présenter le scénario sans dévoiler toutes les réactions                                 |
| Titre             | « Testez une réservation complète »                                                      |
| Persona           | Inès, 27 ans, cherche des knotless braids pour le 15 août                                |
| Mission           | « Préparez votre offre, traitez sa demande et suivez le rendez-vous jusqu’au règlement » |
| Information       | Durée estimée : 12 à 15 minutes                                                          |
| Ce qu’elle verra  | **Valider** offre & planning → **Recevoir** une demande → **Engager** le rendez-vous → **Réaliser** la prestation → **Encaisser** et clôturer |
| Action principale | **Commencer**                                                                            |
| Nature            | Écran exclusivement réservé à la démo                                                    |

**Décision A5 — tranchée :** parcours en verbes d’action (immersion mission), sans spoiler la modification « perles » ni les montants d’Inès. La valeur à capter est la transaction sécurisée de bout en bout.

---

## Écran 2 — Tableau de bord de Sarah

Sarah arrive dans une application qui contient déjà un brouillon réaliste (chemin court).

| Zone                 | Contenu                                               |
| -------------------- | ----------------------------------------------------- |
| En-tête              | Bonjour Sarah                                         |
| Indicateur principal | « Votre activité n’est pas encore ouverte »           |
| Carte à traiter      | « Knotless braids moyen — configuration à terminer » |
| Résumé               | Prix, durée, lieu et galerie partiellement renseignés |
| Action principale    | **Finaliser ma prestation**                           |
| Signal secondaire    | Lien / chip « Qu’est-ce qui reste à faire ? » → **bottom sheet** (2–3 phrases) : ordre imposé règles → prestation → planning ; pas de second écran |

Contrairement au précurseur, il n’y a pas de dashboard « vide de cadre ». Ici Sarah finalise.

**Décision A1 — tranchée :** un seul CTA de navigation produit. Pas de second CTA « Consulter mes règles » qui mène au même écran 3 (faux choix). Le sheet immersif explique le prochain geste ; l’ordre reste règles → prestation → planning.

**Sortie :** entrée dans la validation accélérée (écran 3).

---

## Écran 3 — Règles générales de travail

Cet écran concerne les règles applicables à l’ensemble de son activité, et non une prestation particulière. En chemin court, Sarah **relit, ajuste (catalogue) et valide** un cadre déjà prérempli (équivalent allégé du précurseur).

| Bloc              | Valeur cible démo                      | Interaction |
| ----------------- | -------------------------------------- | ----------- |
| Retard toléré     | 15 minutes                             | Éditable (catalogue court : 10 / 15 / 20 min) |
| Annulation        | Définir ses règles d’annulation      | Éditable (choix catalogue) |
| Report            | Un report autorisé sous conditions     | Éditable (choix catalogue) |
| Accompagnants     | Non autorisés                          | Éditable (toggle / catalogue) |
| Pause (du cadre)   | 5 minutes toutes les heures            | **Lecture seule** — non modifiable en chemin court |
| Paiement du solde | À la fin de la prestation              | Éditable (catalogue court) |
| Communication     | Via la plateforme                      | Lecture / confirmé (canal plateforme) |
| Action principale | **Valider mes règles**                 | — |

**Décision A2 — tranchée :** édition limitée hors pause — Sarah sent qu’elle décide son cadre ; la pause reste figée (issue du cadre, rappelée à la cliente, **non recalculée** dans les durées de créneau). Les défauts ci-dessus sont les valeurs cibles ; toute variante catalogue reste compatible avec le scénario Inès.

**État produit :** `PROFESSIONAL_FRAMEWORK_ACTIVE` (confirmé / re-validé)

**Sortie :** cadre professionnel validé.

---

## Écran 4 — Configurer la prestation

### Titre

> Knotless braids moyen — formats de longueur

L’écran est organisé en sections courtes avec **micro-choix visibles** (cartes, toggles, sélection galerie). Alignement avec le modèle tarifaire du précurseur : **prix complets par longueur** + **option hors longueur** (mèches). Pour la transaction Inès, le format de la transaction reste **mi-dos 150 €** + **mèches +20 €**.

| Section               | Valeur cible démo                                      | Interaction (rail) |
| --------------------- | ------------------------------------------------------ | ------------------ |
| Résultat              | Knotless moyen · longueurs activées (réf. + mi-dos)   | — |
| Longueur de référence | Épaules — 120 € / 4 h *(aperçu barème)*                | Carte activable (optionnelle) |
| Format transaction    | **Mi-dos — 150 € / 5 h 30**                            | **Sélection / confirmation obligatoire** pour continuer ; prix & durée figés |
| Autres longueurs      | Ex. Taille — 180 € / 6 h 30 *(aperçu)*                 | Visibles, activables ; **non bloquantes** ; n’ouvrent pas une autre transaction démo |
| Option hors longueur  | Mèches fournies : +20 €                                | Toggle **activé requis** pour la démo Inès (budget 180 €) |
| Lieu                  | En salon à Saint-Denis                                 | Confirmé (prérempli) |
| Préparation           | Cheveux lavés et démêlés (plus de Niveau de service)   | Confirmé (prérempli) |
| Cliente doit préparer | Cheveux lavés et démêlés                               | Lu / confirmé |
| Limites               | Cuir chevelu sensible accepté       | Confirmé |
| Galerie               | Trois réalisations liées à cette prestation (min. 1)   | **Choix réel** : sélectionner ≥ 1 (cible 3) dans un pool knotless — pas de galerie figée non interactive |
| Action principale     | **Enregistrer la prestation**                          | Actif seulement si mi-dos + mèches + ≥ 1 image |

**Décision A3 — tranchée :** choix réels sur rail — Sarah active / confirme mi-dos, garde les mèches, et compose sa galerie. Les autres longueurs existent pour l’immersion « offre multi-formats » mais ne détournent pas le cas Inès. Pas de simple écran « tout figé + Continuer ».

La galerie appartient aux knotless braids, pas au portfolio général. **Pas de créneau ni d’activation planning** sur cet écran.

**État produit :** `OFFER_ACTIVE` (validée / re-validée)

**Sortie :** offre prête ; passage au planning (brouillon cohérent avec le cas Inès : mi-dos 150 € + mèches).

---

## Écran 5 — Confirmer le planning

Sarah **confirme son planning** (plages réelles) et aperçoit / sélectionne le créneau dérivé pour le rail Inès — ce n’est pas une « capacité » à ouvrir.

| Élément             | Valeur cible démo         | Interaction (rail) |
| ------------------- | ------------------------- | ------------------ |
| Jours ouvrés        | Mardi à samedi            | Confirmés (préremplis, ajustables catalogue) |
| Horaires            | 9 h – 18 h                | Confirmés |
| Lieu                | Salon, Saint-Denis        | Hérité / confirmé |
| Rendez-vous max. / jour    | 1 rendez-vous / jour      | Confirmée |
| Aperçu / liste      | Créneaux dérivés (ex. 14 / **15** / 16 août dès 9 h) | Cartes sélectionnables |
| Créneau démo        | **Samedi 15 août · 9 h**  | **Pré-sélectionné** ; seul créneau qui active le CTA et déclenche Inès |
| Hors rail           | Autres créneaux           | Visibles mais **désactivés** (« hors scénario démo ») — pas de fausse promesse |
| Durée bloquée       | 5 h 30 *(mi-dos)*         | Calculée / affichée |
| Prestation associée | Knotless braids moyen    | Affiché |
| Format concerné     | Mi-dos                    | Affiché |
| Note pause          | « Pause du cadre : 5 min / h — rappelée à la cliente, non ajoutée automatiquement » | Lecture |
| Aide                | Ce créneau découle de vos règles de planning — ce n’est pas une capacité | Lecture |
| Action principale   | **Activer mon planning**  | Après confirmation du créneau 15 août 9 h |

**Décision A4 — tranchée :** confirmer un planning réel + choix minimal immersif du créneau dérivé (tap) + rail strict — date/heure Inès figées au **15 août 9 h** ; pas d’édition libre calendrier ni d’objet `CAPACITY_OPEN`.

Après validation :

> « Vous pouvez maintenant recevoir des demandes. »

**État produit :** `SCHEDULE_ACTIVE`

Le bandeau passe à **Étape 4 sur 8**. Une demande simulée d’Inès est alors injectée.

**Sortie :** planning actif + invitation en attente d’examen.

---

# Acte B — Recevoir et traiter une opportunité

*Sarah **décide** vraiment sur l’opportunité (examiner, clarifier, refuser, valider la décision, envoyer l’offre), sans messagerie libre. Le rail Inès reste déterministe : réponses préparées, offre 170 € / 50 € / 15 août 9 h → happy path.*

### Décisions tranchées — Acte B *(critère : max immersion / valeur ressentie, rail déterministe conservé)*

| # | Point | Choix | Motif court |
| - | ----- | ----- | ----------- |
| B1 | Écran 6 — Invitation | **1 CTA fort** + signal secondaire immersif (« Pourquoi cette demande ? » → sheet critères) | Comme A1 ; critères lus sans faux score ni second écran |
| B2 | Écran 7 — Chemin dossier | **Précision requise** avant offre : « Préparer une proposition » **gated** jusqu’à demande enrichie | Force la valeur clarification ; photo manquante reste le nœud métier |
| B3 | Écran 7 — Refus | **Vrai geste** (motif structuré) + **récupération démo** (« Reprendre la demande d’Inès ») | Cul-de-sac ressenti, pas mort ; rail intact |
| B4 | Écran 8 — Clarification | **Sélection réelle de questions** (2 requises sur rail + 1 optionnelle) ; panneau, pas chat | Micro-choix visibles ; réponses Inès déterministes |
| B5 | Écran 9 — Décision + proposition | **Décision poids fort** (checklist + go) puis **offre confirmée sur rail** (montants/créneau figés) | Deux décisions immersives, un écran ; happy path Inès préservé |

---

## Écran 6 — Nouvelle demande

*Point d’entrée si enchaînement depuis le précurseur (écran 19 branche A de `3-storyboard-precurseur-cible.md`). Bandeau : **Étape 4 sur 8**.*

Sarah reçoit une notification puis accède à la rubrique « Demandes ».

### Carte de demande

> **Inès — Knotless braids moyen**
> Samedi 15 août à 9 h · Saint-Denis
> Budget maximum : 180 €

| Zone              | Contenu |
| ----------------- | ------- |
| Action principale | **Examiner la demande** |
| Signal secondaire | Lien / chip « Pourquoi cette demande ? » → **bottom sheet** : offre correspondante · créneau dérivé du planning · zone compatible · budget compatible · cuir chevelu sensible accepté |

L’interface ne dit pas « cliente idéale » ou « score 92 % » sans explication. Les critères sont dans le sheet (ou équivalent), pas en jargon opaque sur la carte.

**Décision B1 — tranchée :** un seul CTA de navigation produit. Le sheet immersif explique le matching ; pas de second CTA qui ouvre le même dossier.

**Objets :** `DEMAND_QUALIFIED` + invitation active.

**Sortie :** Sarah ouvre la demande (écran 7).

---

## Écran 7 — Demande d’Inès

Cet écran doit permettre à Sarah de **décider** sans parcourir des messages privés. Micro-choix visibles : trois gestes professionnels distincts.

| Bloc                  | Contenu                                      | Interaction |
| --------------------- | -------------------------------------------- | ----------- |
| Résultat souhaité     | Knotless moyen, longueur mi-dos            | Lecture |
| Inspiration           | Image sélectionnée par Inès                  | Lecture / aperçu |
| Cheveux et confort    | Cheveux naturels crépus, cuir chevelu sensible   | Lecture |
| Date et lieu          | 15 août, 9 h, Saint-Denis                    | Lecture |
| Budget                | Cible 170 €, maximum 180 €                   | Lecture |
| Fournitures           | Mèches souhaitées auprès de la coiffeuse     | Lecture |
| Tâches cliente        | Laver et démêler ses cheveux                 | Lecture |
| Ce qui compte pour elle | Confort du cuir chevelu                    | Lecture |
| Information manquante | **Aucune photo récente des cheveux** *(alerte)* | Signal fort tant que non enrichi |
| Compatibilité         | Pourquoi cette invitation (repris sheet écran 6) | Lecture / rappel |
| Chronologie           | Vide ou « Invitation reçue »                 | Mise à jour après clarification |

### Actions (trois gestes réels)

| Action | État rail démo | Effet |
| ------ | -------------- | ----- |
| **Demander une précision** | Toujours actif *(cible démo)* | Ouvre le panneau (écran 8) |
| **Préparer une proposition** | **Gated** tant que photo / précision manquantes ; actif après enrichissement | Va à l’écran 9 |
| **Refuser** | Toujours actif | Motif structuré obligatoire → récupération démo (ci-dessous) |

**Décision B2 — tranchée :** pas de bypass happy path sans clarification — « Préparer une proposition » reste visible mais désactivé (tooltip : « Une photo récente est requise pour décider si vous pouvez réaliser ») jusqu’à demande enrichie. Après l’écran 8, le CTA devient le chemin principal.

### Refus — vrai geste + récupération (B3)

1. Sarah choisit **Refuser** → panneau motif structuré (catalogue : créneau / budget / technique / autre) + confirmation.
2. L’invitation passe en refusée *(état local démo)* ; message clair : « Demande refusée — aucune proposition envoyée. »
3. **Récupération démo immédiate** (bandeau ou sheet protocole) :
   - **Reprendre la demande d’Inès** → restaure l’invitation / dossier (état avant refus) ;
   - *optionnel* Recommencer le scénario / Quitter.
4. Pas de cul-de-sac mort : sans « Reprendre », la liste Demandes peut sembler vide, mais le protocole propose toujours la reprise Inès.

**Décision B3 — tranchée :** le refus est un geste immersif testable (motif + conséquence), avec ramassage explicite pour ne pas casser la démo.

**Chemin cible :** Sarah choisit **Demander une précision**.

**Sortie :** panneau de clarification (écran 8). Aucun engagement ni paiement à ce stade.

---

## Écran 8 — Clarification avec la cliente

Un **panneau / bottom sheet** s’ouvre depuis le dossier, sans transformer le parcours en messagerie libre *(déjà décidé globalement)*.

### Sarah sélectionne les précisions *(choix réels, pas liste figée auto-envoyée)*

| Question | Interaction (rail) |
| -------- | ------------------ |
| Photo récente des cheveux | **Case à cocher — requise** pour activer le CTA |
| Allergies aux produits (optionnel) | **Case à cocher — requise** pour activer le CTA |
| Question complémentaire (catalogue court, ex. allergies produits) | **Optionnelle** — sélectionnable ; si cochée, réponse Inès déterministe courte (« Aucune allergie connue ») |

**Action principale :** `Envoyer la demande` — actif seulement si les **2 questions requises** sont cochées.

**Décision B4 — tranchée :** profondeur par sélection (comme A3 galerie) — Sarah compose sa demande de précision ; le simulateur répond toujours de façon déterministe sur le jeu requis (+ optionnelle si cochée). Pas d’envoi automatique d’un paquet figé sans geste ; pas de texte libre / chat.

Le simulateur affiche ensuite :

> « Inès consulte votre demande… »

Puis la réponse préparée apparaît :

> « Voici une photo récente. Je n’ai pas fait de défrisage depuis huit mois. »

*(Si question optionnelle cochée : ligne additionnelle déterministe.)*

La photo rejoint automatiquement le dossier. L’échange reste tracé dans la chronologie. Retour sur le demande enrichie : alerte « information manquante » levée ; **Préparer une proposition** devient actif.

**Action suivante :** `Préparer une proposition` *(ou équivalent → écran 9)* — depuis le panneau ou le demande enrichie.

**État / objet :** demande enrichie · preuves horodatées (question, réponse, document).

**Sortie :** demande enrichie, puis passage à l’écran 9.

---

## Écran 9 — Décision et proposition

*Regroupe l’évaluation de décision (poids fort, en tête) et la composition de l’offre — un seul écran pour tenir la durée, **deux décisions distinctes** en séquence. La zone offre reste **verrouillée / masquée** tant que la décision n’est pas validée.*

### 9a — Votre avis / Pouvez-vous réaliser ? *(poids fort — B5)*

Sarah ne « survole » pas un bandeau : elle **valide** des points techniques avant de composer.

| Point de contrôle | Contenu cible démo | Interaction |
| ----------------- | ------------------ | ----------- |
| Preuves reçues | Photo récente · pas de défrisage depuis 8 mois · texture crépue | Cases à confirmer (pré-cochables, **gesture requis** : tout confirmer) |
| Contrainte confort | Cuir chevelu sensible → cuir chevelu sensible | Toggle / case **Cuir chevelu sensible pris en compte** — requis |
| Synthèse | « Je peux réaliser cette demande dans ces conditions » | CTA **Je peux réaliser** — actif seulement si checklist complète |

**Refus technique** (depuis 9a) : même mécanique que B3 (motif structuré + **Reprendre la demande d’Inès**), sans offrir de proposition.

Tant que « Je peux réaliser » n’est pas validé, la section 9b n’est pas interactive.

### 9b — Proposition *(confirmation sur rail — B5)*

Montants, durée et créneau sont **préremplis et figés** pour le happy path Inès. Sarah **confirme** (toggles / relecture) et consulte l’aperçu cliente — pas d’édition libre qui casserait 170 € / 50 € / 15 août 9 h.

| Élément           | Proposition (rail)                     | Interaction |
| ----------------- | -------------------------------------- | ----------- |
| Prestation        | Knotless braids moyen, cuir chevelu sensible | Confirmé (hérite 9a) |
| Longueur          | Mi-dos                                 | Confirmé |
| Prix de base      | 150 €                                  | Lecture / figé |
| Mèches fournies   | 20 € *(option hors longueur)*          | Toggle **inclus** — requis (budget Inès) |
| Prix total        | 170 €                                  | Calculé / figé |
| Durée             | 5 h 30                                 | Lecture / figé |
| Créneau           | 15 août, 9 h                           | Confirmé |
| Lieu              | Salon, Saint-Denis                     | Confirmé |
| Tâche cliente     | Cheveux lavés et démêlés               | Confirmé |
| Tâche coiffeuse   | Fournir les mèches et le matériel      | Confirmé |
| Pause (rappel)    | 5 min / h — informatif, non facturée à part | Lecture |
| Versement initial | 50 €                                   | Lecture / figé |
| Validité          | 30 minutes                             | Lecture |
| Aperçu Inès       | Ce que la cliente verra                | Consultable (sheet / panneau) |

**Action principale :** `Envoyer la proposition` — actif après décision OK + mèches incluses + relecture.

**Décision B5 — tranchée :** décision = checklist immersive + go explicite (pas un bandeau cosmétique) ; offre = confirmation sur rail (comme A3/A4), aperçu Inès, hors-rail désactivé. Un écran, deux décisions.

Après l’envoi :

* `FIRM_PROPOSAL` est créé ;
* le créneau passe en `SOFT_HOLD` ;
* un compteur de validité apparaît.

Le bandeau passe à **Étape 6 sur 8**.

**Sortie :** offre envoyée ; attente réaction simulée (écran 10).

---

# Acte C — Former l’engagement et préparer le rendez-vous

*Sarah **constate** vraiment l’engagement (preuves consultables) et **prépare** vraiment (checklist cochable), sans piloter l’acceptation ni la checklist d’Inès. Le rail reste déterministe : Inès accepte / consent / paie 50 € puis complète sa checklist après validation Sarah ; compression vers le jour J par geste explicite.*

### Décisions tranchées — Acte C *(critère : max immersion / valeur ressentie, rail déterministe conservé)*

| # | Point | Choix | Motif court |
| - | ----- | ----- | ----------- |
| C1 | Écran 10 — Constater | **Preuves consultables** (consentement + paiement → sheets) + récap ; **pas** de CTA « Accepter pour Inès » | Haute valeur protection ; Sarah vérifie, Inès reste auto |
| C2 | Écran 10 — Séquence simulateur | **Séquence visible** (accepte → consent → paie) puis état `COMMITTED` | Immersion du constat sans usurper le rôle cliente |
| C3 | Écran 11 — Checklist Sarah | **Cases réellement cochables** (4) ; CTA gated ; raccourci « Tout cocher » secondaire | Micro-choix immersifs sans friction bloquante |
| C4 | Écran 11 — Checklist Inès | **Auto après validation Sarah**, avec remplissage visible | Asymétrie des rôles claire ; déterminisme intact |
| C5 | Compression temps → jour J | **Geste explicite** « Continuer la démonstration » *(pas d’auto-skip opaque)* | Sarah avance le temps ; Étape 7 sur 8 à l’entrée Acte D |

---

## Écran 10 — Proposition acceptée

*Bandeau : **Étape 6 sur 8**.*

Après l’envoi de l’écran 9, le simulateur enchaîne une **séquence visible** (déterministe, non cliquable par Sarah pour « faire » Inès) :

1. « Inès accepte la proposition V1 » ;
2. « Inès accepte les règles » (retard, annulation, préparation, pause rappelée) ;
3. « Versement initial de 50 € reçu ».

Puis l’écran de confirmation :

> **Rendez-vous confirmé avec Inès**

| Élément sécurisé   | Valeur | Interaction |
| ------------------ | ------ | ----------- |
| Version acceptée   | Proposition V1 | Consultable (aperçu / sheet offre acceptée) |
| Prix convenu       | 170 € | Lecture |
| Versement reçu     | 50 € | → **Voir la preuve de paiement** (sheet) |
| Solde prévisionnel | 120 € | Lecture |
| Créneau            | 15 août, 9 h — confirmé | Lecture |
| Consentement       | Enregistré | → **Voir le consentement** (sheet) |

### Preuves consultables *(C1)*

| Preuve | Contenu du sheet / panneau |
| ------ | -------------------------- |
| Consentement | Règles acceptées (retard, annulation, préparation, pause) · horodatage démo · « Accepté par Inès » |
| Paiement | 50 € · déjà payé / déduit sur le total 170 € · solde prévisionnel 120 € · référence / horodatage démo |
| Proposition V1 *(optionnel)* | Rappel de l’offre envoyée (écran 9) — lecture seule |

Sarah **ouvre** les preuves pour constater ; elle ne valide pas à la place d’Inès. Fermer un sheet ramène au récap `COMMITTED`.

**Décision C1 / C2 — tranchées :** profondeur par consultation (comme les sheets A1/B1), pas par usurpation du geste cliente. La séquence d’acceptation est montrée, puis les preuves restent ouvertes à la lecture.

**État produit :** `COMMITTED` · checklists de préparation créées en arrière-plan (`READINESS_PENDING`).

**Action principale :** `Préparer le rendez-vous` — actif dès que la séquence simulateur est terminée (consultation des preuves **recommandée mais non obligatoire** pour ne pas bloquer le rail).

**Sortie :** entrée préparation (écran 11).

---

## Écran 11 — Préparation du rendez-vous

L’écran présente deux checklists distinctes. État initial : `READINESS_PENDING`.

### Checklist Sarah *(cases réellement cochables — C3)*

| Point | Interaction |
| ----- | ----------- |
| Mèches disponibles | Case à cocher |
| Matériel préparé | Case à cocher |
| Poste de travail disponible | Case à cocher |
| Consignes particulières consultées (cuir chevelu sensible, cuir chevelu sensible) | Case à cocher — peut ouvrir un rappel court des consignes (sheet) |

| Zone | Contenu |
| ---- | ------- |
| Action principale | **Confirmer ma préparation** — **gated** tant que les 4 cases ne sont pas cochées |
| Signal secondaire | Lien / chip « Tout cocher » → coche les 4 cases *(confort, pas le chemin immersif principal)* |

**Décision C3 — tranchée :** micro-choix réels (comme B4/B5), pas un one-shot « Tout valider » qui masque la checklist. Le raccourci existe pour la durée de démo, en secondaire.

### Checklist Inès *(auto après validation Sarah — C4)*

Visible dès l’écran, **non coché** tant que Sarah n’a pas confirmé. Après **Confirmer ma préparation** :

1. animation / remplissage déterministe des cases Inès ;
2. message : « Inès a confirmé sa préparation. »

| Point Inès | Après validation Sarah |
| ---------- | ---------------------- |
| Cheveux lavés | Coché (simulateur) |
| Cheveux démêlés | Coché (simulateur) |
| Adresse et accès consultés | Coché (simulateur) |
| Rendez-vous reconfirmé | Coché (simulateur) |

Sarah ne coche pas pour Inès.

**Décision C4 — tranchée :** Inès reste auto ; le remplissage visible montre que le système sait si le rendez-vous est vraiment prêt.

L’état passe :

> `READINESS_PENDING` → `READY`

Résultat formulé clairement :

> « Toutes les conditions nécessaires sont satisfaites. »

### Compression temps vers le jour J *(C5)*

Après `READY`, un contrôle **explicite** du protocole de démo (pas un auto-skip opaque) :

| Zone | Contenu |
| ---- | ------- |
| Signal | « Le rendez-vous est le 15 août — la démo peut avancer au jour J. » |
| Action | **Continuer la démonstration** → compresse le temps → écran 12 |

**Décision C5 — tranchée :** geste immersif de compression (Sarah choisit d’avancer) ; le bandeau passe à **Étape 7 sur 8** à l’entrée de l’Acte D (écran 12), pas par saut invisible.

**Sortie :** geste « Continuer la démonstration » → demande du jour (écran 12).

---

# Acte D — Réaliser et coordonner la prestation

*Sarah **décide** vraiment pendant la réalisation (traiter l’événement, composer la modification, constater l’accord, qualifier la fin). Inès reste auto pour la demande de perles et l’acceptation V2. Rail figé : +10 € / +20 min → total 180 € / 5 h 50.*

### Décisions tranchées — Acte D *(critère : max immersion / valeur ressentie, rail déterministe conservé)*

| # | Point | Choix | Motif court |
| - | ----- | ----- | ----------- |
| D1 | Écran 13 — Événement perles | **Événement immersif** (sheet / modal interruptif) + actions ; **pas** un bandeau plat | Force le constat métier ; Sarah décide d’évaluer ou de refuser |
| D2 | Écran 14 — Composition | **Micro-choix réels sur rail** (supplément +10 € · durée +20 min requis) ; hors-rail désactivé | Elle compose vraiment ; montants V2 figés pour le simulateur |
| D3 | Écran 14 — Accord Inès | **Séquence visible** + **preuves V1/V2 consultables** *(pas de CTA « Accepter pour Inès »)* | Comme C1/C2 ; haute valeur protection / contestation |
| D4 | Écran 15 — Clôture | **Qualification réelle** (intégralement / partiel / résolution) ; happy path = intégralement + récupération si hors-rail | Sarah clôture en professionnelle ; démo non bloquée |

---

## Écran 12 — Demande du jour

*Bandeau : **Étape 7 sur 8**.* Après le geste « Continuer la démonstration » de l’écran 11, le jour du rendez-vous est simulé.

| Zone                | Contenu                               | Interaction |
| ------------------- | ------------------------------------- | ----------- |
| Cliente             | Inès                                  | Lecture |
| Heure prévue        | 9 h                                   | Lecture |
| Heure d’arrivée     | 8 h 57 *(déjà signalée)*              | Lecture |
| Prestation          | Knotless braids moyen · mi-dos       | Lecture |
| Prix convenu        | 170 €                                 | Lecture |
| Engagement          | V1 active                             | → **Voir l’engagement V1** (sheet lecture seule, offre acceptée) |
| Consignes sensibles | Cuir chevelu sensible, cuir chevelu sensible | Lecture / rappel |
| Préparation         | Complète (`READY`)                    | Lecture |
| Action principale   | **Commencer la prestation**           | CTA |
| Action secondaire   | Signaler un problème                  | Hors happy path démo |

Sarah démarre. Aucune demande de perles **avant** ce geste (D1 se joue à l’écran 13).

**État produit :** `IN_PROGRESS`

**Sortie :** prestation en cours (écran 13).

---

## Écran 13 — Prestation en cours

L’écran devient un écran opérationnel simplifié :

* heure réelle de début ;
* prestation convenue (V1) — consultable ;
* prix actuel (170 €) ;
* durée estimée (5 h 30) ;
* chronologie des événements (démarrage horodaté) ;
* bouton « Signaler un événement » *(secondaire)*.

### Événement perles *(immersif — D1)*

**Après** le démarrage (pas avant), un **sheet / modal interruptif** s’ouvre — pas un bandeau plat facilement ignoré :

> **Inès demande une modification**
> Ajouter des perles à la coiffure.
>
> L’engagement V1 reste actif jusqu’à ce qu’une modification soit acceptée.

| Action | Rôle | Effet |
| ------ | ---- | ----- |
| **Évaluer la modification** | *(cible démo)* | Ouvre la composition (écran 14) |
| **Refuser la modification** | Vrai geste | Motif structuré (catalogue) → message « Modification refusée — V1 inchangée » + **récupération démo** : *Reprendre l’évaluation* *(même logique que B3)* |

Sarah ne « fait pas » demander les perles à Inès : le simulateur les a déjà demandées ; elle décide comment traiter l’événement.

**Décision D1 — tranchée :** immersion par interruption + choix professionnel (évaluer / refuser), pas un toast ou bandeau secondaire. Le refus est testable avec ramassage pour préserver le rail vers V2 / Acte E.

**Sortie :** composition de la modification (écran 14).

---

## Écran 14 — Proposer une modification

La plateforme demande de rendre les conséquences explicites. V1 reste consultable ; V2 ne devient active qu’après accord d’Inès.

### Composition sur rail *(micro-choix — D2)*

Sarah **sélectionne** (elle ne reçoit pas un formulaire déjà figé en one-shot). Les valeurs hors happy path sont visibles mais **désactivées** (tooltip : hors scénario démo).

| Champ | Interaction (rail) | Valeur cible démo |
| ----- | ------------------ | ----------------- |
| Modification | Lecture (issue de la demande Inès) | Ajout de perles |
| Supplément | **Choix** dans une petite liste ; **+10 € requis** pour activer le CTA | +10 € |
| Durée supplémentaire | **Choix** dans une petite liste ; **+20 minutes requis** pour activer le CTA | +20 minutes |
| Nouveau total | Calculé / affiché (lecture) | **180 €** |
| Nouvelle durée | Calculée / affichée (lecture) | **5 h 50** |
| Motif | Catalogue court prérempli ou sélectionnable | Option demandée pendant la prestation |
| Engagement V1 | → **Voir V1** (sheet lecture seule) | 170 € · 5 h 30 |

Aperçu avant envoi : « Inès verra : +10 € · +20 min · nouveau total 180 €. »

| Zone | Contenu |
| ---- | ------- |
| Action principale | **Demander l’accord d’Inès** — **gated** tant que supplément +10 € et durée +20 min ne sont pas sélectionnés |

**Décision D2 — tranchée :** micro-choix immersifs comme A3/B5 ; pas de saisie libre qui casserait le simulateur (solde 130 €, frais, avis). Rail figé = +10 € / +20 min → 180 € / 5 h 50 *(aligné `2-exemple-concret.md` et storyboard source)*.

### Accord Inès + preuves *(D3 — comme C1/C2)*

Après l’envoi, le simulateur enchaîne une **séquence visible** (déterministe, non cliquable par Sarah pour « faire » Inès) :

1. « Inès consulte la proposition de modification » ;
2. « Inès accepte la modification (+10 € · +20 min) » ;
3. Horodatage démo : **11 h 18**.

Puis l’écran de confirmation :

> **Modification acceptée — engagement V2 actif**

| Élément sécurisé | Valeur | Interaction |
| ---------------- | ------ | ----------- |
| Demande cliente | Ajout de perles | → **Voir la demande** (sheet) |
| Proposition Sarah | +10 € · +20 min · total 180 € | → **Voir la proposition** (sheet) |
| Consentement Inès | Accepté à 11 h 18 | → **Voir le consentement** (sheet) |
| Engagement actif | **V2** | Lecture |
| Engagement archivé | V1 (170 € · 5 h 30) | → **Voir V1** (lecture seule) |

Sarah **ouvre** les preuves pour constater ; elle ne valide pas à la place d’Inès. Fermer un sheet ramène au récap V2.

**Décision D3 — tranchée :** profondeur par consultation (comme C1), séquence montrée (comme C2). Si Inès conteste les 10 € plus tard, Sarah a déjà vu où vivent les preuves.

| Zone | Contenu |
| ---- | ------- |
| Action principale | **Reprendre la prestation** — actif dès que la séquence simulateur est terminée (consultation des preuves **recommandée mais non obligatoire**) |

**Sortie :** prestation en cours avec totaux V2 (prix 180 € · durée 5 h 50), puis Sarah enchaîne vers la clôture (écran 15).

---

## Écran 15 — Terminer la prestation

En fin de réalisation, Sarah voit le résumé (lecture) :

* prestation initiale réalisée ;
* perles ajoutées (**V2**) — preuves encore consultables ;
* aucune interruption ;
* aucun incident ;
* durée réelle (alignée 5 h 50) ;
* prix final : **180 €**.

### Qualification de fin *(choix réel — D4)*

Sarah **choisit** explicitement (pas de clôture auto opaque) :

| Option | Rail démo | Effet |
| ------ | --------- | ----- |
| **Prestation réalisée intégralement** | *(cible démo)* | → `COMPLETED` · bandeau **Étape 8 sur 8** · écran 16 |
| Prestation réalisée partiellement | Vrai geste hors happy path | Message clair (clôture partielle) + **récupération** : *Clôturer intégralement pour la démo* |
| Déclencher une résolution | Vrai geste hors happy path | Entrée protocole incident / résolution *(branche)* + ramassage vers clôture intégrale ou « Tester un incident » |

**Décision D4 — tranchée :** la qualification est une décision professionnelle immersive (comme le refus B3) ; le happy path reste « intégralement » sans auto-skip. Les autres options ne tuent pas la démo grâce à la récupération.

**État produit :** `COMPLETED` *(après choix « intégralement »)*

Le bandeau passe à **Étape 8 sur 8** à l’entrée de l’Acte E (écran 16), cohérent avec le passage Étape 6 sur 8 → 4/5 à l’entrée de l’Acte D.

**Sortie :** règlement (écran 16).

---

# Acte E — Régler et prolonger la relation

*Sarah **constate** vraiment le règlement (preuves + détail frais), **lit et répond** vraiment à l’avis, **constate** la relation (favori / préférences) sans configurer hors démo, puis **clôture** la démo avec un retour utile. Rail figé : solde 130 € → `SETTLED` · frais 18 € (10 %) · net 162 € · avis Inès déterministe.*

*Bandeau : **Étape 8 sur 8** — posé à l’entrée de l’écran 16, après qualification « intégralement » à l’écran 15.*

### Décisions tranchées — Acte E *(critère : max immersion / valeur ressentie, rail déterministe conservé)*

| # | Point | Choix | Motif court |
| - | ----- | ----- | ----------- |
| E1 | Écran 16 — Règlement | **Séquence paiement visible** + **preuves / détail frais consultables** (sheets) ; montants figés 180 / 130 / 18 / 162 | Haute valeur transparence revenu ; pas un récap plat |
| E2 | Écran 17 — Avis | **Lecture + réponse réelle** (choix de ton / modèle sur rail, envoi confirmé) ; pas one-shot cosmétique | Sarah décide comment répondre ; avis Inès reste déterministe |
| E3 | Écran 17 — Relation | **Constat immersif** (sheet favori + fiche cliente lecture) ; **pas** de config préférences hors démo | Immersion du « client fidèle » sans sortir du rail |
| E4 | Écran 17 — Fin / retour | **Formulaire répondable allégé** (5 requises + 1 libre optionnelle) + **clôture claire** (merci / ce qu’elle a vu) | Utile recherche sans questionnaire interminable |

---

## Écran 16 — Règlement

*Bandeau : **Étape 8 sur 8**.*

Après la clôture « intégralement » (écran 15), le simulateur enchaîne une **séquence visible** (déterministe) :

1. « Imputation du versement initial de 50 € » ;
2. « Solde dû : 130 € » ;
3. « Inès règle les 130 € ».

Puis l’écran de confirmation sépare clairement le prix facturé du revenu de Sarah. Les montants de démo sont **explicites** (plus de « selon le modèle »).

| Élément                  | Montant | Interaction |
| ------------------------ | ------: | ----------- |
| Prestation initiale (V1) | 170 € | Lecture |
| Modification acceptée (V2) | 10 € | → **Voir l’engagement V2** (sheet, rappel) |
| Total final              | **180 €** | Lecture |
| Versement initial déjà payé / déduit | −50 € | Lecture |
| Solde réglé par Inès     | **130 €** | → **Voir la preuve de paiement** (sheet) |
| Frais de plateforme      | **18 € (10 %)** | → **Voir le détail des frais** (sheet) |
| Revenu net Sarah         | **162 €** | Lecture / mise en avant |

L’écran confirme :

> « Paiement terminé — aucune somme restante. »

### Preuves & détail frais consultables *(E1)*

| Preuve / panneau | Contenu |
| ---------------- | ------- |
| Preuve de paiement final | 130 € · déjà payé / déduit après 50 € · total 180 € · référence / horodatage démo · « Payé par Inès » |
| Détail des frais | Base 180 € · frais plateforme 10 % = 18 € · revenu net 162 € · mention que le modèle est figé pour la démo |
| Engagement V2 *(rappel)* | +10 € · +20 min · total 180 € · accepté 11 h 18 — lecture seule |

Sarah **ouvre** les preuves pour constater ; elle ne paie pas à la place d’Inès. Fermer un sheet ramène au récap `SETTLED`. Consultation **recommandée mais non obligatoire** pour ne pas bloquer le rail (comme C1/D3).

**Décision E1 — tranchée :** profondeur par consultation (preuves + frais), pas un récap plat. Rail montants inchangé : 180 € · solde 130 € · frais 18 € · net 162 €.

**État produit :** `SETTLED`

**Action principale :** `Voir l’avis et la suite` — actif dès que la séquence simulateur est terminée.

**Sortie :** avis / relation (écran 17).

---

## Écran 17 — Avis, relation (+ fin / retour)

*Fusion des anciens écrans 17 (avis) et 18 (fin de démonstration).*

### 17a — Avis *(lecture + réponse réelle — E2)*

Après le règlement, l’avis simulé d’Inès est **affiché pour être lu** (pas un toast jetable) :

| Dimension                    | Évaluation |
| ---------------------------- | ---------- |
| Résultat technique           | 5/5        |
| Communication                | 5/5        |
| Ponctualité                  | 5/5        |
| Conformité du prix           | 5/5        |
| Confort                      | 4/5        |
| Résolution des modifications | 5/5        |

Commentaire (déterministe) :

> « Sarah a bien pris en compte mon cuir chevelu sensible et m’a expliqué le supplément avant d’ajouter les perles. »

**Action principale :** `Répondre à l’avis` — ouvre un sheet de réponse (pas un one-shot cosmétique).

#### Réponse sur rail *(E2)*

Sarah **choisit** un ton / modèle, peut ajuster légèrement le texte, puis envoie :

| Ton (choix requis) | Modèle proposé (éditable court) |
| ------------------ | -------------------------------- |
| **Remerciement chaleureux** *(cible démo suggérée)* | « Merci Inès — ravie que le confort et la transparence sur les perles aient compté. À bientôt ! » |
| Professionnel | « Merci pour votre avis. Au plaisir de vous accueillir de nouveau. » |
| Court | « Merci pour votre retour, Inès. » |

| Action | Effet |
| ------ | ----- |
| **Envoyer la réponse** | Réponse attachée à l’avis · confirmation visible « Réponse envoyée » · état local `REVIEW_REPLIED` |
| Modifier avant envoi | Texte court libre **borné** (ex. 280 car.) sur la base du modèle choisi — reste sur le rail démo |

Pas de réponse Inès en retour (démo) ; l’immersion est le geste professionnel de Sarah. Sans envoi, elle peut quand même ouvrir la fiche ou terminer, mais le parcours nominal attend la réponse.

**Décision E2 — tranchée :** lire + répondre vraiment (ton / modèle + envoi confirmé) ; l’avis Inès reste figé (notes + commentaire). Pas de bouton cosmétique qui « fake » l’envoi sans contenu.

### 17b — Relation *(constat immersif — E3)*

**Après** l’envoi de la réponse (ou en parallèle consultable sur l’écran), un **sheet / panneau immersif** — pas un bandeau plat secondaire :

> **Inès vous a ajoutée à ses favorites**
>
> Elle consent à mémoriser ses préférences (cuir chevelu sensible, cuir chevelu sensible, mi-dos + mèches) et pourra reprendre cette prestation depuis son historique.

| Action | Effet |
| ------ | ----- |
| **Voir la fiche cliente** | Historique du RDV · préférences mémorisées · statut favorite — **lecture seule** |
| Fermer | Retour à l’écran 17 avec les actions de clôture |

Sarah **constate** ; elle ne configure pas les préférences d’Inès ni un programme fidélité hors démo.

**Décision E3 — tranchée :** immersion par constat (sheet + fiche), comme les preuves C1/E1. Pas de bandeau ignoré ; pas de formulaire de préférences à remplir par Sarah.

| Élément              | Contenu |
| -------------------- | ------- |
| Action principale    | **Répondre à l’avis** *(puis confirmation)* |
| Action alternative A | **Voir la fiche cliente** |
| Action alternative B | **Donner mon avis sur cette étape** |
| Action alternative C | **Tester un incident** *(branche protocole)* |

### Branche A — Continuer dans le produit

« Voir la fiche cliente » montre l’historique / préférences mémorisées (lecture), puis propose à nouveau **Donner mon avis sur cette étape** ou **Recommencer le scénario**.

### Branche B — Terminer *(formulaire allégé — E4)*

« Donner mon avis sur cette étape » ouvre un **formulaire de retour répondable** (sheet / modal du protocole de test). Sarah répond réellement, puis enregistre — ce n’est plus de la lecture seule.

#### Ce qu’elle a vu *(résumé de clôture)*

> Vous avez reçu une demande structurée, obtenu une précision, sécurisé une proposition, préparé le rendez-vous, fait accepter une modification, reçu le règlement final (**180 €** · net **162 €**) et répondu à l’avis d’Inès.

#### Questions (5 requises + 1 optionnelle)

| # | Question | Type | Obligatoire |
| - | -------- | ---- | ----------- |
| 1 | La demande contenait-elle assez d’informations pour décider ? | Oui / Partiellement / Non | Oui |
| 2 | Le prix, le versement initial, le solde et votre revenu net étaient-ils clairs ? | Oui / Partiellement / Non | Oui |
| 3 | La checklist et la preuve de modification (perles) vous auraient-elles protégée en vrai ? | Oui / Partiellement / Non | Oui |
| 4 | Utiliseriez-vous ce fonctionnement avec une vraie cliente ? | Oui / Mitigé / Non | Oui |
| 5 | À quel moment le parcours vous a-t-il paru artificiel ? | Texte libre court | Oui |
| 6 | Commentaire libre | Texte libre | Non |

*(Les anciennes questions « qu’auriez-vous demandé par message » et « pourquoi cette demande » restent utiles en observation à voix haute ; elles ne bloquent plus l’enregistrement pour limiter la friction.)*

#### Actions du panneau

1. `Enregistrer mon retour` → persistance locale du feedback · confirmation
2. **Écran / panneau de merci** :
   > Merci d’avoir testé le parcours Sarah / Inès.
   > Vous avez parcouru les 5 scènes : offre & planning → opportunité → engagement → réalisation → règlement & relation.
3. Puis : `Recommencer le scénario` · `Tester un incident` · `Fermer`

Sans enregistrement, le retour n’est pas considéré comme collecté. Sarah peut `Fermer` sans enregistrer (protocole le note comme non collecté).

**Décision E4 — tranchée :** formulaire répondable et utile (5 + 1), pas les 9 questions d’origine en bloc ; clôture explicite (merci + ce qu’elle a vu) pour que la fin de démo soit nette.

### Branche C — Incident

« Tester un incident » charge une variante déterministe (ex. retard / interruption) sans quitter le protocole de démo ; hors parcours nominal documenté ici.

---

## Enchaînement fonctionnel final

| Écrans  | Décision principale de Sarah           | Réaction simulée d’Inès              | État obtenu          |
| ------- | -------------------------------------- | ------------------------------------ | -------------------- |
| 1 à 2   | Entrer · finaliser (1 CTA + sheet)     | Aucune                               | Intention de démarrage |
| 3 à 5   | Éditer cadre (hors pause) · choisir offre/galerie · activer planning (créneau dérivé 15/08 9 h) | Demande injectée | `SCHEDULE_ACTIVE` |
| 6 à 8   | Examiner (1 CTA + sheet) · clarifier (sélection questions) · refus récupérable | Précisions fournies (déterministes) | Demande enrichie     |
| 9       | Checklist décision + confirmer offre sur rail | — (attente) puis acceptation à l’écran 10 | `FIRM_PROPOSAL` + `SOFT_HOLD` |
| 10      | Constater preuves (sheets) → préparer  | Séquence accepte + consent + 50 €     | `COMMITTED`          |
| 11      | Cocher checklist · confirmer · Continuer la démo | Checklist Inès auto puis jour J | `READY` → Étape 7 sur 8  |
| 12      | Démarrer (+ V1 consultable)            | Arrivée déjà signalée                | `IN_PROGRESS`        |
| 13 à 14 | Traiter événement · composer sur rail · constater preuves V2 | Demande perles puis accepte V2 | Engagement V2        |
| 15      | Qualifier la fin (intégralement)       | — (puis solde à l’écran 16)          | `COMPLETED` → Étape 8 sur 8 |
| 16      | Constater règlement (preuves + frais)  | Solde 130 € payé (séquence visible)  | `SETTLED` · net 162 € |
| 17      | Lire avis · répondre (ton) · constater favori · enregistrer retour | Avis + favori / préférences | Relation réactivable · `REVIEW_REPLIED` · feedback collecté |

## Correspondance avec le cas métier

| Activités `2-exemple-concret.md` | Écrans |
| -------------------------------- | ------ |
| Histoire A — Valider règles      | 3      |
| Histoire A — Vérifier prestation / prix / galerie → `OFFER_ACTIVE` | 4 |
| Histoire A — Confirmer planning + créneau dérivé → `SCHEDULE_ACTIVE` | 5 |
| Histoire B — Invitation & examen | 6–7 |
| Histoire B — Clarification       | 8      |
| Histoire B — Décision + `FIRM_PROPOSAL` | 9 |
| Histoire C — Acceptation, consentement, acompte | 10 |
| Histoire C — Checklists → `READY` | 11 |
| Histoire D — Démarrage           | 12–13  |
| Histoire D — Modification perles | 13–14  |
| Histoire D — Clôture `COMPLETED` | 15     |
| Histoire E — Règlement `SETTLED` | 16 (preuves + frais 18 € / net 162 €) |
| Histoire E — Avis & relation     | 17 (réponse réelle + favori immersif) |
| Retour de démo collecté          | 17 (branche Terminer — formulaire allégé + merci) |

## Correspondance avec le storyboard initial

| `3-storyboard.md` | Ce fichier |
| ----------------- | ---------- |
| 1 → 16            | 1 → 16 (intention conservée ; contenu rectifié) |
| 8                 | 8 (panneau + sélection réelle de questions, pas messagerie) |
| 9                 | **9** (décision checklist poids fort + proposition sur rail) |
| 10                | **10** (séquence Inès visible + preuves consentement/paiement consultables) |
| 11                | **11** (checklist Sarah cochable · Inès auto · Continuer la démo → jour J) |
| 12                | **12** (Étape 7 sur 8 · V1 consultable · démarrer) |
| 13                | **13** (événement perles immersif · évaluer / refuser récupérable) |
| 14                | **14** (micro-choix +10 € / +20 min · séquence Inès + preuves V1/V2) |
| 15                | **15** (qualification de fin réelle · Étape 8 sur 8 à l’entrée Acte E) |
| 16                | **16** (séquence paiement + preuves / détail frais 18 € · net 162 €) |
| 17 + 18           | **17** (avis + réponse réelle · favori immersif · formulaire allégé + merci) |

## Matrice de validation (synthèse §1)

| Écran | Décision Sarah | Indispensable ? | Décision |
| ----- | -------------- | --------------- | -------- |
| 1 Démarrer | Entrer dans le test | Oui (protocole) | **Garder** — arc en verbes (A5) |
| 2 Dashboard | Choisir de finaliser | Oui | **Garder** — 1 CTA + sheet (A1) |
| 3 Règles | Ajuster (catalogue) + valider le cadre | Oui (chemin court) | **Garder** — édition limitée, pause lecture (A2) |
| 4 Prestation | Choisir/confirmer mi-dos + mèches + galerie | Oui | **Garder** — choix réels sur rail (A3) |
| 5 Planning | Confirmer planning + sélectionner créneau dérivé 15/08 9 h | Oui | **Garder** — planning réel + rail (A4) |
| 6 Opportunité | Examiner l’invitation | Oui | **Garder** — 1 CTA + sheet critères (B1) |
| 7 Demande | Précision / offre gated / refus récupérable | Oui | **Garder** — précision requise (B2) · refus immersif (B3) |
| 8 Clarification | Sélectionner & envoyer questions | Oui | **Garder** — panneau, choix réels (B4) |
| 9 Décision + proposition | Checklist décision puis offre sur rail | Oui | **Garder** — fusion 2 micro-étapes, poids fort (B5) |
| 10 Acceptation | Constater preuves (sheets) → préparer | Oui | **Garder** — séquence visible + preuves consultables (C1/C2) |
| 11 Préparation | Cocher checklist · confirmer · Continuer la démo | Oui | **Garder** — cases réelles (C3) · Inès auto (C4) · compression explicite (C5) |
| 12 Jour J | Démarrer (+ V1 consultable) | Oui | **Garder** — après geste Continuer (Étape 7 sur 8) |
| 13 En cours | Traiter l’événement perles | Oui | **Garder** — événement immersif (D1) · refus récupérable |
| 14 Modification | Composer sur rail puis constater accord | Oui (différenciant) | **Garder** — micro-choix +10 € / +20 min (D2) · séquence + preuves V1/V2 (D3) |
| 15 Clôture | Qualifier la fin | Oui | **Garder** — choix réel intégralement (D4) · Étape 8 sur 8 |
| 16 Règlement | Constater solde, preuves & net | Oui | **Garder** — séquence + preuves / frais consultables (E1) · 180 / 130 / 18 / 162 |
| 17 Avis + fin | Répondre · constater relation · collecter le retour | Oui | **Fusionner 17+18** — réponse réelle (E2) · favori immersif (E3) · formulaire allégé + merci (E4) |

## Relation avec le précurseur

| Parcours | Storyboard | Point d’entrée / sortie |
| -------- | ---------- | ----------------------- |
| Transaction seul (chemin court) | Ce document | Écran 1 → Écran 17 |
| Précurseur puis transaction | `3-storyboard-precurseur-cible.md` puis ce document | Précurseur écran 19 « Continuer vers une demande » → **Écran 6** ici |
| Précurseur seul | `3-storyboard-precurseur-cible.md` | Sans Inès |

## Chorégraphie du simulateur (cible)

| Déclencheur réel (Sarah)     | Réaction simulée (Inès)            | Effet produit         |
| ---------------------------- | ---------------------------------- | --------------------- |
| Active son planning (écran 5) → `SCHEDULE_ACTIVE` | Demande injectée          | Invitation créée      |
| Envoie une précision (8) — questions requises cochées | Photo (+ allergies si cochée) | Demande enrichie · CTA offre débloqué |
| Valide décision (9a)      | —                                  | Section offre débloquée |
| Envoie la proposition (9b)   | Séquence visible : accepte + consent + paie 50 € | `COMMITTED` (écran 10) · preuves consultables |
| Refuse (7 ou 9a)             | —                                  | État refusé local + **Reprendre la demande d’Inès** |
| Coche & confirme sa checklist (11) | Remplit sa checklist (visible) | `READY` |
| Continuer la démonstration (11) | — (compression temps)            | Entrée jour J · Étape 7 sur 8 · écran 12 |
| Commence la prestation (12)  | Demande des perles (événement immersif sur 13) | Modification proposée |
| Refuse la modification (13)  | —                                  | V1 inchangée + **Reprendre l’évaluation** |
| Compose & demande l’accord (14) — +10 € / +20 min sélectionnés | Séquence visible : consulte → accepte V2 (11 h 18) | Engagement V2 · preuves consultables |
| Qualifie « intégralement » (15) | — (compression vers règlement)   | `COMPLETED` · Étape 8 sur 8 · écran 16 |
| Arrive au règlement (16)     | Séquence visible : déduit 50 € → solde 130 € → paie · publie l’avis | `SETTLED` · preuves / frais consultables · net 162 € |
| Lit & répond à l’avis (17) — ton / modèle envoyé | — (avis déjà publié) ; puis favori + préférences | `REVIEW_REPLIED` · relation réactivable (fiche lecture) |
| Enregistre son retour (17 — Terminer) | —                                | Feedback collecté · clôture merci |

Le principe directeur reste : un écran n’existe que s’il aide Sarah à comprendre une situation, prendre une décision professionnelle ou vérifier une preuve. Les réactions d’Inès font progresser le scénario, mais ne retirent jamais à Sarah une décision que la démo cherche à tester.
