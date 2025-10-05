import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent } from '@/components/ui/card';
import { 
  FileText, 
  Image as ImageIcon, 
  Save, 
  X, 
  Upload,
  Eye,
  Calendar,
  Tag,
  User,
  AlertCircle,
  Plus,
  Trash2,
  ArrowUp,
  ArrowDown,
  Grid3X3
} from 'lucide-react';

interface ArticleData {
  id?: string;
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
}

interface ArticleEditModalProps {
  isOpen: boolean;
  onClose: () => void;
  article?: ArticleData | null;
  onSave: (article: ArticleData) => void;
  mode: 'create' | 'edit';
}

const ArticleEditModal: React.FC<ArticleEditModalProps> = ({
  isOpen,
  onClose,
  article,
  onSave,
  mode
}) => {
  const [formData, setFormData] = useState<ArticleData>({
    title: '',
    category: '',
    author: '',
    status: 'Brouillon',
    publishDate: new Date().toISOString().split('T')[0],
    views: 0,
    likes: 0,
    content: '',
    image: '',
    images: [], // Nouvelle propriété pour la galerie d'images
    tags: [],
    readTime: 0
  });

  const [tagInput, setTagInput] = useState('');
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isPreviewMode, setIsPreviewMode] = useState(false);

  const categories = ['Tourisme', 'Gastronomie', 'Histoire', 'Culture', 'Événements'];
  const statuses = ['Brouillon', 'En attente', 'Publié', 'Archivé'];

  useEffect(() => {
    if (mode === 'edit' && article) {
      setFormData({
        ...article,
        tags: article.tags || [],
        images: article.images || []
      });
    } else {
      setFormData({
        title: '',
        category: '',
        author: '',
        status: 'Brouillon',
        publishDate: new Date().toISOString().split('T')[0],
        views: 0,
        likes: 0,
        content: '',
        image: '',
        images: [],
        tags: [],
        readTime: 0
      });
    }
    setErrors({});
    setIsPreviewMode(false);
  }, [mode, article, isOpen]);

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
    
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: ''
      }));
    }
  };

  const handleAddTag = () => {
    if (tagInput.trim() && !formData.tags?.includes(tagInput.trim())) {
      setFormData(prev => ({
        ...prev,
        tags: [...(prev.tags || []), tagInput.trim()]
      }));
      setTagInput('');
    }
  };

  const handleRemoveTag = (tagToRemove: string) => {
    setFormData(prev => ({
      ...prev,
      tags: prev.tags?.filter(tag => tag !== tagToRemove) || []
    }));
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleAddTag();
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.title.trim()) {
      newErrors.title = 'Le titre est obligatoire';
    }

    if (!formData.category) {
      newErrors.category = 'La catégorie est obligatoire';
    }

    if (!formData.author.trim()) {
      newErrors.author = "L'auteur est obligatoire";
    }

    if (!formData.content.trim()) {
      newErrors.content = 'Le contenu est obligatoire';
    }

    if (!formData.image.trim()) {
      newErrors.image = "L'image est obligatoire";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSave = () => {
    if (validateForm()) {
      const articleToSave = {
        ...formData,
        id: mode === 'edit' && article?.id ? article.id : Date.now().toString(),
        readTime: Math.ceil(formData.content.split(' ').length / 200) // Estimation basée sur 200 mots/minute
      };
      
      onSave(articleToSave);
      onClose();
    }
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setFormData(prev => ({
          ...prev,
          image: event.target?.result as string
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleMultipleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (files.length > 0) {
      const readers = files.map(file => {
        return new Promise<string>((resolve) => {
          const reader = new FileReader();
          reader.onload = (event) => {
            resolve(event.target?.result as string);
          };
          reader.readAsDataURL(file);
        });
      });

      Promise.all(readers).then(imageDataUrls => {
        setFormData(prev => ({
          ...prev,
          images: [...(prev.images || []), ...imageDataUrls]
        }));
      });
    }
  };

  const handleRemoveImage = (index: number) => {
    setFormData(prev => ({
      ...prev,
      images: prev.images?.filter((_, i) => i !== index) || []
    }));
  };

  const handleMoveImage = (fromIndex: number, toIndex: number) => {
    setFormData(prev => {
      const newImages = [...(prev.images || [])];
      const [movedImage] = newImages.splice(fromIndex, 1);
      newImages.splice(toIndex, 0, movedImage);
      return {
        ...prev,
        images: newImages
      };
    });
  };

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

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <FileText className="h-5 w-5 text-blue-500" />
              <span>{mode === 'create' ? 'Nouvel article' : 'Modifier l\'article'}</span>
            </div>
            <div className="flex items-center space-x-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setIsPreviewMode(!isPreviewMode)}
              >
                <Eye className="h-4 w-4 mr-1" />
                {isPreviewMode ? 'Éditer' : 'Aperçu'}
              </Button>
            </div>
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {!isPreviewMode ? (
            // Mode édition
            <div className="space-y-6">
              {/* Informations de base */}
              <Card>
                <CardContent className="p-4">
                  <h3 className="font-semibold mb-4">Informations de base</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="title" className="text-sm font-medium">
                        Titre <span className="text-red-500">*</span>
                      </Label>
                      <Input
                        id="title"
                        value={formData.title}
                        onChange={(e) => handleInputChange('title', e.target.value)}
                        placeholder="Titre de l'article"
                        className={errors.title ? 'border-red-300' : ''}
                      />
                      {errors.title && (
                        <p className="text-red-500 text-xs mt-1">{errors.title}</p>
                      )}
                    </div>

                    <div>
                      <Label htmlFor="author" className="text-sm font-medium">
                        Auteur <span className="text-red-500">*</span>
                      </Label>
                      <Input
                        id="author"
                        value={formData.author}
                        onChange={(e) => handleInputChange('author', e.target.value)}
                        placeholder="Nom de l'auteur"
                        className={errors.author ? 'border-red-300' : ''}
                      />
                      {errors.author && (
                        <p className="text-red-500 text-xs mt-1">{errors.author}</p>
                      )}
                    </div>

                    <div>
                      <Label htmlFor="category" className="text-sm font-medium">
                        Catégorie <span className="text-red-500">*</span>
                      </Label>
                      <Select value={formData.category} onValueChange={(value) => handleInputChange('category', value)}>
                        <SelectTrigger className={errors.category ? 'border-red-300' : ''}>
                          <SelectValue placeholder="Sélectionner une catégorie" />
                        </SelectTrigger>
                        <SelectContent>
                          {categories.map(category => (
                            <SelectItem key={category} value={category}>{category}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      {errors.category && (
                        <p className="text-red-500 text-xs mt-1">{errors.category}</p>
                      )}
                    </div>

                    <div>
                      <Label htmlFor="status" className="text-sm font-medium">Statut</Label>
                      <Select value={formData.status} onValueChange={(value) => handleInputChange('status', value)}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {statuses.map(status => (
                            <SelectItem key={status} value={status}>{status}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <Label htmlFor="publishDate" className="text-sm font-medium">Date de publication</Label>
                      <Input
                        id="publishDate"
                        type="date"
                        value={formData.publishDate}
                        onChange={(e) => handleInputChange('publishDate', e.target.value)}
                      />
                    </div>

                    <div>
                      <Label htmlFor="readTime" className="text-sm font-medium">Temps de lecture (minutes)</Label>
                      <Input
                        id="readTime"
                        type="number"
                        value={formData.readTime}
                        onChange={(e) => handleInputChange('readTime', e.target.value)}
                        placeholder="Estimation automatique"
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Image principale */}
              <Card>
                <CardContent className="p-4">
                  <h3 className="font-semibold mb-4">Image principale de l'article</h3>
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="image" className="text-sm font-medium">
                        URL de l'image <span className="text-red-500">*</span>
                      </Label>
                      <Input
                        id="image"
                        value={formData.image}
                        onChange={(e) => handleInputChange('image', e.target.value)}
                        placeholder="https://exemple.com/image.jpg"
                        className={errors.image ? 'border-red-300' : ''}
                      />
                      {errors.image && (
                        <p className="text-red-500 text-xs mt-1">{errors.image}</p>
                      )}
                    </div>
                    
                    <div>
                      <Label htmlFor="fileUpload" className="text-sm font-medium">Ou télécharger un fichier</Label>
                      <Input
                        id="fileUpload"
                        type="file"
                        accept="image/*"
                        onChange={handleImageUpload}
                        className="cursor-pointer"
                      />
                    </div>

                    {formData.image && (
                      <div className="w-32 h-32 bg-gray-200 rounded-lg overflow-hidden">
                        <img 
                          src={formData.image} 
                          alt="Aperçu"
                          className="w-full h-full object-cover"
                        />
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>

              {/* Galerie d'images */}
              <Card>
                <CardContent className="p-4">
                  <h3 className="font-semibold mb-4 flex items-center">
                    <Grid3X3 className="h-5 w-5 mr-2" />
                    Galerie d'images
                  </h3>
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="multipleImageUpload" className="text-sm font-medium">
                        Ajouter plusieurs images
                      </Label>
                      <Input
                        id="multipleImageUpload"
                        type="file"
                        accept="image/*"
                        multiple
                        onChange={handleMultipleImageUpload}
                        className="cursor-pointer"
                      />
                      <p className="text-xs text-gray-500 mt-1">
                        Vous pouvez sélectionner plusieurs images à la fois
                      </p>
                    </div>

                    {formData.images && formData.images.length > 0 && (
                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-medium">
                            Images ajoutées ({formData.images.length})
                          </span>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => setFormData(prev => ({ ...prev, images: [] }))}
                            className="text-red-600 border-red-600 hover:bg-red-50"
                          >
                            <Trash2 className="h-4 w-4 mr-1" />
                            Tout supprimer
                          </Button>
                        </div>
                        
                        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                          {formData.images.map((image, index) => (
                            <div key={index} className="relative group">
                              <div className="w-full h-24 bg-gray-200 rounded-lg overflow-hidden">
                                <img 
                                  src={image} 
                                  alt={`Image ${index + 1}`}
                                  className="w-full h-full object-cover"
                                />
                              </div>
                              
                              {/* Contrôles d'image */}
                              <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-50 transition-all duration-200 rounded-lg flex items-center justify-center opacity-0 group-hover:opacity-100">
                                <div className="flex space-x-1">
                                  {index > 0 && (
                                    <Button
                                      size="sm"
                                      variant="secondary"
                                      onClick={() => handleMoveImage(index, index - 1)}
                                      className="h-8 w-8 p-0"
                                    >
                                      <ArrowUp className="h-3 w-3" />
                                    </Button>
                                  )}
                                  {index < formData.images!.length - 1 && (
                                    <Button
                                      size="sm"
                                      variant="secondary"
                                      onClick={() => handleMoveImage(index, index + 1)}
                                      className="h-8 w-8 p-0"
                                    >
                                      <ArrowDown className="h-3 w-3" />
                                    </Button>
                                  )}
                                  <Button
                                    size="sm"
                                    variant="destructive"
                                    onClick={() => handleRemoveImage(index)}
                                    className="h-8 w-8 p-0"
                                  >
                                    <X className="h-3 w-3" />
                                  </Button>
                                </div>
                              </div>
                              
                              {/* Numéro d'ordre */}
                              <div className="absolute top-1 left-1 bg-black bg-opacity-70 text-white text-xs px-1.5 py-0.5 rounded">
                                {index + 1}
                              </div>
                            </div>
                          ))}
                        </div>
                        
                        <div className="text-xs text-gray-500">
                          💡 Astuce: Utilisez les flèches pour réorganiser les images. La première image sera l'image principale.
                        </div>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>

              {/* Tags */}
              <Card>
                <CardContent className="p-4">
                  <h3 className="font-semibold mb-4">Tags</h3>
                  <div className="space-y-4">
                    <div className="flex space-x-2">
                      <Input
                        value={tagInput}
                        onChange={(e) => setTagInput(e.target.value)}
                        onKeyPress={handleKeyPress}
                        placeholder="Ajouter un tag"
                      />
                      <Button onClick={handleAddTag} variant="outline">
                        <Tag className="h-4 w-4" />
                      </Button>
                    </div>
                    
                    {formData.tags && formData.tags.length > 0 && (
                      <div className="flex flex-wrap gap-2">
                        {formData.tags.map((tag, index) => (
                          <div key={index} className="flex items-center space-x-1 bg-blue-100 text-blue-700 px-2 py-1 rounded-full text-sm">
                            <span>#{tag}</span>
                            <button
                              onClick={() => handleRemoveTag(tag)}
                              className="text-blue-500 hover:text-blue-700"
                            >
                              <X className="h-3 w-3" />
                            </button>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>

              {/* Contenu */}
              <Card>
                <CardContent className="p-4">
                  <h3 className="font-semibold mb-4">
                    Contenu <span className="text-red-500">*</span>
                  </h3>
                  <Textarea
                    value={formData.content}
                    onChange={(e) => handleInputChange('content', e.target.value)}
                    placeholder="Contenu de l'article..."
                    rows={10}
                    className={errors.content ? 'border-red-300' : ''}
                  />
                  {errors.content && (
                    <p className="text-red-500 text-xs mt-1">{errors.content}</p>
                  )}
                  <p className="text-xs text-gray-500 mt-2">
                    {formData.content.length} caractères • Temps de lecture estimé: {Math.ceil(formData.content.split(' ').length / 200)} minutes
                  </p>
                </CardContent>
              </Card>
            </div>
          ) : (
            // Mode aperçu
            <div className="space-y-6">
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-start space-x-4">
                    {formData.image && (
                      <div className="w-24 h-24 bg-gray-200 rounded-lg flex-shrink-0">
                        <img 
                          src={formData.image} 
                          alt={formData.title}
                          className="w-full h-full object-cover rounded-lg"
                        />
                      </div>
                    )}
                    
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-2">
                        <span className="px-2 py-1 bg-blue-100 text-blue-700 rounded text-sm">
                          {formData.category}
                        </span>
                        <span className={`px-2 py-1 rounded text-sm ${getStatusColor(formData.status)}`}>
                          {formData.status}
                        </span>
                      </div>
                      
                      <h1 className="text-xl font-bold mb-2">{formData.title || 'Titre de l\'article'}</h1>
                      
                      <div className="flex items-center space-x-4 text-sm text-gray-600 mb-3">
                        <div className="flex items-center space-x-1">
                          <User className="h-4 w-4" />
                          <span>{formData.author || 'Auteur'}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Calendar className="h-4 w-4" />
                          <span>{formData.publishDate}</span>
                        </div>
                        {formData.readTime && (
                          <div className="flex items-center space-x-1">
                            <Clock className="h-4 w-4" />
                            <span>{formData.readTime} min</span>
                          </div>
                        )}
                      </div>

                      {formData.tags && formData.tags.length > 0 && (
                        <div className="flex flex-wrap gap-1 mb-3">
                          {formData.tags.map((tag, index) => (
                            <span key={index} className="px-2 py-1 bg-gray-100 text-gray-600 rounded text-xs">
                              #{tag}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                  
                  <div className="mt-4">
                    <p className="text-gray-700 leading-relaxed">
                      {formData.content || 'Contenu de l\'article...'}
                    </p>
                  </div>

                  {/* Galerie d'images dans l'aperçu */}
                  {formData.images && formData.images.length > 0 && (
                    <div className="mt-6">
                      <h4 className="font-semibold mb-3 text-sm text-gray-600">Galerie d'images</h4>
                      <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                        {formData.images.map((image, index) => (
                          <div key={index} className="relative">
                            <div className="w-full h-20 bg-gray-200 rounded-lg overflow-hidden">
                              <img 
                                src={image} 
                                alt={`Image ${index + 1}`}
                                className="w-full h-full object-cover"
                              />
                            </div>
                            <div className="absolute top-1 left-1 bg-black bg-opacity-70 text-white text-xs px-1.5 py-0.5 rounded">
                              {index + 1}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          )}

          {/* Actions */}
          <div className="flex justify-end space-x-3">
            <Button variant="outline" onClick={onClose}>
              Annuler
            </Button>
            <Button onClick={handleSave} className="bg-blue-600 hover:bg-blue-700">
              <Save className="h-4 w-4 mr-2" />
              {mode === 'create' ? 'Créer l\'article' : 'Sauvegarder'}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ArticleEditModal;
