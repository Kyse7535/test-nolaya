# Analyse passe 2 — œil coiffeuse première fois

## Objectif

Deuxième passe d’analyse UX sur **tout** le parcours `demo-precurseur` (démarrage → Cadre → Prestation → Planning → Opportunités → Engagement → Réalisation → Règlement / relation), vue par une **coiffeuse qui découvre l’outil pour la première fois**.

Elle n’est pas product manager, ni juriste, ni développeuse. Elle veut comprendre vite : *qui parle* (elle / Inès / la démo), *quoi faire ensuite*, *pourquoi l’app me force à passer par ici*, sans jargon ni champs inutiles.

**Livrable :** analyse seule — aucune modification de code dans ce lot.

**Sources :**
- Code actuel `demo-precurseur/src/views/**`, stores, `domain/model.js`, `utils/simulationToast.js`, composants transverses
- Retours utilisateur confirmés (10 points, passe 2)
- Grille déjà utilisée en passe 1 (`5-analyse-retours-actes-suivants.md`) + Cadre / Prestation / Planning
- Objectif : **nouveaux** constats + validation des 10 retours ; éviter de recopier purement le fichier 5 (sauf si encore vrai dans le code)

---

## Grille de lecture

### Nouveaux retours (passe 2 — à traiter comme findings confirmés)

1. Toasts : clarifier qui est Inès (« Simulation : Inès (la cliente)… »)
2. `/cadre/politiques` : garder seulement « Choisissez des règles simples, » (retirer le juridique)
3. Consentement photos : griser / figer (ne doit plus paraître un choix coloré)
4. `/planning` : « Limite de charge » non pertinent → remplacer / retirer
5. `/opportunites/clarification` : retirer « Date du dernier traitement chimique »
6. `/opportunites/dossier` : après précision, badge / ancre vers les ajouts ; marquer le neuf dans la chronologie
7. Terme « dossier » trop formel → retirer / remplacer partout
8. « tension légère » sans sens → retirer
9. Jour J (perles) : expliquer **pourquoi** l’ajout doit passer par l’app
10. Expliquer **pourquoi** le système d’annotations existe

### Critères déjà établis (passes antérieures — toujours actifs)

- Lexique peu clair / trop formel pour tous niveaux
- Champs, onglets, termes non pertinents → retirer
- Faux choix cliquables qui devraient être des défauts gris / figés
- Données dynamiques depuis cadre / offre / planning
- Fidélité d’affichage « côté cliente »
- États machine → français humain
- Phrases inutiles / meta-démo
- Mot « hérité » (et équivalents meta)
- Qui est qui (Sarah / prénom saisi / Inès / simulation)
- Hiérarchie visuelle, scan, prochaine étape claire
- Explications du « pourquoi » manquantes

---

## Synthèse transversale

### Ce qui a déjà bougé (code actuel) — ne pas re-signaler comme « absent »

Plusieurs points de la passe 1 et une partie des 10 retours sont **déjà intégrés** dans le code :

| Sujet | État actuel (extrait) |
| ----- | --------------------- |
| Préfixe toast Inès | `Simulation : Inès (la cliente)` dans `simulationToast.js` |
| Lead politiques | « Choisissez des règles simples. » |
| Date traitement chimique | Absente de `CLARIFICATION_QUESTIONS` |
| Limite de charge | Remplacée par « Rendez-vous max. / jour » |
| « tension légère » (CTA proposition) | Remplacé par « Je peux réaliser » |
| Titres « Dossier demande » | « Demande d’Inès » / « Demande du jour » |
| Ajouts après précision | Badge « Nouveau », CTA « Voir les ajouts », ancre `#nouveaux-ajouts` |
| WHY perles / annotations | Blocs d’aide présents (modal perles + écran modification) |
| Beaucoup d’états EN | Souvent francissés (`STATUS_LABELS`, badges FR) |

### Ce qui reste le plus bloquant pour une 1ʳᵉ fois

1. **Identité & immersion cassée** — « Persona », « Acte B/C/D/E », « Scène X/5 », « précurseur », « offre ferme », « SCHEDULE_ACTIVE », « Simulateur · Inès » partout : on ne sait plus si on joue un métier ou un protocole de test.
2. **« Dossier » encore dans l’URL / routes** — `/opportunites/dossier`, noms `*-dossier` : le produit parle encore « dossier » même si les titres ont changé.
3. **Défauts « locked » encore colorés** — `choice-active` + `choice-locked` sur consentement photos / interruption : toujours l’air d’une option choisie, pas d’une règle plateforme figée.
4. **Pourquoi app pendant le jour J** — textes WHY présents mais discrets (petits blocs muted) ; la coiffeuse peut les rater et ressentir une friction inutile face à une demande de perles orale.
5. **Jargon résiduel métier-produit** — « Faisabilité », « Opportunités », « Engagement », « annotations », « Preuve · », « compatible », « Conséquence visible », « niveau de preuve », Small/Medium/Large, « Off ».
6. **Rail toujours figé** — prix / lieu / créneau Inès ne suivent pas forcément ce qu’elle a saisi en Cadre / Offre / Planning (déjà en passe 1 ; toujours vrai).

