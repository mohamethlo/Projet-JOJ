import React, { useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import {
  Compass,
  Plus,
  Search,
  Filter,
  Eye,
  Edit,
  Trash2,
  MapPin,
  Clock,
  BarChart3,
  Activity,
  CheckCircle,
  XCircle,
  Star,
  Heart,
  Image as ImageIcon,
  DollarSign,
  Calendar,
  Copy,
  ChevronRight,
  TrendingUp,
  Map,
  Camera,
  Backpack,
  Zap
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
import { GuideDetailsModal, GuideEditModal } from '@/components/modals';
import { toast } from 'sonner';
import { cn } from '@/lib/utils';
import StatCard from '@/components/dashboard/StatCard';
import ChartCard from '@/components/dashboard/ChartCard';

// Données mock pour les visites guidées
const mockGuideTours = [
  {
    id: '1',
    name: 'Visite Historique de Saint-Louis',
    description: 'Explorez l\'histoire fascinante de Saint-Louis, première capitale du Sénégal, son architecture unique et ses ponts célèbres.',
    location: 'Saint-Louis',
    specialties: ['Histoire', 'Culture'],
    price: '25,000 FCFA',
    duration: '4 heures',
    maxGroupSize: 15,
    rating: 4.8,
    reviews: 45,
    image: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=400',
    status: 'Disponible',
    views: 1250,
    likes: 89,
    bookings: 23,
    type: 'Culturel'
  },
  {
    id: '2',
    name: 'Tour Gastronomique de Dakar',
    description: 'Une immersion culinaire haute en couleurs à travers les marchés et les restaurants authentiques de la capitale.',
    location: 'Dakar',
    specialties: ['Gastronomie', 'Marchés'],
    price: '35,000 FCFA',
    duration: '5 heures',
    maxGroupSize: 12,
    rating: 4.6,
    reviews: 32,
    image: 'https://images.pexels.com/photos/941861/pexels-photo-941861.jpeg?auto=compress&cs=tinysrgb&w=400',
    status: 'Auto-publié',
    views: 890,
    likes: 67,
    bookings: 18,
    type: 'Gastronomie'
  },
  {
    id: '3',
    name: 'Safari Réserve de Bandia',
    description: 'Partez à la rencontre de la faune sauvage sénégalaise dans une réserve naturelle préservée et sauvage.',
    location: 'Thiès',
    specialties: ['Nature', 'Faune'],
    price: '45,000 FCFA',
    duration: '6 heures',
    maxGroupSize: 20,
    rating: 4.9,
    reviews: 28,
    image: 'https://images.pexels.com/photos/1266808/pexels-photo-1266808.jpeg?auto=compress&cs=tinysrgb&w=400',
    status: 'En attente',
    views: 450,
    likes: 34,
    bookings: 0,
    type: 'Nature'
  }
];

const RECURRENCE_DATA = [
  { day: 'Lun', views: 120, bookings: 2 },
  { day: 'Mar', views: 210, bookings: 5 },
  { day: 'Mer', views: 180, bookings: 3 },
  { day: 'Jeu', views: 350, bookings: 8 },
  { day: 'Ven', views: 520, bookings: 12 },
  { day: 'Sam', views: 680, bookings: 15 },
  { day: 'Dim', views: 450, bookings: 10 },
];

const CATEGORY_DATA = [
  { name: 'Culturel', value: 45, color: '#2D1B08' },
  { name: 'Nature', value: 35, color: '#F2A900' },
  { name: 'Gastron.', value: 20, color: '#6B4226' },
];

const GuideManagementPage: React.FC = () => {
  const { user } = useAuth();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedLocation, setSelectedLocation] = useState('Tous');
  const [selectedStatus, setSelectedStatus] = useState('Tous');
  const [activeTab, setActiveTab] = useState('list');
  const [tours, setTours] = useState(mockGuideTours);
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedTour, setSelectedTour] = useState<any>(null);
  const [editMode, setEditMode] = useState<'create' | 'edit'>('create');

  const locations = ['Tous', 'Dakar', 'Saint-Louis', 'Thiès', 'Kaolack', 'Mbour'];
  const statuses = ['Tous', 'Disponible', 'Auto-publié', 'En attente', 'Brouillon', 'Suspendu'];

  // Fonction de duplication
  const handleDuplicateTour = (tour: any) => {
    const duplicatedTour = {
      ...tour,
      id: Date.now().toString(),
      name: `${tour.name} (Copie)`,
      status: 'Brouillon',
      views: 0,
      likes: 0,
      bookings: 0,
      reviews: 0
    };
    setTours(prev => [...prev, duplicatedTour]);
    toast.success('Visite dupliquée', {
      description: `Le circuit "${tour.name}" a été dupliqué avec succès.`
    });
  };

  // Basculer la disponibilité
  const toggleTourAvailability = (tourId: string) => {
    setTours(prev => prev.map(t => {
      if (t.id === tourId) {
        const newStatus = t.status === 'Disponible' ? 'Suspendu' : 'Disponible';
        toast.info(newStatus === 'Disponible' ? 'Visite réactivée' : 'Visite suspendue');
        return { ...t, status: newStatus };
      }
      return t;
    }));
  };

  const handleEditTour = (tour: any) => {
    setSelectedTour(tour);
    setEditMode('edit');
    setIsEditModalOpen(true);
  };

  const handleDeleteTour = (tourId: string) => {
    if (window.confirm("Êtes-vous sûr de vouloir supprimer ce circuit ?")) {
      setTours(prev => prev.filter(t => t.id !== tourId));
      toast.error('Visite supprimée');
    }
  };

  const filteredTours = tours.filter(tour => {
    const matchesSearch = tour.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          tour.location.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesLocation = selectedLocation === 'Tous' || tour.location === selectedLocation;
    const matchesStatus = selectedStatus === 'Tous' || tour.status === selectedStatus;
    return matchesSearch && matchesLocation && matchesStatus;
  });

  return (
    <div className="min-h-screen bg-[#FDFCFB] pb-20 animate-in fade-in duration-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
        
        {/* 🧭 Premium Header */}
        <div className="relative rounded-[2.5rem] overflow-hidden bg-gradient-to-br from-[#2D1B08] via-[#5D4037] to-[#2D1B08] p-8 md:p-14 text-white shadow-2xl mb-12">
          <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-[#F2A900]/10 to-transparent pointer-events-none" />
          <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-[#F2A900]/5 rounded-full blur-[100px]" />
          
          <div className="relative z-10 flex flex-col md:flex-row md:items-end justify-between gap-8">
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <Badge className="bg-[#F2A900] text-[#2D1B08] font-black uppercase tracking-widest text-[10px] px-3 border-none">
                  ESPACE AMBASSADEUR
                </Badge>
                <div className="flex items-center gap-1.5 text-[10px] font-bold text-white/40 uppercase tracking-widest">
                  <Compass size={14} className="text-[#F2A900]" /> Gestion des Circuits
                </div>
              </div>
              <h1 className="text-4xl md:text-6xl font-black tracking-tighter uppercase leading-[0.85]">
                MES PARCOURS <br /> <span className="text-[#F2A900]">D'EXCEPTION .</span>
              </h1>
              <p className="text-white/60 font-medium italic text-sm md:text-lg max-w-xl">
                Administrez vos offres, attirez plus de voyageurs et partagez la beauté du Sénégal avec le monde entier.
              </p>
            </div>
            
            <Button 
              onClick={() => { setEditMode('create'); setSelectedTour(null); setIsEditModalOpen(true); }}
              className="bg-[#F2A900] hover:bg-[#D49400] text-[#2D1B08] font-black h-14 px-8 rounded-2xl shadow-xl shadow-[#F2A900]/20 transition-all hover:scale-105"
            >
              <Plus className="mr-3 h-5 w-5" /> NOUVELLE VISITE
            </Button>
          </div>
        </div>

        {/* 🗂️ Navigation & Stats */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-8">
          <TabsList className="bg-white/50 backdrop-blur-md p-1.5 rounded-2xl md:rounded-[2rem] border border-gray-100 shadow-sm w-full md:w-fit grid grid-cols-2 md:inline-flex h-auto gap-1">
            <TabsTrigger 
              value="list" 
              className="rounded-xl md:rounded-[1.5rem] data-[state=active]:bg-[#2D1B08] data-[state=active]:text-white data-[state=active]:shadow-lg py-3 px-6 text-xs md:text-sm font-bold uppercase tracking-widest transition-all"
            >
              <Map className="mr-2 h-4 w-4" /> Circuits Actifs
            </TabsTrigger>
            <TabsTrigger 
              value="stats" 
              className="rounded-xl md:rounded-[1.5rem] data-[state=active]:bg-[#2D1B08] data-[state=active]:text-white data-[state=active]:shadow-lg py-3 px-6 text-xs md:text-sm font-bold uppercase tracking-widest transition-all"
            >
              <BarChart3 className="mr-2 h-4 w-4" /> Performance
            </TabsTrigger>
          </TabsList>

          <TabsContent value="list" className="space-y-8 animate-in slide-in-from-bottom-4 duration-500">
            {/* 🔍 Search & Filters */}
            <Card className="rounded-[2rem] border-none bg-white shadow-sm overflow-hidden p-6">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="md:col-span-2 relative">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 h-5 w-5" />
                  <Input 
                    placeholder="Rechercher par nom ou lieu..." 
                    className="pl-12 h-14 rounded-2xl border-gray-100 bg-gray-50/50 focus:bg-white transition-all font-medium"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
                <Select value={selectedLocation} onValueChange={setSelectedLocation}>
                  <SelectTrigger className="h-14 rounded-2xl border-gray-100 font-bold uppercase text-[10px] tracking-widest">
                    <SelectValue placeholder="LIEU" />
                  </SelectTrigger>
                  <SelectContent className="rounded-2xl border-gray-100 shadow-2xl">
                    {locations.map(loc => <SelectItem key={loc} value={loc} className="font-bold uppercase text-[10px]">{loc}</SelectItem>)}
                  </SelectContent>
                </Select>
                <Select value={selectedStatus} onValueChange={setSelectedStatus}>
                  <SelectTrigger className="h-14 rounded-2xl border-gray-100 font-bold uppercase text-[10px] tracking-widest">
                    <SelectValue placeholder="STATUT" />
                  </SelectTrigger>
                  <SelectContent className="rounded-2xl border-gray-100 shadow-2xl">
                    {statuses.map(st => <SelectItem key={st} value={st} className="font-bold uppercase text-[10px]">{st}</SelectItem>)}
                  </SelectContent>
                </Select>
              </div>
            </Card>

            {/* 🗺️ Tours Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredTours.map((tour) => (
                <Card key={tour.id} className="group rounded-[2.5rem] border-none bg-white shadow-sm hover:shadow-2xl transition-all duration-500 overflow-hidden flex flex-col h-full text-[#2D1B08]">
                  {/* Image Header */}
                  <div className="relative h-64 overflow-hidden">
                    <img 
                      src={tour.image} 
                      alt={tour.name} 
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#2D1B08]/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    
                    {/* Status Floating Badges */}
                    <div className="absolute top-5 right-5 flex flex-col items-end gap-2">
                      <Badge className={cn(
                        "rounded-full px-4 py-1.5 text-[10px] font-black uppercase border-none shadow-lg backdrop-blur-md",
                        tour.status === 'Disponible' ? "bg-emerald-500 text-white" : 
                        tour.status === 'Suspendu' ? "bg-red-500 text-white" : "bg-white/90 text-[#2D1B08]"
                      )}>
                        {tour.status}
                      </Badge>
                      <div className="flex items-center bg-white/90 rounded-full px-3 py-1 text-[9px] font-black uppercase text-[#2D1B08]">
                        <Star size={10} className="text-[#F2A900] mr-1" fill="#F2A900" /> {tour.rating}
                      </div>
                    </div>

                    <div className="absolute top-5 left-5">
                      <div className="flex items-center gap-2 bg-black/40 backdrop-blur-md rounded-full px-3 py-1.5 text-[9px] font-black uppercase text-white">
                        <Clock size={12} className="text-[#F2A900]" /> {tour.duration}
                      </div>
                    </div>
                  </div>

                  <CardContent className="p-8 flex-grow flex flex-col space-y-4">
                    <div className="space-y-2">
                      <div className="flex justify-between items-start gap-2">
                        <h3 className="text-xl font-black uppercase tracking-tighter leading-tight group-hover:text-[#F2A900] transition-colors line-clamp-2">
                          {tour.name}
                        </h3>
                        <div className="flex items-center gap-2 flex-shrink-0">
                          <span className="text-[10px] font-bold text-gray-400">DISPO</span>
                          <Switch 
                            checked={tour.status === 'Disponible'} 
                            onCheckedChange={() => toggleTourAvailability(tour.id)}
                            className="data-[state=checked]:bg-emerald-500"
                          />
                        </div>
                      </div>
                      <p className="text-xs text-gray-400 font-bold uppercase flex items-center gap-1.5">
                        <MapPin size={12} className="text-[#F2A900]" /> {tour.location} • {tour.type}
                      </p>
                    </div>

                    <p className="text-sm text-gray-500 font-medium line-clamp-2 leading-relaxed italic">
                      "{tour.description}"
                    </p>

                    <div className="pt-4 flex items-center justify-between border-t border-gray-50 mt-auto">
                      <div className="flex flex-col">
                        <span className="text-[8px] font-black text-gray-400 uppercase tracking-widest">Tarif Expert</span>
                        <span className="text-lg font-black text-[#2D1B08]">{tour.price}</span>
                      </div>
                      <div className="flex items-center gap-4 text-[10px] font-black text-gray-400">
                        <div className="flex items-center gap-1"><Eye size={12} /> {tour.views}</div>
                        <div className="flex items-center gap-1"><Heart size={12} className="text-red-400" /> {tour.likes}</div>
                      </div>
                    </div>

                    {/* Quick Access Actions Overlay-like buttons */}
                    <div className="grid grid-cols-4 gap-2 pt-4">
                      <Button variant="outline" className="rounded-xl h-11 border-gray-100 hover:bg-[#F2A900] hover:text-white" onClick={() => handleEditTour(tour)}>
                        <Edit size={16} />
                      </Button>
                      <Button variant="outline" className="rounded-xl h-11 border-gray-100 hover:bg-[#2D1B08] hover:text-white" onClick={() => handleDuplicateTour(tour)}>
                        <Copy size={16} />
                      </Button>
                      <Button variant="outline" className="rounded-xl h-11 border-gray-100 hover:bg-black hover:text-white">
                        <Eye size={16} />
                      </Button>
                      <Button variant="outline" className="rounded-xl h-11 border-gray-100 hover:bg-red-500 hover:text-white" onClick={() => handleDeleteTour(tour.id)}>
                        <Trash2 size={16} />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="stats" className="space-y-8 animate-in slide-in-from-bottom-4 duration-500">
            {/* 📊 High-Level Metrics */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
              <StatCard icon={TrendingUp} value="4.2k" label="Vues Totales" trend={{ value: 12, isUp: true }} />
              <StatCard icon={CheckCircle} value="89" label="Réservations" trend={{ value: 5, isUp: true }} />
              <StatCard icon={Star} value="4.9" label="Satisfaction" trend={{ value: 0.2, isUp: true }} />
              <StatCard icon={DollarSign} value="1.8M" label="Revenus (FCFA)" trend={{ value: 18, isUp: true }} />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* 📈 Engagement Chart */}
              <div className="lg:col-span-2">
                <ChartCard title="Engagement Hebdomadaire" subtitle="Évolution des vues et des réservations sur la semaine">
                  <ResponsiveContainer width="100%" height={350}>
                    <AreaChart data={RECURRENCE_DATA}>
                      <defs>
                        <linearGradient id="colorViews" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#F2A900" stopOpacity={0.2}/>
                          <stop offset="95%" stopColor="#F2A900" stopOpacity={0}/>
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#EBE3D5" />
                      <XAxis dataKey="day" stroke="#5D4037" fontSize={12} axisLine={false} tickLine={false} />
                      <YAxis stroke="#5D4037" fontSize={12} axisLine={false} tickLine={false} />
                      <Tooltip 
                        contentStyle={{ backgroundColor: '#2D1B08', border: 'none', borderRadius: '15px', color: '#fff', fontSize: '12px', padding: '15px' }}
                      />
                      <Area type="monotone" dataKey="views" stroke="#F2A900" strokeWidth={4} fillOpacity={1} fill="url(#colorViews)" />
                      <Area type="monotone" dataKey="bookings" stroke="#2D1B08" strokeWidth={4} fill="none" />
                    </AreaChart>
                  </ResponsiveContainer>
                </ChartCard>
              </div>

              {/* 🥧 Strategy Breakdown */}
              <div className="lg:col-span-1">
                <ChartCard title="Performance par Type" subtitle="Distribution de votre succès par catégorie">
                  <div className="h-[250px] w-full">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={CATEGORY_DATA}
                          cx="50%"
                          cy="50%"
                          innerRadius={65}
                          outerRadius={90}
                          paddingAngle={8}
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
                  <div className="space-y-3 mt-6">
                    {CATEGORY_DATA.map((cat, i) => (
                      <div key={i} className="flex justify-between items-center text-xs font-black uppercase">
                        <div className="flex items-center gap-3">
                          <div className="w-3 h-3 rounded-full" style={{ backgroundColor: cat.color }} />
                          <span className="text-[#2D1B08]">{cat.name}</span>
                        </div>
                        <span className="text-gray-400">{cat.value}%</span>
                      </div>
                    ))}
                  </div>
                </ChartCard>
              </div>
            </div>
            
            <div className="p-10 rounded-[2.5rem] bg-[#2D1B08] text-white relative overflow-hidden group">
              <div className="absolute top-0 right-0 p-8 text-[#F2A900]/10 group-hover:scale-110 transition-transform duration-700">
                <Zap size={120} strokeWidth={3} />
              </div>
              <div className="relative z-10 max-w-2xl space-y-4">
                <h3 className="text-2xl md:text-3xl font-black uppercase tracking-tighter italic">Boostez votre visibilité <span className="text-[#F2A900]">!</span></h3>
                <p className="text-white/60 font-medium leading-relaxed">
                  Basé sur vos statistiques, le circuit <span className="text-white font-black italic">"Safari Bandia"</span> performe mieux le week-end. 
                  Envisagez d'ajouter des créneaux supplémentaires le samedi pour maximiser vos revenus.
                </p>
                <Button className="mt-4 rounded-xl bg-[#F2A900] hover:bg-white text-[#2D1B08] font-black uppercase text-xs h-11 px-8 border-none transition-all">
                  Optimiser mes Offres <ChevronRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>

      {/* 🛠️ Modals & Controls */}
      {selectedTour && (
        <GuideDetailsModal 
          guide={selectedTour} 
          isOpen={isDetailsModalOpen} 
          onClose={() => setIsDetailsModalOpen(false)} 
        />
      )}
      <GuideEditModal 
        guide={selectedTour} 
        isOpen={isEditModalOpen} 
        onClose={() => setIsEditModalOpen(false)} 
        onSave={(data) => {
          if(editMode === 'create') setTours([...tours, { ...data, id: Date.now().toString(), status: 'En attente', views: 0, likes: 0, bookings: 0, rating: 0, reviews: 0 }]);
          else setTours(tours.map(t => t.id === data.id ? data : t));
          setIsEditModalOpen(false);
          toast.success("Mise à jour effectuée");
        }} 
        mode={editMode} 
      />
    </div>
  );
};

export default GuideManagementPage;
