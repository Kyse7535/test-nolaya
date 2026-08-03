Oui. Voici un cas de démonstration **précurseur**, autonome, destiné à une coiffeuse.

Il précède le cas transactionnel de `2-exemple-concret.md`. Là où ce dernier suppose un cadre, une offre et une disponibilité déjà en place, ce cas fait vivre à Sarah **la création** de son activité : comment elle travaille, ce qu’elle propose, et quand elle est disponible.

Sans cette création, la chaîne de proposition de valeur côté coiffeuse est tronquée : elle reçoit une demande sans avoir compris qu’elle a d’abord structuré ce qu’elle est prête à offrir.

> **Changement métier (retrait de la « capacité »).**  
> L’ancien modèle mélangeait offre et disponibilité dans un objet `CAPACITY_OPEN` (souvent un créneau démo déguisé).  
> Le nouveau modèle sépare clairement trois objets : **cadre** → **prestations** → **planning**.  
> L’état d’arrivée n’est plus `CAPACITY_OPEN`, mais **cadre actif + prestations définies + planning actif** (`SCHEDULE_ACTIVE`), prêt à recevoir une demande.

# Position dans la démo globale

```text
Cas précurseur (ce document)
  Histoire P1 — Définir le cadre professionnel     → PROFESSIONAL_FRAMEWORK_ACTIVE
  Histoire P2 — Créer les prestations              → OFFER_ACTIVE
  Histoire P3 — Définir le planning                → SCHEDULE_ACTIVE
        ↓
Cas transactionnel (`2-exemple-concret.md`)
  Histoire B — Recevoir et traiter une demande
  Histoire C — Engagement et préparation
  Histoire D — Réalisation
  Histoire E — Règlement et relation
```

Ce cas peut être joué :

* **seul**, pour valider la compréhension de l’offre professionnelle et du planning ;
* **enchaîné**, comme entrée naturelle du cas Sarah / Inès.

Dans le parcours enchaîné, l’Histoire A de `2-exemple-concret.md` (validation accélérée d’un existant / ancienne « ouverture de capacité ») est **remplacée** par les Histoires P1, P2 et P3.

---

# Cas de démonstration précurseur

## Coiffeuse réelle

Sarah, coiffeuse spécialisée en tresses à Saint-Denis.

Elle arrive **sans** cadre professionnel actif, **sans** prestation définie et **sans** planning actif.

Ce qu’elle construit dans ce cas :

* un mode d’exercice général (accueil, communication, paiement, politiques) ;
* une prestation « Knotless braids medium » avec **plusieurs longueurs proposées** ;
* une galerie propre à cette prestation ;
* une consigne de préparation cliente (visible côté cliente) ;
* un **prix complet par longueur** (référence + adaptations), plus une **option hors longueur** éventuelle (ex. mèches) ;
* un **planning réel** (jours, horaires, lieu d’accueil, limite de charge) qui rend possibles des créneaux compatibles — dont le samedi 15 août à 9 h pour l’enchaînement Inès ;
* un **retour de test collecté** en fin de démo.

## Cliente

Aucune. Inès n’intervient pas encore.

La valeur démontrée ici n’est pas la transaction, mais la **mise en activité** : Sarah peut exercer, vendre et être disponible via la plateforme.

## Contrat de la démo

* Durée : 8 à 12 minutes (seul) ; 20 à 27 minutes si enchaîné avec le cas transactionnel.
* Sarah prend réellement toutes les décisions de création et d’activation.
* Aucune simulation cliente.
* Des choix guidés et des défauts raisonnables accélèrent la saisie, sans décider à sa place.
* Le scénario est reproductible et réinitialisable.
* Point d’arrivée : `SCHEDULE_ACTIVE` (avec cadre actif et offre active), prêt à recevoir une demande.
* Les réponses au formulaire de fin sont enregistrées (collecte du retour utilisatrice).

---

# Histoire P1 — Sarah définit son cadre professionnel

### Étapes couvertes

Avant l’étape 0.

