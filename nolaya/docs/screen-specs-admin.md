# Specs d’écrans admin / conciergerie de lancement

## Statut

**STEP 5 du cadrage admin (D19–D21).** Zones, copy et actions des cinq écrans internes. Ce fichier n’est **pas** un prompt Stitch.

Il ne remplace pas les screen-specs cliente. Les six états de **Suivi** restent des **effets** sur `/suivi/:jeton`, jamais des écrans de cet outil.

Prochaine étape du protocole : **prompts Stitch admin**. Stitch dessine l’apparence ; il n’invente ni écran, ni CTA, ni destination absents d’ici et de [transitions-admin.md](./transitions-admin.md).

## Sources verrouillées

- [D19–D21](../user-stories/decisions-produit.md)
- [US-ADM-01 à US-ADM-09](../user-stories/admin-conciergerie-lancement/user-stories.md)
- [storyboard-admin.md](./storyboard-admin.md) (moments A1–A10)
- [user-flow-admin.md](./user-flow-admin.md) (écrans I01–I05, URLs, sorties)
- [transitions-admin.md](./transitions-admin.md) (ensemble fermé des destinations)

« Coiffeuse trouvée » au lancement n’est **pas** le dossier **READY** de l’étape 8 (D04). C’est un oui humain consigné **et** la reconfirmation du lieu, du budget et de la période (D20).

## Conventions

Colonnes d’action : **Action** · **Condition** · **Résultat** · **Destination**.

**Action** = contrôle ou geste déjà nommé dans le user-flow / les transitions. Pas de bouton, onglet ou lien ajouté « pour aider ».

**Destination** — ensemble fermé :

| Valeur | Signification |
|---|---|
| **I01** `/interne/connexion` | Connexion interne |
| **I02** `/interne/dossiers` | File |
| **I03** `/interne/dossiers/:id` | Fiche |
| **I04** `/interne/dossiers/:id/contact` | Journaliser un contact |
| **I05** `/interne/dossiers/:id/issue` | Enregistrer une issue |
| **on reste** | Même URL (éventuellement autre variante). Pas d’écran nouveau. |
| **hors MVP** | Geste absent. **Pas de contrôle** dans l’UI. |

Les états (`form`, `error`, `forbidden`, `loading`, `empty`, `happy`, `fil_a`, `fil_b`, `actif`, `inactif`, `sortant`, `entrant`, `refuse_non_autorisee`, cinq issues) sont des **variantes de la même URL**, jamais cinq URLs de plus.

Le **Suivi** cliente n’est **jamais** une destination. Il n’apparaît que dans **Résultat**, comme **effet**.

## Cadre visuel (tous les écrans)

Outil interne **desktop-first**, densité opérationnelle. Pas un site marketing.

| Règle | Application |
|---|---|
| Viewport | Desktop (~1280+). Mobile n’est pas le cadrage. |
| Photos | **Aucune photo héroïque.** Pas de lifestyle full-bleed. Un identifiant texte (référence, prénom, offre) suffit. |
| Chrome cliente | Jamais **Découvrir / Ma demande / Suivi**. Jamais d’onglet **Rendez-vous**. |
| Sidebar | **Dossiers** seulement. Pas Matching, Vagues, Messages, Rendez-vous, Catalogue. |
| Contact | Hors app. L’UI **affiche** un moyen ; elle **n’envoie** rien. I04 = formulaire de **journal**, pas un messager. |
| Coordonnées | Synthèse destinable à la coiffeuse : **ni** coordonnées directes cliente, **ni** adresse exacte. Canal déclaré cliente = bloc **séparé**, marqué non vérifié par OTP. |
| Confirmation | **Confirmer le match** uniquement sur I03, gated (`accepte` **et** lieu + budget + période). Pas sur I05. |

Design system Nolaya (rappel, pas un prompt) : Manrope UI, JetBrains Mono pour références / badges / horodatages ; charcoal `#000000` / `#1b1c1c` ; or `#775a19` / `#fed488` avec parcimonie ; surfaces `#fbf9f8` / `#ffffff` / `#efeded` ; erreur `#ba1a1a` ; rayons contrôles `0.25rem`. Pas de violet, neon, dark mode, emoji décoratif.

Copy : français opérationnel (libellés nominaux / infinitifs). Pas de tutoiement cliente. Pas de promesse « réservation », « créneau bloqué », « prix final », READY.

---

## Chrome interne

Pas un écran. Présent sur **I02–I05** seulement. **Absent de I01.**

Spécifié **une fois**. Les écrans I02–I05 y renvoient ; ils ne le redessinent pas.

### Zones

| Zone | Contenu |
|---|---|
| Marque | « Nolaya interne » · sous-ligne « Conciergerie de lancement » |
| Nav | Un seul item métier : **Dossiers** → `/interne/dossiers` (actif sur I02) |
| Session | Identité opératrice (e-mail ou prénom interne) · **Se déconnecter** |
| Hors chrome | Catalogue `/admin` · chrome cliente · inbox · cycles de matching · RDV |

### Copy

