# Prompts Stitch — Démo précurseur (cadre → prestations → planning)

> Source : `3-storyboard-precurseur-cible.md`  
> Contexte métier : `2-precurseur-cadre-prestations-planning.md`  
> Device : Mobile (≈390×844)  
> Prompt language : English  
> UI text language : French  
> Design system : Atelier Synergy (aligné `demo-precurseur/`)  
> Visual identity : Afro / textured hair — Black & mixed-race women  
> Scope : Parcours précurseur Sarah — **19 écrans** — happy path `PROFESSIONAL_FRAMEWORK_DRAFT` → `PROFESSIONAL_FRAMEWORK_ACTIVE` → `OFFER_DRAFT` → `OFFER_ACTIVE` → `SCHEDULE_DRAFT` → `SCHEDULE_ACTIVE`  
> Hors scope : cliente Inès (sauf CTA optionnel de sortie), opérateur, IN_REVIEW, paiement réel, auth  
> **Retiré :** objet « capacité », `CAPACITY_DRAFT`, `CAPACITY_OPEN`, « ouvrir une capacité »

Document dérivé du storyboard **cible**. Un prompt = un écran, collable dans Google Stitch.  
Convention : même structure que `metier/INSTRUCTIONS-PROMPTS-STITCH.md` et les fichiers `metier/*/prompts-stitch-mvp.md`.

---

## Design system global (démo précurseur)

À rappeler mentalement pour tous les prompts ; chaque prompt Stitch le répète de façon auto-suffisante.

### Personnalité

- Plateforme B2B2C coiffure afro / textured hair — sensation « luxury salon × enterprise SaaS »
- Professionnel, curated, calme ; l’UI reste discrète, les décisions métier au centre
- Styliste unique à l’écran : **Sarah**, coiffeuse en tresses à Saint-Denis — **aucune cliente** dans ce parcours

### Tokens (référence `demo-precurseur`)

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

### Chrome permanent de la démo

Bandeau discret **non produit** en haut de chaque écran :

| Phase | Écrans | Bandeau |
| ----- | ------ | ------- |
| P1 Cadre | 1–10 | `Mode démo — Créez votre offre · Étape 1 sur 8` |
| P2 Prestations | 11–15 | `Mode démo — Créez votre offre · Étape 2 sur 8` |
| P3 Planning | 16–19 | `Mode démo — Créez votre offre · Étape 3 sur 8` |

Actions bandeau (discrètes) : réinitialiser · quitter.  
Navigation produit (quand visible) : Accueil · Demandes · Rendez-vous · Prestations · Profil · bientôt — Demandes / RDV vides ; Prestations sans offre active au début ; aucun planning défini.

### Anti-patterns

Pas de violet/indigo, glow néon, dark mode par défaut, pills excessives, cards partout, ombres multi-couches, emojis décoratifs, fond cream/terracotta générique, densité dashboard hors écrans hub. **Pas de vocabulaire « capacité » / CAPACITY_OPEN.**

### Représentation visuelle (obligatoire si image)

Femmes noires et/ou métissées, cheveux crépus / bouclés / texturés (braids, vanilles/twists, ponytails, locs, natural coils). Premium, réaliste, digne. Pas de cheveux lisses européens comme défaut.

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

---

## Prompt — S01 — Démarrer la démonstration

**Type :** Démo (hors produit final)  
**Acteur :** Sarah  
**Moment du récit :** Entrée du dispositif  
**Objectif :** Présenter la mission sans ouvrir un formulaire

### Prompt Stitch

```text
Product context: Atelier Synergy — premium B2B2C mobile platform for Afro / textured hair professionals. This is the DEMO ENTRY screen for the precursor flow (Professional Framework → Prestations → Planning → SCHEDULE_ACTIVE). Not part of the final product chrome, but must feel premium and intentional. No “capacity” concept.

Device: Mobile app screen only, portrait ~390×844. No desktop.

Screen type: DEMO orientation / mission brief. NOT a form. No product bottom tabs yet (or muted preview only).

Screen purpose: Introduce Sarah’s demo mission: define how she works, create a prestation, then define when she is available. Duration 8–12 minutes. No client persona (Inès must NOT appear).

Layout:
1) Slim demo banner top: « Mode démo — Créez votre offre · Étape 1 sur 8 » with subtle reset/quit affordances
2) Brand mark / product name Atelier Synergy as a calm hero-level signal (not tiny nav text)
3) Mission headline + short supporting sentence
4) « Vous dans cette démo » line: Sarah, coiffeuse en tresses à Saint-Denis
5) Duration chip: 8–12 min
6) « Ce que vous allez faire » — 3 simple steps (Cadre → Prestations → Planning actif), not card spam
7) Single primary sticky CTA

French UI text:
- Banner: « Mode démo — Créez votre offre · Étape 1 sur 8 »
- Headline: « Créez votre offre professionnelle »
- Body: « Définissez comment vous travaillez, ce que vous proposez, puis quand vous êtes disponible. »
- « Vous dans cette démo »: « Sarah — coiffeuse en tresses, Saint-Denis »
- Duration: « Durée estimée : 8 à 12 minutes »
- Steps title: « Ce que vous allez faire »
  1) « Cadre professionnel » — « Comment vous travaillez »
  2) « Prestations » — « Ce que vous proposez »
  3) « Planning actif » — « Quand vous êtes disponible »
- Note: « Aucune cliente dans cette démonstration. »
- CTA: « Commencer »

Interactions: Only primary CTA « Commencer ». Optional ghost « Quitter la démonstration ».

Visual: Full-bleed or edge-dominant calm hero of a Black and/or mixed-race woman stylist with coily/curly/textured Afro hair (braids, twists/vanilles, ponytails, locs, natural coils) in a premium home salon / studio. Realistic, respectful. No straight Eurocentric hair as default. No floating badges on the hero.

Design system Atelier Synergy: Manrope UI, JetBrains Mono sparingly. Charcoal #000101, soft gold #775a19 / #fdd587 sparingly, surfaces #fbf9f8 / #ffffff / #efedec. Soft 0.25rem radii. No purple gradients, no neon glow, no emoji, no dark mode, no heavy multi-shadows.

Quality bar: Premium mobile demo entry, calm editorial whitespace, accessible touch targets. All visible UI text in French.
```