---

## Retours utilisateur confirmés (cette passe)

### 1. Toasts — clarifier qui est Inès

- **Constat (code) :** `notifySimulation` préfixe déjà avec `Simulation : Inès (la cliente)` (`utils/simulationToast.js`). Ex. messages stock → toast du type « Simulation : Inès (la cliente) a envoyé une demande ».
- **Pourquoi c’est un problème (1ʳᵉ fois) :** Sans ce préfixe, « Inès a… » se confond avec une vraie cliente ou avec Sarah. Le retour utilisateur reste **confirmé comme exigence** ; l’implémentation actuelle va dans le bon sens.
- **Recommandation :** Conserver le préfixe partout (y compris futurs toasts). Harmoniser le bandeau (`Inès est une cliente simulée · Scène…`) pour ne pas multiplier les formulations. Éviter les toasts d’action Sarah sans distinction.
- **Priorité :** Haute (exigence produit) — **déjà largement en place** ; vérifier les derniers cas edge.

### 2. `/cadre/politiques` — retirer le wording juridique

- **Constat :** Lead actuel = « Choisissez des règles simples. » (plus de « sans rédiger un texte juridique »).
- **Pourquoi :** Le retour est validé. Reste le **titre** « Politiques, sécurité et photos » et le libellé « Consentement photos » encore un peu administratifs.
- **Recommandation :** Garder le lead court. Titre possible : « Règles simples » / « Retard, annulation et photos ». « Consentement photos » → « Photos de la cliente ».
- **Priorité :** Moyenne (lead OK) / Haute si on vise zéro vocabulaire juridique/admin.

### 3. Consentement photos — griser (locked default)

- **Constat :** Bloc `choice choice-active choice-locked` + helper « Règle par défaut de la plateforme — non modifiable ici. » Même pattern pour « Interruption pour sécurité ».
- **Pourquoi :** `choice-active` applique bordure/fond secondaire ; même avec `opacity-55` et `pointer-events-none`, ça **ressemble encore à un choix sélectionné**, pas à une info figée. Une 1ʳᵉ fois tape dessus ou croit devoir « valider » l’option.
- **Recommandation :** Style dédié type « règle plateforme » (fond neutre, pas de `choice-active`, icône cadenas / libellé « Fixé par la plateforme »). Ne pas utiliser la même peau que les vrais choix (retard, annulation).
- **Priorité :** Haute.

### 4. `/planning` — « Limite de charge »

- **Constat :** Libellé actuel = « Rendez-vous max. / jour » + helper « Nombre maximum de rendez-vous que vous acceptez par jour ». « Limite de charge » n’apparaît plus.
- **Pourquoi :** Exigence confirmée ; correction en place. Reste du jargon voisin : « Conséquence visible : … », « {{ schedule.consequenceLabel }} apparaît comme créneau possible — conséquence de vos règles. », succès planning « État · SCHEDULE_ACTIVE ».
- **Recommandation :** Remplacer « conséquence » par « Grâce à vos jours, le samedi 15 août à 9 h peut recevoir une demande. » Retirer le code `SCHEDULE_ACTIVE` de l’UI.
- **Priorité :** Basse pour « Limite de charge » (fait) ; **Haute** pour le jargon « conséquence / SCHEDULE_ACTIVE ».

### 5. Clarification — « Date du dernier traitement chimique »

- **Constat :** `CLARIFICATION_QUESTIONS` = seulement « Photo récente des cheveux » + « Allergies aux produits (optionnel) ».
- **Pourquoi :** Exigence confirmée ; champ retiré. Reste à ne pas le réintroduire dans mocks / storyboards.
- **Recommandation :** Garder 1–2 questions utiles max. Si un jour besoin d’historique cheveux : formulation métier (« Déjà défrisé / coloré récemment ? ») plutôt que date chimique.
- **Priorité :** — (fait) ; vigilance Basse.

### 6. Demande après précision — découvrir ce qui a été ajouté

