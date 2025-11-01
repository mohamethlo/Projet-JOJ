import React from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
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
import SecurityDashboardPage from '@/pages/security/DashboardPage'
import SecurityReportsPage from '@/pages/security/ReportsPage'
import MesTicketsPage from '@/pages/mes-tickets/index'
import TicketDetailsPage from '@/pages/mes-tickets/TicketDetailsPage'

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
    <>
      <Routes>
        {/* Routes d'authentification */}
        <Route path="/auth/login" element={<LoginPage />} />
        <Route path="/auth/register" element={<RegisterPage />} />
        
        {/* Route racine */}
        <Route path="/" element={user ? <Navigate to="/dashboard" /> : <LandingPage />} />
        
        {/* Routes protégées avec Layout */}
        <Route path="/dashboard" element={
          <Layout>
            <DashboardPage />
          </Layout>
        } />
        <Route path="/notifications" element={
          <Layout>
            <NotificationsPage />
          </Layout>
        } />
        <Route path="/guides" element={
          <Layout>
            <GuidesPage />
          </Layout>
        } />
        <Route path="/events" element={
          <Layout>
            <EventsPage />
          </Layout>
        } />
        <Route path="/accommodation" element={
          <Layout>
            <AccommodationPage />
          </Layout>
        } />
        <Route path="/history" element={
          <Layout>
            <HistoryPage />
          </Layout>
        } />
        <Route path="/map" element={
          <Layout>
            <MapPage />
          </Layout>
        } />
        <Route path="/profile" element={
          <Layout>
            <ProfilePage />
          </Layout>
        } />
        <Route path="/mes-tickets" element={
          <Layout>
            <MesTicketsPage />
          </Layout>
        } />
        <Route path="/mes-tickets/:id" element={
          <Layout>
            <TicketDetailsPage />
          </Layout>
        } />
        
            {/* Routes Admin */}
            <Route path="/admin/validation" element={
              <Layout>
                <ValidationDashboard />
              </Layout>
            } />
            <Route path="/admin/moderation" element={
              <Layout>
                <ModerationPage />
              </Layout>
            } />
        <Route path="/admin/users" element={
          <Layout>
            <UsersPage />
          </Layout>
        } />
        <Route path="/admin/accommodation" element={
          <Layout>
            <AdminAccommodationPage />
          </Layout>
        } />
        <Route path="/admin/articles" element={
          <Layout>
            <ArticlesPage />
          </Layout>
        } />
        
        {/* Routes Organisateur */}
        <Route path="/organizer/events" element={
          <Layout>
            <OrganizerEventsPage />
          </Layout>
        } />
        
        {/* Routes Guide */}
        <Route path="/guide/tours" element={
          <Layout>
            <GuideManagementPage />
          </Layout>
        } />
        <Route path="/guide/bookings" element={
          <Layout>
            <GuideBookingsPage />
          </Layout>
        } />
        
        {/* Routes Sécurité */}
        <Route path="/security/dashboard" element={
          <Layout>
            <SecurityDashboardPage />
          </Layout>
        } />
        <Route path="/security/reports" element={
          <Layout>
            <SecurityReportsPage />
          </Layout>
        } />
        <Route path="/security/scanner" element={
          <Layout>
            <ScannerPage />
          </Layout>
        } />

        {/* Route Signaler */}
        <Route path="/signaler" element={
          <Layout>
            <SignalerPage />
          </Layout>
        } />
        
        {/* Route de fallback */}
        <Route path="*" element={
          <Layout>
            <div className="text-center py-12">
              <h1 className="text-2xl font-bold text-gray-900 mb-4">Page en cours de migration</h1>
              <p className="text-gray-600">Cette page sera bientôt disponible avec Vite !</p>
            </div>
          </Layout>
        } />
      </Routes>
      <Toaster position="top-right" />
    </>
  )
}

export default App