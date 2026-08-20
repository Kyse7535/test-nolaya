# Étape 06 — Soumission de la demande

## Finalité et valeur utilisateur

Cette étape transforme le projet vérifié en un dossier unique, traçable et accessible sans compte. La cliente contrôle le contenu transmis, les coiffeuses qui pourront le recevoir, l'ordre de sollicitation et la durée d'attente qu'elle accepte.

La configuration commune est figée dans une version soumise. Pour chaque destinataire confirmé, le dossier fige également l'instantané de conditions propre à son offre. Le même besoin peut ainsi produire plusieurs sollicitations comparables sans être dupliqué ni perdre les différences entre coiffeuses.

Soumettre signifie demander une réponse. À la fin de cette étape, il n'existe ni réservation, ni créneau bloqué, ni prix final, ni paiement. Aucune coiffeuse n'est contactée avant la validation administrative prévue au début de l'étape 07.

## Périmètre et préconditions

### Préconditions

- Le projet est dans l'état **READY_TO_SUBMIT**.
- La configuration commune du besoin est complète et a été validée à l'étape 05.
- Au moins une offre/coiffeuse candidate possède un instantané exploitable.
- Les offres proposées comme destinataires appartiennent à la sélection explicite de la cliente.

### Dans le périmètre

- relire exactement les informations qui seront transmises ;
- choisir une ou plusieurs coiffeuses parmi les candidates autorisables ;
- choisir une stratégie de sollicitation ;
- afficher les fenêtres d'attente définies par la politique produit ;
- recueillir et vérifier un canal de contact sans créer de compte ;
- recueillir les consentements nécessaires et limités ;
- créer un dossier unique et une sollicitation interne par destinataire ;
- fournir un accès sécurisé et limité au dossier ;
- permettre une correction versionnée ou un retrait avant accord.

### Cardinalités produit

| Objet | Règle |
|---|---|
| Besoin cliente | Un besoin soumis produit un seul dossier. |
| Version soumise | Une version contient une configuration commune et un instantané propre à chaque destinataire confirmé. |
| Sollicitation | Un destinataire confirmé produit une sollicitation traçable dans le dossier unique. |
| Transaction active | Le dossier peut avoir plusieurs sollicitations ouvertes, mais au plus une transaction active. À la fin de l'étape 06, aucune proposition n'ayant été retenue, il n'y a encore aucune transaction active. |

## Interactions séquentielles

| Séquence | Ce que fait la cliente | Ce que Nolaya rend observable |
|---|---|---|
| 1 | Elle relit la demande commune et les conditions propres à chaque candidate. | Le récapitulatif correspond au projet validé à l'étape 05 et indique toujours les inconnues. |
| 2 | Elle choisit les coiffeuses qu'elle autorise à recevoir sa demande. | Seules les candidates de sa sélection sont proposées ; chaque choix conserve l'instantané associé. |
| 3 | Elle choisit toute la sélection, une prioritaire puis les autres, ou une seule coiffeuse. | L'ordre, la fenêtre de priorité et la durée d'attente issus de la politique configurée sont annoncés avant validation. |
| 4 | Elle renseigne son prénom et choisit un canal de contact. | Un code ou un lien de vérification est envoyé sans créer de compte. |
| 5 | Elle vérifie le canal et accepte les finalités nécessaires. | La preuve de vérification et les consentements contextualisés sont enregistrés. |
| 6 | Elle soumet la demande. | Une version immuable du dossier et une sollicitation interne par destinataire sont créées. |
| 7 | Elle consulte la confirmation et ouvre son suivi. | Un identifiant de référence et un lien sécurisé limité au dossier sont fournis. |
| 8 | Elle peut corriger une demande ciblée ou retirer son dossier. | Une correction importante crée une nouvelle version ; un retrait arrête le routage tant qu'aucun accord n'existe. |

## User stories et critères observables

### US-06.1 — Relire exactement ce qui sera transmis

**En tant que** cliente, **je veux** relire la version exacte de ma demande, **afin de** corriger une erreur avant qu'une coiffeuse puisse la recevoir.

Critères observables :

