# Prompts Stitch MVP — Rendez-vous opérationnellement prêt

> Source : `domain-storytelling-etape-5-mvp.md`  
> Device : Mobile (≈390×844)  
> Prompt language : English  
> UI text language : French  
> Design system : Nolaya  
> Visual identity : Afro / textured hair — Black & mixed-race women  
> Scope : Happy path only (`READINESS_PENDING` → `READY`) — actions `TO_DO` → `CONFIRMED` — no AT_RISK, no operator, no real notifications

---

## Cartographie des écrans

| ID | Écran | Type | Acteur | Étape / moment du récit | Priorité |
| -- | ----- | ---- | ------ | ----------------------- | -------- |
| S01 | Accueil explicatif — Préparer le RDV | Explicatif | Cliente + Coiffeuse | T0 — Entrée `READINESS_PENDING` | P0 |
| S02 | Plan commun / progression (% actions bloquantes) | Opérationnel | Cliente + Coiffeuse | T1 — Vue partagée | P0 |
| S03 | Checklist cliente | Opérationnel | Cliente | T2 | P0 |
| S04 | Checklist coiffeuse | Opérationnel | Coiffeuse | T3 | P0 |
| S05 | RDV READY | Opérationnel | Cliente + Coiffeuse | T5 — Fin `READY` | P0 |

**Hors MVP (ne pas générer) :** AT_RISK, résolutions, WAIVED, OVERDUE, BLOCKED, preuves photo, VERIFIED, adresse protégée auditée, IA risque, opérateur, notifications réelles.

---

## Prompt — S01 — Accueil explicatif — Préparer le RDV

**Type :** Explicatif  
**Acteur :** Cliente + Coiffeuse  
**Moment du récit :** T0 — Entrée (`READINESS_PENDING`)  
**Objectif :** Orienter avant toute confirmation d’action

### Prompt Stitch

```text
Product context: Nolaya — premium B2B2C mobile platform for Afro / textured hair clients and professionals (braids, twists/vanilles, ponytails, locs, natural coils). MVP demo flow: Operational appointment readiness happy path only — from COMMITTED engagement, a preparation plan is generated; when all blocking actions are CONFIRMED, the appointment becomes READY. No AT_RISK, no operator.

Device: Mobile app screen only, portrait ~390×844. Scrollable. No desktop.

Screen type: EXPLICATIVE entry / orientation (NOT a form). No input fields, toggles, or operational lists.

Screen purpose: A Black woman (client or stylist view — shared welcome) opens the preparation dossier after engagement COMMITTED. Explain that “confirmed by email” is not enough: both parties must confirm blocking prep actions so the appointment becomes READY — meaning it can be performed. Status: READINESS_PENDING.

Layout:
1) Sticky header: back + title « Préparer le RDV »
2) Status badge JetBrains Mono uppercase: « EN PRÉPARATION »
3) Welcome headline + short pedagogical paragraph
4) Full-bleed hero with short overlay intention
5) Section « Ce que vous allez faire » — 4 pillar blocks (icon + title + 1–2 sentences)
6) Soft note: only blocking actions gate READY; informative items do not block
7) Single primary sticky CTA

French UI text:
- Header: « Préparer le RDV »
- Badge: « EN PRÉPARATION »
- Mono hint (optional small): « READINESS_PENDING »
- Headline: « Rendre le rendez-vous réellement prêt »
- Body: « L’engagement est formé. Il reste à confirmer les actions bloquantes de préparation — côté cliente et côté coiffeuse. Quand toutes sont validées, le rendez-vous passe à READY : on peut réaliser. »
- Hero overlay: « Prêt à réaliser, pas seulement confirmé. »
- Pillars title: « Ce que vous allez faire »
  1) « Plan commun » — « Voir la progression des actions bloquantes partagées. »
  2) « Checklist cliente » — « Confirmer ses obligations de préparation (ex. mèches, adresse). »
  3) « Checklist coiffeuse » — « Confirmer son matériel et sa disponibilité opérationnelle. »
  4) « READY » — « Obtenir le statut partagé : le rendez-vous peut se réaliser. »
- Note: « Pas d’alerte AT_RISK dans cette démo. Seules les actions bloquantes comptent pour READY. »
- Context line: « Prestation mock : knotless / box braids · Engagement COMMITTED »
- CTA: « Voir le plan de préparation »

Interactions: Only CTA « Voir le plan de préparation ».

Visual: Hero of a Black and/or mixed-race woman with coily/curly/textured Afro hair preparing for a braiding appointment (client packing hair products or stylist organizing braiding tools in a calm premium home studio). Realistic, respectful. No straight Eurocentric hair as default.

Design system Nolaya: Manrope UI, JetBrains Mono for badges. Charcoal #000000 / #1b1c1c, soft gold #775a19 / #fed488 sparingly, surfaces #fbf9f8 / #ffffff / #efeded. Soft 0.25rem radii; hero media sharper OK. No purple gradients, no neon glow, no emoji, no dark mode, no heavy multi-shadows.

Quality bar: Premium enterprise mobile UI, calm editorial whitespace, accessible touch targets. All visible UI text in French.
```

