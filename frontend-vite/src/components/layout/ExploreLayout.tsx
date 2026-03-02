import React from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import Header from './Header';
import { cn } from '@/lib/utils';

interface ExploreLayoutProps {
    children?: React.ReactNode;
}

const ExploreLayout: React.FC<ExploreLayoutProps> = ({ children }) => {
    const [isSidebarOpen, setIsSidebarOpen] = React.useState(false);

    return (
        <div className="min-h-screen bg-[#FFFDFB]">
            {/* Sidebar is always rendered, but its content might change based on auth */}
            <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />

            {/* Header handles the "Guest Mode" badge internally if user is null */}
            <Header onMenuClick={() => setIsSidebarOpen(true)} />

            <main className={cn(
                "transition-all duration-300 pt-14",
                "lg:ml-64 ml-0"
            )}>
                <div className="p-4 sm:p-6 md:p-8">
                    {children || <Outlet />}
                </div>
            </main>

            {/* Overlay for mobile sidebar */}
            {isSidebarOpen && (
                <div
                    className="fixed inset-0 bg-black/50 z-30 lg:hidden"
                    onClick={() => setIsSidebarOpen(false)}
                />
            )}
        </div>
    );
};

export default ExploreLayout;
