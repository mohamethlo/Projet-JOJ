import React from 'react';
import { 
  Building, 
  Users, 
  Ticket, 
  Palette, 
  Calendar, 
  TrendingUp, 
  Plus, 
  ArrowRight, 
  Clock, 
  Award, 
  ChevronRight,
  MessageSquare,
  Eye,
  Star,
  MapPin,
  QrCode
} from 'lucide-react';
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell
} from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import StatCard from './StatCard';
import ChartCard from './ChartCard';
import { cn } from '@/lib/utils';
import { Link } from 'react-router-dom';

interface MuseumDashboardProps {
  user: any;
}

const VISITOR_TREND_DATA = [
  { day: 'Lun', visitors: 120 },
  { day: 'Mar', visitors: 150 },
  { day: 'Mer', visitors: 180 },
  { day: 'Jeu', visitors: 220 },
  { day: 'Ven', visitors: 300 },
  { day: 'Sam', visitors: 450 },
  { day: 'Dim', visitors: 400 },
];

const EXHIBITION_DATA = [
  { name: 'Art Contemporain', value: 40, color: '#2D1B08' },
  { name: 'Histoire Royale', value: 30, color: '#F2A900' },
  { name: 'Artisanat Local', value: 20, color: '#6B4226' },
  { name: 'Autre', value: 10, color: '#EBE3D5' },
];

const RECENT_EXHIBITS = [
  { id: '1', title: 'Les Masques du Sine Saloum', status: 'En cours', end_date: '15 Mai 2024', visitors: 1240 },
  { id: '2', title: 'Léopold Sédar Senghor : L\'Héritage', status: 'À venir', start_date: '01 Juin 2024', visitors: 0 },
  { id: '3', title: 'Bijoux de la Couronne de Cayor', status: 'Permanent', visitors: 5670 },
];

