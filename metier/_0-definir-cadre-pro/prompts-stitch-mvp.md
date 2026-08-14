# Prompts Stitch MVP — Définir le cadre professionnel

> Source : `domain-storytelling-etape-avant-0-mvp.md`  
> Device : Mobile (≈390×844)  
> Prompt language : English  
> UI text language : French  
> Design system : Nolaya  
> Visual identity : Afro / textured hair — Black & mixed-race women  
> Scope : Happy path only (`DRAFT` → `ACTIVE`) — no review gate, no operator, no exception branches

---

## Cartographie des écrans

| ID | Écran | Type | Acteur | Étape / moment du récit | Priorité |
| -- | ----- | ---- | ------ | ----------------------- | -------- |
| S01 | Accueil explicatif — Cadre professionnel | Explicatif | Coiffeuse | T0 — Entrée | P0 |
| S02 | Contextes d’exercice + confidentialité adresse | Opérationnel | Coiffeuse | T1 | P0 |
| S03 | Accueil & modalités d’accès | Opérationnel | Coiffeuse | T2 | P0 |
| S04 | Communication + moyens de paiement | Opérationnel | Coiffeuse | T3 | P0 |
| S05 | Politiques, sécurité & consentement photos | Opérationnel | Coiffeuse | T4 | P0 |
| S06 | Récapitulatif + Activer le cadre | Opérationnel | Coiffeuse | T5 | P0 |
| S07 | Succès — Cadre actif | Opérationnel | Coiffeuse | Fin `PROFESSIONAL_FRAMEWORK_ACTIVE` | P0 |

**Hors MVP (ne pas générer) :** IN_REVIEW, rapport de vérification, exceptions, opérateur, branches incompatibilité / déménagement.

---

## Prompt — S01 — Accueil explicatif — Cadre professionnel

**Type :** Explicatif  
**Acteur :** Coiffeuse  
**Moment du récit :** T0 — Entrée (`PROFESSIONAL_FRAMEWORK_DRAFT`)  
**Objectif :** Orienter avant toute saisie

### Prompt Stitch

```text
Product context: Nolaya — premium B2B2C mobile platform for Afro / textured hair professionals (braids, twists/vanilles, ponytails, locs, natural coils). MVP demo flow: Professional Framework happy path only.

Device: Mobile app screen only, portrait ~390×844. Scrollable. No desktop.

Screen type: EXPLICATIVE entry / orientation (NOT a form). No input fields, toggles, or operational lists.

Screen purpose: A Black woman hairstylist opens her Professional Framework draft. Explain that this defines HOW she generally works — not what she sells — once, then reuses it for future capacities. Status: PROFESSIONAL_FRAMEWORK_DRAFT.

Layout:
1) Sticky header: back + title « Cadre professionnel »
2) Status badge JetBrains Mono uppercase: « BROUILLON »
3) Welcome headline + short pedagogical paragraph
4) Full-bleed hero with short overlay intention
5) Section « Ce que vous allez définir » — 4 pillar blocks (icon + title + 1–2 sentences)
6) Soft note: platform principles are already known (read-only later if needed)
7) Single primary sticky CTA

French UI text:
- Header: « Cadre professionnel »
- Badge: « BROUILLON »
- Headline: « Comment vous travaillez, une fois pour toutes »
- Body: « Ce n’est pas ce que vous vendez. C’est le cadre dans lequel vous acceptez d’exercer : accueil, communication, paiement, sécurité et photos. Vous l’activez ensuite pour l’utiliser dans vos capacités. »
- Hero overlay: « Rendre votre pratique prévisible. »
- Pillars title: « Ce que vous allez définir »
  1) « Contextes » — « Où vous exercez en général et si l’adresse reste confidentielle. »
  2) « Accueil » — « Accompagnants, mineurs, règles d’accès. »
  3) « Communication & paiement » — « Quand vous répondez et comment vous êtes payée. »
  4) « Politiques & sécurité » — « Retard, annulation, interruption et consentement photos. »
- Note: « Les principes obligatoires de la plateforme sont déjà intégrés. Pas de contrôle opérateur dans cette démo. »
- CTA: « Commencer la configuration »

Interactions: Only CTA « Commencer la configuration ».

Visual: Hero of a Black and/or mixed-race woman stylist with coily/curly/textured Afro hair (braids, twists/vanilles, ponytails, locs, or natural coils) in a calm premium studio. Realistic, respectful. No straight Eurocentric hair as default.

Design system Nolaya: Manrope UI, JetBrains Mono for badges. Charcoal #000000 / #1b1c1c, soft gold #775a19 / #fed488 sparingly, surfaces #fbf9f8 / #ffffff / #efeded. Soft 0.25rem radii; hero media sharper OK. No purple gradients, no neon glow, no emoji, no dark mode, no heavy multi-shadows.

Quality bar: Premium enterprise mobile UI, calm editorial whitespace, accessible touch targets. All visible UI text in French.
```

