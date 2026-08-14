# Prompts Stitch MVP — Qualifier le besoin cliente

> Source : `domain-storytelling-etape-1-mvp.md`  
> Device : Mobile (≈390×844)  
> Prompt language : English  
> UI text language : French  
> Design system : Nolaya  
> Visual identity : Afro / textured hair — Black & mixed-race women  
> Scope : Happy path only (`DEMAND_DRAFT` → `DEMAND_QUALIFIED`) — cliente only, no matching, no stylist, no operator

---

## Cartographie des écrans

| ID | Écran | Type | Acteur | Étape / moment du récit | Priorité |
| -- | ----- | ---- | ------ | ----------------------- | -------- |
| S01 | Accueil explicatif — Qualifier mon besoin | Explicatif | Cliente | T0 — Entrée | P0 |
| S02 | Point d’entrée (prestation connue OU catalogue) | Opérationnel | Cliente | T0 | P0 |
| S03 | Inspirations + variante + contexte | Opérationnel | Cliente | T1 | P0 |
| S04 | Temps + budget | Opérationnel | Cliente | T2–T3 | P0 |
| S05 | Zone / mobilité / lieux acceptés | Opérationnel | Cliente | T4 | P0 |
| S06 | Protection + niveau de service + tâches + priorité | Opérationnel | Cliente | T5 | P0 |
| S07 | Résumé de ma demande | Opérationnel | Cliente | T6 | P0 |
| S08 | Succès — DEMAND_QUALIFIED | Opérationnel | Cliente | Fin `DEMAND_QUALIFIED` | P0 |

**Hors MVP (ne pas générer) :** clarification loops, opérateur, `DEMAND_WITHDRAWN`, matching, réservation, diagnostic médical, questionnaire ultra-adaptatif.

---

## Prompt — S01 — Accueil explicatif — Qualifier mon besoin

**Type :** Explicatif  
**Acteur :** Cliente  
**Moment du récit :** T0 — Entrée (`DEMAND_DRAFT`)  
**Objectif :** Orienter avant toute saisie

### Prompt Stitch

```text
Product context: Nolaya — premium B2B2C mobile platform for Afro / textured hair services (braids, twists/vanilles, ponytails, locs, natural coils). MVP demo flow: client demand qualification happy path only (DEMAND_DRAFT → DEMAND_QUALIFIED). No matching, no stylist, no operator, no booking.

Device: Mobile app screen only, portrait ~390×844. Scrollable. No desktop.

Screen type: EXPLICATIVE entry / orientation (NOT a form). No input fields, toggles, or operational lists.

Screen purpose: A Black woman client opens a new demand draft. Explain that this step turns a vague need into a structured request she will validate — result, time, budget, zone, protection, service level. Status: DEMAND_DRAFT / BROUILLON.

Layout:
1) Sticky header: back + title « Qualifier mon besoin »
2) Status badge JetBrains Mono uppercase: « BROUILLON »
3) Welcome headline + short pedagogical paragraph
4) Full-bleed hero with short overlay intention
5) Section « Ce que vous allez préciser » — 5 pillar blocks (icon + title + 1–2 sentences)
6) Soft note: no matching yet; validation comes at the end
7) Single primary sticky CTA

French UI text:
- Header: « Qualifier mon besoin »
- Badge: « BROUILLON »
- Headline: « Décrivez ce que vous voulez, clairement »
- Body: « Transformez une envie floue en demande structurée : résultat, délais, budget, zone et niveau de service. Une fois validée, votre demande sera prête pour trouver des coiffeuses — pas encore ici. »
- Hero overlay: « Une demande claire, des réponses utiles. »
- Pillars title: « Ce que vous allez préciser »
  1) « Résultat » — « Inspiration ou prestation, variante et contexte (mariage, quotidien…). »
  2) « Temps » — « Date préférée et dernière échéance acceptable. »
  3) « Budget » — « Cible, maximum et si les mèches sont incluses. »
  4) « Zone » — « Rayon, mobilité et lieux d’accueil acceptés. »
  5) « Service & priorité » — « Protection, niveau de service, tâches et priorité de recherche. »
- Note: « Aucun matching ni réservation dans cette étape. Vous validez votre demande à la fin. »
- CTA: « Commencer ma demande »

Interactions: Only CTA « Commencer ma demande ».

Visual: Hero of a Black and/or mixed-race woman client with coily/curly/textured Afro hair (braids, twists/vanilles, ponytails, locs, or natural coils) consulting style inspiration on her phone in a calm premium setting. Realistic, respectful. No straight Eurocentric hair as default.

Design system Nolaya: Manrope UI, JetBrains Mono for badges. Charcoal #000000 / #1b1c1c, soft gold #775a19 / #fed488 sparingly, surfaces #fbf9f8 / #ffffff / #efeded. Soft 0.25rem radii; hero media sharper OK. No purple gradients, no neon glow, no emoji, no dark mode, no heavy multi-shadows.

Quality bar: Premium enterprise mobile UI, calm editorial whitespace, accessible touch targets. All visible UI text in French.
```

