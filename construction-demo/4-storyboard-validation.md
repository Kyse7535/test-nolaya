Une fois le storyboard validé, la suite consiste à le transformer en **prototype autonome testable par une coiffeuse**. Il ne faut pas encore développer la plateforme réelle.

L’enchaînement recommandé est le suivant :

## 1. Valider le storyboard métier

Avant de dessiner les interfaces, vérifier pour chaque écran :

* quelle décision la coiffeuse doit prendre ;
* quelle valeur on veut lui démontrer ;
* quelle hypothèse on veut tester ;
* quelle action cliente doit être simulée ;
* quel objet ou état métier est produit ;
* si l’écran est réellement indispensable.

Cette étape peut conduire à réduire les 18 écrans ou à fusionner certaines scènes.

## 2. Spécifier chaque écran

Le storyboard dit **ce qui se passe**. Il faut maintenant préciser **comment l’écran fonctionne**.

Pour chaque écran, documenter :

| Élément               | Question                                             |
| --------------------- | ---------------------------------------------------- |
| Données d’entrée      | Quelles informations existent à l’arrivée ?          |
| Informations visibles | Que doit comprendre immédiatement la coiffeuse ?     |
| Décision attendue     | Que doit-elle choisir ou vérifier ?                  |
| Actions disponibles   | Que peut-elle faire ?                                |
| Règles métier         | Qu’est-ce qui est obligatoire, interdit ou calculé ? |
| Réaction simulée      | Que fait automatiquement Inès ?                      |
| État de sortie        | Dans quel état passe la demande ?                    |
| Écran suivant         | Où conduit chaque action ?                           |

Par exemple :

> Sarah envoie une demande de précision → le simulateur fournit la photo d’Inès → la photo rejoint le dossier → Sarah peut décider si vous pouvez réaliser.

## 3. Produire les wireframes basse fidélité

On dessine ensuite la structure réelle des écrans :

* hiérarchie des informations ;
* emplacement des actions ;
* navigation ;
* formulaires ;
* synthèses ;
* alertes ;
* preuves ;
* chronologie des événements.

À ce stade, on travaille en noir et blanc. L’objectif n’est pas encore d’avoir une belle interface, mais de vérifier que la coiffeuse comprend rapidement :

* ce qui se passe ;
* ce qu’elle doit décider ;
* les conséquences de son choix ;
* ce que la plateforme protège.

## 4. Concevoir le moteur de démonstration

Comme il s’agit d’une marketplace à deux acteurs, il faut spécifier la mécanique qui rend la démo autonome :

* données initiales de Sarah et Inès ;
* réactions clientes préparées ;
* déclencheurs de ces réactions ;
* délais artificiels éventuels ;
* notifications ;
* transitions d’états ;
* commandes « Continuer », « Recommencer » et « Tester un incident » ;
* réinitialisation complète du scénario.

Le simulateur doit être déterministe : une même action de Sarah produit la même réaction d’Inès.

## 5. Construire le prototype cliquable

Les wireframes sont reliés pour obtenir un parcours interactif :

* Sarah définit son cadre ;
* configure sa prestation ;
* reçoit une demande ;
* demande une précision ;
* produit une proposition ;
* constate l’acceptation et le paiement ;
* prépare le rendez-vous ;
* gère une modification ;
* clôture la prestation ;
* constate son règlement.

Le prototype peut être réalisé avec Figma ou directement sous forme d’application front-end si la rapidité de développement avec l’IA rend cette option plus efficace.

## 6. Effectuer un test interne

Avant de le présenter aux coiffeuses, il faut vérifier :

* qu’aucune scène ne bloque ;
* que les réactions d’Inès arrivent au bon moment ;
* que les montants et états sont cohérents ;
* qu’une utilisatrice peut comprendre le parcours sans explication permanente ;
* que la démonstration tient dans la durée prévue ;
* que le scénario peut être recommencé.

## 7. Préparer le protocole de test terrain

Le prototype n’est pas seulement destiné à montrer l’idée. Il doit produire des preuves.

Pour chaque scène, définir ce que l’on souhaite observer :

