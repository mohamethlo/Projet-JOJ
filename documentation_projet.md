# 📖 DISCOVER SÉNÉGAL - DOCUMENTATION COMPLÈTE DU PROJET

Ce document constitue la référence absolue et détaillée de l'intégralité de la plateforme Discover Sénégal. Chaque fonctionnalité, page, et composant développé y est répertorié de manière exhaustive.

---

## 1. 🏗️ ARCHITECTURE & TECHNOLOGIES

### Stack Technologique
*   **Frontend** : Framework React 19, TypeScript, propulsé par Vite.js.
*   **Routage** : React Router DOM (Navigation CSR fluide).
*   **Styling** : Tailwind CSS (approches utilitaires).
*   **Composants UI** : Base Shadcn UI / Radix UI (Dialog, Avatar, Select, Tabs, Switch).
*   **Data Visualization** : Recharts (pour les graphiques d'analyse).
*   **Iconographie** : Lucide-React.
*   **Notifications** : Sonner (Toasts élégants), SweetAlert2 (Modales de confirmation).

### Design System : "Terre & Or"
L'ensemble de l'application respecte une charte graphique premium et immersive reflétant l'authenticité africaine :
*   **Couleurs** : Brun profond (`#2D1B08`), Or/Ambre (`#F2A900`), Vert Nature (`#1B5E20`) et Beige Clair (`#EBE3D5` / `#FAFAFA`) en background.
*   **Formes** : Très larges arrondis (`rounded-2xl` à `rounded-[3rem]`) sur les cartes et images.
*   **Effets** : Ombres douces (`shadow-sm`, `shadow-xl` au survol), floutages (`backdrop-blur-md`), transitions CSS lisses.

---

## 2. 🔐 IDENTITÉ & REDIRECTIONS (RBAC)

Le système de navigation est gardé par un composant `ProtectedRoute` appuyé sur `AuthContext`. L'application reconnaît **9 rôles** :
`user` (Touriste), `admin` (Administrateur), `guide` (Guide Local), `hotel` (Hébergement), `restaurant` (Débit de boisson/Resto), `agency` (Agence de Voyage), `artisan` (Créateur Local), `organizer` (Événementiel), `security` (Agent Sécurité).

---

## 3. 🌍 L'EXPOSITION PUBLIQUE (Exploration Libre)
Ces pages, enveloppées par `ExploreLayout`, sont accessibles à tous.

### 3.1. Landing Page (`/`)
*   **Contenu** : Page de capture et d'immersion "Vivez Sénégalais".
*   **L'expérience** : Bannières vidéos, mise en avant culturelle, et boutons d'appel à l'action pour créer un compte ou découvrir le Feed.

### 3.2. Échos du Sénégal (`/echos-senegal`) -> `DiscoverFeedPage.tsx`
C'est le cœur social de la plateforme (style réseau social / Instagram).
*   **Haut de page** : Boutons de filtre de catégories (Culture, Gastronomie, Nature). Option pour rédiger une publication (`CreatePostModal`).
*   **Le Fil d'actualité** : Composants `PostCard` affichant l'auteur, la date, une grande image en carrousel, le texte, et les compteurs (Likes, Commentaires, Partages).
*   **Interactions** : Bouton Like (cœur rouge), ouverture des commentaires, et Menu d'Options (trois points) incluant le composant **`ReportPostModal`** (permettant de signaler des contenus via 6 catégories urgentes).

### 3.3. Mur Vidéos (`/videos`)
*   **Contenu** : Un fil d'actualité orienté contenu vertical plein écran (style TikTok/Reels) pour les promoteurs culturels.

### 3.4. Annuaires (Guides, Événements, Hébergement, Restaurants, Agences, Artisans)
*   **Pages :** `/guides`, `/events`, `/accommodation`, `/restaurants`, `/agencies`, `/artisans`.
*   **Contenu** : Listes de cartes (Grilles) présentant l'ensemble des professionnels.
*   **Fonctionnalités** : Barres de recherche, filtres (Prix, Note, Localisation), affichage par cartes interactives (`AgencyCard`, `ArtisanCard`) menant vers les profils publics détaillés.

### 3.5. Histoire, Culture et Carte Interractive (`/history`, `/map`)
*   **HistoryPage** : Documentaires textuels et visuels sur le patrimoine (ex: Gorée).
*   **MapPage** : Intégration cartographique avec épingles dynamiques pour situer les événements et lieux.

### 3.6. Les Profils Publics (`/establishment/:id`, `/artisan/:id`, `/user/:id`)
*   **Artisan Public Profile** : Structure en onglets dynamiques : *Vitrine* (Cover XXL et avatar), *La Maison* (liste des articles à vendre intégrée via modale d'achat), *À Propos* (Histoire, position GPS), *Avis*.
*   **Établissement Public Profile** : Similaire, mais orienté chambres (Hotel) ou menu (Restaurant) avec bouton de réservation.

---

## 4. 🪪 ESPACES COMMUNS CONNECTÉS
Chaque utilisateur connecté (quel que soit son rôle) a accès à ce socle.

### 4.1. Tableau de bord Global (`/dashboard`)
*   **Contenu** : Vue d'ensemble récapitulative personnalisée en fonction du rôle de l'utilisateur lors de sa connexion.

### 4.2. Notifications & Messagerie (`/notifications`, `/messages`)
*   **NotificationsPage** : Liste des alertes du système, statuts de commande, ou messages.
*   **MessagesPage** : Chat en temps réel (Liste de conversations à gauche, fenêtre de chat à droite) avec bulles différenciées, particulièrement utile pour le contact Client-Artisan ou Client-Guide.

### 4.3. Profil Utilisateur & Mes Tickets (`/profile`, `/mes-tickets`)
*   **ProfilePage** : Modification du mot de passe, avatar, et des données personnelles.
*   **MesTicketsPage** : Gestionnaire (Wallet) des réservations confirmées.
*   **TicketDetailsPage** (`/mes-tickets/:id`) : Affichage d'un reçu magnifique avec **génération de QR Code interactif** pour le contrôle d'accès.

---

## 5. 👑 LE HUB ADMINISTRATEUR ("Administration Suprême")
Enveloppé dans le rôle `admin`. Conçu pour la Big Data et la modération.

### 5.1. Dashboard Principal (`/dashboard` admin)
*   **DashboardContent.tsx** : Composant analytique premium.
*   **En-tête** : Salutation dynamique, badge d'autorité et compteur d'alertes via Lucide.
*   **Statistiques (StatCard)** : 6 cartes KPI incluant l'évolution mensuelle, barres de progression colorées (Utilisateurs, Nouveaux Inscrits, Publications, Vidéos, Artisans, Messages).
*   **Analytics Recharts (ChartCard)** : Graphique de croissance (AreaChart courbée sur 7 jours), Histogramme de l'activité (Posts vs Commentaires), Diagramme Circulaire (Répartition des métiers).
*   **ActivityFeed** : Registre défilant avec avatar des dernières actions de toute la base.
*   **TopPerformers** : Classement analytique des meilleurs Artisans (Likes), Posts (Vues) et Guides (Visites).
*   **AlertList** : Fil d'alerte en temps réel, triant les Signalements ("Attention" vs "Critique") grâce aux boutons rouges/oranges.

### 5.2. Gestion des Entités (`/admin/...`)
*   **Modération (`/admin/moderation`)** : Interface de résolution des tickets de signalement.
*   **Validation (`/admin/validation`)** : Queue de validation pour approuver/refuser l'inscription des nouveaux pros.
*   **Pages de Liste** : `UsersPage`, `AccommodationPage`, `RestaurantsPage`, `AgenciesPage`. Des tableaux de données denses (DataTables) permettant de bloquer, d'approuver ou de contacter chaque acteur.
*   **Articles (`/admin/articles`)** : CMS basique permettant aux admins de rédiger et publier des guides.

---

## 6. 💼 ESPACES "MÉTIERS" DÉTAILLÉS (Back-Office Professionnel)
Les tableaux de bord spécifiques de chaque travailleur.

### 6.1. Espace ARTISAN (`/artisan/...`)
*   **ProfilePage ("Mon Échoppe")** : Formulaire de paramétrage de l'histoire, lieu, et spécialité. Configuration d'une grande image de couverture, et sélecteurs de tags (Ex: "Tapis", "Bois").
*   **ProductsPage** : L'inventaire. Permet d'ajouter un produit, un prix, une description et un stock.
*   **OrdersPage ("Mes Commandes")** : Interface logistique (Listes avec badges : En attente, En préparation, Expédiée). Clic sur une ligne = Ouverture modale de détails du client = Boutons de changement de statut d'expédition.

### 6.2. Espace AGENCE DE VOYAGE (`/agency/...`)
*   **AgencyProfilePage** : Gestion des informations de contact et d'immatriculation.
*   **AgencyOffersPage (`/establishment/offers`)** : Système de publication des séjours.
*   **AgencyBookingsPage / AgencyReviewsPage** : Listes des voyageurs inscrits et réponse aux évaluations publiques.

### 6.3. Espace RESTAURANT & HÔTEL (`/establishment/...`)
*   **ProfilePage** : Présentation du lieu (adresse physique, type de cuisine, nombre d'étoiles).
*   **RoomsPage / MenuPage** : Un Hôtel gère ses chambres (type de lit, wifi, clim, prix par nuit). Un Restaurant gère sa carte (Entrées, Plats, Desserts, prix).
*   **BookingsPage** : Calendrier/Liste de suivi des tables retenues ou des chambres bookées.
*   **ReviewsPage** : Réponse aux commentaires clients.

### 6.4. Espace ORGANISATEUR `/organizer/events`
*   Lieu pour créer une billetterie (titre événementiel, date, quotas de place, upload d'affiche).

### 6.5. Espace GUIDE (`/guide/...`)
*   **GuideManagementPage (`/guide/tours`)** : Module de création de "Tours".
*   **GuideBookingsPage** : Historique des touristes pour une visite spécifique.

---

## 7. 🛡️ ESPACE SÉCURITÉ ("Sur le Terrain")
Un rôle conçu pour des agents physiques contrôleurs de l'événementiel ou des hôtels.
*   **Dashboard (`/security/dashboard`)**
*   **Reports (`/security/reports`)** : Carnet de signalement spécial incident réel.
*   **ScannerPage (`/security/scanner`)** : Un lecteur de QR code utilisant la caméra de smartphone ou tablette. Il lit le QR d'un utilisateur, vérifie sa base dans "Ses Tickets", et affiche instantanément si le billet est `Valide (Vert)` ou `Faux/Déjà utilisé (Rouge)`.

---

## 8. 🛠️ COMPOSANTS REMARQUABLES (Boîte à outils de l'app)
*   `ReportPostModal` : Composant modale à multiples états de soumission, scroll interne sécurisé, et gestion d'erreurs.
*   `Layout` & `Sidebar` : Squelette encadrant toutes les pages privées. Structure avec menu latéral dynamique adaptant ses onglets de navigation en fonction du rôle (`user !== 'admin'` affiche des menus différents de `'admin'`).
*   `ExploreLayout` : Squelette des pages publiques (Affiche la Topbar avec barre de recherche, bouton connexion).
*   `LoginPage` : Le système d'authentification réunit en une seule passe le **Formulaire Classique** et le **Flux asynchrone "Mot de passe oublié"** structuré en trois vues (`login`, `forgot`, `success`), garantissant l'absence de rechargement réseau intempestif. 

---
*Ce document retrace 100% de la structure de Discover Sénégal. Tout est codé, documenté, stylisé et en place, prêt pour la liaison finale à l'API Data logicielle.*
