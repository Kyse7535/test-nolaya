# Event Storming MVP — Étape 2 : Apparier et distribuer

> Source : `domain-storytelling-etape-2-mvp.md`  
> Périmètre : vague 1 + acceptations exactes → `SHORTLIST_READY` / `RESPONSES_TO_CONVERT`.

---

## 1. Chronologie (timeline)

```text
Préconditions : DemandQualified + CapacityOpened (×N)

[Plateforme / Cliente]
  |  LancerCampagneAppariement
  v
CampaignOpened                 (+ vivier éligible mock)
  |  (auto) ConstituerVivier
  v
EligiblePoolComputed
  |  (auto) EnvoyerVague1
  v
Wave1InvitationsSent           (2–3 invitations)
  |
  |  [Coiffeuse] AccepterInvitationExacte  (×N)
  v
InvitationAcceptedExact
  |
  |  (policy) SeuilAtteint?
  v
ShortlistReady                 ← RESPONSES_TO_CONVERT / SHORTLIST_READY
CampaignMatchingClosed
```

---

## 2. Acteurs

| Acteur | Rôle MVP |
| ------ | -------- |
| **Cliente** | Voit lancement / shortlist |
| **Coiffeuse** | Voit invitation, accepte |
| Plateforme (automatismes locaux) | Vivier, vague 1, seuil — pas d’opérateur humain |

---

## 3. Commandes → Événements → Agrégats

| Commande | Événement(s) | Agrégat |
| -------- | ------------ | ------- |
| `LancerCampagneAppariement` | `CampaignOpened` | **MatchingCampaign** |
| `ConstituerVivier` (auto) | `EligiblePoolComputed` | MatchingCampaign |
| `EnvoyerVague1` (auto) | `Wave1InvitationsSent`, `InvitationCreated`, `InvitationSent` | MatchingCampaign / **Invitation** |
| `AccepterInvitationExacte` | `InvitationAcceptedExact` | Invitation → **ProvisionalResponse** |
| _(policy seuil)_ | `ShortlistReady`, `CampaignMatchingClosed` | MatchingCampaign |

---

## 4. Agrégats & cycles de vie

**MatchingCampaign**

```text
DEMAND_QUALIFIED (entrée)
      ↓
CAMPAIGN_OPEN
      ↓  vague 1 + acceptations
SHORTLIST_READY / RESPONSES_TO_CONVERT
```

**Invitation** (light) : créée → envoyée → répondue.

---

## 5. Politiques (réactives)

| Quand | Alors |
| ----- | ----- |
| `CampaignOpened` | Calculer vivier puis envoyer vague 1 |
| `InvitationAcceptedExact` et seuil atteint (ex. ≥ 2) | Émettre `ShortlistReady` + clôturer matching |
| Accept+mod / info needed / indisponible | Hors MVP |

---

## 6. Read models

| Read model | Contenu |
| ---------- | ------- |
| Matching lancé (cliente) | Statut campagne |
| Campagne / vivier | Liste éligibles préfiltrée |
| Invitation coiffeuse | Demande + capacité |
| Suivi invitations vague 1 | Compteur acceptations vs seuil |
| Shortlist prête | Handoff étape 3 |

---

## 7. Hotspots MVP

- Multi-vagues, élargissement, expiration réelle
- Accept+mod, info nécessaire, `NO_ELIGIBLE`, `NO_RESPONSE`
- Scoring IA, opérateur décisionnaire

---

## 8. Handoff

| Direction | Signal |
| --------- | ------ |
| Amont 1 | `DEMAND_QUALIFIED` |
| Amont 0 | `CAPACITY_OPEN` |
| Aval 3 | Acceptations provisoires → dossiers `PROPOSAL_PENDING` |
