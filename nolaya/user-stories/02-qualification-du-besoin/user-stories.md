# Étape 02 — Qualification du besoin

## Finalité et valeur utilisateur

Cette étape transforme un besoin parfois vague en une demande claire, réaliste et exploitable par le matching.

La cliente n'a pas besoin de connaître le nom technique exact d'une coiffure. Nolaya l'aide à préciser le résultat recherché, le contexte, les fournitures, le budget, la date, le lieu et les contraintes qui comptent réellement, puis lui permet de valider un résumé compréhensible.

La valeur produite est une demande qualifiée, modifiable et suffisamment explicite pour éviter les mauvaises correspondances et les échanges tardifs sur des informations essentielles.

## Périmètre et préconditions

### Points d'entrée

- action **Trouver ma coiffeuse** depuis l'accueil, sans donnée préremplie ;
- action **Vérifier cette prestation** depuis l'étape 1, avec prestation et ville préremplies ;
- reprise d'un brouillon anonyme encore valide.

### Préconditions produit

- une session anonyme permet d'enregistrer et de modifier le brouillon ;
- le catalogue fournit les familles de prestations et les questions propres à chaque famille ;
- les valeurs provenant de l'étape 1 sont des suggestions modifiables, pas des choix verrouillés ;
- les coordonnées personnelles ne sont pas nécessaires à cette étape ;
- seule une demande à l'état **QUALIFIED** peut déclencher le matching de l'étape 3.

### Données couvertes

| Famille | Informations attendues |
|---|---|
| Résultat | prestation ou famille, variante, longueur, taille, couleur, finition, inspirations éventuelles |
| Contexte | quotidien, événement, urgence, vacances, protection, correction ou autre objectif utile |
| Temps | date souhaitée, date limite, créneaux, durée maximale et flexibilité explicitement autorisée |
| Fournitures | éléments nécessaires, responsable de la fourniture, compatibilité et coût inclus, séparé ou à confirmer |
| Budget | cible, maximum, éléments à inclure et flexibilité |
| Géographie | ville, zone, distance ou temps acceptable et lieu souhaité |
| Cheveux et confort | informations déclarées utiles à la faisabilité, sensibilité, tension refusée et autres contraintes pertinentes |
| Priorité | qualité, prix, disponibilité, proximité, confiance, confort ou durée |

## Chaîne d'interactions utilisateur

| Séquence | Interaction de la cliente | Réponse attendue de Nolaya | Valeur obtenue |
|---|---|---|---|
| 1 | Ouvrir la qualification | Reprendre le contexte ou le brouillon disponible | Éviter la ressaisie |
| 2 | Indiquer si son besoin est précis, inspiré ou encore indécis | Adapter le niveau d'accompagnement | Pouvoir s'exprimer sans vocabulaire technique |
| 3 | Préciser le résultat et ses caractéristiques | Afficher uniquement les questions pertinentes | Structurer la prestation recherchée |
| 4 | Expliquer le contexte, la date et la flexibilité | Distinguer souhait, limite et alternatives autorisées | Rendre la contrainte temporelle exploitable |
| 5 | Indiquer le budget cible et maximal | Distinguer objectif, plafond et coûts encore inconnus | Éviter un dépassement inattendu |
| 6 | Préciser qui fournit mèches, extensions, accessoires ou consommables | Rendre les responsabilités et coûts visibles | Préparer une demande faisable |
| 7 | Définir ville, mobilité et lieu souhaité | Associer la zone et les modalités de service | Délimiter le matching géographique |
| 8 | Déclarer les contraintes de cheveux, de confort et sa priorité | Séparer obligatoire, préféré et flexible | Éviter les offres inadaptées et préparer le classement |
| 9 | Relire le résumé | Permettre la correction bloc par bloc | Donner le contrôle sur la demande utilisée |
| 10 | Choisir **Rechercher** | Valider la version complète comme **QUALIFIED** et ouvrir l'étape 3 | Lancer le matching sans contacter de coiffeuse |

## User stories et critères d'acceptation

### US-02.1 — Reprendre le contexte sans ressaisie

**En tant que** cliente,  
**je veux** retrouver la prestation, la ville ou le brouillon déjà choisi,  
**afin de** poursuivre mon parcours sans recommencer.

| Étant donné | Quand | Alors |
|---|---|---|
| une prestation et une ville transmises par l'étape 1 | la qualification s'ouvre | les deux valeurs sont visibles, préremplies et modifiables |
| un brouillon anonyme encore valide | la cliente reprend le parcours | les réponses déjà enregistrées réapparaissent dans les bons blocs |
| des données préremplies | la cliente les modifie | les nouvelles valeurs remplacent les suggestions sans effacer les autres blocs compatibles |
| aucune donnée antérieure | la cliente arrive depuis **Trouver ma coiffeuse** | un parcours guidé vide démarre sans message d'erreur |
| une cliente sans compte | elle complète ou quitte temporairement le formulaire | le brouillon peut être conservé selon la durée de session annoncée, sans exiger d'inscription |

### US-02.2 — Décrire un résultat sans connaître les termes techniques

