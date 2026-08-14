# Prompts Stitch — Démo transactionnelle cible (Sarah / Inès)

> Source : `3-storyboard-cible.md` 
> Contexte métier : `2-exemple-concret.md` 
> Device : Mobile (≈390×844) 
> Prompt language : English 
> UI text language : French 
> Design system : Nolaya (aligné `demo-precurseur/`) 
> Visual identity : Afro / textured hair — Black & mixed-race women 
> Scope : Parcours transactionnel Sarah/Inès — **17 écrans** — Actes A–E · `SCHEDULE_ACTIVE` → `SETTLED` · feedback collecté 
> Hors scope : objet « capacité », `CAPACITY_OPEN`, messagerie libre, auth réelle, PSP réel 
> **Retiré :** CAPACITY_OPEN, « ouvrir une capacité », jargon score opaque

---

## En-tête batch (à coller tel quel dans Stitch)

Ce fichier contient **17 écrans indépendants**. 
Chaque bloc `SCREEN XX` est un prompt autonome. 
Générer **un seul écran par prompt**. 
**Ne pas fusionner** les écrans. 
**Ne pas** produire un diagramme de parcours ni un flow.

---

## Global Stitch instruction (English)

```text
BATCH OF INDEPENDENT SCREENS.

This document contains exactly 17 independent mobile screen prompts for Google Stitch.
For each SCREEN PROMPT block below:
- Generate EXACTLY ONE mobile app screen.
- Do NOT combine multiple screens into one frame.
- Do NOT create a flow diagram, journey map, storyboard collage, or multi-screen mock.
- Do NOT invent sibling screens from other prompts in this file.
- Treat every SCREEN PROMPT as a fully self-contained brief.

Process: generate Screen 01, then Screen 02, … through Screen 17 — one at a time, independently.
```

---

## Design system global (rappel)

| Rôle | Valeur |
| ---- | ------ |
| Primary / charcoal | `#000101` / `#1b1c1c` |
| On-primary | `#ffffff` |
| Accent soft gold | `#775a19` |
| Gold container | `#fdd587` / `#fed488` |
| Background / surfaces | `#fbf9f8`, `#ffffff`, `#f5f3f2`, `#efedec`, `#e9e8e7` |
| Muted / outline | `#444748`, `#747878`, `#c4c7c7` |
| Error | `#ba1a1a` |
| Font UI | **Manrope** |
| Font données / badges / montants | **JetBrains Mono** |
| Radius cards / controls | `0.25rem` |
| Médias portfolio | coins **sharp (0px)** |
| Viewport | max-width phone **390px**, portrait |

### Bandeau démo (permanent)

`Mode démo — Inès est une cliente simulée · Étape X sur 8` (création: Créez votre offre · Étape 1–3)

| Phase | Écrans | Bandeau |
| ----- | ------ | ------- |
| A Offre & planning | 1–5 | Étape 1–3 sur 8 (création) |
| B Demandes & proposition | 6–9 | Étape 4–5 sur 8 |
| C Confirmation & préparation | 10–11 | Étape 6 sur 8 |
| D Réalisation & modification | 12–15 | Étape 7 sur 8 |
| E Paiement & relation | 16–17 | Étape 8 sur 8 |

Navigation produit (quand visible) : Accueil · Demandes · Rendez-vous · Prestations · Profil · bientôt

### Anti-patterns

Pas de violet/indigo, glow néon, dark mode, pills excessives, card spam, ombres multi-couches, emojis, densité dashboard hors hubs. **Pas de vocabulaire « capacité » / CAPACITY_OPEN.** Préférer en UI française « dans le cadre de la démo » plutôt que « happy path ».

---

## Cartographie des écrans

| ID | Écran | Type | Acteur | Phase / Étape | Priorité |
| -- | ----- | ---- | ------ | ------------ | -------- |
| S01 | Démarrer la démonstration | Démo | Sarah | Entrée · Étape 1 sur 8 | P0 |
| S02 | Tableau de bord de Sarah | Opérationnel | Sarah | A · Étape 1–3 sur 8 | P0 |
| S03 | Règles générales de travail | Opérationnel | Sarah | A · Étape 1–3 sur 8 | P0 |
| S04 | Configurer la prestation | Opérationnel | Sarah | A · Étape 1–3 sur 8 | P0 |
| S05 | Confirmer le planning | Opérationnel | Sarah | A · Étape 1–3 sur 8 | P0 |
| S06 | Nouvelle demande | Opérationnel | Sarah | B · Étape 4 sur 8 | P0 |
| S07 | Demande d’Inès | Opérationnel | Sarah | B · Étape 4 sur 8 | P0 |
| S08 | Clarification avec la cliente | Opérationnel | Sarah | B · Étape 4 sur 8 | P0 |
| S09 | Décision et proposition | Opérationnel | Sarah | B · Étape 4 sur 8 | P0 |
| S10 | Proposition acceptée | Opérationnel | Sarah | C · Étape 6 sur 8 | P0 |
| S11 | Préparation du rendez-vous | Opérationnel | Sarah | C · Étape 6 sur 8 | P0 |
| S12 | Demande du jour | Opérationnel | Sarah | D · Étape 7 sur 8 | P0 |
| S13 | Prestation en cours | Opérationnel | Sarah | D · Étape 7 sur 8 | P0 |
| S14 | Proposer une modification | Opérationnel | Sarah | D · Étape 7 sur 8 | P0 |
| S15 | Terminer la prestation | Opérationnel | Sarah | D · Étape 7 sur 8 | P0 |
| S16 | Paiement | Opérationnel | Sarah | E · Étape 8 sur 8 | P0 |
| S17 | Avis, relation (+ fin / retour) | Opérationnel | Sarah | E · Étape 8 sur 8 | P0 |

---

========== SCREEN 01 / S01 — Démarrer la démonstration ==========
```text
Independent screen. Generate ONLY this one screen. Do not generate other screens from this document.

Product context: Nolaya — premium B2B2C mobile platform for Afro / textured hair professionals. DEMO ENTRY for the transactional Sarah/Inès demo (short path: validate offer & planning → receive demand → engage → realize → settle). Inès is a simulated client. NO “capacity” / CAPACITY_OPEN wording anywhere.

Device: Mobile app screen only, portrait ~390×844. No desktop. One screen only.

Screen type: DEMO orientation / mission brief. NOT a form. No product bottom tabs yet (or muted preview only).

Screen purpose: Present the scenario without spoiling every reaction. Mission: prepare offer, handle Inès’s demand, follow the appointment through settlement. Duration 12–15 minutes. Arc in action verbs — no spoiler of “perles” modification or Inès amounts.

Layout:
1) Slim demo banner top: « Mode démo — Créez votre offre · Étape 1 sur 8 » with subtle reset/quit
2) Brand mark / product name Nolaya as a calm hero-level signal
3) Mission headline + short supporting sentence
4) « Vous dans cette démo » line: Inès, 27 ans, knotless braids for 15 August
5) Duration chip: 12–15 min
6) « Ce qu’elle verra » — 5 verb steps (not card spam): Valider → Recevoir → Engager → Réaliser → Encaisser
7) Single primary sticky CTA « Commencer »

French UI text:
- Banner: « Mode démo — Créez votre offre · Étape 1 sur 8 »
- Headline: « Testez une réservation complète »
- Mission: « Préparez votre offre, traitez sa demande et suivez le rendez-vous jusqu’au règlement »
- Cliente simulée: « Inès · 27 ans · cherche des knotless braids pour le 15 août »
- Toasts: préfixe « Simulation : Inès (la cliente)… »
- Duration: « Durée estimée : 12 à 15 minutes »
- Steps title: « Ce qu’elle verra »
 1) « Valider » — « Offre & planning »
 2) « Recevoir » — « Une demande »
 3) « Engager » — « Le rendez-vous »
 4) « Réaliser » — « La prestation »
 5) « Encaisser » — « Et clôturer »
- Note: « Inès est une cliente simulée dans le cadre de la démo. »
- CTA: « Commencer »
- Optional ghost: « Quitter la démonstration »

Interactions: Only primary CTA. Optional quit. No forms.

Visual: Full-bleed or edge-dominant calm hero of a Black and/or mixed-race woman with coily/curly/textured Afro hair (knotless braids preferred) in a premium salon mood. Realistic, respectful. No straight Eurocentric hair as default. No floating badges on the hero.

Design system Nolaya: Manrope UI, JetBrains Mono sparingly. Charcoal #000101, soft gold #775a19 / #fdd587 sparingly, surfaces #fbf9f8 / #ffffff / #efedec. Soft 0.25rem radii. No purple, no neon glow, no emoji, no dark mode, no heavy multi-shadows. Less UI is better — generous whitespace, one purpose.

Quality bar: Premium mobile demo entry, calm editorial whitespace, accessible touch targets. All visible UI text in French.
```
========== END SCREEN 01 ==========

