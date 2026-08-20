# Prompts Stitch — MVP cliente Nolaya

> Source de vérité navigation : [`user-flow.md`](./user-flow.md) · [`transitions.md`](./transitions.md)
> Contenu / zones / copy par état : [`screen-specs.md`](./screen-specs.md) — **source primaire** pour layout
> Histoire : [`storyboard.md`](./storyboard.md) · métier : [D10–D18](../user-stories/decisions-produit.md)
> Rôles des artefacts : [`protocole-conception-mvp.md`](./protocole-conception-mvp.md) — Stitch dessine **l’apparence**, **n’invente ni écran ni CTA de navigation**
> Device : Mobile (≈390×844)
> Prompt language : English
> UI text language : French (tutoiement)
> Design system : Nolaya
> Visual identity : Afro / textured hair — Black & mixed-race women
> Scope : **13 écrans** cliente, sans compte, chrome **Découvrir / Ma demande / Suivi** (pas d’onglet Rendez-vous)
> Hors scope : admin / conciergerie, géoloc, OTP, comparaison 2–5, paiement, RDV, copie d’anciens dossiers Stitch / ui-design, écran Inspiration, écran Aperçu séparé

**Prompts régénérés** depuis user-flow + transitions + screen-specs (inventaire à 13 écrans, fiche unique `/offre/:id`).

---

## Comment utiliser ce fichier

1. **Coller un seul bloc ` ```text ` à la fois** dans Google Stitch. Un prompt = un écran (URL produit).
2. Générer **dans l’ordre S01 → S13** (un à la fois). Les variantes d’état sont décrites **dans** le prompt : ne pas en faire de 14ᵉ écran ni d’URL nouvelle.
3. **Ne pas fusionner** les écrans. **Ne pas** demander un diagramme de parcours.
4. Si Stitch propose un bouton, un onglet ou une destination absents du contrat ci-dessous : **refuser**. Flow + transitions + screen-specs priment sur l’intuition du modèle.
5. Les états (chargement, vide, erreur, déjà fait, six statuts de suivi) sont des **variantes du même écran**, pas des écrans inventés ([protocole](./protocole-conception-mvp.md)).

**Ordre de génération recommandé :** Accueil → Découverte → Fiche prestation → wizard 1–5 → Résultats → Aucun résultat → Tes coordonnées → Demande envoyée → Suivi.

**Pas des écrans** (le mentionner à Stitch uniquement dans l’en-tête, jamais comme S14) :

| Adresse | Comportement |
|---------|--------------|
| `/demande` (sans suffixe) | Redirige vers l’étape de qualification **en cours**, sinon **Résultat souhaité** |
| `/inspirations/:id` | Offre active → **Fiche prestation** `/offre/:id` **de la même offre** ; lien mort / offre retirée → message + **Accueil** ou **Découverte** |

---

## En-tête batch (à coller tel quel dans Stitch)

Ce fichier contient **13 écrans indépendants**.  
Chaque bloc `SCREEN XX` est un prompt autonome.  
Générer **un seul écran par prompt**.  
**Ne pas fusionner** les écrans.  
**Ne pas** produire un diagramme de parcours ni un flow.  
**Ne pas inventer** de navigation : uniquement les CTA et destinations listés.

---

## Global Stitch instruction (English)

```text
BATCH OF INDEPENDENT SCREENS.

This document contains exactly 13 independent mobile screen prompts for Google Stitch — Nolaya CLIENT MVP.
For each SCREEN PROMPT block below:
- Generate EXACTLY ONE mobile app screen (the default/happy-path visual unless a VARIANT is explicitly requested).
- Do NOT combine multiple screens into one frame.
- Do NOT create a flow diagram, journey map, storyboard collage, or multi-screen mock.
- Do NOT invent sibling screens, extra tabs, or destinations.
- Treat every SCREEN PROMPT as a fully self-contained brief.
- Navigation is a CLOSED SET: only the listed entries, exits, and CTAs. If a control has no destination here, it does not exist.
- States (loading, empty, error, already-done, catalog vs from_match, six Suivi statuses) are VARIANTS of the same screen/URL — never new screens.
- Bottom chrome is exactly three zones: Découvrir · Ma demande · Suivi. NEVER a fourth « Rendez-vous » tab. NEVER a login/account tab.
- Do NOT generate screens for redirects `/demande` or `/inspirations/:id`.

Process: generate Screen 01, then Screen 02, … through Screen 13 — one at a time, independently.
All visible UI text must be in French, tutoiement (tu / ta / tes).
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
| Font données / badges / montants / statuts | **JetBrains Mono** |
| Radius controls | `0.25rem` |
| Médias portfolio / photos d’offre | coins **sharp (0px)** |
| Viewport | phone portrait **~390×844** |

### Chrome (trois zones — pas des écrans) — D18

| Zone | Écrans où la zone est active | Si tu n’as pas le droit |
| ---- | ---------------------------- | ----------------------- |
| **Découvrir** (toujours ouvert) | Accueil, Découverte, Fiche (arrivée catalogue) | — |
| **Ma demande** | Wizard `/demande/*`, Résumé, Résultats, Aucun résultat, Fiche (arrivée matching), Tes coordonnées, Demande envoyée | Pas de brouillon ni de recherche : zone visible, **inactive** — ne pas inventer de destination |
| **Suivi** | Suivi `/suivi/:jeton` | Pas de jeton : zone visible, **inactive** — ne pas ouvrir un dossier au hasard |

Taper une zone n’ouvre **que** les destinations déjà listées dans le prompt de **cet** écran. Jamais un 4ᵉ onglet. Jamais « Rendez-vous ».

### Anti-patterns (tous les écrans)

