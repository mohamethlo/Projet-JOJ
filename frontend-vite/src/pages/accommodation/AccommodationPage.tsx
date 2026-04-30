import React, { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { cn } from '@/lib/utils';

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
  Grid3X3,
  List,
  ArrowUpDown,
  X,
  Bed,
  Home,
  Building,
  Hotel,
  Waves
} from 'lucide-react';
import AccommodationCard from '@/components/cards/AccommodationCard';
import { mockAccommodations } from '@/lib/mockData';

// Types d'hébergement uniquement (sans restaurants)
const ACCOMMODATION_TYPES = ['Hôtel', 'Auberge', 'Appartement', 'Villa', 'Résidence'];

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

  const locations = ['Tous', 'Dakar', 'Saint-Louis', 'Thiès', 'Kaolack', 'Ziguinchor', 'Saloum', 'Casamance'];
  const types = ['Tous', ...ACCOMMODATION_TYPES];
  const priceRanges = ['Tous', '0-5000', '5000-10000', '10000-20000', '20000-50000', '50000+'];
  const ratings = ['Tous', '4.5+', '4.0+', '3.5+', '3.0+'];
  const amenities = ['Tous', 'WiFi', 'Piscine', 'Parking', 'Spa', 'Gym', 'Climatisation'];

  // Hébergements seulement (pas de restaurants)
  const accommodationsOnly = mockAccommodations.filter(
    (a) => ACCOMMODATION_TYPES.includes(a.type)
  );

  const filteredAccommodations = accommodationsOnly.filter(accommodation => {
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

    return matchesSearch && matchesLocation && matchesType && matchesRating && matchesAmenities;
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
      case 'Hôtel': return <Building className="h-4 w-4" />;
      case 'Auberge': return <Home className="h-4 w-4" />;
      case 'Villa': return <Waves className="h-4 w-4" />;
      default: return <Bed className="h-4 w-4" />;
    }
  };

  const hasActiveFilters = searchTerm || selectedLocation || selectedType || selectedPriceRange || selectedRating || selectedAmenities;

  return (
    <div className="min-h-screen bg-[#FFFDFB]">
      {/* Hero Banner */}
      <div className="relative overflow-hidden bg-gradient-to-br from-[#2D1B08] via-[#5D4037] to-[#2D1B08] text-white">
        <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-[#F2A900]/10 to-transparent pointer-events-none" />
        <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-[#F2A900]/5 rounded-full blur-[100px]" />
        
        <div className="absolute top-4 right-1/4 text-7xl rotate-12 select-none opacity-10">🏨</div>
        <div className="absolute bottom-2 left-1/3 text-5xl -rotate-6 select-none opacity-10">🏖️</div>
        
        <div className="relative container mx-auto px-4 py-12 sm:py-20">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-8">
            <div className="space-y-4 z-10 relative">
               <Badge className="bg-[#F2A900] text-[#2D1B08] font-black uppercase tracking-widest text-[10px] px-3 border-none">
                SÉJOURS PREMIUM
               </Badge>
              <h1 className="text-4xl sm:text-5xl md:text-7xl font-black uppercase tracking-tighter leading-[0.9]">
                Hébergements <span className="text-[#F2A900]">.</span>
              </h1>
              <p className="text-white/60 font-medium italic text-sm sm:text-lg max-w-xl">
                Découvrez notre sélection d'hôtels de luxe, auberges authentiques, villas privées et résidences au Sénégal.
              </p>
            </div>
            
            <div className="flex flex-wrap gap-2 z-10 relative max-w-md">
              {['Hôtel', 'Auberge', 'Villa', 'Appartement', 'Résidence'].map((type) => (
                <button
                  key={type}
                  onClick={() => setSelectedType(type)}
                  className={`text-[10px] font-black uppercase tracking-widest px-4 py-3 rounded-2xl border transition-all duration-300 ${selectedType === type
                    ? 'bg-[#F2A900] text-[#2D1B08] border-[#F2A900] shadow-xl shadow-[#F2A900]/20 scale-105'
                    : 'bg-white/5 backdrop-blur-md text-white border-white/10 hover:bg-white/10 hover:border-white/20'
                    }`}
                >
                  {type}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="space-y-6">
          {/* Controls */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div className="flex items-center gap-3">
              <Badge className="bg-[#EBE3D5] text-[#2D1B08] font-black uppercase tracking-widest text-[10px] px-4 py-2 border-none">
                <Hotel className="h-3.5 w-3.5 mr-1.5 text-[#F2A900]" />
                {sortedAccommodations.length} établissement(s)
              </Badge>
              {hasActiveFilters && (
                <button onClick={clearFilters} className="text-[#F2A900] hover:text-[#D49400] font-black uppercase tracking-widest text-[9px] flex items-center gap-1 transition-colors">
                  <X className="h-3.5 w-3.5" />Effacer filtres
                </button>
              )}
            </div>
            <div className="flex items-center space-x-2 bg-white p-1.5 rounded-2xl border border-[#EBE3D5] shadow-sm">
              <Button
                variant={viewMode === 'grid' ? 'default' : 'ghost'}
                size="sm"
                onClick={() => setViewMode('grid')}
                className={cn("rounded-xl h-10 w-10 p-0", viewMode === 'grid' ? 'bg-[#2D1B08] text-[#F2A900]' : 'text-[#5D4037]/50 hover:text-[#2D1B08]')}
              >
                <Grid3X3 className="h-4 w-4" />
              </Button>
              <Button
                variant={viewMode === 'list' ? 'default' : 'ghost'}
                size="sm"
                onClick={() => setViewMode('list')}
                className={cn("rounded-xl h-10 w-10 p-0", viewMode === 'list' ? 'bg-[#2D1B08] text-[#F2A900]' : 'text-[#5D4037]/50 hover:text-[#2D1B08]')}
              >
                <List className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Filtres + liste */}
          <div className="space-y-6">
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
                ? 'grid-cols-1 md:grid-cols-2 xl:grid-cols-3'
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
              <Card className="p-16 text-center border-2 border-[#EBE3D5] border-dashed bg-[#FFFDFB] shadow-none rounded-[2.5rem]">
                <div className="flex flex-col items-center text-[#5D4037]">
                  <div className="w-24 h-24 bg-[#F2A900]/10 rounded-full flex items-center justify-center mb-6">
                     <Building className="h-10 w-10 text-[#F2A900]" />
                  </div>
                  <h3 className="text-2xl font-black uppercase tracking-tighter mb-3 text-[#2D1B08]">Aucun hébergement trouvé</h3>
                  <p className="font-medium italic opacity-70 max-w-md text-center">Modifiez vos critères de recherche ou retirez certains filtres pour voir plus de résultats.</p>
                  <Button
                    onClick={clearFilters}
                    className="mt-8 bg-[#2D1B08] hover:bg-black text-[#F2A900] font-black uppercase tracking-widest text-[10px] h-12 px-8 rounded-2xl shadow-xl transition-all hover:-translate-y-1"
                  >
                    Réinitialiser la recherche
                  </Button>
                </div>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AccommodationPage;
