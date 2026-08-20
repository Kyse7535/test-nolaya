# Étape 01 — Accueil et découverte

## Finalité et valeur utilisateur

Cette étape permet à une visiteuse de comprendre rapidement la promesse de Nolaya, de découvrir des prestations réelles et de choisir un premier point de départ sans créer de compte.

La valeur produite est une première projection concrète : la cliente peut identifier une prestation, une coiffeuse associée et une zone pertinente avant de consacrer du temps à la définition détaillée de son besoin.

À ce stade, Nolaya aide à découvrir. La plateforme ne prétend pas encore avoir réalisé un matching, confirmé une disponibilité ou réservé un rendez-vous.

## Périmètre et préconditions

### Périmètre

- arrivée sur la page d'accueil ou depuis un lien public partagé ;
- choix entre une entrée directe dans la qualification et une exploration libre ;
- consultation anonyme d'offres actives ;
- choix manuel d'une ville ou géolocalisation volontaire ;
- consultation d'une prestation et du profil professionnel associé ;
- conservation d'une première piste et transfert de son contexte à l'étape 2.

### Préconditions produit

- les prestations affichées sont actives, datées et suffisamment renseignées ;
- chaque carte correspond à une offre identifiable proposée par une coiffeuse identifiable ;
- une sélection temporaire peut être conservée dans une session anonyme ;
- la ville et une position approximative suffisent au classement géographique ;
- aucune donnée de compte ou coordonnée de contact n'est nécessaire ;
- la géolocalisation du navigateur n'est demandée qu'après une action explicite de la cliente.

## Chaîne d'interactions utilisateur

| Séquence | Interaction de la cliente | Réponse attendue de Nolaya | Valeur obtenue |
|---|---|---|---|
| 1 | Arriver sur l'accueil | Présenter la promesse et les actions **Explorer** et **Trouver ma coiffeuse** | Comprendre immédiatement le service |
| 2 | Choisir **Explorer** | Ouvrir le catalogue sans formulaire ni inscription | Se projeter librement |
| 3 | Parcourir les cartes | Afficher prestation, coiffeuse, ville, visuel et prix qualifié | Identifier des pistes concrètes |
| 4 | Saisir une ville ou choisir **Autour de moi** | Définir une ville de référence avec le consentement requis | Rendre la découverte localement pertinente |
| 5 | Consulter les résultats territoriaux | Afficher d'abord la ville, puis la même zone par distance croissante | Comprendre le périmètre réellement recherché |
| 6 | Ouvrir une prestation ou le profil associé | Présenter les informations connues, estimées et à confirmer | Évaluer une première piste sans fausse promesse |
| 7 | Retenir ou vérifier une prestation | Conserver la piste dans la session et préremplir l'étape 2 | Commencer la qualification sans ressaisie |
| 8 | Choisir directement **Trouver ma coiffeuse** | Ouvrir l'étape 2 sans imposer l'exploration | Répondre à un besoin déjà mûr |

## User stories et critères d'acceptation

### US-01.1 — Choisir son point d'entrée

**En tant que** visiteuse,  
**je veux** choisir entre explorer des prestations et définir directement mon besoin,  
**afin de** commencer le parcours selon mon niveau de maturité.

| Étant donné | Quand | Alors |
|---|---|---|
| une visiteuse sur l'accueil sans compte | elle choisit **Explorer** | le catalogue s'ouvre sans formulaire préalable et sans demande d'inscription |
| une visiteuse sur l'accueil sans compte | elle choisit **Trouver ma coiffeuse** | l'étape 2 s'ouvre directement |
| une visiteuse qui utilise l'une des deux entrées | elle poursuit son parcours | aucune création de compte n'est exigée ni présentée comme une condition de continuation |
| une visiteuse arrivée depuis un lien public valide | elle ouvre le lien | elle peut consulter le contenu public puis rejoindre l'exploration ou la qualification |

### US-01.2 — Explorer des prestations réelles anonymement

**En tant que** visiteuse,  
**je veux** parcourir des prestations réelles sans donner mes coordonnées,  
**afin de** me projeter avant de formuler une demande.

| Étant donné | Quand | Alors |
|---|---|---|
| un catalogue contenant des offres actives | la cliente affiche la grille | chaque carte identifie au minimum la prestation, la coiffeuse associée, la ville, un visuel et le prix avec son niveau de certitude |
| une carte affichée | la cliente l'ouvre | la fiche conserve le lien explicite entre la réalisation, la prestation et la coiffeuse |
| une cliente arrivée sur l'accueil | elle choisit **Explorer**, puis ouvre une carte | une prestation consultable est atteinte en deux actions au maximum |
| une cliente qui consulte ou conserve une carte | elle revient au catalogue | son action n'a créé ni demande qualifiée, ni sollicitation professionnelle, ni réservation |
| une offre inactive ou insuffisamment renseignée | le catalogue principal est chargé | cette offre n'est pas présentée comme une suggestion active |

### US-01.3 — Définir une zone de découverte contrôlée

