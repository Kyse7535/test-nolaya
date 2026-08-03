# Analyse UX — Actes suivants (Opportunités → Règlement)

## Objectif

Appliquer aux actes **Opportunités → Engagement → Réalisation → Règlement** du produit `demo-precurseur` la même grille de lecture déjà utilisée pour Cadre / Prestation / Planning : simplification du lexique, retrait du superflu, figer les faux choix, dynamiser les données héritées des actes précédents, et clarifier ce que voit la pro vs ce que verrait la cliente.

**Périmètre analysé (code) :**
- Vues `opportunity/*`, `engagement/*`, `execution/*`, `settlement/*`
- Stores `opportunity`, `framework`, `offer`, `schedule`, `demo`
- Domaine `domain/model.js` (`INES_RAIL`, séquences, checklists, motifs)
- Composants transverses (`DemoBanner`, `ProductNav`, `StickyFooter`, `ResearchPanel`)

**Hors périmètre (sauf notes de cohérence) :** Cadre, Prestation, Planning — déjà corrigés.

---

## Grille de lecture

Critères repris du feedback Cadre / Prestation / Planning :

- Titres / libellés peu clairs → simplifier
- Options manquantes quand le choix a un sens (ex. canaux)
- Libellés qui ne disent pas le but
- Précision inutile quand il n’y a qu’un seul chemin
- Mot « hérité » non pertinent (et équivalents meta)
- Formulations de politiques / preuves floues
- Défauts cliquables qui ne devraient pas l’être → griser / figer
- Mots peu clairs (« explicite », jargon d’état machine…)
- Vocabulaire marketplace / protocole hors sujet pour la pro
- Multi-select / mauvais noms de champs
- Onglets / sections non pertinentes → retirer
- Phrases explicatives inutiles
- Fidélité d’affichage côté cliente
- Données dynamiques issues des actes précédents (cadre / offre / planning)
- Vocabulaire de tâches hors sujet (Pose, Finition, etc.)
- Lexique trop formel pour un public varié / tous niveaux → simplifier

---

## Synthèse transversale

### 1. États machine en anglais visibles à l’écran

Les badges et lignes d’état exposent massivement `FIRM_PROPOSAL`, `SOFT_HOLD`, `COMMITTED`, `READY`, `READINESS_PENDING`, `IN_PROGRESS`, `COMPLETED`, `SETTLED`, `V1` / `V2`, `REVIEW_REPLIED`.

**Recommandation globale :** réserver ces codes au protocole interne / recherche ; en UI pro, préférer du français court (« Proposition envoyée », « Créneau réservé 30 min », « Confirmé », « Prêt », « En cours », « Terminé », « Payé »).

### 2. Lexique trop formel / meta-démo

Expressions récurrentes peu adaptées à tous les niveaux :

| Formule actuelle (extraits) | Problème | Piste |
| --------------------------- | -------- | ----- |
| « Séquence déterministe » | Jargon technique | « Inès répond automatiquement » / retirer |
| « Avance explicite », « Choisissez explicitement », « conséquences explicites » | Mot « explicite » déjà signalé | « Avancer au jour J », « Choisissez comment terminer », « Montrez le nouveau prix et la durée » |
| « Imputation / imputé » | Comptable | « Déjà payé / déduit de la facture » |
| « Qualification de fin » | Administratif | « Comment terminer ? » |
| « Offre ferme », « Solde prévisionnel » | Formel | « Proposition », « Reste à payer » |
| « rail démo », « Hors cadre de la démo », « protocole » | Meta, casse l’immersion | Retirer ou réduire aux seules branches mortes nécessaires |
| « sans messagerie libre » | Meta produit | Retirer ou « Questions préparées uniquement » |

### 3. Données non dynamiques (rail figé)

`useOpportunityStore().rail` pointe vers `INES_RAIL` statique. Lieu (`Saint-Denis`), créneau (`Samedi 15 août` / `9 h`), prix, durée, consigne cliente, pause — **ne sont pas lus** depuis `offer` / `schedule` / `framework`.

Si Sarah a modifié pause, lieu, prix mèches ou planning en Acte A, les actes B→E peuvent afficher autre chose. Même quand les valeurs coïncident avec le happy path, l’UI ne prouve pas le lien.

**Recommandation :** dériver le rail affiché depuis stores actifs (fallback `INES_RAIL` seulement si absents).

### 4. Faux choix sur un seul chemin

Plusieurs écrans montrent 3 options dont 2 sont « Hors cadre de la démo » (supplément, durée, motifs, qualification de fin). Aligné storyboard, mais contraire au feedback « inutile de montrer une précision / un choix quand il n’y a qu’un chemin ».

**Recommandation préférée pour démo :** afficher la valeur figée en lecture seule + une ligne « Dans cette démo : +10 € · +20 min », plutôt que des boutons morts.

