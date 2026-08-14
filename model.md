# Modèle de données — Hairstylist OS / Nolaya

> Document construit progressivement, dossier par dossier.  
> Périmètre : **entités + champs + relations** uniquement.

**Sources traitées :**
- [x] `stitch_capacit_professionnelle_0-1-2`
- [x] `stitch_capacit_professionnelle_coiffeuse_3-4-5-6`
- [x] `stitch_capacit_professionnelle_coiffeuse.-7-8zip`

---

## Acteurs / utilisateurs

### User
Utilisateur de la plateforme (base commune).

| Champ | Type | Notes |
|-------|------|-------|
| id | id | |
| nom | string | |
| prenom | string | |
| portrait_url | string? | Avatar / photo |
| role | enum | `CLIENTA`, `STYLISTE`, `OPERATEUR` |

### Cliente
Spécialisation de `User` (demandeuse de prestation).

| Champ | Type | Notes |
|-------|------|-------|
| id | id | = User.id |
| type_cheveux | string? | ex. 4C |
| longueur_cheveux | string? | ex. épaule |
| cuir_chevelu_sensible | boolean | |
| email | string? | |
| telephone | string? | |
| vip | boolean | Badge Cliente VIP |
| verifiee | boolean | Verified Client |
| code_client | string? | ex. #CL-8921 |

### Styliste (Coiffeuse)
Spécialisation de `User` (offreuse de capacité).

| Champ | Type | Notes |
|-------|------|-------|
| id | id | = User.id |
| specialites | string[] | ex. Braids, Coloriste |
| titre_pro | string? | Master Stylist & Coloriste |
| membership | string? | Atelier Gold Member |
| note / rating | number? | Score agrégé |
| top_rated | boolean | Badge |
| certifications | string[] | Diplôme d’État, etc. |
| marques_partenaires | string[] | L’Oréal, Davines… |
| score_matching | number? | % d’éligibilité calculé |
| statut_disponibilite | enum? | dispo / à confirmer |

### Operateur
Spécialisation de `User` (admin matching).

| Champ | Type | Notes |
|-------|------|-------|
| id | id | = User.id |
| titre | string? | ex. Lead Coordinator |
| version_panel | string? | ex. v1.2.4 |

**Relations**
- `User` 1—1 `Cliente` | `Styliste` | `Operateur` (selon rôle)

---

## Capacité professionnelle (côté Styliste)

> Alignement Domain Storytelling étape 0 (`metier/domain-storytelling-etape-0.md`).  
> Canon statut : un seul enum (`CAPACITY_*`). Synonyme UI `BROUILLON_CAPACITÉ` → `CAPACITY_DRAFT`.  
> Règle pilote : **1 capacité = 1 configuration de service** cohérente (prix + durée + responsabilités).

### CapaciteProfessionnelle
Offre de service configurable par le styliste — configuration réellement mobilisable, bornée par lieu, période, volume et conditions.

| Champ | Type | Notes |
|-------|------|-------|
| id | id | |
| styliste_id | fk → Styliste | Propriétaire ; une capacité appartient toujours à une coiffeuse |
| version | integer | Incrémentée à chaque modification post-open (demandes futures) |
| version_parent_id | fk → CapaciteProfessionnelle? | Version précédente si issue d’une modification |
| statut | enum | `CAPACITY_DRAFT` \| `CAPACITY_IN_REVIEW` \| `CAPACITY_OPEN` \| `SUSPENDED` \| `RECONFIRMATION_REQUIRED` \| `CLOSED` |
| mode_creation | enum | `NOUVELLE` \| `REPRISE` |
| prestation_principale | string | Famille / libellé métier (ex. Knotless Braids) |
| periode_validite_debut | date | Capacité limitée dans le temps |
| periode_validite_fin | date | |
| planning_derniere_maj | datetime? | Fraîcheur du planning |
| planning_precision | enum? | `CRENEAU` \| `JOUR` \| `SEMAINE` \| `PERIODE` |
| planning_reconfirmation_au | date? | Date à laquelle une reconfirmation devient obligatoire |
| activated_at | datetime? | Horodatage d’ouverture (`CAPACITY_OPEN`) |
| activated_by_styliste_id | fk → Styliste? | Validation explicite d’activation (jamais l’opérateur seul) |
| lieu_studio | string? | Label confidentiel possible jusqu’à engagement |
| created_at | datetime | |
| updated_at | datetime | |

**Relations**
- `Styliste` 1—* `CapaciteProfessionnelle`
- `CapaciteProfessionnelle` 1—* `VariantePrestation`
- `CapaciteProfessionnelle` 1—1 `ModeleService`
- `CapaciteProfessionnelle` 1—* `FourniturePrestation`
- `CapaciteProfessionnelle` 1—1 `ConditionsLimites`?
- `CapaciteProfessionnelle` 1—* `LieuPrestation`
- `CapaciteProfessionnelle` 1—* `ZoneGeographique`
- `CapaciteProfessionnelle` 1—* `CreneauHebdomadaire`
- `CapaciteProfessionnelle` 1—1 `ParametresOperationnels`
- `CapaciteProfessionnelle` 1—1 `ProtectionSensibilite`?
- `CapaciteProfessionnelle` 1—1 `PrioriteRecherche`?
- `CapaciteProfessionnelle` 1—* `CapacityCheckReport`
- `CapaciteProfessionnelle` 1—* `RoleEquipePrestation`

### VariantePrestation
Variante tarifée d’une capacité (ex. Balayage Signature, Transformation Complète). En pilote, une capacité porte typiquement une variante « active » cohérente avec sa configuration.

