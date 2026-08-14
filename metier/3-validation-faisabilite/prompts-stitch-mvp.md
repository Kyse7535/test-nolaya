# Prompts Stitch MVP — Valider la faisabilité → proposition ferme

> Source : `domain-storytelling-etape-3-mvp.md`  
> Device : Mobile (≈390×844)  
> Prompt language : English  
> UI text language : French  
> Design system : Nolaya  
> Visual identity : Afro / textured hair — Black & mixed-race women  
> Scope : Happy path only (`PROPOSAL_PENDING` → `FIRM_PROPOSAL` + `SOFT_HOLD`) — no precision request, no refusal, no expiration

---

## Cartographie des écrans

| ID | Écran | Type | Acteur | Étape / moment du récit | Priorité |
| -- | ----- | ---- | ------ | ----------------------- | -------- |
| S01 | Accueil explicatif — Proposition ferme | Explicatif | Coiffeuse | T0 — Entrée `PROPOSAL_PENDING` | P0 |
| S02 | Synthèse décisionnelle (demande figée) | Opérationnel | Coiffeuse | T1 | P0 |
| S03 | Décision faisabilité explicite | Opérationnel | Coiffeuse | T2 | P0 |
| S04 | Configuration de l’offre ferme | Opérationnel | Coiffeuse | T3 | P0 |
| S05 | Récapitulatif + Publier (crée SOFT_HOLD) | Opérationnel | Coiffeuse | T4 | P0 |
| S06 | Succès FIRM_PROPOSAL + SOFT_HOLD | Opérationnel | Coiffeuse | T5 — Fin | P0 |
| S07 | Vue cliente « Offre reçue » (lecture) | Opérationnel | Cliente | Preuve lecture avant étape 4 | P0 |

**Hors MVP (ne pas générer) :** demander une précision, refus / non faisable, expiration, `NOT_SELECTED`, multi-SOFT_HOLD, opérateur, IA diagnostic, paiement.

---

## Prompt — S01 — Accueil explicatif — Proposition ferme

**Type :** Explicatif  
**Acteur :** Coiffeuse  
**Moment du récit :** T0 — Entrée (`PROPOSAL_PENDING`)  
**Objectif :** Orienter avant toute décision ou saisie

### Prompt Stitch

```text
Product context: Nolaya — premium B2B2C mobile platform for Afro / textured hair professionals (braids, twists/vanilles, ponytails, locs, natural coils). MVP demo flow: Feasibility validation happy path only — stylist turns a provisional acceptance into a firm proposal with soft-held slot. No precision request, no refusal, no payment.

Device: Mobile app screen only, portrait ~390×844. Scrollable. No desktop.

Screen type: EXPLICATIVE entry / orientation (NOT a form). No input fields, toggles, or operational lists.

Screen purpose: A Black woman hairstylist opens a proposal dossier already in PROPOSAL_PENDING after accepting an invitation. Explain that this step freezes the client need, confirms exact feasibility, configures price/slot/place/tasks, then publishes a dated FIRM_PROPOSAL with SOFT_HOLD. Status: PROPOSAL_PENDING.

Layout:
1) Sticky header: back + title « Proposition ferme »
2) Status badge JetBrains Mono uppercase: « EN ATTENTE »
3) Welcome headline + short pedagogical paragraph
4) Full-bleed hero with short overlay intention
5) Section « Ce que vous allez faire » — 4 pillar blocks (icon + title + 1–2 sentences)
6) Soft note: no negotiation multi-round, no payment in this step
7) Single primary sticky CTA

French UI text:
- Header: « Proposition ferme »
- Badge: « EN ATTENTE »
- Mono hint (optional small): « PROPOSAL_PENDING »
- Headline: « Transformer votre acceptation en offre ferme »
- Body: « La demande cliente est figée. Vous confirmez que c’est faisable, vous fixez prix, durée, créneau, lieu et tâches, puis vous publiez une offre datée avec créneau réservé temporairement. »
- Hero overlay: « Une offre claire, un créneau protégé. »
- Pillars title: « Ce que vous allez faire »
  1) « Synthèse » — « Relire le besoin figé : prestation, budget, contraintes. »
  2) « Faisabilité » — « Confirmer que c’est réalisable exactement (variante light optionnelle). »
  3) « Offre » — « Fixer prix, durée, créneau, lieu et tâches. »
  4) « Publication » — « Publier l’offre ferme et créer le soft-hold. »
- Note: « Pas de demande de précision ni de refus dans cette démo. Le paiement se fera plus tard, côté cliente. »
- CTA: « Ouvrir le dossier »

Interactions: Only CTA « Ouvrir le dossier ».

Visual: Hero of a Black and/or mixed-race woman stylist with coily/curly/textured Afro hair reviewing a client request on her phone in a calm premium studio (braids, twists/vanilles, ponytails, locs, or natural coils visible). Realistic, respectful. No straight Eurocentric hair as default.

Design system Nolaya: Manrope UI, JetBrains Mono for badges. Charcoal #000000 / #1b1c1c, soft gold #775a19 / #fed488 sparingly, surfaces #fbf9f8 / #ffffff / #efeded. Soft 0.25rem radii; hero media sharper OK. No purple gradients, no neon glow, no emoji, no dark mode, no heavy multi-shadows.

Quality bar: Premium enterprise mobile UI, calm editorial whitespace, accessible touch targets. All visible UI text in French.
```

