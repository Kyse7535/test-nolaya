# Prompts Stitch MVP — Former l’engagement

> Source : `domain-storytelling-etape-4-mvp.md`  
> Device : Mobile (≈390×844)  
> Prompt language : English  
> UI text language : French  
> Design system : Nolaya  
> Visual identity : Afro / textured hair — Black & mixed-race women  
> Scope : Happy path only — Model A (engagement after mock payment): `AWAITING_CLIENT_ACCEPTANCE` → `AWAITING_PAYMENT` → `COMMITTED` + `BOOKED` — no real PSP, no refunds, no disputes, no payment failure branches

---

## Cartographie des écrans

| ID | Écran | Type | Acteur | Étape / moment du récit | Priorité |
| -- | ----- | ---- | ------ | ----------------------- | -------- |
| S01 | Accueil explicatif — Accepter l’offre | Explicatif | Cliente | T0 — Entrée `AWAITING_CLIENT_ACCEPTANCE` | P0 |
| S02 | Récapitulatif contractuel | Opérationnel | Cliente | T1 | P0 |
| S03 | Consentements politiques versionnés | Opérationnel | Cliente | T2 | P0 |
| S04 | Paiement mock isolé | Opérationnel | Cliente | T3 — `AWAITING_PAYMENT` | P0 |
| S05 | Confirmation cliente COMMITTED | Opérationnel | Cliente | T4–T5 — Fin | P0 |
| S06 | Confirmation coiffeuse COMMITTED | Opérationnel | Coiffeuse | T5 — Confirmation bilatérale | P0 |

**Hors MVP (ne pas générer) :** PSP réel, champs carte « production », échecs paiement, expirations, remboursements, disputes, wallet, split payment, console opérateur.

---

## Prompt — S01 — Accueil explicatif — Accepter l’offre

**Type :** Explicatif  
**Acteur :** Cliente  
**Moment du récit :** T0 — Entrée (`AWAITING_CLIENT_ACCEPTANCE` sur `FIRM_PROPOSAL` + `SOFT_HOLD`)  
**Objectif :** Orienter avant récap, consentements et paiement mock

### Prompt Stitch

```text
Product context: Nolaya — premium B2B2C mobile platform for Afro / textured hair clients and professionals (braids, twists/vanilles, ponytails, locs, natural coils). MVP demo flow: Form engagement (Model A) — client accepts the same firm offer version, consents to versioned policies, then completes a clearly mocked deposit payment to reach COMMITTED + BOOKED. No real PSP.

Device: Mobile app screen only, portrait ~390×844. Scrollable. No desktop.

Screen type: EXPLICATIVE entry / orientation (NOT a form). No input fields, toggles, or operational lists.

Screen purpose: A Black woman client opens a received firm proposal with an active soft-hold. Explain that this step creates a bilateral engagement: review the contractual recap, accept versioned policies, simulate deposit payment, then get COMMITTED with a BOOKED slot. Status: AWAITING_CLIENT_ACCEPTANCE.

Layout:
1) Sticky header: back + title « Accepter l’offre »
2) Status badge JetBrains Mono uppercase: « EN ATTENTE »
3) Welcome headline + short pedagogical paragraph
4) Full-bleed hero with short overlay intention
5) Section « Ce que vous allez faire » — 4 pillar blocks (icon + title + 1–2 sentences)
6) Soft note: mock payment only in this demo; real card processing is out of scope
7) Single primary sticky CTA

French UI text:
- Header: « Accepter l’offre »
- Badge: « EN ATTENTE »
- Mono hint (optional small): « AWAITING_CLIENT_ACCEPTANCE »
- Headline: « Confirmer votre rendez-vous »
- Body: « Vous acceptez la même version de l’offre et des politiques, puis vous simulez le versement de l’acompte. L’engagement devient ferme et le créneau passe en réservation. »
- Hero overlay: « Une offre, un accord, un créneau réservé. »
- Pillars title: « Ce que vous allez faire »
  1) « Récapitulatif » — « Relire prestation, prix, lieu, créneau et obligations. »
  2) « Consentements » — « Accepter l’offre et les politiques versionnées. »
  3) « Paiement simulé » — « Valider l’acompte via un bouton de démo — pas de vraie carte. »
  4) « Engagement » — « Obtenir COMMITTED et un créneau BOOKED. »
- Note: « Paiement mock uniquement. Aucun prestataire de paiement réel dans cette démo. »
- Soft-hold line: « Créneau actuellement en soft-hold jusqu’à votre engagement. »
- CTA: « Voir le récapitulatif »

Interactions: Only CTA « Voir le récapitulatif ».

Visual: Hero of a Black and/or mixed-race woman with coily/curly/textured Afro hair reading an offer on her phone, calm premium mood; protective styles (braids, twists/vanilles, ponytails, locs, or natural coils) visible. Realistic, respectful. No straight Eurocentric hair as default.

Design system Nolaya: Manrope UI, JetBrains Mono for badges. Charcoal #000000 / #1b1c1c, soft gold #775a19 / #fed488 sparingly, surfaces #fbf9f8 / #ffffff / #efeded. Soft 0.25rem radii; hero media sharper OK. No purple gradients, no neon glow, no emoji, no dark mode, no heavy multi-shadows.

Quality bar: Premium enterprise mobile UI, calm editorial whitespace, accessible touch targets. All visible UI text in French.
```

