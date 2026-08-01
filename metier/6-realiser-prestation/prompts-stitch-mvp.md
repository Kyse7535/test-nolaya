# Prompts Stitch MVP — Réaliser la prestation

> Source : `domain-storytelling-etape-6-mvp.md`  
> Device : Mobile (≈390×844)  
> Prompt language : English  
> UI text language : French  
> Design system : Atelier Synergy  
> Visual identity : Afro / textured hair — Black & mixed-race women  
> Scope : Happy path only (`READY` → `IN_PROGRESS` → `COMPLETED`) — arrivals → start → complete end → client confirm — no delay, no amendment, no incident

---

## Cartographie des écrans

| ID | Écran | Type | Acteur | Étape / moment du récit | Priorité |
| -- | ----- | ---- | ------ | ----------------------- | -------- |
| S01 | Accueil explicatif — Jour J | Explicatif | Cliente + Coiffeuse | T0 — Entrée `READY` | P0 |
| S02 | Suivi opérationnel + déclarations d’arrivée | Opérationnel | Cliente + Coiffeuse | T1–T2 | P0 |
| S03 | CTA explicite Démarrer → IN_PROGRESS | Opérationnel | Coiffeuse | T3 | P0 |
| S04 | Synthèse de fin (complète only) | Opérationnel | Coiffeuse | T4 | P0 |
| S05 | Cliente confirme la réalisation | Opérationnel | Cliente | T5 | P0 |
| S06 | Succès COMPLETED + pont règlement | Opérationnel | Cliente + Coiffeuse | Fin `COMPLETED` | P0 |

**Hors MVP (ne pas générer) :** retard, avenant / modification en cours, incident, `PARTIALLY_COMPLETED`, `RESOLUTION_PENDING`, remplacement, contestation, opérateur.

---

## Prompt — S01 — Accueil explicatif — Jour J

**Type :** Explicatif  
**Acteur :** Cliente + Coiffeuse  
**Moment du récit :** T0 — Entrée (`READY`)  
**Objectif :** Orienter avant déclarations et exécution

### Prompt Stitch

```text
Product context: Atelier Synergy — premium B2B2C mobile platform for Afro / textured hair clients and professionals (braids, twists/vanilles, ponytails, locs, natural coils). MVP demo flow: Perform the service happy path only — a READY appointment becomes an execution fact: arrivals → start → complete end → client confirmation → COMPLETED, then handoff to settlement. No delay, no amendment, no incident.

Device: Mobile app screen only, portrait ~390×844. Scrollable. No desktop.

Screen type: EXPLICATIVE entry / orientation (NOT a form). No input fields, toggles, or operational lists.

Screen purpose: Day J — Black woman client or stylist opens the operational dossier for a READY appointment. Explain that this step records real execution events (arrivals, start, complete end, client confirm) until COMPLETED and a dossier ready for settlement. Status: READY.

Layout:
1) Sticky header: back + title « Jour J »
2) Status badge JetBrains Mono uppercase: « PRÊT »
3) Welcome headline + short pedagogical paragraph
4) Full-bleed hero with short overlay intention
5) Section « Ce que vous allez faire » — 4 pillar blocks (icon + title + 1–2 sentences)
6) Soft note: happy path only — no delay reporting, no in-service modification
7) Single primary sticky CTA

French UI text:
- Header: « Jour J »
- Badge: « PRÊT »
- Mono hint (optional small): « READY »
- Headline: « Réaliser la prestation »
- Body: « Le rendez-vous est READY. Aujourd’hui vous déclarez les arrivées, démarrez la prestation, déclarez une fin complète, puis la cliente confirme. Le dossier devient COMPLETED, prêt pour le règlement. »
- Hero overlay: « Du prêt au fait d’exécution. »
- Pillars title: « Ce que vous allez faire »
  1) « Arrivées » — « Cliente et coiffeuse déclarent être sur place. »
  2) « Démarrage » — « La coiffeuse démarre explicitement → IN_PROGRESS. »
  3) « Fin complète » — « Déclarer la fin de la prestation (complète uniquement). »
  4) « Confirmation » — « La cliente confirme → COMPLETED, puis règlement. »
- Note: « Pas de retard, d’avenant ni d’incident dans cette démo. »
- Context line: « Knotless / box braids · 15 mars · 09:30 · Chez la coiffeuse »
- CTA: « Ouvrir le suivi »

Interactions: Only CTA « Ouvrir le suivi ».

Visual: Hero of a Black and/or mixed-race woman with coily/curly/textured Afro hair on appointment day — arriving at a calm premium braiding studio, or stylist ready at her station with braiding tools. Protective styles (braids, twists/vanilles, ponytails, locs, or natural coils) visible. Realistic, respectful. No straight Eurocentric hair as default.

Design system Atelier Synergy: Manrope UI, JetBrains Mono for badges. Charcoal #000000 / #1b1c1c, soft gold #775a19 / #fed488 sparingly, surfaces #fbf9f8 / #ffffff / #efeded. Soft 0.25rem radii; hero media sharper OK. No purple gradients, no neon glow, no emoji, no dark mode, no heavy multi-shadows.

Quality bar: Premium enterprise mobile UI, calm editorial whitespace, accessible touch targets. All visible UI text in French.
```