| Scène               | Hypothèse testée                                       |
| ------------------- | ------------------------------------------------------ |
| Cadre professionnel | La coiffeuse peut formaliser ses règles générales      |
| Demande qualifiée   | Les informations réduisent les échanges en DM          |
| Proposition ferme   | Elle peut s’engager sans perdre son autonomie          |
| Versement initial   | Le mécanisme financier lui paraît clair et protecteur  |
| Checklist           | Elle permet réellement de préparer le rendez-vous      |
| Modification        | Le consentement tracé protège son temps et son revenu  |
| Règlement           | Le calcul du solde et du revenu net est compréhensible |

Il faut privilégier l’observation et demander à la coiffeuse de penser à voix haute, plutôt que de lui expliquer comment utiliser chaque écran.

## 8. Tester, analyser et corriger

Après chaque test, relever :

* les incompréhensions ;
* les informations manquantes ;
* les actions hésitantes ;
* les étapes jugées inutiles ;
* les éléments perçus comme protecteurs ;
* les situations réelles non couvertes ;
* les objections à l’adoption.

Le storyboard, le prototype et même le processus métier peuvent alors être corrigés.

## 9. Définir le véritable MVP

Ce n’est qu’après les tests que l’on transforme les résultats en périmètre de développement :

* fonctionnalités indispensables ;
* fonctionnalités à simplifier ;
* automatisations réellement utiles ;
* règles métier confirmées ;
* éléments à gérer manuellement pendant le pilote ;
* fonctionnalités à reporter.

La chaîne complète devient donc :

> Domain Storytelling → storyboard → spécification des interactions → wireframes → simulation cliente → prototype autonome → tests coiffeuses → apprentissages → périmètre MVP → développement.

La prochaine étape immédiate est donc de créer la **fiche fonctionnelle détaillée de chaque écran**, puis les wireframes. Le développement ne vient qu’après avoir vérifié que le scénario teste les bonnes décisions métier.



Mais il ne faut pas traiter les écrans isolément. Le plus efficace est de travailler par scène métier.

## Étape immédiate — Spécifier l’acte A

Nous commençons par le véritable début du processus :

> Définir le cadre professionnel → configurer une prestation → activer le planning.

Pour cette première scène, il faut produire :

1. la fiche fonctionnelle de chaque écran ;
2. les règles métier ;
3. les données préremplies pour Sarah ;
4. les actions et validations ;
5. les états produits ;
6. les wireframes basse fidélité ;
7. les critères de test.

Les écrans concernés sont :

* règles générales de travail ;
* configuration de la prestation ;
* galerie de présentation ;
* confirmation du planning (créneaux dérivés, dont 15 août 9 h) ;
* confirmation de `SCHEDULE_ACTIVE`.

## Puis avancer acte par acte

| Acte | Travail à spécifier                   | Résultat                 |
| ---- | ------------------------------------- | ------------------------ |
| A    | Cadre, offre et planning              | `SCHEDULE_ACTIVE`        |
| B    | Demande, clarification et proposition | `FIRM_PROPOSAL`          |
| C    | Engagement et préparation             | `COMMITTED` puis `READY` |
| D    | Réalisation et modification           | `COMPLETED`              |
| E    | Règlement, avis et historique         | `SETTLED`                |

## Après les écrans : spécifier le simulateur

Lorsque les fiches et wireframes sont terminés, nous construisons une matrice des réactions d’Inès :

| Déclencheur réel             | Réaction simulée           | Effet produit         |
| ---------------------------- | -------------------------- | --------------------- |
| Sarah active son planning (`SCHEDULE_ACTIVE`) | La demande d’Inès apparaît | Invitation créée |
| Sarah demande une précision  | Inès fournit sa photo      | Demande enrichie       |
| Sarah envoie sa proposition  | Inès accepte et paie 50 €  | `COMMITTED`           |
| Sarah valide sa préparation  | Inès complète sa checklist | `READY`               |
| Sarah commence la prestation | Inès demande des perles    | Modification proposée |
| Sarah demande son accord     | Inès accepte               | Engagement V2         |
| Sarah termine                | Inès règle le solde        | `SETTLED`             |

Cette matrice devient ensuite la logique du prototype autonome.

## Ensuite seulement : construire le prototype

La séquence complète est donc :

> Spécifications fonctionnelles complètes → wireframes → chorégraphie du simulateur → prototype cliquable → test interne → test avec des coiffeuses.

La prochaine action concrète est donc de produire la fiche fonctionnelle et le wireframe de l’écran **« Définir mon cadre professionnel »**, puisque c’est la première décision métier du parcours. Après validation, nous passons à la configuration de la prestation, puis à l’activation du planning.
