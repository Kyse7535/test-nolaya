# Prompts Stitch — Définir le cadre professionnel

> Source : `domain-storytelling-etape-avant-0.md`
> Device : Mobile (≈390×844)
> Prompt language : English
> UI text language : French
> Design system : Atelier Synergy
> Visual identity : Afro / textured hair — Black & mixed-race women

---

## Cartographie des écrans

| ID | Écran | Type | Acteur | Étape / moment du récit | Priorité |
| -- | ----- | ---- | ------ | ----------------------- | -------- |
| S01 | Accueil explicatif — Cadre professionnel | Explicatif | Coiffeuse | Entrée du processus | P0 |
| S02 | Principes obligatoires de la plateforme | Opérationnel | Coiffeuse | 2 — Présenter les principes | P0 |
| S03 | Contextes généraux d’exercice | Opérationnel | Coiffeuse | 3 — Déclarer les contextes | P0 |
| S04 | Règles générales d’accès et d’accueil | Opérationnel | Coiffeuse | 4 — Accès et accueil | P0 |
| S05 | Cadre général de communication | Opérationnel | Coiffeuse | 5 — Communication | P0 |
| S06 | Conditions générales d’admission | Opérationnel | Coiffeuse | 6 — Admission | P0 |
| S07 | Règles générales de comportement | Opérationnel | Coiffeuse | 7 — Comportement | P0 |
| S08 | Moyens de paiement acceptés | Opérationnel | Coiffeuse | 8 — Paiement | P0 |
| S09 | Politiques opérationnelles proposées | Opérationnel | Coiffeuse | 9 — Politiques | P0 |
| S10 | Sécurité et interruption | Opérationnel | Coiffeuse | 10 — Sécurité | P0 |
| S11 | Confidentialité et consentement | Opérationnel | Coiffeuse | 11 — Confidentialité | P0 |
| S12 | Possibilités d’exception | Opérationnel | Coiffeuse | 12 — Exceptions | P0 |
| S13 | Soumission — cadre en révision | Opérationnel | Coiffeuse | 13 — Soumettre au contrôle | P0 |
| S14 | Rapport de vérification — corrections | Opérationnel | Coiffeuse | 14 — Corriger les incohérences | P0 |
| S15 | Accompagnement opérateur (pilote) | Opérationnel | Coiffeuse (+ opérateur) | 15 / Branche A | P1 |
| S16 | Récapitulatif et validation explicite | Opérationnel | Coiffeuse | 16 — Valider le récapitulatif | P0 |
| S17 | Cadre activé — confirmation | Opérationnel | Coiffeuse | 17 — Activer | P0 |
| S18 | Règle incompatible bloquée | Opérationnel | Coiffeuse | Branche B | P1 |
| S19 | Mise à jour requise après changement | Opérationnel | Coiffeuse | Branche C / UPDATE_REQUIRED | P1 |

**Hors écran dédié (reportés ou hors UI pilote) :** Branche D/E (exception prestation / cliente → étapes 0, 3, 4) ; écrans admin seuls ; scoring juridique automatique.

---

## Prompt — S01 — Accueil explicatif — Cadre professionnel

**Type :** Explicatif  
**Acteur :** Coiffeuse  
**Moment du récit :** Entrée du processus (brouillon créé)  
**Objectif :** Orienter et expliquer avant toute saisie

### Prompt Stitch

```text
Product context: Atelier Synergy — premium B2B2C mobile platform for Afro / textured hair professionals (braids, twists/vanilles, ponytails, locs, natural coils). Enterprise-grade configuration flow.

Device: Mobile app screen only, portrait ~390×844. Scrollable. No desktop layout.

Screen type: EXPLICATIVE entry / orientation screen (NOT a form). No input fields, toggles, or operational lists.

Screen purpose: A Black woman hairstylist (coiffeuse) opens her Professional Framework draft (status PROFESSIONAL_FRAMEWORK_DRAFT). This screen explains that the framework defines HOW she generally works — not what she sells — and will apply by default to future services. Future changes never alter already-formed engagements.

Layout:
1) Sticky top header: back arrow + title « Cadre professionnel »
2) Status badge uppercase JetBrains Mono: « BROUILLON »
3) Welcome headline + short pedagogical paragraph
4) Full-bleed hero image with short overlay intention line
5) Section « Les 5 piliers » with 5 explanatory pillar blocks (icon + title + 1–2 sentences) — allowed only on this explicative screen
6) Bottom primary CTA full-width

French UI text (exact intent):
- Header: « Cadre professionnel »
- Badge: « BROUILLON »
- Headline: « Bienvenue dans la configuration de votre cadre »
- Body: « Le cadre professionnel définit comment vous exercez de manière générale. Vous le définissez une fois : il s’applique par défaut à vos futures prestations, sans renégocier vos règles à chaque cliente. »
- Hero overlay: « Structurer votre pratique pour la rendre prévisible. »
- Pillars section title: « Les 5 piliers »
  1) « Principes » — « Les règles obligatoires de la plateforme qui protègent toutes les parties. »
  2) « Cadre » — « Les conditions générales dans lesquelles vous acceptez d’exercer. »
  3) « Configuration » — « Les conditions spécifiques d’une prestation (étape suivante, hors de cet écran). »
  4) « Galerie » — « La présentation visuelle d’une prestation précise (hors cadre). »
  5) « Engagement » — « Les règles exactes acceptées pour un rendez-vous donné. »
- Helper note: « Les modifications futures n’affectent jamais un engagement déjà formé. »
- CTA: « Commencer la configuration »

Interactions: Only primary CTA « Commencer la configuration ». No secondary form actions.

Visual / imagery: Hero shows a premium Afro hair studio moment featuring a Black and/or mixed-race woman with coily, curly, or textured hair (braids, twists/vanilles, ponytails, locs, or natural coils). Premium, realistic, respectful. No straight Eurocentric hair as default.

Design system Atelier Synergy: Manrope for UI, JetBrains Mono for status labels. Deep charcoal primary (#000000 / #1b1c1c), soft gold accent (#775a19 / #fed488) sparingly, surfaces #fbf9f8 / #ffffff / #efeded. Soft 0.25rem radii; hero media can be sharper. Tonal layers, no heavy multi-shadows, no purple gradients, no neon glow, no emoji decoration, no dark mode.

Quality bar: Premium enterprise mobile UI, calm editorial whitespace, clear hierarchy, accessible touch targets, French text only in UI.
```