### 5. Vocabulaire « Tâches » encore présent

Après retrait Pose / Finition / niveau de service en Prestation :

- Dossier : libellé **« Tâches cliente »**
- Proposition : section **« Tâches »** (Cliente · Coiffeuse)
- Motif modification : **« Confort / finition demandée »** (mot « finition »)

**Recommandation :** « À préparer par la cliente » / « Vous fournissez » ; motif → « Confort demandé pendant la prestation ».

### 6. Aperçu cliente : bon pattern, incomplet

`OpportunityProposalView` a « Aperçu — ce qu’Inès verra » (bon). Manque d’équivalents clairs sur engagement (ce qu’elle a accepté), modification (ce qu’elle voit pour V2), avis (déjà côté pro — OK). Vérifier que l’aperçu n’affiche jamais le net pro ni les codes d’état.

### 7. Pas de « hérité » littéral

Le mot « hérité » n’apparaît plus dans ces vues (cohérent avec Cadre/Planning). En revanche, les équivalents meta (« issu du protocole », « rail démo ») jouent un rôle similaire.

---

## Acte — Opportunités

### `/opportunites` — Liste / Nouvelle opportunité (`OpportunityListView.vue`)

#### Badge « Scène 2 » + titre « Opportunités »
- **Constat :** Header `title="Opportunités"` / `badge="Scène 2"` alors que le bandeau démo parle déjà de scènes ; risque de double numérotation confuse avec Acte B / Scène 2/5.
- **Recommandation :** Uniformiser (ex. badge « Demande » ou retirer le badge scène du header).
- Priorité: Basse

#### Lead « Une demande compatible avec votre offre et votre planning vient d’arriver. »
- **Constat :** Correct sur le fond, un peu long / abstrait (« compatible »).
- **Recommandation :** « Une cliente correspond à votre offre et à un créneau libre. »
- Priorité: Basse

#### Sheet « Pourquoi cette invitation ? »
- **Constat :** Texte meta : *« Cette démo vous montre comment les demandes… »*. `MATCH_CRITERIA` existe dans le domaine mais n’est **pas** affiché.
- **Recommandation :** Remplacer par les critères concrets (offre knotless, 15 août 9 h, Saint-Denis, budget, tension légère) — dynamiques si possible. Retirer la phrase « cette démo vous montre… ».
- Priorité: Haute

#### États post-proposition en anglais
- **Constat :** Affiche `SETTLED — relation`, `COMPLETED — règlement`, `READY`, `COMMITTED`, `IN_PROGRESS`, etc.
- **Recommandation :** Français métier uniquement.
- Priorité: Haute

#### « Vous pouvez la reprendre depuis le protocole démo. »
- **Constat :** Vocabulaire protocole / recherche, pas métier.
- **Recommandation :** « Vous pouvez reprendre le dossier Inès pour continuer. »
- Priorité: Moyenne

#### Carte invitation
- **Constat :** Contenu (`cardSummary`) utile ; CTA « Examiner la demande » clair.
- **Recommandation :** Garder. Optionnel : budget en langage plus simple (« Budget max. 180 € » déjà OK).
- Priorité: —

---

### `/opportunites/dossier` — Dossier demande (`OpportunityDossierView.vue`)

#### Titre header « Dossier demande »
- **Constat :** Peu parlant.
- **Recommandation :** « Demande d’Inès » ou « Dossier d’Inès ».
- Priorité: Moyenne

#### Lead « Décidez à partir d’un dossier structuré, sans messagerie libre. »
- **Constat :** Phrase explicative / meta produit ; « messagerie libre » n’aide pas la décision.
- **Recommandation :** Retirer, ou « Tout est regroupé ici pour décider. »
- Priorité: Haute

#### Libellé « Tâches cliente »
- **Constat :** Vocabulaire tâches (incohérent avec retrait Pose/Finition).
- **Recommandation :** « Préparation demandée à la cliente » → valeur `Cheveux lavés et démêlés`.
- Priorité: Haute

#### Ligne « Résultat souhaité » / « Knotless medium, longueur … »
- **Constat :** Mélange anglais produit + français ; OK si cohérent avec l’offre, mais doit venir de l’offre active.
- **Recommandation :** Dynamiser depuis `offer` ; garder le libellé prestation tel que créé.
- Priorité: Moyenne

#### « Date et lieu » / budget / fournitures
- **Constat :** Lisibles, mais figés via `INES_RAIL` (pas le planning / lieu du store).
- **Recommandation :** Dynamiser lieu + créneau depuis planning ; prix depuis offre.
- Priorité: Haute

#### Alertes « Information manquante » / « Dossier enrichi »
- **Constat :** Clairs et utiles.
- **Recommandation :** Garder. « Précisions reçues » OK.
- Priorité: —

