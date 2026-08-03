# Prompts Stitch — Démo précurseur cible (cadre → prestations → planning)

> Source de vérité : `3-storyboard-precurseur-cible.md`  
> Contexte métier : `2-precurseur-cadre-prestations-planning.md`  
> Device : Mobile (≈390×844)  
> Prompt language : English  
> UI text language : French  
> Design system : Atelier Synergy (aligné `demo-precurseur/`)  
> Visual identity : Afro / textured hair — Black & mixed-race women  
> Scope : Parcours précurseur Sarah — **19 écrans indépendants** — `PROFESSIONAL_FRAMEWORK_DRAFT` → `PROFESSIONAL_FRAMEWORK_ACTIVE` → `OFFER_DRAFT` → `OFFER_ACTIVE` → `SCHEDULE_DRAFT` → `SCHEDULE_ACTIVE`  
> Hors scope : cliente Inès (sauf CTA optionnel de sortie), opérateur, IN_REVIEW, paiement réel, auth  
> **Retiré :** objet « capacité », `CAPACITY_DRAFT`, `CAPACITY_OPEN`, « ouvrir une capacité »

---

## Mode d’emploi (humain)

Ce document contient **19 écrans mobiles indépendants**.  
Vous pouvez coller **le fichier entier** dans Google Stitch.

Stitch doit générer **un écran distinct par bloc SCREEN PROMPT** — pas un méga-écran, pas un diagramme de flux, pas une fusion des écrans.

Ordre : SCREEN 01 (S01) → SCREEN 19 (S19).  
Bandeau démo : **Étape 1 sur 8** (S01–S09) · **2 sur 8** (S10–S15) · **3 sur 8** (S16–S19) — aligné `demo-precurseur` (pas « Scène / Acte »).

---

## GLOBAL INSTRUCTION FOR STITCH (ENGLISH)

```text
BATCH OF INDEPENDENT SCREENS — Atelier Synergy precursor demo (Sarah)

This document contains exactly 19 independent mobile UI screens.
Generate exactly ONE mobile screen per SCREEN PROMPT below (SCREEN 01 … SCREEN 19).

CRITICAL RULES:
- Do NOT combine screens into one layout.
- Do NOT create a flow diagram, journey map, or multi-screen collage.
- Do NOT generate screens that are not requested in the current prompt block.
- Each prompt is fully self-contained. Ignore other prompts when generating one screen.
- For each SCREEN PROMPT, produce a single portrait mobile app screen (~390×844).
- All visible UI text must be in French.
- Prompt language is English; UI copy is French.
- Professional, minimalist, calm editorial spacing. Less on screen is better: one job, one headline, one short support, one primary CTA.
- Maximize whitespace. Avoid dense dashboards, card spam, pill clusters, multi-layer shadows, purple/indigo gradients, emoji, dark mode.
- No “capacity” / CAPACITY_OPEN / “ouvrir une capacité” vocabulary.
- Prefer French demo phrasing « dans le cadre de la démo » when referring to the demo context in UI (never “happy path” in French UI).
- Afro / textured hair visual identity whenever imagery is needed: Black and/or mixed-race women with coily/curly/textured hair.
- Design system: Manrope (UI) + JetBrains Mono (badges/amounts/status); charcoal #000101 / #1b1c1c; soft gold #775a19 / #fdd587 sparingly; surfaces #fbf9f8 / #ffffff / #f5f3f2 / #efedec; soft radii 0.25rem; portfolio media sharp corners (0px).

Numbered screens: SCREEN 01 … SCREEN 19 (IDs S01 … S19).
```

---

## Design system (référence rapide)

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

| Phase | Écrans | Bandeau |
| ----- | ------ | ------- |
| P1 Cadre | S01–S09 | `Mode démo — Créez votre offre · Étape 1 sur 8` |
| P2 Prestations | S10–S15 | `Mode démo — Créez votre offre · Étape 2 sur 8` |
| P3 Planning | S16–S19 | `Mode démo — Créez votre offre · Étape 3 sur 8` |

Navigation produit (quand visible) : Accueil · Demandes · Rendez-vous · Prestations · Profil · bientôt.

---

## Cartographie des écrans

| ID | Écran | Type | Acteur | Étape / moment | Priorité |
| -- | ----- | ---- | ------ | -------------- | -------- |
| S01 | Démarrer la démonstration | Démo | Sarah | Entrée dispositif | P0 |
| S02 | Tableau de bord de Sarah | Opérationnel | Sarah | Accueil app vide | P0 |
| S03 | Accueil du cadre professionnel | Explicatif | Sarah | Entrée P1 | P0 |
| S04 | Contextes d’exercice | Opérationnel | Sarah | P1 · step 1/5 | P0 |
| S05 | Accueil et accès | Opérationnel | Sarah | P1 · step 2/5 | P0 |
| S06 | Vos pauses pendant une longue prestation | Opérationnel | Sarah | P1 · step 3/5 | P0 |
| S07 | Communication et paiement | Opérationnel | Sarah | P1 · step 4/5 | P0 |
| S08 | Retard, annulation et photos | Opérationnel | Sarah | P1 · step 5/5 | P0 |
| S09 | Récapitulatif du cadre | Opérationnel | Sarah | Activation cadre | P0 |
| S10 | Cadre actif → créer une prestation | Explicatif / pont | Sarah | Fin P1 · entrée P2 | P0 |
| S11 | Prestation et longueurs | Opérationnel | Sarah | P2 · step 1/4 | P0 |
| S12 | Galerie de la prestation | Opérationnel | Sarah | P2 · step 2/4 | P0 |
| S13 | Préparation avant le rendez-vous | Opérationnel | Sarah | P2 · step 3/4 | P0 |
| S14 | Prix par longueur (+ option hors longueur) | Opérationnel | Sarah | P2 · step 4/4 | P0 |
| S15 | Récapitulatif et activation de l’offre | Opérationnel | Sarah | Activation offre | P0 |
| S16 | Offre active → définir le planning | Explicatif / pont | Sarah | Fin P2 · entrée P3 | P0 |
| S17 | Configurer le planning | Opérationnel | Sarah | P3 · configuration | P0 |
| S18 | Récapitulatif et activation du planning | Opérationnel | Sarah | Activation planning | P0 |
| S19 | Planning actif (+ fin / enchaînement) | Opérationnel | Sarah | Fin `SCHEDULE_ACTIVE` | P0 |

**Stepper P1 (S04–S08) :** 1 Contextes · 2 Accueil · 3 Pause · 4 Communication · 5 Politiques  
**Stepper P2 (S11–S14) :** 1 Prestation · 2 Galerie · 3 Préparation · 4 Prix — **pas de lieu/dispos dans P2**  
**Fusions :** S10 (anciens 10+11) · S16 (anciens 17+18) · S19 (anciens 21+22)

---