| N° | Activité métier                                                                 | Exécution         | Objet ou état                      |
| -: | ------------------------------------------------------------------------------- | ----------------- | ---------------------------------- |
|  1 | Sarah comprend que le cadre décrit **comment** elle travaille, pas **quoi** elle vend | Sarah, réellement | Intention comprise                 |
|  2 | Sarah choisit ses contextes d’exercice (salon) et la confidentialité de l’adresse | Sarah, réellement | Contextes d’exercice               |
|  3 | Sarah définit l’accueil : pas d’accompagnants, mineurs selon ses règles          | Sarah, réellement | Accueil et accès                   |
|  4 | Sarah définit par défaut son droit à la pause (ex. 5 minutes toutes les heures) | Sarah, réellement | Droit à la pause                   |
|  5 | Sarah fixe ses modalités de communication et les moyens de paiement acceptés    | Sarah, réellement | Communication et paiement          |
|  6 | Sarah sélectionne ses politiques de retard / annulation et le consentement photos | Sarah, réellement | Politiques et sécurité             |
|  7 | Sarah consulte le récapitulatif et active explicitement son cadre               | Sarah, réellement | `PROFESSIONAL_FRAMEWORK_ACTIVE`    |

### Valeur démontrée

Sarah ne rédige pas un contrat juridique. Elle choisit un mode d’exercice réutilisable :

> « J’ai défini comment j’accueille, mon droit à la pause, comment on me paie, et mon cadre est actif. »

Sans cadre actif, aucune prestation ni aucun planning ne peuvent être activés pour recevoir des demandes.

### Ce que la démo ne fait pas

* pas de revue opérateur ;
* pas de branches d’incompatibilité ;
* pas de multi-établissements ;
* pas de modification ultérieure du cadre pendant la transaction.

---

# Histoire P2 — Sarah crée ses prestations

### Étapes couvertes

Étape 0 (partie offre).

Précondition : `PROFESSIONAL_FRAMEWORK_ACTIVE` (produit par P1).

| N° | Activité métier                                                                              | Exécution         | Objet ou état            |
| -: | -------------------------------------------------------------------------------------------- | ----------------- | ------------------------ |
|  8 | Sarah comprend qu’elle définit **ce qu’elle vend**, distinct du cadre et du planning         | Sarah, réellement | Intention offre          |
|  9 | Sarah crée / sélectionne « Knotless braids medium » et choisit les longueurs offertes (ex. épaules, mi-dos, taille) | Sarah, réellement | Prestation + longueurs   |
| 10 | Sarah constitue la galerie de **cette** prestation (trois réalisations)                      | Sarah, réellement | Galerie de prestation    |
| 11 | Sarah indique ce que la cliente doit préparer avant le rendez-vous                            | Sarah, réellement | Préparation cliente |
| 12 | Sarah fixe le **prix de référence** (longueur la plus courte activée), adapte le prix de chaque autre longueur, et peut ajouter une option hors longueur (mèches +20 €) | Sarah, réellement | Prix par longueur        |
| 13 | Sarah consulte le récapitulatif et active explicitement son offre                            | Sarah, réellement | `OFFER_ACTIVE`           |

### Valeur démontrée

Sarah ne « publie » pas une fiche catalogue abstraite. Elle déclare ce qu’elle est **réellement disposée à vendre** :

> « Ma prestation est définie : quoi, quelles longueurs, à quels prix, avec quelle galerie et qui fait quoi. »

La galerie reste rattachée aux knotless braids. Elle ne mélange pas d’autres prestations.

À ce stade, Sarah **n’est pas encore disponible** : sans planning actif, aucune demande ne peut lui être adressée.

#### Modèle tarifaire (prix par longueur)

Ce n’est **pas** un prix unique + un « supplément longueur » mal défini.

1. **Longueur de référence** — la plus courte activée (ex. épaules) porte le **prix de base** de la prestation.
2. **Autres longueurs** — chacune a son **prix complet**, adapté par Sarah selon la longueur (mi-dos, taille…).
3. **Option hors longueur** — fourniture ou service en plus (ex. mèches +20 €), **indépendant** du choix de longueur.

Barème cible démo (modifiable par Sarah) :

| Longueur | Rôle | Prix | Durée |
| -------- | ---- | ---: | ----- |
| Épaules  | Référence | 120 € | 4 h |
| Mi-dos   | Adapté | 150 € | 5 h 30 |
| Taille   | Adapté | 180 € | 6 h 30 |

Au moins une longueur doit être activée. La cible nominale active **épaules** (référence) **et mi-dos** pour montrer l’adaptation ; taille optionnelle.

### Ce que la démo ne fait pas

* pas de construction d’un catalogue complet multi-prestations ;
* pas de contrôles bloquants lourds ni de revue galerie ;
* pas de saisie de créneaux ni d’« ouverture de capacité » dans cet acte ;
* pas de validation superficielle d’un brouillon déjà rempli à sa place ;
* pas de calcul automatique d’écarts de longueur (Sarah pose chaque prix).

