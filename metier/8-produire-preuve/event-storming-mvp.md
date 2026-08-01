# Event Storming MVP — Étape 8 : Produire la preuve et prolonger la relation

> Source : `domain-storytelling-etape-8-mvp.md`  
> Périmètre : post-`SETTLED` → `EXPERIENCE_RECORDED` (+ avis optionnel + refaire).

---

## 1. Chronologie (timeline)

```text
Précondition : SettlementCompleted

[Plateforme]
  |  (auto) CreerPreuveExperience
  v
ProofPending
ExperienceRecordCreated

[Cliente]
  |  ConfirmerOutcomeOk
  v
OutcomeConfirmedAsExpected
ExperienceRecorded             ← EXPERIENCE_RECORDED (+ entrée historique)

  |  SoumettreAvisMultiDim       (optionnel — ou SkipAvis)
  v
ReviewSubmitted                (si avis)
ReviewPublished                (partie publique)

[Coiffeuse]
  |  RepondreAvis                (optionnel)
  v
StylistReviewReplyAdded

[Cliente]
  |  DemanderRefairePrestation
  v
RepeatDemandDraftCreated       (prérempli)
  |  ReconfirmerPrixDateLieu
  v
RepeatDemandConfirmed          → réentre étape 1 (nouvelle Demand)
```

---

## 2. Acteurs

| Acteur | Rôle MVP |
| ------ | -------- |
| **Cliente** | Outcome, avis (opt.), historique, refaire |
| **Coiffeuse** | Réponse à l’avis (opt.) |
| Plateforme | Crée `ExperienceRecord`, historique |

---

## 3. Commandes → Événements → Agrégats

| Commande | Événement(s) | Agrégat |
| -------- | ------------ | ------- |
| `CreerPreuveExperience` (auto) | `ProofPending`, `ExperienceRecordCreated` | **ExperienceRecord** |
| `ConfirmerOutcomeOk` | `OutcomeConfirmedAsExpected`, `ExperienceRecorded` | ExperienceRecord |
| `SkipAvis` | _(pas d’avis — historique déjà là)_ | ExperienceRecord |
| `SoumettreAvisMultiDim` | `ReviewSubmitted`, `ReviewPublished` | **Review** |
| `RepondreAvis` | `StylistReviewReplyAdded` | Review |
| `DemanderRefairePrestation` | `RepeatDemandDraftCreated` | **RepeatDemand** |
| `ReconfirmerPrixDateLieu` | `RepeatDemandConfirmed` | RepeatDemand → nouvelle Demand |

---

## 4. Agrégats & cycles de vie

**ExperienceRecord**

```text
PROOF_PENDING
      ↓
EXPERIENCE_RECORDED
```

**Review** (optionnel)

```text
REVIEW_SUBMITTED → REVIEW_PUBLISHED
```

**RepeatDemand**

```text
DRAFT_FROM_HISTORY → REPEAT_DEMAND (prérempli, à reconfirmer)
```

---

## 5. Politiques (réactives)

| Quand | Alors |
| ----- | ----- |
| `SettlementCompleted` | Créer auto `ExperienceRecord` |
| `OutcomeConfirmedAsExpected` (ou a minima record auto) | `EXPERIENCE_RECORDED` + entrée historique — avis non requis |
| `RepeatDemandConfirmed` | Nouvelle demande (id neuf) ; ancien prix = référence, jamais auto-appliqué |
| Skip avis | Historique quand même |

---

## 6. Read models

| Read model | Contenu |
| ---------- | ------- |
| Preuve / outcome | Confirmation fin de prestation |
| Feedback multi-dim | Technique, réservation, comm., ponctualité, prix |
| Avis public + réponse | Lecture / réponse styliste |
| Historique expériences | Liste + CTA « Refaire » |
| Draft refaire | Prefill + champs à reconfirmer |

---

## 7. Hotspots MVP

- Modération (`FLAGGED`), `OUTCOME_DISPUTED`
- Scoring réputation, CRM / loyalty
- Publication galerie `VERIFIED_REALIZATION` (bonus)

---

## 8. Handoff

| Direction | Signal |
| --------- | ------ |
| Amont 7 | `SETTLED` (gate) |
| Aval | `RepeatDemand` → étape 1 → 2 → … |
| Galerie étape 0 | Bonus hors cœur |
