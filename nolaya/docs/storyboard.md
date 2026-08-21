# Storyboard cliente — MVP lancement

## Statut

**STEP 2 du cadrage cliente (D10–D18).** Histoire des moments observables du parcours sans compte. Ce fichier n’est pas un user-flow, ni une table de transitions, ni une spec d’écrans, ni un prompt Stitch.

User-flow cliente (STEP 3) : [user-flow.md](./user-flow.md) — **fait**. Transitions cliente (STEP 4) : [transitions.md](./transitions.md) — **fait**. Prochaine étape du protocole au moment de la rédaction initiale : specs d’écrans cliente — **fait** depuis [screen-specs.md](./screen-specs.md).

## Sources verrouillées

- [D10–D18](../user-stories/decisions-produit.md)
- [US étapes 1–3, 6](../user-stories/) — adaptées au MVP lancement dans les prompts et specs
- [protocole-conception-mvp.md](./protocole-conception-mvp.md)

« Coiffeuse trouvée » au lancement n’est **pas** le dossier **READY** de l’étape 8 (D04). C’est un oui humain consigné **et** la reconfirmation du lieu, du budget et de la période (D20).

## Personae

| Rôle | Persona | Fil | Ce qu’elle fait ici |
| --- | --- | --- | --- |
| Visiteuse / cliente | **Inès** | **A — guidé** | Décrit son besoin, lance le matching, choisit une candidate, envoie **Faire vérifier** |
| Visiteuse / cliente | **Léa** | **B — libre** | Parcourt le catalogue d’offres réelles, ouvre une fiche, envoie **Faire vérifier** sans demande QUALIFIED |
| Coiffeuse (hors app) | **Aïcha** | — | N’a ni compte ni écran cliente. Jointe par la conciergerie après envoi |
| Opératrice interne | **Alex** | — | Traite le dossier hors scène cliente (voir [storyboard-admin.md](./storyboard-admin.md)) |

## Ce que ce storyboard ne fait pas

Pas d’inventaire d’URL (→ user-flow). Pas de comparaison 2–5, OTP, stratégie multi-destinataires, paiement, onglet Rendez-vous. Pas de géoloc « autour de moi » (D17). Pas d’écran Inspiration ou Aperçu séparés (D14).

---

## Fil B — Léa (libre)

### 1.1 — Arrivée et choix de porte

**US-01.1 · D11, D13, D18**

Léa arrive sur l’accueil sans compte. Nolaya promet de l’aider à trouver une coiffeuse qui lui correspond — pas de réservation. Deux portes : **Explorer** ou **Trouver ma coiffeuse**. Léa choisit **Explorer**.

Rien n’est encore retenu, qualifié ou envoyé. Le chrome montre **Découvrir** actif ; **Ma demande** et **Suivi** inactifs.

### 1.2 — Catalogue d’offres réelles

**US-01.2 · D10, D13**

Léa voit **Découverte** : plusieurs séries horizontales de **vraies offres** (coiffeuse identifiable, ville, prix avec certitude, disponibilité **déclarée**). Chaque carte est un carré **1:1**, peu de texte. Ce n’est pas une grille Pinterest, pas une photo héroïque plein écran.

Parcourir ne crée pas de demande QUALIFIED et ne contacte personne.

**Variante 1.2-vide.** Le catalogue est vide. Message honnête ; la sortie reste **Trouver ma coiffeuse** / **Décrire mon besoin**.

### 1.3 — Ouvrir une fiche prestation

**US-01.4 · D14**

Léa ouvre l’offre d’**Aïcha** — knotless braids, Paris. Une seule destination `/offre/:id` : identité, prix (déclaré / à confirmer), disponibilité déclarée, description courte. Pas de numéro de téléphone de la coiffeuse. Pas de « Réserver ».

### 1.4 — Disclaimer non bloquant

**D11, D16**

Sur la fiche (variante catalogue), un texte discret rappelle : décrire son besoin augmente les chances de tomber juste — **mais** elle peut aussi poursuivre avec cette offre. Pas de case à cocher, pas de modal qui bloque.

### 1.5 — Faire vérifier sans qualification

**D11, D12, D16**

Léa choisit **Faire vérifier**. Nolaya vérifiera le **match**, pas un rendez-vous confirmé. Elle n’a pas passé par le wizard : seule **cette offre** sera portée à la soumission. Personne n’est contacté.

---

## Fil A — Inès (guidé)

### 2.1 — Décrire le résultat souhaité

**US-02.1, US-02.2 · D11**

Inès a choisi **Trouver ma coiffeuse** à l’accueil. Elle décrit knotless braids mi-dos, longueur, couleur — « Je ne sais pas » reste valable. Brouillon seulement.