| Champ | Type | Notes |
|-------|------|-------|
| id | id | |
| capacite_id | fk → CapaciteProfessionnelle | |
| libelle | string | |
| code_variante | string? | VARIANTE A / B |
| prix_base | decimal | € — exact, calculable ou borne basse d’une fourchette |
| prix_max | decimal? | Borne haute si fourchette ; prix ferme à l’étape 3 |
| duree_minutes | integer | |
| duree_preparation_minutes | integer? | Temps de préparation avant le RDV |
| facteurs_duree | string[]? | Facteurs pouvant modifier la durée |
| types_cheveux_acceptes | string[]? | ex. 3C, 4A, 4C |
| caracteristiques_proposees | string[]? | Configurables acceptées |
| caracteristiques_exclues | string[]? | Non proposées |
| contre_indications | string[]? | Situations refusées au niveau variante |
| style_architecture | enum/string | Knotless Braids, Senegalese Twists, Boho Locs… |
| tags_style | string[] | POPULAR, PROTECTIVE, TRENDING |

**Relations**
- `VariantePrestation` 1—* `SupplementService`
- `VariantePrestation` 1—* `PhotoRealisation`
- `VariantePrestation` 1—* `TacheResponsabilite`
- `VariantePrestation` 1—1 `TarificationInterne`?

### SupplementService
Règle de supplément sur une variante. **Tout supplément doit avoir un montant (ou méthode de calcul) et une condition de déclenchement.**

| Champ | Type | Notes |
|-------|------|-------|
| id | id | |
| variante_id | fk → VariantePrestation | |
| libelle | string | ex. Densité Supplémentaire |
| montant | decimal? | Montant fixe ; null si méthode de calcul |
| methode_calcul | string? | ex. « +15 € / paquet mèches » |
| obligatoire | boolean | vs optionnel |
| declencheur | string | Condition obligatoire (ex. « Cheveux très épais ») |
| categorie | string? | Extras |

### PhotoRealisation
Galerie de réalisations / portfolio pour une variante.

| Champ | Type | Notes |
|-------|------|-------|
| id | id | |
| variante_id | fk → VariantePrestation | |
| url | string | |
| type | enum? | realisation / inspiration |

### TarificationInterne
Données de marge internes (styliste).

| Champ | Type | Notes |
|-------|------|-------|
| variante_id | fk → VariantePrestation | PK |
| revenu_net_cible | decimal | après TVA + frais plateforme |
| taux_horaire_calcule | decimal | |
| taux_horaire_objectif | decimal? | |
| tva_taux | decimal | ex. 20% |
| frais_plateforme_taux | decimal | ex. 5% |

### ModeleService
Niveau d’engagement client / styliste. **Rattaché à la capacité** (1 capacité = 1 configuration en pilote).

| Champ | Type | Notes |
|-------|------|-------|
| id | id | |
| capacite_id | fk → CapaciteProfessionnelle | PK logique 1—1 |
| type | enum | `SERVICE_COMPLET`, `SERVICE_ASSISTE` |
| label | string? | PREMIUM / COLLABORATIF / FLEXIBLE |

### TacheResponsabilite
Ligne de la matrice des responsabilités. Chaque tâche a un **responsable unique et visible**. Si `responsable = CLIENT`, consigne / moment / conséquence sont obligatoires avant `CAPACITY_OPEN`.

| Champ | Type | Notes |
|-------|------|-------|
| id | id | |
| variante_id | fk → VariantePrestation | |
| libelle | string | Achat mèches, Lavage, Démêlage, Réalisation… |
| phase | enum/string | PRE-SERVICE, PREPARATION, MAIN_SERVICE |
| responsable | enum | `STYLISTE`, `CLIENT` |
| consigne | text? | Obligatoire si CLIENT |
| moment | enum? | `AVANT_RDV` \| `MOINS_24H` \| `JOUR_J` — obligatoire si CLIENT |
| materiel_requis | string? | Matériel / fournitures pour la tâche |
| consequence_non_respect | enum? | `SUPPLEMENT` \| `ALLONGEMENT` \| `ADAPTATION` \| `REPORT` \| `IMPOSSIBILITE` |
| penalite_non_respect | string? | Libellé détaillé |
| montant_penalite | decimal? | |
| configurable | boolean | |

### FourniturePrestation
Qui fournit quoi, ce qui est inclus dans le prix, références et quantités.

| Champ | Type | Notes |
|-------|------|-------|
| id | id | |
| capacite_id | fk → CapaciteProfessionnelle | |
| libelle | string | ex. Mèches Kanekalon |
| fourni_par | enum | `STYLISTE` \| `CLIENT` |
| inclus_dans_prix | boolean | |
| reference | string? | Marque / référence attendue |
| quantite | string? | ex. « 6–8 paquets » |
| materiel_necessaire | string? | |
| limite_technique | string? | Limites produits / techniques |

### ConditionsLimites
Conditions et limites déclarées avant activation (hors protection sensibilité dédiée).

| Champ | Type | Notes |
|-------|------|-------|
| capacite_id | fk → CapaciteProfessionnelle | PK |
| situations_refusees | string[] | |
| conditions_preparation | text? | |
| regles_accompagnants | text? | |
| limite_retard_minutes | integer? | Au-delà → report / annulation selon règle |
| consequence_retard | string? | |
| conditions_deplacement | text? | |
| limites_techniques_securite | text? | |
| infos_a_confirmer_avant_offre_ferme | string[] | |

### ProtectionSensibilite

| Champ | Type | Notes |
|-------|------|-------|
| capacite_id | fk → CapaciteProfessionnelle | PK |
| cuir_chevelu_sensible_requis | boolean | Client doit signaler |
| refus_tension_excessive | boolean | Politique « Coiffure Douce » |

### PrioriteRecherche
Critère de mise en avant algorithmique (côté styliste).

| Champ | Type | Notes |
|-------|------|-------|
| capacite_id | fk → CapaciteProfessionnelle | PK |
| focus | enum | `PERFECTION_VISUELLE`, `EFFICACITE_CHRONO`, `MAIN_DE_MAITRE` |

