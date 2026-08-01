# Domain Storytelling — Étape 8

## Produire la preuve et prolonger la relation

### Décision métier

> Que peut-on apprendre de l’expérience vécue et comment réutiliser cette expérience pour simplifier une prochaine transaction ?

L’étape 8 ne doit pas être réduite à « laisser une note ». Elle produit trois résultats distincts :

1. une **preuve factuelle** de ce qui s’est passé ;
2. un **retour d’expérience contextualisé** ;
3. une **relation réutilisable** pour une future demande.

Une réservation réglée doit entrer dans l’historique même si aucun avis n’est laissé. L’avis et la reprise de rendez-vous restent facultatifs.

---

## 1. Position dans le processus

### Déclencheur

L’étape commence lorsque le rendez-vous possède un résultat final et que sa situation financière est clôturée :

* prestation réalisée ;
* prestation partiellement réalisée ;
* prestation non réalisée mais situation résolue ;
* règlement finalisé : `SETTLED`.

### Préconditions

La plateforme connaît au minimum :

* l’engagement accepté ;
* la prestation prévue ;
* la prestation réellement réalisée, le cas échéant ;
* le prix initialement convenu ;
* le montant finalement réglé ;
* les retards, modifications ou incidents tracés ;
* la résolution appliquée, s’il y en a eu.

### Fin de l’étape

La fin fonctionnelle principale peut être représentée par :

`EXPERIENCE_RECORDED`

Cet état signifie que l’expérience est désormais enregistrée et réutilisable. Il ne signifie pas nécessairement qu’un avis a été publié ou qu’une nouvelle demande a été créée.

---

# 2. Acteurs

| Acteur               | Responsabilité                                                                                               |
| -------------------- | ------------------------------------------------------------------------------------------------------------ |
| Cliente              | Confirme le résultat, évalue l’expérience et décide si elle souhaite renouveler la relation                  |
| Coiffeuse            | Consulte le retour, répond à un avis ou signale un contenu problématique                                     |
| Plateforme           | Produit la preuve factuelle, adapte le questionnaire, publie les éléments autorisés et conserve l’historique |
| Opérateur de support | Examine les avis signalés et traite les contradictions ou contenus abusifs                                   |
| Future cliente       | Consulte les preuves et avis contextualisés pour prendre une décision                                        |

---

# 3. Objets métier

## Objets principaux

| Objet                  | Fonction                                                |
| ---------------------- | ------------------------------------------------------- |
| `ExperienceRecord`     | Photographie factuelle et immuable de l’expérience      |
| `OutcomeConfirmation`  | Confirmation du résultat réel du rendez-vous            |
| `Feedback`             | Évaluation multidimensionnelle fournie par la cliente   |
| `PublishedReview`      | Partie publique et modérée du retour                    |
| `ProviderResponse`     | Réponse publique de la coiffeuse                        |
| `ReviewReport`         | Signalement d’un avis ou d’une réponse                  |
| `HistoryEntry`         | Élément consultable dans l’historique de la cliente     |
| `FavoriteRelationship` | Préférence explicite pour une coiffeuse                 |
| `PreferenceConsent`    | Consentement à mémoriser certaines préférences          |
| `RepeatDemand`         | Nouvelle demande créée à partir d’une expérience passée |
| `SERVICE_GALLERY`      | Galerie de présentation propre à une prestation         |
| `GALLERY_ITEM`         | Contenu visuel proposé, publié ou archivé dans la galerie |
| `PublicationConsent`   | Consentement distinct pour prise de photo et publication |

## Objets à ne pas confondre

### Preuve factuelle

Elle provient des événements enregistrés par la plateforme :

* rendez-vous engagé ;
* prestation réalisée ou non ;
* montant payé ;
* résolution appliquée ;
* retards ou modifications tracés.

### Évaluation subjective

Elle représente le ressenti de la cliente :