---

## Prompt — S02 — Plan commun / progression (% actions bloquantes)

**Type :** Opérationnel  
**Acteur :** Cliente + Coiffeuse  
**Moment du récit :** T1  
**Objectif :** Montrer la progression partagée des actions bloquantes

### Prompt Stitch

```text
Product context: Nolaya MVP — Shared preparation plan progress for Afro / textured hair appointments. Happy path only: READINESS_PENDING until all blocking actions are CONFIRMED. No AT_RISK UI.

Device: Mobile portrait ~390×844 only.

Screen type: OPERATIONAL shared progress hub (not a full checklist editor).

Screen purpose: Both parties see one shared readiness view: appointment summary, % of blocking actions confirmed, counts TO_DO vs CONFIRMED, and entry points to each checklist. Status READINESS_PENDING. Mock: 2/5 blocking confirmed → 40%. Informative actions shown as secondary and do not affect the %.

Layout:
- Header back + « Plan de préparation »
- Badge « EN PRÉPARATION » / mono « READINESS_PENDING »
- Compact appointment card: service, date, stylist/client names
- Large progress ring or bar: « Actions bloquantes » with percentage
- Breakdown: « Confirmées » / « À faire » counts
- Two navigation rows: « Ma checklist cliente » and « Checklist coiffeuse »
- Short list preview of remaining blocking actions (title + owner chip + status chip TO_DO/CONFIRMED)
- Sticky secondary note: READY unlocks when 100% blocking confirmed
- No AT_RISK banner anywhere

French UI text:
- Title: « Plan de préparation »
- Intro: « Progression basée uniquement sur les actions bloquantes. »
- Appointment: « Knotless / box braids » · « Samedi 15 mars · 09:30 » · « Amina K. ↔ Sarah M. »
- Progress label: « Actions bloquantes »
- Progress value: « 40 % » · « 2 sur 5 confirmées »
- Legend: « Confirmées · 2 » · « À faire · 3 »
- Section: « Accéder aux checklists »
  1) « Checklist cliente » — « 1 / 3 bloquantes confirmées »
  2) « Checklist coiffeuse » — « 1 / 2 bloquantes confirmées »
- Preview title: « Restant à confirmer »
  - « Acheter les mèches » — chip « Cliente » — « À FAIRE »
  - « Confirmer l’adresse et l’accès » — chip « Cliente » — « À FAIRE »
  - « Préparer le poste et le matériel » — chip « Coiffeuse » — « À FAIRE »
- Soft line: « Les actions informatives n’empêchent pas le passage à READY. »
- Helper: « READY = 100 % des actions bloquantes confirmées. »
- Optional CTA: « Actualiser la progression »

Interactions: Tapping checklist rows navigates to S03 or S04. Progress is read-only on this screen. No waive, no risk escalate, no overdue red alerts.

Visual: Optional small editorial of Black woman with textured Afro hair checking a prep list on phone; optional thumbnail of knotless/box braids on Black woman. Premium realistic.

Design system Nolaya: Manrope + JetBrains Mono for %, statuses, codes. Charcoal/gold, light surfaces, soft radii. Progress accent soft gold sparingly. All visible UI text in French.
```

