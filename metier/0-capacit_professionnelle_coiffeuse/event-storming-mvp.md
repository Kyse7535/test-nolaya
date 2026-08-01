# Event Storming MVP — Étape 0 : Ouvrir une capacité professionnelle

> Source : `domain-storytelling-etape-0-mvp.md`  
> Périmètre : happy path `CAPACITY_DRAFT` → `CAPACITY_OPEN` — cadre pro mocké ACTIVE.

---

## 1. Chronologie (timeline)

```text
Précondition : ProfessionalFrameworkActivated (mock)

[Coiffeuse]
  |  OuvrirCapacite
  v
CapacityDraftOpened
  |  ChoisirPrestationVariante
  v
PrestationAndVariantSelected
  |  AjouterPhotosGalerie
  v
GalleryItemsPublished          (GALLERY_ITEM_DRAFT → PUBLISHED immédiat)
  |  ConfigurerNiveauServiceEtTaches
  v
ServiceLevelAndTasksConfigured
  |  ConfigurerPrixDureeSupplements
  v
PricingConfigured
  |  ConfigurerLieuDisposVolume
  v
LocationAvailabilityVolumeConfigured
  |  ValiderEtActiverCapacite
  v
CapacityOpened                 ← fin nominale CAPACITY_OPEN
```

---

## 2. Acteurs

| Acteur | Rôle MVP |
| ------ | -------- |
| **Coiffeuse** | Seule actrice décisionnaire |
| Plateforme (assistant local) | Catalogue mock, persistance, checks champs |

Absents : Cliente, Opérateur, gatekeeper plateforme.

---

## 3. Commandes → Événements → Agrégats

| Commande | Événement(s) | Agrégat |
| -------- | ------------ | ------- |
| `OuvrirCapacite` | `CapacityDraftOpened` | **ProfessionalCapacity** |
| `ChoisirPrestationVariante` | `PrestationAndVariantSelected` | ProfessionalCapacity |
| `AjouterPhotosGalerie` | `GalleryItemsPublished` | ProfessionalCapacity (galerie) |
| `ConfigurerNiveauServiceEtTaches` | `ServiceLevelAndTasksConfigured` | ProfessionalCapacity |
| `ConfigurerPrixDureeSupplements` | `PricingConfigured` | ProfessionalCapacity |
| `ConfigurerLieuDisposVolume` | `LocationAvailabilityVolumeConfigured` | ProfessionalCapacity |
| `ValiderEtActiverCapacite` | `CapacityOpened` | ProfessionalCapacity |
| `FermerCapacite` (bonus UX) | `CapacityClosed` | ProfessionalCapacity |

---

## 4. Agrégat & cycle de vie

**Agrégat racine :** `ProfessionalCapacity`

```text
CAPACITY_DRAFT
      ↓  ValiderEtActiverCapacite (conditions §8 DST)
CAPACITY_OPEN
      ↓  (optionnel) FermerCapacite
CAPACITY_CLOSED
```

Galerie : `GALLERY_ITEM_DRAFT` → `GALLERY_ITEM_PUBLISHED` (pas de modération).

États hors MVP : `CAPACITY_IN_REVIEW`, `SUSPENDED`, `RECONFIRMATION_REQUIRED`.

---

## 5. Politiques (réactives)

| Quand | Alors |
| ----- | ----- |
| Cadre non actif | MVP : ignoré (cadre mocké ACTIVE) |
| `CapacityOpened` | Capacité consommable par matching (étape 2) |
| Activation si champs incomplets | Refus local — rester en `DRAFT` |

Conditions min. : prestation, ≥1 image, service level, responsables tâches, prix > 0, durée > 0, lieu, ≥1 dispo, capacité max ≥ 1, volume ≥ 1, confirmation explicite.

---

## 6. Read models

| Read model | Contenu |
| ---------- | ------- |
| Bandeau cadre hérité | Framework ACTIVE lecture seule |
| Catalogue prestations | Liste mock |
| Aperçu devis | Prix + durée + suppléments |
| Récap activation | Synthèse T1–T4 |
| Liste de mes capacités | Bonus démo (OPEN / DRAFT / CLOSED) |

---

## 7. Hotspots MVP

- Vérification cadre / exceptions
- Revue galerie / preuves vérifiées
- Volumes invitations vs propositions distincts
- Reconfirmation dispos

---

## 8. Handoff

| Direction | Signal |
| --------- | ------ |
| Amont `_0` | `PROFESSIONAL_FRAMEWORK_ACTIVE` (mock) |
| Aval 2 | `CAPACITY_OPEN` dans le vivier |