* qualité technique ;
* communication ;
* ponctualité ;
* conformité du prix ;
* qualité de la résolution.

### Avis public

Il s’agit seulement de la partie de l’évaluation pouvant être présentée aux autres utilisatrices.

### Réputation

Elle est calculée à partir d’un ensemble d’expériences vérifiées. Elle ne doit pas être confondue avec un avis isolé.

---

# 4. Histoire métier principale

| N° | Acteur     | Activité                                                                | Objet manipulé                  | Événement produit                                  |
| -: | ---------- | ----------------------------------------------------------------------- | ------------------------------- | -------------------------------------------------- |
|  1 | Plateforme | Détecte la clôture du rendez-vous et du règlement                       | Rendez-vous, règlement          | `APPOINTMENT_SETTLED`                              |
|  2 | Plateforme | Reconstitue les faits vérifiés de l’expérience                          | `ExperienceRecord`              | `EXPERIENCE_RECORD_CREATED`                        |
|  3 | Plateforme | Détermine les dimensions pouvant être évaluées                          | Résultat, incidents, résolution | `REVIEW_ELIGIBILITY_COMPUTED`                      |
|  4 | Plateforme | Demande à la cliente de confirmer le résultat                           | `OutcomeConfirmation`           | `OUTCOME_CONFIRMATION_REQUESTED`                   |
|  5 | Cliente    | Confirme une prestation réalisée, partielle ou non réalisée             | `OutcomeConfirmation`           | `OUTCOME_CONFIRMED`                                |
|  6 | Plateforme | Présente un questionnaire adapté aux faits                              | `Feedback`                      | `FEEDBACK_REQUESTED`                               |
|  7 | Cliente    | Évalue les dimensions pertinentes                                       | `Feedback`                      | `FEEDBACK_SUBMITTED`                               |
|  8 | Plateforme | Vérifie le rattachement à une transaction réelle et l’unicité du retour | `Feedback`                      | `FEEDBACK_VERIFIED`                                |
|  9 | Plateforme | Enregistre les réponses privées et publie les éléments autorisés        | `PublishedReview`               | `REVIEW_PUBLISHED`                                 |
| 10 | Coiffeuse  | Consulte le retour reçu                                                 | `PublishedReview`               | `REVIEW_VIEWED_BY_PROVIDER`                        |
| 11 | Coiffeuse  | Répond à l’avis ou le signale                                           | Réponse ou signalement          | `PROVIDER_RESPONSE_SUBMITTED` ou `REVIEW_REPORTED` |
| 12 | Opérateur  | Modère le contenu signalé si nécessaire                                 | `ReviewReport`                  | `MODERATION_DECIDED`                               |
| 13 | Plateforme | Ajoute l’expérience à l’historique                                      | `HistoryEntry`                  | `HISTORY_UPDATED`                                  |
| 14 | Cliente    | Ajoute éventuellement la coiffeuse en favori                            | `FavoriteRelationship`          | `PROVIDER_FAVORITED`                               |
| 15 | Cliente    | Autorise éventuellement la mémorisation de préférences                  | `PreferenceConsent`             | `PREFERENCE_CONSENT_GRANTED`                       |
| 16 | Cliente    | Demande à refaire la prestation ou à revoir la coiffeuse                | `RepeatDemand`                  | `REPEAT_DEMAND_CREATED`                            |
| 17 | Plateforme | Préremplit une nouvelle demande avec les données réutilisables          | Nouvelle demande                | `DEMAND_PREFILLED_FROM_HISTORY`                    |
| 18 | Cliente    | Vérifie ce qui reste valable et modifie ce qui a changé                 | Nouvelle demande                | `REPEAT_DEMAND_CONFIRMED`                          |
| 19 | Plateforme | Propose éventuellement le résultat à la galerie de la prestation        | `GALLERY_ITEM`                  | `GALLERY_ITEM_PROPOSED`                            |
| 20 | Cliente    | Consent séparément à la prise de photo et à la publication              | `PublicationConsent`            | `PUBLICATION_CONSENT_GRANTED`                      |
| 21 | Coiffeuse  | Valide le contenu proposé à sa galerie de prestation                    | `GALLERY_ITEM`                  | `GALLERY_ITEM_PROVIDER_VALIDATED`                  |
| 22 | Plateforme | Publie la réalisation vérifiée dans la galerie de la prestation         | `SERVICE_GALLERY`               | `VERIFIED_REALIZATION_PUBLISHED`                   |