---

## Prompt — S02 — Récapitulatif contractuel

**Type :** Opérationnel  
**Acteur :** Cliente  
**Moment du récit :** T1  
**Objectif :** Présenter un résumé contractuel unique et non ambigu

### Prompt Stitch

```text
Product context: Nolaya MVP — Contractual recap before engagement. Model A: acceptance then mock payment. Read-focused screen before versioned consent checkboxes.

Device: Mobile portrait ~390×844 only.

Screen type: OPERATIONAL contractual summary (client). Step 1 of 3 before payment.

Screen purpose: Client reviews one unambiguous French summary of the firm proposal: stylist, service, inclusions/exclusions, slot under soft-hold, place, price breakdown, deposit vs balance. Status AWAITING_CLIENT_ACCEPTANCE. No payment fields here. No policy checkboxes yet (next screen).

Layout:
- Header back + « Récapitulatif »
- Badge « EN ATTENTE » / mono « AWAITING_CLIENT_ACCEPTANCE »
- Vertical storyline stepper: 1 Récap · 2 Consentements · 3 Paiement (step 1 active, soft-gold marker)
- Stylist identity row
- Scrollable contract sections
- Soft-hold validity line
- Sticky CTA « Continuer vers les consentements »
- Secondary ghost « Revenir »

French UI text:
- Title: « Votre engagement en un coup d’œil »
- Intro: « Vérifiez que tout correspond avant d’accepter. Même version que l’offre publiée. »
- « Coiffeuse » — « Amina K. »
- « Référence offre » — « PROP-2026-0315 » (JetBrains Mono)
- « Prestation » — « Vanilles / twists mi-longues »
- « Résultat attendu » — « Vanilles soignées, longueur épaules »
- « Inclus » — « Pose, finitions, mèches fournies »
- « Exclus » — « Coloration, entretien post-pose »
- « Créneau » — « Samedi 15 mars · 09:30 – 14:00 » · note « Soft-hold actif »
- « Lieu » — « Chez la coiffeuse · adresse communiquée après engagement »
- « Prix total » — « 220 € »
- « Acompte à verser » — « 66 € »
- « Solde prévisionnel » — « 154 € le jour J »
- Helper: « Les politiques d’annulation seront acceptées à l’écran suivant. »
- CTA: « Continuer vers les consentements »
- Secondary: « Revenir »

Interactions: Scroll + CTAs. Read-only amounts. No card inputs. No accept checkboxes on this screen.

Visual: Optional small avatar of Black woman stylist with textured Afro hair; optional thumbnail of finished twists/vanilles on Black woman. Premium realistic.

Design system Nolaya: Manrope + JetBrains Mono for amounts/refs, charcoal/gold, light surfaces, soft radii. All visible UI text in French.
```

---

## Prompt — S03 — Consentements politiques versionnés

**Type :** Opérationnel  
**Acteur :** Cliente  
**Moment du récit :** T2  
**Objectif :** Accepter explicitement l’offre et les politiques versionnées

### Prompt Stitch