---

## Prompt — S02 — Contextes d’exercice + confidentialité adresse

**Type :** Opérationnel  
**Acteur :** Coiffeuse  
**Moment du récit :** T1  
**Objectif :** Déclarer où elle exerce et la confidentialité d’adresse

### Prompt Stitch

```text
Product context: Nolaya MVP — Professional Framework configuration for Afro / textured hair stylists.

Device: Mobile portrait ~390×844 only.

Screen type: OPERATIONAL form step.

Screen purpose: Coiffeuse selects general exercise contexts (not precise capacity addresses) and whether her address stays confidential. Status badge DRAFT. Step 1 of 4 in MVP flow.

Layout:
- Header back + « Cadre professionnel »
- Badge « BROUILLON »
- Vertical storyline stepper: 1 Contextes · 2 Accueil · 3 Communication · 4 Politiques (step 1 active, soft-gold marker)
- Section title + helper
- Multi-select cards for contexts (not pill spam)
- Toggle/radio for address confidentiality
- Sticky CTA « Continuer » (disabled until ≥1 context + confidentiality choice)

French UI text:
- Title: « Contextes d’exercice »
- Intro: « Indiquez où vous acceptez d’exercer en général. Les lieux précis d’une prestation se définiront plus tard. »
- Options:
  1) « Chez moi » — « Espace personnel / studio à domicile »
  2) « En salon » — « Espace professionnel partenaire »
  3) « Déplacement » — « Je me rends chez la cliente »
- Label: « Confidentialité de l’adresse »
- Choices: « Adresse masquée jusqu’à l’engagement » / « Adresse visible aux clientes éligibles »
- Helper: « Choisissez au moins un contexte. »
- CTA disabled/enabled: « Continuer »

Interactions: Multi-select contexts; single choice confidentiality; CTA gated.

Visual: Optional small editorial image of a Black woman with textured Afro hair styling in a home studio or salon. Premium realistic.

Design system Nolaya: Manrope + JetBrains Mono, charcoal/gold, light surfaces, soft radii, no clutter. All visible UI text in French.
```

---

## Prompt — S03 — Accueil & modalités d’accès

**Type :** Opérationnel  
**Acteur :** Coiffeuse  
**Moment du récit :** T2  
**Objectif :** Règles générales d’accueil (accompagnants, mineurs)

### Prompt Stitch

