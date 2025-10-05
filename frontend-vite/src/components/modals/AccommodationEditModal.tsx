import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent } from '@/components/ui/card';
import { 
  Building, 
  Save, 
  X, 
  Upload,
  Eye,
  MapPin,
  Phone,
  Mail,
  Globe,
  Clock,
  CheckCircle,
  Plus,
  Trash2,
  Grid3X3
} from 'lucide-react';

interface AccommodationData {
  id?: string;
  name: string;
  type: string;
  location: string;
  description: string;
  price: string;
  rating: number;
  reviews: number;
  availability: string;
  image: string;
  address?: string;
  phone?: string;
  email?: string;
  website?: string;
  checkIn?: string;
  checkOut?: string;
  amenities?: string[];
  policies?: string[];
  images?: string[];
}

interface AccommodationEditModalProps {
  isOpen: boolean;
  onClose: () => void;
  accommodation?: AccommodationData | null;
  onSave: (accommodation: AccommodationData) => void;
  mode: 'create' | 'edit';
}

const AccommodationEditModal: React.FC<AccommodationEditModalProps> = ({
  isOpen,
  onClose,
  accommodation,
  onSave,
  mode
}) => {
  const [formData, setFormData] = useState<AccommodationData>({
    name: '',
    type: 'Hôtel',
    location: 'Dakar',
    description: '',
    price: '',
    rating: 0,
    reviews: 0,
    availability: 'Disponible',
    image: '',
    address: '',
    phone: '',
    email: '',
    website: '',
    checkIn: '',
    checkOut: '',
    amenities: [],
    policies: [],
    images: []
  });

  const [amenityInput, setAmenityInput] = useState('');
  const [policyInput, setPolicyInput] = useState('');
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isPreviewMode, setIsPreviewMode] = useState(false);

  const types = ['Hôtel', 'Restaurant', 'Auberge', 'Appartement', 'Villa', 'Résidence'];
  const locations = ['Dakar', 'Saint-Louis', 'Thiès', 'Kaolack', 'Ziguinchor', 'Touba', 'Mbour'];
  const availabilities = ['Disponible', 'Indisponible', 'En attente', 'Suspendu'];

  useEffect(() => {
    if (mode === 'edit' && accommodation) {
      setFormData({
        ...accommodation,
        amenities: accommodation.amenities || [],
        policies: accommodation.policies || [],
        images: accommodation.images || []
      });
    } else {
      setFormData({
        name: '',
        type: 'Hôtel',
        location: 'Dakar',
        description: '',
        price: '',
        rating: 0,
        reviews: 0,
        availability: 'Disponible',
        image: '',
        address: '',
        phone: '',
        email: '',
        website: '',
        checkIn: '',
        checkOut: '',
        amenities: [],
        policies: [],
        images: []
      });
    }
    setErrors({});
    setIsPreviewMode(false);
  }, [mode, accommodation, isOpen]);

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

  const handleAddAmenity = () => {
    if (amenityInput.trim() && !formData.amenities?.includes(amenityInput.trim())) {
      setFormData(prev => ({
        ...prev,
        amenities: [...(prev.amenities || []), amenityInput.trim()]
      }));
      setAmenityInput('');
    }
  };

  const handleRemoveAmenity = (index: number) => {
    setFormData(prev => ({
      ...prev,
      amenities: prev.amenities?.filter((_, i) => i !== index) || []
    }));
  };

  const handleAddPolicy = () => {
    if (policyInput.trim() && !formData.policies?.includes(policyInput.trim())) {
      setFormData(prev => ({
        ...prev,
        policies: [...(prev.policies || []), policyInput.trim()]
      }));
      setPolicyInput('');
    }
  };

  const handleRemovePolicy = (index: number) => {
    setFormData(prev => ({
      ...prev,
      policies: prev.policies?.filter((_, i) => i !== index) || []
    }));
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Le nom est requis';
    }
    if (!formData.description.trim()) {
      newErrors.description = 'La description est requise';
    }
    if (!formData.price.trim()) {
      newErrors.price = 'Le prix est requis';
    }
    if (!formData.image.trim()) {
      newErrors.image = 'L\'image est requise';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSave = () => {
    if (!validateForm()) {
      return;
    }

    const accommodationToSave = {
      ...formData,
      id: mode === 'edit' && accommodation?.id ? accommodation.id : Date.now().toString(),
      rating: formData.rating || 0,
      reviews: formData.reviews || 0
    };

    onSave(accommodationToSave);
    onClose();
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'Hôtel':
        return <Building className="h-4 w-4" />;
      case 'Restaurant':
        return <Building className="h-4 w-4" />;
      case 'Auberge':
        return <Building className="h-4 w-4" />;
      default:
        return <Building className="h-4 w-4" />;
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center space-x-2">
            <Building className="h-5 w-5 text-blue-600" />
            <span>{mode === 'create' ? 'Ajouter un établissement' : 'Modifier l\'établissement'}</span>
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {!isPreviewMode ? (
            <div className="space-y-6">
              {/* Informations de base */}
              <Card>
                <CardContent className="p-4">
                  <h3 className="font-semibold mb-4">Informations de base</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="name" className="text-sm font-medium">
                        Nom de l'établissement <span className="text-red-500">*</span>
                      </Label>
                      <Input
                        id="name"
                        value={formData.name}
                        onChange={(e) => handleInputChange('name', e.target.value)}
                        placeholder="Nom de l'établissement"
                        className={errors.name ? 'border-red-300' : ''}
                      />
                      {errors.name && (
                        <p className="text-red-500 text-xs mt-1">{errors.name}</p>
                      )}
                    </div>

                    <div>
                      <Label htmlFor="type" className="text-sm font-medium">Type</Label>
                      <Select value={formData.type} onValueChange={(value) => handleInputChange('type', value)}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {types.map(type => (
                            <SelectItem key={type} value={type}>
                              <div className="flex items-center space-x-2">
                                {getTypeIcon(type)}
                                <span>{type}</span>
                              </div>
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <Label htmlFor="location" className="text-sm font-medium">Localisation</Label>
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

                    <div>
                      <Label htmlFor="price" className="text-sm font-medium">
                        Prix <span className="text-red-500">*</span>
                      </Label>
                      <Input
                        id="price"
                        value={formData.price}
                        onChange={(e) => handleInputChange('price', e.target.value)}
                        placeholder="Ex: 50,000 FCFA"
                        className={errors.price ? 'border-red-300' : ''}
                      />
                      {errors.price && (
                        <p className="text-red-500 text-xs mt-1">{errors.price}</p>
                      )}
                    </div>

                    <div>
                      <Label htmlFor="availability" className="text-sm font-medium">Statut</Label>
                      <Select value={formData.availability} onValueChange={(value) => handleInputChange('availability', value)}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {availabilities.map(availability => (
                            <SelectItem key={availability} value={availability}>{availability}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <Label htmlFor="rating" className="text-sm font-medium">Note (0-5)</Label>
                      <Input
                        id="rating"
                        type="number"
                        min="0"
                        max="5"
                        step="0.1"
                        value={formData.rating}
                        onChange={(e) => handleInputChange('rating', e.target.value)}
                        placeholder="4.5"
                      />
                    </div>
                  </div>

                  <div className="mt-4">
                    <Label htmlFor="description" className="text-sm font-medium">
                      Description <span className="text-red-500">*</span>
                    </Label>
                    <Textarea
                      id="description"
                      value={formData.description}
                      onChange={(e) => handleInputChange('description', e.target.value)}
                      placeholder="Description de l'établissement..."
                      rows={4}
                      className={errors.description ? 'border-red-300' : ''}
                    />
                    {errors.description && (
                      <p className="text-red-500 text-xs mt-1">{errors.description}</p>
                    )}
                  </div>
                </CardContent>
              </Card>

              {/* Image principale */}
              <Card>
                <CardContent className="p-4">
                  <h3 className="font-semibold mb-4">Image principale</h3>
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
                              <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-50 transition-all duration-200 rounded-lg flex items-center justify-center opacity-0 group-hover:opacity-100">
                                <Button
                                  size="sm"
                                  variant="destructive"
                                  onClick={() => handleRemoveImage(index)}
                                  className="h-8 w-8 p-0"
                                >
                                  <X className="h-3 w-3" />
                                </Button>
                              </div>
                              <div className="absolute top-1 left-1 bg-black bg-opacity-70 text-white text-xs px-1.5 py-0.5 rounded">
                                {index + 1}
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>

              {/* Informations de contact */}
              <Card>
                <CardContent className="p-4">
                  <h3 className="font-semibold mb-4">Informations de contact</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="address" className="text-sm font-medium">Adresse</Label>
                      <Input
                        id="address"
                        value={formData.address || ''}
                        onChange={(e) => handleInputChange('address', e.target.value)}
                        placeholder="Adresse complète"
                      />
                    </div>

                    <div>
                      <Label htmlFor="phone" className="text-sm font-medium">Téléphone</Label>
                      <Input
                        id="phone"
                        value={formData.phone || ''}
                        onChange={(e) => handleInputChange('phone', e.target.value)}
                        placeholder="+221 XX XXX XX XX"
                      />
                    </div>

                    <div>
                      <Label htmlFor="email" className="text-sm font-medium">Email</Label>
                      <Input
                        id="email"
                        type="email"
                        value={formData.email || ''}
                        onChange={(e) => handleInputChange('email', e.target.value)}
                        placeholder="contact@etablissement.com"
                      />
                    </div>

                    <div>
                      <Label htmlFor="website" className="text-sm font-medium">Site web</Label>
                      <Input
                        id="website"
                        value={formData.website || ''}
                        onChange={(e) => handleInputChange('website', e.target.value)}
                        placeholder="https://www.etablissement.com"
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Horaires */}
              <Card>
                <CardContent className="p-4">
                  <h3 className="font-semibold mb-4">Horaires</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="checkIn" className="text-sm font-medium">Heure d'arrivée</Label>
                      <Input
                        id="checkIn"
                        value={formData.checkIn || ''}
                        onChange={(e) => handleInputChange('checkIn', e.target.value)}
                        placeholder="14:00"
                      />
                    </div>

                    <div>
                      <Label htmlFor="checkOut" className="text-sm font-medium">Heure de départ</Label>
                      <Input
                        id="checkOut"
                        value={formData.checkOut || ''}
                        onChange={(e) => handleInputChange('checkOut', e.target.value)}
                        placeholder="12:00"
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Équipements */}
              <Card>
                <CardContent className="p-4">
                  <h3 className="font-semibold mb-4">Équipements et services</h3>
                  <div className="space-y-4">
                    <div className="flex space-x-2">
                      <Input
                        value={amenityInput}
                        onChange={(e) => setAmenityInput(e.target.value)}
                        placeholder="Ajouter un équipement..."
                        onKeyPress={(e) => e.key === 'Enter' && handleAddAmenity()}
                      />
                      <Button onClick={handleAddAmenity} disabled={!amenityInput.trim()}>
                        <Plus className="h-4 w-4" />
                      </Button>
                    </div>
                    
                    {formData.amenities && formData.amenities.length > 0 && (
                      <div className="flex flex-wrap gap-2">
                        {formData.amenities.map((amenity, index) => (
                          <div key={index} className="flex items-center space-x-1 bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-sm">
                            <span>{amenity}</span>
                            <button
                              onClick={() => handleRemoveAmenity(index)}
                              className="text-blue-600 hover:text-blue-800"
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

              {/* Politiques */}
              <Card>
                <CardContent className="p-4">
                  <h3 className="font-semibold mb-4">Politiques</h3>
                  <div className="space-y-4">
                    <div className="flex space-x-2">
                      <Input
                        value={policyInput}
                        onChange={(e) => setPolicyInput(e.target.value)}
                        placeholder="Ajouter une politique..."
                        onKeyPress={(e) => e.key === 'Enter' && handleAddPolicy()}
                      />
                      <Button onClick={handleAddPolicy} disabled={!policyInput.trim()}>
                        <Plus className="h-4 w-4" />
                      </Button>
                    </div>
                    
                    {formData.policies && formData.policies.length > 0 && (
                      <div className="space-y-2">
                        {formData.policies.map((policy, index) => (
                          <div key={index} className="flex items-center space-x-2 p-2 bg-gray-50 rounded-lg">
                            <span className="flex-1 text-sm">{policy}</span>
                            <button
                              onClick={() => handleRemovePolicy(index)}
                              className="text-red-600 hover:text-red-800"
                            >
                              <X className="h-4 w-4" />
                            </button>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            </div>
          ) : (
            <div className="space-y-6">
              <Card>
                <CardContent className="p-4">
                  <h3 className="font-semibold mb-4">Aperçu de l'établissement</h3>
                  
                  {formData.image && (
                    <div className="w-full h-48 bg-gray-200 rounded-lg overflow-hidden mb-4">
                      <img 
                        src={formData.image} 
                        alt="Aperçu"
                        className="w-full h-full object-cover"
                      />
                    </div>
                  )}
                  
                  <div className="space-y-3">
                    <div>
                      <h4 className="text-lg font-semibold">{formData.name || 'Nom de l\'établissement'}</h4>
                      <p className="text-gray-600">{formData.type} • {formData.location}</p>
                    </div>
                    
                    <div className="flex items-center space-x-4">
                      <span className="text-yellow-600 font-medium">⭐ {formData.rating || 0}/5</span>
                      <span className="text-gray-500">({formData.reviews || 0} avis)</span>
                      <span className="font-semibold text-green-600">{formData.price || 'Prix'}</span>
                    </div>
                    
                    <div>
                      <p className="text-gray-700">
                        {formData.description || 'Description de l\'établissement...'}
                      </p>
                    </div>

                    {formData.amenities && formData.amenities.length > 0 && (
                      <div>
                        <h5 className="font-medium mb-2">Équipements:</h5>
                        <div className="flex flex-wrap gap-2">
                          {formData.amenities.map((amenity, index) => (
                            <span key={index} className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-sm">
                              {amenity}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            </div>
          )}
        </div>

        <DialogFooter className="flex justify-between">
          <div className="flex space-x-2">
            <Button
              variant="outline"
              onClick={() => setIsPreviewMode(!isPreviewMode)}
            >
              <Eye className="h-4 w-4 mr-2" />
              {isPreviewMode ? 'Modifier' : 'Aperçu'}
            </Button>
          </div>
          
          <div className="flex space-x-2">
            <Button variant="outline" onClick={onClose}>
              <X className="h-4 w-4 mr-2" />
              Annuler
            </Button>
            <Button onClick={handleSave} className="bg-blue-600 hover:bg-blue-700">
              <Save className="h-4 w-4 mr-2" />
              {mode === 'create' ? 'Créer' : 'Sauvegarder'}
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default AccommodationEditModal;
