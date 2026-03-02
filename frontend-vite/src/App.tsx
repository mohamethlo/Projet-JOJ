import { Routes, Route, Navigate, Outlet } from 'react-router-dom'
import { useAuth } from '@/context/AuthContext'
import { Toaster } from 'sonner'
import Layout from '@/components/layout/Layout'
import DashboardPage from '@/pages/dashboard/DashboardPage'
import GuidesPage from '@/pages/guides/GuidesPage'
import EventsPage from '@/pages/events/EventsPage'
import AccommodationPage from '@/pages/accommodation/AccommodationPage'
import HistoryPage from '@/pages/history/HistoryPage'
import MapPage from '@/pages/map/MapPage'
import ProfilePage from '@/pages/profile/ProfilePage'
import LoginPage from '@/pages/auth/login/LoginPage'
import RegisterPage from '@/pages/auth/register/RegisterPage'
import ModerationPage from '@/pages/admin/moderation/ModerationPage'
import AdminAccommodationPage from '@/pages/admin/accommodation/AccommodationPage'
import ArticlesPage from '@/pages/admin/articles/ArticlesPage'
import UsersPage from '@/pages/admin/users/UsersPage'
import OrganizerEventsPage from '@/pages/organizer/events/OrganizerEventsPage'
import GuideManagementPage from '@/pages/guide/guides/GuideManagementPage'
import GuideBookingsPage from '@/pages/guide/bookings/GuideBookingsPage'
import ValidationDashboard from '@/pages/admin/validation/ValidationDashboard'
import SignalerPage from '@/pages/signaler/SignalerPage'
import LandingPage from '@/pages/landing/LandingPage'
import NotificationsPage from '@/pages/notifications/NotificationsPage'
import ScannerPage from '@/pages/security/ScannerPage'
import AgencyPage from '@/pages/agency/AgencyPage'
import AgencyOffersPage from '@/pages/agency/AgencyOffersPage'
import SecurityDashboardPage from '@/pages/security/DashboardPage'
import SecurityReportsPage from '@/pages/security/ReportsPage'
import MesTicketsPage from '@/pages/mes-tickets/index'
import TicketDetailsPage from '@/pages/mes-tickets/TicketDetailsPage'
import RoomsPage from '@/pages/establishment/RoomsPage'
import MenuPage from '@/pages/establishment/MenuPage'
import BookingsPage from '@/pages/establishment/BookingsPage'
import EstablishmentProfilePage from '@/pages/establishment/ProfilePage'
import ReviewsPage from '@/pages/establishment/ReviewsPage'
import DiscoverFeedPage from '@/pages/feed/DiscoverFeedPage'
import PublicEstablishmentProfilePage from '@/pages/establishment/EstablishmentProfilePage'
import MessagesPage from '@/pages/messages/MessagesPage'
import VideoFeedPage from '@/pages/videos/VideoFeedPage'
import UserPublicProfilePage from '@/pages/profile/UserPublicProfilePage'
import RestaurantPage from '@/pages/restaurant/RestaurantPage'

import { FeedProvider } from '@/context/FeedContext'
import { VisitorEngagementProvider } from '@/context/VisitorEngagementContext'

import ExploreLayout from '@/components/layout/ExploreLayout'
import ProtectedRoute from '@/components/auth/ProtectedRoute'