- Pas de violet / indigo, glow néon, dark mode, pills excessives, card spam, ombres multi-couches, emojis décoratifs
- **Pas de photo héroïque géante** qui gaspille le pli (D13) — nulle part
- **Pas de carrousels d’annonces** hors **Découverte**
- **Pas de masonry / hauteurs variables** hors **Résultats**
- Pas de géoloc, « autour de moi », OTP, login, paiement, comparaison 2–5
- **Vérité d’engagement** (E2E-INV-03) : on ne dit jamais réservation, créneau bloqué, prix final, rendez-vous confirmé
- **Faire vérifier** = la conciergerie vérifie le **match**, pas le téléphone / e-mail de la cliente (D12)
- Candidate ou offre choisie **≠** coiffeuse confirmée. « Coiffeuse trouvée » = réponse humaine + reconfirmation lieu / budget / période

---

## Cartographie des écrans (13 — pas 14)

| ID | Écran | URL | Fil | Variantes (même URL) |
| -- | ----- | --- | --- | -------------------- |
| S01 | Accueil | `/` | A + B | `loading` · `happy` · `error` (message lien mort) |
| S02 | Découverte | `/decouverte` | B | `loading` · `empty` · `happy` |
| S03 | Fiche prestation | `/offre/:id` | B `catalog` · A `from_match` | `loading` · `catalog` · `from_match` · `error` (offre morte) |
| S04 | Résultat souhaité | `/demande/resultat` | A | `empty` · `happy` · `invalid` |
| S05 | Contraintes importantes | `/demande/contraintes` | A | `empty` · `happy` · `invalid` |
| S06 | Où et quand | `/demande/ou-et-quand` | A | `empty` · `happy` · `invalid` |
| S07 | Budget et fournitures | `/demande/budget` | A | `empty` · `happy` · `invalid` |
| S08 | Résumé | `/demande/resume` | A | `incomplete` · `happy` (QUALIFIED) |
| S09 | Résultats | `/recherche` | A | `matching` · `happy` (1–3) |
| S10 | Aucun résultat | `/recherche/diagnostic` | A | `happy` · `no_lever` |
| S11 | Tes coordonnées | `/soumission` | A + B | `form` · `warning_unacked` · `invalid` · `readonly` (déjà envoyé) |
| S12 | Demande envoyée | `/soumission/confirmation` | A + B | `happy` |
| S13 | Suivi | `/suivi/:jeton` | A + B | `received` · `searching` · `need_precision` · `found` · `none_confirmed` · `abandoned` |

---

========== SCREEN 01 / S01 — Accueil `/` ==========

```text
Independent screen. Generate ONLY this one screen. Do not generate other screens from this document.

Product context: Nolaya — premium B2B2C mobile platform for Afro / textured hair (braids, twists/vanilles, ponytails, locs, natural coils). CLIENT MVP, no account. This is the entry: a promise and two doors. Catalogue of REAL offers exists later on Découverte — NOT here.

Device: Mobile app screen only, portrait ~390×844. Scrollable if needed. No desktop. One screen only.

Screen type: OPERATIONAL entry (not a form, not a listing, not an explicative pillar screen).

Screen purpose (storyboard 1.1 · US-01.1 · D11, D13, D17, D18): A visitor (no account) lands. She understands Nolaya helps her find a fitting hairstylist. She chooses Explorer (path B — browse real offers) OR Trouver ma coiffeuse (path A — describe her need). Nothing is an offer retained, a demand, or a dossier yet.

Layout (D13 — Accueil is promise + two CTAs ONLY):
1) Top: wordmark « Nolaya » — typographic, small. NO giant hero photo. NO full-bleed lifestyle image eating the fold. A thin brand mark is enough.
2) Bottom chrome: Découvrir (active) · Ma demande (inactive) · Suivi (inactive). Exactly three zones. NEVER a Rendez-vous tab.
3) Headline + one short supporting sentence (promise: find a fitting coiffeuse — not a booking engine).
4) Two stacked full-width CTAs, equal visual weight as two doors — not a listing.
5) Optional one-line quiet note: sans compte, sans réservation.
6) NO horizontal carousels, NO teaser cards, NO grid of offers, NO city field, NO « autour de moi ».

French UI text (exact intent, tutoiement):
- Wordmark: « Nolaya »
- Headline: « Trouve une coiffeuse qui te correspond »
- Body: « Nolaya t’aide à tomber juste — à partir d’une offre réelle, ou en décrivant ce que tu veux. »
- Primary CTA 1: « Explorer »
- Primary CTA 2: « Trouver ma coiffeuse »
- Quiet note: « Sans compte. Ce n’est pas une réservation. »
- Chrome: « Découvrir » · « Ma demande » · « Suivi »
- VARIANT error (dead public link / inactive offer redirected here): a short banner « Cette offre n’est plus disponible. » + the same two CTAs. Not a different screen.

Interactions — CLOSED SET:
- « Explorer » → Découverte `/decouverte` (load real-offer catalogue)
- « Trouver ma coiffeuse » → Résultat souhaité `/demande/resultat` (empty draft, path A)
- Chrome Découvrir: here (stay)
- Chrome Ma demande: inactive (no draft) — no navigation
- Chrome Suivi: inactive (no token) — no navigation
- Opening a teaser card / carousel: FORBIDDEN (D13)

Variants of THIS url `/` (do not generate extra screens): loading (skeleton wordmark + two CTA placeholders); happy; error banner as above.

Forbidden on this screen: listing carousels, giant hero photo, city/geoloc, login, OTP, prices, coiffeuse cards, « Réserver », « Rendez-vous » tab, fourth chrome item, map.

Visual / imagery: Prefer NO photography. If a tiny brand texture is used, it must not dominate. Any human depiction = Black and/or mixed-race woman with coily, curly, or textured hair. Premium, realistic, respectful. No straight Eurocentric hair as default.

Design system Nolaya: Manrope UI, JetBrains Mono only if a micro-label is needed. Charcoal #000000 / #1b1c1c, soft gold #775a19 / #fed488 sparingly, surfaces #fbf9f8 / #ffffff / #efeded. Soft 0.25rem radii. Tonal layers, no heavy shadows, no purple, no neon, no emoji, no dark mode.

Quality bar: Calm editorial mobile entry, generous whitespace, two obvious doors, accessible 44px targets. All visible UI text in French, tutoiement.
```

