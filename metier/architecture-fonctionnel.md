Après analyse du document principal et des huit fichiers détaillant l’ancien parcours, le périmètre fonctionnel ne doit plus être construit autour des anciennes étapes 1 à 11.

La bonne structure de référence est désormais :

> **Capacité ouverte → demande qualifiée → distribution → proposition ferme → engagement → préparation → prestation → règlement → preuve**, avec une **branche transversale de résolution**.

L’ancien parcours reste utile comme inventaire de fonctionnalités, mais plusieurs éléments doivent être déplacés ou réinterprétés.

## 1. Diagnostic général

Le [document de refonte](sandbox:/workspace/scratch/d7013bcc91ad/upload/03-Refonte-processus-metier-fondee-terrain.md) apporte quatre transformations structurantes.

### 1. Le parcours ne commence plus uniquement par la cliente

Deux flux doivent être préparés en parallèle :

* la capacité que la coiffeuse souhaite réellement proposer ;
* le besoin que la cliente souhaite satisfaire.

Sans capacité structurée côté coiffeuse, la recherche, les prix, les disponibilités et le matching resteront peu fiables.

### 2. Une réponse positive n’est pas une réservation

Il faut distinguer :

* une invitation envoyée à une coiffeuse ;
* une réponse provisoire ;
* une proposition ferme ;
* un engagement bilatéral ;
* un rendez-vous opérationnellement prêt.

Cette séparation est fondamentale pour éviter les réservations payées puis refusées, modifiées ou renégociées.

### 3. La protection ne se limite pas à l’acompte

Elle repose sur :

* la clarté de l’offre ;
* la traçabilité de l’accord ;
* la préparation ;
* le traitement des modifications ;
* la réparation en cas de défaillance ;
* la réciprocité entre cliente et coiffeuse.

La branche « incident et résolution » appartient donc au cœur du produit, même si son traitement reste manuel pendant le pilote.

### 4. Le produit n’est pas seulement une interface de réservation

Le véritable système comprend :

* un moteur de qualification ;
* un moteur d’éligibilité et d’allocation ;
* un système de propositions ;
* un système contractuel et financier ;
* un orchestrateur de rendez-vous ;
* un système de résolution ;
* un système de preuve et de réputation.

Le périmètre fonctionnel devra donc décrire des **capacités métier**, pas seulement des écrans.

---

## 2. Réorganisation des anciens documents

| Ancien document | Éléments à conserver                                            | Nouveau placement                                     |
| --------------- | --------------------------------------------------------------- | ----------------------------------------------------- |
| Étapes 1–2      | Inspirations, prestation, contraintes, budget, zone, confort    | Nouvelle étape 1                                      |
| Étape 3         | Recherche par prestation, compatibilité, explication des écarts | Étapes 0, 1 et 2                                      |
| Étape 4         | Portfolio, prix, avis, éléments inclus, comparaison             | Étapes 2, 3 et 8                                      |
| Étapes 5–6      | Offre détaillée, créneau, conditions, paiement, preuve          | Étapes 3, 4 et 5                                      |
| Étape 7         | Acceptation, précision, modification ou refus par la coiffeuse  | Nouvelle étape 3, avant paiement                      |
| Étapes 8–9      | Préparation, rappels, jour J, incidents                         | Étapes 5, 6 et branche de résolution                  |
| Étape 10        | Avis vérifié et contextualisé                                   | Nouvelle étape 8                                      |
| Étape 11        | Historique, reprise, favoris, recommandation                    | Nouvelle étape 8, avec une priorité moindre en pilote |

Les principales corrections à appliquer sont les suivantes :

* la validation professionnelle doit précéder l’engagement financier ;
* la comparaison finale doit porter sur des offres ou propositions réelles, pas sur des profils supposés disponibles ;
* la réservation et l’état `READY` doivent rester séparés ;
* « annulé » ne suffit pas comme statut : l’auteur, la responsabilité et la solution doivent être conservés ;
* un rendez-vous non réalisé peut produire une preuve de fiabilité ou de résolution, mais pas une note technique ;
* l’ancien système de favoris et de fidélisation doit être simplifié pour le pilote.

---

# 3. Architecture fonctionnelle à cadrer

## Étape 0 — Ouvrir une capacité professionnelle

**Décision métier :** que souhaite réellement proposer la coiffeuse, où, quand et dans quel volume ?

### Blocs fonctionnels à cadrer

