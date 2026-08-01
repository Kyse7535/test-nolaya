# Prompts Stitch MVP — Produire la preuve et prolonger la relation

> Source : `domain-storytelling-etape-8-mvp.md`  
> Device : Mobile (≈390×844)  
> Prompt language : English  
> UI text language : French  
> Design system : Atelier Synergy  
> Visual identity : Afro / textured hair — Black & mixed-race women  
> Scope : Happy path only (post-`SETTLED` → `EXPERIENCE_RECORDED`) — review optional with explicit Skip, history always, stylist reply optional, « Refaire » with prefill + forced reconfirm — no moderation, no recommendation engine, gallery `VERIFIED_REALIZATION` out of core

---

## Cartographie des écrans

| ID | Écran | Type | Acteur | Étape / moment du récit | Priorité |
| -- | ----- | ---- | ------ | ----------------------- | -------- |
| S01 | Accueil explicatif post-SETTLED — Preuve d’expérience | Explicatif | Cliente | T0 — Entrée `PROOF_PENDING` | P0 |
| S02 | Confirmation preuve / outcome OK | Opérationnel | Cliente | T1 — Outcome heureux | P0 |
| S03 | Évaluation multidimensionnelle (+ Skip avis) | Opérationnel | Cliente | T2–T3 — Avis optionnel | P0 |
| S04 | Avis public + réponse styliste | Opérationnel | Cliente + Coiffeuse | T3–T4 — Publication / réponse | P0 |
| S05 | Historique + « Refaire cette prestation » | Opérationnel | Cliente | T5–T6 — Prefill + reconfirm | P0 |
| S06 | Succès EXPERIENCE_RECORDED | Opérationnel | Cliente | Fin — `EXPERIENCE_RECORDED` | P0 |

**Hors MVP (ne pas générer) :** Modération opérateur (`FLAGGED`), `OUTCOME_DISPUTED`, scoring réputation, CRM/loyalty, moteur de reco, signalement abus, publication galerie vérifiée obligatoire, anti-fraude.

---

## Prompt — S01 — Accueil explicatif post-SETTLED — Preuve d’expérience

**Type :** Explicatif  
**Acteur :** Cliente  
**Moment du récit :** T0 — Entrée (`PROOF_PENDING` après `SETTLED`)  
**Objectif :** Orienter : l’expérience existe même sans avis

### Prompt Stitch

```text
Product context: Atelier Synergy — premium B2B2C mobile platform for Afro / textured hair clients and professionals (braids, twists/vanilles, ponytails, locs, natural coils). MVP demo flow: Experience proof after SETTLED — create a factual ExperienceRecord, optional multidimensional review, optional stylist reply, always history, optional « Refaire cette prestation » with prefill + forced reconfirm. No moderation. Gallery verified out of core.

Device: Mobile app screen only, portrait ~390×844. Scrollable. No desktop.

Screen type: EXPLICATIVE entry / orientation (NOT a form). No star ratings, textareas, or operational lists.

Screen purpose: A Black woman client whose settlement is SETTLED opens the experience step. Explain that a factual proof is recorded from completed facts; review is optional; history is always created; she may later redo the same service with prefilled data but must reconfirm price/date/place. Status: PROOF_PENDING → toward EXPERIENCE_RECORDED.

Layout:
1) Sticky header: back + title « Preuve d’expérience »
2) Status badge JetBrains Mono uppercase: « SETTLED » (gate amont) + soft badge « PREUVE »
3) Welcome headline + short pedagogical paragraph
4) Full-bleed hero with short overlay intention
5) Section « Ce que vous allez faire » — 4 pillar blocks (icon + title + 1–2 sentences)
6) Soft note: avis jamais obligatoire ; pas de modération dans cette démo
7) Single primary sticky CTA

French UI text:
- Header: « Preuve d’expérience »
- Badge: « SETTLED »
- Mono hint (optional): « PROOF_PENDING »
- Headline: « Votre expérience est prête à être enregistrée »
- Body: « Le règlement est clos. On capture les faits de la prestation. Vous pourrez laisser un avis multidimensionnel — ou passer. L’historique reste disponible, et vous pourrez refaire la même prestation avec des champs à reconfirmer. »
- Hero overlay: « Une preuve factuelle, une relation qui continue. »
- Pillars title: « Ce que vous allez faire »
  1) « Confirmation » — « Valider que la prestation s’est bien déroulée comme prévu. »
  2) « Avis optionnel » — « Noter technique, réservation, communication, ponctualité, prix — ou ignorer. »
  3) « Historique » — « Toujours créé, même sans avis publié. »
  4) « Refaire » — « Préremplir une nouvelle demande — prix, date et lieu à reconfirmer. »
- Note: « L’avis n’est jamais obligatoire. Pas de modération opérateur ni de galerie vérifiée obligatoire dans cette démo. »
- CTA: « Confirmer mon expérience »

Interactions: Only CTA « Confirmer mon expérience ».

Visual: Hero of a Black and/or mixed-race woman with coily/curly/textured Afro hair admiring a finished protective style (braids, twists/vanilles, ponytails, locs, or natural coils) in a calm premium setting. Realistic, respectful. No straight Eurocentric hair as default.

Design system Atelier Synergy: Manrope UI, JetBrains Mono for badges. Charcoal #000000 / #1b1c1c, soft gold #775a19 / #fed488 sparingly, surfaces #fbf9f8 / #ffffff / #efeded. Soft 0.25rem radii; hero media sharper OK. No purple gradients, no neon glow, no emoji, no dark mode, no heavy multi-shadows.

Quality bar: Premium enterprise mobile UI, calm editorial whitespace, accessible touch targets. All visible UI text in French.
```

