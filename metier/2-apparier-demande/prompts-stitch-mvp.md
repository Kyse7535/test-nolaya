# Prompts Stitch MVP — Apparier et distribuer

> Source : `domain-storytelling-etape-2-mvp.md`  
> Device : Mobile (≈390×844)  
> Prompt language : English  
> UI text language : French  
> Design system : Atelier Synergy  
> Visual identity : Afro / textured hair — Black & mixed-race women  
> Scope : Happy path only (wave 1 + accept exact → shortlist) — no élargissement, no operator decisions, no firm offer, no booking

---

## Cartographie des écrans

| ID | Écran | Type | Acteur | Étape / moment du récit | Priorité |
| -- | ----- | ---- | ------ | ----------------------- | -------- |
| S01 | Accueil explicatif — Appariement | Explicatif | Cliente | T0 — Entrée | P0 |
| S02 | Matching lancé (vue cliente) | Opérationnel | Cliente | T1 | P0 |
| S03 | Campagne / vivier (auto-prerempli) | Opérationnel | Système / vue campagne | T1–T3 | P0 |
| S04 | Invitation à une prestation (coiffeuse) | Opérationnel | Coiffeuse | T4 | P0 |
| S05 | Suivi des réponses — vague 1 | Opérationnel | Cliente | T4–T5 | P0 |
| S06 | Shortlist READY + handoff étape 3 | Opérationnel | Cliente | Fin `SHORTLIST_READY` / `RESPONSES_TO_CONVERT` | P0 |

**Hors MVP (ne pas générer) :** élargissement de recherche, vague 2+, accept+mod, info nécessaire, indisponible (sauf stub grisé), décisions opérateur, scoring IA, `NO_ELIGIBLE`, `NO_RESPONSE`, offre ferme, réservation, paiement.

---

## Prompt — S01 — Accueil explicatif — Appariement

**Type :** Explicatif  
**Acteur :** Cliente  
**Moment du récit :** T0 — Entrée (`DEMAND_QUALIFIED`)  
**Objectif :** Orienter avant le lancement de campagne

### Prompt Stitch

```text
Product context: Atelier Synergy — premium B2B2C mobile platform for Afro / textured hair (braids, twists/vanilles, ponytails, locs, natural coils). MVP demo: matching / distribution happy path only. Input: DEMAND_QUALIFIED. Output later: shortlist of exact acceptances. No firm offer, no booking, no payment. No human operator decisions.

Device: Mobile app screen only, portrait ~390×844. Scrollable. No desktop.

Screen type: EXPLICATIVE entry / orientation (NOT a form). No input fields, toggles, or operational lists.

Screen purpose: Client with a qualified demand learns what matching does: freeze the demand, invite open capacities (wave 1), collect provisional exact acceptances until a threshold, then shortlist for firm offers (étape 3 — not here).

Layout:
1) Sticky header: back + title « Appariement »
2) Status badge JetBrains Mono uppercase: « DEMANDE QUALIFIÉE »
3) Welcome headline + short pedagogical paragraph
4) Full-bleed hero with short overlay intention
5) Section « Ce qui va se passer » — 4 pillar blocks (icon + title + 1–2 sentences)
6) Soft note: vivier auto-selected; no operator pilot in this demo
7) Single primary sticky CTA

French UI text:
- Header: « Appariement »
- Badge: « DEMANDE QUALIFIÉE »
- Headline: « Trouver des coiffeuses disponibles »
- Body: « Votre demande qualifiée va être proposée à des capacités ouvertes. Les coiffeuses répondent par une acceptation provisoire. Quand assez de réponses exactes arrivent, une shortlist est prête pour les offres fermes. »
- Hero overlay: « Inviter. Répondre. Shortlister. »
- Pillars title: « Ce qui va se passer »
  1) « Campagne » — « Votre demande figée ouvre une campagne avec un seuil de réponses. »
  2) « Vivier » — « Des capacités éligibles sont préremplies automatiquement. »
  3) « Vague 1 » — « 2 à 3 coiffeuses reçoivent une invitation. »
  4) « Shortlist » — « Les acceptations exactes forment la liste pour l’étape suivante. »
- Note: « Pas d’élargissement ni de décision opérateur dans cette démo. »
- CTA: « Lancer le matching »

Interactions: Only CTA « Lancer le matching ».

Visual: Hero of Black and/or mixed-race women with coily/curly/textured Afro hair — client side calm confidence + stylist craft implied, premium studio mood. Realistic, respectful. No straight Eurocentric hair as default.

Design system Atelier Synergy: Manrope UI, JetBrains Mono for badges. Charcoal #000000 / #1b1c1c, soft gold #775a19 / #fed488 sparingly, surfaces #fbf9f8 / #ffffff / #efeded. Soft 0.25rem radii; hero media sharper OK. No purple gradients, no neon glow, no emoji, no dark mode, no heavy multi-shadows.

Quality bar: Premium enterprise mobile UI, calm editorial whitespace, accessible touch targets. All visible UI text in French.
```