---

## Prompt — S02 — Tableau de bord de Sarah

**Type :** Opérationnel  
**Acteur :** Sarah  
**Moment du récit :** Accueil application vide (sans cadre actif)  
**Objectif :** Faire sentir le vide utile et orienter vers la définition du cadre

### Prompt Stitch

```text
Product context: Atelier Synergy precursor demo — stylist home after login. Empty state: no ACTIVE professional framework, no active offer, no planning defined. Sarah must create (not finalize a prefilled draft).

Device: Mobile portrait ~390×844.

Screen type: OPERATIONAL hub / empty home. Product bottom navigation visible.

Screen purpose: Sarah lands in an empty app. Primary signal: framework not active. One clear task card to define how she works. Secondary help opens a BOTTOM SHEET (not a second pedagogical full screen) with 2–3 sentences explaining what a professional framework is.

Layout:
1) Demo banner: Étape 1 sur 8
2) Product header: « Bonjour Sarah »
3) Bottom nav: Accueil (active) · Demandes · Rendez-vous · Prestations · Profil · bientôt — Demandes and Rendez-vous empty; Prestations has no active offer; no planning defined
4) Main status indicator (not a dense dashboard)
5) One primary task block to treat
6) Secondary text link for help
7) Sticky or in-flow primary CTA
8) Bottom sheet state (design as overlay variant): short explanation, dismiss, optional CTA to continue

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
- Empty hints (subtle): « Demandes » / « Rendez-vous » empty; Prestations « Aucune offre active »

Interactions: Primary CTA → framework welcome. Secondary opens bottom sheet only. Sheet closes back to dashboard. No client demand cards. No prefilled prestation draft.

Visual: Optional small avatar of Black woman stylist with textured Afro hair named Sarah. Premium calm empty-state atmosphere, not cartoonish empty illustration spam.

Design system Atelier Synergy. Manrope + JetBrains Mono for any status chips. Charcoal/gold, light surfaces, soft radii. All visible UI text in French.
```

---

## Prompt — S03 — Accueil du cadre professionnel

**Type :** Explicatif  
**Acteur :** Sarah  
**Moment du récit :** Entrée P1 (`PROFESSIONAL_FRAMEWORK_DRAFT`)  
**Objectif :** Orienter avant toute saisie

### Prompt Stitch

```text
Product context: Atelier Synergy precursor demo — Professional Framework entry. Happy path only. Status PROFESSIONAL_FRAMEWORK_DRAFT.

Device: Mobile portrait ~390×844. Scrollable.

Screen type: EXPLICATIVE entry / orientation (NOT a form). No input fields, toggles, or operational lists.

Screen purpose: Explain that Sarah defines HOW she works — not what she sells — once, then reuses it for future prestations.

Layout:
1) Demo banner Étape 1 sur 8
2) Sticky header: back + « Cadre professionnel »
3) Status badge JetBrains Mono uppercase: « BROUILLON »
4) Welcome headline + short pedagogical paragraph
5) Full-bleed hero with short overlay intention
6) Section « Ce que vous allez définir » — 5 pillar blocks (icon + title + 1–2 sentences): Lieux de travail · Accueil · Pauses · Communication & paiement · Règles & sécurité
7) Soft note about platform principles already integrated
8) Single primary sticky CTA

French UI text:
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

Visual: Hero of a Black and/or mixed-race woman stylist with coily/curly/textured Afro hair in a calm premium studio. Realistic, respectful. No straight Eurocentric hair as default.

Design system Atelier Synergy: Manrope, JetBrains Mono badges, charcoal #000101, soft gold #775a19 / #fdd587 sparingly, surfaces #fbf9f8 / #ffffff. Soft 0.25rem radii; hero media sharper OK. No purple, no glow, no emoji, no dark mode.

Quality bar: Premium enterprise mobile UI, calm editorial whitespace. All visible UI text in French.
```

---

## Prompt — S04 — Contextes d’exercice

**Type :** Opérationnel  
**Acteur :** Sarah  
**Moment du récit :** P1 · T1  
**Objectif :** Déclarer où elle exerce et la confidentialité d’adresse

### Prompt Stitch

```text
Product context: Atelier Synergy precursor demo — Professional Framework step 1/5. Demo target: Salon selected; address masked until engagement. Reasonable default may be pre-checked but Sarah can change it.

Device: Mobile portrait ~390×844.

Screen type: OPERATIONAL form step.

Screen purpose: Select general exercise contexts (not precise planning addresses) and address confidentiality.

Layout:
- Demo banner Étape 1 sur 8
- Header back + « Cadre professionnel »
- Badge « BROUILLON »
- Vertical storyline stepper: 1 Contextes · 2 Accueil · 3 Pause · 4 Communication · 5 Politiques (step 1 active, soft-gold marker)
- Section title + helper
- Multi-select context choices (choice rows, not pill spam)
- Single-choice confidentiality
- Sticky CTA « Continuer » (disabled until ≥1 context + confidentiality choice)

French UI text:
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

Design system Atelier Synergy. All visible UI text in French.
```

---

## Prompt — S05 — Accueil et accès

**Type :** Opérationnel  
**Acteur :** Sarah  
**Moment du récit :** P1 · T2  
**Objectif :** Règles générales d’accueil (accompagnants, mineurs, consigne)

### Prompt Stitch

