# Event Storming MVP — Étape 4 : Former l’engagement

> Source : `domain-storytelling-etape-4-mvp.md`  
> Périmètre : Accept → paiement mock → `COMMITTED` + créneau `BOOKED` (Modèle A).

---

## 1. Chronologie (timeline)

```text
Préconditions : FirmProposalPublished + SoftHoldCreated (valide)

[Cliente]
  |  OuvrirAcceptationOffre
  v
EngagementAwaitingClientAcceptance
  |  ConsulterRecapContractuel
  v
ContractualRecapViewed
  |  AccepterConsentementsVersionnes
  v
ConsentsAccepted
  |  (policy) → AWAITING_PAYMENT
  v
PaymentAwaited
  |  SimulerPaiementAcompteSucces
  v
InitialPaymentSucceeded        (CREATED → SUCCEEDED mock)
  |
  |  (policy formation engagement)
  v
EngagementCommitted
SlotBooked                     (SOFT_HOLD → BOOKED)
ContractualProofRecorded

  |  NotifierConfirmations
  v
ClientCommitmentConfirmed
StylistCommitmentConfirmed
```

---

## 2. Acteurs

| Acteur | Rôle MVP |
| ------ | -------- |
| **Cliente** | Décide — accepte + paie mock |
| **Coiffeuse** | Reçoit confirmation (sans re-validation) |
| Plateforme | Transforme hold → booked, écrit preuves locales |

---

## 3. Commandes → Événements → Agrégats

| Commande | Événement(s) | Agrégat |
| -------- | ------------ | ------- |
| `OuvrirAcceptationOffre` | `EngagementAwaitingClientAcceptance` | **Engagement** |
| `AccepterConsentementsVersionnes` | `ConsentsAccepted`, `PaymentAwaited` | Engagement |
| `SimulerPaiementAcompteSucces` | `InitialPaymentSucceeded` | **Payment** |
| _(policy)_ | `EngagementCommitted`, `SlotBooked`, `ContractualProofRecorded` | Engagement + SoftHold/Slot |
| _(notifications UI)_ | `ClientCommitmentConfirmed`, `StylistCommitmentConfirmed` | — |

---

## 4. Agrégats & cycles de vie

**Engagement**

```text
AWAITING_CLIENT_ACCEPTANCE
      ↓  consentements
AWAITING_PAYMENT
      ↓  paiement mock succès
COMMITTED
```

**Payment** (mock) : `CREATED` → `SUCCEEDED`.

**Créneau** : `SOFT_HOLD` → `BOOKED`.

---

## 5. Politiques (réactives)

| Quand | Alors |
| ----- | ----- |
| `ConsentsAccepted` | Passer en `AWAITING_PAYMENT` |
| `InitialPaymentSucceeded` | Former `COMMITTED` + convertir `SOFT_HOLD` → `BOOKED` + écrire preuve |
| `EngagementCommitted` | Afficher confirmations cliente et coiffeuse |

Conditions min. : même version offre, consentements cochés, paiement mock OK, booked, preuves locales.

---

## 6. Read models

| Read model | Contenu |
| ---------- | ------- |
| Récapitulatif contractuel | Offre + politiques versionnées |
| Écran paiement mock | Montant acompte |
| Confirmation cliente | `COMMITTED` |
| Confirmation coiffeuse | `COMMITTED` |

---

## 7. Hotspots MVP

- PSP réel, échecs paiement, expirations
- Remboursements, disputes, wallet, split
- Branches 4A–4F hors happy path

---

## 8. Handoff

| Direction | Signal |
| --------- | ------ |
| Amont 3 | `FIRM_PROPOSAL` + `SOFT_HOLD` |
| Aval 5 | `COMMITTED` (démarre préparation RDV) |