========== END SCREEN 01 ==========

========== SCREEN 02 / S02 — Découverte `/decouverte` ==========

```text
Independent screen. Generate ONLY this one screen. Do not generate other screens from this document.

Product context: Nolaya CLIENT MVP. Découverte is the Airbnb-like catalogue of REAL offers (D10, D13): identifiable coiffeuse, city, price with certainty, DECLARED availability — never a blocked slot or confirmed RDV.

Device: Mobile portrait ~390×844. Vertical scroll of several horizontal carousels. One screen only.

Screen type: OPERATIONAL catalogue.

Screen purpose (storyboard 1.2 / 1.2-vide · US-01.2 · D10, D13, D17): Léa browses real prestations in horizontal series. Tapping a card opens that offer’s fiche. Browsing does NOT create QUALIFIED demand and contacts nobody. Empty catalogue is a variant of THIS screen.

Layout (Airbnb-like HERE ONLY — not Accueil, not Résultats):
1) Header: back · title « Découverte »
2) Bottom chrome: Découvrir (active) · Ma demande (inactive unless a draft exists — do not invent a destination) · Suivi (inactive)
3) Page = SEVERAL horizontal carousels stacked (e.g. « Tresses & braids », « Vanilles », « Longueurs », « À Paris »). Each row scrolls sideways.
4) Each card: **1:1 square photo** (sharp 0px radius), LITTLE text below: coiffeuse first name, city, price + certainty, declared availability. No paragraphs. No giant photo.
5) After the series: secondary text link « Décrire mon besoin » (same destination as Trouver ma coiffeuse).
6) NOT masonry. NOT a Pinterest grid. NOT one huge hero. NOT the matching-results layout.

French UI text:
- Header: « Découverte »
- Back: « Retour »
- Example section titles: « Tresses & braids » · « Vanilles & twists » · « Protective styles »
- Card lines (example): « Aïcha » / « Paris » / « 180 € · déclaré » / « Mi-septembre · déclaré »
- Micro-certainty: « déclaré » or « à confirmer » — never « confirmé » for slot or price-final
- Secondary: « Décrire mon besoin »
- Chrome: « Découvrir » · « Ma demande » · « Suivi »
- VARIANT empty: no fake cards. Title still « Découverte ». Message: « Aucune offre publiable pour le moment. » CTA: « Trouver ma coiffeuse » (or « Décrire mon besoin ») — same destination.
- VARIANT loading: carousel skeletons of 1:1 squares, no invented names.

Interactions — CLOSED SET:
- Back / Retour → Accueil `/`
- Open a card → Fiche prestation `/offre/:id` of THAT offer (no matching launched)
- « Décrire mon besoin » / empty-state « Trouver ma coiffeuse » → Résultat souhaité `/demande/resultat`
- Horizontal scroll inside a series → stay
- Reaching the end of series is NOT a new screen; the « Décrire mon besoin » link remains the exit
- Chrome Découvrir: stay

Forbidden: geoloc, « autour de moi », city autocomplete as a gate, editorial “inspirations that must not look available”, fake offers, masonry, giant photos, « Réserver », « Disponible demain 14h » as a blocked slot, contacting the coiffeuse, QUALIFIED badge, matching list, Rendez-vous tab.

Visual: Every photo = Black and/or mixed-race women with coily/curly/textured Afro hair (braids, twists/vanilles, ponytails, locs, natural coils). Premium realistic. Square 1:1 crops. No straight Eurocentric hair as default.

Design system Nolaya: Manrope + JetBrains Mono for price/certainty. Charcoal/gold, light surfaces, sharp media, soft controls. No purple, no glow, no emoji, no dark mode.

Quality bar: Airy catalogue, finger-sized cards, more image than text, scannable rows. French tutoiement only.
```

========== END SCREEN 02 ==========

========== SCREEN 03 / S03 — Fiche prestation `/offre/:id` ==========