- **Constat :** Bandeau « Nouveaux éléments reçus » + badge « Nouveau » + CTA « Voir les ajouts » → scroll `#nouveaux-ajouts` ; photo bordée + « Ajouté après précision » ; chronologie avec `isNew`.
- **Pourquoi :** Le retour est **partiellement traité**. Pour une 1ʳᵉ fois, la photo reste un **dégradé mock** (« Photo récente · fournie par Inès ») peu reconnaissable comme *la* réponse à sa question ; si elle scrolle vite la liste de champs, elle peut manquer le bandeau.
- **Recommandation :** Ancrer aussi les réponses texte (allergies) dans la zone « nouveaux » ; pin sticky « 1 nouvel ajout » tant que non vu ; remplacer le mock par un vrai visuel + libellé « Réponse à votre demande de photo ».
- **Priorité :** Haute (polish discoverability).

### 7. Terme « dossier » trop formel

- **Constat UI :** titres passés à « Demande d’Inès », « Demande du jour », « Revoir la demande ».  
- **Constat technique encore visible / structurel :** route `/opportunites/dossier`, names `opportunity-dossier` / `execution-dossier`, fichiers `*DossierView.vue`, commentaires / README « Dossier ».
- **Pourquoi :** Même si le titre a changé, l’URL et le vocabulaire interne fuient parfois (« dossier » mental = administratif). Une coiffeuse qui partage un lien ou lit l’URL voit encore « dossier ».
- **Recommandation :** Renommer routes en `/opportunites/demande`, `/realisation/jour` (ou équivalent) ; purger « dossier » des libellés restants (`faisabilité` helper, docs). Ne jamais réafficher « Dossier » dans headers.
- **Priorité :** Haute (lexique produit) ; Moyenne pour le rename technique seul.

### 8. « tension légère » sans sens

- **Constat :** Plus dans le CTA proposition (« Je peux réaliser » + « Adaptée au cuir chevelu sensible d’Inès »). `MATCH_CRITERIA` dit « Cuir chevelu sensible accepté ». Reste : interruption « Possible si **tension excessive** ou malaise ».
- **Pourquoi :** « Tension légère » était opaque ; « tension excessive » est plus clair (douleur / traction) mais encore un peu clinique.
- **Recommandation :** Confirmer absence totale de « tension légère ». Interruption → « Possible si douleur forte ou malaise ».
- **Priorité :** Haute (fait pour légère) ; Moyenne pour reformuler « excessive ».

### 9. Jour J / perles — expliquer POURQUOI passer par l’app

- **Constat :** Modal perles (`ExecutionProgressView`) :
  > « À faire dans l’app : le nouveau prix et la durée sont acceptés noir sur blanc. Sans ça, un ajout verbal crée souvent un malentendu ou un litige après le rendez-vous. »
- **Pourquoi :** Le fond est bon, mais (a) n’apparaît qu’**après** ouverture du modal, (b) style petit / muted, (c) le bouton « Inès demande une modification » ne dit pas encore *pourquoi on ne le règle pas à l’oral*. Une pro pressée clique « Évaluer » sans lire.
- **Recommandation :** Titre ou sous-titre fort dès le modal : « On fixe le supplément ici pour éviter un malentendu à la fin. » Répéter une ligne courte sur l’écran composition. Option : tip une seule fois au premier jour J.
- **Priorité :** Haute.

### 10. Pourquoi le système d’annotations

- **Constat :** Sur modification acceptée :
  > « Ces annotations (demande, proposition, consentement) restent consultables : preuve partagée en cas de désaccord… »
  Et composition : « Pourquoi ici : chaque changement est tracé… »
- **Pourquoi :** Mot **« annotations »** est produit / technique. La coiffeuse entend « paperasse ». Le bénéfice (protection prix/durée) est là mais noyé.
- **Recommandation :** Remplacer « annotations » par « Trace du changement » / « Ce qui a été accepté ». Lead : « Comme un reçu : demande → votre prix → son oui. » Badges « Preuve · » → « Détail · » ou retirer le préfixe.
- **Priorité :** Haute.

---

## Parcours page par page

### Accueil / démarrage

#### `/` — `DemoStartView.vue`

- **Constat :** Badge « Démonstration autonome » ; titre « Créez votre offre, puis traitez une demande » ; bloc « **Persona** » ; parcours « (précurseur) », « proposition ferme (**Acte B**) » ; helper prénom « … pour l’analyse du test ».
- **Pourquoi c’est un problème :** Lexique recherche / protocole dès la 1ʳᵉ seconde. « Persona » et « Acte B » ne parlent pas métier. La coiffeuse se croit dans un labo, pas dans son outil.
- **Recommandation :** « Qui êtes-vous dans cette démo » / retirer « Persona ». Parcours en français métier : « 1. Vos règles, votre offre, vos dispos. 2. Une demande cliente (Inès, simulée). » Garder la durée. Réduire « analyse du test » → « pour vos retours ».
- **Priorité :** Haute.

#### Dashboard — `DashboardView.vue`