---

## Prompt — S02 — Principes obligatoires de la plateforme

**Type :** Opérationnel  
**Acteur :** Coiffeuse  
**Moment du récit :** 2 — Présenter les principes obligatoires  
**Objectif :** Faire lire et reconnaître les principes non contournables avant de configurer

### Prompt Stitch

```text
Product context: Atelier Synergy — premium B2B2C mobile app for Afro / textured hair stylists. Professional Framework configuration.

Device: Mobile portrait ~390×844 only.

Screen type: OPERATIONAL — mandatory principles acknowledgment (read + confirm), not free-text editing.

Screen purpose: Platform presents PLATFORM_MANDATORY_PRINCIPLES that the coiffeuse cannot bypass. She must acknowledge before continuing. Personal preferences cannot become absolute rules against these principles.

Layout:
- Header: back + « Principes de la plateforme »
- Vertical storyline stepper (step 1/12 active) with soft-gold active marker
- Intro block explaining these principles protect both parties
- Scrollable list of principle rows (icon + title + one-line description)
- Sticky bottom: checkbox acknowledgment + primary CTA (disabled until checked)

French UI text:
- Title: « Principes obligatoires »
- Intro: « Ces principes protègent toutes les parties. Vous ne pouvez pas les contourner dans votre cadre. »
- Principles (each as a row):
  1) « Information avant l’engagement »
  2) « Consentement explicite »
  3) « Obligations bilatérales »
  4) « Proportionnalité des réparations »
  5) « Limitation du préjudice »
  6) « Traçabilité »
  7) « Voie de contestation »
  8) « Absence de sanction arbitraire »
  9) « Protection des informations personnelles »
  10) « Sécurité des deux parties »
- Note: « Une préférence personnelle ne peut pas devenir une règle absolue contraire à ces principes. »
- Checkbox: « J’ai lu et je comprends ces principes obligatoires »
- CTA disabled: « Continuer »
- CTA enabled: « Continuer »

Interactions: CTA disabled until checkbox checked. Back allowed. No free-form rule editor.

Visual: Optional small editorial header image of a Black woman stylist with textured Afro hair in a calm professional setting. Premium realistic representation.

Design system Atelier Synergy: Manrope + JetBrains Mono labels, charcoal/gold, light surfaces #fbf9f8, soft radii, no purple, no clutter, enterprise-grade mobile UI. All visible UI text in French.
```

---

## Prompt — S03 — Contextes généraux d’exercice

**Type :** Opérationnel  
**Acteur :** Coiffeuse  
**Moment du récit :** 3 — Déclarer les contextes généraux d’exercice  
**Objectif :** Déclarer où elle exerce généralement (pas les lieux précis de capacité)

### Prompt Stitch

```text
Product context: Atelier Synergy mobile — Afro / textured hair professional platform. Configuring PROFESSIONAL_FRAMEWORK_DRAFT.

Device: Mobile ~390×844 portrait only.

Screen type: OPERATIONAL multi-select configuration.

Screen purpose: Coiffeuse declares general work contexts. This does NOT replace precise places/zones of a capacity (step 0). For each selected context she sets: currently used, all services vs some only, general constraints, address confidentiality before engagement.

Layout:
- Header back + « Organisation générale »
- Stepper step « Contextes »
- Helper: distinction cadre vs capacité
- Selectable context chips/rows (multi-select)
- For each selected context: expand panel with toggles/fields
- Sticky CTA « Enregistrer et continuer »

French UI text:
- Title: « Contextes d’exercice »
- Helper: « Indiquez où vous exercez généralement. Les lieux précis d’une prestation se définissent à l’étape Capacité. »
- Options:
  « À mon domicile »
  « En salon »
  « Espace partagé »
  « Au domicile de la cliente »
  « Plusieurs contextes »
  « Lieu temporaire / événementiel »
- Per selected context fields:
  Toggle « Utilisé actuellement »
  Segmented « Toutes les prestations » / « Certaines seulement »
  Text area « Contraintes générales » (short)
  Toggle « Adresse confidentielle avant engagement »
- Validation hint if none selected: « Sélectionnez au moins un contexte pour activer votre cadre plus tard. »
- CTA: « Enregistrer et continuer »

Interactions: At least one context required to proceed in happy path; soft warning if empty. Secondary « Enregistrer le brouillon » ghost optional.

Visual: Small contextual illustration or photo of Black / mixed-race women with coily or braided textured hair in professional Afro hair settings matching selected contexts. No Eurocentric straight hair default.

Design system Atelier Synergy: Manrope, JetBrains Mono for micro-labels, charcoal primary buttons, soft gold for active selection markers, light tonal surfaces, soft 0.25rem corners, clean enterprise mobile UI. All UI text in French.
```

