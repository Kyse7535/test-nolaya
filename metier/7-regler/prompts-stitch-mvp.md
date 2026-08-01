# Prompts Stitch MVP — Régler et allouer la valeur

> Source : `domain-storytelling-etape-7-mvp.md`  
> Device : Mobile (≈390×844)  
> Prompt language : English  
> UI text language : French  
> Design system : Atelier Synergy  
> Visual identity : Afro / textured hair — Black & mixed-race women  
> Scope : Happy path only (`COMPLETED` → `SETTLEMENT_PENDING` → `SETTLED` + payout `PAID_OUT` mock) — mock payment only, one commission rate, optional tip, no refunds, no disputes, no real PSP

---

## Cartographie des écrans

| ID | Écran | Type | Acteur | Étape / moment du récit | Priorité |
| -- | ----- | ---- | ------ | ----------------------- | -------- |
| S01 | Accueil explicatif — Décompte / règlement | Explicatif | Cliente | T0 — Entrée `SETTLEMENT_PENDING` | P0 |
| S02 | Règlement solde cliente | Opérationnel | Cliente | T1–T4 — Décompte, tip, paiement mock | P0 |
| S03 | Revenu & reversement styliste | Opérationnel | Coiffeuse | T2 / T5 — Allocation + payout | P0 |
| S04 | Reçu cliente + succès SETTLED | Opérationnel | Cliente | T5 — Fin `SETTLED` (+ pont étape 8) | P0 |

**Hors MVP (ne pas générer) :** PSP réel, remboursements, crédits, échecs paiement, multi-bénéficiaires, multi-devises, résolution finance, espèces externes, fraude, frais transaction multiples.

---

## Prompt — S01 — Accueil explicatif — Décompte / règlement

**Type :** Explicatif  
**Acteur :** Cliente  
**Moment du récit :** T0 — Entrée (`SETTLEMENT_PENDING` après `COMPLETED`)  
**Objectif :** Orienter avant toute lecture de lignes ni paiement

### Prompt Stitch

```text
Product context: Atelier Synergy — premium B2B2C mobile platform for Afro / textured hair professionals and clients (braids, twists/vanilles, ponytails, locs, natural coils). MVP demo flow: Settlement happy path only — after COMPLETED, produce an explainable statement, mock-pay the balance, allocate value, reach SETTLED. No real PSP. No refunds.

Device: Mobile app screen only, portrait ~390×844. Scrollable. No desktop.

Screen type: EXPLICATIVE entry / orientation (NOT a form). No input fields, toggles, tip selectors, or operational payment lists.

Screen purpose: A Black woman client whose service just finished (COMPLETED) opens settlement. Explain that this step produces a clear statement (engaged price, deposit applied, optional tip, balance), simulates paying the balance, then closes the file as SETTLED so experience proof (étape 8) can start. Status: SETTLEMENT_PENDING.

Layout:
1) Sticky header: back + title « Règlement »
2) Status badge JetBrains Mono uppercase: « SOLDE À RÉGLER »
3) Welcome headline + short pedagogical paragraph
4) Full-bleed hero with short overlay intention
5) Section « Ce que vous allez faire » — 4 pillar blocks (icon + title + 1–2 sentences)
6) Soft note: mock payment only; formula reminder in plain language
7) Single primary sticky CTA

French UI text:
- Header: « Règlement »
- Badge: « SOLDE À RÉGLER »
- Mono hint (optional small): « SETTLEMENT_PENDING »
- Headline: « Voici votre décompte »
- Body: « La prestation est terminée. On calcule le montant final à partir du prix engagé, on impute l’acompte déjà versé, vous pouvez ajouter un pourboire optionnel, puis vous simulez le paiement du solde. »
- Hero overlay: « Un solde clair, un dossier clos. »
- Pillars title: « Ce que vous allez faire »
  1) « Décompte » — « Voir les mêmes lignes : prix engagé, acompte, tip, solde. »
  2) « Pourboire » — « Optionnel — une façon simple de remercier. »
  3) « Paiement simulé » — « Bouton « Payer le solde » — aucun prélèvement réel. »
  4) « Clôture » — « Obtenir SETTLED et débloquer la preuve d’expérience. »
- Note: « Formule : final = prix engagé (+ tip) ; solde = final − acompte. Une seule commission plateforme côté styliste. Pas de remboursement dans cette démo. »
- CTA: « Voir mon décompte »

Interactions: Only CTA « Voir mon décompte ».

Visual: Hero of a Black and/or mixed-race woman with coily/curly/textured Afro hair (braids, twists/vanilles, ponytails, locs, or natural coils) calmly reviewing a finished protective style moment / phone statement mood in a premium studio. Realistic, respectful. No straight Eurocentric hair as default.

Design system Atelier Synergy: Manrope UI, JetBrains Mono for badges. Charcoal #000000 / #1b1c1c, soft gold #775a19 / #fed488 sparingly, surfaces #fbf9f8 / #ffffff / #efeded. Soft 0.25rem radii; hero media sharper OK. No purple gradients, no neon glow, no emoji, no dark mode, no heavy multi-shadows.

Quality bar: Premium enterprise mobile UI, calm editorial whitespace, accessible touch targets. All visible UI text in French.
```