- Marque : `Nolaya interne`
- Sous-ligne : `Conciergerie de lancement`
- Nav : `Dossiers`
- Déconnexion : `Se déconnecter`

### Actions

| Action | Condition | Résultat | Destination |
|---|---|---|---|
| **Dossiers** | Écran **I02** | Seul item métier. Rien d’autre. | **on reste** (I02) |
| **Dossiers** | **I03** / **I04** / **I05** | Formulaire I04/I05 non enregistré = dossier inchangé. | **I02** `/interne/dossiers` |
| **Se déconnecter** | I02–I05 | Session fermée. | **I01** `/interne/connexion` |
| Matching, Vagues, Messages, Rendez-vous | — | Ces items n’existent pas. | **hors MVP** — pas de contrôle |
| Chrome cliente Découvrir / Ma demande / Suivi | — | Chrome interne seulement. | **hors MVP** — pas de contrôle |
| Lien catalogue `/admin` dans la nav | — | Outils distincts. | **hors MVP** — pas de contrôle |

---

## Redirections (`/interne` n’est pas un écran)

Pas de zones, pas de copy, pas de prompt Stitch. Comportement uniquement :

| Action | Condition | Résultat | Destination |
|---|---|---|---|
| Ouvrir `/interne` | Session + rôle admin / conciergerie | La file s’ouvre. Pas un 6ᵉ écran. | **I02** `/interne/dossiers` |
| Ouvrir `/interne` | Sans session ou sans rôle | La file n’est pas visible. | **I01** `/interne/connexion` |
| Ouvrir **I01** | Déjà authentifiée **avec** le rôle | Redirection. Pas un 2ᵉ login. | **I02** `/interne/dossiers` |
| Coller I02–I05 | Sans session | I02–I05 ne s’ouvrent pas. | **I01** `/interne/connexion` |
| Coller I02–I05 | Compte **sans** le rôle | File, fiche, I04, I05 fermés. | **I01** (`forbidden`) |

---

## Inventaire (5 écrans)

| ID | Écran | URL | Moments | Variantes (même URL) |
|---|---|---|---|---|
| **I01** | Connexion interne | `/interne/connexion` | US-ADM-08 | `form` · `error` · `forbidden` |
| **I02** | File de dossiers | `/interne/dossiers` | A1 | `loading` · `empty` · `happy` |
| **I03** | Fiche dossier | `/interne/dossiers/:id` | A2, A3, A6, A7 (effet), notes fil 2 | `fil_a` · `fil_b` · `actif` · `inactif` |
| **I04** | Journaliser un contact | `/interne/dossiers/:id/contact` | A4 | `sortant` · `entrant` · `refuse_non_autorisee` |
| **I05** | Enregistrer une issue | `/interne/dossiers/:id/issue` | A5, A8, A9, A10 | `accepte` · `refuse` · `precision` · `adaptation` · `aucune_reponse` |

### Pas des écrans

| Adresse ou objet | Comportement |
|---|---|
| `/interne` | Redirection (table ci-dessus). |
| Téléphone / WhatsApp / mail | Hors Nolaya. Pas de fil de discussion. |
| `/suivi/:jeton` | Écran **cliente**. Effet seulement. |
| `/soumission`, `/soumission/confirmation` | Pont **cliente**. |
| `/admin`, `/admin/connexion`, `/admin/professionnelles` | Catalogue. Distinct. |
| `/interne/dossiers/:id/message` | N’existe pas. |
| `/interne/vagues`, `/interne/matching`, `/interne/rdv` | N’existent pas. |
| Espace coiffeuse, file coiffeuse, lien de réponse | N’existent pas au lancement. |
| Six états de Suivi comme six URLs admin | Interdit. |

---

## I01 — Connexion interne `/interne/connexion`

Porte du rôle **admin / conciergerie**. Ce n’est pas `/admin/connexion`. **Pas de chrome interne.** Pas de file visible avant succès.

### Variantes (même URL)

| Variante | Quand |
|---|---|
| `form` | Formulaire vierge ou après déconnexion. |
| `error` | Identifiants invalides. |
| `forbidden` | Compte authentifié **sans** le rôle ; visiteuse ; cliente ; jeton de Suivi présenté ici. |

Déjà authentifiée **avec** le rôle : redirection vers I02 — **pas** une variante.

### Zones

1. Marque typographique « Nolaya interne » — petite, pas de photo.
2. Titre + une phrase : outil de **dossiers**, pas le catalogue d’offres.
3. Formulaire : e-mail · mot de passe (ou équivalent Auth interne déjà utilisé).
4. Soumission unique.
5. Message `error` ou `forbidden` **sur cet écran** (bannière), pas une URL nouvelle.
6. Aucune liste de dossiers, aucune fiche, aucun lien « continuer vers `/admin` ».

### Copy

