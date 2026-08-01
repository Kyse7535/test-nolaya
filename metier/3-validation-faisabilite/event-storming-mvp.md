# Event Storming MVP — Étape 3 : Valider la faisabilité → proposition ferme

> Source : `domain-storytelling-etape-3-mvp.md`  
> Périmètre : `PROPOSAL_PENDING` → `FIRM_PROPOSAL` + `SOFT_HOLD`.

---

## 1. Chronologie (timeline)

```text
Préconditions : InvitationAcceptedExact + CapacityOpened + Demand (versionnée)

[Coiffeuse]
  |  OuvrirDossierProposition
  v
ProposalPendingOpened
  |  ConsulterSyntheseDecisionnelle
  v
DecisionSynthesisViewed        (read — pas forcément un event métier fort)
  |  DeciderFaisableExactement
  v
FeasibilityConfirmedExact
  |  ConfigurerOffreFerme
  v
FirmOfferConfigured            (prix, durée, créneau, lieu, tâches)
  |  PublierPropositionFerme
  v
SoftHoldCreated
FirmProposalPublished          ← fin nominale

[Cliente — lecture]
  |  ConsulterOffreRecue
  v
FirmProposalViewedByClient
```

---

## 2. Acteurs

| Acteur | Rôle MVP |
| ------ | -------- |
| **Coiffeuse** | Décisionnaire — publie l’offre |
| **Cliente** | Lecture de l’offre publiée |
| Plateforme | Crée `SOFT_HOLD`, persistance |

---

## 3. Commandes → Événements → Agrégats

| Commande | Événement(s) | Agrégat |
| -------- | ------------ | ------- |
| `OuvrirDossierProposition` | `ProposalPendingOpened` | **FirmProposal** |
| `DeciderFaisableExactement` | `FeasibilityConfirmedExact` | FirmProposal |
| `ConfigurerOffreFerme` | `FirmOfferConfigured` | FirmProposal |
| `PublierPropositionFerme` | `SoftHoldCreated`, `FirmProposalPublished` | FirmProposal + **SoftHold** |

---

## 4. Agrégats & cycles de vie

**FirmProposal**

```text
PROPOSAL_PENDING
      ↓  PublierPropositionFerme
FIRM_PROPOSAL
```

**SoftHold** (créneau)

```text
Disponible → SOFT_HOLD
```

Une seule proposition concurrente en démo.

---

## 5. Politiques (réactives)

| Quand | Alors |
| ----- | ----- |
| `PublierPropositionFerme` | Créer `SOFT_HOLD` puis publier `FIRM_PROPOSAL` (atomique MVP) |
| Publication si conditions min. incomplètes | Rester `PROPOSAL_PENDING` |
| `FirmProposalPublished` | Aval 4 peut démarrer acceptation cliente |

Conditions min. : décision faisable, prix > 0, durée + créneau, lieu, tâches, confirmation, `SOFT_HOLD` créé.

---

## 6. Read models

| Read model | Contenu |
| ---------- | ------- |
| Synthèse décisionnelle | Besoin figé, budget, contraintes |
| Configuration offre | Formulaire prix / créneau / lieu |
| Récap publier | Avant confirmation |
| Offre reçue (cliente) | Lecture seule |

---

## 7. Hotspots MVP

- Demande de précision, refus, expiration
- `NOT_SELECTED`, multi-SOFT_HOLD
- Opérateur, IA diagnostic

---

## 8. Handoff

| Direction | Signal |
| --------- | ------ |
| Amont 2 | Acceptation provisoire |
| Aval 4 | `FIRM_PROPOSAL` + `SOFT_HOLD` |
