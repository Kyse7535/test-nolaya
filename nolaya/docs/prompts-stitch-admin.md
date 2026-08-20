# Prompts Stitch — Admin / conciergerie de lancement

> Source de vérité navigation : [`user-flow-admin.md`](./user-flow-admin.md) · [`transitions-admin.md`](./transitions-admin.md)
> Contenu / zones / copy par état : [`screen-specs-admin.md`](./screen-specs-admin.md) — **source primaire** pour layout
> Histoire : [`storyboard-admin.md`](./storyboard-admin.md) · métier : [D19–D21](../user-stories/decisions-produit.md) · US : [US-ADM-01 à US-ADM-09](../user-stories/admin-conciergerie-lancement/user-stories.md)
> Format : [`prompts-stitch.md`](./prompts-stitch.md) (cliente) — batch header, English prompt, French UI, Nolaya tokens, one ` ```text ` block per screen
> Device : **Desktop-first** (~1440×900, usable at ~1280)
> Prompt language : English
> UI text language : French — **operational / vous or neutral** (never client tutoiement)
> Design system : Nolaya
> Visual identity : Afro / textured hair if any human depiction — **prefer no photography**
> Scope : **5 écrans** internes I01–I05 sous `/interne/…`
> Hors scope : chrome cliente, messagerie, RDV, catalogue `/admin`, espace coiffeuse, mega-admin, OTP, paiement, 6ᵉ écran métier

**Prompts** depuis user-flow-admin + transitions-admin + screen-specs-admin (inventaire à 5 écrans). Stitch dessine **l’apparence**. Il n’invente ni écran, ni CTA, ni destination absents du contrat.

---

## Comment utiliser ce fichier

1. **Coller un seul bloc ` ```text ` à la fois** dans Google Stitch. Un prompt = un écran (URL produit).
2. Générer **dans l’ordre I01 → I05** (un à la fois). Les variantes d’état sont décrites **dans** le prompt : ne pas en faire un 6ᵉ écran ni d’URL nouvelle.
3. **Ne pas fusionner** les écrans. **Ne pas** demander un diagramme de parcours.
4. Si Stitch propose un bouton, un onglet ou une destination absents du contrat ci-dessous : **refuser**. Flow + transitions + screen-specs priment sur l’intuition du modèle.
5. Les états (`form`, `error`, `forbidden`, `loading`, `empty`, `happy`, `fil_a`, `fil_b`, `actif`, `inactif`, `sortant`, `entrant`, `refuse_non_autorisee`, cinq issues) sont des **variantes du même écran**, pas des écrans inventés.

**Ordre de génération recommandé :** Connexion interne → File → Fiche → Journaliser un contact → Enregistrer une issue.

**Pas des écrans** (le mentionner à Stitch uniquement dans l’en-tête, jamais comme I06) :

| Adresse ou objet | Comportement |
|------------------|--------------|
| `/interne` | Redirection → I02 si session + rôle, sinon I01. Pas un écran. |
| Téléphone / WhatsApp / mail | Hors Nolaya. Pas de fil de discussion. |
| `/suivi/:jeton` | Écran **cliente**. Effet seulement. |
| `/soumission`, `/soumission/confirmation` | Pont **cliente**. |
| `/admin`, `/admin/connexion`, `/admin/professionnelles` | Catalogue. Distinct. |
| `/interne/dossiers/:id/message` | N’existe pas. |
| `/interne/vagues`, `/interne/matching`, `/interne/rdv` | N’existent pas. |
| Espace coiffeuse, file coiffeuse, lien de réponse | N’existent pas au lancement. |
| Six états de Suivi comme six URLs admin | Interdit. Un seul Suivi cliente, six **variantes**. |

---

## En-tête batch (à coller tel quel dans Stitch)

Ce fichier contient **5 écrans indépendants**.  
Chaque bloc `SCREEN XX` est un prompt autonome.  
Générer **un seul écran par prompt**.  
**Ne pas fusionner** les écrans.  
**Ne pas** produire un diagramme de parcours ni un flow.  
**Ne pas inventer** de navigation : uniquement les CTA et destinations listés.

---

## Global Stitch instruction (English)