### LieuPrestation
Lieux d’opération du styliste.

| Champ | Type | Notes |
|-------|------|-------|
| id | id | |
| capacite_id | fk → CapaciteProfessionnelle | |
| type | enum | `CHEZ_COIFFEUSE`, `EN_SALON`, `AUTRE`, `DEPLACEMENT` |
| label | string? | ex. Paris Rive Gauche — Studio A |
| adresse_precise | string? | Peut rester confidentielle jusqu’à l’engagement |
| adresse_confidentielle | boolean | true en pilote par défaut si chez elle |
| contraintes_acces | text? | |
| lieux_exclus | string[]? | |
| actif | boolean | |

### ZoneGeographique
Zone de couverture / intervention. Obligatoire si un lieu `DEPLACEMENT` est actif.

| Champ | Type | Notes |
|-------|------|-------|
| id | id | |
| capacite_id | fk → CapaciteProfessionnelle | |
| centre | string | ex. Paris, FR |
| rayon_km | integer | |
| zones_incluses | string[] | arrondissements, communes |
| frais_deplacement | decimal? | € |
| label | string? | Zone A, Zone B |

### CreneauHebdomadaire
Planning opérationnel récurrent. Pas de sync agendas externes en pilote.

| Champ | Type | Notes |
|-------|------|-------|
| id | id | |
| capacite_id | fk → CapaciteProfessionnelle | |
| jour_semaine | enum | Lun…Dim |
| heure_debut | time | |
| heure_fin | time | |
| disponible | boolean | |

### ParametresOperationnels
Deux notions distinctes : capacité opérationnelle max ≠ volume de demandes souhaité.

| Champ | Type | Notes |
|-------|------|-------|
| capacite_id | fk → CapaciteProfessionnelle | PK |
| rdv_max_par_jour | integer | Capacité opérationnelle maximale (> 0 pour open) |
| rdv_max_par_periode | integer? | Capacité max sur la période de validité |
| marge_entre_rdv_minutes | integer | Marge opérationnelle entre deux RDV |
| volume_demandes_souhaite | integer | Sollicitations acceptées (ex. par semaine) |
| volume_demandes_periode | enum? | `JOUR` \| `SEMAINE` \| `PERIODE` |

### CapacityCheckReport
Rapport de vérification produit par la plateforme (DS §13). Objet `CAPACITY_CHECK_REPORT`.

| Champ | Type | Notes |
|-------|------|-------|
| id | id | |
| capacite_id | fk → CapaciteProfessionnelle | |
| created_at | datetime | |
| created_by | enum | `PLATEFORME` \| `OPERATEUR` |
| statut_global | enum | `OK` \| `ECARTS` |
| eligible_activation | boolean | true seulement si aucun écart bloquant |

**Relations**
- `CapacityCheckReport` 1—* `CapacityCheckEcart`

### CapacityCheckEcart
Écart détecté lors du contrôle.

| Champ | Type | Notes |
|-------|------|-------|
| id | id | |
| report_id | fk → CapacityCheckReport | |
| code | string | ex. `SUPPLEMENT_SANS_DECLENCHEUR` |
| message | text | Message ciblé pour la coiffeuse |
| champ_cible | string? | Chemin logique du champ à corriger |
| gravite | enum | `BLOQUANT` \| `AVERTISSEMENT` |
| resolu | boolean | |

### RoleEquipePrestation
Répartition interne styliste / assistant (récap activation).

| Champ | Type | Notes |
|-------|------|-------|
| id | id | |
| capacite_id | fk → CapaciteProfessionnelle | |
| role | enum/string | Coiffeur Principal, Assistant / Junior |
| responsabilite | string | Application & Finition… |
| duree_minutes | integer | |
| mode_allocation | enum? | ALLOUE / DELEGUE |

---

## Demande cliente

### Demande
Besoin exprimé par la cliente. Statuts observés : `QUALIFICATION_READY_FOR_REVIEW`, `DEMAND_QUALIFIED`, `RECONFIRMATION_REQUIRED`.

| Champ | Type | Notes |
|-------|------|-------|
| id | id | ex. #7492, #REQ-8942 |
| cliente_id | fk → Cliente | |
| statut | enum | draft / qualified / matching / … |
| point_entree | enum | `PRESTATION_CONNUE`, `CATALOGUE_INSPIRATIONS`, `OBJECTIF_PRATIQUE`, `OCCASION_SPECIALE` |
| texte_libre | text? | Recherche en langage naturel |
| style_souhaite | string? | Knotless Braids, Box Braids… |
| contexte_intention | enum? | Quotidien, Mariage, Vacances, Soirée |
| description | text? | |
| budget_cible | decimal? | Idéal |
| budget_max | decimal | Plafond |
| preference_date | date? | |
| echeance_limite | date | Obligatoire |
| meches_incluses | boolean? | Périmètre prestation |
| responsabilite_approvisionnement | enum? | STYLISTE / CLIENT |
| duree_estimee_minutes | integer? | |
| created_at | datetime | |

**Relations**
- `Cliente` 1—* `Demande`
- `Demande` 1—* `PhotoInspiration`
- `Demande` 1—* `ContrainteDemande`
- `Demande` 1—* `PreferenceDemande`
- `Demande` 1—* `FlexibiliteDemande`
- `Demande` 1—* `LieuSouhaite`
- `Demande` 1—* `CampagneMatching`

### PhotoInspiration

| Champ | Type | Notes |
|-------|------|-------|
| id | id | |
| demande_id | fk → Demande | |
| url | string | |
| format | enum? | JPG / PNG / HEIC |
| taille_max_mo | integer? | 10 |

### ContrainteDemande
Contraintes fixes de la demande.

| Champ | Type | Notes |
|-------|------|-------|
| id | id | |
| demande_id | fk → Demande | |
| type | enum | geo / certification / equipement / autre |
| libelle | string | |
| valeur | string | |

