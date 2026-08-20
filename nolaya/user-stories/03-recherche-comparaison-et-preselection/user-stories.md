# Étape 03 — Recherche, comparaison et présélection

## Décision produit retenue

L'ancienne étape 4 n'est plus une étape autonome. Ses capacités de comparaison et de présélection sont absorbées dans l'étape 3 afin que la cliente suive un seul parcours cohérent : **comprendre les résultats → retenir des offres → les comparer → choisir une option principale et des alternatives**.

Les règles de sélection sont fixées ainsi :

| Notion | Règle produit |
|---|---|
| Sélection de travail | De 1 à 5 offres retenues par la cliente |
| Comparaison simultanée | 2 ou 3 offres comparables, lorsque la sélection le permet |
| Offre unique | Une seule offre éligible peut être évaluée et choisie sans comparaison artificielle |
| Présélection active | 1 offre principale obligatoire et jusqu'à 2 alternatives facultatives |
| Transmission à l'étape 5 | L'offre principale et les alternatives explicitement désignées |
| Effet métier | Aucune sollicitation professionnelle, réservation ou confirmation |

Il n'existe donc ni dossier utilisateur `04`, ni passage obligatoire par un écran séparé d'étape 4.

## Finalité et valeur utilisateur

Cette étape transforme la dernière version qualifiée du besoin en une présélection courte, compréhensible et assumée par la cliente.

La valeur produite n'est pas une simple liste de profils populaires ou proches. Nolaya :

- exclut les incompatibilités certaines avec les contraintes obligatoires ;
- recherche au niveau d'une prestation précise proposée par une coiffeuse ;
- explique les raisons de pertinence, les écarts et les inconnues ;
- permet une comparaison homogène des conditions réellement connues ;
- aide la cliente à désigner une offre principale tout en conservant des solutions de repli.

À la fin de cette étape, la cliente a trouvé des options potentiellement compatibles. Elle n'a pas encore obtenu l'acceptation réelle d'une coiffeuse.

## Périmètre et préconditions

### Périmètre

- chargement et affichage des critères de la dernière demande **QUALIFIED** ;
- filtrage des offres selon la prestation, les contraintes, la géographie, le temps, le budget et les modalités ;
- distinction entre correspondances exactes, résultats à confirmer et alternatives ;
- explication de chaque résultat et consultation de preuves contextualisées ;
- sélection de 1 à 5 offres ;
- comparaison de 2 ou 3 offres lorsque cela apporte une comparaison valide ;
- choix explicite d'une offre principale et de 0 à 2 alternatives ;
- gestion d'une offre unique et du zéro résultat ;
- transmission de la présélection active à l'étape 5.

### Préconditions produit

- une demande **QUALIFIED** et versionnée existe ;
- Nolaya peut identifier sans ambiguïté sa dernière version active ;
- les offres disposent d'un statut actif, d'une date de mise à jour et de données structurées ;
- prix, durée, disponibilité, lieu et fournitures possèdent un niveau de certitude ;
- les contraintes obligatoires, préférences, flexibilités autorisées et priorité principale sont distinguées ;
- aucune coordonnée privée de coiffeuse n'est nécessaire ou affichée.

## Chaîne d'interactions utilisateur