---

## Prompt — S02 — Confirmation preuve / outcome OK

**Type :** Opérationnel  
**Acteur :** Cliente  
**Moment du récit :** T1 — Confirmation d’outcome heureux  
**Objectif :** Confirmer « réalisée comme prévu » + montrer la preuve factuelle

### Prompt Stitch

```text
Product context: Atelier Synergy MVP — Experience proof confirmation after SETTLED. Happy path only: outcome OK (« réalisée comme prévu »). Auto ExperienceRecord from execution facts. No OUTCOME_DISPUTED UI. No moderation.

Device: Mobile portrait ~390×844 only.

Screen type: OPERATIONAL confirmation (client).

Screen purpose: Client confirms the happy outcome and reviews the factual proof card (date, slot, stylist, engaged service, final price). This creates / confirms EXPERIENCE_RECORDED path. Review comes next and remains optional.

Layout:
- Sticky header back + « Fin de prestation »
- Badge JetBrains Mono « SETTLED »
- Headline + short helper
- Single primary outcome choice preselected for happy path: « Réalisée comme prévu » (do NOT emphasize dispute / partial / not done paths — happy path only; at most show the OK option as selected card)
- Factual proof section (read-only)
- Sticky primary CTA « Continuer »
- Secondary ghost optional « Passer l’avis » hint that avis is next and skippable (or keep skip only on S03 — prefer one clear Continuer here)

French UI text:
- Title: « Confirmation de fin »
- Intro: « Confirmez le déroulement de votre prestation. »
- Badge: « SETTLED »
- Outcome selected: « Réalisée comme prévu »
- Outcome helper: « Happy path démo — outcome OK. »
- Section: « Preuve factuelle du rendez-vous »
  - « Date » — « Samedi 15 mars 2026 »
  - « Heure » — « 09:30 – 14:00 »
  - « Coiffeuse » — « Amina K. »
  - « Prestation » — « Vanilles / twists mi-longues »
  - « Prix final » — « 230,00 € » (incl. tip if any) — JetBrains Mono
- Note: « Ces faits viennent du dossier réglé. L’avis n’est pas obligatoire à l’étape suivante. »
- CTA: « Continuer vers l’évaluation »
- Secondary (optional): « Continuer sans avis » (if shown, jumps toward history / S05–S06 path)

Interactions: Outcome OK selected. Primary CTA continues to multidimensional evaluation. If secondary skip is shown, it must land on history with EXPERIENCE_RECORDED still true (avis never required). No dispute, no « Non réalisée », no flag.

Visual: Optional verified-mood image of finished twists/vanilles on Black woman with textured hair; stylist avatar Black woman with textured Afro hair. Premium respectful.

Design system Atelier Synergy. Amounts/status JetBrains Mono. All visible UI text in French.
```