### PreferenceDemande

| Champ | Type | Notes |
|-------|------|-------|
| id | id | |
| demande_id | fk → Demande | |
| type | enum | horaire / marque / autre |
| valeur | string | |

### FlexibiliteDemande

| Champ | Type | Notes |
|-------|------|-------|
| id | id | |
| demande_id | fk → Demande | |
| type | enum | `TARIFICATION_DYNAMIQUE`, `ZONE_DEBORDEMENT` |
| parametres | json/string | ex. +/- 15% |

### LieuSouhaite

| Champ | Type | Notes |
|-------|------|-------|
| id | id | |
| demande_id | fk → Demande | |
| type | enum | `CHEZ_CLIENTE`, `CHEZ_COIFFEUSE`, `SALON` |
| zone | string? | Paris 11ème |
| adresse | string? | |

---

## Matching & invitations

### CampagneMatching
Campagne opérateur pour pourvoir une demande.

| Champ | Type | Notes |
|-------|------|-------|
| id | id | |
| demande_id | fk → Demande | |
| operateur_id | fk → Operateur | |
| statut | enum | en_cours / pause / terminee |
| etape | integer? | Step 2 of 4 |
| capacites_examinees | integer | |
| vivier_eligible_count | integer | |
| invitations_envoyees | integer | |
| reponses_recues | integer | |

**Relations**
- `CampagneMatching` 1—* `VagueMatching`
- `CampagneMatching` 1—* `ExclusionMatching`
- `CampagneMatching` 1—* `ElargissementRecherche`?

### VagueMatching
Vague d’invitations (Vague 1 prioritaire, Vague 2 élargie…).

| Champ | Type | Notes |
|-------|------|-------|
| id | id | |
| campagne_id | fk → CampagneMatching | |
| numero | integer | |
| label | string? | Prioritaire / Élargie |
| statut | enum | suggeree / en_cours / terminee |
| max_invitations | integer? | ex. 5 |

**Relations**
- `VagueMatching` 1—* `CandidatMatching`

### CandidatMatching
Styliste éligible dans une vague.

| Champ | Type | Notes |
|-------|------|-------|
| id | id | |
| vague_id | fk → VagueMatching | |
| styliste_id | fk → Styliste | |
| score | number | % matching |
| budget_propose | decimal? | |
| tags | string[] | Spécialité, Top Rated… |
| alerte | string? | Dispo à confirmer |
| selectionne | boolean | Ajouté à la vague |

### ExclusionMatching
Capacités rejetées par l’algo / filtres.

| Champ | Type | Notes |
|-------|------|-------|
| id | id | |
| campagne_id | fk → CampagneMatching | |
| motif | enum/string | Indisponibilité Date, Hors Budget, Pas de Spécialité, Refus Cuir Chevelu… |
| count | integer | |

### ElargissementRecherche
Options d’assouplissement si recherche infructueuse.

| Champ | Type | Notes |
|-------|------|-------|
| id | id | |
| campagne_id | fk → CampagneMatching | |
| critere_limitant | string | ex. budget_max |
| valeur_actuelle | string | |
| options | json | augmenter budget, élargir zone km, autre date |
| valide | boolean | |

### Invitation
Invitation envoyée à un styliste pour une prestation.

| Champ | Type | Notes |
|-------|------|-------|
| id | id | |
| demande_id | fk → Demande | |
| styliste_id | fk → Styliste | |
| vague_id | fk → VagueMatching? | |
| statut | enum | `EN_ATTENTE`, `ACCEPTE`, `EXPIRE`, `MODIF_PROPOSEE`, `QUESTION`, `INDISPONIBLE` |
| expire_at | datetime | |
| resultat_souhaite | string | |
| budget_min | decimal? | |
| budget_max | decimal? | |
| description | text? | |
| date_proposee | datetime | |
| lieu_type | enum/string | Chez la cliente… |
| zone | string? | |
| duree_estimee_minutes | integer? | |

**Relations**
- `Invitation` 1—* `LigneResponsabiliteInvitation`
- `Invitation` 0—1 `PropositionModification`
- `Invitation` 0—* `QuestionInvitation`

### LigneResponsabiliteInvitation
Matrice figée dans l’invitation.

| Champ | Type | Notes |
|-------|------|-------|
| id | id | |
| invitation_id | fk → Invitation | |
| libelle | string | Fourniture mèches, Préparation, Prestation… |
| detail | string? | Couleur miel, 4 paquets… |
| responsable | enum | STYLISTE / CLIENT |

### PropositionModification
Contre-proposition du styliste.

| Champ | Type | Notes |
|-------|------|-------|
| id | id | |
| invitation_id | fk → Invitation | |
| budget_initial | decimal | |
| nouveau_budget | decimal | |
| ecart | decimal | |
| justification | text | |
| soumise_a_cliente | boolean | |
| statut | enum? | en_attente / acceptee / ecartee |

### QuestionInvitation
Demande d’info du styliste (relayée à la cliente).

| Champ | Type | Notes |
|-------|------|-------|
| id | id | |
| invitation_id | fk → Invitation | |
| auteur_id | fk → Styliste | |
| message | text | |
| transmise_a_cliente | boolean | |
| reponse | text? | |

---

## Proposition ferme & engagement (pack 3-4-5-6)

### EvaluationFaisabilite
Synthèse décisionnelle styliste avant proposition.

| Champ | Type | Notes |
|-------|------|-------|
| id | id | |
| demande_id | fk → Demande | |
| styliste_id | fk → Styliste | |
| statut | enum | `PROPOSAL_PENDING`, validee, refusee |
| diagnostic_cheveux | enum | `FIN_FRAGILE`, `NORMAL_SAIN`, `EPAIS_RESISTANT` |
| faisabilite_commentaire | text | |
| temps_estime_revise_minutes | integer? | |
| historique_technique | text? | Coloration, racines… |
| objectif_principal | text? | |