- **Constat :** États utiles (« Définir comment vous exercez », etc.). Après proposition : « L’engagement (**Acte C**) arrive dans la suite du **prototype**. » « Proposition **ferme** envoyée ». « demandes **compatibles** ».
- **Pourquoi :** « Acte C / prototype / ferme / compatibles » = produit. Prochaine étape floue.
- **Recommandation :** « Ensuite : Inès peut accepter et payer l’acompte. » « Proposition envoyée ». « demandes qui correspondent à votre offre ».
- **Priorité :** Haute (Acte C / prototype) ; Moyenne (ferme / compatibles).

#### Bandeau `DemoBanner` + scènes

- **Constat :** « Mode démo — Création de l’offre · Scène X/3 » puis « Inès est une cliente simulée · Scène Y/5 ».
- **Pourquoi :** Utile pour rappeler la simulation, mais **Scène 1/3 puis 2/5** sans continuum clair ; confusion avec « Acte » dans les écrans.
- **Recommandation :** Une seule numérotation grand public (« Étape 2 sur 8 ») ou retirer les fractions ; garder « Inès = cliente simulée ».
- **Priorité :** Moyenne.

---

### Cadre

#### Welcome — `FrameworkWelcomeView.vue`

- **Constat :** « Définissez comment vous travaillez. » Pilliers OK. « Certaines règles de sécurité sont déjà prévues par la plateforme. »
- **Pourquoi :** Globalement clair. « Contextes » comme nom de pilier est abstrait.
- **Recommandation :** Pilier « Contextes » → « Lieux de travail ».
- **Priorité :** Basse.

#### Contextes — `FrameworkContextsView.vue`

- **Constat :** « Adresse masquée jusqu’à l’**engagement** » / « Adresse visible plus tôt ».
- **Pourquoi :** « Engagement » = jargon juridique/produit pour « rendez-vous confirmé ».
- **Recommandation :** « Adresse masquée jusqu’à confirmation du rendez-vous ».
- **Priorité :** Moyenne.

#### Accueil — `FrameworkAccueilView.vue`

- **Constat :** Accompagnants / mineurs / consigne — lisibles.
- **Pourquoi :** Peu de friction. « Consigne d’accès » un peu froid.
- **Recommandation :** « Comment trouver / entrer (digicode, étage…) ».
- **Priorité :** Basse.

#### Pause — `FrameworkPauseView.vue`

- **Constat :** Titre « Votre droit à la pause » ; note « … n’est pas ajoutée automatiquement à la durée de chaque créneau **dans cette démo**. »
- **Pourquoi :** « Droit à » sonne juridique. La phrase démo casse l’immersion.
- **Recommandation :** « Vos pauses pendant une longue prestation ». Helper : « La pause est rappelée à la cliente ; elle n’allonge pas toute seule le créneau affiché. »
- **Priorité :** Moyenne.

#### Comm / paiement — `FrameworkCommPaiementView.vue`

- **Constat :** « Canal », « Délai de réponse à un message (**indicatif**) », multi-select canaux/paiements.
- **Pourquoi :** « Canal / indicatif » = admin. Multi-select sans expliquer qu’on peut en cocher plusieurs.
- **Recommandation :** « Où vous écrire » ; « Temps de réponse habituel ». Helper « Plusieurs choix possibles ».
- **Priorité :** Moyenne.

#### Politiques — `FrameworkPolitiquesView.vue`

- **Constat :** Lead OK (voir retour 2). Annulation : option « **Définir ses règles d’annulation** » comme *choix* au même niveau que 24 h / 48 h — sans écran de définition. Consentement / interruption : faux choix colorés (retour 3). « Possible si tension excessive ou malaise ».
- **Pourquoi :** L’option « Définir… » ressemble à une action, pas à une politique. Locked colorés = confusion. « Politiques » dans le header global.
- **Recommandation :** Retirer ou remplacer « Définir ses règles… » par une vraie règle courte ; style locked neutre ; header « Règles ».
- **Priorité :** Haute.

#### Récap / pont cadre

- **Constat :** Récap « Politiques & photos ». Bridge offre : galerie « avec un **niveau de preuve** clair ».
- **Pourquoi :** « Niveau de preuve » = plateforme / juridique, pas salon.
- **Recommandation :** « Des photos de *cette* prestation (pas de tout votre portfolio). »
- **Priorité :** Moyenne.

---

### Prestation

#### Prestation & longueurs — `OfferPrestationView.vue`

- **Constat :** « Catalogue » ; épaisseur **Small / Medium / Large** ; longueurs « Activée » / « **Off** » ; « (réf. suggérée) ».
- **Pourquoi :** Anglais salon-ok pour medium parfois, mais « Off » et « Catalogue » froids. « réf. » opaque.
- **Recommandation :** « Fin / Moyen / Épais » ou garder Medium avec sous-titre FR. « Activée / Non ». « Longueur de départ pour le prix ».
- **Priorité :** Haute (Off / sizes) ; Moyenne (Catalogue).