**En tant que** cliente,  
**je veux** rechercher dans une ville ou autour de moi,  
**afin de** voir en priorité les prestations géographiquement pertinentes.

| Étant donné | Quand | Alors |
|---|---|---|
| aucune ville de référence | la cliente saisit et sélectionne une ville | cette ville devient la référence de la recherche sans demander l'adresse privée de la cliente |
| aucune ville de référence | la cliente choisit **Autour de moi** | la demande d'autorisation du navigateur apparaît uniquement après ce choix |
| une demande de géolocalisation affichée | la cliente refuse | le parcours reste utilisable, le champ de ville reprend la main et aucune relance insistante n'est affichée |
| une demande de géolocalisation affichée | la cliente accepte | une ville et une zone sont déterminées à partir d'une position approximative |
| une ville couverte contenant des offres éligibles | les résultats sont affichés | les offres de cette ville précèdent celles des autres villes de la même zone |
| plusieurs offres éligibles dans un même niveau territorial | elles sont affichées | elles sont ordonnées par distance croissante, sans rendre éligible une offre incompatible |
| la zone choisie ne suffit pas | Nolaya propose un périmètre extérieur | aucun résultat extérieur n'est ajouté avant l'acceptation explicite de la cliente |

### US-01.4 — Examiner et retenir une première piste

**En tant que** cliente,  
**je veux** examiner une prestation et conserver mon choix,  
**afin de** commencer la définition de mon besoin sans ressaisir son contexte.

| Étant donné | Quand | Alors |
|---|---|---|
| une carte de prestation active | la cliente ouvre sa fiche | les informations certaines, indicatives et à confirmer sont visuellement distinguées |
| un profil professionnel référencé | la cliente le consulte | le profil n'est pas présenté comme disponible, certifié ou inscrit du seul fait de son référencement |
| une prestation consultée | la cliente choisit **Ajouter à ma sélection** | la sélection anonyme contient cette prestation et passe à l'état **SELECTION_STARTED** |
| une prestation consultée avec une ville de référence | la cliente choisit **Vérifier cette prestation** | l'étape 2 reçoit la prestation et la ville comme valeurs préremplies et modifiables |
| une prestation désactivée pendant la consultation | la cliente tente de la retenir | l'action est refusée, le motif est expliqué et un retour vers les résultats est proposé |
| une prestation est retenue ou transmise à l'étape 2 | l'action aboutit | aucune coiffeuse n'est contactée et aucune disponibilité n'est considérée comme confirmée |

## Branches, erreurs et cas limites

| Situation | Comportement attendu | Comportement interdit |
|---|---|---|
| Géolocalisation refusée ou indisponible | Redonner immédiatement la main à la recherche manuelle par ville | Bloquer le parcours ou redemander en boucle l'autorisation |
| Ville non couverte | Expliquer l'absence de couverture et proposer volontairement une zone couverte | Modifier silencieusement la ville recherchée |
| Aucun résultat dans la ville | Afficher les offres éligibles de la même zone dans une section distincte | Mélanger ville et zone sans indication |
| Aucun résultat dans la zone | Proposer un élargissement explicite que la cliente peut accepter ou refuser | Ajouter automatiquement des villes extérieures |
| Offre devenue inactive | Retirer les actions de sélection et proposer un retour aux résultats | Laisser la cliente commencer une demande sur une offre obsolète |
| Prix ou disponibilité anciens | Afficher **indicatif** ou **à confirmer**, ou retirer l'offre principale si l'information n'est plus exploitable | Présenter une valeur ancienne comme garantie |
| Lien partagé invalide ou contenu retiré | Expliquer que le contenu n'est plus disponible et proposer l'accueil | Afficher une erreur sans issue utilisateur |

## États et sorties

| État | Déclencheur observable | Sortie possible |
|---|---|---|
| **DISCOVERY_ACTIVE** | La cliente explore sans ville de référence | Choisir une ville, ouvrir une offre ou rejoindre l'étape 2 |
| **LOCATION_SELECTED** | Une ville est saisie ou déduite avec consentement | Consulter les résultats ordonnés de la ville et de la zone |
| **ITEM_VIEWED** | Une prestation ou un profil a été ouvert | Revenir aux résultats, retenir ou vérifier la prestation |
| **SELECTION_STARTED** | Au moins une prestation a été retenue dans la session | Continuer l'exploration ou qualifier une piste |
| **HANDED_TO_QUALIFICATION** | La cliente choisit de vérifier une prestation ou de trouver une coiffeuse | Ouvrir l'étape 2 avec le contexte disponible |

La sortie vers l'étape 2 contient au plus : l'identifiant de la prestation retenue, sa famille, le profil associé, la ville et la zone de référence, ainsi que la sélection anonyme temporaire. Toutes ces données restent modifiables pendant la qualification.

## Hors périmètre

Cette étape ne réalise pas :

- la qualification complète du besoin ;
- le matching entre une demande et des offres ;
- la confirmation du prix, de la durée ou de la disponibilité ;
- la collecte de coordonnées personnelles ;
- le contact avec une coiffeuse ;
- la réservation d'un créneau, un accord ou un paiement.