* création d’une prestation et de ses variantes ;
* configurations « service complet » ou « assisté » ;
* tâches prises en charge par la coiffeuse ou la cliente ;
* prix, suppléments et revenu net cible ;
* durée, marge entre rendez-vous et capacité maximale ;
* lieux et zones couverts ;
* disponibilités et fraîcheur du planning ;
* fournitures, matériel et préparation ;
* volume de demandes souhaité ;
* conditions et limites de service ;
* activation, suspension ou fermeture d’une capacité.

### Sortie fonctionnelle

`CAPACITY_OPEN`

### Pilotable manuellement

* saisie des offres avec accompagnement ;
* vérification manuelle des informations ;
* calendrier simplifié ;
* capacité renseignée par semaine ou par période.

### À reporter

* synchronisation avancée des agendas ;
* tarification dynamique ;
* gestion automatisée des stocks ;
* optimisation automatique du planning.

---

## Étape 1 — Qualifier le besoin de la cliente

**Décision métier :** les informations permettent-elles de rechercher une solution compatible ?

### Blocs fonctionnels à cadrer

* catalogue visuel d’inspirations ;
* questionnaire adapté à la prestation ;
* résultat souhaité et contexte ;
* date préférée, heure limite et dernière échéance acceptable ;
* budget cible, maximum et flexibilité ;
* zone, mobilité et lieu ;
* contraintes capillaires, de confort et de sécurité ;
* niveau de service souhaité ;
* tâches acceptées ou refusées par la cliente ;
* priorité de recherche :

  * coiffeuse précise ;
  * résultat prioritaire ;
  * rapidité prioritaire ;
* distinction entre contraintes et préférences ;
* résumé modifiable de la demande.

### Sortie fonctionnelle

`DEMAND_QUALIFIED`

### Point de vigilance

Ne collecter à cette étape que les informations utilisées pour :

* l’éligibilité ;
* la protection ;
* la compréhension du besoin.

Les détails nécessaires uniquement à la faisabilité professionnelle peuvent être demandés plus tard.

---

## Étape 2 — Apparier et distribuer la demande

**Décision métier :** quelles capacités sont éligibles et lesquelles doivent être sollicitées ?

### Blocs fonctionnels à cadrer

* filtres d’incompatibilité ;
* identification du vivier éligible ;
* explication des compatibilités et des écarts ;
* choix du mode de distribution ;
* campagne de matching ;
* constitution des vagues ;
* invitations ;
* expiration des invitations ;
* réponses provisoires :

  * acceptation exacte ;
  * acceptation avec modification ;
  * information nécessaire ;
  * indisponibilité ;
* allocation selon la capacité ouverte et le taux de remplissage ;
* mécanisme d’élargissement accepté par la cliente ;
* arrêt de la campagne lorsqu’un nombre suffisant de propositions est atteint ;
* journal des motifs d’éligibilité, d’invitation ou de non-invitation.

### Objets à distinguer

`Demande → Campagne → Invitations → Réponses provisoires`

### Sortie fonctionnelle

* absence de capacité ;
* sélection courte ;
* ou réponses à transformer en propositions fermes.

### Pilotage recommandé

Le matching doit d’abord être assisté manuellement. Il n’est pas nécessaire de construire immédiatement un algorithme d’allocation sophistiqué.

La plateforme doit toutefois enregistrer les décisions pour apprendre :

* qui était éligible ;
* qui a été invitée ;
* pourquoi ;
* avec quel résultat.

---

## Étape 3 — Valider la faisabilité et produire une proposition ferme

**Décision métier :** une coiffeuse accepte-t-elle de s’engager sur cette demande exacte ?

### Blocs fonctionnels à cadrer

* consultation synthétique de la demande ;
* précision ciblée ;
* validation technique ;
* proposition de variante ;
* confirmation du prix ;
* confirmation de la durée ;
* confirmation du créneau et du lieu ;
* validation des fournitures ;
* répartition des tâches ;
* conditions spécifiques ;
* motif structuré de refus ;
* durée de validité de la proposition ;
* immobilisation temporaire du créneau ;
* clôture des propositions non retenues.

### Objets et états

* `PROPOSAL_PENDING`
* `FIRM_PROPOSAL`
* `SOFT_HOLD`
* `OFFER_EXPIRED`
* `NOT_SELECTED`

### Sortie fonctionnelle

Une proposition ferme, complète et temporaire.

### Règle incontournable

