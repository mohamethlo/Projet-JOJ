import { Routes, Route, Navigate } from 'react-router-dom'
import { useAuth } from '@/context/AuthContext'
import { Toaster } from 'sonner'
import Layout from '@/components/layout/Layout'
import ProtectedRoute from '@/components/auth/ProtectedRoute'

// Pages publiques
import LandingPage from '@/pages/landing/LandingPage'
import LoginPage from '@/pages/auth/login/LoginPage'
import RegisterPage from '@/pages/auth/register/RegisterPage'

// Pages principales
import DashboardPage from '@/pages/dashboard/DashboardPage'
import GuidesPage from '@/pages/guides/GuidesPage'
import EventsPage from '@/pages/events/EventsPage'
import AccommodationPage from '@/pages/accommodation/AccommodationPage'
import HistoryPage from '@/pages/history/HistoryPage'
import MapPage from '@/pages/map/MapPage'
import ProfilePage from '@/pages/profile/ProfilePage'
import SignalerPage from '@/pages/signaler/SignalerPage'

// Admin
import ValidationDashboard from '@/pages/admin/validation/ValidationDashboard'
import ModerationPage from '@/pages/admin/moderation/ModerationPage'
import UsersPage from '@/pages/admin/users/UsersPage'
import AdminAccommodationPage from '@/pages/admin/accommodation/AccommodationPage'
import ArticlesPage from '@/pages/admin/articles/ArticlesPage'

// Organizer & Guide
import OrganizerEventsPage from '@/pages/organizer/events/OrganizerEventsPage'
import GuideManagementPage from '@/pages/guide/guides/GuideManagementPage'
import GuideBookingsPage from '@/pages/guide/bookings/GuideBookingsPage'

const App = () => {
  const { user, isLoading } = useAuth()

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Chargement...</p>
        </div>
      </div>
    )
  }

  return (
    <>
      <Routes>
        {/* 🌍 Page d'accueil publique */}
        <Route path="/" element={user ? <Navigate to="/dashboard" /> : <LandingPage />} />

        {/* 🔐 Auth */}
        <Route
          path="/auth/login"
          element={user ? <Navigate to="/dashboard" /> : <LoginPage />}
        />
        <Route
          path="/auth/register"
          element={user ? <Navigate to="/dashboard" /> : <RegisterPage />}
        />

        {/* 📦 Routes protégées */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Layout><DashboardPage /></Layout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/guides"
          element={
            <ProtectedRoute>
              <Layout><GuidesPage /></Layout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/events"
          element={
            <ProtectedRoute>
              <Layout><EventsPage /></Layout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/accommodation"
          element={
            <ProtectedRoute>
              <Layout><AccommodationPage /></Layout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/history"
          element={
            <ProtectedRoute>
              <Layout><HistoryPage /></Layout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/map"
          element={
            <ProtectedRoute>
              <Layout><MapPage /></Layout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <Layout><ProfilePage /></Layout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/signaler"
          element={
            <ProtectedRoute>
              <Layout><SignalerPage /></Layout>
            </ProtectedRoute>
          }
        />

        {/* 👑 Admin */}
        <Route
          path="/admin/validation"
          element={
            <ProtectedRoute roles={['ADMIN']}>
              <Layout><ValidationDashboard /></Layout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/moderation"
          element={
            <ProtectedRoute roles={['ADMIN']}>
              <Layout><ModerationPage /></Layout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/users"
          element={
            <ProtectedRoute roles={['ADMIN']}>
              <Layout><UsersPage /></Layout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/accommodation"
          element={
            <ProtectedRoute roles={['ADMIN']}>
              <Layout><AdminAccommodationPage /></Layout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/articles"
          element={
            <ProtectedRoute roles={['ADMIN']}>
              <Layout><ArticlesPage /></Layout>
            </ProtectedRoute>
          }
        />

        {/* 🎯 Organizer */}
        <Route
          path="/organizer/events"
          element={
            <ProtectedRoute roles={['ORGANIZER', 'ADMIN']}>
              <Layout><OrganizerEventsPage /></Layout>
            </ProtectedRoute>
          }
        />

        {/* 🧭 Guide */}
        <Route
          path="/guide/tours"
          element={
            <ProtectedRoute roles={['GUIDE', 'ADMIN']}>
              <Layout><GuideManagementPage /></Layout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/guide/bookings"
          element={
            <ProtectedRoute roles={['GUIDE', 'ADMIN']}>
              <Layout><GuideBookingsPage /></Layout>
            </ProtectedRoute>
          }
        />

        {/* 🚫 Page inconnue */}
        <Route
          path="*"
          element={<Navigate to="/" replace />}
        />
      </Routes>

      <Toaster position="top-right" />
    </>
  )
}

export default App