**En tant que** cliente qui ne connaît pas forcément le vocabulaire technique,  
**je veux** partir d'un besoin précis, d'une inspiration ou d'un accompagnement guidé,  
**afin de** décrire le résultat que je souhaite réellement.

| Étant donné | Quand | Alors |
|---|---|---|
| le choix du point de départ | la cliente indique qu'elle connaît la prestation | Nolaya lui permet de choisir directement la famille ou la prestation, puis ses variantes pertinentes |
| le choix du point de départ | la cliente choisit une inspiration | l'inspiration est reliée à une prestation ou une famille connue et reste présentée comme une référence, jamais comme une garantie de résultat |
| le choix du point de départ | la cliente demande à être guidée | Nolaya propose des choix visuels et progressifs portant sur le résultat, la longueur, la taille, la couleur et la finition |
| une famille de prestation sélectionnée | le questionnaire continue | seuls les champs utiles à cette famille sont affichés |
| une caractéristique que la cliente ne connaît pas | elle choisit **Je ne sais pas** ou **À confirmer** | la valeur reste explicitement inconnue sans l'obliger à inventer une réponse |
| plusieurs inspirations encore possibles | la cliente les conserve | une préférence principale et des alternatives courtes peuvent être enregistrées sans que Nolaya choisisse à sa place |
| une image personnelle ajoutée | elle est associée au brouillon | elle est décrite comme une référence destinée à la professionnelle, sans promesse d'analyse ou de diagnostic automatique |

### US-02.3 — Qualifier le contexte et les contraintes temporelles

**En tant que** cliente,  
**je veux** préciser le contexte, la date souhaitée, ma limite et mes flexibilités,  
**afin de** recevoir uniquement des propositions temporellement pertinentes.

| Étant donné | Quand | Alors |
|---|---|---|
| le bloc de contexte | la cliente choisit un événement, une urgence ou un objectif pratique | le contexte est enregistré séparément du style recherché |
| le bloc temporel | la cliente saisit une date souhaitée et une date limite | les deux valeurs restent distinctes dans le formulaire et dans le résumé |
| une date limite antérieure à la date souhaitée | la cliente tente de continuer | l'incohérence est signalée et la progression reste bloquée jusqu'à correction |
| une date très proche | la cliente la valide | le besoin est qualifié comme urgent, sans promesse de disponibilité |
| des créneaux ou dates alternatives | la cliente les autorise explicitement | seuls ces choix peuvent être exploités automatiquement par l'étape 3 |
| aucune flexibilité autorisée | la demande est résumée | la date ou la plage demandée apparaît comme une contrainte stricte |

### US-02.4 — Maîtriser le budget et les fournitures

**En tant que** cliente,  
**je veux** préciser mon budget et qui fournit le matériel nécessaire,  
**afin de** comprendre le coût attendu et d'éviter une préparation incomplète.

| Étant donné | Quand | Alors |
|---|---|---|
| le bloc budget | la cliente saisit une cible et un maximum | le résumé distingue l'objectif de prix du plafond à ne pas dépasser |
| un budget cible supérieur au maximum | la cliente tente de continuer | l'incohérence est signalée et doit être corrigée |
| un budget probablement insuffisant | Nolaya détecte l'écart | un avertissement explique le risque et permet de conserver un plafond strict ou de déclarer une flexibilité ; aucun montant n'est modifié automatiquement |
| un élément nécessaire à la prestation | la cliente répond à la question de fourniture | elle peut choisir **Je l'apporte**, **La coiffeuse le fournit** ou **J'ai besoin d'un conseil / à confirmer** |
| la cliente apporte un élément dont la référence est incertaine | elle valide son choix | la responsabilité est enregistrée et la compatibilité apparaît **à confirmer par la coiffeuse** |
| la coiffeuse doit fournir un élément | le coût n'est pas connu | Nolaya affiche **fourniture et coût à confirmer** au lieu d'inventer un montant |
| la coiffeuse fournit un élément | le résumé est affiché | le coût est qualifié comme inclus, séparé ou à confirmer ; le verbe *fournir* ne signifie jamais automatiquement *gratuit* |

### US-02.5 — Préciser lieu, contraintes de confort et priorité

**En tant que** cliente,  
**je veux** préciser ma zone, mon lieu souhaité et mes contraintes utiles,  
**afin de** ne pas recevoir une offre inadaptée à ma mobilité, mes cheveux ou mon confort.

| Étant donné | Quand | Alors |
|---|---|---|
| le bloc géographique | la cliente choisit ville, distance acceptable et modalité de lieu | la ville, la zone, la mobilité et le lieu souhaité sont enregistrés séparément |
| une contrainte de lieu obligatoire | la cliente la marque comme telle | une offre qui ne la satisfait pas pourra être exclue au matching |
| le bloc cheveux et confort | la cliente déclare une sensibilité, un état connu ou un refus de tension | seules les informations utiles à la faisabilité, au confort ou à la sécurité sont demandées |
| une information capillaire inconnue | la cliente l'indique | elle peut poursuivre sans inventer de texture, de densité ou de diagnostic |
| une question pouvant relever d'un diagnostic médical | le formulaire est affiché | Nolaya demande uniquement un constat déclaré utile et ne formule aucune conclusion médicale |
| les critères sont récapitulés | la cliente les relit | les contraintes obligatoires, les préférences et les marges de flexibilité sont clairement séparées |
| le choix de priorité | la cliente sélectionne ce qui compte le plus | une priorité principale unique est enregistrée pour ordonner les offres après leur éligibilité |

