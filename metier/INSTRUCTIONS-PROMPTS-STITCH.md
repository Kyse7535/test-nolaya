# Instructions — Génération des prompts Google Stitch

Document de référence unique pour produire les prompts Stitch à partir des domain storytellings du dossier `metier/`.

Toute génération de fichier `prompts-stitch.md` doit respecter ces règles. En cas de doute, ce fichier prime.

---

## 1. Objectif

Pour chaque bloc métier, produire des prompts Google Stitch qui génèrent des **écrans mobiles** correspondant **exactement** au besoin décrit dans le domain storytelling du bloc.

Les écrans doivent refléter une plateforme professionnelle de qualité, destinée à la **coiffure afro** (vanilles, braids, ponytails, twists, locks, etc.).

---

## 2. Périmètre des blocs

Traiter **un bloc à la fois**, dans cet ordre. Valider le premier bloc avant d’enchaîner.

| Ordre | Dossier | Source métier | Fichier de sortie |
| ----- | ------- | ------------- | ----------------- |
| 1 | `_0-definir-cadre-pro` | `domain-storytelling-etape-avant-0.md` | `prompts-stitch.md` |
| 2 | `0-capacit_professionnelle_coiffeuse` | `domain-storytelling-etape-0.md` | `prompts-stitch.md` |
| 3 | `1-recherche-besoin-cliente` | `domain-storytelling-etape-1.md` | `prompts-stitch.md` |
| 4 | `2-apparier-demande` | `domain-storytelling-etape-2.md` | `prompts-stitch.md` |
| 5 | `3-validation-faisabilite` | `domain-storytelling-etape-3.md` | `prompts-stitch.md` |
| 6 | `4-former-engagement` | `domain-storytelling-etape-4.md` | `prompts-stitch.md` |
| 7 | `5-rendez-vous-operationnel` | `domain-storytelling-etape-5.md` | `prompts-stitch.md` |
| 8 | `6-realiser-prestation` | `domain-storytelling-etape-6.md` | `prompts-stitch.md` |
| 9 | `7-regler` | `domain-storytelling-etape-7.md` | `prompts-stitch.md` |
| 10 | `8-produire-preuve` | `domain-storytelling-etape-8.md` | `prompts-stitch.md` |

### Règles de sortie

- **Un fichier de prompts par bloc** : `metier/<dossier-bloc>/prompts-stitch.md`
- Pas de fichier global regroupant tous les prompts
- Couvrir **tout le récit** : parcours nominal **et** écrans absents aujourd’hui (y compris branches alternatives utiles au pilote)
- Ne pas se limiter aux `code.html` déjà présents ; s’en servir uniquement comme référence secondaire

---

## 3. Méthode de travail (par bloc)

1. Lire intégralement le domain storytelling du bloc.
2. Rédiger d’abord le prompt de l’**écran explicatif d’entrée** du processus (voir §4).
3. Identifier ensuite les **écrans opérationnels** nécessaires à partir du récit (pas à partir des écrans déjà générés).
4. Pour chaque écran : rédiger un prompt Stitch autonome, prêt à coller.
5. Écrire tous les prompts du bloc dans `prompts-stitch.md` — `S01` = écran explicatif d’entrée.
6. Attendre validation humaine avant le bloc suivant (surtout pour le bloc 1).

---

## 4. Écrans explicatifs d’entrée (obligatoire)

À l’**entrée de chaque étape / processus métier**, générer un **écran explicatif d’accueil** (orientation / onboarding), distinct des écrans de saisie et d’action.

### Rôle

Cet écran n’est **pas** un formulaire. Il explique à l’acteur :

- où il se trouve dans le parcours ;
- **pourquoi** cette étape existe ;
- **ce qu’elle produit** comme résultat métier ;
- les **piliers / objets métier** qu’il va configurer ou traverser ;
- comment démarrer (CTA unique).

### Référence de structure

S’inspirer de la structure de l’écran Stitch « Cadre Professionnel » (welcome) :

1. Header avec retour + titre de l’étape
2. Badge de statut (ex. `BROUILLON`, `DRAFT`) si pertinent
3. Titre d’accueil clair
4. Paragraphe pédagogique court (fondation / enjeu de l’étape)
5. Ancre visuelle (hero image) avec courte phrase d’intention en overlay
6. Section « piliers » : 3 à 6 blocs explicatifs (icône + titre + 1–2 phrases) issus du storytelling
7. CTA unique sticky ou bas d’écran : « Commencer… » / « Continuer… »

### Règles

