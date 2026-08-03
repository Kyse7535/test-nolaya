# Validation du storyboard précurseur

Source validée : `3-storyboard-precurseur-cible.md` (19 écrans · P1 cadre / P2 prestations / P3 planning)  
Cas métier : `2-precurseur-cadre-prestations-planning.md`  
Prototype : `demo-precurseur/` *(doit refléter ce document — voir §11)*  
Méthode : `4-storyboard-validation.md` + format `4-storyboard-validation-exemple-par-ecran.md`

Périmètre : **Actes P1, P2 et P3** — cadre → prestations → planning → `SCHEDULE_ACTIVE` → retour collecté ou enchaînement. Aucune cliente simulée jusqu’à l’éventuel enchaînement vers `3-storyboard.md`.

> **Retrait de la capacité.** Ce document ne valide plus `CAPACITY_OPEN`, `CAPACITY_DRAFT` ni un écran « ouvrir une capacité ». L’état d’arrivée est **`SCHEDULE_ACTIVE`** (cadre actif + offre active + planning actif). Le déclencheur d’injection Inès est l’activation du **planning**, pas l’ouverture d’une capacité.

---

## 1. Verdict

Le storyboard cible est **approuvé pour tests terrain** dans sa version à 19 écrans et trois actes.

| # | Décision | Motif |
| - | -------- | ----- |
| 1 | **Adopter** le découpage P1 / P2 / P3 | Sépare comment / quoi / quand ; retire l’objet capacité |
| 2 | **Adopter** `SCHEDULE_ACTIVE` comme état d’arrivée | Remplace `CAPACITY_OPEN` ; prêt à matcher |
| 3 | **Garder** multi-longueurs + prix par longueur | Référence (plus courte) + prix complets adaptés ; option hors longueur distincte |
| 4 | **Garder** planning réel (mar–sam 9–18 h, 1 RDV/jour) | Le 15 août 9 h est une **conséquence**, pas un objet métier |
| 5 | **Garder** fusions 10+11, 17+18, 21+22 | 19 écrans au lieu de 22 |
| 6 | **Garder** feedback collectable | Formulaire répondable (10 questions, dont planning) + persistance |
| 7 | **Garder** aide dashboard en bottom sheet | Pas de second écran pédagogique |

### Analyse — ce qui change par rapport à l’ancienne validation

L’ancienne version de ce document (17 écrans, P1+P2) mélangeait offre et disponibilité dans un objet « capacité ». Le storyboard cible actuel :

* active l’**offre** (écran 15) **sans** lieu ni créneau ;
* configure le **planning** dans un acte P3 dédié (écrans 16–19) ;
* montre le samedi 15 août à 9 h comme **aperçu dérivé** du planning, pas comme saisie d’un créneau unique.

Risque de test évité : Sarah croit qu’elle « ouvre un créneau démo » plutôt qu’elle définit quand elle travaille.

### Analyse — modèle tarifaire retenu

```text
Prestation (ex. Knotless braids moyen)
  └─ Longueur de référence (plus courte activée, ex. Épaules) → prix de base
  └─ Autres longueurs activées → chacune un prix complet adapté
  └─ Option hors longueur (ex. mèches) → + montant, indépendant de la longueur
```

La cliente choisira **une** longueur au prix correspondant ; l’option s’ajoute éventuellement.

### Analyse — modèle planning retenu

```text
Cadre actif (contexte salon)
  └─ Offre active (prestation + barème)
       └─ Planning (lieu · jours · horaires · limite de charge)
            └─ Créneaux possibles dérivés (ex. sam. 15 août dès 9 h)
```

Ce n’est **pas** « ouvrir le créneau du 15 août ». C’est un planning réel dont ce créneau est une conséquence affichée.

---

## 2. Matrice de validation (19 écrans)

Pour chaque écran du storyboard cible :

