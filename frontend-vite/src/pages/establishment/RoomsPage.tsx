import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import {
  Plus,
  Search,
  Edit,
  Trash2,
  Users,
  Wifi,
  Tv,
  Car,
  Coffee,
  Waves,
  ArrowLeft,
  LayoutGrid,
  List as ListIcon,
  ChevronRight,
  Sparkles,
  Camera,
  Settings2,
  MoreVertical,
  CheckCircle2,
  Clock,
  AlertTriangle,
  Building
} from 'lucide-react';
import { Link, Navigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { toast } from 'sonner';
import { cn } from '@/lib/utils';
import StatCard from '@/components/dashboard/StatCard';

const RoomsPage: React.FC = () => {
  const { user } = useAuth();

  // Rediriger les restaurants vers leur dashboard
  if (user?.role === 'restaurant') {
    return <Navigate to="/dashboard" replace />;
  }

  const [searchTerm, setSearchTerm] = useState('');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedRoom, setSelectedRoom] = useState<any>(null);
  const [isEditing, setIsEditing] = useState(false);

  const [rooms, setRooms] = useState([
    {
      id: '1',
      number: '101',
      type: 'Double Premium',
      price: '25,000 FCFA',
      capacity: 2,
      status: 'Disponible',
      amenities: ['WiFi', 'TV', 'Climatisation', 'Salle de bain privée', 'Vue Mer'],
      description: 'Chambre confortable avec vue imprenable sur la mer et finitions haut de gamme.',
      images: ['https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=800', 'https://images.unsplash.com/photo-1582719471384-894fbb16e074?w=800']
    },
    {
      id: '2',
      number: '102',
      type: 'Suite Royale',
      price: '45,000 FCFA',
      capacity: 4,
      status: 'Occupée',
      amenities: ['WiFi', 'TV', 'Climatisation', 'Salle de bain privée', 'Balcon', 'Mini-bar', 'Jacuzzi'],
      description: 'Suite spacieuse avec balcon privé, vue panoramique et services de conciergerie.',
      images: ['https://images.unsplash.com/photo-1591088398332-8a7791972843?w=800']
    },
    {
      id: '3',
      number: '103',
      type: 'Standard Simple',
      price: '18,000 FCFA',
      capacity: 1,
      status: 'Disponible',
      amenities: ['WiFi', 'TV', 'Ventilateur'],
      description: 'Chambre simple, calme et fonctionnelle, idéale pour les voyages d\'affaires.',
      images: ['https://images.unsplash.com/photo-1611892440504-42a792e24d32?w=800']
    },
    {
      id: '4',
      number: '201',
      type: 'Suite Familiale',
      price: '55,000 FCFA',
      capacity: 6,
      status: 'Réservée',
      amenities: ['WiFi', 'TV', 'Climatisation', 'Salle de bain privée', 'Salon', 'Cuisine équipée'],
      description: 'Espace familial complet avec salon séparé et kitchenette pour un séjour en toute autonomie.',
      images: ['https://images.unsplash.com/photo-1566665797739-1674de7a421a?w=800']
    }
  ]);

  const [formImages, setFormImages] = useState<string[]>(['']);

  const filteredRooms = rooms.filter(room =>
    room.number.toLowerCase().includes(searchTerm.toLowerCase()) ||
    room.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
    room.status.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAddRoom = () => {
    setSelectedRoom(null);
    setIsEditing(false);
    setFormImages(['']);
    setIsDialogOpen(true);
  };

  const handleEditRoom = (room: any) => {
    setSelectedRoom(room);
    setIsEditing(true);
    setFormImages(room.images && room.images.length > 0 ? [...room.images] : ['']);
    setIsDialogOpen(true);
  };

  const handleAddImageField = () => {
    setFormImages([...formImages, '']);
  };

  const handleRemoveImageField = (index: number) => {
    const newImages = [...formImages];
    newImages.splice(index, 1);
    setFormImages(newImages.length > 0 ? newImages : ['']);
  };

  const handleImageChange = (index: number, value: string) => {
    const newImages = [...formImages];
    newImages[index] = value;
    setFormImages(newImages);
  };

  const handleSaveRoom = () => {
    toast.success(isEditing ? 'Chambre mise à jour !' : 'Nouvelle chambre ajoutée !');
    setIsDialogOpen(false);
  };

  const handleDeleteRoom = (id: string) => {
    if (confirm('Êtes-vous sûr de vouloir supprimer cette chambre ?')) {
      setRooms(rooms.filter(room => room.id !== id));
      toast.error('Chambre supprimée.');
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'Disponible':
        return <Badge className="bg-emerald-500/10 text-emerald-600 border-none rounded-full px-4 py-1 text-[10px] font-black uppercase tracking-widest">Disponible</Badge>;
      case 'Occupée':
        return <Badge className="bg-red-500/10 text-red-600 border-none rounded-full px-4 py-1 text-[10px] font-black uppercase tracking-widest">Occupée</Badge>;
      case 'Réservée':
        return <Badge className="bg-amber-500/10 text-amber-600 border-none rounded-full px-4 py-1 text-[10px] font-black uppercase tracking-widest">Réservée</Badge>;
      case 'Maintenance':
        return <Badge className="bg-gray-500/10 text-gray-600 border-none rounded-full px-4 py-1 text-[10px] font-black uppercase tracking-widest">Maintenance</Badge>;
      default:
        return <Badge className="rounded-full px-4 py-1 text-[10px] font-black uppercase tracking-widest">{status}</Badge>;
    }
  };

  const getAmenityIcon = (amenity: string) => {
    const iconClass = "h-3.5 w-3.5 text-[#F2A900]";
    switch (amenity) {
      case 'WiFi': return <Wifi className={iconClass} />;
      case 'TV': return <Tv className={iconClass} />;
      case 'Parking': return <Car className={iconClass} />;
      case 'Petit-déjeuner': return <Coffee className={iconClass} />;
      case 'Piscine': return <Waves className={iconClass} />;
      case 'Vue Mer': return <Sparkles className={iconClass} />;
      default: return null;
    }
  };

  return (
    <div className="min-h-screen bg-[#FDFCFB] pb-20 animate-in fade-in duration-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
        
        {/* 🏛️ Premium Header */}
        <div className="relative rounded-[2.5rem] overflow-hidden bg-gradient-to-br from-[#2D1B08] via-[#5D4037] to-[#2D1B08] p-8 md:p-14 text-white shadow-2xl mb-12">
          <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-[#F2A900]/10 to-transparent pointer-events-none" />
          <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-[#F2A900]/5 rounded-full blur-[100px]" />
          
          <div className="relative z-10 flex flex-col md:flex-row md:items-end justify-between gap-8">
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <Link to="/dashboard">
                  <Button variant="ghost" size="sm" className="text-white/60 hover:text-white hover:bg-white/10 rounded-full h-8 px-3">
                    <ArrowLeft className="h-4 w-4 mr-2" /> Retour
                  </Button>
                </Link>
                <Badge className="bg-[#F2A900] text-[#2D1B08] font-black uppercase tracking-widest text-[10px] px-3 border-none">
                  PATRIMOINE HÔTELIER
                </Badge>
              </div>
              <h1 className="text-4xl md:text-6xl font-black tracking-tighter uppercase leading-[0.85]">
                INVENTAIRE DES <br /> <span className="text-[#F2A900]">UNITÉS .</span>
              </h1>
              <p className="text-white/60 font-medium italic text-sm md:text-lg max-w-xl">
                Gérez vos chambres, optimisez vos tarifs et assurez une qualité de service irréprochable.
              </p>
            </div>
            
            <Button 
              onClick={handleAddRoom}
              className="bg-[#F2A900] hover:bg-[#D49400] text-[#2D1B08] font-black h-14 px-8 rounded-2xl shadow-xl shadow-[#F2A900]/20 transition-all hover:scale-105"
            >
              <Plus className="mr-3 h-5 w-5" /> NOUVELLE CHAMBRE
            </Button>
          </div>
        </div>

        {/* 📊 High-Level Metrics */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          <StatCard icon={CheckCircle2} value={rooms.length.toString()} label="Total Unités" trend={{ value: 0, isUp: true }} />
          <StatCard icon={Sparkles} value={rooms.filter(r => r.status === 'Disponible').length.toString()} label="Disponibles" trend={{ value: 2, isUp: true }} />
          <StatCard icon={Clock} value={rooms.filter(r => r.status === 'Occupée').length.toString()} label="Occupées" trend={{ value: 1, isUp: false }} />
          <StatCard icon={AlertTriangle} value={rooms.filter(r => r.status === 'Maintenance').length.toString()} label="Maintenance" trend={{ value: 0, isUp: true }} />
        </div>

        {/* 🔍 Controls */}
        <div className="flex flex-col lg:flex-row gap-6 mb-8 items-stretch lg:items-center">
          <Card className="flex-1 rounded-[2rem] border-none bg-white shadow-sm overflow-hidden p-3">
            <div className="flex flex-col md:flex-row gap-3">
              <div className="flex-1 relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 h-5 w-5" />
                <Input 
                  placeholder="Rechercher par numéro, type, statut..." 
                  className="pl-12 h-14 rounded-2xl border-gray-100 bg-gray-50/50 focus:bg-white transition-all font-medium"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <Button variant="outline" className="h-14 rounded-2xl border-gray-100 font-bold uppercase text-[10px] tracking-widest px-6 text-gray-500">
                <Settings2 className="mr-2 h-4 w-4" /> Filtres
              </Button>
            </div>
          </Card>
          
          <div className="bg-white p-2 rounded-2xl shadow-sm flex gap-1 self-end lg:self-auto h-fit border border-gray-100">
            <Button 
              variant={viewMode === 'grid' ? 'default' : 'ghost'} 
              size="icon" 
              onClick={() => setViewMode('grid')}
              className={cn("rounded-xl h-12 w-12", viewMode === 'grid' ? "bg-[#2D1B08] text-white" : "text-gray-400")}
            >
              <LayoutGrid size={20} />
            </Button>
            <Button 
              variant={viewMode === 'list' ? 'default' : 'ghost'} 
              size="icon" 
              onClick={() => setViewMode('list')}
              className={cn("rounded-xl h-12 w-12", viewMode === 'list' ? "bg-[#2D1B08] text-white" : "text-gray-400")}
            >
              <ListIcon size={20} />
            </Button>
          </div>
        </div>

        {/* 📋 Rooms Grid/List */}
        <div className={cn(
          "grid gap-8",
          viewMode === 'grid' ? "grid-cols-1 md:grid-cols-2 lg:grid-cols-3" : "grid-cols-1"
        )}>
          {filteredRooms.map((room) => (
            <Card key={room.id} className="group rounded-[2.5rem] border-none bg-white shadow-sm hover:shadow-2xl transition-all duration-500 overflow-hidden flex flex-col h-full text-[#2D1B08]">
              {/* Image Section */}
              <div className="relative h-64 overflow-hidden">
                <img 
                  src={room.images[0]} 
                  alt={room.number} 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#2D1B08]/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                
                <div className="absolute top-5 right-5 flex flex-col items-end gap-2">
                  {getStatusBadge(room.status)}
                  <div className="flex items-center bg-white/90 backdrop-blur-md rounded-full px-3 py-1 text-[9px] font-black uppercase text-[#2D1B08]">
                    <Users size={12} className="text-[#F2A900] mr-1.5" /> {room.capacity} Pers.
                  </div>
                </div>

                <div className="absolute top-5 left-5">
                   <Badge className="bg-black/40 backdrop-blur-md text-white border-none text-[10px] font-black uppercase tracking-widest px-3 py-1">
                      CH {room.number}
                   </Badge>
                </div>
              </div>

              <CardContent className="p-8 flex-grow flex flex-col">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-xl font-black uppercase tracking-tighter leading-tight group-hover:text-[#F2A900] transition-colors">{room.type}</h3>
                    <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest flex items-center gap-1.5 mt-0.5">
                       Étage {room.number.startsWith('1') ? '1' : '2'} • Aile Ouest
                    </p>
                  </div>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                       <Button variant="ghost" size="icon" className="rounded-full h-10 w-10 text-gray-400 hover:text-[#2D1B08] hover:bg-gray-100">
                          <MoreVertical size={20} />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="rounded-2xl border-gray-100 shadow-2xl p-2 w-48">
                        <DropdownMenuItem className="rounded-xl font-bold uppercase text-[10px] tracking-widest py-3 cursor-pointer" onClick={() => handleEditRoom(room)}>
                          <Edit className="mr-3 h-4 w-4 text-[#F2A900]" /> Modifier
                        </DropdownMenuItem>
                        <DropdownMenuItem className="rounded-xl font-bold uppercase text-[10px] tracking-widest py-3 cursor-pointer">
                          <Camera className="mr-3 h-4 w-4 text-blue-500" /> Photos
                        </DropdownMenuItem>
                        <div className="h-px bg-gray-50 my-2" />
                        <DropdownMenuItem className="rounded-xl font-bold uppercase text-[10px] tracking-widest py-3 cursor-pointer text-red-600 focus:text-red-600 focus:bg-red-50" onClick={() => handleDeleteRoom(room.id)}>
                          <Trash2 className="mr-3 h-4 w-4" /> Supprimer
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                  </DropdownMenu>
                </div>

                <p className="text-sm text-gray-500 font-medium line-clamp-2 leading-relaxed italic mb-6">
                  "{room.description}"
                </p>

                <div className="flex flex-wrap gap-2 mb-8">
                  {room.amenities.map((amenity, idx) => (
                    <div key={idx} className="flex items-center gap-1.5 bg-gray-50 border border-gray-100 px-3 py-1.5 rounded-xl">
                      {getAmenityIcon(amenity)}
                      <span className="text-[10px] font-bold uppercase text-[#2D1B08]/70 tracking-tight">{amenity}</span>
                    </div>
                  ))}
                </div>

                <div className="pt-6 border-t border-gray-50 mt-auto flex items-center justify-between">
                  <div>
                    <span className="text-[8px] font-black text-gray-400 uppercase tracking-widest block mb-1">Prix de Nuit</span>
                    <span className="text-xl font-black text-[#2D1B08]">{room.price}</span>
                  </div>
                  <Button 
                    variant="ghost" 
                    onClick={() => handleEditRoom(room)}
                    className="text-[#F2A900] hover:text-[#2D1B08] hover:bg-[#F2A900]/10 font-black text-[10px] uppercase h-10 px-4 rounded-xl"
                  >
                    GÉRER <ChevronRight size={14} className="ml-1" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* 🧾 Add/Edit Room Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-2xl rounded-[2.5rem] border-none p-0 overflow-hidden">
          <div className="bg-[#2D1B08] p-8 text-white relative">
             <div className="absolute top-0 right-0 p-8 text-white/5 pointer-events-none">
                <Bed size={120} strokeWidth={4} />
             </div>
             <div className="relative z-10">
                <Badge className="bg-[#F2A900] text-[#2D1B08] font-black uppercase tracking-widest text-[9px] border-none mb-4">
                  {isEditing ? 'MODIFICATION UNITÉ' : 'CRÉATION UNITÉ'}
                </Badge>
                <h2 className="text-3xl font-black uppercase tracking-tighter">
                  {isEditing ? `Chambre ${selectedRoom?.number}` : 'Nouvel Hébergement'}
                </h2>
                <p className="text-white/50 text-xs font-bold uppercase tracking-widest mt-1">Configurez les paramètres de votre actif immobilier</p>
             </div>
          </div>
          
          <div className="p-8 bg-white space-y-6 max-h-[60vh] overflow-y-auto">
            <div className="grid grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Numéro</Label>
                <Input defaultValue={selectedRoom?.number} placeholder="Ex: 101" className="h-12 rounded-xl bg-gray-50 border-none font-bold" />
              </div>
              <div className="space-y-2">
                <Label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Type</Label>
                <Select defaultValue={selectedRoom?.type || 'Double'}>
                   <SelectTrigger className="h-12 rounded-xl bg-gray-50 border-none font-bold">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="rounded-xl border-none shadow-2xl">
                    <SelectItem value="Simple">Simple</SelectItem>
                    <SelectItem value="Double">Double Premium</SelectItem>
                    <SelectItem value="Suite Royale">Suite Royale</SelectItem>
                    <SelectItem value="Famille">Suite Familiale</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Prix (FCFA)</Label>
                <Input defaultValue={selectedRoom?.price} placeholder="25,000" className="h-12 rounded-xl bg-gray-50 border-none font-bold" />
              </div>
              <div className="space-y-2">
                <Label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Capacité Max</Label>
                <Input type="number" defaultValue={selectedRoom?.capacity} className="h-12 rounded-xl bg-gray-50 border-none font-bold" />
              </div>
            </div>

            <div className="space-y-2">
               <Label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Description Gastronomique / Hôtel</Label>
               <Textarea defaultValue={selectedRoom?.description} rows={3} className="rounded-2xl bg-gray-50 border-none font-medium italic" />
            </div>

            <div className="space-y-4">
               <div className="flex items-center justify-between">
                  <Label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Galerie Photos</Label>
                  <Button variant="ghost" className="text-[10px] font-black uppercase text-[#F2A900]" onClick={handleAddImageField}>+ Ajouter</Button>
               </div>
               <div className="grid grid-cols-1 gap-2">
                  {formImages.map((url, i) => (
                    <Input key={i} value={url} onChange={(e) => handleImageChange(i, e.target.value)} className="h-10 rounded-xl bg-gray-50 border-none text-[11px]" placeholder="URL de l'image" />
                  ))}
               </div>
            </div>
          </div>

          <DialogFooter className="p-8 border-t border-gray-50 flex items-center justify-between">
            <Button variant="ghost" className="rounded-xl h-12 font-bold px-6 uppercase text-[10px] tracking-widest" onClick={() => setIsDialogOpen(false)}>ANNULER</Button>
            <Button className="bg-[#2D1B08] hover:bg-black text-white font-black h-12 px-8 rounded-2xl shadow-xl" onClick={handleSaveRoom}>
               ENREGISTRER L'UNITÉ
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default RoomsPage;
