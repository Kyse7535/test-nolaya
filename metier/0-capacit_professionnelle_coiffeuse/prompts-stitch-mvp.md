# Prompts Stitch MVP — Ouvrir une capacité professionnelle

> Source : `domain-storytelling-etape-0-mvp.md`  
> Device : Mobile (≈390×844)  
> Prompt language : English  
> UI text language : French  
> Design system : Atelier Synergy  
> Visual identity : Afro / textured hair — Black & mixed-race women  
> Scope : Happy path only (`CAPACITY_DRAFT` → `CAPACITY_OPEN`) — no review gate, no operator, no exception branches, no auth, no real payment

---

## Cartographie des écrans

| ID | Écran | Type | Acteur | Étape / moment du récit | Priorité |
| -- | ----- | ---- | ------ | ----------------------- | -------- |
| S01 | Accueil explicatif — Capacité professionnelle | Explicatif | Coiffeuse | T0 — Entrée | P0 |
| S02 | Choix prestation + variante | Opérationnel | Coiffeuse | T1a | P0 |
| S03 | Galerie de la prestation | Opérationnel | Coiffeuse | T1b | P0 |
| S04 | Niveau de service + tâches | Opérationnel | Coiffeuse | T2 | P0 |
| S05 | Prix + durée + suppléments | Opérationnel | Coiffeuse | T3 | P0 |
| S06 | Lieu + disponibilités + volume | Opérationnel | Coiffeuse | T4 | P0 |
| S07 | Récapitulatif + Activer | Opérationnel | Coiffeuse | T5 | P0 |
| S08 | Succès — Capacité ouverte | Opérationnel | Coiffeuse | Fin `CAPACITY_OPEN` | P0 |
| S09 | Liste de mes capacités | Opérationnel | Coiffeuse | Après activation (bonus démo) | P1 |

**Hors MVP (ne pas générer) :** IN_REVIEW, opérateur, rapport de vérification, exceptions au cadre, auth, paiement réel, `RECONFIRMATION_REQUIRED`, `SUSPENDED`, galerie rejetée, revenu net cible.

---

## Prompt — S01 — Accueil explicatif — Capacité professionnelle

**Type :** Explicatif  
**Acteur :** Coiffeuse  
**Moment du récit :** T0 — Entrée (`CAPACITY_DRAFT`)  
**Objectif :** Orienter avant toute saisie ; montrer que le cadre pro est déjà actif (hérité)

### Prompt Stitch

```text
Product context: Atelier Synergy — premium B2B2C mobile platform for Afro / textured hair professionals (braids, twists/vanilles, ponytails, locs, natural coils). MVP demo flow: Open a Professional Capacity happy path only. Professional Framework is ALREADY ACTIVE (mocked, inherited — not configured in this step).

Device: Mobile app screen only, portrait ~390×844. Scrollable. No desktop.

Screen type: EXPLICATIVE entry / orientation (NOT a form). No input fields, toggles, or operational lists.

Screen purpose: A Black woman hairstylist opens a capacity draft. Explain that she will make ONE prestation available: what she sells, how it looks, who does what, price/duration, where/when. Status: CAPACITY_DRAFT. Show an inherited banner that her Professional Framework is already ACTIVE.

Layout:
1) Sticky header: back + title « Capacité professionnelle »
2) Status badge JetBrains Mono uppercase: « BROUILLON »
3) Informational banner (not editable): cadre pro already active / inherited
4) Welcome headline + short pedagogical paragraph
5) Full-bleed hero with short overlay intention
6) Section « Ce que vous allez définir » — 5 pillar blocks (icon + title + 1–2 sentences)
7) Single primary sticky CTA

French UI text:
- Header: « Capacité professionnelle »
- Badge: « BROUILLON »
- Banner: « Cadre professionnel actif — hérité » with short helper « Vos règles générales d’exercice sont déjà en place. Vous ne les modifiez pas ici. »
- Headline: « Rendez une prestation disponible »
- Body: « Vous allez choisir quoi vous vendez, montrer comment ça se présente, dire qui fait quoi, fixer prix et durée, puis indiquer où et quand. À la fin, vous activez explicitement. »
- Hero overlay: « Une prestation claire, prête à recevoir des demandes. »
- Pillars title: « Ce que vous allez définir »
  1) « Prestation » — « Le service et la variante que vous proposez. »
  2) « Galerie » — « Des photos de cette prestation, avec un niveau de preuve clair. »
  3) « Service » — « Complet ou assisté, et qui réalise chaque tâche. »
  4) « Prix & durée » — « Tarif de base, durée, et 0 à 2 suppléments. »
  5) « Lieu & dispos » — « Où, quand, et combien de demandes vous souhaitez. »
- Note: « Pas de contrôle opérateur dans cette démo. Activation instantanée après confirmation. »
- CTA: « Ouvrir une capacité »

Interactions: Only CTA « Ouvrir une capacité ». Banner is read-only (no edit link to framework).

Visual: Hero of a Black and/or mixed-race woman stylist with coily/curly/textured Afro hair (braids, twists/vanilles, ponytails, locs, or natural coils) preparing a protective style in a calm premium studio. Realistic, respectful. No straight Eurocentric hair as default. Any photos, illustrations, avatars, or portfolio images must depict Black and/or mixed-race women with coily, curly, or textured hair (Afro hair: braids, twists/vanilles, ponytails, locs, natural coils). Premium, realistic, respectful representation. No straight Eurocentric hair as the default visual.

Design system Atelier Synergy: Manrope UI, JetBrains Mono for badges. Charcoal #000000 / #1b1c1c, soft gold #775a19 / #fed488 sparingly, surfaces #fbf9f8 / #ffffff / #efeded. Soft 0.25rem radii; hero media sharper OK. No purple gradients, no neon glow, no emoji, no dark mode, no heavy multi-shadows.

Quality bar: Premium enterprise mobile UI, calm editorial whitespace, accessible touch targets. All visible UI text in French.
```

