import { useMemo } from 'react';
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
  Ticket,
  Bed,
  UtensilsCrossed,
  Newspaper,
  X,
  MessageCircle,
  Video
} from 'lucide-react';

const Sidebar = ({ isOpen, onClose }: { isOpen?: boolean; onClose?: () => void }) => {
  const { user } = useAuth();
  const { t } = useLanguage();
  const location = useLocation();

  const menuItems = useMemo(() => {
    const commonItems = [
      { href: '/dashboard', icon: Home, label: t('dashboard') },
      { href: '/echos-senegal', icon: Newspaper, label: 'Échos du Sénégal' },
      { href: '/videos', icon: Video, label: 'Vidéos' },
      { href: '/messages', icon: MessageCircle, label: 'Messages' },
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

    if (user?.role === 'hotel') {
      return [
        { href: '/dashboard', icon: Home, label: t('dashboard') },
        { href: '/messages', icon: MessageCircle, label: 'Messages' },
        { href: '/echos-senegal', icon: Newspaper, label: 'Échos du Sénégal' },
        { href: '/establishment/bookings', icon: Calendar, label: 'Réservations' },
        { href: '/establishment/rooms', icon: Bed, label: 'Chambres' },
        { href: '/establishment/profile', icon: Building, label: 'Profil Hôtel' },
        { href: '/establishment/reviews', icon: Star, label: 'Avis Clients' },
        { href: '/history', icon: BookOpen, label: t('history') },
        { href: '/profile', icon: User, label: 'Mon Profil' }
      ];
    }

    if (user?.role === 'restaurant') {
      return [
        { href: '/dashboard', icon: Home, label: t('dashboard') },
        { href: '/messages', icon: MessageCircle, label: 'Messages' },
        { href: '/echos-senegal', icon: Newspaper, label: 'Échos du Sénégal' },
        { href: '/establishment/bookings', icon: Calendar, label: 'Réservations' },
        { href: '/establishment/menu', icon: UtensilsCrossed, label: 'Menu' },
        { href: '/establishment/profile', icon: Building, label: 'Profil Restaurant' },
        { href: '/establishment/reviews', icon: Star, label: 'Avis Clients' },
        { href: '/history', icon: BookOpen, label: t('history') },
        { href: '/profile', icon: User, label: 'Mon Profil' }
      ];
    }

    // Espace Agent de sécurité
    if (user?.role === 'security') {
      return [
        { href: '/security/dashboard', icon: Home, label: 'Dashboard' },
        { href: '/videos', icon: Video, label: 'Vidéos' },
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
    <div className={cn(
      "w-64 bg-white shadow-lg h-screen fixed left-0 top-0 z-30 transition-transform duration-300 overflow-y-auto lg:translate-x-0",
      isOpen ? "translate-x-0" : "-translate-x-full"
    )}>
      <div className="p-6 border-b flex items-center justify-between">
        <div>
          <h1 className="text-xl font-black text-[#6B4226] tracking-tighter">DISCOVER <span className="text-[#F2A900]">SÉNÉGAL</span></h1>
          <p className="text-[10px] text-gray-500 font-bold uppercase tracking-widest leading-none mt-1">Plateforme de tourisme</p>
        </div>
        <button onClick={onClose} className="lg:hidden p-1 text-gray-400 hover:text-[#6B4226]">
          <X size={20} />
        </button>
      </div>

      <nav className="mt-6">
        <div className="px-4 space-y-2">
          {menuItems.map((item, index) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.href;
            const isAdminSection = 'isAdminSection' in item ? item.isAdminSection : false;
            const prevItem = index > 0 ? menuItems[index - 1] : null;
            const showSeparator = isAdminSection && (!prevItem || !('isAdminSection' in prevItem) || !prevItem.isAdminSection);

            return (
              <div key={item.href}>
                {showSeparator && (
                  <div className="my-2 border-t border-gray-200"></div>
                )}
                <Link
                  to={item.href}
                  onClick={onClose}
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