---

## Prompt — S02 — Matching lancé (vue cliente)

**Type :** Opérationnel  
**Acteur :** Cliente  
**Moment du récit :** T1  
**Objectif :** Feedback immédiat post-qualification / post-lancement

### Prompt Stitch

```text
Product context: Atelier Synergy MVP — matching launched confirmation for the client. Campaign auto-created: mode résultat, threshold = 2 exact acceptances, wave 1 invitations to 3 stylists.

Device: Mobile portrait ~390×844 only.

Screen type: OPERATIONAL status / progress (not a dense dashboard).

Screen purpose: Client sees that matching has started on her frozen DEMAND_QUALIFIED. Show campaign status CAMPAIGN_OPEN, wave 1 in progress, threshold target, and what happens next. No operator controls.

Layout:
- Header back + « Matching »
- Badge « CAMPAGNE OUVERTE » / mono « CAMPAIGN_OPEN »
- Compact demand recap card (read-only): result, budget max, zone
- Progress block: invitations sent 3/3 · acceptances 0/2 (threshold)
- Timeline / storyline: Campagne créée → Invitations envoyées → En attente de réponses
- Soft note about provisional answers (not a booking)
- Primary CTA « Voir le suivi »
- Secondary ghost « Voir ma demande »

French UI text:
- Title: « Matching lancé »
- Headline: « Votre demande a été envoyée »
- Body: « 3 coiffeuses ont reçu une invitation pour votre Knotless medium. Il faut 2 acceptations exactes pour constituer la shortlist. »
- Recap labels: « Résultat » · « Budget max » · « Zone » — values: Knotless medium · 120 € · 15 km
- Progress: « Invitations » « 3 envoyées » · « Seuil » « 0 / 2 acceptations »
- Timeline steps:
  1) « Campagne créée » — done
  2) « Vague 1 envoyée » — done
  3) « Réponses en cours » — active
- Note: « Une acceptation est provisoire : ce n’est pas encore une réservation. »
- Primary CTA: « Voir le suivi »
- Secondary: « Voir ma demande »

Interactions: Two CTAs; no edit of vivier; no launch/stop campaign buttons for client.

Visual: Optional small collage of 3 stylist avatar thumbnails — Black women with textured Afro hair / braids. Premium realistic.

Design system Atelier Synergy. JetBrains Mono for status codes and counters. All visible UI text in French.
```

---

## Prompt — S03 — Campagne / vivier (auto-prerempli)

**Type :** Opérationnel  
**Acteur :** Système (vue campagne simplifiée — coiffeuse overview OR system view)  
**Moment du récit :** T1–T3  
**Objectif :** Montrer campagne + vivier + vague 1 précalculés, sans décisions opérateur

### Prompt Stitch

