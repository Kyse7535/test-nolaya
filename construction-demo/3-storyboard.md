Voici la transformation du cas Sarah/Inès en storyboard d’écrans mobile-first. Le parcours contient 18 écrans : 16 écrans du produit et 2 écrans réservés au dispositif de démonstration.

> **Précurseur :** pour la création réelle du cadre, des prestations et du planning (au lieu de l’Acte A accéléré ci-dessous), voir `3-storyboard-precurseur.md` / `3-storyboard-precurseur-cible.md`. En parcours enchaîné, ce storyboard reprend à l’Écran 6. Déclencheur Inès : `SCHEDULE_ACTIVE` (plus `CAPACITY_OPEN`).

La coiffeuse utilise réellement l’application. Les actions d’Inès sont déclenchées automatiquement par les décisions de Sarah.

## Cadre visuel permanent de la démo

Un bandeau discret, absent de l’application finale, reste affiché en haut :

> **Mode démo — Inès est une cliente simulée · Étape 4 sur 8**

Il permet uniquement de :

* comprendre que la cliente est simulée ;
* voir l’avancement ;
* réinitialiser le scénario ;
* quitter la démonstration.

La navigation produit reste réaliste :

> Accueil · Demandes · Rendez-vous · Prestations · Profil · bientôt

---

# Acte A — Valider offre et planning

*Chemin court.* Sarah **valide et active** un existant (cadre + offre + planning), sans les créer de zéro. Pas d’objet « capacité » ni d’état `CAPACITY_OPEN`. Pour la création réelle, voir le précurseur.

## Écran 1 — Démarrer la démonstration

| Élément           | Contenu                                                                                  |
| ----------------- | ---------------------------------------------------------------------------------------- |
| Objectif          | Présenter le scénario sans dévoiler toutes les réactions                                 |
| Titre             | « Testez une réservation complète »                                                      |
| Persona           | Inès, 27 ans, cherche des knotless braids pour le 15 août                                |
| Mission           | « Préparez votre offre, traitez sa demande et suivez le rendez-vous jusqu’au règlement » |
| Information       | Durée estimée : 12 à 15 minutes                                                          |
| Action principale | **Commencer**                                                                            |
| Nature            | Écran exclusivement réservé à la démo                                                    |

---

## Écran 2 — Tableau de bord de Sarah

Sarah arrive dans une application qui contient déjà un brouillon réaliste.

| Zone                 | Contenu                                               |
| -------------------- | ----------------------------------------------------- |
| En-tête              | Bonjour Sarah                                         |
| Indicateur principal | « Votre activité n’est pas encore ouverte »           |
| Carte à traiter      | « Knotless braids moyen — configuration à terminer » |
| Résumé               | Prix, durée, galerie et planning partiellement prêts  |
| Action principale    | **Finaliser ma prestation**                           |
| Action secondaire    | Consulter mes règles de travail                       |

La démo évite ainsi de demander à Sarah de créer un catalogue complet.

---

## Écran 3 — Règles générales de travail

Cet écran concerne les règles applicables à l’ensemble de son activité, et non une prestation particulière.

| Bloc              | Valeur préremplie                  |
| ----------------- | ---------------------------------- |
| Retard toléré     | 15 minutes                         |
| Annulation        | Définir ses règles d’annulation    |
| Report            | Un report autorisé sous conditions |
| Accompagnants     | Non autorisés                      |
| Paiement du solde | À la fin de la prestation          |
| Communication     | Via la plateforme                  |
| Action principale | **Valider mes règles**             |

Sarah peut modifier une règle avant de continuer.

**État produit :** `PROFESSIONAL_FRAMEWORK_ACTIVE` (confirmé)

**Sortie :** cadre professionnel validé.

---

## Écran 4 — Configurer la prestation

### Titre

> Knotless braids moyen — mi-dos

L’écran est organisé en sections courtes :

| Section               | Informations                                      |
| --------------------- | ------------------------------------------------- |
| Résultat              | Knotless moyen, longueur mi-dos                  |
| Prix                  | 150 €                                             |
| Fournitures           | Mèches fournies : +20 €                           |
| Durée                 | 5 h 30                                            |
| Lieu                  | En salon à Saint-Denis                            |
| Cliente doit préparer | Cheveux lavés et démêlés                          |
| Limites               | Cuir chevelu sensible accepté  |
| Charge                | Un rendez-vous maximum par jour *(rappel planning)* |