---

## Prompt — S03 — Évaluation multidimensionnelle (+ Skip avis)

**Type :** Opérationnel  
**Acteur :** Cliente  
**Moment du récit :** T2–T3 — Feedback multi-dim ou skip explicite  
**Objectif :** Collecter un avis optionnel ; chemin Skip toujours visible

### Prompt Stitch

```text
Product context: Atelier Synergy MVP — Optional multidimensional review after experience confirmation. Review is NEVER mandatory. Explicit Skip path must be visible and equal in legitimacy to publish. Dimensions: technique, réservation, communication, ponctualité, prix. No moderation queue. No reputation scoring UI.

Device: Mobile portrait ~390×844.

Screen type: OPERATIONAL evaluation form with explicit skip.

Screen purpose: Client may rate 5 dimensions and optionally write a public comment / favorite the stylist — OR skip entirely to history. Skipping still keeps EXPERIENCE_RECORDED + history entry.

Layout:
- Sticky header back + « Votre avis »
- Soft badge « OPTIONNEL »
- Stylist avatar + short intro
- 5 dimension rows (label + 1–5 stars soft-gold fill)
- Optional public comment textarea
- Optional « Ajouter aux favoris » checkbox (light)
- Sticky primary CTA « Publier mon avis »
- Explicit secondary text button / ghost « Passer l’avis » (always visible, not buried)
- Helper under skip: history is created anyway

French UI text:
- Title: « Votre retour d’expérience »
- Intro: « Votre avis aide Amina K. et les autres clientes — il reste facultatif. »
- Badge: « OPTIONNEL »
- Dimensions:
  1) « Technique » — « Qualité du résultat »
  2) « Réservation » — « Fluidité de la prise de rendez-vous »
  3) « Communication » — « Échanges avec la coiffeuse »
  4) « Ponctualité » — « Respect de l’horaire »
  5) « Prix » — « Rapport au prix engagé »
- Textarea label: « Avis public (facultatif) »
- Placeholder: « Partagez votre expérience avec la communauté… »
- Favorite checkbox: « Ajouter Amina K. à mes favoris »
- Primary CTA: « Publier mon avis »
- Skip CTA (explicit): « Passer l’avis »
- Skip helper: « Votre expérience reste enregistrée dans l’historique, même sans avis. »

Interactions: Stars optional per dimension for publish path; if publishing, require at least one dimension rated OR allow publish with comment only — keep light. Skip must not open a guilt modal; one tap → history / success path. No report abuse. No moderation waiting state.

Visual: Circular avatar of Black woman stylist with textured Afro hair; premium calm. Any imagery: Black and/or mixed-race women with coily/curly/textured hair. No straight Eurocentric hair as default.

Design system Atelier Synergy: Manrope + JetBrains Mono labels if needed, charcoal primary CTA, ghost secondary for Skip, soft gold for star fill. Soft radii. No emoji. All visible UI text in French.
```

---

## Prompt — S04 — Avis public + réponse styliste

**Type :** Opérationnel  
**Acteur :** Cliente + Coiffeuse (réponse)  
**Moment du récit :** T3–T4 — `REVIEW_PUBLISHED` + réponse optionnelle  
**Objectif :** Montrer l’avis publié et la réponse styliste (sans modération)

### Prompt Stitch