---

## Prompt — S03 — Checklist cliente

**Type :** Opérationnel  
**Acteur :** Cliente  
**Moment du récit :** T2  
**Objectif :** Confirmer les actions bloquantes attribuées à la cliente

### Prompt Stitch

```text
Product context: Nolaya MVP — Client preparation checklist. Actions move TO_DO → CONFIRMED by manual toggle/confirm. Blocking actions gate READY. Happy path only — no AT_RISK, no photo proof, no WAIVED.

Device: Mobile portrait ~390×844.

Screen type: OPERATIONAL checklist (cliente).

Screen purpose: Client confirms her preparation actions for a knotless/box braids appointment. Each action shows description, due hint, criticality (Bloquante / Informative), and status. Confirming a blocking action sets it to CONFIRMED. Status of appointment remains READINESS_PENDING until all blocking (both sides) are done.

Layout:
- Header back + « Ma préparation »
- Badge « EN PRÉPARATION »
- Short intro + due date context
- Group « Actions bloquantes » (primary)
- Group « Actions informatives » (secondary, muted)
- Each row: title, 1-line helper, criticality chip, status chip, confirm control
- Sticky summary: « Bloquantes confirmées : X / Y »
- Sticky CTA « Enregistrer mes confirmations » or auto-save on toggle + « Retour au plan »

French UI text:
- Title: « Checklist cliente »
- Intro: « Confirmez chaque action lorsque c’est fait. Les actions bloquantes sont indispensables pour READY. »
- Appointment line: « Knotless · 15 mars · chez la coiffeuse »
- Group: « Actions bloquantes »
  1) « Acheter les mèches » — « Quantité et couleur convenues dans l’engagement » — chip « BLOQUANTE » — status « À FAIRE » → toggle/button « Confirmer »
  2) « Confirmer l’adresse et l’accès » — « Adresse exacte + digicode / étage » — « BLOQUANTE » — « À FAIRE »
  3) « Préparer le cuir chevelu » — « Cheveux propres, démêlés, sans produit gras » — « BLOQUANTE » — sample one already « CONFIRMÉE »
- Group: « Actions informatives »
  1) « Prévoir une tenue confortable » — « INFORMATION » — optional confirm
  2) « Charger mon téléphone » — « INFORMATION »
- Status chips: « À FAIRE » (TO_DO) · « CONFIRMÉE » (CONFIRMED)
- Summary: « Bloquantes confirmées : 1 / 3 »
- CTA: « Retour au plan »
- Helper: « Pas de preuve photo dans cette démo — une confirmation suffit. »

Interactions: Toggle or button per action: TO_DO → CONFIRMED (happy path only; no undo drama). Informative actions optional. CTA returns to shared plan. No AT_RISK, no overdue escalation UI.

Visual: Optional calm image of Black woman client with textured hair preparing mèches/hair extensions or checking address on phone. Premium respectful.

Design system Nolaya. Status chips JetBrains Mono uppercase. Criticality chips subtle. All visible UI text in French.
```

---

## Prompt — S04 — Checklist coiffeuse

**Type :** Opérationnel  
**Acteur :** Coiffeuse  
**Moment du récit :** T3  
**Objectif :** Confirmer les actions bloquantes attribuées à la coiffeuse

### Prompt Stitch