---

## Prompt — S02 — Point d’entrée (prestation connue OU catalogue)

**Type :** Opérationnel  
**Acteur :** Cliente  
**Moment du récit :** T0  
**Objectif :** Choisir comment démarrer la qualification

### Prompt Stitch

```text
Product context: Nolaya MVP — client demand qualification for Afro / textured hair. Happy path only. Cliente actor only.

Device: Mobile portrait ~390×844 only.

Screen type: OPERATIONAL choice step (not a long form).

Screen purpose: Client picks how to start: she already knows the prestation/result, OR she wants to browse the inspiration catalog. Status DEMAND_DRAFT. Step 1 of guided flow. Creates / continues QUALIFICATION_IN_PROGRESS mentally.

Layout:
- Header back + « Qualifier mon besoin »
- Badge « BROUILLON »
- Vertical storyline stepper: 1 Entrée · 2 Résultat · 3 Temps & budget · 4 Zone · 5 Service · 6 Résumé (step 1 active, soft-gold marker)
- Short intro
- Two large selectable path cards (not pill spam)
- Soft helper that both paths lead to a structured demand
- Sticky CTA « Continuer » (disabled until one path selected)

French UI text:
- Title: « Comment démarrer ? »
- Intro: « Choisissez le point d’entrée le plus simple pour vous. »
- Path A title: « Je connais déjà la prestation »
- Path A body: « Knotless, vanilles, twists… Je sais ce que je veux et je précise ensuite. »
- Path B title: « Je parcours le catalogue »
- Path B body: « Je m’inspire d’images de styles afro pour choisir un résultat. »
- Helper: « Les deux chemins aboutissent à la même demande structurée. »
- CTA: « Continuer »

Interactions: Single-select one path; CTA gated; back allowed.

Visual: Optional small editorial diptych feel — Black women with textured Afro hair showing finished protective styles (knotless braids, vanilles). Premium realistic. No straight Eurocentric hair as default.

Design system Nolaya: Manrope + JetBrains Mono, charcoal/gold, light surfaces, soft radii, no clutter. All visible UI text in French.
```

---

## Prompt — S03 — Inspirations + variante + contexte

**Type :** Opérationnel  
**Acteur :** Cliente  
**Moment du récit :** T1  
**Objectif :** Choisir résultat / inspiration + variante + contexte occasion

### Prompt Stitch