---

## Prompt — S04 — Règles générales d’accès et d’accueil

**Type :** Opérationnel  
**Acteur :** Coiffeuse  
**Moment du récit :** 4 — Définir les règles générales d’accès et d’accueil  
**Objectif :** Formuler des conditions opérationnelles compréhensibles (pas des interdits opaques)

### Prompt Stitch

```text
Product context: Atelier Synergy — premium Afro hair stylist mobile configuration for Professional Framework.

Device: Mobile portrait ~390×844 only.

Screen type: OPERATIONAL structured rules form.

Screen purpose: Coiffeuse defines general access/welcome rules for her work environment. Rules must be understandable operational conditions. Platform may ask for justification when a rule strongly limits access.

Layout:
- Header « Accès et accueil »
- Stepper
- Grouped sections with clear labels
- For restrictive choices: required short justification field appears
- Example of good vs insufficient formulation as subtle helper (not a card stack clutter)
- Sticky CTA

French UI text:
- Title: « Accès et accueil »
- Intro: « Formulez des conditions opérationnelles compréhensibles pour vos clientes. »
- Sections / controls:
  « Accompagnants généralement autorisés » — Oui / Non / Selon le cas
  « Enfants accompagnants » — Oui / Non
  « Prise en charge de personnes mineures » — Oui / Non
  « Représentant légal obligatoire » — Oui / Non / Si mineure
  « Accessibilité du lieu » — short structured options + notes
  « Présence d’animaux » — Oui / Non / Possible
  « Contraintes d’entrée du bâtiment » — text short
  « Confidentialité de l’adresse » — Masquée avant engagement / Visible selon contexte
  « Autres restrictions nécessaires » — text short
- When a strong restriction is chosen, show field: « Justification (contrainte identifiable) » placeholder « Ex. : Le lieu ne permet pas d’accueillir d’accompagnant en raison de l’espace disponible. »
- Warning helper: « Évitez les formules du type “Aucun accompagnant, sans exception ni explication”. »
- CTA: « Enregistrer et continuer »

Interactions: Justification required when companions are forbidden or minors accepted without legal representative planned — show inline error « Une contrainte identifiable est requise ».

Visual: Optional editorial photo of welcoming Afro textured-hair studio with Black women clients/stylists — premium, respectful.

Design system Atelier Synergy: charcoal/gold, Manrope + JetBrains Mono status/labels, light surfaces, soft radii, no purple, no heavy shadows. All visible UI text in French. Enterprise-grade clarity.
```

---

## Prompt — S05 — Cadre général de communication

**Type :** Opérationnel  
**Acteur :** Coiffeuse  
**Moment du récit :** 5 — Définir le cadre général de communication  
**Objectif :** Définir canaux, plages, délai indicatif — sans obligation de connexion permanente

### Prompt Stitch

```text
Product context: Atelier Synergy mobile app for Afro / textured hair professionals configuring their Professional Framework.

Device: Mobile ~390×844 portrait only.

Screen type: OPERATIONAL communication settings.

Screen purpose: Coiffeuse sets official channels, response windows, indicative response delay, non-response days, what stays in the appointment file, urgent notification cases, and languages. Response delay is operational information, NOT a universal promise. Platform must NOT imply permanent online obligation.

Layout:
- Header « Communication »
- Stepper
- Channel multi-select
- Time windows editor (simple day/time rows)
- Indicative delay selector
- Languages multi-select
- Info callout about non-permanent connection
- Sticky CTA

French UI text:
- Title: « Cadre de communication »
- Intro: « Indiquez comment vous traitez les demandes. Ce n’est pas une obligation d’être connectée en permanence. »
- « Canaux officiels acceptés »: Messagerie plateforme / Appel / SMS / Autre autorisé
- « Plages de traitement des demandes »: add rows Jour + Heure début/fin
- « Délai indicatif de réponse »: 2h / 12h / 24h / 48h / Personnalisé
- Label note under delay: « Information de fonctionnement, pas une promesse universelle. »
- « Jours sans réponse »: chips Lundi…Dimanche
- « Informations à conserver dans le dossier »: short checklist
- « Situations urgentes à notifier »: checklist (sécurité, retard majeur, impossibilité d’accéder…)
- « Langues d’échange »: Français / English / Autre
- Callout: « La vitesse de réponse ne doit pas devenir une obligation permanente de connexion. »
- CTA: « Enregistrer et continuer »

Interactions: Require at least one channel and one language. Primary charcoal button.

Visual: Subtle header image of a Black woman stylist with braids or natural coils calmly managing messages in a premium setting.

Design system Atelier Synergy. All UI text in French. Clean, professional, mobile-first, no clutter.
```

---

## Prompt — S06 — Conditions générales d’admission

**Type :** Opérationnel  
**Acteur :** Coiffeuse  
**Moment du récit :** 6 — Conditions générales d’admission  
**Objectif :** Déclarer situations générales acceptées/refusées (pas les contre-indications techniques de prestation)

### Prompt Stitch