#### Section « Chronologie »
- **Constat :** Utile pour la démo ; détails timeline peuvent contenir codes (`SOFT_HOLD`, etc. via store).
- **Recommandation :** Humainiser les `detail` timeline ; garder la section courte (3–5 événements max visibles).
- Priorité: Moyenne

#### CTA « Demander une précision » / « Préparer une proposition » / « Refuser »
- **Constat :** Bon carrefour (un primary). États désactivés plutôt clairs.
- **Recommandation :** Garder la logique ; vérifier que les boutons disabled ne ressemblent pas à des secondaires cliquables (déjà `disabled`).
- Priorité: Basse

#### Sheet refus — motifs
- **Constat :** Motifs OK (`Créneau incompatible`, etc.). « Technique / faisabilité » un peu abstrait.
- **Recommandation :** « Je ne peux pas réaliser cette demande » ou « Pas réalisable pour moi ».
- Priorité: Basse

---

### `/opportunites/clarification` — Clarification (`OpportunityClarificationView.vue`)

#### Badge « Panneau »
- **Constat :** Incompréhensible pour l’utilisatrice.
- **Recommandation :** Retirer, ou « Précision ».
- Priorité: Haute

#### Lead avec « déterministe »
- **Constat :** *« Ce n’est pas une messagerie libre — Inès répondra de façon déterministe. »*
- **Recommandation :** « Choisissez une ou plusieurs questions. Inès répondra tout de suite. » Retirer « déterministe » et la digression messagerie.
- Priorité: Haute

#### Questions (`CLARIFICATION_QUESTIONS`)
- **Constat :** Libellés clairs. « Allergies produits (complémentaire) » — parenthèse inutile.
- **Recommandation :** « Allergies aux produits (optionnel) ».
- Priorité: Basse

#### Helper footer dupliqué
- **Constat :** « Cochez au moins une précision… » apparaît dans le lead **et** sous le footer.
- **Recommandation :** Une seule occurrence (footer suffit).
- Priorité: Moyenne

#### « Retour au dossier enrichi »
- **Constat :** « Enrichi » un peu jargonnant.
- **Recommandation :** « Retour au dossier ».
- Priorité: Basse

---

### `/opportunites/proposition` — Proposition / Faisabilité (`OpportunityProposalView.vue`)

#### Étape 1 — « Votre décision sur ce dossier »
- **Constat :** Lead *« Les preuves sont déjà dans le dossier. Décidez si vous réalisez — vous ne revalidez pas chaque élément. »* : utile mais un peu professoral.
- **Recommandation :** « Les infos sont dans le dossier. Décidez si vous pouvez réaliser. »
- Priorité: Moyenne

#### Puces « Synthèse du dossier » (`DOSSIER_PROOFS`)
- **Constat :** Liste **en dur** (`Photo récente`, `Pas de défrisage…`) — pas liée à `state` / questions cochées. Si allergie non demandée, elle n’est pas dans les proofs (OK) mais les proofs s’affichent même avant enrichissement selon le flux.
- **Recommandation :** Construire la synthèse depuis l’état réel du dossier.
- Priorité: Haute

#### Décision « Je réalise — tension légère » (seul choix réel)
- **Constat :** Un seul bouton de décision + « Refus technique ». Pas de vraie alternative positive. Le bouton « Je réalise » est sélectionnable comme un choix alors qu’il n’y a qu’un chemin happy-path.
- **Recommandation :** Remplacer par un CTA direct « Je peux réaliser (tension légère) » ; garder refus en secondaire. Éviter le faux « choice » actif.
- Priorité: Moyenne

#### « Refus technique »
- **Constat :** Formel / ambigu (technique = métier ou bug ?).
- **Recommandation :** « Je ne peux pas réaliser » (même sheet motifs).
- Priorité: Moyenne

#### Étape 2 — « Offre ferme » / « Confirmer la proposition »
- **Constat :** « Offre ferme » peu courant ; lead *« Montants et créneau figés dans le cadre de la démo (Inès) »* casse l’immersion.
- **Recommandation :** Titre « Votre proposition » ; lead « Vérifiez puis envoyez — les montants et le créneau sont ceux convenus. »
- Priorité: Haute

#### Case mèches « (+20 €) — requis »
- **Constat :** Défaut coché mais **décochable** → bloque l’envoi avec message « Hors cadre de la démo si les mèches sont retirées ». Même pattern que les faux choix.
- **Recommandation :** Afficher « Mèches incluses (+20 €) » en lecture seule / case figée grisée (comme interruption sécurité en Cadre).
- Priorité: Haute