========== SCREEN 02 / S02 — Tableau de bord de Sarah ==========
```text
Independent screen. Generate ONLY this one screen. Do not generate other screens from this document.

Product context: Nolaya transactional demo — stylist home after start. SHORT PATH: a realistic DRAFT prestation already exists; framework is present but needs (re)validation. Sarah FINALIZES — she does not create from empty. Inès not yet injected. NO capacity / CAPACITY_OPEN.

Device: Mobile portrait ~390×844. One screen only.

Screen type: OPERATIONAL hub. Product bottom navigation visible. NOT a dense dashboard.

Screen purpose: Sarah lands with one clear unfinished task. One strong primary CTA. Secondary immersive signal opens a BOTTOM SHEET (2–3 sentences) explaining order: rules → prestation → planning. No second CTA that leads to the same next screen.

Layout:
1) Demo banner Étape 1 sur 8
2) Product header: « Bonjour Sarah »
3) Bottom nav: Accueil (active) · Demandes · Rendez-vous · Prestations · Profil · bientôt — Demandes empty until Inès injection
4) Main status indicator (single, calm)
5) One primary task block to treat (partial price/duration/place/gallery)
6) Secondary text link / chip for help → bottom sheet
7) Sticky or in-flow single primary CTA
8) Bottom sheet overlay variant: order of next gestures, dismiss

French UI text:
- Banner: « Mode démo — Créez votre offre · Étape 1 sur 8 »
- Greeting: « Bonjour Sarah »
- Status: « Votre activité n’est pas encore ouverte »
- Task title: « Knotless braids moyen — configuration à terminer »
- Summary: « Prix, durée, lieu et galerie partiellement renseignés »
- Primary CTA: « Finaliser ma prestation »
- Secondary: « Qu’est-ce qui reste à faire ? »
- Bottom sheet title: « Prochaines étapes »
- Bottom sheet body: « Validez d’abord vos règles générales, puis finalisez la prestation, puis confirmez le planning. Cet ordre est imposé dans le cadre de la démo. »
- Sheet dismiss: « Compris »
- Subtle empty: « Demandes — aucune demande pour l’instant »

Interactions: ONE primary product CTA only. Secondary opens bottom sheet only — not a second navigation CTA. Sheet closes back to dashboard. No Inès demand card yet.

Visual: Optional small avatar of Black woman stylist with textured Afro hair named Sarah. Calm, premium, not cartoonish.

Design system Nolaya. Manrope + JetBrains Mono for status chips. Charcoal/gold, light surfaces, soft radii. No purple, no glow, no emoji, no dark mode, no card spam. All visible UI text in French.
```
========== END SCREEN 02 ==========

========== SCREEN 03 / S03 — Règles générales de travail ==========
```text
Independent screen. Generate ONLY this one screen. Do not generate other screens from this document.

Product context: Nolaya transactional demo Act A — Professional rules (framework) short path. Sarah RE-READS, adjusts from short catalogs, and validates a PREFILLED framework. Pause is READ-ONLY (inherited, not recalculated into slot durations). Target → PROFESSIONAL_FRAMEWORK_ACTIVE. NO capacity wording.

Device: Mobile portrait ~390×844. Scrollable. One screen only.

Screen type: OPERATIONAL. Limited edit outside pause.

Screen purpose: Rules apply to her whole activity, not one prestation. She feels she decides her framework; pause stays frozen.

Layout:
1) Demo banner Étape 1 sur 8
2) Sticky header: back + « Règles générales »
3) Short intro: rules for her whole activity
4) Editable rows / catalog selectors (not pill spam):
 - Retard toléré: 10 / 15 / 20 min (target 15)
 - Annulation: catalog including « Annulation selon le délai restant »
 - Report: one reschedule allowed under conditions
 - Accompagnants: toggle / catalog (target Non autorisés)
 - Pause: READ-ONLY row « 5 minutes toutes les heures »
 - Paiement du solde: catalog (target À la fin de la prestation)
 - Communication: Via la plateforme (confirmed)
5) Sticky primary CTA « Valider mes règles »

French UI text:
- Banner: « Mode démo — Créez votre offre · Étape 1 sur 8 »
- Title: « Règles générales de travail »
- Intro: « Ces règles s’appliquent à toute votre activité, pas à une prestation particulière. »
- Labels + demo targets:
 - « Retard toléré » — « 15 minutes »
 - « Annulation » — « Annulation selon le délai restant »
 - « Report » — « Un report autorisé sous conditions »
 - « Accompagnants » — « Non autorisés »
 - « Pause » — « 5 minutes toutes les heures » + badge « Lecture seule »
 - Pause helper: « Issue du cadre — rappelée à la cliente, non recalculée dans les durées. »
 - « Paiement du solde » — « À la fin de la prestation »
 - « Communication » — « Via la plateforme »
- CTA: « Valider mes règles »

Interactions: Catalog edits allowed except pause (locked). CTA confirms / re-validates framework. Back allowed.

Visual: Optional calm studio mood — Black woman stylist with textured Afro hair. Premium respectful.

Design system Nolaya. JetBrains Mono for « 15 min », « 5 min / h ». Soft radii, generous whitespace, minimal chrome. No purple, no glow, no emoji. All visible UI text in French.
```
========== END SCREEN 03 ==========

