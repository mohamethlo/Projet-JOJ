import React, { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Search, BookOpen, Clock } from 'lucide-react';
import ArticleCard from '@/components/cards/ArticleCard';
import { mockArticles } from '@/lib/mockData';

const HistoryPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');

  const categories = ['Tous', 'Histoire', 'Culture', 'Traditions', 'Art', 'Patrimoine'];

  const filteredArticles = mockArticles.filter(article => {
    const matchesSearch = article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      article.excerpt.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = !selectedCategory || selectedCategory === 'Tous' || article.category === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-[#FFFDFB] space-y-8 px-4 py-12">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6">
        <div>
          <h1 className="text-3xl sm:text-4xl font-black text-[#2D1B08] uppercase tracking-tighter">Histoire & Culture</h1>
          <p className="text-[#5D4037] mt-1 text-sm sm:text-lg font-medium">Explorez le riche patrimoine sénégalais</p>
        </div>
        <Badge className="bg-[#1B5E20]/10 text-[#1B5E20] border-[#1B5E20]/20 text-xs sm:text-sm font-black uppercase tracking-widest px-4 py-1.5 shadow-sm">
          {filteredArticles.length} récit(s) trouvé(s)
        </Badge>
      </div>

      {/* Hero Section */}
      <Card className="border-none shadow-2xl rounded-[2rem] overflow-hidden group">
        <CardContent className="p-0">
          <div className="flex flex-col lg:flex-row min-h-[400px]">
            <div className="lg:w-1/2 p-10 md:p-16 bg-[#2D1B08] text-white flex flex-col justify-center relative">
              <div className="absolute top-0 right-0 w-32 h-32 bg-[#F2A900]/10 rounded-bl-[100%]"></div>
              <Badge className="w-fit mb-6 bg-[#F2A900] text-white font-black uppercase tracking-[0.2em] px-3 py-1 border-none">
                Échos du Sénégal
              </Badge>
              <h2 className="text-4xl md:text-5xl font-black mb-6 uppercase tracking-tighter leading-[0.9] group-hover:text-[#F2A900] transition-colors">Découvrez l'Âme du <span className="text-[#F2A900]">Sénégal</span></h2>
              <p className="text-white/80 mb-10 text-lg font-medium leading-relaxed max-w-md">
                Plongez dans l'histoire fascinante du Sénégal, de ses royaumes précoloniaux
                à sa culture contemporaine vibrante. Chaque article vous rapproche de l'essence
                de la Teranga sénégalaise.
              </p>
              <div className="flex items-center space-x-8 text-xs font-black uppercase tracking-widest text-[#F2A900]">
                <div className="flex items-center">
                  <BookOpen className="h-5 w-5 mr-3" />
                  <span>50+ Articles</span>
                </div>
                <div className="flex items-center">
                  <Clock className="h-5 w-5 mr-3" />
                  <span>Lecture : 5-20 min</span>
                </div>
              </div>
            </div>
            <div className="lg:w-1/2 min-h-[300px] lg:min-h-auto relative overflow-hidden">
              <div
                className="absolute inset-0 bg-cover bg-center group-hover:scale-110 transition-transform duration-1000"
                style={{
                  backgroundImage: 'url(https://images.pexels.com/photos/8828593/pexels-photo-8828593.jpeg?auto=compress&cs=tinysrgb&w=600)'
                }}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-[#2D1B08]/40 to-transparent"></div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Search and Filters */}
      <Card className="border-2 border-[#EBE3D5] shadow-sm rounded-2xl overflow-hidden bg-white">
        <CardContent className="p-6">
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-[#F2A900] h-5 w-5" />
              <Input
                placeholder="Rechercher un récit, un personnage..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-12 h-14 border-[#EBE3D5] focus:ring-[#F2A900] focus:border-[#F2A900] rounded-xl bg-[#FFFDFB] text-lg font-medium"
              />
            </div>

            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger className="w-full lg:w-64 h-14 border-[#EBE3D5] focus:ring-[#F2A900] rounded-xl bg-white font-black uppercase tracking-tighter text-[#2D1B08]">
                <BookOpen className="h-5 w-5 mr-3 text-[#F2A900]" />
                <SelectValue placeholder="Thématique" />
              </SelectTrigger>
              <SelectContent className="border-[#EBE3D5]">
                {categories.map(category => (
                  <SelectItem key={category} value={category} className="font-black uppercase tracking-tighter py-3">{category}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Articles Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredArticles.map((article) => (
          <ArticleCard key={article.id} article={article} />
        ))}
      </div>

      {filteredArticles.length === 0 && (
        <Card className="text-center py-24 border-2 border-[#EBE3D5] border-dashed bg-white shadow-none rounded-[2rem]">
          <CardContent>
            <div className="text-[#EBE3D5] mb-6">
              <BookOpen className="h-20 w-20 mx-auto" />
            </div>
            <h3 className="text-2xl font-black text-[#2D1B08] uppercase tracking-tighter mb-2">Aucun récit trouvé</h3>
            <p className="text-[#5D4037]/60 font-medium max-w-xs mx-auto">Essayez d'ajuster vos critères de recherche pour explorer d'autres horizons.</p>
            <Button
              variant="outline"
              onClick={() => { setSearchTerm(''); setSelectedCategory('Tous'); }}
              className="mt-8 border-[#F2A900] text-[#F2A900] font-black uppercase tracking-tighter hover:bg-[#F2A900]/10 h-12 px-8 rounded-xl"
            >
              Effacer la recherche
            </Button>
          </CardContent>
        </Card>
      )}

      {/* Featured Categories */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 mt-16">
        {categories.slice(1).map((category) => (
          <Card
            key={category}
            className={`cursor-pointer transition-all duration-500 overflow-hidden border-2 group rounded-2xl ${selectedCategory === category
              ? 'border-[#F2A900] bg-[#F2A900]/5 shadow-xl'
              : 'border-[#EBE3D5] bg-white hover:border-[#F2A900] hover:shadow-lg'
              }`}
            onClick={() => setSelectedCategory(category)}
          >
            <CardContent className="p-6 text-center">
              <div className={`w-14 h-14 mx-auto mb-4 rounded-xl flex items-center justify-center transition-colors ${selectedCategory === category ? 'bg-[#F2A900] text-white shadow-lg' : 'bg-[#FFFDFB] text-[#F2A900] group-hover:bg-[#F2A900] group-hover:text-white'
                }`}>
                <BookOpen className="h-7 w-7" />
              </div>
              <h3 className="font-black uppercase tracking-tighter text-sm mb-1 text-[#2D1B08]">{category}</h3>
              <p className="text-[10px] font-black text-[#5D4037]/60 uppercase tracking-widest group-hover:text-[#5D4037]">
                {Math.floor(Math.random() * 10) + 1} récit(s)
              </p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default HistoryPage;
