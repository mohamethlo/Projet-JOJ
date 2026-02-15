import React from 'react';
import { useAuth } from '@/context/AuthContext';
import Sidebar from './Sidebar';
import Header from './Header';
import { useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';
import FloatingMessenger from '../messaging/FloatingMessenger';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const { user } = useAuth();
  const location = useLocation();
  const [isSidebarOpen, setIsSidebarOpen] = React.useState(false);

  const isAuthPage = location.pathname === '/login' || location.pathname === '/register' || location.pathname === '/';

  if (!user || isAuthPage) {
    return <div className="min-h-screen bg-[#FFFDFB]">{children}</div>;
  }

  return (
    <div className="min-h-screen bg-[#FFFDFB]">
      <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />
      <Header onMenuClick={() => setIsSidebarOpen(true)} />
      <main className={cn(
        "transition-all duration-300 pt-14",
        "lg:ml-64 ml-0"
      )}>
        <div className="p-4 sm:p-6 md:p-8">
          {children}
        </div>
      </main>

      {/* Overlay for mobile sidebar */}
      {isSidebarOpen && (
        <div
        />
      )}
      <FloatingMessenger />
    </div>
  );
};

export default Layout;