**Relations**
- `EvaluationFaisabilite` 0—* `DemandePrecision`

### DemandePrecision
Demande d’infos complémentaires à la cliente.

| Champ | Type | Notes |
|-------|------|-------|
| id | id | |
| evaluation_id / invitation_id | fk | |
| styliste_id | fk → Styliste | |
| cliente_id | fk → Cliente | |
| motif | enum | `PHOTO_ACTUELLE`, `LONGUEUR_MASSE`, `HISTORIQUE` |
| message | text | |
| impact_prix | boolean | |
| impact_duree | boolean | |
| prevenir_cliente | boolean | |
| statut | enum | envoyee / repondue |

### OffreFerme (FirmProposal)
Proposition juridiquement engageante publiée par le styliste.

| Champ | Type | Notes |
|-------|------|-------|
| id | id | |
| demande_id | fk → Demande | |
| styliste_id | fk → Styliste | |
| capacite_id / variante_id | fk? | |
| statut | enum | `FIRM_PROPOSAL`, brouillon, expiree, acceptee |
| libelle_prestation | string | |
| prix_base | decimal | |
| total_estime | decimal | |
| duree_minutes | integer | |
| date_debut | datetime | |
| date_fin | datetime | |
| lieu_type | enum/string | Domicile Client, Atelier… |
| adresse | string? | |
| expire_at | datetime | Countdown hold / validité |
| hold_type | enum? | `SOFT_HOLD` |
| engagement_accepte | boolean | Liability acknowledgment |
| notes | text? | Inclus / exclus |

**Relations**
- `OffreFerme` 1—* `LigneOffre` (suppléments)
- `OffreFerme` 1—* `AllocationZone`
- `OffreFerme` 0—1 `RendezVous`

### LigneOffre

| Champ | Type | Notes |
|-------|------|-------|
| id | id | |
| offre_id | fk → OffreFerme | |
| libelle | string | Supplément Patine, Olaplex… |
| montant | decimal | |
| type | enum? | base / supplement / option |

### AllocationZone
Réservation de ressources salon.

| Champ | Type | Notes |
|-------|------|-------|
| id | id | |
| offre_id / rdv_id | fk | |
| ressource | string | Chair 2 (Color), Wash Station B |
| type | enum? | chaise / lavage / autre |

### RendezVous
Engagement confirmé entre cliente et styliste.

Statuts observés : `SOFT_HOLD` → `BOOKED` → `COMMITTED` → `READINESS_PENDING` → `READY` → `AT_RISK` → `JOUR_J` → clôturé.

| Champ | Type | Notes |
|-------|------|-------|
| id | id | |
| offre_id | fk → OffreFerme | |
| demande_id | fk → Demande | |
| cliente_id | fk → Cliente | |
| styliste_id | fk → Styliste | |
| statut | enum | soft_hold / booked / committed / readiness_pending / ready / at_risk / jour_j / cloture |
| date_debut | datetime | |
| date_fin | datetime | |
| duree_minutes | integer | |
| lieu_nom | string? | Atelier Central, Atelier Saint-Honoré… |
| adresse | string? | |
| libelle_prestation | string | |
| arrivée_styliste_minutes_avant | integer? | ex. 5 |

**Relations**
- `RendezVous` 1—1 `ConditionsFinancieres`
- `RendezVous` 1—* `Paiement`
- `RendezVous` 1—* `DocumentContractuel`
- `RendezVous` 1—1 `InstructionsAcces`?
- `RendezVous` 1—* `TachePreparation`
- `RendezVous` 1—* `ConsignePreparation`
- `RendezVous` 0—* `AlertePreparation`
- `RendezVous` 0—* `SignalementTechnique`
- `RendezVous` 0—* `SignalementRetard`
- `RendezVous` 0—* `AvenantExecution`
- `RendezVous` 0—1 `SuiviJourJ`
- `RendezVous` 0—1 `CloturePrestation`
- `RendezVous` 1—* `PolitiqueAcceptee`
- `RendezVous` 0—1 `PreuveExperience`
- `RendezVous` 0—* `AjustementFacturation`
- `RendezVous` 0—1 `Pourboire`
- `RendezVous` 0—1 `Evaluation`
- `RendezVous` 0—1 `ReversementStyliste`

### ConditionsFinancieres

| Champ | Type | Notes |
|-------|------|-------|
| rdv_id | fk → RendezVous | PK |
| total_prestation | decimal | |
| tva_montant | decimal | |
| tva_taux | decimal | 20% |
| acompte_taux | decimal | ex. 30% |
| acompte_montant | decimal | |
| solde_montant | decimal | Reste jour J |
| statut_paiement | enum | `EN_ATTENTE_DE_PAIEMENT`, acompte_recu, solde_regle |

### Paiement

| Champ | Type | Notes |
|-------|------|-------|
| id | id | |
| rdv_id | fk → RendezVous | |
| type | enum | `ACOMPTE`, `SOLDE`, `OPTION` |
| montant | decimal | |
| statut | enum | pending / paye / echoue |
| paye_at | datetime? | |

### LigneFacturation

| Champ | Type | Notes |
|-------|------|-------|
| id | id | |
| rdv_id | fk → RendezVous | |
| libelle | string | |
| montant | decimal | |
| duree_minutes | integer? | |
| inclus | boolean | Coupe & Brushing inclus |
| type | enum? | base / option / supplement |

### DocumentContractuel

| Champ | Type | Notes |
|-------|------|-------|
| id | id | |
| rdv_id | fk → RendezVous | |
| type | enum | `RESUME_CONTRAT`, `RECU_PAIEMENT` |
| format | string | PDF |
| taille | string? | 1.2 MB |
| url | string | |

### PolitiqueAcceptee

