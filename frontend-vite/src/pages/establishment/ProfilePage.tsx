import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useAuth } from '@/context/AuthContext';
import {
  ArrowLeft,
  Save,
  Eye,
  Upload,
  X,
  Plus,
  MapPin,
  Phone,
  Mail,
  Globe,
  Clock,
  Award,
  Image as ImageIcon,
  Camera,
  Utensils,
  Hotel,
  Check
} from 'lucide-react';

const ProfilePage: React.FC = () => {
  const { user } = useAuth();
  const [coverImage, setCoverImage] = useState('https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=1920&h=600&fit=crop');
  const [profileImage, setProfileImage] = useState('/images/nouveau_logo.jpeg');
  const [name, setName] = useState('Le Djoloff Royal');
  const [category, setCategory] = useState('Restaurant');
  const [tagline, setTagline] = useState('Saveurs authentiques du Sénégal dans un cadre royal');
  const [description, setDescription] = useState('Découvrez l\'essence de la cuisine sénégalaise dans notre restaurant emblématique. Depuis 1998, nous perpétuons les traditions culinaires avec passion et authenticité.');
  const [location, setLocation] = useState('Dakar, Plateau');
  const [phone, setPhone] = useState('+221 33 821 45 67');
  const [email, setEmail] = useState('contact@djoloffroyal.sn');
  const [website, setWebsite] = useState('www.djoloffroyal.sn');
  const [amenities, setAmenities] = useState(['WiFi Gratuit', 'Terrasse', 'Parking', 'Climatisation', 'Service Traiteur']);
  const [newAmenity, setNewAmenity] = useState('');
  const [hours, setHours] = useState({
    'Lundi - Vendredi': '12h00 - 23h00',
    'Samedi - Dimanche': '11h00 - 00h00'
  });

  const handleAddAmenity = () => {
    if (newAmenity.trim()) {
      setAmenities([...amenities, newAmenity.trim()]);
      setNewAmenity('');
    }
  };

  const handleRemoveAmenity = (index: number) => {
    setAmenities(amenities.filter((_, i) => i !== index));
  };

  const handleSave = () => {
    // TODO: Implement save functionality
    alert('Modifications enregistrées avec succès !');
  };

  return (
    <div className="min-h-screen bg-[#FFFDFB] pb-12">
      {/* Header with Actions */}
      <div className="bg-white border-b-2 border-[#EBE3D5] sticky top-0 z-20 shadow-sm">
        <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8 py-3 sm:py-4">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3 w-full sm:w-auto">
              <Link to="/dashboard" className="shrink-0">
                <Button variant="ghost" size="sm" className="text-[#5D4037] hover:text-[#2D1B08] h-8 w-8 sm:h-9 sm:w-auto p-0 sm:px-3">
                  <ArrowLeft className="h-4 w-4 sm:mr-2" />
                  <span className="hidden sm:inline">Retour</span>
                </Button>
              </Link>
              <div className="min-w-0">
                <h1 className="text-xl sm:text-2xl font-black text-[#2D1B08] truncate">Modifier mon profil</h1>
                <p className="text-[10px] sm:text-sm text-[#5D4037]/70 truncate">Gérez les informations de votre établissement</p>
              </div>
            </div>
            <div className="flex items-center gap-2 w-full sm:w-auto">
              <Link to="/establishment/1" className="flex-1 sm:flex-initial">
                <Button variant="outline" className="w-full border-[#F2A900] text-[#F2A900] hover:bg-[#F2A900] hover:text-white font-black text-xs sm:text-sm h-8 sm:h-10 px-2 sm:px-4">
                  <Eye className="h-3.5 w-3.5 sm:mr-2" />
                  <span className="xs:inline">Aperçu public</span>
                </Button>
              </Link>
              <Button onClick={handleSave} className="flex-1 sm:flex-initial bg-[#1B5E20] hover:bg-[#15490F] text-white font-black text-xs sm:text-sm h-8 sm:h-10 px-2 sm:px-4">
                <Save className="h-3.5 w-3.5 sm:mr-2" />
                Enregistrer
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Cover & Profile Images */}
            <div className="bg-white rounded-2xl border-2 border-[#EBE3D5] overflow-hidden shadow-sm">
              <div className="p-4 sm:p-6 border-b-2 border-[#EBE3D5]">
                <h2 className="text-lg sm:text-xl font-black text-[#2D1B08] flex items-center gap-2">
                  <Camera className="h-5 w-5 text-[#F2A900]" />
                  Images de profil
                </h2>
              </div>
              <div className="p-4 sm:p-6 space-y-6">
                {/* Cover Image */}
                <div>
                  <Label className="text-sm font-black text-[#2D1B08] mb-2 block">Image de couverture</Label>
                  <div className="relative h-48 rounded-xl overflow-hidden border-2 border-[#EBE3D5] group">
                    <img src={coverImage} alt="Cover" className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                      <Button size="sm" className="bg-white text-[#2D1B08] hover:bg-[#F2A900] hover:text-white">
                        <Upload className="h-4 w-4 mr-2" />
                        Changer
                      </Button>
                    </div>
                  </div>
                </div>

                {/* Profile Image */}
                <div>
                  <Label className="text-sm font-black text-[#2D1B08] mb-2 block">Photo de profil</Label>
                  <div className="flex items-center gap-4">
                    <div className="relative group">
                      <Avatar className="h-24 w-24 border-4 border-white shadow-xl">
                        <AvatarImage src={profileImage} />
                        <AvatarFallback className="text-2xl font-black text-[#F2A900] bg-[#FFFDFB]">
                          {name.charAt(0)}
                        </AvatarFallback>
                      </Avatar>
                      <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity rounded-full flex items-center justify-center">
                        <Upload className="h-6 w-6 text-white" />
                      </div>
                    </div>
                    <div className="flex-1">
                      <p className="text-xs sm:text-sm text-[#5D4037] mb-2 text-center sm:text-left">Format recommandé : JPG ou PNG, 400x400px minimum</p>
                      <Button size="sm" variant="outline" className="w-full sm:w-auto border-[#F2A900] text-[#F2A900]">
                        <Upload className="h-4 w-4 mr-2" />
                        Télécharger une photo
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Basic Information */}
            <div className="bg-white rounded-2xl border-2 border-[#EBE3D5] overflow-hidden shadow-sm">
              <div className="p-4 sm:p-6 border-b-2 border-[#EBE3D5]">
                <h2 className="text-lg sm:text-xl font-black text-[#2D1B08]">Informations générales</h2>
              </div>
              <div className="p-4 sm:p-6 space-y-4">
                <div>
                  <Label htmlFor="name" className="text-sm font-black text-[#2D1B08]">Nom de l'établissement *</Label>
                  <Input
                    id="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="mt-1 border-[#EBE3D5] focus:border-[#F2A900] font-bold"
                  />
                </div>

                <div>
                  <Label htmlFor="category" className="text-sm font-black text-[#2D1B08]">Catégorie *</Label>
                  <div className="mt-2 grid grid-cols-2 gap-3">
                    <Button
                      type="button"
                      variant={category === 'Restaurant' ? 'default' : 'outline'}
                      className={`w-full ${category === 'Restaurant' ? 'bg-[#F2A900] hover:bg-[#D49400]' : 'border-[#EBE3D5]'}`}
                      onClick={() => setCategory('Restaurant')}
                    >
                      <Utensils className="h-4 w-4 mr-2 shrink-0" />
                      <span className="truncate">Restaurant</span>
                    </Button>
                    <Button
                      type="button"
                      variant={category === 'Hôtel' ? 'default' : 'outline'}
                      className={`w-full ${category === 'Hôtel' ? 'bg-[#F2A900] hover:bg-[#D49400]' : 'border-[#EBE3D5]'}`}
                      onClick={() => setCategory('Hôtel')}
                    >
                      <Hotel className="h-4 w-4 mr-2 shrink-0" />
                      <span className="truncate">Hôtel</span>
                    </Button>
                  </div>
                </div>

                <div>
                  <Label htmlFor="tagline" className="text-sm font-black text-[#2D1B08]">Slogan / Tagline *</Label>
                  <Input
                    id="tagline"
                    value={tagline}
                    onChange={(e) => setTagline(e.target.value)}
                    placeholder="Une phrase accrocheuse qui décrit votre établissement"
                    className="mt-1 border-[#EBE3D5] focus:border-[#F2A900]"
                  />
                </div>

                <div>
                  <Label htmlFor="description" className="text-sm font-black text-[#2D1B08]">Description complète *</Label>
                  <Textarea
                    id="description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    rows={4}
                    className="mt-1 border-[#EBE3D5] focus:border-[#F2A900] resize-none"
                  />
                  <p className="text-xs text-[#5D4037]/60 mt-1">{description.length} caractères</p>
                </div>
              </div>
            </div>

            {/* Contact Information */}
            <div className="bg-white rounded-2xl border-2 border-[#EBE3D5] overflow-hidden shadow-sm">
              <div className="p-4 sm:p-6 border-b-2 border-[#EBE3D5]">
                <h2 className="text-lg sm:text-xl font-black text-[#2D1B08]">Coordonnées</h2>
              </div>
              <div className="p-4 sm:p-6 space-y-4">
                <div>
                  <Label htmlFor="location" className="text-sm font-black text-[#2D1B08]">Localisation *</Label>
                  <div className="relative mt-1">
                    <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[#F2A900]" />
                    <Input
                      id="location"
                      value={location}
                      onChange={(e) => setLocation(e.target.value)}
                      className="pl-10 border-[#EBE3D5] focus:border-[#F2A900]"
                    />
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="phone" className="text-sm font-black text-[#2D1B08]">Téléphone *</Label>
                    <div className="relative mt-1">
                      <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[#F2A900]" />
                      <Input
                        id="phone"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        className="pl-10 border-[#EBE3D5] focus:border-[#F2A900]"
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="email" className="text-sm font-black text-[#2D1B08]">Email *</Label>
                    <div className="relative mt-1">
                      <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[#F2A900]" />
                      <Input
                        id="email"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="pl-10 border-[#EBE3D5] focus:border-[#F2A900]"
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <Label htmlFor="website" className="text-sm font-black text-[#2D1B08]">Site web</Label>
                  <div className="relative mt-1">
                    <Globe className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[#F2A900]" />
                    <Input
                      id="website"
                      value={website}
                      onChange={(e) => setWebsite(e.target.value)}
                      placeholder="www.monrestaurant.sn"
                      className="pl-10 border-[#EBE3D5] focus:border-[#F2A900]"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Amenities */}
            <div className="bg-white rounded-2xl border-2 border-[#EBE3D5] overflow-hidden shadow-sm">
              <div className="p-4 sm:p-6 border-b-2 border-[#EBE3D5]">
                <h2 className="text-lg sm:text-xl font-black text-[#2D1B08] flex items-center gap-2">
                  <Award className="h-5 w-5 text-[#F2A900]" />
                  Commodités & Services
                </h2>
              </div>
              <div className="p-4 sm:p-6 space-y-4">
                <div className="flex flex-wrap gap-2">
                  {amenities.map((amenity, index) => (
                    <Badge
                      key={index}
                      variant="outline"
                      className="border-[#1B5E20] text-[#1B5E20] font-bold px-4 py-2 text-sm"
                    >
                      {amenity}
                      <button
                        onClick={() => handleRemoveAmenity(index)}
                        className="ml-2 hover:text-red-600"
                      >
                        <X className="h-3 w-3" />
                      </button>
                    </Badge>
                  ))}
                </div>

                <div className="flex gap-2">
                  <Input
                    value={newAmenity}
                    onChange={(e) => setNewAmenity(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleAddAmenity()}
                    placeholder="Ajouter une commodité..."
                    className="border-[#EBE3D5] focus:border-[#F2A900]"
                  />
                  <Button
                    onClick={handleAddAmenity}
                    className="bg-[#1B5E20] hover:bg-[#15490F] text-white shrink-0"
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    Ajouter
                  </Button>
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Preview Card */}
            <div className="bg-gradient-to-br from-[#F2A900] to-[#D49400] rounded-2xl p-6 text-white shadow-lg">
              <h3 className="text-lg font-black mb-4">Aperçu du profil</h3>
              <div className="space-y-3 text-sm">
                <div className="flex items-center gap-2">
                  <Check className="h-4 w-4" />
                  <span>Badge vérifié actif</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="h-4 w-4" />
                  <span>Profil public visible</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="h-4 w-4" />
                  <span>Réservations activées</span>
                </div>
              </div>
              <Link to="/establishment/1">
                <Button className="w-full mt-4 bg-white text-[#F2A900] hover:bg-[#FFFDFB] font-black">
                  <Eye className="h-4 w-4 mr-2" />
                  Voir comme visiteur
                </Button>
              </Link>
            </div>

            {/* Statistics */}
            <div className="bg-white rounded-2xl border-2 border-[#EBE3D5] overflow-hidden shadow-sm">
              <div className="p-6 border-b-2 border-[#EBE3D5]">
                <h3 className="text-lg font-black text-[#2D1B08]">Statistiques</h3>
              </div>
              <div className="p-6 space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-[#5D4037]">Abonnés</span>
                  <span className="text-xl font-black text-[#2D1B08]">2,847</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-[#5D4037]">Publications</span>
                  <span className="text-xl font-black text-[#2D1B08]">156</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-[#5D4037]">Note moyenne</span>
                  <span className="text-xl font-black text-[#F2A900]">4.8/5</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-[#5D4037]">Avis reçus</span>
                  <span className="text-xl font-black text-[#2D1B08]">342</span>
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-white rounded-2xl border-2 border-[#EBE3D5] overflow-hidden shadow-sm">
              <div className="p-6 border-b-2 border-[#EBE3D5]">
                <h3 className="text-lg font-black text-[#2D1B08]">Actions rapides</h3>
              </div>
              <div className="p-6 space-y-2">
                <Link to="/establishment/create-post">
                  <Button className="w-full justify-start bg-[#F2A900] hover:bg-[#D49400] text-white font-black mb-2 shadow-sm">
                    <Plus className="h-4 w-4 mr-2" />
                    Créer une publication
                  </Button>
                </Link>
                <Link to="/establishment/publications">
                  <Button variant="outline" className="w-full justify-start border-[#EBE3D5] hover:border-[#F2A900]">
                    <ImageIcon className="h-4 w-4 mr-2" />
                    Gérer mes publications
                  </Button>
                </Link>
                <Link to="/establishment/reviews">
                  <Button variant="outline" className="w-full justify-start border-[#EBE3D5] hover:border-[#F2A900]">
                    <Award className="h-4 w-4 mr-2" />
                    Voir les avis
                  </Button>
                </Link>
                <Link to="/establishment/reservations">
                  <Button variant="outline" className="w-full justify-start border-[#EBE3D5] hover:border-[#F2A900]">
                    <Clock className="h-4 w-4 mr-2" />
                    Réservations
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