```text
Product context: Nolaya MVP — client demand qualification. Catalog of Afro hair inspirations (knotless, vanilles, twists…). No matching.

Device: Mobile portrait ~390×844.

Screen type: OPERATIONAL. Step 2 of flow.

Screen purpose: Client selects a result/inspiration from a Pinterest-like catalog grid, then sets a simple variant (length/size) and optional occasion context. Required: one result selected.

Layout:
- Header + badge BROUILLON
- Stepper step 2 active (Résultat)
- Section « Inspirations » — masonry / 2-column image grid of styles
- Selected card shows clear selected state (charcoal border / soft-gold accent)
- Section « Variante » — short choice chips or radio rows (longueur / taille)
- Section « Contexte » — optional occasion chips
- Sticky CTA « Continuer » (enabled when ≥1 inspiration selected + variante answered)

French UI text:
- Title: « Votre résultat »
- Intro: « Choisissez le style qui correspond à ce que vous voulez obtenir. »
- Catalog labels (examples): « Knotless medium » · « Vanilles » · « Twists » · « Ponytail » · « Locs » · « Natural curls »
- Badge on popular item: « POPULAIRE »
- Variante title: « Variante »
  - « Court / small »
  - « Medium »
  - « Long / XL »
- Contexte title: « Contexte (optionnel) »
  - « Quotidien »
  - « Mariage / cérémonie »
  - « Événement »
  - « Transition / protection »
- Helper: « Une seule inspiration principale pour cette démo. »
- Sample preselection feel: Knotless medium selected
- CTA: « Continuer »

Interactions: Single-select inspiration; single variante; multi or single optional contexte; CTA gated on inspiration + variante.

Visual: Grid must show Black and/or mixed-race women with coily/curly/textured Afro hair — braids, twists/vanilles, ponytails, locs, natural coils. Sharp corners on portfolio media (0px). Premium, realistic, respectful. No straight Eurocentric hair as default.

Design system Nolaya. All visible UI text in French.
```

---

## Prompt — S04 — Temps + budget

**Type :** Opérationnel  
**Acteur :** Cliente  
**Moment du récit :** T2–T3  
**Objectif :** Cadre temporel + budget (cible, max, mèches)

### Prompt Stitch

```text
Product context: Nolaya MVP — client demand qualification. Time + budget on one screen. No payment processing.

Device: Mobile portrait ~390×844.

Screen type: OPERATIONAL. Step 3 of flow.

Screen purpose: Client sets preferred date, latest acceptable deadline, budget target, budget max, and whether hair extensions/mèches are included in the budget. Validation: max budget > 0; at least preferred date OR deadline.

Layout:
- Header + BROUILLON
- Stepper step 3 active (Temps & budget)
- Section Temps: two date fields / selectors
- Section Budget: target + max amount fields + mèches inclusion choice
- Soft note: indicative amounts, not a quote
- Sticky CTA Continuer (gated)

French UI text:
- Title: « Temps & budget »
- Temps intro: « Quand souhaitez-vous la prestation ? »
- Label: « Date préférée »
- Placeholder date: « Choisir une date »
- Label: « Dernière échéance acceptable »
- Helper temps: « Indiquez au moins une date préférée ou une échéance. »
- Budget intro: « Combien êtes-vous prête à investir ? »
- Label: « Budget cible » — placeholder « Ex. 100 »
- Label: « Budget maximum » — placeholder « Ex. 120 »
- Suffix: « € »
- Mèches title: « Les mèches / extensions »
  - « Incluses dans mon budget »
  - « En plus de mon budget »
  - « Je ne sais pas encore »
- Note: « Ce n’est pas un devis. Les coiffeuses répondront ensuite dans ce cadre. »
- Sample filled: samedi préféré, max 120 €, cible 100 €, mèches incluses
- CTA: « Continuer »

Interactions: Date pickers; numeric inputs; single choice mèches; CTA disabled until max > 0 and ≥1 time field set.

Visual: Optional calm editorial image of a Black woman with textured Afro hair checking her calendar/phone. Premium respectful.

Design system Nolaya. JetBrains Mono for amounts/dates if shown as data. All visible UI text in French. No PSP / card fields.
```

---

## Prompt — S05 — Zone / mobilité / lieux acceptés

**Type :** Opérationnel  
**Acteur :** Cliente  
**Moment du récit :** T4  
**Objectif :** Zone géographique, mobilité et lieux d’accueil acceptés (écran critique manquant des HTML actuels)

### Prompt Stitch

