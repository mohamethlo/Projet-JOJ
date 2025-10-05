import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { 
  User, 
  Mail, 
  Phone, 
  MapPin, 
  Shield, 
  Save, 
  X,
  Upload,
  Eye,
  EyeOff
} from 'lucide-react';

interface UserEditModalProps {
  user: any;
  isOpen: boolean;
  onClose: () => void;
  onSave: (userData: any) => void;
  mode: 'create' | 'edit';
}

const UserEditModal: React.FC<UserEditModalProps> = ({
  user,
  isOpen,
  onClose,
  onSave,
  mode
}) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    role: 'tourist',
    status: 'active',
    location: '',
    password: '',
    confirmPassword: '',
    avatar: '',
    verified: false,
    // Champs spécifiques aux guides
    languages: [] as string[],
    specialties: [] as string[],
    rating: 0,
    reviews: 0,
    price: '',
    availability: 'Disponible',
    description: '',
    experience: '',
    toursCompleted: 0,
    responseTime: '',
    badge: '',
    featured: false,
    type: ''
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    if (user && mode === 'edit') {
      setFormData({
        name: user.name || '',
        email: user.email || '',
        phone: user.phone || '',
        role: user.role || 'tourist',
        status: user.status || 'active',
        location: user.location || '',
        password: '',
        confirmPassword: '',
        avatar: user.avatar || '',
        verified: user.verified || false,
        // Champs spécifiques aux guides
        languages: user.languages || [],
        specialties: user.specialties || [],
        rating: user.rating || 0,
        reviews: user.reviews || 0,
        price: user.price || '',
        availability: user.availability || 'Disponible',
        description: user.description || '',
        experience: user.experience || '',
        toursCompleted: user.toursCompleted || 0,
        responseTime: user.responseTime || '',
        badge: user.badge || '',
        featured: user.featured || false,
        type: user.type || ''
      });
    } else {
      setFormData({
        name: '',
        email: '',
        phone: '',
        role: 'tourist',
        status: 'active',
        location: '',
        password: '',
        confirmPassword: '',
        avatar: '',
        verified: false,
        // Champs spécifiques aux guides
        languages: [],
        specialties: [],
        rating: 0,
        reviews: 0,
        price: '',
        availability: 'Disponible',
        description: '',
        experience: '',
        toursCompleted: 0,
        responseTime: '',
        badge: '',
        featured: false,
        type: ''
      });
    }
    setErrors({});
  }, [user, mode, isOpen]);

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Le nom est requis';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'L\'email est requis';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'L\'email n\'est pas valide';
    }

    if (!formData.phone.trim()) {
      newErrors.phone = 'Le téléphone est requis';
    }

    if (!formData.location.trim()) {
      newErrors.location = 'La localisation est requise';
    }

    if (mode === 'create') {
      if (!formData.password.trim()) {
        newErrors.password = 'Le mot de passe est requis';
      } else if (formData.password.length < 6) {
        newErrors.password = 'Le mot de passe doit contenir au moins 6 caractères';
      }

      if (formData.password !== formData.confirmPassword) {
        newErrors.confirmPassword = 'Les mots de passe ne correspondent pas';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    const userData = {
      ...formData,
      id: mode === 'edit' ? user.id : undefined,
      avatar: formData.avatar || `https://ui-avatars.com/api/?name=${encodeURIComponent(formData.name)}&background=random`
    };

    // Retirer le mot de passe de confirmation pour l'envoi
    delete userData.confirmPassword;
    
    onSave(userData);
    onClose();
  };

  const handleInputChange = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    // Effacer l'erreur quand l'utilisateur commence à taper
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const handleLanguageToggle = (language: string) => {
    setFormData(prev => ({
      ...prev,
      languages: prev.languages.includes(language)
        ? prev.languages.filter(l => l !== language)
        : [...prev.languages, language]
    }));
  };

  const handleSpecialtyToggle = (specialty: string) => {
    setFormData(prev => ({
      ...prev,
      specialties: prev.specialties.includes(specialty)
        ? prev.specialties.filter(s => s !== specialty)
        : [...prev.specialties, specialty]
    }));
  };

  const roles = [
    { value: 'admin', label: 'Administrateur' },
    { value: 'guide', label: 'Guide' },
    { value: 'tourist', label: 'Touriste' },
    { value: 'organizer', label: 'Organisateur' },
    { value: 'security', label: 'Sécurité' }
  ];

  const statuses = [
    { value: 'active', label: 'Actif' },
    { value: 'inactive', label: 'Inactif' },
    { value: 'suspended', label: 'Suspendu' }
  ];

  const locations = [
    'Dakar', 'Saint-Louis', 'Thiès', 'Kaolack', 'Ziguinchor', 'Mbour', 'Touba', 'Diourbel', 'Fatick', 'Kolda', 'Matam', 'Sédhiou', 'Tambacounda'
  ];
  
  // Options pour les guides
  const languageOptions = ['Français', 'Anglais', 'Wolof', 'Sérère', 'Pulaar', 'Espagnol', 'Arabe', 'Mandarin'];
  const specialtyOptions = ['Histoire', 'Culture', 'Gastronomie', 'Nature', 'Écologie', 'Randonnée', 'Artisanat', 'Traditions', 'Musique', 'Architecture', 'Art', 'Photographie', 'Sport', 'Aventure', 'Plage', 'Religion', 'Économie', 'Politique'];
  const badgeOptions = ['Guide Premium', 'Guide Certifié', 'Guide Local', 'Guide Sportif', 'Guide Nature', 'Guide Culturel'];
  const typeOptions = ['Certifiés', 'Diplômés', 'Local', 'Formations professionnelles', 'Autodidacte'];
  const availabilityOptions = ['Disponible', 'Indisponible', 'En congé', 'Occupé'];

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center space-x-2">
            <User className="h-5 w-5" />
            <span>{mode === 'create' ? 'Créer un utilisateur' : 'Modifier l\'utilisateur'}</span>
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Avatar et informations de base */}
          <div className="flex items-center space-x-6">
            <div className="flex flex-col items-center space-y-2">
              <Avatar className="h-20 w-20">
                <AvatarImage src={formData.avatar} alt={formData.name} />
                <AvatarFallback>
                  {formData.name ? formData.name.split(' ').map(n => n[0]).join('') : 'U'}
                </AvatarFallback>
              </Avatar>
              <Button
                type="button"
                variant="outline"
                size="sm"
                className="text-xs"
                onClick={() => {
                  const url = prompt('URL de l\'avatar:');
                  if (url) handleInputChange('avatar', url);
                }}
              >
                <Upload className="h-3 w-3 mr-1" />
                Changer
              </Button>
            </div>
            
            <div className="flex-1 space-y-4">
              <div>
                <Label htmlFor="name">Nom complet *</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => handleInputChange('name', e.target.value)}
                  className={errors.name ? 'border-red-500' : ''}
                  placeholder="Nom et prénom"
                />
                {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
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
          </div>

          {/* Informations de contact */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="phone">Téléphone *</Label>
              <Input
                id="phone"
                value={formData.phone}
                onChange={(e) => handleInputChange('phone', e.target.value)}
                className={errors.phone ? 'border-red-500' : ''}
                placeholder="+221 77 123 45 67"
              />
              {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone}</p>}
            </div>

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
          </div>

          {/* Rôle et statut */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="role">Rôle</Label>
              <Select value={formData.role} onValueChange={(value) => handleInputChange('role', value)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {roles.map(role => (
                    <SelectItem key={role.value} value={role.value}>
                      <div className="flex items-center space-x-2">
                        <Shield className="h-4 w-4" />
                        <span>{role.label}</span>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="status">Statut</Label>
              <Select value={formData.status} onValueChange={(value) => handleInputChange('status', value)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {statuses.map(status => (
                    <SelectItem key={status.value} value={status.value}>
                      <Badge variant={status.value === 'active' ? 'default' : status.value === 'suspended' ? 'destructive' : 'secondary'}>
                        {status.label}
                      </Badge>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Mot de passe (seulement pour la création) */}
          {mode === 'create' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="password">Mot de passe *</Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    value={formData.password}
                    onChange={(e) => handleInputChange('password', e.target.value)}
                    className={errors.password ? 'border-red-500' : ''}
                    placeholder="Mot de passe"
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </Button>
                </div>
                {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password}</p>}
              </div>

              <div>
                <Label htmlFor="confirmPassword">Confirmer le mot de passe *</Label>
                <div className="relative">
                  <Input
                    id="confirmPassword"
                    type={showConfirmPassword ? 'text' : 'password'}
                    value={formData.confirmPassword}
                    onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
                    className={errors.confirmPassword ? 'border-red-500' : ''}
                    placeholder="Confirmer le mot de passe"
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  >
                    {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </Button>
                </div>
                {errors.confirmPassword && <p className="text-red-500 text-xs mt-1">{errors.confirmPassword}</p>}
              </div>
            </div>
          )}

          {/* Vérification */}
          <div className="flex items-center space-x-2">
            <input
              type="checkbox"
              id="verified"
              checked={formData.verified}
              onChange={(e) => handleInputChange('verified', e.target.checked)}
              className="rounded border-gray-300"
            />
            <Label htmlFor="verified" className="text-sm">
              Utilisateur vérifié
            </Label>
          </div>

          {/* Champs spécifiques aux guides - seulement en mode modification et si le rôle est guide */}
          {mode === 'edit' && formData.role === 'guide' && (
            <div className="space-y-6 border-t pt-6">
              <h3 className="text-lg font-semibold text-gray-900">Informations du guide</h3>
              
              {/* Description */}
              <div>
                <Label htmlFor="description">Description</Label>
                <textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => handleInputChange('description', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  rows={3}
                  placeholder="Description du guide et de ses services..."
                />
              </div>

              {/* Langues parlées */}
              <div>
                <Label>Langues parlées</Label>
                <div className="flex flex-wrap gap-2 mt-2">
                  {languageOptions.map(language => (
                    <button
                      key={language}
                      type="button"
                      onClick={() => handleLanguageToggle(language)}
                      className={`px-3 py-1 rounded-full text-sm border ${
                        formData.languages.includes(language)
                          ? 'bg-blue-100 border-blue-500 text-blue-700'
                          : 'bg-gray-100 border-gray-300 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      {language}
                    </button>
                  ))}
                </div>
              </div>

              {/* Spécialités */}
              <div>
                <Label>Spécialités</Label>
                <div className="flex flex-wrap gap-2 mt-2">
                  {specialtyOptions.map(specialty => (
                    <button
                      key={specialty}
                      type="button"
                      onClick={() => handleSpecialtyToggle(specialty)}
                      className={`px-3 py-1 rounded-full text-sm border ${
                        formData.specialties.includes(specialty)
                          ? 'bg-green-100 border-green-500 text-green-700'
                          : 'bg-gray-100 border-gray-300 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      {specialty}
                    </button>
                  ))}
                </div>
              </div>

              {/* Informations de tarification et expérience */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="price">Tarif par jour</Label>
                  <Input
                    id="price"
                    value={formData.price}
                    onChange={(e) => handleInputChange('price', e.target.value)}
                    placeholder="25,000 FCFA"
                  />
                </div>

                <div>
                  <Label htmlFor="experience">Années d'expérience</Label>
                  <Input
                    id="experience"
                    value={formData.experience}
                    onChange={(e) => handleInputChange('experience', e.target.value)}
                    placeholder="5 ans"
                  />
                </div>
              </div>

              {/* Statistiques */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <Label htmlFor="rating">Note moyenne</Label>
                  <Input
                    id="rating"
                    type="number"
                    min="0"
                    max="5"
                    step="0.1"
                    value={formData.rating}
                    onChange={(e) => handleInputChange('rating', parseFloat(e.target.value) || 0)}
                    placeholder="4.8"
                  />
                </div>

                <div>
                  <Label htmlFor="reviews">Nombre d'avis</Label>
                  <Input
                    id="reviews"
                    type="number"
                    min="0"
                    value={formData.reviews}
                    onChange={(e) => handleInputChange('reviews', parseInt(e.target.value) || 0)}
                    placeholder="127"
                  />
                </div>

                <div>
                  <Label htmlFor="toursCompleted">Visites effectuées</Label>
                  <Input
                    id="toursCompleted"
                    type="number"
                    min="0"
                    value={formData.toursCompleted}
                    onChange={(e) => handleInputChange('toursCompleted', parseInt(e.target.value) || 0)}
                    placeholder="245"
                  />
                </div>
              </div>

              {/* Informations supplémentaires */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="responseTime">Temps de réponse</Label>
                  <Input
                    id="responseTime"
                    value={formData.responseTime}
                    onChange={(e) => handleInputChange('responseTime', e.target.value)}
                    placeholder="2h"
                  />
                </div>

                <div>
                  <Label htmlFor="availability">Disponibilité</Label>
                  <Select value={formData.availability} onValueChange={(value) => handleInputChange('availability', value)}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {availabilityOptions.map(availability => (
                        <SelectItem key={availability} value={availability}>
                          {availability}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Badge et type */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="badge">Badge</Label>
                  <Select value={formData.badge} onValueChange={(value) => handleInputChange('badge', value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Sélectionner un badge" />
                    </SelectTrigger>
                    <SelectContent>
                      {badgeOptions.map(badge => (
                        <SelectItem key={badge} value={badge}>
                          {badge}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="type">Type de guide</Label>
                  <Select value={formData.type} onValueChange={(value) => handleInputChange('type', value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Sélectionner un type" />
                    </SelectTrigger>
                    <SelectContent>
                      {typeOptions.map(type => (
                        <SelectItem key={type} value={type}>
                          {type}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Guide en vedette */}
              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="featured"
                  checked={formData.featured}
                  onChange={(e) => handleInputChange('featured', e.target.checked)}
                  className="rounded border-gray-300"
                />
                <Label htmlFor="featured" className="text-sm">
                  Guide en vedette
                </Label>
              </div>
            </div>
          )}

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

export default UserEditModal;