Aucun versement définitif et aucun engagement ne doivent précéder cette sortie.

---

## Étape 4 — Former l’engagement et sécuriser les finances

**Décision métier :** les deux parties acceptent-elles exactement le même engagement ?

### Blocs fonctionnels à cadrer

* récapitulatif contractuel ;
* version de l’offre acceptée ;
* consentement aux conditions ;
* créneau, prix, durée, lieu et périmètre figés ;
* obligations de chaque partie ;
* politique de retard ;
* politique d’annulation et de report ;
* coûts préparatoires autorisés ;
* niveau éventuel de sécurisation renforcée ;
* fonction juridique du versement ;
* paiement initial ;
* preuve du paiement ;
* preuve de l’accord ;
* expiration en cas de non-paiement ;
* libération du créneau ;
* remboursement et contestation.

### Objets à distinguer

* engagement ;
* politique acceptée ;
* paiement ;
* écriture financière ;
* preuve contractuelle.

### Sortie fonctionnelle

`COMMITTED`

### Décisions bloquantes avant développement

* la plateforme encaisse-t-elle les fonds ?
* verse-t-elle directement la coiffeuse ?
* s’agit-il d’arrhes, d’un acompte ou de frais distincts ?
* quelle protection financière la plateforme promet-elle ?
* qui finance un remplacement ou une compensation ?

Ces points nécessiteront une validation juridique et financière avant automatisation.

---

## Étape 5 — Rendre le rendez-vous opérationnellement prêt

**Décision métier :** toutes les conditions nécessaires sont-elles satisfaites ?

### Blocs fonctionnels à cadrer

* checklist cliente ;
* checklist coiffeuse ;
* fournitures à acheter ou préparer ;
* responsables de chaque action ;
* consignes personnalisées ;
* adresse et modalités d’accès ;
* rappels ;
* reconfirmation éventuelle ;
* validation des mesures de sécurisation ;
* signalement d’un élément manquant ;
* détection d’un rendez-vous à risque ;
* bascule vers la résolution si nécessaire.

### États

* `READINESS_PENDING`
* `READY`
* `AT_RISK`

### Différence importante

Une notification de confirmation ne suffit pas. Le système doit savoir si les conditions nécessaires à la réalisation sont effectivement satisfaites.

---

## Étape 6 — Réaliser et coordonner la prestation

**Décision métier :** la prestation se déroule-t-elle conformément à l’engagement ?

### Blocs fonctionnels à cadrer

* accès rapide au dossier du rendez-vous ;
* arrivée ou retard de chaque partie ;
* heure estimée d’arrivée ;
* début réel ;
* modification du périmètre ;
* consentement à une modification ;
* modification du prix ou de la durée ;
* tâche cliente réalisée ou non ;
* interruption ;
* incident de sécurité ou relationnel ;
* fin réelle ;
* prestation partielle ;
* déclenchement d’une résolution.

### États

* `IN_PROGRESS`
* `COMPLETED`
* `PARTIALLY_COMPLETED`
* `RESOLUTION_PENDING`

### Principe

Il faut tracer les événements qui modifient :

* l’engagement ;
* le prix ;
* la sécurité ;
* la responsabilité ;
* la résolution.

Il ne faut pas transformer la plateforme en dispositif de surveillance permanente.

---

## Branche transversale — Modification, incident et résolution

Cette branche peut être déclenchée entre l’engagement et le règlement.

### Blocs fonctionnels à cadrer

* déclaration structurée d’un événement ;
* auteur de l’événement ;
* date et préavis ;
* preuves minimales ;
* ressources affectées ;
* possibilité de limiter le dommage ;
* tentative de remplacement ;
* proposition de solutions :

  * report ;
  * remplacement ;
  * remboursement ;
  * crédit ;
  * adaptation ;
  * compensation ;
* acceptation ou contestation ;
* traitement administratif ;
* clôture qualifiée ;
* historique auditable.

### Pilotage recommandé

Le calcul et l’arbitrage doivent rester manuels pendant le pilote, mais l’interface doit permettre :

* de collecter les bons faits ;
* d’appliquer une politique connue ;
* de tracer la décision ;
* d’en mesurer les conséquences.

Exclure entièrement cette branche du MVP contredirait la promesse centrale du projet.

---

## Étape 7 — Régler et allouer la valeur

**Décision métier :** quel montant final est dû et comment doit-il être réparti ?

### Blocs fonctionnels à cadrer