La galerie contient déjà trois emplacements. Sarah sélectionne trois réalisations liées à cette prestation.

**Action principale :** `Enregistrer la prestation`

**État produit :** `OFFER_ACTIVE` (validée)

---

## Écran 5 — Confirmer le planning

Sarah confirme un planning réel dont le créneau Inès est une conséquence, pas un objet « capacité ».

| Élément             | Valeur                    |
| ------------------- | ------------------------- |
| Jours ouvrés        | Mardi à samedi            |
| Horaires            | 9 h – 18 h                |
| Lieu                | Salon, Saint-Denis        |
| Limite              | 1 rendez-vous / jour      |
| Conséquence visible | Samedi 15 août dès 9 h    |
| Durée bloquée (aperçu) | 5 h 30 *(mi-dos)*      |
| Prestation associée | Knotless braids moyen    |
| Action principale   | **Activer mon planning**  |

Après validation :

> « Vous pouvez maintenant recevoir des demandes. »

**État produit :** `SCHEDULE_ACTIVE`

Une demande simulée est alors injectée (déclencheur = activation du planning).

---

# Acte B — Recevoir et traiter une opportunité

## Écran 6 — Nouvelle demande

Sarah reçoit une notification puis accède à la rubrique « Demandes ».

### Carte de demande

> **Inès — Knotless braids moyen**
> Samedi 15 août à 9 h · Saint-Denis
> Budget maximum : 180 €

La plateforme explique pourquoi Sarah a été sollicitée :

* prestation / offre correspondante ;
* créneau dérivé du planning ;
* zone compatible ;
* budget compatible ;
* cuir chevelu sensible accepté.

**Action principale :** `Examiner la demande`

L’interface ne dit pas « cliente idéale » ou « score 92 % » sans explication.

---

## Écran 7 — Demande d’Inès

Cet écran doit permettre à Sarah de décider sans parcourir des messages privés.

### Structure de l’écran

| Bloc                  | Contenu                                      |
| --------------------- | -------------------------------------------- |
| Résultat souhaité     | Knotless moyen, longueur mi-dos            |
| Inspiration           | Image sélectionnée par Inès                  |
| Cheveux et confort    | Cheveux naturels crépus, cuir chevelu sensible   |
| Date et lieu          | 15 août, 9 h, Saint-Denis                    |
| Budget                | Cible 170 €, maximum 180 €                   |
| Fournitures           | Mèches souhaitées auprès de la coiffeuse     |
| Tâches cliente        | Laver et démêler ses cheveux                 |
| Priorité              | Confort et faible tension                    |
| Information manquante | Aucune photo récente des cheveux             |

### Actions

* `Demander une précision`
* `Préparer une proposition`
* `Refuser`

Sarah choisit **Demander une précision**.

---

## Écran 8 — Clarification avec la cliente

Un panneau s’ouvre sans transformer le parcours en messagerie libre.

### Sarah sélectionne les précisions

* Photo récente des cheveux ;
* Allergies aux produits (optionnel) ;
* Question complémentaire facultative.

**Action principale :** `Envoyer la demande`

Le simulateur affiche ensuite :

> « Inès consulte votre demande… »

Puis la réponse préparée apparaît :

> « Voici une photo récente. Je n’ai pas fait de défrisage depuis huit mois. »

La photo rejoint automatiquement le demande initiale. L’échange reste tracé dans la chronologie.

**Action suivante :** `Préparer une proposition`

---

## Écran 9 — Produire la proposition ferme

Sarah transforme la demande en engagement professionnel précis.

| Élément           | Proposition                            |
| ----------------- | -------------------------------------- |
| Prestation        | Knotless braids moyen, cuir chevelu sensible |
| Prix de base      | 150 €                                  |
| Mèches fournies   | 20 €                                   |
| Prix total        | 170 €                                  |
| Durée             | 5 h 30                                 |
| Créneau           | 15 août, 9 h                           |
| Lieu              | Salon, Saint-Denis                     |
| Tâche cliente     | Cheveux lavés et démêlés               |
| Tâche coiffeuse   | Fournir les mèches et le matériel      |
| Versement initial | 50 €                                   |
| Validité          | 30 minutes                             |

