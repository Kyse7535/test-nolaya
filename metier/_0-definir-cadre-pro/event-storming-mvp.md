# Event Storming MVP — Avant 0 : Définir le cadre professionnel

> Source : `domain-storytelling-etape-avant-0-mvp.md`  
> Périmètre : happy path `DRAFT` → `ACTIVE` — sans opérateur, sans auth, sans paiement réel.

---

## 1. Chronologie (timeline)

```text
[Coiffeuse]
  |  OuvrirCadreProfessionnel
  v
ProfessionalFrameworkDraftOpened
  |  ConfigurerContextesExercice
  v
ExerciseContextsConfigured
  |  ConfigurerAccueilAcces
  v
WelcomeAccessConfigured
  |  ConfigurerCommunicationPaiement
  v
CommunicationAndPaymentConfigured
  |  ConfigurerPolitiquesSecuritePhotos
  v
PoliciesSecurityPhotosConfigured
  |  ValiderEtActiverCadre  (récap + confirmation explicite)
  v
ProfessionalFrameworkActivated   ← fin nominale
```

---

## 2. Acteurs

| Acteur | Rôle MVP |
| ------ | -------- |
| **Coiffeuse** | Seule actrice décisionnaire |
| Plateforme (assistant local) | Persistance `localStorage`, catalogue politiques |

Absents : Cliente, Opérateur, Admin.

---

## 3. Commandes → Événements → Agrégats

| Commande | Événement(s) | Agrégat |
| -------- | ------------ | ------- |
| `OuvrirCadreProfessionnel` | `ProfessionalFrameworkDraftOpened` | **ProfessionalFramework** |
| `ConfigurerContextesExercice` | `ExerciseContextsConfigured` | ProfessionalFramework |
| `ConfigurerAccueilAcces` | `WelcomeAccessConfigured` | ProfessionalFramework |
| `ConfigurerCommunicationPaiement` | `CommunicationAndPaymentConfigured` | ProfessionalFramework |
| `ConfigurerPolitiquesSecuritePhotos` | `PoliciesSecurityPhotosConfigured` | ProfessionalFramework |
| `ValiderEtActiverCadre` | `ProfessionalFrameworkActivated` | ProfessionalFramework |

---

## 4. Agrégat & cycle de vie

**Agrégat racine :** `ProfessionalFramework`

```text
PROFESSIONAL_FRAMEWORK_DRAFT
        ↓  ValiderEtActiverCadre (conditions §8 DST)
PROFESSIONAL_FRAMEWORK_ACTIVE
```

États hors MVP : `IN_REVIEW`, `UPDATE_REQUIRED`, `SUSPENDED`, `RETIRED`.

---

## 5. Politiques (réactives)

| Quand | Alors |
| ----- | ----- |
| `ProfessionalFrameworkActivated` | Aval étape 0 peut consommer le cadre (prérequis `CAPACITY_OPEN`) |
| Activation refusée si conditions min. non remplies | Pas d’événement `Activated` — rester en `DRAFT` |

Conditions min. d’activation : ≥1 contexte, confidentialité adresse, mineurs/accompagnants, communication, ≥1 moyen de paiement, ≥1 politique catalogue, consentement photos, confirmation explicite.

---

## 6. Read models

| Read model | Contenu |
| ---------- | ------- |
| Récapitulatif cadre | Synthèse T1–T4 avant activation |
| Catalogue politiques plateforme | 2–3 politiques lecture seule |
| Principes plateforme | Texte fixe lecture seule |

---

## 7. Hotspots MVP (volontairement coupés)

- Revue opérateur / scoring conformité
- Exceptions prestation / cliente
- Suspension / reconfirmation / retired

---

## 8. Handoff

| Direction | Signal |
| --------- | ------ |
| Aval 0 | `PROFESSIONAL_FRAMEWORK_ACTIVE` (ou mock si démo isolée) |
| Aval 3 / 4 | Règles héritées en lecture seule |
