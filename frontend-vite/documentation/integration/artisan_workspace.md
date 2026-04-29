# Documentation Intégration : Espace Artisan

Ce module permet aux artisans de gérer leur boutique virtuelle, leurs produits et de suivre leurs commandes.

## 🧱 Composants Clés
- `ArtisanDashboard.tsx` : Tableau de bord avec statistiques de vente et graphiques.
- `ProductsPage.tsx` : Catalogue des créations de l'artisan.
- `OrdersPage.tsx` : Gestion des commandes clients.
- `PublicArtisanProfilePage.tsx` : Vitrine publique visible par les touristes.

## 🧬 Modèles de Données (Types)

```typescript
export interface Product {
  id: string;
  artisanId: string;
  name: string;
  description: string;
  price: number;
  category: 'POTERIE' | 'TEXTILE' | 'BIJOUX' | 'AUTRE';
  images: string[];
  stock: number;
}

export interface ArtisanOrder {
  id: string;
  customerId: string;
  productIds: string[];
  totalAmount: number;
  status: 'PENDING' | 'PROCESSING' | 'SHIPPED' | 'DELIVERED';
  createdAt: string;
}
```

## 🌐 Endpoints API Proposés

| Méthode | Route | Description | Auth Requise |
| :--- | :--- | :--- | :--- |
| GET | `/api/artisan/stats` | KPIs Ventes, Produits, Commandes | Artisan |
| GET | `/api/artisan/products` | Liste ses propres produits | Artisan |
| POST | `/api/artisan/products` | Ajouter une nouvelle création | Artisan |
| GET | `/api/artisan/orders` | Liste des commandes reçues | Artisan |
| PUT | `/api/artisan/orders/:id` | Mettre à jour le statut (ex: Expédié) | Artisan |

## 💾 Gestion d'État (Context)
Les données sont chargées localement par page. Une mise à jour du `AuthContext` peut être nécessaire pour refléter les informations de profil de l'artisan (nom de la boutique, localisation).

## ⚠️ Notes pour le Backend
- **Stock** : Implémenter une vérification automatique des stocks lors du passage de commande pour éviter les sur-ventes.
- **Images** : Prévoir le support du téléchargement multiple pour un seul produit.
- **Notifications** : Envoyer une notification (Push/Email) à l'artisan pour chaque nouvelle commande.