- **Un écran explicatif d’entrée minimum par bloc** (`S01`)
- Contenu pédagogique tiré du domain storytelling (périmètre, objets métier, résultat attendu) — pas de marketing générique
- Mobile only, texte UI en français
- Design system **Nolaya** (Manrope / JetBrains Mono, charcoal + soft gold) — on reprend la **structure** de la référence, pas forcément ses couleurs/fonts d’export
- Visuels : identité afro / textured hair (§7)
- Exception UX pour cet écran uniquement : les **blocs piliers** sont autorisés (même si la règle générale évite les cards partout ailleurs)
- Ne pas y mélanger de champs de saisie, toggles métier, ni listes opérationnelles

### Marquage dans la cartographie

Dans le tableau des écrans, colonne **Type** :

| Type | Usage |
| ---- | ----- |
| `Explicatif` | Écran d’entrée / orientation de l’étape |
| `Opérationnel` | Saisie, décision, suivi, confirmation, erreur |

---

## 5. Langue

| Élément | Langue |
| ------- | ------ |
| Prompt soumis à Stitch | **Anglais** |
| Texte visible dans l’UI générée (labels, titres, boutons, messages, statuts, placeholders) | **Français** |
| Noms de fichiers / structure markdown | Français ou anglais technique acceptable ; rester cohérent |

Chaque prompt doit contenir une consigne explicite du type :

> All visible UI text must be in French.

---

## 6. Cible device

- **Mobile only** (smartphone portrait)
- Viewport de référence : environ **390 × 844** (iPhone-class)
- Pas de desktop / tablet dans ces prompts
- Concevoir pour le doigt : zones tactiles suffisantes, hiérarchie claire, contenu scrollable si nécessaire

---

## 7. Identité produit & représentation visuelle (obligatoire)

Le produit est une plateforme de **coiffure afro / textured hair**.

### Personnes représentées

Toutes photos, illustrations, avatars, galeries et images générées doivent représenter des **femmes noires et/ou métissées**, avec des **cheveux crépus, bouclés ou texturés**.

Styles de coiffure à privilégier dans les visuels :

- vanilles / twists
- braids / tresses
- ponytails
- locks / locs
- curly / coily natural hair
- protective styles afro contemporains

### Interdits visuels

- Ne pas générer de visuels par défaut de cheveux lisses européens / asiatiques comme référence principale
- Ne pas utiliser de stock “salon générique” sans ancrage afro/texturé
- Éviter les clichés caricaturaux ; viser un rendu **premium, réaliste, digne, contemporain**

### Formulation à répéter dans chaque prompt contenant des images

Inclure une contrainte du type :

> Any photos, illustrations, avatars, or portfolio images must depict Black and/or mixed-race women with coily, curly, or textured hair (Afro hair: braids, twists/vanilles, ponytails, locs, natural coils). Premium, realistic, respectful representation. No straight Eurocentric hair as the default visual.

---

## 8. Design system de référence — Nolaya

S’appuyer sur `atelier_synergy/DESIGN.md` présent dans chaque bloc.

### Personnalité

- Professionnel, curated, collaboratif
- Style : **Corporate Modern** avec une touche **Minimalist Editorial**
- Sensation “luxury salon × enterprise SaaS”
- L’UI reste discrète ; le portfolio et les données métier restent au centre

### Couleurs (à rappeler dans les prompts)

- Primary / structure : charcoal profond `#000000` / `#1b1c1c`
- Accent prestige (sobre) : soft gold `#775a19` / container `#fed488`
- Surfaces : blancs et gris très clairs `#fbf9f8`, `#ffffff`, `#efeded`
- Erreur : `#ba1a1a`
- Pas de thème violet, pas de glow néon, pas de dark mode par défaut

### Typographie

- UI principale : **Manrope**
- Données / labels techniques / montants / statuts : **JetBrains Mono**
- Pas d’Inter, Roboto, Arial, system-ui comme police principale

### Layout & composants

- Grille mobile 4 colonnes, marges 16px, échelle 8px
- Coins : soft `0.25rem` ; médias portfolio : coins **sharp (0px)**
- Élévation par couches tonales, pas d’ombres lourdes multi-couches
- Primary button : charcoal + texte blanc
- Secondary button : ghost (bordure charcoal)
- Badges de statut en uppercase JetBrains Mono
- Stepper vertical type “storyline” pour les flux multi-étapes Domain Storytelling

### À éviter (anti-patterns AI)

- Violet / indigo gradients
- Fond cream terracotta générique
- Cards partout, pills arrondies excessives
- Ombres empilées, glow, stickers flottants
- Densité “dashboard” dans un écran de parcours
- Emojis décoratifs

---

## 9. Fidélité métier (règle critique)

Les prompts doivent coller au domain storytelling :