- Marque : `Nolaya interne`
- Titre : `Connexion interne`
- Appui : `Outil de dossiers — conciergerie de lancement. Ce n’est pas le catalogue d’offres.`
- Champ : `E-mail`
- Champ : `Mot de passe`
- Soumettre : `Se connecter`
- `error` : `Identifiants incorrects. La file ne s’ouvre pas.`
- `forbidden` : `Ce compte n’a pas le rôle admin / conciergerie. La file ne s’ouvre pas.`
- Note optionnelle (une ligne) : `Un jeton de Suivi n’ouvre pas cet outil.`

### Actions

| Action | Condition | Résultat | Destination |
|---|---|---|---|
| **Se connecter** | Identifiants valides **et** rôle admin / conciergerie | Session ouverte. Pas de file avant succès. | **I02** `/interne/dossiers` |
| **Se connecter** | Identifiants invalides | La file ne s’ouvre pas. | **on reste** (I01 `error`) |
| **Se connecter** | Compte authentifié **sans** le rôle | La file ne s’ouvre pas. | **on reste** (I01 `forbidden`) |
| Présenter un jeton de Suivi (visiteuse / cliente) | URL I01 ou `/interne/…` | Aucun droit interne. Le Suivi de **ce** dossier reste côté cliente (**effet**, pas un écran admin). | **on reste** (I01 `forbidden`) |
| Chercher un compte / une file / un écran de réponse coiffeuse | — | Ces objets n’existent pas. | **hors MVP** — pas de contrôle |
| Ouvrir la file, une fiche ou `/admin` comme porte de secours | — | Pas de porte de secours. | **hors MVP** — pas de contrôle |
| Créer un compte coiffeuse, un OTP cliente, un magic link dossier | — | Absents au lancement. | **hors MVP** — pas de contrôle |

### Interdit (aucun contrôle)

Créer un compte · OTP · magic link · chrome Découvrir / Ma demande / Suivi · aperçu de la file · lien catalogue comme login.

---

## I02 — File de dossiers `/interne/dossiers`

Moment **A1**. Liste opérable. Pas un dashboard de matching. **Chrome interne.**

### Variantes (même URL)

| Variante | Quand |
|---|---|
| `loading` | Chargement. Skeletons. **Pas** de faux dossiers. |
| `empty` | Aucune ligne. Message vide. **Pas** de ligne inventée. |
| `happy` | Au moins un dossier réel (fil A et/ou B). |

Le pont **Faire vérifier** (hors scène) : le dossier **apparaît** ici. Alex ne saisit rien pour le créer. Suivi projeté initial : **Demande reçue**. Jamais libellé match confirmé / **Coiffeuse trouvée** du seul matching.

### Zones

1. Chrome interne (sidebar **Dossiers** actif).
2. Titre de page `Dossiers`.
3. Table / liste dense, une ligne = un dossier :

   | Colonne | Source |
   |---|---|
   | Référence | Identifiant humain du dossier |
   | Prénom | Prénom **déclaré** |
   | Fil | `Fil A` ou `Fil B` |
   | Autorisée | Destinataire **autorisé** (prénom professionnel) |
   | Suivi | État **projeté** (ce que voit la cliente) |
   | Recence | Dernier fait interne ou date de création |

4. `empty` : même titre, aucun tableau fantôme.
5. `loading` : mêmes colonnes en skeleton, **sans** noms inventés.

Isolation : la ligne d’Inès ne mélange pas Léa.

### Copy

- Titre : `Dossiers`
- En-têtes : `Référence` · `Prénom` · `Fil` · `Autorisée` · `Suivi` · `Recence`
- Badges fil : `Fil A` · `Fil B`
- Suivi projeté (libellés D20 seulement, si le **fait** l’autorise) : `Demande reçue` · `Recherche en cours` · `Précision nécessaire` · `Coiffeuse trouvée` · `Aucune coiffeuse confirmée` · `Demande abandonnée`
- Ligne inactive : badge `Inactif` **en plus** du Suivi projeté `Demande abandonnée` — pas un second écran.
- `empty` : `Aucun dossier pour le moment.`
- Interdit en copy de ligne : présenter une candidate algorithmique comme `Coiffeuse trouvée`.

Pas de KPI, pas de « contacter toutes les coiffeuses », pas d’« élargir ».

### Actions

| Action | Condition | Résultat | Destination |
|---|---|---|---|
| Attendre | `loading` | Même URL. Pas de faux dossiers. | **on reste** (I02 `loading`) |
| Consulter | `empty` | Aucune ligne inventée. | **on reste** (I02 `empty`) |
| Ouvrir une ligne | Dossier **actif** | Fiche de **ce** dossier. Inès ≠ Léa. | **I03** `/interne/dossiers/:id` |
| Ouvrir une ligne | Dossier **inactif** / abandonné | Visible comme tel. Contact / issue / confirmation **fermés**. | **I03** (`inactif`) |
| Libeller une candidate algorithmique **Coiffeuse trouvée** | — | Interdit tant que US-ADM-06 n’est pas vrai. | **hors MVP** — pas de contrôle |
| Contacter toutes les coiffeuses / « élargir » | — | Pas de bouton. Pas d’ajout silencieux. | **hors MVP** — pas de contrôle |
| KPI, cycles de matching, vagues, carte, calendrier RDV | — | Pas un mega-admin. | **hors MVP** — pas de contrôle |
| Fusionner avec `/admin` | — | Créer une offre ≠ traiter un dossier. | **hors MVP** — pas de contrôle |