---

# 5. Déroulement détaillé

## Séquence 1 — Produire la preuve factuelle

Après `SETTLED`, la plateforme crée automatiquement un enregistrement d’expérience contenant :

* la prestation engagée ;
* sa version et ses variantes ;
* le résultat réel ;
* la date et le lieu ;
* la durée prévue et réelle, si elle est connue ;
* le prix convenu ;
* les modifications acceptées ;
* le prix final ;
* la présence éventuelle d’un incident ;
* la solution finalement appliquée.

Cette preuve existe indépendamment de l’avis.

> Une cliente qui ne laisse pas d’avis doit malgré tout retrouver son rendez-vous dans son historique.

La preuve ne doit pas être reconstruite à partir du commentaire de la cliente. Elle provient des données tracées pendant les étapes précédentes.

---

## Séquence 2 — Déterminer ce qui peut être évalué

La plateforme construit le questionnaire en fonction du résultat réel.

| Situation                         | Dimensions évaluables                                                                 |
| --------------------------------- | ------------------------------------------------------------------------------------- |
| Prestation entièrement réalisée   | Technique, réservation, communication, ponctualité, prix                              |
| Prestation partiellement réalisée | Partie technique effectivement réalisée, communication, ponctualité, prix, résolution |
| Prestation non réalisée           | Réservation, communication, ponctualité et résolution uniquement                      |
| Incident résolu                   | Expérience initiale et qualité de la résolution                                       |
| Aucun incident                    | Aucun questionnaire sur la résolution                                                 |
| Prix modifié avec consentement    | Clarté et conformité du prix final                                                    |
| Prix contesté                     | Retour sur le prix et sur la résolution                                               |

Cette adaptation empêche une cliente de noter la compétence technique d’une coiffeuse qui n’a réalisé aucune prestation.

---

## Séquence 3 — Confirmer le résultat

La cliente confirme l’un des résultats suivants :

* prestation réalisée comme prévu ;
* prestation réalisée avec modification acceptée ;
* prestation partiellement réalisée ;
* prestation non réalisée ;
* résultat encore contesté.

Si la déclaration contredit les événements enregistrés, la plateforme ne remplace pas silencieusement le résultat existant.

Elle crée une divergence :

`OUTCOME_DISPUTED`

Cette divergence peut déclencher une nouvelle intervention du support. L’avis public peut être suspendu jusqu’à ce que les faits concernés soient qualifiés.

---

## Séquence 4 — Recueillir un retour multidimensionnel

Le questionnaire doit séparer les différentes dimensions de l’expérience.

| Dimension     | Ce qu’elle mesure                              | Domaine principalement concerné |
| ------------- | ---------------------------------------------- | ------------------------------- |
| Technique     | Qualité du résultat pour la prestation précise | Compétence de la coiffeuse      |
| Réservation   | Clarté et simplicité du parcours               | Plateforme                      |
| Communication | Qualité des échanges utiles                    | Coiffeuse et parcours           |
| Ponctualité   | Respect de l’heure convenue                    | Coiffeuse ou rendez-vous        |
| Prix          | Conformité entre engagement et montant final   | Engagement et règlement         |
| Résolution    | Équité, rapidité et clarté de la solution      | Plateforme et support           |

Ces dimensions ne doivent pas être fusionnées sans contexte dans une note globale.

