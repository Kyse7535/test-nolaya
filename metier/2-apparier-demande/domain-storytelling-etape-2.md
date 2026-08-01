# Domain Storytelling — Étape 2 : Apparier et distribuer la demande

## 1. Finalité métier

Cette étape transforme :

> une demande cliente suffisamment précise pour être recherchée

en :

> une campagne organisée sollicitant un nombre limité de capacités professionnelles réellement compatibles.

La question métier n’est pas seulement :

> « Quelles coiffeuses correspondent à la demande ? »

Elle se décompose en trois décisions distinctes :

| Décision      | Question                                                                  |
| ------------- | ------------------------------------------------------------------------- |
| Éligibilité   | Cette capacité peut-elle satisfaire les contraintes obligatoires ?        |
| Compatibilité | Dans quelle mesure correspond-elle aussi aux préférences de la cliente ?  |
| Allocation    | Parmi les capacités éligibles, lesquelles faut-il solliciter maintenant ? |

L’étape ne produit encore :

* ni réservation ;
* ni engagement de la coiffeuse ;
* ni proposition ferme ;
* ni immobilisation définitive d’un créneau ;
* ni paiement.

Elle produit des **réponses professionnelles provisoires** qui devront être confirmées à l’étape 3.

---

## 2. Périmètre du récit

### Événement de départ

La cliente valide une demande au statut :

`DEMAND_QUALIFIED`

La demande comporte notamment :

* la prestation ou le résultat souhaité ;
* les variantes principales ;
* la date préférée et la dernière échéance acceptable ;
* le budget cible et le maximum ;
* la zone et la mobilité ;
* le lieu souhaité ;
* les contraintes capillaires, de confort ou de sécurité ;
* les tâches acceptées par la cliente ;
* ses préférences ;
* sa priorité de recherche ;
* les élargissements qu’elle autorise éventuellement.

### Événements de fin

L’étape se termine lorsque :

1. aucune capacité n’est éligible ;
2. toutes les vagues autorisées ont expiré sans réponse exploitable ;
3. un nombre suffisant de réponses peut être transformé en propositions fermes ;
4. la cliente retire ou modifie sa demande.

---

# 3. Acteurs

| Acteur                | Responsabilité                                                                                                    |
| --------------------- | ----------------------------------------------------------------------------------------------------------------- |
| Cliente               | Définit ses contraintes, ses préférences, sa priorité et les élargissements autorisés                             |
| Opérateur de matching | Supervise l’éligibilité et choisit les capacités à solliciter pendant le pilote                                   |
| Plateforme            | Crée la campagne, envoie les invitations, collecte les réponses, gère les expirations et journalise les décisions |
| Coiffeuse             | Consulte la demande et fournit une réponse professionnelle provisoire                                             |
| Politique de matching | Définit les règles d’éligibilité, de distribution, d’arrêt et d’élargissement                                     |

Pendant le pilote, la politique de matching est appliquée par l’opérateur avec l’assistance de la plateforme. Elle n’a pas besoin d’être entièrement automatisée.

---

# 4. Objets métier

## Demande

Expression qualifiée du besoin de la cliente.

Une demande peut être corrigée ou élargie, mais chaque modification importante crée une nouvelle version.

## Campagne de matching

Processus organisé pour trouver des capacités susceptibles de répondre à une version précise de la demande.

Une campagne définit :

* son mode de distribution ;
* le nombre de réponses recherchées ;
* les règles de constitution des vagues ;
* les délais de réponse ;
* les élargissements autorisés ;
* ses règles d’arrêt.

## Vivier éligible

Ensemble des capacités qui respectent les contraintes obligatoires de la demande.

Être éligible ne signifie pas être invitée.

La galerie de prestation (`SERVICE_GALLERY`) n’entre pas dans les contraintes obligatoires d’éligibilité. Elle peut enrichir la compatibilité perçue et la sélection par la cliente, mais une coiffeuse ne devient pas disponible du seul fait qu’elle possède de belles réalisations. Une galerie générale mélangeant toutes ses prestations ne doit jamais servir de critère d’éligibilité.

## Vague

Sous-ensemble ordonné des capacités qui seront sollicitées au même moment ou pendant une même période.

## Invitation

Sollicitation adressée à une coiffeuse pour une capacité précise et une demande précise.