========== SCREEN 04 / S04 — Configurer la prestation ==========
```text
Independent screen. Generate ONLY this one screen. Do not generate other screens from this document.

Product context: Nolaya transactional demo Act A — Configure prestation with REAL micro-choices on rail. Pricing model: FULL price per length + non-length option (mèches). Inès transaction rail: Mi-dos 150 € + mèches +20 €. Gallery belongs to THIS knotless prestation. NO slots, NO planning activation, NO capacity on this screen. Target → OFFER_ACTIVE.

Device: Mobile portrait ~390×844. Scrollable. One screen only.

Screen type: OPERATIONAL. Short sections with visible micro-choices (choice rows / toggles / gallery select). Not a frozen read-only continue screen.

Screen purpose: Sarah activates/confirms mi-dos, keeps mèches on, selects ≥1 gallery image from a knotless pool. Other lengths visible for immersion but non-blocking.

Layout:
1) Demo banner Étape 1 sur 8
2) Header: « Knotless braids moyen — formats de longueur »
3) Result summary line
4) Length of reference card: Épaules — 120 € / 4 h (optional activate)
5) Transaction format card REQUIRED: Mi-dos — 150 € / 5 h 30 (selected/confirmed; price & duration fixed)
6) Other lengths e.g. Taille — 180 € / 6 h 30 (visible, activable, non-blocking)
7) Non-length option: Mèches fournies +20 € — toggle REQUIRED ON for demo
8) Confirmed blocks: Lieu En salon Saint-Denis · Préparation cliente (cheveux lavés et démêlés) · Limites cuir chevelu sensible
9) Gallery: select ≥1 of 3 knotless realizations (real choice, sharp media)
10) Sticky CTA « Enregistrer la prestation » — enabled only if mi-dos + mèches + ≥1 image

French UI text:
- Banner: « Mode démo — Créez votre offre · Étape 1 sur 8 »
- Title: « Knotless braids moyen — formats de longueur »
- Result: « Knotless moyen · longueurs activées »
- « Longueur de référence » — « Épaules — 120 € / 4 h »
- « Format de la transaction » — « Mi-dos — 150 € / 5 h 30 » (requis)
- « Autres longueurs » — « Taille — 180 € / 6 h 30 »
- « Option hors longueur » — « Mèches fournies : +20 € » (activé requis)
- « Lieu » — « En salon à Saint-Denis »
- « Préparation » — « Cheveux lavés et démêlés » (pas d’onglet Niveau de service)
- « Limites » — « Cuir chevelu sensible accepté »
- « Galerie » — « Sélectionnez au moins une réalisation »
- Helper: « Dans le cadre de la démo, mi-dos et mèches sont requis pour continuer. »
- CTA: « Enregistrer la prestation »

Interactions: Confirm mi-dos; toggle mèches on; select gallery ≥1; CTA gated. No calendar/slot UI.

Visual: Gallery tiles MUST show Black and/or mixed-race women with coily/curly/textured Afro hair in knotless braids. Sharp media corners. Premium, realistic, respectful. No straight Eurocentric hair as default.

Design system Nolaya. JetBrains Mono for amounts/durations. Charcoal/gold, light surfaces. Minimal cards — only where interaction needs a container. No purple, no glow, no emoji. All visible UI text in French.
```
========== END SCREEN 04 ==========

========== SCREEN 05 / S05 — Confirmer le planning ==========
```text
Independent screen. Generate ONLY this one screen. Do not generate other screens from this document.

Product context: Nolaya transactional demo Act A — Confirm REAL planning (days/hours/load) and select the DERIVED slot for the Inès rail. Saturday 15 August 9:00 is a consequence of planning rules — NOT a “capacity” to open. Other slots visible but disabled (“hors scénario démo”). After activation → SCHEDULE_ACTIVE; banner will become Étape 4 sur 8 next; Inès demand injects. NO CAPACITY_OPEN.

Device: Mobile portrait ~390×844. Scrollable. One screen only.

Screen type: OPERATIONAL. Planning confirmation + minimal immersive slot choice.

Screen purpose: Confirm working days Tue–Sat, hours 9–18, salon Saint-Denis, max 1 RDV/day. Preview selectable derived slots; ONLY 15 Aug 9h enables primary CTA.

Layout:
1) Demo banner Étape 1 sur 8
2) Header « Planning »
3) Confirmed rules block: jours · horaires · lieu · limite de charge
4) Slot preview list/cards: e.g. 14 / 15 / 16 août dès 9 h
5) Demo slot PRESELECTED: Samedi 15 août · 9 h (only one that enables CTA)
6) Other slots visible but DISABLED with label « Hors scénario démo »
7) Read-only lines: durée bloquée 5 h 30 · prestation Knotless braids moyen · format Mi-dos
8) Pause note + helper that this is not a capacity
9) Sticky CTA « Activer mon planning »
10) Success microcopy after activation (can be shown as confirmation state on same composition): « Vous pouvez maintenant recevoir des demandes. »

French UI text:
- Banner: « Mode démo — Créez votre offre · Étape 1 sur 8 »
- Title: « Confirmer le planning »
- Intro: « Confirmez vos plages. Les créneaux possibles en découlent. »
- « Jours ouvrés et horaires » — « Mardi à samedi · 9 h – 18 h par jour »
- « Lieu » — « En salon · Saint-Denis » (contexte issu du cadre)
- « Rendez-vous max. / jour » — « 1 rendez-vous / jour »
- Preview title: « Créneaux dérivés »
- Slot demo: « Samedi 15 août · 9 h »
- Disabled: « Hors scénario démo »
- « Durée bloquée » — « 5 h 30 »
- « Prestation » — « Knotless braids moyen · Mi-dos »
- Pause note: « Pause du cadre : 5 min / h — rappelée à la cliente, non ajoutée automatiquement »
- Helper: « Ce créneau découle de vos règles de planning — ce n’est pas une capacité. »
- CTA: « Activer mon planning »
- Success: « Vous pouvez maintenant recevoir des demandes. »

Interactions: Tap to confirm 15 Aug 9h (preselected). Other slots disabled. CTA after confirmation. No free calendar editing that breaks the rail.

Visual: Calm planner mood with Black woman stylist context. Premium, not generic calendar spam.

Design system Nolaya. JetBrains Mono for dates/times. No purple, no glow, no emoji, no capacity vocabulary. All visible UI text in French.
```
========== END SCREEN 05 ==========

========== SCREEN 06 / S06 — Nouvelle demande ==========
```text
Independent screen. Generate ONLY this one screen. Do not generate other screens from this document.

Product context: Nolaya transactional demo Act B — New opportunity after SCHEDULE_ACTIVE. Banner Étape 4 sur 8. Inès demand injected. ONE strong CTA + secondary immersive sheet explaining match criteria. NO opaque “cliente idéale” / “score 92%”. NO capacity wording.

Device: Mobile portrait ~390×844. One screen only.

Screen type: OPERATIONAL invitation / list entry. Product bottom nav with Demandes active.

Screen purpose: Sarah receives a notification then sees one demand card. Primary: examine. Secondary chip opens bottom sheet with matching criteria (offer, derived slot, zone, budget, sensitive scalp accepted).

Layout:
1) Demo banner Étape 4 sur 8
2) Header « Demandes »
3) Optional toast style: « Simulation : Inès (la cliente) a envoyé une demande »
4) ONE demand card (not card spam)
5) Secondary chip « Pourquoi cette demande ? »
6) Sticky / in-card primary CTA
7) Bottom sheet overlay: criteria list, dismiss

French UI text:
- Banner: « Mode démo — Inès est une cliente simulée · Étape 4 sur 8 »
- Title: « Demandes »
- Card title: « Inès — Knotless braids moyen »
- Card meta: « Samedi 15 août à 9 h · Saint-Denis »
- Card budget: « Budget maximum : 180 € »
- Primary CTA: « Examiner la demande »
- Secondary: « Pourquoi cette demande ? »
- Sheet title: « Pourquoi cette demande ? »
- Sheet criteria:
 - « Offre correspondante »
 - « Créneau dérivé du planning »
 - « Zone qui correspond »
 - « Budget qui correspond »
 - « Cuir chevelu sensible accepté »
- Sheet dismiss: « Compris »

Interactions: ONE primary navigation CTA. Secondary opens sheet only. No fake score. No second CTA opening same demand via a different label.

Visual: Optional small inspiration thumbnail of knotless braids on a Black woman with textured hair. Premium respectful.

Design system Nolaya. Generous whitespace, one purpose. No purple, no glow, no emoji. All visible UI text in French.
```
========== END SCREEN 06 ==========

