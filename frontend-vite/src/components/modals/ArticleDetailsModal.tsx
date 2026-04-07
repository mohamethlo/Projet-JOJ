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
          <div className="flex flex-col sm:flex-row items-start gap-4 sm:gap-6">
            <div className="w-full sm:w-40 h-48 sm:h-40 bg-[#EBE3D5]/20 rounded-xl flex-shrink-0 overflow-hidden shadow-sm">
              <img 
                src={article.image} 
                alt={article.title}
                className="w-full h-full object-cover"
              />
            </div>
            
            <div className="flex-1 w-full min-w-0">
              <div className="flex flex-wrap items-center gap-2 mb-3">
                <Badge className="bg-[#5D4037]/5 text-[#5D4037] border-none font-black uppercase text-[10px] tracking-tighter">
                  {article.category}
                </Badge>
                <Badge className={`${
                  article.status === 'Publié' ? 'bg-[#1B5E20]/10 text-[#1B5E20]' :
                  article.status === 'En attente' ? 'bg-[#F2A900]/10 text-[#F2A900]' :
                  article.status === 'Brouillon' ? 'bg-[#5D4037]/10 text-[#5D4037]/60' :
                  'bg-red-50 text-red-600'
                } border-none font-black uppercase text-[10px] tracking-tighter`}>
                  {article.status}
                </Badge>
                {article.readTime && (
                  <Badge className="bg-[#EBE3D5]/30 text-[#2D1B08] border-none font-bold text-[10px] tracking-tighter">
                    <Clock className="h-3 w-3 mr-1" />
                    {article.readTime} min
                  </Badge>
                )}
              </div>
              
              <h1 className="text-xl sm:text-2xl font-black text-[#2D1B08] tracking-tighter mb-3 leading-tight break-words">{article.title}</h1>
              
              <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-xs font-bold text-[#5D4037]/70 mb-4">
                <div className="flex items-center space-x-1.5 bg-[#EBE3D5]/20 px-2 py-1 rounded-md border border-[#EBE3D5]/50">
                  <User className="h-3.5 w-3.5 text-[#F2A900]" />
                  <span>{article.author}</span>
                </div>
                <div className="flex items-center space-x-1.5 bg-[#FFFDFB] px-2 py-1 rounded-md border border-[#EBE3D5]/50">
                  <Calendar className="h-3.5 w-3.5" />
                  <span>{article.publishDate}</span>
                </div>
                <div className="flex items-center space-x-1.5">
                  <Eye className="h-3.5 w-3.5" />
                  <span>{article.views} vues</span>
                </div>
                <div className="flex items-center space-x-1.5">
                  <Heart className="h-3.5 w-3.5 text-[#E11D48]" />
                  <span>{article.likes} likes</span>
                </div>
              </div>

              {/* Tags */}
              {article.tags && article.tags.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {article.tags.map((tag, index) => (
                    <Badge key={index} className="bg-[#FFFDFB] text-[#5D4037]/60 border border-[#EBE3D5] font-bold text-[10px]">
                      #{tag}
                    </Badge>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Statistiques détaillées */}
          <Card className="border-2 border-[#EBE3D5] shadow-sm rounded-2xl overflow-hidden">
            <CardContent className="p-4 sm:p-5">
              <h3 className="font-black text-[#2D1B08] uppercase tracking-tighter mb-4 flex items-center text-sm">
                <BarChart3 className="h-5 w-5 text-[#F2A900] mr-2" />
                Statistiques de performance
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
                <div className="text-center p-3 bg-blue-50/50 rounded-xl border border-blue-100">
                  <div className="text-2xl font-black text-blue-600 mb-1">{article.views}</div>
                  <div className="text-[10px] font-bold uppercase tracking-tighter text-blue-600/70">Vues</div>
                </div>
                <div className="text-center p-3 bg-red-50/50 rounded-xl border border-red-100">
                  <div className="text-2xl font-black text-red-600 mb-1">{article.likes}</div>
                  <div className="text-[10px] font-bold uppercase tracking-tighter text-red-600/70">Likes</div>
                </div>
                <div className="text-center p-3 bg-green-50/50 rounded-xl border border-green-100">
                  <div className="text-2xl font-black text-green-600 mb-1">{article.comments || 0}</div>
                  <div className="text-[10px] font-bold uppercase tracking-tighter text-green-600/70">Commentaires</div>
                </div>
                <div className="text-center p-3 bg-purple-50/50 rounded-xl border border-purple-100">
                  <div className="text-2xl font-black text-purple-600 mb-1">{article.shares || 0}</div>
                  <div className="text-[10px] font-bold uppercase tracking-tighter text-purple-600/70">Partages</div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Contenu de l'article */}
          <Card className="border-2 border-[#EBE3D5] shadow-sm rounded-2xl overflow-hidden">
            <CardContent className="p-4 sm:p-5">
              <h3 className="font-black text-[#2D1B08] uppercase tracking-tighter mb-3 text-sm">Contenu de l'article</h3>
              <div className="prose max-w-none">
                <p className="text-[#5D4037]/80 leading-relaxed text-sm sm:text-base whitespace-pre-line">
                  {showFullContent ? article.content : `${article.content.substring(0, 500)}...`}
                </p>
                {article.content.length > 500 && (
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setShowFullContent(!showFullContent)}
                    className="mt-4 border-[#F2A900] text-[#F2A900] hover:bg-[#F2A900] hover:text-white font-black uppercase tracking-tighter text-[10px]"
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
          <div className="flex flex-col sm:flex-row justify-between items-stretch sm:items-center gap-4 pt-2 border-t border-[#EBE3D5]">
            <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 w-full sm:w-auto">
              {onEdit && (
                <Button
                  variant="outline"
                  onClick={() => {
                    onEdit(article.id);
                    onClose();
                  }}
                  className="flex-1 sm:flex-none justify-center items-center space-x-2 border-[#EBE3D5] text-[#2D1B08] hover:bg-[#EBE3D5]/30 font-black uppercase text-xs tracking-tighter h-11"
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
                  className="flex-1 sm:flex-none justify-center bg-[#1B5E20] hover:bg-[#1B5E20]/90 text-white font-black uppercase text-xs tracking-tighter h-11"
                >
                  <CheckCircle className="h-4 w-4 mr-2" />
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
                  className="flex-1 sm:flex-none justify-center border-[#E11D48]/30 text-[#E11D48] hover:bg-[#E11D48]/10 font-black uppercase text-xs tracking-tighter h-11"
                >
                  <Clock className="h-4 w-4 mr-2" />
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
                  className="flex-1 sm:flex-none justify-center border-[#E11D48] text-[#E11D48] hover:bg-[#E11D48] hover:text-white font-black uppercase text-xs tracking-tighter h-11"
                >
                  <Trash2 className="h-4 w-4 mr-2" />
                  <span>Supprimer</span>
                </Button>
              )}
            </div>
            
            <div className="flex w-full sm:w-auto mt-2 sm:mt-0 pt-4 sm:pt-0 border-t sm:border-0 border-[#EBE3D5]">
              <Button
                variant="outline"
                onClick={handleViewOnline}
                className="w-full sm:w-auto justify-center items-center space-x-2 border-[#F2A900] text-[#F2A900] hover:bg-[#F2A900] hover:text-white font-black uppercase text-xs tracking-tighter h-11"
              >
                <ExternalLink className="h-4 w-4" />
                <span>Voir sur le site</span>
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ArticleDetailsModal;
