# Event Storming MVP — Étape 7 : Régler et allouer la valeur

> Source : `domain-storytelling-etape-7-mvp.md`  
> Périmètre : `COMPLETED` → décompte → solde mock → `SETTLED` (+ `PAID_OUT`).

---

## 1. Chronologie (timeline)

```text
Préconditions : ServiceCompleted + acompte SUCCEEDED + prix engagé

[Plateforme]
  |  (auto) OuvrirReglement
  v
SettlementPending
  |  CalculerDecompte
  v
SettlementCalculated           (final = prix (+ tip) ; solde = final − acompte)

[Cliente / Coiffeuse]
  |  ConsulterDecompte
  v
SettlementPresented

[Cliente]
  |  AjouterPourboire            (optionnel)
  v
TipAdded                       (optionnel)
  |  PayerSoldeMock
  v
BalancePaymentSucceeded

[Plateforme — policy]
  |  AllouerValeur
  v
ValueAllocated                 (net styliste + commission)
PayoutPaidOut                  (mock instantané)
SettlementCompleted            ← SETTLED
FinancialProofsIssued          (reçu cliente + relevé styliste)
```

---

## 2. Acteurs

| Acteur | Rôle MVP |
| ------ | -------- |
| **Cliente** | Paie le solde (mock), tip optionnel |
| **Coiffeuse** | Voit revenu / reversement |
| Plateforme | Calcule, alloue, émet preuves |

---

## 3. Commandes → Événements → Agrégats

| Commande | Événement(s) | Agrégat |
| -------- | ------------ | ------- |
| `OuvrirReglement` (auto) | `SettlementPending` | **Settlement** |
| `CalculerDecompte` | `SettlementCalculated` | Settlement |
| `AjouterPourboire` | `TipAdded` | Settlement |
| `PayerSoldeMock` | `BalancePaymentSucceeded` | Settlement / Payment |
| `AllouerValeur` (auto) | `ValueAllocated`, `PayoutPaidOut`, `SettlementCompleted`, `FinancialProofsIssued` | Settlement + **Payout** |

---

## 4. Agrégat & cycle de vie

**Settlement**

```text
SETTLEMENT_PENDING
      ↓
CALCULATED
      ↓
PAYMENT_PENDING
      ↓
ALLOCATION_PENDING
      ↓
SETTLED  (+ PAYOUT → PAID_OUT mock)
```

UX peut fusionner : décompte → payer → settled.

Formule : `final = prix engagé (+ tip)` ; `solde = final − acompte` ; commission = 1 taux fixe mock.

---

## 5. Politiques (réactives)

| Quand | Alors |
| ----- | ----- |
| `ServiceCompleted` | Ouvrir `SETTLEMENT_PENDING` + calculer décompte |
| `BalancePaymentSucceeded` (ou solde = 0) | Allouer net + commission → `SETTLED` + `PAID_OUT` + preuves |
| Tip après calcul | Recalculer solde avant paiement |

---

## 6. Read models

| Read model | Contenu |
| ---------- | ------- |
| Décompte cliente | Prix, acompte, tip, solde |
| Revenu styliste | Net + commission + reversement |
| Reçu / succès | Preuve `SETTLED` |

---

## 7. Hotspots MVP

- Refunds, `PAYMENT_FAILED`, `REFUND_PENDING`
- Multi-bénéficiaires, espèces externes, fraude
- Résolution finance

---

## 8. Handoff

| Direction | Signal |
| --------- | ------ |
| Amont 6 | `COMPLETED` |
| Amont 4 | Acompte + prix engagé |
| Aval 8 | `SETTLED` débloque la preuve d’expérience |
