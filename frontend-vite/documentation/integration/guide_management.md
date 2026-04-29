# Documentation Intégration : Gestion des Guides & Expériences

Ce module permet aux guides locaux de proposer leurs services et aux touristes de réserver des visites guidées personnalisées.

## 🧱 Composants Clés
- `GuidesPage.tsx` : Annuaire public des guides avec filtres par langue et région.
- `GuideManagementPage.tsx` : Interface de gestion pour le guide (Disponibilités, Circuits).
- `GuideBookingsPage.tsx` : Suivi des réservations de visites.
- `GuideDashboard.tsx` : Statistiques d'activité du guide.

## 🧬 Modèles de Données (Types)

```typescript
export interface GuideProfile {
  id: string;
  userId: string;
  specialties: string[];
  languages: string[];
  yearsExperience: number;
  hourlyRate: number;
  rating: number;
  isVerified: boolean;
}

export interface GuideTour {
  id: string;
  guideId: string;
  title: string;
  description: string;
  duration: string;
  pricePerPerson: number;
}
```

## 🌐 Endpoints API Proposés

| Méthode | Route | Description | Auth Requise |
| :--- | :--- | :--- | :--- |
| GET | `/api/guides/search` | Recherche multicritères de guides | Non |
| GET | `/api/guides/me` | Profil privé du guide | Guide |
| POST | `/api/guides/me/tours` | Proposer un nouveau circuit | Guide |
| GET | `/api/guides/:id` | Détails publics d'un guide | Non |
| POST | `/api/guides/:id/book` | Réserver une visite | Touriste |

## 💾 Gestion d'État (Context)
Les données sont chargées au niveau des pages. L'état de vérification du guide est stocké dans le `AuthContext`.

## ⚠️ Notes pour le Backend
- **Vérification** : Implémenter un système de validation des documents (cartes de guide professionnel) via le module Admin.
- **Localisation** : S'assurer que les guides peuvent être filtrés par rayon kilométrique (Coordonnées GPS).
- **Disponibilité** : Prévoir une gestion d'agenda (dates bloquées).