```text
Product context: Atelier Synergy MVP — campaign / eligible pool overview. AUTO-PREFILLED. NO operator decisions, NO manual selection, NO élargissement controls. Read-mostly system or stylist-facing campaign overview simplified for demo.

Device: Mobile portrait ~390×844.

Screen type: OPERATIONAL read-only campaign overview (not an admin console).

Screen purpose: Show CAMPAIGN_OPEN for a frozen demand: mode « résultat », threshold 2, mock delay, eligible pool of ~6 capacities, wave 1 inviting 3. All precomputed. User can only observe and continue to invitations / follow-up.

Layout:
- Header « Campagne de matching »
- Badge « OUVERTE » + mono « CAMPAIGN_OPEN »
- Demand snapshot strip (read-only)
- Campaign parameters row: mode, seuil, délai mock — display only, not editable
- Section « Vivier éligible » — list of 6 stylist/capacity rows (name, style focus, distance, CAPACITY_OPEN badge)
- Subsection highlight « Vague 1 (3 invitations) » — 3 of the 6 marked as invited
- Remaining 3 shown as « En réserve » (not invited yet) — NO “élargir” CTA
- Sticky CTA « Continuer vers les invitations » or « Voir le suivi des réponses »
- Soft note: sélection automatique

French UI text:
- Title: « Campagne »
- Intro: « Vivier et vague 1 préremplis automatiquement pour la démo. »
- Params:
  - « Mode » — « Résultat »
  - « Seuil » — « 2 acceptations exactes »
  - « Délai indicatif » — « 24 h (mock) »
- Vivier title: « Vivier éligible (6) »
- Row example fields: « Awa D. » · « Knotless · braids » · « 4 km » · badge « OPEN »
- Vague 1 label: « Vague 1 — invitée »
- Reserve label: « En réserve »
- Note: « Aucune décision opérateur. Pas d’élargissement dans ce parcours. »
- CTA: « Voir le suivi des réponses »

Interactions: Scroll list; rows not selectable for invite/uninvite; no checkboxes to edit pool; no “Élargir la recherche” button. CTA navigates forward only.

Visual: Stylist rows use avatars of Black and/or mixed-race women with coily/curly/textured Afro hair (braids, twists/vanilles, ponytails, locs). Premium respectful. No straight Eurocentric hair as default.

Design system Atelier Synergy: Manrope + JetBrains Mono badges, charcoal/gold, light surfaces, soft radii, sharp media. No purple, no neon, no emoji, no dense enterprise dashboard chrome. All visible UI text in French.
```

---

## Prompt — S04 — Invitation à une prestation (coiffeuse)

**Type :** Opérationnel  
**Acteur :** Coiffeuse  
**Moment du récit :** T4  
**Objectif :** Voir l’invitation et accepter exactement (autres réponses masquées / désactivées)

### Prompt Stitch

```text
Product context: Atelier Synergy MVP — stylist invitation to a client demand. Happy path: ACCEPT EXACT only. Hide or disable modify / info-needed / unavailable responses for this demo. Linked to CAPACITY_OPEN + frozen demand. No firm offer yet.

Device: Mobile portrait ~390×844.

Screen type: OPERATIONAL decision screen for Coiffeuse.

Screen purpose: Coiffeuse opens « Nouvelle invitation », reviews demand essentials (result, time window, budget max, zone/mobility, service level, priority), sees her matching capacity summary, and can primarily Accept exactly. Other response types are disabled or hidden.

Layout:
- Header back + « Nouvelle invitation »
- Badge « INVITATION » / mono « ENVOYÉE »
- Client demand summary (read-only sections)
- Capacity link line: which open capacity this invite targets
- Primary sticky CTA « Accepter »
- Secondary responses: either hidden OR shown disabled with helper « Indisponible dans la démo »
- No chat, no price negotiation fields

French UI text:
- Title: « Nouvelle invitation »
- Intro: « Une cliente vous propose une prestation alignée avec votre capacité ouverte. »
- Sections:
  - « Résultat » — Knotless medium
  - « Quand » — Samedi préféré · échéance sous 10 jours
  - « Budget max » — 120 € · mèches incluses
  - « Zone » — 15 km · déplacement possible
  - « Service » — Assisté
  - « Priorité cliente » — Résultat
- Capacity line: « Capacité liée » — « Knotless · samedi · CAPACITY_OPEN »
- Primary CTA: « Accepter »
- Helper under CTA: « Acceptation exacte provisoire — pas encore d’engagement ferme. »
- Disabled/hidden alternatives (if shown as disabled stubs):
  - « Accepter avec modification » — disabled
  - « Demander une info » — disabled
  - « Indisponible » — disabled
- Note: « Seule l’acceptation exacte est active dans cette démo. »

Interactions: Primary Accept enabled; other response types disabled or not rendered; back allowed. On accept → provisional ACCEPT_EXACT recorded.

Visual: Top editorial image or avatar of Black woman stylist with textured Afro hair; optional small client style reference (knotless) on Black woman with textured hair. Premium realistic. No straight Eurocentric hair as default.

Design system Atelier Synergy. JetBrains Mono for status. Charcoal primary button for Accepter. All visible UI text in French.
```

---

## Prompt — S05 — Suivi des réponses — vague 1

**Type :** Opérationnel  
**Acteur :** Cliente  
**Moment du récit :** T4–T5  
**Objectif :** Suivre vague 1 uniquement (pas de vague 2 / élargissement)

### Prompt Stitch

