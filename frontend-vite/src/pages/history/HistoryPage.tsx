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
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Histoire & Culture</h1>
          <p className="text-gray-600 mt-1">Explorez le riche patrimoine sénégalais</p>
        </div>
        <Badge className="bg-blue-100 text-blue-700">
          {filteredArticles.length} article(s)
        </Badge>
      </div>

      {/* Hero Section */}
      <Card className="bg-gradient-to-r from-blue-500 to-blue-600 text-white overflow-hidden">
        <CardContent className="p-0">
          <div className="flex flex-col lg:flex-row">
            <div className="lg:w-1/2 p-8">
              <h2 className="text-2xl font-bold mb-4">Découvrez l'Âme du Sénégal</h2>
              <p className="opacity-90 mb-6">
                Plongez dans l'histoire fascinante du Sénégal, de ses royaumes précoloniaux 
                à sa culture contemporaine vibrante. Chaque article vous rapproche de l'essence 
                de la Teranga sénégalaise.
              </p>
              <div className="flex items-center space-x-4 text-sm">
                <div className="flex items-center">
                  <BookOpen className="h-4 w-4 mr-1" />
                  <span>50+ Articles</span>
                </div>
                <div className="flex items-center">
                  <Clock className="h-4 w-4 mr-1" />
                  <span>Lecture : 5-20 min</span>
                </div>
              </div>
            </div>
            <div className="lg:w-1/2 h-64 lg:h-auto relative">
              <div 
                className="absolute inset-0 bg-cover bg-center"
                style={{
                  backgroundImage: 'url(https://images.pexels.com/photos/8828593/pexels-photo-8828593.jpeg?auto=compress&cs=tinysrgb&w=600)'
                }}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-transparent"></div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Search and Filters */}
      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Rechercher un article..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            
            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger className="w-48">
                <BookOpen className="h-4 w-4 mr-2" />
                <SelectValue placeholder="Catégorie" />
              </SelectTrigger>
              <SelectContent>
                {categories.map(category => (
                  <SelectItem key={category} value={category}>{category}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Articles Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredArticles.map((article) => (
          <ArticleCard key={article.id} article={article} />
        ))}
      </div>

      {filteredArticles.length === 0 && (
        <Card className="text-center py-12">
          <CardContent>
            <div className="text-gray-500 mb-4">
              <BookOpen className="h-12 w-12 mx-auto mb-4" />
              <h3 className="text-lg font-medium">Aucun article trouvé</h3>
              <p className="mt-1">Essayez d'ajuster vos critères de recherche</p>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Featured Categories */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
        {categories.slice(1).map((category) => (
          <Card 
            key={category} 
            className="cursor-pointer hover:shadow-lg transition-shadow"
            onClick={() => setSelectedCategory(category)}
          >
            <CardContent className="p-4 text-center">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-2">
                <BookOpen className="h-6 w-6 text-blue-600" />
              </div>
              <h3 className="font-medium text-sm">{category}</h3>
              <p className="text-xs text-gray-500 mt-1">
                {Math.floor(Math.random() * 10) + 1} article(s)
              </p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default HistoryPage;