#### Case relecture hardcodée
- **Constat :** *« J’ai relu la proposition (170 € · 50 € · 15 août 9 h) »* — montants/date en dur, pas `rail.*`.
- **Recommandation :** Interpoler `rail.priceTotal`, `rail.deposit`, `rail.dateLabel`, `rail.timeLabel`.
- Priorité: Haute

#### Section « Tâches »
- **Constat :** Libellé + `Cliente · …` / `Coiffeuse · …` + note pause.
- **Recommandation :** Renommer « Préparation » ; « Cliente : … » / « Vous : … ». Pause : « Pause prévue : … (incluse, pas facturée en plus) » — dynamique via `framework.pauseText`.
- Priorité: Haute

#### Note pause « informatif, non facturée à part »
- **Constat :** Formulation lourde.
- **Recommandation :** Voir ci-dessus.
- Priorité: Basse

#### « Versement & validité » / « Validité de l’offre · 30 minutes »
- **Constat :** « Versement » OK ; « validité » un peu formel.
- **Recommandation :** « Acompte 50 € » / « Valable 30 minutes ».
- Priorité: Basse

#### Aperçu cliente
- **Constat :** Bon pattern. Contenu raisonnable (pas de net, pas de codes). « Versement initial » cohérent.
- **Recommandation :** Garder ; aligner libellés avec la fiche pro (« Acompte » vs « Versement initial » — choisir un seul mot partout).
- Priorité: Moyenne

---

### `/opportunites/proposition-envoyee` — Proposition envoyée (`OpportunitySentView.vue`)

#### Badges `FIRM` / `État · FIRM_PROPOSAL` / `SOFT_HOLD actif`
- **Constat :** Jargon machine.
- **Recommandation :** « Proposition envoyée » / « Créneau réservé 30 min ».
- Priorité: Haute

#### « Offre ferme envoyée à Inès »
- **Constat :** « Offre ferme » formel.
- **Recommandation :** « Proposition envoyée à Inès ».
- Priorité: Moyenne

#### Bloc « Acte C — Engagement »
- **Constat :** *« Constater l’acceptation d’Inès, consulter les preuves… »* — ton protocole.
- **Recommandation :** « Ensuite : Inès accepte, paie l’acompte, puis vous préparez le rendez-vous. »
- Priorité: Moyenne

#### CTA « Continuer vers l’engagement »
- **Constat :** Clair.
- **Recommandation :** Garder.
- Priorité: —

---

## Acte — Engagement

### `/engagement` — Engagement formé (`EngagementCommittedView.vue`)

#### Phase simulateur — « Séquence déterministe — vous constatez, vous ne validez pas à sa place. »
- **Constat :** Double jargon (déterministe + consigne méta).
- **Recommandation :** « Inès répond. Vous regardez seulement — vous n’acceptez pas à sa place. »
- Priorité: Haute

#### Étapes `ENGAGEMENT_SEQUENCE`
- **Constat :** « Inès accepte la proposition V1 » — V1 prématuré pour quelqu’un qui n’a pas encore vu la modif. « Acompte imputé sur le total convenu » — « imputé » formel.
- **Recommandation :** « Inès accepte votre proposition » ; « Acompte de 50 € reçu — déduit du total ».
- Priorité: Haute

#### Badge `État · COMMITTED`
- **Constat :** Anglais machine.
- **Recommandation :** « Confirmé » / « Rendez-vous confirmé ».
- Priorité: Haute

#### Lead « Les preuves sont conservées. Ouvrez-les pour constater l’engagement formé. »
- **Constat :** « Engagement formé » / « constater » formels.
- **Recommandation :** « Le rendez-vous est confirmé. Vous pouvez revoir ce qu’Inès a accepté. »
- Priorité: Moyenne

#### Lignes sécurisées
| Libellé actuel | Constat | Recommandation |
| -------------- | ------- | -------------- |
| Version acceptée / Proposition V1 | Versioning produit | « Proposition acceptée » |
| Prix convenu | OK | Garder |
| Versement reçu | OK | Harmoniser avec « Acompte » |
| Solde prévisionnel | Formel | « Reste à payer » |
| Créneau … — confirmé | OK | Garder |
| Consentement / Enregistré | Un peu froid | « Règles acceptées » |

- Priorité: Haute (solde + V1)

#### Pied « Checklists de préparation créées · READINESS_PENDING »
- **Constat :** Code + phrase technique.
- **Recommandation :** « Prochaine étape : préparer le rendez-vous » ou retirer.
- Priorité: Haute

#### Sheets preuves
- **Constat :** Contenu utile. « Imputé sur » dans sheet paiement.
- **Recommandation :** « Déduit du total … ». Pause dynamique OK (`pauseText`).
- Priorité: Moyenne

---

### `/engagement/preparation` — Préparation (`EngagementPrepView.vue`)

