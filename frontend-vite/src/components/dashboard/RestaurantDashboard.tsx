import React from 'react';
import { 
  UtensilsCrossed, 
  Users, 
  DollarSign, 
  Star, 
  TrendingUp, 
  Plus, 
  BookOpen, 
  ArrowRight, 
  Clock, 
  ChefHat,
  ChevronRight,
  Calendar,
  Coffee,
  Flame,
  PieChart as PieChartIcon
} from 'lucide-react';
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  BarChart,
  Bar,
  Cell,
  PieChart,
  Pie
} from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import StatCard from './StatCard';
import ChartCard from './ChartCard';
import { cn } from '@/lib/utils';
import { Link } from 'react-router-dom';

interface RestaurantDashboardProps {
  user: any;
}

const PEAK_HOURS_DATA = [
  { time: '12h', guests: 45 },
  { time: '13h', guests: 82 },
  { time: '14h', guests: 65 },
  { time: '19h', guests: 55 },
  { time: '20h', guests: 98 },
  { time: '21h', guests: 120 },
  { time: '22h', guests: 75 },
];

const DISH_POPULARITY_DATA = [
  { name: 'Thieboudienne', value: 40, color: '#2D1B08' },
  { name: 'Yassa Poulet', value: 30, color: '#F2A900' },
  { name: 'Mafe Viande', value: 20, color: '#6B4226' },
  { name: 'Autres', value: 10, color: '#EBE3D5' },
];

const RECENT_RESERVATIONS = [
  { id: '1', customer: 'Awa Ndiaye', guests: 4, time: '20:30', status: 'Confirmée', date: 'Ce soir' },
  { id: '2', customer: 'Paul Lefebvre', guests: 2, time: '19:45', status: 'En attente', date: 'Ce soir' },
  { id: '3', customer: 'Ousmane Sy', guests: 6, time: '21:00', status: 'Confirmée', date: 'Demain' },
];