```text
Product context: Nolaya MVP — Stylist preparation checklist. Actions TO_DO → CONFIRMED manually. Blocking actions required for READY. Happy path only — no AT_RISK, no operator, no photo verification.

Device: Mobile portrait ~390×844.

Screen type: OPERATIONAL checklist (coiffeuse).

Screen purpose: Coiffeuse confirms her operational prep for the same knotless appointment: workstation, tools, time block protected. Mirror structure of client checklist but with stylist-owned actions. Appointment still READINESS_PENDING until all blocking actions (both sides) are CONFIRMED.

Layout:
- Header back + « Préparation pro »
- Badge « EN PRÉPARATION »
- Intro + appointment context
- Group « Actions bloquantes »
- Group « Actions informatives »
- Rows with confirm controls
- Sticky summary of blocking confirmed
- CTA « Retour au plan »

French UI text:
- Title: « Checklist coiffeuse »
- Intro: « Validez votre préparation opérationnelle. Sans les actions bloquantes, le RDV ne peut pas passer à READY. »
- Appointment line: « Sarah M. · Knotless · 15 mars · 09:30 »
- Group: « Actions bloquantes »
  1) « Préparer le poste et le matériel » — « Crochets, peignes, gels, élastiques, siège prêt » — « BLOQUANTE » — « À FAIRE » → « Confirmer »
  2) « Bloquer le créneau sans conflit » — « Aucun autre RDV chevauchant » — « BLOQUANTE » — sample « CONFIRMÉE »
- Group: « Actions informatives »
  1) « Relire les préférences cliente » — « Tension, longueur, parting » — « INFORMATION »
  2) « Prévoir une pause hydratation » — « INFORMATION »
- Status chips: « À FAIRE » · « CONFIRMÉE »
- Summary: « Bloquantes confirmées : 1 / 2 »
- CTA: « Retour au plan »
- Helper: « La plateforme recalcule READY quand toutes les bloquantes (cliente + coiffeuse) sont confirmées. »

Interactions: Confirm toggles TO_DO → CONFIRMED. Return to shared plan. No risk flags, no WAIVED, no resolution dossier.

Visual: Optional editorial of Black woman stylist with textured Afro hair organizing braiding tools / workstation in premium home studio or salon. Realistic, respectful. No straight Eurocentric hair as default.

Design system Nolaya: Manrope + JetBrains Mono badges, charcoal/gold, light surfaces. All visible UI text in French.
```

---

## Prompt — S05 — RDV READY

**Type :** Opérationnel  
**Acteur :** Cliente + Coiffeuse  
**Moment du récit :** T5 — Fin `READY`  
**Objectif :** Preuve tangible : toutes les bloquantes OK — RDV prêt

### Prompt Stitch

```text
Product context: Nolaya MVP — Success / readiness confirmation. Appointment lifecycle: READINESS_PENDING → READY when all blocking prep actions are CONFIRMED. Demo proof screen for both parties. Bridge to day-of execution (étape 6) without implementing it here.

Device: Mobile portrait ~390×844. Mostly short success screen; light scroll OK.

Screen type: OPERATIONAL success / confirmation (not a form).

Screen purpose: Show that the shared appointment is READY — “on peut réaliser”, not merely “confirmed by email”. Display status READY, 100% blocking confirmed, short snapshot of confirmed conditions. Offer next step toward Jour J / réalisation.

Layout:
- Minimal header
- Large calm success mark / illustration
- Status badge « PRÊT » / JetBrains Mono « READY »
- Short confirmation copy
- Snapshot block: blocking actions 5/5 CONFIRMED, date/time, service, place
- Primary CTA « Voir le suivi jour J »
- Secondary « Revoir le plan »

French UI text:
- Headline: « Le rendez-vous est prêt »
- Body: « Toutes les actions bloquantes sont confirmées. Cliente et coiffeuse peuvent réaliser la prestation. »
- Badge: « PRÊT »
- Mono line: « READY »
- Snapshot title: « Instantané de préparation »
  - « Actions bloquantes » — « 5 / 5 confirmées »
  - « Prestation » — « Knotless / box braids »
  - « Créneau » — « Samedi 15 mars · 09:30 – 14:00 »
  - « Lieu » — « Chez la coiffeuse · accès confirmé »
  - « Parties » — « Sarah M. · Amina K. »
- Soft note: « READY signifie : on peut réaliser — pas seulement un e-mail de confirmation. »
- Primary CTA: « Voir le suivi jour J »
- Secondary: « Revoir le plan »

Interactions: Two CTAs only. No AT_RISK reverse path in MVP. No reopen-action drama.

Visual: Joyful but premium moment — Black woman client and/or stylist with textured Afro hair ready for braiding day, calm confidence, not cartoonish. Protective styles or natural coils visible.

Design system Nolaya. Status labels JetBrains Mono. All visible UI text in French.
```