---

## Prompt — S02 — Choix prestation + variante

**Type :** Opérationnel  
**Acteur :** Coiffeuse  
**Moment du récit :** T1a  
**Objectif :** Choisir une prestation du catalogue mock + une variante simple

### Prompt Stitch

```text
Product context: Atelier Synergy MVP — Open Professional Capacity for Afro / textured hair stylists. Happy path only. Professional Framework already ACTIVE (inherited banner optional small).

Device: Mobile portrait ~390×844 only.

Screen type: OPERATIONAL form step.

Screen purpose: Coiffeuse picks one prestation from a mock catalog and a simple variante (size / length / finish). Status CAPACITY_DRAFT. Step 1 of 5 in MVP flow (Prestation · Galerie · Service · Prix · Lieu).

Layout:
- Header back + « Capacité professionnelle »
- Badge « BROUILLON »
- Vertical storyline stepper: 1 Prestation · 2 Galerie · 3 Service · 4 Prix · 5 Lieu (step 1 active, soft-gold marker)
- Optional slim inherited note: « Cadre professionnel actif — hérité »
- Section title + helper
- Single-select catalog cards (prestation list — not pill spam)
- Variante selectors (size / length; optional finish)
- Sticky CTA « Continuer » (disabled until prestation + required variante fields chosen)

French UI text:
- Title: « Prestation & variante »
- Intro: « Choisissez ce que vous rendez disponible. Une capacité = une prestation identifiable. »
- Catalog label: « Catalogue »
- Sample prestations (mock):
  1) « Knotless braids »
  2) « Vanilles / twists »
  3) « Retwist locs »
  4) « Ponytail »
- Variante section: « Variante »
  - « Taille »: « Small » / « Medium » / « Large »
  - « Longueur »: « Shoulder » / « Waist » / « Mid-back »
  - « Finition (optionnel) »: « Standard » / « Curly ends »
- Helper: « Sélectionnez une prestation et précisez la variante. »
- CTA: « Continuer »

Interactions: Single-select prestation; variante fields required (taille + longueur); CTA gated. Back allowed.

Visual: Optional small editorial image of finished knotless braids or twists on a Black woman with textured Afro hair. Premium realistic. Any photos, illustrations, avatars, or portfolio images must depict Black and/or mixed-race women with coily, curly, or textured hair (Afro hair: braids, twists/vanilles, ponytails, locs, natural coils). Premium, realistic, respectful representation. No straight Eurocentric hair as the default visual.

Design system Atelier Synergy: Manrope + JetBrains Mono, charcoal/gold, light surfaces, soft radii, no clutter. All visible UI text in French.
```