const RestaurantDashboard: React.FC<RestaurantDashboardProps> = ({ user }) => {
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className="space-y-6 md:space-y-8 pb-12 animate-in fade-in duration-700 min-h-screen">
      {/* 👨‍🍳 Chef's Welcome Header */}
      <div className="relative rounded-3xl md:rounded-[2.5rem] overflow-hidden bg-gradient-to-br from-[#2D1B08] via-[#5D4037] to-[#2D1B08] p-6 md:p-12 text-white shadow-2xl">
        <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-[#F2A900]/10 to-transparent pointer-events-none" />
        <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-[#F2A900]/5 rounded-full blur-[100px]" />
        
        <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-8">
          <div className="space-y-4">
            <div className="flex flex-wrap items-center gap-3">
              <Badge className="bg-[#F2A900] text-[#2D1B08] font-black uppercase tracking-widest text-[8px] md:text-[9px] px-3 border-none">
                GASTRONOMIE FINE
              </Badge>
              <div className="flex items-center gap-1.5 text-[9px] md:text-[10px] font-bold text-white/40 uppercase tracking-widest">
                <ChefHat size={12} className="md:size-2.5" /> Chef : {user.name.split(' ')[0]}
              </div>
            </div>
            <h1 className="text-3xl md:text-5xl font-black tracking-tighter uppercase leading-[0.9]">
              BONJOUR, CHER CHEF <span className="text-[#F2A900]">.</span>
            </h1>
            <p className="text-white/60 font-medium italic text-xs md:text-base max-w-xl">
              Les fourneaux chauffent ! Votre restaurant attire de nombreux gourmets. Voici un aperçu de vos réservations et de votre succès culinaire.
            </p>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-3">
            <Link to="/establishment/menu" className="w-full sm:w-auto">
              <Button className="w-full rounded-xl md:rounded-2xl bg-white/10 hover:bg-white/20 border-white/10 text-white font-bold backdrop-blur-md h-12 px-6">
                <Coffee className="mr-2 h-4 w-4" /> Gérer la Carte
              </Button>
            </Link>
            <Link to="/establishment/bookings" className="w-full sm:w-auto">
              <Button className="w-full rounded-xl md:rounded-2xl bg-[#F2A900] hover:bg-[#D49400] text-[#2D1B08] font-black h-12 px-6 shadow-xl shadow-[#F2A900]/20">
                <Calendar className="mr-2 h-4 w-4" /> Réservations
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {/* 📊 Resto Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
        <StatCard 
          icon={UtensilsCrossed} 
          value="78%" 
          label="Remplissage" 
          trend={{ value: 5, isUp: true }} 
        />
        <StatCard 
          icon={Users} 
          value="124" 
          label="Couverts (7j)" 
          trend={{ value: 12, isUp: true }} 
        />
        <StatCard 
          icon={DollarSign} 
          value="22,500" 
          label="Ticket Moyen" 
          trend={{ value: 8, isUp: true }} 
        />
        <StatCard 
          icon={Star} 
          value="4.8" 
          label="Note Clients" 
          trend={{ value: 0.2, isUp: true }} 
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* 📈 Peak Hours Chart */}
        <div className="lg:col-span-2">
          <ChartCard title="Affluence par Heure" subtitle="Estimation du nombre de convives par créneau">
            <div className="h-[300px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={PEAK_HOURS_DATA}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#EBE3D5" />
                  <XAxis dataKey="time" stroke="#5D4037" fontSize={10} fontWeight="bold" axisLine={false} tickLine={false} />
                  <YAxis stroke="#5D4037" fontSize={10} fontWeight="bold" axisLine={false} tickLine={false} />
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#2D1B08', border: 'none', borderRadius: '12px', color: '#fff' }}
                  />
                  <Bar dataKey="guests" fill="#F2A900" radius={[4, 4, 0, 0]} isAnimationActive={false}>
                    {PEAK_HOURS_DATA.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.guests > 90 ? '#6B4226' : '#F2A900'} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </ChartCard>
        </div>

        {/* 🥧 Dish Popularity */}
        <div className="lg:col-span-1">
          <ChartCard title="Plats les plus demandés" subtitle="Répartition des commandes ce mois">
            <div className="h-[200px] md:h-[250px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={DISH_POPULARITY_DATA}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={80}
                    paddingAngle={5}
                    dataKey="value"
                    isAnimationActive={false}
                  >
                    {DISH_POPULARITY_DATA.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="flex flex-col gap-2 mt-4">
              {DISH_POPULARITY_DATA.map((dish, i) => (
                <div key={i} className="flex justify-between items-center text-[10px] md:text-[11px] font-bold">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full" style={{ backgroundColor: dish.color }} />
                    <span className="text-[#2D1B08] uppercase tracking-tighter">{dish.name}</span>
                  </div>
                  <span className="text-gray-400">{dish.value}%</span>
                </div>
              ))}
            </div>
          </ChartCard>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* 📅 Table Reservations */}
        <Card className="rounded-3xl md:rounded-[2.5rem] border-none bg-white shadow-sm overflow-hidden text-[#2D1B08]">
          <CardHeader className="px-6 md:px-8 py-6 border-b border-gray-100 flex flex-row items-center justify-between">
            <CardTitle className="text-lg md:text-xl font-black uppercase tracking-tighter flex items-center gap-2">
              <Clock size={20} className="text-[#F2A900]" />
              Prochaines Tables
            </CardTitle>
            <Link to="/establishment/bookings">
              <Button variant="ghost" className="text-[10px] font-black uppercase tracking-widest text-[#F2A900]">Voir tout</Button>
            </Link>
          </CardHeader>
          <CardContent className="p-0">
            <div className="divide-y divide-gray-50 max-h-[400px] overflow-y-auto">
              {RECENT_RESERVATIONS.map((res) => (
                <div key={res.id} className="px-4 md:px-8 py-5 md:py-6 hover:bg-gray-50/50 transition-colors group flex items-center justify-between">
                  <div className="flex items-center gap-3 md:gap-4 overflow-hidden">
                    <div className="p-2 md:p-3 rounded-xl md:rounded-2xl bg-[#F2A900]/10 text-[#2D1B08] flex-shrink-0 group-hover:bg-[#2D1B08] group-hover:text-white transition-colors">
                      <Users size={18} className="md:size-5" />
                    </div>
                    <div className="min-w-0">
                      <h4 className="text-[10px] md:text-[11px] font-black uppercase truncate">{res.customer}</h4>
                      <p className="text-[9px] md:text-[10px] text-gray-400 font-bold truncate">Table pour {res.guests} pers. • {res.time}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 md:gap-4 flex-shrink-0">
                    <span className="hidden sm:block text-[10px] font-bold text-gray-300">{res.date}</span>
                    <Badge className={cn(
                      "px-2 md:px-3 py-0.5 md:py-1 rounded-full text-[8px] md:text-[9px] font-black uppercase border-none",
                      res.status === 'Confirmée' ? "bg-emerald-100 text-emerald-600" : "bg-amber-100 text-amber-600"
                    )}>
                      {res.status}
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
              <Flame size={20} className="text-[#F2A900]" />
              Gestion & Promotion
            </CardTitle>
          </CardHeader>
          <CardContent className="px-4 md:px-8 pb-6 md:pb-8 space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <button className="p-4 md:p-6 rounded-2xl md:rounded-3xl bg-orange-50/50 border-2 border-transparent hover:border-[#F2A900] transition-all group text-left">
                <BookOpen className="text-[#F2A900] mb-2 md:mb-3 group-hover:scale-110 transition-transform" size={20} className="md:size-6" />
                <h5 className="text-[11px] md:text-[12px] font-black uppercase leading-tight">Mettre à Jour la Carte</h5>
                <p className="text-[8px] md:text-[9px] text-gray-400 font-bold uppercase mt-1">Saisonnalité & Plats</p>
              </button>
              <button className="p-4 md:p-6 rounded-2xl md:rounded-3xl bg-brown-50/50 border-2 border-transparent hover:border-[#6B4226] transition-all group text-left">
                <Plus className="text-[#6B4226] mb-2 md:mb-3 group-hover:scale-110 transition-transform" size={20} className="md:size-6" />
                <h5 className="text-[11px] md:text-[12px] font-black uppercase leading-tight">Offre Spéciale</h5>
                <p className="text-[8px] md:text-[9px] text-gray-400 font-bold uppercase mt-1">Attirer plus de clients</p>
              </button>
            </div>

            <div className="p-5 md:p-6 rounded-2xl md:rounded-3xl bg-[#2D1B08] text-white relative overflow-hidden group">
              <div className="absolute top-0 right-0 p-4 text-[#F2A900]/10 group-hover:text-[#F2A900]/20 transition-colors">
                <TrendingUp size={60} className="md:size-20" strokeWidth={4} />
              </div>
              <div className="relative z-10">
                <h4 className="text-[12px] md:text-sm font-black uppercase tracking-tight mb-1">Qualité Cuisine</h4>
                <p className="text-[9px] md:text-[10px] text-white/50 font-medium italic mb-4">Votre établissement maintient le label 'Cuisine Traditionnelle Certifiée'.</p>
                <Button className="h-8 md:h-9 rounded-lg md:rounded-xl bg-[#F2A900] hover:bg-white text-[#2D1B08] text-[9px] md:text-[10px] font-black uppercase px-3 md:px-4 border-none transition-colors font-bold">
                  Détails du Label <ArrowRight className="ml-1 md:ml-2 h-3 w-3" />
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default RestaurantDashboard;