```text
Product context: Atelier Synergy MVP — Published public review + optional stylist reply. Instant publish (no FLAGGED / moderation). This screen may be shown after client publishes on S03. Stylist reply is optional and light. No « Signaler un abus ». No operator console.

Device: Mobile portrait ~390×844.

Screen type: OPERATIONAL read/reply view (client sees published review; stylist may reply in same composition for demo — prefer a single mobile screen showing review + reply block, with reply already filled OR a short reply composer for stylist lens).

Screen purpose: Display the public review for the completed Afro hair service, verified-by-platform light chip (not gallery VERIFIED_REALIZATION), and stylist reply area. Bridge to history.

Layout:
- Sticky header back + « Avis »
- Badge JetBrains Mono « PUBLIÉ » / mono « REVIEW_PUBLISHED »
- Client review block (avatar, name, service, date, stars, quote)
- Soft « Expérience vérifiée » chip (factual — not moderation)
- Stylist reply block: either published reply OR composer with sticky « Répondre »
- Primary CTA « Voir mon historique »
- No report / flag actions

French UI text:
- Title: « Avis & témoignage »
- Intro: « Retour d’expérience suite à la prestation. »
- Badge: « PUBLIÉ »
- Client: « Awa D. »
- Service line: « Vanilles / twists mi-longues · 15 mars 2026 »
- Stars: 5/5 sample
- Chip: « Expérience enregistrée »
- Review quote: « Pose soignée, vanilles régulières, échange clair du début à la fin. Je recommande. »
- Reply title: « Réponse de Amina K. »
- Reply sample (filled): « Merci Awa — ravie que le résultat vous plaise. À bientôt pour l’entretien ! »
- Composer variant label (if empty): « Répondre à l’avis (optionnel) »
- Placeholder: « Remercier la cliente… »
- Composer CTA: « Publier la réponse »
- Primary: « Voir mon historique »

Interactions: Read review; optional reply publish (one tap). CTA to history. MUST NOT include « Signaler un abus », flag, hide, or moderator tools. No social share spam required (omit or keep minimal without Instagram chrome clutter).

Visual: Avatars of Black woman client and Black woman stylist with textured Afro hair; optional small finished-style thumbnail (twists/vanilles). Premium realistic. No straight Eurocentric hair as default.

Design system Atelier Synergy. Soft gold accent on reply border optional. All visible UI text in French.
```

---

## Prompt — S05 — Historique + « Refaire cette prestation »

**Type :** Opérationnel  
**Acteur :** Cliente  
**Moment du récit :** T5–T6 — Historique toujours + RepeatDemand prérempli  
**Objectif :** Historique + prefill « Refaire » avec champs forcés à reconfirmer

### Prompt Stitch

```text
Product context: Atelier Synergy MVP — Experience history always available after EXPERIENCE_RECORDED (with or without review). Core relational action: « Refaire cette prestation » creates a prefilled RepeatDemand draft — NEVER silent reuse of old price/date/place. Forced reconfirm fields required. Gallery verified out of core. No CRM/loyalty.

Device: Mobile portrait ~390×844. Scrollable.

Screen type: OPERATIONAL history + redo / reconfirm flow. Prefer ONE mobile composition: history focus card for last experience + inline or sheet-like reconfirm section revealed after tapping « Refaire cette prestation » (show both states clearly in the design: list + reconfirm panel filled with sample).

Screen purpose: Client sees her experiences. On the latest SETTLED/EXPERIENCE_RECORDED item, she can redo. Prefill service + stylist reference; force reconfirmation of price reference, date/slot, and place before creating a new demand draft that re-enters étape 1→2… (do not implement matching here).

Layout:
- Sticky header « Mes expériences »
- Intro line
- Focus card « Dernier rendez-vous » (service, date, stylist avatar, status EXPERIENCE_RECORDED)
- Info note about reconfirm
- Primary CTA « Refaire cette prestation »
- Secondary ghost « Voir les détails »
- After Refaire (same screen lower section or sticky panel):
  - Prefill (read-only): prestation, styliste
  - Forced reconfirm fields: prix de référence (editable, not auto-applied), date/créneau, lieu
  - Sticky CTA « Créer la nouvelle demande »
  - Ghost « Annuler »
- Shorter past list below (1–2 items) for history density — keep calm, not dashboard clutter

French UI text:
- Title: « Mes expériences »
- Intro: « Historique de vos prestations — disponible même sans avis. »
- Focus badge: « Dernier rendez-vous »
- Focus title: « Vanilles / twists mi-longues »
- Date: « Samedi 15 mars 2026 »
- Stylist: « Amina K. »
- Status mono: « EXPERIENCE_RECORDED »
- Info: « La reprise préremplit votre demande, mais vous devez reconfirmer le prix, la date et le lieu. L’ancien prix est une référence, jamais appliqué silencieusement. »
- CTA: « Refaire cette prestation »
- Reconfirm section title: « Nouvelle demande préremplie »
- Prefill labels:
  - « Prestation » — « Vanilles / twists mi-longues » (locked)
  - « Coiffeuse de référence » — « Amina K. » (locked)
- Forced fields:
  - « Prix de référence à reconfirmer » — placeholder/value « 220 € » — helper « Non appliqué automatiquement »
  - « Date & créneau » — placeholder « Choisir une nouvelle date »
  - « Lieu » — choices sample « Chez la coiffeuse » / « À domicile »
- CTA confirm: « Créer la nouvelle demande »
- Secondary: « Annuler »
- Past section: « Historique »
- Sample past item: « Entretien twists · 12 janv. · Amina K. »

Interactions: History always visible. Refaire reveals reconfirm. CTA « Créer la nouvelle demande » disabled until price + date + place reconfirmed. Creating draft is the end of this screen’s job (bridge to search/demand flow — do not build matching UI). No gallery publish. No loyalty points.

Visual: Stylist/client avatars Black women with textured Afro hair; optional finished twists thumbnail sharp corners. Premium. No straight Eurocentric hair as default.

Design system Atelier Synergy: Manrope + JetBrains Mono for status/price, charcoal CTA, ghost secondary, light surfaces, soft radii. All visible UI text in French.
```