```text
Product context: Atelier Synergy precursor demo — Professional Framework step 2/5. Demo target: companions not allowed; minors accepted with accompanying adult; access note « Sonner à l’entrée du salon ».

Device: Mobile portrait ~390×844.

Screen type: OPERATIONAL.

Screen purpose: Set default welcome / access rules for future prestations.

Layout:
- Demo banner Étape 1 sur 8
- Header + badge BROUILLON
- Stepper step 2 active (Accueil)
- Two clear choice groups (companions, minors)
- Short text field for access instruction
- Sticky CTA Continuer (enabled when both groups answered)

French UI text:
- Title: « Accueil et accès »
- Intro: « Vos règles d’accueil pour les clientes. »
- « Accompagnants »
  - « Non autorisés » (demo target)
  - « Autorisés »
- « Mineurs »
  - « Acceptés avec accompagnateur » (demo target)
  - « Non acceptés »
- Field: « Consigne d’accès »
- Placeholder / sample: « Sonner à l’entrée du salon »
- CTA: « Continuer »

Interactions: Single-select per group; access note optional but prefilled for demo; back allowed.

Visual: Optional calm welcoming Afro hair studio with Black woman stylist. Premium respectful.

Design system Atelier Synergy. All visible UI text in French.
```

---

## Prompt — S06 — Vos pauses

**Type :** Opérationnel  
**Acteur :** Sarah  
**Moment du récit :** P1 · T3  
**Objectif :** Matérialiser les pauses pendant une longue prestation

### Prompt Stitch

```text
Product context: Atelier Synergy precursor demo — Professional Framework step 3/5. Unique product moment: pauses during a long service. Demo does NOT auto-recalculate slot durations from this rule. Default: 5 minutes every hour. « Aucune » is a valid choice. Simple lexicon.

Device: Mobile portrait ~390×844.

Screen type: OPERATIONAL. Important pedagogical + choice screen.

Screen purpose: Sarah sets her default pause right during long prestations. Effect announced: this rule can be reminded to the client before engagement — not auto-added to duration here.

Layout:
- Demo banner Étape 1 sur 8
- Header + badge BROUILLON
- Stepper step 3 active (Pause)
- Clear title + explanatory paragraph
- Single-select option list (or radio rows): Aucune · 5 min / h · 10 min / h · Personnaliser
- If Personnaliser: simple minutes + frequency fields
- Soft informational note about client reminder / no auto duration math
- Sticky CTA Continuer

French UI text:
- Title: « Vos pauses pendant une longue prestation »
- Body: « Pendant une prestation longue, vous pouvez prévoir des pauses. Elles font partie de votre cadre. »
- Options:
  - « Aucune »
  - « 5 minutes toutes les heures » (demo default / target)
  - « 10 minutes toutes les heures »
  - « Personnaliser »
- Effect note: « Cette règle pourra être rappelée à la cliente avant l’engagement. »
- Duration note: « Elle n’est pas ajoutée automatiquement à la durée des créneaux dans cette démo. »
- CTA: « Continuer »

Interactions: Single-select; customize fields if needed; CTA enabled when a choice is made (including Aucune).

Visual: Optional calm break-in-studio mood with Black woman stylist with textured hair — dignified, not lazy/cliché. Premium.

Design system Atelier Synergy. JetBrains Mono for « 5 min / h » chips if used. All visible UI text in French.
```

---

## Prompt — S07 — Communication et paiement

**Type :** Opérationnel  
**Acteur :** Sarah  
**Moment du récit :** P1 · T4  
**Objectif :** Canal, délai de réponse à un message, moyens de paiement acceptés

### Prompt Stitch

```text
Product context: Atelier Synergy precursor demo — Professional Framework step 4/5. Payment methods are DECLARATIVE only (no PSP, no card numbers). Demo target: via platform (+ Instagram/TikTok available); expected reply under 2h; Card + Platform accepted; remaining balance paid at end (fixed path).

Device: Mobile portrait ~390×844.

Screen type: OPERATIONAL.

Screen purpose: Declare how clients contact her, expected reply delay for a message, and accepted payment methods. Remaining balance is always paid at end (no Solde choice).

Layout:
- Demo banner Étape 1 sur 8
- Header + BROUILLON
- Stepper step 4 (Communication)
- Section Communication: channel (incl. Instagram/TikTok) + expected reply delay
- Section Paiement: accepted payment methods + soft end-of-prestation note
- Sticky CTA Continuer (needs ≥1 channel + ≥1 payment method)

French UI text:
- Title: « Communication et paiement »
- Intro: « Comment on vous joint, et comment vous êtes payée. »
- « Où vous écrire » (multi-select): « Via la plateforme » (demo target) · « Instagram (Insta) » · « TikTok »
- « Temps de réponse habituel »
  - Helper: « Temps dans lequel vous essayez de répondre quand une cliente vous écrit. »
  - Value (demo target): « Sous 2 heures pendant les créneaux ouverts »
- « Moyens de paiement acceptés »: « Carte » · « Paiement via la plateforme » (both selected for demo) · « Espèces » · « Virement »
- Soft note (no separate Solde choice): « Le reste à payer se règle à la fin de la prestation. »
- CTA: « Continuer »

Interactions: Channel multi-select; delay field; payment multi-select; CTA gated; no payment processing UI; no Solde selector.

Visual: Optional editorial of Black woman stylist with textured hair checking messages on phone. Premium.

Design system Atelier Synergy. All visible UI text in French. No PSP UI.
```

---

## Prompt — S08 — Retard, annulation et photos

**Type :** Opérationnel  
**Acteur :** Sarah  
**Moment du récit :** P1 · T5  
**Objectif :** Choisir politiques catalogue + sécurité + consentement photos

### Prompt Stitch