---

## Prompt — S03 — Galerie de la prestation

**Type :** Opérationnel  
**Acteur :** Coiffeuse  
**Moment du récit :** T1b  
**Objectif :** Montrer le savoir-faire sur CETTE prestation avec niveaux de preuve simples

### Prompt Stitch

```text
Product context: Atelier Synergy MVP — Professional Capacity gallery for the selected prestation. No moderation, no IN_REVIEW, no operator. Photos publish immediately into the capacity draft. Proof levels only: DECLARED_REALIZATION or REFERENCE_INSPIRATION.

Device: Mobile portrait ~390×844.

Screen type: OPERATIONAL. Step 2/5.

Screen purpose: Coiffeuse adds or selects 1–N photos for THIS prestation and marks each photo’s proof level. At least 1 image required to continue. Gallery items go DRAFT → PUBLISHED instantly in MVP (show as published in draft).

Layout:
- Header + badge BROUILLON
- Stepper step 2 active
- Context line showing selected prestation + variante (e.g. Knotless braids — Medium — Waist)
- Grid of photo tiles (sharp corners for media) with proof-level chip on each
- Add photo control (camera / library mock)
- Sticky CTA Continuer (enabled when ≥1 photo with a proof level)

French UI text:
- Title: « Galerie de la prestation »
- Intro: « Montrez cette prestation. Chaque photo indique si c’est une réalisation déclarée ou une inspiration. »
- Context chip: « Knotless braids · Medium · Waist »
- Add action: « Ajouter une photo »
- Proof level label: « Niveau de preuve »
  - « Réalisation déclarée » (maps to DECLARED_REALIZATION)
  - « Inspiration / référence » (maps to REFERENCE_INSPIRATION)
- Empty state: « Ajoutez au moins une photo pour continuer. »
- Helper: « Pas de validation opérateur. Les photos sont publiées dans votre brouillon. »
- CTA: « Continuer »

Interactions: Add photos (mock); per-photo single-select proof level; remove photo affordance; CTA gated on ≥1 image with proof level.

Visual: Photo tiles must show Black and/or mixed-race women with coily/curly/textured Afro hair wearing the selected style (braids, twists, etc.). Sharp media corners. Any photos, illustrations, avatars, or portfolio images must depict Black and/or mixed-race women with coily, curly, or textured hair (Afro hair: braids, twists/vanilles, ponytails, locs, natural coils). Premium, realistic, respectful representation. No straight Eurocentric hair as the default visual.

Design system Atelier Synergy. JetBrains Mono for proof chips / status. All visible UI text in French. No IN_REVIEW badge, no reject UI.
```

---

## Prompt — S04 — Niveau de service + tâches

**Type :** Opérationnel  
**Acteur :** Coiffeuse  
**Moment du récit :** T2  
**Objectif :** Choisir COMPLET / ASSISTÉ et répartir les tâches (styliste / cliente)

### Prompt Stitch

```text
Product context: Atelier Synergy MVP — Professional Capacity service model for Afro hair stylists. Levels: COMPLET (full service) or ASSISTÉ (assisted). No advanced consequence engine.

Device: Mobile portrait ~390×844.

Screen type: OPERATIONAL. Step 3/5.

Screen purpose: Coiffeuse chooses service level, then assigns each of 3–5 prefilled tasks to STYLIST or CLIENT. Optional short note if owner is client.

Layout:
- Header + BROUILLON badge
- Stepper step 3
- Two large choice cards for service level
- Task list with owner toggle per row (Styliste / Cliente)
- Optional short note field when a task is owned by cliente
- Sticky CTA Continuer (enabled when level chosen + every task has an owner)

French UI text:
- Title: « Niveau de service & tâches »
- Intro: « Clarifiez qui fait quoi. Une cliente doit comprendre le modèle avant de demander. »
- Service level:
  1) « Service complet » — « Vous prenez en charge l’essentiel de A à Z. »
  2) « Service assisté » — « La cliente réalise certaines tâches (ex. apport des mèches). »
- Tasks section: « Répartition des tâches »
  Sample tasks:
  1) « Achat des mèches »
  2) « Lavage »
  3) « Pose »
  4) « Finition »
  5) « Entretien conseillé »
- Owner labels: « Styliste » / « Cliente »
- Optional note label: « Consigne courte (si cliente) »
- Placeholder: « Ex. Apporter 3 paquets de mèches pré-étirées… »
- CTA: « Continuer »

Interactions: Single-select service level; per-task owner toggle; optional note; CTA gated.

Visual: Optional calm image of Black woman stylist with textured hair working with a client on a braid install — collaborative studio mood. Any photos, illustrations, avatars, or portfolio images must depict Black and/or mixed-race women with coily, curly, or textured hair (Afro hair: braids, twists/vanilles, ponytails, locs, natural coils). Premium, realistic, respectful representation. No straight Eurocentric hair as the default visual.

Design system Atelier Synergy. All visible UI text in French.
```