| Écran | Décision Sarah | Valeur démontrée | Hypothèse testée | Réaction cliente | Objet / état | Indispensable ? | Décision |
| ----- | -------------- | ---------------- | ---------------- | ---------------- | ------------ | --------------- | -------- |
| 1 Démarrer démo | Entrer dans le test | Mission claire, sans cliente | Comprend qu’elle crée cadre + offre + planning | Aucune | Session démo | Oui (protocole) | **Garder** |
| 2 Dashboard vide | Choisir de définir le cadre | Sans cadre = pas d’activité possible | Comprend le blocage métier (cadre, prestation, planning) | Aucune | Intention / entrée parcours | Oui | **Garder** |
| 3 Accueil cadre | Accepter de configurer le mode d’exercice | Cadre ≠ prestation ≠ planning | Distingue comment / quoi / quand | Aucune | Intention comprise | Oui, mais court | **Garder** (alléger) |
| 4 Contextes | Où elle exerce + confidentialité | Mode d’exercice situé | Peut formaliser ses contextes | Aucune | Contextes | Oui | **Garder** |
| 5 Accueil & accès | Accompagnants, mineurs, accès | Règles d’accueil | Formalise l’accueil sans jargon | Aucune | Accueil & accès | Oui | **Garder** |
| 6 Vos pauses pendant une longue prestation | Fixer la pause par défaut | Protection du temps de travail | La pause a sa place dans le cadre | Aucune | Vos pauses pendant une longue prestation | Oui (différenciant) | **Garder** ; fusion optionnelle avec 5 si temps |
| 7 Comm. & paiement | Canal, délai, moyens | Conditions relationnelles / $ | Choisit sans texte juridique | Aucune | Comm. + paiement | Oui | **Garder** |
| 8 Politiques & photos | Retard, annulation, sécurité, photos | Cadre protecteur lisible | Catalogue > rédaction libre | Aucune | Politiques | Oui | **Garder** |
| 9 Récap cadre | Activer (CTA délibéré) | Preuve avant engagement du cadre | Relit et assume ses règles | Aucune | `PROFESSIONAL_FRAMEWORK_ACTIVE` | Oui | **Garder** |
| 10 Cadre actif → prestation | Passer à la création d’offre | Cadre débloque ce qu’elle vend | Comprend la conséquence P1→P2 | Aucune | `OFFER_DRAFT` | Partiel | **Fusionner** (ex-10+11) |
| 11 Prestation + longueurs | Choisir prestation + épaisseur (multi) + longueurs multi | Offre multi-formats | Réf. = plus courte activée | Aucune | Prestation + longueurs | Oui | **Garder** |
| 12 Galerie | Sélectionner preuves visuelles | Galerie par prestation | Plus claire qu’une galerie générale | Aucune | `SERVICE_GALLERY` | Oui | **Garder** |
| 13 Service & tâches | Qui fait quoi | Périmètre anticipé | Répartition compréhensible | Aucune | Configuration de service | Oui | **Garder** |
| 14 Prix par longueur | Prix référence + adaptés + option hors longueur | Tarif métier lisible | Distingue longueur vs option mèches | Aucune | Barème par longueur | Oui | **Garder** |
| 15 Récap offre | Activer (CTA délibéré) l’offre | Offre complète **sans** lieu ni créneau | Confiance avant publication ; comprend qu’elle n’est pas encore disponible | Aucune | `OFFER_ACTIVE` | Oui | **Garder** |
| 16 Offre active → planning | Passer au planning | Offre débloque le quand | Comprend la conséquence P2→P3 | Aucune | `SCHEDULE_DRAFT` | Partiel | **Fusionner** (ex-17+18) |
| 17 Configurer planning | Lieu, jours, horaires, limite | Planning réel, pas créneau déguisé | Voit la conséquence (15 août 9 h) | Aucune | Planning situé | Oui | **Garder** |
| 18 Récap planning | Activer (CTA délibéré) le planning | Preuve avant disponibilité matchable | Relit cadre + offre + planning | Aucune | `SCHEDULE_ACTIVE` | Oui | **Garder** |
| 19 Planning actif + fin | Voir / enchaîner / répondre & enregistrer | Transformation + preuve de test | Retour collecté ; prêt à recevoir une demande | Injection Inès si enchaînement | Feedback persisté / enchaînement | Oui | **Fusionner** (ex-21+22) |

---

## 3. Fusions et corrections retenues

### Fusions (inchangées dans l’intention, renumérotées)

| Avant (`3-storyboard-precurseur.md`) | Après (cible) | Motif |
| ------------------------------------ | ------------- | ----- |
| Écrans 10 + 11 | **Écran 10** — Cadre actif → créer une prestation | Un seul pont P1→P2 : confirmation + piliers offre + CTA |
| Écrans 17 + 18 | **Écran 16** — Offre active → définir le planning | Un seul pont P2→P3 : confirmation + piliers planning + CTA |
| Écrans 21 + 22 | **Écran 19** — Planning actif (+ fin / enchaînement) | Évite un écran « vide » si elle enchaîne ; questions seulement si « Terminer » |

### Fusion optionnelle (si test > 12 min)

| Option | Effet |
| ------ | ----- |
| Fusionner 5 + 6 (accueil + pause) | −1 écran ; pause reste un bloc visible, pas une étape oubliée |

### Corrections de contenu

1. **Retrait capacité** — plus de `CAPACITY_OPEN` / `CAPACITY_DRAFT` ; plus d’écran « lieu & dispos » dans P2.
2. **Acte P3 planning** — jours mar–sam, 9 h–18 h, 1 RDV/jour, lieu Saint-Denis ; aperçu calendaire semaine 12–18 août.
3. **15 août 9 h** — conséquence affichée du planning, pas objet métier ni saisie principale.
4. **Longueurs multi** — plus un seul prix / une seule longueur figée.
5. **Prix par longueur** — longueur de référence (prix de base) + autres longueurs à prix complets adaptés ; **pas** de « supplément longueur ».
6. **Option hors longueur** — mèches (+20 €) clairement séparée du barème longueur (libellé, UI, récap).
7. **Service** — libellé « complet avec préparation cliente » ; pause **non recalculée** dans les durées affichées.
8. **Aide dashboard** — bottom sheet 2–3 phrases, pas second écran pédagogique.
9. **Formulaire de fin répondable** — 10 questions (dont planning et disponibilité) + texte libre + CTA « Enregistrer mon retour » (persistance locale).
10. **Durée cible** — **8–12 minutes** jusqu’à `SCHEDULE_ACTIVE`, +1–2 min pour le feedback.
11. **Bandeau démo** — Étape **1 / 2 / 3 sur 8** (P1 / P2 / P3).
12. **Défauts démo** — **Épaules + Mi-dos** activés pour rendre visible référence → adaptation.

