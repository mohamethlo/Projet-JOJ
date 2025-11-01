import React, { useMemo } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { useLanguage } from '@/context/LanguageContext';
import { cn } from '@/lib/utils';
import {
  Home,
  User,
  Users,
  Calendar,
  BookOpen,
  Shield,
  Map,
  Settings,
  BarChart3,
  CheckCircle,
  MessageSquare,
  Star,
  Building,
  Flag,
  FileText,
  UserCog,
  Compass,
  QrCode,
  Ticket
} from 'lucide-react';

const Sidebar = () => {
  const { user } = useAuth();
  const { t } = useLanguage();
  const location = useLocation();

  const menuItems = useMemo(() => {
    const commonItems = [
      { href: '/dashboard', icon: Home, label: t('dashboard') },
      { href: '/profile', icon: User, label: t('profile') },
      { href: '/guides', icon: Users, label: t('guides') },
      { href: '/events', icon: Calendar, label: t('events') },
      { href: '/accommodation', icon: Building, label: 'Hébergement' },
      { href: '/mes-tickets', icon: Ticket, label: 'Mes Tickets' },
      { href: '/history', icon: BookOpen, label: t('history') },
      { href: '/map', icon: Map, label: t('map') },
      { href: '/signaler', icon: Flag, label: 'Signaler/Commenter' }
    ];

    if (user?.role === 'admin') {
      return [
        ...commonItems,
        { href: '/admin/validation', icon: CheckCircle, label: 'Validation', isAdminSection: true },
        { href: '/admin/moderation', icon: MessageSquare, label: 'Modération', isAdminSection: true },
        { href: '/admin/users', icon: UserCog, label: 'Gestion des Utilisateurs', isAdminSection: true },
        { href: '/admin/statistics', icon: BarChart3, label: 'Statistiques', isAdminSection: true },
        { href: '/admin/articles', icon: FileText, label: 'Gestion des Articles', isAdminSection: true },
        { href: '/admin/accommodation', icon: Building, label: 'Gestion Hébergements' }
      ];
    }

        if (user?.role === 'guide') {
          return [
            ...commonItems,
            { href: '/guide/tours', icon: Compass, label: 'Mes Visites Guidées' },
            { href: '/guide/bookings', icon: Calendar, label: 'Réservations' }
          ];
        }

    if (user?.role === 'organizer') {
      return [
        ...commonItems,
        { href: '/organizer/events', icon: Calendar, label: 'Mes Événements' }
      ];
    }

    // Espace Agent de sécurité
    if (user?.role === 'security') {
      return [
        { href: '/security/dashboard', icon: Home, label: 'Dashboard' },
        { href: '/guides', icon: Users, label: t('guides') },
        { href: '/accommodation', icon: Building, label: 'Hébergement' },
        { href: '/security/reports', icon: Shield, label: 'Signalements' },
        { href: '/signaler', icon: Flag, label: 'Signaler/Commenter' },
        { href: '/security/scanner', icon: QrCode, label: 'Scanner QR' }
      ];
    }

    return [
      ...commonItems
    ];
  }, [user?.role, t]);

  if (location.pathname === '/login' || location.pathname === '/register') {
    return null;
  }

  return (
    <div className="w-64 bg-white shadow-lg h-screen fixed left-0 top-0 z-30 overflow-y-auto">
      <div className="p-6 border-b">
        <h1 className="text-2xl font-bold text-orange-600">DiscoverSenegal</h1>
        <p className="text-sm text-gray-500 mt-1">Plateforme de tourisme</p>
      </div>
      
      <nav className="mt-6">
        <div className="px-4 space-y-2">
          {menuItems.map((item, index) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.href;
            const isAdminSection = item.isAdminSection;
            const prevItem = menuItems[index - 1];
            const showSeparator = isAdminSection && (!prevItem || !prevItem.isAdminSection);
            
            return (
              <div key={item.href}>
                {showSeparator && (
                  <div className="my-2 border-t border-gray-200"></div>
                )}
                <Link
                  to={item.href}
                  className={cn(
                    'flex items-center space-x-3 px-3 py-2 rounded-lg transition-colors',
                    isActive 
                      ? 'bg-orange-100 text-orange-700 font-medium' 
                      : 'text-gray-600 hover:bg-gray-100',
                    isAdminSection && 'ml-2'
                  )}
                >
                  <Icon size={20} />
                  <span>{item.label}</span>
                </Link>
              </div>
            );
          })}
        </div>
      </nav>
    </div>
  );
};

export default Sidebar;