```text
Product context: Atelier Synergy precursor demo — Professional Framework final config step before recap. Short catalog policies. Demo target: 15 min late; « Annulation selon le délai restant »; interruption + photos as `.platform-rule` (NOT `choice-active`); photos with client agreement.

Device: Mobile portrait ~390×844.

Screen type: OPERATIONAL. Step 5/5.

Screen purpose: Pick late tolerance, cancellation rules, locked safety interruption default, photo consent rule.

Layout:
- Demo banner Étape 1 sur 8
- Header + BROUILLON
- Stepper step 5 active
- Late tolerance selector
- Catalog of 3 short cancellation choices (select one)
- Safety / interruption: `.platform-rule` grayed platform default (not `choice-active`)
- Photos de la cliente: `.platform-rule` locked platform rule (not a colored choice)
- Sticky CTA « Continuer »

French UI text:
- Title: « Retard, annulation et photos »
- Intro: « Choisissez des règles simples. »
- « Retard toléré »: « 15 minutes » (demo target) / « 10 minutes » / « 20 minutes »
- « Annulation / report »
  1) « Annulation selon le délai restant » (demo target)
  2) « Annulation gratuite jusqu’à 24 h avant »
  3) « Annulation gratuite jusqu’à 48 h avant »
- « Interruption pour sécurité » — UNIQUE DEFAULT, NOT clickable, grayed/locked:
  - « Possible si douleur forte ou malaise »
  - Tag: « Fixé par la plateforme » (`.platform-rule`, NOT `choice-active`)
- « Photos de la cliente »
  - « Publication uniquement avec l’accord de la cliente » (demo target)
- CTA: « Continuer »

Interactions: Late + cancellation editable; interruption AND photos locked via `.platform-rule`. Back allowed.

Visual: Optional finished protective style on Black woman with textured hair — portfolio mood, not a legal document look.

Design system Atelier Synergy. All visible UI text in French.
```

---

## Prompt — S09 — Récapitulatif du cadre

**Type :** Opérationnel  
**Acteur :** Sarah  
**Moment du récit :** Activation délibérée → `PROFESSIONAL_FRAMEWORK_ACTIVE`  
**Objectif :** Vérifier toutes les décisions puis activer

### Prompt Stitch

```text
Product context: Atelier Synergy precursor demo — Professional Framework recap + deliberate activation via CTA. No operator review. Instant ACTIVE after CTA. No silent/auto activation.

Device: Mobile portrait ~390×844.

Screen type: OPERATIONAL summary + activation.

Screen purpose: Show a clear French summary of all framework decisions. Sarah must confirm before activating.

Layout:
- Demo banner Étape 1 sur 8
- Header « Récapitulatif »
- Badge « BROUILLON »
- Scrollable summary sections with « Modifier » text links
- Sticky primary CTA « Activer mon cadre professionnel »
- Secondary ghost « Revenir »

French UI text:
- Title: « Récapitulatif »
- Intro: « Relisez vos règles avant de les activer. »
- Sections (demo filled values) with « Modifier »:
  - « Contextes » — « En salon · adresse masquée »
  - « Accueil » — « Pas d’accompagnants · mineurs avec accompagnateur »
  - « Pause » — « 5 min / h »
  - « Communication & paiement » — « Via la plateforme · Sous 2 heures… » + « Carte · Paiement via la plateforme · reste à payer en fin de prestation »
  - « Règles & photos » — « Retard 15 min · Annulation selon le délai restant » + « Photos : uniquement avec l’accord de la cliente »
- CTA: « Activer mon cadre professionnel »

Interactions: Deliberate CTA activates framework (no silent/auto activation). Modifier links are visual affordances.

Visual: Optional small avatar of Black woman stylist with textured hair.

Design system Atelier Synergy. Status labels JetBrains Mono. All visible UI text in French.
```

---

## Prompt — S10 — Cadre actif → créer une prestation

**Type :** Explicatif / pont  
**Acteur :** Sarah  
**Moment du récit :** Fin P1 · entrée P2  
**Objectif :** Confirmer le cadre actif et orienter vers la création de prestation

### Prompt Stitch

```text
Product context: Atelier Synergy precursor demo — BRIDGE screen after PROFESSIONAL_FRAMEWORK_ACTIVE. Fuses former framework success + prestations welcome into ONE screen. Demo banner switches to Étape 2 sur 8. Entry status for next act: OFFER_DRAFT. No second explanatory screen. NO “capacity” wording. Stylist: Sarah.

Device: Mobile portrait ~390×844. Scrollable. Calm bridge — not a form.

Screen type: Hybrid EXPLICATIVE bridge (confirmation + orientation). NOT a form.

Screen purpose: Celebrate framework activation, explain what changed, then orient Sarah to create a prestation: what she proposes, gallery, client prep, price/duration. Planning comes AFTER offer activation (not on this screen). Status chip: cadre actif (no « hérité »).

Layout:
1) Demo banner NOW: « Mode démo — Créez votre offre · Étape 2 sur 8 »
2) Success confirmation block — no confetti spam
3) Status chip « Cadre professionnel actif » (no « hérité »)
4) Short “what this changes” copy
5) Next-step headline + pedagogical paragraph
6) Section pillars: Prestation · Galerie · Préparation · Prix & durée
7) Primary sticky CTA + secondary ghost

French UI text:
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

Interactions: Primary → prestation configuration. Secondary → framework recap. No form fields.

Visual: Calm premium success + studio mood — Black woman stylist with textured Afro hair. Realistic, respectful.

Design system Atelier Synergy. All visible UI text in French.
```

---

## Prompt — S11 — Prestation et longueurs

**Type :** Opérationnel  
**Acteur :** Sarah  
**Moment du récit :** P2 · T1  
**Objectif :** Choisir prestation + épaisseur (multi) + longueurs offertes (multi)

### Prompt Stitch

