# Storyboard admin / conciergerie de lancement

## Statut

**STEP 2 du cadrage admin (D19–D21).** Histoire des moments observables de l’outil interne. Ce fichier n’est pas un user-flow, ni une table de transitions, ni une spec d’écrans, ni un prompt Stitch.

Il ne remplace pas le storyboard cliente. Le pont **Faire vérifier → dossier** est raconté ici uniquement pour l’arrivée dans la file ; les moments cliente 6.1–6.3 restent dans [`storyboard.md`](./storyboard.md) s’il est présent.

User-flow admin (STEP 3) : [user-flow-admin.md](./user-flow-admin.md) — **fait**. Transitions admin (STEP 4) : [transitions-admin.md](./transitions-admin.md) — **à jour**. Prochaine étape du protocole : **specs d’écrans admin**. Pas de Stitch avant ces specs.

## Sources verrouillées

- [D19–D21](../user-stories/decisions-produit.md)
- [US-ADM-01 à US-ADM-09](../user-stories/admin-conciergerie-lancement/user-stories.md)
- [README user stories](../user-stories/README.md)

« Coiffeuse trouvée » au lancement n’est **pas** le dossier **READY** de l’étape 8 (D04). C’est un oui humain consigné **et** la reconfirmation du lieu, du budget et de la période (D20).

## Personae

| Rôle | Persona | Ce qu’elle fait ici |
|---|---|---|
| Opératrice Nolaya interne | **Alex** | Traite la file, contacte hors app, consigne, confirme un match seulement quand c’est vrai |
| Cliente fil A | **Inès** | A une demande **QUALIFIED** et une candidate ; envoie **Faire vérifier** |
| Cliente fil B (variante du pont, pas un 3ᵉ fil) | **Léa** | A choisi une offre réelle, **sans** demande QUALIFIED |
| Coiffeuse autorisée | **Aïcha** | N’a ni compte, ni file, ni écran de réponse. Alex la joint hors de Nolaya |

Alex a le rôle **admin / conciergerie**. L’administration des offres (`/admin`) reste un outil distinct : on n’y cherche pas ce dossier.

## Ce que ce storyboard ne fait pas

Pas d’inventaire d’écrans, pas d’adresses d’outil interne, pas de copie d’un tableau de bord d’annonces. Pas de plan de vague, d’espace coiffeuse, d’OTP, d’accord, de paiement, de fiche ou d’onglet **Rendez-vous**. La coiffeuse ne saisit rien dans Nolaya.

Deux fils seulement. Les garde-fous (US-ADM-08, US-ADM-09) s’observent **dans** ces fils, pas dans un troisième récit.

---

## Pont — Faire vérifier → dossier

*Côté cliente. Non numéroté A… pour ne pas réécrire le storyboard cliente (moments 6.1–6.3 : coordonnées déclarées, demande envoyée, Suivi).*

Inès a déjà une demande **QUALIFIED** et une candidate, Aïcha. Elle déclare un prénom et **un** canal (téléphone **ou** e-mail). Avant d’envoyer, elle accuse un avertissement : Nolaya n’a pas confirmé ces coordonnées. Elle envoie **Faire vérifier**.

À cet instant :

- un **dossier unique** est créé ;
- **personne n’est contacté** — ni Aïcha, ni une autre coiffeuse ;
- il n’y a pas d’OTP ;
- Inès reçoit une confirmation que la demande est arrivée, avec un identifiant de **référence** (ce n’est pas une clé d’accès) ;
- son **Suivi** affiche **Demande reçue**. Rien n’affirme qu’une coiffeuse a été jointe ou a répondu.

**Variante fil B — même pont, autre contenu.** Léa a choisi l’offre d’Aïcha depuis Découvrir, sans passer par une demande QUALIFIED. **Faire vérifier** crée un dossier rattaché à **cette offre seule**. Nolaya n’invente pas un besoin qualifié à sa place. Personne n’est contacté. Suivi : **Demande reçue**.

Le rejeu du même envoi ne crée pas un second dossier.

---

## Fil 1 — Première vérif (heureux)

Inès, fil A. Une seule coiffeuse autorisée : Aïcha. Alex confirme réellement le match.

### A1 — Le dossier apparaît dans la file

**US-ADM-01 · US-ADM-08**

Alex ouvre l’outil interne de dossiers — pas le catalogue d’offres. Le dossier d’Inès est là, identifiable, rattaché à la demande QUALIFIED et à **cette** candidate. Rien ne le présente comme un match confirmé.

Une visiteuse sans rôle admin ne peut pas ouvrir la file. Le jeton de Suivi d’Inès n’accorde aucun droit interne : il ne montre que **son** dossier, côté cliente.

