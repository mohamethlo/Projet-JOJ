import React from 'react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Clock, Search, Bell } from 'lucide-react';
import DashboardContent from './DashboardContent';

interface AdminDashboardProps {
  user: any;
}

const AdminDashboard: React.FC<AdminDashboardProps> = ({ user }) => {
  return (
    <div className="space-y-8 pb-12 animate-in fade-in duration-700 min-h-screen bg-[#FAFAFA]/50">
      {/* Premium Header - Conserved and Polished */}
      <div className="relative rounded-[2.5rem] overflow-hidden bg-gradient-to-br from-[#2D1B08] via-[#5D4037] to-[#2D1B08] p-8 md:p-12 text-white shadow-2xl">
        <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-[#F2A900]/10 to-transparent pointer-events-none" />
        <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-[#F2A900]/5 rounded-full blur-[100px]" />
        
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <Badge className="bg-[#F2A900] text-[#2D1B08] font-black uppercase tracking-widest text-[9px] px-3">Administration Suprême</Badge>
              <div className="flex items-center gap-1 text-[10px] font-bold text-white/40 uppercase tracking-widest">
                <Clock size={10} /> {new Date().toLocaleDateString('fr-FR', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
              </div>
            </div>
            <h1 className="text-4xl md:text-5xl font-black tracking-tighter uppercase leading-none">
              SALUT, {user.name.split(' ')[0]} <span className="text-[#F2A900]">.</span>
            </h1>
            <p className="text-white/60 font-medium italic text-sm md:text-base max-w-xl">
              Votre tableau de bord Discover Sénégal est opérationnel. Supervisez le cœur de l'écosystème touristique national.
            </p>
          </div>
          
          <div className="flex gap-3">
            <Button className="rounded-2xl bg-white/10 hover:bg-white/20 border-white/10 text-white font-bold backdrop-blur-md h-12 px-6">
              <Search className="mr-2 h-4 w-4" /> Rechercher
            </Button>
            <Button className="rounded-2xl bg-[#F2A900] hover:bg-[#D49400] text-[#2D1B08] font-black h-12 px-6 shadow-xl shadow-[#F2A900]/20">
              <Bell className="mr-2 h-4 w-4" /> 3 Alertes
            </Button>
          </div>
        </div>
      </div>

      {/* Main Dashboard Content - Structured as requested */}
      <DashboardContent />
    </div>
  );
};

export default AdminDashboard;
