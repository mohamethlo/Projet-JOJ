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
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <div className="space-y-6">
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Hébergement & Restauration</h1>
              <p className="text-gray-600 mt-1 text-sm sm:text-base">Découvrez les meilleurs établissements du Sénégal</p>
            </div>
            <div className="flex items-center justify-between sm:justify-end space-x-2 sm:space-x-4">
              <Badge className="bg-blue-100 text-blue-700 text-xs sm:text-sm">
                {sortedAccommodations.length} établissement(s)
              </Badge>
              <div className="flex items-center space-x-2">
                <Button
                  variant={viewMode === 'grid' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setViewMode('grid')}
                >
                  <Grid3X3 className="h-4 w-4" />
                </Button>
                <Button
                  variant={viewMode === 'list' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setViewMode('list')}
                >
                  <List className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>

          {/* Onglets */}
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid w-full grid-cols-2 sm:grid-cols-4 gap-1">
              <TabsTrigger value="all" className="flex items-center space-x-1 sm:space-x-2 text-xs sm:text-sm">
                <Building className="h-3 w-3 sm:h-4 sm:w-4" />
                <span>Tous</span>
              </TabsTrigger>
              <TabsTrigger value="hotels" className="flex items-center space-x-1 sm:space-x-2 text-xs sm:text-sm">
                <Building className="h-3 w-3 sm:h-4 sm:w-4" />
                <span>Hôtels</span>
              </TabsTrigger>
              <TabsTrigger value="restaurants" className="flex items-center space-x-1 sm:space-x-2 text-xs sm:text-sm">
                <Utensils className="h-3 w-3 sm:h-4 sm:w-4" />
                <span>Restaurants</span>
              </TabsTrigger>
              <TabsTrigger value="lodging" className="flex items-center space-x-1 sm:space-x-2 text-xs sm:text-sm">
                <Home className="h-3 w-3 sm:h-4 sm:w-4" />
                <span>Hébergement</span>
              </TabsTrigger>
            </TabsList>

            <TabsContent value={activeTab} className="space-y-6">
              {/* Barre de recherche principale */}
              <Card className="shadow-sm">
                <CardContent className="p-6">
                  <div className="flex flex-col lg:flex-row gap-4">
                    <div className="relative flex-1">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                      <Input
                        placeholder="Rechercher un établissement, une ville..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="pl-12 h-12 text-lg"
                      />
                    </div>

                    <div className="flex flex-col sm:flex-row gap-2 sm:gap-3">
                      <Select value={selectedLocation} onValueChange={setSelectedLocation}>
                        <SelectTrigger className="w-full sm:w-48">
                          <MapPin className="h-4 w-4 mr-2" />
                          <SelectValue placeholder="Localisation" />
                        </SelectTrigger>
                        <SelectContent>
                          {locations.map(location => (
                            <SelectItem key={location} value={location}>{location}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>

                      <Select value={selectedType} onValueChange={setSelectedType}>
                        <SelectTrigger className="w-full sm:w-48">
                          <Bed className="h-4 w-4 mr-2" />
                          <SelectValue placeholder="Type" />
                        </SelectTrigger>
                        <SelectContent>
                          {types.map(type => (
                            <SelectItem key={type} value={type}>
                              <div className="flex items-center space-x-2">
                                {getTypeIcon(type)}
                                <span>{type}</span>
                              </div>
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>

                      <Select value={sortBy} onValueChange={setSortBy}>
                        <SelectTrigger className="w-full sm:w-40">
                          <ArrowUpDown className="h-4 w-4 mr-2" />
                          <SelectValue placeholder="Trier par" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="featured">Recommandés</SelectItem>
                          <SelectItem value="rating">Note</SelectItem>
                          <SelectItem value="price-low">Prix croissant</SelectItem>
                          <SelectItem value="price-high">Prix décroissant</SelectItem>
                          <SelectItem value="name">Nom</SelectItem>
                        </SelectContent>
                      </Select>

                      <Button
                        variant="outline"
                        onClick={() => setShowFilters(!showFilters)}
                        className="px-4 w-full sm:w-auto"
                      >
                        <Filter className="h-4 w-4 mr-2" />
                        Filtres
                      </Button>
                    </div>
                  </div>

                  {/* Filtres avancés */}
                  {showFilters && (
                    <div className="mt-6 pt-6 border-t">
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                        <div>
                          <label className="text-sm font-medium mb-2 block">Gamme de prix</label>
                          <Select value={selectedPriceRange} onValueChange={setSelectedPriceRange}>
                            <SelectTrigger>
                              <SelectValue placeholder="Budget" />
                            </SelectTrigger>
                            <SelectContent>
                              {priceRanges.map(range => (
                                <SelectItem key={range} value={range}>
                                  {range === 'Tous' ? 'Tous les prix' : `${range} FCFA`}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>

                        <div>
                          <label className="text-sm font-medium mb-2 block">Note minimum</label>
                          <Select value={selectedRating} onValueChange={setSelectedRating}>
                            <SelectTrigger>
                              <SelectValue placeholder="Note" />
                            </SelectTrigger>
                            <SelectContent>
                              {ratings.map(rating => (
                                <SelectItem key={rating} value={rating}>
                                  {rating === 'Tous' ? 'Toutes les notes' : `${rating} ⭐`}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>

                        <div>
                          <label className="text-sm font-medium mb-2 block">Équipements</label>
                          <Select value={selectedAmenities} onValueChange={setSelectedAmenities}>
                            <SelectTrigger>
                              <SelectValue placeholder="Équipements" />
                            </SelectTrigger>
                            <SelectContent>
                              {amenities.map(amenity => (
                                <SelectItem key={amenity} value={amenity}>
                                  {amenity === 'Tous' ? 'Tous les équipements' : amenity}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>

                        <div className="flex items-end">
                          <Button variant="outline" className="w-full" onClick={clearFilters}>
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
                <div className={`grid gap-6 ${
                  viewMode === 'grid' 
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
                <Card className="p-12 text-center">
                  <div className="text-gray-500">
                    <Building className="h-12 w-12 mx-auto mb-4 text-gray-300" />
                    <h3 className="text-lg font-semibold mb-2">Aucun établissement trouvé</h3>
                    <p>Essayez de modifier vos critères de recherche ou vos filtres.</p>
                    <Button 
                      variant="outline" 
                      onClick={clearFilters}
                      className="mt-4"
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