### Storyboard cible (19 écrans)

Référence : `3-storyboard-precurseur-cible.md`.

| N° | Écran | Acte | État produit (sortie) |
| -: | ----- | ---- | --------------------- |
| 1 | Démarrer la démonstration | Démo | Session |
| 2 | Tableau de bord | P1 | Intention |
| 3–8 | Cadre (accueil → politiques) | P1 | `PROFESSIONAL_FRAMEWORK_DRAFT` |
| 9 | Récap + activation cadre | P1 | `PROFESSIONAL_FRAMEWORK_ACTIVE` |
| 10 | Cadre actif → créer une prestation | Pont P1→P2 | `OFFER_DRAFT` |
| 11–14 | Prestation · galerie · service · prix | P2 | `OFFER_DRAFT` enrichi |
| 15 | Récap + activation offre | P2 | `OFFER_ACTIVE` |
| 16 | Offre active → définir le planning | Pont P2→P3 | `SCHEDULE_DRAFT` |
| 17 | Configurer le planning | P3 | `SCHEDULE_DRAFT` enrichi |
| 18 | Récap + activation planning | P3 | `SCHEDULE_ACTIVE` |
| 19 | Planning actif (+ fin / enchaînement) | P3 / Démo | Retour collecté / enchaînement |

---

## 4. Fiches fonctionnelles — Acte P1

Format : intention → fiche → règles → scénario → critères de test  
(`Réaction simulée` = aucune jusqu’à l’enchaînement.)

### Écran 1 — Démarrer la démonstration

**Intention storyboard :** présenter la mission de création (cadre → prestations → planning), sans cliente.

| Élément | Spécification |
| ------- | ------------- |
| Objectif | Installer le contrat de démo et la mission |
| Objets d’entrée | Session démo vierge ; profil Sarah mock |
| Informations prioritaires | Titre mission · durée 8–12 min · enchaînement Cadre → Prestations → Planning actif |
| Décision principale | Commencer |
| Autres décisions | Quitter |
| Réaction simulée | Aucune |
| Sortie principale | Entrée produit (dashboard) |
| Preuve conservée | Horodatage de démarrage de session |

**Règles :** écran hors produit final ; ne pas spoiler Inès ; ne pas préremplir le cadre.

**Scénario :** Sarah lit → Commencer → Écran 2.

**Test :** sans aide, elle reformule qu’elle va créer son cadre, ses prestations et son planning — pas traiter une cliente.

---

### Écran 2 — Tableau de bord de Sarah

**Intention :** montrer qu’sans cadre actif, aucune prestation ni planning ne peut recevoir de demande.

| Élément | Spécification |
| ------- | ------------- |
| Objectif | Faire comprendre le prérequis métier |
| Objets d’entrée | Cadre absent ou inactif ; 0 offre ; 0 planning |
| Informations prioritaires | « Cadre non actif » · conséquence · CTA principal |
| Décision principale | Définir mon cadre |
| Autres décisions | Aide courte (bottom sheet) : « Qu’est-ce qu’un cadre professionnel ? » |
| Réaction simulée | Aucune |
| Sortie principale | Entrée parcours cadre |
| Preuve conservée | — |

**Règles :** aucune carte « prestation à finaliser » ; Demandes / RDV vides ; Prestations sans offre active ; le sheet ne mène pas à un second écran pédagogique.

**Scénario :** Sarah voit le blocage → Définir mon cadre → Écran 3 (ou lit le sheet puis enchaîne).

**Test :** elle explique pourquoi elle ne peut pas encore recevoir de demande.

---

### Écran 3 — Accueil du cadre professionnel

**Intention :** ancrer « comment je travaille ≠ ce que je vends ≠ quand je suis disponible ».

| Élément | Spécification |
| ------- | ------------- |
| Objectif | Orienter avant toute saisie |
| Objets d’entrée | `PROFESSIONAL_FRAMEWORK_DRAFT` |
| Informations prioritaires | Distinction cadre / prestation / planning · piliers · CTA unique |
| Décision principale | Commencer |
| Autres décisions | Retour dashboard |
| Réaction simulée | Aucune |
| Sortie principale | Intention comprise ; début saisie |
| Preuve conservée | — |

**Règles :** pas de champs de saisie ; badge BROUILLON ; pas de jargon juridique.

**Scénario :** Sarah comprend → Commencer → Écran 4.

**Test :** elle verbalise la différence cadre / prestation avant de saisir.

---

### Écran 4 — Contextes d’exercice

| Élément | Spécification |
| ------- | ------------- |
| Objectif | Déclarer où elle exerce et la confidentialité d’adresse |
| Objets d’entrée | Draft cadre |
| Informations prioritaires | Contextes multi-choix · confidentialité adresse |
| Décision principale | Choisir ≥ 1 contexte + règle confidentialité |
| Valeurs cibles démo | Salon · adresse masquée jusqu’à engagement |
| Réaction simulée | Aucune |
| Sortie | Contextes enregistrés dans le draft |
| Écran suivant | 5 |

