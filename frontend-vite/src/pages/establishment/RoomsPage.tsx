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
  Building,
  Bed
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

const ROOM_EQUIPMENT = [
  { 
    category: 'Confort de base', 
    items: ['Lit', 'Linge de lit', 'Serviettes', 'Armoire / penderie', 'Table / bureau', 'Chaise'] 
  },
  { 
    category: 'Climatisation & ventilation', 
    items: ['Climatisation', 'Ventilateur', 'Chauffage'] 
  },
  { 
    category: 'Équipements électroniques', 
    items: ['Télévision', 'Télévision écran plat', 'Chaînes satellite', 'Prises électriques accessibles'] 
  },
  { 
    category: 'Connectivité', 
    items: ['Wifi'] 
  },
  { 
    category: 'Équipements complémentaires', 
    items: ['Bouilloire électrique', 'Plateau de courtoisie', 'Minibar', 'Réfrigérateur', 'Micro-ondes', 'Coin repas', 'Table à manger'] 
  },
  { 
    category: 'Salle de bain', 
    items: ['Douche', 'Baignoire', 'Toilettes', 'Papier toilette', 'Serviettes (SDB)', 'Articles de toilette', 'Sèche-cheveux', 'Peignoir', 'Chaussons', 'Bidet', 'Baignoire spa'] 
  },
  { 
    category: 'Extérieur & Vue', 
    items: ['Balcon', 'Terrasse', 'Vue mer', 'Vue jardin', 'Vue ville'] 
  },
  { 
    category: 'Sécurité', 
    items: ['Coffre-fort'] 
  }
];

