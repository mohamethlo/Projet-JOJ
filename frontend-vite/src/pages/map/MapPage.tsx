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
  Globe,
  X,
  Layers
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


  return (
    <div className="min-h-screen bg-[#FFFDFB] space-y-8 px-4 py-12">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6">
        <div>
          <h1 className="text-3xl sm:text-4xl font-black text-[#2D1B08] uppercase tracking-tighter">Carte Interactive</h1>
          <p className="text-[#5D4037] mt-1 text-sm sm:text-lg font-medium">Explorez les lieux incontournables de Dakar</p>
        </div>
        <Badge className="bg-[#F2A900]/10 text-[#F2A900] border-[#F2A900]/20 text-xs sm:text-sm font-black uppercase tracking-widest px-4 py-1.5 shadow-sm">
          {filteredPlaces.length} lieu(x) trouvé(s)
        </Badge>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Sidebar */}
        <div className="lg:col-span-1 space-y-6">
          {/* Search */}
          <Card className="border-2 border-[#EBE3D5] shadow-sm rounded-2xl overflow-hidden bg-white">
            <CardContent className="p-4">
              <div className="relative group">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-[#F2A900] h-5 w-5 transition-transform group-focus-within:scale-110" />
                <Input
                  placeholder="Rechercher un lieu..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-12 h-14 border-[#EBE3D5] focus:ring-[#F2A900] focus:border-[#F2A900] rounded-xl bg-[#FFFDFB] text-lg font-medium"
                />
              </div>
            </CardContent>
          </Card>

          {/* Categories */}
          <Card className="border-2 border-[#EBE3D5] shadow-sm rounded-2xl overflow-hidden bg-white">
            <CardHeader className="border-b border-[#EBE3D5] py-4">
              <CardTitle className="text-lg font-black text-[#2D1B08] uppercase tracking-tighter flex items-center">
                <Filter className="mr-3 h-5 w-5 text-[#F2A900]" />
                Catégories
              </CardTitle>
            </CardHeader>
            <CardContent className="p-4">
              <div className="space-y-1.5">
                {placeTypes.map((type) => (
                  <Button
                    key={type.id}
                    variant={selectedType === type.id ? 'default' : 'ghost'}
                    className={`w-full justify-start h-12 rounded-xl transition-all ${selectedType === type.id
                      ? 'bg-[#F2A900] text-white shadow-lg hover:bg-[#D49400]'
                      : 'text-[#5D4037] hover:bg-[#F2A900]/5 hover:text-[#2D1B08] font-black uppercase tracking-tighter text-xs'
                      }`}
                    onClick={() => setSelectedType(type.id)}
                  >
                    <span className="mr-3 text-xl">{type.icon}</span>
                    <span className={selectedType === type.id ? 'font-black uppercase tracking-tighter text-xs' : ''}>{type.label}</span>
                    <Badge className={`ml-auto border-none font-black ${selectedType === type.id ? 'bg-white/20 text-white' : 'bg-[#FFFDFB] text-[#5D4037]/60'
                      }`}>
                      {type.id === 'all' ? filteredPlaces.length :
                        filteredPlaces.filter(p => p.type === type.id).length}
                    </Badge>
                  </Button>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Places List */}
          <Card className="border-2 border-[#EBE3D5] shadow-sm rounded-2xl overflow-hidden bg-white flex flex-col">
            <CardHeader className="border-b border-[#EBE3D5] py-4">
              <CardTitle className="text-lg font-black text-[#2D1B08] uppercase tracking-tighter">Lieux à proximité</CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <div className="max-h-[500px] overflow-y-auto divide-y divide-[#EBE3D5]">
                {filteredPlaces.map((place) => (
                  <div
                    key={place.id}
                    className={`p-5 cursor-pointer transition-all duration-300 group ${selectedPlace?.id === place.id ? 'bg-[#1B5E20]/5 border-l-4 border-l-[#1B5E20]' : 'hover:bg-[#FFFDFB]'
                      }`}
                    onClick={() => setSelectedPlace(place)}
                  >
                    <div className="flex items-start space-x-4">
                      <div className="relative h-16 w-16 flex-shrink-0 rounded-xl overflow-hidden border-2 border-[#EBE3D5]">
                        <img
                          src={place.image}
                          alt={place.name}
                          className="w-full h-full object-cover transition-transform group-hover:scale-110"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="font-black text-sm text-[#2D1B08] uppercase tracking-tighter truncate group-hover:text-[#F2A900] transition-colors">{place.name}</h4>
                        <div className="flex items-center mt-1.5">
                          <Star className="h-3.5 w-3.5 fill-[#F2A900] text-[#F2A900] mr-1" />
                          <span className="text-xs font-black text-[#2D1B08]">{place.rating}</span>
                        </div>
                        <p className="text-[10px] text-[#5D4037]/60 font-bold uppercase tracking-tight mt-1.5 flex items-center">
                          <MapPin className="h-3.5 w-3.5 mr-1 text-[#1B5E20]" />
                          <span className="truncate">{place.address}</span>
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
          <Card className="h-[500px] lg:h-[800px] border-4 border-white shadow-2xl rounded-[2.5rem] overflow-hidden relative group">
            <CardContent className="p-0 h-full">
              {/* Mock Map */}
              <div className="w-full h-full bg-[#EBE3D5]/20 relative">
                <div className="absolute inset-0 bg-[#2D1B08]/5 opacity-30"></div>
                <div className="absolute inset-0 flex items-center justify-center p-10">
                  <div className="text-center space-y-6 max-w-sm">
                    <div className="w-24 h-24 bg-[#F2A900]/10 rounded-full flex items-center justify-center mx-auto animate-pulse">
                      <Navigation className="h-10 w-10 text-[#F2A900]" />
                    </div>
                    <h3 className="text-2xl font-black text-[#2D1B08] uppercase tracking-tighter">Carte Interactive</h3>
                    <p className="text-[#5D4037]/60 font-medium">
                      Intégration de la cartographie haute définition en cours...
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4">
                      <Button variant="outline" className="flex-1 border-[#EBE3D5] text-[#2D1B08] font-black uppercase tracking-tighter h-12 rounded-xl bg-white hover:bg-[#FFFDFB]">
                        <Navigation className="mr-3 h-5 w-5 text-[#1B5E20]" />
                        Position
                      </Button>
                      <Button variant="outline" className="flex-1 border-[#EBE3D5] text-[#2D1B08] font-black uppercase tracking-tighter h-12 rounded-xl bg-white hover:bg-[#FFFDFB]">
                        <Globe className="mr-3 h-5 w-5 text-[#F2A900]" />
                        Satellite
                      </Button>
                    </div>
                  </div>
                </div>

                {/* Overlays / Contrôles de la carte */}
                <div className="absolute top-6 right-6 space-y-3 z-10">
                  <Button size="icon" className="bg-white text-[#2D1B08] hover:bg-[#FFFDFB] shadow-xl border-2 border-[#EBE3D5] h-12 w-12 rounded-xl">
                    <Layers className="h-5 w-5" />
                  </Button>
                  <Button size="icon" className="bg-[#1B5E20] text-white hover:bg-[#144718] shadow-xl h-12 w-12 rounded-xl border-none">
                    <Navigation className="h-5 w-5" />
                  </Button>
                </div>

                {/* Markers */}
                {filteredPlaces.slice(0, 5).map((place, index) => (
                  <div
                    key={place.id}
                    className={`absolute w-10 h-10 rounded-2xl flex items-center justify-center text-white font-black shadow-lg cursor-pointer transform hover:scale-125 transition-all duration-300 ${selectedPlace?.id === place.id ? 'bg-[#1B5E20] ring-4 ring-white' : 'bg-[#F2A900]'
                      }`}
                    style={{
                      left: `${25 + index * 12}%`,
                      top: `${35 + (index % 3) * 18}%`
                    }}
                    onClick={() => setSelectedPlace(place)}
                  >
                    <MapPin className="h-5 w-5" />
                  </div>
                ))}
              </div>

              {/* Place Details Overlay */}
              {selectedPlace && (
                <div className="absolute bottom-8 left-8 right-8 animate-in fade-in slide-in-from-bottom-8 duration-500">
                  <Card className="border-none shadow-2xl rounded-[2rem] overflow-hidden bg-white/95 backdrop-blur-md">
                    <CardContent className="p-0">
                      <div className="flex flex-col md:flex-row">
                        <div className="md:w-48 h-48 md:h-auto relative">
                          <img
                            src={selectedPlace.image}
                            alt={selectedPlace.name}
                            className="w-full h-full object-cover"
                          />
                          <Badge className="absolute top-4 left-4 bg-[#F2A900] text-white border-none font-black text-[10px] uppercase tracking-widest px-3 py-1.5 shadow-lg">
                            {selectedPlace.type}
                          </Badge>
                        </div>
                        <div className="flex-1 p-8 relative">
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => setSelectedPlace(null as any)}
                            className="absolute top-4 right-4 text-[#5D4037]/40 hover:text-[#2D1B08] transition-colors h-10 w-10 rounded-full"
                          >
                            <X className="h-5 w-5" />
                          </Button>

                          <h3 className="text-2xl font-black text-[#2D1B08] uppercase tracking-tighter mb-2 pr-10">{selectedPlace.name}</h3>
                          <p className="text-[#5D4037] text-sm mb-6 leading-relaxed font-medium line-clamp-2">{selectedPlace.description}</p>

                          <div className="flex flex-wrap items-center gap-6 mb-8 text-xs font-black uppercase tracking-widest text-[#5D4037]/70">
                            <div className="flex items-center">
                              <Star className="h-4 w-4 fill-[#F2A900] text-[#F2A900] mr-2" />
                              <span className="text-[#2D1B08]">{selectedPlace.rating}</span>
                            </div>
                            <div className="flex items-center">
                              <MapPin className="h-4 w-4 text-[#1B5E20] mr-2" />
                              <span>{selectedPlace.address}</span>
                            </div>
                            <div className="flex items-center">
                              <Clock className="h-4 w-4 text-[#F2A900] mr-2" />
                              <span>{selectedPlace.hours}</span>
                            </div>
                          </div>

                          <div className="flex gap-4">
                            <Button className="flex-1 bg-[#1B5E20] hover:bg-[#144718] text-white font-black uppercase tracking-tighter rounded-xl h-12 shadow-lg shadow-emerald-900/10">
                              <Navigation className="mr-3 h-5 w-5" />
                              Direction
                            </Button>
                            <Button variant="outline" className="flex-1 border-[#EBE3D5] text-[#2D1B08] font-black uppercase tracking-tighter rounded-xl h-12 hover:bg-[#FFFDFB]">
                              <Phone className="mr-3 h-5 w-5 text-[#F2A900]" />
                              Contact
                            </Button>
                          </div>
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
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-12">
        {[
          { label: 'Restaurants', count: mockPlaces.filter(p => p.type === 'restaurant').length, color: '#F2A900' },
          { label: 'Hôtels', count: mockPlaces.filter(p => p.type === 'hotel').length, color: '#1B5E20' },
          { label: 'Monuments', count: mockPlaces.filter(p => p.type === 'monument').length, color: '#2D1B08' },
          { label: 'Total Exploration', count: mockPlaces.length, color: '#F2A900' }
        ].map((stat) => (
          <Card key={stat.label} className="border-2 border-[#EBE3D5] shadow-sm rounded-2xl overflow-hidden bg-white group hover:border-[#F2A900] transition-colors">
            <CardContent className="p-6 text-center">
              <div className="text-3xl font-black tracking-tighter mb-1" style={{ color: stat.color }}>
                {stat.count}
              </div>
              <p className="text-[10px] font-black text-[#5D4037]/60 uppercase tracking-widest group-hover:text-[#5D4037] transition-colors">{stat.label}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default MapPage;