**Règles :** au moins un contexte obligatoire ; défauts suggérés modifiables ; ce ne sont pas les adresses précises du planning (P3).

**Test :** elle sait que ces choix s’appliqueront à ses futures prestations.

---

### Écran 5 — Accueil et accès

| Élément | Spécification |
| ------- | ------------- |
| Objectif | Fixer les règles d’accueil |
| Objets d’entrée | Draft + contextes |
| Informations prioritaires | Accompagnants · mineurs · consigne d’accès |
| Décision principale | Valider ses règles d’accueil |
| Valeurs cibles démo | Pas d’accompagnants · mineurs avec accompagnateur · sonner à l’entrée |
| Réaction simulée | Aucune |
| Sortie | Accueil & accès dans le draft |
| Écran suivant | 6 |

**Règles :** booléens + texte court ; cohérent avec contexte Salon.

**Test :** elle reconnaît ses pratiques réelles ou ajuste consciemment.

---

### Écran 6 — Vos pauses pendant une longue prestation

| Élément | Spécification |
| ------- | ------------- |
| Objectif | Faire exister le droit à la pause comme règle d’exercice |
| Objets d’entrée | Draft cadre |
| Informations prioritaires | Défaut 5 min / h · options · effet annoncé côté cliente |
| Décision principale | Choisir le régime de pause |
| Options | Aucune · 5 min/h · 10 min/h · Personnaliser |
| Réaction simulée | Aucune |
| Sortie | Vos pauses pendant une longue prestation dans le draft |
| Écran suivant | 7 |

**Règles :**
* la pause appartient au **cadre**, pas à une prestation isolée ;
* **pas de recalcul automatique** de durée de créneau dans cette démo ;
* la règle pourra être rappelée avant engagement (lecture seule plus tard) ;
* « Aucune » est un choix valide.

**Test :** elle considère que cette règle la protège (ou explique pourquoi elle la refuse).

---

### Écran 7 — Communication et paiement

| Élément | Spécification |
| ------- | ------------- |
| Objectif | Fixer comment on la joint et comment elle est payée |
| Objets d’entrée | Draft cadre |
| Informations prioritaires | Canal · délai de réponse à un message (indicatif) · moyens de paiement · moment du solde |
| Décision principale | Sélectionner moyens (≥ 1) et modalités |
| Valeurs cibles démo | Via plateforme · sous 2 h · carte + plateforme · solde en fin |
| Réaction simulée | Aucune |
| Sortie | Comm. + paiement dans le draft |
| Écran suivant | 8 |

**Règles :** moyens = déclaration, pas paiement réel ; pas d’IBAN.

**Test :** elle juge les modalités réalistes pour son activité.

---

### Écran 8 — Politiques, sécurité et photos

| Élément | Spécification |
| ------- | ------------- |
| Objectif | Choisir politiques catalogue + règles de sécurité / photos |
| Objets d’entrée | Draft + catalogue politiques mock |
| Informations prioritaires | Retard · annulation/report · interruption sécurité · consentement photos |
| Décision principale | Sélectionner une politique et les options sécurité/photos |
| Valeurs cibles démo | Retard 15 min · politique catalogue · interruption possible · photos avec accord |
| Réaction simulée | Aucune |
| Sortie | Politiques prêtes pour récap |
| Écran suivant | 9 |

**Règles :** catalogue court, pas de rédaction libre ; pas de revue opérateur.

**Test :** elle comprend sans assistance ce qui sera opposable plus tard.

---

### Écran 9 — Récapitulatif + activation cadre

| Élément | Spécification |
| ------- | ------------- |
| Objectif | Relire puis activer explicitement le cadre |
| Objets d’entrée | Draft complet |
| Informations prioritaires | Tous les blocs dont **pause** · CTA Activer · liens Modifier |
| Décision principale | Activer mon cadre professionnel |
| Autres décisions | Modifier une section (retour ciblé) |
| Réaction simulée | Aucune |
| Sortie principale | `PROFESSIONAL_FRAMEWORK_ACTIVE` |
| Preuve conservée | Version, horodatage, contenu activé |

**Règles :**
* activation explicite obligatoire ;
* impossible d’activer si champs obligatoires manquants ;
* une fois actif, débloque la création d’offre ;
* pas de `IN_REVIEW` dans la démo.

**Scénario :** Sarah relit → Activer → Écran 10.

**Test :** elle active en conscience ; peut citer 2–3 règles qu’elle vient de figer.

---

### Écran 10 — Cadre actif → créer une prestation *(fusion ex-10+11)*

**Intention :** confirmer l’activation du cadre et enchaîner sans double pédagogie vers P2.

| Élément | Spécification |
| ------- | ------------- |
| Objectif | Matérialiser le déblocage et lancer la création d’offre |
| Objets d’entrée | `PROFESSIONAL_FRAMEWORK_ACTIVE` |
| Informations prioritaires | Confirmation cadre actif · bandeau statut cadre actif (sans « hérité ») · piliers prestation · CTA |
| Décision principale | Créer une prestation |
| Autres décisions | Revoir mon cadre |
| Réaction simulée | Aucune |
| Sortie | `OFFER_DRAFT` créé ; entrée P2 directe (écran 11) |
| Bandeau démo | Scène **2/3** |

