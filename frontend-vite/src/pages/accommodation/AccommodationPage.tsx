import React, { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';
import {
  Search,
  Filter,
  MapPin,
  Star,
  Grid3X3,
  List,
  ArrowUpDown,
  X,
  Bed,
  Utensils,
  Home,
  Building
} from 'lucide-react';
import AccommodationCard from '@/components/cards/AccommodationCard';
import { mockAccommodations } from '@/lib/mockData';

const AccommodationPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedLocation, setSelectedLocation] = useState('');
  const [selectedType, setSelectedType] = useState('');
  const [selectedPriceRange, setSelectedPriceRange] = useState('');
  const [selectedRating, setSelectedRating] = useState('');
  const [selectedAmenities, setSelectedAmenities] = useState('');
  const [sortBy, setSortBy] = useState('featured');
  const [showFilters, setShowFilters] = useState(false);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [activeTab, setActiveTab] = useState('all');

  const locations = ['Tous', 'Dakar', 'Saint-Louis', 'Thiès', 'Kaolack', 'Ziguinchor', 'Saloum', 'Casamance'];
  const types = ['Tous', 'Hôtel', 'Restaurant', 'Auberge', 'Appartement', 'Villa', 'Résidence'];
  const priceRanges = ['Tous', '0-5000', '5000-10000', '10000-20000', '20000-50000', '50000+'];
  const ratings = ['Tous', '4.5+', '4.0+', '3.5+', '3.0+'];
  const amenities = ['Tous', 'WiFi', 'Piscine', 'Parking', 'Restaurant', 'Spa', 'Gym', 'Climatisation'];

  const filteredAccommodations = mockAccommodations.filter(accommodation => {
    const matchesSearch = accommodation.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      accommodation.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      accommodation.type.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesLocation = !selectedLocation || selectedLocation === 'Tous' || accommodation.location === selectedLocation;
    const matchesType = !selectedType || selectedType === 'Tous' || accommodation.type === selectedType;
    const matchesRating = !selectedRating || selectedRating === 'Tous' ||
      (selectedRating === '4.5+' && accommodation.rating >= 4.5) ||
      (selectedRating === '4.0+' && accommodation.rating >= 4.0) ||
      (selectedRating === '3.5+' && accommodation.rating >= 3.5) ||
      (selectedRating === '3.0+' && accommodation.rating >= 3.0);

    const matchesAmenities = !selectedAmenities || selectedAmenities === 'Tous' ||
      accommodation.amenities.includes(selectedAmenities);

    // Filtrage par onglet
    const matchesTab = activeTab === 'all' ||
      (activeTab === 'hotels' && accommodation.type === 'Hôtel') ||
      (activeTab === 'restaurants' && accommodation.type === 'Restaurant') ||
      (activeTab === 'lodging' && ['Auberge', 'Appartement', 'Villa', 'Résidence'].includes(accommodation.type));

    return matchesSearch && matchesLocation && matchesType && matchesRating && matchesAmenities && matchesTab;
  });

  // Tri des établissements
  const sortedAccommodations = [...filteredAccommodations].sort((a, b) => {
    switch (sortBy) {
      case 'featured':
        return (b.featured ? 1 : 0) - (a.featured ? 1 : 0);
      case 'rating':
        return b.rating - a.rating;
      case 'price-low':
        return parseInt(a.price.replace(/\D/g, '')) - parseInt(b.price.replace(/\D/g, ''));
      case 'price-high':
        return parseInt(b.price.replace(/\D/g, '')) - parseInt(a.price.replace(/\D/g, ''));
      case 'name':
        return a.name.localeCompare(b.name);
      default:
        return 0;
    }
  });

  const clearFilters = () => {
    setSearchTerm('');
    setSelectedLocation('');
    setSelectedType('');
    setSelectedPriceRange('');
    setSelectedRating('');
    setSelectedAmenities('');
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'Hôtel':
        return <Building className="h-4 w-4" />;
      case 'Restaurant':
        return <Utensils className="h-4 w-4" />;
      case 'Auberge':
        return <Home className="h-4 w-4" />;
      default:
        return <Bed className="h-4 w-4" />;
    }
  };

  return (
    <div className="min-h-screen bg-[#FFFDFB]">
      <div className="container mx-auto px-4 py-8">
        <div className="space-y-6">
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h1 className="text-2xl sm:text-3xl font-black text-[#2D1B08] uppercase tracking-tighter">Hébergement & Restauration</h1>
              <p className="text-[#5D4037] mt-1 text-sm sm:text-base font-medium">Découvrez les meilleurs établissements du Sénégal</p>
            </div>
            <div className="flex items-center justify-between sm:justify-end space-x-2 sm:space-x-4">
              <Badge className="bg-[#F2A900]/10 text-[#F2A900] border-[#F2A900]/20 text-xs sm:text-sm font-bold">
                {sortedAccommodations.length} établissement(s)
              </Badge>
              <div className="flex items-center space-x-2">
                <Button
                  variant={viewMode === 'grid' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setViewMode('grid')}
                  className={viewMode === 'grid' ? 'bg-[#F2A900] hover:bg-[#D49400] text-white' : 'border-[#EBE3D5] text-[#5D4037]'}
                >
                  <Grid3X3 className="h-4 w-4" />
                </Button>
                <Button
                  variant={viewMode === 'list' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setViewMode('list')}
                  className={viewMode === 'list' ? 'bg-[#1B5E20] hover:bg-[#144718] text-white' : 'border-[#EBE3D5] text-[#5D4037]'}
                >
                  <List className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>

          {/* Onglets */}
          <Tabs value={activeTab} onValueChange={setActiveTab} className="bg-white rounded-xl p-1 border-2 border-[#EBE3D5] shadow-sm">
            <TabsList className="grid w-full grid-cols-2 sm:grid-cols-4 gap-1 bg-transparent h-auto">
              <TabsTrigger value="all" className="flex items-center justify-center space-x-1 sm:space-x-2 text-xs sm:text-sm font-black uppercase tracking-tighter py-3 data-[state=active]:bg-[#F2A900] data-[state=active]:text-white">
                <Building className="h-3 w-3 sm:h-4 sm:w-4" />
                <span>Tous</span>
              </TabsTrigger>
              <TabsTrigger value="hotels" className="flex items-center justify-center space-x-1 sm:space-x-2 text-xs sm:text-sm font-black uppercase tracking-tighter py-3 data-[state=active]:bg-[#F2A900] data-[state=active]:text-white">
                <Building className="h-3 w-3 sm:h-4 sm:w-4" />
                <span>Hôtels</span>
              </TabsTrigger>
              <TabsTrigger value="restaurants" className="flex items-center justify-center space-x-1 sm:space-x-2 text-xs sm:text-sm font-black uppercase tracking-tighter py-3 data-[state=active]:bg-[#F2A900] data-[state=active]:text-white">
                <Utensils className="h-3 w-3 sm:h-4 sm:w-4" />
                <span>Restaurants</span>
              </TabsTrigger>
              <TabsTrigger value="lodging" className="flex items-center justify-center space-x-1 sm:space-x-2 text-xs sm:text-sm font-black uppercase tracking-tighter py-3 data-[state=active]:bg-[#F2A900] data-[state=active]:text-white">
                <Home className="h-3 w-3 sm:h-4 sm:w-4" />
                <span>Hébergement</span>
              </TabsTrigger>
            </TabsList>

            <TabsContent value={activeTab} className="space-y-6 pt-6">
              {/* Barre de recherche principale */}
              <Card className="border-2 border-[#EBE3D5] shadow-sm">
                <CardContent className="p-6">
                  <div className="flex flex-col lg:flex-row gap-4">
                    <div className="relative flex-1">
                      <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-[#F2A900] h-5 w-5" />
                      <Input
                        placeholder="Rechercher un établissement, une ville..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="pl-12 h-14 text-lg border-[#EBE3D5] focus:ring-[#F2A900] focus:border-[#F2A900] rounded-xl bg-[#FFFDFB] font-medium"
                      />
                    </div>

                    <div className="flex flex-col sm:flex-row gap-2 sm:gap-3">
                      <Select value={selectedLocation} onValueChange={setSelectedLocation}>
                        <SelectTrigger className="w-full sm:w-48 h-14 border-[#EBE3D5] focus:ring-[#F2A900] rounded-xl bg-white font-bold text-[#2D1B08]">
                          <MapPin className="h-4 w-4 mr-2 text-[#F2A900]" />
                          <SelectValue placeholder="Localisation" />
                        </SelectTrigger>
                        <SelectContent className="border-[#EBE3D5]">
                          {locations.map(location => (
                            <SelectItem key={location} value={location} className="font-bold">{location}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>

                      <Select value={selectedType} onValueChange={setSelectedType}>
                        <SelectTrigger className="w-full sm:w-48 h-14 border-[#EBE3D5] focus:ring-[#F2A900] rounded-xl bg-white font-bold text-[#2D1B08]">
                          <Bed className="h-4 w-4 mr-2 text-[#F2A900]" />
                          <SelectValue placeholder="Type" />
                        </SelectTrigger>
                        <SelectContent className="border-[#EBE3D5]">
                          {types.map(type => (
                            <SelectItem key={type} value={type}>
                              <div className="flex items-center space-x-2 font-bold">
                                {getTypeIcon(type)}
                                <span>{type}</span>
                              </div>
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>

                      <Select value={sortBy} onValueChange={setSortBy}>
                        <SelectTrigger className="w-full sm:w-40 h-14 border-[#EBE3D5] focus:ring-[#F2A900] rounded-xl bg-white font-bold text-[#2D1B08]">
                          <ArrowUpDown className="h-4 w-4 mr-2 text-[#F2A900]" />
                          <SelectValue placeholder="Trier par" />
                        </SelectTrigger>
                        <SelectContent className="border-[#EBE3D5]">
                          <SelectItem value="featured" className="font-bold">Recommandés</SelectItem>
                          <SelectItem value="rating" className="font-bold">Note</SelectItem>
                          <SelectItem value="price-low" className="font-bold">Prix croissant</SelectItem>
                          <SelectItem value="price-high" className="font-bold">Prix décroissant</SelectItem>
                          <SelectItem value="name" className="font-bold">Nom</SelectItem>
                        </SelectContent>
                      </Select>

                      <Button
                        variant="outline"
                        onClick={() => setShowFilters(!showFilters)}
                        className="h-14 px-6 w-full sm:w-auto border-[#F2A900] text-[#F2A900] font-black uppercase tracking-tighter hover:bg-[#F2A900]/10 rounded-xl"
                      >
                        <Filter className="h-4 w-4 mr-2" />
                        Filtres
                      </Button>
                    </div>
                  </div>

                  {/* Filtres avancés */}
                  {showFilters && (
                    <div className="mt-6 pt-6 border-t-2 border-[#EBE3D5]">
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                        <div>
                          <label className="text-xs font-black uppercase tracking-widest text-[#5D4037] mb-2 block">Gamme de prix</label>
                          <Select value={selectedPriceRange} onValueChange={setSelectedPriceRange}>
                            <SelectTrigger className="border-[#EBE3D5] h-12 rounded-lg font-bold">
                              <SelectValue placeholder="Budget" />
                            </SelectTrigger>
                            <SelectContent className="border-[#EBE3D5]">
                              {priceRanges.map(range => (
                                <SelectItem key={range} value={range} className="font-bold">
                                  {range === 'Tous' ? 'Tous les prix' : `${range} FCFA`}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>

                        <div>
                          <label className="text-xs font-black uppercase tracking-widest text-[#5D4037] mb-2 block">Note minimum</label>
                          <Select value={selectedRating} onValueChange={setSelectedRating}>
                            <SelectTrigger className="border-[#EBE3D5] h-12 rounded-lg font-bold">
                              <SelectValue placeholder="Note" />
                            </SelectTrigger>
                            <SelectContent className="border-[#EBE3D5]">
                              {ratings.map(rating => (
                                <SelectItem key={rating} value={rating} className="font-bold">
                                  {rating === 'Tous' ? 'Toutes les notes' : `${rating} ⭐`}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>

                        <div>
                          <label className="text-xs font-black uppercase tracking-widest text-[#5D4037] mb-2 block">Équipements</label>
                          <Select value={selectedAmenities} onValueChange={setSelectedAmenities}>
                            <SelectTrigger className="border-[#EBE3D5] h-12 rounded-lg font-bold">
                              <SelectValue placeholder="Équipements" />
                            </SelectTrigger>
                            <SelectContent className="border-[#EBE3D5]">
                              {amenities.map(amenity => (
                                <SelectItem key={amenity} value={amenity} className="font-bold">
                                  {amenity === 'Tous' ? 'Tous les équipements' : amenity}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>

                        <div className="flex items-end">
                          <Button variant="outline" className="w-full h-12 border-[#EBE3D5] text-[#5D4037] font-black uppercase tracking-tighter hover:bg-[#EBE3D5]/20 rounded-lg" onClick={clearFilters}>
                            <X className="h-4 w-4 mr-2" />
                            Réinitialiser
                          </Button>
                        </div>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Liste des établissements */}
              {sortedAccommodations.length > 0 ? (
                <div className={`grid gap-8 ${viewMode === 'grid'
                    ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3'
                    : 'grid-cols-1'
                  }`}>
                  {sortedAccommodations.map((accommodation) => (
                    <AccommodationCard
                      key={accommodation.id}
                      accommodation={accommodation}
                      viewMode={viewMode}
                    />
                  ))}
                </div>
              ) : (
                <Card className="p-12 text-center border-2 border-[#EBE3D5] border-dashed bg-white shadow-none">
                  <div className="text-[#5D4037]">
                    <Building className="h-16 w-16 mx-auto mb-4 text-[#EBE3D5]" />
                    <h3 className="text-xl font-bold mb-2 text-[#2D1B08]">Aucun établissement trouvé</h3>
                    <p className="font-medium">Essayez de modifier vos critères de recherche ou vos filtres.</p>
                    <Button
                      variant="outline"
                      onClick={clearFilters}
                      className="mt-6 border-[#F2A900] text-[#F2A900] font-black uppercase tracking-tighter hover:bg-[#F2A900]/10"
                    >
                      Réinitialiser les filtres
                    </Button>
                  </div>
                </Card>
              )}
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default AccommodationPage;
