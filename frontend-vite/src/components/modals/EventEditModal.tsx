import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { 
  Calendar, 
  MapPin, 
  Clock, 
  Users, 
  Save, 
  X,
  Upload,
  Plus,
  Trash2,
  ArrowUp,
  ArrowDown,
  Grid3X3,
  Image as ImageIcon,
  Eye
} from 'lucide-react';

interface EventEditModalProps {
  event: any;
  isOpen: boolean;
  onClose: () => void;
  onSave: (eventData: any) => void;
  mode: 'create' | 'edit';
}

const EventEditModal: React.FC<EventEditModalProps> = ({
  event,
  isOpen,
  onClose,
  onSave,
  mode
}) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: 'Culture',
    type: 'Culturel',
    date: '',
    time: '',
    location: '',
    address: '',
    price: '',
    capacity: '',
    image: '',
    images: [] as string[],
    tags: [] as string[],
    requirements: [] as string[],
    contact: '',
    email: '',
    status: 'Brouillon'
  });

  const [newTag, setNewTag] = useState('');
  const [newRequirement, setNewRequirement] = useState('');
  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    if (event && mode === 'edit') {
      setFormData({
        title: event.title || '',
        description: event.description || '',
        category: event.category || 'Culture',
        type: event.type || 'Culturel',
        date: event.date || '',
        time: event.time || '',
        location: event.location || '',
        address: event.address || '',
        price: event.price || '',
        capacity: event.capacity?.toString() || '',
        image: event.image || '',
        images: event.images || [],
        tags: event.tags || [],
        requirements: event.requirements || [],
        contact: event.contact || '',
        email: event.email || '',
        status: event.status || 'Brouillon'
      });
    } else {
      setFormData({
        title: '',
        description: '',
        category: 'Culture',
        type: 'Culturel',
        date: '',
        time: '',
        location: '',
        address: '',
        price: '',
        capacity: '',
        image: '',
        images: [],
        tags: [],
        requirements: [],
        contact: '',
        email: '',
        status: 'Brouillon'
      });
    }
    setErrors({});
  }, [event, mode, isOpen]);

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.title.trim()) {
      newErrors.title = 'Le titre est requis';
    }

    if (!formData.description.trim()) {
      newErrors.description = 'La description est requise';
    }

    if (!formData.date.trim()) {
      newErrors.date = 'La date est requise';
    }

    if (!formData.time.trim()) {
      newErrors.time = 'L\'heure est requise';
    }

    if (!formData.location.trim()) {
      newErrors.location = 'La localisation est requise';
    }

    if (!formData.address.trim()) {
      newErrors.address = 'L\'adresse est requise';
    }

    if (!formData.price.trim()) {
      newErrors.price = 'Le prix est requis';
    }

    if (!formData.capacity.trim()) {
      newErrors.capacity = 'La capacité est requise';
    } else if (isNaN(Number(formData.capacity)) || Number(formData.capacity) <= 0) {
      newErrors.capacity = 'La capacité doit être un nombre positif';
    }

    if (!formData.contact.trim()) {
      newErrors.contact = 'Le contact est requis';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'L\'email est requis';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'L\'email n\'est pas valide';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    const eventData = {
      ...formData,
      id: mode === 'edit' ? event.id : undefined,
      capacity: Number(formData.capacity),
      image: formData.images.length > 0 ? formData.images[0] : formData.image || ''
    };

    onSave(eventData);
    onClose();
  };

  const handleInputChange = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    // Effacer l'erreur quand l'utilisateur commence à taper
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const handleMultipleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      const newImages: string[] = [];
      Array.from(files).forEach(file => {
        if (file.type.startsWith('image/')) {
          const reader = new FileReader();
          reader.onload = (e) => {
            const result = e.target?.result as string;
            newImages.push(result);
            if (newImages.length === files.length) {
              setFormData(prev => ({ 
                ...prev, 
                images: [...prev.images, ...newImages] 
              }));
            }
          };
          reader.readAsDataURL(file);
        }
      });
    }
  };

  const handleRemoveImage = (index: number) => {
    setFormData(prev => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index)
    }));
  };

  const handleMoveImage = (index: number, direction: 'up' | 'down') => {
    const newImages = [...formData.images];
    const newIndex = direction === 'up' ? index - 1 : index + 1;
    
    if (newIndex >= 0 && newIndex < newImages.length) {
      [newImages[index], newImages[newIndex]] = [newImages[newIndex], newImages[index]];
      setFormData(prev => ({ ...prev, images: newImages }));
    }
  };

  const handleAddTag = () => {
    if (newTag.trim() && !formData.tags.includes(newTag.trim())) {
      setFormData(prev => ({ ...prev, tags: [...prev.tags, newTag.trim()] }));
      setNewTag('');
    }
  };

  const handleRemoveTag = (tagToRemove: string) => {
    setFormData(prev => ({ ...prev, tags: prev.tags.filter(tag => tag !== tagToRemove) }));
  };

  const handleAddRequirement = () => {
    if (newRequirement.trim() && !formData.requirements.includes(newRequirement.trim())) {
      setFormData(prev => ({ ...prev, requirements: [...prev.requirements, newRequirement.trim()] }));
      setNewRequirement('');
    }
  };

  const handleRemoveRequirement = (requirementToRemove: string) => {
    setFormData(prev => ({ ...prev, requirements: prev.requirements.filter(req => req !== requirementToRemove) }));
  };

  const categories = [
    'Musique', 'Sport', 'Gastronomie', 'Éducation', 'Art', 'Culture', 'Business', 'Technologie'
  ];

  const types = [
    'Culturel', 'Sportif', 'Atelier', 'Conférence', 'Exposition', 'Festival', 'Tournoi', 'Formation'
  ];

  const statuses = [
    { value: 'Brouillon', label: 'Brouillon' },
    { value: 'En attente', label: 'En attente' },
    { value: 'Publié', label: 'Publié' },
    { value: 'Annulé', label: 'Annulé' }
  ];

  const locations = [
    'Dakar', 'Saint-Louis', 'Thiès', 'Kaolack', 'Ziguinchor', 'Mbour', 'Touba', 'Diourbel', 'Fatick', 'Kolda', 'Matam', 'Sédhiou', 'Tambacounda'
  ];

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center space-x-2">
            <Calendar className="h-5 w-5" />
            <span>{mode === 'create' ? 'Créer un événement' : 'Modifier l\'événement'}</span>
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Informations de base */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="title">Titre de l'événement *</Label>
              <Input
                id="title"
                value={formData.title}
                onChange={(e) => handleInputChange('title', e.target.value)}
                className={errors.title ? 'border-red-500' : ''}
                placeholder="Titre de votre événement"
              />
              {errors.title && <p className="text-red-500 text-xs mt-1">{errors.title}</p>}
            </div>

            <div>
              <Label htmlFor="category">Catégorie *</Label>
              <Select value={formData.category} onValueChange={(value) => handleInputChange('category', value)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {categories.map(category => (
                    <SelectItem key={category} value={category}>{category}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div>
            <Label htmlFor="description">Description *</Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => handleInputChange('description', e.target.value)}
              className={errors.description ? 'border-red-500' : ''}
              placeholder="Décrivez votre événement en détail..."
              rows={4}
            />
            {errors.description && <p className="text-red-500 text-xs mt-1">{errors.description}</p>}
          </div>

          {/* Date et heure */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <Label htmlFor="date">Date *</Label>
              <Input
                id="date"
                type="date"
                value={formData.date}
                onChange={(e) => handleInputChange('date', e.target.value)}
                className={errors.date ? 'border-red-500' : ''}
              />
              {errors.date && <p className="text-red-500 text-xs mt-1">{errors.date}</p>}
            </div>

            <div>
              <Label htmlFor="time">Heure *</Label>
              <Input
                id="time"
                type="time"
                value={formData.time}
                onChange={(e) => handleInputChange('time', e.target.value)}
                className={errors.time ? 'border-red-500' : ''}
              />
              {errors.time && <p className="text-red-500 text-xs mt-1">{errors.time}</p>}
            </div>

            <div>
              <Label htmlFor="type">Type d'événement</Label>
              <Select value={formData.type} onValueChange={(value) => handleInputChange('type', value)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {types.map(type => (
                    <SelectItem key={type} value={type}>{type}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Localisation */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="location">Localisation *</Label>
              <Select value={formData.location} onValueChange={(value) => handleInputChange('location', value)}>
                <SelectTrigger className={errors.location ? 'border-red-500' : ''}>
                  <SelectValue placeholder="Sélectionner une ville" />
                </SelectTrigger>
                <SelectContent>
                  {locations.map(location => (
                    <SelectItem key={location} value={location}>{location}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {errors.location && <p className="text-red-500 text-xs mt-1">{errors.location}</p>}
            </div>

            <div>
              <Label htmlFor="address">Adresse complète *</Label>
              <Input
                id="address"
                value={formData.address}
                onChange={(e) => handleInputChange('address', e.target.value)}
                className={errors.address ? 'border-red-500' : ''}
                placeholder="Adresse complète de l'événement"
              />
              {errors.address && <p className="text-red-500 text-xs mt-1">{errors.address}</p>}
            </div>
          </div>

          {/* Prix et capacité */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="price">Prix *</Label>
              <Input
                id="price"
                value={formData.price}
                onChange={(e) => handleInputChange('price', e.target.value)}
                className={errors.price ? 'border-red-500' : ''}
                placeholder="Ex: 15,000 FCFA ou Gratuit"
              />
              {errors.price && <p className="text-red-500 text-xs mt-1">{errors.price}</p>}
            </div>

            <div>
              <Label htmlFor="capacity">Capacité maximale *</Label>
              <Input
                id="capacity"
                type="number"
                value={formData.capacity}
                onChange={(e) => handleInputChange('capacity', e.target.value)}
                className={errors.capacity ? 'border-red-500' : ''}
                placeholder="Nombre de participants maximum"
                min="1"
              />
              {errors.capacity && <p className="text-red-500 text-xs mt-1">{errors.capacity}</p>}
            </div>
          </div>

          {/* Galerie d'images */}
          <div className="space-y-4">
            <Label>Galerie d'images</Label>
            
            <div className="space-y-4">
              <div>
                <Label htmlFor="images" className="text-sm text-gray-600">
                  Ajouter plusieurs images
                </Label>
                <Input
                  id="images"
                  type="file"
                  multiple
                  accept="image/*"
                  onChange={handleMultipleImageUpload}
                  className="mt-1"
                />
                <p className="text-xs text-gray-500 mt-1">
                  Sélectionnez plusieurs images pour créer une galerie
                </p>
              </div>

              {formData.images.length > 0 && (
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <h4 className="text-sm font-medium">Images ajoutées ({formData.images.length})</h4>
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => setFormData(prev => ({ ...prev, images: [] }))}
                      className="text-red-600 border-red-600 hover:bg-red-50"
                    >
                      <Trash2 className="h-3 w-3 mr-1" />
                      Tout supprimer
                    </Button>
                  </div>
                  
                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                    {formData.images.map((image, index) => (
                      <div key={index} className="relative group">
                        <div className="aspect-square rounded-lg overflow-hidden border-2 border-gray-200">
                          <img 
                            src={image} 
                            alt={`Image ${index + 1}`}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        
                        {/* Numéro de l'image */}
                        <div className="absolute top-2 left-2 bg-black/70 text-white text-xs px-2 py-1 rounded">
                          {index + 1}
                        </div>
                        
                        {/* Contrôles au survol */}
                        <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center space-x-1">
                          {index > 0 && (
                            <Button
                              type="button"
                              variant="secondary"
                              size="sm"
                              onClick={() => handleMoveImage(index, 'up')}
                              className="h-8 w-8 p-0"
                            >
                              <ArrowUp className="h-3 w-3" />
                            </Button>
                          )}
                          
                          {index < formData.images.length - 1 && (
                            <Button
                              type="button"
                              variant="secondary"
                              size="sm"
                              onClick={() => handleMoveImage(index, 'down')}
                              className="h-8 w-8 p-0"
                            >
                              <ArrowDown className="h-3 w-3" />
                            </Button>
                          )}
                          
                          <Button
                            type="button"
                            variant="destructive"
                            size="sm"
                            onClick={() => handleRemoveImage(index)}
                            className="h-8 w-8 p-0"
                          >
                            <Trash2 className="h-3 w-3" />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  <p className="text-xs text-gray-500">
                    💡 Astuce: La première image sera utilisée comme image principale. Utilisez les flèches pour réorganiser.
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Tags */}
          <div className="space-y-3">
            <Label>Tags</Label>
            <div className="flex space-x-2">
              <Input
                value={newTag}
                onChange={(e) => setNewTag(e.target.value)}
                placeholder="Ajouter un tag"
                onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddTag())}
              />
              <Button type="button" onClick={handleAddTag} variant="outline">
                <Plus className="h-4 w-4" />
              </Button>
            </div>
            {formData.tags.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {formData.tags.map((tag, index) => (
                  <Badge key={index} variant="secondary" className="flex items-center space-x-1">
                    <span>{tag}</span>
                    <button
                      type="button"
                      onClick={() => handleRemoveTag(tag)}
                      className="ml-1 hover:text-red-600"
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </Badge>
                ))}
              </div>
            )}
          </div>

          {/* Exigences */}
          <div className="space-y-3">
            <Label>Exigences pour les participants</Label>
            <div className="flex space-x-2">
              <Input
                value={newRequirement}
                onChange={(e) => setNewRequirement(e.target.value)}
                placeholder="Ajouter une exigence"
                onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddRequirement())}
              />
              <Button type="button" onClick={handleAddRequirement} variant="outline">
                <Plus className="h-4 w-4" />
              </Button>
            </div>
            {formData.requirements.length > 0 && (
              <div className="space-y-2">
                {formData.requirements.map((requirement, index) => (
                  <div key={index} className="flex items-center space-x-2">
                    <span className="text-sm">• {requirement}</span>
                    <button
                      type="button"
                      onClick={() => handleRemoveRequirement(requirement)}
                      className="text-red-600 hover:text-red-800"
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Contact */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="contact">Contact *</Label>
              <Input
                id="contact"
                value={formData.contact}
                onChange={(e) => handleInputChange('contact', e.target.value)}
                className={errors.contact ? 'border-red-500' : ''}
                placeholder="+221 77 123 45 67"
              />
              {errors.contact && <p className="text-red-500 text-xs mt-1">{errors.contact}</p>}
            </div>

            <div>
              <Label htmlFor="email">Email *</Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => handleInputChange('email', e.target.value)}
                className={errors.email ? 'border-red-500' : ''}
                placeholder="email@exemple.com"
              />
              {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
            </div>
          </div>

          {/* Statut */}
          <div>
            <Label htmlFor="status">Statut</Label>
            <Select value={formData.status} onValueChange={(value) => handleInputChange('status', value)}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {statuses.map(status => (
                  <SelectItem key={status.value} value={status.value}>
                    {status.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={onClose}>
              <X className="h-4 w-4 mr-2" />
              Annuler
            </Button>
            <Button type="submit" className="bg-blue-600 hover:bg-blue-700">
              <Save className="h-4 w-4 mr-2" />
              {mode === 'create' ? 'Créer' : 'Sauvegarder'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default EventEditModal;