---

## Prompt — S02 — Suivi opérationnel + déclarations d’arrivée

**Type :** Opérationnel  
**Acteur :** Cliente + Coiffeuse  
**Moment du récit :** T1–T2  
**Objectif :** Suivre le jour J et déclarer les arrivées

### Prompt Stitch

```text
Product context: Atelier Synergy MVP — Day-of operational tracking for Afro / textured hair appointments. Happy path: READY appointment, declare arrivals (client + stylist). No delay signaling, no amendment, no incident report CTAs.

Device: Mobile portrait ~390×844 only.

Screen type: OPERATIONAL day-of tracker + arrival declarations.

Screen purpose: Shared Jour J view for a READY knotless appointment. Show frozen engagement summary (service, slot, place), timeline of execution events, and clear arrival declaration actions for the current actor. Mock state: neither arrival declared yet, or one already declared. Status badge READY. Do NOT include “Signaler un retard” or “Modifier la prestation”.

Layout:
- Header back + « Suivi jour J »
- Badge « PRÊT » / mono « READY »
- Compact appointment summary card
- Section « Engagement applicable » (read-only: service, place, time)
- Section « Déclarations d’arrivée » — two rows: Cliente / Coiffeuse with status + CTA if current user
- Vertical event timeline (empty or with timestamps when declared)
- Soft next-step hint: after both arrivals, stylist can start
- Sticky primary CTA for current actor’s arrival (or disabled “Arrivée déjà déclarée”)
- No secondary delay / modify / incident buttons

French UI text:
- Title: « Suivi opérationnel »
- Intro: « Déclarez votre arrivée. Ces événements comptent pour l’exécution. »
- Summary: « Knotless / box braids » · « Samedi 15 mars · 09:30 » · « Chez Amina K. »
- Place line: « Accès confirmé · digicode **** »
- Section: « Arrivées »
  - « Cliente — Sarah M. » — status « Non déclarée » · button « Je suis arrivée »
  - « Coiffeuse — Amina K. » — status « Non déclarée » · button « Je suis sur place »
- Alternate filled mock (show as second state note in prompt for designer): Cliente « Arrivée · 09:22 » · Coiffeuse « Arrivée · 09:18 »
- Timeline title: « Événements »
  - Empty: « Aucun événement pour l’instant »
  - Or: « 09:18 — Arrivée coiffeuse » · « 09:22 — Arrivée cliente »
- Helper: « Ensuite, la coiffeuse pourra démarrer la prestation. »
- Sticky CTA (cliente view): « Déclarer mon arrivée »
- Sticky CTA (coiffeuse view): « Déclarer mon arrivée »
- Forbidden (do not show): « Signaler un retard » · « Modifier en cours » · « Signaler un incident »

Interactions: One tap declares arrival with timestamp. Timeline updates. No undo required in MVP. Gate message if trying to start before arrivals: handled on next screen. No delay/amendment paths.

Visual: Optional editorial of Black woman with textured Afro hair arriving at a braiding appointment / greeting at the door of a premium home studio. Realistic, respectful.

Design system Atelier Synergy: Manrope + JetBrains Mono for times and statuses. Charcoal/gold, light surfaces. All visible UI text in French.
```

---

## Prompt — S03 — CTA explicite Démarrer → IN_PROGRESS

**Type :** Opérationnel  
**Acteur :** Coiffeuse  
**Moment du récit :** T3  
**Objectif :** Démarrer explicitement la prestation (`IN_PROGRESS`)

### Prompt Stitch