```text
Product context: Nolaya MVP — client demand qualification. CRITICAL screen for zone / mobility / accepted places — often missing in current HTML mocks. Cliente only. No address of stylists yet.

Device: Mobile portrait ~390×844.

Screen type: OPERATIONAL. Step 4 of flow.

Screen purpose: Client declares her search zone (indicative city/area from mock profile), acceptable radius, mobility preference, and which place types she accepts (chez moi, chez la coiffeuse, salon). Required for DEMAND_QUALIFIED.

Layout:
- Header + BROUILLON
- Stepper step 4 active (Zone)
- Section « Zone » — read-only or lightly editable city/area + radius selector
- Section « Mobilité » — who travels
- Section « Lieux acceptés » — multi-select place types
- Soft map-like or distance visual optional (simple, not a real map product)
- Sticky CTA Continuer (needs radius OR mobility + ≥1 lieu)

French UI text:
- Title: « Zone & mobilité »
- Intro: « Indiquez où la prestation peut avoir lieu. L’adresse exacte viendra plus tard. »
- Zone label: « Votre zone »
- Sample value: « Paris 18e / nord de Paris » (mock prefilled)
- Radius label: « Rayon de recherche »
- Radius options: « 5 km » · « 10 km » · « 15 km » · « 25 km »
- Sample selected: « 15 km »
- Mobilité title: « Qui se déplace ? »
  - « Je me déplace chez la coiffeuse »
  - « La coiffeuse vient chez moi »
  - « Les deux me conviennent »
- Lieux title: « Lieux acceptés »
  1) « Chez moi »
  2) « Chez la coiffeuse / studio »
  3) « En salon »
- Helper: « Choisissez au moins un lieu accepté. »
- Note: « Pas de matching ici — seulement le cadre géographique de votre demande. »
- CTA: « Continuer »

Interactions: Single radius; single mobility; multi-select lieux; CTA gated; back allowed.

Visual: Optional subtle atmosphere — Black woman with textured Afro hair in an urban/home setting suggesting travel-to-appointment mood. No fake GPS pin spam. Premium realistic. No straight Eurocentric hair as default.

Design system Nolaya: Manrope + JetBrains Mono for km badges, charcoal/gold, light surfaces. Soft radii. No purple, no neon, no emoji clutter. All visible UI text in French.
```

---

## Prompt — S06 — Protection + niveau de service + tâches + priorité

**Type :** Opérationnel  
**Acteur :** Cliente  
**Moment du récit :** T5  
**Objectif :** Protections, niveau de service, tâches associées, priorité de recherche

### Prompt Stitch

```text
Product context: Nolaya MVP — client demand qualification final config before summary. Not a medical diagnosis — short protection list only.

Device: Mobile portrait ~390×844.

Screen type: OPERATIONAL. Step 5 of flow.

Screen purpose: Client selects optional protection notes (short catalog), required service level (complet / assisté) with related tasks, and one search priority (résultat / prix / proximité / disponibilité).

Layout:
- Header + BROUILLON
- Stepper step 5 active (Service)
- Section Protection — multi-select short checklist
- Section Niveau de service — two clear cards + conditional task checklist when « assisté »
- Section Priorité de recherche — single choice (4 options)
- Sticky CTA « Voir le résumé » (needs service level + priority)

French UI text:
- Title: « Protection & service »
- Protection intro: « Signalez ce qui doit être pris en compte (information, pas un diagnostic). »
- Protection options:
  - « Cuir chevelu sensible »
  - « Cheveux fragilisés / cassants »
  - « Allergie connue (à préciser plus tard) »
  - « Aucune contrainte particulière »
- Service title: « Niveau de service »
  1) « Complet » — « La coiffeuse prend en charge l’ensemble de la prestation. »
  2) « Assisté » — « Vous participez à certaines tâches (préparation, détente…). »
- Tâches title (shown if Assisté): « Tâches que vous acceptez »
  - « Préparation / lavage »
  - « Démêlage »
  - « Apport des mèches »
- Priorité title: « Priorité de recherche » (un seul choix)
  1) « Résultat » — « La fidélité au style prime. »
  2) « Prix » — « Rester dans mon budget max. »
  3) « Proximité » — « Minimiser les déplacements. »
  4) « Disponibilité » — « La date compte le plus. »
- Sample: service assisté, priorité = résultat
- Helper: « La priorité guide le matching plus tard — pas ici. »
- CTA: « Voir le résumé »

Interactions: Protections multi (or exclusive « Aucune »); single service level; tasks if assisté; single priority; CTA gated.

Visual: Optional close-up of protective Afro styling on Black woman with textured hair — calm, clinical-but-warm editorial, not medical. Premium respectful.

Design system Nolaya. All visible UI text in French.
```