```text
Product context: Atelier Synergy precursor demo — Offer step 1/4. One offer = one identifiable prestation. Épaisseur is multi-select (not single « Taille » size). Lengths are offered formats (multi-select). Demo target: Knotless braids · Moyen · lengths Épaules (reference) + Mi-dos; length « Taille » optional. Each length will later have its own full price. Status OFFER_DRAFT.

Device: Mobile portrait ~390×844.

Screen type: OPERATIONAL form step. Badge BROUILLON.

Screen purpose: Sarah voluntarily selects from mock catalog, chooses one or more épaisseurs, and activates one or more lengths.

Layout:
- Demo banner Étape 2 sur 8
- Header back + « Prestation »
- Badge « BROUILLON »
- Step indicator: « Étape 1 / 4 · Prestation »
- Vertical stepper: 1 Prestation · 2 Galerie · 3 Préparation · 4 Prix (step 1 active)
- Single-select catalog list
- Épaisseur multi-select
- Multi-select lengths
- Sticky CTA Continuer (disabled until prestation + ≥1 épaisseur + ≥1 length)

French UI text:
- Title: « Prestation et longueurs »
- Intro: « Choisissez ce que vous proposez. Activez les longueurs : chacune aura ensuite son propre prix. »
- Catalog:
  1) « Knotless braids » (demo target)
  2) « Vanilles / twists »
  3) « Retwist locs »
- « Épaisseur » (multi — helper « Vous pouvez en choisir plusieurs. »): « Fin » / « Moyen » (target) / « Épais »
- « Longueurs proposées » (multi):
  - Helper: « La plus courte activée servira de longueur de référence pour le tarif. »
  - « Épaules » (target)
  - « Mi-dos » (target)
  - « Taille » (optional — hair length name, not the épaisseur field)
- CTA: « Continuer »

Interactions: Single prestation; multi épaisseur; multi lengths; CTA gated. Back allowed.

Visual: Optional editorial of knotless braids on a Black woman with textured Afro hair. Premium realistic.

Design system Atelier Synergy. All visible UI text in French.
```

---

## Prompt — S12 — Galerie de la prestation

**Type :** Opérationnel  
**Acteur :** Sarah  
**Moment du récit :** P2 · T2  
**Objectif :** Galerie rattachée à CETTE prestation (pas au portfolio général)

### Prompt Stitch

```text
Product context: Atelier Synergy precursor demo — Offer gallery for Knotless braids only. No moderation / IN_REVIEW. Proof levels: Réalisation déclarée or Inspiration. Minimum 1 image; demo target 3 realizations. Forbidden: mixing vanilles, wigs, or other prestations into this gallery.

Device: Mobile portrait ~390×844.

Screen type: OPERATIONAL. Step 2/4.

Screen purpose: Add/select photos for THIS prestation with a proof level each.

Layout:
- Demo banner Étape 2 sur 8
- Header + BROUILLON
- Stepper step 2
- Context line: Knotless braids moyen — selected lengths
- 3 photo slots (sharp media corners) + add control
- Per-photo proof-level control
- Empty / incomplete helper
- Sticky CTA Continuer (≥1 photo with proof level)

French UI text:
- Title: « Galerie de la prestation »
- Intro: « Montrez cette prestation. Chaque photo indique si c’est une réalisation déclarée ou une inspiration. »
- Context: « Knotless braids · Épaisseur Moyen · Épaules · Mi-dos »
- Add: « Ajouter une photo »
- Proof: « Réalisation déclarée » / « Inspiration / référence »
- Warning: « Ne mélangez pas d’autres prestations (vanilles, perruques…). »
- Empty: « Ajoutez au moins une photo pour continuer. »
- Helper: « Cible démo : trois réalisations. »
- CTA: « Continuer »

Interactions: Add/remove photos; per-photo proof; CTA gated.

Visual: Photo tiles MUST show Black and/or mixed-race women with coily/curly/textured Afro hair wearing knotless braids. Sharp media corners. Premium, realistic, respectful. No straight Eurocentric hair as default.

Design system Atelier Synergy. JetBrains Mono for proof chips. All visible UI text in French.
```

---

## Prompt — S13 — Préparation avant le rendez-vous

**Type :** Opérationnel  
**Acteur :** Sarah  
**Moment du récit :** P2 · T3  
**Objectif :** Consigne de préparation cliente (visible côté cliente) — pas de niveau de service ni répartition de tâches

### Prompt Stitch

```text
Product context: Atelier Synergy precursor demo — Offer step 3/4 « Préparation ». NO « Niveau de service » tab. NO task distribution. NO Pose / Finition task rows. Focus: clear client prep instruction visible on the client-facing prestation. Demo TARGET: « Cheveux lavés et démêlés avant le rendez-vous ».

Device: Mobile portrait ~390×844.

Screen type: OPERATIONAL. Step 3/4.

Screen purpose: Capture the client preparation note in simple language.

Layout:
- Demo banner Étape 2 sur 8
- Header « Prestation » + BROUILLON
- Step indicator: « Étape 3 / 4 · Préparation »
- Stepper step 3 Préparation active
- Title + short lead
- Single textarea: consigne for the client
- Soft helper that this note is visible client-side
- Sticky CTA Continuer

French UI text:
- Title: « Préparation avant le rendez-vous »
- Intro: « Indiquez clairement ce que la cliente doit préparer avant de venir (ex. cheveux lavés et démêlés). »
- Field: « Consigne pour la cliente »
- Sample: « Cheveux lavés et démêlés avant le rendez-vous »
- Helper: « Cette consigne sera visible côté cliente avec votre prestation. »
- CTA: « Continuer »

Interactions: Edit textarea; no service-level tabs; no task owner toggles; no Pose / Finition.

Visual: Calm prep mood — Black woman stylist with textured hair. Premium respectful.

Design system Atelier Synergy. All visible UI text in French.
```

---

## Prompt — S14 — Prix par longueur (+ option hors longueur)

**Type :** Opérationnel  
**Acteur :** Sarah  
**Moment du récit :** P2 · T4 (final P2 config step)  
**Objectif :** Poser le barème : longueur de référence + prix complets adaptés + option hors longueur

### Prompt Stitch