```text
Product context: Atelier Synergy — Professional Framework for Afro hair stylists (braids, vanilles, ponytails, locs).

Device: Mobile portrait ~390×844 only.

Screen type: OPERATIONAL admission rules.

Screen purpose: Coiffeuse declares general situations she can or cannot take. Keep rules GENERAL. Technique-specific contraindications belong to service configuration (step 0) — show a boundary note.

Layout:
- Header « Admission »
- Stepper
- Boundary note
- Toggle/list of general admission rules with optional age threshold
- Sticky CTA

French UI text:
- Title: « Conditions générales d’admission »
- Boundary: « Ces règles restent générales. Les contre-indications liées à une technique précise se définissent dans la configuration de service. »
- Controls:
  « Clientèle adulte uniquement » toggle
  If off: « Âge minimum pour les enfants » numeric
  « Échange préalable obligatoire dans certains cas » toggle + short cases text
  « Refus si état manifestement incompatible » toggle
  « Refus de certains produits apportés par la cliente » toggle + examples field
  « Pas de situations relevant d’un professionnel de santé » toggle (always-on recommended, info)
  « Impossible d’exercer si la sécurité ne peut être garantie » toggle (recommended on)
- CTA: « Enregistrer et continuer »

Interactions: Clear defaults favoring safety. No free legal essay — structured fields.

Visual: Premium photo of Black / mixed-race women with textured hair in consultation — respectful, professional.

Design system Atelier Synergy: Manrope, JetBrains Mono for ages/numbers, charcoal/gold, light surfaces. All UI text in French.
```

---

## Prompt — S07 — Règles générales de comportement

**Type :** Opérationnel  
**Acteur :** Coiffeuse  
**Moment du récit :** 7 — Règles générales de comportement  
**Objectif :** Définir un cadre relationnel bilatéral

### Prompt Stitch

```text
Product context: Atelier Synergy mobile Professional Framework configuration for Afro / textured hair stylists.

Device: Mobile ~390×844 only.

Screen type: OPERATIONAL bilateral conduct rules.

Screen purpose: Define behaviors required for an acceptable working relationship. Rules MUST apply to both parties. Stylist cannot demand conduct she and collaborators would not respect.

Layout:
- Header « Comportement »
- Stepper
- Bilateral banner
- Checklist of mutual rules (all selected by default where platform requires)
- Sticky CTA

French UI text:
- Title: « Règles de comportement »
- Banner: « Ces règles s’appliquent aux deux parties. »
- Checklist items (each with short subtitle):
  « Respect mutuel »
  « Absence de violence ou de menace »
  « Absence de harcèlement »
  « Respect du lieu et du matériel »
  « Interdiction de filmer ou publier sans consentement »
  « Interdiction de modifier la prestation unilatéralement »
  « Possibilité d’interrompre en cas de danger »
- Note: « Vous ne pouvez pas exiger de la cliente un comportement que vous-même ne respecteriez pas. »
- CTA: « Enregistrer et continuer »

Interactions: Platform-required items locked on; optional refinements as short notes. Primary CTA.

Visual: Calm premium imagery with Black women (stylist + client cues) with coily/braided hair — dignity and mutual respect tone.

Design system Atelier Synergy. All UI text in French. Enterprise, clean, no emoji.
```

---

## Prompt — S08 — Moyens de paiement acceptés

**Type :** Opérationnel  
**Acteur :** Coiffeuse  
**Moment du récit :** 8 — Déclarer les moyens de paiement acceptés  
**Objectif :** Déclarer moyens techniques acceptés (pas montants ni fonction juridique des versements)

### Prompt Stitch

```text
Product context: Atelier Synergy — Afro hair professional mobile platform. Professional Framework payment methods (general rules only).

Device: Mobile portrait ~390×844.

Screen type: OPERATIONAL payment methods declaration.

Screen purpose: Coiffeuse declares which payment means she can technically receive. Amounts, initial payment legal function, balance split belong to engagement/finance — show boundary note. Tips transfer method can be specified.

Layout:
- Header « Paiement »
- Stepper
- Boundary callout
- Multi-select payment methods
- Fields for balance means, receipt, tips
- Sticky CTA

French UI text:
- Title: « Moyens de paiement acceptés »
- Boundary: « Ici, uniquement les moyens techniquement acceptés. Les montants et la fonction de chaque versement se définissent à l’engagement. »
- Methods: « Paiement par la plateforme » / « Carte » / « Virement » / « Espèces » / « Autre moyen autorisé »
- « Moyens acceptés pour le solde » multi-select
- Toggle « Je peux fournir un justificatif »
- « Transmission des pourboires » short options: Via plateforme / En main propre / Non applicable
- « Contraintes pratiques » short text
- CTA: « Enregistrer et continuer »
- Error if none selected: « Déclarez au moins un moyen de paiement. »

Visual: Minimal — optional abstract premium payment UI moment with Black woman stylist with textured hair reviewing a clean payment summary (no card numbers).

Design system Atelier Synergy: JetBrains Mono for method labels, Manrope body, charcoal buttons, soft gold accents. All UI text in French.
```

---

## Prompt — S09 — Politiques opérationnelles proposées

**Type :** Opérationnel  
**Acteur :** Coiffeuse  
**Moment du récit :** 9 — Sélectionner les politiques opérationnelles  
**Objectif :** Choisir parmi politiques plateforme comparables + paramètres — pas inventer sanctions unilatérales

### Prompt Stitch