Les prix par longueur et l’option mèches (+20 €) peuvent être pré-suggérés pour gagner du temps, mais Sarah doit **les poser ou les confirmer comme des décisions de création**, pas comme une simple relecture.

---

# Histoire P3 — Sarah définit son planning

### Étapes couvertes

Étape 0 (partie disponibilité).

Préconditions : `PROFESSIONAL_FRAMEWORK_ACTIVE` et `OFFER_ACTIVE`.

| N° | Activité métier                                                                                          | Exécution         | Objet ou état        |
| -: | -------------------------------------------------------------------------------------------------------- | ----------------- | -------------------- |
| 14 | Sarah comprend qu’elle définit **quand** elle est disponible, pas un objet « capacité »                  | Sarah, réellement | Intention planning   |
| 15 | Sarah situe l’accueil : salon à Saint-Denis (issu / confirmé depuis le cadre)                          | Sarah, réellement | Lieu d’accueil       |
| 16 | Sarah fixe ses jours ouvrés et ses horaires (ex. mardi–samedi, 9 h–18 h)                                 | Sarah, réellement | Plages de disponibilité |
| 17 | Sarah fixe sa limite de charge (ex. un rendez-vous maximum par jour)                                     | Sarah, réellement | Règle de volume      |
| 18 | Sarah constate qu’un créneau compatible existe (ex. samedi 15 août à 9 h), conséquence du planning        | Sarah, réellement | Disponibilité dérivée |
| 19 | Sarah consulte le récapitulatif et active explicitement son planning                                     | Sarah, réellement | `SCHEDULE_ACTIVE`    |
| 20 | Sarah répond au formulaire de fin ; ses réponses sont enregistrées                                       | Sarah, réellement | Retour de démo collecté |

### Contenu du planning (cible démo)

Ce n’est **pas** « ouvrir le créneau du 15 août à 9 h ». C’est un **planning réel** dont le 15 août à 9 h est une conséquence.

| Paramètre | Valeur cible démo |
| --------- | ----------------- |
| Lieu | Salon, Saint-Denis |
| Jours ouvrés | Mardi à samedi |
| Horaires | 9 h – 18 h |
| Limite | 1 rendez-vous maximum par jour |
| Effet visible | Les samedis dans la période ouverte, dès 9 h, sont éligibles — dont le **samedi 15 août à 9 h** |

La démo peut montrer un aperçu calendaire (ex. semaine du 12–18 août) pour rendre tangible la conséquence, sans présenter ce jour comme un objet métier « capacité ».

### Valeur démontrée

> « J’ai dit quand je travaille. Les créneaux possibles en découlent. Je suis prête à recevoir une demande compatible. »

### Ce que la démo ne fait pas

* pas d’objet `CAPACITY` / `CAPACITY_OPEN` ;
* pas d’ouverture manuelle d’un créneau unique « pour la démo » présenté comme une capacité ;
* pas de calendrier multi-mois exhaustif ni de gestion d’exceptions complexes ;
* pas d’injection de demande cliente avant l’activation du planning ;
* pas de recalcul automatique des durées de créneau à partir de la pause du cadre.

---

# États métier (remplacement de `CAPACITY_OPEN`)

| État | Signification | Produit par |
| ---- | ------------- | ----------- |
| `PROFESSIONAL_FRAMEWORK_ACTIVE` | Comment elle travaille est actif | P1 |
| `OFFER_ACTIVE` | Ce qu’elle vend est défini et actif (prestation + galerie + service + prix) | P2 |
| `SCHEDULE_ACTIVE` | Quand elle est disponible est défini et actif | P3 |

**Prêt à matcher** = les trois états sont acquis.  
C’est cet ensemble qui remplace l’ancien `CAPACITY_OPEN`.

Pour le raccord avec le cas transactionnel :

| Ancien déclencheur | Nouveau déclencheur |
| ------------------ | ------------------- |
| Sarah active sa capacité (`CAPACITY_OPEN`) | Sarah active son planning (`SCHEDULE_ACTIVE`) |
| Compatibilité « capacité ouverte » | Compatibilité cadre + offre + créneau dérivé du planning |

---

# Enchaînement vers le cas transactionnel

À la sortie de P3 :

| État acquis                         | Effet                                                    |
| ----------------------------------- | -------------------------------------------------------- |
| `PROFESSIONAL_FRAMEWORK_ACTIVE`     | Les règles générales s’appliquent aux futurs engagements |
| `OFFER_ACTIVE`                      | L’offre est identifiable et présentable                  |
| `SCHEDULE_ACTIVE`                   | Des créneaux sont éligibles au matching                  |