| Séquence | Interaction de la cliente | Réponse attendue de Nolaya | Valeur obtenue |
|---|---|---|---|
| 1 | Ouvrir la recherche | Afficher le résumé compact de la version qualifiée utilisée | Vérifier les critères avant le matching |
| 2 | Lancer ou relancer la recherche | Exclure les incompatibilités et classer les offres éligibles | Obtenir des résultats réellement liés au besoin |
| 3 | Parcourir les groupes de résultats | Séparer exact, à confirmer et alternatives | Comprendre le niveau de compatibilité |
| 4 | Ouvrir une offre | Montrer conditions, raisons, écarts, inconnues et preuves pertinentes | Évaluer la fiabilité de chaque piste |
| 5 | Retenir ou retirer des offres | Conserver une sélection de travail comprise entre 1 et 5 offres | Construire une liste courte maîtrisée |
| 6 | Choisir 2 ou 3 offres à comparer | Aligner les mêmes critères et niveaux de certitude | Arbitrer sur une base homogène |
| 7 | Désigner une offre principale et jusqu'à 2 alternatives | Rendre le choix explicite et modifiable | Préparer une vérification ciblée des conditions |
| 8 | Continuer | Transmettre uniquement la présélection active à l'étape 5 | Poursuivre sans contacter les coiffeuses |
| 9 | En cas d'insuffisance | Expliquer le blocage et proposer un assouplissement ciblé | Laisser la cliente contrôler toute modification du besoin |

## User stories et critères d'acceptation

### US-03.1 — Rechercher à partir de la dernière demande qualifiée

**En tant que** cliente,  
**je veux** vérifier les critères utilisés et lancer la recherche,  
**afin de** savoir que les résultats correspondent à la dernière version de mon besoin.

| Étant donné | Quand | Alors |
|---|---|---|
| une demande dont la dernière version est **QUALIFIED** | la cliente ouvre l'étape 3 | le résumé affiche cette version, ses contraintes obligatoires, ses préférences et ses flexibilités autorisées |
| une demande qualifiée | la cliente lance la recherche | Nolaya évalue d'abord la prestation et les contraintes obligatoires, puis utilise les préférences et la priorité pour classer les offres éligibles |
| une offre incompatible avec une contrainte obligatoire | le matching s'exécute | cette offre est exclue des correspondances et n'est pas simplement placée plus bas |
| une demande modifiée et requalifiée | la cliente relance la recherche | seule la nouvelle version active est utilisée et le numéro ou la date de version visible change |
| une demande absente, incomplète ou non qualifiée | la cliente tente d'ouvrir la recherche | le matching ne démarre pas et une action permet de revenir compléter l'étape 2 |
| un matching en cours ou relancé | les résultats sont calculés | aucune coiffeuse n'est contactée |

### US-03.2 — Comprendre le niveau réel de compatibilité

**En tant que** cliente,  
**je veux** distinguer les correspondances exactes, les résultats à confirmer et les alternatives,  
**afin de** comprendre la pertinence et les limites de chaque offre.

| Étant donné | Quand | Alors |
|---|---|---|
| au moins une offre respectant toutes les contraintes obligatoires | les résultats sont affichés | une section **Correspondances exactes** est visible |
| une offre dont une information essentielle est inconnue | elle reste potentiellement éligible | elle est présentée **À confirmer** et l'inconnue est nommée |
| une offre qui ne satisfait qu'une préférence non bloquante | elle est affichée | l'écart est visible et l'offre n'est pas présentée comme exacte |
| un résultat affiché | la cliente consulte sa carte | elle voit la prestation précise, la coiffeuse, le prix probable et sa certitude, la durée, le lieu, la disponibilité et sa fiabilité, ainsi que les principaux écarts |
| un résultat affiché | la cliente demande pourquoi il apparaît | deux ou trois raisons utiles expliquent sa pertinence sans masquer les incertitudes majeures |
| des offres éligibles dans la ville et dans la même zone | elles sont classées | la ville de référence précède la zone et la distance n'ordonne que les offres déjà compatibles |
| une même coiffeuse propose plusieurs offres | plusieurs apparaissent | chacune correspond à une prestation ou une configuration réellement distincte |
| une offre à domicile ou dans un lieu privé | sa localisation est affichée | seule la ville ou une position approximative est visible, jamais l'adresse privée exacte |

### US-03.3 — Constituer une sélection de travail de 1 à 5 offres

**En tant que** cliente,  
**je veux** retenir plusieurs offres pertinentes,  
**afin de** conserver des options avant de choisir ma préférence.

