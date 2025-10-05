import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { 
  BookOpen, 
  Clock, 
  User, 
  Calendar,
  Eye,
  Heart,
  Share2
} from 'lucide-react';

interface ArticleProps {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  image: string;
  author: string;
  date: string;
  category: string;
  readTime: string;
}

interface ArticleCardProps {
  article: ArticleProps;
}

const ArticleCard: React.FC<ArticleCardProps> = ({ article }) => {
  const [isFavorited, setIsFavorited] = useState(false);
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);

  const handleFavorite = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsFavorited(!isFavorited);
  };

  const handleViewDetails = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsDetailsModalOpen(true);
  };

  const handleShare = (e: React.MouseEvent) => {
    e.stopPropagation();
    // TODO: Implémenter le partage
    console.log('Partager article:', article.id);
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'Histoire':
        return 'bg-blue-100 text-blue-700';
      case 'Culture':
        return 'bg-green-100 text-green-700';
      case 'Traditions':
        return 'bg-purple-100 text-purple-700';
      case 'Art':
        return 'bg-pink-100 text-pink-700';
      case 'Patrimoine':
        return 'bg-orange-100 text-orange-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  return (
    <>
      <Card className="hover:shadow-xl transition-all duration-300 cursor-pointer group overflow-hidden">
        <div className="relative h-48">
          <img 
            src={article.image} 
            alt={article.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
          <div className="absolute top-3 left-3">
            <Badge className={getCategoryColor(article.category)}>
              {article.category}
            </Badge>
          </div>
          <div className="absolute top-3 right-3 flex space-x-1">
            <Button
              size="sm"
              variant="ghost"
              className="h-8 w-8 p-0 rounded-full bg-white shadow-md hover:bg-gray-50"
              onClick={handleFavorite}
            >
              <Heart className={`h-4 w-4 ${isFavorited ? 'fill-red-500 text-red-500' : 'text-gray-400'}`} />
            </Button>
            <Button
              size="sm"
              variant="ghost"
              className="h-8 w-8 p-0 rounded-full bg-white shadow-md hover:bg-gray-50"
              onClick={handleShare}
            >
              <Share2 className="h-4 w-4 text-gray-400" />
            </Button>
          </div>
        </div>
        
        <CardContent className="p-6">
          <div className="space-y-3">
            <h3 className="font-bold text-lg text-gray-900 group-hover:text-blue-600 transition-colors line-clamp-2">
              {article.title}
            </h3>
            
            <p className="text-gray-600 text-sm line-clamp-3">
              {article.excerpt}
            </p>
            
            <div className="flex items-center justify-between text-xs text-gray-500">
              <div className="flex items-center space-x-3">
                <div className="flex items-center">
                  <User className="h-3 w-3 mr-1" />
                  <span>{article.author}</span>
                </div>
                <div className="flex items-center">
                  <Calendar className="h-3 w-3 mr-1" />
                  <span>{new Date(article.date).toLocaleDateString('fr-FR')}</span>
                </div>
              </div>
              <div className="flex items-center">
                <Clock className="h-3 w-3 mr-1" />
                <span>{article.readTime}</span>
              </div>
            </div>
            
            <Button 
              onClick={handleViewDetails}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white"
              size="sm"
            >
              <Eye className="h-4 w-4 mr-2" />
              Lire l'article
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Modal de détails de l'article */}
      {isDetailsModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="relative">
              <img 
                src={article.image} 
                alt={article.title}
                className="w-full h-64 object-cover rounded-t-lg"
              />
              <div className="absolute top-4 left-4">
                <Badge className={getCategoryColor(article.category)}>
                  {article.category}
                </Badge>
              </div>
              <Button
                size="sm"
                variant="ghost"
                className="absolute top-4 right-4 h-8 w-8 p-0 rounded-full bg-white shadow-md hover:bg-gray-50"
                onClick={() => setIsDetailsModalOpen(false)}
              >
                ×
              </Button>
            </div>
            
            <div className="p-6">
              <h1 className="text-2xl font-bold text-gray-900 mb-4">{article.title}</h1>
              
              <div className="flex items-center justify-between text-sm text-gray-500 mb-6">
                <div className="flex items-center space-x-4">
                  <div className="flex items-center">
                    <User className="h-4 w-4 mr-2" />
                    <span>{article.author}</span>
                  </div>
                  <div className="flex items-center">
                    <Calendar className="h-4 w-4 mr-2" />
                    <span>{new Date(article.date).toLocaleDateString('fr-FR')}</span>
                  </div>
                  <div className="flex items-center">
                    <Clock className="h-4 w-4 mr-2" />
                    <span>{article.readTime}</span>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={handleFavorite}
                    className="flex items-center"
                  >
                    <Heart className={`h-4 w-4 mr-1 ${isFavorited ? 'fill-red-500 text-red-500' : 'text-gray-400'}`} />
                    {isFavorited ? 'Favori' : 'Ajouter aux favoris'}
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={handleShare}
                    className="flex items-center"
                  >
                    <Share2 className="h-4 w-4 mr-1" />
                    Partager
                  </Button>
                </div>
              </div>
              
              <div className="prose max-w-none">
                <p className="text-gray-600 leading-relaxed mb-4">
                  {article.excerpt}
                </p>
                <p className="text-gray-600 leading-relaxed">
                  {article.content}
                </p>
              </div>
              
              <div className="mt-8 pt-6 border-t">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <img 
                      src="https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=40" 
                      alt={article.author}
                      className="w-10 h-10 rounded-full"
                    />
                    <div>
                      <p className="font-medium text-sm">{article.author}</p>
                      <p className="text-xs text-gray-500">Auteur</p>
                    </div>
                  </div>
                  <Button 
                    onClick={() => setIsDetailsModalOpen(false)}
                    className="bg-blue-600 hover:bg-blue-700"
                  >
                    Fermer
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ArticleCard;
