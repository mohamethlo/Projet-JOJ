import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { 
  FileText, 
  User, 
  Calendar, 
  Eye, 
  CheckCircle, 
  Download,
  Share2,
  Edit,
  Trash2,
  Clock,
  BarChart3,
  Heart,
  MessageSquare,
  ExternalLink,
  Image as ImageIcon
} from 'lucide-react';

interface ArticleData {
  id: string;
  title: string;
  category: string;
  author: string;
  status: string;
  publishDate: string;
  views: number;
  likes: number;
  content: string;
  image: string;
  images?: string[]; // Galerie d'images supplémentaires
  tags?: string[];
  readTime?: number;
  comments?: number;
  shares?: number;
}

interface ArticleDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  article: ArticleData;
  onEdit?: (articleId: string) => void;
  onDelete?: (articleId: string) => void;
  onPublish?: (articleId: string) => void;
  onArchive?: (articleId: string) => void;
}

const ArticleDetailsModal: React.FC<ArticleDetailsModalProps> = ({
  isOpen,
  onClose,
  article,
  onEdit,
  onDelete,
  onPublish,
  onArchive
}) => {
  const [showFullContent, setShowFullContent] = useState(false);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Publié':
        return 'bg-green-100 text-green-700';
      case 'En attente':
        return 'bg-yellow-100 text-yellow-700';
      case 'Brouillon':
        return 'bg-gray-100 text-gray-700';
      case 'Archivé':
        return 'bg-red-100 text-red-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'Tourisme':
        return 'bg-blue-100 text-blue-700';
      case 'Gastronomie':
        return 'bg-orange-100 text-orange-700';
      case 'Histoire':
        return 'bg-purple-100 text-purple-700';
      case 'Culture':
        return 'bg-pink-100 text-pink-700';
      case 'Événements':
        return 'bg-green-100 text-green-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  const handleDownload = () => {
    const articleData = `
Article: ${article.title}
Auteur: ${article.author}
Catégorie: ${article.category}
Statut: ${article.status}
Date de publication: ${article.publishDate}

Statistiques:
- Vues: ${article.views}
- Likes: ${article.likes}
- Commentaires: ${article.comments || 0}
- Partages: ${article.shares || 0}
- Temps de lecture: ${article.readTime || 'Non spécifié'} minutes

Contenu:
${article.content}

${article.tags ? `Tags: ${article.tags.join(', ')}` : ''}
    `;
    
    const blob = new Blob([articleData], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `article_${article.id}_${article.title.replace(/[^a-zA-Z0-9]/g, '_')}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: article.title,
        text: article.content.substring(0, 200) + '...',
        url: window.location.href
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert('Lien copié dans le presse-papiers !');
    }
  };

  const handleViewOnline = () => {
    // Simuler l'ouverture de l'article en ligne
    window.open(`/article/${article.id}`, '_blank');
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <FileText className="h-5 w-5 text-blue-500" />
              <span>Détails de l'article</span>
            </div>
            <div className="flex items-center space-x-2">
              <Button variant="outline" size="sm" onClick={handleDownload}>
                <Download className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="sm" onClick={handleShare}>
                <Share2 className="h-4 w-4" />
              </Button>
            </div>
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* En-tête de l'article */}
          <div className="flex items-start space-x-6">
            <div className="w-32 h-32 bg-gray-200 rounded-lg flex-shrink-0">
              <img 
                src={article.image} 
                alt={article.title}
                className="w-full h-full object-cover rounded-lg"
              />
            </div>
            
            <div className="flex-1">
              <div className="flex items-center space-x-3 mb-3">
                <Badge className={getCategoryColor(article.category)}>
                  {article.category}
                </Badge>
                <Badge className={getStatusColor(article.status)}>
                  {article.status}
                </Badge>
                {article.readTime && (
                  <Badge variant="outline">
                    <Clock className="h-3 w-3 mr-1" />
                    {article.readTime} min
                  </Badge>
                )}
              </div>
              
              <h1 className="text-2xl font-bold mb-3">{article.title}</h1>
              
              <div className="flex items-center space-x-6 text-sm text-gray-600 mb-4">
                <div className="flex items-center space-x-1">
                  <User className="h-4 w-4" />
                  <span>{article.author}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Calendar className="h-4 w-4" />
                  <span>{article.publishDate}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Eye className="h-4 w-4" />
                  <span>{article.views} vues</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Heart className="h-4 w-4" />
                  <span>{article.likes} likes</span>
                </div>
              </div>

              {/* Tags */}
              {article.tags && article.tags.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {article.tags.map((tag, index) => (
                    <Badge key={index} variant="secondary" className="text-xs">
                      #{tag}
                    </Badge>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Statistiques détaillées */}
          <Card>
            <CardContent className="p-4">
              <h3 className="font-semibold mb-3 flex items-center">
                <BarChart3 className="h-5 w-5 text-purple-500 mr-2" />
                Statistiques de performance
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="text-center p-3 bg-blue-50 rounded-lg">
                  <div className="text-2xl font-bold text-blue-600">{article.views}</div>
                  <div className="text-sm text-blue-600">Vues</div>
                </div>
                <div className="text-center p-3 bg-red-50 rounded-lg">
                  <div className="text-2xl font-bold text-red-600">{article.likes}</div>
                  <div className="text-sm text-red-600">Likes</div>
                </div>
                <div className="text-center p-3 bg-green-50 rounded-lg">
                  <div className="text-2xl font-bold text-green-600">{article.comments || 0}</div>
                  <div className="text-sm text-green-600">Commentaires</div>
                </div>
                <div className="text-center p-3 bg-purple-50 rounded-lg">
                  <div className="text-2xl font-bold text-purple-600">{article.shares || 0}</div>
                  <div className="text-sm text-purple-600">Partages</div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Contenu de l'article */}
          <Card>
            <CardContent className="p-4">
              <h3 className="font-semibold mb-3">Contenu de l'article</h3>
              <div className="prose max-w-none">
                <p className="text-gray-700 leading-relaxed">
                  {showFullContent ? article.content : `${article.content.substring(0, 500)}...`}
                </p>
                {article.content.length > 500 && (
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setShowFullContent(!showFullContent)}
                    className="mt-3"
                  >
                    {showFullContent ? 'Voir moins' : 'Lire la suite'}
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Galerie d'images */}
          {article.images && article.images.length > 0 && (
            <Card>
              <CardContent className="p-4">
                <h3 className="font-semibold mb-3 flex items-center">
                  <ImageIcon className="h-5 w-5 text-purple-500 mr-2" />
                  Galerie d'images ({article.images.length})
                </h3>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                  {article.images.map((image, index) => (
                    <div key={index} className="relative group cursor-pointer">
                      <div className="w-full h-32 bg-gray-200 rounded-lg overflow-hidden">
                        <img 
                          src={image} 
                          alt={`Image ${index + 1}`}
                          className="w-full h-full object-cover transition-transform group-hover:scale-105"
                        />
                      </div>
                      <div className="absolute top-2 left-2 bg-black bg-opacity-70 text-white text-xs px-2 py-1 rounded">
                        {index + 1}
                      </div>
                      <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-200 rounded-lg flex items-center justify-center">
                        <div className="opacity-0 group-hover:opacity-100 transition-opacity">
                          <Eye className="h-6 w-6 text-white" />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <p className="text-xs text-gray-500 mt-3">
                  💡 Cliquez sur une image pour l'agrandir
                </p>
              </CardContent>
            </Card>
          )}

          {/* Actions */}
          <div className="flex justify-between items-center">
            <div className="flex space-x-3">
              <Button
                variant="outline"
                onClick={handleViewOnline}
                className="flex items-center space-x-2"
              >
                <ExternalLink className="h-4 w-4" />
                <span>Voir en ligne</span>
              </Button>
            </div>
            
            <div className="flex space-x-3">
              {onEdit && (
                <Button
                  variant="outline"
                  onClick={() => {
                    onEdit(article.id);
                    onClose();
                  }}
                  className="flex items-center space-x-2"
                >
                  <Edit className="h-4 w-4" />
                  <span>Modifier</span>
                </Button>
              )}
              
              {article.status === 'En attente' && onPublish && (
                <Button
                  onClick={() => {
                    onPublish(article.id);
                    onClose();
                  }}
                  className="bg-green-600 hover:bg-green-700 flex items-center space-x-2"
                >
                  <CheckCircle className="h-4 w-4" />
                  <span>Publier</span>
                </Button>
              )}
              
              {article.status === 'Publié' && onArchive && (
                <Button
                  variant="outline"
                  onClick={() => {
                    onArchive(article.id);
                    onClose();
                  }}
                  className="border-orange-500 text-orange-600 hover:bg-orange-50 flex items-center space-x-2"
                >
                  <Clock className="h-4 w-4" />
                  <span>Archiver</span>
                </Button>
              )}
              
              {onDelete && (
                <Button
                  variant="outline"
                  onClick={() => {
                    if (window.confirm('Êtes-vous sûr de vouloir supprimer cet article ?')) {
                      onDelete(article.id);
                      onClose();
                    }
                  }}
                  className="border-red-500 text-red-600 hover:bg-red-50 flex items-center space-x-2"
                >
                  <Trash2 className="h-4 w-4" />
                  <span>Supprimer</span>
                </Button>
              )}
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ArticleDetailsModal;