---

## Prompt — S02 — Règlement solde cliente

**Type :** Opérationnel  
**Acteur :** Cliente  
**Moment du récit :** T1–T4 — Calcul / affichage décompte + tip optionnel + paiement mock  
**Objectif :** Afficher les lignes, imputer l’acompte, tip optionnel, payer le solde (mock)

### Prompt Stitch

```text
Product context: Atelier Synergy MVP — Client settlement payment. Happy path from COMPLETED. Formula ONLY: final = engaged price (+ optional tip); balance = final − deposit. Mock payment only via « Payer le solde ». NO refunds, NO adjustments/amendments engine, NO real PSP, NO card number / CVV fields.

Device: Mobile portrait ~390×844 only.

Screen type: OPERATIONAL statement + mock pay (client).

Screen purpose: Client sees an explainable French statement for a just-completed Afro hair service. Same commercial lines she will later see reflected on stylist side (different lens). She may add an optional tip (light). Primary CTA simulates balance payment success → moves toward SETTLED. Status path: CALCULATED / PAYMENT_PENDING conceptually; show badge « À PAYER » / mono « PAYMENT_PENDING » after tip choice is ready.

Layout:
- Sticky header back + « Règlement final »
- Badge JetBrains Mono « À PAYER » / mono hint « PAYMENT_PENDING »
- Strong mock banner (full width, calm warning — not error red)
- Stylist identity row (avatar + name)
- Scrollable billing lines (JetBrains Mono amounts)
- Highlighted deposit row (already SUCCEEDED)
- Optional tip section (simple % chips or fixed amounts + « Aucun »)
- Live balance total updating with tip
- Sticky primary CTA « Payer le solde »
- Tiny footer: no real charge

French UI text:
- Title: « Règlement final & solde »
- Intro: « Vérifiez le détail, ajoutez un pourboire si vous le souhaitez, puis simulez le paiement du solde. »
- Mock banner: « MODE DÉMO — Aucun paiement réel. Aucune carte bancaire n’est collectée. »
- Stylist label: « PRESTATION RÉALISÉE PAR »
- Stylist name: « Amina K. »
- Section: « Détail de la facturation »
  - « Vanilles / twists mi-longues » — « Prix engagé » — « 220,00 € »
  - « Acompte versé » — « Déjà confirmé (mock) » — « − 66,00 € »
- Tip section title: « Ajouter un pourboire (optionnel) »
- Tip helper: « Facultatif — une façon de remercier votre coiffeuse. »
- Tip choices: « Aucun » · « 5 € » · « 10 € » · « 15 € » (or 0% / 5% / 10% — keep simple; selected sample: 10 €)
- Tip line when selected: « Pourboire » — « + 10,00 € »
- Final block label: « Solde restant à payer »
- Sample balance without tip: « 154,00 € » ; with tip 10 €: « 164,00 € »
- Formula helper: « Final = prix engagé (+ tip) · Solde = final − acompte »
- CTA: « Payer le solde »
- Footer: « Paiement mock · aucun prélèvement · aucun prestataire de paiement »

Interactions: Tip optional (default none). Selecting tip updates final and balance. CTA always enabled on happy path once statement visible (or after tip choice if tip required visually — tip must remain skippable). CTA = one-tap mock success. MUST NOT include realistic card inputs, CVV, expiry, Apple/Google Pay chrome, refund buttons, or adjustment line editors. No « Demander un remboursement ».

Visual: Optional small avatar of Black woman stylist with textured Afro hair; optional thumbnail of finished twists/vanilles on Black woman client. Premium realistic. No straight Eurocentric hair as default.

Design system Atelier Synergy: Manrope + JetBrains Mono for amounts/badges, charcoal/gold, light surfaces, soft radii. Emphasize mock nature (banner + wording). All visible UI text in French.
```

---

## Prompt — S03 — Revenu & reversement styliste

**Type :** Opérationnel  
**Acteur :** Coiffeuse  
**Moment du récit :** T2 / T5 — Allocation + relevé + payout mock `PAID_OUT`  
**Objectif :** Montrer net styliste, commission unique, tip, reversement

### Prompt Stitch