---

## Prompt — S05 — Prix + durée + suppléments

**Type :** Opérationnel  
**Acteur :** Coiffeuse  
**Moment du récit :** T3  
**Objectif :** Fixer prix de base, durée, 0–2 suppléments ; aperçu devis simple

### Prompt Stitch

```text
Product context: Atelier Synergy MVP — Professional Capacity pricing. Declarative only — no real payment, no PSP, no card fields, no “target net revenue”.

Device: Mobile portrait ~390×844.

Screen type: OPERATIONAL. Step 4/5.

Screen purpose: Coiffeuse sets base price (EUR), estimated duration (minutes), and 0–2 supplements (label + amount). Show a simple client quote preview.

Layout:
- Header + BROUILLON
- Stepper step 4
- Price input + duration input
- Supplements section (add up to 2)
- Live « Aperçu devis » summary block
- Sticky CTA Continuer (needs price > 0 and duration > 0)

French UI text:
- Title: « Prix, durée & suppléments »
- Intro: « Ces infos serviront d’aperçu pour les clientes. Aucun paiement ici. »
- « Prix de base (€) » placeholder: « 180 »
- « Durée estimée (min) » placeholder: « 240 »
- Supplements title: « Suppléments (0 à 2) »
- Add supplement: « Ajouter un supplément »
- Supplement fields: « Libellé » / « Montant (€) »
- Sample supplement: « Densité supplémentaire » — « 25 »
- Preview title: « Aperçu devis »
- Preview lines: Prestation · Variante · Prix de base · Suppléments · Durée · Total indicatif
- Helper: « Maximum 2 suppléments. »
- CTA: « Continuer »

Interactions: Numeric inputs; add/remove up to 2 supplements; CTA gated on price > 0 and duration > 0. No payment UI.

Visual: Optional editorial close-up of finished protective style on Black woman with textured hair — portfolio pricing mood, not shopping cart. Any photos, illustrations, avatars, or portfolio images must depict Black and/or mixed-race women with coily, curly, or textured hair (Afro hair: braids, twists/vanilles, ponytails, locs, natural coils). Premium, realistic, respectful representation. No straight Eurocentric hair as the default visual.

Design system Atelier Synergy. JetBrains Mono for amounts and duration. All visible UI text in French.
```

---

## Prompt — S06 — Lieu + disponibilités + volume

**Type :** Opérationnel  
**Acteur :** Coiffeuse  
**Moment du récit :** T4  
**Objectif :** Situer la capacité dans le temps et l’espace (1 lieu, dispos, volumes)

### Prompt Stitch