---

## Prompt — S06 — Succès EXPERIENCE_RECORDED

**Type :** Opérationnel  
**Acteur :** Cliente  
**Moment du récit :** Fin — `EXPERIENCE_RECORDED` (état de fin clair)  
**Objectif :** Clôturer la démo preuve / relation

### Prompt Stitch

```text
Product context: Atelier Synergy MVP — Clear end-state success after experience is recorded (with or without published review). Status EXPERIENCE_RECORDED. History exists. Optional review may be PUBLISHED or skipped. Bridge back to history or home. No moderation waiting. No gallery verification requirement.

Device: Mobile portrait ~390×844. Mostly non-scrolling short screen OK.

Screen type: OPERATIONAL success / confirmation (not a form).

Screen purpose: Tell the client her experience is recorded. Show EXPERIENCE_RECORDED. Summarize whether she left a review or skipped. Offer « Voir mon historique » and optional « Refaire cette prestation » (navigational — reconfirm lives on S05).

Layout:
- Minimal header
- Large success mark / calm illustration
- Status badge « ENREGISTRÉE » + JetBrains Mono « EXPERIENCE_RECORDED »
- Short confirmation copy (two variants OK in copy: with review / without review — show one sample; prefer with-review sample + footnote that skip also works)
- Compact recap: service, stylist, date
- Primary CTA « Voir mon historique »
- Secondary « Accueil » or « Refaire cette prestation »

French UI text:
- Headline: « Expérience enregistrée »
- Body: « Votre preuve d’expérience est créée. Vous pouvez retrouver cette prestation dans l’historique et la refaire plus tard en reconfirmant prix, date et lieu. »
- Badge: « ENREGISTRÉE »
- Mono line: « EXPERIENCE_RECORDED »
- Recap: « Vanilles / twists mi-longues · Amina K. · 15 mars 2026 »
- Review line sample: « Avis publié » OR « Sans avis — historique conservé »
- Primary CTA: « Voir mon historique »
- Secondary: « Refaire cette prestation »
- Footnote: « Pas de modération opérateur. Galerie vérifiée hors cœur de cette démo. »

Interactions: Two CTAs only. No further forms. No flag/report.

Visual: Joyful but premium moment — Black woman client with textured Afro hair / protective style after a successful experience, calm celebration, not cartoonish. Realistic, respectful. No straight Eurocentric hair as default.

Design system Atelier Synergy: Manrope + JetBrains Mono, charcoal/gold, light surfaces. All visible UI text in French.
```