| Champ | Type | Notes |
|-------|------|-------|
| id | id | |
| rdv_id | fk → RendezVous | |
| type | enum | `ANNULATION`, `RETARD` |
| texte | text | |
| acceptee | boolean | |
| seuil_annulation_heures | integer? | 48h |
| tolerance_retard_minutes | integer? | 15 |
| seuil_annulation_retard_minutes | integer? | 20 |

### InstructionsAcces

| Champ | Type | Notes |
|-------|------|-------|
| rdv_id | fk → RendezVous | PK |
| adresse | string | |
| complement | string? | Appartement 3B, 3ème étage |
| code_entree | string? | |
| telephone_contact | string? | |
| interphone | string? | |
| etage | string? | |

---

## Préparation (readiness)

### TachePreparation
Checklist bilatérale cliente / styliste.

| Champ | Type | Notes |
|-------|------|-------|
| id | id | |
| rdv_id | fk → RendezVous | |
| responsable | enum | `CLIENTA`, `STYLISTE` |
| libelle | string | |
| detail | string? | Référence mèches, formule… |
| bloquant | boolean | |
| importance | enum? | bloquant / important / normal |
| statut | enum | a_faire / en_attente / confirme / fait |
| offset_minutes | integer? | -15m, -5m avant RDV |

### ConsignePreparation
Rappels / consignes non cochables.

| Champ | Type | Notes |
|-------|------|-------|
| id | id | |
| rdv_id | fk → RendezVous | |
| type | enum/string | etat_cheveux / produits_a_eviter / autre |
| texte | text | |
| destinataire | enum | CLIENTA / STYLISTE |

### SignalementTechnique

| Champ | Type | Notes |
|-------|------|-------|
| id | id | |
| rdv_id | fk → RendezVous | |
| message | text | ex. mèche test recommandée |
| severite | enum? | warning |

### AlertePreparation
Incident pré-prestation (`AT_RISK`).

| Champ | Type | Notes |
|-------|------|-------|
| id | id | |
| rdv_id | fk → RendezVous | |
| statut | enum | `AT_RISK`, resolu |
| motif | enum/string | Fourniture manquante… |
| message | text | |
| option_resolution | enum? | alternative / report / support |

---

## Exécution jour J

### SuiviJourJ

| Champ | Type | Notes |
|-------|------|-------|
| rdv_id | fk → RendezVous | PK |
| etape_courante | enum | attente_arrivee / diagnostique / en_cours / termine |
| cliente_signalee_arrivee | boolean | |
| arrivee_at | datetime? | |
| engagement_signe | boolean | |

**Relations**
- `SuiviJourJ` 1—* `EtapePrestation`

### EtapePrestation

| Champ | Type | Notes |
|-------|------|-------|
| id | id | |
| suivi_id | fk → SuiviJourJ (= rdv_id) | |
| ordre | integer | |
| libelle | string | Diagnostic Validé, En Cours… |
| statut | enum | fait / en_cours / a_venir |

### SignalementRetard

| Champ | Type | Notes |
|-------|------|-------|
| id | id | |
| rdv_id | fk → RendezVous | |
| auteur_role | enum | CLIENTA / STYLISTE |
| heure_arrivee_estimee | time | |
| retard_minutes | integer | |
| heure_prevue | time | |
| motif | text? | |
| impact | string? | Ajustement prestation |
| frais_supplementaires | boolean | |
| resolution_ouverte | boolean | |

### AvenantExecution
Modification en cours de service.

| Champ | Type | Notes |
|-------|------|-------|
| id | id | |
| rdv_id | fk → RendezVous | |
| numero | string? | #492 |
| statut | enum | `RECONFIRMATION_REQUISE`, accepte, refuse |
| motif | text | Supplément longueur détecté… |
| duree_initiale_minutes | integer | |
| duree_nouvelle_minutes | integer | |
| total_initial | decimal | |
| total_nouveau | decimal | |
| ecart_montant | decimal | |

**Relations**
- `AvenantExecution` 1—* `LigneAvenant`

### LigneAvenant

| Champ | Type | Notes |
|-------|------|-------|
| id | id | |
| avenant_id | fk → AvenantExecution | |
| sens | enum | `INITIAL`, `NOUVEAU` |
| libelle | string | |
| detail | string? | |
| montant | decimal? | |

### CloturePrestation

| Champ | Type | Notes |
|-------|------|-------|
| rdv_id | fk → RendezVous | PK |
| statut_realisation | enum | `COMPLETE`, `PARTIELLE`, `INTERROMPUE` |
| notes | text? | |
| sous_total | decimal | |
| acompte_deduit | decimal | |
| solde_a_regler | decimal | |
| validation_cliente_requise | boolean | |
| validee_at | datetime? | |

**Relations**
- `CloturePrestation` 0—* `IncidentPrestation`
- `CloturePrestation` 1—* `LigneFacturation` (final)

### IncidentPrestation

| Champ | Type | Notes |
|-------|------|-------|
| id | id | |
| cloture_id / rdv_id | fk | |
| type | enum/string | securite / hygiene / relationnel |
| description | text | |
| notifie_responsable | boolean | |

---

## Post-prestation & finance (pack 7-8)

### PreuveExperience
Confirmation factuelle de fin de prestation (`SETTLED`).

| Champ | Type | Notes |
|-------|------|-------|
| rdv_id | fk → RendezVous | PK |
| statut | enum | `SETTLED` |
| realisation | enum | `ENTIEREMENT`, `PARTIELLEMENT`, `NON_REALISEE` |
| date | date | |
| heure_debut | time | |
| heure_fin | time | |
| styliste_id | fk → Styliste | dénormalisé UI |
| libelle_prestation | string | |
| prix_paye | decimal | |
| contrat_initial_url | string? | Lien historique accord |

### AjustementFacturation
Lignes post-devis (avenants, remises) sur le règlement solde.