```text
Independent screen. Generate ONLY this one screen. Do not generate other screens from this document.

Product context: Nolaya CLIENT MVP. ONE object: the real-offer sheet. Merges the old « Inspiration » and « Aperçu de l’offre » into a single destination `/offre/:id` (D14). Historical `/inspirations/:id` is a REDIRECT — do not design it.

Device: Mobile portrait ~390×844. One screen only.

Screen type: OPERATIONAL offer sheet. Two VARIANTS of the SAME url: `catalog` (path B) and `from_match` (path A).

Screen purpose:
- Path B (storyboard 1.3, 1.4, 1.5 · D11, D12, D14, D16): Léa opened this offer from Découverte. She reads it. Disclaimer 1.4 sits ON THIS SCREEN (not its own screen): describing her need increases her chances of a good fit — NON-BLOCKING. She may Faire vérifier THIS coiffeuse without QUALIFIED, carrying only this offer to Tes coordonnées. Nobody is contacted.
- Path A (storyboard 3.2): Inès opened a matching candidate. Same object, no 1.4 disclaimer (already QUALIFIED). Faire vérifier still = concierge checks the MATCH, not her phone.

Layout (no giant wasteful photos — D13):
1) Header: back · short title of the prestation (e.g. « Knotless braids »)
2) ONE modest media: 1:1 or 4:3, not a full-bleed hero that pushes content below the fold. Optional 2–3 thumbnails, not a gallery theatre.
3) Identity block: coiffeuse first name, city, price + certainty (déclaré / à confirmer), declared availability. Distinguish certain vs indicative vs à confirmer (E2E-INV-04).
4) Short description of the prestation (result, not a novel).
5) VARIANT catalog ONLY — disclaimer 1.4, always visible on this variant, NOT a checkbox, NOT a modal that blocks:
   « Décrire ton besoin augmente tes chances de tomber juste. Tu peux aussi poursuivre avec cette offre. »
   Two issues from here (both allowed, no ack required): Poursuivre / Faire vérifier  AND  Décrire mon besoin.
6) VARIANT from_match ONLY — compact strip: « Selon ta demande » with 2–3 match reasons / gaps. No disclaimer 1.4.
7) Sticky primary: « Faire vérifier »
8) Chrome: Découvrir active on catalog; Ma demande active on from_match. Suivi inactive. No RDV tab.

French UI text:
- Back: « Retour »
- Example title: « Knotless braids mi-dos »
- Coiffeuse: « Aïcha · Paris »
- Price: « 180 € · déclaré » (never « prix final »)
- Availability: « Mi-septembre · disponibilité déclarée » (never « créneau bloqué » / « RDV confirmé »)
- Disclaimer 1.4 (catalog only): « Décrire ton besoin augmente tes chances de tomber juste. Tu peux aussi poursuivre avec cette offre. »
- Secondary: « Décrire mon besoin » (catalog only)
- Primary: « Faire vérifier »
- Optional same-action label on catalog: the primary MAY read « Faire vérifier cette offre » — still ONE primary, destination Tes coordonnées
- Helper under primary: « Nolaya vérifie le match — pas un rendez-vous confirmé. »
- VARIANT error (inactive / unknown offer): no Faire vérifier. Message: « Cette offre n’est plus disponible. » Links: « Accueil » or « Découverte » only.
- VARIANT loading: media skeleton + lines, no fake CTA destinations.

Interactions — CLOSED SET:
- catalog · Retour → Découverte `/decouverte`
- from_match · Retour → Résultats `/recherche`
- catalog · Faire vérifier / Poursuivre avec cette offre → Tes coordonnées `/soumission` with THIS offer only, NO QUALIFIED, nobody contacted
- from_match · Faire vérifier → Tes coordonnées `/soumission` (qualified demand + this candidate)
- catalog · Décrire mon besoin → Résultat souhaité `/demande/resultat`
- Reading disclaimer 1.4 → stay (non-blocking, no checkbox)
- error · Accueil → `/` ; error · Découverte → `/decouverte`
- Dead token / random dossier: not this screen

Forbidden: OTP, phone of the coiffeuse, exact private address, « Réserver », « Confirmer le RDV », blocking modal for 1.4, forcing the wizard before Faire vérifier on path B, giant hero, comparison, Rendez-vous tab, separate Inspiration screen, « booker » as a confirmed booking.

Visual: Photos of THIS offer = Black and/or mixed-race woman with textured Afro hair, the style of the prestation (knotless braids for the example). Premium, realistic. Sharp media corners.

Design system Nolaya: Manrope + JetBrains Mono for price/status. Charcoal/gold, light surfaces. Sticky charcoal primary button, white label. Ghost secondary for Décrire mon besoin.

Quality bar: One object, dense but calm, primary CTA obvious, disclaimer readable without blocking. French tutoiement.
```

========== END SCREEN 03 ==========

========== SCREEN 04 / S04 — Résultat souhaité `/demande/resultat` ==========

```text
Independent screen. Generate ONLY this one screen. Do not generate other screens from this document.

Product context: Nolaya CLIENT MVP path A (guided). First of five qualification screens. No account. Draft only — not matching, not submission.

Device: Mobile portrait ~390×844. One screen only.

Screen type: OPERATIONAL form (wizard step 1/5).

Screen purpose (storyboard 2.1 · US-02.1, US-02.2): Inès describes the result she wants (family / variant / length / size / colour / finish) without needing technical vocabulary. « Je ne sais pas » keeps an explicit unknown. Completing this step does not contact anyone.

Layout:
1) Header: back · « Résultat souhaité » · step « 1 / 5 »
2) Chrome: Découvrir (allowed back to Accueil/Découverte only via listed exits) · Ma demande (active) · Suivi (inactive)
3) Short helper: tu n’as pas besoin des termes techniques.
4) Fields (only those useful to a family — example knotless braids): famille or prestation, variante, longueur, taille, couleur, finition. Each may offer « Je ne sais pas » / « À confirmer ».
5) Optional compact visual chips of result types (braids, vanilles, ponytail, locs) — not a catalogue carousel of offers, not 1:1 listing cards.
6) Sticky primary « Continuer »

French UI text:
- Header: « Résultat souhaité »
- Step: « 1 / 5 »
- Helper: « Dis-nous le résultat que tu vises. “Je ne sais pas” est une réponse valable. »
- Labels: « Famille » · « Longueur » · « Taille » · « Couleur » · « Finition »
- Options examples: « Tresses / braids » · « Vanilles » · « Je ne sais pas »
- Primary: « Continuer »
- Back: « Retour »
- VARIANT invalid: inline error « Choisis au moins une direction exploitable. » Stay on this screen.
- VARIANT empty (from Accueil Trouver ma coiffeuse): fields blank, no error.

Interactions — CLOSED SET:
- Continuer with an exploitable family/result → Contraintes importantes `/demande/contraintes` (DRAFT saved)
- Continuer without exploitable direction → stay (invalid)
- Je ne sais pas on a characteristic → stay, then Continuer allowed with explicit unknown
- Retour (arrival from Accueil or Découverte) → Accueil `/` or Découverte `/decouverte` (draft kept). NOT an Inspiration screen.
- Chrome Ma demande: stay

Forbidden: launching matching, coords, OTP, geoloc, offer carousels, Faire vérifier, Rendez-vous tab, skip to Résultats.

Visual: If chips use photos, small 1:1 of textured Afro hair styles, not giant. Black/mixed-race women. Respectful.

Design system Nolaya. Charcoal primary CTA. JetBrains Mono for « 1 / 5 ». Light surfaces. No purple, no emoji.

Quality bar: One job — capture the desired result. French tutoiement.
```

========== END SCREEN 04 ==========

========== SCREEN 05 / S05 — Contraintes importantes `/demande/contraintes` ==========