const MuseumDashboard: React.FC<MuseumDashboardProps> = ({ user }) => {
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className="space-y-6 md:space-y-8 pb-12 animate-in fade-in duration-700 min-h-screen">
      {/* 🏛️ Museum's Welcome Header */}
      <div className="relative rounded-3xl md:rounded-[2.5rem] overflow-hidden bg-gradient-to-br from-[#2D1B08] via-[#5D4037] to-[#2D1B08] p-6 md:p-12 text-white shadow-2xl">
        <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-[#F2A900]/10 to-transparent pointer-events-none" />
        <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-[#F2A900]/5 rounded-full blur-[100px]" />
        
        <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-8">
          <div className="space-y-4">
            <div className="flex flex-wrap items-center gap-3">
              <Badge className="bg-[#F2A900] text-[#2D1B08] font-black uppercase tracking-widest text-[8px] md:text-[9px] px-3 border-none">
                INSTITUTION CULTURELLE CERTIFIÉE
              </Badge>
              <div className="flex items-center gap-1.5 text-[9px] md:text-[10px] font-bold text-white/40 uppercase tracking-widest">
                <Building size={12} className="md:size-2.5 text-[#F2A900]" /> Gardien du Patrimoine
              </div>
            </div>
            <h1 className="text-3xl md:text-5xl font-black tracking-tighter uppercase leading-[0.9]">
              BIENVENUE AU MUSÉE <span className="text-[#F2A900]">.</span>
            </h1>
            <p className="text-white/60 font-medium italic text-xs md:text-base max-w-xl">
              Gérez vos collections, vos expositions temporaires et suivez l'affluence de vos visiteurs en temps réel.
            </p>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-3">
            <Link to="/museum/exhibitions" className="w-full sm:w-auto">
              <Button className="w-full rounded-xl md:rounded-2xl bg-white/10 hover:bg-white/20 border-white/10 text-white font-bold backdrop-blur-md h-12 px-6">
                <Plus className="mr-2 h-4 w-4" /> Nouvelle Exposition
              </Button>
            </Link>
            <Link to="/museum/tickets" className="w-full sm:w-auto">
              <Button className="w-full rounded-xl md:rounded-2xl bg-[#F2A900] hover:bg-[#D49400] text-[#2D1B08] font-black h-12 px-6 shadow-xl shadow-[#F2A900]/20">
                <Ticket className="mr-2 h-4 w-4" /> Billetterie Live
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {/* 📊 Museum KPIs Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
        <StatCard 
          icon={Users} 
          value="1,840" 
          label="Visiteurs (Mois)" 
          trend={{ value: 12, isUp: true }} 
        />
        <StatCard 
          icon={Ticket} 
          value="45" 
          label="Billets Aujourd'hui" 
          trend={{ value: 8, isUp: true }} 
        />
        <StatCard 
          icon={Palette} 
          value="342" 
          label="Œuvres Cataloguées" 
          trend={{ value: 2, isUp: true }} 
        />
        <StatCard 
          icon={Star} 
          value="4.8" 
          label="Note Globale" 
          trend={{ value: 0.1, isUp: true }} 
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* 📈 Visitors Trend Chart */}
        <div className="lg:col-span-2">
          <ChartCard title="Fréquentation Hebdomadaire" subtitle="Nombre de visiteurs quotidiens sur les 7 derniers jours">
            <div className="h-[300px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={VISITOR_TREND_DATA}>
                  <defs>
                    <linearGradient id="colorVisitors" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#F2A900" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="#F2A900" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#EBE3D5" />
                  <XAxis dataKey="day" stroke="#5D4037" fontSize={10} fontWeight="bold" axisLine={false} tickLine={false} />
                  <YAxis stroke="#5D4037" fontSize={10} fontWeight="bold" axisLine={false} tickLine={false} />
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#2D1B08', border: 'none', borderRadius: '12px', color: '#fff' }}
                    itemStyle={{ color: '#F2A900', fontWeight: 'bold' }}
                  />
                  <Area type="monotone" dataKey="visitors" stroke="#F2A900" strokeWidth={3} fillOpacity={1} fill="url(#colorVisitors)" isAnimationActive={false} />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </ChartCard>
        </div>

        {/* 🥧 Interest Distribution */}
        <div className="lg:col-span-1">
          <ChartCard title="Intérêt des Visiteurs" subtitle="Répartition par type de collection visitée">
            <div className="h-[200px] md:h-[250px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={EXHIBITION_DATA}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={80}
                    paddingAngle={5}
                    dataKey="value"
                    isAnimationActive={false}
                  >
                    {EXHIBITION_DATA.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="flex flex-col gap-2 mt-4">
              {EXHIBITION_DATA.map((cat, i) => (
                <div key={i} className="flex justify-between items-center text-[10px] md:text-[11px] font-bold">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full" style={{ backgroundColor: cat.color }} />
                    <span className="text-[#2D1B08] uppercase tracking-tighter">{cat.name}</span>
                  </div>
                  <span className="text-gray-400">{cat.value}%</span>
                </div>
              ))}
            </div>
          </ChartCard>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* 📅 Active Exhibitions */}
        <Card className="rounded-3xl md:rounded-[2.5rem] border-none bg-white shadow-sm overflow-hidden text-[#2D1B08]">
          <CardHeader className="px-6 md:px-8 py-6 border-b border-gray-100 flex flex-row items-center justify-between">
            <CardTitle className="text-lg md:text-xl font-black uppercase tracking-tighter flex items-center gap-2">
              <Calendar size={20} className="text-[#F2A900]" />
              Expositions Actuelles
            </CardTitle>
            <Link to="/museum/exhibitions">
              <Button variant="ghost" className="text-[10px] font-black uppercase tracking-widest text-[#F2A900]">Voir tout</Button>
            </Link>
          </CardHeader>
          <CardContent className="p-0">
            <div className="divide-y divide-gray-50 max-h-[400px] overflow-y-auto">
              {RECENT_EXHIBITS.map((exhibit) => (
                <div key={exhibit.id} className="px-4 md:px-8 py-5 md:py-6 hover:bg-gray-50/50 transition-colors group flex items-center justify-between">
                  <div className="flex items-center gap-3 md:gap-4 overflow-hidden">
                    <div className="p-2 md:p-3 rounded-xl md:rounded-2xl bg-[#F2A900]/10 text-[#2D1B08] flex-shrink-0 group-hover:bg-[#2D1B08] group-hover:text-white transition-colors">
                      <Palette size={18} className="md:size-5" />
                    </div>
                    <div className="min-w-0">
                      <h4 className="text-[10px] md:text-[11px] font-black uppercase truncate">{exhibit.title}</h4>
                      <p className="text-[9px] md:text-[10px] text-gray-400 font-bold truncate">
                        {exhibit.status === 'À venir' ? `Débute le ${exhibit.start_date}` : exhibit.status}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 md:gap-4 flex-shrink-0">
                    <span className="hidden sm:block text-[11px] font-black text-[#2D1B08]">{exhibit.visitors} vis.</span>
                    <Badge className={cn(
                      "px-2 md:px-3 py-0.5 md:py-1 rounded-full text-[8px] md:text-[9px] font-black uppercase border-none",
                      exhibit.status === 'En cours' ? "bg-emerald-100 text-emerald-600" : 
                      exhibit.status === 'Permanent' ? "bg-blue-100 text-blue-600" : "bg-amber-100 text-amber-600"
                    )}>
                      {exhibit.status}
                    </Badge>
                    <ChevronRight size={16} className="text-gray-200 group-hover:text-[#F2A900] transition-colors" />
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* 🛠️ Management Tools */}
        <Card className="rounded-3xl md:rounded-[2.5rem] border-none bg-white shadow-sm overflow-hidden text-[#2D1B08]">
          <CardHeader className="px-6 md:px-8 py-6">
            <CardTitle className="text-lg md:text-xl font-black uppercase tracking-tighter flex items-center gap-2">
              <Award size={20} className="text-[#F2A900]" />
              Outils de l'Institution
            </CardTitle>
          </CardHeader>
          <CardContent className="px-4 md:px-8 pb-6 md:pb-8 space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <button className="p-4 md:p-6 rounded-2xl md:rounded-3xl bg-orange-50/50 border-2 border-transparent hover:border-[#F2A900] transition-all group text-left">
                <QrCode className="text-[#F2A900] mb-2 md:mb-3 group-hover:scale-110 transition-transform" size={24} />
                <h5 className="text-[11px] md:text-[12px] font-black uppercase leading-tight">Digital Guide QR</h5>
                <p className="text-[8px] md:text-[9px] text-gray-400 font-bold uppercase mt-1">Générer des codes pour les œuvres</p>
              </button>
              <button className="p-4 md:p-6 rounded-2xl md:rounded-3xl bg-brown-50/50 border-2 border-transparent hover:border-[#6B4226] transition-all group text-left">
                <MessageSquare className="text-[#6B4226] mb-2 md:mb-3 group-hover:scale-110 transition-transform" size={24} />
                <h5 className="text-[11px] md:text-[12px] font-black uppercase leading-tight">Avis des Visiteurs</h5>
                <p className="text-[8px] md:text-[9px] text-gray-400 font-bold uppercase mt-1">Gérer les témoignages</p>
              </button>
            </div>

            <div className="p-5 md:p-6 rounded-2xl md:rounded-3xl bg-[#2D1B08] text-white relative overflow-hidden group">
              <div className="absolute top-0 right-0 p-4 text-[#F2A900]/10 group-hover:text-[#F2A900]/20 transition-colors">
                <TrendingUp size={60} className="md:size-20" strokeWidth={4} />
              </div>
              <div className="relative z-10">
                <h4 className="text-[12px] md:text-sm font-black uppercase tracking-tight mb-1">Pass Patrimoine</h4>
                <p className="text-[9px] md:text-[10px] text-white/50 font-medium italic mb-4">Votre institution participe au programme "Pass Sénégal" pour booster le tourisme local.</p>
                <Button className="h-8 md:h-9 rounded-lg md:rounded-xl bg-[#F2A900] hover:bg-white text-[#2D1B08] text-[9px] md:text-[10px] font-black uppercase px-3 md:px-4 border-none transition-colors font-bold">
                  Voir Partenariat <ArrowRight className="ml-1 md:ml-2 h-3 w-3" />
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default MuseumDashboard;
