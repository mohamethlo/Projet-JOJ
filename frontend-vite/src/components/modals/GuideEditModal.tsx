import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { 
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
  MapPin,
  Clock,
  DollarSign,
  Calendar,
  User
} from 'lucide-react';

interface GuideEditModalProps {
  guide: any;
  isOpen: boolean;
  onClose: () => void;
  onSave: (guideData: any) => void;
  mode: 'create' | 'edit';
}

const GuideEditModal: React.FC<GuideEditModalProps> = ({
  guide,
  isOpen,
  onClose,
  onSave,
  mode
}) => {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    location: 'Dakar',
    specialties: [] as string[],
    languages: [] as string[],
    price: '',
    duration: '',
    maxGroupSize: '',
    image: '',
    images: [] as string[],
    status: 'Disponible',
    availability: [] as string[],
    meetingPoint: '',
    includes: [] as string[],
    requirements: [] as string[],
    contact: '',
    email: ''
  });

  const [newSpecialty, setNewSpecialty] = useState('');
  const [newLanguage, setNewLanguage] = useState('');
  const [newAvailability, setNewAvailability] = useState('');
  const [newInclude, setNewInclude] = useState('');
  const [newRequirement, setNewRequirement] = useState('');
  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    if (guide && mode === 'edit') {
      setFormData({
        name: guide.name || '',
        description: guide.description || '',
        location: guide.location || 'Dakar',
        specialties: guide.specialties || [],
        languages: guide.languages || [],
        price: guide.price || '',
        duration: guide.duration || '',
        maxGroupSize: guide.maxGroupSize?.toString() || '',
        image: guide.image || '',
        images: guide.images || [],
        status: guide.status || 'Disponible',
        availability: guide.availability || [],
        meetingPoint: guide.meetingPoint || '',
        includes: guide.includes || [],
        requirements: guide.requirements || [],
        contact: guide.contact || '',
        email: guide.email || ''
      });
    } else {
      setFormData({
        name: '',
        description: '',
        location: 'Dakar',
        specialties: [],
        languages: [],
        price: '',
        duration: '',
        maxGroupSize: '',
        image: '',
        images: [],
        status: 'Disponible',
        availability: [],
        meetingPoint: '',
        includes: [],
        requirements: [],
        contact: '',
        email: ''
      });
    }
    setErrors({});
  }, [guide, mode, isOpen]);

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Le nom de la visite guidée est requis';
    }

    if (!formData.description.trim()) {
      newErrors.description = 'La description est requise';
    }

    if (!formData.price.trim()) {
      newErrors.price = 'Le prix est requis';
    }

    if (!formData.duration.trim()) {
      newErrors.duration = 'La durée est requise';
    }

    if (!formData.maxGroupSize.trim()) {
      newErrors.maxGroupSize = 'La taille maximale du groupe est requise';
    } else if (isNaN(Number(formData.maxGroupSize)) || Number(formData.maxGroupSize) <= 0) {
      newErrors.maxGroupSize = 'La taille du groupe doit être un nombre positif';
    }

    if (!formData.meetingPoint.trim()) {
      newErrors.meetingPoint = 'Le point de rendez-vous est requis';
    }

    if (!formData.contact.trim()) {
      newErrors.contact = 'Le contact est requis';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'L\'email est requis';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'L\'email n\'est pas valide';
    }

    if (formData.specialties.length === 0) {
      newErrors.specialties = 'Au moins une spécialité est requise';
    }

    if (formData.languages.length === 0) {
      newErrors.languages = 'Au moins une langue est requise';
    }

    if (formData.availability.length === 0) {
      newErrors.availability = 'Au moins un jour de disponibilité est requis';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    const guideData = {
      ...formData,
      id: mode === 'edit' ? guide.id : undefined,
      maxGroupSize: Number(formData.maxGroupSize),
      image: formData.images.length > 0 ? formData.images[0] : formData.image || '',
      rating: mode === 'edit' ? guide.rating : 0,
      reviews: mode === 'edit' ? guide.reviews : 0,
      views: mode === 'edit' ? guide.views : 0,
      likes: mode === 'edit' ? guide.likes : 0,
      bookings: mode === 'edit' ? guide.bookings : 0
    };

    onSave(guideData);
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

  const handleAddSpecialty = () => {
    if (newSpecialty.trim() && !formData.specialties.includes(newSpecialty.trim())) {
      setFormData(prev => ({ ...prev, specialties: [...prev.specialties, newSpecialty.trim()] }));
      setNewSpecialty('');
    }
  };

  const handleRemoveSpecialty = (specialtyToRemove: string) => {
    setFormData(prev => ({ ...prev, specialties: prev.specialties.filter(s => s !== specialtyToRemove) }));
  };

  const handleAddLanguage = () => {
    if (newLanguage.trim() && !formData.languages.includes(newLanguage.trim())) {
      setFormData(prev => ({ ...prev, languages: [...prev.languages, newLanguage.trim()] }));
      setNewLanguage('');
    }
  };

  const handleRemoveLanguage = (languageToRemove: string) => {
    setFormData(prev => ({ ...prev, languages: prev.languages.filter(l => l !== languageToRemove) }));
  };

  const handleAddAvailability = () => {
    if (newAvailability.trim() && !formData.availability.includes(newAvailability.trim())) {
      setFormData(prev => ({ ...prev, availability: [...prev.availability, newAvailability.trim()] }));
      setNewAvailability('');
    }
  };

  const handleRemoveAvailability = (availabilityToRemove: string) => {
    setFormData(prev => ({ ...prev, availability: prev.availability.filter(a => a !== availabilityToRemove) }));
  };

  const handleAddInclude = () => {
    if (newInclude.trim() && !formData.includes.includes(newInclude.trim())) {
      setFormData(prev => ({ ...prev, includes: [...prev.includes, newInclude.trim()] }));
      setNewInclude('');
    }
  };

  const handleRemoveInclude = (includeToRemove: string) => {
    setFormData(prev => ({ ...prev, includes: prev.includes.filter(i => i !== includeToRemove) }));
  };

  const handleAddRequirement = () => {
    if (newRequirement.trim() && !formData.requirements.includes(newRequirement.trim())) {
      setFormData(prev => ({ ...prev, requirements: [...prev.requirements, newRequirement.trim()] }));
      setNewRequirement('');
    }
  };

  const handleRemoveRequirement = (requirementToRemove: string) => {
    setFormData(prev => ({ ...prev, requirements: prev.requirements.filter(r => r !== requirementToRemove) }));
  };

  const locations = [
    'Dakar', 'Saint-Louis', 'Thiès', 'Kaolack', 'Ziguinchor', 'Mbour', 'Touba', 'Diourbel', 'Fatick', 'Kolda', 'Matam', 'Sédhiou', 'Tambacounda'
  ];

  const statuses = [
    { value: 'Disponible', label: 'Disponible' },
    { value: 'Indisponible', label: 'Indisponible' },
    { value: 'Brouillon', label: 'Brouillon' },
    { value: 'Suspendu', label: 'Suspendu' }
  ];

  const days = [
    'Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi', 'Dimanche'
  ];

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center space-x-2">
            <Users className="h-5 w-5" />
            <span>{mode === 'create' ? 'Créer une visite guidée' : 'Modifier la visite guidée'}</span>
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Informations de base */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="name">Nom de la visite guidée *</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => handleInputChange('name', e.target.value)}
                className={errors.name ? 'border-red-500' : ''}
                placeholder="Nom de votre visite guidée"
              />
              {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
            </div>

            <div>
              <Label htmlFor="location">Localisation *</Label>
              <Select value={formData.location} onValueChange={(value) => handleInputChange('location', value)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {locations.map(location => (
                    <SelectItem key={location} value={location}>{location}</SelectItem>
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
              placeholder="Décrivez votre visite guidée en détail..."
              rows={4}
            />
            {errors.description && <p className="text-red-500 text-xs mt-1">{errors.description}</p>}
          </div>

          {/* Prix et durée */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <Label htmlFor="price">Prix *</Label>
              <Input
                id="price"
                value={formData.price}
                onChange={(e) => handleInputChange('price', e.target.value)}
                className={errors.price ? 'border-red-500' : ''}
                placeholder="Ex: 25,000 FCFA"
              />
              {errors.price && <p className="text-red-500 text-xs mt-1">{errors.price}</p>}
            </div>

            <div>
              <Label htmlFor="duration">Durée *</Label>
              <Input
                id="duration"
                value={formData.duration}
                onChange={(e) => handleInputChange('duration', e.target.value)}
                className={errors.duration ? 'border-red-500' : ''}
                placeholder="Ex: 4 heures"
              />
              {errors.duration && <p className="text-red-500 text-xs mt-1">{errors.duration}</p>}
            </div>

            <div>
              <Label htmlFor="maxGroupSize">Taille maximale du groupe *</Label>
              <Input
                id="maxGroupSize"
                type="number"
                value={formData.maxGroupSize}
                onChange={(e) => handleInputChange('maxGroupSize', e.target.value)}
                className={errors.maxGroupSize ? 'border-red-500' : ''}
                placeholder="Nombre maximum de personnes"
                min="1"
              />
              {errors.maxGroupSize && <p className="text-red-500 text-xs mt-1">{errors.maxGroupSize}</p>}
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

          {/* Spécialités */}
          <div className="space-y-3">
            <Label>Spécialités *</Label>
            <div className="flex space-x-2">
              <Input
                value={newSpecialty}
                onChange={(e) => setNewSpecialty(e.target.value)}
                placeholder="Ajouter une spécialité"
                onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddSpecialty())}
              />
              <Button type="button" onClick={handleAddSpecialty} variant="outline">
                <Plus className="h-4 w-4" />
              </Button>
            </div>
            {formData.specialties.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {formData.specialties.map((specialty, index) => (
                  <Badge key={index} variant="secondary" className="flex items-center space-x-1">
                    <span>{specialty}</span>
                    <button
                      type="button"
                      onClick={() => handleRemoveSpecialty(specialty)}
                      className="ml-1 hover:text-red-600"
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </Badge>
                ))}
              </div>
            )}
            {errors.specialties && <p className="text-red-500 text-xs mt-1">{errors.specialties}</p>}
          </div>

          {/* Langues */}
          <div className="space-y-3">
            <Label>Langues parlées *</Label>
            <div className="flex space-x-2">
              <Input
                value={newLanguage}
                onChange={(e) => setNewLanguage(e.target.value)}
                placeholder="Ajouter une langue"
                onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddLanguage())}
              />
              <Button type="button" onClick={handleAddLanguage} variant="outline">
                <Plus className="h-4 w-4" />
              </Button>
            </div>
            {formData.languages.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {formData.languages.map((language, index) => (
                  <Badge key={index} variant="secondary" className="flex items-center space-x-1">
                    <span>{language}</span>
                    <button
                      type="button"
                      onClick={() => handleRemoveLanguage(language)}
                      className="ml-1 hover:text-red-600"
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </Badge>
                ))}
              </div>
            )}
            {errors.languages && <p className="text-red-500 text-xs mt-1">{errors.languages}</p>}
          </div>

          {/* Disponibilité */}
          <div className="space-y-3">
            <Label>Jours de disponibilité *</Label>
            <div className="flex space-x-2">
              <Select value={newAvailability} onValueChange={setNewAvailability}>
                <SelectTrigger className="w-[200px]">
                  <SelectValue placeholder="Sélectionner un jour" />
                </SelectTrigger>
                <SelectContent>
                  {days.map(day => (
                    <SelectItem key={day} value={day}>{day}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Button type="button" onClick={handleAddAvailability} variant="outline">
                <Plus className="h-4 w-4" />
              </Button>
            </div>
            {formData.availability.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {formData.availability.map((day, index) => (
                  <Badge key={index} variant="secondary" className="flex items-center space-x-1">
                    <span>{day}</span>
                    <button
                      type="button"
                      onClick={() => handleRemoveAvailability(day)}
                      className="ml-1 hover:text-red-600"
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </Badge>
                ))}
              </div>
            )}
            {errors.availability && <p className="text-red-500 text-xs mt-1">{errors.availability}</p>}
          </div>

          {/* Point de rendez-vous */}
          <div>
            <Label htmlFor="meetingPoint">Point de rendez-vous *</Label>
            <Input
              id="meetingPoint"
              value={formData.meetingPoint}
              onChange={(e) => handleInputChange('meetingPoint', e.target.value)}
              className={errors.meetingPoint ? 'border-red-500' : ''}
              placeholder="Adresse ou lieu de rendez-vous"
            />
            {errors.meetingPoint && <p className="text-red-500 text-xs mt-1">{errors.meetingPoint}</p>}
          </div>

          {/* Inclus */}
          <div className="space-y-3">
            <Label>Ce qui est inclus</Label>
            <div className="flex space-x-2">
              <Input
                value={newInclude}
                onChange={(e) => setNewInclude(e.target.value)}
                placeholder="Ajouter un élément inclus"
                onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddInclude())}
              />
              <Button type="button" onClick={handleAddInclude} variant="outline">
                <Plus className="h-4 w-4" />
              </Button>
            </div>
            {formData.includes.length > 0 && (
              <div className="space-y-2">
                {formData.includes.map((include, index) => (
                  <div key={index} className="flex items-center space-x-2">
                    <span className="text-sm">• {include}</span>
                    <button
                      type="button"
                      onClick={() => handleRemoveInclude(include)}
                      className="text-red-600 hover:text-red-800"
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </div>
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

export default GuideEditModal;
