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
    if (!user) {
      return [
        { href: '/echos-senegal', icon: Newspaper, label: 'Échos du Sénégal' },
        { href: '/videos', icon: Video, label: 'Vidéos' },
        { href: '/guides', icon: Users, label: t('guides') },
        { href: '/accommodation', icon: Building, label: 'Hébergement' },
        { href: '/restaurants', icon: Utensils, label: 'Restauration' },
        { href: '/agencies', icon: Plane, label: 'Agences de Voyage' },
        { href: '/artisans', icon: Palette, label: 'Artisans' },
        { href: '/history', icon: BookOpen, label: t('history') },
        { href: '/map', icon: Map, label: t('map') },
      ];
    }

    // --- 🛠️ Admin Role ---
    if (user?.role === 'admin') {
      return [
        { section: 'ADMINISTRATION', items: [
          { href: '/dashboard', icon: Home, label: 'Tableau de Bord' },
          { href: '/admin/validation', icon: CheckCircle, label: 'Validation' },
          { href: '/admin/moderation', icon: MessageSquare, label: 'Modération' },
          { href: '/admin/users', icon: UserCog, label: 'Utilisateurs' },
          { href: '/admin/statistics', icon: BarChart3, label: 'Statistiques Globales' },
        ]},
        { section: 'CONTENU', items: [
          { href: '/admin/articles', icon: FileText, label: 'Articles & Échos' },
          { href: '/admin/accommodation', icon: Building, label: 'Hébergements' },
          { href: '/admin/restaurants', icon: Utensils, label: 'Restaurants' },
          { href: '/admin/agencies', icon: Plane, label: 'Agences' },
        ]}
      ];
    }

    // --- 🏨 Accommodation / Hotel Role ---
    if (user?.role === 'hotel') {
      // Logic for dynamic label (simulated here)
      const isHotel = true; // In real use, check user data
      
      return [
        { section: 'PILOTAGE', items: [
          { href: '/dashboard', icon: Home, label: 'Tableau de Bord' },
          { href: '/messages', icon: MessageCircle, label: 'Messages' },
        ]},
        { section: 'GESTION LOCATIVE', items: [
          { href: '/establishment/bookings', icon: Calendar, label: 'Réservations' },
          { href: '/establishment/rooms', icon: Bed, label: isHotel ? 'Chambres & Suites' : 'Mes Logements' },
        ]},
        { section: 'VISIBILITÉ & RÉSEAU', items: [
          { href: '/establishment/profile', icon: Building, label: 'Profil Public' },
          { href: '/establishment/reviews', icon: Star, label: 'Avis Clients' },
          { href: '/echos-senegal', icon: Newspaper, label: 'Publier un Écho' },
        ]},
        { section: 'COMPTE', items: [
          { href: '/profile', icon: User, label: 'Mon Compte' },
          { href: '/history', icon: BookOpen, label: 'Aide & Support' },
        ]}
      ];
    }

    // --- 🍽️ Restaurant Role ---
    if (user?.role === 'restaurant') {
      return [
        { section: 'PILOTAGE', items: [
          { href: '/dashboard', icon: Home, label: 'Tableau de Bord' },
          { href: '/messages', icon: MessageCircle, label: 'Messages' },
        ]},
        { section: 'SERVICE', items: [
          { href: '/establishment/bookings', icon: Calendar, label: 'Réservations Tables' },
          { href: '/establishment/menu', icon: UtensilsCrossed, label: 'Carte & Menu' },
        ]},
        { section: 'VISIBILITÉ', items: [
          { href: '/establishment/profile', icon: Building, label: 'Profil Restaurant' },
          { href: '/establishment/reviews', icon: Star, label: 'Avis Clients' },
        ]}
      ];
    }

    // --- ✈️ Agency Role ---
    if (user?.role === 'agency') {
      return [
        { section: 'PILOTAGE', items: [
          { href: '/dashboard', icon: Home, label: 'Tableau de Bord' },
          { href: '/messages', icon: MessageCircle, label: 'Messages' },
        ]},
        { section: 'OFFRES', items: [
          { href: '/agency/bookings', icon: Calendar, label: 'Réservations Clients' },
          { href: '/establishment/offers', icon: Plane, label: 'Nos Circuits & Offres' },
        ]},
        { section: 'PROFIL', items: [
          { href: '/agency/profile', icon: Building, label: 'Profil Agence' },
          { href: '/agency/reviews', icon: Star, label: 'Avis Clients' },
        ]}
      ];
    }

    // --- 🌍 Default / Tourist (User) Role ---
    return [
      { section: 'PILOTAGE', items: [
        { href: '/dashboard', icon: Home, label: 'Tableau de Bord' },
        { href: '/messages', icon: MessageCircle, label: 'Mes Messages' },
      ]},
      { section: 'DÉCOUVRIR LE SÉNÉGAL', items: [
        { href: '/echos-senegal', icon: Newspaper, label: 'Échos du Sénégal' },
        { href: '/videos', icon: Video, label: 'Vidéos Discover' },
        { href: '/events', icon: Calendar, label: 'Événements' },
        { href: '/accommodation', icon: Bed, label: 'Hébergements' },
        { href: '/restaurants', icon: Utensils, label: 'Restaurants' },
        { href: '/agencies', icon: Plane, label: 'Agences de Voyage' },
        { href: '/guides', icon: Users, label: 'Guides Locaux' },
        { href: '/artisans', icon: Palette, label: 'Artisans & Boutiques' },
      ]},
      { section: 'MON VOYAGE', items: [
        { href: '/mes-tickets', icon: Ticket, label: 'Mes Tickets & Résas' },
        { href: '/history', icon: BookOpen, label: 'Historique de Visite' },
        { href: '/map', icon: Map, label: 'Carte Interactive' },
      ]},
      { section: 'COMPTE', items: [
        { href: '/profile', icon: User, label: 'Mon Profil' },
        { href: '/signaler', icon: Flag, label: 'Signaler un Problème' },
      ]}
    ];
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

        <div className="px-4 space-y-7">
          {menuItems.map((sectionOrItem, sIndex) => {
            if ('section' in sectionOrItem) {
              return (
                <div key={sIndex} className="space-y-2">
                  <h3 className="px-3 text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] mb-3">{sectionOrItem.section}</h3>
                  <div className="space-y-1">
                    {sectionOrItem.items.map((item) => {
                      const Icon = item.icon;
                      const isActive = location.pathname === item.href;
                      return (
                        <Link
                          key={item.href}
                          to={item.href}
                          onClick={onClose}
                          className={cn(
                            'flex items-center space-x-3 px-3 py-2.5 rounded-xl transition-all group',
                            isActive
                              ? 'bg-[#2D1B08] text-white font-black shadow-xl shadow-[#2D1B08]/10'
                              : 'text-[#5D4037]/70 hover:bg-gray-50 hover:text-[#2D1B08]'
                          )}
                        >
                          <Icon size={18} className={cn(
                            "transition-transform group-hover:scale-110",
                            isActive ? "text-[#F2A900]" : "text-[#5D4037]/40"
                          )} />
                          <span className="text-[11px] font-bold tracking-tight uppercase">{item.label}</span>
                        </Link>
                      );
                    })}
                  </div>
                </div>
              );
            }

            // Fallback for simple items (guests)
            const Icon = sectionOrItem.icon;
            const isActive = location.pathname === sectionOrItem.href;
            return (
              <Link
                key={sectionOrItem.href}
                to={sectionOrItem.href}
                onClick={onClose}
                className={cn(
                  'flex items-center space-x-3 px-3 py-2.5 rounded-xl transition-all group',
                  isActive
                    ? 'bg-[#2D1B08] text-white font-black shadow-xl shadow-[#2D1B08]/10'
                    : 'text-[#5D4037]/70 hover:bg-gray-50 hover:text-[#2D1B08]'
                )}
              >
                <Icon size={18} className={cn(
                  "transition-transform group-hover:scale-110",
                  isActive ? "text-[#F2A900]" : "text-[#5D4037]/40"
                )} />
                <span className="text-[11px] font-bold tracking-tight uppercase">{sectionOrItem.label}</span>
              </Link>
            );
          })}
        </div>
      </nav>
    </div>
  );
};

export default Sidebar;