========== SCREEN 07 / S07 — Demande d’Inès ==========
```text
Independent screen. Generate ONLY this one screen. Do not generate other screens from this document.

Product context: Nolaya transactional demo Act B — Client demand. Sarah DECIDES without private messaging. Three distinct professional gestures. « Préparer une proposition » is GATED until photo/precision enrichment. Refuse is a real gesture with structured motive + demo recovery « Reprendre la demande d’Inès ». Target demo path: Demander une précision. Étape 4 sur 8. NO capacity.

Device: Mobile portrait ~390×844. Scrollable. One screen only.

Screen type: OPERATIONAL decision demand screen.

Screen purpose: Show structured demand facts + strong missing-info alert (no recent hair photo) BEFORE clarification; AFTER clarification show discoverability: bandeau « Nouveaux éléments reçus », badge « Nouveau », CTA « Voir les ajouts » → `#nouveaux-ajouts`, timeline items marked new. Route `/opportunites/demande` (not dossier).

Layout:
1) Demo banner Étape 4 sur 8
2) Header back + « Demande d’Inès »
3) Read-only fact blocks (compact, not card spam): résultat · inspiration image · cheveux/confort · date/lieu · budget · fournitures · tâches · priorité
4) Strong alert: Aucune photo récente des cheveux
5) Compatibility reminder (from sheet criteria)
6) Timeline: « Invitation reçue »
7) Three action affordances (primary / secondary / destructive ghost)
8) Optional refuse panel state as overlay variant: motive catalog + confirm + recovery « Reprendre la demande d’Inès »

French UI text:
- Banner: « Mode démo — Inès est une cliente simulée · Étape 4 sur 8 »
- Title: « Demande d’Inès »
- Lead: « Tout est regroupé ici pour décider. »
- « Résultat souhaité » — « Knotless moyen, longueur mi-dos »
- « Inspiration » — image Inès
- « Cheveux et confort » — « Cheveux naturels crépus, cuir chevelu sensible »
- « Date et lieu » — « 15 août, 9 h, Saint-Denis »
- « Budget » — « Cible 170 €, maximum 180 € »
- « Fournitures » — « Mèches souhaitées auprès de la coiffeuse »
- « À préparer par la cliente » — « Laver et démêler ses cheveux »
- « Ce qui compte pour elle » — « Confort du cuir chevelu »
- Alert: « Information manquante — Aucune photo récente des cheveux »
- Timeline: « Invitation reçue »
- Action A: « Demander une précision » (active)
- Action B: « Préparer une proposition » (disabled) + helper: « Une photo récente est requise pour décider si vous pouvez réaliser »
- Action C: « Refuser »
- Refuse panel: motifs « Créneau » / « Budget » / « Technique » / « Autre »
- After refuse: « Demande refusée — aucune proposition envoyée. »
- Recovery: « Reprendre la demande d’Inès »

Interactions: Demander une précision always active (demo). Proposition gated. Refuse → structured motive → recovery. No free chat.

Visual: Inspiration image must depict Black and/or mixed-race woman with coily/textured hair / knotless braids. Premium respectful.

Design system Nolaya. Clear hierarchy, alert uses error #ba1a1a sparingly. No purple, no glow, no emoji. All visible UI text in French.
```
========== END SCREEN 07 ==========

========== SCREEN 08 / S08 — Clarification avec la cliente ==========
```text
Independent screen. Generate ONLY this one screen. Do not generate other screens from this document.

Product context: Nolaya transactional demo Act B — Clarification as PANEL / BOTTOM SHEET from the demand — NOT free messaging. Sarah SELECTS questions (1 required photo + 1 optional allergies — NO chemical treatment date). Simulator then shows deterministic Inès response. After enrichment, missing-photo alert clears and proposition unlocks. Étape 4 sur 8.

Device: Mobile portrait ~390×844. Design as a focused panel/sheet screen (can include dimmed demand behind). One screen composition only.

Screen type: OPERATIONAL clarification panel.

Screen purpose: Sarah composes her precision request by checking questions. CTA gated on required photo check. Then show waiting state + prepared answer + photo joining the demand.

Layout (compose these as sequential states of ONE screen family if needed, but deliver the primary SELECT + SEND state as the main frame; optionally show answered state as secondary variant in the same prompt output ONLY if Stitch allows one primary frame — prefer the selection panel with a small preview of the response outcome in a secondary block below):
1) Demo banner Étape 4 sur 8
2) Panel title « Demander une précision »
3) Checkbox list:
 - Photo récente des cheveux — REQUIRED
 - Allergies aux produits (optionnel) — OPTIONAL
4) Sticky CTA « Envoyer la demande » (gated)
5) After-send block (visible outcome area):
 - « Inès consulte votre demande… »
 - Prepared reply: « Voici une photo récente. »
 - Optional line if checked: « Aucune allergie connue »
6) Next action: « Préparer une proposition »

French UI text:
- Banner: « Mode démo — Inès est une cliente simulée · Étape 4 sur 8 »
- Title: « Clarification avec la cliente »
- Helper: « Sélectionnez les précisions — pas de messagerie libre. »
- Q1: « Photo récente des cheveux » — « Requise »
- Q2: « Allergies aux produits (optionnel) »
- CTA: « Envoyer la demande »
- Waiting: « Inès consulte votre demande… »
- Reply: « Voici une photo récente. »
- Optional reply: « Aucune allergie connue »
- Next: « Préparer une proposition »

Interactions: Checkboxes; CTA only when required photo is checked; no free-text chat. Deterministic simulator reply.

Visual: Recent hair photo MUST show Black woman with natural coily/textured hair (sensitive-scalp context, dignified). Premium realistic.

Design system Nolaya. Minimal panel UI, generous whitespace. No purple, no glow, no emoji. All visible UI text in French.
```
========== END SCREEN 08 ==========

========== SCREEN 09 / S09 — Décision et proposition ==========
```text
Independent screen. Generate ONLY this one screen. Do not generate other screens from this document.

Product context: Nolaya transactional demo Act B — ONE screen, TWO sequential decisions: (9a) strong realization decision then (9b) firm proposal confirmation on rail. Offer zone LOCKED/masked until she confirms she can realize. Rail amounts/slot FIXED: total 170 € · deposit 50 € · 15 Aug 9h · mi-dos · mèches +20 €. Prefer decision language (I can realize / confirm) over sterile checklist jargon in headlines. After send → FIRM_PROPOSAL + SOFT_HOLD; banner becomes Étape 5 sur 8 (proposition envoyée) / then 6 next. NO capacity. Étape 4 sur 8 now.