```text
Product context: Nolaya MVP — Versioned policy consents before mock payment. Happy path only. Recording consents transitions conceptually toward AWAITING_PAYMENT.

Device: Mobile portrait ~390×844.

Screen type: OPERATIONAL consent screen. Step 2/3.

Screen purpose: Client explicitly accepts (1) the firm offer version and (2) 1–2 versioned cancellation/delay policies. Checkboxes + short policy excerpts. Timestamp will be stored locally in the product; show a calm “consent recorded at accept” helper. No payment UI yet.

Layout:
- Header + badge EN ATTENTE
- Stepper step 2 active
- Compact offer version line
- 2–3 consent blocks (checkbox + title + short excerpt + version chip)
- Sticky CTA « Continuer vers le paiement » (disabled until all required boxes checked)
- Secondary « Revenir »

French UI text:
- Title: « Consentements »
- Intro: « Vous acceptez la même version de l’offre et des politiques applicables. »
- Offer line: « Offre PROP-2026-0315 · version 1 »
- Consent 1: « J’accepte l’offre ferme telle que présentée » — helper « Prestation, prix 220 €, créneau du 15 mars »
- Consent 2: « J’accepte la politique d’annulation » — chip « v1.2 » — excerpt « Annulation < 48 h : acompte non remboursable. No-show : prestation due. »
- Consent 3 (optional second policy): « J’accepte la politique de retard » — chip « v1.0 » — excerpt « Retard > 20 min : créneau pouvant être raccourci ou reporté. »
- Helper: « Ces consentements seront horodatés localement dans la démo. »
- CTA disabled/enabled: « Continuer vers le paiement »
- Secondary: « Revenir »

Interactions: Required checkboxes gate CTA. Selecting CTA implies move to AWAITING_PAYMENT. No PSP. No refuse path in MVP.

Visual: None required; optional calm editorial of Black woman client with textured hair reviewing terms on phone — not a dense legal wall.

Design system Nolaya. Version chips in JetBrains Mono. All visible UI text in French.
```

---

## Prompt — S04 — Paiement mock isolé

**Type :** Opérationnel  
**Acteur :** Cliente  
**Moment du récit :** T3 — `AWAITING_PAYMENT`  
**Objectif :** Simuler le succès de l’acompte (pas de PSP réel)

### Prompt Stitch

```text
Product context: Nolaya MVP — Isolated MOCK payment screen. Model A: engagement forms only after mock payment success. CRITICAL: This is NOT a real payment service provider UI. No production-looking card number / CVV / expiry form that could be mistaken for real checkout. One clear demo action: « Simuler le succès ».

Device: Mobile portrait ~390×844.

Screen type: OPERATIONAL mock payment. Step 3/3.

Screen purpose: Client is in AWAITING_PAYMENT. Show deposit amount, what happens on success (COMMITTED + BOOKED), and a very explicit mock banner. Primary action simulates PAYMENT_SUCCEEDED in one tap. Optional secondary « Annuler » returns without committing. No failure branch UI.

Layout:
- Header « Paiement (démo) »
- Badge JetBrains Mono « AWAITING_PAYMENT »
- Strong mock banner at top (full width, calm warning tone — not red error panic)
- Amount block (deposit) in JetBrains Mono
- Short explanation of Model A
- Primary charcoal CTA « Simuler le succès »
- Secondary ghost « Annuler »
- Tiny footer: no real charge

French UI text:
- Title: « Acompte simulé »
- Mock banner: « MODE DÉMO — Aucun paiement réel. Aucune carte bancaire n’est collectée. »
- Badge: « AWAITING_PAYMENT »
- Amount label: « Acompte à simuler »
- Amount: « 66 € »
- Context: « Sur un total de 220 € · solde 154 € le jour J »
- Body: « En simulant le succès, l’engagement passe à COMMITTED et le créneau soft-hold devient BOOKED. »
- CTA: « Simuler le succès »
- Secondary: « Annuler »
- Footer: « Aucun prélèvement · aucun prestataire de paiement »

Interactions: Primary CTA only happy path → success/confirmation. MUST NOT include realistic card number fields, CVV, expiry, Apple Pay / Google Pay chrome, or PSP brand checkout that looks production-ready. If a “payment method” visual is needed, use a clearly labeled fake method chip such as « Carte démo » without input fields.

Visual: Optional abstract calm illustration or small image of Black woman client with textured Afro hair confirming on phone — not a bank app lookalike.

Design system Nolaya. Amounts JetBrains Mono. All visible UI text in French. Emphasize mock nature visually (banner + wording), without emoji or neon.
```