---

## Prompt — S02 — Synthèse décisionnelle (demande figée)

**Type :** Opérationnel  
**Acteur :** Coiffeuse  
**Moment du récit :** T1  
**Objectif :** Lire la demande versionnée figée avant décision

### Prompt Stitch

```text
Product context: Nolaya MVP — Feasibility validation for Afro / textured hair stylists. Read-only frozen client demand before feasibility decision.

Device: Mobile portrait ~390×844 only.

Screen type: OPERATIONAL read-only decision brief (not a free chat, not a precision form).

Screen purpose: Coiffeuse reviews the frozen, versioned client demand: service, expected result, budget, constraints, place preference, and a small service gallery cue. Status PROPOSAL_PENDING. Step 1 of 4 in MVP flow. No ask-for-precision CTA.

Layout:
- Header back + « Synthèse décisionnelle »
- Badge « EN ATTENTE » / optional mono « PROPOSAL_PENDING »
- Vertical storyline stepper: 1 Synthèse · 2 Faisabilité · 3 Offre · 4 Publier (step 1 active, soft-gold marker)
- Client identity row (avatar + first name)
- Scrollable frozen demand sections
- Compact gallery strip (2–3 thumbnails, read-only)
- Sticky CTA « Continuer vers la faisabilité »

French UI text:
- Title: « Demande figée »
- Intro: « Ces éléments sont figés. Ils servent de base à votre offre — pas de négociation ici. »
- Sections:
  - « Cliente » — « Awa D. »
  - « Prestation » — « Vanilles / twists mi-longues »
  - « Résultat attendu » — « Vanilles soignées, longueur épaules, rendu naturel »
  - « Budget indicatif » — « 180 € – 220 € »
  - « Contraintes » — « Cheveux crépus 4C · longueur actuelle mi-dos · pas de coloration récente »
  - « Lieu souhaité » — « Chez la coiffeuse »
  - « Créneau préféré » — « Samedi matin »
- Gallery label: « Références de la capacité »
- Caption under thumbs: « Galerie prestation — lecture seule »
- Helper: « Aucune demande de précision dans cette démo. »
- CTA: « Continuer vers la faisabilité »

Interactions: Scroll + CTA only. No edit fields. No « Demander une précision ». No refuse.

Visual: Optional small editorial image / avatars of Black women with textured Afro hair (client + stylist). Gallery thumbnails must show finished protective styles on Black women with coily/curly/textured hair. Premium realistic.

Design system Nolaya: Manrope + JetBrains Mono, charcoal/gold, light surfaces, soft radii, no clutter. All visible UI text in French.
```