### US-02.6 — Relire et valider la version utilisée par le matching

**En tant que** cliente,  
**je veux** relire et corriger mon besoin avant de lancer la recherche,  
**afin de** maîtriser exactement les critères utilisés pour trouver une coiffeuse.

| Étant donné | Quand | Alors |
|---|---|---|
| un brouillon contenant tous les blocs indispensables | le résumé est affiché | il présente résultat, contexte, temps, budget, fournitures, géographie, contraintes, priorité et inconnues restantes |
| un résumé affiché | la cliente choisit **Modifier** sur un bloc | elle revient au bloc concerné et les autres réponses sont conservées |
| une donnée indispensable manquante | la cliente choisit **Rechercher** | la demande reste **INCOMPLETE**, le bloc concerné est identifié et l'étape 3 ne s'ouvre pas |
| une incohérence devant être arbitrée | la cliente choisit **Rechercher** | la demande passe ou reste en **REVIEW_REQUIRED** jusqu'à une décision explicite |
| un résumé complet et cohérent | la cliente choisit **Rechercher** | une version datée devient **QUALIFIED** et l'étape 3 reçoit exactement cette dernière version |
| une demande qualifiée déjà existante | la cliente modifie un élément important puis revalide | une nouvelle version remplace la précédente comme version active, tandis que l'historique reste identifiable |
| une demande devient **QUALIFIED** | la transition vers l'étape 3 aboutit | aucune coiffeuse n'a été contactée et aucune réservation n'a été créée |

## Branches, erreurs et cas limites

| Situation | Réponse attendue | Effet sur l'état |
|---|---|---|
| Style inconnu | Proposer des inspirations ou une famille de résultat, avec une option **Je ne sais pas** | Le brouillon reste modifiable |
| Plusieurs styles possibles | Conserver une préférence principale et quelques alternatives, puis rendre leurs différences visibles | La demande peut être qualifiée si le socle commun est exploitable |
| Budget probablement insuffisant | Informer sans augmenter le budget et demander si le plafond est strict ou flexible | **REVIEW_REQUIRED** tant que l'arbitrage nécessaire manque |
| Date très proche | Signaler l'urgence sans promettre de solution | La demande peut devenir **QUALIFIED** |
| Date ou budget incohérent | Identifier les deux valeurs en conflit et demander une correction | **INCOMPLETE** ou **REVIEW_REQUIRED** |
| Fourniture apportée mais référence inconnue | Conserver la responsabilité et marquer la compatibilité **à confirmer** | La demande peut devenir **QUALIFIED** si l'incertitude est transmissible |
| Fourniture professionnelle au coût inconnu | Afficher **à confirmer** sans inventer de prix | La demande peut devenir **QUALIFIED** selon le caractère bloquant du budget |
| Photo nécessaire à une décision future | Indiquer qu'elle devra être transmise comme référence, sans analyse automatique | La demande reste qualifiable si la photo n'est pas indispensable au matching |
| Brouillon anonyme expiré | Expliquer l'expiration et proposer de recommencer | **ABANDONED** pour l'ancien brouillon |

## États et sorties

| État | Signification observable | Transition possible |
|---|---|---|
| **DRAFT** | La qualification a commencé et au moins une réponse est enregistrée | Continuer, quitter temporairement ou abandonner |
| **INCOMPLETE** | Une donnée indispensable au matching manque | Compléter le bloc identifié |
| **REVIEW_REQUIRED** | Une incohérence ou une incertitude exige une décision de la cliente | Corriger, préciser ou confirmer une flexibilité |
| **QUALIFIED** | Le résumé actif contient les données minimales et a été validé | Ouvrir l'étape 3 avec cette version |
| **ABANDONED** | Le brouillon a été quitté définitivement ou a expiré | Démarrer une nouvelle demande |

La sortie vers l'étape 3 est une version qualifiée comprenant au minimum : prestation principale et alternatives éventuelles, caractéristiques recherchées, contexte, dates et flexibilités autorisées, budget cible et maximum, fournitures et responsabilités, ville et modalités de lieu, contraintes obligatoires, préférences, priorité principale, inconnues explicites et références visuelles éventuelles.

## Hors périmètre

Cette étape ne réalise pas :

- un diagnostic capillaire ou médical ;
- une analyse automatique garantissant la faisabilité d'une inspiration ou d'une photo ;
- le classement ou la comparaison d'offres ;
- la confirmation d'un prix, d'une date ou d'une disponibilité ;
- la collecte des coordonnées nécessaires au contact ;
- l'envoi de la demande à une coiffeuse ;
- une réservation, un accord ou un paiement.