* imputation du versement initial ;
* calcul du solde ;
* adaptation convenue du prix ;
* remboursement ou crédit ;
* pourboire ;
* frais de déplacement ;
* produits et fournitures ;
* commission ou frais de plateforme ;
* part du salon ou d’un autre acteur ;
* revenu net coiffeuse ;
* preuve de paiement ;
* clôture financière.

### Sortie fonctionnelle

`SETTLED`

### Point important

Le paiement initial de l’étape 4 et le règlement final de l’étape 7 appartiennent au même domaine financier, mais remplissent deux fonctions différentes.

---

## Étape 8 — Produire la preuve et prolonger la relation

**Décision métier :** que peut-on apprendre de l’expérience et comment simplifier la prochaine transaction ?

### Blocs fonctionnels à cadrer

* confirmation du résultat du rendez-vous ;
* avis technique lorsque la prestation a été réalisée ;
* avis sur la réservation ;
* avis sur la communication ;
* avis sur la ponctualité ;
* avis sur la conformité du prix ;
* avis sur la résolution ;
* réponse de la coiffeuse ;
* signalement d’un avis ;
* historique ;
* reprise d’une demande ;
* reprise de rendez-vous ;
* favoris ;
* consentement à mémoriser les préférences.

### Priorité pilote

À conserver :

* retour multidimensionnel ;
* historique ;
* reprendre une prestation ;
* revenir vers une coiffeuse déjà éprouvée.

À reporter :

* moteur sophistiqué de recommandation ;
* programme de fidélité ;
* CRM marketing ;
* score anti-fraude avancé ;
* rappels commerciaux complexes.

---

# 4. Fonctions transversales à ne pas rattacher artificiellement à une étape

Le périmètre serait incomplet sans ces domaines.

| Domaine transversal  | Capacités nécessaires                                           |
| -------------------- | --------------------------------------------------------------- |
| Identités et rôles   | Cliente, coiffeuse, opérateur, administrateur, support          |
| Notifications        | Envoi, rappels, préférences, erreurs, preuve de livraison       |
| Administration       | Consultation des demandes, propositions, incidents et paiements |
| Traçabilité          | Historique des statuts, accords, modifications et décisions     |
| Catalogue métier     | Prestations, variantes, tâches, fournitures et règles           |
| Paiement             | Transactions, remboursements, ventilation et rapprochement      |
| Données personnelles | Consentement, accès, conservation, suppression                  |
| Support              | Intervention manuelle, remplacement, arbitrage et contestation  |
| Mesure               | Éligibilité, invitation, conversion, réalisation et résolution  |
| Gouvernance          | Version des règles, politiques et questionnaires                |

---

# 5. Fiche de cadrage à remplir pour chaque étape

Chaque étape doit produire une fiche fonctionnelle contenant exactement les rubriques suivantes.

1. **Décision métier**
   La question à laquelle l’étape doit répondre.

2. **Déclencheur**
   L’événement qui fait commencer l’étape.

3. **Acteurs et responsabilités**
   Qui agit, qui valide, qui attend et qui peut intervenir.

4. **Entrées**
   Informations et objets nécessaires.

5. **Parcours nominal**
   Fonctionnement lorsque tout se passe correctement.

6. **Variantes**
   Cas direct, confirmation manuelle, proposition alternative, urgence, etc.

7. **Exceptions**
   Information manquante, absence de réponse, indisponibilité, expiration, paiement échoué, incident.

8. **Fonctionnalités utilisateur**
   Actions disponibles côté cliente, coiffeuse et opérateur.

9. **Automatismes de la plateforme**
   Contrôles, calculs, expirations, notifications et changements d’état.

10. **Règles métier**
    Conditions, interdictions et invariants.

11. **États et transitions**
    États possibles, acteur autorisé et conditions de transition.

12. **Données et preuves**
    Informations collectées, source, niveau de certitude et durée de conservation.

13. **Sortie et critères d’acceptation**
    Ce qui doit être vrai pour passer à l’étape suivante.

14. **Mesures**
    Délai, conversion, erreurs, abandons, incidents et charge opérationnelle.

15. **Niveau d’automatisation**
    Manuel, assisté ou automatisé.

16. **Priorité**
    Pilote, MVP, version ultérieure ou hors périmètre.

Cette fiche évitera de confondre une idée fonctionnelle, une règle métier et une solution technique.

---

# 6. Plan de travail recommandé