#### Badges `READY` / `READINESS_PENDING` / `Seuil · Acte D`
- **Constat :** Codes + « Seuil » opaque.
- **Recommandation :** « Prêt » / « En préparation » / « Jour J ».
- Priorité: Haute

#### Lead checklists
- **Constat :** *« Deux checklists distinctes. Vous cochez la vôtre ; Inès confirme la sienne après votre validation. »* — clair, un peu long.
- **Recommandation :** « Cochez votre liste. Inès confirmera la sienne ensuite. »
- Priorité: Basse

#### Checklist Sarah
- **Constat :** Libellés simples et bons. « Consignes particulières consultées » un peu formel.
- **Recommandation :** « Consignes du rendez-vous lues » ; sheet OK.
- Priorité: Basse

#### Checklist Inès
- **Constat :** Lecture seule bien faite. Alignée avec consigne « Cheveux lavés / démêlés ».
- **Recommandation :** Garder. S’assurer que les items restent alignés avec la consigne d’offre (dynamique).
- Priorité: Moyenne (dynamisme)

#### « Toutes les conditions nécessaires sont satisfaites. »
- **Constat :** Très formel / juridique.
- **Recommandation :** « Tout est prêt des deux côtés. »
- Priorité: Haute

#### Footer « Avance explicite au jour J »
- **Constat :** Mot « explicite » + meta.
- **Recommandation :** Retirer le helper, ou « Passe au jour du rendez-vous ».
- Priorité: Haute

#### CTA « Continuer la démonstration »
- **Constat :** Meta-démo (nécessaire pour C5 storyboard).
- **Recommandation :** Si on garde le geste : « Passer au jour du rendez-vous » (plus métier que « démonstration »).
- Priorité: Moyenne

#### Pont jour J « préparation complète (READY) »
- **Constat :** Code READY dans la phrase.
- **Recommandation :** « préparation complète ».
- Priorité: Basse

---

## Acte — Réalisation

### `/realisation` — Dossier du jour (`ExecutionDossierView.vue`)

#### Lead « dossier opérationnel »
- **Constat :** *« Démarrez pour ouvrir le dossier opérationnel — aucune modification n’est encore demandée. »* — « opérationnel » formel ; deuxième proposition un peu anticipatoire.
- **Recommandation :** « Tout est prêt. Commencez la prestation quand Inès est installée. »
- Priorité: Haute

#### Ligne « Engagement » = `V1 active` / `V2 active`
- **Constat :** Versioning opaque avant toute modification.
- **Recommandation :** Avant V2 : « Proposition acceptée » ; après : « Modifiée (perles) » + lien « Voir le détail ».
- Priorité: Haute

#### « Voir l’engagement V1 »
- **Constat :** Même problème de libellé.
- **Recommandation :** « Voir la proposition acceptée ».
- Priorité: Moyenne

#### « Préparation · Complète (READY) »
- **Constat :** Code anglais.
- **Recommandation :** « Préparation · Complète ».
- Priorité: Moyenne

#### Bouton disabled « Signaler un problème — hors parcours »
- **Constat :** Branche morte visible ; texte « hors parcours » meta. Pattern déjà vu ; peut frustrer ou distraire.
- **Recommandation :** Retirer de l’UI nominale, ou une seule ligne grisée « Non disponible ici » sans CTA bouton.
- Priorité: Moyenne

#### CTA « Commencer la prestation »
- **Constat :** Clair.
- **Recommandation :** Garder.
- Priorité: —

---

### `/realisation/en-cours` — Prestation en cours (`ExecutionProgressView.vue`)

#### Badge `IN_PROGRESS` / « Engagement · V1|V2 »
- **Constat :** Anglais + versions.
- **Recommandation :** « En cours » / « Proposition en cours » puis « Modifiée ».
- Priorité: Haute

#### Lead « Les totaux suivent l’engagement actif. »
- **Constat :** Abstrait.
- **Recommandation :** « Prix et durée affichés = ce qui est convenu maintenant. »
- Priorité: Moyenne

#### « Signaler un événement »
- **Constat :** Trop vague (n’importe quel événement ?).
- **Recommandation :** « Inès demande une modification » (ou déclencher le modal directement avec un CTA nommé).
- Priorité: Haute

#### « Continuer la composition »
- **Constat :** « Composition » jargonnant (écran suivant = composition V2).
- **Recommandation :** « Proposer la modification » / « Continuer ».
- Priorité: Haute

#### Modal perles
- **Constat :** Clair sur la demande. Phrase « L’engagement V1 reste actif… » — V1 opaque.
- **Recommandation :** « L’accord actuel reste valable jusqu’à ce qu’Inès accepte le changement. »
- Priorité: Moyenne

