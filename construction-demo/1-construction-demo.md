Je construirais le Domain Storytelling de la démo coiffeuse en partant du processus métier réel des étapes 0 à 8, puis en ajoutant une couche explicite de simulation. L’objectif n’est pas de réécrire le métier, mais de rendre la transaction autonome pour une coiffeuse seule devant la démo.

## 1. Définir le contrat de la démo

Avant d’écrire l’histoire, je fixerais :

* la transformation que la coiffeuse doit comprendre ;
* les décisions qu’elle doit prendre elle-même ;
* les interventions clientes qui seront simulées ;
* la durée cible de la démonstration ;
* le point de départ et le point d’arrivée ;
* les apprentissages que l’on veut recueillir.

Exemple de finalité :

> Permettre à une coiffeuse de recevoir une demande exploitable, de décider si elle peut la réaliser, de sécuriser l’accord, de préparer et suivre la prestation, puis de constater son règlement et les suites de la relation.

## 2. Séparer les quatre rôles

Le Domain Storytelling utilisera une légende stricte :

| Rôle               | Fonction dans la démo                                                 |
| ------------------ | --------------------------------------------------------------------- |
| Coiffeuse          | Personne réelle qui teste et prend les décisions                      |
| Cliente fictive    | Persona métier auquel appartiennent les besoins et décisions clientes |
| Simulateur cliente | Exécute automatiquement les interventions de la cliente fictive       |
| Plateforme         | Coordonne, contrôle les règles et conserve les preuves                |

Cette distinction évite de faire croire que la plateforme prend elle-même les décisions de la cliente.

## 3. Construire une matrice des étapes 0 à 8

Pour chaque étape de `03-Refonte-processus-metier-fondee-terrain.md`, je relèverais :

| Élément analysé      | Question                                                     |
| -------------------- | ------------------------------------------------------------ |
| Décision métier      | Quelle question doit être résolue ?                          |
| Action coiffeuse     | Que fait réellement la testeuse ?                            |
| Intervention cliente | Quelle réaction extérieure est nécessaire ?                  |
| Mode de simulation   | Quand et comment cette réaction est-elle produite ?          |
| Objet métier         | Demande, proposition, engagement, checklist, paiement, avis… |
| État d’entrée        | Dans quel état commence la scène ?                           |
| État de sortie       | Quel changement valide la progression ?                      |
| Valeur démontrée     | Qu’est-ce que la coiffeuse doit comprendre ou ressentir ?    |

Cette matrice constituera l’ossature du futur Domain Storytelling.

## 4. Choisir un cas métier concret

Le scénario principal devra reposer sur une transaction réaliste et précise, par exemple :

* une cliente identifiée ;
* une prestation donnée ;
* des photos ou inspirations ;
* une date et un lieu ;
* un budget ;
* des contraintes capillaires ;
* une répartition des tâches ;
* des fournitures ;
* des règles de retard et d’annulation ;
* un prix et un versement initial.

Il ne faut pas écrire une histoire générique du type « la coiffeuse traite une demande ». Chaque objet manipulé doit être concret.

## 5. Découper le parcours en cinq histoires

Je ne mettrais pas tout dans un diagramme géant. Je préparerais cinq Domain Stories reliées par leurs états de sortie.

### Histoire A — Valider offre et planning *(chemin court)*

* cadre professionnel général ;
* création ou activation d’une prestation (offre) ;
* galerie de présentation ;
* règles, prix, durée, lieux et fournitures ;
* planning (jours, horaires, limite de charge) — créneaux dérivés ;
* sortie : `SCHEDULE_ACTIVE` (avec cadre + offre actifs).

Pour la **création réelle** cadre → prestations → planning, voir le précurseur (`2-precurseur-cadre-prestations-planning.md`). Ici, la cliente n’intervient pas encore.

### Histoire B — Recevoir et traiter une opportunité

* création simulée d’une demande cliente qualifiée ;
* matching et invitation ;
* consultation de la demande ;
* demande éventuelle de précision ;
* réponse simulée de la cliente ;
* validation, modification ou refus ;
* production d’une proposition ferme ;
* sortie : `FIRM_PROPOSAL`.

### Histoire C — Former l’engagement et préparer le rendez-vous