```text
Independent screen. Generate ONLY this one screen. Do not generate other screens from this document.

Product context: Nolaya CLIENT MVP path A. Wizard step 2/5. Constraints of hair, comfort, priority — not medical diagnosis.

Device: Mobile portrait ~390×844. One screen only.

Screen type: OPERATIONAL form.

Screen purpose (storyboard 2.2 · US-02.5): Inès marks what is obligatoire / préféré / flexible and one main priority. Obligatory constraints will exclude incompatible offers later. No coiffeuse is contacted.

Layout:
1) Header: back · « Contraintes importantes » · « 2 / 5 »
2) Chrome: Ma demande active. Suivi inactive.
3) Sections: confort / cheveux (declared facts useful to feasibility — sensibilité, refus de tension — no medical conclusion) ; priorité principale (ONE).
4) Each constraint can be tagged obligatoire / préféré / flexible.
5) Sticky « Continuer »

French UI text:
- Header: « Contraintes importantes »
- Step: « 2 / 5 »
- Helper: « Ce qui est obligatoire sera exclu du matching. Une seule priorité principale. »
- Examples: « Refus de tension trop forte » · « Sensibilité du cuir chevelu » · « Je ne sais pas »
- Priority: « Qualité » · « Prix » · « Disponibilité » · « Proximité » · « Confort » · « Durée » — choose one
- Tags: « Obligatoire » · « Préféré » · « Flexible »
- Primary: « Continuer »
- Back: « Retour »
- VARIANT invalid: stay with inline error if the form is in an impossible state (do not invent extra rules). 0 constraints is OK (empty allowed).

Interactions — CLOSED SET:
- Continuer → Où et quand `/demande/ou-et-quand`
- Retour → Résultat souhaité `/demande/resultat` (draft kept)

Forbidden: matching, coords, geoloc, medical diagnostic copy, Rendez-vous tab, skip.

Visual: No giant photos. Optional tiny icons, not emoji decoration. If any person, Black/mixed-race woman with textured hair.

Design system Nolaya. Manrope + JetBrains Mono for tags. Charcoal/gold sparingly.

Quality bar: Clear obligatory vs flexible. French tutoiement.
```

========== END SCREEN 05 ==========

========== SCREEN 06 / S06 — Où et quand `/demande/ou-et-quand` ==========

```text
Independent screen. Generate ONLY this one screen. Do not generate other screens from this document.

Product context: Nolaya CLIENT MVP path A. Wizard step 3/5. City is TYPED, never geoloc (D17). Desired date and deadline stay distinct.

Device: Mobile portrait ~390×844. One screen only.

Screen type: OPERATIONAL form.

Screen purpose (storyboard 2.3 · US-02.3, US-02.5 · D17): Inès sets city, place modality, desired date, deadline, and explicit flexibility. « Autour de moi » does NOT exist. A deadline before the desired date blocks Continuer (stay).

Layout:
1) Header: back · « Où et quand » · « 3 / 5 »
2) Chrome: Ma demande active
3) Fields: ville (text / pick from cities — NO browser geolocation, NO « autour de moi »), modalité de lieu (salon / domicile / à confirmer — city or approximate only, never exact private address), date souhaitée, date limite, flexibilité (créneaux alternatifs only if she explicitly allows them)
4) Sticky « Continuer »

French UI text:
- Header: « Où et quand »
- Step: « 3 / 5 »
- Labels: « Ville » · « Lieu souhaité » · « Date souhaitée » · « Date limite » · « Flexibilité »
- Place examples: « Chez la coiffeuse » · « À domicile (ville seulement) » · « À confirmer »
- Placeholder ville: « Paris »
- Example dates: « Mi-septembre » as a period is OK if the UI uses a date; keep souhaitée ≠ limite
- Primary: « Continuer »
- Back: « Retour »
- VARIANT invalid: « La date limite ne peut pas être avant la date souhaitée. » Stay. No skip.

Interactions — CLOSED SET:
- Continuer with city + coherent dates → Budget et fournitures `/demande/budget`
- Retour → Contraintes importantes `/demande/contraintes`
- Autour de moi / navigator permission: FORBIDDEN (hors MVP)

Forbidden: map, GPS prompt, exact address, matching, coords, Rendez-vous tab.

Visual: No map screenshot, no giant photo. Design system Nolaya.

Quality bar: Dates visually distinct. French tutoiement.
```

========== END SCREEN 06 ==========

========== SCREEN 07 / S07 — Budget et fournitures `/demande/budget` ==========

```text
Independent screen. Generate ONLY this one screen. Do not generate other screens from this document.

Product context: Nolaya CLIENT MVP path A. Wizard step 4/5. Target vs maximum stay distinct. « Fournir » ≠ free.

Device: Mobile portrait ~390×844. One screen only.

Screen type: OPERATIONAL form.

Screen purpose (storyboard 2.4 · US-02.4): Inès sets budget cible, budget maximum, and who brings mèches/extensions/accessories. Unknown cost displays « à confirmer », never an invented amount.

Layout:
1) Header: back · « Budget et fournitures » · « 4 / 5 »
2) Chrome: Ma demande active
3) Fields: cible, maximum (JetBrains Mono for amounts), fournitures list with three choices per item: « Je l’apporte » · « La coiffeuse le fournit » · « À confirmer »
4) Note: fournir does not mean gratuit ; inclusion = inclus / séparé / à confirmer
5) Sticky « Continuer »

French UI text:
- Header: « Budget et fournitures »
- Step: « 4 / 5 »
- Labels: « Budget cible » · « Maximum à ne pas dépasser » · « Fournitures »
- Item example: « Mèches / extensions »
- Choices: « Je l’apporte » · « La coiffeuse le fournit » · « À confirmer »
- Helper: « “Fournir” ne veut pas dire gratuit. »
- Primary: « Continuer »
- Back: « Retour »
- VARIANT invalid: « Le cible ne peut pas dépasser le maximum. » Stay.

Interactions — CLOSED SET:
- Continuer with coherent ceiling → Résumé `/demande/resume`
- Retour → Où et quand `/demande/ou-et-quand`

Forbidden: payment, deposit, matching, coords, invented prices, Rendez-vous tab.

Visual: No giant photos. Nolaya design system. JetBrains Mono for € amounts.

Quality bar: Two budget numbers clearly different. French tutoiement.
```