- Le récapitulatif sépare la configuration commune des instantanés propres à chaque candidate.
- Les valeurs affichées correspondent à la dernière version marquée **READY_TO_SUBMIT**.
- Les prix restent qualifiés par leur niveau de certitude et aucun montant n'est présenté comme final.
- Les dates restent des préférences ou plages demandées et aucun créneau n'est présenté comme bloqué.
- Les points à confirmer sont visibles avant l'action de soumission.
- Une correction ramène au bloc concerné sans obliger la cliente à reconstruire le dossier entier.

### US-06.2 — Choisir les destinataires autorisés

**En tant que** cliente, **je veux** choisir les coiffeuses autorisées à recevoir ma demande, **afin de** contrôler la diffusion de mes informations.

Critères observables :

- Seules les coiffeuses présentes dans la sélection et encore éligibles peuvent être cochées.
- Au moins une coiffeuse doit être confirmée pour poursuivre.
- Décocher une coiffeuse retire son instantané de la version à transmettre et empêche la création de sa sollicitation.
- Aucune coiffeuse extérieure à la sélection n'est ajoutée automatiquement, y compris en cas d'urgence ou de faible disponibilité.
- Pour chaque destinataire, la cliente peut consulter l'offre et l'instantané de conditions qui lui seront associés.
- La recommandation de solliciter plusieurs candidates est expliquée comme un moyen d'augmenter les chances de réponse, jamais comme une obligation.

### US-06.3 — Choisir la stratégie et le délai d'attente

**En tant que** cliente, **je veux** choisir comment et pendant combien de temps les coiffeuses seront sollicitées, **afin de** concilier rapidité et préférence personnelle.

Critères observables :

- Les choix proposés sont **Toute la sélection**, **Une prioritaire puis les autres** et **Une seule** lorsque leur nombre le permet.
- Le mode prioritaire identifie la première coiffeuse et affiche la fenêtre de priorité avant confirmation.
- Le mode unique indique qu'aucune alternative ne sera contactée sans une nouvelle décision de la cliente.
- Les fenêtres de priorité, d'attente et de relance affichées proviennent de valeurs de politique configurées ; un test peut modifier cette configuration et constater la nouvelle valeur à l'écran.
- Toute durée annoncée est présentée comme une règle de traitement ou une estimation, jamais comme une garantie qu'une coiffeuse répondra dans ce délai.
- La stratégie choisie et les délais annoncés figurent dans le récapitulatif soumis.

### US-06.4 — Vérifier un canal sans créer de compte

**En tant que** cliente, **je veux** vérifier un moyen de contact sans m'inscrire, **afin de** recevoir une réponse et retrouver mon dossier simplement.

Critères observables :

- La cliente renseigne au minimum un prénom et un canal pris en charge.
- Un code ou un lien invalide, expiré ou déjà utilisé ne valide pas le canal et affiche une action de récupération.
- L'expiration, le délai avant renvoi et le nombre de renvois autorisés proviennent de la politique configurée et sont annoncés lorsqu'ils affectent l'action.
- La cliente peut corriger le canal ou en choisir un autre sans perdre son dossier.
- Une vérification réussie permet de poursuivre mais ne crée ni compte, ni profil, ni mot de passe.
- La réutilisation d'un canal déjà connu n'impose pas une connexion ; le nouveau dossier est vérifié selon la politique applicable.

### US-06.5 — Consentir et soumettre un dossier unique

**En tant que** cliente, **je veux** consentir à une transmission limitée puis envoyer ma demande, **afin de** solliciter les coiffeuses choisies en gardant une trace fiable.

Critères observables :

- Les finalités nécessaires sont présentées avant soumission avec les catégories de destinataires et de données concernées.
- Un consentement obligatoire absent bloque la soumission ; un consentement facultatif ne peut pas être précoché.
- Une soumission réussie crée un identifiant de dossier unique et une version immuable.
- Cette version contient une seule configuration commune et un instantané figé propre à chaque destinataire confirmé.
- Une sollicitation interne distincte est créée pour chaque destinataire, toutes rattachées au même dossier.
- Aucune coiffeuse n'est contactée tant que la validation administrative n'a pas eu lieu.
- La confirmation n'indique ni réservation, ni créneau bloqué, ni prix final et ne déclenche aucun paiement.

