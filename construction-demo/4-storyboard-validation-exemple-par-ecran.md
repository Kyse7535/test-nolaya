Je prends un écran du storyboard et je le fais passer par cinq niveaux de précision. Exemple avec l’écran « Demande d’Inès ».

## 1. Point de départ : le storyboard

Le storyboard donne seulement l’intention :

> Sarah consulte la demande d’Inès, constate qu’une photo récente manque et demande une précision.

Ce n’est pas encore suffisant pour concevoir ou développer l’écran.

## 2. Fiche fonctionnelle

| Élément                   | Spécification                                                   |
| ------------------------- | --------------------------------------------------------------- |
| Objectif                  | Permettre à Sarah de décider si la demande est exploitable      |
| Objets d’entrée           | `DEMAND_QUALIFIED` + invitation active                          |
| Informations prioritaires | Résultat, cheveux, date, lieu, budget, fournitures, préparation |
| Explication               | Pourquoi Sarah a reçu cette demande                             |
| Point à vérifier          | Photo récente des cheveux (+ allergies optionnel)                    |
| Décision principale       | Demander une précision                                          |
| Autres décisions          | Préparer une proposition ou refuser                             |
| Réaction simulée          | Inès fournit la photo et répond                                 |
| Sortie principale         | Demande enrichie                                                |
| Sortie suivante           | `PROPOSAL_PENDING` si Sarah poursuit                            |
| Preuve conservée          | Question, réponse, documents et horodatage                      |

## 3. Wireframe interactif

Clique sur **Demander une précision**, puis sur **Envoyer à Inès** pour voir la cliente simulée intervenir.

La hiérarchie suit la décision métier :

1. comprendre la demande ;
2. comprendre pourquoi elle a été distribuée à Sarah ;
3. repérer les informations importantes ;
4. identifier ce qui reste à vérifier ;
5. prendre une décision professionnelle.

## 4. Règles métier derrière l’écran

L’interface doit respecter plusieurs règles :

* aucune information cliente ne doit être inventée ;
* contraintes et préférences restent distinctes ;
* une image sert de référence, pas d’analyse automatique ;
* Sarah décide elle-même si l’information manquante est bloquante ;
* la clarification enrichit le demande existante ;
* le refus nécessite un motif structuré ;
* aucun paiement ni engagement définitif n’est possible à ce stade ;
* le simulateur intervient seulement après une action de Sarah.

## 5. Scénario de démonstration

```text
Sarah ouvre la demande
→ Sarah constate les informations manquantes
→ Sarah sélectionne les précisions nécessaires
→ Sarah envoie sa demande
→ le simulateur fait répondre Inès
→ la plateforme enrichit et historise le dossier
→ Sarah évalue la décision
→ passage vers la proposition ferme
```

## 6. Ce que l’on teste réellement

On ne teste pas seulement si Sarah arrive à cliquer. On observe si elle :

* comprend rapidement le besoin d’Inès ;
* sait pourquoi la demande lui a été envoyée ;
* repère spontanément les informations insuffisantes ;
* comprend ce qui est obligatoire ou flexible ;
* pose uniquement les questions nécessaires ;
* considère la demande suffisamment complet pour fixer un prix et une durée.

Le critère de réussite pourrait être :

> Sans assistance, la coiffeuse comprend la demande, identifie les éventuels éléments manquants et choisit une action professionnelle cohérente.

C’est ce travail que je répéterais pour chaque écran : **intention du storyboard → fiche fonctionnelle → règles métier → wireframe → simulation → critères de test**.