**Règles :** ne pas redemander la config du cadre ; un seul CTA principal ; le message précise que le planning viendra ensuite ; pas de second écran explicatif offre.

**Scénario :** Sarah voit « cadre actif » → Créer une prestation → Écran 11.

**Test :** elle comprend qu’elle passe du « comment » au « quoi ».

---

## 5. Fiches fonctionnelles — Acte P2

### Écran 11 — Prestation et longueurs

| Élément | Spécification |
| ------- | ------------- |
| Objectif | Choisir ce qu’elle vend, y compris les formats de longueur |
| Objets d’entrée | `OFFER_DRAFT` + cadre actif |
| Informations prioritaires | Catalogue · épaisseur · longueurs multi-sélection |
| Décision principale | Knotless braids moyen + ≥ 1 longueur (cible : Épaules + Mi-dos) |
| Réaction simulée | Aucune |
| Sortie | Prestation + épaisseur + longueurs activées |
| Écran suivant | 12 |

**Règles :** une offre = une prestation ; plusieurs longueurs possibles ; ≥ 1 longueur obligatoire ; référence = plus courte activée ; catalogue guide sans décider.

**Test :** elle active consciemment plus d’une longueur ou explique pourquoi une seule lui suffit.

---

### Écran 12 — Galerie de la prestation

| Élément | Spécification |
| ------- | ------------- |
| Objectif | Rattacher des preuves visuelles à **cette** prestation |
| Objets d’entrée | Prestation sélectionnée |
| Informations prioritaires | Contexte prestation · 1–3 images · niveau de preuve |
| Décision principale | Sélectionner / ajouter des réalisations |
| Minimum | ≥ 1 image |
| Cible démo | 3 réalisations |
| Réaction simulée | Aucune |
| Sortie | `SERVICE_GALLERY` |
| Écran suivant | 13 |

**Règles :** galerie non transversale ; interdit de mélanger d’autres types de prestation.

**Test :** elle trouve plus clair qu’une galerie générale mélangée.

---

### Écran 13 — Service et tâches

| Élément | Spécification |
| ------- | ------------- |
| Objectif | Clarifier la préparation cliente avant le rendez-vous |
| Objets d’entrée | Prestation + galerie |
| Informations prioritaires | Consigne de préparation cliente (pas de niveau de service ni répartition Pose/Finition) |
| Décision principale | Rédiger la consigne cliente (ex. cheveux lavés et démêlés) |
| Valeurs cibles | **Complet avec préparation cliente** · mèches coiffeuse · lavage+démêlage cliente |
| Réaction simulée | Aucune |
| Sortie | Configuration de service |
| Écran suivant | 14 |

**Règles :** libellé honnête du niveau ; chaque tâche a un responsable ; consigne cliente visible si responsable = cliente.

**Test :** elle anticipe ce que la cliente devra préparer.

---

### Écran 14 — Prix par longueur (+ option hors longueur)

| Élément | Spécification |
| ------- | ------------- |
| Objectif | Poser un prix de référence, adapter les autres longueurs, distinguer l’option hors longueur |
| Objets d’entrée | Longueurs activées + configuration de service |
| Informations prioritaires | Carte **Référence** · cartes **Adapter le prix** · bloc **Option hors longueur** · aperçu |
| Décision principale | Ex. Épaules (réf.) 120 € / 4 h · Mi-dos 150 € / 5 h 30 · option mèches +20 € |
| Lecture seule | Pause cadre 5 min/h (**non recalculée** dans les durées) |
| Réaction simulée | Aucune |
| Sortie | Prix complets par longueur + option éventuelle |
| Écran suivant | 15 |

**Règles :**
* longueur de référence = plus courte activée ;
* chaque longueur activée a un **prix complet** `price > 0` et une durée ;
* l’option mèches n’est **pas** un écart de longueur ;
* pas de calcul automatique d’écarts ; Sarah saisit ou confirme chaque prix ;
* aperçu « à partir de » = min des prix actifs (+ option si renseignée).

**Test :**
* elle verbalise qu’épaules a un prix de base et que mi-dos a son propre prix ;
* elle ne confond pas l’option mèches avec l’adaptation de longueur.

---

### Écran 15 — Récapitulatif + activation de l’offre

| Élément | Spécification |
| ------- | ------------- |
| Objectif | Relire l’offre complète puis l’activer **sans** lieu ni créneau |
| Objets d’entrée | Brouillon offre complet + cadre actif |
| Informations prioritaires | Cadre actif · prestation · longueurs · barème · galerie · service |
| Décision principale | Activer cette prestation |
| Autres décisions | Modifier une section |
| Réaction simulée | Aucune |
| Sortie principale | `OFFER_ACTIVE` |
| Preuve conservée | Offre versionnée + référence cadre + barème |