Inès ouvre **Suivi**. Le libellé reste **Demande reçue**.

### A2 — Alex ouvre le dossier et lit la synthèse

**US-ADM-02**

Alex ouvre le dossier. La synthèse utile pour appeler est lisible : le besoin d’Inès, Aïcha, les raisons de matching, les éléments à confirmer. Les incertitudes restent des incertitudes ; elles ne sont pas habillées en confirmation professionnelle.

La synthèse destinée à la coiffeuse ne contient ni les coordonnées directes d’Inès, ni l’adresse exacte.

Pour recontacter Inès si besoin, Alex voit le canal **déclaré** (prénom + téléphone ou e-mail), clairement non vérifié par OTP.

**Variante fil B, même moment.** Pour Léa, la synthèse montre l’offre choisie et les éléments à confirmer. Elle n’invente pas un besoin QUALIFIED.

### A3 — Contact hors application

**US-ADM-03 · US-ADM-09**

Alex identifie qui est joignable : **uniquement** Aïcha, autorisée par **Faire vérifier**. Personne d’autre n’est ajouté.

Elle joint Aïcha par téléphone, WhatsApp ou la messagerie habituelle. Le contact a lieu **hors de Nolaya**. L’application n’envoie pas le message à sa place. L’absence de compte, de file ou d’écran de réponse coiffeuse ne bloque pas l’appel.

Tenter de marquer une coiffeuse non autorisée comme destinataire, ou de consigner un contact vers elle, est refusé. Le dossier ne change pas.

### A4 — Journal de la tentative

**US-ADM-04 · US-ADM-07**

Alex consigne la tentative réelle : **canal**, **horodatage**, **interlocutrice**. Le journal est interne. Inès ne le voit pas, ni les canaux, ni les motifs.

Le Suivi d’Inès passe à **Recherche en cours**. Ce n’est toujours pas une coiffeuse confirmée, ni un rendez-vous.

Sans consignation, le Suivi ne peut pas avancer comme si le contact avait existé. Simuler un contact est refusé.

### A5 — Issue « accepte », sans match encore

**US-ADM-05**

Aïcha répond vraiment : elle accepte de prendre Inès. Alex enregistre l’issue **accepte**. L’enregistrement porte l’auteur interne et l’horodatage, dans le même dossier unique.

Le match n’est **pas** confirmé. Le Suivi n’affiche pas **Coiffeuse trouvée**. Une candidate de matching, même bonne, n’aurait jamais suffi.

### A6 — Reconfirmation lieu, budget, période

**US-ADM-06 · US-ADM-09**

Alex ne confirme le match que si trois faits sont reconfirmés : le **lieu**, le **budget**, la **période**. Tant qu’il en manque un, la confirmation est refusée.

Cette reconfirmation est un **fait** vérifié par Alex (avec Aïcha et, si besoin, Inès, hors app). Elle n’ouvre ni accord versionné, ni paiement, ni fiche Rendez-vous, ni créneau bloqué, ni prix final. Ce n’est pas **READY**.

Alex confirme alors le match.

### A7 — Suivi cliente « Coiffeuse trouvée »

**US-ADM-06 · US-ADM-07 · US-ADM-08**

Inès ouvre **Suivi**. Le libellé est **Coiffeuse trouvée**. Elle ne voit ni le journal, ni les canaux, ni les motifs internes. Aucun onglet **Rendez-vous** n’apparaît.

Côté dossier : oui humain + lieu, budget et période reconfirmés. Rien d’autre du produit complet n’a commencé.

---

## Fil 2 — Aucune coiffeuse, ou précision

Même pont, même file, même ouverture, même contact hors app et même journal (A1–A4). Aïcha reste la seule autorisée. Ici, le oui n’arrive pas — ou une question ciblée est réellement nécessaire.

Les trois issues ci-dessous sont des **branches du même fil**, pas des récits supplémentaires. La cliente ne voit jamais le motif interne : seulement l’état de **Suivi** que le fait autorise.

### A8 — Refus, puis plus personne à joindre

**US-ADM-05 · US-ADM-07 · US-ADM-09**

Aïcha refuse vraiment. Alex enregistre **refuse** — distinct d’une absence de réponse, et ce n’est pas une faute exposée à Inès.

Une seule coiffeuse était autorisée. Alex ne contacte personne d’autre. Élargir silencieusement est refusé.

Elle consigne l’épuisement de la politique de contact des destinataires autorisés — un **fait humain**, pas un moteur de relances. Le Suivi d’Inès affiche **Aucune coiffeuse confirmée**.

