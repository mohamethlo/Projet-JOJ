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
    Utensils,
    ChefHat,
    Coffee,
    Star
} from 'lucide-react';
import AccommodationCard from '@/components/cards/AccommodationCard';
import { mockAccommodations } from '@/lib/mockData';

// ─── Types de cuisine / restauration ─────────────────────────
const RESTAURANT_TYPES = ['Restaurant', 'Fast Food', 'Café', 'Boulangerie', 'Snack'];

const RestaurantPage: React.FC = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedLocation, setSelectedLocation] = useState('');
    const [selectedCuisine, setSelectedCuisine] = useState('');
    const [selectedPriceRange, setSelectedPriceRange] = useState('');
    const [selectedRating, setSelectedRating] = useState('');
    const [sortBy, setSortBy] = useState('featured');
    const [showFilters, setShowFilters] = useState(false);
    const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

    const locations = ['Tous', 'Dakar', 'Saint-Louis', 'Thiès', 'Kaolack', 'Ziguinchor', 'Saloum', 'Casamance'];
    const cuisines = ['Toutes', 'Sénégalaise', 'Africaine', 'Française', 'Libanaise', 'Asiatique', 'Internationale', 'Fusion'];
    const priceRanges = ['Tous', '0-5000', '5000-10000', '10000-20000', '20000+'];
    const ratings = ['Tous', '4.5+', '4.0+', '3.5+', '3.0+'];

    // Filtrer uniquement les établissements de restauration
    const restaurants = mockAccommodations.filter(
        (a) => RESTAURANT_TYPES.includes(a.type) || a.type === 'Restaurant'
    );

    const filtered = restaurants.filter((r) => {
        const matchesSearch =
            r.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            r.description.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesLocation =
            !selectedLocation || selectedLocation === 'Tous' || r.location === selectedLocation;
        const matchesRating =
            !selectedRating || selectedRating === 'Tous' ||
            (selectedRating === '4.5+' && r.rating >= 4.5) ||
            (selectedRating === '4.0+' && r.rating >= 4.0) ||
            (selectedRating === '3.5+' && r.rating >= 3.5) ||
            (selectedRating === '3.0+' && r.rating >= 3.0);

        return matchesSearch && matchesLocation && matchesRating;
    });

    const sorted = [...filtered].sort((a, b) => {
        switch (sortBy) {
            case 'featured': return (b.featured ? 1 : 0) - (a.featured ? 1 : 0);
            case 'rating': return b.rating - a.rating;
            case 'price-low': return parseInt(a.price.replace(/\D/g, '')) - parseInt(b.price.replace(/\D/g, ''));
            case 'price-high': return parseInt(b.price.replace(/\D/g, '')) - parseInt(a.price.replace(/\D/g, ''));
            case 'name': return a.name.localeCompare(b.name);
            default: return 0;
        }
    });

    const clearFilters = () => {
        setSearchTerm('');
        setSelectedLocation('');
        setSelectedCuisine('');
        setSelectedPriceRange('');
        setSelectedRating('');
    };

    const hasActiveFilters = searchTerm || selectedLocation || selectedCuisine || selectedPriceRange || selectedRating;

    return (
        <div className="min-h-screen bg-[#FFFDFB]">
            {/* Hero Banner */}
            <div className="relative overflow-hidden bg-gradient-to-br from-[#C0392B] via-[#E74C3C] to-[#C0392B] text-white">
                <div className="absolute inset-0 opacity-10 pointer-events-none overflow-hidden">
                    <div className="absolute top-4 right-1/4 text-7xl rotate-12 select-none">🍽️</div>
                    <div className="absolute bottom-2 left-1/3 text-5xl -rotate-6 select-none">🥘</div>
                    <div className="absolute top-2 left-10 text-4xl rotate-3 select-none">🍖</div>
                    <div className="absolute bottom-4 right-10 text-4xl -rotate-12 select-none">🧆</div>
                </div>
                <div className="relative container mx-auto px-4 py-8 sm:py-12">
                    <div className="flex items-center gap-3 mb-3">
                        <div className="bg-white/20 backdrop-blur-sm p-2.5 rounded-2xl flex-shrink-0">
                            <Utensils className="h-7 w-7 text-white" />
                        </div>
                        <div className="min-w-0">
                            <h1 className="text-2xl sm:text-3xl md:text-4xl font-black uppercase tracking-tight truncate">
                                Restauration
                            </h1>
                            <p className="text-white/80 text-xs sm:text-sm font-medium mt-0.5 line-clamp-1">
                                Les meilleures saveurs du Sénégal vous attendent
                            </p>
                        </div>
                    </div>
                    <div className="flex flex-wrap gap-3 mt-6">
                        {['Thiéboudienne', 'Yassa Poulet', 'Mafé', 'Ceebu Jën', 'Pastels'].map((dish) => (
                            <span
                                key={dish}
                                className="bg-white/20 backdrop-blur-sm text-white text-xs font-bold px-3 py-1.5 rounded-full border border-white/30"
                            >
                                {dish}
                            </span>
                        ))}
                    </div>
                </div>
            </div>

            <div className="container mx-auto px-4 py-8 space-y-6">
                {/* Barre recherche + contrôles */}
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                    <div className="flex items-center gap-3">
                        <Badge className="bg-red-100 text-red-700 border-red-200 font-bold text-sm px-4 py-1.5">
                            <Utensils className="h-3.5 w-3.5 mr-1.5" />
                            {sorted.length} restaurant(s)
                        </Badge>
                        {hasActiveFilters && (
                            <Button
                                variant="ghost"
                                size="sm"
                                onClick={clearFilters}
                                className="text-red-500 hover:text-red-700 hover:bg-red-50 font-bold text-xs"
                            >
                                <X className="h-3.5 w-3.5 mr-1" />
                                Effacer les filtres
                            </Button>
                        )}
                    </div>
                    <div className="flex items-center gap-2">
                        <Button
                            variant={viewMode === 'grid' ? 'default' : 'outline'}
                            size="sm"
                            onClick={() => setViewMode('grid')}
                            className={viewMode === 'grid' ? 'bg-red-600 hover:bg-red-700 text-white' : 'border-[#EBE3D5] text-[#5D4037]'}
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

                {/* Filtres */}
                <Card className="border-2 border-[#EBE3D5] shadow-sm">
                    <CardContent className="p-5">
                        <div className="flex flex-col lg:flex-row gap-3">
                            {/* Recherche */}
                            <div className="relative flex-1">
                                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-red-500 h-5 w-5" />
                                <Input
                                    placeholder="Rechercher un restaurant, une spécialité..."
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    className="pl-12 h-12 border-[#EBE3D5] focus:ring-red-400 focus:border-red-400 rounded-xl bg-[#FFFDFB] font-medium"
                                />
                            </div>

                            {/* Localisation */}
                            <Select value={selectedLocation} onValueChange={setSelectedLocation}>
                                <SelectTrigger className="w-full lg:w-44 h-12 border-[#EBE3D5] rounded-xl bg-white font-bold text-[#2D1B08]">
                                    <MapPin className="h-4 w-4 mr-2 text-red-500" />
                                    <SelectValue placeholder="Localisation" />
                                </SelectTrigger>
                                <SelectContent className="border-[#EBE3D5]">
                                    {locations.map((loc) => (
                                        <SelectItem key={loc} value={loc} className="font-bold">{loc}</SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>

                            {/* Cuisine */}
                            <Select value={selectedCuisine} onValueChange={setSelectedCuisine}>
                                <SelectTrigger className="w-full lg:w-44 h-12 border-[#EBE3D5] rounded-xl bg-white font-bold text-[#2D1B08]">
                                    <ChefHat className="h-4 w-4 mr-2 text-red-500" />
                                    <SelectValue placeholder="Cuisine" />
                                </SelectTrigger>
                                <SelectContent className="border-[#EBE3D5]">
                                    {cuisines.map((c) => (
                                        <SelectItem key={c} value={c} className="font-bold">{c}</SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>

                            {/* Tri */}
                            <Select value={sortBy} onValueChange={setSortBy}>
                                <SelectTrigger className="w-full lg:w-40 h-12 border-[#EBE3D5] rounded-xl bg-white font-bold text-[#2D1B08]">
                                    <ArrowUpDown className="h-4 w-4 mr-2 text-red-500" />
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

                            {/* Filtres avancés toggle */}
                            <Button
                                variant="outline"
                                onClick={() => setShowFilters(!showFilters)}
                                className="h-12 px-5 border-red-400 text-red-600 font-black uppercase tracking-tighter hover:bg-red-50 rounded-xl w-full lg:w-auto"
                            >
                                <Filter className="h-4 w-4 mr-2" />
                                Filtres
                            </Button>
                        </div>

                        {/* Filtres avancés */}
                        {showFilters && (
                            <div className="mt-5 pt-5 border-t-2 border-[#EBE3D5]">
                                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                                    <div>
                                        <label className="text-xs font-black uppercase tracking-widest text-[#5D4037] mb-2 block">
                                            Budget moyen / personne
                                        </label>
                                        <Select value={selectedPriceRange} onValueChange={setSelectedPriceRange}>
                                            <SelectTrigger className="border-[#EBE3D5] h-11 rounded-lg font-bold">
                                                <SelectValue placeholder="Budget" />
                                            </SelectTrigger>
                                            <SelectContent className="border-[#EBE3D5]">
                                                {priceRanges.map((range) => (
                                                    <SelectItem key={range} value={range} className="font-bold">
                                                        {range === 'Tous' ? 'Tous les prix' : `${range} FCFA`}
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                    </div>

                                    <div>
                                        <label className="text-xs font-black uppercase tracking-widest text-[#5D4037] mb-2 block">
                                            Note minimum
                                        </label>
                                        <Select value={selectedRating} onValueChange={setSelectedRating}>
                                            <SelectTrigger className="border-[#EBE3D5] h-11 rounded-lg font-bold">
                                                <SelectValue placeholder="Note" />
                                            </SelectTrigger>
                                            <SelectContent className="border-[#EBE3D5]">
                                                {ratings.map((r) => (
                                                    <SelectItem key={r} value={r} className="font-bold">
                                                        {r === 'Tous' ? 'Toutes les notes' : `${r} ⭐`}
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                    </div>

                                    <div className="flex items-end">
                                        <Button
                                            variant="outline"
                                            onClick={clearFilters}
                                            className="w-full h-11 border-[#EBE3D5] text-[#5D4037] font-black uppercase tracking-tighter hover:bg-[#EBE3D5]/20 rounded-lg"
                                        >
                                            <X className="h-4 w-4 mr-2" />
                                            Réinitialiser
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        )}
                    </CardContent>
                </Card>

                {/* Catégories rapides */}
                <div className="flex flex-wrap gap-2">
                    {[
                        { icon: Utensils, label: 'Tous les restaurants' },
                        { icon: ChefHat, label: 'Gastronomique' },
                        { icon: Coffee, label: 'Café & Snack' },
                        { icon: Star, label: 'Coup de cœur' },
                    ].map((cat) => (
                        <button
                            key={cat.label}
                            className="flex items-center gap-1.5 bg-white border-2 border-[#EBE3D5] hover:border-red-400 hover:text-red-600 text-[#5D4037] font-bold text-xs px-4 py-2 rounded-full transition-all"
                        >
                            <cat.icon className="h-3.5 w-3.5" />
                            {cat.label}
                        </button>
                    ))}
                </div>

                {/* Grille */}
                {sorted.length > 0 ? (
                    <div className={`grid gap-8 ${viewMode === 'grid'
                        ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3'
                        : 'grid-cols-1'}`}>
                        {sorted.map((restaurant) => (
                            <AccommodationCard
                                key={restaurant.id}
                                accommodation={restaurant}
                                viewMode={viewMode}
                            />
                        ))}
                    </div>
                ) : (
                    <Card className="p-16 text-center border-2 border-[#EBE3D5] border-dashed bg-white shadow-none">
                        <div className="text-[#5D4037]">
                            <Utensils className="h-16 w-16 mx-auto mb-4 text-red-200" />
                            <h3 className="text-xl font-bold mb-2 text-[#2D1B08]">Aucun restaurant trouvé</h3>
                            <p className="font-medium">Essayez de modifier vos critères de recherche.</p>
                            <Button
                                variant="outline"
                                onClick={clearFilters}
                                className="mt-6 border-red-400 text-red-600 font-black uppercase tracking-tighter hover:bg-red-50"
                            >
                                Réinitialiser les filtres
                            </Button>
                        </div>
                    </Card>
                )}
            </div>
        </div>
    );
};

export default RestaurantPage;