**Règles :**
* activation explicite ;
* impossible si prestation, ≥1 longueur tarifée ou ≥1 image manquants ;
* **pas de lieu, pas de créneau, pas de planning** sur cet écran ;
* après activation, l’offre est identifiable mais **pas encore matchable** sans planning actif.

**Scénario :** Sarah relit → Activer → Écran 16.

**Test :** elle comprend que l’offre est active mais qu’elle n’est pas encore « disponible » pour recevoir des demandes.

---

## 6. Fiches fonctionnelles — Acte P3

### Écran 16 — Offre active → définir le planning *(fusion ex-17+18)*

**Intention :** confirmer l’activation de l’offre et enchaîner sans double pédagogie vers P3.

| Élément | Spécification |
| ------- | ------------- |
| Objectif | Matérialiser le déblocage et lancer la configuration du planning |
| Objets d’entrée | `OFFER_ACTIVE` |
| Informations prioritaires | Confirmation offre active · synthèse barème · bandeau « Cadre actif · Offre active » · piliers planning · CTA |
| Décision principale | Configurer mon planning |
| Autres décisions | Revoir ma prestation |
| Réaction simulée | Aucune |
| Sortie | `SCHEDULE_DRAFT` ; entrée P3 directe (écran 17) |
| Bandeau démo | Scène **3/3** |

**Règles :** rappeler explicitement qu’**sans planning actif, aucune demande** ne peut encore être adressée ; pas de second écran explicatif planning.

**Scénario :** Sarah voit « offre active » → Configurer mon planning → Écran 17.

**Test :** elle comprend qu’elle passe du « quoi » au « quand ».

---

### Écran 17 — Configurer le planning

| Élément | Spécification |
| ------- | ------------- |
| Objectif | Définir un planning réel (lieu, plages, limite) et voir la conséquence |
| Objets d’entrée | `SCHEDULE_DRAFT` + cadre actif + offre active |
| Informations prioritaires | Contexte salon issu du cadre (dynamique) · lieu · jours · horaires · limite · **aperçu calendaire** |
| Décision principale | Valider mar–sam · 9 h–18 h · 1 RDV/jour · Saint-Denis |
| Aperçu cible | Semaine 12–18 août ; **samedi 15 août dès 9 h** visible |
| Aide | Ce n’est pas une capacité à ouvrir : le créneau découle des règles |
| Réaction simulée | Aucune |
| Sortie | Planning situé + compréhension de la conséquence |
| Écran suivant | 18 |

**Règles :**
* contexte d’accueil dynamique issu du cadre (ex. En salon) ;
* lieu = confirmation / précision (Saint-Denis), pas un objet capacité ;
* le 15 août 9 h n’est **pas** un champ de saisie principal ;
* pas de calendrier multi-mois exhaustif ;
* pas de recalcul des durées à partir de la pause du cadre.

**Test :** elle explique que le créneau du 15 août « vient » de ses règles de planning, pas qu’elle l’a ouvert manuellement.

---

### Écran 18 — Récapitulatif + activation du planning

| Élément | Spécification |
| ------- | ------------- |
| Objectif | Relire cadre + offre + planning puis activer explicitement |
| Objets d’entrée | Brouillon planning complet |
| Informations prioritaires | Cadre actif · offre active · lieu · plages · limite · **conséquence 15 août 9 h** |
| Décision principale | Activer mon planning |
| Autres décisions | Modifier |
| Réaction simulée | Aucune |
| Sortie principale | `SCHEDULE_ACTIVE` |
| Preuve conservée | Planning versionné + références cadre et offre |

**Règles :**
* activation explicite ;
* impossible si jours, horaires ou limite manquants ;
* après activation, créneaux éligibles au matching.

**Scénario :** Sarah relit → Activer → Écran 19.

**Test :** elle active en confiance ; peut résumer ses plages et la limite de charge.

---

### Écran 19 — Planning actif (+ fin / enchaînement) *(fusion ex-21+22)*

| Élément | Spécification |
| ------- | ------------- |
| Objectif | Faire voir la transformation ; **collecter le retour** ; clôturer ou enchaîner |
| Objets d’entrée | `SCHEDULE_ACTIVE` (+ cadre + offre actifs) |
| Informations prioritaires | Confirmation · synthèse offre + planning · 3 issues |
| Décision principale | Selon branche : voir planning / enchaîner / terminer + répondre |
| Réaction simulée | **Si enchaînement** : injection demande Inès |
| Sorties | Planning · Écran 6 `3-storyboard.md` · feedback persisté |
| Preuve conservée | `SCHEDULE_ACTIVE` ; `demo-precurseur.feedback` |

**Branches :**
* **Voir mon planning** — navigation produit (liste / calendrier) ;
* **Continuer vers une demande cliente** — simulateur injecte Inès ; déclencheur = `SCHEDULE_ACTIVE` ;
* **Donner mon avis sur cette étape** — formulaire répondable.

**Formulaire (branche Terminer) — 10 questions :**