const ROOM_TYPES = ['Simple', 'Double', 'Twin', 'Triple', 'Familiale', 'Suite', 'Dortoir'];
const BED_TYPES = ['Simple', 'Double', 'Queen', 'King'];
const VIEW_TYPES = ['Mer', 'Ville', 'Jardin', 'Piscine', 'Montagne'];

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

  // Form State
  const [formImages, setFormImages] = useState<string[]>(['']);
  const [selectedAmenities, setSelectedAmenities] = useState<string[]>([]);
  const [customAmenities, setCustomAmenities] = useState<string[]>([]);
  const [newCustomAmenity, setNewCustomAmenity] = useState('');
  const [roomNumber, setRoomNumber] = useState('');
  const [roomType, setRoomType] = useState('Double');
  const [bedType, setBedType] = useState('Double');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('25,000');
  const [capacity, setCapacity] = useState(2);

  const [rooms, setRooms] = useState([
    {
      id: '1',
      number: '101',
      type: 'Double',
      bedType: 'King',
      price: '25,000',
      currency: 'FCFA',
      capacity: 2,
      status: 'Disponible',
      hasBathroom: true,
      bathroomType: 'Douche',
      amenities: ['Wifi', 'Télévision', 'Climatisation', 'Linge de lit', 'Serviettes', 'Armoire / penderie', 'Table / bureau'],
      customAmenities: ['Vue mer'],
      description: 'Chambre confortable avec vue imprenable sur la mer et finitions haut de gamme.',
      images: ['https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=800', 'https://images.unsplash.com/photo-1582719471384-894fbb16e074?w=800']
    },
    {
      id: '2',
      number: '102',
      type: 'Suite',
      bedType: 'King',
      price: '45,000',
      currency: 'FCFA',
      capacity: 4,
      status: 'Occupée',
      hasBathroom: true,
      bathroomType: 'Baignoire',
      amenities: ['Wifi', 'Télévision écran plat', 'Climatisation', 'Minibar', 'Coffre-fort', 'Peignoir', 'Sèche-cheveux'],
      customAmenities: ['Petit-déjeuner inclus'],
      description: 'Suite spacieuse avec balcon privé, vue panoramique et services de conciergerie.',
      images: ['https://images.unsplash.com/photo-1591088398332-8a7791972843?w=800']
    }
  ]);


  const filteredRooms = rooms.filter(room =>
    room.number.toLowerCase().includes(searchTerm.toLowerCase()) ||
    room.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
    room.status.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAddRoom = () => {
    setSelectedRoom(null);
    setIsEditing(false);
    setFormImages(['']);
    setSelectedAmenities([]);
    setCustomAmenities([]);
    setRoomNumber('');
    setRoomType('Double');
    setBedType('Double');
    setDescription('');
    setPrice('25,000');
    setCapacity(2);
    setIsDialogOpen(true);
  };

  const handleEditRoom = (room: any) => {
    setSelectedRoom(room);
    setIsEditing(true);
    setFormImages(room.images && room.images.length > 0 ? [...room.images] : ['']);
    setSelectedAmenities(room.amenities || []);
    setCustomAmenities(room.customAmenities || []);
    setRoomNumber(room.number);
    setRoomType(room.type);
    setBedType(room.bedType);
    setDescription(room.description);
    setPrice(room.price);
    setCapacity(room.capacity);
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

  const toggleAmenity = (amenity: string) => {
    setSelectedAmenities(prev => 
      prev.includes(amenity) ? prev.filter(a => a !== amenity) : [...prev, amenity]
    );
  };

  const handleAddCustomAmenity = () => {
    if (newCustomAmenity.trim()) {
      if (!customAmenities.includes(newCustomAmenity.trim())) {
        setCustomAmenities([...customAmenities, newCustomAmenity.trim()]);
      }
      setNewCustomAmenity('');
    }
  };

  const removeCustomAmenity = (amenity: string) => {
    setCustomAmenities(customAmenities.filter(a => a !== amenity));
  };

  const handleSaveRoom = () => {
    const roomData = {
      id: isEditing ? selectedRoom.id : (rooms.length + 1).toString(),
      number: roomNumber,
      type: roomType,
      bedType,
      price,
      currency: 'FCFA',
      capacity,
      status: isEditing ? selectedRoom.status : 'Disponible',
      hasBathroom: true,
      bathroomType: 'Douche',
      amenities: selectedAmenities,
      customAmenities: customAmenities,
      description: description,
      images: formImages.filter(img => img.trim() !== '')
    };

    if (isEditing) {
      setRooms(rooms.map(r => r.id === selectedRoom.id ? roomData : r));
    } else {
      setRooms([...rooms, roomData]);
    }

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
    const lower = amenity.toLowerCase();
    if (lower.includes('wifi')) return <Wifi className={iconClass} />;
    if (lower.includes('télévision') || lower.includes('tv')) return <Tv className={iconClass} />;
    if (lower.includes('climatisation')) return <Sparkles className={iconClass} />;
    if (lower.includes('mini')) return <Coffee className={iconClass} />;
    if (lower.includes('vue mer')) return <Waves className={iconClass} />;
    return <CheckCircle2 className={iconClass} />;
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
                  PATRIMOINE & HÉBERGEMENT
                </Badge>
              </div>
              <h1 className="text-4xl md:text-6xl font-black tracking-tighter uppercase leading-[0.85]">
                INVENTAIRE DES <br /> <span className="text-[#F2A900]">UNITÉS .</span>
              </h1>
              <p className="text-white/60 font-medium italic text-sm md:text-lg max-w-xl">
                Gérez vos unités, optimisez vos tarifs et assurez une qualité de séjour irréprochable pour tous types d'hébergements.
              </p>
            </div>
            
            <Button 
              onClick={handleAddRoom}
              className="bg-[#F2A900] hover:bg-[#D49400] text-[#2D1B08] font-black h-14 px-8 rounded-2xl shadow-xl shadow-[#F2A900]/20 transition-all hover:scale-105"
            >
              <Plus className="mr-3 h-5 w-5" /> NOUVELLE UNITÉ
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
                  {room.amenities.slice(0, 4).map((amenity, idx) => (
                    <div key={idx} className="flex items-center gap-1.5 bg-gray-50 border border-gray-100 px-3 py-1.5 rounded-xl">
                      {getAmenityIcon(amenity)}
                      <span className="text-[10px] font-bold uppercase text-[#2D1B08]/70 tracking-tight">{amenity}</span>
                    </div>
                  ))}
                  {(room.amenities.length > 4 || room.customAmenities?.length > 0) && (
                    <div className="flex items-center gap-1.5 bg-gray-50 border border-gray-100 px-3 py-1.5 rounded-xl">
                      <span className="text-[10px] font-black uppercase text-[#F2A900] tracking-tight">
                        +{(room.amenities.length - 4) + (room.customAmenities?.length || 0)}
                      </span>
                    </div>
                  )}
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
        <DialogContent className="max-w-2xl rounded-[2rem] border-none p-0 overflow-hidden max-h-[90vh] flex flex-col">
          <div className="bg-[#2D1B08] px-6 py-4 flex items-center justify-between shrink-0">
             <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-[#F2A900] text-[#2D1B08]">
                   <Bed size={18} strokeWidth={3} />
                </div>
                <div>
                   <h2 className="text-sm font-black text-white uppercase tracking-widest">
                      {isEditing ? `CHAMBRE ${roomNumber}` : 'NOUVEL UNITÉ'}
                   </h2>
                   <p className="text-[9px] font-bold text-white/40 uppercase tracking-widest">Configuration de l'hébergement</p>
                </div>
             </div>
             <Badge className="bg-[#F2A900]/10 text-[#F2A900] border border-[#F2A900]/20 font-black uppercase tracking-widest text-[8px] px-2 py-0.5">
                {isEditing ? 'ÉDITION' : 'CRÉATION'}
             </Badge>
          </div>
          
          <div className="p-5 bg-white space-y-5 overflow-y-auto flex-grow scrollbar-thin scrollbar-thumb-gray-200">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <Label className="text-[9px] font-black text-gray-400 uppercase tracking-widest ml-1">Numéro</Label>
                <Input value={roomNumber} onChange={(e) => setRoomNumber(e.target.value)} placeholder="Ex: 101" className="h-10 rounded-xl bg-gray-50 border-none font-bold text-xs" />
              </div>
              <div className="space-y-1.5">
                <Label className="text-[9px] font-black text-gray-400 uppercase tracking-widest ml-1">Type</Label>
                <Select value={roomType} onValueChange={setRoomType}>
                   <SelectTrigger className="h-10 rounded-xl bg-gray-50 border-none font-bold text-xs">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="rounded-xl border-none shadow-2xl">
                    {ROOM_TYPES.map(type => (
                      <SelectItem key={type} value={type} className="text-xs font-bold">{type}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <Label className="text-[9px] font-black text-gray-400 uppercase tracking-widest ml-1">Type de Lit</Label>
                <Select value={bedType} onValueChange={setBedType}>
                   <SelectTrigger className="h-10 rounded-xl bg-gray-50 border-none font-bold text-xs">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="rounded-xl border-none shadow-2xl">
                    {BED_TYPES.map(type => (
                      <SelectItem key={type} value={type} className="text-xs font-bold">{type}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-1.5">
                <Label className="text-[9px] font-black text-gray-400 uppercase tracking-widest ml-1">Prix par Nuit (FCFA)</Label>
                <Input value={price} onChange={(e) => setPrice(e.target.value)} placeholder="Ex: 25,000" className="h-10 rounded-xl bg-gray-50 border-none font-bold text-xs" />
              </div>
            </div>

            <div className="space-y-6">
               <div className="flex items-center gap-2 mb-1">
                 <Settings2 className="h-3.5 w-3.5 text-[#F2A900]" />
                 <Label className="text-[10px] font-black text-[#2D1B08] uppercase tracking-widest">Équipements & Commodités</Label>
               </div>
               
               <div className="space-y-5">
                 {ROOM_EQUIPMENT.map((category) => (
                   <div key={category.category} className="space-y-2">
                     <h4 className="text-[8px] font-black text-gray-400 uppercase tracking-[0.2em] border-b border-gray-100 pb-0.5">{category.category}</h4>
                     <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                       {category.items.map(item => (
                         <div 
                           key={item} 
                           onClick={() => toggleAmenity(item)}
                           className={cn(
                             "flex items-center space-x-2 p-2 rounded-lg border-2 transition-all cursor-pointer",
                             selectedAmenities.includes(item) 
                               ? "bg-[#F2A900]/5 border-[#F2A900] shadow-sm" 
                               : "bg-gray-50 border-transparent hover:bg-gray-100"
                           )}
                         >
                           <div className={cn(
                             "h-3 w-3 rounded flex items-center justify-center transition-colors",
                             selectedAmenities.includes(item) ? "bg-[#F2A900] text-[#2D1B08]" : "bg-gray-200"
                           )}>
                             {selectedAmenities.includes(item) && <CheckCircle2 size={10} strokeWidth={4} />}
                           </div>
                           <span className={cn(
                             "text-[8px] font-black uppercase tracking-tighter transition-colors truncate",
                             selectedAmenities.includes(item) ? "text-[#2D1B08]" : "text-gray-500"
                           )}>{item}</span>
                         </div>
                       ))}
                     </div>
                   </div>
                 ))}

                 {/* 🏷️ Autres Services (Custom) */}
                 <div className="space-y-3 pt-3 border-t border-dashed border-gray-200">
                    <h4 className="text-[9px] font-black text-[#2D1B08] uppercase tracking-widest flex items-center gap-2">
                      <Plus size={12} className="text-[#F2A900]" /> Autres Équipements & Services
                    </h4>
                    
                    <div className="flex flex-wrap gap-1.5">
                      {customAmenities.map((amenity) => (
                        <Badge key={amenity} className="bg-emerald-50 text-emerald-700 border border-emerald-100 rounded-full px-2 py-1 flex items-center gap-1.5">
                          <span className="text-[8px] font-black uppercase tracking-widest">{amenity}</span>
                          <button onClick={() => removeCustomAmenity(amenity)} className="hover:text-red-500 transition-colors">
                            <Trash2 size={10} />
                          </button>
                        </Badge>
                      ))}
                    </div>

                    <div className="flex gap-2">
                      <Input 
                        value={newCustomAmenity}
                        onChange={(e) => setNewCustomAmenity(e.target.value)}
                        onKeyPress={(e) => e.key === 'Enter' && handleAddCustomAmenity()}
                        placeholder="Ex: Vue sur piscine..." 
                        className="h-10 rounded-xl bg-gray-50 border-none font-bold text-[10px]"
                      />
                      <Button 
                        onClick={handleAddCustomAmenity}
                        className="bg-emerald-600 hover:bg-emerald-700 text-white font-black rounded-xl h-10 px-4 text-[9px] uppercase tracking-widest shrink-0"
                      >
                        AJOUTER
                      </Button>
                    </div>
                 </div>
               </div>
            </div>

            <div className="space-y-2">
               <Label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Description Détaillée</Label>
               <Textarea value={description} onChange={(e) => setDescription(e.target.value)} rows={3} className="rounded-2xl bg-gray-50 border-none font-medium italic" placeholder="Présentation de l'unité..." />
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

          <DialogFooter className="p-4 border-t border-gray-50 flex items-center justify-between bg-gray-50/50 shrink-0">
            <Button variant="ghost" className="rounded-xl h-10 font-bold px-6 uppercase text-[9px] tracking-widest" onClick={() => setIsDialogOpen(false)}>ANNULER</Button>
            <Button className="bg-[#2D1B08] hover:bg-black text-white font-black h-10 px-8 rounded-xl shadow-lg transition-all active:scale-95" onClick={handleSaveRoom}>
               ENREGISTRER
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default RoomsPage;