Par exemple, une mauvaise expérience de remboursement ne doit pas être interprétée automatiquement comme une mauvaise compétence technique de la coiffeuse.

### Retour public et retour privé

La cliente peut :

* donner des évaluations structurées ;
* ajouter un commentaire public facultatif ;
* envoyer un retour privé ;
* signaler un problème de sécurité ou un comportement sensible.

Un signalement sérieux ne doit pas être traité comme un simple avis négatif. Il doit rejoindre la branche de résolution ou le support.

---

## Séquence 5 — Donner un droit de réponse à la coiffeuse

Après publication, la coiffeuse peut :

* consulter l’avis ;
* répondre publiquement ;
* fournir un contexte complémentaire ;
* signaler un contenu abusif ou factuellement incohérent.

Elle ne peut pas :

* modifier l’avis ;
* conditionner une compensation à sa suppression ;
* intimider la cliente ;
* publier des informations personnelles ;
* négocier la note directement dans l’interface.

La réponse doit être rattachée à une version précise de l’avis.

---

## Séquence 6 — Signaler et modérer

Un avis ou une réponse peut être signalé pour :

* insultes ou menaces ;
* divulgation d’informations privées ;
* contenu discriminatoire ;
* absence de lien avec la prestation ;
* affirmation manifestement contradictoire avec les faits tracés ;
* tentative de manipulation ;
* usurpation ou fraude.

Le signalement ne supprime pas automatiquement l’avis.

Il crée le parcours suivant :

`PUBLISHED → FLAGGED → UNDER_REVIEW`

Puis l’opérateur décide :

* maintien ;
* masquage partiel ;
* anonymisation ;
* retrait ;
* demande de modification ;
* escalade vers le support.

La décision et son motif doivent être conservés.

---

## Séquence 7 — Transformer l’expérience en historique utile

La cliente retrouve une fiche synthétique contenant :

* la coiffeuse ;
* la prestation prévue et réalisée ;
* la date ;
* le lieu ou mode de prestation ;
* le prix final ;
* les options importantes ;
* l’avis laissé ;
* le résultat du rendez-vous ;
* la résolution éventuelle.

L’historique n’est donc pas seulement un registre de paiements. Il devient un point de départ pour une prochaine transaction.

---

## Séquence 8 — Reprendre une prestation

La cliente peut sélectionner :

* « Refaire cette prestation » ;
* « Revenir vers cette coiffeuse » ;
* « Repartir de cette demande ».

La plateforme crée alors une **nouvelle demande**, liée à l’ancienne expérience.

Elle peut préremplir :

* le type de prestation ;
* le résultat souhaité ;
* certaines préférences ;
* les tâches cliente ;
* le lieu habituel ;
* la coiffeuse précédemment choisie.

Elle doit obligatoirement faire reconfirmer :

* la date ;
* le créneau ;
* le lieu ;
* le budget ;
* la longueur ou variante ;
* les fournitures ;
* les contraintes actuelles ;
* les préférences mémorisées.

### Règle fondamentale

> Reprendre une prestation ne signifie pas reprendre automatiquement l’ancien prix, l’ancien créneau ou l’ancien engagement.

La reprise crée une nouvelle transaction :

`RepeatDemand → nouvelle demande → nouvelle proposition ferme → nouvel engagement`

Même avec une coiffeuse déjà éprouvée, la disponibilité, le prix et la faisabilité doivent être reconfirmés.

---

# 6. Principales variantes

## Variante A — Prestation réalisée et cliente satisfaite

1. La preuve est créée.
2. La cliente confirme le résultat.
3. Elle évalue les dimensions applicables.
4. L’avis est publié.
5. Elle ajoute la coiffeuse en favori.
6. Elle pourra reprendre la prestation depuis son historique.

## Variante B — Prestation réalisée avec problème résolu

1. La prestation est confirmée.
2. L’incident et sa résolution figurent dans la preuve.
3. La cliente évalue séparément la technique et la résolution.
4. La coiffeuse peut répondre.
5. L’avis est contextualisé par l’existence d’une résolution.

