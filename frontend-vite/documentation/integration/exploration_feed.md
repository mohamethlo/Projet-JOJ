# Documentation Intégration : Échos du Sénégal (Social Feed)

Le module "Échos du Sénégal" est le cœur social de la plateforme, permettant le partage de photos et vidéos (format vertical type TikTok/Reels).

## 🧱 Composants Clés
- `DiscoverFeedPage.tsx` : Flux principal de publications.
- `VideoFeedPage.tsx` : Interface plein écran pour les vidéos courtes.
- `PostCard.tsx` : Composant d'affichage d'une publication avec interactions.
- `VerticalVideoItem.tsx` : Lecteur vidéo optimisé pour le mobile.
- `FeedContext.tsx` : Gestion du chargement et du filtrage des publications.

## 🧬 Modèles de Données (Types)

```typescript
export interface Post {
  id: string;
  userId: string;
  userName: string;
  userAvatar?: string;
  type: 'IMAGE' | 'VIDEO';
  mediaUrl: string;
  caption: string;
  likes: number;
  commentsCount: number;
  location?: string;
  timestamp: string;
}
```

## 🌐 Endpoints API Proposés

| Méthode | Route | Description | Auth Requise |
| :--- | :--- | :--- | :--- |
| GET | `/api/posts` | Récupère le flux (pagination recommandée) | Non |
| POST | `/api/posts` | Publier un nouveau contenu (FormData pour images/vidéos) | Oui |
| POST | `/api/posts/:id/like` | Liker une publication | Oui |
| GET | `/api/posts/:id/comments` | Récupérer les commentaires d'un post | Non |
| POST | `/api/posts/:id/report` | Signaler un contenu inapproprié | Oui |

## 💾 Gestion d'État (Context)
Le `FeedContext` permet de :
- Gérer l'état de chargement (`isLoading`).
- Filtrer les publications par catégorie ou localisation.
- Mettre à jour en temps réel (optimistic UI) le compteur de likes.

## ⚠️ Notes pour le Backend
- **Traitement Média** : Pour les vidéos, utiliser un transcodage (ex: FFmpeg) pour optimiser le streaming.
- **Stockage** : Utiliser un service type AWS S3 ou Cloudinary pour les fichiers.
- **Performance** : Utiliser un cache (ex: Redis) pour les compteurs de likes très sollicités.