| Étant donné | Quand | Alors |
|---|---|---|
| un résultat éligible non retenu | la cliente choisit **Retenir** | l'offre rejoint la sélection de travail et le compteur est mis à jour |
| une offre déjà retenue | la cliente choisit **Retirer** | l'offre quitte la sélection sans modifier les autres choix |
| une sélection contenant moins de 5 offres | la cliente ajoute une offre | l'ajout est accepté jusqu'à un total de 5 |
| une sélection contenant déjà 5 offres | la cliente tente d'en ajouter une sixième | Nolaya bloque l'ajout et propose de remplacer une offre existante ; aucun choix n'est supprimé automatiquement |
| une sélection conservée pendant la navigation | la cliente ouvre une offre puis revient | les offres retenues sont toujours présentes dans la session |
| une offre retenue modifiée depuis le matching | la cliente ouvre la sélection ou tente de continuer | sa compatibilité est recalculée ; tout changement important et son effet sont affichés |
| une offre retenue devenue inactive ou incompatible | le recalcul s'exécute | elle ne peut plus devenir principale et la cliente est invitée à la remplacer |
| une offre rejoint la sélection | l'action aboutit | aucune sollicitation, réservation ou demande professionnelle n'est créée |

### US-03.4 — Comparer 2 ou 3 offres sur une base homogène

**En tant que** cliente,  
**je veux** comparer les critères homogènes de quelques offres,  
**afin de** arbitrer sans être trompée par des données incomplètes ou incomparables.

| Étant donné | Quand | Alors |
|---|---|---|
| une sélection contenant 2 ou 3 offres suffisamment comparables | la cliente choisit **Comparer** | les offres sont alignées dans une même vue |
| une sélection contenant 4 ou 5 offres | la cliente choisit **Comparer** | elle doit choisir 2 ou 3 offres pour la comparaison simultanée ; les autres restent dans la sélection |
| une comparaison affichée | la cliente parcourt les critères | chaque colonne présente la même configuration de prestation, le coût probable, les inclusions, la durée, le lieu et la disponibilité |
| une valeur fixe, estimée, « à partir de » ou inconnue | elle apparaît dans la comparaison | son niveau de certitude est visible et une valeur inconnue n'est jamais remplacée par une estimation inventée |
| des suppléments ou fournitures connus | le coût est comparé | les éléments inclus, séparés et à confirmer sont distingués |
| deux offres ne sont pas comparables sur une configuration essentielle | la cliente tente de les aligner | Nolaya explique la différence et propose soit une configuration commune, soit l'évaluation détaillée séparée |
| une visibilité commerciale existe | les offres sont classées ou comparées | elle est identifiée séparément et ne modifie pas silencieusement le classement naturel |

### US-03.5 — Examiner des preuves contextualisées

**En tant que** cliente,  
**je veux** consulter les réalisations, avis et signaux de confiance utiles à mon besoin,  
**afin de** évaluer la compétence pertinente de chaque coiffeuse.

| Étant donné | Quand | Alors |
|---|---|---|
| une offre ouverte depuis les résultats ou la comparaison | la cliente consulte les preuves | les réalisations liées à la prestation recherchée sont présentées avant ou séparément des réalisations générales |
| des avis disponibles | la cliente les consulte | les avis portant sur la prestation et les avis généraux sont distingués |
| des signaux de confiance affichés | la cliente les examine | leur source, leur volume et leur fraîcheur sont visibles lorsqu'ils sont connus |
| aucune preuve spécifique disponible | la fiche est affichée | l'absence est indiquée comme information manquante au lieu d'être masquée |
| plusieurs offres éligibles | Nolaya met en avant une option | la recommandation reflète la priorité déclarée de la cliente après éligibilité et ne repose pas uniquement sur le prix le plus bas ou la popularité du profil |

### US-03.6 — Choisir une offre principale et jusqu'à 2 alternatives