* acceptation simulée de la proposition ;
* consentement aux conditions ;
* versement initial simulé ;
* formation de l’engagement ;
* préparation des checklists ;
* réalisation simulée des tâches clientes ;
* signalement éventuel d’un élément manquant ;
* sortie : `COMMITTED`, puis `READY`.

### Histoire D — Réaliser et coordonner la prestation

* arrivée simulée de la cliente ;
* démarrage par la coiffeuse ;
* suivi des tâches et événements importants ;
* modification éventuelle du périmètre ;
* consentement simulé de la cliente ;
* adaptation du prix ou de la durée ;
* fin de la prestation ;
* sortie : `COMPLETED` ou `PARTIALLY_COMPLETED`.

### Histoire E — Régler et prolonger la relation

* calcul du solde ;
* paiement final simulé ;
* allocation des montants ;
* preuve du paiement ;
* clôture financière ;
* avis multidimensionnel simulé ;
* réponse éventuelle de la coiffeuse ;
* historique et possibilité de reprise ;
* sortie : `SETTLED`, puis relation réactivable.

## 6. Écrire d’abord le scénario principal

Je commencerais par un seul parcours nominal complet :

> Demande compatible → précision obtenue → proposition ferme → acceptation → paiement initial → préparation complète → prestation réalisée → solde payé → avis positif.

Chaque action serait numérotée et formulée ainsi :

> Acteur + activité métier + objet de travail + destinataire éventuel.

À ce stade, je ne parlerais pas encore d’écrans, de boutons ou de composants.

## 7. Ajouter des histoires alternatives ciblées

Après le parcours nominal, je créerais des histoires séparées pour les situations qui démontrent réellement la protection de la coiffeuse :

1. information cliente insuffisante ;
2. cliente proposant une modification ;
3. tâche de préparation cliente non réalisée ;
4. retard ou absence ;
5. modification du périmètre pendant la prestation ;
6. annulation ou report ;
7. prestation partielle ;
8. contestation financière.

Une histoire Domain Storytelling doit raconter une situation précise. Les exceptions ne doivent donc pas être accumulées comme des branches dans l’histoire principale.

## 8. Définir la chorégraphie de simulation

Pour chaque intervention cliente, je préciserais :

* son déclencheur ;
* les données utilisées ;
* le délai simulé ;
* la réponse produite ;
* l’objet métier modifié ;
* le nouvel état ;
* ce que la coiffeuse voit ensuite.

Principe recommandé :

> Les réponses simulées sont déclenchées par les actions de la coiffeuse, et non par des délais aléatoires.

Par exemple :

> La coiffeuse demande une précision → le simulateur produit une réponse cliente préparée → la demande est enrichie → la coiffeuse peut reprendre sa décision.

La simulation devra également être visible comme telle, réinitialisable et reproductible.

## 9. Vérifier ce qui ne doit jamais être automatisé

La démo ne doit pas prendre à la place de la coiffeuse les décisions dont on veut tester la compréhension :

* accepter ou refuser une demande ;
* demander une précision ;
* fixer ou modifier une proposition ;
* confirmer sa préparation ;
* déclarer un incident ;
* accepter une modification ;
* terminer la prestation ;
* répondre à un avis.

Seules les actions nécessaires de la cliente et les traitements normaux de la plateforme seront simulés.

## 10. Transformer ensuite les histoires en parcours d’interface

Une fois le Domain Storytelling validé, chaque activité sera traduite en :

* écran ou vue ;
* information présentée ;
* décision demandée ;
* action disponible ;
* événement simulé ;
* retour visible ;
* preuve ou état produit.

L’ordre de travail serait donc :

1. contrat de démonstration ;
2. matrice métier des étapes 0 à 8 ;
3. scénario concret ;
4. Domain Story nominal ;
5. histoires alternatives ;
6. spécification des simulations clientes ;
7. storyboard des écrans ;
8. critères de test auprès des coiffeuses.

Le point essentiel : nous raconterons d’abord une transaction métier réaliste vécue par la coiffeuse. L’automatisation de la cliente sera ensuite ajoutée comme mécanisme d’exécution de la démo, sans déformer le processus métier de référence.