========== SCREEN 01 / S01 — Démarrer la démonstration ==========
```text
Independent screen. Generate ONLY this one screen. Do not generate other screens from this document.

Product context: Atelier Synergy — premium B2B2C mobile platform for Afro / textured hair professionals. This is SCREEN 01 of 19 in a precursor demo (Professional Framework → Prestations → Planning → SCHEDULE_ACTIVE). Demo entry only — not final product chrome, but must feel premium. No “capacity” concept. Stylist: Sarah, braid stylist in Saint-Denis. No client persona.

Device: Mobile app screen only, portrait ~390×844. No desktop. One composition, not a dashboard.

Screen type: DEMO orientation / mission brief. NOT a form. No product bottom tabs (or muted preview only).

Screen purpose: Introduce Sarah’s demo mission: define how she works, create a prestation, then define when she is available. Duration 8–12 minutes. Calm, minimal, editorial.

Layout (maximize whitespace):
1) Slim demo banner top: « Mode démo — Créez votre offre · Étape 1 sur 8 » with subtle reset/quit
2) Brand mark / product name Atelier Synergy as a calm hero-level signal
3) One mission headline + one short supporting sentence
4) « Vous dans cette démo » block + duration chip
5) « Ce que vous allez faire » — 3 simple steps (not card spam)
6) Single primary sticky CTA

French UI text:
- Banner: « Mode démo — Créez votre offre · Étape 1 sur 8 »
- Headline: « Créez votre offre professionnelle »
- Body: « Définissez comment vous travaillez, ce que vous proposez, puis quand vous êtes disponible. »
- « Vous dans cette démo »: « Sarah — coiffeuse en tresses, Saint-Denis »
- Parcours: « 1. Vos règles, votre offre, vos dispos » · « 2. Une demande cliente (Inès, simulée) »
- Duration: « Durée estimée : 8 à 12 minutes »
- Steps title: « Ce que vous allez faire »
  1) « Cadre professionnel » — « Comment vous travaillez »
  2) « Prestations » — « Ce que vous proposez »
  3) « Planning actif » — « Quand vous êtes disponible »
- Note: « Aucune cliente dans cette démonstration. »
- CTA: « Commencer »
- Optional ghost: « Quitter la démonstration »

Interactions: Primary CTA « Commencer ». Optional quit. Nothing else.

Visual: Full-bleed or edge-dominant calm hero of a Black and/or mixed-race woman stylist with coily/curly/textured Afro hair (braids, twists/vanilles, ponytails, locs, natural coils) in a premium home salon / studio. Realistic, respectful. No straight Eurocentric hair as default. No floating badges on the hero.

Design system Atelier Synergy (self-contained): Manrope UI, JetBrains Mono sparingly. Charcoal #000101 / #1b1c1c, soft gold #775a19 / #fdd587 sparingly, surfaces #fbf9f8 / #ffffff / #efedec. Soft 0.25rem radii. No purple gradients, no neon glow, no emoji, no dark mode, no heavy multi-shadows, no pill clusters.

Quality bar: Premium mobile demo entry, calm editorial whitespace, one job. All visible UI text in French.
```
========== END SCREEN 01 ==========

========== SCREEN 02 / S02 — Tableau de bord de Sarah ==========
```text
Independent screen. Generate ONLY this one screen. Do not generate other screens from this document.

Product context: Atelier Synergy precursor demo — stylist home. Empty state: no ACTIVE professional framework, no active offer, no planning. Sarah must create (not finalize a prefilled draft). No “capacity” vocabulary. Stylist: Sarah.

Device: Mobile portrait ~390×844. One calm hub composition — not a dense dashboard.

Screen type: OPERATIONAL hub / empty home. Product bottom navigation visible.

Screen purpose: Signal that the professional framework is not active yet. One clear task. Secondary help opens a BOTTOM SHEET (2–3 sentences), not a second full pedagogical screen.

Layout (maximize whitespace):
1) Demo banner: « Mode démo — Créez votre offre · Étape 1 sur 8 »
2) Header: « Bonjour Sarah »
3) Bottom nav: Accueil (active) · Demandes · Rendez-vous · Prestations · Profil · bientôt — Demandes and Rendez-vous empty; Prestations has no active offer
4) One main status indicator
5) One primary task block
6) Secondary text link for help
7) Primary CTA
8) Optional overlay variant: bottom sheet with short explanation

French UI text:
- Banner: « Mode démo — Créez votre offre · Étape 1 sur 8 »
- Greeting: « Bonjour Sarah »
- Status: « Votre cadre professionnel n’est pas encore actif »
- Task title: « Définir comment vous exercez »
- Helper: « Sans cadre actif, aucune prestation ni planning ne peut recevoir de demande. »
- Primary CTA: « Définir mon cadre »
- Secondary: « Qu’est-ce qu’un cadre professionnel ? »
- Bottom sheet title: « Cadre professionnel »
- Bottom sheet body: « Le cadre décrit comment vous travaillez : contextes, accueil, pause, communication, paiement, politiques. Ce n’est pas encore votre prestation. Vous le définissez une fois, puis vous l’utilisez pour ce que vous proposez. »
- Sheet dismiss: « Compris »
- Subtle empty hints: Demandes / Rendez-vous empty ; Prestations « Aucune offre active »

Interactions: Primary → framework welcome. Secondary opens bottom sheet only. No client demand cards. No prefilled prestation draft.

Visual: Optional small avatar of Black woman stylist with textured Afro hair named Sarah. Calm empty-state atmosphere — not cartoonish illustration spam.

Design system Atelier Synergy: Manrope + JetBrains Mono for status chips. Charcoal #000101, soft gold #775a19 / #fdd587 sparingly, surfaces #fbf9f8 / #ffffff / #efedec, soft 0.25rem radii. No purple, glow, emoji, dark mode, multi-shadows, pill clusters. All visible UI text in French.
```
========== END SCREEN 02 ==========

========== SCREEN 03 / S03 — Accueil du cadre professionnel ==========
```text
Independent screen. Generate ONLY this one screen. Do not generate other screens from this document.

Product context: Atelier Synergy precursor demo — Professional Framework entry. Demo target path: status PROFESSIONAL_FRAMEWORK_DRAFT. Explains HOW Sarah works — not what she sells. No “capacity”. Stylist: Sarah.

Device: Mobile portrait ~390×844. Scrollable. Calm editorial spacing.

Screen type: EXPLICATIVE entry / orientation (NOT a form). No input fields, toggles, or operational lists.

Screen purpose: Orient before any input. One headline, short pedagogy, five pillars, one CTA.

Layout (maximize whitespace):
1) Demo banner Étape 1 sur 8
2) Sticky header: back + « Cadre professionnel »
3) Status badge JetBrains Mono uppercase: « BROUILLON »
4) Welcome headline + short paragraph
5) Full-bleed hero with short overlay intention
6) Section « Ce que vous allez définir » — 5 pillar blocks (icon + title + 1–2 sentences): Lieux · Accueil · Pauses · Communication & paiement · Règles
7) Soft note about platform principles already integrated
8) Single primary sticky CTA

French UI text:
- Banner: « Mode démo — Créez votre offre · Étape 1 sur 8 »
- Header: « Cadre professionnel »
- Badge: « BROUILLON »
- Headline: « Définissez comment vous travaillez. »
- Body: « Ce n’est pas encore votre prestation. C’est le cadre dans lequel vous acceptez de travailler. »
- Hero overlay: « Rendre votre façon de travailler claire et prévisible. »
- Pillars title: « Ce que vous allez définir »
  1) « Lieux de travail » — « Où vous travaillez et si l’adresse reste privée. »
  2) « Accueil » — « Accompagnants, mineurs, comment trouver / entrer. »
  3) « Pauses » — « Vos pauses pendant une longue prestation. »
  4) « Communication & paiement » — « Comment on vous joint et comment vous êtes payée. »
  5) « Règles & sécurité » — « Retard, annulation, interruption et photos. »
- Note: « Certaines règles de sécurité sont déjà prévues par la plateforme. »
- CTA: « Commencer »

Interactions: Only CTA « Commencer ». Back allowed.

Visual: Hero of a Black and/or mixed-race woman stylist with coily/curly/textured Afro hair in a calm premium studio. Realistic, respectful. No straight Eurocentric hair as default. No floating badges on hero.

Design system Atelier Synergy: Manrope, JetBrains Mono badges, charcoal #000101, soft gold #775a19 / #fdd587 sparingly, surfaces #fbf9f8 / #ffffff. Soft 0.25rem radii; hero media sharper OK. No purple, glow, emoji, dark mode, card spam. All visible UI text in French.
```
========== END SCREEN 03 ==========

