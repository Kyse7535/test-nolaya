# Admin / conciergerie de lancement

## Statut de ce dossier

**STEP 1 du cadrage admin (D19–D21).** Contrat des résultats observables de l’outil interne. Ce fichier n’est pas un storyboard, ni un user-flow, ni une spec d’écrans, ni un prompt Stitch.

Storyboard admin (STEP 2) : [docs/storyboard-admin.md](../../docs/storyboard-admin.md) — **fait**. User-flow admin (STEP 3) : [docs/user-flow-admin.md](../../docs/user-flow-admin.md) — **fait**. Transitions admin (STEP 4) : [docs/transitions-admin.md](../../docs/transitions-admin.md) — **à jour**. Specs d’écrans admin (STEP 5) : [docs/screen-specs-admin.md](../../docs/screen-specs-admin.md) — **fait**. Prompts Stitch admin (STEP 6) : [docs/prompts-stitch-admin.md](../../docs/prompts-stitch-admin.md) — **fait**. Suite : **audit** / **implémentation** plus tard.

## Finalité et valeur

Au lancement, Nolaya interne confirme humainement un match. La coiffeuse n’a ni compte, ni file, ni écran de réponse. L’administration minimale des offres (`/admin`) reste un outil distinct.

La cliente déclenche le dossier par **Faire vérifier** (D12 : vérifier le *match*, pas le téléphone). Personne n’est contacté à cet instant. Le dossier entre dans une **file interne**. L’effet visible côté cliente est uniquement le **Suivi** (D18 : pas d’onglet Rendez-vous).

« Coiffeuse trouvée » au lancement (D20) n’est **pas** le dossier **READY** de l’étape 8 (D04). C’est une réponse humaine positive **et** la reconfirmation du lieu, du budget et de la période.

## Relation au produit complet

Les user stories [US-07](../07-reponse-professionnelle-et-conciergerie/user-stories.md) décrivent la conciergerie **produit complet** (propositions structurées, retenir une proposition, stratégie de vague, relances de politique, passage à l’étape 8). Elles sont **hors lancement**. Ne pas les copier comme vérité de cet outil.

Le pont cliente de lancement n’est pas non plus le workflow complet [US-06](../06-soumission-de-la-demande/user-stories.md) (stratégie de sollicitation, OTP, consentements successifs, plusieurs destinataires de présélection). Au lancement : **Faire vérifier** → coordonnées déclarées → **un** dossier → file interne.

## Périmètre et préconditions

### Préconditions

- Une cliente sans compte a envoyé **Faire vérifier** (fil A ou fil B).
- Les coordonnées cliente sont **déclarées**, non vérifiées par OTP (D15, D21).
- Au moins une coiffeuse / offre est **autorisée** par ce geste : la candidate du fil A, ou l’offre choisie du fil B.
- L’opératrice dispose d’un **rôle admin / conciergerie**.

### Dans le périmètre (gestes D20)

1. voir apparaître le dossier dans la file après Faire vérifier ;
2. ouvrir le dossier et lire la synthèse utile ;
3. contacter hors application les coiffeuses autorisées ;
4. consigner chaque tentative de contact ;
5. enregistrer l’issue : **accepte**, **refuse**, **précision**, **adaptation**, **aucune réponse** ;
6. confirmer un match uniquement si oui humain + lieu + budget + période reconfirmés ;
7. projeter les états de Suivi listés par D20 ;
8. isoler l’outil au rôle admin ;
9. refuser les gestes hors MVP (D21).

### Hors périmètre