Une invitation :

* n’est pas une réservation ;
* ne garantit pas que la cliente choisira la coiffeuse ;
* ne constitue pas encore un engagement ;
* possède une date d’expiration.

## Réponse provisoire

Position structurée de la coiffeuse avant la création d’une proposition ferme.

Les quatre réponses principales sont :

* acceptation exacte ;
* acceptation avec modification ;
* information nécessaire ;
* indisponibilité.

## Autorisation d’élargissement

Consentement donné par la cliente pour assouplir certains critères si la recherche initiale échoue.

---

# 5. Récit métier principal

## Séquence A — Ouvrir la campagne

| N° | Acteur                  | Activité                                                             | Objet produit ou modifié |
| -: | ----------------------- | -------------------------------------------------------------------- | ------------------------ |
|  1 | Cliente                 | Valide le résumé de son besoin                                       | Demande qualifiée        |
|  2 | Plateforme              | Fige la version utilisée pour le matching                            | Version de demande       |
|  3 | Plateforme              | Crée une campagne rattachée à cette version                          | Campagne                 |
|  4 | Plateforme ou opérateur | Identifie les contraintes obligatoires et les préférences            | Critères de matching     |
|  5 | Plateforme ou opérateur | Choisit le mode de distribution à partir de la priorité de recherche | Politique de campagne    |

La campagne doit toujours conserver la version exacte de la demande ayant servi au matching. Si la cliente modifie un critère déterminant, les invitations existantes ne doivent pas silencieusement utiliser la nouvelle version.

---

## Séquence B — Construire le vivier éligible

| N° | Acteur                  | Activité                                                           | Objet produit ou modifié     |
| -: | ----------------------- | ------------------------------------------------------------------ | ---------------------------- |
|  6 | Plateforme              | Recherche les capacités ouvertes correspondant à la prestation     | Capacités candidates         |
|  7 | Plateforme ou opérateur | Écarte les capacités incompatibles avec une contrainte obligatoire | Exclusions                   |
|  8 | Plateforme              | Enregistre le motif de chaque exclusion                            | Journal d’éligibilité        |
|  9 | Plateforme ou opérateur | Conserve les capacités respectant toutes les contraintes           | Vivier éligible              |
| 10 | Plateforme              | Évalue les préférences respectées et les écarts acceptables        | Explication de compatibilité |

Les filtres d’incompatibilité peuvent notamment porter sur :

* la prestation et sa variante ;
* les caractéristiques capillaires prises en charge ;
* le niveau de service demandé ;
* les tâches attribuées à la cliente ou à la coiffeuse ;
* le lieu et la zone ;
* la date limite ;
* le budget maximal absolu ;
* les contraintes de confort ou de sécurité ;
* l’état et la fraîcheur de la capacité professionnelle.

Une préférence non satisfaite ne doit pas provoquer une exclusion automatique.

Exemple :

* « à moins de 20 minutes » peut être une préférence ;
* « pas plus de 45 minutes » peut être une contrainte.

---

## Séquence C — Prioriser les capacités à solliciter

| N° | Acteur                  | Activité                                                         | Objet produit ou modifié |
| -: | ----------------------- | ---------------------------------------------------------------- | ------------------------ |
| 11 | Plateforme ou opérateur | Classe les capacités selon leur compatibilité avec la demande    | Vivier ordonné           |
| 12 | Plateforme ou opérateur | Consulte la capacité encore disponible et le taux de remplissage | Données d’allocation     |
| 13 | Plateforme ou opérateur | Applique les règles de distribution équitable                    | Ordre d’invitation       |
| 14 | Opérateur               | Vérifie les situations particulières pendant le pilote           | Sélection validée        |
| 15 | Plateforme              | Constitue la première vague                                      | Vague 1                  |

L’ordre ne doit pas reposer uniquement sur la popularité des coiffeuses. Il peut combiner :

* compatibilité avec les contraintes ;
* compatibilité avec les préférences ;
* capacité encore disponible ;
* volume de demandes souhaité par la coiffeuse ;
* taux de remplissage ;
* fraîcheur des disponibilités ;
* fiabilité opérationnelle minimale ;
* distribution plus équilibrée des opportunités.

L’objectif n’est pas de distribuer artificiellement une demande à une capacité moins compatible. La compatibilité reste le seuil préalable.