#### Galerie — `OfferGalerieView.vue`

- **Constat :** Photos mock « Réalisation déclarée » / « Inspiration » ; « Cible démo : 3 réalisations ».
- **Pourquoi :** « déclarée » / « Cible démo » = protocole. Pourquoi 3 ? Pas clair métier.
- **Recommandation :** « Photo de réalisation » / « Inspiration ». « Ajoutez au moins 1 photo ; 3 donnent une belle vitrine. »
- **Priorité :** Moyenne.

#### Préparation — `OfferServiceView.vue`

- **Constat :** Clair (« Consigne pour la cliente »). Bon alignement avec le feedback « plus de Pose/Finition ».
- **Pourquoi :** Peu de problème.
- **Recommandation :** Garder. Optionnel : exemples chips (« Cheveux lavés et démêlés »).
- **Priorité :** —.

#### Prix — `OfferPrixView.vue`

- **Constat :** « Option hors longueur » ; « barème » (store/`barèmeReady`) ; heures/minutes séparés.
- **Pourquoi :** Dense pour une 1ʳᵉ fois. « hors longueur » correct mais abstrait.
- **Recommandation :** « En plus (ex. mèches) ». Une durée « 5 h 30 » plutôt que deux champs si possible.
- **Priorité :** Moyenne.

#### Récap / pont offre → planning

- **Constat :** Flux global compréhensible une fois le cadre saisi.
- **Pourquoi :** Enchaînement long avant la 1ʳᵉ demande — acceptable en démo mais fatigue.
- **Recommandation :** Sur les bridges, une seule phrase « Ensuite : vos dispos pour recevoir des demandes ».
- **Priorité :** Basse.

---

### Planning

#### Config — `ScheduleConfigView.vue`

- **Constat :** « Issu de votre cadre professionnel. » (équivalent soft de « hérité »). « Rendez-vous max. / jour » (retour 4 OK). Jargon « conséquence » (voir ci-dessus). Lieu éditable OK.
- **Pourquoi :** « Issu de » = meta produit. La coiffeuse veut juste « comme choisi dans votre cadre ».
- **Recommandation :** « Comme dans votre cadre (non modifiable ici). » Reformuler conséquence (retour 4).
- **Priorité :** Moyenne / Haute (conséquence).

#### Récap / succès — `ScheduleSuccesView.vue` / liste

- **Constat succès :** « demandes **compatibles** » ; « Demande Inès **injectée** » ; « **offre ferme** » ; « (**Scène 2/5**) » ; « Enchaînement **Acte B** — sans reset… » ; « État · **SCHEDULE_ACTIVE** » ; « Conséquence visible » (liste).
- **Pourquoi :** Écran de victoire saturé de protocole. « Injectée » = technique. Une 1ʳᵉ fois ne comprend pas Acte B / Scène / SCHEDULE_ACTIVE.
- **Recommandation :** « Une demande d’Inès (cliente simulée) vous attend. » CTA « Voir la demande ». Retirer Acte B / Scène / SCHEDULE_ACTIVE / « sans reset ». Feedback recherche : libellé « Donner mon avis sur cette étape » sans « acte précurseur ».
- **Priorité :** Haute.

---

### Opportunités

#### Liste — `OpportunityListView.vue`

- **Constat :** Titre « Opportunités » ; lead OK. Sheet « Pourquoi cette invitation ? » affiche `matchCriteria` (bon). Badge « Invitation ».
- **Pourquoi :** « Opportunités » / « Invitation » marketplace. Nav bas « Opportunités » reste actif aussi sur engagement/règlement.
- **Recommandation :** Titre produit « Demandes » ; sheet « Pourquoi cette demande ? ».
- **Priorité :** Moyenne.

#### Demande — `OpportunityDossierView.vue` (route encore `/opportunites/dossier`)

- **Constat :** Titre « Demande d’Inès » ; lead « Tout est regroupé ici pour décider. » ; helper CTA « Une photo récente est requise pour évaluer la **faisabilité** » ; discoverability ajouts (retour 6) ; champ « Priorité » = « Confort du cuir chevelu ».
- **Pourquoi :** URL « dossier » (retour 7). « Faisabilité » = PM. Liste de 8 cartes dense avant l’action. « Priorité » ambigu (priorité business vs confort).
- **Recommandation :** Rename route. Helper « … pour décider si vous pouvez réaliser ». « Priorité » → « Ce qui compte pour elle ». Hiérarchie : alerte photo / ajouts → 3–4 infos clés → « Voir tout ».
- **Priorité :** Haute.