```text
BATCH OF INDEPENDENT SCREENS.

This document contains exactly 5 independent DESKTOP screen prompts for Google Stitch — Nolaya INTERNAL concierge tool (lancement).
For each SCREEN PROMPT block below:
- Generate EXACTLY ONE desktop app screen (the default/happy-path visual unless a VARIANT is explicitly requested).
- Do NOT combine multiple screens into one frame.
- Do NOT create a flow diagram, journey map, storyboard collage, or multi-screen mock.
- Do NOT invent sibling screens, extra nav items, or destinations.
- Treat every SCREEN PROMPT as a fully self-contained brief.
- Navigation is a CLOSED SET: only the listed entries, exits, and CTAs. If a control has no destination here, it does not exist.
- States (form, error, forbidden, loading, empty, happy, fil_a, fil_b, actif, inactif, sortant, entrant, refuse_non_autorisee, five issues) are VARIANTS of the same screen/URL — never new screens.
- Internal chrome (I02–I05 only): sidebar with EXACTLY one business item — Dossiers. NEVER Matching, Vagues, Messages, Rendez-vous, Catalogue. NEVER client chrome Découvrir / Ma demande / Suivi. NEVER a Rendez-vous tab.
- I01 has NO sidebar and NO file preview.
- There is NO messenger. Contact is off-app. I04 is a log form, not WhatsApp.
- Do NOT generate screens for redirects `/interne`, client Suivi, catalogue `/admin`, or `/interne/dossiers/:id/message`.

Process: generate Screen I01, then I02, I03, I04, I05 — one at a time, independently.
All visible UI text must be in French, operational tone (vous or neutral labels / infinitives). NEVER client tutoiement (tu / ta / tes).
```

---

## Design system global (rappel)

| Rôle | Valeur |
| ---- | ------ |
| Primary / charcoal | `#000000` / `#1b1c1c` |
| On-primary | `#ffffff` |
| Accent soft gold | `#775a19` |
| Gold container | `#fed488` |
| Background / surfaces | `#fbf9f8`, `#ffffff`, `#efeded` |
| Error | `#ba1a1a` |
| Font UI | **Manrope** |
| Font données / badges / références / horodatages | **JetBrains Mono** |
| Radius controls | `0.25rem` |
| Viewport | **Desktop-first ~1440×900** (also readable at ~1280). Not a phone marketing page. |

### Chrome interne (I02–I05 seulement — pas un écran)

| Élément | Copy | Où |
| ------- | ---- | -- |
| Marque | `Nolaya interne` | Sidebar haut |
| Sous-ligne | `Conciergerie de lancement` | Sous la marque |
| Nav (seul item métier) | `Dossiers` → `/interne/dossiers` | Actif sur I02 |
| Session | Identité opératrice (e-mail ou prénom interne) · `Se déconnecter` | Bas de sidebar ou en-tête |

**Absent de I01.** Pas de 2ᵉ item Matching / Vagues / Messages / Rendez-vous / Catalogue. Pas de chrome cliente.

Taper **Dossiers** n’ouvre que la file. Formulaire I04/I05 non enregistré = dossier inchangé.

### Anti-patterns (tous les écrans)

- Pas de violet / indigo, glow néon, dark mode, pills excessives, card spam, ombres multi-couches, emojis décoratifs
- **Aucune photo héroïque.** Pas de lifestyle full-bleed. Un identifiant texte (référence, prénom, offre) suffit
- **Pas de messagerie**, chat, « Envoyer », SMS, WhatsApp in-app, pièces « chat »
- **Pas d’onglet Rendez-vous**, fiche RDV, créneau bloqué, prix final, READY
- **Pas de chrome cliente** Découvrir / Ma demande / Suivi
- **Pas de mega-admin** : KPI, cycles de matching, vagues, carte, calendrier
- **Vérité d’engagement** : on ne dit jamais réservation, créneau bloqué, prix final, rendez-vous confirmé
- Candidate algorithmique **≠** coiffeuse confirmée. « Coiffeuse trouvée » = oui humain **et** lieu + budget + période reconfirmés
- Synthèse destinable à la coiffeuse : **ni** coordonnées directes cliente, **ni** adresse exacte
- Canal déclaré cliente = bloc **séparé**, marqué non vérifié par OTP

---

## Cartographie des écrans (5 — pas 6)

| ID | Écran | URL | Moments | Variantes (même URL) |
| -- | ----- | --- | ------- | -------------------- |
| I01 | Connexion interne | `/interne/connexion` | US-ADM-08 | `form` · `error` · `forbidden` |
| I02 | File de dossiers | `/interne/dossiers` | A1 | `loading` · `empty` · `happy` |
| I03 | Fiche dossier | `/interne/dossiers/:id` | A2, A3, A6, A7 (effet), notes fil 2 | `fil_a` · `fil_b` · `actif` · `inactif` |
| I04 | Journaliser un contact | `/interne/dossiers/:id/contact` | A4 | `sortant` · `entrant` · `refuse_non_autorisee` |
| I05 | Enregistrer une issue | `/interne/dossiers/:id/issue` | A5, A8, A9, A10 | `accepte` · `refuse` · `precision` · `adaptation` · `aucune_reponse` |

---

========== SCREEN 01 / I01 — Connexion interne `/interne/connexion` ==========