const App = () => {
  const { user, isLoading } = useAuth()

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Chargement...</p>
        </div>
      </div>
    )
  }

  return (
    <VisitorEngagementProvider>
      <FeedProvider>
        <Routes>
          {/* Routes d'authentification */}
          <Route path="/auth/login" element={<LoginPage />} />
          <Route path="/auth/register" element={<RegisterPage />} />

          {/* Route racine */}
          <Route path="/" element={user ? <Navigate to="/dashboard" /> : <LandingPage />} />

          {/* 🟢 PUBLIC EXPLORATION ROUTES (Accessible sans connexion) */}
          <Route element={<ExploreLayout />}>
            <Route path="/echos-senegal" element={<DiscoverFeedPage />} />
            <Route path="/videos" element={<VideoFeedPage />} />
            <Route path="/guides" element={<GuidesPage />} />
            <Route path="/events" element={<EventsPage />} />
            <Route path="/accommodation" element={<AccommodationPage />} />
            <Route path="/restaurants" element={<RestaurantPage />} />
            <Route path="/agencies" element={<AgencyPage />} />
            <Route path="/history" element={<HistoryPage />} />
            <Route path="/map" element={<MapPage />} />
            <Route path="/establishment/:id" element={<PublicEstablishmentProfilePage />} />
            <Route path="/user/:id" element={<UserPublicProfilePage />} />
          </Route>

          {/* 🔒 PROTECTED APP ROUTES (Authentification requise) */}
          <Route element={<ProtectedRoute><Layout><Outlet /></Layout></ProtectedRoute>}>
            <Route path="/dashboard" element={<DashboardPage />} />
            <Route path="/notifications" element={<NotificationsPage />} />
            <Route path="/messages" element={<MessagesPage />} />
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="/mes-tickets" element={<MesTicketsPage />} />
            <Route path="/mes-tickets/:id" element={<TicketDetailsPage />} />
            <Route path="/signaler" element={<SignalerPage />} />
          </Route>

          {/* Admin Routes */}
          <Route element={<ProtectedRoute roles={['admin']}><Layout><Outlet /></Layout></ProtectedRoute>}>
            <Route path="/admin/validation" element={<ValidationDashboard />} />
            <Route path="/admin/moderation" element={<ModerationPage />} />
            <Route path="/admin/users" element={<UsersPage />} />
            <Route path="/admin/accommodation" element={<AdminAccommodationPage />} />
            <Route path="/admin/articles" element={<ArticlesPage />} />
          </Route>

          {/* Organizer Routes */}
          <Route element={<ProtectedRoute roles={['organizer']}><Layout><Outlet /></Layout></ProtectedRoute>}>
            <Route path="/organizer/events" element={<OrganizerEventsPage />} />
          </Route>

          {/* Guide Routes */}
          <Route element={<ProtectedRoute roles={['guide']}><Layout><Outlet /></Layout></ProtectedRoute>}>
            <Route path="/guide/tours" element={<GuideManagementPage />} />
            <Route path="/guide/bookings" element={<GuideBookingsPage />} />
          </Route>

          {/* Security Routes */}
          <Route element={<ProtectedRoute roles={['security']}><Layout><Outlet /></Layout></ProtectedRoute>}>
            <Route path="/security/dashboard" element={<SecurityDashboardPage />} />
            <Route path="/security/reports" element={<SecurityReportsPage />} />
            <Route path="/security/scanner" element={<ScannerPage />} />
          </Route>

          {/* Establishment Routes */}
          <Route element={<ProtectedRoute roles={['hotel', 'restaurant']}><Layout><Outlet /></Layout></ProtectedRoute>}>
            <Route path="/establishment/bookings" element={<BookingsPage />} />
            <Route path="/establishment/profile" element={<EstablishmentProfilePage />} />
            <Route path="/establishment/reviews" element={<ReviewsPage />} />
          </Route>

          <Route element={<ProtectedRoute roles={['hotel']}><Layout><Outlet /></Layout></ProtectedRoute>}>
            <Route path="/establishment/rooms" element={<RoomsPage />} />
          </Route>

          <Route element={<ProtectedRoute roles={['restaurant']}><Layout><Outlet /></Layout></ProtectedRoute>}>
            <Route path="/establishment/menu" element={<MenuPage />} />
          </Route>

          <Route element={<ProtectedRoute roles={['agency']}><Layout><Outlet /></Layout></ProtectedRoute>}>
            <Route path="/establishment/offers" element={<AgencyOffersPage />} />
          </Route>

          <Route path="*" element={
            <Layout>
              <div className="text-center py-12">
                <h1 className="text-2xl font-bold text-gray-900 mb-4">Page non trouvée</h1>
                <p className="text-gray-600">La page que vous recherchez n'existe pas ou nous l'avons déplacée.</p>
                <Navigate to="/" replace />
              </div>
            </Layout>
          } />
        </Routes>
        <Toaster position="top-right" />
      </FeedProvider >
    </VisitorEngagementProvider>
  )
}

export default App