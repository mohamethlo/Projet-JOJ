# Documentation Intégration : Système de Réservation & Tickets

Le module de billetterie gère l'achat, l'émission et la gestion des tickets pour les événements et les attractions de Discover Sénégal.

## 🧱 Composants Clés
- `MesTicketsPage.tsx` : Liste des tickets achetés par l'utilisateur (Futurs et Historique).
- `TicketDetailsPage.tsx` : Affichage du QR Code et des détails d'un ticket spécifique.
- `TicketCard.tsx` : Composant visuel de type billet premium.

## 🧬 Modèles de Données (Types)

```typescript
export interface Ticket {
  id: string;
  userId: string;
  type: 'EVENT' | 'GUIDE' | 'HOTEL' | 'RESTAURANT';
  entityId: string; // ID de l'événement/établissement associé
  title: string;
  qrCode: string;
  status: 'VALID' | 'USED' | 'EXPIRED' | 'CANCELLED';
  purchaseDate: string;
  validityDate: string;
  price: number;
}
```

## 🌐 Endpoints API Proposés

| Méthode | Route | Description | Auth Requise |
| :--- | :--- | :--- | :--- |
| GET | `/api/tickets/my-tickets` | Récupère tous les tickets de l'utilisateur | Oui |
| GET | `/api/tickets/:id` | Détails d'un ticket spécifique | Oui |
| POST | `/api/tickets/purchase` | Effectuer un achat et générer un ticket | Oui |
| POST | `/api/tickets/:id/cancel` | Demande d'annulation/remboursement | Oui |

## 💾 Gestion d'État (Context)
Les données sont chargées dynamiquement. Le `AuthContext` peut être mis à jour pour refléter le nouveau solde de points suite à un achat.

## ⚠️ Notes pour le Backend
- **QR Code** : Le champ `qrCode` doit contenir une chaîne signée (ex: HMAC) pour éviter la contrefaçon.
- **Transactions** : L'endpoint d'achat doit être atomique pour garantir la génération du ticket en cas de succès du paiement.
- **États** : S'assurer que le statut `EXPIRED` est géré automatiquement par une tâche de fond (Cron JOB).