```text
Independent screen. Generate ONLY this one screen. Do not generate other screens from this document.

Product context: Nolaya — premium B2B2C platform for Afro / textured hair. This screen is the INTERNAL concierge tool login (lancement), NOT the client app and NOT the offers catalogue login `/admin/connexion`. Operator Alex has the admin / conciergerie role. A visitor, a client, a Suivi token, or a hairstylist must not enter the file.

Device: Desktop-first internal tool, ~1440×900 (usable at ~1280 width). Centered auth card on a calm light surface. NOT a mobile marketing page. One screen only.

Screen type: OPERATIONAL gate (form). No internal sidebar. No file visible before success.

Screen purpose (US-ADM-08): Alex signs in to the dossiers tool. Short reminder: this is dossiers, not the offers catalogue. Failed credentials stay here (`error`). An authenticated account without the role stays here (`forbidden`). A Suivi token grants no internal right.

Layout:
1) Typographic wordmark « Nolaya interne » — small, top of the card. NO photo. NO full-bleed lifestyle image.
2) Title + one supporting sentence: tool of dossiers, not the catalogue of offers.
3) Form: E-mail · Mot de passe (or equivalent internal Auth already used by Nolaya).
4) Single submit.
5) Optional one-line note about Suivi tokens.
6) VARIANT banners `error` / `forbidden` ON THIS SCREEN — not a new URL.
7) NO dossier list, NO fiche preview, NO link « continuer vers /admin », NO client chrome Découvrir / Ma demande / Suivi, NO sidebar.

French UI text (exact, operational / vous or neutral — NEVER tutoiement):
- Wordmark: « Nolaya interne »
- Title: « Connexion interne »
- Support: « Outil de dossiers — conciergerie de lancement. Ce n’est pas le catalogue d’offres. »
- Field: « E-mail »
- Field: « Mot de passe »
- Submit: « Se connecter »
- Optional note: « Un jeton de Suivi n’ouvre pas cet outil. »
- VARIANT error: banner « Identifiants incorrects. La file ne s’ouvre pas. »
- VARIANT forbidden: banner « Ce compte n’a pas le rôle admin / conciergerie. La file ne s’ouvre pas. »

Default frame to generate: VARIANT `form` (blank form after logout). Describe error/forbidden as variants, do not output extra frames.

Interactions — CLOSED SET:
- « Se connecter » with valid credentials AND admin / conciergerie role → File `/interne/dossiers` (I02). No file before success.
- Invalid credentials → stay (I01 `error`)
- Authenticated account without the role → stay (I01 `forbidden`)
- Presenting a client Suivi token / visitor / client → stay (I01 `forbidden`). Client Suivi of THAT dossier remains on the client side (effect, not an admin screen).
- Already authenticated WITH the role: redirect to I02 — NOT a variant of this screen. Do not design a second login.
- Seeking a hairstylist account / file / reply screen: FORBIDDEN — no control
- Opening the file, a fiche, or `/admin` as a back door: FORBIDDEN — no control
- Create hairstylist account, client OTP, dossier magic link: FORBIDDEN — no control

Forbidden on this screen: sidebar, dossier preview, catalogue link as login, client chrome, OTP, magic link, account creation, « Continuer sans mot de passe », giant photo, Rendez-vous.

Visual / imagery: NO photography. Typographic gate. If any human depiction were used (do not), it would be a Black and/or mixed-race woman with coily/curly/textured hair — but prefer none.

Design system Nolaya: Manrope UI, JetBrains Mono only if a micro-label is needed. Charcoal #000000 / #1b1c1c, soft gold #775a19 / #fed488 sparingly, surfaces #fbf9f8 / #ffffff / #efeded. Error #ba1a1a for the error banner. Soft 0.25rem radii. Tonal layers, no heavy shadows, no purple, no neon, no emoji, no dark mode.

Quality bar: Quiet enterprise sign-in, generous whitespace, one obvious CTA. Desktop density without looking like a marketing landing. All visible UI text in French, operational / vous or neutral.
```

========== END SCREEN 01 ==========

========== SCREEN 02 / I02 — File de dossiers `/interne/dossiers` ==========

