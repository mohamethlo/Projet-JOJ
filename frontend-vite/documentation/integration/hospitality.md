# Documentation Intégration : Hôtellerie & Restauration

Ce module centralise la gestion des établissements d'hébergement et de restauration, incluant la gestion des chambres, des menus et des réservations.

## 🧱 Composants Clés
- `EstablishmentDashboard.tsx` : Dashboard pour les hôtels (Occupation, Revenus).
- `RestaurantDashboard.tsx` : Dashboard pour les restaurants (Couverts, Plats favoris).
- `RoomsPage.tsx` : Inventaire et état des chambres.
- `MenuPage.tsx` : Carte numérique du restaurant.
- `PublicEstablishmentProfilePage.tsx` : Vue publique pour les touristes.

## 🧬 Modèles de Données (Types)

```typescript
export interface HospitalityEntity {
  id: string;
  type: 'HOTEL' | 'RESTAURANT';
  name: string;
  description: string;
  location: string;
  amenities: string[];
  images: string[];
}

export interface Room {
  id: string;
  hotelId: string;
  type: string;
  price: number;
  isAvailable: boolean;
}

export interface MenuItem {
  id: string;
  restaurantId: string;
  name: string;
  price: number;
  category: 'ENTREE' | 'PLAT' | 'DESSERT' | 'BOISSON';
}
```

## 🌐 Endpoints API Proposés

| Méthode | Route | Description | Auth Requise |
| :--- | :--- | :--- | :--- |
| GET | `/api/establishments/me` | Profil privé de l'établissement | Propriétaire |
| GET | `/api/establishments/:id/rooms` | Liste des chambres d'un hôtel | Non |
| GET | `/api/establishments/:id/menu` | Carte d'un restaurant | Non |
| PUT | `/api/establishments/me/rooms/:id` | Modifier l'état d'une chambre | Propriétaire |
| POST | `/api/establishments/me/menu` | Ajouter un plat à la carte | Propriétaire |

## 💾 Gestion d'État (Context)
- `RestaurantContext` : Gère spécifiquement les données liées aux menus et commandes de table.
- Les données hôtelières sont chargées dynamiquement par composant.

## ⚠️ Notes pour le Backend
- **Calendrier** : Prévoir une gestion de calendrier pour la disponibilité des chambres à des dates futures (pas seulement l'état actuel).
- **Images** : Support du stockage d'images haute résolution pour mettre en valeur les infrastructures.
- **Taux d'occupation** : L'endpoint de stats doit pouvoir renvoyer des agrégations temporelles (jour/semaine/mois).