| # | Question | Type |
| - | -------- | ---- |
| 1 | Avez-vous compris la différence entre cadre, prestation et planning ? | Oui / Partiellement / Non |
| 2 | Créer votre offre vous a-t-il semblé utile ou administratif ? | Utile / Mitigé / Administratif |
| 3 | Le droit à la pause a-t-il sa place dans ce cadre ? | Oui / Partiellement / Non |
| 4 | Le prix par longueur (référence puis adaptation) est-il clair ? | Oui / Partiellement / Non |
| 5 | La galerie par prestation est-elle plus claire qu’une galerie générale ? | Oui / Partiellement / Non |
| 6 | Le planning vous paraît-il un vrai outil de disponibilité ? | Oui / Partiellement / Non |
| 7 | Le récapitulatif avant activation vous a-t-il donné confiance ? | Oui / Partiellement / Non |
| 8 | Après activation du planning, comprenez-vous que vous pouvez recevoir une demande ? | Oui / Partiellement / Non |
| 9 | À quel moment le parcours vous a-t-il paru artificiel ? | Texte libre |
| 10 | Commentaire libre (optionnel) | Texte libre |

**Actions du panneau :**
1. `Enregistrer mon retour` → persistance locale, confirmation affichée ;
2. Puis : `Recommencer le scénario` · `Enchaîner avec une demande cliente` · `Fermer`.

**Règles :** sans enregistrement, le retour n’est pas collecté ; reset efface aussi le feedback ; injection Inès seulement après CTA explicite d’enchaînement.

**Test :** sans assistance, elle répond et enregistre ; comprend qu’elle est prête à recevoir une demande compatible.

---

## 7. Données préremplies / suggérées pour Sarah

| Zone | Donnée | Statut |
| ---- | ------ | ------ |
| Profil | Sarah, Saint-Denis, tresses | Mock figé |
| Cadre — contextes | Salon coché | Suggestion |
| Cadre — adresse | Masquée | Suggestion |
| Cadre — accompagnants | Non | Suggestion |
| Cadre — mineurs | Avec accompagnateur | Suggestion |
| Cadre — pause | 5 min / h | **Défaut explicite** |
| Cadre — comm. | Plateforme, < 2 h | Suggestion |
| Cadre — paiement | Carte + plateforme, solde fin | Suggestion |
| Cadre — retard | 15 min | Suggestion |
| Offre — prestation | Aucune présélection forcée | Sarah choisit (cible knotless medium) |
| Offre — longueurs | Épaules + Mi-dos activés ; longueur Taille optionnelle | Multi-sélection |
| Offre — épaisseur | Medium (multi possible) | Multi-sélection |
| Offre — prix | Épaules (réf.) 120 €/4 h · Mi-dos 150 €/5 h 30 · Taille 180 €/6 h 30 | Suggestion |
| Offre — option hors longueur | +20 € mèches (distinct du barème) | Suggestion |
| Planning — jours | Mar–sam | Suggestion |
| Planning — horaires | 9 h–18 h | Suggestion |
| Planning — limite | 1 RDV / jour | Suggestion |
| Planning — lieu | Salon Saint-Denis | Suggestion / issu du cadre |
| Planning — aperçu | Sam. 15 août 9 h (conséquence) | Calculé, non saisi |
| Feedback | Vide jusqu’à saisie | Persisté après « Enregistrer » |

Principe : **suggérer n’est pas décider**. Les champs critiques restent éditables et engagés par CTA.

---

## 8. États et transitions

```text
(début)
  → PROFESSIONAL_FRAMEWORK_DRAFT       // écrans 3–8
  → PROFESSIONAL_FRAMEWORK_ACTIVE      // écran 9
  → OFFER_DRAFT                        // écran 10
  → OFFER_DRAFT (enrichi)              // écrans 11–14
  → OFFER_ACTIVE                       // écran 15
  → SCHEDULE_DRAFT                     // écran 16
  → SCHEDULE_DRAFT (enrichi)           // écran 17
  → SCHEDULE_ACTIVE                    // écran 18
  → FEEDBACK_RECORDED                  // écran 19 branche Terminer
  → (option) DEMAND_QUALIFIED + invitation  // écran 19 enchaînement
```

**Prêt à matcher** = `PROFESSIONAL_FRAMEWORK_ACTIVE` + `OFFER_ACTIVE` + `SCHEDULE_ACTIVE`.

Sans cadre actif : aucune offre activable.  
Sans offre active : aucun planning activable.  
Sans ≥ 1 longueur tarifée : aucune activation d’offre possible.

---

## 9. Moteur de démonstration (précurseur)

| Élément | Spécification |
| ------- | ------------- |
| Acteurs | Sarah réelle · plateforme · (Inès seulement en sortie optionnelle) |
| Déterminisme | Oui — mêmes choix → mêmes états |
| Réactions cliente | Aucune pendant P1 / P2 / P3 |
| Commandes bandeau | Avancement **1/3 · 2/3 · 3/3** · Réinitialiser · Quitter |
| Reset | Efface cadre, offre, planning, feedback, session ; revient écran 1 |
| Feedback | `localStorage` `demo-precurseur.feedback` |
| Enchaînement | CTA explicite uniquement |

Matrice Inès (hors périmètre interne, une seule ligne) :

