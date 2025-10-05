import React from 'react';
import { useAuth } from '@/context/AuthContext';
import TouristDashboard from '@/components/dashboard/TouristDashboard';
import GuideDashboard from '@/components/dashboard/GuideDashboard';
import OrganizerDashboard from '@/components/dashboard/OrganizerDashboard';
import AdminDashboard from '@/components/dashboard/AdminDashboard';
import SecurityDashboard from '@/components/dashboard/SecurityDashboard';

const DashboardPage: React.FC = () => {
  const { user } = useAuth();

  if (!user) return null;

  const getDashboardTitle = (role: string) => {
    switch (role) {
      case 'admin':
        return 'Administration - laTeranga';
      case 'guide':
        return 'Espace Guide';
      case 'organizer':
        return 'Espace Organisateur';
      case 'security':
        return 'Sécurité & Surveillance';
      default:
        return 'Tableau de bord';
    }
  };

  const getDashboardDescription = (role: string) => {
    switch (role) {
      case 'admin':
        return 'Gérez la plateforme laTeranga et supervisez l\'activité';
      case 'guide':
        return 'Gérez vos visites et développez votre activité de guide';
      case 'organizer':
        return 'Créez et gérez vos événements pour la communauté';
      case 'security':
        return 'Assurez la sécurité et la tranquillité sur la plateforme';
      default:
        return 'Découvrez le meilleur du Sénégal avec laTeranga';
    }
  };

  const renderDashboard = () => {
    switch (user.role) {
      case 'admin':
        return <AdminDashboard user={user} />;
      case 'guide':
        return <GuideDashboard user={user} />;
      case 'organizer':
        return <OrganizerDashboard user={user} />;
      case 'security':
        return <SecurityDashboard user={user} />;
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