**En tant que** cliente,  
**je veux** désigner explicitement mon option préférée et mes solutions de repli,  
**afin de** préparer la vérification des conditions sans perdre le contrôle de mon choix.

| Étant donné | Quand | Alors |
|---|---|---|
| une sélection contenant de 1 à 5 offres éligibles | la cliente désigne une offre comme principale | une seule offre porte le rôle **Principale** |
| une offre principale désignée | la cliente choisit des alternatives | elle peut en désigner 0, 1 ou 2 parmi les autres offres retenues |
| deux alternatives déjà désignées | la cliente tente d'en ajouter une troisième | l'ajout est bloqué et Nolaya lui propose de remplacer une alternative existante |
| une offre principale et des alternatives déjà choisies | la cliente change d'avis | elle peut changer les rôles sans relancer le matching tant que les offres restent éligibles |
| une sélection de 4 ou 5 offres | la présélection active est validée | les offres non désignées restent dans la sélection de travail mais ne sont pas transmises à l'étape 5 |
| aucune offre principale désignée | la cliente choisit **Vérifier les conditions** | la progression est bloquée et le choix attendu est indiqué |
| une offre principale éligible est désignée | la cliente choisit **Vérifier les conditions** | l'étape 5 reçoit l'offre principale et jusqu'à 2 alternatives explicitement choisies |
| la présélection est validée | la transition aboutit | aucun contact, créneau, accord, paiement ou réservation n'est créé |

### US-03.7 — Poursuivre avec une seule offre éligible

**En tant que** cliente qui ne dispose que d'une offre éligible,  
**je veux** pouvoir l'évaluer sans comparaison artificielle,  
**afin de** poursuivre si elle me convient ou modifier mon besoin si elle ne me convient pas.

| Étant donné | Quand | Alors |
|---|---|---|
| une seule offre éligible | les résultats sont affichés | Nolaya explique pourquoi l'offre est unique et affiche ses conditions, preuves, écarts et inconnues |
| une seule offre retenue | la cliente la désigne comme principale | elle peut continuer vers l'étape 5 sans ajouter une deuxième offre |
| une seule offre retenue | la cliente demande une comparaison | Nolaya propose l'évaluation détaillée de l'offre sans fabriquer de concurrent ou bloquer le parcours |
| l'offre unique ne convient pas | la cliente choisit de modifier son besoin | elle revient à l'étape 2 avec ses réponses conservées |

### US-03.8 — Contrôler les assouplissements en cas de résultat insuffisant

**En tant que** cliente sans résultat satisfaisant,  
**je veux** comprendre ce qui bloque et décider moi-même d'un éventuel assouplissement,  
**afin de** ne jamais recevoir de propositions fondées sur des critères que je n'ai pas autorisés.

| Étant donné | Quand | Alors |
|---|---|---|
| aucune correspondance exacte mais des résultats proches | les résultats sont affichés | les critères non satisfaits sont nommés et les offres restent séparées des correspondances exactes |
| aucun résultat éligible | la recherche se termine | Nolaya affiche **Aucun résultat** et identifie les principaux critères bloquants au lieu de fabriquer une offre |
| un assouplissement ciblé est possible | Nolaya le propose | l'avant, l'après et l'impact prévisible sur la recherche sont visibles |
| un assouplissement est proposé | la cliente le refuse | la demande et les résultats restent inchangés |
| un assouplissement est proposé | la cliente l'accepte explicitement | la modification est enregistrée dans une nouvelle version qualifiée ou confirmée à l'étape 2, puis le matching est relancé |
| aucune disponibilité n'existe à la date souhaitée | des alternatives sont évaluées | seules les dates ou plages déjà autorisées par la cliente sont utilisées automatiquement |
| aucune date autorisée n'est exploitable avant la limite | Nolaya propose la suite | l'action **Modifier mes dates** ramène la cliente à l'étape 2 ; aucune nouvelle date n'est choisie pour elle |
| aucune offre n'existe dans la ville | le périmètre est évalué | la même zone est explorée avant de proposer un autre périmètre, qui exige un consentement explicite |