```text
Product context: Nolaya MVP — Professional Framework for Afro hair stylists.

Device: Mobile portrait ~390×844.

Screen type: OPERATIONAL.

Screen purpose: Coiffeuse sets general access/welcome rules: companions allowed, minors policy, short free note optional. Step 2/4.

Layout:
- Header + badge BROUILLON
- Stepper step 2 active
- Two clear choice groups (companions, minors)
- Optional short text field (max ~120 chars) for access note
- Sticky CTA Continuer (enabled when both groups answered)

French UI text:
- Title: « Accueil & accès »
- Intro: « Ces règles s’appliquent par défaut à vos futures prestations. »
- « Accompagnants »
  - « Non acceptés »
  - « Un accompagnant accepté »
  - « Accompagnants acceptés selon modalités »
- « Mineurs »
  - « Non pris en charge »
  - « Acceptés avec tuteur présent »
  - « Acceptés selon conditions »
- Optional field label: « Note d’accès (optionnel) »
- Placeholder: « Ex. Sonner à l’interphone, retirer les chaussures… »
- CTA: « Continuer »

Interactions: Single-select per group; optional note; back allowed.

Visual: Optional calm image of a welcoming Afro hair studio with Black woman stylist/client with textured hair. Premium respectful.

Design system Nolaya. All visible UI text in French.
```

---

## Prompt — S04 — Communication + moyens de paiement

**Type :** Opérationnel  
**Acteur :** Coiffeuse  
**Moment du récit :** T3  
**Objectif :** Quand elle répond + comment elle est payée (déclaration, pas PSP)

### Prompt Stitch

```text
Product context: Nolaya MVP — Professional Framework. Payment methods are DECLARATIVE only (no real payment processing).

Device: Mobile portrait ~390×844.

Screen type: OPERATIONAL. Step 3/4.

Screen purpose: Coiffeuse declares communication windows / response delay and accepted payment methods.

Layout:
- Header + BROUILLON badge
- Stepper step 3
- Section Communication: day chips (Lun–Dim) + response delay select
- Section Paiement: checklist of methods
- Sticky CTA Continuer (needs ≥1 day or delay + ≥1 payment method)

French UI text:
- Title: « Communication & paiement »
- Communication intro: « Quand les clientes peuvent vous écrire, et en combien de temps vous répondez. »
- « Jours de communication »: Lun Mar Mer Jeu Ven Sam Dim
- « Délai de réponse indicatif »: « Sous 2 h » / « Sous 24 h » / « Sous 48 h »
- Paiement intro: « Moyens que vous acceptez (information, pas de paiement ici). »
- Methods: « Espèces » · « Carte bancaire » · « Virement » · « Paiement via la plateforme »
- CTA: « Continuer »

Interactions: Multi-select days; single delay; multi-select payments; CTA gated.

Visual: Optional editorial close-up of Black woman stylist with textured hair checking schedule on phone. Premium.

Design system Nolaya. All visible UI text in French. No PSP UI, no card number fields.
```

---

## Prompt — S05 — Politiques, sécurité & consentement photos

**Type :** Opérationnel  
**Acteur :** Coiffeuse  
**Moment du récit :** T4  
**Objectif :** Choisir politiques catalogue + sécurité + photos

### Prompt Stitch

```text
Product context: Nolaya MVP — Professional Framework final config step before recap. Happy path only — no custom legal drafting, no exception engine.

Device: Mobile portrait ~390×844.

Screen type: OPERATIONAL. Step 4/4.

Screen purpose: Coiffeuse picks 1 platform policy for delay/cancellation from a short catalog, sets simple interruption/safety stance, and photo consent rule.

Layout:
- Header + BROUILLON
- Stepper step 4
- Catalog of 3 policy cards (select one)
- Safety / interruption short choices
- Photo consent choices
- Sticky CTA « Voir le récapitulatif »

French UI text:
- Title: « Politiques & sécurité »
- Policies section: « Politique de retard & annulation »
  1) « Flexible » — « Report possible jusqu’à 24 h avant, sans frais. »
  2) « Équilibrée » — « Annulation < 24 h : acompte partiellement retenu. »
  3) « Stricte » — « Annulation tardive : acompte non remboursable. »
- Safety title: « Interruption de prestation »
  - « Je peux interrompre si la sécurité n’est plus assurée »
  - « Procedure simple : prévenir la cliente et documenter »
- Photos title: « Consentement photos »
  - « Photos possibles avec consentement explicite »
  - « Pas de publication sans accord séparé »
- Helper: « Vous pourrez préciser une prestation plus tard ; ici c’est le cadre général. »
- CTA: « Voir le récapitulatif »

Interactions: One policy selected; safety + photos answered; then CTA.

Visual: Optional image of finished protective style on Black woman with textured hair, tasteful portfolio mood — not a legal document look.

Design system Nolaya. All visible UI text in French.
```