```text
Product context: Atelier Synergy Professional Framework — operational policies selection for Afro / textured hair stylists.

Device: Mobile ~390×844 portrait only.

Screen type: OPERATIONAL policy picker with parameters.

Screen purpose: For topics affecting both parties, stylist does NOT freely write policies. She selects platform-proposed comparable frameworks for delay, postponement, cancellation, no-show, modification, inability to continue, incident communication — then fills needed parameters. Forbidden: arbitrary retained %, unilateral sanction, penalty independent of harm, asymmetric protection without justification.

Layout:
- Header « Politiques opérationnelles »
- Stepper
- Intro
- List of policy topics; each opens a selectable policy cards (2–3 options) + parameter fields
- Warning against unilateral sanctions
- Sticky CTA

French UI text:
- Title: « Politiques proposées »
- Intro: « Choisissez un cadre comparable proposé par la plateforme, puis précisez vos paramètres. »
- Topics:
  « Retard »
  « Report »
  « Annulation »
  « Absence »
  « Modification »
  « Impossibilité de poursuivre »
  « Communication d’un incident »
- For each topic: policy options like « Équilibrée », « Souple », « Stricte encadrée » (short descriptions of reciprocity)
- Parameters examples:
  « Délai habituel pour remplacer un créneau »
  « Coûts préparatoires possibles » Oui/Non
  « Report généralement possible » Oui/Non
  « Temps minimal pour réévaluer après un retard »
- Banner: « Une sanction unilatérale et automatique est interdite. »
- CTA: « Enregistrer et continuer »

Interactions: Each sensitive topic needs one selected policy before continue. Selecting a custom free-text sanction is not offered.

Visual: Clean UI only or subtle textured-hair professional photo (Black woman stylist). Premium enterprise look.

Design system Atelier Synergy. All UI text in French. No purple, no clutter.
```

---

## Prompt — S10 — Sécurité et interruption

**Type :** Opérationnel  
**Acteur :** Coiffeuse  
**Moment du récit :** 10 — Règles générales de sécurité et d’interruption  
**Objectif :** Définir motifs et conséquences tracées d’un refus / suspension / interruption

### Prompt Stitch

```text
Product context: Atelier Synergy mobile — Professional Framework safety & interruption rules for Afro hair professionals.

Device: Mobile portrait ~390×844.

Screen type: OPERATIONAL safety configuration.

Screen purpose: Coiffeuse indicates when she may refuse to start, temporarily suspend, adapt, or permanently interrupt a service. Motives listed. Consequences must be defined (inform client, structured record, alternative, postpone, partial close, resolution). Interruption must not be arbitrary without trace.

Layout:
- Header « Sécurité et interruption »
- Stepper
- Motives multi-select
- Actions allowed multi-select
- Consequences checklist (required)
- Sticky CTA

French UI text:
- Title: « Sécurité et interruption »
- Intro: « Une interruption doit produire une trace et une orientation de résolution. »
- « Motifs généraux »:
  Danger pour la cliente
  Danger pour la coiffeuse
  État incompatible non déclaré
  Produit dangereux ou inconnu
  Comportement violent ou menaçant
  Impossibilité technique manifeste
  Absence de consentement à une adaptation indispensable
- « Actions possibles »:
  Refuser de commencer
  Suspendre temporairement
  Adapter
  Interrompre définitivement
- « Conséquences à appliquer » (required at least one path):
  Informer la cliente
  Constat structuré
  Rechercher une alternative
  Report
  Clôture partielle
  Déclencher une résolution
- CTA: « Enregistrer et continuer »
- Error: « Définissez au moins une conséquence explicite. »

Visual: Serious, calm premium tone — Black woman stylist with textured hair in a safe professional studio. No dramatic fear imagery.

Design system Atelier Synergy. Error color #ba1a1a only for validation. All UI text in French.
```

---

## Prompt — S11 — Confidentialité et consentement

**Type :** Opérationnel  
**Acteur :** Coiffeuse  
**Moment du récit :** 11 — Confidentialité et consentement  
**Objectif :** Séparer consentements (prestation ≠ photo ≠ publication ≠ prospection)

### Prompt Stitch

```text
Product context: Atelier Synergy Professional Framework — privacy & consent settings for Afro / textured hair stylists.

Device: Mobile ~390×844 only.

Screen type: OPERATIONAL consent matrix.

Screen purpose: Separate consents. Consent to the service does NOT equal consent to be photographed, published in gallery, filmed, or receive commercial prospecting. Address masking before engagement is configured here at general level.

Layout:
- Header « Confidentialité »
- Stepper
- Strong educational callout about separated consents
- Toggles / segmented controls per usage
- Sticky CTA

French UI text:
- Title: « Confidentialité et consentement »
- Callout: « Le consentement à la prestation ne vaut pas consentement à la photo, à la publication, au film, ni à la prospection. »
- Controls:
  « Adresse masquée avant engagement » Oui/Non
  « Demander l’autorisation de photographier le résultat » Oui/Non
  « Conditions de publication d’une photo » options: Jamais sans consentement explicite / Galerie prestation seulement / Non publié
  « Le visage peut apparaître » Oui / Non / Seulement si consenti
  « Échanges utilisables comme preuve en cas d’incident » Oui (encadré) / Non
  « Informations jamais publiques » short multi-select (adresse exacte, documents d’identité, conversations privées…)
- CTA: « Enregistrer et continuer »

Visual: Portfolio-style sharp-corner media thumbnail showing Black woman with braids/twists/natural coils — illustrating consent-gated gallery, premium respectful.

Design system Atelier Synergy: sharp 0px for media thumbs, soft radii for controls, Manrope + JetBrains Mono. All UI text in French.
```

---

## Prompt — S12 — Possibilités d’exception

**Type :** Opérationnel  
**Acteur :** Coiffeuse  
**Moment du récit :** 12 — Définir les possibilités d’exception  
**Objectif :** Marquer quelles règles générales peuvent être adaptées plus tard — sans modifier le cadre ici

### Prompt Stitch

