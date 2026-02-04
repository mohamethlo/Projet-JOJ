import React from 'react';
import { useAuth } from '@/context/AuthContext';
import { useLanguage } from '@/context/LanguageContext';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Bell, Globe, LogOut, User, Menu as MenuIcon } from 'lucide-react';
import { Link } from 'react-router-dom';
import ConfirmationDialog from '@/components/ui/confirmation-dialog';

const Header = ({ onMenuClick }: { onMenuClick?: () => void }) => {
  const { user, logout } = useAuth();
  const { t, currentLanguage, setLanguage, availableLanguages } = useLanguage();
  const navigate = useNavigate();
  const [showLogoutDialog, setShowLogoutDialog] = React.useState(false);

  const handleLogout = () => {
    setShowLogoutDialog(true);
  };

  const confirmLogout = () => {
    logout();
    navigate('/');
  };

  if (!user) return null;

  return (
    <header className="bg-white shadow-sm border-b h-16 fixed top-0 right-0 left-0 lg:left-64 z-20">
      <div className="flex items-center justify-between h-full px-4 sm:px-6">
        <div className="flex items-center space-x-1 sm:space-x-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={onMenuClick}
            className="lg:hidden text-gray-400 hover:text-[#6B4226] h-9 w-9"
          >
            <MenuIcon size={20} />
          </Button>
          <h2 className="text-base sm:text-xl font-black text-[#2D1B08] tracking-tight truncate max-w-[120px] xs:max-w-[150px] sm:max-w-none">
            {user.role === 'admin' ? 'Administration' : t('dashboard')}
          </h2>
        </div>

        <div className="flex items-center space-x-1 sm:space-x-4">
          {/* Language Selector */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm" className="flex items-center space-x-1 sm:space-x-2 px-2 sm:px-3">
                <Globe size={16} className="text-gray-500" />
                <span className="hidden sm:inline">{availableLanguages.find(l => l.code === currentLanguage)?.flag}</span>
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

          {/* Notifications */}
          <Button
            variant="ghost"
            size="icon"
            className="relative h-9 w-9"
            onClick={() => navigate('/notifications')}
            aria-label="Ouvrir les notifications"
          >
            <Bell size={18} className="text-gray-500" />
            <span className="absolute top-1.5 right-1.5 bg-red-500 text-white text-[9px] font-bold rounded-full h-4 w-4 flex items-center justify-center border-2 border-white">
              3
            </span>
          </Button>

          {/* User Menu */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="flex items-center space-x-2 px-1 sm:px-2">
                <Avatar className="h-8 w-8 border border-gray-100 shadow-sm">
                  <AvatarImage src={user.avatar} />
                  <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <div className="hidden md:block text-left">
                  <p className="text-sm font-medium leading-none mb-1">{user.name}</p>
                  <p className="text-[10px] text-gray-500 font-bold uppercase tracking-wider">{t(user.role)}</p>
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

              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={handleLogout} className="text-red-600">
                <LogOut className="mr-2 h-4 w-4" />
                {t('logout')}
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      {/* Dialog de confirmation de déconnexion */}
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