Sarah peut modifier chaque élément et consulter un aperçu de ce qu’Inès recevra.

**Action principale :** `Envoyer la proposition`

Après l’envoi :

* `FIRM_PROPOSAL` est créé ;
* le créneau passe en `SOFT_HOLD` ;
* un compteur de validité apparaît.

---

# Acte C — Former l’engagement et préparer le rendez-vous

## Écran 10 — Proposition acceptée

Le simulateur exécute successivement :

1. l’acceptation exacte par Inès ;
2. le consentement aux règles ;
3. le versement initial de 50 €.

Sarah reçoit une confirmation :

> **Rendez-vous confirmé avec Inès**

| Élément sécurisé   | Valeur         |
| ------------------ | -------------- |
| Version acceptée   | Proposition V1 |
| Prix convenu       | 170 €          |
| Versement reçu     | 50 €           |
| Solde prévisionnel | 120 €          |
| Créneau            | Confirmé       |
| Consentement       | Enregistré     |
| Preuve de paiement | Disponible     |

**État produit :** `COMMITTED`

**Action principale :** `Préparer le rendez-vous`

---

## Écran 11 — Préparation du rendez-vous

L’écran présente deux checklists distinctes.

### Checklist Sarah

* Mèches disponibles ;
* Matériel préparé ;
* Poste de travail disponible ;
* Consignes particulières consultées.

### Checklist Inès

* Cheveux lavés ;
* Cheveux démêlés ;
* Adresse et accès consultés ;
* Rendez-vous reconfirmé.

Lorsque Sarah confirme ses éléments, le simulateur complète ceux d’Inès.

L’état passe successivement de :

> `READINESS_PENDING` → `READY`

Le résultat est formulé clairement :

> « Toutes les conditions nécessaires sont satisfaites. »

---

# Acte D — Réaliser et coordonner la prestation

## Écran 12 — Demande du jour

Le jour du rendez-vous est simulé immédiatement.

| Zone                | Contenu                               |
| ------------------- | ------------------------------------- |
| Cliente             | Inès                                  |
| Heure prévue        | 9 h                                   |
| Heure d’arrivée     | 8 h 57                                |
| Prestation          | Knotless braids moyen                |
| Prix convenu        | 170 €                                 |
| Consignes sensibles | Cuir chevelu sensible, cuir chevelu sensible |
| Préparation         | Complète                              |
| Action principale   | **Commencer la prestation**           |
| Action secondaire   | Signaler un problème                  |

Sarah démarre.

**État produit :** `IN_PROGRESS`

---

## Écran 13 — Prestation en cours

L’écran devient un écran opérationnel simplifié :

* heure réelle de début ;
* prestation convenue ;
* prix actuel ;
* durée estimée ;
* chronologie des événements ;
* bouton « Signaler un événement ».

Une notification simulée apparaît :

> **Inès demande une modification**
> Ajouter des perles à la coiffure.

Actions proposées à Sarah :

* `Évaluer la modification`
* `Refuser la modification`

Sarah choisit de l’évaluer.

---

## Écran 14 — Proposer une modification

La plateforme demande de rendre les conséquences explicites.

| Champ                | Valeur saisie                         |
| -------------------- | ------------------------------------- |
| Modification         | Ajout de perles                       |
| Supplément           | +10 €                                 |
| Durée supplémentaire | +20 minutes                           |
| Nouveau total        | 180 €                                 |
| Nouvelle durée       | 5 h 50                                |
| Motif                | Option demandée pendant la prestation |

**Action principale :** `Demander l’accord d’Inès`

Le simulateur accepte la modification.

L’écran affiche alors :

> « Modification acceptée par Inès à 11 h 18. »

La proposition V1 reste consultable. Une version V2 devient l’engagement actif.

---

## Écran 15 — Terminer la prestation

En fin de réalisation, Sarah voit le résumé :

* prestation initiale réalisée ;
* perles ajoutées ;
* aucune interruption ;
* aucun incident ;
* durée réelle ;
* prix final : 180 €.