## Variante C — Prestation non réalisée

1. L’expérience reste enregistrée.
2. Aucun avis technique n’est proposé.
3. La cliente peut évaluer la réservation, la communication, la ponctualité et la résolution.
4. La coiffeuse ne reçoit aucune note de compétence technique.

## Variante D — Prestation partiellement réalisée

La cliente ne peut évaluer techniquement que la partie réellement exécutée.

Si cette partie ne peut pas être identifiée clairement, le retour technique est conservé comme commentaire contextualisé, sans alimenter automatiquement la note technique publique.

## Variante E — Avis signalé

1. La coiffeuse signale l’avis.
2. Le contenu entre en modération.
3. L’opérateur consulte l’expérience factuelle.
4. Il maintient, masque ou retire le contenu.
5. La décision est tracée.

## Variante F — Retour vers la même coiffeuse

1. La cliente ouvre une expérience passée.
2. Elle choisit « Revenir vers cette coiffeuse ».
3. Une demande ciblée est créée.
4. La coiffeuse reçoit une nouvelle sollicitation.
5. Elle doit produire une nouvelle proposition ferme.

## Variante G — Absence de consentement

La plateforme conserve l’historique nécessaire à la transaction, mais :

* ne déduit pas automatiquement de préférences marketing ;
* ne déclenche pas de rappels commerciaux ;
* ne personnalise pas les futures propositions à partir de données facultatives ;
* ne publie aucun contenu dans la galerie de prestation.

## Variante H — Enrichissement de la galerie de prestation

Après une prestation terminée et avec le consentement approprié, une nouvelle réalisation peut enrichir automatiquement la galerie **de la prestation concernée** (`SERVICE_GALLERY`), et non une galerie générale de la coiffeuse.

Le flux devient :

```text
Prestation réalisée
        ↓
Résultat confirmé
        ↓
Consentement de publication
        ↓
Contenu proposé à la galerie
        ↓
Validation de la coiffeuse
        ↓
Réalisation vérifiée publiée
```

L’étape 8 ne crée que des contenus de type `VERIFIED_REALIZATION`. Elle ne convertit jamais silencieusement une `DECLARED_REALIZATION` ni une `REFERENCE_INSPIRATION` en réalisation vérifiée. Tout contenu affiché doit rester clairement étiqueté selon l’un des trois types définis à l’étape 0.

Le contenu publié porte le type `VERIFIED_REALIZATION` et doit être identifiable comme tel (par exemple « Prestation réalisée via la plateforme »).

Il doit être rattaché à :

* la coiffeuse ;
* la prestation exacte ;
* éventuellement la variante réalisée ;
* le rendez-vous confirmé source ;
* les caractéristiques observables du résultat.

Le consentement à la prestation ne vaut pas consentement à la publication. La prise de photo et la publication doivent faire l’objet de consentements séparés. Le visage ou toute information identifiable doit être masqué si le consentement correspondant n’existe pas.

Une fois publié, le contenu rejoint la galerie de la prestation. Les capacités ouvertes sur cette prestation le voient via le filtrage de variantes ; aucune copie n’est créée dans une galerie générale.

Ce mécanisme permet à la galerie de devenir progressivement plus fiable, sans transformer une belle photo en preuve d’éligibilité opérationnelle.

---

# 7. États et transitions

## Cycle de la preuve

```text
PROOF_PENDING
→ EXPERIENCE_RECORDED
```

La preuve est produite même en l’absence d’avis.

## Cycle de l’avis

```text
REVIEW_ELIGIBLE
→ REVIEW_PENDING
→ REVIEW_SUBMITTED
→ REVIEW_PUBLISHED
```

Branche de modération :

```text
REVIEW_PUBLISHED
→ REVIEW_FLAGGED
→ REVIEW_UNDER_REVIEW
→ REVIEW_PUBLISHED | REVIEW_MASKED | REVIEW_REMOVED
```