```text
Product context: Atelier Synergy MVP — client follow-up of wave 1 invitation responses. Happy path mid/late state: 2 of 3 accepted exact, threshold nearly or just reached. NO wave 2 section, NO élargissement CTA.

Device: Mobile portrait ~390×844.

Screen type: OPERATIONAL tracking list.

Screen purpose: Show Vague 1 invitations with response states. Emphasize ACCEPT_EXACT progress toward threshold (2). Keep UI calm — not a campaign admin tool.

Layout:
- Header « Suivi des réponses »
- Badge « VAGUE 1 »
- Progress summary: « 2 / 2 acceptations » or « 2 / 2 — seuil atteint » with mono counters
- List of 3 invitation rows: stylist name/avatar, capacity tag, status badge
- Statuses used in MVP: « Acceptée » (ACCEPT_EXACT), « En attente », optionally one still pending
- Soft success note when threshold reached
- Primary CTA « Voir la shortlist » (enabled when threshold met)
- Secondary « Rafraîchir » visual only
- Explicitly omit any « Vague 2 » or « Élargir » blocks

French UI text:
- Title: « Suivi des invitations »
- Intro: « Vague 1 — réponses provisoires des coiffeuses. »
- Progress: « Seuil » « 2 / 2 acceptations exactes »
- Row 1: « Awa D. » · « Knotless » · badge « ACCEPTÉE »
- Row 2: « Mariam K. » · « Braids / twists » · badge « ACCEPTÉE »
- Row 3: « Fatou B. » · « Vanilles » · badge « EN ATTENTE »
- Note: « 2 acceptations exactes suffisent pour constituer la shortlist. »
- Primary CTA: « Voir la shortlist »
- No labels for Vague 2 / Élargissement

Interactions: Rows tappable for detail optional; CTA enabled at threshold; no expand-search actions.

Visual: Avatars of Black women stylists with textured Afro hair / protective styles. Premium respectful.

Design system Atelier Synergy. Uppercase JetBrains Mono status badges. All visible UI text in French.
```

---

## Prompt — S06 — Shortlist READY + handoff étape 3

**Type :** Opérationnel  
**Acteur :** Cliente  
**Moment du récit :** Fin — `SHORTLIST_READY` / `RESPONSES_TO_CONVERT`  
**Objectif :** Preuve de fin de matching + pont vers proposition ferme (étape 3)

### Prompt Stitch

```text
Product context: Atelier Synergy MVP — shortlist ready after wave 1 exact acceptances. End state SHORTLIST_READY / RESPONSES_TO_CONVERT. Handoff to étape 3 (firm offer / faisabilité) without implementing that step here. No booking, no payment.

Device: Mobile portrait ~390×844.

Screen type: OPERATIONAL success + shortlist summary + handoff.

Screen purpose: Prove matching completed: campaign closed on matching side, 2 exact acceptances shortlisted, client can continue to firm proposals. Celebrate calmly and show the two stylists.

Layout:
- Minimal success header
- Status badge « SHORTLIST PRÊTE » + mono « SHORTLIST_READY » / « RESPONSES_TO_CONVERT »
- Short confirmation copy (demo success sentence)
- Shortlist of 2 stylist cards (avatar, name, style, « Acceptation exacte »)
- Compact demand reminder strip
- Primary CTA « Continuer vers l’offre ferme »
- Secondary « Voir le détail des réponses »

French UI text:
- Headline: « Shortlist prête »
- Body: « Votre demande a été envoyée à 3 coiffeuses ; 2 ont accepté — vous pouvez passer aux offres fermes. »
- Badge: « SHORTLIST PRÊTE »
- Mono line: « SHORTLIST_READY · RESPONSES_TO_CONVERT »
- Shortlist title: « Coiffeuses retenues »
  1) « Awa D. » — « Knotless · Acceptation exacte »
  2) « Mariam K. » — « Braids / twists · Acceptation exacte »
- Reminder: « Demande » — Knotless medium · max 120 € · 15 km
- Note: « Prochaine étape : vérifier la faisabilité et former une proposition ferme. Pas de réservation ici. »
- Primary CTA: « Continuer vers l’offre ferme »
- Secondary: « Voir le détail des réponses »

Interactions: Two CTAs only. No invite more, no élargir, no payment.

Visual: Two premium stylist portraits — Black and/or mixed-race women with coily/curly/textured Afro hair (braids, twists/vanilles). Joyful but professional success mood, not cartoonish. No straight Eurocentric hair as default.

Design system Atelier Synergy. JetBrains Mono for lifecycle codes. Charcoal primary CTA, ghost secondary. All visible UI text in French.
```