```text
Product context: Atelier Synergy — Professional Framework exceptions policy map for Afro hair stylists.

Device: Mobile portrait ~390×844.

Screen type: OPERATIONAL exception matrix (declarative).

Screen purpose: Coiffeuse indicates which general rules: have no exception for objective reason; may be replaced by a service-specific condition; may be adapted in a firm offer; require admin validation. An exception does NOT modify the general framework; it attaches later to a service, offer, or engagement.

Layout:
- Header « Exceptions »
- Stepper
- Intro
- List of key general rules with a segmented control for exception mode
- Example rows from storytelling
- Sticky CTA

French UI text:
- Title: « Possibilités d’exception »
- Intro: « Une exception ne modifie pas votre cadre général. Elle sera rattachée à une prestation, une proposition ou un engagement. »
- For each rule row, segment:
  « Aucune exception »
  « Via configuration de service »
  « Via proposition ferme »
  « Validation administrative »
- Example rows:
  « Aucun accompagnant » → hint example « Représentant légal pour prestation enfant »
  « Paiement du solde par carte » → « Espèces exceptionnelles dans un engagement »
  « Adresse masquée avant engagement » → « Communication anticipée pour accessibilité »
  « Pas de déplacement habituel » → « Déplacement exceptionnel en offre ferme »
- CTA: « Enregistrer et continuer »

Interactions: All listed rules must have a mode selected.

Visual: Clean structured UI; optional small Afro textured-hair editorial image.

Design system Atelier Synergy. All UI text in French. Enterprise clarity.
```

---

## Prompt — S13 — Soumission — cadre en révision

**Type :** Opérationnel  
**Acteur :** Coiffeuse  
**Moment du récit :** 13 — Soumettre le cadre au contrôle  
**Objectif :** Soumettre le brouillon ; statut IN_REVIEW

### Prompt Stitch

```text
Product context: Atelier Synergy Professional Framework submission screen for Afro / textured hair stylists.

Device: Mobile ~390×844 portrait.

Screen type: OPERATIONAL submission confirmation.

Screen purpose: Coiffeuse submits framework for platform checks (completeness, readability, contradictions, mandatory principles, reciprocity, resolution method, general vs service-specific distinction, preference vs objective constraint, explicit consequences, no unframed sanction). Status becomes PROFESSIONAL_FRAMEWORK_IN_REVIEW. Produces check report later.

Layout:
- Header « Soumettre le cadre »
- Status badge changing preview DRAFT → EN RÉVISION
- Checklist of what platform will verify (read-only)
- Completeness summary (green/amber items)
- Primary CTA submit + secondary keep drafting

French UI text:
- Title: « Soumettre pour vérification »
- Badge preview: « EN RÉVISION »
- Intro: « La plateforme vérifiera la cohérence de votre cadre avant activation. »
- Verification list:
  Complétude
  Lisibilité
  Absence de contradiction
  Conformité aux principes obligatoires
  Réciprocité
  Méthode de résolution
  Distinction règle générale / condition de prestation
  Conséquences explicites
  Absence de sanction non encadrée
- Summary: « Prêt à soumettre » or « Éléments manquants » with count
- CTA primary: « Soumettre le cadre »
- CTA secondary: « Continuer les modifications »
- Success toast/state copy: « Cadre soumis — statut EN RÉVISION »

Visual: Black woman stylist with textured hair reviewing a clean summary on phone — premium, calm confidence.

Design system Atelier Synergy. JetBrains Mono for status EN RÉVISION. All UI text in French.
```

---

## Prompt — S14 — Rapport de vérification — corrections

**Type :** Opérationnel  
**Acteur :** Coiffeuse  
**Moment du récit :** 14 — Corriger les incohérences  
**Objectif :** Afficher PROFESSIONAL_FRAMEWORK_CHECK_REPORT et corrections ciblées

### Prompt Stitch

```text
Product context: Atelier Synergy — verification report UI for Professional Framework (Afro hair stylist platform).

Device: Mobile portrait ~390×844.

Screen type: OPERATIONAL issue list + targeted fix navigation.

Screen purpose: Platform found anomalies; framework stays in review. Show targeted correction requests rather than full rewrite. Examples: client delay sanctioned but stylist delay untreated; non-refundable deposit in all cases; companions forbidden while minors accepted without legal representative; cash-only vs platform payment claim; confidential address shown publicly; interruption without motive/resolution; cancellation policy without method/cap/contest path; service-specific rule placed in general framework.

Layout:
- Header « Rapport de vérification »
- Badge « EN RÉVISION »
- Summary counts: Bloquantes / À clarifier
- Issue list rows: severity, title, explanation, principle concerned, CTA « Corriger »
- Sticky « Resoumettre » disabled until blocking issues resolved

French UI text:
- Title: « Corrections requises »
- Summary: « 3 anomalies bloquantes · 1 clarification »
- Example issue cards (content):
  1) « Retard asymétrique » — « Le retard cliente est sanctionné, mais le retard coiffeuse n’est pas traité. »
  2) « Acompte non remboursable généralisé » — « Une conservation automatique dans toutes les situations n’est pas autorisée. »
  3) « Mineures sans représentant » — « Accompagnants interdits alors que les mineures sont acceptées sans prévoir le représentant légal. »
- Each: button « Corriger »
- Footer CTA: « Resoumettre après corrections » (disabled state visible)
- Helper: « Corrigez de façon ciblée — pas besoin de tout réécrire. »

Interactions: Tapping Corriger implies jump to relevant section (visual affordance). Blocking issues in error container tint lightly.

Visual: No panic UI — precise enterprise review. Optional small avatar of Black woman stylist with coils/braids.

Design system Atelier Synergy: error #ba1a1a for blocking, amber/gold for clarifications. All UI text in French.
```

---

## Prompt — S15 — Accompagnement opérateur (pilote)

