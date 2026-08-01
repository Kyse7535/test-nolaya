# Event Storming MVP — Étape 5 : Rendez-vous opérationnellement prêt

> Source : `domain-storytelling-etape-5-mvp.md`  
> Périmètre : `READINESS_PENDING` → `READY` (actions bloquantes confirmées).

---

## 1. Chronologie (timeline)

```text
Précondition : EngagementCommitted

[Plateforme]
  |  (auto) GenererPlanPreparation
  v
AppointmentReadinessPending
PrepPlanGenerated              (4–8 actions depuis template)

[Cliente]
  |  ConfirmerActionPreparation  (bloquantes)
  v
PrepActionConfirmed            (owner = CLIENT)

[Coiffeuse]
  |  ConfirmerActionPreparation  (bloquantes)
  v
PrepActionConfirmed            (owner = STYLIST)

[Plateforme — policy]
  |  RecalculerReadiness
  v
  |  toutes bloquantes CONFIRMED ?
  v
AppointmentReady               ← fin nominale READY
ReadySnapshotRecorded
```

---

## 2. Acteurs

| Acteur | Rôle MVP |
| ------ | -------- |
| **Cliente** | Confirme ses actions bloquantes |
| **Coiffeuse** | Confirme ses actions bloquantes |
| Plateforme | Génère plan, recalcule readiness |

---

## 3. Commandes → Événements → Agrégats

| Commande | Événement(s) | Agrégat |
| -------- | ------------ | ------- |
| `GenererPlanPreparation` (auto) | `AppointmentReadinessPending`, `PrepPlanGenerated` | **OperationalAppointment** + **PrepPlan** |
| `ConfirmerActionPreparation` | `PrepActionConfirmed` | PrepPlan (action) |
| `RecalculerReadiness` (auto) | `AppointmentReady`, `ReadySnapshotRecorded` | OperationalAppointment |

---

## 4. Agrégats & cycles de vie

**OperationalAppointment**

```text
READINESS_PENDING
      ↓  toutes actions bloquantes CONFIRMED
READY
```

**Action** : `TO_DO` → `CONFIRMED`.

États hors MVP : `AT_RISK`, `RESOLUTION_PENDING`, `OVERDUE`, `BLOCKED`, `WAIVED`.

---

## 5. Politiques (réactives)

| Quand | Alors |
| ----- | ----- |
| `EngagementCommitted` (amont) | Créer RDV + générer plan depuis template prestation |
| `PrepActionConfirmed` | Recalculer % bloquantes ; si 100 % → `AppointmentReady` |
| Actions informatives non confirmées | N’empêchent pas `READY` |

---

## 6. Read models

| Read model | Contenu |
| ---------- | ------- |
| Plan commun / progression | % actions bloquantes |
| Checklist cliente | Actions owner CLIENT |
| Checklist coiffeuse | Actions owner STYLIST |
| Écran RDV READY | Instantané partagé |

---

## 7. Hotspots MVP

- `AT_RISK`, résolutions, `WAIVED`, preuves photo
- Rappels delivery réels, opérateur
- Adresse protégée audité

---

## 8. Handoff

| Direction | Signal |
| --------- | ------ |
| Amont 4 | `COMMITTED` |
| Aval 6 | Instantané `READY` |
