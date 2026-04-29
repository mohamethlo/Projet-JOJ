import React from 'react';
import { 
  Compass, 
  Users, 
  Calendar, 
  DollarSign, 
  Star, 
  TrendingUp, 
  Plus, 
  Map, 
  ArrowRight, 
  Clock, 
  ShieldCheck, 
  ChevronRight,
  MessageSquare,
  Award,
  MapPin,
  Camera,
  Backpack
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

interface GuideDashboardProps {
  user: any;
}

const BOOKING_TREND_DATA = [
  { day: 'Lun', bookings: 2 },
  { day: 'Mar', bookings: 5 },
  { day: 'Mer', bookings: 3 },
  { day: 'Jeu', bookings: 8 },
  { day: 'Ven', bookings: 12 },
  { day: 'Sam', bookings: 15 },
  { day: 'Dim', bookings: 10 },
];

const TOUR_CATEGORIES_DATA = [
  { name: 'Culture & Histoire', value: 45, color: '#2D1B08' },
  { name: 'Nature & Safaris', value: 35, color: '#F2A900' },
  { name: 'Urbain & Marchés', value: 20, color: '#6B4226' },
];

const RECENT_BOOKINGS = [
  { id: '1', customer: 'Awa Ndiaye', tour: 'Île de Gorée Historique', date: 'Demain, 09:00', price: '45,000 FCFA', status: 'Confirmée' },
  { id: '2', customer: 'Paul Lefebvre', tour: 'Delta du Saloum Pirogue', date: '12 Mai 2024', price: '65,000 FCFA', status: 'En attente' },
  { id: '3', customer: 'Ousmane Sy', tour: 'Street Art à Dakar', date: '15 Mai 2024', price: '30,000 FCFA', status: 'Payée' },
];

const GuideDashboard: React.FC<GuideDashboardProps> = ({ user }) => {
  return (
    <div className="space-y-6 md:space-y-8 pb-12 animate-in fade-in duration-700 min-h-screen">
      {/* 🧭 Ambassador's Welcome Header */}
      <div className="relative rounded-3xl md:rounded-[2.5rem] overflow-hidden bg-gradient-to-br from-[#2D1B08] via-[#5D4037] to-[#2D1B08] p-6 md:p-12 text-white shadow-2xl">
        <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-[#F2A900]/10 to-transparent pointer-events-none" />
        <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-[#F2A900]/5 rounded-full blur-[100px]" />
        
        <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-8">
          <div className="space-y-4">
            <div className="flex flex-wrap items-center gap-3">
              <Badge className="bg-[#F2A900] text-[#2D1B08] font-black uppercase tracking-widest text-[8px] md:text-[9px] px-3 border-none">
                GUIDE CERTIFIÉ Discover Sénégal
              </Badge>
              <div className="flex items-center gap-1.5 text-[9px] md:text-[10px] font-bold text-white/40 uppercase tracking-widest">
                <ShieldCheck size={12} className="md:size-2.5 text-[#F2A900]" /> Ambassadeur Local
              </div>
            </div>
            <h1 className="text-3xl md:text-5xl font-black tracking-tighter uppercase leading-[0.9]">
              BONJOUR, CHER GUIDE <span className="text-[#F2A900]">.</span>
            </h1>
            <p className="text-white/60 font-medium italic text-xs md:text-base max-w-xl">
              C'est une belle journée pour faire découvrir les trésors de notre pays ! Vous avez 3 visites prévues ce week-end.
            </p>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-3">
            <Link to="/guide/tours" className="w-full sm:w-auto">
              <Button className="w-full rounded-xl md:rounded-2xl bg-white/10 hover:bg-white/20 border-white/10 text-white font-bold backdrop-blur-md h-12 px-6">
                <Plus className="mr-2 h-4 w-4" /> Créer un Circuit
              </Button>
            </Link>
            <Link to="/guide/bookings" className="w-full sm:w-auto">
              <Button className="w-full rounded-xl md:rounded-2xl bg-[#F2A900] hover:bg-[#D49400] text-[#2D1B08] font-black h-12 px-6 shadow-xl shadow-[#F2A900]/20">
                <Map className="mr-2 h-4 w-4" /> Mes Réservations
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {/* 📊 Guide Performance Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
        <StatCard 
          icon={Calendar} 
          value="15" 
          label="Visites Finalisées" 
          trend={{ value: 4, isUp: true }} 
        />
        <StatCard 
          icon={Clock} 
          value="5" 
          label="En Attente" 
          trend={{ value: 2, isUp: true }} 
        />
        <StatCard 
          icon={DollarSign} 
          value="1.25M" 
          label="Revenus (FCFA)" 
          trend={{ value: 15, isUp: true }} 
        />
        <StatCard 
          icon={Star} 
          value="4.9" 
          label="Note Voyageurs" 
          trend={{ value: 0.1, isUp: true }} 
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* 📈 Booking Trends Chart */}
        <div className="lg:col-span-2">
          <ChartCard title="Activité Hebdomadaire" subtitle="Nombre de voyageurs guidés sur les 7 derniers jours">
            <div className="h-[300px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={BOOKING_TREND_DATA}>
                  <defs>
                    <linearGradient id="colorBookings" x1="0" y1="0" x2="0" y2="1">
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
                  <Area type="monotone" dataKey="bookings" stroke="#F2A900" strokeWidth={3} fillOpacity={1} fill="url(#colorBookings)" isAnimationActive={false} />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </ChartCard>
        </div>

        {/* 🥧 Tour Composition */}
        <div className="lg:col-span-1">
          <ChartCard title="Spécialités de Visite" subtitle="Répartition par type d'expérience proposée">
            <div className="h-[200px] md:h-[250px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={TOUR_CATEGORIES_DATA}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={80}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {TOUR_CATEGORIES_DATA.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="flex flex-col gap-2 mt-4">
              {TOUR_CATEGORIES_DATA.map((cat, i) => (
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
        {/* 📅 Pending Explorers List */}
        <Card className="rounded-3xl md:rounded-[2.5rem] border-none bg-white shadow-sm overflow-hidden text-[#2D1B08]">
          <CardHeader className="px-6 md:px-8 py-6 border-b border-gray-100 flex flex-row items-center justify-between">
            <CardTitle className="text-lg md:text-xl font-black uppercase tracking-tighter flex items-center gap-2">
              <Users size={20} className="text-[#F2A900]" />
              Explorateurs Attendus
            </CardTitle>
            <Link to="/guide/bookings">
              <Button variant="ghost" className="text-[10px] font-black uppercase tracking-widest text-[#F2A900]">Voir tout</Button>
            </Link>
          </CardHeader>
          <CardContent className="p-0">
            <div className="divide-y divide-gray-50 max-h-[400px] overflow-y-auto">
              {RECENT_BOOKINGS.map((booking) => (
                <div key={booking.id} className="px-4 md:px-8 py-5 md:py-6 hover:bg-gray-50/50 transition-colors group flex items-center justify-between">
                  <div className="flex items-center gap-3 md:gap-4 overflow-hidden">
                    <div className="p-2 md:p-3 rounded-xl md:rounded-2xl bg-[#F2A900]/10 text-[#2D1B08] flex-shrink-0 group-hover:bg-[#2D1B08] group-hover:text-white transition-colors">
                      <Backpack size={18} className="md:size-5" />
                    </div>
                    <div className="min-w-0">
                      <h4 className="text-[10px] md:text-[11px] font-black uppercase truncate">{booking.customer}</h4>
                      <p className="text-[9px] md:text-[10px] text-gray-400 font-bold truncate">{booking.tour} • {booking.date}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 md:gap-4 flex-shrink-0">
                    <span className="hidden sm:block text-[11px] font-black text-[#2D1B08]">{booking.price}</span>
                    <Badge className={cn(
                      "px-2 md:px-3 py-0.5 md:py-1 rounded-full text-[8px] md:text-[9px] font-black uppercase border-none",
                      booking.status === 'Confirmée' || booking.status === 'Payée' ? "bg-emerald-100 text-emerald-600" : "bg-amber-100 text-amber-600"
                    )}>
                      {booking.status}
                    </Badge>
                    <ChevronRight size={16} className="text-gray-200 group-hover:text-[#F2A900] transition-colors" />
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* 🛠️ Management & Communication */}
        <Card className="rounded-3xl md:rounded-[2.5rem] border-none bg-white shadow-sm overflow-hidden text-[#2D1B08]">
          <CardHeader className="px-6 md:px-8 py-6">
            <CardTitle className="text-lg md:text-xl font-black uppercase tracking-tighter flex items-center gap-2">
              <Award size={20} className="text-[#F2A900]" />
              Outils de l'Ambassadeur
            </CardTitle>
          </CardHeader>
          <CardContent className="px-4 md:px-8 pb-6 md:pb-8 space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <button className="p-4 md:p-6 rounded-2xl md:rounded-3xl bg-orange-50/50 border-2 border-transparent hover:border-[#F2A900] transition-all group text-left">
                <MapPin className="text-[#F2A900] mb-2 md:mb-3 group-hover:scale-110 transition-transform" size={20} className="md:size-6" />
                <h5 className="text-[11px] md:text-[12px] font-black uppercase leading-tight">Gérer mes Lieux</h5>
                <p className="text-[8px] md:text-[9px] text-gray-400 font-bold uppercase mt-1">Éditer vos spots favoris</p>
              </button>
              <button className="p-4 md:p-6 rounded-2xl md:rounded-3xl bg-brown-50/50 border-2 border-transparent hover:border-[#6B4226] transition-all group text-left">
                <MessageSquare className="text-[#6B4226] mb-2 md:mb-3 group-hover:scale-110 transition-transform" size={20} className="md:size-6" />
                <h5 className="text-[11px] md:text-[12px] font-black uppercase leading-tight">Avis Voyageurs</h5>
                <p className="text-[8px] md:text-[9px] text-gray-400 font-bold uppercase mt-1">Consulter vos témoignages</p>
              </button>
            </div>

            <div className="p-5 md:p-6 rounded-2xl md:rounded-3xl bg-[#2D1B08] text-white relative overflow-hidden group">
              <div className="absolute top-0 right-0 p-4 text-[#F2A900]/10 group-hover:text-[#F2A900]/20 transition-colors">
                <Compass size={60} className="md:size-20" strokeWidth={4} />
              </div>
              <div className="relative z-10">
                <h4 className="text-[12px] md:text-sm font-black uppercase tracking-tight mb-1">Pass Ambassadeur</h4>
                <p className="text-[9px] md:text-[10px] text-white/50 font-medium italic mb-4">Votre niveau 'Guide d'Argent' vous donne accès à des réductions chez nos hôtels partenaires.</p>
                <Button className="h-8 md:h-9 rounded-lg md:rounded-xl bg-[#F2A900] hover:bg-white text-[#2D1B08] text-[9px] md:text-[10px] font-black uppercase px-3 md:px-4 border-none transition-colors font-bold">
                  Voir Avantages <ArrowRight className="ml-1 md:ml-2 h-3 w-3" />
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default GuideDashboard;