**Type :** Opérationnel  
**Acteur :** Coiffeuse (assistée) / Opérateur pilote  
**Moment du récit :** 15 / Branche A — formalisation accompagnée  
**Objectif :** Montrer l’aide opérateur sans lui permettre d’activer seul

### Prompt Stitch

```text
Product context: Atelier Synergy pilot mode — operator-assisted Professional Framework formalization for Afro / textured hair stylists.

Device: Mobile ~390×844 (stylist-facing screen).

Screen type: OPERATIONAL assisted drafting status + collaboration panel.

Screen purpose: During pilot, operator may help collect current practices (often in DMs/stories), separate habits from necessary rules, distinguish general vs specific, reformulate for clarity, check proportionality, and fill the draft ON BEHALF of the stylist. Operator must NOT invent rules, choose policies instead of her, validate unauthorized sanctions, or activate without her explicit agreement.

Layout:
- Header « Accompagnement pilote »
- Banner « Brouillon assisté par un opérateur »
- Timeline of assistance actions (read-only)
- What operator can / cannot do (two short lists)
- CTA for stylist: review draft / continue configuration
- Explicit note that activation requires stylist validation

French UI text:
- Title: « Formalisation accompagnée »
- Banner: « Un opérateur pilote vous aide à structurer vos pratiques actuelles. »
- « Ce que l’opérateur peut faire »:
  Recueillir vos pratiques actuelles
  Séparer habitude et règle nécessaire
  Distinguer général et spécifique
  Reformuler pour être compréhensible
  Préparer le brouillon
- « Ce que l’opérateur ne peut pas faire »:
  Inventer une règle
  Choisir une politique à votre place
  Valider une sanction non prévue
  Activer le cadre sans votre accord
- Status: « BROUILLON — en accompagnement »
- CTA primary: « Relire mon brouillon »
- CTA secondary: « Continuer la configuration »
- Footer: « L’activation exigera votre validation explicite. »

Visual: Collaborative premium tone — Black woman stylist with textured hair and a professional operator cue (neutral), respectful, not hierarchical caricature.

Design system Atelier Synergy. All UI text in French.
```

---

## Prompt — S16 — Récapitulatif et validation explicite

**Type :** Opérationnel  
**Acteur :** Coiffeuse  
**Moment du récit :** 16 — Valider le récapitulatif  
**Objectif :** Synthèse structurée + preuve de validation horodatée

### Prompt Stitch

```text
Product context: Atelier Synergy — Professional Framework final recap & explicit validation for Afro hair stylists.

Device: Mobile portrait ~390×844.

Screen type: OPERATIONAL structured recap + legal-style explicit confirmation (still product UI, not a PDF dump).

Screen purpose: Coiffeuse reviews synthesis: where she works, access, communication, who she can receive, payment means, relational rules, incident handling, exceptionable rules, what clients will see. She confirms the exact sentence that this framework represents the general conditions under which she accepts to work. Produces timestamped proof.

Layout:
- Header « Récapitulatif »
- Badge ready state
- Accordion or stacked summary sections (readable, scannable)
- Visibility legend: Interne / Visible cliente / Avant engagement
- Explicit confirmation checkbox with exact commitment sentence
- Sticky CTA « Valider et activer » (or « Valider le cadre »)

French UI text:
- Title: « Vérifier votre cadre »
- Intro: « Relisez la synthèse avant validation. »
- Sections:
  « Où j’exerce »
  « Accès et accueil »
  « Communication »
  « Situations acceptées »
  « Paiement »
  « Comportement »
  « Incidents et sécurité »
  « Exceptions possibles »
  « Visible par la cliente »
- Visibility chips: « Interne » / « Publique » / « Avant engagement »
- Checkbox exact: « Ce cadre représente les conditions générales dans lesquelles j’accepte d’exercer. »
- CTA: « Valider le cadre »
- Disabled until checkbox checked
- Microcopy: « Une preuve horodatée sera enregistrée. »

Visual: Premium calm recap; optional small portrait of Black woman stylist with braids/locs/natural coils affirming professionally.

Design system Atelier Synergy. JetBrains Mono for version placeholder « v1 · brouillon final ». All UI text in French.
```

---

## Prompt — S17 — Cadre activé — confirmation

**Type :** Opérationnel  
**Acteur :** Coiffeuse  
**Moment du récit :** 17 — Activer le cadre professionnel  
**Objectif :** Confirmer PROFESSIONAL_FRAMEWORK_ACTIVE et débloquer les capacités

### Prompt Stitch

```text
Product context: Atelier Synergy success confirmation — Professional Framework activated for Afro / textured hair stylist.

Device: Mobile ~390×844 portrait.

Screen type: OPERATIONAL success / next-step screen.

Screen purpose: Platform recorded version, timestamped validation, version number, kept proof, set status PROFESSIONAL_FRAMEWORK_ACTIVE, and now authorizes opening professional capacities. Distinguish internal vs publicly visible vs pre-engagement rules vs post-confirmation info.

Layout:
- Success header with status badge ACTIF
- Version + timestamp block (JetBrains Mono)
- What is now possible
- Visibility summary
- Primary CTA to open first capacity (step 0) + secondary view framework

French UI text:
- Title: « Cadre professionnel activé »
- Badge: « ACTIF »
- Meta: « Version 1 · Validé le 01/08/2026 · 09:42 »
- Body: « Votre cadre est versionné. Vous pouvez ouvrir des capacités professionnelles. Les engagements déjà formés ne seront jamais modifiés rétroactivement. »
- « Désormais possible »:
  Ouvrir une capacité professionnelle
  Recevoir des demandes compatibles
- « Visibilité »:
  Informations internes
  Informations publiquement visibles
  Règles affichées avant engagement
  Informations après confirmation
- CTA primary: « Ouvrir une capacité »
- CTA secondary: « Voir mon cadre »

Visual: Celebratory but restrained premium moment — Black woman stylist with textured Afro hair (braids/twists/ponytail/locs) in a high-end studio, confident and professional. No confetti spam, no emoji.

Design system Atelier Synergy: soft gold used sparingly for success accent, charcoal CTAs, light surfaces. All UI text in French.
```