---

## Prompt — S06 — Récapitulatif + Activer le cadre

**Type :** Opérationnel  
**Acteur :** Coiffeuse  
**Moment du récit :** T5  
**Objectif :** Valider explicitement et activer (`PROFESSIONAL_FRAMEWORK_ACTIVE`)

### Prompt Stitch

```text
Product context: Nolaya MVP — Professional Framework activation. No operator review. Explicit stylist confirmation required.

Device: Mobile portrait ~390×844.

Screen type: OPERATIONAL summary + activation.

Screen purpose: Show a clear French summary of contexts, welcome rules, communication, payment methods, selected policy, safety, photo consent. Coiffeuse confirms and activates. This must NOT look like “request sent for review”.

Layout:
- Header « Récapitulatif »
- Badge « BROUILLON »
- Scrollable summary sections with « Modifier » text links
- Confirmation checkbox
- Sticky primary CTA « Activer mon cadre »
- Secondary ghost « Revenir »

French UI text:
- Title: « Vérifiez votre cadre »
- Intro: « Une fois activé, ce cadre s’appliquera par défaut à vos prochaines capacités. »
- Sections labels: « Contextes » · « Accueil & accès » · « Communication » · « Paiements » · « Politique » · « Sécurité » · « Photos »
- Sample filled values (realistic mock): Chez moi + Déplacement · Adresse masquée · Pas d’accompagnant · Mineurs avec tuteur · Réponse sous 24 h · Carte + Plateforme · Politique Équilibrée · Photos avec consentement
- Checkbox: « Je confirme que ce cadre représente ma façon réelle de travailler »
- CTA: « Activer mon cadre »
- Secondary: « Revenir »

Interactions: CTA disabled until checkbox checked. Modifier links are visual affordances. Activation is instantaneous in MVP (no IN_REVIEW).

Visual: None required; optional small avatar of Black woman stylist with textured hair.

Design system Nolaya. Status labels JetBrains Mono. All visible UI text in French.
```

---

## Prompt — S07 — Succès — Cadre actif

**Type :** Opérationnel  
**Acteur :** Coiffeuse  
**Moment du récit :** Fin — `PROFESSIONAL_FRAMEWORK_ACTIVE`  
**Objectif :** Preuve tangible pour la démo

### Prompt Stitch

```text
Product context: Nolaya MVP — success confirmation after Professional Framework activation.

Device: Mobile portrait ~390×844. Mostly non-scrolling short screen OK.

Screen type: OPERATIONAL success / confirmation (not a form).

Screen purpose: Celebrate activation. Show status PROFESSIONAL_FRAMEWORK_ACTIVE. Offer next step toward opening a capacity (étape 0) without implementing it here.

Layout:
- Minimal header
- Large success mark / calm illustration
- Status badge « ACTIF » / JetBrains Mono code « PROFESSIONAL_FRAMEWORK_ACTIVE »
- Short confirmation copy
- Primary CTA « Ouvrir une capacité »
- Secondary « Voir mon cadre »

French UI text:
- Headline: « Votre cadre est actif »
- Body: « Vous avez défini comment vous exercez. Vous pouvez maintenant rendre une prestation disponible. »
- Badge: « ACTIF »
- Mono line: « PROFESSIONAL_FRAMEWORK_ACTIVE »
- Primary CTA: « Ouvrir une capacité »
- Secondary: « Voir mon cadre »

Interactions: Two CTAs only.

Visual: Joyful but premium moment — Black woman stylist with textured Afro hair in professional setting, subtle celebration, not cartoonish.

Design system Nolaya. All visible UI text in French.
```