#### Clarification — `OpportunityClarificationView.vue`

- **Constat :** Questions chimiques absentes (retour 5 OK). Lead clair. Pas de badge « Panneau » (corrigé).
- **Pourquoi :** OK globalement. Pendant l’attente « Inès consulte… » — bon, mais sans rappel que c’est simulé (le toast le fait).
- **Recommandation :** Garder. Optionnel : une ligne « Réponse simulée d’Inès ».
- **Priorité :** Basse.

#### Proposition — `OpportunityProposalView.vue`

- **Constat :** Badge header « **Faisabilité** » ; « Étape 1 · Faisabilité » ; CTA « Je peux réaliser » (plus de tension légère — retour 8). Mèches en checkbox **disabled** (bon). Aperçu cliente OK.
- **Pourquoi :** « Faisabilité » opaque. Deux étapes sur un long écran : risque de ne pas voir l’étape 2. « Acompte & validité » un peu contrat.
- **Recommandation :** Badge « Décision » / « Votre avis ». Après « Je peux réaliser », scroll auto vers la proposition. « Acompte · valable 30 min ».
- **Priorité :** Haute (faisabilité) ; Moyenne (scroll).

#### Proposition envoyée — `OpportunitySentView.vue`

- **Constat :** Globalement clair. Feedback « acte B ».
- **Pourquoi :** « acte B » dans le CTA ghost.
- **Recommandation :** « Donner mon avis sur cette étape ».
- **Priorité :** Basse.

---

### Engagement

#### Confirmé — `EngagementCommittedView.vue`

- **Constat :** « Simulateur · Inès » ; lead clair ; lignes « Proposition acceptée », « Reste à payer », « Règles acceptées » (beaucoup de passe 1 déjà intégré). Sheet « **Offre** acceptée » / « Preuve · ».
- **Pourquoi :** Titre d’écran « Engagement » abstrait. « Simulateur » OK en démo mais froid. « Preuve · » = tribunal.
- **Recommandation :** Titre « Confirmation » / « Rendez-vous confirmé ». « Détail · Paiement ». Pendant la séquence : « Inès (cliente simulée) répond… ».
- **Priorité :** Moyenne.

#### Préparation — `EngagementPrepView.vue`

- **Constat :** Checklists claires. Pont « Demande du jour ». Ghost « retour (**acte C**) ». Sheet consignes « adapter la **pose** » (mot Pose revenu en détail).
- **Pourquoi :** « Pose » avait été retiré du parcours prestation ; il revient ici. « Acte C » meta. Compression temps (« Passer au jour du rendez-vous ») magique sans une phrase « Dans la vraie vie, vous attendriez la date ».
- **Recommandation :** « Adapter la coiffure / la tension » ; expliquer la compression en une phrase ; retirer « acte C ».
- **Priorité :** Haute (pose + compression) ; Moyenne (acte C).

---

### Réalisation (jour J)

#### Demande du jour — `ExecutionDossierView.vue`

- **Constat :** Titre « Demande du jour » (plus « dossier » en UI). Ligne « Signalement d’un problème — non disponible ici » en opacity 60.
- **Pourquoi :** Ligne grisée **attire** l’œil et pose une question (« pourquoi me montrer ça ? ») — anti-pattern faux choix / branche morte.
- **Recommandation :** Retirer complètement de l’UI nominale.
- **Priorité :** Haute.

#### En cours — `ExecutionProgressView.vue` (**WHY perles**)

- **Constat :** Lead « Prix et durée affichés = ce qui est convenu maintenant. » Modal perles + paragraphe WHY (retour 9). CTA « Inès demande une modification » (déclencheur démo manuel).
- **Pourquoi :**
  1. WHY trop discret (voir retour 9).
  2. Le bouton manuel « Inès demande… » fait **jouer** l’événement : une 1ʳᵉ fois ne comprend pas si c’est elle qui invente la demande.
  3. Badge « Proposition en cours » alors que la prestation a déjà démarré — contradictoire.
- **Recommandation :** Auto-ouvrir le modal après démarrage (déjà prévu store) + titre WHY fort. Si bouton manuel conservé pour la démo : « Simuler : Inès demande des perles ». Badge « Prestation en cours ».
- **Priorité :** Haute.

#### Modification — `ExecutionModificationView.vue` (**WHY annotations**)

- **Constat :** Blocs « Pourquoi ici… » et « Ces **annotations**… » (retour 10). Motifs OK. Supplément/durée figés « Dans cette démo » (bon vs faux choix). « Consentement Inès », « Preuve · ».
- **Pourquoi :** « Annotations / Consentement / Preuve » = juridique. Double badge « Modification ».
- **Recommandation :** Voir retour 10. « Accord d’Inès » plutôt que « Consentement ». Une seule explication WHY visible above the fold.
- **Priorité :** Haute.