---

## Prompt — S03 — Décision faisabilité explicite

**Type :** Opérationnel  
**Acteur :** Coiffeuse  
**Moment du récit :** T2  
**Objectif :** Enregistrer « Faisable exactement » (variante light optionnelle)

### Prompt Stitch

```text
Product context: Nolaya MVP — Feasibility decision. Happy path only: Exact feasibility is the primary path; a light optional variant path may be shown but NO refusal / non-feasible / ask-precision branches.

Device: Mobile portrait ~390×844.

Screen type: OPERATIONAL decision screen. Step 2/4.

Screen purpose: Coiffeuse explicitly records that the frozen demand is feasible. Primary choice: « Faisable exactement ». Optional secondary light path: « Faisable avec une variante » that reveals a short optional note field (technique / length / schedule) — never silent change. Do NOT show Non faisable, Demander une précision, or expiration.

Layout:
- Header + badge EN ATTENTE
- Stepper step 2 active
- Short reminder of demand (1 compact line: Vanilles mi-longues · 180–220 €)
- Decision choice cards (select one)
- If Exact selected: confirmation helper, no extra fields required
- If Variante light selected: optional short note field (~120 chars) explaining what changes
- Sticky CTA « Configurer l’offre » (enabled when a decision is selected; for variante, note optional but encouraged)

French UI text:
- Title: « Décision de faisabilité »
- Intro: « Confirmez explicitement que vous pouvez répondre à cette demande. »
- Reminder: « Vanilles / twists mi-longues · Budget 180–220 € · Chez vous »
- Choice 1 (primary / preselected in mock): « Faisable exactement » — « Je respecte la demande telle qu’exprimée. »
- Choice 2 (optional light): « Faisable avec une variante » — « J’adapte un élément (technique, longueur, horaire…). La cliente verra la différence. »
- Optional field (only if variante): label « Ce qui change (optionnel) » · placeholder « Ex. Longueur légèrement plus courte pour respecter le budget »
- Explicit absence note (small muted): « Refus et demande de précision non disponibles dans cette démo. »
- CTA: « Configurer l’offre »

Interactions: Single-select decision; CTA gated on selection; back allowed. No refuse button. No precision CTA.

Visual: Optional calm image of Black woman stylist with textured Afro hair assessing hair length/texture in studio. Premium respectful.

Design system Nolaya. All visible UI text in French.
```

---

## Prompt — S04 — Configuration de l’offre ferme

**Type :** Opérationnel  
**Acteur :** Coiffeuse  
**Moment du récit :** T3  
**Objectif :** Fixer prix, durée, créneau, lieu, tâches

### Prompt Stitch

```text
Product context: Nolaya MVP — Firm offer configuration for Afro hair stylists. No real payment. Slot will later become SOFT_HOLD on publish.

Device: Mobile portrait ~390×844.

Screen type: OPERATIONAL form. Step 3/4.

Screen purpose: Coiffeuse configures the firm commercial/operational offer: total price, duration, concrete slot, place, included tasks/supplies. Prefill realistic mock values from capacity + demand. Status still PROPOSAL_PENDING until publish.

Layout:
- Header + BROUILLON / EN ATTENTE badge
- Stepper step 3
- Sections stacked vertically with clear labels
- Price block with JetBrains Mono amounts
- Duration select
- Slot picker (one available mock slot highlighted)
- Place choice (aligned with framework contexts)
- Tasks / supplies checklist (prefilled OK)
- Sticky CTA « Voir le récapitulatif » (enabled when price > 0, duration, slot, place, ≥1 task)

French UI text:
- Title: « Configurer l’offre »
- Intro: « Ces éléments composeront l’offre ferme publiée à la cliente. »
- « Prix total » — value « 220 € » (editable)
- Helper price: « Inclut prestation + fournitures de base. »
- Optional lines (read-only or simple fields): « Prestations 165 € » · « Fournitures 25 € » · « Préparation 30 € »
- « Durée prévue » — « 4 h 30 »
- « Créneau » — card selected: « Samedi 15 mars · 09:30 – 14:00 » with soft label « Disponible »
- « Lieu » — « Chez moi (adresse masquée jusqu’à l’engagement) »
- « Tâches & fournitures »
  - « Coiffeuse : pose des vanilles, finitions »
  - « Cliente : cheveux lavés et démêlés la veille »
  - « Fournitures : mèches fournies par la coiffeuse »
- CTA: « Voir le récapitulatif »

Interactions: Edit price/duration; select one slot; select place; toggle tasks; CTA gated. No publish yet. No payment UI.

Visual: Optional editorial image of finished twists/vanilles on a Black woman with textured hair — portfolio mood, sharp media corners.

Design system Nolaya. Amounts and slot times in JetBrains Mono. All visible UI text in French.
```

