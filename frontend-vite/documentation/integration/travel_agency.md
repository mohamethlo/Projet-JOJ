# Documentation Intégration : Agences de Voyage

Ce module permet aux agences de voyages de créer et gérer des offres (circuits, forfaits) et de suivre les réservations des voyageurs.

## 🧱 Composants Clés
- `AgencyDashboard.tsx` : KPI Agence (Ventes, Flux de voyageurs, Mix produits).
- `AgencyOffersPage.tsx` : Gestion du catalogue d'offres de l'agence.
- `AgencyBookingsPage.tsx` : Suivi des réservations clients.
- `AgencyPage.tsx` : Annuaire public des agences pour les touristes.

## 🧬 Modèles de Données (Types)

```typescript
export interface TravelOffer {
  id: string;
  agencyId: string;
  title: string;
  description: string;
  price: number;
  duration: string; // ex: "3 jours / 2 nuits"
  destinations: string[];
  inclusions: string[];
  images: string[];
  type: 'CIRCUIT' | 'EXCURSION' | 'SEJOUR';
}

export interface AgencyBooking {
  id: string;
  offerId: string;
  travelerId: string;
  travelerName: string;
  numberOfPeople: number;
  status: 'PENDING' | 'CONFIRMED' | 'PAID' | 'CANCELLED';
  startDate: string;
}
```

## 🌐 Endpoints API Proposés

| Méthode | Route | Description | Auth Requise |
| :--- | :--- | :--- | :--- |
| GET | `/api/agencies/me/offers` | Liste des offres de l'agence | Agence |
| POST | `/api/agencies/me/offers` | Créer une nouvelle offre | Agence |
| GET | `/api/agencies/me/bookings` | Liste des réservations reçues | Agence |
| PUT | `/api/agencies/me/bookings/:id` | Confirmer ou annuler un dossier | Agence |
| GET | `/api/agencies/public` | Annuaire des agences agrées | Non |

## 💾 Gestion d'État (Context)
- `AgencyContext` : Centralise les offres et les réservations pour les composants de gestion interne de l'agence.

## ⚠️ Notes pour le Backend
- **Complexité des Offres** : Prévoir un champ JSON flexible pour les "Inclusions/Exclusions" afin de permettre des descriptions riches.
- **Dossiers Voyageurs** : Garder un lien fort entre le `travelerId` (utilisateur) et le dossier pour le support client.
- **Historisation** : Ne pas supprimer physiquement les anciennes offres, utiliser un flag `isActive` pour les retirer de la vente.
