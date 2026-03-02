import React, { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';

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
      <div className="relative overflow-hidden bg-gradient-to-br from-[#1565C0] via-[#1976D2] to-[#0D47A1] text-white">
        <div className="absolute inset-0 opacity-10 pointer-events-none overflow-hidden">
          <div className="absolute top-4 right-1/4 text-7xl rotate-12 select-none">🏨</div>
          <div className="absolute bottom-2 left-1/3 text-5xl -rotate-6 select-none">🏖️</div>
          <div className="absolute top-2 left-10 text-4xl rotate-3 select-none">🛎️</div>
          <div className="absolute bottom-4 right-10 text-4xl -rotate-12 select-none">🏊</div>
        </div>
        <div className="relative container mx-auto px-4 py-8 sm:py-12">
          <div className="flex items-center gap-3 mb-3">
            <div className="bg-white/20 backdrop-blur-sm p-2.5 rounded-2xl flex-shrink-0">
              <Hotel className="h-7 w-7 text-white" />
            </div>
            <div className="min-w-0">
              <h1 className="text-2xl sm:text-3xl md:text-4xl font-black uppercase tracking-tight truncate">
                Hébergement
              </h1>
              <p className="text-white/80 text-xs sm:text-sm font-medium mt-0.5 line-clamp-1">
                Hôtels, auberges, villas et plus encore au Sénégal
              </p>
            </div>
          </div>
          <div className="flex flex-wrap gap-3 mt-6">
            {['Hôtel', 'Auberge', 'Villa', 'Appartement', 'Résidence'].map((type) => (
              <button
                key={type}
                onClick={() => setSelectedType(type)}
                className={`text-xs font-bold px-3 py-1.5 rounded-full border transition-all ${selectedType === type
                  ? 'bg-white text-blue-700 border-white'
                  : 'bg-white/20 backdrop-blur-sm text-white border-white/30 hover:bg-white/30'
                  }`}
              >
                {type}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="space-y-6">
          {/* Controls */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div className="flex items-center gap-3">
              <Badge className="bg-blue-100 text-blue-700 border-blue-200 font-bold text-sm px-4 py-1.5">
                <Hotel className="h-3.5 w-3.5 mr-1.5" />
                {sortedAccommodations.length} hébergement(s)
              </Badge>
              {hasActiveFilters && (
                <button onClick={clearFilters} className="text-blue-500 hover:text-blue-700 font-bold text-xs flex items-center gap-1">
                  <X className="h-3.5 w-3.5" />Effacer les filtres
                </button>
              )}
            </div>
            <div className="flex items-center space-x-2">
              <Button
                variant={viewMode === 'grid' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setViewMode('grid')}
                className={viewMode === 'grid' ? 'bg-blue-600 hover:bg-blue-700 text-white' : 'border-[#EBE3D5] text-[#5D4037]'}
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
                  <h3 className="text-xl font-bold mb-2 text-[#2D1B08]">Aucun hébergement trouvé</h3>
                  <p className="font-medium">Essayez de modifier vos critères de recherche ou vos filtres.</p>
                  <Button
                    variant="outline"
                    onClick={clearFilters}
                    className="mt-6 border-blue-400 text-blue-600 font-black uppercase tracking-tighter hover:bg-blue-50"
                  >
                    Réinitialiser les filtres
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