### US-06.6 — Suivre, corriger ou retirer la demande

**En tant que** cliente, **je veux** retrouver, corriger ou retirer ma demande, **afin de** garder le contrôle après sa soumission.

Critères observables :

- La confirmation affiche un identifiant de référence et fournit un lien individuel, opaque, limité au dossier et révocable.
- L'identifiant seul ne permet pas d'ouvrir le dossier.
- Le suivi montre le contenu soumis, les destinataires autorisés, la stratégie et un statut correspondant à la réalité.
- Une correction importante crée une nouvelle version, conserve l'ancienne dans l'historique et replace le dossier dans le contrôle approprié.
- Une demande de correction administrative ne présente que les informations concernées et indique pourquoi elles sont nécessaires.
- La cliente peut retirer le dossier avant la formation d'un accord ; son état devient **WITHDRAWN** et aucune nouvelle sollicitation n'est engagée.
- Un accès perdu peut être renouvelé après une nouvelle vérification du canal, sans création de compte.

## Branches et cas alternatifs

### Une seule coiffeuse compatible ou choisie

La soumission reste possible. Nolaya explique l'effet possible sur le délai sans forcer l'ajout d'une autre destinataire.

### Coiffeuse prioritaire puis alternatives

Les alternatives sont déjà autorisées, mais ne deviennent contactables qu'après la fenêtre de priorité annoncée ou selon la décision explicite prévue par la stratégie.

### Canal non reçu, invalide ou expiré

La cliente peut demander un renvoi limité ou changer de canal. Les limites et délais affichés sont ceux de la politique configurée.

### Demande urgente

Nolaya affiche la politique de traitement applicable et rappelle que ni le traitement prioritaire ni une estimation de délai ne garantissent une réponse professionnelle.

### Correction avant routage

Une correction mineure peut compléter le brouillon. Toute modification affectant le besoin, l'éligibilité ou les conditions crée une nouvelle version et peut déclencher une réévaluation des candidates.

### Perte du lien de suivi

Un nouveau lien est émis après vérification du canal. L'ancien lien peut être révoqué selon la politique de sécurité.

### Retrait

Le retrait avant accord clôt les sollicitations non traitées ou empêche leur lancement. Il ne doit pas être présenté comme l'annulation d'une réservation puisqu'aucune réservation n'existe.

## États et sorties

| État | Signification visible ou fonctionnelle |
|---|---|
| **READY_TO_SUBMIT** | Le projet peut être relu et soumis. |
| **CONTACT_VERIFICATION_PENDING** | Le canal choisi n'est pas encore vérifié. |
| **RECIPIENTS_CONFIRMED** | La liste et la stratégie de sollicitation ont été explicitement validées. |
| **SUBMITTED** | Une version immuable et le dossier unique ont été créés. |
| **UNDER_ADMIN_REVIEW** | Le dossier attend ou fait l'objet du contrôle administratif. |
| **CLIENT_UPDATE_REQUIRED** | Une correction ciblée est nécessaire avant routage. |
| **WITHDRAWN** | La cliente a retiré le dossier avant accord. |

La sortie fonctionnelle comprend :

- un identifiant de dossier unique ;
- une version soumise immuable ;
- la configuration commune figée ;
- un instantané figé par offre/coiffeuse destinataire ;
- une sollicitation interne par destinataire confirmé ;
- la stratégie, l'ordre éventuel et les valeurs de politique annoncées ;
- le canal vérifié et les preuves de consentement ;
- un accès sécurisé au mini-espace de suivi ;
- zéro ou plusieurs sollicitations en attente, mais aucune transaction active à ce stade.

## Hors périmètre

- contacter une coiffeuse avant le contrôle administratif ;
- ajouter une coiffeuse non autorisée ;
- obtenir ou promettre une réponse professionnelle ;
- réserver ou bloquer un créneau ;
- qualifier un prix de final ;
- former un accord de prestation ;
- communiquer les coordonnées directes de la cliente ;
- créer un compte obligatoire ;
- déclencher un paiement, un acompte ou une autorisation de paiement.