========== SCREEN 04 / S04 — Contextes d’exercice ==========
```text
Independent screen. Generate ONLY this one screen. Do not generate other screens from this document.

Product context: Atelier Synergy precursor demo — Professional Framework step 1/5. Demo target (dans le cadre de la démo): Salon selected; address masked until engagement. Reasonable default may be pre-checked; Sarah can change it. No “capacity”. Stylist: Sarah.

Device: Mobile portrait ~390×844.

Screen type: OPERATIONAL form step. Minimal, one job: contexts + address confidentiality.

Layout (maximize whitespace):
- Demo banner Étape 1 sur 8
- Header back + « Cadre professionnel »
- Badge « BROUILLON »
- Vertical storyline stepper: 1 Contextes · 2 Accueil · 3 Pause · 4 Communication · 5 Politiques (step 1 active, soft-gold marker)
- Section title + short helper
- Multi-select context choices (choice rows, not pill spam)
- Single-choice confidentiality
- Sticky CTA « Continuer » (disabled until ≥1 context + confidentiality choice)

French UI text:
- Banner: « Mode démo — Créez votre offre · Étape 1 sur 8 »
- Title: « Où vous travaillez »
- Intro: « Ces lieux s’appliquent par défaut à vos prochaines prestations. »
- Helper: « Où travaillez-vous ? »
- Options:
  1) « Chez moi »
  2) « En salon » (demo target selected)
  3) « En déplacement »
- Label: « Confidentialité de l’adresse »
- Choices: « Adresse masquée jusqu’à l’engagement » (demo target) / « Adresse visible plus tôt »
- CTA: « Continuer »

Interactions: Multi-select contexts; single confidentiality; CTA gated; back allowed.

Visual: Optional small editorial image of a Black woman with textured Afro hair styling in a salon. Premium realistic.

Design system Atelier Synergy: Manrope, JetBrains Mono for badges, charcoal #000101, soft gold #775a19 / #fdd587 sparingly, surfaces #fbf9f8 / #ffffff / #efedec, soft 0.25rem radii. No purple, glow, emoji, dark mode, multi-shadows. All visible UI text in French.
```
========== END SCREEN 04 ==========

========== SCREEN 05 / S05 — Accueil et accès ==========
```text
Independent screen. Generate ONLY this one screen. Do not generate other screens from this document.

Product context: Atelier Synergy precursor demo — Professional Framework step 2/5. Demo target (dans le cadre de la démo): companions not allowed; minors accepted with accompanying adult; access note « Sonner à l’entrée du salon ». No “capacity”. Stylist: Sarah.

Device: Mobile portrait ~390×844.

Screen type: OPERATIONAL. One job: welcome / access rules.

Layout (maximize whitespace):
- Demo banner Étape 1 sur 8
- Header + badge BROUILLON
- Stepper step 2 active (Accueil)
- Two clear choice groups (companions, minors)
- Short text field for access instruction
- Sticky CTA Continuer (enabled when both groups answered)

French UI text:
- Banner: « Mode démo — Créez votre offre · Étape 1 sur 8 »
- Title: « Accueil et accès »
- Intro: « Vos règles d’accueil pour les clientes. »
- « Accompagnants »
  - « Non autorisés » (demo target)
  - « Autorisés »
- « Mineurs »
  - « Acceptés avec accompagnateur » (demo target)
  - « Non acceptés »
- Field: « Consigne d’accès »
- Sample: « Sonner à l’entrée du salon »
- CTA: « Continuer »

Interactions: Single-select per group; access note optional but prefilled for demo; back allowed.

Visual: Optional calm welcoming Afro hair studio with Black woman stylist. Premium respectful.

Design system Atelier Synergy: Manrope, JetBrains Mono badges, charcoal/gold, light surfaces, soft radii. No purple, glow, emoji, dark mode, pill clusters. All visible UI text in French.
```
========== END SCREEN 05 ==========

========== SCREEN 06 / S06 — Vos pauses ==========
```text
Independent screen. Generate ONLY this one screen. Do not generate other screens from this document.

Product context: Atelier Synergy precursor demo — Professional Framework step 3/5. Unique product moment: “pauses pendant une longue prestation”. Demo does NOT auto-recalculate slot durations from this rule; it makes the right exist. Default: 5 minutes every hour. « Aucune » is a valid choice. No “capacity”. Stylist: Sarah.

Device: Mobile portrait ~390×844.

Screen type: OPERATIONAL. Pedagogical + choice. One job: set pause right.

Layout (maximize whitespace):
- Demo banner Étape 1 sur 8
- Header + badge BROUILLON
- Stepper step 3 active (Pause)
- Clear title + one explanatory paragraph
- Single-select option list (radio rows): Aucune · 5 min / h · 10 min / h · Personnaliser
- If Personnaliser: simple minutes + frequency fields
- Soft informational note about client reminder / no auto duration math
- Sticky CTA Continuer

French UI text:
- Banner: « Mode démo — Créez votre offre · Étape 1 sur 8 »
- Title: « Vos pauses pendant une longue prestation »
- Body: « Pendant une prestation longue, vous pouvez prévoir des pauses. Elles font partie de votre cadre. »
- Options:
  - « Aucune »
  - « 5 minutes toutes les heures » (demo default / target)
  - « 10 minutes toutes les heures »
  - « Personnaliser »
- Effect note: « Cette règle pourra être rappelée à la cliente avant l’engagement. »
- Duration note: « Elle n’est pas ajoutée automatiquement à la durée des créneaux dans le cadre de la démo. »
- CTA: « Continuer »

Interactions: Single-select; customize fields if needed; CTA enabled when a choice is made (including Aucune).

Visual: Optional calm break-in-studio mood with Black woman stylist with textured hair — dignified, not lazy/cliché. Premium.

Design system Atelier Synergy: Manrope, JetBrains Mono for « 5 min / h » chips if used. Charcoal #000101, soft gold #775a19 / #fdd587 sparingly, surfaces #fbf9f8 / #ffffff. Soft radii. No purple, glow, emoji, dark mode. All visible UI text in French.
```
========== END SCREEN 06 ==========

========== SCREEN 07 / S07 — Communication et paiement ==========
```text
Independent screen. Generate ONLY this one screen. Do not generate other screens from this document.

Product context: Atelier Synergy precursor demo — Professional Framework step 4/5. Payment methods are DECLARATIVE only (no PSP, no card numbers). Demo target (dans le cadre de la démo): via platform (+ Instagram/TikTok available); expected reply under 2h during open slots; Card + Platform payment accepted; remaining balance paid at end (fixed path, not a choice). No “capacity”. Stylist: Sarah.

Device: Mobile portrait ~390×844.

Screen type: OPERATIONAL. One job: communication + payment declarations.

Layout (maximize whitespace):
- Demo banner Étape 1 sur 8
- Header + BROUILLON
- Stepper step 4 (Communication)
- Section Communication: « Où vous écrire » (incl. Instagram/TikTok) + Temps de réponse habituel
- Section Paiement: accepted payment methods + soft note that remaining balance is paid at end
- Sticky CTA Continuer (needs ≥1 channel + ≥1 payment method)

French UI text:
- Banner: « Mode démo — Créez votre offre · Étape 1 sur 8 »
- Title: « Communication et paiement »
- Intro: « Comment on vous joint, et comment vous êtes payée. »
- « Où vous écrire » (multi-select, helper « Plusieurs choix possibles. ») : « Via la plateforme » (demo target) · « Instagram (Insta) » · « TikTok »
- « Temps de réponse habituel »
  - Helper: « Temps dans lequel vous essayez de répondre quand une cliente vous écrit. »
  - Value (demo target): « Sous 2 heures pendant les créneaux ouverts »
- « Moyens de paiement acceptés » (multi-select): « Carte » · « Paiement via la plateforme » (both selected for demo) · « Espèces » · « Virement »
- Soft note (no separate Solde choice — only path): « Le reste à payer se règle à la fin de la prestation. »
- CTA: « Continuer »

Interactions: Channel multi-select; delay field; payment multi-select; CTA gated on ≥1 channel + ≥1 payment; no payment processing UI. No separate « Solde » selector.

Visual: Optional editorial of Black woman stylist with textured hair checking messages on phone. Premium.

Design system Atelier Synergy: Manrope, JetBrains Mono sparingly, charcoal/gold, light surfaces, soft radii. No purple, glow, emoji, dark mode, PSP UI. All visible UI text in French.
```
========== END SCREEN 07 ==========