```text
Product context: Atelier Synergy MVP — Professional Capacity placement: one execution context, simplified weekly availability, capacity max + desired demand volume. No multi-location conflict engine.

Device: Mobile portrait ~390×844.

Screen type: OPERATIONAL. Step 5/5.

Screen purpose: Coiffeuse picks one place context, sets simplified availability (days + slots), capacity max, and desired demand volume.

Layout:
- Header + BROUILLON
- Stepper step 5
- Single-select location cards (3 options)
- Availability: day chips + slot chips
- Two numeric fields: capacité max + volume souhaité
- Sticky CTA « Voir le récapitulatif » (gated: 1 lieu + ≥1 day/slot + both numbers ≥ 1)

French UI text:
- Title: « Lieu, disponibilités & volume »
- Intro: « Indiquez où et quand cette prestation est réalisable, et combien de demandes vous souhaitez. »
- Location: « Contexte d’exécution »
  1) « Chez moi » — « Espace personnel / studio à domicile »
  2) « En salon » — « Espace professionnel partenaire »
  3) « Déplacement » — « Je me rends chez la cliente »
- Availability: « Disponibilités »
  - Days: Lun Mar Mer Jeu Ven Sam Dim
  - Slots sample: « 09:00–13:00 » / « 14:00–18:00 »
- « Capacité max » helper: « Ex. RDV par jour »
- « Volume de demandes souhaité » helper: « Combien de demandes vous aimeriez recevoir »
- Placeholders: capacité « 2 » · volume « 6 »
- CTA: « Voir le récapitulatif »

Interactions: Single location; multi-select days and slots; numeric fields; CTA gated.

Visual: Optional calm image of home studio or salon with Black woman stylist and textured Afro hair client context. Any photos, illustrations, avatars, or portfolio images must depict Black and/or mixed-race women with coily, curly, or textured hair (Afro hair: braids, twists/vanilles, ponytails, locs, natural coils). Premium, realistic, respectful representation. No straight Eurocentric hair as the default visual.

Design system Atelier Synergy. All visible UI text in French.
```

---

## Prompt — S07 — Récapitulatif + Activer

**Type :** Opérationnel  
**Acteur :** Coiffeuse  
**Moment du récit :** T5  
**Objectif :** Valider explicitement et activer (`CAPACITY_OPEN`)

### Prompt Stitch

```text
Product context: Atelier Synergy MVP — Professional Capacity activation. No operator review, no verification report, no IN_REVIEW. Explicit stylist confirmation required. Instant CAPACITY_OPEN.

Device: Mobile portrait ~390×844.

Screen type: OPERATIONAL summary + activation.

Screen purpose: Show a clear French summary of prestation, variante, gallery count + proof labels, service level + tasks, pricing, location/availability/volume, plus inherited framework mention. Coiffeuse confirms and activates. Must NOT look like “request sent for review”.

Layout:
- Header « Récapitulatif »
- Badge « BROUILLON »
- Read-only banner: « Cadre professionnel actif — hérité »
- Scrollable summary sections with « Modifier » text links
- Small gallery thumbnails (sharp corners)
- Confirmation checkbox
- Sticky primary CTA « Activer ma capacité »
- Secondary ghost « Revenir »

French UI text:
- Title: « Vérifiez votre capacité »
- Intro: « Une fois activée, cette prestation sera disponible pour recevoir des demandes. »
- Banner: « Cadre professionnel actif — hérité »
- Sections: « Prestation » · « Galerie » · « Service & tâches » · « Prix & durée » · « Lieu & disponibilités »
- Sample filled values: Knotless braids · Medium · Waist · 2 photos (1 réalisation déclarée, 1 inspiration) · Service assisté · Achat mèches = Cliente · Pose = Styliste · 180 € · 240 min · Densité +25 € · Chez moi · Jeu–Sam · Capacité max 2 · Volume 6
- Checkbox: « Je confirme que cette capacité représente bien ce que je propose »
- CTA: « Activer ma capacité »
- Secondary: « Revenir »
- No « Rapport de vérification », no « Opérateur pilote »

Interactions: CTA disabled until checkbox checked. Modifier links are visual affordances. Activation is instantaneous (CAPACITY_DRAFT → CAPACITY_OPEN). No IN_REVIEW.

Visual: Optional small avatar or gallery thumbs of Black women with textured Afro hair in the selected style. Any photos, illustrations, avatars, or portfolio images must depict Black and/or mixed-race women with coily, curly, or textured hair (Afro hair: braids, twists/vanilles, ponytails, locs, natural coils). Premium, realistic, respectful representation. No straight Eurocentric hair as the default visual.

Design system Atelier Synergy. Status labels JetBrains Mono. All visible UI text in French.
```

---

## Prompt — S08 — Succès — Capacité ouverte

**Type :** Opérationnel  
**Acteur :** Coiffeuse  
**Moment du récit :** Fin — `CAPACITY_OPEN`  
**Objectif :** Preuve tangible pour la démo

### Prompt Stitch

