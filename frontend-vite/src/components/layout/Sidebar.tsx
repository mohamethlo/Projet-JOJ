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
  Video,
  Utensils,
  Plane,
  Palette,
  ShoppingBag
} from 'lucide-react';
import { Button } from '@/components/ui/button';

const Sidebar = ({ isOpen, onClose }: { isOpen?: boolean; onClose?: () => void }) => {
  const { user } = useAuth();
  const { t } = useLanguage();
  const location = useLocation();

  const menuItems = useMemo(() => {
    const guestItems = [
      { href: '/echos-senegal', icon: Newspaper, label: 'Échos du Sénégal' },
      { href: '/videos', icon: Video, label: 'Vidéos' },
      { href: '/guides', icon: Users, label: t('guides') },
      { href: '/events', icon: Calendar, label: t('events') },
      { href: '/accommodation', icon: Building, label: 'Hébergement' },
      { href: '/restaurants', icon: Utensils, label: 'Restauration' },
      { href: '/agencies', icon: Plane, label: 'Agences de Voyage' },
      { href: '/artisans', icon: Palette, label: 'Artisans' },
      { href: '/history', icon: BookOpen, label: t('history') },
      { href: '/map', icon: Map, label: t('map') },
    ];

    if (!user) {
      return guestItems;
    }

    const commonItems = [
      { href: '/dashboard', icon: Home, label: t('dashboard') },
      ...guestItems.filter(item => item.href !== '/dashboard'), // Avoid duplicates if any
      { href: '/messages', icon: MessageCircle, label: 'Messages' },
      { href: '/mes-tickets', icon: Ticket, label: 'Mes Tickets' },
      { href: '/signaler', icon: Flag, label: 'Signaler/Commenter' }
    ].sort((a, b) => {
      // Simple sorting or custom order if needed
      const order = ['/dashboard', '/echos-senegal', '/videos', '/messages', '/guides', '/artisans', '/events', '/accommodation', '/restaurants', '/agencies', '/mes-tickets', '/history', '/map', '/signaler'];
      return order.indexOf(a.href) - order.indexOf(b.href);
    });

    if (user?.role === 'admin') {
      return [
        ...commonItems,
        { href: '/admin/validation', icon: CheckCircle, label: 'Validation', isAdminSection: true },
        { href: '/admin/moderation', icon: MessageSquare, label: 'Modération', isAdminSection: true },
        { href: '/admin/users', icon: UserCog, label: 'Gestion des Utilisateurs', isAdminSection: true },
        { href: '/admin/statistics', icon: BarChart3, label: 'Statistiques', isAdminSection: true },
        { href: '/admin/articles', icon: FileText, label: 'Gestion des Articles', isAdminSection: true },
        {href: '/admin/accommodation', icon: Building, label: 'Gestion Hébergements', isAdminSection: true },
        { href: '/admin/restaurants', icon: Utensils, label: 'Gestion Restaurants', isAdminSection: true },
        { href: '/admin/agencies', icon: Plane, label: 'Gestion Agences', isAdminSection: true }
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
        { href: '/establishment/rooms', icon: Bed, label: 'Unités / Chambres' },
        { href: '/establishment/profile', icon: Building, label: 'Profil Établissement' },
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

    if (user?.role === 'agency') {
      return [
        { href: '/dashboard', icon: Home, label: t('dashboard') },
        { href: '/messages', icon: MessageCircle, label: 'Messages' },
        { href: '/echos-senegal', icon: Newspaper, label: 'Échos du Sénégal' },
        { href: '/agency/bookings', icon: Calendar, label: 'Réservations' },
        { href: '/establishment/offers', icon: Plane, label: 'Nos Offres' },
        { href: '/agency/profile', icon: Building, label: 'Profil Agence' },
        { href: '/agency/reviews', icon: Star, label: 'Avis Clients' },
        { href: '/history', icon: BookOpen, label: t('history') },
        { href: '/profile', icon: User, label: 'Mon Profil' }
      ];
    }

    if (user?.role === 'security') {
      return [
        { href: '/security/dashboard', icon: Home, label: 'Dashboard' },
        { href: '/videos', icon: Video, label: 'Vidéos' },
        { href: '/guides', icon: Users, label: t('guides') },
        { href: '/accommodation', icon: Building, label: 'Hébergement' },
        { href: '/restaurants', icon: Utensils, label: 'Restauration' },
        { href: '/security/reports', icon: Shield, label: 'Signalements' },
        { href: '/signaler', icon: Flag, label: 'Signaler/Commenter' },
        { href: '/security/scanner', icon: QrCode, label: 'Scanner QR' }
      ];
    }

    if (user?.role === 'artisan') {
      return [
        { href: '/dashboard', icon: Home, label: t('dashboard') },
        { href: '/messages', icon: MessageCircle, label: 'Messages' },
        { href: '/echos-senegal', icon: Newspaper, label: 'Échos du Sénégal' },
        { href: '/artisan/orders', icon: Calendar, label: 'Mes Commandes' },
        { href: '/artisan/products', icon: ShoppingBag, label: 'Mes Produits' },
        { href: '/artisan/profile', icon: Building, label: 'Mon Échoppe' },
        { href: '/admin/statistics', icon: BarChart3, label: 'Statistiques' },
        { href: '/history', icon: BookOpen, label: t('history') },
        { href: '/profile', icon: User, label: 'Mon Profil' }
      ];
    }

    if (user?.role === 'museum') {
      return [
        { href: '/dashboard', icon: Home, label: t('dashboard') },
        { href: '/messages', icon: MessageCircle, label: 'Messages' },
        { href: '/echos-senegal', icon: Newspaper, label: 'Échos du Sénégal' },
        { href: '/museum/exhibitions', icon: Calendar, label: 'Expositions' },
        { href: '/museum/collections', icon: Palette, label: 'Collections' },
        { href: '/museum/tickets', icon: Ticket, label: 'Billetterie' },
        { href: '/museum/profile', icon: Building, label: 'Profil Musée' },
        { href: '/history', icon: BookOpen, label: t('history') },
        { href: '/profile', icon: User, label: 'Mon Profil' }
      ];
    }

    return commonItems;
  }, [user, t]);

  if (location.pathname === '/auth/login' || location.pathname === '/auth/register') {
    return null;
  }

  return (
    <div className={cn(
      "w-64 bg-white shadow-lg h-screen fixed left-0 top-0 z-40 transition-transform duration-300 overflow-y-auto lg:translate-x-0",
      isOpen ? "translate-x-0" : "-translate-x-full"
    )}>
      <div className="p-6 border-b flex items-center justify-between">
        <Link to="/" className="group transition-transform hover:scale-105 active:scale-95">
          <h1 className="text-xl font-black text-[#6B4226] group-hover:text-[#F2A900] transition-colors tracking-tighter">DISCOVER <span className="text-[#F2A900]">SÉNÉGAL</span></h1>
          <p className="text-[10px] text-gray-500 font-bold uppercase tracking-widest leading-none mt-1">Plateforme de tourisme</p>
        </Link>
        <button onClick={onClose} className="lg:hidden p-1 text-gray-400 hover:text-[#6B4226]">
          <X size={20} />
        </button>
      </div>

      <nav className="mt-6">
        {!user && (
          <div className="px-6 mb-6">
            <div className="bg-[#1B5E20]/5 border border-[#1B5E20]/10 rounded-2xl p-4">
              <p className="text-[10px] font-black text-[#1B5E20] uppercase tracking-widest mb-3">Expérience complète</p>
              <Link to="/auth/register">
                <Button className="w-full bg-[#1B5E20] hover:bg-[#154618] text-white font-black rounded-xl h-9 text-[10px] uppercase tracking-widest shadow-md">
                  S'inscrire
                </Button>
              </Link>
            </div>
          </div>
        )}

        <div className="px-4 space-y-1">
          {menuItems.map((item, index) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.href;
            const isAdminSection = 'isAdminSection' in item ? item.isAdminSection : false;
            const prevItem = index > 0 ? menuItems[index - 1] : null;
            const showSeparator = isAdminSection && (!prevItem || !('isAdminSection' in prevItem) || !prevItem.isAdminSection);

            return (
              <div key={item.href}>
                {showSeparator && (
                  <div className="my-2 border-t border-gray-100 mx-2"></div>
                )}
                <Link
                  to={item.href}
                  onClick={onClose}
                  className={cn(
                    'flex items-center space-x-3 px-3 py-2.5 rounded-xl transition-all group',
                    isActive
                      ? 'bg-[#F2A900]/10 text-[#2D1B08] font-black'
                      : 'text-[#5D4037]/70 hover:bg-gray-50 hover:text-[#2D1B08]',
                    isAdminSection && 'ml-2'
                  )}
                >
                  <Icon size={18} className={cn(
                    "transition-transform group-hover:scale-110",
                    isActive ? "text-[#F2A900]" : "text-[#5D4037]/40"
                  )} />
                  <span className="text-xs font-bold tracking-tight uppercase">{item.label}</span>
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