```text
Product context: Atelier Synergy precursor demo — Offer PRICING (final step before offer recap). Critical corrected pricing model (NOT “base price + vague length supplement”):

1) REFERENCE LENGTH = shortest activated length (Épaules) → base full price of the prestation.
2) OTHER LENGTHS → each has its own COMPLETE adapted price (Sarah sets full price per length; not a delta-only UX).
3) NON-LENGTH OPTION (e.g. mèches) → amount ADDED on top of the chosen length price, independent of the length scale.

Demo target schedule (suggested, editable):
- Épaules (référence): 120 € · 4 h
- Mi-dos (adapté): 150 € · 5 h 30
- Taille (adapté, if activated): 180 € · 6 h 30
- Option hors longueur: « Mèches fournies » +20 €

Also show pause note from framework: « Pause du cadre : 5 min / h — rappelée à la cliente, non ajoutée automatiquement à cette durée ».
Declarative only — no PSP, no card fields. Every active length needs price > 0. NO place/slot fields on this screen.

Device: Mobile portrait ~390×844.

Screen type: OPERATIONAL. Step 4/4.

Screen purpose: Sarah confirms/sets full price + duration per activated length, plus optional non-length option. Live quote preview: one line per length; “à partir de” = min of length prices; + option if set.

Layout:
- Demo banner Étape 2 sur 8
- Header + BROUILLON
- Stepper step 4 (Prix) — last P2 step
- Explainer block for the 3-part pricing model (short, clear)
- Reference length row highlighted (badge « Référence »)
- Additional length rows with full price + duration fields (badge « Prix adapté »)
- Section « Option hors longueur » (distinct visually from length scale)
- Live « Aperçu devis »
- Soft pause inheritance note
- Sticky CTA « Voir le récapitulatif » (all active lengths priced > 0; durations set)

French UI text:
- Title: « Prix par longueur »
- Intro: « Fixez le prix de la longueur de référence, puis adaptez le tarif des autres longueurs. »
- Do NOT show the useless phrase « Chaque longueur a son prix ».
- Model hints:
  - « Longueur de référence » — « Prix de base de la prestation »
  - « Autres longueurs » — « Prix complet adapté par longueur »
  - « Option hors longueur » — « Montant en plus du prix de la longueur choisie »
- Row Épaules: badge « Référence » · Prix « 120 € » · Durée « 4 h »
- Row Mi-dos: badge « Prix adapté » · « 150 € » · « 5 h 30 »
- Row Taille (if on): badge « Prix adapté » · « 180 € » · « 6 h 30 »
- Option section: « Option hors longueur »
  - Toggle/add: « Mèches fournies »
  - Amount: « +20 € »
  - Helper: « Distinct du barème longueur »
- Preview title: « Aperçu devis »
- Preview lines: one line per length · « À partir de 120 € » · « + 20 € mèches fournies » if set
- Pause note: « Pause du cadre : 5 min / h — rappelée à la cliente, non ajoutée automatiquement à cette durée »
- CTA: « Voir le récapitulatif »

Interactions: Edit price/duration per length; add/remove non-length option; CTA gated. Values may be pre-suggested but feel like creation decisions, not read-only.

Visual: Optional editorial close-up of finished knotless braids on Black woman with textured hair — portfolio pricing mood, NOT shopping cart / ecommerce checkout.

Design system Atelier Synergy. JetBrains Mono for amounts, durations, badges (RÉFÉRENCE). Charcoal/gold, light surfaces. No purple, no glow. All visible UI text in French.
```

---

## Prompt — S15 — Récapitulatif et activation de l’offre

**Type :** Opérationnel  
**Acteur :** Sarah  
**Moment du récit :** Activation délibérée → `OFFER_ACTIVE`  
**Objectif :** Aperçu côté cliente + vérifier l’offre puis activer — **sans lieu ni créneau**

### Prompt Stitch

```text
Product context: Atelier Synergy precursor demo — Offer recap + deliberate activation. Instant OFFER_ACTIVE. No operator, no IN_REVIEW. MUST show client-side preview of the prestation. Include cadre actif summary (no « hérité ») AND pricing summary. CRITICAL: NO place, NO slot, NO date/time — offer exists but is not yet matchable until planning is activated.

Device: Mobile portrait ~390×844.

Screen type: OPERATIONAL summary + activation.

Screen purpose: Sarah reviews the offer as clients will see it, then activates. Planning comes next.

Layout:
- Demo banner Étape 2 sur 8
- Header « Prestation » / « Récapitulatif »
- Badge « BROUILLON »
- Prominent « Aperçu côté cliente » card (gallery + title + lengths/épaisseur + from-price + prep note)
- Scrollable detail sections with « Modifier » links
- Soft note: planning comes next
- Sticky primary CTA « Activer cette prestation »

French UI text:
- Title: « Récapitulatif de l’offre »
- Intro: « Relisez avant d’activer. Le planning viendra ensuite. »
- Client preview label: « Aperçu côté cliente »
- Client preview: Knotless braids · Épaules · Mi-dos · Moyen · À partir de 120 € · « À préparer : Cheveux lavés et démêlés… »
- Sections (demo values):
  - « Cadre actif » — « 5 min / h · retard 15 min » (no « hérité »)
  - « Prestation » — « Knotless braids » · « Longueurs : Épaules · Mi-dos · Épaisseur : Moyen »
  - « Galerie » — « 3 réalisation(s) »
  - « Préparation » — « Cheveux lavés et démêlés avant le rendez-vous »
  - « Prix par longueur » — « Épaules 120 € / 4 h · Mi-dos 150 € / 5 h 30 » (+ option mèches if set)
- CTA: « Activer cette prestation »

Interactions: Deliberate CTA → OFFER_ACTIVE. NO location or availability fields. Design MUST show the prestation as it would appear client-side.

Visual: Gallery thumbs of Black women with textured Afro hair in knotless braids. Premium respectful.

Design system Atelier Synergy. JetBrains Mono for amounts/status. All visible UI text in French.
```

---

## Prompt — S16 — Offre active → définir le planning

**Type :** Explicatif / pont (fusion succès offre + accueil planning)  
**Acteur :** Sarah  
**Moment du récit :** Fin P2 · entrée P3 (`SCHEDULE_DRAFT`)  
**Objectif :** Montrer la vue cliente puis orienter vers le planning — un seul écran

### Prompt Stitch