## Cycle de reprise

```text
DRAFT_FROM_HISTORY
→ REPEAT_DEMAND_CONFIRMED
→ DEMAND_QUALIFIED
```

La reprise retourne ensuite dans le processus normal. Elle ne crée pas directement `COMMITTED`.

## Cycle d’un élément de galerie issu de l’expérience

```text
GALLERY_ITEM_DRAFT
→ GALLERY_ITEM_IN_REVIEW
→ GALLERY_ITEM_PUBLISHED
```

Branches :

```text
PUBLISHED → HIDDEN | REJECTED | ARCHIVED
```

Un contenu issu d’un rendez-vous confirmé peut être publié comme `VERIFIED_REALIZATION` uniquement. Sa suppression publique ne doit pas effacer la preuve de consentement ni l’historique de modération.

---

# 8. Règles métier incontournables

1. **Une expérience réglée entre dans l’historique même sans avis.**

2. **L’avis doit être rattaché à un rendez-vous réel, une coiffeuse précise et une prestation précise.**

3. **Une prestation non réalisée ne peut produire aucune note technique.**

4. **La réservation, la technique, le prix et la résolution doivent rester des dimensions séparées.**

5. **Une cliente ne peut produire qu’un retour principal par rendez-vous.**
   Une correction crée une nouvelle version au lieu d’effacer l’historique.

6. **La coiffeuse peut répondre, mais ne peut pas modifier le retour de la cliente.**

7. **Un signalement ne provoque pas automatiquement une suppression.**

8. **Un avis ne doit pas remplacer une déclaration d’incident.**
   Les problèmes de sécurité, de paiement ou de responsabilité rejoignent le support.

9. **Laisser un avis ne doit jamais être obligatoire pour clôturer le parcours ou reprendre rendez-vous.**

10. **Une nouvelle réservation ne peut pas réutiliser silencieusement un ancien prix, une ancienne disponibilité ou d’anciennes conditions.**

11. **Les préférences utilisées pour personnaliser le prochain parcours nécessitent un consentement explicite et révocable.**

12. **Un favori exprime une préférence personnelle ; il ne constitue ni un avis ni une preuve de compétence.**

13. **La réputation technique doit être contextualisée par prestation.**

14. **Les avis sur la plateforme ou la résolution ne doivent pas dégrader automatiquement la réputation technique de la coiffeuse.**

15. **Une réalisation publiée après prestation enrichit la galerie de la prestation concernée (`SERVICE_GALLERY`), jamais une galerie générale.**

16. **Le consentement à la prestation, à la prise de photo et à la publication sont distincts.**

17. **Une réalisation issue de la plateforme doit rester identifiable comme `VERIFIED_REALIZATION`.**

18. **Une inspiration (`REFERENCE_INSPIRATION`) ne doit jamais être présentée comme une réalisation personnelle ; l’étape 8 ne publie que des `VERIFIED_REALIZATION`.**

---

# 9. Périmètre recommandé pour le pilote

## Indispensable

* création automatique de la preuve d’expérience ;
* confirmation du résultat ;
* questionnaire adapté au résultat réel ;
* retour multidimensionnel ;
* distinction entre avis public et retour privé ;
* avis rattaché à une prestation vérifiée ;
* réponse de la coiffeuse ;
* signalement d’un avis ;
* modération manuelle ;
* historique des prestations ;
* bouton « Refaire cette prestation » ;
* bouton « Revenir vers cette coiffeuse » ;
* création d’une nouvelle demande à partir de l’historique ;
* consentement à mémoriser les préférences.

## Utile mais non bloquant