---

## Séquence D — Envoyer les invitations

| N° | Acteur     | Activité                                                           | Objet produit ou modifié |
| -: | ---------- | ------------------------------------------------------------------ | ------------------------ |
| 16 | Plateforme | Crée une invitation pour chaque capacité de la vague               | Invitations              |
| 17 | Plateforme | Associe chaque invitation à une demande, une capacité et une vague | Traçabilité              |
| 18 | Plateforme | Explique à la coiffeuse pourquoi elle est sollicitée               | Motifs de compatibilité  |
| 19 | Plateforme | Fixe le délai de réponse                                           | Date d’expiration        |
| 20 | Plateforme | Notifie les coiffeuses                                             | Invitations envoyées     |
| 21 | Coiffeuse  | Consulte le résumé opérationnel de la demande                      | Invitation consultée     |

La coiffeuse doit recevoir les informations nécessaires pour se positionner, notamment :

* résultat demandé ;
* date et plage horaire ;
* zone ou lieu approximatif ;
* budget et éléments inclus ;
* contraintes importantes ;
* fournitures attendues ;
* tâches attribuées à chaque partie ;
* modifications que la cliente accepte éventuellement.

Les coordonnées personnelles précises ne doivent pas être transmises prématurément.

---

# 6. Réponses provisoires de la coiffeuse

## Réponse 1 — Acceptation exacte

La coiffeuse indique :

> « Cette demande correspond à ma capacité ouverte et je peux, sous réserve de confirmation finale, la réaliser dans les conditions présentées. »

La plateforme :

1. enregistre l’acceptation ;
2. rattache la réponse à la version de la demande ;
3. vérifie que l’invitation n’a pas expiré ;
4. marque la réponse comme transformable en proposition ferme ;
5. transmet le dossier à l’étape 3.

Cette acceptation ne bloque pas encore définitivement le créneau.

---

## Réponse 2 — Acceptation avec modification

La coiffeuse est intéressée, mais demande une modification portant par exemple sur :

* le prix ;
* le créneau ;
* le lieu ;
* la durée ;
* la variante de prestation ;
* les fournitures ;
* la répartition des tâches ;
* une condition de préparation.

Elle doit préciser :

* ce qu’elle accepte ;
* ce qu’elle souhaite modifier ;
* la valeur proposée ;
* la raison de la modification ;
* la durée de validité de sa réponse.

La plateforme ne doit jamais présenter cette réponse comme une acceptation exacte.

Si la modification se situe dans la flexibilité déjà autorisée par la cliente, elle peut être transmise à l’étape 3. Sinon, l’accord explicite de la cliente est nécessaire.

---

## Réponse 3 — Information nécessaire

La coiffeuse ne peut pas se positionner sans une information professionnelle ciblée.

Exemples :

* longueur réelle des cheveux ;
* état d’une ancienne coiffure ;
* possibilité de venir avec les cheveux préparés ;
* présence ou non des mèches ;
* horaire impératif de fin ;
* détail sur une contrainte capillaire.

Le récit devient alors :

1. la coiffeuse formule une question structurée ;
2. la plateforme vérifie que l’information est réellement nécessaire ;
3. la plateforme transmet la question à la cliente ;
4. la cliente apporte la précision ;
5. la plateforme rattache la réponse au dossier ;
6. la coiffeuse reçoit la précision ;
7. la coiffeuse fournit une nouvelle réponse avant expiration.

Cette possibilité ne doit pas recréer une négociation libre et interminable en messagerie.

---

## Réponse 4 — Indisponibilité

La coiffeuse décline l’invitation et sélectionne un motif :

* créneau indisponible ;
* capacité déjà atteinte ;
* prestation non réalisable ;
* budget incompatible ;
* zone non couverte ;
* contrainte technique ;
* délai trop court ;
* capacité affichée non actualisée ;
* autre motif structuré.

Le refus d’une demande ne doit pas automatiquement être traité comme un manque de fiabilité. En revanche, des indisponibilités répétées malgré une capacité annoncée peuvent révéler un problème de fraîcheur des informations.

---

# 7. Expiration et constitution des vagues suivantes

Lorsqu’une invitation arrive à expiration, la plateforme :

