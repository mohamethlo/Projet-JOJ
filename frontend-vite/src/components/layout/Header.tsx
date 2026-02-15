import React, { useState, useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';
import { useLanguage } from '@/context/LanguageContext';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import { useNotifications } from '@/context/NotificationContext';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Bell,
  Globe,
  LogOut,
  User,
  Menu as MenuIcon,
  Search,
  X,
  ChevronRight,
  MessageSquare
} from 'lucide-react';
import { cn } from '@/lib/utils';
import ConfirmationDialog from '@/components/ui/confirmation-dialog';

interface HeaderProps {
  onMenuClick?: () => void;
  isTransparent?: boolean;
}

const Header: React.FC<HeaderProps> = ({ onMenuClick, isTransparent: propIsTransparent }) => {
  const { user, logout } = useAuth();
  const { unreadCount, notifications, markAsRead } = useNotifications();
  const { t, currentLanguage, setLanguage, availableLanguages } = useLanguage();
  const navigate = useNavigate();
  const location = useLocation();
  const [showLogoutDialog, setShowLogoutDialog] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const isLanding = location.pathname === '/';
  const isTransparent = propIsTransparent || (isLanding && !isScrolled);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLogout = () => setShowLogoutDialog(true);
  const confirmLogout = () => {
    logout();
    setIsMobileMenuOpen(false);
    navigate('/');
  };

  const categories = [
    { name: 'Echo Sénégal', path: '/echos-senegal', special: true },
    { name: 'Vidéos', path: '/videos', special: true },
    { name: 'Histoires', path: '/history' },
    { name: 'Cultures', path: '/map' },
    { name: 'Hébergements', path: '/accommodation' },
    { name: 'Guides', path: '/guides' },
    { name: 'Événements', path: '/events' }
  ];

  const handleMobileMenuToggle = () => {
    if (onMenuClick && user) {
      onMenuClick(); // Trigger sidebar on dashboard
    } else {
      setIsMobileMenuOpen(!isMobileMenuOpen); // Show mobile overlay elsewhere
    }
  };

  return (
    <>
      <header className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        isTransparent ? "bg-transparent py-2" : "bg-white shadow-md border-b",
        user ? "lg:left-64" : "left-0"
      )}>
        <div className="max-w-[1600px] mx-auto px-4 sm:px-6">
          {/* ROW 1: Identity & Search & Actions */}
          <div className="flex items-center justify-between h-14 gap-4">
            <div className="flex items-center gap-3">
              <Button
                variant="ghost"
                size="icon"
                onClick={handleMobileMenuToggle}
                className={cn("text-gray-500 hover:text-[#2D1B08]", user ? "lg:hidden" : "md:hidden")}
              >
                <MenuIcon size={22} />
              </Button>

              {!user && (
                <Link to="/" className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg overflow-hidden border-2 border-[#F2A900] bg-white p-0.5">
                    <img src="/images/nouveau_logo.jpeg" alt="Logo" className="w-full h-full object-contain" />
                  </div>
                  <span className={cn("text-lg font-black tracking-tighter truncate", isTransparent ? "text-white" : "text-[#1B5E20]")}>
                    DISCOVER <span className="text-[#F2A900]">SÉNÉGAL</span>
                  </span>
                </Link>
              )}

              {user && (
                <h2 className={cn("text-lg font-black tracking-tight hidden sm:block", isTransparent ? "text-white" : "text-[#2D1B08]")}>
                  {user.name}
                </h2>
              )}
            </div>

            {/* Search Bar - Center */}
            <div className="hidden md:flex flex-1 max-w-xl relative group">
              <div className={cn(
                "flex items-center w-full bg-gray-50/80 border rounded-xl overflow-hidden px-4 py-1.5 transition-all group-focus-within:border-[#F2A900]/50 group-focus-within:bg-white group-focus-within:shadow-md",
                isTransparent ? "border-white/20 bg-black/10 text-white" : "border-gray-200"
              )}>
                <Search className={cn("w-4 h-4 shrink-0", isTransparent ? "text-white/60" : "text-gray-400")} />
                <input
                  type="text"
                  placeholder="Rechercher..."
                  className="bg-transparent border-none focus:ring-0 text-sm px-3 w-full font-medium"
                />
              </div>
            </div>

            {/* Actions & Utilities - Right */}
            <div className="flex items-center gap-2 sm:gap-4 shrink-0">
              {/* Language */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="sm" className={cn("h-9 flex items-center gap-1", isTransparent ? "text-white hover:bg-white/10" : "text-gray-600")}>
                    <Globe size={18} />
                    <span className="hidden xs:inline text-xs font-bold uppercase">{availableLanguages.find(l => l.code === currentLanguage)?.flag}</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  {availableLanguages.map((lang) => (
                    <DropdownMenuItem
                      key={lang.code}
                      onClick={() => setLanguage(lang.code)}
                      className={currentLanguage === lang.code ? 'bg-orange-50' : ''}
                    >
                      <span className="mr-2">{lang.flag}</span>
                      <span className="text-sm font-medium">{lang.name}</span>
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>

              {!user ? (
                <div className="flex items-center gap-2 sm:gap-4">
                  <Link to="/auth/login" className={cn("text-xs font-black uppercase tracking-wider hover:text-[#F2A900] transition-colors", isTransparent ? "text-white" : "text-[#2D1B08]")}>
                    Connexion
                  </Link>
                  <Link to="/auth/register">
                    <Button size="sm" className="bg-[#1B5E20] hover:bg-[#154618] text-white font-black rounded-full h-9 px-4 text-[10px] uppercase tracking-widest hidden xs:flex">
                      S'INSCRIRE
                    </Button>
                  </Link>
                </div>
              ) : (
                <div className="flex items-center gap-1 sm:gap-4">
                  <Link to="/messages">
                    <Button variant="ghost" size="icon" className={cn("h-9 w-9 relative", isTransparent ? "text-white hover:bg-white/10" : "text-gray-500 hover:text-[#F2A900]")}>
                      <MessageSquare size={18} />
                      <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-red-500 text-white text-[8px] flex items-center justify-center rounded-full border-2 border-white font-black">3</span>
                    </Button>
                  </Link>

                  {/* Notifications */}
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon" className={cn("h-9 w-9 relative", isTransparent ? "text-white hover:bg-white/10" : "text-gray-500 hover:text-[#F2A900]")}>
                        <Bell size={18} />
                        {unreadCount > 0 && (
                          <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-red-500 text-white text-[8px] flex items-center justify-center rounded-full border-2 border-white font-black animate-in zoom-in duration-300">
                            {unreadCount}
                          </span>
                        )}
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-80 p-0 overflow-hidden rounded-2xl border-2 border-[#EBE3D5]">
                      <div className="p-4 border-b border-[#EBE3D5] flex justify-between items-center bg-[#FFFDFB]">
                        <h3 className="font-black text-[#2D1B08] uppercase tracking-widest text-xs">Notifications</h3>
                        <Link to="/notifications" className="text-[10px] font-bold text-[#F2A900] hover:underline">Voir tout</Link>
                      </div>
                      <div className="max-h-[400px] overflow-y-auto">
                        {notifications.length === 0 ? (
                          <div className="p-8 text-center text-gray-400 text-sm">
                            <Bell className="h-8 w-8 mx-auto mb-2 opacity-20" />
                            <p>Aucune notification</p>
                          </div>
                        ) : (
                          notifications.slice(0, 5).map((n) => (
                            <Link
                              key={n.id}
                              to={n.link || "/notifications"}
                              onClick={() => markAsRead(n.id)}
                              className={cn(
                                "flex p-4 gap-3 hover:bg-orange-50/50 transition-colors border-b border-gray-50 last:border-0",
                                !n.read && "bg-orange-50/30"
                              )}
                            >
                              <div className={cn(
                                "h-8 w-8 rounded-full flex items-center justify-center shrink-0",
                                n.type === 'success' ? "bg-green-100 text-green-600" :
                                  n.type === 'like' ? "bg-red-100 text-red-600" :
                                    n.type === 'comment' ? "bg-blue-100 text-blue-600" :
                                      "bg-orange-100 text-orange-600"
                              )}>
                                <Bell size={14} />
                              </div>
                              <div className="flex-1 min-w-0">
                                <p className="text-xs font-black text-[#2D1B08] mb-0.5 truncate">{n.title}</p>
                                <p className="text-[11px] text-[#5D4037]/70 leading-relaxed line-clamp-2">{n.message}</p>
                                <p className="text-[9px] text-gray-400 mt-1 font-bold">Il y a un instant</p>
                              </div>
                              {!n.read && <div className="h-1.5 w-1.5 rounded-full bg-[#F2A900] mt-1.5 shrink-0" />}
                            </Link>
                          ))
                        )}
                      </div>
                      {notifications.length > 5 && (
                        <Link to="/notifications" className="block p-3 text-center text-[10px] font-black text-[#6B4226] bg-gray-50 hover:bg-[#EBE3D5]/50 transition-colors border-t border-[#EBE3D5]">
                          LIRE TOUTES LES NOTIFICATIONS
                        </Link>
                      )}
                    </DropdownMenuContent>
                  </DropdownMenu>

                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" className="h-10 flex items-center gap-2 px-1 hover:bg-transparent">
                        <Avatar className="h-8 w-8 border-2 border-white shadow-sm">
                          <AvatarImage src={user.avatar} />
                          <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <div className="hidden xl:block text-left leading-none">
                          <p className={cn("text-xs font-black mb-0.5", isTransparent ? "text-white" : "text-[#2D1B08]")}>{user.name}</p>
                          <p className="text-[9px] text-gray-500 font-bold uppercase tracking-widest opacity-70">{t(user.role)}</p>
                        </div>
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-56 mt-2">
                      <DropdownMenuItem asChild>
                        <Link to="/profile" className="flex items-center py-2">
                          <User className="mr-2 h-4 w-4" />
                          <span className="text-sm font-medium">{t('profile')}</span>
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem onClick={handleLogout} className="text-red-600 py-2">
                        <LogOut className="mr-2 h-4 w-4" />
                        <span className="text-sm font-medium">{t('logout')}</span>
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              )}
            </div>
          </div>

          {/* ROW 2: Simplified Categories (Desktop Only) */}
          {!user && (
            <nav className="hidden md:flex items-center justify-center h-10 gap-1 overflow-x-auto no-scrollbar pb-1">
              {categories.map((item, idx) => (
                <React.Fragment key={item.name}>
                  {idx !== 0 && <span className={cn("w-1 h-1 rounded-full shrink-0", isTransparent ? "bg-white/20" : "bg-gray-300 mx-1")}></span>}
                  <Link
                    to={item.path}
                    className={cn(
                      "text-[10px] font-black uppercase tracking-[0.15em] px-3 py-1.5 rounded-lg transition-all whitespace-nowrap",
                      item.special ? "text-[#F2A900] bg-[#F2A900]/10 scale-105" :
                        isTransparent ? "text-white/80 hover:text-white hover:bg-white/10" : "text-gray-500 hover:text-[#2D1B08] hover:bg-gray-100"
                    )}
                  >
                    {item.name}
                  </Link>
                </React.Fragment>
              ))}
            </nav>
          )}
        </div>

        {/* Global Mobile Menu Overlay */}
        {isMobileMenuOpen && (
          <div className="md:hidden fixed inset-0 bg-white z-[100] animate-in slide-in-from-top duration-300 overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-center mb-8 pb-4 border-b border-gray-100">
                <span className="text-xl font-black text-[#1B5E20]">DISCOVER <span className="text-[#F2A900]">SÉNÉGAL</span></span>
                <Button variant="ghost" size="icon" onClick={() => setIsMobileMenuOpen(false)}>
                  <X size={24} />
                </Button>
              </div>

              <div className="mb-8 p-3 bg-gray-50 rounded-2xl flex items-center border border-gray-100">
                <Search className="w-4 h-4 text-gray-400 ml-2" />
                <input type="text" placeholder="Rechercher..." className="flex-1 bg-transparent px-3 py-1 focus:outline-none text-sm font-bold" />
              </div>

              <nav className="flex flex-col gap-2">
                {categories.map((item) => (
                  <Link
                    key={item.name}
                    to={item.path}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={cn(
                      "flex items-center justify-between p-4 rounded-2xl transition-all",
                      item.special ? "bg-[#F2A900]/10 text-[#F2A900]" : "bg-gray-50/50 hover:bg-gray-50 text-[#2D1B08]"
                    )}
                  >
                    <span className="font-black uppercase tracking-widest text-xs">{item.name}</span>
                    <ChevronRight size={16} className="opacity-30" />
                  </Link>
                ))}
              </nav>

              <div className="mt-8 grid grid-cols-2 gap-4 pt-8 border-t border-gray-100">
                <Link to="/auth/login" className="w-full" onClick={() => setIsMobileMenuOpen(false)}>
                  <Button variant="outline" className="w-full border-2 border-[#2D1B08] py-6 font-black rounded-2xl">LOG IN</Button>
                </Link>
                <Link to="/auth/register" className="w-full" onClick={() => setIsMobileMenuOpen(false)}>
                  <Button className="w-full bg-[#1B5E20] py-6 font-black rounded-2xl">SIGN UP</Button>
                </Link>
              </div>
            </div>
          </div>
        )}
      </header>

      <ConfirmationDialog
        open={showLogoutDialog}
        onOpenChange={setShowLogoutDialog}
        title="Déconnexion"
        description="Êtes-vous sûr de vouloir vous déconnecter ?"
        confirmText="Déconnexion"
        cancelText="Annuler"
        onConfirm={confirmLogout}
        variant="destructive"
      />
    </>
  );
};

export default Header;