#### StickyFooter « Dossier du jour » pendant IN_PROGRESS
- **Constat :** CTA secondaire peu prioritaire alors qu’on attend l’événement perles ; peut sembler l’action principale.
- **Recommandation :** Masquer ou passer en ghost tant que l’événement n’est pas traité ; primary = signaler / continuer.
- Priorité: Moyenne

---

### `/realisation/modification` — Modification (`ExecutionModificationView.vue`)

#### Badge / mono « Composition · Rail démo »
- **Constat :** « Rail démo » clairement meta.
- **Recommandation :** « Modification » uniquement.
- Priorité: Haute

#### Lead « Rendez les conséquences explicites. »
- **Constat :** Mot « explicites » + ton professoral.
- **Recommandation :** « Montrez le nouveau prix et la nouvelle durée. Inès doit accepter avant que ce soit valable. »
- Priorité: Haute

#### Grilles +5/+10/+15 € et +10/+20/+30 min
- **Constat :** 2/3 options désactivées « Hors cadre de la démo » + helpers « +10 € requis pour le rail démo ». Faux choix + jargon.
- **Recommandation :** Afficher en lecture seule « Supplément +10 € » et « +20 min » (ou une seule option active sans les morts). Retirer « rail démo ».
- Priorité: Haute

#### Motif « Confort / finition demandée »
- **Constat :** « Finition » rappel du vocabulaire retiré en Prestation.
- **Recommandation :** « Confort demandé pendant la prestation ».
- Priorité: Haute

#### Motif « Autre motif » disabled
- **Constat :** Option morte visible.
- **Recommandation :** Ne pas l’afficher en démo.
- Priorité: Moyenne

#### Simulateur « Séquence déterministe… »
- **Constat :** Même pattern qu’Engagement.
- **Recommandation :** Même simplification.
- Priorité: Haute

#### `MODIFICATION_SEQUENCE` detail « Consentement explicite — engagement V2. »
- **Constat :** « Explicite » + V2.
- **Recommandation :** « Inès a accepté le nouveau prix et la durée. »
- Priorité: Haute

#### Preuves V2 — « Les preuves protègent temps et revenu. »
- **Constat :** Ton juridique / marketplace.
- **Recommandation :** « Voici ce qui a été accepté — vous pouvez le revoir. »
- Priorité: Moyenne

#### Footer « Consultation des preuves recommandée »
- **Constat :** Soft gate non bloquant — OK, mais phrase un peu administrative.
- **Recommandation :** Optionnel / retirer.
- Priorité: Basse

#### Sheet consentement « acceptée explicitement »
- **Constat :** Encore « explicitement ».
- **Recommandation :** « Modification acceptée (+10 € · +20 min). »
- Priorité: Moyenne

---

### `/realisation/cloture` — Clôture (`ExecutionCompleteView.vue`)

#### « Qualification de fin » / légende « Qualification »
- **Constat :** Mot administratif.
- **Recommandation :** « Comment terminer ? » / « Fin de prestation ».
- Priorité: Haute

#### Lead « Choisissez explicitement comment clôturer. »
- **Constat :** « Explicitement » + « clôturer » formel.
- **Recommandation :** « Choisissez comment terminer. Pour la démo : réalisation complète. »
- Priorité: Haute

#### Options partielles / résolution cliquables
- **Constat :** Hors-rail cliquables puis message de récupération — même anti-pattern que multi-choix inutiles.
- **Recommandation :** Afficher uniquement « Prestation réalisée intégralement » en primary ; les autres absentes ou grisées non cliquables dès le départ.
- Priorité: Haute

#### « Déclencher une résolution » / « Protocole incident »
- **Constat :** Marketplace / protocole.
- **Recommandation :** Si visible : « Signalement (indisponible ici) » grisé.
- Priorité: Moyenne

#### Récap « Interruptions / Incidents · Aucune/Aucun »
- **Constat :** Pertinent pour prouver l’absence, mais peut paraître bruit.
- **Recommandation :** Garder une ligne ou fusionner « Aucun incident ».
- Priorité: Basse

#### Sheet « Protection temps / revenu »
- **Constat :** Formulation marketplace / juridique.
- **Recommandation :** « Rappel de la modification acceptée ».
- Priorité: Moyenne

#### Badge `COMPLETED`
- **Constat :** Anglais.
- **Recommandation :** « Terminé ».
- Priorité: Moyenne

#### Pont Acte E
- **Constat :** *« Solde … à constater · preuves & revenu net · avis Inès · favori. »* — liste protocole.
- **Recommandation :** « Ensuite : Inès paie le reste, vous voyez votre revenu, puis son avis. »
- Priorité: Basse

---

## Acte — Règlement

### `/reglement` — Règlement (`SettlementView.vue`)