========== END SCREEN 07 ==========

========== SCREEN 08 / S08 — Résumé `/demande/resume` ==========

```text
Independent screen. Generate ONLY this one screen. Do not generate other screens from this document.

Product context: Nolaya CLIENT MVP path A. Wizard step 5/5. Only a QUALIFIED résumé launches matching (Résumé fait foi). Nobody is contacted.

Device: Mobile portrait ~390×844. One screen only.

Screen type: OPERATIONAL recap — not results, not masonry.

Screen purpose (storyboard 2.5 · US-02.6): Inès rereads result, constraints, where/when, budget/supplies, unknowns. Modifier jumps to that block. Rechercher is enabled only when complete and coherent → QUALIFIED then Résultats.

Layout:
1) Header: back · « Résumé » · « 5 / 5 »
2) Chrome: Ma demande active
3) Stacked recap blocks, each with « Modifier »: Résultat · Contraintes · Où et quand · Budget et fournitures · Inconnues
4) Status chip JetBrains Mono: « BROUILLON » or « PRÊT » (never « MATCHED », never « RÉSERVÉ »)
5) Sticky primary « Rechercher » (disabled look when INCOMPLETE)
6) Quiet line: « Aucune coiffeuse n’est contactée à cette étape. »

French UI text:
- Header: « Résumé »
- Step: « 5 / 5 »
- Block titles: « Résultat souhaité » · « Contraintes » · « Où et quand » · « Budget et fournitures »
- Modifier: « Modifier »
- Example recap: « Knotless braids mi-dos · Paris · mi-septembre · max 200 € · mèches à confirmer »
- Primary: « Rechercher »
- Disabled helper: « Complète les champs indispensables pour lancer la recherche. »
- Back: « Retour »
- VARIANT incomplete: Rechercher does not leave; highlight the missing block
- VARIANT happy QUALIFIED-ready: Rechercher enabled

Interactions — CLOSED SET:
- Modifier on a block → that wizard screen (S04–S07); other answers kept
- Rechercher complete and coherent → Résultats `/recherche` (dated QUALIFIED version; matching starts; nobody contacted)
- Rechercher incomplete → stay (or the faulty block) — NOT Résultats
- Retour → Budget et fournitures `/demande/budget`

Forbidden: showing 1–3 candidates here, masonry, Faire vérifier, coords, OTP, « Réservation », Rendez-vous tab.

Visual: No giant photos. Typographic recap. Optional tiny 1:1 of the desired style, not a listing.

Design system Nolaya. Status in JetBrains Mono uppercase. Charcoal primary.

Quality bar: She must see exactly what will be matched. French tutoiement.
```

========== END SCREEN 08 ==========

========== SCREEN 09 / S09 — Résultats `/recherche` ==========

```text
Independent screen. Generate ONLY this one screen. Do not generate other screens from this document.

Product context: Nolaya CLIENT MVP path A after QUALIFIED. Matching returns 1 to 3 real offers (D16). Layout is MASONRY / variable-height cards — NOT the Découverte carousels (D13). Faire vérifier = concierge checks the MATCH (D12).

Device: Mobile portrait ~390×844. One screen only.

Screen type: OPERATIONAL matching results.

Screen purpose (storyboard 3.1 · US-03.1 adapted · D13, D16): Inès scans 1–3 candidates of varying card heights. She may open a fiche or Faire vérifier from the list. Candidate ≠ confirmed coiffeuse. Nobody contacted yet.

Layout (masonry HERE ONLY):
1) Header: back · « Résultats » · compact chip of the QUALIFIED résumé (one line she can use to go modify)
2) Chrome: Ma demande active
3) Vertical masonry / staggered variable-height cards (1, 2 or 3 — never a 5-pack comparison). Photos NOT forced 1:1 (can be portrait or slightly different ratios) so heights vary. Little text: coiffeuse, city, price+certainty, declared availability, 2–3 reasons/gaps.
4) Per card: tap body → fiche ; action « Faire vérifier »
5) Text link « Modifier ma demande » → Résumé
6) NOT horizontal carousels. NOT Accueil. NOT a comparison table of 2–5.

French UI text:
- Header: « Résultats »
- Chip: « Knotless braids · Paris · max 200 € » + « Modifier ma demande »
- Card example: « Aïcha · Paris » · « 180 € · déclaré » · « Mi-septembre · déclaré » · « Correspond : longueur, ville » · « À confirmer : mèches »
- Card CTA: « Faire vérifier »
- Helper: « Nolaya vérifiera le match — pas un rendez-vous confirmé. »
- Count: « 2 propositions » (1–3 only)
- VARIANT matching (search in progress): stay on THIS url. Title « Résultats ». Status « Recherche en cours… » skeletons of variable-height cards. No fake names. No second screen.
- Back: « Retour »

Interactions — CLOSED SET:
- Open a card → Fiche prestation `/offre/:id` VARIANT from_match
- Faire vérifier on a card → Tes coordonnées `/soumission` (this candidate + QUALIFIED demand)
- Modifier ma demande → Résumé `/demande/resume`
- Retour → Résumé `/demande/resume`
- Zero results is NOT this layout: that is S10 `/recherche/diagnostic` — do not draw empty masonry here

Forbidden: Découverte carousels, 1:1-only grid copying S02, comparison 2–5, Retenir 1–5, geoloc, « Réserver », OTP, Rendez-vous tab, inventing extra candidates beyond 3, confirmed RDV copy.

Visual: Each card photo = Black/mixed-race woman, textured Afro hair, the proposed style. Variable crop heights. Sharp media. Premium realistic.

Design system Nolaya. JetBrains Mono for prices and « Recherche en cours ». Charcoal/gold. No purple, no glow.

Quality bar: Scannable masonry, 1–3 only, Faire vérifier obvious. French tutoiement.
```