========== SCREEN 08 / S08 — Retard, annulation et photos ==========
```text
Independent screen. Generate ONLY this one screen. Do not generate other screens from this document.

Product context: Atelier Synergy precursor demo — Professional Framework final config step before recap. Short catalog policies. Demo target: 15 min late; cancellation catalog choice; interruption + photos as `.platform-rule` platform defaults (grayed, NOT `choice-active`); photos only with client agreement. No “capacity”. Stylist: Sarah.

Device: Mobile portrait ~390×844.

Screen type: OPERATIONAL. Step 5/5. One job: policies + safety + photos.

Layout (maximize whitespace — avoid dense legal look):
- Demo banner Étape 1 sur 8
- Header + BROUILLON
- Stepper step 5 active
- Late tolerance selector
- Catalog of 3 short cancellation choices (select one) — calm rows, not card spam
- Safety / interruption: `.platform-rule` grayed platform default (not `choice-active`)
- Photos de la cliente: `.platform-rule` locked platform rule (not a colored choice)
- Sticky CTA « Continuer »

French UI text:
- Banner: « Mode démo — Créez votre offre · Étape 1 sur 8 »
- Title: « Retard, annulation et photos »
- Intro: « Choisissez des règles simples. »
- « Retard toléré »: « 15 minutes » (demo target) / « 10 minutes » / « 20 minutes »
- « Annulation / report »
  1) « Annulation selon le délai restant » (demo target)
  2) « Annulation gratuite jusqu’à 24 h avant »
  3) « Annulation gratuite jusqu’à 48 h avant »
- « Interruption pour sécurité » — platform rule (`.platform-rule`, grayed, NOT `choice-active`):
  - Label: « Possible si douleur forte ou malaise »
  - Tag: « Fixé par la plateforme » (`.platform-rule`, NOT `choice-active`)
- « Photos de la cliente » — `.platform-rule` locked:
  - « Publication uniquement avec l’accord de la cliente »
  - Tag: « Fixé par la plateforme »
- CTA: « Continuer »

Interactions: Late + cancellation editable; interruption AND photos are `.platform-rule` locked (not colored choices). Back allowed.

Visual: Optional finished protective style on Black woman with textured hair — portfolio mood, not a legal document look.

Design system Atelier Synergy: Manrope, JetBrains Mono, charcoal/gold, light surfaces, soft radii. No purple, glow, emoji, dark mode. All visible UI text in French.
```
========== END SCREEN 08 ==========

========== SCREEN 09 / S09 — Récapitulatif du cadre ==========
```text
Independent screen. Generate ONLY this one screen. Do not generate other screens from this document.

Product context: Atelier Synergy precursor demo — Professional Framework recap + deliberate activation via CTA. No operator review. Instant ACTIVE after CTA. No silent/auto activation. Status before confirm: BROUILLON → after: PROFESSIONAL_FRAMEWORK_ACTIVE. No “capacity”. Stylist: Sarah.

Device: Mobile portrait ~390×844.

Screen type: OPERATIONAL summary + activation. One job: verify then activate.

Layout (maximize whitespace — summary blocks, not dashboard spam):
- Demo banner Étape 1 sur 8
- Header « Récapitulatif »
- Badge « BROUILLON »
- Scrollable summary sections with « Modifier » text links
- Sticky primary CTA « Activer mon cadre professionnel »

French UI text:
- Banner: « Mode démo — Créez votre offre · Étape 1 sur 8 »
- Title: « Récapitulatif »
- Intro: « Relisez vos règles avant de les activer. »
- Sections (demo filled values) with « Modifier » links:
  - « Contextes » — « En salon · adresse masquée »
  - « Accueil » — « Pas d’accompagnants · mineurs avec accompagnateur »
  - « Pause » — « 5 min / h »
  - « Communication & paiement » — « Via la plateforme · Sous 2 heures… » + « Carte · Paiement via la plateforme · reste à payer en fin de prestation »
  - « Règles & photos » — « Retard 15 min · Annulation selon le délai restant » + « Photos : uniquement avec l’accord de la cliente »
- CTA: « Activer mon cadre professionnel »
- No confirmation checkbox (activation is the deliberate CTA itself)

Interactions: CTA enabled when framework draft is complete. Modifier links navigate back to steps. Activation instantaneous (no IN_REVIEW).

Visual: Optional small avatar of Black woman stylist with textured hair.

Design system Atelier Synergy: Manrope, JetBrains Mono for status labels, charcoal #000101, soft gold sparingly, surfaces #fbf9f8 / #ffffff, soft radii. No purple, glow, emoji, dark mode. All visible UI text in French.
```
========== END SCREEN 09 ==========

========== SCREEN 10 / S10 — Cadre actif → créer une prestation ==========
```text
Independent screen. Generate ONLY this one screen. Do not generate other screens from this document.

Product context: Atelier Synergy precursor demo — BRIDGE screen after PROFESSIONAL_FRAMEWORK_ACTIVE. Fuses former framework success + prestations welcome into ONE screen (do not split). Demo banner switches to Étape 2 sur 8. Entry status for next act: OFFER_DRAFT. No second explanatory screen after this. NO “capacity” / “ouvrir une capacité” wording. Stylist: Sarah.

Device: Mobile portrait ~390×844. Scrollable. Calm bridge — not a form, not a dashboard.

Screen type: Hybrid EXPLICATIVE bridge (confirmation + orientation). NOT a form. No input fields.

Screen purpose: Confirm framework activation, explain what changed, orient to create a prestation (what she proposes, gallery, client prep, price/duration). Planning comes AFTER offer activation — not on this screen.

Layout (maximize whitespace):
1) Demo banner NOW: « Mode démo — Créez votre offre · Étape 2 sur 8 »
2) Success confirmation block (calm check / status) — no confetti spam
3) Status badge « Cadre actif » (no « hérité » wording)
4) Short “what this changes” copy
5) Next-step headline + one pedagogical paragraph
6) Section pillars: Prestation · Galerie · Préparation · Prix & durée
7) Soft note that planning comes next, after offer activation
8) Primary sticky CTA + secondary ghost

French UI text:
- Banner: « Mode démo — Créez votre offre · Étape 2 sur 8 »
- Confirmation: « Votre cadre professionnel est actif »
- What changes: « Vous pouvez maintenant créer ce que vous proposez aux clientes. Le cadre s’applique par défaut — vous ne le redéfinirez pas à chaque fois. »
- Status chip: « Cadre professionnel actif »
- Next title: « Créer ce que vous proposez »
- Next body: « Choisissez une prestation, montrez comment elle se présente, dites qui prépare quoi, puis fixez prix et durée. Le planning viendra ensuite. »
- Pillars:
  1) « Prestation » — « Le service et les longueurs que vous proposez. »
  2) « Galerie » — « Des photos de cette prestation, avec un niveau de preuve clair. »
  3) « Préparation » — « Ce que vous faites, et ce que la cliente prépare avant le rendez-vous (ex. cheveux lavés). »
  4) « Prix & durée » — « Un prix et une durée pour chaque longueur. »
- Primary CTA: « Créer une prestation »
- Secondary: « Revoir mon cadre »

Interactions: Primary → prestation configuration. Secondary → framework recap (visual). No form fields.

Visual: Calm premium success + studio mood — Black woman stylist with textured Afro hair. Realistic, respectful. No cartoon confetti overload.

Design system Atelier Synergy: Manrope, JetBrains Mono for ACTIF / PROFESSIONAL_FRAMEWORK_ACTIVE, charcoal/gold, light surfaces, soft radii. No purple, glow, emoji, dark mode, card spam. All visible UI text in French.
```
========== END SCREEN 10 ==========