```text
Product context: Atelier Synergy MVP — Explicit start of service. Coiffeuse action transitions appointment READY → IN_PROGRESS. Happy path only. Arrivals already declared (or demo-light: at least this start screen is clear and not buried). No delay, no amendment.

Device: Mobile portrait ~390×844.

Screen type: OPERATIONAL explicit start confirmation (focused, one job).

Screen purpose: Coiffeuse sees a clear, dedicated “Démarrer la prestation” moment — not a buried toggle inside a dense tracker. Preconditions shown: arrivals declared, prep READY snapshot OK. Primary CTA starts service → status IN_PROGRESS with timestamp.

Layout:
- Header back + « Démarrer »
- Badge « PRÊT » → will become « EN COURS »
- Short confirmation headline
- Checklist of preconditions (all green in mock)
- Service reminder line
- Sticky primary CTA « Démarrer la prestation »
- Secondary ghost « Revenir au suivi »
- No “start with delay” or “start partial” options

French UI text:
- Title: « Démarrer la prestation »
- Headline: « Confirmer le début »
- Body: « En démarrant, le rendez-vous passe à EN COURS. L’heure de début est enregistrée. »
- Preconditions title: « Conditions »
  - « Arrivée cliente déclarée » — « OK · 09:22 »
  - « Arrivée coiffeuse déclarée » — « OK · 09:18 »
  - « Préparation READY » — « OK »
- Service: « Knotless / box braids · Sarah M. »
- Soft note: « Un seul démarrage explicite — pas de démarrage implicite. »
- CTA: « Démarrer la prestation »
- Secondary: « Revenir au suivi »
- After-action status hint (for success microcopy if shown): badge « EN COURS » · mono « IN_PROGRESS »

Interactions: Primary CTA required; on tap → IN_PROGRESS. Secondary returns without starting. No partial start, no incident, no amendment.

Visual: Optional close-up of Black woman stylist with textured Afro hair about to begin braiding on a Black client with coily/textured hair — calm focus, premium studio light. Realistic, respectful. No straight Eurocentric hair as default.

Design system Atelier Synergy. Strong charcoal primary CTA. JetBrains Mono for IN_PROGRESS. All visible UI text in French.
```

---

## Prompt — S04 — Synthèse de fin (complète only)

**Type :** Opérationnel  
**Acteur :** Coiffeuse  
**Moment du récit :** T4  
**Objectif :** Déclarer la fin complète de la prestation

### Prompt Stitch

```text
Product context: Atelier Synergy MVP — End-of-service declaration. Happy path COMPLETE end only. Status currently IN_PROGRESS. Coiffeuse declares complete finish; client confirmation happens on the next screen. No PARTIALLY_COMPLETED, no interruption, no amendment, no incident.

Device: Mobile portrait ~390×844.

Screen type: OPERATIONAL end synthesis (coiffeuse).

Screen purpose: Coiffeuse reviews a short execution summary and declares that the service finished completely. Outcome selector must offer ONLY « Fin complète » — do not show partial/interrupted options. Timestamp of end will be stored. Appointment remains awaiting client confirmation after this declaration (not yet COMPLETED).

Layout:
- Header back + « Fin de prestation »
- Badge « EN COURS » / mono « IN_PROGRESS »
- Scrollable synthesis: start time, service, place, both arrivals, duration estimate
- Outcome block: single selected card « Fin complète » (only option in MVP)
- Optional short note field (max ~120 chars) — optional
- Sticky CTA « Déclarer la fin complète »
- Secondary « Revenir »

French UI text:
- Title: « Synthèse de fin »
- Intro: « Vérifiez le déroulé puis déclarez une fin complète. »
- « Début » — « 09:35 »
- « Prestation » — « Knotless / box braids »
- « Cliente » — « Sarah M. »
- « Lieu » — « Chez la coiffeuse »
- « Arrivées » — « Cliente 09:22 · Coiffeuse 09:18 »
- « Durée indicative » — « ~4 h »
- Outcome title: « Issue »
  - Only card: « Fin complète » — « La prestation a été réalisée comme prévu. » — selected
- Do NOT show: « Fin partielle » · « Interrompue » · « Avenant »
- Optional note label: « Note (optionnel) »
- Placeholder: « Ex. Résultat conforme, cliente satisfaite… »
- Helper: « La cliente devra encore confirmer la réalisation pour passer à COMPLETED. »
- CTA: « Déclarer la fin complète »
- Secondary: « Revenir »

Interactions: CTA declares complete end with timestamp. No partial/interrupted paths. No photo proof required in MVP.

Visual: Optional image of finished protective style (knotless/box braids) on a Black woman with textured hair — tasteful portfolio mood, premium realistic. Not a legal form look.

Design system Atelier Synergy. All visible UI text in French.
```

