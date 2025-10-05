import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { 
  Search, 
  Filter, 
  MapPin, 
  Calendar, 
  Clock, 
  Play, 
  Trophy,
  TrendingUp,
  Users,
  Star,
  RefreshCw,
  Grid3X3,
  List
} from 'lucide-react';
import { SportEventCard } from '@/components/cards';
import { mockEvents } from '@/lib/mockData';

const SportsEventsTab: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSport, setSelectedSport] = useState('');
  const [selectedLocation, setSelectedLocation] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('');
  const [sortBy, setSortBy] = useState('featured');
  const [showFilters, setShowFilters] = useState(false);
  const [lastUpdate, setLastUpdate] = useState(new Date());
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  // Filtrer les événements sportifs
  const sportsEvents = mockEvents.filter(event => event.type === 'sport');
  
  const sports = ['Tous', 'Football', 'Basketball', 'Lutte', 'Athlétisme', 'Tennis'];
  const locations = ['Tous', 'Dakar', 'Saint-Louis', 'Thiès', 'Kaolack', 'Ziguinchor'];
  const statuses = ['Tous', 'En cours', 'À venir', 'Terminé'];

  // Simulation de mise à jour en temps réel
  useEffect(() => {
    const interval = setInterval(() => {
      setLastUpdate(new Date());
    }, 30000); // Mise à jour toutes les 30 secondes

    return () => clearInterval(interval);
  }, []);

  const filteredEvents = sportsEvents.filter(event => {
    const matchesSearch = event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         event.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         (event.liveData?.homeTeam?.toLowerCase().includes(searchTerm.toLowerCase()) || false) ||
                         (event.liveData?.awayTeam?.toLowerCase().includes(searchTerm.toLowerCase()) || false);
    
    const matchesSport = !selectedSport || selectedSport === 'Tous' || 
                        event.title.toLowerCase().includes(selectedSport.toLowerCase());
    
    const matchesLocation = !selectedLocation || selectedLocation === 'Tous' || 
                           event.location === selectedLocation;
    
    const matchesStatus = !selectedStatus || selectedStatus === 'Tous' || 
                         event.liveData?.status === selectedStatus;

    return matchesSearch && matchesSport && matchesLocation && matchesStatus;
  });

  // Tri des événements
  const sortedEvents = [...filteredEvents].sort((a, b) => {
    switch (sortBy) {
      case 'live':
        return (b.isLive ? 1 : 0) - (a.isLive ? 1 : 0);
      case 'date':
        return new Date(a.date).getTime() - new Date(b.date).getTime();
      case 'popularity':
        return b.registered - a.registered;
      case 'featured':
      default:
        return (b.isLive ? 1 : 0) - (a.isLive ? 1 : 0);
    }
  });

  const liveEvents = sortedEvents.filter(event => event.isLive);
  const upcomingEvents = sortedEvents.filter(event => !event.isLive);

  const handleRegister = (eventId: string) => {
    alert(`Réservation pour l'événement sportif ${eventId} - Fonctionnalité à implémenter`);
  };

  const clearFilters = () => {
    setSearchTerm('');
    setSelectedSport('');
    setSelectedLocation('');
    setSelectedStatus('');
  };

  return (
    <div className="space-y-6">
      {/* Header avec statistiques */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
              <div>
                <p className="text-2xl font-bold text-red-600">{liveEvents.length}</p>
                <p className="text-sm text-gray-600">En Direct</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Trophy className="h-5 w-5 text-yellow-500" />
              <div>
                <p className="text-2xl font-bold">{sportsEvents.length}</p>
                <p className="text-sm text-gray-600">Événements</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Users className="h-5 w-5 text-blue-500" />
              <div>
                <p className="text-2xl font-bold">{sportsEvents.reduce((sum, event) => sum + event.registered, 0)}</p>
                <p className="text-sm text-gray-600">Participants</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <RefreshCw className="h-5 w-5 text-green-500" />
              <div>
                <p className="text-xs text-gray-600">Dernière MAJ</p>
                <p className="text-sm font-medium">{lastUpdate.toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' })}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filtres et recherche */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center space-x-2">
              <Filter className="h-5 w-5" />
              <span>Filtres</span>
            </CardTitle>
            <div className="flex items-center space-x-2">
              <div className="flex items-center space-x-1 border rounded-lg p-1">
                <Button
                  variant={viewMode === 'grid' ? 'default' : 'ghost'}
                  size="sm"
                  onClick={() => setViewMode('grid')}
                  className="h-8 w-8 p-0"
                >
                  <Grid3X3 className="h-4 w-4" />
                </Button>
                <Button
                  variant={viewMode === 'list' ? 'default' : 'ghost'}
                  size="sm"
                  onClick={() => setViewMode('list')}
                  className="h-8 w-8 p-0"
                >
                  <List className="h-4 w-4" />
                </Button>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowFilters(!showFilters)}
              >
                {showFilters ? 'Masquer' : 'Afficher'} filtres
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {/* Recherche */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Rechercher par équipe, sport, lieu..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>

            {/* Filtres avancés */}
            {showFilters && (
              <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
                <Select value={selectedSport} onValueChange={setSelectedSport}>
                  <SelectTrigger>
                    <SelectValue placeholder="Sport" />
                  </SelectTrigger>
                  <SelectContent>
                    {sports.map((sport) => (
                      <SelectItem key={sport} value={sport}>
                        {sport}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                <Select value={selectedLocation} onValueChange={setSelectedLocation}>
                  <SelectTrigger>
                    <SelectValue placeholder="Lieu" />
                  </SelectTrigger>
                  <SelectContent>
                    {locations.map((location) => (
                      <SelectItem key={location} value={location}>
                        {location}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                <Select value={selectedStatus} onValueChange={setSelectedStatus}>
                  <SelectTrigger>
                    <SelectValue placeholder="Statut" />
                  </SelectTrigger>
                  <SelectContent>
                    {statuses.map((status) => (
                      <SelectItem key={status} value={status}>
                        {status}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger>
                    <SelectValue placeholder="Trier par" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="featured">Mis en avant</SelectItem>
                    <SelectItem value="live">En direct</SelectItem>
                    <SelectItem value="date">Date</SelectItem>
                    <SelectItem value="popularity">Popularité</SelectItem>
                  </SelectContent>
                </Select>

                <Button variant="outline" onClick={clearFilters}>
                  Effacer
                </Button>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Événements en direct */}
      {liveEvents.length > 0 && (
        <div className="space-y-4">
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
            <h2 className="text-xl font-bold text-red-600">En Direct</h2>
            <Badge className="bg-red-100 text-red-700">
              {liveEvents.length}
            </Badge>
          </div>
          <div className={`grid gap-6 ${
            viewMode === 'grid' 
              ? 'grid-cols-1 lg:grid-cols-2' 
              : 'grid-cols-1'
          }`}>
            {liveEvents.map((event) => (
              <SportEventCard
                key={event.id}
                event={event}
                onRegister={handleRegister}
              />
            ))}
          </div>
        </div>
      )}

      {/* Événements à venir */}
      <div className="space-y-4">
        <div className="flex items-center space-x-2">
          <Calendar className="h-5 w-5 text-blue-600" />
          <h2 className="text-xl font-bold">Événements à venir</h2>
          <Badge className="bg-blue-100 text-blue-700">
            {upcomingEvents.length}
          </Badge>
        </div>
        
        {upcomingEvents.length === 0 ? (
          <Card>
            <CardContent className="p-8 text-center">
              <Trophy className="h-12 w-12 text-gray-300 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-600 mb-2">
                Aucun événement trouvé
              </h3>
              <p className="text-gray-500">
                Aucun événement sportif ne correspond à vos critères de recherche.
              </p>
            </CardContent>
          </Card>
        ) : (
          <div className={`grid gap-6 ${
            viewMode === 'grid' 
              ? 'grid-cols-1 lg:grid-cols-2' 
              : 'grid-cols-1'
          }`}>
            {upcomingEvents.map((event) => (
              <SportEventCard
                key={event.id}
                event={event}
                onRegister={handleRegister}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default SportsEventsTab;