========== SCREEN 11 / S11 — Prestation et longueurs ==========
```text
Independent screen. Generate ONLY this one screen. Do not generate other screens from this document.

Product context: Atelier Synergy precursor demo — Offer step 1/4. One offer = one identifiable prestation. Épaisseur is multi-select (not single « Taille » size). Lengths are offered formats (multi-select). Demo target (dans le cadre de la démo): Knotless braids · Moyen · lengths Épaules (reference) + Mi-dos; length « Taille » optional. Each length will later have its own full price. Status OFFER_DRAFT. Banner Étape 2 sur 8. No place/slot fields. No “capacity”. Stylist: Sarah.

Device: Mobile portrait ~390×844.

Screen type: OPERATIONAL form step. Badge BROUILLON. One job: prestation + épaisseur (multi) + lengths.

Layout (maximize whitespace):
- Demo banner Étape 2 sur 8
- Header back + « Prestation »
- Badge « BROUILLON »
- Step indicator: « Étape 1 / 4 · Prestation »
- Vertical stepper: 1 Prestation · 2 Galerie · 3 Préparation · 4 Prix (step 1 active)
- Single-select catalog list
- Épaisseur multi-select (Fin / Moyen / Épais)
- Multi-select lengths
- Sticky CTA Continuer (disabled until prestation + ≥1 épaisseur + ≥1 length)

French UI text:
- Banner: « Mode démo — Créez votre offre · Étape 2 sur 8 »
- Title: « Prestation et longueurs »
- Intro: « Choisissez ce que vous proposez. Activez les longueurs : chacune aura ensuite son propre prix. »
- Catalog:
  1) « Knotless braids » (demo target)
  2) « Vanilles / twists »
  3) « Retwist locs »
- « Épaisseur » (multi-select — helper: « Vous pouvez en choisir plusieurs. »): « Fin » / « Moyen » (target) / « Épais »
- « Longueurs proposées » (multi):
  - Helper: « La plus courte activée servira de longueur de référence pour le tarif. »
  - « Épaules » (target, référence suggérée)
  - « Mi-dos » (target)
  - « Taille » (optional — hair length name, not the épaisseur field)
- CTA: « Continuer »

Interactions: Single prestation; multi épaisseur; multi lengths; CTA gated. Back allowed.

Visual: Optional editorial of knotless braids on a Black woman with textured Afro hair. Premium realistic. Any photos: Black and/or mixed-race women with coily/curly/textured hair. No straight Eurocentric hair as default.

Design system Atelier Synergy: Manrope, JetBrains Mono badges, charcoal #000101, soft gold #775a19 / #fdd587 sparingly, surfaces #fbf9f8 / #ffffff, soft 0.25rem radii. No purple, glow, emoji, dark mode, pill clusters. All visible UI text in French.
```
========== END SCREEN 11 ==========

========== SCREEN 12 / S12 — Galerie de la prestation ==========
```text
Independent screen. Generate ONLY this one screen. Do not generate other screens from this document.

Product context: Atelier Synergy precursor demo — Offer gallery for Knotless braids only (not whole portfolio). No moderation / IN_REVIEW. Proof levels: Réalisation déclarée or Inspiration. Minimum 1 image; demo target (dans le cadre de la démo): 3 realizations. Forbidden: mixing vanilles, wigs, or other prestations. Status OFFER_DRAFT. Banner Étape 2 sur 8. No “capacity”. Stylist: Sarah.

Device: Mobile portrait ~390×844.

Screen type: OPERATIONAL. Step 2/4. One job: photos for THIS prestation.

Layout (maximize whitespace):
- Demo banner Étape 2 sur 8
- Header + BROUILLON
- Stepper step 2
- Context line: Knotless braids moyen — selected lengths
- 3 photo slots (sharp media corners) + add control
- Per-photo proof-level control
- Empty / incomplete helper
- Sticky CTA Continuer (≥1 photo with proof level)

French UI text:
- Banner: « Mode démo — Créez votre offre · Étape 2 sur 8 »
- Title: « Galerie de la prestation »
- Intro: « Montrez cette prestation. Chaque photo indique si c’est une réalisation déclarée ou une inspiration. »
- Context: « Knotless braids · Épaisseur Moyen · Épaules · Mi-dos »
- Add: « Ajouter une photo »
- Proof: « Réalisation déclarée » / « Inspiration / référence »
- Warning: « Ne mélangez pas d’autres prestations (vanilles, perruques…). »
- Empty: « Ajoutez au moins une photo pour continuer. »
- Helper: « Dans le cadre de la démo : trois réalisations. »
- CTA: « Continuer »

Interactions: Add/remove photos; per-photo proof; CTA gated.

Visual: Photo tiles MUST show Black and/or mixed-race women with coily/curly/textured Afro hair wearing knotless braids. Sharp media corners (0px). Premium, realistic, respectful. No straight Eurocentric hair as default.

Design system Atelier Synergy: Manrope, JetBrains Mono for proof chips, charcoal/gold, light surfaces. Soft UI radii; sharp media. No purple, glow, emoji, dark mode. All visible UI text in French.
```
========== END SCREEN 12 ==========

========== SCREEN 13 / S13 — Préparation avant le rendez-vous ==========
```text
Independent screen. Generate ONLY this one screen. Do not generate other screens from this document.

Product context: Atelier Synergy precursor demo — Offer step 3/4 « Préparation ». NO « Niveau de service » tab. NO task distribution matrix. NO Pose / Finition task rows. Focus: clear client prep instruction that will appear on the client-facing prestation. Demo TARGET (dans le cadre de la démo): « Cheveux lavés et démêlés avant le rendez-vous ». Banner Étape 2 sur 8. No “capacity”. Stylist: Sarah.

Device: Mobile portrait ~390×844.

Screen type: OPERATIONAL. Step 3/4. One job: client preparation note.

Layout (maximize whitespace — simple, accessible language):
- Demo banner Étape 2 sur 8
- Header « Prestation » + BROUILLON
- Step indicator: « Étape 3 / 4 · Préparation »
- Stepper step 3 Préparation active
- Title + short lead
- Single textarea: consigne for the client
- Soft helper that this note is visible client-side
- Sticky CTA Continuer

French UI text:
- Banner: « Mode démo — Créez votre offre · Étape 2 sur 8 »
- Title: « Préparation avant le rendez-vous »
- Intro: « Indiquez clairement ce que la cliente doit préparer avant de venir (ex. cheveux lavés et démêlés). »
- Field: « Consigne pour la cliente »
- Sample value: « Cheveux lavés et démêlés avant le rendez-vous »
- Helper: « Cette consigne sera visible côté cliente avec votre prestation. »
- CTA: « Continuer »

Interactions: Edit textarea; CTA always available (or soft-gated if empty — prefer enabled with demo prefill). No service-level tabs. No task owner toggles. No Pose / Finition.

Visual: Calm prep mood — Black woman stylist with textured hair preparing for a braid appointment. Premium respectful.

Design system Atelier Synergy: Manrope, JetBrains Mono sparingly, charcoal/gold, light surfaces, soft radii. No purple, glow, emoji, dark mode. All visible UI text in French.
```
========== END SCREEN 13 ==========

