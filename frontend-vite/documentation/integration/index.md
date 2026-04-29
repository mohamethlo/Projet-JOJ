# Index de Documentation : Intégration Front-Back

Bienvenue dans le guide d'intégration technique de la plateforme **Discover Sénégal**. Cette documentation est destinée à l'équipe technique pour assurer une connexion fluide entre le front-end React et le futur back-end.

## 🚠 Modules Disponibles

Cliquez sur les liens ci-dessous pour accéder à la documentation détaillée de chaque module :

1. [**Authentification & Sécurité**](auth.md) : Inscriptions, connexions et gestion des rôles.
2. [**Administration & Modération**](admin.md) : Outils de supervision et de contrôle.
3. [**Échos du Sénégal (Social Feed)**](exploration_feed.md) : Partage de contenus et engagement.
4. [**Espace Artisan**](artisan_workspace.md) : Gestion de boutique et de produits.
5. [**Hôtellerie & Restauration**](hospitality.md) : Gestion d'établissements.
6. [**Agences de Voyage**](travel_agency.md) : Forfaits et dossiers voyageurs.
7. [**Gestion des Guides**](guide_management.md) : Circuits et services de guides.
8. [**Sécurité & Surveillance**](security_surveillance.md) : Monitoring et rapports d'incidents.
9. [**Système de Billetterie**](booking_system.md) : Achat et gestion des tickets.
10. [**Profil & Interactions Sociales**](user_profile_social.md) : Identité numérique et messagerie.

## 🚀 Recommandations Générales

### Conventions d'API
- **Format** : JSON.
- **Protocole** : HTTPS.
- **Réponses** : Utiliser les codes HTTP standards (200, 201, 400, 401, 403, 404, 500).
- **Structure d'erreur** : `{"error": "Message explicite"}`.

### Sécurité
- Passer systématiquement le Token JWT dans le header `Authorization: Bearer <token>`.
- Valider systématiquement les rôles côté serveur, même si le front-end masque certains éléments.

### Performance
- Implémenter la pagination (`limit`, `offset` ou `cursor`) pour toutes les listes volumineuses.
- Optimiser le poids des images retournées par l'API (compression côté serveur).

---
*Documentation générée pour l'équipe d'intégration Discover Sénégal.*
