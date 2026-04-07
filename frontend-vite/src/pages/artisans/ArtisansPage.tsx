import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Search, MapPin, Star, ShoppingBag, Filter, SlidersHorizontal, ChevronDown } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { mockArtisans } from '@/lib/mockData';

const CATEGORIES = ['Bijoux', 'Sculpture', 'Textile', 'Peinture', 'Cuir', 'Artisanat traditionnel'];
const CITIES = ['Dakar', 'Saint-Louis', 'Thiès', 'Saly', 'Ziguinchor', 'Kolda'];
const PRICE_RANGES = ['Économique', 'Standard', 'Premium', 'Luxe'];

const ArtisansPage: React.FC = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedCity, setSelectedCity] = useState('all');
  const [selectedPrice, setSelectedPrice] = useState('all');

  const handleViewProfile = (id: string) => {
    navigate(`/artisan/${id}`);
  };

  const filteredArtisans = mockArtisans.filter(artisan => {
    const matchesSearch = artisan.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         artisan.specialty.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || artisan.category === selectedCategory;
    const matchesCity = selectedCity === 'all' || artisan.city === selectedCity;
    const matchesPrice = selectedPrice === 'all' || artisan.priceRange === selectedPrice;
    
    return matchesSearch && matchesCategory && matchesCity && matchesPrice;
  });

  return (
    <div className="min-h-screen bg-[#FFFDFB] font-sans">
      {/* Hero Section */}
      <div className="relative h-[400px] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-r from-[#2D1B08]/90 to-[#2D1B08]/40 z-10" />
          <img 
            src="https://images.pexels.com/photos/1181682/pexels-photo-1181682.jpeg?auto=compress&cs=tinysrgb&w=1200" 
            className="w-full h-full object-cover"
            alt="Artisans background"
          />
        </div>
        
        <div className="relative z-20 text-center px-4 max-w-4xl animate-in fade-in slide-in-from-bottom-6 duration-1000">
          <Badge className="bg-[#F2A900] text-white border-none font-black uppercase text-[10px] tracking-widest px-4 py-2 mb-6 shadow-lg shadow-[#F2A900]/20">
            Sénégal Authentique
          </Badge>
          <h1 className="text-5xl md:text-7xl font-black text-white uppercase tracking-tighter mb-6 leading-none">
            Artisans du <span className="text-[#F2A900]">Sénégal</span>
          </h1>
          <p className="text-white/90 text-lg md:text-xl font-medium leading-relaxed max-w-2xl mx-auto italic">
            "Découvrez le savoir-faire unique des créateurs locaux et emportez un morceau de notre culture avec vous."
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-20 relative z-30 pb-20">
        {/* Search & Filters Section */}
        <div className="bg-white p-6 sm:p-8 rounded-[2.5rem] border-2 border-[#EBE3D5] shadow-2xl space-y-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-[#F2A900] w-5 h-5" />
              <Input
                placeholder="Rechercher par nom ou spécialité..."
                className="pl-12 h-14 bg-gray-50/50 border-2 border-transparent focus-visible:ring-2 focus-visible:ring-[#F2A900] rounded-2xl font-bold text-lg transition-all"
                value={searchTerm}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearchTerm(e.target.value)}
              />
            </div>
            <Button className="h-14 bg-[#2D1B08] hover:bg-[#F2A900] text-white font-black uppercase text-sm tracking-widest px-10 rounded-2xl transition-all shadow-xl hover:-translate-y-1">
              Explorer
            </Button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-4 border-t border-[#EBE3D5]/50">
            <div className="space-y-2">
              <Label className="text-[10px] font-black text-[#5D4037]/60 uppercase tracking-widest ml-1">Spécialité</Label>
              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger className="h-12 rounded-xl border-2 border-[#EBE3D5] focus:ring-[#F2A900] font-bold">
                  <div className="flex items-center gap-2">
                    <Filter className="w-4 h-4 text-[#F2A900]" />
                    <SelectValue placeholder="Catégorie" />
                  </div>
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Toutes les catégories</SelectItem>
                  {CATEGORIES.map(cat => (
                    <SelectItem key={cat} value={cat}>{cat}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label className="text-[10px] font-black text-[#5D4037]/60 uppercase tracking-widest ml-1">Localisation</Label>
              <Select value={selectedCity} onValueChange={setSelectedCity}>
                <SelectTrigger className="h-12 rounded-xl border-2 border-[#EBE3D5] focus:ring-[#F2A900] font-bold">
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-[#F2A900]" />
                    <SelectValue placeholder="Ville" />
                  </div>
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Toutes les villes</SelectItem>
                  {CITIES.map(city => (
                    <SelectItem key={city} value={city}>{city}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label className="text-[10px] font-black text-[#5D4037]/60 uppercase tracking-widest ml-1">Gamme de Prix</Label>
              <Select value={selectedPrice} onValueChange={setSelectedPrice}>
                <SelectTrigger className="h-12 rounded-xl border-2 border-[#EBE3D5] focus:ring-[#F2A900] font-bold">
                  <div className="flex items-center gap-2">
                    <SlidersHorizontal className="w-4 h-4 text-[#F2A900]" />
                    <SelectValue placeholder="Prix" />
                  </div>
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Tous les prix</SelectItem>
                  {PRICE_RANGES.map(range => (
                    <SelectItem key={range} value={range}>{range}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        {/* Results Info */}
        <div className="mt-12 mb-8 flex items-center justify-between px-4">
          <p className="text-[#5D4037]/60 font-black text-[10px] uppercase tracking-widest">
            {filteredArtisans.length} Artisan{filteredArtisans.length > 1 ? 's' : ''} trouvé{filteredArtisans.length > 1 ? 's' : ''}
          </p>
          <div className="flex items-center gap-2 text-[#2D1B08] font-bold text-xs cursor-pointer hover:text-[#F2A900] transition-colors">
            Trier par : Popularité <ChevronDown size={14} className="text-[#F2A900]" />
          </div>
        </div>

        {/* Artisans Grid */}
        {filteredArtisans.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredArtisans.map((artisan, index) => (
              <Card 
                key={artisan.id} 
                className="border-2 border-[#EBE3D5] bg-white rounded-[2.5rem] overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-500 group relative animate-in fade-in slide-in-from-bottom-8"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="relative h-64 overflow-hidden">
                  <img
                    src={artisan.image}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    alt={artisan.name}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#2D1B08]/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  
                  <div className="absolute top-6 left-6 flex flex-col gap-2">
                    <Badge className="bg-[#2D1B08] text-white border-none font-black uppercase text-[8px] tracking-[0.2em] px-3 py-1.5 shadow-xl">
                      {artisan.category}
                    </Badge>
                    <Badge className="bg-white text-[#2D1B08] border-none font-black text-[8px] uppercase tracking-widest px-3 py-1.5 shadow-xl">
                      {artisan.priceRange}
                    </Badge>
                  </div>

                  <div className="absolute top-6 right-6">
                    <div className="bg-white/90 backdrop-blur-sm px-3 py-1.5 rounded-2xl flex items-center gap-1.5 shadow-xl border border-[#EBE3D5]">
                      <Star className="w-3.5 h-3.5 text-[#F2A900] fill-current" />
                      <span className="text-xs font-black text-[#2D1B08]">{artisan.rating}</span>
                    </div>
                  </div>
                </div>

                <CardContent className="p-8">
                  <div className="mb-4">
                    <h3 className="text-2xl font-black text-[#2D1B08] uppercase tracking-tighter mb-1 transition-colors group-hover:text-[#F2A900]">
                      {artisan.name}
                    </h3>
                    <p className="text-[#F2A900] font-black uppercase text-[10px] tracking-widest flex items-center gap-2">
                      <span className="w-4 h-[2px] bg-[#F2A900]" />
                      {artisan.specialty}
                    </p>
                  </div>

                  <div className="flex items-center text-[#5D4037]/60 text-xs font-bold mb-6">
                    <MapPin className="w-4 h-4 mr-2 text-[#F2A900]" />
                    {artisan.location}
                  </div>

                  <p className="text-[#5D4037]/70 text-sm leading-relaxed mb-8 line-clamp-2 italic font-medium">
                    "{artisan.description}"
                  </p>

                  <div className="flex items-center justify-between pt-6 border-t border-[#EBE3D5]/50 group-hover:border-[#F2A900]/20 transition-colors">
                    <div className="flex flex-col">
                      <span className="text-[10px] font-black text-[#5D4037]/30 uppercase tracking-widest mb-1">Catalogue</span>
                      <div className="flex items-center text-[#2D1B08] font-black text-sm tracking-widest">
                        <ShoppingBag className="w-4 h-4 mr-2 text-[#F2A900]" />
                        {artisan.products} <span className="ml-1 text-[10px] opacity-40 uppercase">Articles</span>
                      </div>
                    </div>
                    <Button 
                      onClick={() => handleViewProfile(artisan.id)}
                      className="bg-[#2D1B08] hover:bg-[#F2A900] text-white font-black uppercase text-[10px] tracking-widest h-12 px-6 rounded-2xl transition-all shadow-lg hover:shadow-[#F2A900]/20"
                    >
                      Voir profil
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <div className="bg-white p-20 rounded-[3rem] border-2 border-dashed border-[#EBE3D5] text-center max-w-2xl mx-auto shadow-sm">
            <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-6">
              <Search className="w-8 h-8 text-[#EBE3D5]" />
            </div>
            <h3 className="text-2xl font-black text-[#2D1B08] uppercase tracking-tighter mb-2">Aucun Artisan Trouvé</h3>
            <p className="text-[#5D4037]/60 font-medium italic">
              Essayez de modifier vos filtres ou effectuez une nouvelle recherche pour découvrir nos talents.
            </p>
            <Button 
              variant="outline" 
              className="mt-8 border-2 border-[#EBE3D5] rounded-xl font-black uppercase text-xs tracking-widest px-8"
              onClick={() => {
                setSearchTerm('');
                setSelectedCategory('all');
                setSelectedCity('all');
                setSelectedPrice('all');
              }}
            >
              Réinitialiser
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ArtisansPage;