Device: Mobile portrait ~390×844. Scrollable. One screen only.

Screen type: OPERATIONAL dual-decision screen (decision weight first).

Screen purpose:
9a — Sarah confirms technical points and clearly says she can realize under these conditions.
9b — After go, she confirms the locked proposal (not free edit) and may open client preview sheet.

Layout:
1) Demo banner Étape 4 sur 8
2) Header « Proposition » · badge « Décision »
3) SECTION 9a — Votre avis (strong weight, top) — badge-mono « Étape 1 · Votre avis »:
 - Confirmable points: photo récente · texture crépue
 - Note: « Adaptée au cuir chevelu sensible d’Inès » (no « cuir chevelu sensible »)
 - CTA « Je peux réaliser » (enabled when all confirmed)
 - Optional refuse technique with recovery (secondary)
4) SECTION 9b — Proposition (locked until 9a) — badge-mono « Étape 2 · Votre proposition »:
 - Prestation Knotless braids moyen · cuir chevelu sensible accepté
 - Longueur Mi-dos
 - Prix de base 150 € (fixed)
 - Mèches fournies 20 € — toggle inclus REQUIRED
 - Total 170 € · Durée 5 h 30 · Créneau 15 août 9 h · Lieu Salon Saint-Denis
 - À préparer (cliente) / Vous fournissez
 - Pause rappel 5 min/h informative
 - Versement initial 50 € · Validité 30 minutes
 - Link « Aperçu Inès »
5) Sticky CTA « Envoyer la proposition »
6) After send: validity countdown chip soft-hold

French UI text:
- Banner: « Mode démo — Inès est une cliente simulée · Étape 4 sur 8 »
- Section A title: « Pouvez-vous réaliser ? »
- Points: « Photo récente reçue » · « Texture crépue »
- Helper: « Adaptée au cuir chevelu sensible d’Inès »
- Synthesis CTA: « Je peux réaliser »
- Locked note: « La proposition s’ouvre après cette décision. »
- Section B title: « Votre proposition »
- Lines: « Mi-dos » · « 150 € » · « Mèches fournies +20 € » · « Total 170 € » · « 5 h 30 » · « 15 août, 9 h » · « Versement initial 50 € » · « Validité 30 minutes »
- Pause: « Pause du cadre : 5 min / h — informatif, non facturée à part »
- Preview: « Ce que la cliente verra »
- Helper: « Montants et créneau figés dans le cadre de la démo. »
- Primary CTA: « Envoyer la proposition »
- Soft hold: « Créneau réservé temporairement »

Interactions: Confirm she can realize first; then confirm mèches included + review; send gated. No free amount editing. Preview sheet consultable.

Visual: Optional small knotless braids reference on Black woman with textured hair. Premium.

Design system Nolaya. JetBrains Mono for € and times. Clear two-step hierarchy, not a dense form wall. No purple, no glow, no emoji. All visible UI text in French.
```
========== END SCREEN 09 ==========

========== SCREEN 10 / S10 — Proposition acceptée ==========
```text
Independent screen. Generate ONLY this one screen. Do not generate other screens from this document.

Product context: Nolaya transactional demo Act C — Proposal accepted / COMMITTED. Banner Étape 6 sur 8. Simulator shows VISIBLE sequence (Inès accepts V1 → accepte les règles → pays 50 €) then confirmation with CONSULTABLE proofs (consent sheet + payment sheet). Sarah does NOT accept for Inès. No “Accepter pour Inès” CTA. Primary: Préparer le rendez-vous.

Device: Mobile portrait ~390×844. Scrollable. One screen only.

Screen type: OPERATIONAL confirmation + proof consultation.

Screen purpose: Sarah observes the simulated acceptance sequence, then verifies secured facts and opens proof sheets. Consultation recommended but not mandatory to continue.

Layout:
1) Demo banner Étape 6 sur 8
2) Visible sequence status strip (3 steps, read-only, not Sarah-clickable as Inès):
 - Inès accepte la proposition V1
 - Inès accepte les règles
 - Versement initial de 50 € reçu
3) Confirmation headline « Rendez-vous confirmé avec Inès »
4) Secured facts list: V1 · 170 € · 50 € received · balance 120 € · slot confirmed · consent recorded
5) Proof links → sheets (consent / payment / optional V1)
6) Sticky CTA « Préparer le rendez-vous »

French UI text:
- Banner: « Mode démo — Inès est une cliente simulée · Étape 6 sur 8 »
- Sequence:
 1) « Inès accepte la proposition V1 »
 2) « Inès accepte les règles »
 3) « Versement initial de 50 € reçu »
- Headline: « Rendez-vous confirmé avec Inès »
- « Version acceptée » — « Proposition V1 »
- « Prix convenu » — « 170 € »
- « Versement reçu » — « 50 € » + « Voir la preuve de paiement »
- « Reste à payer » — « 120 € »
- « Créneau » — « 15 août, 9 h — confirmé »
- « Accord » — « Enregistré » + « Voir l’accord »
- Accord sheet: règles (retard, annulation, préparation, pause) · horodatage démo · « Accepté par Inès »
- Payment sheet: « 50 € · déjà payé / déduit sur 170 € · solde 120 € · référence démo »
- CTA: « Préparer le rendez-vous »
- Note: « Inès agit automatiquement dans le cadre de la démo. »

Interactions: Open/close proof sheets. No CTA to accept as Inès. Primary CTA after sequence completes.

Visual: Calm confirmed appointment mood — Black woman stylist / client context with textured Afro hair. Premium respectful. No confetti spam.

Design system Nolaya. JetBrains Mono for amounts. Minimal, proof-first. No purple, no glow, no emoji. All visible UI text in French.
```
========== END SCREEN 10 ==========

========== SCREEN 11 / S11 — Préparation du rendez-vous ==========
```text
Independent screen. Generate ONLY this one screen. Do not generate other screens from this document.

Product context: Nolaya transactional demo Act C — Readiness. Sarah checklist REAL checkboxes (4) with gated confirm; secondary « Tout cocher ». Inès checklist AUTO-fills AFTER Sarah confirms (visible fill). Then READY message + clear time-compression control « Continuer la démonstration » (not opaque auto-skip) → day-of (Étape 7 sur 8 next). Banner now Étape 6 sur 8. NO capacity.

Device: Mobile portrait ~390×844. Scrollable. One screen only.

Screen type: OPERATIONAL dual checklist + demo protocol advance.

Screen purpose: Sarah prepares for real; Inès stays automatic; Sarah chooses to advance time to appointment day.

Layout:
1) Demo banner Étape 6 sur 8
2) Header « Préparation »
3) Status chip READINESS_PENDING → READY
4) Checklist Sarah — 4 real checkboxes
5) Primary CTA gated « Confirmer ma préparation »
6) Secondary chip « Tout cocher »
7) Checklist Inès — visible, unchecked until Sarah confirms; then auto-checked with message
8) Result line when READY
9) Demo protocol block: signal + CTA « Continuer la démonstration »

French UI text:
- Banner: « Mode démo — Inès est une cliente simulée · Étape 6 sur 8 »
- Title: « Préparation du rendez-vous »
- Sarah section: « Votre checklist »
 1) « Mèches disponibles »
 2) « Matériel préparé »
 3) « Poste de travail disponible »
 4) « Consignes particulières consultées (cuir chevelu sensible, cuir chevelu sensible) »