```text
Product context: Atelier Synergy precursor demo — BRIDGE screen after OFFER_ACTIVE. Fuses former offer success + planning welcome into ONE screen. Demo banner switches to Étape 3 sur 8. Status entry for next act: SCHEDULE_DRAFT. No second explanatory screen. NO “capacity” wording.

Device: Mobile portrait ~390×844. Scrollable.

Screen type: Hybrid EXPLICATIVE bridge (confirmation + orientation). NOT a form. No input fields.

Screen purpose: Confirm offer activation, show client-side prestation view, orient to configure availability: place from cadre, days with per-day hours, max appointments per day.

Layout:
1) Demo banner NOW Étape 3 sur 8
2) Status chip « Offre active » (no « hérité »)
3) Confirmation + lead about client-facing appearance
4) Prominent « Vue cliente » card
5) Status chip « Cadre actif · Offre active »
6) Next-step headline + paragraph
7) Pillars: Lieu · Jours & horaires · Rendez-vous max. / jour
8) Primary sticky CTA + secondary ghost

French UI text:
- Confirmation: « Votre prestation est active »
- Lead: « Voici comment elle apparaît côté cliente. Ensuite, définissez quand vous êtes disponible. »
- Client preview label: « Vue cliente »
- Next title: « Quand vous êtes disponible »
- Next body: « Indiquez vos jours, vos horaires et votre charge. Les créneaux possibles en découlent. »
- Pillars:
  1) « Lieu » — « Où vous accueillez, d’après votre cadre. »
  2) « Jours & horaires » — « Vos jours ouverts, avec les horaires de chaque jour. »
  3) « Rendez-vous max. / jour » — « Combien de rendez-vous maximum par jour. »
- Primary CTA: « Configurer mon planning »
- Secondary: « Revoir ma prestation »

Interactions: Primary → planning configuration (S17). Secondary → offer recap. Design MUST show prestation client-side.

Visual: Calm premium success + calendar mood — Black woman stylist with textured Afro hair.

Design system Atelier Synergy. All visible UI text in French.
```

---

## Prompt — S17 — Configurer le planning

**Type :** Opérationnel  
**Acteur :** Sarah  
**Moment du récit :** P3 · configuration  
**Objectif :** Jours + horaires par jour + lieu dynamique depuis le cadre + limite

### Prompt Stitch

```text
Product context: Atelier Synergy precursor demo — Planning configuration. Contexte d’accueil and lieu MUST be dynamic from cadre data (not a static « hérité » label). Working days each have their own proposed open/close hours. Demo target: En salon from cadre · Saint-Denis · Tue–Sat · 9h–18h per day · max 1 RDV/day. Preview week Aug 12–18 with Saturday Aug 15 9h as CONSEQUENCE. Status SCHEDULE_DRAFT. Simple lexicon for varied education levels.

Device: Mobile portrait ~390×844.

Screen type: OPERATIONAL form. NOT a single date/time picker disguised as planning.

Screen purpose: Set place, working days with per-day hours, daily max appointments per day. Show live preview of resulting possible slots including demo chain target (Aug 15 9h).

Layout:
- Demo banner Étape 3 sur 8
- Header back + « Planning »
- Badge « BROUILLON »
- Contexte d’accueil: READ-ONLY, DYNAMIC from cadre (e.g. « En salon »), helper « Comme dans votre cadre (non modifiable ici) » — NEVER « Salon (hérité du cadre) »
- Lieu text field (demo Saint-Denis) with helper showing context + place
- « Jours ouvrés et horaires »: multi-select days + open/close per selected day
- Load limit
- Preview week 12–18 août
- Sticky CTA Continuer

French UI text:
- Title: « Configurer le planning »
- Intro: « Indiquez vos jours, horaires et charge. Les créneaux possibles en découlent. »
- « Contexte d’accueil »: « En salon » (locked, from cadre) · « Comme dans votre cadre (non modifiable ici) »
- « Lieu »: « Saint-Denis »
- « Jours ouvrés et horaires »
  - Helper: « Cochez un jour, puis fixez ses horaires d’ouverture et de fermeture. »
  - Days (demo): Mar · Mer · Jeu · Ven · Sam
  - Per day: Ouverture 09:00 · Fermeture 18:00
- « Rendez-vous max. / jour »: « 1 » · « Rendez-vous maximum par jour »
- Preview title: « Aperçu — semaine du 12–18 août »
- Consequence: « Grâce à vos jours, le samedi 15 août à 9 h peut recevoir une demande. »
- CTA: « Continuer »

Interactions: Context locked from cadre; place editable; days + per-day hours; CTA gated. Back allowed.

Visual: Calm planner mood. Premium.

Design system Atelier Synergy. JetBrains Mono for times. All visible UI text in French.
```

---

## Prompt — S18 — Récapitulatif et activation du planning

**Type :** Opérationnel  
**Acteur :** Sarah  
**Moment du récit :** Activation délibérée → `SCHEDULE_ACTIVE`  
**Objectif :** Vérifier cadre actif + offre active + planning puis activer

### Prompt Stitch

```text
Product context: Atelier Synergy precursor demo — Schedule recap + deliberate activation. Instant SCHEDULE_ACTIVE. Shows cadre actif + offre active (no « hérité ») plus planning details and Aug 15 9h consequence. No “capacity” / CAPACITY_OPEN.

Device: Mobile portrait ~390×844.

Screen type: OPERATIONAL summary + activation.

Screen purpose: Sarah reviews the full planning draft with cadre/offer context and confirms activation.

Layout:
- Demo banner Étape 3 sur 8
- Header « Planning » / « Récapitulatif »
- Badge « BROUILLON »
- Scrollable sections with « Modifier »
- Consequence line for Aug 15 9h
- Sticky primary CTA « Activer mon planning »

French UI text:
- Title: « Récapitulatif du planning »
- Intro: « Confirmez avant d’activer votre disponibilité. »
- Sections (no « hérité »):
  - « Cadre actif » — « 5 min / h · retard 15 min »
  - « Offre active » — « Knotless braids » · « Longueurs : Épaules · Mi-dos »
  - « Lieu » — « En salon · Saint-Denis »
  - « Planning » — hours summary · « 1 RDV / jour » · « Créneaux possibles incluent samedi 15 août à 9 h »
- CTA: « Activer mon planning »

Interactions: Deliberate CTA → SCHEDULE_ACTIVE.

Visual: Optional small calendar preview chip. Premium respectful.

Design system Atelier Synergy. All visible UI text in French.
```