```text
Independent screen. Generate ONLY this one screen. Do not generate other screens from this document.

Product context: Nolaya INTERNAL concierge (lancement). Operable list of concierge dossiers. NOT a matching dashboard. NOT the offers catalogue `/admin`. Dossiers appear here when a client sends Faire vérifier (off-stage) — Alex types nothing to create them. Nobody has been contacted yet. Projected Suivi starts at Demande reçue. A matching candidate is NEVER labelled Coiffeuse trouvée from matching alone.

Device: Desktop-first internal tool, ~1440×900 (usable at ~1280). Dense operational table. One screen only.

Screen type: OPERATIONAL queue. Internal chrome present.

Screen purpose (storyboard A1 · US-ADM-01, US-ADM-08): Alex scans identifiable dossiers (reference, declared first name, Fil A or B, authorised recipient, projected Suivi, recency). Opening a row goes to THAT dossier. Inès’s row must not mix Léa. Empty and loading are variants of THIS url.

Layout:
1) Internal chrome LEFT sidebar (~240px): wordmark « Nolaya interne », subline « Conciergerie de lancement », single nav item « Dossiers » (active), session identity (e.g. « Alex · alex@nolaya.interne ») + « Se déconnecter ». NO other nav items.
2) Main: page title « Dossiers ».
3) Dense table, one row = one dossier. Columns exactly:
   Référence | Prénom | Fil | Autorisée | Suivi | Recence
4) Default VARIANT `happy`: at least two real rows, isolated:
   - NOL-1842 · Inès · Fil A · Aïcha · Demande reçue · Aujourd’hui
   - NOL-1847 · Léa · Fil B · Aïcha · Demande reçue · Aujourd’hui
   Optional third row inactive: NOL-1801 · Samira · Fil A · Aïcha · Demande abandonnée + badge « Inactif » · 12 août
5) Rows are clickable. No KPI strip, no charts, no « Contacter toutes les coiffeuses », no « Élargir ».
6) VARIANT `empty`: same title, NO ghost table, message « Aucun dossier pour le moment. »
7) VARIANT `loading`: same columns as skeletons, NO invented names.

French UI text (exact, operational / vous or neutral):
- Sidebar brand: « Nolaya interne »
- Subline: « Conciergerie de lancement »
- Nav: « Dossiers »
- Disconnect: « Se déconnecter »
- Title: « Dossiers »
- Headers: « Référence » · « Prénom » · « Fil » · « Autorisée » · « Suivi » · « Recence »
- Fil badges: « Fil A » · « Fil B » (JetBrains Mono)
- Projected Suivi labels (D20 only, if the fact allows): « Demande reçue » · « Recherche en cours » · « Précision nécessaire » · « Coiffeuse trouvée » · « Aucune coiffeuse confirmée » · « Demande abandonnée »
- Inactive extra badge: « Inactif » (in addition to Suivi « Demande abandonnée »)
- Empty: « Aucun dossier pour le moment. »
- Forbidden in row copy: labelling an algorithmic candidate « Coiffeuse trouvée ».

Default frame to generate: VARIANT `happy` with Inès + Léa as above (both Demande reçue). Loading/empty are variants, not extra frames.

Interactions — CLOSED SET:
- Open an active row → Fiche `/interne/dossiers/:id` (I03) of THAT dossier (Inès ≠ Léa)
- Open an inactive / abandoned row → I03 variant `inactif` (contact / issue / confirmation closed)
- Nav Dossiers → stay (I02)
- Se déconnecter → Connexion interne `/interne/connexion` (I01)
- Wait on loading → stay (I02 `loading`), no fake dossiers
- Consult empty → stay (I02 `empty`), no invented rows
- Label algorithmic candidate Coiffeuse trouvée: FORBIDDEN — no control
- Contact all hairstylists / « élargir »: FORBIDDEN — no control
- KPI, matching cycles, waves, map, RDV calendar: FORBIDDEN — no control
- Merge with `/admin`: FORBIDDEN — no control
- Client chrome / Matching / Vagues / Messages / Rendez-vous nav: FORBIDDEN — no control

Forbidden: giant photos, messenger, RDV tab, client chrome, catalogue fusion, fake dossiers, Coiffeuse trouvée from matching.

Visual / imagery: NO photography. Text identifiers only (reference, first name, offer). If any human depiction (do not), Black and/or mixed-race woman with textured Afro hair. Prefer none.

Design system Nolaya: Manrope UI, JetBrains Mono for references, fil badges, Suivi, recency. Charcoal/gold sparingly, light surfaces #fbf9f8 / #ffffff / #efeded. Soft 0.25rem. Tonal row hover, no heavy shadows, no purple, no neon, no emoji, no dark mode.

Quality bar: Scannable operations table, clear isolation of dossiers, one nav item. French operational / vous or neutral. Desktop density.
```

========== END SCREEN 02 ==========

========== SCREEN 03 / I03 — Fiche dossier `/interne/dossiers/:id` ==========