- Primary: « Confirmer ma préparation »
- Secondary: « Tout cocher »
- Inès section: « Checklist d’Inès »
 - « Cheveux lavés »
 - « Cheveux démêlés »
 - « Adresse et accès consultés »
 - « Rendez-vous reconfirmé »
- After Sarah confirm: « Inès a confirmé sa préparation. »
- Ready: « Toutes les conditions nécessaires sont satisfaites. »
- Compression signal: « Le rendez-vous est le 15 août — la démo peut avancer au jour J. »
- Compression CTA: « Continuer la démonstration »

Interactions: Real checks; CTA gated on 4; Tout cocher secondary; Inès auto after confirm; Continuer advances demo time. Sarah never checks for Inès.

Visual: Prep/studio mood — Black woman stylist with textured hair preparing braiding materials. Premium.

Design system Nolaya. Clear two-list asymmetry. No purple, no glow, no emoji. All visible UI text in French.
```
========== END SCREEN 11 ==========

========== SCREEN 12 / S12 — Demande du jour ==========
```text
Independent screen. Generate ONLY this one screen. Do not generate other screens from this document.

Product context: Nolaya transactional demo Act D — Day-of demand after « Continuer la démonstration ». Banner Étape 7 sur 8. Inès arrival already signaled 8:57 for 9:00. Engagement V1 consultable. Primary: Commencer la prestation → IN_PROGRESS. NO pearls request BEFORE start. NO capacity.

Device: Mobile portrait ~390×844. One screen only.

Screen type: OPERATIONAL day-of briefing.

Screen purpose: Sarah sees who/when/what/price/readiness and starts. Secondary problem signal is de-emphasized (off demo rail).

Layout:
1) Demo banner Étape 7 sur 8
2) Header « Aujourd’hui · 15 août »
3) Client + times block: Inès · prévue 9 h · arrivée 8 h 57
4) Prestation · prix 170 € · engagement V1 (link Voir l’engagement V1)
5) Sensitive instructions reminder
6) Preparation status READY
7) Sticky primary CTA « Commencer la prestation »
8) Secondary ghost « Signaler un problème »

French UI text:
- Banner: « Mode démo — Inès est une cliente simulée · Étape 7 sur 8 »
- Title: « Demande du jour »
- « Cliente » — « Inès »
- « Heure prévue » — « 9 h »
- « Heure d’arrivée » — « 8 h 57 »
- « Prestation » — « Knotless braids moyen · mi-dos »
- « Prix convenu » — « 170 € »
- « Engagement » — « V1 active » + « Voir l’engagement V1 »
- « Consignes » — « Cuir chevelu sensible, cuir chevelu sensible »
- « Préparation » — « Complète »
- CTA: « Commencer la prestation »
- Secondary: « Signaler un problème »

Interactions: Primary starts service. V1 sheet read-only. No modification event yet.

Visual: Day-of salon mood — Black woman client with natural textured hair arriving / Black stylist ready. Premium respectful.

Design system Nolaya. JetBrains Mono for times/amounts. Calm single-purpose screen. No purple, no glow, no emoji. All visible UI text in French.
```
========== END SCREEN 12 ==========

========== SCREEN 13 / S13 — Prestation en cours ==========
```text
Independent screen. Generate ONLY this one screen. Do not generate other screens from this document.

Product context: Nolaya transactional demo Act D — In progress + IMMERSIVE pearls modification EVENT. After start, an interruptive sheet/modal opens (not a flat banner). Sarah decides: Évaluer la modification (demo target) OR Refuser with structured motive + recovery « Reprendre l’évaluation ». V1 remains active until accepted modification. Banner Étape 7 sur 8. NO “Accepter pour Inès”. NO capacity.

Device: Mobile portrait ~390×844. Design the operational in-progress screen WITH the interruptive event sheet as the focus of the composition (event must dominate). One screen only.

Screen type: OPERATIONAL run sheet + immersive event modal.

Screen purpose: Live progress view interrupted by pearls modal. WHY must be visible: title « On fixe le supplément ici pour éviter un malentendu à la fin » + body that oral OK is unsafe; toast style « Simulation : Inès (la cliente) demande l’ajout de perles ». Sarah chooses Évaluer / Refuser.

Layout:
1) Demo banner Étape 7 sur 8
2) Dimmed in-progress background: start time · V1 · prix 170 € · durée 5 h 30 · timeline démarrage · secondary « Signaler un événement »
3) FOREGROUND interruptive sheet/modal:
 - Title: Inès demande une modification
 - Body: Ajouter des perles · V1 remains active until accepted modification
 - Primary: Évaluer la modification
 - Destructive/secondary: Refuser la modification
4) Optional refuse recovery affordance in sheet: Reprendre l’évaluation

French UI text:
- Banner: « Mode démo — Inès est une cliente simulée · Étape 7 sur 8 »
- Background labels: « Prestation en cours » · « En cours » · « 170 € » · « 5 h 30 »
- Toast pattern: « Simulation : Inès (la cliente) demande l’ajout de perles »
- Modal badge: « Modification demandée »
- Event title (WHY): « On fixe le supplément ici pour éviter un malentendu à la fin »
- Event body: « Inès demande d’ajouter des perles. L’accord actuel reste valable jusqu’à ce qu’elle accepte le nouveau prix et la durée. »
- WHY box: « À faire dans l’app : sans accord écrit sur le prix et le temps en plus, un « ok » à l’oral crée souvent un malentendu après le rendez-vous. »
- Primary: « Évaluer la modification »
- Refuse: « Refuser la modification »
- After refuse: « Modification refusée — accord initial inchangé »
- Recovery: « Reprendre l’évaluation »

Interactions: Interruptive modal must feel unavoidable. Evaluate → next composition screen. Refuse → recovery. Sarah does not trigger Inès’s ask.

Visual: In-progress braiding on Black woman with textured hair; beads/pearls allusion subtle and premium — not cartoon stickers.

Design system Nolaya. Modal is calm and serious, not neon alert spam. No purple, no glow, no emoji. All visible UI text in French.
```
========== END SCREEN 13 ==========

========== SCREEN 14 / S14 — Proposer une modification ==========
```text
Independent screen. Generate ONLY this one screen. Do not generate other screens from this document.

Product context: Nolaya transactional demo Act D — Compose modification on rail then observe Inès agreement + consultable V1/V2 trace/accord (NOT « annotations » jargon). Micro-choices REQUIRED: supplement +10 € and +20 minutes. Off-rail options visible but disabled (« hors scénario démo »). New total 180 € · new duration 5 h 50. After send: visible sequence Inès consults → accepts at 11:18 → V2 active. Sarah does NOT accept for Inès. Banner Étape 7 sur 8. NO capacity.

Device: Mobile portrait ~390×844. Scrollable. Prefer ONE composed screen showing composition + accepted confirmation state as the primary success of this step (composition with results block), or composition with clear preview of post-accept facts — keep minimal. One screen only.

Screen type: OPERATIONAL modification compose + agreement confirmation.

Screen purpose: Sarah selects +10 € and +20 min, asks Inès’s agreement, then consults proofs (request / proposal / consent / V1 archived). Primary after sequence: Reprendre la prestation.