1. la marque comme expirée ;
2. empêche toute acceptation tardive non contrôlée ;
3. enregistre l’absence de réponse ;
4. libère la place dans la campagne ;
5. détermine si une nouvelle capacité doit être sollicitée.

Une nouvelle vague est ouverte lorsque :

* le nombre de réponses exploitables est insuffisant ;
* des invitations ont expiré ;
* plusieurs coiffeuses sont indisponibles ;
* les réponses avec modification dépassent la flexibilité autorisée ;
* la politique de campagne permet encore d’autres sollicitations.

Chaque nouvelle vague doit être identifiable séparément. Il faut pouvoir apprendre :

* combien de vagues ont été nécessaires ;
* quelles capacités se trouvaient dans chaque vague ;
* pourquoi elles ont été sélectionnées ;
* dans quel délai elles ont répondu ;
* ce que leur réponse a produit.

---

# 8. Modes de distribution

## Mode A — Coiffeuse précise

La cliente souhaite prioritairement une professionnelle identifiée.

Le récit est le suivant :

1. la plateforme vérifie que sa capacité est éligible ;
2. elle lui adresse une invitation prioritaire ;
3. elle attend sa réponse pendant un délai défini ;
4. si elle accepte, la campagne passe à l’étape 3 ;
5. si elle refuse ou ne répond pas, la plateforme applique le choix de repli préalablement accepté par la cliente.

La plateforme ne doit pas automatiquement solliciter d’autres coiffeuses si la cliente n’a pas autorisé ce repli.

---

## Mode B — Résultat prioritaire

La cliente privilégie la qualité ou la conformité du résultat.

La plateforme :

1. identifie les capacités les plus compatibles ;
2. constitue une vague limitée ;
3. recherche plusieurs réponses exploitables ;
4. arrête la campagne lorsque la cliente dispose d’un nombre suffisant de futures propositions comparables.

La rapidité de réponse ne doit pas être le seul critère de sélection.

---

## Mode C — Rapidité prioritaire

La cliente souhaite surtout obtenir rapidement une solution.

La plateforme peut :

* constituer une vague plus large ;
* solliciter les capacités simultanément ;
* appliquer un délai de réponse plus court ;
* arrêter la campagne dès que le nombre requis de réponses exploitables est atteint.

Les contraintes obligatoires restent néanmoins inchangées.

---

# 9. Élargissement contrôlé de la recherche

Une campagne ne doit jamais assouplir silencieusement une contrainte.

Les élargissements possibles peuvent concerner :

* la date ;
* le créneau ;
* la zone ;
* la distance ;
* le lieu ;
* le budget cible, dans la limite du maximum ;
* une variante de coiffure ;
* les fournitures ;
* le niveau de service.

Le récit métier est le suivant :

1. la campagne initiale ne produit pas suffisamment de réponses ;
2. la plateforme identifie le critère limitant ;
3. elle présente une possibilité d’élargissement à la cliente ;
4. la cliente accepte ou refuse précisément cette modification ;
5. la plateforme crée une nouvelle version de recherche ;
6. elle explique aux nouvelles coiffeuses les conditions élargies ;
7. elle constitue une nouvelle vague.

Une contrainte de sécurité ou une limite absolue ne peut pas être transformée en préférence par défaut.

---

# 10. Arrêt de la campagne

La campagne s’arrête lorsqu’un nombre suffisant de réponses peut être transformé en propositions fermes.

Le seuil dépend du mode de distribution.

| Mode                 | Exemple de règle d’arrêt                                 |
| -------------------- | -------------------------------------------------------- |
| Coiffeuse précise    | Une réponse exploitable                                  |
| Résultat prioritaire | Deux ou trois réponses comparables                       |
| Rapidité prioritaire | Première ou premières réponses répondant aux contraintes |
| Recherche rare       | Une seule réponse exploitable peut suffire               |

Lorsque le seuil est atteint, la plateforme :

1. clôt la campagne ;
2. empêche la création de nouvelles vagues ;
3. clôt ou retire les invitations encore ouvertes ;
4. informe les coiffeuses qui ne peuvent plus répondre ;
5. conserve toutes les décisions dans le journal ;
6. transmet les réponses retenues à l’étape 3.

Le nombre exact de réponses doit être une règle configurable, pas une valeur enfouie dans le code.

---

# 11. Sorties possibles

