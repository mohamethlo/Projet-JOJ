import React, { useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { 
  Search, 
  Plus,
  Edit,
  Trash2,
  Eye,
  MapPin,
  Star,
  CheckCircle,
  Image as ImageIcon
} from 'lucide-react';
import { toast } from 'sonner';
import { RestaurantDetailsModal, RestaurantEditModal } from '@/components/modals';
import { useRestaurants } from '@/context/RestaurantContext';

const AdminRestaurantsPage: React.FC = () => {
  const { restaurants, addRestaurant, updateRestaurant, deleteRestaurant, updateStatus } = useRestaurants();
  const { user } = useAuth();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSpecialty, setSelectedSpecialty] = useState('Tous');
  const [selectedStatus, setSelectedStatus] = useState('Tous');
  const [activeTab, setActiveTab] = useState('all');
  
  // États pour les modales
  const [selectedRestaurant, setSelectedRestaurant] = useState<any>(null);
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editMode, setEditMode] = useState<'create' | 'edit'>('create');

  const stats = {
    total: restaurants.length,
    pending: restaurants.filter(r => r.status === 'En attente').length,
    validated: restaurants.filter(r => r.status === 'Validé').length,
    avgRating: restaurants.length > 0 
      ? (restaurants.reduce((acc, r) => acc + (r.rating || 0), 0) / restaurants.length).toFixed(1)
      : '0.0'
  };

  const specialties = ['Tous', 'Sénégalaise', 'Fruits de Mer', 'Italienne', 'Asiatique', 'Française', 'Libanaise'];
  const statuses = ['Tous', 'Validé', 'En attente', 'Suspendu'];

  const filteredRestaurants = restaurants.filter(r => {
    const matchesSearch = r.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         r.location.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesSpecialty = selectedSpecialty === 'Tous' || r.specialty === selectedSpecialty;
    const matchesStatus = selectedStatus === 'Tous' || r.status === selectedStatus;
    const matchesTab = activeTab === 'all' || (activeTab === 'pending' && r.status === 'En attente');
    
    return matchesSearch && matchesSpecialty && matchesStatus && matchesTab;
  });

  const handleView = (restaurant: any) => {
    setSelectedRestaurant(restaurant);
    setIsDetailsModalOpen(true);
  };

  const handleEdit = (restaurant: any) => {
    setSelectedRestaurant(restaurant);
    setEditMode('edit');
    setIsEditModalOpen(true);
  };

  const handleAdd = () => {
    setSelectedRestaurant(null);
    setEditMode('create');
    setIsEditModalOpen(true);
  };

  const handleSave = (data: any) => {
    if (editMode === 'create') {
      addRestaurant(data);
    } else if (selectedRestaurant) {
      updateRestaurant(selectedRestaurant.id, data);
    }
  };

  const handleDeleteRestaurant = (id: string, name: string) => {
    if (window.confirm(`Êtes-vous sûr de vouloir supprimer définitivement le restaurant "${name}" ?`)) {
      deleteRestaurant(id);
      toast.success('Restaurant supprimé avec succès');
    }
  };

  const handleStatusChange = (id: string, newStatus: any) => {
    updateStatus(id, newStatus);
    toast.success(`Statut mis à jour : ${newStatus}`);
  };

  if (!user || user.role !== 'admin') {
    return <div className="p-8 text-center font-bold">Accès non autorisé</div>;
  }

  return (
    <div className="min-h-screen bg-[#FFFDFB] p-4 sm:p-8 space-y-8">
      {/* Header & Stats */}
      <div className="flex flex-col xl:flex-row justify-between items-start xl:items-center gap-6">
        <div className="w-full xl:w-auto flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-2xl sm:text-4xl font-black text-[#2D1B08] uppercase tracking-tighter leading-none mb-1 sm:mb-2 text-nowrap">
              Gestion Restos
            </h1>
            <p className="text-[#5D4037]/70 font-medium text-[10px] sm:text-sm">Contrôlez et validez les établissements.</p>
          </div>
          <Button 
            onClick={handleAdd}
            className="xl:hidden w-full sm:w-auto bg-[#2D1B08] hover:bg-[#F2A900] text-white font-black uppercase tracking-widest px-6 rounded-xl h-12 shadow-lg transition-all text-xs"
          >
            <Plus className="w-4 h-4 mr-2" />
            Ajouter un restaurant
          </Button>
        </div>
        
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-3 xl:flex gap-3 sm:gap-4 w-full xl:w-auto">
          <Card className="bg-white border-2 border-[#EBE3D5] shadow-sm rounded-2xl p-3 sm:p-4">
            <div className="text-[8px] sm:text-[10px] font-black text-[#F2A900] uppercase tracking-widest mb-1">Total</div>
            <div className="text-xl sm:text-2xl font-black text-[#2D1B08]">{stats.total}</div>
          </Card>
          <Card className="bg-white border-2 border-[#EBE3D5] shadow-sm rounded-2xl p-3 sm:p-4">
            <div className="text-[8px] sm:text-[10px] font-black text-blue-500 uppercase tracking-widest mb-1 font-nowrap">En attente</div>
            <div className="text-xl sm:text-2xl font-black text-[#2D1B08]">{stats.pending}</div>
          </Card>
          <Card className="hidden sm:block lg:flex-none bg-white border-2 border-[#EBE3D5] shadow-sm rounded-2xl p-4">
            <div className="text-[10px] font-black text-green-500 uppercase tracking-widest mb-1">Note Moy.</div>
            <div className="text-2xl font-black text-[#2D1B08]">{stats.avgRating}<span className="text-xs text-gray-400">/5</span></div>
          </Card>
          <Button 
            onClick={handleAdd}
            className="hidden xl:flex bg-[#2D1B08] hover:bg-[#F2A900] text-white font-black uppercase tracking-widest px-8 rounded-xl h-14 shadow-lg transition-all"
          >
            <Plus className="w-5 h-5 mr-2" />
            Ajouter
          </Button>
        </div>
      </div>

      {/* Filters & Tabs */}
      <div className="space-y-6">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="bg-white border-2 border-[#EBE3D5] rounded-xl p-1 h-auto mb-6 w-full flex">
            <TabsTrigger value="all" className="flex-1 rounded-lg font-black uppercase tracking-widest text-[9px] sm:text-[10px] py-2 sm:py-3 px-2 sm:px-6 data-[state=active]:bg-[#F2A900] data-[state=active]:text-white">
              Tous
            </TabsTrigger>
            <TabsTrigger value="pending" className="flex-1 relative rounded-lg font-black uppercase tracking-widest text-[9px] sm:text-[10px] py-2 sm:py-3 px-2 sm:px-6 data-[state=active]:bg-[#F2A900] data-[state=active]:text-white">
              À valider
              {stats.pending > 0 && (
                <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-[8px] text-white animate-pulse">
                  {stats.pending}
                </span>
              )}
            </TabsTrigger>
          </TabsList>

          <Card className="border-2 border-[#EBE3D5] bg-white rounded-2xl overflow-hidden shadow-sm mb-8">
            <CardContent className="p-6">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="relative flex-1">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#5D4037]/30" />
                  <Input 
                    placeholder="Chercher par nom ou ville..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-12 h-12 border-2 border-[#EBE3D5] focus:ring-[#F2A900] rounded-xl font-bold"
                  />
                </div>
                <div className="flex flex-wrap gap-4">
                  <Select value={selectedSpecialty} onValueChange={setSelectedSpecialty}>
                    <SelectTrigger className="w-full md:w-48 h-12 border-2 border-[#EBE3D5] rounded-xl font-bold">
                      <SelectValue placeholder="Spécialité" />
                    </SelectTrigger>
                    <SelectContent>
                      {specialties.map(s => <SelectItem key={s} value={s}>{s}</SelectItem>)}
                    </SelectContent>
                  </Select>
                  <Select value={selectedStatus} onValueChange={setSelectedStatus}>
                    <SelectTrigger className="w-full md:w-40 h-12 border-2 border-[#EBE3D5] rounded-xl font-bold">
                      <SelectValue placeholder="Statut" />
                    </SelectTrigger>
                    <SelectContent>
                      {statuses.map(s => <SelectItem key={s} value={s}>{s}</SelectItem>)}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>
        </Tabs>

        {/* List / Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredRestaurants.map((restaurant) => (
            <Card key={restaurant.id} className="border-2 border-[#EBE3D5] bg-white rounded-[2rem] overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 group">
              <div className="relative h-48 overflow-hidden bg-[#F8F5F0] flex items-center justify-center">
                {restaurant.image ? (
                  <img 
                    src={restaurant.image} 
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" 
                    alt={restaurant.name}
                  />
                ) : (
                  <div className="flex flex-col items-center justify-center text-[#5D4037]/20">
                    <ImageIcon className="w-12 h-12 mb-2" />
                    <span className="text-[10px] font-black uppercase tracking-widest">Aucune photo</span>
                  </div>
                )}
                <div className="absolute top-4 left-4 flex gap-2">
                  <Badge className={`font-black uppercase text-[8px] tracking-widest px-2 py-1 border-none shadow-sm ${
                    restaurant.status === 'Validé' ? 'bg-green-500 text-white' : 
                    restaurant.status === 'En attente' ? 'bg-blue-500 text-white' : 'bg-red-500 text-white'
                  }`}>
                    {restaurant.status}
                  </Badge>
                  <Badge className="bg-white/90 backdrop-blur-sm text-[#2D1B08] font-black uppercase text-[8px] tracking-widest px-2 py-1 border-none">
                    {restaurant.specialty}
                  </Badge>
                </div>

                {/* Indicateur de Galerie */}
                {restaurant.images && restaurant.images.length > 1 && (
                  <div className="absolute bottom-4 right-4 bg-black/60 backdrop-blur-md text-white px-2 py-1 rounded-lg flex items-center gap-1.5 text-[9px] font-black uppercase tracking-widest shadow-lg">
                    <ImageIcon className="w-3 h-3 text-[#F2A900]" />
                    {restaurant.images.length} Photos
                  </div>
                )}

                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-3">
                  <Button 
                    onClick={() => handleView(restaurant)}
                    size="icon" className="bg-white hover:bg-[#F2A900] text-[#2D1B08] hover:text-white rounded-full w-10 h-10"
                  >
                    <Eye className="w-4 h-4" />
                  </Button>
                  <Button 
                    onClick={() => handleEdit(restaurant)}
                    size="icon" className="bg-white hover:bg-[#2D1B08] text-[#2D1B08] hover:text-white rounded-full w-10 h-10"
                  >
                    <Edit className="w-4 h-4" />
                  </Button>
                </div>
              </div>

              <CardContent className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-xl font-black text-[#2D1B08] uppercase tracking-tighter group-hover:text-[#F2A900] transition-colors line-clamp-1">
                      {restaurant.name}
                    </h3>
                    <p className="text-xs font-bold text-[#5D4037]/60 flex items-center mt-1">
                      <MapPin className="w-3 h-3 mr-1 text-[#F2A900]" />
                      {restaurant.location}
                    </p>
                  </div>
                  <div className="bg-[#F2A900]/10 px-2 py-1 rounded-lg flex items-center font-black text-[#F2A900] text-sm">
                    <Star className="w-3 h-3 mr-1 fill-current" />
                    {restaurant.rating}
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 py-4 border-y border-[#EBE3D5]/50 mb-6">
                  <div className="flex flex-col gap-1">
                    <span className="text-[9px] font-black text-[#5D4037]/40 uppercase tracking-widest">Menu Digital</span>
                    <Badge variant="outline" className={`w-fit border-none py-0 px-2 text-[9px] font-bold ${restaurant.hasMenu ? 'text-green-600 bg-green-50' : 'text-red-500 bg-red-50'}`}>
                      {restaurant.hasMenu ? 'Vérifié' : 'Manquant'}
                    </Badge>
                  </div>
                  <div className="flex flex-col gap-1">
                    <span className="text-[9px] font-black text-[#5D4037]/40 uppercase tracking-widest">Offres Spéciales</span>
                    <Badge variant="outline" className={`w-fit border-none py-0 px-2 text-[9px] font-bold ${restaurant.hasOffers ? 'text-green-600 bg-green-50' : 'text-gray-400 bg-gray-50'}`}>
                      {restaurant.hasOffers ? 'Actives' : 'Aucune'}
                    </Badge>
                  </div>
                </div>

                <div className="flex gap-2">
                  {restaurant.status === 'En attente' ? (
                    <Button 
                      onClick={() => handleStatusChange(restaurant.id, 'Validé')}
                      className="flex-1 bg-green-600 hover:bg-green-700 text-white font-black uppercase text-[10px] tracking-widest rounded-xl h-10"
                    >
                      <CheckCircle className="w-3 h-3 mr-2" />
                      Approuver
                    </Button>
                  ) : (
                    <Button 
                      variant="outline"
                      className="flex-1 border-2 border-[#EBE3D5] text-[#2D1B08] font-black uppercase text-[10px] tracking-widest rounded-xl h-10"
                      onClick={() => handleView(restaurant)}
                    >
                      Détails
                    </Button>
                  )}
                  <Button 
                    variant="outline"
                    onClick={() => handleDeleteRestaurant(restaurant.id, restaurant.name)}
                    className="border-2 border-red-100 text-red-500 hover:bg-red-50 font-black uppercase text-[10px] tracking-widest rounded-xl h-10 px-3"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Modals */}
      {selectedRestaurant && (
        <RestaurantDetailsModal 
          isOpen={isDetailsModalOpen}
          onClose={() => setIsDetailsModalOpen(false)}
          restaurant={selectedRestaurant}
          onStatusChange={handleStatusChange}
        />
      )}

      <RestaurantEditModal 
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        restaurant={selectedRestaurant}
        mode={editMode}
        onSave={handleSave}
      />
    </div>
  );
};

export default AdminRestaurantsPage;
