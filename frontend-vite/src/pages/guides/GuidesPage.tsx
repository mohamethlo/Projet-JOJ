import React, { useState, useMemo } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { MapPin, Star, Users, Filter, Search, Calendar, Clock } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { mockGuides } from '@/lib/mockData';
import GuideCard from '@/components/cards/GuideCard';

// Données mock pour les heures de travail et disponibilités des guides
const guideSchedules = {
  '1': { // Amadou Ba
    workingHours: { start: '08:00', end: '18:00' },
    breakHours: [
      { start: '12:00', end: '13:00', type: 'pause déjeuner' },
      { start: '15:00', end: '15:30', type: 'pause courte' }
    ],
    daysOff: ['sunday'],
    maxToursPerDay: 3
  },
  '2': { // Khadija Mbaye
    workingHours: { start: '09:00', end: '17:00' },
    breakHours: [
      { start: '12:30', end: '13:30', type: 'pause déjeuner' }
    ],
    daysOff: ['monday'],
    maxToursPerDay: 2
  },
  '3': { // Moussa Diallo
    workingHours: { start: '07:00', end: '19:00' },
    breakHours: [
      { start: '12:00', end: '13:00', type: 'pause déjeuner' },
      { start: '16:00', end: '16:30', type: 'pause courte' }
    ],
    daysOff: [],
    maxToursPerDay: 4
  }
};

// Données mock pour les réservations des guides
const mockGuideBookings = [
  {
    guideId: '1',
    date: '2024-02-15',
    time: '09:00',
    status: 'confirmed'
  },
  {
    guideId: '1',
    date: '2024-02-15',
    time: '14:00',
    status: 'confirmed'
  },
  {
    guideId: '2',
    date: '2024-02-16',
    time: '10:00',
    status: 'confirmed'
  },
  {
    guideId: '3',
    date: '2024-02-17',
    time: '08:00',
    status: 'confirmed'
  }
];

