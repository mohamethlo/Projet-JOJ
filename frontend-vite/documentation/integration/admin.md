# Documentation Intégration : Administration & Modération

Le module d'administration permet de superviser la plateforme, de valider les prestataires et de modérer les contenus signalés.

## 🧱 Composants Clés
- `AdminDashboard.tsx` : Vue d'ensemble (Stats, Graphiques, Activité).
- `ValidationDashboard.tsx` : Système d'approbation des nouveaux comptes (Guide, Hôtel, etc.).
- `ModerationPage.tsx` : Gestion des signalements utilisateurs.
- `AlertList.tsx` : Liste priorisée des incidents à traiter.

## 🧬 Modèles de Données (Types)

```typescript
export interface ValidationRequest {
  id: string;
  userId: string;
  establishmentName: string;
  type: 'HOTEL' | 'RESTAURANT' | 'AGENCY' | 'ARTISAN';
  documents: string[]; // URLs vers les PDF/Images
  status: 'PENDING' | 'APPROVED' | 'REJECTED';
}

export interface ModerationAlert {
  id: string;
  postId: string;
  reporterId: string;
  reason: string;
  timestamp: string;
}
```

## 🌐 Endpoints API Proposés

| Méthode | Route | Description | Auth Requise |
| :--- | :--- | :--- | :--- |
| GET | `/api/admin/stats` | Données globales pour les graphiques du dashboard | Admin |
| GET | `/api/admin/pending-validations` | Liste des demandes en attente | Admin |
| POST | `/api/admin/validate/:id` | Approuver ou rejeter une demande | Admin |
| GET | `/api/admin/reports` | Récupérer tous les signalements | Admin |
| DELETE | `/api/admin/content/:postId` | Supprimer un contenu signalé | Admin |

## 💾 Gestion d'État (Context)
Les données d'administration sont généralement récupérées à chaque chargement de page via des hooks `useEffect` sans stockage persistant global, sauf pour les notifications admin.

## ⚠️ Notes pour le Backend
- **Audit Log** : Il est recommandé de garder une trace de qui (quel admin) a validé quel prestataire.
- **Droit à l'oubli** : Lors de la suppression d'un contenu, s'assurer de supprimer également les signalements associés.
- **Filtrage** : Fournir des options de filtrage par date et par type sur l'endpoint `/api/admin/reports`.