```text
Product context: Atelier Synergy MVP — success confirmation after Professional Capacity activation.

Device: Mobile portrait ~390×844. Mostly non-scrolling short screen OK.

Screen type: OPERATIONAL success / confirmation (not a form).

Screen purpose: Celebrate activation. Show status CAPACITY_OPEN clearly. Summarize the opened capacity in one line. Offer next demo actions (view list / view capacity). No operator, no review pending.

Layout:
- Minimal header
- Large success mark / calm illustration
- Status badge « OUVERTE » / JetBrains Mono code « CAPACITY_OPEN »
- One-line capacity summary
- Short confirmation copy
- Primary CTA « Voir mes capacités »
- Secondary « Voir le détail »

French UI text:
- Headline: « Votre capacité est ouverte »
- Body: « Votre prestation est maintenant disponible. Vous pouvez recevoir des demandes sur cette configuration. »
- Badge: « OUVERTE »
- Mono line: « CAPACITY_OPEN »
- Summary example: « Knotless braids — Medium — 180 € — Chez moi — Capacité ouverte »
- Primary CTA: « Voir mes capacités »
- Secondary: « Voir le détail »

Interactions: Two CTAs only.

Visual: Joyful but premium moment — Black woman stylist with textured Afro hair in professional setting, subtle celebration, not cartoonish. Any photos, illustrations, avatars, or portfolio images must depict Black and/or mixed-race women with coily, curly, or textured hair (Afro hair: braids, twists/vanilles, ponytails, locs, natural coils). Premium, realistic, respectful representation. No straight Eurocentric hair as the default visual.

Design system Atelier Synergy. All visible UI text in French.
```

---

## Prompt — S09 — Liste de mes capacités

**Type :** Opérationnel  
**Acteur :** Coiffeuse  
**Moment du récit :** Après activation (bonus démo P1)  
**Objectif :** Revoir les capacités OPEN (et DRAFT éventuel) pour la démo

### Prompt Stitch

```text
Product context: Atelier Synergy MVP — list of the stylist’s professional capacities from local mock data. Bonus demo screen (P1). Happy path only: show OPEN and maybe DRAFT. Optional minimal “Fermer” → CAPACITY_CLOSED without workflow. No operator, no IN_REVIEW filters.

Device: Mobile portrait ~390×844.

Screen type: OPERATIONAL list / hub (not a long form).

Screen purpose: Coiffeuse reviews capacities she opened. Each row shows prestation, variante, price, place, status badge. Primary action to open a new capacity; tap row for detail (visual only OK).

Layout:
- Sticky header « Mes capacités »
- Optional inherited note: cadre pro ACTIVE
- Primary FAB or top CTA « Nouvelle capacité »
- Vertical list of capacity rows (not dense dashboard cards spam — clean list rows)
- Status chips JetBrains Mono: OUVERTE / BROUILLON
- Empty state if none
- Optional overflow on OPEN row: « Fermer la capacité » (instant CAPACITY_CLOSED, no confirmation workflow required for MVP demo)

French UI text:
- Header: « Mes capacités »
- Intro: « Prestations que vous avez rendues disponibles. »
- CTA: « Nouvelle capacité »
- Row sample:
  - Title: « Knotless braids »
  - Meta: « Medium · Waist · 180 € · Chez moi »
  - Badge: « OUVERTE »
  - Mono: « CAPACITY_OPEN »
- Second sample (optional): « Vanilles / twists » · « BROUILLON »
- Empty: « Aucune capacité pour l’instant. Ouvrez-en une pour recevoir des demandes. »
- Overflow: « Fermer la capacité »
- Closed badge if shown: « FERMÉE » / « CAPACITY_CLOSED »

Interactions: Nouvelle capacité; tap row; optional Fermer on OPEN. No auth, no filters for review states.

Visual: Optional thumbnail per row — Black woman with textured Afro hair wearing that style. Any photos, illustrations, avatars, or portfolio images must depict Black and/or mixed-race women with coily, curly, or textured hair (Afro hair: braids, twists/vanilles, ponytails, locs, natural coils). Premium, realistic, respectful representation. No straight Eurocentric hair as the default visual.

Design system Atelier Synergy. Manrope + JetBrains Mono badges. Charcoal/gold, light surfaces. No purple, no glow, no dark mode. All visible UI text in French.
```