---

## Prompt — S05 — Confirmation cliente COMMITTED

**Type :** Opérationnel  
**Acteur :** Cliente  
**Moment du récit :** T4–T5 — Fin `COMMITTED` + `BOOKED` + paiement mock `SUCCEEDED`  
**Objectif :** Preuve tangible côté cliente

### Prompt Stitch

```text
Product context: Nolaya MVP — Client success confirmation after mock payment. Engagement is COMMITTED; slot is BOOKED; initial payment status SUCCEEDED (mock).

Device: Mobile portrait ~390×844. Mostly non-scrolling short screen OK.

Screen type: OPERATIONAL success / confirmation (not a form).

Screen purpose: Tell the client her appointment is engaged. Show COMMITTED + BOOKED + mock payment success. Same commercial facts as the offer. Offer next step toward rendez-vous préparation (étape 5) without implementing it here.

Layout:
- Minimal header
- Large success mark / calm illustration
- Status badges: « ENGAGÉ » + mono « COMMITTED » · « BOOKED » · « PAYMENT_SUCCEEDED »
- Short confirmation copy
- Compact recap (date, stylist, deposit)
- Primary CTA « Voir mon rendez-vous »
- Secondary « Accueil »

French UI text:
- Headline: « Votre rendez-vous est engagé »
- Body: « Vous avez accepté l’offre et simulé l’acompte. Le créneau est désormais réservé définitivement. »
- Badge: « ENGAGÉ »
- Mono lines: « COMMITTED » · « BOOKED » · « PAYMENT_SUCCEEDED »
- Recap: « Samedi 15 mars · 09:30 · Amina K. · Acompte simulé 66 € »
- Primary CTA: « Voir mon rendez-vous »
- Secondary: « Accueil »
- Footnote: « Paiement mock — aucun débit réel. »

Interactions: Two CTAs only.

Visual: Joyful but premium moment — Black woman client with textured Afro hair / protective style, calm celebration after booking confirmation, not cartoonish.

Design system Nolaya. All visible UI text in French.
```

---

## Prompt — S06 — Confirmation coiffeuse COMMITTED

**Type :** Opérationnel  
**Acteur :** Coiffeuse  
**Moment du récit :** T5 — Confirmation bilatérale (pas de re-validation)  
**Objectif :** Informer la coiffeuse que l’engagement est formé

### Prompt Stitch

```text
Product context: Nolaya MVP — Stylist confirmation that the client committed after mock payment. Stylist does NOT re-validate; she receives the bilateral confirmation. Status COMMITTED + BOOKED.

Device: Mobile portrait ~390×844. Mostly non-scrolling short screen OK.

Screen type: OPERATIONAL success / notification confirmation for stylist (not a form, not an approval gate).

Screen purpose: Coiffeuse sees that Awa D. accepted the firm offer and completed mock deposit. Slot is BOOKED. Show same key facts. No “approve engagement” button — engagement is already formed.

Layout:
- Minimal header « Engagement confirmé »
- Success mark / calm illustration
- Status badges « COMMITTED » · « BOOKED »
- Client + offer recap
- Primary CTA « Préparer le rendez-vous »
- Secondary « Voir l’offre »

French UI text:
- Headline: « Engagement formé »
- Body: « Awa D. a accepté votre offre et simulé l’acompte. Le créneau est passé de soft-hold à réservation ferme. »
- Badge: « ENGAGÉ »
- Mono lines: « COMMITTED » · « BOOKED »
- Recap: « Samedi 15 mars · 09:30 – 14:00 · Vanilles mi-longues · 220 € · Acompte 66 € (mock) »
- Note: « Aucune re-validation requise de votre côté. »
- Primary CTA: « Préparer le rendez-vous »
- Secondary: « Voir l’offre »

Interactions: Informational confirmation + two CTAs. No approve/reject. No payment management.

Visual: Premium moment — Black woman stylist with textured Afro hair seeing a confirmed booking on her phone in studio. Realistic, respectful. No straight Eurocentric hair as default.

Design system Nolaya: Manrope + JetBrains Mono, charcoal/gold, light surfaces. All visible UI text in French.
```