```text
Product context: Atelier Synergy MVP — Stylist revenue & payout view after client mock-paid the balance (or concurrently once allocation is written). ONE fixed mock commission rate on the engaged price (not on tip). Tip 100% to stylist. Instant mock payout status PAID_OUT. No refunds, no multi-beneficiary splits, no real bank payout UI, no Stripe fee line.

Device: Mobile portrait ~390×844 only.

Screen type: OPERATIONAL financial summary for stylist (read-focused + download affordance).

Screen purpose: Coiffeuse sees the same underlying commercial facts through her lens: gross engaged price, single platform commission, optional tip (exempt from commission), net amount, payout status PAID_OUT (mock). This is her statement / relevé for the demo — not a tax console.

Layout:
- Sticky header back + « Mon revenu »
- Badge JetBrains Mono « REVERSÉ » / mono « PAID_OUT »
- Hero net amount block (large JetBrains Mono)
- Meta row: service date + payout date (instant mock)
- Tip callout block (if tip > 0)
- Scrollable accounting lines
- Soft note: one commission rate; mock payout
- Secondary ghost CTA « Télécharger le relevé (PDF) » (visual affordance)
- Optional primary « Continuer » if used in flow, else rely on nav back

French UI text:
- Title: « Mon revenu & reversement »
- Intro: « Détail financier de la prestation — allocation mock. »
- Badge: « REVERSÉ »
- Mono: « PAID_OUT »
- Net label: « Montant net reversé »
- Sample net: « 203,60 € » (example: 220 − 12% commission 26,40 + tip 10)
- « Date de prestation » — « Samedi 15 mars 2026 »
- « Reversement » — « Immédiat (mock) »
- Tip block title: « Pourboire cliente »
- Tip amount: « + 10,00 € »
- Tip helper: « 100 % du pourboire vous est reversé, sans commission. »
- Section: « Détail comptable »
  - « Prestation (prix engagé) » — « Revenu » — « 220,00 € »
  - « Commission plateforme (12 %) » — « Retenue » — « − 26,40 € »
  - « Pourboire (exonéré) » — « Additionnel » — « + 10,00 € »
  - « Total net à reverser » — « 203,60 € »
- Note: « Un seul taux de commission mock. Pas de frais PSP supplémentaires dans cette démo. »
- CTA secondary: « Télécharger le relevé (PDF) »
- Reference line (mono): « #B2C-0315 »

Interactions: Read-only amounts. Download is a visual affordance (no real file required in Stitch). No payout approval gate. No refund / dispute actions.

Visual: Optional avatar of Black woman stylist with textured Afro hair in premium studio; calm finance-editorial mood — not a bank dashboard clutter. Any photos must depict Black and/or mixed-race women with coily/curly/textured hair. No straight Eurocentric hair as default.

Design system Atelier Synergy: Manrope + JetBrains Mono for amounts/status, charcoal/gold, light surfaces, soft radii, tonal elevation not heavy shadows. All visible UI text in French.
```

---

## Prompt — S04 — Reçu cliente + succès SETTLED

**Type :** Opérationnel  
**Acteur :** Cliente  
**Moment du récit :** T5 — Fin `SETTLED` (+ pont étape 8)  
**Objectif :** Preuve financière cliente + clôture démo règlement + ouverture preuve d’expérience

### Prompt Stitch

```text
Product context: Atelier Synergy MVP — Client receipt + SETTLED success after mock balance payment. Closes settlement demo and bridges to étape 8 (experience proof). No refunds. No real PSP receipt branding.

Device: Mobile portrait ~390×844. Scrollable short-to-medium screen OK.

Screen type: OPERATIONAL success / receipt confirmation (not a form).

Screen purpose: Celebrate SETTLED. Show a clear French client receipt (same lines: engaged price, deposit, tip if any, balance paid mock). Offer next step toward experience proof without implementing full étape 8 here.

Layout:
- Minimal header « Reçu »
- Large success mark / calm illustration
- Status badges: « RÉGLÉ » + JetBrains Mono « SETTLED »
- Short confirmation copy
- Compact receipt card (lines + totals)
- Mock payment note
- Primary CTA « Continuer vers la preuve d’expérience »
- Secondary « Voir mon reçu » / « Accueil »

French UI text:
- Headline: « Votre solde est réglé »
- Body: « Le paiement du solde a été simulé avec succès. Le dossier est clos financièrement. Vous pouvez maintenant enregistrer votre expérience. »
- Badge: « RÉGLÉ »
- Mono line: « SETTLED »
- Receipt title: « Reçu cliente »
- Lines:
  - « Prestation » — « Vanilles / twists mi-longues »
  - « Coiffeuse » — « Amina K. »
  - « Prix engagé » — « 220,00 € »
  - « Pourboire » — « 10,00 € » (or « — » if none)
  - « Total final » — « 230,00 € »
  - « Acompte » — « − 66,00 € »
  - « Solde payé (mock) » — « 164,00 € »
- Footnote: « Paiement mock — aucun débit réel. Pas de remboursement dans cette démo. »
- Primary CTA: « Continuer vers la preuve d’expérience »
- Secondary: « Accueil »

Interactions: Two CTAs only. Primary is the bridge to étape 8. No refund CTA. No dispute CTA.

Visual: Joyful but premium moment — Black woman client with textured Afro hair / protective style (twists, braids, ponytail, locs, or natural coils) after a successful finish, calm celebration, not cartoonish. Realistic, respectful. No straight Eurocentric hair as default.

Design system Atelier Synergy: Manrope + JetBrains Mono for amounts/status, charcoal/gold, light surfaces. All visible UI text in French.
```
