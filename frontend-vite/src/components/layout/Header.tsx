import React from 'react';
import { useAuth } from '@/context/AuthContext';
import { useLanguage } from '@/context/LanguageContext';
import { useNavigate, Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Bell, Globe, LogOut, Settings, User } from 'lucide-react';
import ConfirmationDialog from '@/components/ui/confirmation-dialog';

const Header = () => {
  const { user, logout } = useAuth();
  const { t, currentLanguage, setLanguage, availableLanguages } = useLanguage();
  const navigate = useNavigate();
  const [showLogoutDialog, setShowLogoutDialog] = React.useState(false);

  const handleLogout = () => setShowLogoutDialog(true);

  const confirmLogout = () => {
    logout();
    navigate('/');
  };

  // 🚨 Protection : si user n’est pas encore chargé
  if (!user) return null;

  const userInitial = user?.name?.charAt(0)?.toUpperCase() ?? '?';

  return (
    <header className="bg-white shadow-sm border-b ml-64 h-16 fixed top-0 right-0 left-64 z-20">
      <div className="flex items-center justify-between h-full px-6">
        <div className="flex items-center space-x-4">
          <h2 className="text-xl font-semibold text-gray-800">
            {user.role === 'admin' ? 'Administration' : t('dashboard')}
          </h2>
        </div>

        <div className="flex items-center space-x-4">
          {/* 🌐 Language Selector */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm" className="flex items-center space-x-2">
                <Globe size={16} />
                <span className="hidden sm:inline">
                  {availableLanguages.find(l => l.code === currentLanguage)?.flag}
                </span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              {availableLanguages.map((lang) => (
                <DropdownMenuItem
                  key={lang.code}
                  onClick={() => setLanguage(lang.code)}
                  className={currentLanguage === lang.code ? 'bg-orange-50' : ''}
                >
                  <span className="mr-2">{lang.flag}</span>
                  {lang.name}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>

          {/* 🔔 Notifications */}
          <Button variant="ghost" size="sm" className="relative">
            <Bell size={16} />
            <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
              3
            </span>
          </Button>

          {/* 👤 User Menu */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="flex items-center space-x-2">
                <Avatar className="h-8 w-8">
                  <AvatarImage src={user?.avatar || ''} alt={user?.name || 'User'} />
                  <AvatarFallback>{userInitial}</AvatarFallback>
                </Avatar>
                <div className="hidden sm:block text-left">
                  <p className="text-sm font-medium">{user?.name ?? 'Utilisateur'}</p>
                  <p className="text-xs text-gray-500">{t(user?.role ?? 'guest')}</p>
                </div>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56" align="end">
              <DropdownMenuItem asChild>
                <Link to="/profile" className="flex items-center">
                  <User className="mr-2 h-4 w-4" />
                  {t('profile')}
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link to="/settings" className="flex items-center">
                  <Settings className="mr-2 h-4 w-4" />
                  Paramètres
                </Link>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={handleLogout} className="text-red-600">
                <LogOut className="mr-2 h-4 w-4" />
                {t('logout')}
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      {/* 🧭 Dialog de confirmation de déconnexion */}
      <ConfirmationDialog
        open={showLogoutDialog}
        onOpenChange={setShowLogoutDialog}
        title="Déconnexion"
        description="Êtes-vous sûr de vouloir vous déconnecter ? Vous devrez vous reconnecter pour accéder à votre compte."
        confirmText="Se déconnecter"
        cancelText="Annuler"
        onConfirm={confirmLogout}
        variant="destructive"
      />
    </header>
  );
};

export default Header;