```text
Independent screen. Generate ONLY this one screen. Do not generate other screens from this document.

Product context: Nolaya INTERNAL concierge (lancement). ONE dossier sheet for both paths: Fil A (QUALIFIED need + this candidate) and Fil B (chosen offer only — never invent a QUALIFIED need). Contact happens OFF-APP (phone / WhatsApp / mail). Nolaya does not send the message. There is NO messenger screen. Confirming the match is a gesture ON THIS SHEET — not a 6th screen, not READY, not an RDV. « Coiffeuse trouvée » requires a human yes (issue accepte) AND reconfirmation of lieu + budget + période.

Device: Desktop-first ~1440×900 (usable at ~1280). Main column (synthesis + facts) + right rail or lower block for journal / issues. Operational density. NO hero photo. One screen only.

Screen type: OPERATIONAL dossier sheet. Variants COMPOSE: a dossier is `fil_a` OR `fil_b`, AND `actif` OR `inactif`.

Screen purpose (storyboard A2, A3, A6 · US-ADM-02 to US-ADM-07): Alex reads the synthesis useful to call, sees who is authorised to reach off-app, sees declared client channel (unverified by OTP) in a SEPARATE block, logs nothing here (that is I04), records no issue here (that is I05), and may confirm the match only when gated. Joining Aïcha = read the authorised-recipient block + call off-app — NOT an in-app exit.

Layout (default frame = `fil_a` + `actif`, first open / moment A2):
1) Internal chrome sidebar: « Nolaya interne » · « Conciergerie de lancement » · nav « Dossiers » (not the active page — this is the fiche) · session + « Se déconnecter ».
2) Identity header: title « Dossier » + reference NOL-1842 (JetBrains Mono) · badge « Fil A » · projected Suivi « Demande reçue » · last internal author « — » or « Alex ».
3) NO inactive banner on the default frame.
4) Section « Synthèse pour la coiffeuse »: versioned need (knotless braids mi-dos, Paris, mi-septembre, max 200 €, mèches à confirmer). Elements to confirm named as uncertainties. Note: « Sans coordonnées de la cliente ni adresse exacte. » NEVER put Inès’s phone or exact address here.
5) Fil A only — section « Raisons de matching »: 2–3 reasons with micro-copy « Incertitude » / « À confirmer » — NEVER « Confirmé » for an algorithmic reason. Example: « Longueur · À confirmer » · « Ville · correspond » · « Mèches · Incertitude ».
6) Section « Destinataires autorisés »: ONLY those from Faire vérifier — here Aïcha. Professional contact shown as TEXT for off-app call (phone / WhatsApp / mail). Note: « Joindre hors de Nolaya. Nolaya n’envoie pas le message. » NO button « Envoyer ».
7) Section « Canal déclaré » — SEPARATE from the coiffeuse synthesis: « Inès » + phone OR email, label « Non vérifié par OTP ». For recontacting the client, not for pasting into the coiffeuse synthesis.
8) Section « Reconfirmations »: three facts on THIS sheet (not a 6th screen): Lieu · Budget · Période, each « Manquant » or « Reconfirmé ». Default A2: all three « Manquant » (toggles / check facts on this fiche).
9) Section « Journal interne » (read-only): empty state « Aucun contact consigné. » Helper « Invisible pour la cliente ». Columns when rows exist: canal, horodatage, interlocutrice.
10) Section « Issues »: empty on default A2. When present: value, author, horodatage. Unique dossier.
11) Action bar (actif only), locked labels:
    - « Journaliser un contact »
    - « Enregistrer une issue »
    - « Confirmer le match » — visible but GATED / refused look when accepte or reconfirmations are missing. Helper: « Oui humain + lieu, budget et période. Ce n’est pas un rendez-vous. »
    - « Consigner l’épuisement »
    - « Marquer inactif / retiré »
    Inactive dossier: these five controls closed (absent or disabled, no destination).

French UI text (exact, operational / vous or neutral):
- Title: « Dossier NOL-1842 »
- Fil: « Fil A » · « Fil B »
- Synthesis: « Synthèse pour la coiffeuse »
- Synthesis note: « Sans coordonnées de la cliente ni adresse exacte. »
- Matching: « Raisons de matching » · « Incertitude » · « À confirmer »
- Fil B section title (variant): « Offre choisie » — NEVER « Demande QUALIFIED »
- Recipients: « Destinataires autorisés »
- Contact note: « Joindre hors de Nolaya. Nolaya n’envoie pas le message. »
- Client block: « Canal déclaré » · « Non vérifié par OTP »
- Facts: « Reconfirmations » · « Lieu » · « Budget » · « Période » · « Reconfirmé » · « Manquant »
- Journal: « Journal interne » · « Invisible pour la cliente »
- Issues: « Issues »
- CTAs (locked): « Journaliser un contact » · « Enregistrer une issue » · « Confirmer le match » · « Consigner l’épuisement » · « Marquer inactif / retiré »
- Confirmation helper: « Oui humain + lieu, budget et période. Ce n’est pas un rendez-vous. »
- After accepte only: « Issue accepte consignée. Reconfirmations manquantes — pas encore Coiffeuse trouvée. »
- Confirmation refused: « Confirmation refusée. Il manque le oui humain, le lieu, le budget ou la période. »
- After confirmation: projected Suivi « Coiffeuse trouvée » — NEVER « READY », NEVER « Rendez-vous », NEVER « Prix final »
- Inactive banner: « Dossier inactif. Plus de nouveau contact. » · Suivi « Demande abandonnée »
- Adaptation visible: « Adaptation consignée. Ne pas l’accepter au nom de la cliente. »

VARIANTS of THIS url (do not generate extra screens; describe in the same prompt):
- `fil_b`: replace need + matching reasons with « Offre choisie » (Aïcha · Knotless braids · Paris) and elements to confirm. NO invented QUALIFIED demand.
- `inactif`: banner at top; five action controls closed.
- `actif` + accepte recorded, reconfirmations missing: show the accepte-only message; Confirmer le match still refused.
- `actif` + accepte AND lieu + budget + période Reconfirmé: Confirmer le match enabled; after click, stay on I03, Suivi becomes Coiffeuse trouvée (effect — not a new screen).
- Adaptation recorded: show the adaptation warning; NO control « Accepter pour la cliente ».

Default frame: `fil_a` + `actif`, Demande reçue, empty journal, all reconfirmations Manquant, gated Confirmer le match.

Interactions — CLOSED SET:
- Journaliser un contact (actif, ≥ 1 authorised) → I04 `/interne/dossiers/:id/contact`
- Enregistrer une issue (actif) → I05 `/interne/dossiers/:id/issue`
- Read synthesis fil A / fil B → stay
- Identify who is reachable then call / WhatsApp / mail OFF APP → stay (I03). Nolaya sends nothing. NO WhatsApp screen. Suivi unchanged until logged.
- « Contacter dans l’app » / Envoyer: FORBIDDEN — no control
- Off-platform callback/WhatsApp for the SAME dossier → I04 variant `entrant` (not a second dossier)
- Confirmer le match when accepte AND lieu + budget + période reconfirmed → stay (I03); effect client Suivi Coiffeuse trouvée. Not READY, not RDV.
- Confirmer le match without human yes, or without lieu, or without budget, or without période → stay; refused message; Suivi ≠ Coiffeuse trouvée
- Consigner l’épuisement (human fact, authorised-contact policy exhausted, no confirmation) → stay; effect Suivi Aucune coiffeuse confirmée
- Marquer inactif / retiré → stay (I03 `inactif`); effect Suivi Demande abandonnée
- Journaliser / issue / confirm on `inactif` → stay; exits closed
- Join another ALREADY authorised recipient off-app → stay, then I04 to log. No silent add. Suivi Recherche en cours until confirm or exhaustion.
- Nav Dossiers → I02 `/interne/dossiers` (unsaved I04/I05 = unchanged)
- Se déconnecter → I01
- Accept an adaptation on behalf of the client: FORBIDDEN — no control
- Add / contact a non-authorised hairstylist: FORBIDDEN — no control
- Messenger / « envoyer le message »: FORBIDDEN — no URL `/interne/dossiers/:id/message`
- Accord, payment, RDV sheet, preparation, reviews: FORBIDDEN — Coiffeuse trouvée does not open them
- OTP / verify client channel: FORBIDDEN
- Simulate a contact or reply from this sheet: FORBIDDEN — facts = I04 / I05 only
- Invent QUALIFIED for Fil B: FORBIDDEN
- Dress matching reasons as professional confirmation: FORBIDDEN
- Open `/admin` as if it were this dossier: FORBIDDEN

Forbidden: giant photos, client chrome, RDV tab, chat composer, Envoyer, SMS/WhatsApp buttons that send, READY, prix final, mega-admin.

Visual / imagery: NO hero photo. Text identifiers. If a tiny optional still of the chosen style exists, it must be modest (not full-bleed) and depict a Black and/or mixed-race woman with textured Afro hair (e.g. knotless braids). Prefer none.

Design system Nolaya: Manrope + JetBrains Mono for reference, badges, timestamps. Charcoal primary buttons, ghost secondary. Gold sparingly. Light surfaces. Soft 0.25rem. Gated primary may look charcoal-disabled until allowed. Error #ba1a1a only for true refusal banners. No purple, no neon, no emoji, no dark mode.

Quality bar: One dossier, two content variants, facts over marketing. Synthesis never leaks client coords. French operational / vous or neutral. Desktop two-column / main+rail.
```