Sarah doit choisir :

* `Prestation réalisée intégralement`
* `Prestation réalisée partiellement`
* `Déclencher une résolution`

Elle sélectionne la première option.

**État produit :** `COMPLETED`

---

# Acte E — Régler et prolonger la relation

## Écran 16 — Règlement

L’écran sépare clairement le prix facturé du revenu de Sarah.

| Élément                  |                    Montant |
| ------------------------ | -------------------------: |
| Prestation initiale      |                      170 € |
| Modification acceptée    |                       10 € |
| Total final              |                      180 € |
| Versement initial déjà payé / déduit |                      −50 € |
| Solde dû par Inès        |                      130 € |
| Frais de plateforme      | À afficher selon le modèle |
| Revenu net Sarah         |      Calculé explicitement |

Le simulateur règle les 130 €.

L’écran confirme :

> « Paiement terminé — aucune somme restante. »

Sarah peut télécharger ou consulter la preuve.

**État produit :** `SETTLED`

---

## Écran 17 — Avis et relation cliente

L’avis simulé d’Inès apparaît après le règlement.

| Dimension                    | Évaluation |
| ---------------------------- | ---------- |
| Résultat technique           | 5/5        |
| Communication                | 5/5        |
| Ponctualité                  | 5/5        |
| Conformité du prix           | 5/5        |
| Confort                      | 4/5        |
| Résolution des modifications | 5/5        |

Commentaire :

> « Sarah a bien pris en compte mon cuir chevelu sensible et m’a expliqué le supplément avant d’ajouter les perles. »

Sarah peut écrire une réponse courte.

L’écran indique également qu’Inès :

* a ajouté Sarah à ses favorites ;
* consent à mémoriser ses préférences ;
* pourra reprendre cette prestation depuis son historique.

**Action principale :** `Répondre à l’avis`

**Action suivante :** `Voir la fiche cliente`

---

## Écran 18 — Fin de la démonstration

Cet écran appartient uniquement au protocole de test.

### Résumé montré à Sarah

> Vous avez reçu une demande structurée, obtenu une précision, sécurisé une proposition, préparé le rendez-vous, fait accepter une modification et reçu le règlement final.

### Questions de recherche

* Quelles informations manquaient dans la demande ?
* Qu’auriez-vous demandé habituellement par message ?
* Le prix et le versement initial étaient-ils compréhensibles ?
* La checklist vous aurait-elle évité un problème réel ?
* La modification pendant la prestation vous semble-t-elle suffisamment sécurisée ?
* À quel moment le parcours vous a-t-il paru artificiel ?
* Utiliseriez-vous ce fonctionnement avec une vraie cliente ?

Actions :

* `Recommencer le scénario`
* `Tester un incident`
* `Terminer`

## Enchaînement fonctionnel final

| Écrans  | Décision principale de Sarah | Réaction simulée d’Inès           | État obtenu          |
| ------- | ---------------------------- | --------------------------------- | -------------------- |
| 2 à 5   | Valider offre + planning     | Demande injectée                  | `SCHEDULE_ACTIVE`    |
| 6 à 8   | Examiner et clarifier        | Précisions fournies               | Demande enrichie     |
| 9       | Produire une offre           | Offre acceptée                    | `FIRM_PROPOSAL`      |
| 10      | Constater l’engagement       | Consentement et versement         | `COMMITTED`          |
| 11      | Confirmer sa préparation     | Checklist cliente complétée       | `READY`              |
| 12      | Démarrer                     | Arrivée confirmée                 | `IN_PROGRESS`        |
| 13 à 14 | Encadrer une modification    | Modification acceptée             | Engagement V2        |
| 15      | Terminer                     | Résultat confirmé                 | `COMPLETED`          |
| 16      | Vérifier le règlement        | Solde payé                        | `SETTLED`            |
| 17      | Répondre à l’avis            | Favori et préférences enregistrés | Relation réactivable |

Le principe directeur est qu’un écran n’existe que s’il aide Sarah à comprendre une situation, prendre une décision professionnelle ou vérifier une preuve. Les réactions d’Inès font progresser le scénario, mais ne retirent jamais à Sarah une décision que la démo cherche à tester.