#### Clôture — `ExecutionCompleteView.vue`

- **Constat :** « Comment terminer ? » ; options hors-rail grisées `opacity-40` encore **visibles** (« Non disponible ici »). Lead « Pour la démo : réalisation complète. »
- **Pourquoi :** Montrer 2 options mortes = bruit (passe 1 encore vraie). « intégralement » long.
- **Recommandation :** Un seul CTA « Terminer — prestation réalisée ». Retirer les options mortes de l’écran.
- **Priorité :** Haute.

---

### Règlement / relation

#### Règlement — `SettlementView.vue`

- **Constat :** Séquence et libellés finance largement humanisés (passe 1). « Revenu net {{ displayName }} » mis en avant — bon.
- **Pourquoi :** Titre « Règlement » un peu admin ; « Solde » dans le pied. « Simulateur · Inès » répété.
- **Recommandation :** « Paiement » / « Ce qu’Inès a payé ». OK de garder le détail frais.
- **Priorité :** Basse / Moyenne.

#### Avis & relation — `RelationView.vue`

- **Constat :** Dimensions déjà en FR simple (« Rapport qualité-prix », « Gestion des changements »). « Infos retenues sur Inès ». Fin « Fin de démonstration ». CTA « acte E ».
- **Pourquoi :** Beaucoup d’écrans « sheet » successifs (réponse → favori → infos → merci) : rythme démo OK, mais charge cognitive. « Favorites » anglicisme.
- **Recommandation :** « Coups de cœur » / « Coiffeuses préférées ». Alléger les ghost « Revoir le constat ».
- **Priorité :** Moyenne.

---

### Navigation & composants transverses

#### `ProductNav`

- **Constat :** « Opportunités » actif sur engagement **et** settlement ; « Rendez-vous » aussi sur settlement → **deux onglets** peuvent paraître actifs / liés. « Profil » toujours disabled.
- **Pourquoi :** Une 1ʳᵉ fois clique Profil / se demande où est le paiement.
- **Recommandation :** Un seul onglet actif en Acte E ; masquer ou expliquer Profil (« bientôt »).
- **Priorité :** Moyenne.

#### Toasts vs bandeau vs « Simulateur »

- **Constat :** Trois systèmes disent « Inès est simulée » avec des mots différents.
- **Pourquoi :** Redondance utile une fois, puis bruit.
- **Recommandation :** Bandeau = vérité continue ; toast = événement ; retirer « Simulateur · » au profit de « Inès (simulée) ».
- **Priorité :** Basse.

---

## Lexique à retirer / remplacer

| Actuel (extraits UI) | Problème | Remplacer par |
| -------------------- | -------- | ------------- |
| Persona | Recherche | « Vous dans cette démo » / retirer |
| Acte B / C / D / E · acte précurseur | Protocole | « Cette étape » / retirer |
| Scène X/3 · Scène Y/5 | Numérotation opaque | « Étape … » unifiée ou retirer |
| précurseur · prototype | Meta | Retirer |
| proposition / offre **ferme** | Formel | « Proposition » |
| Opportunités · Invitation | Marketplace | « Demandes » · « Nouvelle demande » |
| dossier (URL / routes) | Formel | `demande` / `jour` |
| Faisabilité | PM | « Votre décision » / « Pouvez-vous réaliser ? » |
| Engagement (titre) | Juridique | « Confirmation » |
| annotations | Technique | « Trace du changement » / « Ce qui a été accepté » |
| Preuve · Consentement | Juridique | « Détail · Accord » |
| compatible · injectée | Technique / abstrait | « qui correspond » · « arrivée » |
| conséquence (planning) | Jargon | « Grâce à vos horaires… » |
| SCHEDULE_ACTIVE · codes machine restants | Machine | Français uniquement |
| Issu de votre cadre | Meta (~hérité) | « Comme dans votre cadre » |
| niveau de preuve | Plateforme | Retirer / « photos de cette prestation » |
| Canal · indicatif | Admin | « Où vous écrire » · « habituel » |
| Politiques | Admin | « Règles » |
| Small / Medium / Large · Off | EN | FR métier · « Non » |
| Réalisation déclarée · Cible démo | Meta | « Photo de réalisation » |
| droit à la pause | Juridique | « Vos pauses » |
| jusqu’à l’engagement | Formel | « jusqu’à confirmation du RDV » |
| tension excessive | Un peu clinique | « douleur forte ou malaise » |
| adapter la pose | Lexique retiré ailleurs | « adapter la coiffure » |
| Favorites | EN | « Coups de cœur » |
| Signalement… non disponible ici | Branche morte | Retirer |