========== END SCREEN 03 ==========

========== SCREEN 04 / I04 — Journaliser un contact `/interne/dossiers/:id/contact` ==========

```text
Independent screen. Generate ONLY this one screen. Do not generate other screens from this document.

Product context: Nolaya INTERNAL concierge (lancement). This is a LOG form for a REAL off-app contact. It is NOT a WhatsApp screen, NOT a messenger, NOT a chat composer. Nolaya does not send SMS, WhatsApp, or email. Absence of a hairstylist Nolaya account does NOT block logging.

Device: Desktop-first ~1440×900 (usable at ~1280). Form in the main column with internal chrome. One screen only.

Screen type: OPERATIONAL consignation form.

Screen purpose (storyboard A4 · US-ADM-04, US-ADM-03, US-ADM-09): Alex records canal + timestamp + authorised interlocutor after a real call (sortant) or an off-platform callback (entrant, same dossier). A non-authorised recipient is refused on THIS url. A fictitious contact is refused on THIS url. Logging does not expose the journal to the client. On accepted save, client Suivi becomes Recherche en cours unless a stronger D20 issue already imposes otherwise.

Layout:
1) Internal chrome sidebar: « Nolaya interne » · « Conciergerie de lancement » · « Dossiers » · session + « Se déconnecter ».
2) Title « Journaliser un contact » + support line + dossier reminder « Dossier NOL-1842 · Inès ».
3) Field Interlocutrice: closed list = authorised recipients ONLY, one pre-selected (Aïcha). NO free-text « autre coiffeuse ».
4) Fields: Canal · Horodatage · Sens (Sortant / Entrant).
5) NO message body required. NO conversation editor. NO chat attachments. NO CTA Envoyer / SMS / WhatsApp / Relancer.
6) Actions: primary « Enregistrer » · secondary « Annuler ».
7) VARIANT banners on THIS screen: refuse_non_autorisee ; fictitious-contact refusal. Not new URLs.
8) Inactive dossier is NOT an I04 variant: invalid entry returns to I03 `inactif` — do not design I04-inactive.

French UI text (exact, operational / vous or neutral):
- Title: « Journaliser un contact »
- Support: « Consigner un contact réel hors application. Nolaya n’envoie pas de message. »
- Dossier: « Dossier NOL-1842 »
- Field: « Interlocutrice »
- Field: « Canal » (examples: « Téléphone » · « WhatsApp » · « E-mail » — as logged channel, not send actions)
- Field: « Horodatage »
- Sens: « Sortant » · « Entrant »
- Submit: « Enregistrer »
- Secondary: « Annuler »
- VARIANT refuse_non_autorisee: « Destinataire non autorisée. Le dossier est inchangé. »
- Fictitious contact: « Contact fictif refusé. Le Suivi n’avance pas comme si le contact avait existé. »
- No field « Message ». No CTA « Envoyer », « SMS », « WhatsApp », « Relancer ».

Default frame: VARIANT `sortant`, interlocutrice Aïcha pre-selected, canal empty or Téléphone, current timestamp, Sens Sortant selected.

VARIANTS of THIS url (not extra screens):
- `entrant`: Sens Entrant (callback / WhatsApp received off-platform, SAME dossier).
- `refuse_non_autorisee`: banner as above; dossier unchanged.
- Fictitious contact refused: message on I04, stay — not a 4th named variant URL.

Interactions — CLOSED SET:
- Enregistrer `sortant` with canal + timestamp + authorised interlocutor + REAL contact → I03; journal enriched; effect Suivi Recherche en cours if no stronger D20 issue
- Enregistrer `entrant` (off-platform callback, same dossier) → I03; journal; effect per already logged facts (often Recherche en cours)
- Annuler → I03, dossier unchanged
- Choose a non-authorised recipient (if attempted) → stay (I04 `refuse_non_autorisee`); dossier unchanged
- Enregistrer a fictitious contact (no real contact) → stay (I04); Suivi does not advance as if contact existed
- Open I04 from I03 `inactif` → not this screen (I03 inactif)
- Log despite missing hairstylist account → stay until Enregistrer / Annuler; do NOT block with « créer un compte »
- Nav Dossiers → I02 (unsaved = unchanged)
- Se déconnecter → I01
- Send SMS / WhatsApp / email FROM Nolaya: FORBIDDEN — no control (I04 logs; it does not open WhatsApp)
- Discussion thread, chat attachments, automatic reminder: FORBIDDEN — no control
- Create a second dossier for the callback: FORBIDDEN — no control
- Expose the journal to the client: FORBIDDEN — no control

Forbidden: messenger chrome, message composer, Envoyer, giant photos, client chrome, RDV, OTP, adding a non-authorised name as a free field.

Visual / imagery: NO photography. Form only. Prefer no people photos.

Design system Nolaya: Manrope + JetBrains Mono for reference and timestamp. Charcoal primary « Enregistrer », ghost « Annuler ». Error #ba1a1a for refusal banners. Light surfaces. Soft 0.25rem. No purple, no neon, no emoji, no dark mode.

Quality bar: Obviously a log, obviously not a chat. French operational / vous or neutral. Desktop form width, not a marketing hero.
```

