import React from 'react';
import { 
  Users, 
  UserPlus, 
  Newspaper, 
  Video, 
  Palette, 
  MessageCircle,
  TrendingUp,
  Activity
} from 'lucide-react';
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  AreaChart,
  Area,
  BarChart,
  Bar,
  PieChart,
  Cell,
  Pie
} from 'recharts';

import StatCard from './StatCard';
import ChartCard from './ChartCard';
import ActivityFeed from './ActivityFeed';
import TopPerformers from './TopPerformers';
import AlertList from './AlertList';

const USER_GROWTH_DATA = [
  { name: 'Lun', users: 12000 },
  { name: 'Mar', users: 12150 },
  { name: 'Mer', users: 12300 },
  { name: 'Jeu', users: 12450 },
  { name: 'Ven', users: 12600 },
  { name: 'Sam', users: 12750 },
  { name: 'Dim', users: 12847 },
];

const ACTIVITY_DATA = [
  { name: 'Lun', posts: 45, comments: 120, likes: 450 },
  { name: 'Mar', posts: 52, comments: 135, likes: 480 },
  { name: 'Mer', posts: 48, comments: 128, likes: 460 },
  { name: 'Jeu', posts: 61, comments: 156, likes: 520 },
  { name: 'Ven', posts: 55, comments: 142, likes: 490 },
  { name: 'Sam', posts: 67, comments: 178, likes: 580 },
  { name: 'Dim', posts: 72, comments: 195, likes: 620 },
];

const ROLES_DATA = [
  { name: 'Touristes', value: 8500, color: '#2D1B08' },
  { name: 'Artisans', value: 432, color: '#F2A900' },
  { name: 'Agences', value: 124, color: '#6B4226' },
  { name: 'Guides', value: 56, color: '#EBE3D5' },
];

const DashboardContent: React.FC = () => {
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className="space-y-12 pb-20 animate-in fade-in duration-1000">
      
      {/* SECTION 1 — STATISTIQUES GLOBALES */}
      <section className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-black text-[#2D1B08] uppercase tracking-tighter flex items-center gap-2">
            <TrendingUp size={24} className="text-[#F2A900]" />
            Performances Globales
          </h2>
          <div className="text-[10px] font-black text-[#5D4037]/50 uppercase tracking-widest bg-[#EBE3D5]/20 px-4 py-1 rounded-full border border-[#EBE3D5]/30">
            Dernière mise à jour : {new Date().toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' })}
          </div>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-6">
          <StatCard 
            icon={Users} 
            value="12,847" 
            label="Total Utilisateurs" 
            trend={{ value: 15, isUp: true }} 
          />
          <StatCard 
            icon={UserPlus} 
            value="1,240" 
            label="Nouveaux (7j)" 
            trend={{ value: 8, isUp: true }} 
          />
          <StatCard 
            icon={Newspaper} 
            value="5,632" 
            label="Publications" 
            trend={{ value: 12, isUp: true }} 
          />
          <StatCard 
            icon={Video} 
            value="892" 
            label="Vidéos" 
            trend={{ value: 5, isUp: true }} 
          />
          <StatCard 
            icon={Palette} 
            value="432" 
            label="Artisans" 
            trend={{ value: 20, isUp: true }} 
          />
          <StatCard 
            icon={MessageCircle} 
            value="45,671" 
            label="Messages" 
            trend={{ value: 30, isUp: true }} 
          />
        </div>
      </section>

      {/* SECTION 2 — ANALYTICS (GRAPHIQUES) */}
      <section className="space-y-6">
        <h2 className="text-xl font-black text-[#2D1B08] uppercase tracking-tighter flex items-center gap-2">
          <Activity size={24} className="text-[#F2A900]" />
          Analyses de Croissance
        </h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8">
          
          <ChartCard title="Évolution des Utilisateurs" subtitle="Croissance cumulée - 7 derniers jours">
            <div className="h-full w-full min-h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={USER_GROWTH_DATA}>
                  <defs>
                    <linearGradient id="colorUsers" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#F2A900" stopOpacity={0.8}/>
                      <stop offset="95%" stopColor="#F2A900" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#EBE3D5" />
                  <XAxis dataKey="name" stroke="#5D4037" fontSize={10} fontWeight="bold" axisLine={false} tickLine={false} />
                  <YAxis stroke="#5D4037" fontSize={10} fontWeight="bold" axisLine={false} tickLine={false} />
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#2D1B08', border: 'none', borderRadius: '12px', color: '#fff' }}
                    itemStyle={{ color: '#F2A900', fontWeight: 'bold' }}
                  />
                  <Area type="monotone" dataKey="users" stroke="#F2A900" strokeWidth={3} fillOpacity={1} fill="url(#colorUsers)" isAnimationActive={false} />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </ChartCard>

          <ChartCard title="Activité Plateforme" subtitle="Posts, Commentaires & Likes par jour">
            <div className="h-full w-full min-h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={ACTIVITY_DATA}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#EBE3D5" />
                  <XAxis dataKey="name" stroke="#5D4037" fontSize={10} fontWeight="bold" axisLine={false} tickLine={false} />
                  <YAxis stroke="#5D4037" fontSize={10} fontWeight="bold" axisLine={false} tickLine={false} />
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#2D1B08', border: 'none', borderRadius: '12px', color: '#fff' }}
                  />
                  <Bar dataKey="posts" fill="#6B4226" radius={[4, 4, 0, 0]} isAnimationActive={false} />
                  <Bar dataKey="comments" fill="#F2A900" radius={[4, 4, 0, 0]} isAnimationActive={false} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </ChartCard>

          <ChartCard title="Répartition des Rôles" subtitle="Répartition par type de compte">
            <div className="h-full w-full min-h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={ROLES_DATA}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={100}
                    paddingAngle={5}
                    dataKey="value"
                    isAnimationActive={false}
                  >
                    {ROLES_DATA.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="flex flex-wrap justify-center gap-4 mt-[-40px] relative z-10">
              {ROLES_DATA.map((role) => (
                <div key={role.name} className="flex items-center gap-1.5">
                  <div className="w-2 h-2 rounded-full" style={{ backgroundColor: role.color }} />
                  <span className="text-[10px] font-black uppercase text-[#2D1B08]">{role.name}</span>
                </div>
              ))}
            </div>
          </ChartCard>

        </div>
      </section>

      {/* SECTION 3 & 4 — ACTIVITÉS ET TOPS */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-12">
        <div className="xl:col-span-1">
          <ActivityFeed />
        </div>
        <div className="xl:col-span-2 space-y-12">
          <TopPerformers />
          
          {/* SECTION 5 — ALERTES & MODÉRATION */}
          <AlertList />
        </div>
      </div>

    </div>
  );
};

export default DashboardContent;