Voir [US-ADM-09](#us-adm-09--refuser-les-gestes-hors-mvp) et la section [Hors MVP — D21](#hors-mvp--d21). Toute invention de plan de vague, d’espace coiffeuse, d’accord, de paiement ou d’onglet Rendez-vous sort de STEP 1 et de STEP 2.

## Pont cliente — Faire vérifier

| Fil | Ce que la cliente a déjà | Contenu du dossier créé |
|---|---|---|
| **A** | Demande **QUALIFIED** + candidate choisie | Besoin versionné + cette candidate + raisons de matching + éléments à confirmer + coordonnées déclarées |
| **B** | Offre réelle choisie, **sans** demande QUALIFIED | Cette offre seule + coordonnées déclarées ; aucun besoin qualifié n’est inventé |

Dans les deux fils : un dossier unique, personne contactée, file interne, Suivi **Demande reçue**.

## Chaîne de résultats observables

| Ordre | Geste ou événement réel | Résultat observable |
|---|---|---|
| 1 | La cliente envoie Faire vérifier | Le dossier apparaît dans la file ; Suivi = **Demande reçue** ; zéro contact professionnel |
| 2 | L’admin ouvre le dossier | La synthèse utile est lisible ; les coordonnées cliente ne fuient pas au-delà du besoin |
| 3 | L’admin contacte hors app une coiffeuse autorisée | Le contact a lieu hors de Nolaya (téléphone, WhatsApp ou messagerie habituelle) |
| 4 | L’admin consigne la tentative | Le journal interne contient canal, horodatage, interlocutrice ; la cliente ne le voit pas |
| 5 | L’admin enregistre une issue | L’issue est l’une des cinq valeurs D20 ; rien n’est « confirmé » par simulation |
| 6 | Oui humain + lieu, budget et période reconfirmés | Suivi = **Coiffeuse trouvée** |
| 7 | Tout autre événement D20 | Suivi aligné sur le tableau D20, sans journal ni motifs internes |

## User stories et critères d’acceptation

### US-ADM-01 — Faire apparaître le dossier après Faire vérifier

**En tant qu’** opératrice de conciergerie,  
**je veux** qu’un dossier entre dans la file dès que la cliente a envoyé Faire vérifier,  
**afin de** traiter une demande réelle sans avoir contacté qui que ce soit trop tôt.

| Étant donné | Quand | Alors |
|---|---|---|
| une cliente du **fil A** (demande QUALIFIED + une candidate) qui a déclaré un prénom et un canal | elle envoie **Faire vérifier** | un dossier unique apparaît dans la file interne, rattaché à cette demande et à **cette** candidate ; aucune coiffeuse n’est contactée |
| une cliente du **fil B** (offre choisie, sans QUALIFIED) qui a déclaré un prénom et un canal | elle envoie **Faire vérifier** | un dossier unique apparaît dans la file, rattaché à **cette offre seule** ; aucune demande QUALIFIED n’est créée à sa place ; aucune coiffeuse n’est contactée |
| un dossier vient d’être créé par Faire vérifier | l’admin consulte la file | le dossier est présent et identifiable sans être présenté comme un match confirmé |
| un dossier vient d’être créé par Faire vérifier | la cliente ouvre son Suivi | le libellé est **Demande reçue** ; rien n’affirme qu’une coiffeuse a été contactée ou a répondu |
| la même envoi Faire vérifier est rejoué (déjà envoyé) | une seconde soumission est tentée | aucun second dossier n’est créé pour le même envoi |
| un identifiant de référence client est connu d’un tiers | ce tiers l’utilise sans jeton ni rôle admin | le dossier de conciergerie ne s’ouvre pas |

### US-ADM-02 — Ouvrir le dossier et lire la synthèse utile

**En tant qu’** opératrice de conciergerie,  
**je veux** ouvrir le dossier et lire une synthèse suffisante pour appeler,  
**afin de** vérifier le match sans exposer plus de données cliente que nécessaire.

| Étant donné | Quand | Alors |
|---|---|---|
| un dossier **fil A** dans la file | l’admin l’ouvre | la synthèse montre le besoin, la candidate, les raisons de matching et les éléments à confirmer |
| un dossier **fil B** dans la file | l’admin l’ouvre | la synthèse montre l’offre choisie et les éléments à confirmer ; elle n’invente pas un besoin QUALIFIED |
| un dossier ouvert | l’admin lit la synthèse destinée à la coiffeuse | les coordonnées directes de la cliente et l’adresse exacte n’y figurent pas |
| un dossier ouvert | l’admin a besoin de recontacter la cliente | elle voit le canal **déclaré** (prénom + téléphone ou e-mail), clairement non vérifié par OTP |
| un dossier ouvert | une projection cliente ou coiffeuse du même dossier est consultée | elle ne contient que les données nécessaires à cet acteur (E2E-INV-05) |
| l’admin utilise l’administration des offres `/admin` | elle y cherche ce dossier de conciergerie | `/admin` ne se substitue pas à l’outil de dossiers ; les deux outils restent distincts |

### US-ADM-03 — Contacter hors application une coiffeuse autorisée

**En tant qu’** opératrice de conciergerie,  
**je veux** joindre la ou les coiffeuses autorisées par téléphone, WhatsApp ou messagerie habituelle,  
**afin de** vérifier réellement le match sans espace professionnel self-service.

| Étant donné | Quand | Alors |
|---|---|---|
| un dossier avec une coiffeuse **autorisée** (candidate du fil A ou offre du fil B) | l’admin la contacte | le contact a lieu **hors de l’application** ; Nolaya n’envoie pas le message à sa place |
| un dossier fil A | l’admin identifie qui est joignable | seule la candidate autorisée par Faire vérifier l’est ; aucune autre n’est ajoutée silencieusement |
| un dossier fil B | l’admin identifie qui est joignable | seule la coiffeuse de l’offre choisie l’est |
| une coiffeuse **non autorisée** par la cliente | l’admin tente de la marquer comme destinataire ou de consigner un contact vers elle | l’action est refusée ; le dossier est inchangé |
| une coiffeuse référencée, sans compte Nolaya | l’admin doit la joindre | l’absence de compte, de file ou d’écran de réponse coiffeuse ne bloque pas le contact hors app |

### US-ADM-04 — Consigner chaque tentative de contact

**En tant qu’** opératrice de conciergerie,  
**je veux** enregistrer chaque contact réellement tenté,  
**afin que** le journal reflète l’opération et que le Suivi ne mente pas.

| Étant donné | Quand | Alors |
|---|---|---|
| un contact hors app vient d’avoir lieu vers une coiffeuse autorisée | l’admin consigne la tentative | le journal interne contient au minimum le **canal**, l’**horodatage** et l’**interlocutrice** |
| un dossier sans aucune consignation de contact | la cliente consulte le Suivi | le libellé reste **Demande reçue** ; rien n’affirme un contact |
| au moins une tentative réelle est consignée (traitement ou contact en cours) | la cliente consulte le Suivi | le libellé devient **Recherche en cours** s’il n’y a pas encore d’issue qui impose un autre état D20 |
| un dossier avec un journal interne | la cliente consulte le Suivi | elle ne voit ni le journal, ni les canaux, ni les motifs internes |
| aucun contact réel n’a eu lieu | l’admin tente de faire croire qu’un contact a eu lieu sans le consigner, ou de consigner un contact fictif | l’état visible ne peut pas avancer comme si le contact avait existé ; la simulation est refusée |

### US-ADM-05 — Enregistrer l’issue professionnelle

**En tant qu’** opératrice de conciergerie,  
**je veux** enregistrer la réponse réelle : accepte, refuse, précision, adaptation ou aucune réponse,  
**afin de** ne présenter aucune candidate comme confirmée avant un fait consigné.

| Étant donné | Quand | Alors |
|---|---|---|
| une réponse réelle d’une coiffeuse autorisée | l’admin enregistre **accepte** | l’issue est consignée ; le match n’est **pas** encore confirmé |
| une réponse réelle | l’admin enregistre **refuse** | l’issue est un refus, distinct d’une absence de réponse ; ce n’est pas une faute exposée à la cliente |
| une question ciblée est réellement nécessaire | l’admin enregistre **précision** | une question ciblée est rattachée au dossier ; aucune messagerie libre n’est ouverte |
| la coiffeuse propose un changement (date, prix, lieu, prestation, fourniture, etc.) | l’admin enregistre **adaptation** | l’adaptation est consignée ; elle n’est pas acceptée **au nom** de la cliente ; le match n’est pas confirmé de ce seul fait |
| les tentatives utiles sur les destinataires autorisés n’ont pas abouti | l’admin enregistre **aucune réponse** | l’absence de réponse est distincte d’un refus et ne vaut jamais acceptation |
| aucune réponse réelle n’a été reçue | l’admin tente d’enregistrer une issue comme si la coiffeuse avait répondu | l’enregistrement est refusé |
| une issue vient d’être consignée | on relit le dossier | l’issue, son auteur interne et son horodatage sont traçables dans le dossier unique |

### US-ADM-06 — Confirmer un match et projeter « Coiffeuse trouvée »

**En tant qu’** opératrice de conciergerie,  
**je veux** ne confirmer un match qu’après un oui humain et la reconfirmation du lieu, du budget et de la période,  
**afin que** la cliente ne lise « coiffeuse trouvée » que lorsque c’est vrai.

| Étant donné | Quand | Alors |
|---|---|---|
| une issue **accepte** sans reconfirmation du lieu, du budget et de la période | l’admin tente de confirmer le match | la confirmation est refusée ; le Suivi n’affiche pas **Coiffeuse trouvée** |
| une reconfirmation partielle (il manque le lieu, le budget ou la période) | l’admin tente de confirmer le match | la confirmation est refusée |
| un rapprochement algorithmique ou une candidate de matching, sans réponse humaine consignée | le Suivi ou la file est consulté | la candidate n’est jamais libellée **Coiffeuse trouvée** |
| une issue **accepte** **et** le lieu, le budget et la période sont reconfirmés | l’admin confirme le match | le Suivi cliente affiche **Coiffeuse trouvée** |
| le match vient d’être confirmé | la cliente ouvre le Suivi | elle voit l’état **Coiffeuse trouvée** ; elle ne voit pas le journal, les canaux ni les motifs internes |
| le match vient d’être confirmé | on inspecte le dossier | il n’existe ni accord versionné, ni paiement, ni fiche Rendez-vous, ni créneau bloqué, ni prix final ; ce n’est pas **READY** |

### US-ADM-07 — Projeter les autres états de Suivi

**En tant que** cliente,  
**je veux** voir un état de Suivi aligné sur ce qui s’est réellement passé,  
**afin de** suivre ma demande sans assister aux opérations internes.

Les libellés ci-dessous sont ceux de **D20**, pas ceux du produit complet US-07 (`Prise en charge`, `Réponse disponible`, `Action requise`, `Aucune réponse obtenue`).

| Étant donné | Quand | Alors |
|---|---|---|
| un dossier créé, sans contact réel consigné | la cliente ouvre le Suivi | **Demande reçue** |
| un traitement ou un contact réel est en cours | la cliente ouvre le Suivi | **Recherche en cours** |
| une question ciblée a été consignée comme **précision** | la cliente ouvre le Suivi | **Précision nécessaire** ; pas de messagerie libre ni de journal interne |
| un match confirmé selon US-ADM-06 | la cliente ouvre le Suivi | **Coiffeuse trouvée** |
| la politique de contact des destinataires **autorisés** est épuisée sans confirmation | l’admin consigne cet épuisement | le Suivi affiche **Aucune coiffeuse confirmée** ; aucun destinataire supplémentaire n’est contacté |
| le dossier est retiré ou rendu inactif | la cliente ouvre le Suivi | **Demande abandonnée** |
| n’importe lequel de ces états | la cliente lit le Suivi | elle ne voit ni journal, ni canaux, ni motifs internes ; aucun onglet **Rendez-vous** n’apparaît |

L’épuisement de la politique de contact au lancement est un **fait consigné par l’humain**. Il ne suppose pas un moteur de relances automatiques (D21).

### US-ADM-08 — Isoler l’outil au rôle admin / conciergerie

**En tant que** Nolaya,  
**je veux** que seuls les comptes admin / conciergerie opèrent la file,  
**afin de** ne pas exposer l’opération interne à la cliente ni inventer un espace coiffeuse.

| Étant donné | Quand | Alors |
|---|---|---|
| une visiteuse ou une cliente sans rôle admin | elle tente d’ouvrir la file ou un dossier de conciergerie | l’accès est refusé |
| un jeton de Suivi cliente valide | il est présenté à l’outil interne de conciergerie | il n’accorde aucun droit admin ; seul le Suivi de **ce** dossier est possible côté cliente |
| une coiffeuse référencée | elle cherche un compte, une file ou un écran de réponse | aucun de ces objets n’existe au lancement ; elle n’a pas à s’inscrire pour être jointe hors app |
| une opératrice authentifiée avec le rôle admin / conciergerie | elle ouvre l’outil de dossiers | elle accède à la file interne, distincte de `/admin` (catalogue d’offres) |
| deux dossiers de clientes distinctes | l’admin ouvre l’un d’eux | les données de l’autre n’y sont pas mélangées |
| une session cliente | elle parcourt Nolaya | elle ne voit pas le journal, les canaux de contact interne, ni les motifs d’issue |

### US-ADM-09 — Refuser les gestes hors MVP

**En tant que** Nolaya,  
**je veux** que les capacités D21 soient refusées ou absentes au lancement,  
**afin que** le storyboard suivant (STEP 2) ne les invente pas.

| Étant donné | Quand | Alors |
|---|---|---|
| le lancement | une coiffeuse tente d’ouvrir un espace self-service, un compte professionnel ou un lien de réponse autonome | ces objets n’existent pas ; aucune réponse professionnelle n’est saisie par la coiffeuse dans Nolaya |
| le lancement | l’admin cherche un plan de vague, une stratégie de présélection, des relances automatiques ou une messagerie libre | ces fonctions n’existent pas dans l’outil minimal |
| une cliente envoie Faire vérifier | Nolaya exigerait un OTP ou une vérification de canal | la soumission n’en dépend pas ; les coordonnées restent déclarées |
| un match confirmé selon US-ADM-06 | on cherche l’accord versionné, la double validation, le paiement, la fiche ou l’onglet Rendez-vous, la préparation ou les avis | ces étapes restent hors lancement ; **Coiffeuse trouvée** ne les déclenche pas |
| une coiffeuse non autorisée par Faire vérifier | l’admin tente de la contacter ou de consigner un contact vers elle | l’action est refusée |
| une **adaptation** consignée | l’admin tente de l’accepter **au nom** de la cliente | l’action est refusée ; le match n’est pas confirmé de ce fait |
| aucun contact ou aucune réponse réelle | l’admin tente de simuler un contact ou une réponse | l’action est refusée ; le Suivi ne change pas comme si le fait avait eu lieu |

## Branches et cas alternatifs

| Situation | Comportement attendu | Comportement interdit |
|---|---|---|
| Fil B sans QUALIFIED | Traiter l’offre choisie comme seule base ; confirmer le match seulement après oui humain + lieu / budget / période | Inventer une demande QUALIFIED ou un matching 1–3 a posteriori |
| Fil A avec reasons de matching incomplètes | Les montrer comme incertitudes / à confirmer | Les cacher ou les présenter comme une confirmation professionnelle |
| Première candidate refuse, une autre déjà autorisée | L’admin peut contacter l’autre autorisée et consigner ; le Suivi reste **Recherche en cours** tant qu’il n’y a pas confirmation ni épuisement | Ajouter une coiffeuse non autorisée ; simuler une acceptation |
| Une seule autorisée, refus ou aucune réponse | Consigner l’issue ; à l’épuisement, **Aucune coiffeuse confirmée** | Élargir silencieusement ; afficher **Coiffeuse trouvée** |
| Adaptation proposée | Consigner **adaptation** ; poursuivre le traitement humain | Accepter la modification au nom de la cliente ; confirmer le match sans les trois reconfirmations |
| Précision nécessaire | Consigner la question ciblée ; Suivi **Précision nécessaire** | Ouvrir une messagerie libre ; exposer le motif interne |
| Dossier retiré / inactif pendant le traitement | Suivi **Demande abandonnée** ; plus de nouveau contact | Continuer à contacter comme si le dossier était actif |
| Contact reçu hors plateforme (rappel, WhatsApp) | Le saisir dans le même dossier (canal, auteur, horodatage, issue) | Créer un second dossier ou laisser le Suivi affirmer un fait non consigné |
| `/admin` catalogue vs file de dossiers | Deux outils ; le catalogue ne confirme pas un match | Fusionner les deux ou laisser croire qu’éditer une offre contacte la cliente |

## États et sorties (lancement)

Projections **cliente** (D20). Ce ne sont pas les états internes US-07 (`UNDER_ADMIN_REVIEW`, `OUTREACH_IN_PROGRESS`, `RESPONSE_AVAILABLE`, etc.).

| État de Suivi | Fait réel qui l’autorise | Interdit tant que ce fait n’existe pas |
|---|---|---|
| **Demande reçue** | Dossier créé, pas encore de contact réel consigné | Affirmer un contact ou une confirmation |
| **Recherche en cours** | Traitement ou contact réel en cours | L’afficher avant toute action réelle |
| **Précision nécessaire** | Question ciblée réellement consignée | Messagerie libre, motif interne visible |
| **Coiffeuse trouvée** | Oui humain consigné **et** lieu, budget, période reconfirmés | Candidate algorithmique, **accepte** seul, READY, RDV, paiement |
| **Aucune coiffeuse confirmée** | Politique de contact des autorisées épuisée, sans confirmation | Élargissement automatique |
| **Demande abandonnée** | Dossier retiré ou inactif | Le présenter comme l’annulation d’une réservation |

Issues internes consignables (D20) : **accepte**, **refuse**, **précision**, **adaptation**, **aucune réponse**.

Sortie fonctionnelle du lancement : un dossier dont le Suivi reflète l’un de ces six états, avec journal interne traçable, **sans** accord, paiement ni rendez-vous opérationnel.

## Hors MVP — D21

STEP 2 (storyboard admin) et les specs d’écrans **ne doivent pas** inventer :

- espace coiffeuse self-service, compte professionnel, lien de réponse autonome ;
- interface complète de conciergerie : plan de vague, stratégies de présélection, relances automatiques, messagerie libre ;
- OTP / vérification du canal cliente ;
- accord versionné, double validation, paiement, fiche et onglet Rendez-vous, préparation, avis ;
- contacter une coiffeuse non autorisée ;
- accepter une modification **au nom** de la cliente ;
- simuler un contact ou une réponse.

Également hors vérité de lancement (produit complet, ne pas importer) :

- US-07.1 à US-07.5 telles quelles, y compris « retenir une proposition » vers l’étape 8 ;
- workflow US-06 complet (stratégie Toute la sélection / prioritaire / une seule, OTP, consentements successifs) ;
- parcours coiffeuse US-PRO-* comme acteur in-app.

## Mapping US ↔ décisions D19–D21

| US | D19 | D20 | D21 |
|---|---|---|---|
| **US-ADM-01** | Pont Faire vérifier → file ; personne contactée à cet instant | Geste 1 : dossier fil A / fil B ; Suivi initial **Demande reçue** | Pas d’OTP pour créer le dossier |
| **US-ADM-02** | Outil interne Nolaya, distinct de `/admin` offres | Geste 2 : lire la synthèse (besoin ou offre, raisons, à confirmer) | Minimisation ; pas de vérification de canal |
| **US-ADM-03** | Pas d’espace coiffeuse ; confirmation par Nolaya interne | Geste 3 : contact hors app (téléphone, WhatsApp, messagerie habituelle) | Interdit de contacter une non autorisée |
| **US-ADM-04** | — | Geste 4 : consigner canal, horodatage, interlocutrice | Interdit de simuler un contact |
| **US-ADM-05** | — | Geste 5 : accepte / refuse / précision / adaptation / aucune réponse | Interdit de simuler une réponse ; interdit d’accepter une adaptation au nom de la cliente |
| **US-ADM-06** | — | Match confirmé = oui humain + lieu + budget + période → **Coiffeuse trouvée** | Pas d’accord, paiement, fiche RDV, READY |
| **US-ADM-07** | Effet cliente = Suivi seulement (D18) | Tableau des six états de Suivi | Pas d’onglet Rendez-vous ; pas de relances automatiques |
| **US-ADM-08** | Rôle admin / conciergerie ; distinct de `/admin` ; pas de self-service coiffeuse | La cliente ne voit pas le journal, les canaux ni les motifs internes | — |
| **US-ADM-09** | — | — | Ensemble du hors MVP admin, pour bloquer toute invention en STEP 2 |
