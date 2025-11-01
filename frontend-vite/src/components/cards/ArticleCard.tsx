import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { 
  Clock, 
  User, 
  Calendar,
  Eye,
  Heart,
  Share2,
  Pencil,
  Trash2
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
  onEdit?: (article: ArticleProps) => void;
  onDelete?: (articleId: string) => void;
}

interface User {
  id: string;
  email: string;
  role: string;
}

// 🔧 Mettre ici l'URL de ton backend
const BACKEND_URL = 'http://localhost:8080';

const ArticleCard: React.FC<ArticleCardProps> = ({ article, onEdit, onDelete }) => {
  const [isFavorited, setIsFavorited] = useState(false);
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);
  const [user, setUser] = useState<User | null>(null);

  // 🔐 Récupération de l'utilisateur connecté
  useEffect(() => {
    const storedUser = localStorage.getItem('lateranga_user');
    if (storedUser) setUser(JSON.parse(storedUser));
  }, []);

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
    console.log('Partager article:', article.id);
  };

  const handleEdit = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (onEdit) onEdit(article);
  };

  const handleDelete = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (onDelete) onDelete(article.id);
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'Histoire': return 'bg-blue-100 text-blue-700';
      case 'Culture': return 'bg-green-100 text-green-700';
      case 'Traditions': return 'bg-purple-100 text-purple-700';
      case 'Art': return 'bg-pink-100 text-pink-700';
      case 'Patrimoine': return 'bg-orange-100 text-orange-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const isAdmin = user?.role === 'ADMIN';

  // ✅ Construction de l'URL de l'image
  const imageUrl = (() => {
    if (!article.image) return undefined;
    if (article.image.startsWith('http')) return article.image; // externe
    const filename = article.image.replace(/^\/?uploads\/articles\//, ''); // supprime le préfixe si présent
    return `${BACKEND_URL}/uploads/articles/${encodeURIComponent(filename)}`;
  })();

  return (
    <>
      <Card className="hover:shadow-xl transition-all duration-300 cursor-pointer group overflow-hidden">
        <div className="relative h-48">
          <img 
            src={imageUrl}
            alt={imageUrl ? article.title : 'IMAGE MISSING'}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
          <div className="absolute top-3 left-3">
            <Badge className={getCategoryColor(article.category)}>
              {article.category}
            </Badge>
          </div>

          <div className="absolute top-3 right-3 flex space-x-1">
            {isAdmin && (
              <>
                <Button
                  size="sm"
                  variant="ghost"
                  className="h-8 w-8 p-0 rounded-full bg-white shadow-md hover:bg-gray-50"
                  onClick={handleEdit}
                  title="Modifier"
                >
                  <Pencil className="h-4 w-4 text-blue-500" />
                </Button>
                <Button
                  size="sm"
                  variant="ghost"
                  className="h-8 w-8 p-0 rounded-full bg-white shadow-md hover:bg-gray-50"
                  onClick={handleDelete}
                  title="Supprimer"
                >
                  <Trash2 className="h-4 w-4 text-red-500" />
                </Button>
              </>
            )}
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

      {/* Modal de détails */}
      {isDetailsModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="relative">
              <img 
                src={imageUrl}
                alt={imageUrl ? article.title : 'IMAGE MISSING'}
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
              <div className="prose max-w-none text-gray-700 leading-relaxed">
                <p>{article.content}</p>
              </div>
              <div className="mt-6 flex justify-end">
                <Button onClick={() => setIsDetailsModalOpen(false)} className="bg-blue-600 hover:bg-blue-700">
                  Fermer
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ArticleCard;