========== SCREEN 14 / S14 — Prix par longueur (+ option hors longueur) ==========
```text
Independent screen. Generate ONLY this one screen. Do not generate other screens from this document.

Product context: Atelier Synergy precursor demo — Offer PRICING (final step before offer recap). Critical pricing model (NOT “base price + vague length supplement”):

1) REFERENCE LENGTH = shortest activated length (Épaules) → base full price of the prestation.
2) OTHER LENGTHS → each has its own COMPLETE adapted price (Sarah sets full price per length; not a delta-only UX).
3) NON-LENGTH OPTION (e.g. mèches) → amount ADDED on top of the chosen length price, independent of the length scale.

Demo target schedule (dans le cadre de la démo, suggested/editable):
- Épaules (référence): 120 € · 4 h
- Mi-dos (adapté): 150 € · 5 h 30
- Taille (adapté, if activated): 180 € · 6 h 30
- Option hors longueur: « Mèches fournies » +20 €

Also show pause note from framework: « Pause du cadre : 5 min / h — rappelée à la cliente, non ajoutée automatiquement à cette durée ».
Declarative only — no PSP. Every active length needs price > 0. NO place/slot fields. Banner Étape 2 sur 8. No “capacity”. Stylist: Sarah.

Device: Mobile portrait ~390×844.

Screen type: OPERATIONAL. Step 4/4. One job: length pricing + optional non-length option.

Layout (maximize whitespace — clear rows, not ecommerce checkout clutter):
- Demo banner Étape 2 sur 8
- Header + BROUILLON
- Stepper step 4 (Prix)
- Short explainer for the 3-part pricing model
- Reference length row highlighted (badge « Référence »)
- Additional length rows with full price + duration (badge « Prix adapté »)
- Section « Option hors longueur » (visually distinct from length scale)
- Live « Aperçu devis »
- Soft pause note from cadre (no « hérité » wording)
- Sticky CTA « Voir le récapitulatif » (all active lengths priced > 0; durations set)

French UI text:
- Banner: « Mode démo — Créez votre offre · Étape 2 sur 8 »
- Title: « Prix par longueur »
- Intro: « Fixez le prix de la longueur de référence, puis adaptez le tarif des autres longueurs. »
- Helper (optional): « Plus la longueur augmente, plus vous ajustez le tarif (toujours un prix complet). »
- Do NOT show the useless phrase « Chaque longueur a son prix ».
- Model hints:
  - « Longueur de référence » — « Prix de base de la prestation »
  - « Autres longueurs » — « Prix complet adapté par longueur »
  - « Option hors longueur » — « Montant en plus du prix de la longueur choisie »
- Row Épaules: badge « Référence » · Prix « 120 € » · Durée « 4 h »
- Row Mi-dos: badge « Prix adapté » · « 150 € » · « 5 h 30 »
- Row Taille (if on): badge « Prix adapté » · « 180 € » · « 6 h 30 »
- Option section: « Option hors longueur »
  - « Mèches fournies »
  - Amount: « +20 € »
  - Helper: « Distinct du barème longueur »
- Preview title: « Aperçu devis »
- Preview lines: one line per length · « À partir de 120 € » · « + 20 € mèches fournies » if set
- Pause note: « Pause prévue dans votre cadre : 5 min / h — rappelée à la cliente, non ajoutée automatiquement à ces durées »
- CTA: « Voir le récapitulatif »

Interactions: Edit price/duration per length; add/remove non-length option; CTA gated. Values may be pre-suggested but feel like creation decisions.

Visual: Optional editorial close-up of finished knotless braids on Black woman with textured hair — portfolio pricing mood, NOT shopping cart / ecommerce checkout.

Design system Atelier Synergy: Manrope + JetBrains Mono for amounts, durations, badges (RÉFÉRENCE). Charcoal #000101, soft gold #775a19 / #fdd587 sparingly, surfaces #fbf9f8 / #ffffff. Soft radii. No purple, glow, emoji, dark mode, multi-shadows. All visible UI text in French.
```
========== END SCREEN 14 ==========

========== SCREEN 15 / S15 — Récapitulatif et activation de l’offre ==========
```text
Independent screen. Generate ONLY this one screen. Do not generate other screens from this document.

Product context: Atelier Synergy precursor demo — Offer recap + deliberate activation. Instant OFFER_ACTIVE. No operator, no IN_REVIEW. MUST show client-side preview of the prestation. Include cadre actif summary (no « hérité ») AND pricing summary (full prices per length + non-length option). CRITICAL: NO place, NO slot, NO date/time — offer exists but is not yet matchable until planning is activated. Banner Étape 2 sur 8. No “capacity”. Stylist: Sarah.

Device: Mobile portrait ~390×844.

Screen type: OPERATIONAL summary + activation. One job: verify offer then activate.

Layout (maximize whitespace):
- Demo banner Étape 2 sur 8
- Header « Prestation » / « Récapitulatif »
- Badge « BROUILLON »
- Prominent « Aperçu côté cliente » card (how the prestation appears on client side): gallery strip + title + lengths/épaisseur + « À partir de … € » + prep note
- Scrollable detail sections with « Modifier » links
- Soft note: planning comes next
- Sticky primary CTA « Activer cette prestation »

French UI text:
- Banner: « Mode démo — Créez votre offre · Étape 2 sur 8 »
- Title: « Récapitulatif de l’offre »
- Intro: « Relisez avant d’activer. Le planning viendra ensuite. »
- Client preview label: « Aperçu côté cliente »
- Client preview content: Knotless braids · Épaules · Mi-dos · Moyen · À partir de 120 € · « À préparer : Cheveux lavés et démêlés… »
- Sections (demo values):
  - « Cadre actif » — « 5 min / h · retard 15 min » (no « hérité »)
  - « Prestation » — « Knotless braids » · « Longueurs : Épaules · Mi-dos · Épaisseur : Moyen »
  - « Galerie » — « 3 réalisation(s) »
  - « Préparation » — « Cheveux lavés et démêlés avant le rendez-vous »
  - « Prix par longueur » — « Épaules 120 € / 4 h · Mi-dos 150 € / 5 h 30 » (+ option mèches if set)
- CTA: « Activer cette prestation »

Interactions: Activation via deliberate CTA → OFFER_ACTIVE. NO location or availability fields. Design MUST show the prestation as it would appear client-side.

Visual: Gallery thumbs of Black women with textured Afro hair in knotless braids. Premium respectful. Sharp media corners.

Design system Atelier Synergy: Manrope, JetBrains Mono for amounts/status, charcoal/gold, light surfaces, soft radii. No purple, glow, emoji, dark mode. All visible UI text in French.
```
========== END SCREEN 15 ==========