- Acteur exact (coiffeuse, cliente, plateforme, opérateur…)
- Objectif de l’écran dans le parcours
- Données affichées / saisies
- Actions possibles et CTA principaux
- Statuts métier (`PROFESSIONAL_FRAMEWORK_DRAFT`, `CAPACITY_OPEN`, etc.) quand ils apparaissent
- Règles de validation / blocages / messages d’erreur utiles
- Frontières avec les étapes amont / aval (ne pas mélanger les responsabilités d’étapes)

Ne pas inventer de fonctionnalités hors récit. Si une branche alternative est utile au pilote, l’inclure et la marquer comme telle.

---

## 10. Structure obligatoire de chaque fichier `prompts-stitch.md`

```markdown
# Prompts Stitch — <Nom du bloc>

> Source : `<fichier-domain-storytelling.md>`
> Device : Mobile (≈390×844)
> Prompt language : English
> UI text language : French
> Design system : Nolaya
> Visual identity : Afro / textured hair — Black & mixed-race women

## Cartographie des écrans

| ID | Écran | Type | Acteur | Étape / moment du récit | Priorité |
| -- | ----- | ---- | ------ | ----------------------- | -------- |
| S01 | Accueil explicatif — … | Explicatif | … | Entrée du processus | P0 |

## Prompt — S01 — Accueil explicatif — <Nom de l’étape>

**Type :** Explicatif
**Acteur :** …
**Moment du récit :** Entrée du processus
**Objectif :** Orienter et expliquer avant toute saisie

### Prompt Stitch

\`\`\`text
<prompt anglais prêt à coller>
\`\`\`

## Prompt — S02 — … (Opérationnel)
```

---

## 11. Structure obligatoire d’un prompt Stitch individuel

Chaque prompt (bloc ` ```text `) doit contenir, dans cet ordre :

1. **Product context** — plateforme B2B2C coiffure afro / textured hair, Nolaya
2. **Device** — mobile app screen, portrait, ~390×844
3. **Screen purpose** — qui fait quoi, pourquoi maintenant (préciser `Explicatif` ou `Opérationnel`)
4. **Layout** — structure de l’écran (header, sections, sticky CTA, etc.)
5. **UI content in French** — titres, labels, boutons, helper texts, empty/error states
6. **Interactions** — primary/secondary actions, disabled states if relevant
7. **Visual / imagery constraints** — femmes noires/métissées, cheveux crépus/texturés, styles afro
8. **Design system constraints** — Manrope + JetBrains Mono, charcoal/gold, surfaces claires, coins soft, médias sharp
9. **Quality bar** — premium, enterprise-grade, clean, accessible, no clutter

Pour un écran `Explicatif`, le layout doit suivre le pattern du §4 (badge, héros, piliers, CTA unique — aucune saisie).

Le prompt doit être **auto-suffisant** : collable dans Stitch sans lire le storytelling.

---

## 12. Granularité des écrans

- `S01` = toujours l’écran explicatif d’entrée du processus
- Un prompt = **un écran** (ou un état fort d’écran si l’état change radicalement l’UI)
- Préférer des écrans focalisés (une intention) plutôt qu’un “super-écran” fourre-tout
- Pour les flux longs : écran par étape du récit, plus écrans de récap / erreur / confirmation quand le métier l’exige
- Nommer les prompts `S01`, `S02`, … dans l’ordre du parcours

---

## 13. Contrôle qualité avant livraison d’un bloc

Checklist à vérifier pour chaque `prompts-stitch.md` :

- [ ] `S01` est un écran explicatif d’entrée (pattern §4)
- [ ] Tout le récit nominal est couvert
- [ ] Branches alternatives utiles au pilote sont couvertes ou explicitement reportées
- [ ] Chaque prompt est en anglais
- [ ] Chaque prompt impose le texte UI en français
- [ ] Chaque prompt avec image impose la représentation afro / textured hair
- [ ] Cible mobile exclusive
- [ ] Design system Nolaya rappelé
- [ ] Aucune invention hors domain storytelling
- [ ] Fichier placé dans le bon dossier bloc

---

## 14. Validation humaine

- Générer d’abord le bloc `_0-definir-cadre-pro`
- Présenter le fichier pour validation
- N’enchaîner sur le bloc suivant qu’après accord

---

## 15. Hors scope de cette phase

- Ne pas soumettre les prompts à Stitch automatiquement
- Ne pas régénérer / écraser les `code.html` existants sans demande explicite
- Ne pas créer de commits sauf demande explicite
- Ne pas documenter hors des `prompts-stitch.md` demandés (sauf mise à jour de ce fichier d’instructions)