#### Simulateur « Séquence déterministe — … imputation … »
- **Constat :** « Déterministe » + « imputation » trop formels.
- **Recommandation :** « Inès paie le reste. Vous regardez le détail. »
- Priorité: Haute

#### Étapes `SETTLEMENT_SEQUENCE`
- **Constat :** « Imputation du versement initial de 50 € » / « Acompte déjà reçu, imputé sur le total V2 ».
- **Recommandation :** « Acompte de 50 € déjà reçu » ; « Reste à payer : 130 € » ; retirer V2 du libellé grand public.
- Priorité: Haute

#### Badge `État · SETTLED`
- **Constat :** Anglais.
- **Recommandation :** « Payé » / « Règlement terminé ».
- Priorité: Haute

#### Lignes finance
| Libellé | Constat | Recommandation |
| ------- | ------- | -------------- |
| Prestation initiale (V1) | V1 opaque | « Prestation de départ » |
| Modification acceptée (V2) | V2 opaque | « Perles ajoutées » |
| Versement initial imputé | « imputé » | « Acompte déjà payé » |
| Solde réglé par Inès | OK | Garder / « Payé par Inès » |
| Frais de plateforme (10 %) | OK si transparent | Garder ; éviter jargon marketplace ailleurs |
| Revenu net | OK, bien mis en avant | Garder |

- Priorité: Haute

#### Lead « Prix facturé et revenu net sont séparés clairement. »
- **Constat :** Méta (commente l’UI).
- **Recommandation :** Retirer, ou « Voici ce qu’Inès a payé et ce que vous gardez. »
- Priorité: Moyenne

#### Sheet frais — clair
- **Constat :** Bon. Phrase « Modèle de frais figé pour la démonstration » un peu meta mais acceptable en helper court.
- **Recommandation :** « Exemple pour la démo — non modifiable ici. »
- Priorité: Basse

---

### `/reglement/suite` — Avis & relation (`RelationView.vue`)

#### Lead
- **Constat :** Correct, un peu long.
- **Recommandation :** « Lisez l’avis, répondez, puis voyez la suite avec Inès. »
- Priorité: Basse

#### Dimension « Conformité du prix »
- **Constat :** Formel.
- **Recommandation :** « Prix » ou « Rapport qualité-prix ».
- Priorité: Moyenne

#### Dimension « Résolution des modifications »
- **Constat :** Un peu long / administratif.
- **Recommandation :** « Gestion des changements ».
- Priorité: Basse

#### Badge / statut `REVIEW_REPLIED`
- **Constat :** *« … · REVIEW_REPLIED »* sous la réponse.
- **Recommandation :** Retirer le code ; garder l’horodatage.
- Priorité: Haute

#### Sheet réponse « Répondre · Sur rail »
- **Constat :** « Sur rail » meta.
- **Recommandation :** « Répondre à l’avis ».
- Priorité: Haute

#### Boutons morts « Tester un incident — hors parcours »
- **Constat :** Présents sur l’écran principal **et** le sheet merci. Distraction + lexique protocole.
- **Recommandation :** Retirer de l’UI nominale (garder éventuellement dans ResearchPanel seulement).
- Priorité: Haute

#### Fiche cliente — « net XXX € »
- **Constat :** Affiche le **revenu net pro** dans une « fiche cliente ». Ce n’est pas une vue cliente, mais le mélange « fiche cliente » + net pro est ambigu.
- **Recommandation :** Sur la fiche : prix payé uniquement ; net ailleurs (règlement). Ou renommer « Infos retenues sur Inès ».
- Priorité: Moyenne

#### Favori / préférences mémorisées
- **Constat :** Message clair. Liste `INES_MEMORIZED_PREFS` cohérente avec le rail.
- **Recommandation :** Dynamiser depuis offre/cadre si les valeurs changent.
- Priorité: Basse

#### Sheet merci — parcours « 5 scènes »
- **Constat :** Utile pour clôturer. « Recommencer le scénario » OK.
- **Recommandation :** Garder ; retirer « Tester un incident ».
- Priorité: Moyenne (lié au bouton mort)

---

## Composants & navigation (transverse)

### `DemoBanner`
- **Constat :** « Mode démo — {sceneLabel} » + Réinitialiser / Quitter — OK pour protocole.
- **Recommandation :** Ne pas dupliquer les mêmes codes d’acte dans chaque `ScreenHeader`.
- Priorité: Basse

### `ProductNav`
- **Constat :** « Opportunités » reste actif aussi sur engagement/settlement ; « Rendez-vous » sur execution — un peu flou quand on est en règlement.
- **Recommandation :** Clarifier l’onglet actif en Acte E (Opportunités vs Rendez-vous) pour éviter deux actifs / mauvais focus.
- Priorité: Basse

