import React, { useState, useMemo } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Users, Filter, Search, Calendar, Clock } from 'lucide-react';
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
      const isDayOff = (schedule.daysOff as string[]).includes(dayName.toLowerCase());

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
    <div className="min-h-screen bg-[#FFFDFB]">
      <div className="container mx-auto px-4 py-12">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-12 gap-6">
          <div>
            <h1 className="text-3xl sm:text-4xl font-black text-[#2D1B08] mb-3 uppercase tracking-tighter">Guides Certifiés</h1>
            <p className="text-[#5D4037] text-sm sm:text-lg font-medium opacity-90">
              Découvrez nos guides professionnels pour une immersion culturelle authentique
            </p>
          </div>

          <div className="flex items-center space-x-3">
            <Button
              variant={viewMode === 'grid' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setViewMode('grid')}
              className={viewMode === 'grid' ? 'bg-[#F2A900] hover:bg-[#D49400] text-white font-black uppercase tracking-tighter' : 'border-[#EBE3D5] text-[#5D4037] font-black uppercase tracking-tighter'}
            >
              <span className="hidden sm:inline">Grille</span>
              <span className="sm:hidden">📋</span>
            </Button>
            <Button
              variant={viewMode === 'list' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setViewMode('list')}
              className={viewMode === 'list' ? 'bg-[#1B5E20] hover:bg-[#144718] text-white font-black uppercase tracking-tighter' : 'border-[#EBE3D5] text-[#5D4037] font-black uppercase tracking-tighter'}
            >
              <span className="hidden sm:inline">Liste</span>
              <span className="sm:hidden">☰</span>
            </Button>
          </div>
        </div>

        {/* Barre de recherche et filtres */}
        <div className="mb-12 space-y-6">
          <Card className="border-2 border-[#EBE3D5] shadow-sm bg-white overflow-hidden rounded-2xl">
            <CardContent className="p-6">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="relative flex-1">
                  <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-[#F2A900] h-5 w-5" />
                  <Input
                    placeholder="Rechercher un guide, une spécialité ou une langue..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-12 h-14 border-[#EBE3D5] focus:ring-[#F2A900] focus:border-[#F2A900] rounded-xl bg-[#FFFDFB] text-lg font-medium"
                  />
                </div>

                <Button
                  variant="outline"
                  onClick={() => setShowFilters(!showFilters)}
                  className={`flex items-center space-x-2 h-14 px-6 border-2 font-black uppercase tracking-tighter rounded-xl transition-all ${showFilters || getActiveFiltersCount() > 0
                    ? 'border-[#F2A900] text-[#F2A900] bg-[#F2A900]/5'
                    : 'border-[#EBE3D5] text-[#5D4037]'
                    }`}
                >
                  <Filter className="h-4 w-4" />
                  <span>Filtres</span>
                  {getActiveFiltersCount() > 0 && (
                    <Badge className="ml-2 bg-[#F2A900] text-white border-none">
                      {getActiveFiltersCount()}
                    </Badge>
                  )}
                </Button>
              </div>

              {/* Filtres avancés */}
              {showFilters && (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-8 pt-8 border-t-2 border-[#EBE3D5]">
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-[#5D4037]/60">Localisation</label>
                    <Select value={selectedLocation} onValueChange={setSelectedLocation}>
                      <SelectTrigger className="border-[#EBE3D5] h-12 rounded-lg font-bold">
                        <SelectValue placeholder="Toutes les régions" />
                      </SelectTrigger>
                      <SelectContent className="border-[#EBE3D5]">
                        <SelectItem value="all" className="font-bold">Toutes les régions</SelectItem>
                        {locations.map(location => (
                          <SelectItem key={location} value={location} className="font-bold">{location}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-[#5D4037]/60">Type de guide</label>
                    <Select value={selectedType} onValueChange={setSelectedType}>
                      <SelectTrigger className="border-[#EBE3D5] h-12 rounded-lg font-bold">
                        <SelectValue placeholder="Tous les types" />
                      </SelectTrigger>
                      <SelectContent className="border-[#EBE3D5]">
                        <SelectItem value="all" className="font-bold">Tous les types</SelectItem>
                        <SelectItem value="Certifiés" className="font-bold">Certifiés</SelectItem>
                        <SelectItem value="Diplômés" className="font-bold">Diplômés</SelectItem>
                        <SelectItem value="Local" className="font-bold">Guide Local</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-[#5D4037]/60">Spécialité</label>
                    <Select value={selectedSpecialty} onValueChange={setSelectedSpecialty}>
                      <SelectTrigger className="border-[#EBE3D5] h-12 rounded-lg font-bold">
                        <SelectValue placeholder="Toutes spécialités" />
                      </SelectTrigger>
                      <SelectContent className="border-[#EBE3D5]">
                        <SelectItem value="all" className="font-bold">Toutes spécialités</SelectItem>
                        {specialties.map(specialty => (
                          <SelectItem key={specialty} value={specialty} className="font-bold">{specialty}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-[#5D4037]/60">Budget (FCFA/Jour)</label>
                    <Select value={selectedPriceRange} onValueChange={setSelectedPriceRange}>
                      <SelectTrigger className="border-[#EBE3D5] h-12 rounded-lg font-bold">
                        <SelectValue placeholder="Tous les prix" />
                      </SelectTrigger>
                      <SelectContent className="border-[#EBE3D5]">
                        <SelectItem value="all" className="font-bold">Tous les prix</SelectItem>
                        <SelectItem value="0-15000" className="font-bold">Moins de 15 000</SelectItem>
                        <SelectItem value="15000-25000" className="font-bold">15 000 - 25 000</SelectItem>
                        <SelectItem value="25000-35000" className="font-bold">25 000 - 35 000</SelectItem>
                        <SelectItem value="35000-999999" className="font-bold">Plus de 35 000</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-[#5D4037]/60">Langue</label>
                    <Select value={selectedLanguage} onValueChange={setSelectedLanguage}>
                      <SelectTrigger className="border-[#EBE3D5] h-12 rounded-lg font-bold">
                        <SelectValue placeholder="Langue" />
                      </SelectTrigger>
                      <SelectContent className="border-[#EBE3D5]">
                        <SelectItem value="all" className="font-bold">Toutes</SelectItem>
                        {languages.map(language => (
                          <SelectItem key={language} value={language} className="font-bold">{language}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-[#5D4037]/60">Évaluation</label>
                    <Select value={selectedRating} onValueChange={setSelectedRating}>
                      <SelectTrigger className="border-[#EBE3D5] h-12 rounded-lg font-bold">
                        <SelectValue placeholder="Note minimum" />
                      </SelectTrigger>
                      <SelectContent className="border-[#EBE3D5]">
                        <SelectItem value="all" className="font-bold">Toutes</SelectItem>
                        <SelectItem value="4" className="font-bold">4★ et plus</SelectItem>
                        <SelectItem value="3" className="font-bold">3★ et plus</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="lg:col-span-2 flex items-end gap-3">
                    <Button variant="outline" onClick={clearFilters} className="flex-1 h-12 border-[#EBE3D5] text-[#5D4037] font-black uppercase tracking-tighter hover:bg-[#EBE3D5]/10 rounded-lg">
                      Réinitialiser
                    </Button>
                    <Button onClick={() => setShowFilters(false)} className="flex-1 h-12 bg-[#2D1B08] text-white font-black uppercase tracking-tighter hover:bg-black rounded-lg">
                      Appliquer
                    </Button>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Filtres de disponibilité rapides */}
          <div className="flex flex-wrap items-center gap-4 py-2 px-1">
            <div className="flex items-center space-x-2 bg-white px-3 py-1.5 rounded-full border border-[#EBE3D5] shadow-sm">
              <Calendar className="h-4 w-4 text-[#F2A900]" />
              <Select value={selectedAvailabilityDay} onValueChange={(value) => {
                setSelectedAvailabilityDay(value);
                setSelectedAvailabilityHour('all');
              }}>
                <SelectTrigger className="border-none bg-transparent shadow-none focus:ring-0 w-auto h-auto min-w-[140px] font-bold text-[#5D4037] text-xs">
                  <SelectValue placeholder="Disponibilité" />
                </SelectTrigger>
                <SelectContent className="border-[#EBE3D5]">
                  <SelectItem value="all" className="text-xs font-bold">Tous les jours</SelectItem>
                  {(() => {
                    const today = new Date();
                    const days = [];
                    for (let i = 0; i < 7; i++) {
                      const date = new Date(today);
                      date.setDate(today.getDate() + i);
                      const dateStr = date.toISOString().split('T')[0];
                      const dayName = date.toLocaleDateString('fr-FR', { weekday: 'long' });
                      days.push(
                        <SelectItem key={dateStr} value={dateStr} className="text-xs font-bold capitalize">
                          {dayName} ({date.toLocaleDateString('fr-FR')})
                        </SelectItem>
                      );
                    }
                    return days;
                  })()}
                </SelectContent>
              </Select>
            </div>

            <div className={`flex items-center space-x-2 bg-white px-3 py-1.5 rounded-full border border-[#EBE3D5] shadow-sm ${selectedAvailabilityDay === 'all' ? 'opacity-50 grayscale cursor-not-allowed' : ''}`}>
              <Clock className="h-4 w-4 text-[#F2A900]" />
              <Select
                value={selectedAvailabilityHour}
                onValueChange={setSelectedAvailabilityHour}
                disabled={selectedAvailabilityDay === 'all'}
              >
                <SelectTrigger className="border-none bg-transparent shadow-none focus:ring-0 w-auto h-auto min-w-[120px] font-bold text-[#5D4037] text-xs">
                  <SelectValue placeholder="Heure" />
                </SelectTrigger>
                <SelectContent className="border-[#EBE3D5]">
                  <SelectItem value="all" className="text-xs font-bold">Toutes heures</SelectItem>
                  {selectedAvailabilityDay !== 'all' &&
                    (() => {
                      const availableHours = new Set<string>();
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
                        <SelectItem key={hour} value={hour} className="text-xs font-bold">
                          {hour}
                        </SelectItem>
                      ));
                    })()
                  }
                </SelectContent>
              </Select>
            </div>

            <div className="ml-auto text-[10px] font-black uppercase tracking-[0.2em] text-[#5D4037]/60">
              {filteredGuides.length} guide{filteredGuides.length > 1 ? 's' : ''} trouvé{filteredGuides.length > 1 ? 's' : ''}
            </div>

            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-auto border-[#EBE3D5] bg-white h-9 rounded-lg font-bold text-xs text-[#2D1B08]">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="border-[#EBE3D5]">
                <SelectItem value="rating" className="text-xs font-bold">Trier par note</SelectItem>
                <SelectItem value="price-low" className="text-xs font-bold">Prix croissant</SelectItem>
                <SelectItem value="price-high" className="text-xs font-bold">Prix décroissant</SelectItem>
                <SelectItem value="name" className="text-xs font-bold">Par nom</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Liste des guides */}
        {filteredGuides.length === 0 ? (
          <Card className="p-16 text-center border-2 border-[#EBE3D5] border-dashed bg-white shadow-none rounded-2xl">
            <Users className="mx-auto h-16 w-16 text-[#EBE3D5] mb-6" />
            <h3 className="text-2xl font-black text-[#2D1B08] mb-3 uppercase tracking-tighter">Aucun guide trouvé</h3>
            <p className="text-[#5D4037] mb-8 font-medium">
              Nous n'avons trouvé aucun guide correspondant à vos critères.
            </p>
            <Button variant="outline" onClick={clearFilters} className="border-[#F2A900] text-[#F2A900] font-black uppercase tracking-tighter hover:bg-[#F2A900]/10 h-12 px-8 rounded-xl">
              Effacer tous les filtres
            </Button>
          </Card>
        ) : (
          <div className={`grid gap-8 ${viewMode === 'grid'
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
    </div>
  );
};

export default GuidesPage;