========== END SCREEN 09 ==========

========== SCREEN 10 / S10 — Aucun résultat `/recherche/diagnostic` ==========

```text
Independent screen. Generate ONLY this one screen. Do not generate other screens from this document.

Product context: Nolaya CLIENT MVP path A. Zero matching results. ONE targeted relaxation, never a silent drop of an obligatory constraint.

Device: Mobile portrait ~390×844. One screen only.

Screen type: OPERATIONAL diagnostic — not a fake results grid.

Screen purpose (storyboard 3.A): Explain why nothing matched. Offer at most one explicit lever she accepts. If no lever remains, send her to edit the résumé.

Layout:
1) Header: back · « Aucun résultat »
2) Chrome: Ma demande active
3) Honest explanation (which constraint blocked — e.g. dates, city, budget) without blaming her
4) ONE proposed lever, as a named action she must choose — not auto-applied
5) Secondary: modifier dates, or return to résumé if no lever
6) No masonry of empty cards. No carousel.

French UI text:
- Header: « Aucun résultat »
- Body example: « Aucune offre active ne respecte toutes tes contraintes obligatoires pour Paris et mi-septembre. »
- Lever example (only if a non-obligatory preference can move): « Assouplir la flexibilité des dates » as an explicit button
- Alternative: « Modifier mes dates »
- Alternative: « Modifier ma demande »
- Note: « On ne relâche jamais une contrainte obligatoire en silence. »
- VARIANT no_lever: only « Modifier ma demande » (Résumé). No fake lever.

Interactions — CLOSED SET:
- Assouplir (explicit) → Résultats `/recherche` (new run)
- Modifier mes dates → Où et quand `/demande/ou-et-quand`
- Modifier ma demande / aucun levier → Résumé `/demande/resume`
- Retour → Résumé `/demande/resume`

Forbidden: auto-adding other cities, geoloc, fake offers, second relaxation without a new decision, Rendez-vous tab.

Visual: No giant photo. Calm empty state. If a small illustration, textured Afro hair, respectful, not cartoonish.

Design system Nolaya. Error colour #ba1a1a only for true errors, not for this empty state (use charcoal). 

Quality bar: Dignity, one lever, closed exits. French tutoiement.
```

========== END SCREEN 10 ==========

========== SCREEN 11 / S11 — Tes coordonnées `/soumission` ==========

```text
Independent screen. Generate ONLY this one screen. Do not generate other screens from this document.

Product context: Nolaya CLIENT MVP. Both paths arrive here. Path A: QUALIFIED demand + chosen candidate. Path B: ONLY the chosen offer, no QUALIFIED (D11, D16). Coords are SAVED AS DECLARED (D15). No OTP, no SMS/email confirm, no bounce-check. Faire vérifier already meant the MATCH, not this phone.

Device: Mobile portrait ~390×844. One screen only.

Screen type: OPERATIONAL form + mandatory warning.

Screen purpose (storyboard 6.1 · D12, D15): Collect first name + one channel (phone OR email). Before Envoyer she must ACKNOWLEDGE a warning that Nolaya does not confirm these details. If warning is not acknowledged → stay. Sending creates one dossier; nobody is contacted yet (admin/concierge off-stage). Already-sent is a readonly VARIANT of THIS url — not a second screen.

Layout:
1) Header: back · « Tes coordonnées »
2) Chrome: Ma demande active · Suivi still inactive (no token yet)
3) Compact recap of what will be verified: path B = this offer only (Aïcha · knotless braids · Paris) ; path A = qualified need + this candidate. Not a full wizard replay.
4) Fields: prénom · téléphone OR e-mail (one channel enough)
5) Warning block (always visible before send), must be acknowledged (checkbox or equivalent explicit gesture):
   « Tes coordonnées sont enregistrées telles que tu les saisis. Nolaya ne les confirme pas. Vérifie-les avant d’envoyer. »
6) Sticky « Envoyer ma demande » — enabled only if fields valid AND warning acknowledged
7) Quiet: « Ce n’est pas une réservation. Aucune coiffeuse n’est contactée tout de suite. »

French UI text:
- Header: « Tes coordonnées »
- Recap B: « Offre choisie : Aïcha · Knotless braids · Paris »
- Recap A: « Ta demande + Aïcha »
- Labels: « Prénom » · « Téléphone » · « E-mail »
- Helper: « Un prénom et un canal suffisent. Pas de compte. »
- Warning: « Tes coordonnées sont enregistrées telles que tu les saisis. Nolaya ne les confirme pas. Vérifie-les avant d’envoyer. »
- Ack: « J’ai vérifié, ces informations sont correctes. »
- Primary: « Envoyer ma demande »
- Back: « Retour »
- VARIANT warning_unacked: tapping Envoyer does nothing / stays; warning highlighted. Do not navigate.
- VARIANT invalid: inline field errors, stay. No OTP screen.
- VARIANT readonly already sent: fields locked; message « Tu as déjà envoyé cette demande. » CTA « Voir le suivi » only if a token exists (→ S12/S13 path), no second dossier.

Interactions — CLOSED SET:
- Envoyer with valid fields + ack → Demande envoyée `/soumission/confirmation`
- Envoyer without ack → stay
- Retour path B → Fiche prestation catalog ; path A → Fiche from_match or Résultats (do not invent a third place)
- No OTP, no « renvoyer le code », no magic-link wait screen

Forbidden: OTP, password, account creation, verifying the channel, payment, « Réserver », Rendez-vous tab, contacting the coiffeuse now, claiming the phone was checked.

Visual: No giant photo. Calm form. Nolaya design system. Warning uses charcoal + optional gold container #fed488, not alarmist red unless a true field error (#ba1a1a).

Quality bar: Warning unmissable, Envoyer clearly gated on ack. French tutoiement.
```

========== END SCREEN 11 ==========

========== SCREEN 12 / S12 — Demande envoyée `/soumission/confirmation` ==========