---

## Prompt — S18 — Règle incompatible bloquée

**Type :** Opérationnel  
**Acteur :** Coiffeuse  
**Moment du récit :** Branche B — règle incompatible  
**Objectif :** Bloquer l’activation, expliquer principes, proposer politique compatible

### Prompt Stitch

```text
Product context: Atelier Synergy compliance block screen for incompatible Professional Framework rule (Afro hair stylist platform).

Device: Mobile ~390×844.

Screen type: OPERATIONAL blocking error + remediation.

Screen purpose: Example incompatible rule: any client 10 minutes late automatically loses entire payment regardless of situation. Platform blocks activation, shows concerned principles, proposes a compatible policy, asks stylist to enter real constraints, and can escalate to administrator if disagreement.

Layout:
- Header « Règle incompatible »
- Strong error summary
- Quoted rejected rule
- Principles violated list
- Proposed compatible policy card
- Fields to describe real constraints
- CTAs: adopt compatible policy / request admin review

French UI text:
- Title: « Activation bloquée »
- Badge: « INCOMPATIBLE »
- Quote: « Toute cliente en retard de dix minutes perd automatiquement la totalité de son versement, quelle que soit la situation. »
- « Principes concernés »:
  Proportionnalité des réparations
  Absence de sanction arbitraire
  Obligations bilatérales
  Voie de contestation
- « Politique compatible proposée »: short title + 2 lines explaining reciprocal delay handling with structured resolution
- Field: « Vos contraintes réelles » placeholder « Ex. : temps minimal pour réorganiser un créneau, coûts préparatoires… »
- CTA primary: « Adopter la politique proposée »
- CTA secondary: « Demander un arbitrage »
- Note: « Une sanction unilatérale automatique n’est pas autorisée. »

Visual: Precise, serious enterprise UI — not aggressive. Optional small avatar Black woman stylist with textured hair.

Design system Atelier Synergy with error #ba1a1a. All UI text in French.
```

---

## Prompt — S19 — Mise à jour requise après changement

**Type :** Opérationnel  
**Acteur :** Coiffeuse  
**Moment du récit :** Branche C — déménagement / UPDATE_REQUIRED  
**Objectif :** Créer une nouvelle version ; reconfirmer capacités ; non-rétroactivité

### Prompt Stitch

```text
Product context: Atelier Synergy — Professional Framework update flow after significant organization change (Afro / textured hair stylists).

Device: Mobile portrait ~390×844.

Screen type: OPERATIONAL update-required wizard entry + impact summary.

Screen purpose: After move/change of place, access rules, travel radius, address confidentiality — platform creates a new version, identifies affected capacities, asks reconfirmation, keeps old version for existing engagements, applies new version to new offers. Status UPDATE_REQUIRED until completed.

Layout:
- Header « Mise à jour du cadre »
- Badge « MISE À JOUR REQUISE »
- Impact summary
- List of changed domains to review
- Affected capacities count
- Non-retroactivity callout
- CTA start update

French UI text:
- Title: « Votre organisation a changé »
- Badge: « MISE À JOUR REQUISE »
- Intro: « Une nouvelle version du cadre est nécessaire. Les engagements déjà acceptés restent inchangés. »
- « À revoir »:
  Lieu d’exercice
  Règles d’accès
  Rayon de déplacement
  Confidentialité de l’adresse
- Impact:
  « 4 capacités à reconfirmer »
  « Ancienne version conservée pour les rendez-vous existants »
  « Nouvelle version appliquée aux prochaines propositions »
- Callout: « Aucune modification rétroactive des engagements. »
- CTA primary: « Mettre à jour mon cadre »
- CTA secondary: « Voir les capacités concernées »

Visual: Premium relocation/organization tone with Black woman stylist with natural coils or braids packing/setting up a professional Afro hair workspace — realistic, dignified.

Design system Atelier Synergy: warm amber/gold for UPDATE_REQUIRED badge, charcoal structure, Manrope + JetBrains Mono. All UI text in French. Enterprise-grade mobile UI.
```

---

## Notes de couverture

| Récit | Couverture |
| ----- | ---------- |
| 1 — Ouvrir brouillon | S01 (entrée + statut BROUILLON) |
| 2 — Principes | S02 |
| 3 — Contextes | S03 |
| 4 — Accès / accueil | S04 |
| 5 — Communication | S05 |
| 6 — Admission | S06 |
| 7 — Comportement | S07 |
| 8 — Paiement | S08 |
| 9 — Politiques | S09 |
| 10 — Sécurité | S10 |
| 11 — Confidentialité | S11 |
| 12 — Exceptions | S12 |
| 13 — Soumission | S13 |
| 14 — Corrections | S14 |
| 15 — Opérateur pilote | S15 |
| 16 — Validation | S16 |
| 17 — Activation | S17 |
| Branche A | S15 |
| Branche B | S18 |
| Branche C | S19 |
| Branches D/E | Reportées aux étapes 0 / 3 / 4 (frontière storytelling) |
)