---

## Prompt — S05 — Récapitulatif + Publier (crée SOFT_HOLD)

**Type :** Opérationnel  
**Acteur :** Coiffeuse  
**Moment du récit :** T4  
**Objectif :** Confirmer explicitement et publier (`FIRM_PROPOSAL` + `SOFT_HOLD`)

### Prompt Stitch

```text
Product context: Nolaya MVP — Publish firm proposal. Explicit stylist confirmation required. Publishing creates SOFT_HOLD on the selected slot. No operator review. No payment.

Device: Mobile portrait ~390×844.

Screen type: OPERATIONAL summary + publish action. Step 4/4.

Screen purpose: Show a clear French summary of feasibility decision, price, duration, slot, place, tasks. Coiffeuse confirms and publishes. Publishing must communicate that a temporary slot hold (SOFT_HOLD) is created. Must NOT look like “sent for operator review”.

Layout:
- Header « Récapitulatif »
- Badge « EN ATTENTE »
- Scrollable summary sections with « Modifier » text links
- Soft-hold explanation callout (inline, not floating sticker)
- Confirmation checkbox
- Sticky primary CTA « Publier l’offre ferme »
- Secondary ghost « Revenir »

French UI text:
- Title: « Vérifiez avant publication »
- Intro: « En publiant, vous créez une offre ferme datée et réservez temporairement le créneau (soft-hold). »
- Sections labels: « Décision » · « Prestation » · « Prix » · « Durée » · « Créneau » · « Lieu » · « Tâches »
- Sample filled values: Faisable exactement · Vanilles mi-longues · 220 € · 4 h 30 · Samedi 15 mars 09:30 · Chez moi · Mèches fournies + cheveux préparés par la cliente
- Soft-hold note: « Soft-hold : le créneau sera immobilisé temporairement jusqu’à acceptation cliente. »
- Checkbox: « Je confirme que cette offre correspond à ce que je peux réaliser »
- CTA: « Publier l’offre ferme »
- Secondary: « Revenir »

Interactions: CTA disabled until checkbox checked. Modifier links are visual affordances. Publish is instantaneous in MVP (creates FIRM_PROPOSAL + SOFT_HOLD).

Visual: None required; optional small avatar of Black woman stylist with textured hair.

Design system Nolaya. Status labels JetBrains Mono. All visible UI text in French.
```

---

## Prompt — S06 — Succès FIRM_PROPOSAL + SOFT_HOLD

**Type :** Opérationnel  
**Acteur :** Coiffeuse  
**Moment du récit :** T5 — Fin `FIRM_PROPOSAL` + `SOFT_HOLD`  
**Objectif :** Preuve tangible pour la démo

### Prompt Stitch