========== SCREEN 16 / S16 — Offre active → définir le planning ==========
```text
Independent screen. Generate ONLY this one screen. Do not generate other screens from this document.

Product context: Atelier Synergy precursor demo — BRIDGE screen after OFFER_ACTIVE. Fuses former offer success + planning welcome into ONE screen (do not split). Demo banner switches to Étape 3 sur 8. Entry status for next act: SCHEDULE_DRAFT. No second explanatory screen after this. NO “capacity” wording. Stylist: Sarah.

Device: Mobile portrait ~390×844. Scrollable. Calm bridge — not a form.

Screen type: Hybrid EXPLICATIVE bridge (confirmation + orientation). NOT a form. No input fields.

Screen purpose: Confirm offer activation, show client-side prestation view, explain next step is availability, orient to configure when she is available: place (from cadre), days with per-day hours, max appointments per day.

Layout (maximize whitespace):
1) Demo banner NOW: « Mode démo — Créez votre offre · Étape 3 sur 8 »
2) Status chip « Offre active » (no « hérité »)
3) Confirmation + lead about client-facing appearance
4) Prominent « Vue cliente » card (same client-side prestation design as S15 preview)
5) Status chip « Cadre actif · Offre active »
6) Next-step headline + pedagogical paragraph
7) Section pillars: Lieu · Jours & horaires · Rendez-vous max. / jour
8) Primary sticky CTA + secondary ghost

French UI text:
- Banner: « Mode démo — Créez votre offre · Étape 3 sur 8 »
- Confirmation: « Votre prestation est active »
- Lead: « Voici comment elle apparaît côté cliente. Ensuite : vos dispos pour recevoir des demandes. »
- Client preview label: « Vue cliente »
- Client preview: gallery · Knotless braids · longueurs · épaisseur · À partir de 120 € · consigne « À préparer… » · contexte d’accueil from cadre
- Status chip: « Cadre actif · Offre active »
- Next title: « Quand vous êtes disponible »
- Next body: « Indiquez vos jours, vos horaires et le nombre max. de rendez-vous par jour. »
- Pillars:
  1) « Lieu » — « Où vous accueillez, d’après votre cadre. »
  2) « Jours & horaires » — « Vos jours ouverts, avec les horaires de chaque jour. »
  3) « Rendez-vous max. / jour » — « Combien de rendez-vous maximum par jour. »
- Primary CTA: « Configurer mon planning »
- Secondary: « Revoir ma prestation »

Interactions: Primary → planning configuration. Secondary → offer recap (visual). No form fields. Design MUST show prestation as it appears client-side.

Visual: Calm premium success + calendar/planner mood — Black woman stylist with textured Afro hair. Realistic, respectful. No confetti spam.

Design system Atelier Synergy: Manrope, JetBrains Mono for OFFER_ACTIVE, charcoal/gold, light surfaces, soft radii. No purple, glow, emoji, dark mode. All visible UI text in French.
```
========== END SCREEN 16 ==========

========== SCREEN 17 / S17 — Configurer le planning ==========
```text
Independent screen. Generate ONLY this one screen. Do not generate other screens from this document.

Product context: Atelier Synergy precursor demo — Planning configuration. Sarah defines REAL availability rules (not a single disguised slot). Contexte d’accueil and lieu MUST be dynamic from cadre data (not a static « hérité » label). Working days each have their own proposed open/close hours. Demo target (dans le cadre de la démo): En salon from cadre · Saint-Denis · Tue–Sat · 9h–18h per day · max 1 appointment/day. Preview: mini week calendar Aug 12–18 showing Saturday Aug 15 from 9h as a possible slot — CONSEQUENCE of rules, not a “capacity” object. Status SCHEDULE_DRAFT. Banner Étape 3 sur 8. Stylist: Sarah. Simple lexicon for varied education levels.

Device: Mobile portrait ~390×844.

Screen type: OPERATIONAL form. NOT a single date/time picker disguised as planning. One job: configure planning rules + show consequence preview.

Layout (maximize whitespace):
- Demo banner Étape 3 sur 8
- Header back + « Planning »
- Badge « BROUILLON »
- Contexte d’accueil: READ-ONLY, DYNAMIC from cadre (e.g. « En salon ») — `.platform-rule` with tag « Comme dans votre cadre (non modifiable ici) » — NEVER « hérité »
- Lieu text field: editable place name (demo « Saint-Denis »), helper shows « Affiché avec votre contexte : En salon · Saint-Denis »
- « Jours ouvrés et horaires »: weekday multi-select; FOR EACH selected day, open/close hour fields (proposed hours per day)
- Max appointments/day: max RDV / day
- Preview block: mini week calendar (12–18 août) using each day’s hours; Saturday 15 août consequence visible
- Sticky CTA « Continuer »
- Lexicon: simple, accessible French (avoid overly formal admin wording)

French UI text:
- Banner: « Mode démo — Créez votre offre · Étape 3 sur 8 »
- Title: « Configurer le planning »
- Intro: « Indiquez vos jours, horaires et le maximum de rendez-vous par jour. »
- « Contexte d’accueil »: dynamic from cadre — e.g. « En salon » (locked) · helper « Comme dans votre cadre (non modifiable ici) »
- « Lieu »: « Saint-Denis » (editable) · helper « Affiché avec votre contexte : En salon · Saint-Denis »
- « Jours ouvrés et horaires »
  - Helper: « Cochez un jour, puis fixez ses horaires d’ouverture et de fermeture. »
  - Days selected (demo): Mar · Mer · Jeu · Ven · Sam
  - Per day: « Ouverture » « 09:00 » · « Fermeture » « 18:00 »
- « Rendez-vous max. / jour »: « 1 » · helper « Nombre maximum de rendez-vous que vous acceptez par jour »
- Preview title: « Aperçu — semaine du 12–18 août »
- Preview rows show per-day hours or « Fermé »; Sam 15 highlighted when enabled
- Helper: « Grâce à vos jours, le samedi 15 août à 9 h peut recevoir une demande. »
- CTA: « Continuer »

Interactions: Context locked from cadre; place editable; days multi-select; hours per enabled day; CTA gated when place + ≥1 day with hours + load valid. Back allowed.

Visual: Optional calm planner/calendar mood with Black woman stylist context. Premium, not generic calendar app spam.

Design system Atelier Synergy: Manrope, JetBrains Mono for times and dates in preview, charcoal #000101, soft gold sparingly, surfaces #fbf9f8 / #ffffff, soft radii. No purple, glow, emoji, dark mode. All visible UI text in French.
```
========== END SCREEN 17 ==========

========== SCREEN 18 / S18 — Récapitulatif et activation du planning ==========
```text
Independent screen. Generate ONLY this one screen. Do not generate other screens from this document.

Product context: Atelier Synergy precursor demo — Schedule recap + deliberate activation. Instant SCHEDULE_ACTIVE (arrival state: cadre + offre + planning all active). No operator, no IN_REVIEW. Shows cadre actif + offre active summaries (no « hérité ») plus planning details and the Aug 15 9h consequence line. Banner Étape 3 sur 8. No “capacity” / CAPACITY_OPEN. Stylist: Sarah.

Device: Mobile portrait ~390×844.

Screen type: OPERATIONAL summary + activation. One job: verify planning then activate.

Layout (maximize whitespace):
- Demo banner Étape 3 sur 8
- Header « Planning » / « Récapitulatif »
- Badge « BROUILLON »
- Scrollable sections with « Modifier » links
- Consequence line for Aug 15 9h as derived slot
- Sticky primary CTA « Activer mon planning »

French UI text:
- Banner: « Mode démo — Créez votre offre · Étape 3 sur 8 »
- Title: « Récapitulatif du planning »
- Intro: « Confirmez avant d’activer votre disponibilité. »
- Sections (demo values) — no « hérité » wording:
  - « Cadre actif » — « 5 min / h · retard 15 min »
  - « Offre active » — « Knotless braids » · « Longueurs : Épaules · Mi-dos »
  - « Lieu » — « En salon · Saint-Denis » (dynamic from cadre + place)
  - « Planning » — hours summary per open days · « 1 RDV / jour » · « Créneaux possibles incluent samedi 15 août à 9 h »
- CTA: « Activer mon planning »

Interactions: Deliberate CTA → SCHEDULE_ACTIVE.

Visual: Optional small calendar preview chip. Premium respectful. Any people imagery: Black and/or mixed-race women with textured Afro hair.

Design system Atelier Synergy: Manrope, JetBrains Mono for schedule summary, charcoal/gold, light surfaces, soft radii. No purple, glow, emoji, dark mode. All visible UI text in French.
```
========== END SCREEN 18 ==========

