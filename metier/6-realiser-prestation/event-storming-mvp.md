# Event Storming MVP — Étape 6 : Réaliser la prestation

> Source : `domain-storytelling-etape-6-mvp.md`  
> Périmètre : `READY` → `IN_PROGRESS` → `COMPLETED` (jour J happy path).

---

## 1. Chronologie (timeline)

```text
Précondition : AppointmentReady

[Cliente / Coiffeuse]
  |  OuvrirDossierJourJ
  v
DayOfExecutionOpened

[Cliente]
  |  DeclarerArriveeCliente
  v
ClientArrivalDeclared

[Coiffeuse]
  |  DeclarerArriveeCoiffeuse
  v
StylistArrivalDeclared

[Coiffeuse]
  |  DemarrerPrestation
  v
ServiceStarted                 → IN_PROGRESS

[Coiffeuse]
  |  DeclarerFinComplete
  v
ServiceCompletionDeclaredComplete

[Cliente]
  |  ConfirmerRealisation
  v
ClientExecutionConfirmed
ServiceCompleted               ← COMPLETED
ExecutionDossierFinalized      → handoff 7
```

---

## 2. Acteurs

| Acteur | Rôle MVP |
| ------ | -------- |
| **Cliente** | Arrivée + confirmation de réalisation |
| **Coiffeuse** | Arrivée, démarrage, fin complète |
| Plateforme | Horodatage, dossier d’exécution |

---

## 3. Commandes → Événements → Agrégats

| Commande | Événement(s) | Agrégat |
| -------- | ------------ | ------- |
| `OuvrirDossierJourJ` | `DayOfExecutionOpened` | **ExecutionDossier** |
| `DeclarerArriveeCliente` | `ClientArrivalDeclared` | ExecutionDossier |
| `DeclarerArriveeCoiffeuse` | `StylistArrivalDeclared` | ExecutionDossier |
| `DemarrerPrestation` | `ServiceStarted` | ExecutionDossier / OperationalAppointment |
| `DeclarerFinComplete` | `ServiceCompletionDeclaredComplete` | ExecutionDossier |
| `ConfirmerRealisation` | `ClientExecutionConfirmed`, `ServiceCompleted`, `ExecutionDossierFinalized` | ExecutionDossier |

---

## 4. Agrégat & cycle de vie

**OperationalAppointment / ExecutionDossier**

```text
READY
  ↓  DemarrerPrestation
IN_PROGRESS
  ↓  ConfirmerRealisation (après fin complète)
COMPLETED
```

---

## 5. Politiques (réactives)

| Quand | Alors |
| ----- | ----- |
| `ServiceStarted` | Passer statut `IN_PROGRESS` |
| `ClientExecutionConfirmed` après fin complète | `ServiceCompleted` + finaliser dossier pour règlement |
| Allègement démo | Au minimum démarrage + fin + confirm cliente |

Conditions min. `COMPLETED` : arrivées (ou allègement), début, fin complète coiffeuse, confirmation cliente, aucun avenant/incident.

---

## 6. Read models

| Read model | Contenu |
| ---------- | ------- |
| Suivi opérationnel jour J | Arrivées / statut |
| Synthèse de fin | Fin complète only |
| Confirmation cliente | CTA confirmer |
| Succès + pont règlement | Lien vers étape 7 |

---

## 7. Hotspots MVP

- Retard, avenant, incident
- `PARTIALLY_COMPLETED`, `RESOLUTION_PENDING`
- Contestation, remplacement

---

## 8. Handoff

| Direction | Signal |
| --------- | ------ |
| Amont 5 | `READY` |
| Aval 7 | Dossier d’exécution `COMPLETED` |
| Aval 8 | Pas encore (après `SETTLED`) |