const GuidesPage: React.FC = () => {
  const { user } = useAuth();
  const [selectedLocation, setSelectedLocation] = useState<string>('all');
  const [selectedSpecialty, setSelectedSpecialty] = useState<string>('all');
  const [selectedPriceRange, setSelectedPriceRange] = useState<string>('all');
  const [selectedLanguage, setSelectedLanguage] = useState<string>('all');
  const [selectedRating, setSelectedRating] = useState<string>('all');
  const [selectedType, setSelectedType] = useState<string>('all');
  const [sortBy, setSortBy] = useState<string>('rating');
  const [showFilters, setShowFilters] = useState(false);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedAvailabilityDay, setSelectedAvailabilityDay] = useState('all');
  const [selectedAvailabilityHour, setSelectedAvailabilityHour] = useState('all');

  // Fonction pour calculer la disponibilité d'un guide
  const calculateGuideAvailability = (guideId: string) => {
    const schedule = guideSchedules[guideId as keyof typeof guideSchedules];
    if (!schedule) return [];

    const availability = [];
    const today = new Date();
    
    for (let i = 0; i < 7; i++) {
      const date = new Date(today);
      date.setDate(today.getDate() + i);
      const dateStr = date.toISOString().split('T')[0];
      const dayName = date.toLocaleDateString('fr-FR', { weekday: 'long' });
      
      // Vérifier si c'est un jour de repos
      const isDayOff = schedule.daysOff.includes(dayName.toLowerCase());
      
      if (isDayOff) {
        availability.push({
          date: dateStr,
          dayName: dayName,
          isAvailable: false,
          reason: 'Jour de repos',
          timeSlots: []
        });
        continue;
      }
      
      // Créer les créneaux horaires
      const timeSlots = [];
      const startHour = parseInt(schedule.workingHours.start.split(':')[0]);
      const endHour = parseInt(schedule.workingHours.end.split(':')[0]);
      
      for (let hour = startHour; hour < endHour; hour++) {
        const timeStr = `${hour.toString().padStart(2, '0')}:00`;
        const nextHourStr = `${(hour + 1).toString().padStart(2, '0')}:00`;
        
        // Vérifier si c'est une heure de pause
        const isBreakTime = schedule.breakHours.some(breakHour => 
          timeStr >= breakHour.start && timeStr < breakHour.end
        );
        
        // Vérifier s'il y a une réservation à cette heure
        const hasBooking = mockGuideBookings.some(booking => 
          booking.guideId === guideId &&
          booking.date === dateStr && 
          booking.status !== 'cancelled' &&
          booking.time === timeStr
        );
        
        // Vérifier le nombre de visites ce jour
        const toursToday = mockGuideBookings.filter(booking => 
          booking.guideId === guideId &&
          booking.date === dateStr && 
          booking.status !== 'cancelled'
        ).length;
        
        const isMaxToursReached = toursToday >= schedule.maxToursPerDay;
        
        let status = 'available';
        let reason = '';
        
        if (isBreakTime) {
          status = 'break';
          reason = 'Pause';
        } else if (hasBooking) {
          status = 'booked';
          reason = 'Réservé';
        } else if (isMaxToursReached) {
          status = 'unavailable';
          reason = 'Limite atteinte';
        }
        
        timeSlots.push({
          time: timeStr,
          nextTime: nextHourStr,
          status,
          reason
        });
      }
      
      availability.push({
        date: dateStr,
        dayName: dayName,
        isAvailable: timeSlots.some(slot => slot.status === 'available'),
        timeSlots
      });
    }
    
    return availability;
  };

  // Filtrage des guides
  const filteredGuides = useMemo(() => {
    let filtered = mockGuides;

    // Filtre par recherche
    if (searchTerm) {
      filtered = filtered.filter(guide =>
        guide.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        guide.specialties.some(specialty => 
          specialty.toLowerCase().includes(searchTerm.toLowerCase())
        ) ||
        guide.languages.some(language => 
          language.toLowerCase().includes(searchTerm.toLowerCase())
        )
      );
    }

    // Filtres
    if (selectedLocation && selectedLocation !== 'all') {
      filtered = filtered.filter(guide => guide.location === selectedLocation);
    }

    if (selectedSpecialty && selectedSpecialty !== 'all') {
      filtered = filtered.filter(guide => 
        guide.specialties.includes(selectedSpecialty)
      );
    }

    if (selectedPriceRange && selectedPriceRange !== 'all') {
      const [min, max] = selectedPriceRange.split('-').map(Number);
      filtered = filtered.filter(guide => {
        const price = parseInt(guide.price.replace(/\D/g, ''));
        return price >= min && price <= max;
      });
    }

    if (selectedLanguage && selectedLanguage !== 'all') {
      filtered = filtered.filter(guide => 
        guide.languages.includes(selectedLanguage)
      );
    }

    if (selectedRating && selectedRating !== 'all') {
      const rating = parseInt(selectedRating);
      filtered = filtered.filter(guide => guide.rating >= rating);
    }

    if (selectedType && selectedType !== 'all') {
      filtered = filtered.filter(guide => guide.type === selectedType);
    }

    // Tri
    switch (sortBy) {
      case 'rating':
        filtered.sort((a, b) => b.rating - a.rating);
        break;
      case 'price-low':
        filtered.sort((a, b) => {
          const priceA = parseInt(a.price.replace(/\D/g, ''));
          const priceB = parseInt(b.price.replace(/\D/g, ''));
          return priceA - priceB;
        });
        break;
      case 'price-high':
        filtered.sort((a, b) => {
          const priceA = parseInt(a.price.replace(/\D/g, ''));
          const priceB = parseInt(b.price.replace(/\D/g, ''));
          return priceB - priceA;
        });
        break;
      case 'name':
        filtered.sort((a, b) => a.name.localeCompare(b.name));
        break;
    }

    // Filtre par jour de disponibilité
    if (selectedAvailabilityDay !== 'all') {
      filtered = filtered.filter(guide => {
        const availability = calculateGuideAvailability(guide.id);
        return availability.some(day => 
          day.date === selectedAvailabilityDay && day.isAvailable
        );
      });
    }

    // Filtre par heure de disponibilité
    if (selectedAvailabilityHour !== 'all' && selectedAvailabilityDay !== 'all') {
      filtered = filtered.filter(guide => {
        const availability = calculateGuideAvailability(guide.id);
        const dayAvailability = availability.find(day => day.date === selectedAvailabilityDay);
        return dayAvailability?.timeSlots.some(slot => 
          slot.time === selectedAvailabilityHour && slot.status === 'available'
        );
      });
    }

    return filtered;
  }, [
    searchTerm,
    selectedLocation,
    selectedSpecialty,
    selectedPriceRange,
    selectedLanguage,
    selectedRating,
    selectedType,
    sortBy,
    selectedAvailabilityDay,
    selectedAvailabilityHour
  ]);

  // Options pour les filtres
  const locations = Array.from(new Set(mockGuides.map(guide => guide.location)));
  const specialties = Array.from(new Set(mockGuides.flatMap(guide => guide.specialties)));
  const languages = Array.from(new Set(mockGuides.flatMap(guide => guide.languages)));
  const types = Array.from(new Set(mockGuides.map(guide => guide.type)));

  const clearFilters = () => {
    setSelectedLocation('all');
    setSelectedSpecialty('all');
    setSelectedPriceRange('all');
    setSelectedLanguage('all');
    setSelectedRating('all');
    setSelectedType('all');
    setSearchTerm('');
    setSelectedAvailabilityDay('all');
    setSelectedAvailabilityHour('all');
  };

  const getActiveFiltersCount = () => {
    let count = 0;
    if (selectedLocation && selectedLocation !== 'all') count++;
    if (selectedSpecialty && selectedSpecialty !== 'all') count++;
    if (selectedPriceRange && selectedPriceRange !== 'all') count++;
    if (selectedLanguage && selectedLanguage !== 'all') count++;
    if (selectedRating && selectedRating !== 'all') count++;
    if (selectedType && selectedType !== 'all') count++;
    if (selectedAvailabilityDay && selectedAvailabilityDay !== 'all') count++;
    if (selectedAvailabilityHour && selectedAvailabilityHour !== 'all') count++;
    return count;
  };


  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-8 gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold mb-2">Guides Certifiés</h1>
          <p className="text-gray-600 text-sm sm:text-base">
            Découvrez nos guides professionnels pour une expérience touristique inoubliable
          </p>
        </div>
        
        <div className="flex items-center space-x-4 mt-4 lg:mt-0">
          <div className="flex items-center space-x-2">
            <Button
              variant={viewMode === 'grid' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setViewMode('grid')}
            >
              <span className="hidden sm:inline">Grille</span>
              <span className="sm:hidden">📋</span>
            </Button>
            <Button
              variant={viewMode === 'list' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setViewMode('list')}
            >
              <span className="hidden sm:inline">Liste</span>
              <span className="sm:hidden">☰</span>
            </Button>
          </div>
        </div>
      </div>

      {/* Barre de recherche et filtres */}
      <div className="mb-8 space-y-4">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              placeholder="Rechercher un guide, une spécialité ou une langue..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          
          <Button
            variant="outline"
            onClick={() => setShowFilters(!showFilters)}
            className="flex items-center space-x-2"
          >
            <Filter className="h-4 w-4" />
            <span>Filtres</span>
            {getActiveFiltersCount() > 0 && (
              <Badge variant="secondary" className="ml-1">
                {getActiveFiltersCount()}
              </Badge>
            )}
          </Button>
        </div>

        {/* Filtres avancés */}
        {showFilters && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 p-4 bg-gray-50 rounded-lg">
            <div>
              <label className="block text-sm font-medium mb-1">Localisation</label>
              <Select value={selectedLocation} onValueChange={setSelectedLocation}>
                <SelectTrigger>
                  <SelectValue placeholder="Toutes les localisations" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Toutes les localisations</SelectItem>
                  {locations.map(location => (
                    <SelectItem key={location} value={location}>
                      {location}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Type de guide</label>
              <Select value={selectedType} onValueChange={setSelectedType}>
                <SelectTrigger>
                  <SelectValue placeholder="Tous les types" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Tous les types</SelectItem>
                  <SelectItem value="Certifiés">Certifiés</SelectItem>
                  <SelectItem value="Diplômés">Diplômés</SelectItem>
                  <SelectItem value="Formations professionnelles">Formations professionnelles</SelectItem>
                  <SelectItem value="Local">Local</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Spécialité</label>
              <Select value={selectedSpecialty} onValueChange={setSelectedSpecialty}>
                <SelectTrigger>
                  <SelectValue placeholder="Toutes les spécialités" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Toutes les spécialités</SelectItem>
                  {specialties.map(specialty => (
                    <SelectItem key={specialty} value={specialty}>
                      {specialty}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Prix</label>
              <Select value={selectedPriceRange} onValueChange={setSelectedPriceRange}>
                <SelectTrigger>
                  <SelectValue placeholder="Tous les prix" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Tous les prix</SelectItem>
                  <SelectItem value="0-15000">Moins de 15 000 FCFA</SelectItem>
                  <SelectItem value="15000-25000">15 000 - 25 000 FCFA</SelectItem>
                  <SelectItem value="25000-35000">25 000 - 35 000 FCFA</SelectItem>
                  <SelectItem value="35000-999999">Plus de 35 000 FCFA</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Langue</label>
              <Select value={selectedLanguage} onValueChange={setSelectedLanguage}>
                <SelectTrigger>
                  <SelectValue placeholder="Toutes les langues" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Toutes les langues</SelectItem>
                  {languages.map(language => (
                    <SelectItem key={language} value={language}>
                      {language}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Note minimum</label>
              <Select value={selectedRating} onValueChange={setSelectedRating}>
                <SelectTrigger>
                  <SelectValue placeholder="Toutes les notes" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Toutes les notes</SelectItem>
                  <SelectItem value="4">4 étoiles et plus</SelectItem>
                  <SelectItem value="3">3 étoiles et plus</SelectItem>
                  <SelectItem value="2">2 étoiles et plus</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex items-end">
              <Button variant="outline" onClick={clearFilters} className="w-full">
                Effacer les filtres
              </Button>
            </div>
          </div>
        )}

        {/* Filtres de disponibilité */}
        <div className="flex flex-col md:flex-row gap-4">
          <Select value={selectedAvailabilityDay} onValueChange={(value) => {
            setSelectedAvailabilityDay(value);
            setSelectedAvailabilityHour('all'); // Reset heure quand on change de jour
          }}>
            <SelectTrigger className="w-full md:w-48">
              <SelectValue placeholder="Jour de disponibilité" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Tous les jours</SelectItem>
              {(() => {
                const today = new Date();
                const days = [];
                for (let i = 0; i < 7; i++) {
                  const date = new Date(today);
                  date.setDate(today.getDate() + i);
                  const dateStr = date.toISOString().split('T')[0];
                  const dayName = date.toLocaleDateString('fr-FR', { weekday: 'long' });
                  days.push(
                    <SelectItem key={dateStr} value={dateStr}>
                      {dayName} ({date.toLocaleDateString('fr-FR')})
                    </SelectItem>
                  );
                }
                return days;
              })()}
            </SelectContent>
          </Select>

          <Select 
            value={selectedAvailabilityHour} 
            onValueChange={setSelectedAvailabilityHour}
            disabled={selectedAvailabilityDay === 'all'}
          >
            <SelectTrigger className="w-full md:w-48">
              <SelectValue placeholder="Heure de disponibilité" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Toutes les heures</SelectItem>
              {selectedAvailabilityDay !== 'all' && 
                (() => {
                  const availableHours = new Set();
                  mockGuides.forEach(guide => {
                    const availability = calculateGuideAvailability(guide.id);
                    const dayAvailability = availability.find(day => day.date === selectedAvailabilityDay);
                    if (dayAvailability) {
                      dayAvailability.timeSlots
                        .filter(slot => slot.status === 'available')
                        .forEach(slot => availableHours.add(slot.time));
                    }
                  });
                  return Array.from(availableHours).sort().map(hour => (
                    <SelectItem key={hour} value={hour}>
                      {hour} - {String(parseInt(hour.split(':')[0]) + 1).padStart(2, '0')}:00
                    </SelectItem>
                  ));
                })()
              }
            </SelectContent>
          </Select>
        </div>
      </div>

        {/* Tri et résultats */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6 gap-4">
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:space-x-4">
          <span className="text-xs sm:text-sm text-gray-600">
            {filteredGuides.length} guide{filteredGuides.length > 1 ? 's' : ''} trouvé{filteredGuides.length > 1 ? 's' : ''}
          </span>
          
          <Select value={sortBy} onValueChange={setSortBy}>
            <SelectTrigger className="w-full sm:w-48">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="rating">Trier par note</SelectItem>
              <SelectItem value="price-low">Prix croissant</SelectItem>
              <SelectItem value="price-high">Prix décroissant</SelectItem>
              <SelectItem value="name">Trier par nom</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Liste des guides */}
      {filteredGuides.length === 0 ? (
        <div className="text-center py-12">
          <Users className="mx-auto h-12 w-12 text-gray-400 mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">Aucun guide trouvé</h3>
          <p className="text-gray-600 mb-4">
            Essayez de modifier vos critères de recherche ou vos filtres.
          </p>
          <Button variant="outline" onClick={clearFilters}>
            Effacer tous les filtres
          </Button>
        </div>
      ) : (
        <div className={`grid gap-6 ${
          viewMode === 'grid' 
            ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3' 
            : 'grid-cols-1'
        }`}>
            {filteredGuides.map((guide) => (
              <GuideCard 
                key={guide.id} 
                guide={guide} 
                viewMode={viewMode}
                availabilityData={calculateGuideAvailability(guide.id)}
              />
            ))}
        </div>
      )}
    </div>
  );
};

export default GuidesPage;
