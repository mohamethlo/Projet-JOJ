# Documentation Intégration : Profil & Interactions Sociales

Ce module gère l'identité numérique des utilisateurs, leurs interactions (commentaires, notifications) et leurs relations (jumelages).

## 🧱 Composants Clés
- `ProfilePage.tsx` : Espace personnel de l'utilisateur.
- `UserPublicProfilePage.tsx` : Vue publique d'un utilisateur.
- `MessagesPage.tsx` : Interface de messagerie privée.
- `NotificationsPage.tsx` : Liste des notifications reçues.
- `NotificationContext.tsx` : Gestionnaire de l'état des notifications (Lues/Non lues).

## 🧬 Modèles de Données (Types)

```typescript
export interface UserProfile {
  id: string;
  bio?: string;
  avatar?: string;
  interests: string[];
  location?: string;
  isVerified: boolean;
}

export interface AppNotification {
  id: string;
  type: 'MESSAGE' | 'BOOKING' | 'LIKE' | 'SYSTEM';
  title: string;
  content: string;
  isRead: boolean;
  timestamp: string;
}
```

## 🌐 Endpoints API Proposés

| Méthode | Route | Description | Auth Requise |
| :--- | :--- | :--- | :--- |
| GET | `/api/users/:id/profile` | Récupère le profil public | Non |
| PUT | `/api/users/me/profile` | Mettre à jour son propre profil | Oui |
| GET | `/api/notifications` | Liste des notifications de l'utilisateur | Oui |
| PUT | `/api/notifications/:id/read` | Marquer une notification comme lue | Oui |
| GET | `/api/messages/conversations` | Liste des conversations actives | Oui |

## 💾 Gestion d'État (Context)
- `NotificationContext` : Indispensable pour afficher la pastille de notification globale dans le header.
- `VisitorEngagementContext` : Gère le score de compatibilité pour les jumelages IA.

## ⚠️ Notes pour le Backend
- **Confidentialité** : Certaines données (email, téléphone) ne doivent jamais être exposées sur le profil public.
- **Push Notifications** : Envisager l'intégration de Firebase Cloud Messaging (FCM) pour les notifications mobiles.
- **Récupération des Messages** : Implémenter le chargement par lots (cursor-based pagination) pour la messagerie.