Chrome **Dossiers** / **Se déconnecter** : voir [Chrome interne](#chrome-interne).

---

## I03 — Fiche dossier `/interne/dossiers/:id`

Moments **A2** (synthèse), **A3** (qui joindre ; le contact est hors app), **A6** (reconfirmation + confirmation), effets **A7**, notes du fil 2. Un seul écran pour les deux fils. **Chrome interne.**

### Variantes (même URL)

Elles se **composent** : un dossier est `fil_a` **ou** `fil_b`, et `actif` **ou** `inactif`.

| Variante | Contenu distinct |
|---|---|
| `fil_a` | Besoin versionné, **cette** candidate, raisons de matching, éléments à confirmer. Les incertitudes restent des incertitudes. |
| `fil_b` | L’offre choisie et les éléments à confirmer. **Aucun** besoin QUALIFIED inventé. |
| `actif` | Sorties contact / issue / confirmation / épuisement / inactivation **ouvertes** (sous gardes). |
| `inactif` | Bannière d’inactivité. Sorties contact / issue / confirmation **fermées**. |

### Zones

Disposition desktop : colonne principale (synthèse + faits) ; rail ou bloc inférieur pour journal / issues. Pas de photo héroïque.

1. **Chrome interne.**
2. **Identité** — référence · badge Fil A/B · Suivi **projeté** · auteur interne des derniers faits.
3. **`inactif`** — bannière en tête de page (variante, pas une URL).
4. **Synthèse destinable à la coiffeuse** — besoin (fil A) ou offre (fil B), éléments à confirmer, incertitudes nommées comme telles. **Sans** coordonnées directes de la cliente, **sans** adresse exacte.
5. **Fil A seulement** — raisons de matching, clairement **≠** confirmation professionnelle.
6. **Destinataires autorisés** — uniquement ceux de Faire vérifier. Coordonnées **professionnelles** affichées pour appeler **hors app** (texte : téléphone / WhatsApp / mail). Mention : Nolaya n’envoie pas le message. **Pas** de bouton « Envoyer ».
7. **Canal déclaré cliente** — bloc **séparé** de la synthèse coiffeuse : prénom + téléphone **ou** e-mail, libellé **non vérifié par OTP**. Pour recontacter Inès / Léa, pas pour coller dans la synthèse coiffeuse.
8. **Reconfirmations** — trois faits, présents ou manquants : **lieu** · **budget** · **période**. Saisie / bascule **sur cette fiche** (pas un 6ᵉ écran).
9. **Journal interne** (lecture) — canal, horodatage, interlocutrice. Invisible à la cliente.
10. **Issues consignées** — valeur, auteur, horodatage. Dans **ce** dossier unique.
11. **Actions** (barre, dossier `actif` seulement) — uniquement les sorties user-flow :

    | Contrôle | Garde visuelle |
    |---|---|
    | **Journaliser un contact** | Au moins une destinataire autorisée |
    | **Enregistrer une issue** | Dossier actif |
    | **Confirmer le match** | Gated : issue **accepte** **et** lieu + budget + période reconfirmés. Sinon visible mais **refusé** (message), pas READY. |
    | **Consigner l’épuisement** | Fait humain sur la politique de contact des **autorisées**. Pas un moteur. |
    | **Marquer inactif / retiré** | Passe la fiche en `inactif`. |

    Dossier `inactif` : ces cinq contrôles **fermés** (absents ou inactifs, sans destination).

Joindre Aïcha = lecture de la zone 6 + appel hors app. **Pas** une sortie in-app.

### Copy

- Titre : `Dossier` + référence (JetBrains Mono)
- Fil : `Fil A` · `Fil B`
- Section synthèse : `Synthèse pour la coiffeuse`
- Note synthèse : `Sans coordonnées de la cliente ni adresse exacte.`
- Section matching (fil A) : `Raisons de matching` · micro-copie `Incertitude` / `À confirmer` — jamais `Confirmé` pour une raison algorithmique
- Section fil B : `Offre choisie` — pas de titre « Demande QUALIFIED »
- Section destinataires : `Destinataires autorisés`
- Note contact : `Joindre hors de Nolaya. Nolaya n’envoie pas le message.`
- Section cliente : `Canal déclaré` · `Non vérifié par OTP`
- Section faits : `Reconfirmations` · `Lieu` · `Budget` · `Période` · états `Reconfirmé` / `Manquant`
- Journal : `Journal interne` · `Invisible pour la cliente`
- Issues : `Issues`
- CTAs (libellés **verrouillés**) : `Journaliser un contact` · `Enregistrer une issue` · `Confirmer le match` · `Consigner l’épuisement` · `Marquer inactif / retiré`
- Aide confirmation : `Oui humain + lieu, budget et période. Ce n’est pas un rendez-vous.`
- `accepte` seul : `Issue accepte consignée. Reconfirmations manquantes — pas encore Coiffeuse trouvée.`
- Confirmation refusée : `Confirmation refusée. Il manque le oui humain, le lieu, le budget ou la période.`
- Après confirmation : Suivi projeté `Coiffeuse trouvée` — **pas** `READY`, **pas** `Rendez-vous`, **pas** `Prix final`
- `inactif` : `Dossier inactif. Plus de nouveau contact.` · Suivi projeté `Demande abandonnée`
- Adaptation visible : `Adaptation consignée. Ne pas l’accepter au nom de la cliente.`

### Actions

| Action | Condition | Résultat | Destination |
|---|---|---|---|
| **Journaliser un contact** | Dossier **actif**, ≥ 1 autorisée | Formulaire de consignation. Pas un messager. | **I04** `/interne/dossiers/:id/contact` |
| **Enregistrer une issue** | Dossier **actif** | Un écran, cinq valeurs D20. | **I05** `/interne/dossiers/:id/issue` |
| Lire la synthèse fil A | Dossier fil A | Besoin, **cette** candidate, raisons, à confirmer. Incertitudes = incertitudes. | **on reste** (I03 `fil_a`) |
| Lire la synthèse fil B | Dossier fil B | Offre choisie et à confirmer. **Aucun** QUALIFIED inventé. | **on reste** (I03 `fil_b`) |
| Identifier qui est joignable puis appeler / WhatsApp / mail **hors app** | Autorisée affichée | Nolaya n’envoie rien. **Pas** d’écran WhatsApp. Suivi inchangé tant que non consigné. | **on reste** (I03) |
| Relire la fiche | Journal déjà présent | Journal interne visible. I04 / I05 encore possibles si **actif**. | **on reste** (I03) |
| « Contacter dans l’app » | — | Le contact reste hors app ; seule I04 journalise. | **on reste** (I03) — **pas** de contrôle « Envoyer » |
| Un rappel / WhatsApp arrive hors plateforme | Même dossier | Pas un second dossier. | **I04** (`entrant`) |
| **Confirmer le match** | Issue **accepte** **et** lieu + budget + période reconfirmés | **Effet** Suivi **Coiffeuse trouvée**. Pas READY, pas RDV, pas de 6ᵉ écran. | **on reste** (I03) |
| **Confirmer le match** | Sans oui humain, ou sans lieu, ou sans budget, ou sans période | Refus. Suivi **≠** **Coiffeuse trouvée**. | **on reste** (I03) |
| Consulter après **accepte** seul | Reconfirmations manquantes | Pas encore **Coiffeuse trouvée**. | **on reste** (I03) |
| **Consigner l’épuisement** | Politique de contact des **autorisées** épuisée, sans confirmation | **Effet** Suivi **Aucune coiffeuse confirmée**. Fait humain, pas un moteur. | **on reste** (I03) |
| **Marquer inactif / retiré** | Dossier actif | **Effet** Suivi **Demande abandonnée**. Plus de nouveau contact. | **on reste** (I03 `inactif`) |
| Journaliser / issue / confirmer | Variante `inactif` | Sorties fermées. | **on reste** (I03 `inactif`) |
| Joindre une **autre déjà autorisée** hors app | Plusieurs autorisées | Puis I04 pour consigner. Suivi **Recherche en cours** tant qu’il n’y a ni confirmation ni épuisement. Pas d’ajout silencieux. | **on reste** (I03) |
| Attendre les données de Léa | Dossier d’Inès ouvert | Isolation. | **on reste** (I03) |
| Accepter une **adaptation** **au nom** de la cliente | Adaptation consignée | Refus. Le match n’est pas confirmé de ce fait. | **hors MVP** — pas de contrôle |
| Ajouter / contacter une **non autorisée** | — | Refus. Dossier inchangé. | **hors MVP** — pas de contrôle |
| Messagerie / « envoyer le message » | — | Pas d’URL `/interne/dossiers/:id/message`. | **hors MVP** — pas de contrôle |
| Accord, paiement, fiche RDV, préparation, avis | — | **Coiffeuse trouvée** ne les déclenche pas. | **hors MVP** — pas de contrôle |
| OTP / vérifier le canal cliente | — | Coordonnées **déclarées**. | **hors MVP** — pas de contrôle |
| Simuler un contact ou une réponse depuis la fiche | — | Faits = I04 / I05 seulement. | **hors MVP** — pas de contrôle |
| Inventer un QUALIFIED pour le fil B | — | Offre seule. | **hors MVP** — pas de contrôle |
| Habiller les raisons de matching en confirmation professionnelle | — | Les incertitudes restent des incertitudes. | **hors MVP** — pas de contrôle |
| Ouvrir `/admin` comme s’il s’agissait de ce dossier | — | Outils distincts. | **hors MVP** — pas de contrôle |

Retour / nav **Dossiers** : voir [Chrome interne](#chrome-interne) → **I02**.

---

## I04 — Journaliser un contact `/interne/dossiers/:id/contact`

Moment **A4**. Formulaire de **consignation**. **Pas** un écran WhatsApp. **Chrome interne.**

### Variantes (même URL)

| Variante | Quand |
|---|---|
| `sortant` | Alex a joint (préselection depuis **Journaliser un contact**). |
| `entrant` | Rappel / WhatsApp reçu hors plateforme, **même** dossier. |
| `refuse_non_autorisee` | Tentative vers une destinataire **non autorisée**. Dossier inchangé. |

Contact **fictif** refusé : message sur I04, **on reste** — pas une 4ᵉ variante nommée, pas une URL nouvelle.

Dossier `inactif` : I04 n’est **pas** une entrée valide → retour **I03** `inactif` (pas une variante I04).

### Zones

1. Chrome interne.
2. Titre + rappel du dossier (référence, prénom déclaré).
3. **Interlocutrice** — liste = **autorisées uniquement**, une pré-sélectionnée. Pas de champ libre « autre coiffeuse ».
4. **Canal** · **Horodatage** · **Sens** (`Sortant` / `Entrant`).
5. Aucun corps de message obligatoire. Aucun éditeur de conversation. Aucune pièce jointe « chat ».
6. Actions : **Enregistrer** · **Annuler**.
7. Bannière `refuse_non_autorisee` ou refus de contact fictif **sur cet écran**.

Absence de compte Nolaya de la coiffeuse : **n’empêche pas** de consigner (pas de blocage UI « créer un compte »).

### Copy

- Titre : `Journaliser un contact`
- Appui : `Consigner un contact réel hors application. Nolaya n’envoie pas de message.`
- Dossier : `Dossier` + référence
- Champ : `Interlocutrice` (autorisées seulement)
- Champ : `Canal`
- Champ : `Horodatage`
- Sens : `Sortant` · `Entrant`
- Soumettre : `Enregistrer`
- Secondaire : `Annuler`
- `refuse_non_autorisee` : `Destinataire non autorisée. Le dossier est inchangé.`
- Contact fictif : `Contact fictif refusé. Le Suivi n’avance pas comme si le contact avait existé.`
- Pas de champ `Message`, pas de CTA `Envoyer`, `SMS`, `WhatsApp`, `Relancer`.

### Actions

| Action | Condition | Résultat | Destination |
|---|---|---|---|
| **Enregistrer** | `sortant` · canal + horodatage + interlocutrice **autorisée** · contact **réel** | Journal enrichi. **Effet** Suivi **Recherche en cours** si aucune issue D20 plus forte n’impose autre chose. | **I03** `/interne/dossiers/:id` |
| **Enregistrer** | `entrant` · rappel hors plateforme · même dossier | Journal. Effet selon faits déjà consignés (souvent **Recherche en cours**). | **I03** `/interne/dossiers/:id` |
| **Annuler** | — | Dossier inchangé. | **I03** `/interne/dossiers/:id` |
| Choisir une destinataire **non autorisée** | Liste hors autorisées (si tenté) | Dossier inchangé. | **on reste** (I04 `refuse_non_autorisee`) |
| **Enregistrer** un contact **fictif** | Aucun contact réel | Refus. Le Suivi n’avance pas comme si le contact avait existé. | **on reste** (I04) |
| Ouvrir I04 | Dossier **I03** `inactif` | Entrée I04 invalide. | **I03** (`inactif`) |
| Consigner malgré l’absence de compte coiffeuse | Contact hors app réel | L’absence de compte / file / écran de réponse **ne bloque pas**. | **on reste** (I04) jusqu’à **Enregistrer** / **Annuler** |
| Envoyer SMS, WhatsApp ou e-mail **depuis Nolaya** | — | I04 journalise ; elle n’ouvre pas WhatsApp. | **hors MVP** — pas de contrôle |
| Fil de discussion, pièces « chat », relance automatique | — | Pas de messagerie. | **hors MVP** — pas de contrôle |
| Créer un second dossier pour le rappel | — | Un dossier unique. | **hors MVP** — pas de contrôle |
| Exposer le journal à la cliente | — | Elle ne voit ni journal, ni canaux, ni motifs. | **hors MVP** — pas de contrôle |

---

## I05 — Enregistrer une issue `/interne/dossiers/:id/issue`

Moments **A5, A8, A9, A10**. Cinq valeurs D20, **un** écran. La confirmation de match n’est **pas** ici. **Chrome interne.**

### Variantes (même URL)

Choix unique — la variante est la valeur **sélectionnée** sur le même formulaire, pas cinq URLs.

| Variante | Champs en plus | Effet Suivi à l’enregistrement |
|---|---|---|
| `accepte` | — | Match **pas** confirmé. Suivi **≠** **Coiffeuse trouvée**. |
| `refuse` | — | Distinct d’**aucune réponse**. Pas une faute exposée. Suivi **Recherche en cours** tant qu’il n’y a ni confirmation, ni épuisement, ni abandon. |
| `precision` | **Une** question ciblée rattachée au dossier (pas un chat) | **Précision nécessaire** |
| `adaptation` | Description du changement proposé (date, prix, lieu, prestation, fourniture…) **sans** l’accepter au nom de la cliente | Pas de confirmation de match |
| `aucune_reponse` | — | Distinct d’un refus. Ne vaut **jamais** acceptation. Suivi **Recherche en cours** jusqu’à épuisement. |

Simulation (issue comme si elle avait répondu, sans réponse réelle) : refus, **on reste** I05 — pas une 6ᵉ variante d’URL.

Dossier `inactif` : I05 fermé → **I03** `inactif`.

Épuisement après **refuse** / **aucune réponse** : geste **I03**, pas un 6ᵉ écran issue.

### Zones

1. Chrome interne.
2. Titre + rappel du dossier.
3. Choix unique (cinq valeurs D20) — radios ou liste fermée, **pas** de 6ᵉ valeur.
4. Zone conditionnelle `precision` : un champ **Question ciblée**.
5. Zone conditionnelle `adaptation` : un champ **Changement proposé**. **Pas** de CTA « Accepter pour la cliente ».
6. Mention auteur interne + horodatage (portés par l’enregistrement, pas saisis comme identité cliente).
7. Actions : **Enregistrer** · **Annuler**.
8. **Pas** de bouton **Confirmer le match**.

### Copy

- Titre : `Enregistrer une issue`
- Appui : `Une réponse réelle — ou une absence réelle après tentatives utiles. La confirmation de match n’est pas ici.`
- Valeurs (libellés **verrouillés**) : `Accepte` · `Refuse` · `Précision` · `Adaptation` · `Aucune réponse`
- Hint `accepte` : `N’affiche pas Coiffeuse trouvée. Confirmer le match se fait sur la fiche, après reconfirmation.`
- Hint `refuse` / `aucune_reponse` : `Deux valeurs distinctes. Ce n’est pas une faute exposée à la cliente.`
- Champ `precision` : `Question ciblée` · `Pas de messagerie.`
- Champ `adaptation` : `Changement proposé` · `Ne pas l’accepter au nom de la cliente.`
- Soumettre : `Enregistrer`
- Secondaire : `Annuler`
- Simulation refusée : `Issue simulée refusée. Le Suivi est inchangé.`
- Pas de CTA : `Confirmer le match` · `Accepter pour la cliente` · `Ouvrir le chat` · `Retenir la proposition` · `Créer un RDV`

### Actions

| Action | Condition | Résultat | Destination |
|---|---|---|---|
| **Enregistrer** `accepte` | Réponse réelle | Issue, auteur, horodatage. Match **pas** confirmé. Suivi **≠** **Coiffeuse trouvée**. | **I03** `/interne/dossiers/:id` |
| **Enregistrer** `refuse` | Réponse réelle | Distinct d’**aucune réponse**. Pas une faute exposée. Suivi **Recherche en cours** tant qu’il n’y a ni confirmation, ni épuisement, ni abandon. | **I03** `/interne/dossiers/:id` |
| **Enregistrer** `aucune_reponse` | Tentatives utiles **réelles** | Distinct d’un refus. Ne vaut **jamais** acceptation. Suivi **Recherche en cours** jusqu’à épuisement. | **I03** `/interne/dossiers/:id` |
| **Enregistrer** `precision` + **une** question ciblée | Question réellement nécessaire | Pas de chat. **Effet** Suivi **Précision nécessaire**. | **I03** `/interne/dossiers/:id` |
| **Enregistrer** `adaptation` | Changement proposé réel | Pas d’acceptation au nom de la cliente. Pas de confirmation de match. | **I03** `/interne/dossiers/:id` |
| **Annuler** | — | Dossier inchangé. | **I03** `/interne/dossiers/:id` |
| **Enregistrer** comme si elle avait répondu | Aucune réponse réelle | Refus. Suivi inchangé. | **on reste** (I05) |
| Ouvrir I05 | Dossier **I03** `inactif` | I05 fermé. | **I03** (`inactif`) |
| **Confirmer le match** depuis I05 (même sur `accepte`) | — | Confirmation = geste **I03** seulement, après les trois reconfirmations. | **hors MVP** — pas de contrôle |
| Accepter l’**adaptation** au nom de la cliente | — | Refus. | **hors MVP** — pas de contrôle |
| Messagerie « pour préciser » | — | Question ciblée rattachée au dossier, pas un chat. | **hors MVP** — pas de contrôle |
| Retenir une proposition / étape 8 / paiement / RDV | — | US-07 hors lancement. | **hors MVP** — pas de contrôle |
| Traiter **aucune réponse** comme une acceptation | — | Deux valeurs distinctes. | **hors MVP** — pas de contrôle |
| Exposer le motif interne à la cliente | — | Elle ne voit que l’état de Suivi autorisé. | **hors MVP** — pas de contrôle |

Lignes **I03** après retour I05 (rappel, pas des contrôles I05) :

| Action (sur **I03**) | Condition | Résultat | Destination |
|---|---|---|---|
| **Consigner l’épuisement** | Après `refuse` ou `aucune_reponse`, **une seule** autorisée | **Effet** **Aucune coiffeuse confirmée**. Geste fiche, pas un 6ᵉ écran issue. | **on reste** (I03) |
| **Journaliser un contact** vers l’autre **déjà autorisée** | Après `refuse`, une autre déjà autorisée | Pas d’ajout silencieux. Suivi **Recherche en cours**. | **I04** `/interne/dossiers/:id/contact` |

---

## Effets cliente (pas des destinations, pas des zones admin)

`/suivi/:jeton` n’est pas un écran de cet outil. Aucune copy admin n’est destinée à Inès / Léa ici.

| Fait réel (geste admin) | Écran du geste | **Effet** Suivi |
|---|---|---|
| Dossier créé, aucun contact consigné | Pont → **I02** | **Demande reçue** |
| Traitement ou contact réel consigné | **I04** (retour **I03**) | **Recherche en cours** |
| Issue **précision** | **I05** (retour **I03**) | **Précision nécessaire** |
| **accepte** + lieu + budget + période reconfirmés, match confirmé | **I03** (**on reste**) | **Coiffeuse trouvée** |
| Épuisement de la politique de contact des **autorisées**, sans confirmation | **I03** (**on reste**) | **Aucune coiffeuse confirmée** |
| Dossier retiré / inactif | **I03** `inactif` (**on reste**) | **Demande abandonnée** |
| **accepte** seul | **I05** → **I03** | **≠** **Coiffeuse trouvée** (souvent **Recherche en cours**) |
| **refuse** / **aucune réponse** / **adaptation**, sans épuisement | **I05** → **I03** | **Recherche en cours** (sauf **précision**) |

La cliente ne voit ni journal, ni canaux, ni motifs internes. Pas d’onglet **Rendez-vous**.

---

## Couverture des variantes

| Écran | Variantes couvertes | Hors variante (même URL / garde) |
|---|---|---|
| **I01** | `form` · `error` · `forbidden` | Déjà authentifiée + rôle → redirection I02 (pas un écran) |
| **I02** | `loading` · `empty` · `happy` | — |
| **I03** | `fil_a` · `fil_b` · `actif` · `inactif` | Confirmation refusée / `accepte` seul = **on reste** I03 |
| **I04** | `sortant` · `entrant` · `refuse_non_autorisee` | Contact fictif = **on reste** I04 ; inactif = pas I04 → I03 |
| **I05** | `accepte` · `refuse` · `precision` · `adaptation` · `aucune_reponse` | Simulation = **on reste** I05 ; inactif = pas I05 → I03 |

Chrome : un seul spec. `/interne` : redirection, pas un écran. **Pas de 6ᵉ écran métier.**

## Couverture des sorties user-flow / transitions

Chaque **Sortie** de [user-flow-admin.md](./user-flow-admin.md) a une ligne **Action** ici. Destinations = I01–I05, **on reste**, **hors MVP**, ou Suivi comme **effet**. Aucun CTA ajouté.

| Sortie | Spec |
|---|---|
| `/interne` → I02 / I01 | Redirections |
| I01 succès → I02 ; `error` ; `forbidden` ; jeton | I01 Actions |
| I01 déjà authentifiée → I02 | Redirections |
| Se déconnecter → I01 | Chrome |
| I02 ouvrir ligne → I03 / `inactif` | I02 Actions |
| I02 nav Dossiers | Chrome |
| I03 journaliser → I04 ; issue → I05 | I03 Actions |
| I03 confirmer / épuisement / inactif | I03 Actions **on reste** |
| I03 nav Dossiers → I02 | Chrome |
| I03 joindre hors app | I03 **on reste** — pas de CTA d’envoi |
| I04 enregistrer / annuler / non autorisée / fictif | I04 Actions |
| I05 cinq issues / annuler / simulation | I05 Actions |
| Interdits D21 | **hors MVP** — pas de contrôle |

---

## Hors MVP — D21 (rappel)

Aucun contrôle, zone ou copie d’écran pour :

- espace coiffeuse self-service, compte professionnel, lien de réponse autonome ;
- plan de vague, stratégies de présélection, relances automatiques, messagerie libre ;
- OTP / vérification du canal cliente ;
- accord versionné, double validation, paiement, fiche et onglet Rendez-vous, préparation, avis ;
- contacter une coiffeuse non autorisée ;
- accepter une modification **au nom** de la cliente ;
- simuler un contact ou une réponse ;
- mega-admin « cycles de matching » / dashboard d’annonces à la place de cette file ;
- US-07.1 à US-07.5, workflow US-06 complet, US-PRO-* in-app ;
- `/admin` catalogue comme canon des dossiers.

## Ce que STEP 6 devra fixer (sans l’écrire ici)

Prompts Stitch admin pour I01–I05 (apparence desktop-first). Un prompt = un écran = une URL. Les variantes restent **dans** le prompt. Navigation = ensemble fermé de ce fichier + [transitions-admin.md](./transitions-admin.md). Pas de 6ᵉ écran. Pas de CTA inventé.