## Branches, erreurs et cas limites

| Situation | Réponse attendue | Sortie possible |
|---|---|---|
| Demande non qualifiée | Bloquer le matching et renvoyer vers le bloc incomplet de l'étape 2 | Requalification |
| Correspondances exactes disponibles | Les afficher en premier et expliquer leur pertinence | Sélection de travail |
| Correspondances partielles uniquement | Nommer chaque écart ou inconnue sans les présenter comme exactes | Sélection prudente ou modification du besoin |
| Aucun résultat | Expliquer les critères bloquants et proposer des décisions ciblées | Assouplissement explicite, nouvelle qualification ou arrêt |
| Une seule offre | Autoriser son évaluation détaillée et sa désignation comme principale | Étape 5 ou modification du besoin |
| Offres incomparables | Expliquer la configuration différente et permettre l'examen séparé | Choix direct ou nouvelle sous-sélection |
| Sixième offre retenue | Exiger un remplacement explicite | Sélection maintenue à 5 maximum |
| Offre modifiée, ancienne ou inactive | Recalculer, signaler l'écart et exclure si elle n'est plus éligible | Remplacement ou nouveau matching |
| Prix total incompatible | Identifier le composant bloquant, notamment supplément ou fourniture | Modification contrôlée du budget ou autre offre |
| Disponibilité inconnue | Afficher **à confirmer** et ne jamais parler de créneau réservé | Conservation prudente ou autre offre |
| Calcul interrompu | Permettre de relancer sans perdre la demande ni la sélection déjà valide | Retour à **MATCHING** |

## États et sorties

| État | Signification observable | Transition possible |
|---|---|---|
| **MATCHING** | Les règles de compatibilité s'appliquent à la dernière demande qualifiée | Résultats exacts, partiels ou aucun résultat |
| **EXACT_MATCHES_FOUND** | Au moins une offre respecte toutes les contraintes obligatoires | Retenir de 1 à 5 offres |
| **PARTIAL_MATCHES_ONLY** | Seules des offres avec écarts ou inconnues restent exploitables | Examiner, retenir prudemment ou modifier la demande |
| **NO_MATCH** | Aucune offre n'est éligible | Refuser ou accepter un assouplissement ciblé |
| **SELECTION_IN_PROGRESS** | De 1 à 5 offres sont retenues sans choix principal finalisé | Comparer, ajouter, retirer ou désigner les rôles |
| **COMPARISON_READY** | De 2 à 3 offres comparables sont alignées | Choisir une principale et des alternatives |
| **SHORTLIST_READY** | Une principale et de 0 à 2 alternatives éligibles sont explicitement désignées | Ouvrir l'étape 5 |

La sortie vers l'étape 5 contient :

- l'identifiant et la version de la demande qualifiée utilisée ;
- une offre principale obligatoire ;
- jusqu'à 2 alternatives facultatives ;
- pour chaque offre, la configuration comparée, le prix et la durée avec leur certitude, le lieu, la disponibilité connue, les fournitures, les écarts et les points à confirmer ;
- la date du dernier contrôle d'éligibilité.

Cette sortie est une présélection de prestations potentielles. Elle ne constitue ni une demande envoyée, ni une acceptation professionnelle, ni une réservation.

## Hors périmètre

Cette étape ne réalise pas :

- une étape 4 autonome ou un passage obligatoire par un écran séparé de comparaison ;
- la configuration finale et l'acceptation des conditions d'une prestation ;
- la confirmation définitive du prix, de la durée ou de la disponibilité ;
- la collecte ou la révélation des coordonnées privées ;
- la sollicitation d'une coiffeuse ;
- la réservation ou le blocage d'un créneau ;
- un accord entre la cliente et la coiffeuse ;
- un paiement.