Il faut distinguer quatre résultats métier.

| Sortie                 | Signification                                                                  |
| ---------------------- | ------------------------------------------------------------------------------ |
| `NO_ELIGIBLE_CAPACITY` | Aucune capacité ne satisfait les contraintes obligatoires                      |
| `CAMPAIGN_NO_RESPONSE` | Des capacités étaient éligibles, mais aucune réponse exploitable n’a été reçue |
| `SHORTLIST_READY`      | Une sélection courte de capacités a été constituée                             |
| `RESPONSES_TO_CONVERT` | Des réponses doivent être transformées en propositions fermes à l’étape 3      |

Cette distinction est essentielle.

> « Aucune capacité n’existe » n’est pas la même chose que « les coiffeuses n’ont pas répondu ».

Les solutions métier et les apprentissages produits sont différents.

---

# 12. Exemple de Domain Story

## Demande initiale

> Sarah recherche des knotless braids moyennes, longueur mi-dos, avant samedi 16 h, autour de Créteil. Son budget cible est de 110 €, son maximum de 130 €. Elle a le cuir chevelu sensible et privilégie le confort. Elle accepte de se déplacer jusqu’à 15 km.

## Histoire

1. Sarah valide sa demande qualifiée.
2. La plateforme crée une campagne de matching.
3. L’opérateur trouve douze capacités proposant des knotless braids.
4. La plateforme exclut trois capacités ne recevant pas les clientes au cuir chevelu sensible.
5. Elle exclut deux capacités dont le prix minimal dépasse 130 €.
6. Elle exclut une capacité ne couvrant pas la zone acceptable.
7. Six capacités composent le vivier éligible.
8. L’opérateur sélectionne trois capacités pour la première vague en tenant compte de la compatibilité, des disponibilités et du taux de remplissage.
9. La plateforme envoie trois invitations valables pendant quatre heures.
10. La première coiffeuse accepte exactement la demande.
11. La deuxième propose dimanche au lieu de samedi.
12. La troisième demande si Sarah peut venir avec les cheveux lavés et étirés.
13. Sarah confirme qu’elle peut préparer ses cheveux.
14. La troisième coiffeuse accepte ensuite la demande.
15. La campagne atteint son objectif de deux réponses exploitables.
16. La plateforme clôt la campagne.
17. Elle indique à la deuxième coiffeuse que sa modification n’a pas été retenue.
18. Elle transmet les deux réponses exploitables à l’étape 3.
19. Les deux coiffeuses doivent maintenant confirmer le prix, le créneau, la durée, les fournitures et les conditions pour produire leurs propositions fermes.

---

# 13. Règles métier incontournables

1. Une campagne utilise une version déterminée de la demande.

2. Une capacité doit être ouverte et suffisamment à jour pour être éligible.

3. Les contraintes obligatoires déterminent l’éligibilité.

4. Les préférences déterminent la compatibilité et l’ordre, pas nécessairement l’exclusion.

5. La galerie de prestation sert de preuve de spécialisation et de signal de confiance ; elle ne détermine pas seule l’éligibilité. Chaque contenu affiché doit indiquer son type (`VERIFIED_REALIZATION`, `DECLARED_REALIZATION` ou `REFERENCE_INSPIRATION`).

6. Une capacité éligible n’est pas automatiquement invitée.

7. Une invitation concerne une capacité précise, pas seulement le profil général d’une coiffeuse.

8. Une invitation ne constitue ni une réservation ni une promesse de sélection.

9. Une acceptation provisoire ne constitue pas encore une proposition ferme.

10. Une modification proposée par une coiffeuse doit être explicitement visible.

11. Aucun élargissement ne peut être effectué sans le consentement préalable ou ponctuel de la cliente.

12. Les invitations expirées ne peuvent pas être acceptées normalement.

13. La campagne doit s’arrêter lorsque le nombre suffisant de réponses exploitables est atteint.

14. Chaque éligibilité, exclusion, invitation, non-invitation et réponse doit posséder un motif traçable.

15. L’allocation doit tenir compte de la capacité réellement souhaitée par la coiffeuse et éviter la concentration systématique des demandes.

16. Aucun paiement ne doit intervenir pendant cette étape.

---

# 14. Pilotage manuel recommandé

## Réalisé par l’opérateur