* favoris ;
* photo facultative du résultat ;
* proposition automatique du résultat à la galerie de la prestation après consentements et validation coiffeuse (`VERIFIED_REALIZATION`) ;
* validation coiffeuse avant publication d’une réalisation vérifiée ;
* complément d’avis après quelques jours ;
* statistiques simples par prestation ;
* affichage du nombre de prestations et d’avis vérifiés ;
* affichage du niveau de preuve visuelle de la galerie (par type de contenu).

Pendant le pilote, l’enrichissement de galerie reste non bloquant pour la clôture du parcours, mais il est recommandé dès qu’un résultat confirmé et les consentements existent.

## À reporter

* moteur sophistiqué de recommandation ;
* programme de fidélité ;
* CRM marketing pour les coiffeuses ;
* campagnes de réactivation automatiques ;
* score anti-fraude avancé ;
* pondération algorithmique complexe ;
* prédiction du prochain besoin ;
* rappels commerciaux personnalisés ;
* classement automatique des coiffeuses.

---

# 10. Critères d’acceptation fonctionnels

L’étape est correctement cadrée si :

* un rendez-vous `SETTLED` apparaît automatiquement dans l’historique ;
* l’absence d’avis ne bloque pas `EXPERIENCE_RECORDED` ;
* une prestation non réalisée n’affiche aucun critère technique ;
* une résolution produit des critères spécifiques ;
* chaque avis reste lié à la prestation exacte ;
* une coiffeuse peut répondre sans modifier l’avis ;
* un signalement déclenche une file de modération ;
* la décision de modération est historisée ;
* une reprise crée une nouvelle demande avec un nouvel identifiant ;
* les anciennes conditions ne deviennent jamais automatiquement les conditions de la nouvelle demande ;
* les préférences facultatives ne sont mémorisées qu’après consentement ;
* les problèmes sensibles peuvent être envoyés au support indépendamment de la publication d’un avis ;
* aucun contenu n’est publié dans la galerie sans consentement de publication ;
* tout contenu issu de l’étape 8 est publié comme `VERIFIED_REALIZATION`, étiqueté comme tel, et rattaché uniquement à la prestation réalisée.

---

# 11. Indicateurs à suivre

## Production de preuve

* part des rendez-vous réglés possédant un résultat qualifié ;
* part des expériences complètes dans l’historique ;
* taux de divergences sur le résultat.

## Qualité des retours

* taux de clientes laissant un retour ;
* taux de complétion par dimension ;
* part des prestations réalisées obtenant un avis technique ;
* taux d’avis signalés ;
* délai moyen de modération.

## Prolongement de la relation

* taux de reprise depuis l’historique ;
* part des nouvelles demandes visant une coiffeuse déjà éprouvée ;
* conversion des demandes de reprise en propositions fermes ;
* conversion des propositions de reprise en engagements ;
* délai moyen avant une nouvelle transaction ;
* taux d’ajout en favori.

---

# 12. Domain story condensée

> Lorsqu’un rendez-vous est terminé et réglé, la plateforme crée une preuve factuelle de l’expérience. Elle détermine ensuite quelles dimensions peuvent légitimement être évaluées selon que la prestation a été réalisée, partiellement réalisée, non réalisée ou résolue après un incident. La cliente confirme le résultat et fournit un retour multidimensionnel. La plateforme rattache ce retour à la transaction vérifiée, publie uniquement les éléments autorisés et permet à la coiffeuse de répondre ou de signaler un abus. L’expérience rejoint ensuite l’historique de la cliente. Si celle-ci souhaite renouveler la relation, elle peut reprendre l’ancienne prestation ou revenir vers la coiffeuse, mais la plateforme crée une nouvelle demande et fait reconfirmer la faisabilité, le prix, la disponibilité et les conditions.

La fonction centrale de cette étape peut donc se résumer ainsi :

> **Transformer chaque transaction clôturée en preuve fiable, puis permettre à cette preuve — y compris, le cas échéant, une réalisation vérifiée ajoutée à la galerie de la prestation — de réduire l’incertitude et l’effort lors de la prochaine transaction.**
