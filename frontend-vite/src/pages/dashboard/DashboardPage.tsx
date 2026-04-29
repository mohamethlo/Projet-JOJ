import React from 'react';
import { useAuth } from '@/context/AuthContext';
import TouristDashboard from '@/components/dashboard/TouristDashboard';
import GuideDashboard from '@/components/dashboard/GuideDashboard';
import OrganizerDashboard from '@/components/dashboard/OrganizerDashboard';
import AdminDashboard from '@/components/dashboard/AdminDashboard';
import SecurityDashboard from '@/components/dashboard/SecurityDashboard';
import EstablishmentDashboard from '@/components/dashboard/EstablishmentDashboard';
import ArtisanDashboard from '@/components/dashboard/ArtisanDashboard';
import RestaurantDashboard from '@/components/dashboard/RestaurantDashboard';
import AgencyDashboard from '@/components/dashboard/AgencyDashboard';
import MuseumDashboard from '@/components/dashboard/MuseumDashboard';

const DashboardPage: React.FC = () => {
  const { user } = useAuth();

  if (!user) return null;

  const getDashboardTitle = (role: string) => {
    switch (role) {
      case 'admin':
        return 'Administration - DiscoverSenegal';
      case 'guide':
        return 'Espace Guide';
      case 'artisan':
        return 'Ma Boutique Artisanale';
      case 'organizer':
        return 'Espace Organisateur';
      case 'security':
        return 'Sécurité & Surveillance';
      case 'hotel':
        return 'Espace Hébergement';
      case 'agency':
        return 'Espace Agence de Voyage';
      case 'restaurant':
        return 'Espace Restaurant';
      case 'museum':
        return 'Espace Musée & Patrimoine';
      default:
        return 'Tableau de bord';
    }
  };

  const getDashboardDescription = (role: string) => {
    switch (role) {
      case 'admin':
        return 'Gérez la plateforme DiscoverSenegal et supervisez l\'activité';
      case 'guide':
        return 'Gérez vos visites et développez votre activité de guide';
      case 'artisan':
        return 'Gérez vos créations, vos commandes et développez votre échoppe';
      case 'organizer':
        return 'Créez et gérez vos événements pour la communauté';
      case 'security':
        return 'Assurez la sécurité et la tranquillité sur la plateforme';
      case 'hotel':
        return 'Gérez votre établissement et offrez un séjour inoubliable à vos clients';
      case 'agency':
        return 'Gérez vos offres de voyages, vos réservations et votre visibilité';
      case 'restaurant':
        return 'Gérez votre restaurant et offrez une expérience culinaire exceptionnelle';
      case 'museum':
        return 'Gérez vos collections, vos expositions et accueillez les passionnés d\'histoire';
      default:
        return 'Découvrez le meilleur du Sénégal avec DiscoverSenegal';
    }
  };

  const renderDashboard = () => {
    switch (user.role) {
      case 'admin':
        return <AdminDashboard user={user} />;
      case 'guide':
        return <GuideDashboard user={user} />;
      case 'artisan':
        return <ArtisanDashboard user={user} />;
      case 'organizer':
        return <OrganizerDashboard user={user} />;
      case 'security':
        return <SecurityDashboard user={user} />;
      case 'hotel':
        return <EstablishmentDashboard user={user} />;
      case 'agency':
        return <AgencyDashboard user={user} />;
      case 'restaurant':
        return <RestaurantDashboard user={user} />;
      case 'museum':
        return <MuseumDashboard user={user} />;
      case 'tourist':
      case 'local':
      default:
        return <TouristDashboard user={user} />;
    }
  };

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900">{getDashboardTitle(user.role)}</h1>
        <p className="text-gray-600">{getDashboardDescription(user.role)}</p>
      </div>

      {renderDashboard()}
    </div>
  );
};

export default DashboardPage;
