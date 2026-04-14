import React from 'react';
import { 
  Building2, 
  Bed, 
  UtensilsCrossed, 
  Calendar, 
  Star, 
  TrendingUp, 
  Clock, 
  CheckCircle, 
  ArrowRight, 
  Plus, 
  MessageSquare, 
  Award, 
  Briefcase,
  Users,
  ChevronRight,
  Home,
  FileText
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

interface EstablishmentDashboardProps {
  user: any;
}

const OCCUPANCY_DATA = [
  { day: 'Lun', rate: 65 },
  { day: 'Mar', rate: 68 },
  { day: 'Mer', rate: 72 },
  { day: 'Jeu', rate: 75 },
  { day: 'Ven', rate: 88 },
  { day: 'Sam', rate: 95 },
  { day: 'Dim', rate: 92 },
];

const ROOM_TYPE_DATA = [
  { name: 'Suites', value: 25, color: '#2D1B08' },
  { name: 'Double', value: 55, color: '#F2A900' },
  { name: 'Simple', value: 20, color: '#6B4226' },
];

const RECENT_BOOKINGS = [
  { id: '1', guest: 'Jean Dupont', type: 'Suite Royale', price: '125,000 FCFA', status: 'Confirmée', date: '15-18 Avril' },
  { id: '2', guest: 'Sokhna Diop', type: 'Chambre Double', price: '45,000 FCFA', status: 'En attente', date: '16-17 Avril' },
  { id: '3', guest: 'Marc Vallet', type: 'Chambre Simple', price: '32,000 FCFA', status: 'Confirmée', date: 'Hoy' },
];

const EstablishmentDashboard: React.FC<EstablishmentDashboardProps> = ({ user }) => {
  const isHotel = user.role === 'hotel';

  return (
    <div className="space-y-6 md:space-y-8 pb-12 animate-in fade-in duration-700 min-h-screen">
      {/* 🏛️ Premium Establishment Header */}
      <div className="relative rounded-3xl md:rounded-[2.5rem] overflow-hidden bg-gradient-to-br from-[#2D1B08] via-[#5D4037] to-[#2D1B08] p-6 md:p-12 text-white shadow-2xl">
        <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-[#F2A900]/10 to-transparent pointer-events-none" />
        <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-[#F2A900]/5 rounded-full blur-[100px]" />
        
        <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-8">
          <div className="space-y-4">
            <div className="flex flex-wrap items-center gap-3">
              <Badge className="bg-[#F2A900] text-[#2D1B08] font-black uppercase tracking-widest text-[8px] md:text-[9px] px-3 border-none">
                {isHotel ? 'HÔTELLERIE DE LUXE' : 'GASTRONOMIE FINE'}
              </Badge>
              <div className="flex items-center gap-1.5 text-[9px] md:text-[10px] font-bold text-white/40 uppercase tracking-widest">
                <Star size={12} className="text-[#F2A900] fill-[#F2A900]" /> 4.9 Super-hôte
              </div>
            </div>
            <h1 className="text-3xl md:text-5xl font-black tracking-tighter uppercase leading-[0.9]">
              BIENVENUE, {user.name.split(' ')[0]} <span className="text-[#F2A900]">.</span>
            </h1>
            <p className="text-white/60 font-medium italic text-xs md:text-base max-w-xl">
              Votre établissement brille aujourd'hui. {isHotel ? '18 clients attendus' : '12 tables réservées'} pour cette soirée sénégalaise.
            </p>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-3">
            <Link to={isHotel ? "/establishment/rooms" : "/establishment/menu"} className="w-full sm:w-auto">
              <Button className="w-full rounded-xl md:rounded-2xl bg-white/10 hover:bg-white/20 border-white/10 text-white font-bold backdrop-blur-md h-12 px-6">
                <Plus className="mr-2 h-4 w-4" /> {isHotel ? 'Gérer Chambres' : 'Gérer Menu'}
              </Button>
            </Link>
            <Link to="/establishment/profile" className="w-full sm:w-auto">
              <Button className="w-full rounded-xl md:rounded-2xl bg-[#F2A900] hover:bg-[#D49400] text-[#2D1B08] font-black h-12 px-6 shadow-xl shadow-[#F2A900]/20">
                <Home className="mr-2 h-4 w-4" /> Voir Profil
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {/* 📈 Key Metrics Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
        <StatCard 
          icon={TrendingUp} 
          value={isHotel ? "85%" : "72%"} 
          label={isHotel ? "Occupation" : "Remplissage"} 
          trend={{ value: 8, isUp: true }} 
        />
        <StatCard 
          icon={Calendar} 
          value="124" 
          label="Réser. mois" 
          trend={{ value: 15, isUp: true }} 
        />
        <StatCard 
          icon={isHotel ? Bed : UtensilsCrossed} 
          value={isHotel ? "3/25" : "4/15"} 
          label={isHotel ? "Libres" : "Tables disp."} 
          trend={{ value: 2, isUp: false }} 
        />
        <StatCard 
          icon={Award} 
          value="4.9" 
          label="Satisfaction" 
          trend={{ value: 0.1, isUp: true }} 
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* 📊 Historical Performance */}
        <div className="lg:col-span-2">
          <ChartCard title="Taux d'Occupation (%)" subtitle="Performance sur les 7 derniers jours">
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={OCCUPANCY_DATA}>
                <defs>
                  <linearGradient id="colorRate" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#2D1B08" stopOpacity={0.1}/>
                    <stop offset="95%" stopColor="#2D1B08" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#EBE3D5" />
                <XAxis dataKey="day" stroke="#5D4037" fontSize={10} fontWeight="bold" axisLine={false} tickLine={false} />
                <YAxis stroke="#5D4037" fontSize={10} fontWeight="bold" axisLine={false} tickLine={false} domain={[0, 100]} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#2D1B08', border: 'none', borderRadius: '12px', color: '#fff' }}
                  itemStyle={{ color: '#F2A900', fontWeight: 'bold' }}
                />
                <Area type="monotone" dataKey="rate" stroke="#2D1B08" strokeWidth={3} fillOpacity={1} fill="url(#colorRate)" />
              </AreaChart>
            </ResponsiveContainer>
          </ChartCard>
        </div>

        {/* 🥧 Segment Distribution */}
        <div className="lg:col-span-1">
          <ChartCard title={isHotel ? "Types de Chambres" : "Menus Favoris"} subtitle="Répartition des revenus">
            <div className="h-[200px] md:h-[250px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={ROOM_TYPE_DATA}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={80}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {ROOM_TYPE_DATA.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="flex flex-col gap-2 mt-4">
              {ROOM_TYPE_DATA.map((seg, i) => (
                <div key={i} className="flex justify-between items-center text-[10px] md:text-[11px] font-bold">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full" style={{ backgroundColor: seg.color }} />
                    <span className="text-[#2D1B08] uppercase tracking-tighter">{seg.name}</span>
                  </div>
                  <span className="text-gray-400">{seg.value}%</span>
                </div>
              ))}
            </div>
          </ChartCard>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* 📅 Recent Bookings List */}
        <Card className="rounded-3xl md:rounded-[2.5rem] border-none bg-white shadow-sm overflow-hidden">
          <CardHeader className="px-6 md:px-8 py-6 border-b border-gray-100 flex flex-row items-center justify-between">
            <CardTitle className="text-lg md:text-xl font-black text-[#2D1B08] uppercase tracking-tighter flex items-center gap-2">
              <Calendar size={20} className="text-[#F2A900]" />
              Arrivées Récentes
            </CardTitle>
            <Link to="/establishment/bookings">
              <Button variant="ghost" className="text-[10px] font-black uppercase tracking-widest text-[#F2A900]">Voir tout</Button>
            </Link>
          </CardHeader>
          <CardContent className="p-0">
            <div className="divide-y divide-gray-50 max-h-[420px] overflow-y-auto">
              {RECENT_BOOKINGS.map((res) => (
                <div key={res.id} className="px-4 md:px-8 py-5 md:py-6 hover:bg-gray-50/50 transition-colors group flex items-center justify-between">
                  <div className="flex items-center gap-3 md:gap-4 overflow-hidden">
                    <div className="p-2 md:p-3 rounded-xl md:rounded-2xl bg-[#EBE3D5] text-[#2D1B08] flex-shrink-0 group-hover:bg-[#F2A900] group-hover:text-[#2D1B08] transition-colors">
                      {isHotel ? <Bed size={18} className="md:size-5" /> : <UtensilsCrossed size={18} className="md:size-5" />}
                    </div>
                    <div className="min-w-0">
                      <h4 className="text-[10px] md:text-[11px] font-black text-[#2D1B08] uppercase truncate">{res.guest}</h4>
                      <p className="text-[9px] md:text-[10px] text-gray-400 font-bold truncate">{res.type} • {res.date}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 md:gap-4 flex-shrink-0">
                    <span className="hidden sm:block text-[11px] font-black text-[#2D1B08]">{res.price}</span>
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

        {/* 🛠️ Strategic Tools */}
        <Card className="rounded-3xl md:rounded-[2.5rem] border-none bg-white shadow-sm overflow-hidden text-[#2D1B08]">
          <CardHeader className="px-6 md:px-8 py-6">
            <CardTitle className="text-lg md:text-xl font-black uppercase tracking-tighter flex items-center gap-2">
              <Briefcase size={20} className="text-[#2D1B08]" />
              Pilotage Stratégique
            </CardTitle>
          </CardHeader>
          <CardContent className="px-4 md:px-8 pb-8 space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Link to="/establishment/create-post">
                <button className="w-full p-4 md:p-6 rounded-2xl md:rounded-3xl bg-[#F2A900]/5 border-2 border-transparent hover:border-[#F2A900] transition-all group text-left">
                  <FileText className="text-[#F2A900] mb-2 md:mb-3 group-hover:scale-110 transition-transform" size={20} className="md:size-6" />
                  <h5 className="text-[11px] md:text-[12px] font-black uppercase leading-tight">Campagne Promo</h5>
                  <p className="text-[8px] md:text-[9px] text-[#5D4037]/40 font-bold uppercase mt-1">Boostez votre visibilité</p>
                </button>
              </Link>
              <Link to="/establishment/reviews">
                <button className="w-full p-4 md:p-6 rounded-2xl md:rounded-3xl bg-brown-50/10 border-2 border-transparent hover:border-[#2D1B08] transition-all group text-left">
                  <MessageSquare className="text-[#2D1B08] mb-2 md:mb-3 group-hover:scale-110 transition-transform" size={20} className="md:size-6" />
                  <h5 className="text-[11px] md:text-[12px] font-black uppercase leading-tight">Réputation Web</h5>
                  <p className="text-[8px] md:text-[9px] text-[#5D4037]/40 font-bold uppercase mt-1">Répondre aux avis</p>
                </button>
              </Link>
            </div>

            <div className="p-5 md:p-6 rounded-2xl md:rounded-3xl bg-[#EBE3D5]/30 border border-[#EBE3D5] flex items-center justify-between group">
              <div className="flex items-center gap-4">
                <div className="p-3 rounded-xl bg-white shadow-sm">
                  <Users size={20} className="text-[#2D1B08]" />
                </div>
                <div>
                  <h4 className="text-[11px] md:text-[12px] font-black uppercase tracking-tighter leading-none">Fidélisation Client</h4>
                  <p className="text-[9px] md:text-[10px] font-bold text-[#5D4037]/60 uppercase mt-1">85 clients fidèles ce mois</p>
                </div>
              </div>
              <ChevronRight size={18} className="text-gray-300 group-hover:text-[#2D1B08] transition-colors" />
            </div>

            <div className="p-6 rounded-2xl md:rounded-3xl bg-[#2D1B08] text-white relative overflow-hidden group">
              <div className="absolute top-0 right-0 p-4 text-[#F2A900]/10 group-hover:text-[#F2A900]/20 transition-colors">
                <CheckCircle size={60} className="md:size-20" strokeWidth={4} />
              </div>
              <div className="relative z-10">
                <h4 className="text-[12px] md:text-sm font-black uppercase tracking-tight mb-1">Qualité certifiée</h4>
                <p className="text-[9px] md:text-[10px] text-white/50 font-medium italic mb-4">Votre établissement a été ré-approuvé pour le label 'Discover Sénégal Premium'.</p>
                <Link to="/establishment/profile">
                  <Button className="h-8 md:h-9 rounded-lg md:rounded-xl bg-[#F2A900] hover:bg-white text-[#2D1B08] text-[8px] md:text-[9px] font-black uppercase px-3 md:px-4 border-none transition-colors">
                    Détails du Label <ArrowRight className="ml-1 md:ml-2 h-3 w-3" />
                  </Button>
                </Link>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default EstablishmentDashboard;