---

## Prompt — S19 — Planning actif (+ fin / enchaînement / feedback)

**Type :** Opérationnel  
**Acteur :** Sarah  
**Moment du récit :** Fin — `SCHEDULE_ACTIVE` (+ dispositif de clôture)  
**Objectif :** Preuve d’activation planning + choix Voir / Enchaîner / Terminer ; branche Terminer = formulaire de retour répondable

### Prompt Stitch

```text
Product context: Atelier Synergy precursor demo — FINAL fused success + demo closure. Status SCHEDULE_ACTIVE (cadre + offre + planning all active). Trigger for Inès handoff = SCHEDULE_ACTIVE (NOT CAPACITY_OPEN). No client Inès on the success surface except as an optional handoff CTA label. Branch B opens an answerable feedback sheet/modal (not read-only questions). Without saving feedback, return is not considered collected.

Device: Mobile portrait ~390×844. Design TWO related states: (A) success screen (B) feedback sheet/modal overlay.

Screen type: OPERATIONAL success + demo protocol panel.

Screen purpose:
State A — Confirm Sarah can receive compatible demands; show synthesis; offer three actions.
State B — If « Donner mon avis sur cette étape »: show summary + 10 questions (9 required scale/text + 1 optional). Save then offer restart / handoff / close.

Layout State A:
- Demo banner Étape 3 sur 8
- Success mark / calm illustration
- Badge « Planning actif » (French human label — do NOT show SCHEDULE_ACTIVE in UI)
- Confirmation headline + one-line synthesis (includes « à partir de X € » from min length price)
- Primary CTA + two alternatives

Layout State B (sheet/modal):
- Title + summary paragraph
- Questions list with answer controls
- Sticky « Enregistrer mon retour »
- After save: confirmation + secondary actions Recommencer / Enchaîner / Fermer

French UI text — State A:
- Headline: « Vous pouvez maintenant recevoir des demandes »
- Synthesis example: « Offre active · planning Mar–sam 9 h–18 h · Saint-Denis · à partir de 120 € »
- Badge: « ACTIF »
- Status label: « Planning actif » (no machine code in UI)
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
- After save confirmation: « Retour enregistré »
- Then: « Recommencer le scénario » · « Enchaîner avec une demande cliente » · « Fermer »

Interactions:
- State A: three actions.
- State B: answers required for Q1–Q9 before save enables; Q10 optional; without save, feedback not collected.
- Do not show Inès as an in-flow character; handoff is a CTA only.

Visual: Joyful but premium success — Black woman stylist with textured Afro hair. Feedback sheet is clean form UI, not a survey spam wall. Any images: Black and/or mixed-race women with coily/curly/textured hair. Premium, realistic, respectful.

Design system Atelier Synergy. Manrope + JetBrains Mono for amounts/status labels (French only). Charcoal/gold, light surfaces, soft radii. No purple, no glow, no emoji, no dark mode. All visible UI text in French.
```

---

## Notes d’usage Stitch

1. Générer **un écran à la fois** dans l’ordre S01 → S19.  
2. Conserver le **même design system** entre les écrans (charcoal / soft gold / Manrope / JetBrains Mono).  
3. Toujours inclure le **bandeau Mode démo** (Étape 1 / 2 / 3 sur 8 selon l’acte).  
4. S14 est critique : vérifier que le rendu montre bien **prix complets par longueur** + **option hors longueur** distincte — pas un unique « supplément longueur ».  
5. S10, S16 et S19 sont des **fusions** : ne pas resplitter en deux écrans produit.  
6. S15 : **pas de lieu ni créneau** — activation offre seulement.  
7. S17 : le 15 août 9 h est une **conséquence** du planning, pas une capacité à ouvrir.
8. **UX feedback intégré (aligné `demo-precurseur`) :** bandeau « Étape X sur 8 » ; nav « Demandes » + « Profil · bientôt » ; pas de « hérité » ; Épaisseur multi-select Fin/Moyen/Épais ; S13 = Préparation ; Pose/Finition retirés ; « Temps de réponse habituel » ; Instagram/TikTok ; moyens de paiement « acceptés » ; politiques « Choisissez des règles simples. » ; interruption + photos `.platform-rule` ; « Rendez-vous max. / jour » ; horaires par jour ; contexte dynamique du cadre ; « Planning actif » (pas de code machine en UI) ; lexique simple.  
8. Aucune cliente Inès dans les écrans 1–18 ; uniquement CTA de sortie optionnel en S19.  
9. **Vocabulaire retiré :** capacité, CAPACITY_DRAFT, CAPACITY_OPEN, « ouvrir une capacité », « Lieu & dispos » dans P2.

## Contrôle qualité

- [ ] 19 prompts couvrent le storyboard cible  
- [ ] S03 explicatif cadre ; S10 pont P1→P2 (créer prestation) ; S16 pont P2→P3 (planning)  
- [ ] S06 pauses ; S08 platform-rule  
- [ ] S14 modèle tarifaire corrigé (référence + adaptés + option hors longueur)  
- [ ] S08 `.platform-rule` ; S13 préparation (pas Niveau de service / Pose / Finition)  
- [ ] S15 activation offre sans lieu/créneau ; S17–S18 planning réel avec aperçu 15 août  
- [ ] S19 « Planning actif » (pas de code machine UI) + feedback  
- [ ] Bandeau Étape 1 / 2 / 3 sur 8  
- [ ] Prompts en anglais, UI en français  
- [ ] Mobile ≈390×844  
- [ ] Identité afro / textured hair rappelée dès qu’il y a des images  
- [ ] Design system Atelier Synergy / tokens `demo-precurseur`  
- [ ] Pas d’invention hors `3-storyboard-precurseur-cible.md`  
- [ ] Aucune mention CAPACITY_OPEN / « ouvrir une capacité »