```text
Product context: Nolaya MVP — success confirmation after publishing a firm proposal with soft-held slot.

Device: Mobile portrait ~390×844. Mostly non-scrolling short screen OK.

Screen type: OPERATIONAL success / confirmation (not a form).

Screen purpose: Celebrate publication. Show status FIRM_PROPOSAL and that SOFT_HOLD is active on the slot. Offer next step toward client acceptance (étape 4) without implementing payment here.

Layout:
- Minimal header
- Large success mark / calm illustration
- Status badge « OFFRE FERME » / JetBrains Mono codes « FIRM_PROPOSAL » and « SOFT_HOLD »
- Short confirmation copy with slot + price recap
- Primary CTA « Voir l’offre publiée »
- Secondary « Retour à l’accueil »

French UI text:
- Headline: « Offre ferme publiée »
- Body: « Votre proposition est datée. Le créneau du samedi 15 mars à 09:30 est en soft-hold en attendant l’acceptation de la cliente. »
- Badge: « OFFRE FERME »
- Mono lines: « FIRM_PROPOSAL » · « SOFT_HOLD »
- Recap line: « 220 € · Vanilles mi-longues · 4 h 30 »
- Primary CTA: « Voir l’offre publiée »
- Secondary: « Retour à l’accueil »

Interactions: Two CTAs only.

Visual: Joyful but premium moment — Black woman stylist with textured Afro hair in professional setting after confirming a booking offer, subtle celebration, not cartoonish.

Design system Nolaya. All visible UI text in French.
```

---

## Prompt — S07 — Vue cliente « Offre reçue » (lecture)

**Type :** Opérationnel  
**Acteur :** Cliente  
**Moment du récit :** Après publication — lecture seule avant étape 4  
**Objectif :** Preuve côté cliente qu’une offre ferme a été reçue

### Prompt Stitch

```text
Product context: Nolaya MVP — Client read-only view of a received firm proposal. This screen proves the offer exists before engagement (étape 4). No payment, no acceptance checkboxes here — those belong to the next step.

Device: Mobile portrait ~390×844.

Screen type: OPERATIONAL client read-only offer view.

Screen purpose: Client (Black woman with textured hair) opens a notification/inbox item and reads the firm offer: stylist, service, price, slot under soft-hold, place, tasks. Status shown as offer received / awaiting acceptance. Read-only. Single CTA toward acceptance flow (may be labeled for next step).

Layout:
- Header back + « Offre reçue »
- Badge JetBrains Mono « OFFRE FERME » / « EN ATTENTE D’ACCEPTATION »
- Stylist identity row (avatar + name + short rating optional)
- Scrollable offer sections (same commercial facts as published)
- Soft-hold validity hint
- Sticky primary CTA « Examiner pour accepter »
- Secondary ghost « Plus tard »

French UI text:
- Title: « Offre reçue »
- Intro: « Amina K. vous a envoyé une offre ferme. Vérifiez les détails avant d’accepter. »
- Badge: « OFFRE FERME »
- Mono: « FIRM_PROPOSAL »
- Stylist: « Amina K. · Spécialiste vanilles & braids »
- Sections: « Prestation » · « Prix » · « Créneau » · « Lieu » · « Ce qui est inclus » · « À préparer »
- Sample values: Vanilles mi-longues · 220 € · Samedi 15 mars 09:30–14:00 · Chez la coiffeuse (adresse après engagement) · Mèches incluses · Cheveux lavés la veille
- Soft-hold note: « Créneau réservé temporairement (soft-hold) jusqu’à votre acceptation. »
- CTA: « Examiner pour accepter »
- Secondary: « Plus tard »

Interactions: Read-only content. CTA navigates conceptually to étape 4 (accept). No card fields. No pay button. No refuse.

Visual: Stylist avatar and optional hero/detail of finished twists/vanilles on Black / mixed-race women with textured Afro hair. Premium realistic. No straight Eurocentric hair as default.

Design system Nolaya: Manrope + JetBrains Mono, charcoal/gold, light surfaces. All visible UI text in French.
```
