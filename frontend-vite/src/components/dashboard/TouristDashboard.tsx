import React from 'react';
import { 
  Compass, 
  MapPin, 
  Calendar, 
  Heart, 
  Star, 
  TrendingUp, 
  Ticket, 
  Users, 
  ArrowRight, 
  ShieldCheck, 
  Gem, 
  ChevronRight,
  MessageSquare,
  Palmtree,
  Camera,
  Map
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

interface TouristDashboardProps {
  user: any;
}

const EXPLORATION_STATS = [
  { name: 'Culture', value: 35, color: '#2D1B08' },
  { name: 'Nature', value: 40, color: '#F2A900' },
  { name: 'Gastronomie', value: 15, color: '#6B4226' },
  { name: 'Aventure', value: 10, color: '#EBE3D5' },
];

const RECENT_TICKETS = [
  { id: '1', event: 'Musée des Civilisations Noires', date: 'Demain, 10h', price: 'Gratuit', status: 'Valide' },
  { id: '2', event: 'Safari Réserve de Bandia', date: '15 Mai 2024', price: '25,000 FCFA', status: 'Payé' },
];

const AI_RECOMMENDED_LOCALS = [
  { id: '1', name: 'Aïcha Diop', role: 'Guide Locale', match: 98, location: 'Dakar', avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=150' },
  { id: '2', name: 'Moussa Kane', role: 'Artisan Potier', match: 92, location: 'Saint-Louis', avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=150' },
];

const TouristDashboard: React.FC<TouristDashboardProps> = ({ user }) => {
  return (
    <div className="space-y-6 md:space-y-8 pb-12 animate-in fade-in duration-700 min-h-screen">
      {/* 🧭 Explorer's Welcome Header */}
      <div className="relative rounded-3xl md:rounded-[2.5rem] overflow-hidden bg-gradient-to-br from-[#2D1B08] via-[#5D4037] to-[#2D1B08] p-6 md:p-12 text-white shadow-2xl">
        <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-[#F2A900]/10 to-transparent pointer-events-none" />
        <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-[#F2A900]/5 rounded-full blur-[100px]" />
        
        <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-8">
          <div className="space-y-4">
            <div className="flex flex-wrap items-center gap-3">
              <Badge className="bg-[#F2A900] text-[#2D1B08] font-black uppercase tracking-widest text-[8px] md:text-[9px] px-3 border-none">
                EXPLORATEUR DU SÉNÉGAL
              </Badge>
              <div className="flex items-center gap-1.5 text-[9px] md:text-[10px] font-bold text-white/40 uppercase tracking-widest">
                <Gem size={12} className="md:size-2.5 text-[#F2A900]" /> Niveau : Baobab d'Argent
              </div>
            </div>
            <h1 className="text-3xl md:text-5xl font-black tracking-tighter uppercase leading-[0.9]">
              BON VOYAGE, {user.name.split(' ')[0]} <span className="text-[#F2A900]">.</span>
            </h1>
            <p className="text-white/60 font-medium italic text-xs md:text-base max-w-xl">
              Prêt pour votre prochaine aventure ? Le Sénégal a encore tant de secrets à vous révéler. Explorez, ressentez, vivez.
            </p>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-3">
            <Link to="/map" className="w-full sm:w-auto">
              <Button className="w-full rounded-xl md:rounded-2xl bg-white/10 hover:bg-white/20 border-white/10 text-white font-bold backdrop-blur-md h-12 px-6">
                <MapPin className="mr-2 h-4 w-4" /> Explorer la Carte
              </Button>
            </Link>
            <Link to="/echos-senegal" className="w-full sm:w-auto">
              <Button className="w-full rounded-xl md:rounded-2xl bg-[#F2A900] hover:bg-[#D49400] text-[#2D1B08] font-black h-12 px-6 shadow-xl shadow-[#F2A900]/20">
                <Camera className="mr-2 h-4 w-4" /> Les Échos
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {/* 📊 Tourist Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
        <StatCard 
          icon={Ticket} 
          value="3" 
          label="Mes Billets" 
          trend={{ value: 1, isUp: true }} 
        />
        <StatCard 
          icon={TrendingUp} 
          value="1,450" 
          label="Points Exp." 
          trend={{ value: 250, isUp: true }} 
        />
        <StatCard 
          icon={Heart} 
          value="12" 
          label="Coups de Cœur" 
          trend={{ value: 3, isUp: true }} 
        />
        <StatCard 
          icon={Users} 
          value="2" 
          label="Jumelages" 
          trend={{ value: 1, isUp: true }} 
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* 🥧 Discovery Profile */}
        <div className="lg:col-span-1">
          <ChartCard title="Profil d'Exploration" subtitle="Répartition de vos centres d'intérêt">
            <div className="h-[200px] md:h-[250px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={EXPLORATION_STATS}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={80}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {EXPLORATION_STATS.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="flex flex-col gap-2 mt-4">
              {EXPLORATION_STATS.map((stat, i) => (
                <div key={i} className="flex justify-between items-center text-[10px] md:text-[11px] font-bold">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full" style={{ backgroundColor: stat.color }} />
                    <span className="text-[#2D1B08] uppercase tracking-tighter">{stat.name}</span>
                  </div>
                  <span className="text-gray-400">{stat.value}%</span>
                </div>
              ))}
            </div>
          </ChartCard>
        </div>

        {/* 📋 Upcoming Tickets List */}
        <div className="lg:col-span-2">
          <Card className="rounded-3xl md:rounded-[2.5rem] border-none bg-white shadow-sm overflow-hidden h-full flex flex-col">
            <CardHeader className="px-6 md:px-8 py-6 border-b border-gray-100 flex flex-row items-center justify-between">
              <CardTitle className="text-lg md:text-xl font-black text-[#2D1B08] uppercase tracking-tighter flex items-center gap-2">
                <Ticket size={20} className="text-[#F2A900]" />
                Mes Prochains Billets
              </CardTitle>
              <Link to="/mes-tickets">
                <Button variant="ghost" className="text-[10px] font-black uppercase tracking-widest text-[#F2A900]">Tout voir</Button>
              </Link>
            </CardHeader>
            <CardContent className="p-0 flex-1">
              <div className="divide-y divide-gray-50">
                {RECENT_TICKETS.map((ticket) => (
                  <div key={ticket.id} className="px-4 md:px-8 py-5 md:py-6 hover:bg-gray-50/50 transition-colors group flex items-center justify-between">
                    <div className="flex items-center gap-3 md:gap-4 overflow-hidden">
                      <div className="p-2 md:p-3 rounded-xl md:rounded-2xl bg-[#EBE3D5] text-[#2D1B08] flex-shrink-0 group-hover:bg-[#F2A900] transition-colors">
                        <Map size={18} className="md:size-5" />
                      </div>
                      <div className="min-w-0">
                        <h4 className="text-[10px] md:text-[11px] font-black text-[#2D1B08] uppercase truncate">{ticket.event}</h4>
                        <p className="text-[9px] md:text-[10px] text-gray-400 font-bold truncate">{ticket.date} • {ticket.price}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 md:gap-4 flex-shrink-0">
                      <Badge className={cn(
                        "px-2 md:px-3 py-0.5 md:py-1 rounded-full text-[8px] md:text-[9px] font-black uppercase border-none",
                        ticket.status === 'Valide' || ticket.status === 'Payé' ? "bg-emerald-100 text-emerald-600" : "bg-amber-100 text-amber-600"
                      )}>
                        {ticket.status}
                      </Badge>
                      <ChevronRight size={16} className="text-gray-200 group-hover:text-[#F2A900] transition-colors" />
                    </div>
                  </div>
                ))}
              </div>
              <div className="p-6 mt-auto">
                <div className="p-4 rounded-2xl bg-[#2D1B08] text-white flex items-center justify-between group cursor-pointer hover:bg-[#F2A900] hover:text-[#2D1B08] transition-all">
                  <div className="flex items-center gap-3">
                    <Camera size={20} className="text-[#F2A900] group-hover:text-[#2D1B08]" />
                    <span className="text-[10px] font-black uppercase tracking-widest">Partager votre expérience</span>
                  </div>
                  <ArrowRight size={16} />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* ❤️ AI Matches / Jumelages */}
        <Card className="rounded-3xl md:rounded-[2.5rem] border-none bg-white shadow-sm overflow-hidden text-[#2D1B08]">
          <CardHeader className="px-6 md:px-8 py-6">
            <CardTitle className="text-lg md:text-xl font-black uppercase tracking-tighter flex items-center gap-2">
              <Users size={20} className="text-[#F2A900]" />
              Jumelages IA Recommandés
            </CardTitle>
          </CardHeader>
          <CardContent className="px-4 md:px-8 pb-8 space-y-4">
            {AI_RECOMMENDED_LOCALS.map((match) => (
              <div key={match.id} className="p-4 md:p-6 rounded-3xl bg-[#EBE3D5]/20 border border-transparent hover:border-[#F2A900] transition-all flex items-center justify-between group">
                <div className="flex items-center gap-4">
                  <img src={match.avatar} alt={match.name} className="w-12 h-12 md:w-16 md:h-16 rounded-2xl md:rounded-3xl object-cover grayscale group-hover:grayscale-0 transition-all shadow-lg" />
                  <div>
                    <h4 className="text-[11px] md:text-[13px] font-black uppercase">{match.name}</h4>
                    <p className="text-[9px] md:text-[11px] text-[#5D4037]/60 font-medium">{match.role} • {match.location}</p>
                    <div className="mt-2 flex items-center gap-1.5">
                      <div className="h-1 w-24 bg-gray-100 rounded-full overflow-hidden">
                        <div className="h-full bg-[#F2A900]" style={{ width: `${match.match}%` }} />
                      </div>
                      <span className="text-[8px] font-black text-[#F2A900]">{match.match}% compatible</span>
                    </div>
                  </div>
                </div>
                <Button className="h-9 w-9 md:h-12 md:w-12 rounded-xl md:rounded-2xl bg-[#2D1B08] hover:bg-[#F2A900] text-white hover:text-[#2D1B08] p-0 transition-all">
                  <MessageSquare size={18} />
                </Button>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* 🛠️ Explorer Tools & Quick Actions */}
        <Card className="rounded-3xl md:rounded-[2.5rem] border-none bg-white shadow-sm overflow-hidden text-[#2D1B08]">
          <CardHeader className="px-6 md:px-8 py-6">
            <CardTitle className="text-lg md:text-xl font-black uppercase tracking-tighter flex items-center gap-2">
              <Compass size={20} className="text-[#2D1B08]" />
              Outils de l'Explorateur
            </CardTitle>
          </CardHeader>
          <CardContent className="px-4 md:px-8 pb-8 space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <button className="p-5 md:p-6 rounded-3xl bg-[#F2A900]/5 border-2 border-transparent hover:border-[#F2A900] transition-all group text-left">
                <Map className="text-[#F2A900] mb-3 group-hover:scale-110 transition-transform" size={24} />
                <h5 className="text-[11px] md:text-[12px] font-black uppercase leading-tight text-[#2D1B08]">Itinéraires IA</h5>
                <p className="text-[8px] md:text-[9px] text-[#5D4037]/40 font-bold uppercase mt-1">Cuisiné pour vous</p>
              </button>
              <button className="p-5 md:p-6 rounded-3xl bg-emerald-50/50 border-2 border-transparent hover:border-emerald-500 transition-all group text-left">
                <Palmtree className="text-emerald-500 mb-3 group-hover:scale-110 transition-transform" size={24} />
                <h5 className="text-[11px] md:text-[12px] font-black uppercase leading-tight text-[#2D1B08]">Destinations</h5>
                <p className="text-[8px] md:text-[9px] text-[#5D4037]/40 font-bold uppercase mt-1">Inspirations du jour</p>
              </button>
            </div>

            <div className="p-6 rounded-3xl bg-[#2D1B08] text-white relative overflow-hidden group">
              <div className="absolute top-0 right-0 p-4 text-[#F2A900]/10 group-hover:text-[#F2A900]/20 transition-colors">
                <Compass size={80} strokeWidth={4} />
              </div>
              <div className="relative z-10">
                <h4 className="text-[12px] md:text-sm font-black uppercase tracking-tight mb-1">Pass Exploration</h4>
                <p className="text-[9px] md:text-[10px] text-white/50 font-medium italic mb-4">Utilisez vos 1,450 points pour débloquer une remise sur votre prochain billet.</p>
                <Button className="h-9 rounded-xl bg-[#F2A900] hover:bg-white text-[#2D1B08] text-[9px] md:text-[10px] font-black uppercase px-4 border-none transition-colors">
                  Voir mes Avantages <ArrowRight className="ml-2 h-3 w-3" />
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default TouristDashboard;