### A9 — Aucune réponse

**US-ADM-05 · US-ADM-07**

Alex a réellement tenté de joindre Aïcha. Les tentatives utiles n’aboutissent pas. Elle enregistre **aucune réponse** — distinct d’un refus, et cela ne vaut jamais acceptation.

Quand la politique de contact des autorisées est épuisée sans confirmation, le Suivi affiche **Aucune coiffeuse confirmée**. Inès ne lit ni le journal ni « elle n’a pas rappelé ».

Enregistrer une issue comme si Aïcha avait répondu, alors qu’aucune réponse réelle n’existe, est refusé.

### A10 — Précision nécessaire

**US-ADM-05 · US-ADM-07 · US-ADM-09**

Une question ciblée est réellement nécessaire. Alex enregistre **précision** et rattache cette question au dossier. Aucune messagerie libre ne s’ouvre — ni pour Inès, ni pour Aïcha dans Nolaya.

Le Suivi d’Inès affiche **Précision nécessaire**. Elle ne voit pas le motif interne.

### Notes du même fil (pas un 3ᵉ récit)

**Adaptation.** Si Aïcha propose un changement (date, prix, lieu, prestation, fourniture…), Alex consigne **adaptation**. Elle ne l’accepte **pas** au nom d’Inès. Ce seul fait ne confirme pas le match (US-ADM-05, US-ADM-09).

**Dossier retiré.** Si le dossier devient inactif pendant le traitement, le Suivi affiche **Demande abandonnée**. Alex ne poursuit pas les contacts comme si le dossier était actif (US-ADM-07).

**Contact reçu hors plateforme.** Un rappel ou un WhatsApp d’Aïcha se saisit dans **le même** dossier (canal, auteur, horodatage, issue). Pas de second dossier (US-ADM-04, US-ADM-05).

---

## Garde-fous observés dans les deux fils

Ces moments ne forment pas un fil. Ils empêchent STEP 3 d’inventer ce que D21 exclut.

| Fait | Ce qui se passe | US |
|---|---|---|
| Visiteuse ou cliente sans rôle admin | La file et le dossier interne restent fermés | US-ADM-08 |
| Jeton de Suivi valide | Il n’ouvre que le Suivi de **ce** dossier, pas l’outil interne | US-ADM-08 |
| Aïcha cherche un compte ou une file | Ces objets n’existent pas au lancement | US-ADM-08, US-ADM-09 |
| Alex cherche le dossier dans `/admin` (catalogue) | L’outil d’offres ne se substitue pas à la file | US-ADM-02, US-ADM-08 |
| Deux clientes | Ouvrir le dossier d’Inès ne mélange pas les données de Léa | US-ADM-08 |
| OTP exigé pour créer le dossier | La soumission n’en dépend pas ; coordonnées déclarées | US-ADM-01, US-ADM-09 |
| Match confirmé | Pas d’accord, paiement, fiche RDV, préparation, avis | US-ADM-06, US-ADM-09 |

---

## Mapping moments → US-ADM

| Moment | Fil | US | Suivi cliente (si l’état change) |
|---|---|---|---|
| Pont Faire vérifier | Pont (A ou B) | US-ADM-01 | **Demande reçue** |
| **A1** Dossier dans la file | 1 (partagé) | US-ADM-01, US-ADM-08 | **Demande reçue** |
| **A2** Synthèse | 1 (partagé) | US-ADM-02 | inchangé |
| **A3** Contact hors app | 1 (partagé) | US-ADM-03, US-ADM-09 | inchangé tant que non consigné |
| **A4** Journal | 1 (partagé) | US-ADM-04, US-ADM-07 | **Recherche en cours** |
| **A5** Issue accepte | 1 | US-ADM-05 | pas encore **Coiffeuse trouvée** |
| **A6** Reconfirmation + confirmation | 1 | US-ADM-06, US-ADM-09 | autorise **Coiffeuse trouvée** |
| **A7** Lecture cliente | 1 | US-ADM-06, US-ADM-07, US-ADM-08 | **Coiffeuse trouvée** |
| **A8** Refus + épuisement | 2 | US-ADM-05, US-ADM-07, US-ADM-09 | **Aucune coiffeuse confirmée** |
| **A9** Aucune réponse + épuisement | 2 | US-ADM-05, US-ADM-07 | **Aucune coiffeuse confirmée** |
| **A10** Question ciblée | 2 | US-ADM-05, US-ADM-07, US-ADM-09 | **Précision nécessaire** |

US-ADM-09 traverse A3, A6, A8, A10 et les garde-fous : rien de D21 n’est mis en scène comme un geste possible.
