import React from 'react';
import { 
  ShoppingBag, 
  Package, 
  Star, 
  TrendingUp, 
  Plus, 
  Store, 
  ArrowUpRight,
  Clock,
  ArrowRight,
  ChevronRight,
  Gem,
  Palette,
  Heart
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

interface ArtisanDashboardProps {
  user: any;
}

const SALES_DATA = [
  { name: 'Lun', sales: 45000 },
  { name: 'Mar', sales: 52000 },
  { name: 'Mer', sales: 38000 },
  { name: 'Jeu', sales: 61000 },
  { name: 'Ven', sales: 75000 },
  { name: 'Sam', sales: 98000 },
  { name: 'Dim', sales: 85000 },
];

const CATEGORY_DATA = [
  { name: 'Poterie', value: 45, color: '#2D1B08' },
  { name: 'Textile', value: 30, color: '#F2A900' },
  { name: 'Bijoux', value: 25, color: '#6B4226' },
];

const RECENT_ORDERS = [
  { id: '1', customer: 'Moussa Diop', product: 'Vase en argile', price: '15,000 FCFA', status: 'En attente', date: 'Il y a 15 min' },
  { id: '2', customer: 'Fatou Sarr', product: 'Boubou traditionnel', price: '45,000 FCFA', status: 'Prêt', date: 'Il y a 2h' },
  { id: '3', customer: 'Jean Gomis', product: 'Collier perles', price: '12,000 FCFA', status: 'Livré', date: 'Hier' },
];

const ArtisanDashboard: React.FC<ArtisanDashboardProps> = ({ user }) => {
  return (
    <div className="space-y-6 md:space-y-8 pb-12 animate-in fade-in duration-700 min-h-screen">
      {/* 🚀 Premium Welcome Header */}
      <div className="relative rounded-3xl md:rounded-[2.5rem] overflow-hidden bg-gradient-to-br from-[#2D1B08] via-[#5D4037] to-[#2D1B08] p-6 md:p-12 text-white shadow-2xl">
        <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-[#F2A900]/10 to-transparent pointer-events-none" />
        <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-[#F2A900]/5 rounded-full blur-[100px]" />
        
        <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-8">
          <div className="space-y-4">
            <div className="flex flex-wrap items-center gap-3">
              <Badge className="bg-[#F2A900] text-[#2D1B08] font-black uppercase tracking-widest text-[8px] md:text-[9px] px-3 border-none">
                ÉCHOPE ARTISANALE
              </Badge>
              <div className="flex items-center gap-1.5 text-[9px] md:text-[10px] font-bold text-white/40 uppercase tracking-widest">
                <Clock size={12} className="md:size-2.5" /> Status : Ouvert
              </div>
            </div>
            <h1 className="text-3xl md:text-5xl font-black tracking-tighter uppercase leading-[0.9]">
              BIENVENUE, {user.name.split(' ')[0]} <span className="text-[#F2A900]">.</span>
            </h1>
            <p className="text-white/60 font-medium italic text-xs md:text-base max-w-xl">
              Votre atelier virtuel rayonne ! Voici un aperçu de vos ventes et de vos créations pour aujourd'hui.
            </p>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-3">
            <Link to="/artisan/products" className="w-full sm:w-auto">
              <Button className="w-full rounded-xl md:rounded-2xl bg-white/10 hover:bg-white/20 border-white/10 text-white font-bold backdrop-blur-md h-12 px-6">
                <Plus className="mr-2 h-4 w-4" /> Nouveau Produit
              </Button>
            </Link>
            <Link to="/artisan/profile" className="w-full sm:w-auto">
              <Button className="w-full rounded-xl md:rounded-2xl bg-[#F2A900] hover:bg-[#D49400] text-[#2D1B08] font-black h-12 px-6 shadow-xl shadow-[#F2A900]/20">
                <Store className="mr-2 h-4 w-4" /> Voir Échoppe
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {/* 📊 Core Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
        <StatCard 
          icon={TrendingUp} 
          value="1,250,000" 
          label="Ventes (FCFA)" 
          trend={{ value: 12, isUp: true }} 
        />
        <StatCard 
          icon={ShoppingBag} 
          value="5" 
          label="À traiter" 
          trend={{ value: 2, isUp: false }} 
        />
        <StatCard 
          icon={Package} 
          value="42" 
          label="Articles" 
          trend={{ value: 4, isUp: true }} 
        />
        <StatCard 
          icon={Star} 
          value="4.8" 
          label="Note" 
          trend={{ value: 0.2, isUp: true }} 
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* 📈 Performance Chart */}
        <div className="lg:col-span-2">
          <ChartCard title="Activité des Ventes" subtitle="Évolution du revenu sur les 7 derniers jours">
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={SALES_DATA}>
                <defs>
                  <linearGradient id="colorSales" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#F2A900" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#F2A900" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#EBE3D5" />
                <XAxis dataKey="name" stroke="#5D4037" fontSize={10} fontWeight="bold" axisLine={false} tickLine={false} />
                <YAxis stroke="#5D4037" fontSize={10} fontWeight="bold" axisLine={false} tickLine={false} tickFormatter={(val) => `${val/1000}k`} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#2D1B08', border: 'none', borderRadius: '12px', color: '#fff' }}
                  itemStyle={{ color: '#F2A900', fontWeight: 'bold' }}
                />
                <Area type="monotone" dataKey="sales" stroke="#F2A900" strokeWidth={3} fillOpacity={1} fill="url(#colorSales)" />
              </AreaChart>
            </ResponsiveContainer>
          </ChartCard>
        </div>

        {/* 🥧 Product Distribution */}
        <div className="lg:col-span-1">
          <ChartCard title="Vos Catégories" subtitle="Répartition de l'inventaire">
            <div className="h-[200px] md:h-[250px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={CATEGORY_DATA}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={80}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {CATEGORY_DATA.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="flex flex-col gap-2 mt-4">
              {CATEGORY_DATA.map((cat, i) => (
                <div key={i} className="flex justify-between items-center text-[11px] font-bold">
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
        {/* 📋 Recent Orders */}
        <Card className="rounded-[2.5rem] border-none bg-white shadow-sm overflow-hidden">
          <CardHeader className="px-8 py-6 border-b border-gray-100 flex flex-row items-center justify-between">
            <CardTitle className="text-xl font-black text-[#2D1B08] uppercase tracking-tighter flex items-center gap-2">
              <Clock size={20} className="text-[#F2A900]" />
              Dernières Commandes
            </CardTitle>
            <Link to="/artisan/orders">
              <Button variant="ghost" className="text-[10px] font-black uppercase tracking-widest text-[#F2A900]">Tout voir</Button>
            </Link>
          </CardHeader>
          <CardContent className="p-0">
            <div className="divide-y divide-gray-50 max-h-[400px] overflow-y-auto">
              {RECENT_ORDERS.map((order) => (
                <div key={order.id} className="px-4 md:px-8 py-5 md:py-6 hover:bg-gray-50/50 transition-colors group flex items-center justify-between">
                  <div className="flex items-center gap-3 md:gap-4 overflow-hidden">
                    <div className="p-2 md:p-3 rounded-xl md:rounded-2xl bg-orange-50 text-[#6B4226] flex-shrink-0">
                      <ShoppingBag size={18} className="md:size-5" />
                    </div>
                    <div className="min-w-0">
                      <h4 className="text-[10px] md:text-[11px] font-black text-[#2D1B08] uppercase truncate">{order.customer}</h4>
                      <p className="text-[9px] md:text-[10px] text-gray-400 font-bold truncate">{order.product} • {order.price}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 md:gap-4 flex-shrink-0">
                    <Badge className={cn(
                      "px-2 md:px-3 py-0.5 md:py-1 rounded-full text-[8px] md:text-[9px] font-black uppercase border-none",
                      order.status === 'En attente' ? "bg-amber-100 text-amber-600" :
                      order.status === 'Prêt' ? "bg-blue-100 text-blue-600" : "bg-emerald-100 text-emerald-600"
                    )}>
                      {order.status}
                    </Badge>
                    <span className="hidden sm:block text-[10px] font-bold text-gray-300">{order.date}</span>
                    <ChevronRight size={16} className="text-gray-200 group-hover:text-[#F2A900] transition-colors" />
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* 🛠️ Quick Tools & Resources */}
        <Card className="rounded-[2.5rem] border-none bg-white shadow-sm overflow-hidden">
          <CardHeader className="px-8 py-6">
            <CardTitle className="text-xl font-black text-[#2D1B08] uppercase tracking-tighter flex items-center gap-2">
              <Palette size={20} className="text-[#2D1B08]" />
              Outils & Conseils
            </CardTitle>
          </CardHeader>
          <CardContent className="px-4 md:px-8 pb-6 md:pb-8 space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <button className="p-4 md:p-6 rounded-2xl md:rounded-3xl bg-orange-50/50 border-2 border-transparent hover:border-[#F2A900] transition-all group text-left">
                <Gem className="text-[#F2A900] mb-2 md:mb-3 group-hover:scale-110 transition-transform" size={20} className="md:size-6" />
                <h5 className="text-[11px] md:text-[12px] font-black text-[#2D1B08] uppercase leading-tight">Mettre en avant</h5>
                <p className="text-[8px] md:text-[9px] text-gray-400 font-bold uppercase mt-1">Boostez vos vues</p>
              </button>
              <button className="p-4 md:p-6 rounded-2xl md:rounded-3xl bg-brown-50/50 border-2 border-transparent hover:border-[#6B4226] transition-all group text-left">
                <Heart className="text-[#6B4226] mb-2 md:mb-3 group-hover:scale-110 transition-transform" size={20} className="md:size-6" />
                <h5 className="text-[11px] md:text-[12px] font-black text-[#2D1B08] uppercase leading-tight">Avis Clients</h5>
                <p className="text-[8px] md:text-[9px] text-gray-400 font-bold uppercase mt-1">Gérer vos retours</p>
              </button>
            </div>

            <div className="p-5 md:p-6 rounded-2xl md:rounded-3xl bg-[#2D1B08] text-white relative overflow-hidden group">
              <div className="absolute top-0 right-0 p-4 text-[#F2A900]/10 group-hover:text-[#F2A900]/20 transition-colors">
                <TrendingUp size={60} className="md:size-20" strokeWidth={4} />
              </div>
              <div className="relative z-10">
                <h4 className="text-[12px] md:text-sm font-black uppercase tracking-tight mb-1">Discover Academy</h4>
                <p className="text-[9px] md:text-[10px] text-white/50 font-medium italic mb-4">Vendez mieux avec nos conseils photo.</p>
                <Button className="h-8 md:h-9 rounded-lg md:rounded-xl bg-[#F2A900] hover:bg-white text-[#2D1B08] text-[9px] md:text-[10px] font-black uppercase px-3 md:px-4 border-none transition-colors">
                  Lire <ArrowRight className="ml-1 md:ml-2 h-3 w-3" />
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ArtisanDashboard;