---

## Prompt — S05 — Cliente confirme la réalisation

**Type :** Opérationnel  
**Acteur :** Cliente  
**Moment du récit :** T5  
**Objectif :** Confirmation cliente obligatoire avant `COMPLETED`

### Prompt Stitch

```text
Product context: Atelier Synergy MVP — Client confirmation of completed service. Required to reach COMPLETED. Distinct from stylist end synthesis. Happy path only — no dispute, no contestation, no partial accept.

Device: Mobile portrait ~390×844.

Screen type: OPERATIONAL client confirmation (focused).

Screen purpose: Client sees that the stylist declared a complete end. She reviews a short summary and explicitly confirms the service was performed. This confirmation is what transitions toward COMPLETED (shown fully on success screen). Status after stylist end: awaiting client confirm (badge can show « À CONFIRMER »).

Layout:
- Header back + « Confirmer »
- Badge « À CONFIRMER »
- Short summary of what was declared
- Clear confirmation checkbox or explicit consent line
- Sticky primary CTA « Confirmer la réalisation »
- Secondary ghost « Revenir » (no dispute CTA)

French UI text:
- Title: « Confirmer la réalisation »
- Headline: « Votre coiffeuse a déclaré la fin »
- Body: « Confirmez que la prestation a bien été réalisée. Sans votre confirmation, le dossier ne passe pas à COMPLETED. »
- Summary:
  - « Prestation » — « Knotless / box braids »
  - « Coiffeuse » — « Amina K. »
  - « Début » — « 09:35 »
  - « Fin déclarée » — « 13:40 »
  - « Issue » — « Fin complète »
- Checkbox: « Je confirme que la prestation a été réalisée »
- Helper: « Ensuite le dossier d’exécution sera prêt pour le règlement. »
- CTA: « Confirmer la réalisation » (disabled until checkbox checked)
- Secondary: « Revenir »
- Forbidden: « Contester » · « Signaler un problème » (out of MVP)

Interactions: Checkbox gates CTA. On confirm → COMPLETED (success screen next). No contestation branch.

Visual: Optional calm image of Black woman client with finished braids/twists looking at phone to confirm — premium, respectful, joyful restraint.

Design system Atelier Synergy. JetBrains Mono for times. All visible UI text in French.
```

---

## Prompt — S06 — Succès COMPLETED + pont règlement

**Type :** Opérationnel  
**Acteur :** Cliente + Coiffeuse  
**Moment du récit :** Fin — `COMPLETED`  
**Objectif :** Preuve démo COMPLETED + handoff étape 7

### Prompt Stitch

```text
Product context: Atelier Synergy MVP — Success after execution COMPLETED. Lifecycle: READY → IN_PROGRESS → COMPLETED. Execution dossier ready for settlement (étape 7). No payment UI here — only a bridge CTA. No gallery/reviews (étape 8).

Device: Mobile portrait ~390×844. Mostly non-scrolling short screen OK.

Screen type: OPERATIONAL success / confirmation (not a form).

Screen purpose: Celebrate bilateral completion. Show status COMPLETED, short execution fact summary, and clear next step toward settlement/règlement without implementing payment here.

Layout:
- Minimal header
- Large success mark / calm illustration
- Status badge « TERMINÉ » / JetBrains Mono « COMPLETED »
- Short confirmation copy
- Compact execution facts
- Primary CTA « Continuer vers le règlement »
- Secondary « Voir le dossier d’exécution »

French UI text:
- Headline: « Prestation terminée »
- Body: « La prestation a démarré et s’est terminée. La cliente a confirmé. Le dossier est COMPLETED — prêt pour le règlement. »
- Badge: « TERMINÉ »
- Mono line: « COMPLETED »
- Facts:
  - « Début » — « 09:35 »
  - « Fin » — « 13:40 »
  - « Issue » — « Fin complète »
  - « Confirmation cliente » — « Oui · 13:42 »
  - « Prestation » — « Knotless / box braids »
- Soft note: « Prochaine étape : régler le solde (étape règlement). »
- Primary CTA: « Continuer vers le règlement »
- Secondary: « Voir le dossier d’exécution »

Interactions: Two CTAs only. Bridge to étape 7; no PSP on this screen. No review/gallery CTAs.

Visual: Joyful but premium moment — Black woman client with finished knotless/box braids and/or stylist with textured Afro hair, subtle celebration, studio atmosphere, not cartoonish.

Design system Atelier Synergy. Status labels JetBrains Mono. All visible UI text in French.
```