| Déclencheur | Réaction | Effet |
| ----------- | -------- | ----- |
| Sarah choisit « Continuer vers une demande cliente » **après** `SCHEDULE_ACTIVE` | Injection demande Inès (knotless mi-dos, sam. 15 août 9 h, Saint-Denis, budget ≤ 180 €) | Entrée Écran 6 de `3-storyboard.md` |

Compatibilité Inès garantie par :
* offre active : mi-dos à 150 € (+ option mèches) ;
* planning actif : samedis dès 9 h à Saint-Denis, 1 RDV/jour.

---

## 10. Critères de test terrain (précurseur)

| Scène | Hypothèse testée | Critère de réussite |
| ----- | ---------------- | ------------------- |
| Dashboard / cadre | Elle comprend le prérequis | Explique pourquoi elle ne reçoit pas encore de demande |
| Configuration cadre | Formaliser n’est pas une corvée juridique | Termine P1 sans assistance ; cite ses règles |
| Vos pauses pendant une longue prestation | La pause a sa place | Réagit (adhésion, réserve ou ajustement) |
| Activation cadre | Activation explicite rassure | Active après relecture, pas en aveugle |
| Prestation + longueurs | Multi-formats ; réf. = plus courte | Active ≥ 1 longueur ; cite la référence |
| Galerie | Offre identifiable | Distingue galerie par prestation |
| Prix / option | Prix complets par longueur ≠ option mèches | Pose ou confirme chaque prix ; ne confond pas l’option |
| Activation offre | Offre ≠ disponibilité | Dit qu’elle n’est pas encore matchable sans planning |
| Configuration planning | Planning réel, pas créneau déguisé | Explique la conséquence du 15 août 9 h |
| Activation planning | Transformation visible | Dit qu’elle peut recevoir une demande compatible |
| Formulaire de fin | Retour collectable | Répond aux 10 questions et enregistre sans assistance |
| Durée | Parcours tenable | ≤ 12 min jusqu’à `SCHEDULE_ACTIVE` (+ feedback) |
| Enchaînement Inès (option) | Passage création → opportunité fluide | Comprend pourquoi la demande apparaît |

---

## 11. Prototype `demo-precurseur/`

Le prototype Vue dans `demo-precurseur/` **doit refléter ce document et** `3-storyboard-precurseur-cible.md`, notamment :

| Attendu | Détail |
| ------- | ------ |
| 19 écrans / routes | P1 (1–10) · P2 (11–15) · P3 (16–19) |
| Bandeau démo | Étape 1 / 2 / 3 sur 8 |
| États | `PROFESSIONAL_FRAMEWORK_*` · `OFFER_*` · `SCHEDULE_*` — **pas** `CAPACITY_*` |
| Écran Prix | Référence + prix adaptés + option hors longueur |
| Écran offre récap | Pas de lieu ni créneau |
| Acte P3 | Planning réel + aperçu 15 août |
| Clôture | Formulaire 10 questions + persistance |
| Enchaînement | Injection Inès déclenchée par `SCHEDULE_ACTIVE` |

Toute divergence entre le prototype et ce document est un **écart à corriger** avant test terrain.

---

## 12. Suite recommandée

1. ~~Storyboard cible~~ → `3-storyboard-precurseur-cible.md` (19 écrans, P3 planning)
2. ~~Validation documentaire~~ → ce fichier
3. ~~**Aligner** `demo-precurseur/` sur P1+P2+P3~~ — fait (cadre → offre → planning → `SCHEDULE_ACTIVE`)
4. **Test interne** puis tests coiffeuses sur le précurseur seul — questions pivot : modèle tarifaire **et** modèle planning
5. Ensuite : enchaînement Acte B (`3-storyboard.md`) avec déclencheur `SCHEDULE_ACTIVE`

---

## 13. Synthèse exécutive

| Question | Réponse |
| -------- | ------- |
| Le storyboard teste-t-il les bonnes décisions ? | **Oui** — cadre + prestation multi-longueurs + planning + retour |
| Modèle tarifaire clair ? | **Oui** — référence + prix complets adaptés ; option mèches hors longueur |
| Modèle planning clair ? | **Oui** — plages réelles ; 15 août = conséquence, pas capacité |
| Capacité / `CAPACITY_OPEN` ? | **Retiré** — remplacé par offre + planning |
| Feedback collectable ? | **Oui** — 10 questions dont planning et disponibilité |
| Combien d’écrans ? | **19** (17 produit + 2 dispositif démo intégrés) |
| Inès intervient-elle ? | **Non**, sauf CTA d’enchaînement après `SCHEDULE_ACTIVE` |
| Risque résiduel à surveiller | Sarah active une seule longueur → adaptation abstraite ; ou confond planning et « ouverture de créneau » |
| Prochaine action | Aligner `demo-precurseur/` puis tests coiffeuses |

### Verdict final

Le storyboard précurseur est **approuvé pour tests terrain** dans sa version à 19 écrans et trois actes. En session réelle, Sarah devrait pouvoir reformuler spontanément :

> « J’ai défini comment je travaille, ce que je vends à quel prix, et quand je suis disponible. Le samedi 15 à 9 h, c’est parce que j’ai dit que je travaille le samedi matin — pas parce que j’ai ouvert un créneau à la main. »