Layout:
1) Demo banner Étape 7 sur 8
2) Header « Modification »
3) Modification type read-only: Ajout de perles
4) Supplément choice list — +10 € required (others disabled hors scénario démo)
5) Extra duration choice list — +20 minutes required
6) Live totals: 180 € · 5 h 50
7) Motif catalog short
8) Link Voir V1 (170 € · 5 h 30)
9) Preview: « Inès verra : +10 € · +20 min · nouveau total 180 € »
10) CTA gated « Demander l’accord d’Inès »
11) After sequence confirmation block:
 - Modification acceptée
 - Trace / accord links: demande · proposition · accord Inès · Voir proposition initiale
12) CTA « Reprendre la prestation »

French UI text:
- Banner: « Mode démo — Inès est une cliente simulée · Étape 7 sur 8 »
- Header badge: « Accord »
- Title: « Proposer une modification »
- Lead: « Comme un reçu : demande → votre prix → son oui. Inès doit accepter avant que ce soit valable. »
- WHY: « On note ici le changement pour éviter le « tu m’avais dit… » sur le prix ou la durée à la fin. »
- After accept: « Voici la trace du changement — ce qui a été accepté, consultable si besoin. » (NOT « annotations »)
- WHY after accept: « Demande → votre prix → son oui. Comme un reçu partagé, en cas de désaccord sur le supplément. »
- Sheets: « Détail · Accord » (not Preuve / Consentement jargon)
- « Modification » — « Ajout de perles »
- « Supplément » — « +10 € » · helper « Dans cette démo » (figé, pas faux choix)
- « Durée en plus » — « +20 minutes » · helper « Dans cette démo »
- « Nouveau total » — « 180 € »
- « Nouvelle durée » — « 5 h 50 »
- Preview: « Inès verra : +10 € · +20 min · nouveau total 180 €. »
- CTA send: « Demander l’accord d’Inès »
- Sequence (Inès simulée):
 1) « Inès consulte la proposition de modification »
 2) « Inès accepte la modification (+10 € · +20 min) »
- Confirm: « Modification acceptée »
- Trace rows: « Voir la demande » · « Voir la proposition » · « Voir l’accord » · « Voir la proposition initiale »
- CTA continue: « Reprendre la prestation »
- Note: « Inès (cliente simulée) répond. Vous regardez seulement — vous n’acceptez pas à sa place. »

Interactions: Select required +10/+20; send gated; proofs consultable; no accept-for-Inès CTA.

Visual: Subtle pearls on finished/in-progress knotless braids on Black woman with textured hair. Premium.

Design system Nolaya. JetBrains Mono for €/times. Minimal micro-choice lists. No purple, no glow, no emoji. All visible UI text in French.
```
========== END SCREEN 14 ==========

========== SCREEN 15 / S15 — Terminer la prestation ==========
```text
Independent screen. Generate ONLY this one screen. Do not generate other screens from this document.

Product context: Nolaya transactional demo Act D — End qualification. REAL choice: fully completed (demo target) / partial / trigger resolution. Happy path = intégralement → COMPLETED and banner becomes Étape 8 sur 8 next. Off-rail options must offer recovery (« Clôturer intégralement pour la démo »). Summary shows V2 180 € · 5 h 50 · pearls added · no incidents. Banner still Étape 7 sur 8 on this screen. NO capacity.

Device: Mobile portrait ~390×844. One screen only.

Screen type: OPERATIONAL closure qualification.

Screen purpose: Sarah professionally qualifies the end — not opaque auto-close.

Layout:
1) Demo banner Étape 7 sur 8
2) Header « Terminer »
3) Read-only summary: initiale réalisée · perles V2 · aucune interruption · aucun incident · durée réelle 5 h 50 · prix final 180 € · proofs still consultable
4) Qualification choice group (3 options)
5) Primary confirm tied to selection (or each option is a clear action row)
6) Recovery affordance if partial/resolution chosen

French UI text:
- Banner: « Mode démo — Inès est une cliente simulée · Étape 7 sur 8 »
- Title: « Terminer la prestation »
- Summary lines:
 - « Prestation initiale réalisée »
 - « Perles ajoutées (V2) »
 - « Aucune interruption »
 - « Aucun incident »
 - « Durée réelle : 5 h 50 »
 - « Prix final : 180 € »
- Qualification title: « Qualifier la fin »
- Option A (target): « Prestation réalisée intégralement »
- Option B: « Prestation réalisée partiellement »
- Option C: « Déclencher une résolution »
- Recovery: « Clôturer intégralement pour la démo »
- Helper: « Choisissez explicitement — pas de clôture automatique. »

Interactions: Explicit selection required. Target path intégralement. Recovery keeps demo alive if off-rail.

Visual: Finished knotless braids with subtle pearls on Black woman with textured hair — premium portfolio close. Sharp media OK.

Design system Nolaya. Clear decision UI, not a dense report. No purple, no glow, no emoji. All visible UI text in French.
```
========== END SCREEN 15 ==========

========== SCREEN 16 / S16 — Paiement ==========
```text
Independent screen. Generate ONLY this one screen. Do not generate other screens from this document.

Product context: Nolaya transactional demo Act E — Settlement SETTLED. Banner Étape 8 sur 8. Visible payment sequence: déduit 50 € → balance due 130 € → Inès pays 130 €. Then confirmation separating billed price vs Sarah’s net. Explicit demo amounts: total 180 · deposit 50 · balance 130 · platform fee 18 (10%) · net 162. Consultable proof sheets (final payment + fee detail + V2 reminder). Sarah does not pay for Inès. Primary: Voir l’avis et la suite.

Device: Mobile portrait ~390×844. Scrollable. One screen only.

Screen type: OPERATIONAL settlement confirmation + proof consultation.

Screen purpose: Transparency of revenue — not a flat recap. Sequence then secured ledger.

Layout:
1) Demo banner Étape 8 sur 8
2) Visible sequence strip (read-only):
 - Imputation du versement initial de 50 €
 - Solde dû : 130 €
 - Inès règle les 130 €
3) Confirmation: « Paiement terminé — aucune somme restante. »
4) Ledger rows:
 - Prestation initiale V1 170 €
 - Modification V2 +10 € (link Voir engagement V2)
 - Total final 180 €
 - Versement initial −50 €
 - Solde réglé 130 € (link Voir preuve)
 - Frais plateforme 18 € (10%) (link Voir détail des frais)
 - Revenu net Sarah 162 € (emphasized)
5) Sticky CTA « Voir l’avis et la suite »

French UI text:
- Banner: « Mode démo — Inès est une cliente simulée · Étape 8 sur 8 »
- Sequence as above
- Confirm: « Paiement terminé — aucune somme restante. »
- « Total final » — « 180 € »
- « Solde réglé par Inès » — « 130 € »
- « Frais de plateforme » — « 18 € (10 %) »
- « Revenu net » — « 162 € »
- Fee sheet: « Base 180 € · frais 10 % = 18 € · revenu net 162 € · modèle figé dans le cadre de la démo »
- Payment proof: « 130 € · après acompte 50 € · total 180 € · Payé par Inès »
- CTA: « Voir l’avis et la suite »

Interactions: Open proof/fee sheets; close returns to SETTLED recap. Consultation recommended not mandatory.

Visual: Calm financial confirmation — optional small finished style thumb of Black woman with textured braids. Premium, not fintech neon.