* vérification des incompatibilités complexes ;
* validation du vivier éligible ;
* choix des coiffeuses constituant chaque vague ;
* interprétation des réponses avec modification ;
* traitement des informations nécessaires ;
* décision d’élargir ou non la recherche ;
* sélection des réponses à transmettre à l’étape 3.

## Réalisé par la plateforme

* création de la campagne ;
* rattachement à la version de la demande ;
* affichage des capacités potentiellement compatibles ;
* création et envoi des invitations ;
* collecte structurée des réponses ;
* gestion des dates d’expiration ;
* notifications ;
* comptage des réponses exploitables ;
* clôture de la campagne ;
* journalisation des décisions.

## À reporter

* score prédictif de conversion ;
* allocation totalement automatisée ;
* estimation algorithmique de la probabilité d’acceptation ;
* optimisation automatique des vagues ;
* tarification dynamique ;
* personnalisation complexe par intelligence artificielle.

---

# 15. Données à enregistrer pour apprendre

Pour chaque campagne, le pilote doit pouvoir répondre à ces questions :

* combien de capacités ont été examinées ?
* combien étaient éligibles ?
* pourquoi certaines ont-elles été exclues ?
* quelles capacités éligibles n’ont pas été invitées ?
* pourquoi ont-elles été ou non invitées ?
* dans quelle vague chaque invitation a-t-elle été envoyée ?
* combien de temps la coiffeuse a-t-elle mis pour répondre ?
* quelle réponse a-t-elle donnée ?
* quelles modifications a-t-elle demandées ?
* combien d’invitations ont expiré ?
* combien de vagues ont été nécessaires ?
* un élargissement a-t-il été nécessaire ?
* quelle réponse a finalement produit une proposition ferme ?
* comment les invitations sont-elles réparties entre les coiffeuses ?

Ces données permettront plus tard d’automatiser sur des faits observés, et non sur des règles supposées.

---

# 16. Critères de sortie vers l’étape 3

Une réponse peut passer à l’étape 3 si :

* elle provient d’une invitation valide ;
* elle correspond à la bonne version de la demande ;
* la coiffeuse a exprimé un intérêt explicite ;
* les modifications éventuelles sont structurées ;
* les informations nécessaires ont été obtenues ;
* la réponse respecte les limites de la cliente ou attend clairement son accord ;
* la capacité est toujours ouverte ;
* la campagne n’a pas été annulée ;
* la réponse n’est pas expirée.

La sortie de l’étape 2 peut ainsi être résumée par :

> **La plateforme a identifié, sollicité et obtenu les réponses provisoires d’un nombre limité de capacités compatibles. Elle sait maintenant quelles coiffeuses peuvent être invitées à vérifier définitivement la faisabilité et à produire une proposition ferme.**

---

# 17. Frontière avec la galerie de prestation

L’éligibilité repose d’abord sur :

* la prestation ;
* les compétences déclarées ;
* les variantes proposées ;
* la disponibilité ;
* le lieu ;
* le budget ;
* les conditions techniques.

La galerie sert ensuite de :

* preuve de spécialisation ;
* support d’explication ;
* signal de confiance ;
* élément de sélection pour la cliente.

Lorsqu’une capacité est présentée, la cliente doit voir la galerie de la **prestation concernée** (`SERVICE_GALLERY`), éventuellement filtrée selon les variantes réellement ouvertes par cette capacité, et non une galerie générale de la coiffeuse. La capacité expose un sous-ensemble compatible ; elle ne possède pas sa propre galerie.

Chaque contenu affiché doit indiquer clairement sa nature :

* `VERIFIED_REALIZATION` — « Prestation réalisée via la plateforme » / « Réalisé par cette coiffeuse » ;
* `DECLARED_REALIZATION` — réalisation déclarée, niveau de preuve distinct ;
* `REFERENCE_INSPIRATION` — « Exemple de style » / « Inspiration fournie à titre indicatif ».

Le « niveau de preuve disponible » indique la présence ou le volume par type (aucune réalisation, galerie déclarée, quelques réalisations vérifiées, historique vérifié significatif). Il ne remplace pas l’éligibilité opérationnelle.

Pendant le pilote, une galerie limitée ne doit pas exclure automatiquement une capacité éligible. La plateforme peut afficher :

> Galerie encore limitée.