## Phase 1 — Figer les décisions structurantes

Avant de rédiger les spécifications :

* choisir les prestations couvertes par le pilote ;
* définir la zone géographique ;
* déterminer les modes de prestation ;
* choisir les parcours de matching autorisés ;
* définir le modèle financier ;
* fixer le niveau réel de garantie ;
* déterminer la capacité d’intervention manuelle ;
* définir les rôles et responsabilités de la plateforme.

**Livrable :** registre des décisions et hypothèses.

## Phase 2 — Produire les fiches fonctionnelles des étapes 0 à 8

Traiter les étapes dans cet ordre :

1. capacité ;
2. demande ;
3. proposition ;
4. engagement ;
5. préparation ;
6. résolution ;
7. règlement ;
8. preuve ;
9. matching et allocation.

Le matching vient volontairement après la définition des objets qu’il doit relier.

**Livrable :** 10 fiches, branche de résolution incluse.

## Phase 3 — Construire le modèle métier

Objets minimaux :

* professionnelle ;
* prestation ;
* capacité ;
* demande ;
* campagne ;
* invitation ;
* proposition ;
* engagement ;
* rendez-vous ;
* incident ;
* résolution ;
* transaction ;
* règlement ;
* évaluation ;
* relation.

**Livrable :** dictionnaire des objets, responsabilités et relations.

## Phase 4 — Définir les états et transitions

Éviter une unique table `reservation` portant tout le processus.

**Livrable :**

* machine d’état de la demande ;
* machine d’état de la campagne ;
* machine d’état de la proposition ;
* machine d’état de l’engagement ;
* machine d’état du rendez-vous ;
* machine d’état de la résolution ;
* machine d’état du règlement.

## Phase 5 — Décrire les scénarios de bout en bout

Au minimum :

* coiffeuse précise qui accepte ;
* coiffeuse précise qui refuse ;
* résultat prioritaire avec deux propositions ;
* demande urgente ;
* absence de résultat ;
* proposition modifiée ;
* paiement échoué ;
* rendez-vous non prêt ;
* annulation cliente ;
* annulation coiffeuse ;
* retard de chaque partie ;
* prestation partielle ;
* remplacement réussi ;
* résolution contestée.

**Livrable :** catalogue des parcours nominaux et exceptionnels.

## Phase 6 — Séparer pilote, MVP et industrialisation

### Pilote

* matching assisté ;
* politiques simples ;
* résolution manuelle ;
* paiements et remboursements supervisés ;
* notifications simples ;
* administration forte.

### MVP

* orchestration des états ;
* propositions structurées ;
* engagement traçable ;
* paiement rattaché ;
* préparation ;
* incident et résolution ;
* règlement ;
* avis vérifié.

### Industrialisation

* allocation automatisée ;
* calendrier synchronisé ;
* remboursement calculé automatiquement ;
* scoring de fiabilité ;
* recommandations avancées ;
* garantie renforcée.

## Phase 7 — Transformer le périmètre en backlog

Chaque capacité retenue devient :

* une user story ;
* ses règles métier ;
* ses critères d’acceptation ;
* ses exceptions ;
* les données nécessaires ;
* les événements analytiques ;
* les dépendances techniques et juridiques.

---

# 7. Périmètre recommandé du premier pilote

Le premier pilote devrait prouver une seule chaîne de valeur complète :

> une coiffeuse ouvre une capacité, une cliente formule son besoin, la plateforme distribue la demande, une proposition ferme est produite, les parties s’engagent, le rendez-vous est préparé, réalisé ou réparé, puis réglé et évalué.

Le socle minimal est donc :

* capacité structurée ;
* demande qualifiée ;
* matching manuel assisté ;
* invitations limitées ;
* réponse professionnelle structurée ;
* proposition ferme ;
* engagement bilatéral ;
* versement initial simple ;
* checklist `READY` ;
* rappels ;
* signalement des retards, annulations et incidents ;
* console opérateur de résolution ;
* remboursement, crédit ou remplacement supervisé ;
* règlement final ;
* avis multidimensionnel.

Tout ce qui ne contribue pas directement à tester cette chaîne doit être différé.

La conclusion la plus importante est la suivante :

> Le périmètre fonctionnel ne doit pas chercher à reproduire numériquement les onze anciennes étapes. Il doit construire le système minimal permettant de former, exécuter, protéger et réparer un engagement entre une cliente et une coiffeuse.