| Champ | Type | Notes |
|-------|------|-------|
| id | id | |
| rdv_id | fk → RendezVous | |
| libelle | string | Soin brillance, Dose produit, Remise fidélité… |
| montant | decimal | Positif = supplément, négatif = remise |
| type | enum | `SUPPLEMENT`, `AVENANT`, `REMISE` |
| taux_remise | decimal? | ex. -10% |

### Pourboire

| Champ | Type | Notes |
|-------|------|-------|
| id | id | |
| rdv_id | fk → RendezVous | |
| cliente_id | fk → Cliente | |
| styliste_id | fk → Styliste | |
| taux | decimal? | 0 / 10 / 15 / 20 % |
| montant | decimal | |
| exonere_commission | boolean | 100% reversé |

### MoyenPaiement

| Champ | Type | Notes |
|-------|------|-------|
| id | id | |
| user_id | fk → User | |
| type | enum | `CARTE_BANCAIRE` … |
| masque | string | •••• 4242 |
| provider | string? | Stripe |

### ReversementStyliste
Détail comptable de payout styliste.

| Champ | Type | Notes |
|-------|------|-------|
| id | id | |
| rdv_id | fk → RendezVous | |
| reference | string? | #B2C-9842 |
| styliste_id | fk → Styliste | |
| prestation_brute | decimal | |
| commission_plateforme_taux | decimal | ex. 12% |
| commission_plateforme_montant | decimal | |
| frais_transaction | decimal | Stripe |
| pourboire_montant | decimal | |
| montant_net | decimal | |
| statut | enum | `PROCESSING`, reverse, echoue |
| date_prestation | date | |
| date_reversement_estimee | date | |
| releve_pdf_url | string? | |

**Relations**
- `ReversementStyliste` 1—* `LigneComptable`

### LigneComptable

| Champ | Type | Notes |
|-------|------|-------|
| id | id | |
| reversement_id | fk → ReversementStyliste | |
| description | string | |
| type | enum | `REVENU`, `RETENUE`, `FRAIS`, `ADDITIONNEL` |
| montant | decimal | |

### Evaluation
Notation multidimensionnelle post-prestation.

| Champ | Type | Notes |
|-------|------|-------|
| id | id | |
| rdv_id | fk → RendezVous | |
| cliente_id | fk → Cliente | |
| styliste_id | fk → Styliste | |
| note_technique | integer | 1–5 |
| note_communication | integer | 1–5 |
| note_ponctualite | integer | 1–5 |
| note_prix | integer | 1–5 |
| memoriser_preferences | boolean | Pour prochaine fois |
| created_at | datetime | |

**Relations**
- `Evaluation` 0—1 `AvisPublic`

### AvisPublic

| Champ | Type | Notes |
|-------|------|-------|
| id | id | |
| evaluation_id | fk → Evaluation | |
| rdv_id | fk → RendezVous | |
| cliente_id | fk → Cliente | |
| styliste_id | fk → Styliste | |
| texte | text | |
| note_globale | integer? | Agrégat / affichage étoiles |
| verifie_plateforme | boolean | |
| prestation_libelle | string? | dénormalisé |
| date_prestation | date? | |
| reponse_styliste | text? | |
| reponse_at | datetime? | |
| signale_abus | boolean | |
| publie | boolean | |

### Favori
Styliste mise en favori par une cliente.

| Champ | Type | Notes |
|-------|------|-------|
| id | id | |
| cliente_id | fk → Cliente | |
| styliste_id | fk → Styliste | |
| created_at | datetime | |

### ExperienceHistorique
Vue agrégée côté cliente (historique prestations) — peut être dérivée de `RendezVous` + `PreuveExperience`.

| Champ | Type | Notes |
|-------|------|-------|
| id | id | (= rdv_id ou vue) |
| cliente_id | fk → Cliente | |
| rdv_id | fk → RendezVous | |
| libelle_prestation | string | |
| date | date | |
| styliste_id | fk → Styliste | |
| styliste_nom | string? | dénormalisé |
| peut_refaire | boolean | Relance demande pré-remplie |
| peut_revenir_vers_styliste | boolean | |

---

## Cycle de vie consolidé (statuts)

### CapaciteProfessionnelle
```text
CAPACITY_DRAFT
      ↓
CAPACITY_IN_REVIEW
      ↓
CAPACITY_OPEN
   ↙         ↘
SUSPENDED   RECONFIRMATION_REQUIRED
   ↓                  ↓
CAPACITY_OPEN ← revalidation
      ↓
CLOSED
```
Canon unique : `CAPACITY_DRAFT` (synonyme UI historique `BROUILLON_CAPACITÉ` abandonné).  
Seuil pilote « planning trop ancien » : **14 jours** sans mise à jour → `RECONFIRMATION_REQUIRED` (constante `PLANNING_STALE_DAYS`).

### Demande
brouillon → `QUALIFICATION_READY_FOR_REVIEW` → `DEMAND_QUALIFIED` → matching → (`RECONFIRMATION_REQUIRED`)

### Invitation
`EN_ATTENTE` → `ACCEPTE` | `EXPIRE` | `MODIF_PROPOSEE` | `QUESTION` | `INDISPONIBLE`

### OffreFerme
brouillon → `FIRM_PROPOSAL` (`SOFT_HOLD`) → acceptee | expiree

### RendezVous
`SOFT_HOLD` → `BOOKED` → `COMMITTED` → `READINESS_PENDING` → `READY` | `AT_RISK` → `JOUR_J` → clôture → `SETTLED`

### Cloture / Preuve
réalisation : `COMPLETE`/`PARTIELLE`/`INTERROMPUE` (styliste) puis `ENTIEREMENT`/`PARTIELLEMENT`/`NON_REALISEE` (cliente) → `SETTLED`