---

## Prompt — S07 — Résumé de ma demande

**Type :** Opérationnel  
**Acteur :** Cliente  
**Moment du récit :** T6  
**Objectif :** Revue explicite avant validation `DEMAND_QUALIFIED`

### Prompt Stitch

```text
Product context: Nolaya MVP — client demand summary + explicit confirmation. No operator review. No matching launch on this screen (handoff is next success screen).

Device: Mobile portrait ~390×844.

Screen type: OPERATIONAL summary + confirmation.

Screen purpose: Show a clear French summary of result/variant/context, time, budget, zone/mobility/places, protection, service level/tasks, search priority. Client checks confirmation and validates the demand.

Layout:
- Header « Résumé de ma demande »
- Badge « BROUILLON » or « PRÊTE À VALIDER »
- Scrollable summary sections with « Modifier » text links
- Confirmation checkbox
- Sticky primary CTA « Valider ma demande »
- Secondary ghost « Revenir »

French UI text:
- Title: « Vérifiez votre demande »
- Intro: « Une fois validée, cette demande pourra être envoyée au matching. »
- Sections:
  - « Résultat » — Knotless medium · Longueur medium · Quotidien
  - « Temps » — Samedi préféré · échéance sous 10 jours
  - « Budget » — Cible 100 € · Max 120 € · Mèches incluses
  - « Zone » — Paris 18e · 15 km · Les deux me conviennent · Chez moi + studio
  - « Protection » — Cuir chevelu sensible
  - « Service » — Assisté · Préparation / lavage
  - « Priorité » — Résultat
- Checkbox: « Je confirme que cette demande décrit bien mon besoin »
- CTA: « Valider ma demande »
- Secondary: « Revenir »
- Mono hint (optional footer): « → DEMAND_QUALIFIED »

Interactions: CTA disabled until checkbox checked. Modifier links are visual affordances (return to prior steps). Validation is instantaneous in MVP.

Visual: Optional small avatar of Black woman client with textured Afro hair. No stylist portfolio carousel here.

Design system Nolaya. Status labels JetBrains Mono. Amounts in Mono. All visible UI text in French.
```

---

## Prompt — S08 — Succès — DEMAND_QUALIFIED

**Type :** Opérationnel  
**Acteur :** Cliente  
**Moment du récit :** Fin — `DEMAND_QUALIFIED`  
**Objectif :** Preuve tangible pour la démo + handoff étape 2

### Prompt Stitch

```text
Product context: Nolaya MVP — success confirmation after client demand validation. Handoff toward matching (étape 2) without implementing matching UI here.

Device: Mobile portrait ~390×844. Mostly non-scrolling short screen OK.

Screen type: OPERATIONAL success / confirmation (not a form).

Screen purpose: Celebrate qualification. Show status DEMAND_QUALIFIED. Offer next step toward matching / appariement without booking.

Layout:
- Minimal header
- Large success mark / calm illustration
- Status badge « QUALIFIÉE » / JetBrains Mono code « DEMAND_QUALIFIED »
- Short confirmation copy summarizing what is ready
- Primary CTA « Lancer le matching »
- Secondary « Voir ma demande »

French UI text:
- Headline: « Votre demande est prête »
- Body: « Vous avez décrit le résultat, le budget et la zone. Votre demande peut maintenant être proposée à des coiffeuses disponibles. »
- Badge: « QUALIFIÉE »
- Mono line: « DEMAND_QUALIFIED »
- Recap chips (compact): « Knotless medium » · « Max 120 € » · « 15 km »
- Primary CTA: « Lancer le matching »
- Secondary: « Voir ma demande »

Interactions: Two CTAs only. No further form fields.

Visual: Joyful but premium moment — Black woman client with textured Afro hair smiling after confirming her style choice, subtle celebration, not cartoonish. No straight Eurocentric hair as default.

Design system Nolaya. All visible UI text in French.
```