```text
Independent screen. Generate ONLY this one screen. Do not generate other screens from this document.

Product context: Nolaya CLIENT MVP. Dossier created. Concierge will check the MATCH off-stage. Not a reservation.

Device: Mobile portrait ~390×844. One screen only.

Screen type: OPERATIONAL confirmation.

Screen purpose (storyboard 6.2): Tell her the demand is received, give a reference that is NOT an access key, and a single CTA to Suivi via opaque token. Vérité d’engagement: no blocked slot, no final price, no confirmed RDV.

Layout:
1) Header: « Demande envoyée » — no back to form (or back only if transitions keep her here; do not reopen an empty coords form as a new dossier)
2) Chrome: Ma demande may still be active; Suivi becomes available
3) Success mark (not emoji) + short thanks
4) Reference line JetBrains Mono (e.g. « NOL-1842 ») + explicit « Cet identifiant ne suffit pas à ouvrir le suivi. »
5) What happens next: conciergerie vérifie le match · tu seras tenue au courant dans le suivi
6) Primary: « Suivre ma demande »

French UI text:
- Header: « Demande envoyée »
- Headline: « On a bien reçu ta demande »
- Body: « Nolaya va vérifier le match. Ce n’est pas une réservation, ni un rendez-vous confirmé. »
- Reference: « Référence NOL-1842 »
- Note: « L’identifiant affiché ne suffit pas à ouvrir ton suivi. »
- Primary: « Suivre ma demande »
- Chrome: « Découvrir » · « Ma demande » · « Suivi »

Interactions — CLOSED SET:
- Suivre ma demande → Suivi `/suivi/:jeton` (opaque token)
- Chrome Suivi → same
- Do not invent « Télécharger un billet », payment, calendar hold

Forbidden: OTP leftover, « RDV confirmé le… », QR boarding-pass energy, Rendez-vous tab, exposing the raw token as copy-paste magic if the spec treats it as opaque in the URL only — showing a human reference is OK.

Visual: No giant photo. Optional small still of textured Afro hair, modest. Success is typographic.

Design system Nolaya. Gold used sparingly as a quiet confirmation wash, not neon.

Quality bar: Calm receipt. French tutoiement.
```

========== END SCREEN 12 ==========

========== SCREEN 13 / S13 — Suivi `/suivi/:jeton` ==========

```text
Independent screen. Generate ONLY this one screen. Do not generate other screens from this document.

Product context: Nolaya CLIENT MVP. ONE screen, SIX client-facing states (variants of the same URL). Invalid/abandoned token is NOT a seventh variant of Suivi: that lands on Accueil with a message (S01 error) — do not design a « 404 dossier » screen.

Device: Mobile portrait ~390×844. One screen only. Generate the default visual as state `received` (demande reçue). Describe the other five as VARIANTS, not extra frames.

Screen type: OPERATIONAL hub after send.

Screen purpose (storyboard 6.3): She follows HER dossier only. Concierge work is off-stage; she sees labels, not the internal tool. « Coiffeuse trouvée » only when a human professional response is positive AND place/budget/period were reconfirmed. Candidate never equals found.

Layout (same skeleton every state):
1) Header: « Suivi » · reference NOL-1842 (not sufficient as access)
2) Chrome: Suivi active · Découvrir still open · Ma demande readonly (already sent)
3) Status badge JetBrains Mono uppercase — THE thing that changes per variant
4) Short explanation of what this status means (truth of engagement)
5) Recap of what she sent (offer and/or qualified need) — readonly
6) No chat with the coiffeuse. No admin console. No RDV tab.

French UI text — six VARIANTS of `/suivi/:jeton`:

1) received — badge « DEMANDE REÇUE »
   Body: « Ta demande est bien arrivée. Nolaya vérifie le match. Ce n’est pas encore une coiffeuse confirmée. »

2) searching — badge « RECHERCHE EN COURS »
   Body: « On cherche une correspondance. Aucun rendez-vous n’est confirmé. »

3) need_precision — badge « PRÉCISION NÉCESSAIRE »
   Body: « Un point de ta demande doit être précisé avant de continuer. » Secondary: she may be asked to return to a named block — only if a transition already exists; do not invent a freeform chat. If no extra CTA is in the contract, keep explanation + recap only.

4) found — badge « COIFFEUSE TROUVÉE »
   Body: « Une coiffeuse a confirmé. Le lieu, le budget et la période ont été reconfirmés. » Still no payment UI in MVP. Do not add a Rendez-vous tab.

5) none_confirmed — badge « AUCUNE COIFFEUSE CONFIRMÉE »
   Body: « Pour cette demande, aucune coiffeuse n’a pu être confirmée. » No fake alternatives list.

6) abandoned — badge « DEMANDE ABANDONNÉE »
   Body: « Cette demande n’est plus active. »

Shared labels:
- Header: « Suivi »
- Recap title: « Ta demande »
- Chrome: « Découvrir » · « Ma demande » · « Suivi »
- Never: « Réservé », « Créneau bloqué », « Prix final » as if settled unless state found AND the copy stays about confirmation of match — still no payment.

Interactions — CLOSED SET:
- Chrome Découvrir → Accueil `/` or Découverte `/decouverte` (listed only; do not invent a third discover screen)
- Chrome Ma demande: readonly recap here, no second dossier
- Invalid token: NOT this screen (Accueil + message)
- Do not add « Appeler Aïcha », « Payer », « Modifier le RDV » unless a transition says so — it does not.

Forbidden: seven screens, RDV tab, OTP to reopen, exposing other people's dossiers, concierge inbox, map to a private address.

Visual: Status-led, typographic. Optional small photo of the offer only as recap thumbnail (1:1, textured Afro hair). Not a giant hero.

Design system Nolaya. Badges uppercase JetBrains Mono. Charcoal + sparse gold. Found state stays calm — not confetti.

Quality bar: Same scaffold, six badges, honest copy. French tutoiement. Generate the received state as the default frame.
```

========== END SCREEN 13 ==========
