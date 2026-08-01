# Event Storming MVP — Étape 1 : Qualifier le besoin cliente

> Source : `domain-storytelling-etape-1-mvp.md`  
> Périmètre : happy path `DEMAND_DRAFT` → `DEMAND_QUALIFIED`.

---

## 1. Chronologie (timeline)

```text
[Cliente]
  |  OuvrirDemande
  v
DemandDraftOpened
  |  ChoisirPointEntree          (prestation connue OU catalogue)
  v
DemandEntrySelected
  |  SpecifierResultatVarianteContexte
  v
DesiredResultSpecified
  |  SpecifierTempsBudget
  v
TimeAndBudgetSpecified
  |  SpecifierZoneMobilite
  v
ZoneAndMobilitySpecified
  |  SpecifierProtectionServicePriorite
  v
ProtectionServicePrioritySpecified
  |  ValiderDemande
  v
DemandQualified                ← fin nominale DEMAND_QUALIFIED
```

Sous-états UX : `QUALIFICATION_IN_PROGRESS` pendant T1–T5.

---

## 2. Acteurs

| Acteur | Rôle MVP |
| ------ | -------- |
| **Cliente** | Seule actrice décisionnaire |
| Plateforme (assistant local) | Catalogue inspirations, persistance |

Absents : Coiffeuse, Opérateur.

---

## 3. Commandes → Événements → Agrégats

| Commande | Événement(s) | Agrégat |
| -------- | ------------ | ------- |
| `OuvrirDemande` | `DemandDraftOpened` | **Demand** |
| `ChoisirPointEntree` | `DemandEntrySelected` | Demand |
| `SpecifierResultatVarianteContexte` | `DesiredResultSpecified` | Demand |
| `SpecifierTempsBudget` | `TimeAndBudgetSpecified` | Demand |
| `SpecifierZoneMobilite` | `ZoneAndMobilitySpecified` | Demand |
| `SpecifierProtectionServicePriorite` | `ProtectionServicePrioritySpecified` | Demand |
| `ValiderDemande` | `DemandQualified` | Demand |

---

## 4. Agrégat & cycle de vie

**Agrégat racine :** `Demand`

```text
DEMAND_DRAFT
      ↓
QUALIFICATION_IN_PROGRESS
      ↓  ValiderDemande
DEMAND_QUALIFIED
```

États hors MVP : `QUALIFICATION_TO_CLARIFY`, `DEMAND_WITHDRAWN`.

---

## 5. Politiques (réactives)

| Quand | Alors |
| ----- | ----- |
| `DemandQualified` | Aval étape 2 peut créer une campagne |
| Validation si champs min. incomplets | Rester en qualification |

Conditions min. : résultat/prestation, échéance ou date préférée, budget max > 0, zone/mobilité, niveau de service, priorité recherche, confirmation explicite.

---

## 6. Read models

| Read model | Contenu |
| ---------- | ------- |
| Catalogue inspirations | Familles + images |
| Résumé de ma demande | Synthèse avant validation |
| Profil cliente mock | Prénom, zone indicative |

---

## 7. Hotspots MVP

- Boucles de clarification / opérateur
- Re-qualification / retrait
- Diagnostic médical (exclu)

---

## 8. Handoff

| Direction | Signal |
| --------- | ------ |
| Aval 2 | `DEMAND_QUALIFIED` (version figée pour campagne) |
| Étape 0 | Non consommée ici |