========== SCREEN 19 / S19 — Planning actif (+ fin / enchaînement) ==========
```text
Independent screen. Generate ONLY this one screen. Do not generate other screens from this document.

Product context: Atelier Synergy precursor demo — FINAL fused success + demo closure (do not split into two product screens). Status SCHEDULE_ACTIVE (cadre + offre + planning all active). Trigger for optional Inès handoff = SCHEDULE_ACTIVE (NOT CAPACITY_OPEN). No client Inès on the success surface except as an optional handoff CTA label. Branch B opens an answerable feedback sheet/modal (not read-only questions). Without saving feedback, return is not considered collected. Banner Étape 3 sur 8. Stylist: Sarah.

Device: Mobile portrait ~390×844. Design TWO related states of THIS screen: (A) success surface (B) feedback sheet/modal overlay. Still one screen concept — not separate journey screens.

Screen type: OPERATIONAL success + demo protocol panel. Minimal success surface; feedback as sheet.

Screen purpose:
State A — Confirm Sarah can receive demands; show synthesis + Inès callout; CTAs Voir la demande / Voir mon planning / feedback.
State B — Feedback sheet (answerable); save then restart / handoff / close.

Layout State A (maximize whitespace):
- Demo banner Étape 3 sur 8
- Calm success mark (no confetti spam)
- Badge « Planning actif » (French human label — do NOT show SCHEDULE_ACTIVE in UI)
- Confirmation headline + one-line synthesis (includes « à partir de 120 € »)
- Primary CTA + two alternatives

Layout State B (sheet/modal):
- Title + summary paragraph
- Questions list with answer controls (clean form, not survey wall)
- Sticky « Enregistrer mon retour »
- After save: confirmation + secondary actions Recommencer / Enchaîner / Fermer

French UI text — State A:
- Banner: « Mode démo — Créez votre offre · Étape 3 sur 8 »
- Badge mono: « Planning actif » (French only — NEVER show SCHEDULE_ACTIVE / machine codes in UI)
- Headline: « Vous pouvez maintenant recevoir des demandes »
- Synthesis card: offer label · hours summary · place · « à partir de X € » · « Grâce à vos horaires, samedi 15 août à 9 h peut recevoir une demande. »
- Callout: « Une demande d’Inès (cliente simulée) vous attend » · « Elle correspond à votre offre et à un créneau libre. »
- Primary: « Voir la demande »
- Alt A: « Voir mon planning »
- Alt B: « Donner mon avis sur cette étape »

French UI text — State B:
- Summary: « Vous avez défini comment vous travaillez, créé une prestation identifiable, fixé vos conditions et défini un planning réellement disponible. »
- Q1: « Avez-vous compris la différence entre cadre, prestation et planning ? » — Oui / Partiellement / Non
- Q2: « Créer votre offre vous a-t-il semblé utile ou administratif ? » — Utile / Mitigé / Administratif
- Q3: « Les pauses pendant une longue prestation ont-elles leur place dans ce cadre ? » — Oui / Partiellement / Non
- Q4: « Le prix par longueur (référence puis adaptation) est-il clair ? » — Oui / Partiellement / Non
- Q5: « La galerie par prestation est-elle plus claire qu’une galerie générale ? » — Oui / Partiellement / Non
- Q6: « Le planning vous paraît-il un vrai outil de disponibilité ? » — Oui / Partiellement / Non
- Q7: « Le récapitulatif avant activation vous a-t-il donné confiance ? » — Oui / Partiellement / Non
- Q8: « Après activation du planning, comprenez-vous que vous pouvez recevoir une demande ? » — Oui / Partiellement / Non
- Q9: « À quel moment le parcours vous a-t-il paru artificiel ? » — free text required
- Q10: « Commentaire libre (optionnel) » — free text optional
- Save CTA: « Enregistrer mon retour »
- After save: « Retour enregistré »
- Then: « Recommencer le scénario » · « Enchaîner avec une demande cliente » · « Fermer »

Interactions:
- State A: three actions.
- State B: Q1–Q9 required before save enables; Q10 optional; without save, feedback not collected.
- Do not show Inès as an in-flow character; handoff is a CTA only.

Visual: Joyful but premium success — Black woman stylist with textured Afro hair. Feedback sheet is clean form UI. Any images: Black and/or mixed-race women with coily/curly/textured hair. Premium, realistic, respectful.

Design system Atelier Synergy: Manrope + JetBrains Mono for amounts/status labels (French only). Charcoal #000101, soft gold #775a19 / #fdd587 sparingly, surfaces #fbf9f8 / #ffffff, soft 0.25rem radii. No purple, glow, emoji, dark mode, multi-shadows. All visible UI text in French.
```
========== END SCREEN 19 ==========

---

## Notes d’usage Stitch

1. Coller le **fichier entier** : Stitch doit produire **19 écrans indépendants** (SCREEN 01 … SCREEN 19).  
2. Ne **jamais** fusionner les prompts en un seul layout ni en diagramme de flux.  
3. Conserver le **même design system** (charcoal / soft gold / Manrope / JetBrains Mono).  
4. Toujours inclure le **bandeau Mode démo** : Étape 1 sur 8 (S01–S09) · 2 sur 8 (S10–S15) · 3 sur 8 (S16–S19).  
5. S14 est critique : **prix complets par longueur** + **option hors longueur** distincte.  
6. S10, S16 et S19 sont des **fusions** : ne pas resplitter.  
7. S15 : **pas de lieu ni créneau**.  
8. S17 : le 15 août 9 h est une **conséquence** du planning, pas une capacité.  
9. Aucune cliente Inès dans S01–S18 ; CTA de sortie optionnel en S19.  
10. **Vocabulaire retiré :** capacité, CAPACITY_DRAFT, CAPACITY_OPEN, « ouvrir une capacité ».
11. **UX feedback intégré (aligné `demo-precurseur`) :** bandeau « Étape X sur 8 » (pas Scène/Acte) ; nav « Demandes » + « Profil · bientôt » ; pas de « hérité » ; « Épaisseur » multi-select Fin/Moyen/Épais ; S13 = Préparation (pas Niveau de service / Pose / Finition) ; « Temps de réponse habituel » ; Instagram/TikTok ; moyens de paiement « acceptés » ; politiques lead « Choisissez des règles simples. » ; interruption + photos en `.platform-rule` (pas `choice-active`) ; « Rendez-vous max. / jour » ; horaires par jour + contexte dynamique cadre ; succès « Planning actif » (pas de code machine en UI) ; lexique simple coiffeuse.

## Contrôle qualité

- [ ] 19 prompts couvrent `3-storyboard-precurseur-cible.md`  
- [ ] Format batch : délimiteurs SCREEN NN + prompt auto-suffisant  
- [ ] Chaque prompt commence par « Independent screen… »  
- [ ] S03 explicatif cadre ; S10 pont P1→P2 ; S16 pont P2→P3  
- [ ] S06 pauses ; S08 `.platform-rule` ; S13 préparation (pas Niveau de service / Pose / Finition)  
- [ ] S14 modèle tarifaire corrigé ; S15 sans lieu/créneau  
- [ ] S17–S18 planning réel + aperçu 15 août ; S19 « Planning actif » (pas de code machine UI) + feedback  
- [ ] Bandeau Étape 1 / 2 / 3 sur 8  
- [ ] Prompts EN / UI FR · Mobile ≈390×844 · identité afro / textured hair  
- [ ] Aucune mention CAPACITY_OPEN / « ouvrir une capacité »  
- [ ] Pas de « happy path » dans les chaînes UI françaises (préférer « dans le cadre de la démo »)
