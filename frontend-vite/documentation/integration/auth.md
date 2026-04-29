# Documentation Intégration : Authentification & Sécurité

Ce module gère l'inscription, la connexion et la sécurisation des sessions utilisateurs sur la plateforme Discover Sénégal.

## 🧱 Composants Clés
- `LoginPage.tsx` : Interface de connexion avec gestion du "Mot de passe oublié".
- `RegisterPage.tsx` : Formulaire d'inscription multi-rôles.
- `AuthContext.tsx` : Gestionnaire global de l'état d'authentification (Token JWT).
- `ProtectedRoute.tsx` : Gardien de routes basé sur les rôles.

## 🧬 Modèles de Données (Types)

```typescript
export const UserRole = {
  VISITOR: 'VISITOR',
  LOCAL: 'LOCAL',
  GUIDE: 'GUIDE',
  ORGANIZER: 'ORGANIZER',
  ADMIN: 'ADMIN',
  ARTISAN: 'ARTISAN', // À ajouter au backend
  HOTEL: 'HOTEL',
  RESTAURANT: 'RESTAURANT',
  AGENCY: 'AGENCY'
} as const;

export interface UserEntity {
  id: string;
  email: string;
  name: string;
  role: string;
  avatar?: string;
}
```

## 🌐 Endpoints API Proposés

| Méthode | Route | Description | Auth Requise |
| :--- | :--- | :--- | :--- |
| POST | `/api/auth/register` | Création de compte (avec spécification du rôle) | Non |
| POST | `/api/auth/login` | Authentification et retour du Token JWT | Non |
| POST | `/api/auth/forgot-password` | Demande de réinitialisation par email | Non |
| GET | `/api/auth/me` | Récupération du profil de l'utilisateur connecté | Oui (JWT) |
| PUT | `/api/auth/update-password` | Changement de mot de passe | Oui (JWT) |

## 💾 Gestion d'État (Context)
Le `AuthContext` expose :
- `user` : Objet utilisateur (ou null).
- `login(credentials)` : Fonction pour authentifier.
- `logout()` : Suppression du token et redirection.
- `updateProfile(data)` : Mise à jour locale après modification.

## ⚠️ Notes pour le Backend
- **Sécurité** : Utiliser `bcrypt` pour le hachage des mots de passe.
- **Tokens** : Implémenter des JWT avec une expiration raisonnable (ex: 24h).
- **Rôles** : Le backend doit valider strictement les accès aux routes `/api/admin/*` en vérifiant le rôle dans le payload du JWT.