Le simulateur peut alors injecter la demande d’Inès, comme dans `2-exemple-concret.md` :

| Action de Sarah                         | Réaction automatique d’Inès              |
| --------------------------------------- | ---------------------------------------- |
| Sarah active son planning (`SCHEDULE_ACTIVE`) | La demande qualifiée d’Inès est injectée |

Le récit reprend ensuite à l’**Histoire B** du cas transactionnel (consultation de la demande, précision, proposition ferme, etc.).

La demande d’Inès (knotless medium mi-dos, samedi 15 août 9 h, Saint-Denis, budget ≤ 180 €) reste compatible parce que :

* l’offre active contient mi-dos à 150 € (+ option mèches) ;
* le planning actif ouvre les samedis dès 9 h à Saint-Denis ;
* la limite d’un RDV / jour autorise ce créneau.

---

# Chorégraphie du précurseur

Aucune action cliente. Les transitions sont portées par Sarah et la plateforme.

| Action de Sarah                         | Effet plateforme                                      |
| --------------------------------------- | ----------------------------------------------------- |
| Sarah active son cadre                  | `PROFESSIONAL_FRAMEWORK_ACTIVE` ; débloque les prestations |
| Sarah crée la prestation et la galerie  | Offre structurée, propre à cette prestation           |
| Sarah configure service et prix         | Brouillon d’offre cohérent                            |
| Sarah active l’offre                    | `OFFER_ACTIVE` ; débloque le planning                 |
| Sarah définit et active le planning     | `SCHEDULE_ACTIVE` ; entrée possible du cas transactionnel |

Entre les histoires, des écrans de continuité peuvent indiquer :

> « Votre cadre est actif. Créez maintenant ce que vous proposez. »

> « Votre offre est active. Définissez maintenant quand vous êtes disponible. »

Si la démo s’arrête à P3, un **formulaire de fin répondable** collecte le retour de Sarah (réponses structurées + commentaire libre), puis propose de recommencer ou d’enchaîner. Si elle enchaîne, le bandeau démo passe à la scène transactionnelle.

---

# Ce que ce cas permet de tester

1. Sarah a-t-elle compris la différence entre cadre (comment), prestations (quoi) et planning (quand) ?
2. A-t-elle ressenti que créer son offre et son planning fait partie de la valeur, et non d’une corvée administrative ?
3. Les choix guidés lui ont-ils laissé assez de liberté métier ?
4. A-t-elle compris le modèle « prix de référence sur une longueur, puis adaptation (prix complet) pour les autres » — sans confondre avec une option hors longueur (mèches) ?
5. La galerie par prestation lui paraît-elle plus claire qu’une galerie générale ?
6. Le planning lui paraît-il un vrai outil de disponibilité, et non un créneau démo déguisé ?
7. Les récapitulatifs avant activation lui donnent-ils confiance ?
8. Après `SCHEDULE_ACTIVE`, comprend-elle qu’elle peut maintenant recevoir une demande exploitable ?
9. Le formulaire de fin lui permet-il d’exprimer son retour sans assistance ?
10. Si on enchaîne avec Inès : le passage création → opportunité est-il fluide ou artificiel ?

---

# Relation avec `2-exemple-concret.md`

| Cas | Rôle | Sortie |
| --- | ---- | ------ |
| **Ce précurseur** | Création réelle du cadre, des prestations et du planning | `SCHEDULE_ACTIVE` (+ cadre + offre) |
| **Cas transactionnel** | Transaction autonome Sarah / Inès | `SETTLED` + relation |

Deux usages recommandés :

1. **Parcours complet** — P1 → P2 → P3 → B → C → D → E. Meilleure démonstration de la chaîne de valeur.
2. **Parcours transactionnel court** — conserver une Histoire A accélérée dans `2-exemple-concret.md` (validation d’offre + planning) lorsque le temps est limité ou lorsque cadre / prestations / planning ont déjà été vus.

Le point essentiel : la création du cadre, des prestations et du planning n’est pas un prérequis technique caché. C’est une **histoire de démo à part entière**, précurseur naturel de la transaction.

Storyboard d’écrans (brut) : `3-storyboard-precurseur.md`.  
Storyboard d’écrans (cible) : `3-storyboard-precurseur-cible.md`.  
Prototype : `demo-precurseur/`.
