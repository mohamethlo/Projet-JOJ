import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { 
  MapPin, 
  Search, 
  Filter, 
  Navigation,
  Star,
  Phone,
  Clock,
  Globe
} from 'lucide-react';
import { mockPlaces } from '@/lib/mockData';

const MapPage: React.FC = () => {
  const [selectedType, setSelectedType] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedPlace, setSelectedPlace] = useState(mockPlaces[0]);

  const placeTypes = [
    { id: 'all', label: 'Tous', icon: '🗺️', count: mockPlaces.length },
    { id: 'restaurant', label: 'Restaurants', icon: '🍽️', count: mockPlaces.filter(p => p.type === 'restaurant').length },
    { id: 'hotel', label: 'Hôtels', icon: '🏨', count: mockPlaces.filter(p => p.type === 'hotel').length },
    { id: 'monument', label: 'Monuments', icon: '🏛️', count: mockPlaces.filter(p => p.type === 'monument').length },
    { id: 'event', label: 'Événements', icon: '🎉', count: 0 }
  ];

  const filteredPlaces = mockPlaces.filter(place => {
    const matchesType = selectedType === 'all' || place.type === selectedType;
    const matchesSearch = place.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         place.description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesType && matchesSearch;
  });

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'restaurant':
        return 'bg-orange-500';
      case 'hotel':
        return 'bg-blue-500';
      case 'monument':
        return 'bg-green-500';
      default:
        return 'bg-gray-500';
    }
  };

  return (
    <div className="space-y-6 px-4 py-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Carte Interactive</h1>
          <p className="text-gray-600 mt-1 text-sm sm:text-base">Explorez les lieux incontournables de Dakar</p>
        </div>
        <Badge className="bg-green-100 text-green-700 text-xs sm:text-sm w-fit">
          {filteredPlaces.length} lieu(x) trouvé(s)
        </Badge>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Sidebar */}
        <div className="lg:col-span-1 space-y-4">
          {/* Search */}
          <Card>
            <CardContent className="p-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  placeholder="Rechercher un lieu..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </CardContent>
          </Card>

          {/* Categories */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center">
                <Filter className="mr-2 h-5 w-5" />
                Catégories
              </CardTitle>
            </CardHeader>
            <CardContent className="p-4 pt-0">
              <div className="space-y-2">
                {placeTypes.map((type) => (
                  <Button
                    key={type.id}
                    variant={selectedType === type.id ? 'default' : 'ghost'}
                    className="w-full justify-start"
                    onClick={() => setSelectedType(type.id)}
                  >
                    <span className="mr-2">{type.icon}</span>
                    {type.label}
                    <Badge variant="secondary" className="ml-auto">
                      {type.id === 'all' ? filteredPlaces.length : 
                       filteredPlaces.filter(p => p.type === type.id).length}
                    </Badge>
                  </Button>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Places List */}
          <Card className="flex-1">
            <CardHeader>
              <CardTitle className="text-lg">Lieux</CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <div className="max-h-96 overflow-y-auto">
                {filteredPlaces.map((place) => (
                  <div
                    key={place.id}
                    className={`p-4 border-b cursor-pointer hover:bg-gray-50 ${
                      selectedPlace?.id === place.id ? 'bg-blue-50 border-l-4 border-l-blue-500' : ''
                    }`}
                    onClick={() => setSelectedPlace(place)}
                  >
                    <div className="flex items-start space-x-3">
                      <img 
                        src={place.image} 
                        alt={place.name}
                        className="w-12 h-12 rounded-lg object-cover"
                      />
                      <div className="flex-1">
                        <h4 className="font-medium text-sm">{place.name}</h4>
                        <div className="flex items-center mt-1">
                          <Star className="h-3 w-3 fill-yellow-400 text-yellow-400 mr-1" />
                          <span className="text-xs text-gray-600">{place.rating}</span>
                        </div>
                        <p className="text-xs text-gray-500 mt-1 flex items-center">
                          <MapPin className="h-3 w-3 mr-1" />
                          {place.address}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Map */}
        <div className="lg:col-span-2">
          <Card className="h-[400px] sm:h-[500px] lg:h-[700px]">
            <CardContent className="p-0 h-full">
              {/* Mock Map - In real implementation, use Google Maps or Leaflet */}
              <div className="w-full h-full bg-gradient-to-br from-blue-100 to-green-100 relative rounded-lg overflow-hidden">
                <div className="absolute inset-0 bg-gray-200 opacity-50"></div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center p-8 bg-white rounded-lg shadow-lg">
                    <MapPin className="h-12 w-12 mx-auto mb-4 text-gray-400" />
                    <h3 className="text-lg font-medium mb-2">Carte Interactive</h3>
                    <p className="text-gray-600 mb-4">
                      Intégration avec Google Maps ou Leaflet à implementer
                    </p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <Button variant="outline" className="flex items-center">
                        <Navigation className="mr-2 h-4 w-4" />
                        Ma position
                      </Button>
                      <Button variant="outline" className="flex items-center">
                        <Globe className="mr-2 h-4 w-4" />
                        Vue satellite
                      </Button>
                    </div>
                  </div>
                </div>

                {/* Mock markers */}
                {filteredPlaces.slice(0, 5).map((place, index) => (
                  <div
                    key={place.id}
                    className={`absolute w-8 h-8 rounded-full flex items-center justify-center text-white text-sm font-bold cursor-pointer transform hover:scale-110 transition-transform ${getTypeColor(place.type)}`}
                    style={{
                      left: `${20 + index * 15}%`,
                      top: `${30 + (index % 3) * 20}%`
                    }}
                    onClick={() => setSelectedPlace(place)}
                  >
                    {index + 1}
                  </div>
                ))}
              </div>
              
              {/* Place Details Overlay */}
              {selectedPlace && (
                <div className="absolute bottom-6 left-6 right-6">
                  <Card>
                    <CardContent className="p-4">
                      <div className="flex items-start space-x-4">
                        <img 
                          src={selectedPlace.image} 
                          alt={selectedPlace.name}
                          className="w-16 h-16 rounded-lg object-cover"
                        />
                        <div className="flex-1">
                          <h3 className="font-semibold">{selectedPlace.name}</h3>
                          <p className="text-sm text-gray-600 mt-1">{selectedPlace.description}</p>
                          <div className="flex items-center mt-2 space-x-4">
                            <div className="flex items-center">
                              <Star className="h-4 w-4 fill-yellow-400 text-yellow-400 mr-1" />
                              <span className="text-sm">{selectedPlace.rating}</span>
                            </div>
                            <div className="flex items-center text-sm text-gray-600">
                              <MapPin className="h-4 w-4 mr-1" />
                              {selectedPlace.address}
                            </div>
                            <div className="flex items-center text-sm text-gray-600">
                              <Clock className="h-4 w-4 mr-1" />
                              {selectedPlace.hours}
                            </div>
                          </div>
                        </div>
                        <div className="flex flex-col space-y-2">
                          <Button size="sm">
                            <Navigation className="mr-2 h-4 w-4" />
                            Itinéraire
                          </Button>
                          <Button size="sm" variant="outline">
                            <Phone className="mr-2 h-4 w-4" />
                            Appeler
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: 'Restaurants', count: mockPlaces.filter(p => p.type === 'restaurant').length, color: 'orange' },
          { label: 'Hôtels', count: mockPlaces.filter(p => p.type === 'hotel').length, color: 'blue' },
          { label: 'Monuments', count: mockPlaces.filter(p => p.type === 'monument').length, color: 'green' },
          { label: 'Total', count: mockPlaces.length, color: 'gray' }
        ].map((stat) => (
          <Card key={stat.label}>
            <CardContent className="p-4 text-center">
              <div className={`text-2xl font-bold ${
                stat.color === 'orange' ? 'text-orange-600' :
                stat.color === 'blue' ? 'text-blue-600' :
                stat.color === 'green' ? 'text-green-600' :
                'text-gray-600'
              }`}>
                {stat.count}
              </div>
              <p className="text-sm text-gray-600">{stat.label}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default MapPage;