========== END SCREEN 04 ==========

========== SCREEN 05 / I05 — Enregistrer une issue `/interne/dossiers/:id/issue` ==========

```text
Independent screen. Generate ONLY this one screen. Do not generate other screens from this document.

Product context: Nolaya INTERNAL concierge (lancement). ONE screen for the five D20 issue values. Match confirmation is NOT here — even on Accepte. Confirmation is a gesture on the fiche (I03) after lieu + budget + période are reconfirmed. A simulated issue (as if Aïcha replied when no real reply exists) is refused. The client never sees the internal motif — only the allowed Suivi label.

Device: Desktop-first ~1440×900 (usable at ~1280). Form in the main column with internal chrome. One screen only.

Screen type: OPERATIONAL issue form. The variant is the SELECTED value on the same form, not five URLs.

Screen purpose (storyboard A5, A8, A9, A10 · US-ADM-05, US-ADM-07, US-ADM-09): Alex records a real professional outcome: accepte, refuse, précision, adaptation, or aucune réponse. Précision attaches ONE targeted question (not a chat). Adaptation describes a proposed change WITHOUT accepting it on behalf of the client. Refuse vs aucune réponse are two distinct values; neither is a fault shown to the client. Exhaustion after refuse / aucune réponse is a fiche gesture on I03, not a 6th issue screen.

Layout:
1) Internal chrome sidebar: « Nolaya interne » · « Conciergerie de lancement » · « Dossiers » · session + « Se déconnecter ».
2) Title « Enregistrer une issue » + support line + dossier reminder « Dossier NOL-1842 · Inès ».
3) Unique choice — five D20 values only (radios or closed list). NO 6th value. NO « Confirmer le match » button.
4) Conditional zone `precision`: one field « Question ciblée ». Helper « Pas de messagerie. »
5) Conditional zone `adaptation`: one field « Changement proposé ». Helper « Ne pas l’accepter au nom de la cliente. » NO CTA « Accepter pour la cliente ».
6) Mention that auteur interne + horodatage are carried by the save (not entered as client identity). Quiet line e.g. « Auteur : Alex · horodatage à l’enregistrement ».
7) Actions: primary « Enregistrer » · secondary « Annuler ».
8) Simulation refusal banner ON THIS SCREEN if she tries to record an issue as if a reply existed: « Issue simulée refusée. Le Suivi est inchangé. »
9) Inactive dossier is NOT an I05 variant: I05 closed → I03 `inactif`. Do not design I05-inactive.

French UI text (exact, operational / vous or neutral):
- Title: « Enregistrer une issue »
- Support: « Une réponse réelle — ou une absence réelle après tentatives utiles. La confirmation de match n’est pas ici. »
- Values (locked): « Accepte » · « Refuse » · « Précision » · « Adaptation » · « Aucune réponse »
- Hint accepte: « N’affiche pas Coiffeuse trouvée. Confirmer le match se fait sur la fiche, après reconfirmation. »
- Hint refuse / aucune réponse: « Deux valeurs distinctes. Ce n’est pas une faute exposée à la cliente. »
- Field precision: « Question ciblée » · « Pas de messagerie. »
- Field adaptation: « Changement proposé » · « Ne pas l’accepter au nom de la cliente. »
- Submit: « Enregistrer »
- Secondary: « Annuler »
- Simulation refused: « Issue simulée refusée. Le Suivi est inchangé. »
- NO CTAs: « Confirmer le match » · « Accepter pour la cliente » · « Ouvrir le chat » · « Retenir la proposition » · « Créer un RDV »

Default frame: form with the five values visible, « Accepte » selected so the accepte hint is readable (confirmation still absent). Conditional extra fields hidden unless Précision or Adaptation is selected.

VARIANTS of THIS url (same form, not extra screens):
- `accepte`: no extra field. On save → I03; match NOT confirmed; Suivi ≠ Coiffeuse trouvée.
- `refuse`: no extra field. Distinct from aucune réponse. On save → I03; Suivi Recherche en cours until confirm / exhaustion / abandon.
- `precision`: show Question ciblée. On save → I03; effect Suivi Précision nécessaire. Not a chat.
- `adaptation`: show Changement proposé (date, prix, lieu, prestation, fourniture…). On save → I03; no accept on behalf of the client; no match confirmation.
- `aucune_reponse`: no extra field. Distinct from refuse. NEVER counts as acceptance. On save → I03; Suivi Recherche en cours until exhaustion.

Interactions — CLOSED SET:
- Enregistrer accepte (real reply) → I03; issue + author + timestamp; match NOT confirmed
- Enregistrer refuse (real reply) → I03
- Enregistrer aucune_reponse (real useful attempts) → I03; never an acceptance
- Enregistrer precision + one targeted question → I03; effect Suivi Précision nécessaire
- Enregistrer adaptation (real proposed change) → I03; no accept for the client
- Annuler → I03, unchanged
- Enregistrer as if she replied, with no real reply → stay (I05); Suivi unchanged
- Open I05 from I03 `inactif` → not this screen (I03 inactif)
- Nav Dossiers → I02 (unsaved = unchanged)
- Se déconnecter → I01
- Confirmer le match from I05 (even on accepte): FORBIDDEN — no control (confirmation = I03 only, after three reconfirmations)
- Accept adaptation on behalf of the client: FORBIDDEN — no control
- Messenger « to clarify »: FORBIDDEN — no control
- Retain a proposal / étape 8 / payment / RDV: FORBIDDEN — no control
- Treat aucune réponse as acceptance: FORBIDDEN
- Expose the internal motif to the client: FORBIDDEN

Reminders that belong on I03 after return (NOT controls on I05):
- Consigner l’épuisement after refuse or aucune_reponse with a single authorised recipient → I03 stay; effect Aucune coiffeuse confirmée. Not a 6th issue screen.
- Journaliser un contact toward another ALREADY authorised recipient after refuse → I04. No silent add.

Forbidden: Confirmer le match, chat, RDV, payment, giant photos, client chrome, 6th radio value, mega-admin.

Visual / imagery: NO photography. Form only.

Design system Nolaya: Manrope + JetBrains Mono for dossier reference. Charcoal primary, ghost Annuler. Selected radio may use a quiet gold container #fed488 for the chosen value only — sparse. Error #ba1a1a for simulation refusal. Light surfaces. Soft 0.25rem. No purple, no neon, no emoji, no dark mode.

Quality bar: Five values, no confirmation CTA, no chat. French operational / vous or neutral. Desktop form. Generate the Accepte-selected default frame only.
```

========== END SCREEN 05 ==========