---

## Priorisation recommandée

### Top 8 (ordre suggéré)

1. **Purger le protocole visible** (Acte / Scène / précurseur / prototype / SCHEDULE_ACTIVE / injectée / Persona) des écrans métier — démarrage, succès planning, dashboard, feedbacks.
2. **Figer vraiment les défauts plateforme** (photos + interruption) : style non-`choice-active`, lecture seule évidente.
3. **Renforcer WHY jour J** (perles + trace d’accord) en titre visible, sans le mot « annotations ».
4. **Finir « dossier »** : routes `/demande`, plus aucune occurrence utilisateur ; alléger « faisabilité ».
5. **Discoverability post-précision** : zone « nouveaux » = photo + réponses, ancre inratable.
6. **Retirer branches mortes visibles** (signalement jour J, options de clôture grisées, Profil mort sans explication).
7. **Lexique prestation EN** (Off, sizes) + « conséquence » planning + « niveau de preuve ».
8. **Dynamiser le rail Inès** depuis offre / planning / cadre (toujours vrai) pour que la 1ʳᵉ fois voie *ses* choix revenir.

### Quick wins

- Remplacer « acte X » dans tous les CTA « Donner mon retour ».
- Succès planning : 3 lignes métier + 1 CTA, zéro jargon.
- Consentement photos : fond gris neutre.
- Modal perles : 1 phrase WHY en `text-sm font-semibold`.
- Clôture : 1 bouton.

---

## Écarts vs passe 1 (fichier 5) — ce qui est nouveau vs déjà signalé

### Déjà signalé en passe 1 — **encore vrai** (ou partiellement) dans le code

| Thème passe 1 | État actuel |
| ------------- | ------------- |
| Rail non dynamique | Toujours `INES_RAIL` / dérivés ; pas de lien fort offre→demande |
| Faux choix multi-options | Amélioré (mèches, +10 €) ; **reste** clôture hors-rail visible |
| Meta « acte / protocole » dans feedbacks | Toujours « acte B/C/D/E », « acte précurseur » |
| « Offre ferme » | Encore dashboard / succès planning |
| ProductNav flou en règlement | Toujours |
| Branches mortes (« non disponible ») | Jour J signalement ; clôture options |

### Déjà signalé en passe 1 — **largement corrigé** (ne pas re-traiter comme ouvert)

États machine EN massifs, « déterministe », « imputation », « qualification », « Tâches cliente », « Panneau », « tension légère » CTA, « offre ferme » sur sent view, beaucoup de leads formels, synthèse proofs, case relecture hardcodée, dimensions avis, etc.

### **Nouveau** dans cette passe 2 (œil 1ʳᵉ fois + retours user)

- Exigence explicite d’**identité Inès dans les toasts** (implémentée ; à figer comme standard)
- **Style locked encore trop « choice »** (photos) — angle visuel plus que sémantique
- **Purge globale « dossier »** au-delà du titre (URL / IA mentale)
- **WHY perles / WHY annotations** comme critère produit central du jour J
- Discoverability **ajouts après précision** (partiel → à finir)
- Focus **Accueil / Cadre / Prestation / Planning** (hors périmètre fichier 5) : Persona, Off, conséquence, niveau de preuve, option annulation « Définir… », Scène 1/3↔2/5
- Retour du mot **« pose »** en consignes préparation
- Fatigue cognitive des **trois couches** bandeau / simulateur / toast
- Option annulation non actionnable « Définir ses règles d’annulation »

### Volumétrie indicative (passe 2)

| Zone | Findings actionnables (approx.) | dont Haute |
| ---- | ------------------------------- | ---------- |
| Retours user confirmés (10) | 10 (dont plusieurs partiellement faits) | 7 |
| Démarrage / dashboard / bandeau | ~8 | 4 |
| Cadre | ~12 | 4 |
| Prestation | ~8 | 2 |
| Planning | ~7 | 3 |
| Opportunités | ~10 | 4 |
| Engagement | ~6 | 2 |
| Réalisation | ~10 | 5 |
| Règlement / nav | ~6 | 1 |
| **Total (hors strict doublons passe 1)** | **~70+** | **~30** |

---

## Méthode & sources

Analyse basée sur le code actuel de `demo-precurseur` (vues Vue, `domain/model.js`, stores, `simulationToast.js`, CSS `choice-locked`). Comparaison avec `construction-demo/5-analyse-retours-actes-suivants.md` pour marquer corrigé / résiduel / nouveau.

**Livrable :** `construction-demo/6-analyse-passe-coiffeuse-premiere-fois.md` — analyse seule, pas d’implémentation dans ce lot.
`)