Design system Nolaya. JetBrains Mono for all money figures. Strong net emphasis without card spam. No purple, no glow, no emoji. All visible UI text in French.
```
========== END SCREEN 16 ==========

========== SCREEN 17 / S17 — Avis, relation (+ fin / retour) ==========
```text
Independent screen. Generate ONLY this one screen. Do not generate other screens from this document.

Product context: Nolaya transactional demo Act E — FUSED screen: review + reply + coups de cœur relation + demo closure feedback. Banner Étape 8 sur 8. Inès review is DETERMINISTIC and must be READ (not a disposable toast). Sarah REALLY replies (tone/model choice + send confirmation). Then immersive favorite sheet (not flat banner). Closing branch opens ANSWERABLE feedback form (5 required + 1 optional) then thank-you with restart/incident/close. NO preference configuration by Sarah. NO capacity.

Device: Mobile portrait ~390×844. Scrollable. Design the PRIMARY state as the review + reply screen with visible alternative actions; include the favorite sheet and the feedback/thank-you as clearly labeled overlay variants in the same prompt if needed — but generate ONE main mobile frame focused on the avis + actions (favorite sheet can be shown as an open overlay on that frame). One screen composition only — do not output a multi-screen flow diagram.

Screen type: OPERATIONAL review / relation / demo closure.

Screen purpose:
17a — Read scores + comment; open reply sheet; choose tone; send → REVIEW_REPLIED
17b — Immersive « Inès vous a ajoutée à ses favorites » sheet + read-only client fiche
17c — Terminer → answerable feedback → merci / ce qu’elle a vu

Layout (main frame):
1) Demo banner Étape 8 sur 8
2) Review block with 6 dimensions + comment quote
3) Primary « Répondre à l’avis »
4) Reply sheet: tone choices (Remerciement chaleureux suggested · Professionnel · Court) + editable short model + Envoyer
5) Favorite immersive sheet overlay content available
6) Actions: Voir la fiche cliente · Donner mon avis sur cette étape · Tester un incident
7) Feedback modal content (branch Terminer): summary of what she saw + 5 required Q + 1 optional + Enregistrer mon retour + thank-you

French UI text:
- Banner: « Mode démo — Inès est une cliente simulée · Étape 8 sur 8 »
- Title: « Avis d’Inès »
- Scores:
 - « Résultat technique — 5/5 »
 - « Communication — 5/5 »
 - « Ponctualité — 5/5 »
 - « Conformité du prix — 5/5 »
 - « Confort — 4/5 »
 - « Résolution des modifications — 5/5 »
- Comment: « Sarah a bien pris en compte mon cuir chevelu sensible et m’a expliqué le supplément avant d’ajouter les perles. »
- Primary: « Répondre à l’avis »
- Tones:
 - « Remerciement chaleureux » (suggested): « Merci Inès — ravie que le confort et la transparence sur les perles aient compté. À bientôt ! »
 - « Professionnel »: « Merci pour votre avis. Au plaisir de vous accueillir de nouveau. »
 - « Court »: « Merci pour votre retour, Inès. »
- Send: « Envoyer la réponse » → « Réponse envoyée »
- Favorite sheet: « Inès vous a ajoutée à ses favorites »
- Coups de cœur body: « Elle consent à mémoriser ses préférences (cuir chevelu sensible, cuir chevelu sensible, mi-dos + mèches) et pourra reprendre cette prestation depuis son historique. »
- « Voir la fiche cliente » — lecture seule
- « Donner mon avis sur cette étape »
- « Tester un incident »
- Closure summary: « Vous avez reçu une demande structurée, obtenu une précision, sécurisé une proposition, préparé le rendez-vous, fait accepter une modification, reçu le règlement final (180 € · net 162 €) et répondu à l’avis d’Inès. »
- Feedback Q1: « La demande contenait-elle assez d’informations pour décider ? » — Oui / Partiellement / Non
- Q2: « Le prix, le versement initial, le solde et votre revenu net étaient-ils clairs ? » — Oui / Partiellement / Non
- Q3: « La checklist et la trace de modification (perles) vous auraient-elles protégée en vrai ? » — Oui / Partiellement / Non
- Q4: « Utiliseriez-vous ce fonctionnement avec une vraie cliente ? » — Oui / Mitigé / Non
- Q5: « À quel moment le parcours vous a-t-il paru artificiel ? » — texte libre requis
- Q6: « Commentaire libre » — optionnel
- Save: « Enregistrer mon retour »
- Thanks: « Merci d’avoir testé le parcours Sarah / Inès. »
- Thanks body: « Vous avez parcouru le parcours : offre & planning → demande → confirmation → réalisation → paiement & relation. »
- After: « Recommencer le scénario » · « Tester un incident » · « Fermer »

Interactions: Read → reply with tone → send confirmed. Favorite is constat (sheet + read-only fiche), not configuration. Feedback requires Q1–Q5 to save. Without save, feedback not collected.

Visual: Review/relation mood — finished knotless braids with subtle pearls on Black woman with textured hair; Sarah avatar Black stylist. Premium, warm, not emoji-heavy.

Design system Nolaya. Manrope + JetBrains Mono for scores. Minimal fused closure — avoid survey wall density; keep form readable. No purple, no glow, no emoji, no dark mode. All visible UI text in French.
```
========== END SCREEN 17 ==========

---

## Notes d’usage Stitch (batch)

1. Coller **tout le fichier** si l’outil accepte un batch, ou coller **un bloc SCREEN à la fois**. 
2. Chaque `SCREEN XX` doit produire **exactement un** écran mobile indépendant. 
3. Ne pas fusionner S09 (décision + offre = un écran storyboard) avec d’autres écrans ; ne pas resplitter S17. 
4. Conserver le design system charcoal / soft gold / Manrope / JetBrains Mono. 
5. Bandeau : `Mode démo — … · Étape X sur 8` (création 1–3 / Inès 4–8). Toasts Inès : préfixe « Simulation : Inès (la cliente)… ». 
6. Rails figés : 170 € / 50 € / 15 août 9 h → modification +10 € / +20 min → 180 € · solde 130 € · frais 18 € · net 162 €. 
7. Vocabulaire interdit en UI : capacité, CAPACITY_OPEN, « dossier », « tension légère », « Limite de charge », « Faisabilité », codes machine (FIRM_PROPOSAL, SCHEDULE_ACTIVE…), « annotations », « Scène / Acte ». 
8. UI française simple : « Demandes », « Demande d’Inès », « Décision », « trace / accord », « Paiement », « dans le cadre de la démo ».

## Contrôle qualité

- [ ] 17 prompts = 17 écrans du storyboard cible 
- [ ] Format batch `SCREEN XX / SXX` + `END SCREEN` 
- [ ] Chaque prompt commence par « Independent screen… » 
- [ ] Chaque prompt auto-suffisant (design system + device + contexte) 
- [ ] Bandeaux Étape 1–8 sur 8 
- [ ] Immersion A–E reflétée ; WHY perles + WHY trace/accord ; discoverability `#nouveaux-ajouts` ; nav Demandes ; toasts Simulation Inès 
- [ ] Pas de CAPACITY_OPEN 
- [ ] Prompts EN · UI FR · Mobile 390×844 · identité afro / textured hair 
- [ ] Design system Nolaya / tokens `demo-precurseur`