### Paiement / Reversement
`EN_ATTENTE_DE_PAIEMENT` → acompte reçu → solde payé → reversement `PROCESSING` → reverse

---

## Diagramme des relations (complet)

```text
User
 ├── Cliente
 │     ├──<* Demande
 │     │     ├──<* PhotoInspiration / ContrainteDemande / PreferenceDemande
 │     │     ├──<* FlexibiliteDemande / LieuSouhaite
 │     │     ├──<* CampagneMatching
 │     │     │     ├──<* VagueMatching ──<* CandidatMatching
 │     │     │     ├──<* ExclusionMatching
 │     │     │     └──?* ElargissementRecherche
 │     │     ├──<* Invitation
 │     │     │     ├──<* LigneResponsabiliteInvitation
 │     │     │     ├──?* PropositionModification
 │     │     │     └──<* QuestionInvitation
 │     │     ├──?* EvaluationFaisabilite ──<* DemandePrecision
 │     │     └──<* OffreFerme ──<* LigneOffre / AllocationZone
 │     │                      └──1 RendezVous
 │     ├──<* Favori ──> Styliste
 │     ├──<* MoyenPaiement
 │     └──<* ExperienceHistorique (vue sur RendezVous)
 │
 ├── Styliste
 │     ├──<* CapaciteProfessionnelle
 │     │     ├──1 ModeleService
 │     │     ├──<* VariantePrestation
 │     │     │     ├──<* SupplementService / PhotoRealisation / TacheResponsabilite
 │     │     │     └──?* TarificationInterne
 │     │     ├──<* FourniturePrestation
 │     │     ├──?* ConditionsLimites
 │     │     ├──<* LieuPrestation / ZoneGeographique / CreneauHebdomadaire
 │     │     ├──<* RoleEquipePrestation
 │     │     ├──<* CapacityCheckReport ──<* CapacityCheckEcart
 │     │     └──?* ParametresOperationnels / ProtectionSensibilite / PrioriteRecherche
 │     └──<* ReversementStyliste ──<* LigneComptable
 │
 └── Operateur ──<* CampagneMatching
           └── (pilote) peut éditer brouillon capacité ; n’active jamais seul

RendezVous
 ├──1 ConditionsFinancieres / InstructionsAcces? / PreuveExperience?
 ├──<* Paiement / LigneFacturation / AjustementFacturation / DocumentContractuel
 ├──?* Pourboire
 ├──<* PolitiqueAcceptee / TachePreparation / ConsignePreparation
 ├──<* AlertePreparation / SignalementTechnique / SignalementRetard
 ├──<* AvenantExecution ──<* LigneAvenant
 ├──?* SuiviJourJ ──<* EtapePrestation
 ├──?* CloturePrestation ──<* IncidentPrestation
 ├──?* Evaluation ──?* AvisPublic
 └──?* ReversementStyliste
```

---

## Index des entités

| Domaine | Entités |
|---------|---------|
| Acteurs | User, Cliente, Styliste, Operateur |
| Capacité styliste | CapaciteProfessionnelle, VariantePrestation, SupplementService, PhotoRealisation, TarificationInterne, ModeleService, TacheResponsabilite, FourniturePrestation, ConditionsLimites, ProtectionSensibilite, PrioriteRecherche, LieuPrestation, ZoneGeographique, CreneauHebdomadaire, ParametresOperationnels, RoleEquipePrestation, CapacityCheckReport, CapacityCheckEcart |
| Demande cliente | Demande, PhotoInspiration, ContrainteDemande, PreferenceDemande, FlexibiliteDemande, LieuSouhaite |
| Matching | CampagneMatching, VagueMatching, CandidatMatching, ExclusionMatching, ElargissementRecherche, Invitation, LigneResponsabiliteInvitation, PropositionModification, QuestionInvitation |
| Offre & RDV | EvaluationFaisabilite, DemandePrecision, OffreFerme, LigneOffre, AllocationZone, RendezVous |
| Finance | ConditionsFinancieres, Paiement, LigneFacturation, AjustementFacturation, Pourboire, MoyenPaiement, DocumentContractuel, ReversementStyliste, LigneComptable |
| Préparation | InstructionsAcces, TachePreparation, ConsignePreparation, SignalementTechnique, AlertePreparation, PolitiqueAcceptee |
| Exécution | SuiviJourJ, EtapePrestation, SignalementRetard, AvenantExecution, LigneAvenant, CloturePrestation, IncidentPrestation, PreuveExperience |
| Post | Evaluation, AvisPublic, Favori, ExperienceHistorique |

---

## Notes / ambiguïtés

- « Capacité » = offre styliste (`CapaciteProfessionnelle`) ; le matching parle aussi de « capacités examinées » (= instances candidates).
- Demande cliente et capacité styliste partagent des concepts proches (budget, lieux, responsabilités) mais restent distincts.
- Statuts capacité : enum canonique unique (`CAPACITY_DRAFT`, `CAPACITY_IN_REVIEW`, `CAPACITY_OPEN`, `SUSPENDED`, `RECONFIRMATION_REQUIRED`, `CLOSED`). Synonyme UI `BROUILLON_CAPACITÉ` → `CAPACITY_DRAFT`.
- `ModeleService` rattaché à la **capacité** (1 capacité = 1 configuration en pilote), et non plus à la variante.
- Trois objets métier distincts : Prestation/variantes · Configuration de service · Capacité professionnelle (mobilisation lieu/période/volume).
- `ExperienceHistorique` est probablement une **vue** sur `RendezVous` + `PreuveExperience`, pas une table physique.
- Double confirmation de réalisation : styliste (`CloturePrestation.statut_realisation`) puis cliente (`PreuveExperience.realisation`).
- Commission plateforme : 5% évoqué en config capacité (revenu net interne) vs 12% au reversement — règles distinctes ou évolution à clarifier.
- Specs d’exécution étape 0 : `metier/etape-0/`.
