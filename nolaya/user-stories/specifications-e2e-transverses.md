# Spécifications E2E transverses

## Objet

Ce document regroupe les règles qui traversent plusieurs étapes et les grands scénarios de validation de la chaîne de valeur.

## Invariants

### E2E-INV-01 — Parcours sans compte

La cliente peut découvrir, qualifier, soumettre, suivre, évaluer et relancer une demande sans créer de compte.

### E2E-INV-02 — Aucun consentement implicite

La géolocalisation, l’élargissement géographique, l’assouplissement d’un critère, la sélection d’un destinataire, la mise en relation, le paiement, la publication d’une photo et le rappel exigent une action explicite.

### E2E-INV-03 — Vérité du niveau d’engagement

Avant le dossier **READY** :

- une offre n’est pas une disponibilité confirmée ;
- une sélection n’est pas une sollicitation ;
- une soumission n’est pas une réservation ;
- une réponse de principe n’est pas un accord ;
- une proposition retenue n’est pas un rendez-vous confirmé.

### E2E-INV-04 — Certitude visible

Prix, disponibilité, durée, lieu et conditions affichent toujours leur niveau de certitude : confirmé, déclaré, estimé, à partir de ou à vérifier.

### E2E-INV-05 — Protection des données

Avant la mise en relation consentie :

- l’adresse exacte est masquée ;
- les coordonnées directes sont masquées ;
- le journal interne de conciergerie n’est pas exposé ;
- chaque projection ne contient que les données nécessaires à son acteur.

### E2E-INV-06 — Continuité et versionnement

La même demande et le même identifiant de dossier traversent les étapes. Toute modification importante crée une version identifiable et invalide les confirmations de l’ancienne version.

### E2E-INV-07 — Multi-sollicitation et transaction unique

Plusieurs coiffeuses autorisées peuvent être contactées dans un dossier, mais une seule proposition peut devenir la transaction active.

### E2E-INV-08 — Issue réelle

La date passée ne transforme jamais automatiquement un rendez-vous en prestation réalisée. Une prestation non réalisée ne produit ni avis technique ni conversion réalisée.

### E2E-INV-09 — Conditions actuelles

Une reprise ou une nouvelle demande ne garantit jamais l’ancien prix, l’ancienne disponibilité ou l’ancienne zone.

## Scénarios de chaîne

### E2E-G01 — Parcours nominal jusqu’à la coiffeuse trouvée

**Étant donné** une cliente sans compte et trois offres compatibles  
**Quand** elle qualifie son besoin, choisit une offre principale, vérifie les conditions, autorise plusieurs coiffeuses, retient une réponse et valide l’accord avec la coiffeuse  
**Alors** un seul dossier atteint **READY**, la fiche rendez-vous reprend la version active et les autres sollicitations sont clôturées.

### E2E-G02 — Refus de géolocalisation

**Étant donné** une visiteuse qui demande « Autour de moi »  
**Quand** elle refuse la permission puis saisit une ville  
**Alors** le parcours continue sans insistance et applique le classement ville puis zone.

### E2E-G03 — Aucun résultat et assouplissement contrôlé

**Étant donné** une demande qualifiée sans correspondance  
**Quand** la cliente accepte un assouplissement expliqué  
**Alors** une nouvelle version est visible, le matching est recalculé et aucun autre critère n’est modifié.

### E2E-G04 — Une seule offre

**Étant donné** une seule offre éligible  
**Quand** la cliente consulte ses preuves et ses incertitudes  
**Alors** elle peut la choisir comme offre principale ou revenir modifier son besoin sans pression de rareté.

### E2E-G05 — Clarification professionnelle

**Étant donné** un dossier en cours de sollicitation  
**Quand** une coiffeuse demande une précision et que la cliente répond  
**Alors** la réponse rejoint le même dossier, la conciergerie reprend le traitement et l’historique reste visible.

### E2E-G06 — Aucune réponse

**Étant donné** l’épuisement des destinataires autorisés  
**Quand** aucune réponse exploitable n’est reçue après la politique de relance  
**Alors** le statut devient « Aucune réponse obtenue » et tout élargissement exige une nouvelle décision de la cliente.

### E2E-G07 — Accord version 2

**Étant donné** une version 1 acceptée par la cliente  
**Quand** la date ou le prix change  
**Alors** une version 2 est créée, les anciennes validations sont invalidées et seules deux validations sur la version 2 permettent **SERVICE_AGREED**.

### E2E-G08 — Prestation réalisée, avis et reprise

**Étant donné** un dossier **READY**  
**Quand** les deux parties confirment la réalisation, que la cliente dépose un avis puis choisit « Refaire »  
**Alors** la transaction devient **COMPLETED**, un seul avis existe et un nouveau dossier indépendant est créé avec des conditions revérifiées.

### E2E-G09 — Déclarations contradictoires

**Étant donné** deux déclarations d’issue différentes  
**Quand** la seconde contradiction est enregistrée  
**Alors** le dossier devient **INCIDENT_OPEN**, l’avis technique est bloqué et les fonds restent gelés si le paiement intermédiaire est actif.

### E2E-G10 — Paiement intermédiaire activé

**Étant donné** un accord formé avec paiement requis  
**Quand** la cliente accepte les règles et que le prestataire confirme les fonds  
**Alors** l’état devient **FUNDS_SECURED**, le message précise que les fonds ne sont pas versés à la coiffeuse, puis le dossier peut atteindre **READY**.

## Acteurs nécessaires aux futures suites

Les scénarios multi-acteurs doivent disposer de contextes distincts :

- navigateur cliente ;
- action ou projection conciergerie ;
- action coiffeuse, même si elle est simulée par son canal habituel ;
- prestataire de paiement simulé uniquement pour la branche activée.

Un test ne doit pas simuler le consentement ou la confirmation d’un second acteur depuis la session de la cliente.