### `ResearchPanel`
- **Constat :** Contient volontairement le lexique protocole (« Branche protocole ») — acceptable **hors** écrans métier.
- **Recommandation :** Ne pas faire fuiter ces formulations dans les vues transactionnelles.
- Priorité: —

### Stores
- **Constat :** Pause cadre lue dynamiquement à quelques endroits (`pauseText`) ; le reste du rail transactionnel est statique.
- **Recommandation :** Prioriser : lieu, créneau, prix/mèches, consigne cliente, durée, dépôt — depuis offer/schedule/framework.
- Priorité: Haute

---

## Incohérences avec Cadre / Prestation / Planning déjà corrigés

| Thème corrigé en A | Encore présent en B→E |
| ------------------ | --------------------- |
| Pas de « hérité » | Remplacé par « rail démo », « hors cadre de la démo », « protocole » |
| Pose / Finition retirés | « Tâches » + motif « finition » |
| Lexique simplifié | « déterministe », « explicite », « imputation », « qualification », « offre ferme » |
| Contexte / lieu dynamiques | `INES_RAIL.place` / dates figés |
| Défauts non cliquables (ex. sécurité) | Mèches décochables ; options +5/+15 € cliquables en apparence puis disabled ; qualifications hors-rail cliquables |
| Préparation cliente claire | Dossier dit encore « Tâches cliente » |
| Cohérence aperçu cliente | Aperçu OK en proposition ; fiche « cliente » avec net pro plus tard |

Aucun retour de « Pose » / « Niveau de service » / « hérité » littéral dans ces vues — bonne nouvelle. L’écart principal est le **retour du jargon d’état** et des **faux choix multi-options** dès la modification / clôture.

---

## Priorisation recommandée

### Top correctifs (ordre suggéré)

1. **Retirer / franciser les états machine** (`FIRM_PROPOSAL`, `SOFT_HOLD`, `COMMITTED`, `READY`, `IN_PROGRESS`, `COMPLETED`, `SETTLED`, `V1`/`V2`, `REVIEW_REPLIED`) sur tous les écrans B→E.
2. **Simplifier le lexique formel / meta** : déterministe, explicite, imputation, qualification, offre ferme, rail démo, protocole (dans les vues métier).
3. **Dynamiser le rail affiché** depuis offre + planning + cadre (lieu, créneau, prix, mèches, consigne, pause) ; corriger la case de relecture hardcodée `170 € · 50 € · 15 août 9 h`.
4. **Figer les faux choix** : mèches requises en lecture seule ; modification = +10 € / +20 min sans grilles mortes ; clôture = une seule option nominale.
5. **Remplacer le vocabulaire « Tâches » / « finition »** et clarifier les CTA flous (« Signaler un événement », « Continuer la composition », badge « Panneau »).

### Tableau de volumétrie (indicatif)

| Acte | Écrans | Findings actionnables (approx.) | Haute | Moyenne | Basse |
| ---- | ------ | ------------------------------- | ----- | ------- | ----- |
| Opportunités | 5 | ~28 | 12 | 10 | 6 |
| Engagement | 2 | ~16 | 8 | 5 | 3 |
| Réalisation | 4 | ~24 | 12 | 8 | 4 |
| Règlement | 2 | ~14 | 7 | 5 | 2 |
| **Total** | **13** | **~82** | **~39** | **~28** | **~15** |

### Quick wins (faible effort, fort impact)

- Remplacer les `badge-mono` anglais par des libellés FR.
- Supprimer « déterministe », « explicite », « rail démo », « Sur rail », « Panneau ».
- Renommer « Tâches » → « Préparation » ; motif finition → confort.
- Case relecture : valeurs depuis `rail`.
- Retirer les CTA « Tester un incident / Signaler un problème — hors parcours » des écrans nominaux.

### Microcopy cible (exemples)

| Avant | Après |
| ----- | ----- |
| État · FIRM_PROPOSAL | Proposition envoyée |
| SOFT_HOLD actif | Créneau réservé 30 min |
| Solde prévisionnel | Reste à payer |
| Versement initial imputé | Acompte déjà payé |
| Avance explicite au jour J | Passer au jour du rendez-vous |
| Signaler un événement | Inès demande une modification |
| Continuer la composition | Proposer la modification |
| Qualification de fin | Comment terminer ? |
| Composition · Rail démo | Modification |

---

## Méthode & sources

Analyse basée sur le code actuel de `demo-precurseur` (templates + `domain/model.js` + store `opportunity`). Storyboards / prompts (`3-storyboard-cible.md`, `prompts-stitch-precurseur*.md`) utilisés uniquement pour comprendre l’intention (rail déterministe, preuves consultables, compression jour J) — pas pour excuser le jargon visible.

**Livrable :** analyse seule — aucune modification de l’app Vue dans ce lot.
)