### 2.2 — Contraintes importantes

**US-02.5**

Inès marque ce qui est obligatoire (ex. refus de tension forte) et une priorité principale. Les obligatoires excluront des offres plus tard.

### 2.3 — Où et quand

**US-02.3, US-02.5 · D17**

Ville **saisie** (Paris). Pas de « autour de moi ». Date souhaitée et date limite distinctes. Lieu : salon / domicile (ville seulement) / à confirmer.

### 2.4 — Budget et fournitures

**US-02.4**

Budget cible et maximum distincts. Mèches : elle les apporte, la coiffeuse les fournit, ou à confirmer. « Fournir » ≠ gratuit.

### 2.5 — Résumé et recherche

**US-02.6**

Inès relit tout. **Rechercher** ne part que si le résumé est complet → demande **QUALIFIED**. Aucune coiffeuse contactée.

### 3.1 — Résultats du matching

**US-03.1 adapté · D13, D16**

Inès voit **1 à 3** candidates en **masonry** (hauteurs variables — pas le layout Découverte). Chaque carte : coiffeuse, ville, prix, disponibilité déclarée, raisons et écarts. Candidate **≠** coiffeuse confirmée.

Elle peut ouvrir une fiche ou **Faire vérifier** depuis la liste.

### 3.2 — Fiche depuis le matching

**D14**

Même objet `/offre/:id`, variante **from_match** : bandeau « Selon ta demande » avec raisons / écarts. Pas de disclaimer 1.4 (déjà QUALIFIED).

### 3.A — Aucun résultat

**US-03.8 adapté**

Aucune offre ne respecte toutes les contraintes obligatoires. Nolaya explique pourquoi. **Un seul** levier explicite au plus — jamais de relâchement silencieux d’une contrainte obligatoire. Sinon retour au résumé.

---

## Convergence — soumission et suivi (fil A + B)

### 6.1 — Tes coordonnées

**US-06 adapté · D12, D15**

Inès ou Léa arrive ici. Recap : pour Inès, demande QUALIFIED + candidate ; pour Léa, offre seule.

Prénom + **un** canal (téléphone **ou** e-mail). Avertissement obligatoire : coordonnées enregistrées **telles que saisies**, Nolaya ne les confirme pas. Pas d’OTP.

**Faire vérifier** a déjà signifié : la conciergerie vérifiera le **match** — pas la vérification du téléphone ici.

### 6.2 — Demande envoyée

Un dossier unique est créé. Personne n’est contacté tout de suite. Référence humaine (ex. NOL-1842) — **insuffisante** pour ouvrir le suivi. CTA **Suivre ma demande** avec jeton opaque.

Ce n’est pas une réservation.

### 6.3 — Suivi

**D18, D20**

Une seule URL `/suivi/:jeton`, **six** états possibles :

| État | Signification observable |
| --- | --- |
| Demande reçue | Dossier arrivé ; match pas encore confirmé |
| Recherche en cours | Traitement ; pas de RDV confirmé |
| Précision nécessaire | Un point doit être clarifié |
| Coiffeuse trouvée | Oui humain + lieu, budget, période reconfirmés |
| Aucune coiffeuse confirmée | Politique épuisée sans confirmation |
| Demande abandonnée | Dossier inactif |

Jeton invalide → accueil avec message (pas un 7ᵉ écran Suivi).

---

## Moments transverses (garde-fous)

Ces moments ne forment pas un troisième fil. Ils empêchent les STEPs suivants d’inventer ce que D10–D18 excluent.

### Lien mort ou offre retirée

Un lien public `/inspirations/:id` ou une offre inactive redirige vers l’accueil ou Découverte avec un message — pas une fiche utilisable.

### Rejeu de l’envoi

Envoyer deux fois la même demande ne crée pas un second dossier (variante readonly sur S11).

### Chrome

Taper **Ma demande** sans brouillon ni recherche : zone visible, inactive — pas de destination inventée. Idem **Suivi** sans jeton.

### Hors MVP visible cliente

OTP, login, paiement, comparer 2–5, Retenir 1–5, onglet Rendez-vous, contacter Aïcha directement, géoloc — absents ou refusés.

---

## Pont vers l’admin

Moments 6.1–6.3 côté cliente. Dès l’envoi, le dossier apparaît dans la file interne (Alex). Voir [storyboard-admin.md](./storyboard-admin.md) — pont **Faire vérifier → dossier**.

Inès = fil A (QUALIFIED + candidate). Léa = fil B (offre seule). Même pont, contenu différent.
