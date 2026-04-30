import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

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
  Check,
  Building2,
  ChevronDown
} from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

import { cn } from '@/lib/utils';

const ProfilePage: React.FC = () => {
  const [coverImage] = useState('https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=1920&h=600&fit=crop');
  const [profileImage] = useState('/images/nouveau_logo.jpeg');
  const [name, setName] = useState('Le Djoloff Royal');
  const [category, setCategory] = useState('Restaurant');
  const [tagline, setTagline] = useState('Saveurs authentiques du Sénégal dans un cadre royal');
  const [description, setDescription] = useState('Découvrez l\'essence de la cuisine sénégalaise dans notre restaurant emblématique. Depuis 1998, nous perpétuons les traditions culinaires avec passion et authenticité.');
  const [location, setLocation] = useState('Dakar, Plateau');
  const [address, setAddress] = useState('12 Rue de Fatick, Dakar');
  const [gps, setGps] = useState({ lat: '14.6937', lng: '-17.4441' });
  const [city, setCity] = useState('Dakar');
  const [region, setRegion] = useState('Dakar');
  const [phone, setPhone] = useState('+221 33 821 45 67');
  const [whatsapp, setWhatsapp] = useState('+221 77 123 45 67');
  const [email, setEmail] = useState('contact@djoloffroyal.sn');
  const [website, setWebsite] = useState('www.djoloffroyal.sn');
  const [slug, setSlug] = useState('le-djoloff-royal');
  const [isActive, setIsActive] = useState(true);
  const [checkIn, setCheckIn] = useState('14:00');
  const [checkOut, setCheckOut] = useState('12:00');
  const [bookingMode, setBookingMode] = useState('En ligne');
  const [hasKitchen, setHasKitchen] = useState(true);
  const [isVerified, setIsVerified] = useState(false);
  const [cancellationPolicy, setCancellationPolicy] = useState('Annulation gratuite jusqu\'à 24h avant l\'arrivée.');
  const [paymentModes, setPaymentModes] = useState(['Wave', 'Orange Money', 'Cash']);
  const [amenities, setAmenities] = useState(['WiFi Gratuit', 'Terrasse', 'Parking', 'Climatisation', 'Cuisine équipée']);
  const [newAmenity, setNewAmenity] = useState('');
  const [isWifiFree, setIsWifiFree] = useState(true);
  const [hasRestaurant, setHasRestaurant] = useState(false);
  const [hasPool, setHasPool] = useState(true);
  const [hasSecurity, setHasSecurity] = useState(true);
  const [hasCleaning, setHasCleaning] = useState(true);
  const [hasTransport, setHasTransport] = useState(false);


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
                  <Label htmlFor="category" className="text-sm font-black text-[#2D1B08]">Type d'hébergement *</Label>
                  <Select value={category} onValueChange={setCategory}>
                    <SelectTrigger className="mt-2 h-12 rounded-xl border-[#EBE3D5] font-bold">
                      <SelectValue placeholder="Sélectionnez le type" />
                    </SelectTrigger>
                    <SelectContent className="rounded-xl border-none shadow-2xl max-h-[300px] overflow-y-auto">
                      <SelectItem value="Hôtel" className="font-bold">Hôtel Classique</SelectItem>
                      <SelectItem value="Résidence" className="font-bold">Résidence</SelectItem>
                      <SelectItem value="Auberge" className="font-bold">Auberge / Maison d'Hôtes</SelectItem>
                      <SelectItem value="Appartement" className="font-bold">Appartement Meublé</SelectItem>
                      <SelectItem value="Villa" className="font-bold">Villa / Location Saisonnière</SelectItem>
                      <SelectItem value="Lodge" className="font-bold">Lodge / Écolodge</SelectItem>
                      <SelectItem value="Campement" className="font-bold">Campement</SelectItem>
                      <SelectItem value="Studio" className="font-bold">Studio</SelectItem>
                      <SelectItem value="Dortoir" className="font-bold">Dortoir</SelectItem>
                      <SelectItem value="Résidence hôtelière" className="font-bold">Résidence Hôtelière</SelectItem>
                    </SelectContent>
                  </Select>
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
                    rows={6}
                    placeholder="Présentez votre établissement en détails (min 100 mots)..."
                    className="mt-1 border-[#EBE3D5] focus:border-[#F2A900] resize-none"
                  />
                  <div className="flex justify-between mt-1">
                    <p className="text-[10px] font-bold text-[#5D4037]/60 uppercase tracking-widest">{description.split(/\s+/).length} mots</p>
                    <p className="text-[10px] font-bold text-[#5D4037]/60 uppercase tracking-widest">{description.length} caractères</p>
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="slug" className="text-sm font-black text-[#2D1B08]">Slug URL personnalisée *</Label>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="text-[10px] text-gray-400 font-bold">discover.sn/h/</span>
                      <Input
                        id="slug"
                        value={slug}
                        onChange={(e) => setSlug(e.target.value.toLowerCase().replace(/\s+/g, '-'))}
                        className="border-[#EBE3D5] h-10 font-bold text-xs"
                      />
                    </div>
                  </div>
                  <div className="flex flex-col justify-center">
                    <Label className="text-sm font-black text-[#2D1B08] mb-2">Visibilité du profil</Label>
                    <div className="flex items-center gap-4">
                      <Button 
                        variant={isActive ? 'default' : 'outline'}
                        onClick={() => setIsActive(true)}
                        className={cn("flex-1 h-10 rounded-xl font-bold text-[10px] uppercase", isActive && "bg-emerald-600")}
                      >
                        ACTIF
                      </Button>
                      <Button 
                        variant={!isActive ? 'destructive' : 'outline'}
                        onClick={() => setIsActive(false)}
                        className="flex-1 h-10 rounded-xl font-bold text-[10px] uppercase"
                      >
                        INACTIF
                      </Button>
                    </div>
                  </div>
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
                  <Label htmlFor="location" className="text-sm font-black text-[#2D1B08]">Adresse Physique *</Label>
                  <div className="relative mt-1">
                    <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[#F2A900]" />
                    <Input
                      id="location"
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                      placeholder="Ex: 12 Rue de Fatick, Dakar Plateau"
                      className="pl-10 border-[#EBE3D5] focus:border-[#F2A900] font-bold"
                    />
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <Label className="text-sm font-black text-[#2D1B08]">Ville *</Label>
                    <Select value={city} onValueChange={setCity}>
                      <SelectTrigger className="mt-1 border-[#EBE3D5] font-bold">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Dakar">Dakar</SelectItem>
                        <SelectItem value="Saly">Saly / Mbour</SelectItem>
                        <SelectItem value="Saint-Louis">Saint-Louis</SelectItem>
                        <SelectItem value="Ziguinchor">Ziguinchor</SelectItem>
                        <SelectItem value="Cap Skirring">Cap Skirring</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label className="text-sm font-black text-[#2D1B08]">Région *</Label>
                    <Select value={region} onValueChange={setRegion}>
                      <SelectTrigger className="mt-1 border-[#EBE3D5] font-bold">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Dakar">Dakar</SelectItem>
                        <SelectItem value="Thiès">Thiès</SelectItem>
                        <SelectItem value="Saint-Louis">Saint-Louis</SelectItem>
                        <SelectItem value="Casamance">Casamance</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <Label className="text-sm font-black text-[#2D1B08]">Latitude GPS *</Label>
                    <Input
                      value={gps.lat}
                      onChange={(e) => setGps({ ...gps, lat: e.target.value })}
                      placeholder="14.6937"
                      className="mt-1 border-[#EBE3D5] font-bold"
                    />
                  </div>
                  <div>
                    <Label className="text-sm font-black text-[#2D1B08]">Longitude GPS *</Label>
                    <Input
                      value={gps.lng}
                      onChange={(e) => setGps({ ...gps, lng: e.target.value })}
                      placeholder="-17.4441"
                      className="mt-1 border-[#EBE3D5] font-bold"
                    />
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="phone" className="text-sm font-black text-[#2D1B08]">Téléphone Pro *</Label>
                    <div className="relative mt-1">
                      <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[#F2A900]" />
                      <Input
                        id="phone"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        className="pl-10 border-[#EBE3D5] focus:border-[#F2A900] font-bold"
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="whatsapp" className="text-sm font-black text-[#2D1B08]">Contact WhatsApp</Label>
                    <div className="relative mt-1">
                      <span className="absolute left-3 top-1/2 -translate-y-1/2 font-bold text-emerald-500 text-xs">WA</span>
                      <Input
                        id="whatsapp"
                        value={whatsapp}
                        onChange={(e) => setWhatsapp(e.target.value)}
                        placeholder="+221 77..."
                        className="pl-10 border-[#EBE3D5] focus:border-[#F2A900] font-bold"
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <Label htmlFor="email" className="text-sm font-black text-[#2D1B08]">Email de contact *</Label>
                  <div className="relative mt-1">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[#F2A900]" />
                    <Input
                      id="email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="pl-10 border-[#EBE3D5] focus:border-[#F2A900] font-bold"
                    />
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

            {/* Booking & Policies */}
            <div className="bg-white rounded-2xl border-2 border-[#EBE3D5] overflow-hidden shadow-sm">
              <div className="p-4 sm:p-6 border-b-2 border-[#EBE3D5]">
                <h2 className="text-lg sm:text-xl font-black text-[#2D1B08] flex items-center gap-2">
                  <Clock className="h-5 w-5 text-[#F2A900]" />
                  Paramètres de Réservation & Séjour
                </h2>
              </div>
              <div className="p-4 sm:p-6 space-y-6">
                <div className="grid sm:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label className="text-sm font-black text-[#2D1B08]">Mode de Réservation *</Label>
                    <Select value={bookingMode} onValueChange={setBookingMode}>
                      <SelectTrigger className="border-[#EBE3D5] font-bold">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="En ligne">Réservation En Ligne</SelectItem>
                        <SelectItem value="Contact direct">Contact Direct / WhatsApp</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label className="text-sm font-black text-[#2D1B08]">Access Cuisine *</Label>
                    <div className="flex items-center gap-4 h-10">
                      <Button 
                        variant={hasKitchen ? 'default' : 'outline'}
                        onClick={() => setHasKitchen(true)}
                        className={cn("flex-1 h-10 rounded-xl font-bold text-[10px] uppercase", hasKitchen && "bg-emerald-600")}
                      >OUI</Button>
                      <Button 
                        variant={!hasKitchen ? 'destructive' : 'outline'}
                        onClick={() => setHasKitchen(false)}
                        className="flex-1 h-10 rounded-xl font-bold text-[10px] uppercase"
                      >NON</Button>
                    </div>
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label className="text-sm font-black text-[#2D1B08]">Heure de Check-in</Label>
                    <Input type="time" value={checkIn} onChange={(e) => setCheckIn(e.target.value)} className="border-[#EBE3D5] font-bold" />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-sm font-black text-[#2D1B08]">Heure de Check-out</Label>
                    <Input type="time" value={checkOut} onChange={(e) => setCheckOut(e.target.value)} className="border-[#EBE3D5] font-bold" />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label className="text-sm font-black text-[#2D1B08]">Modes de Paiement Acceptés</Label>
                  <div className="flex flex-wrap gap-2">
                    {['Wave', 'Orange Money', 'Cash', 'Carte Bancaire', 'Virement'].map(mode => (
                      <Badge 
                        key={mode}
                        onClick={() => {
                          if (paymentModes.includes(mode)) setPaymentModes(paymentModes.filter(m => m !== mode));
                          else setPaymentModes([...paymentModes, mode]);
                        }}
                        className={cn(
                          "cursor-pointer px-4 py-2 font-black text-[10px] uppercase transition-all",
                          paymentModes.includes(mode) ? "bg-[#2D1B08] text-white" : "bg-gray-100 text-gray-400"
                        )}
                      >
                        {mode}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="policy" className="text-sm font-black text-[#2D1B08]">Règles & Conditions de séjour *</Label>
                  <Textarea
                    id="policy"
                    value={cancellationPolicy}
                    onChange={(e) => setCancellationPolicy(e.target.value)}
                    placeholder="Précisez vos conditions (annulation, enfants, animaux, bruit...)"
                    className="border-[#EBE3D5] focus:border-[#F2A900] italic text-sm min-h-[100px]"
                  />
                </div>
              </div>
            </div>

            {/* Amenities & Services */}
            <div className="bg-white rounded-2xl border-2 border-[#EBE3D5] overflow-hidden shadow-sm">
              <div className="p-4 sm:p-6 border-b-2 border-[#EBE3D5]">
                <h2 className="text-lg sm:text-xl font-black text-[#2D1B08] flex items-center gap-2">
                  <Award className="h-5 w-5 text-[#F2A900]" />
                  Commodités & Services Standards
                </h2>
              </div>
              <div className="p-4 sm:p-6 space-y-6">
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                  {[
                    { id: 'wifi', label: 'WiFi', state: isWifiFree, setState: setIsWifiFree },
                    { id: 'pool', label: 'Piscine', state: hasPool, setState: setHasPool },
                    { id: 'parking', label: 'Parking', state: true, setState: () => {} },
                    { id: 'security', label: 'Sécurité', state: hasSecurity, setState: setHasSecurity },
                    { id: 'cleaning', label: 'Ménage', state: hasCleaning, setState: setHasCleaning },
                    { id: 'transport', label: 'Transport', state: hasTransport, setState: setHasTransport },
                  ].map(service => (
                    <div key={service.id} className="flex items-center space-x-2 bg-gray-50 p-3 rounded-xl border border-gray-100">
                      <input 
                        type="checkbox" 
                        checked={service.state} 
                        onChange={() => service.setState(!service.state)}
                        className="h-4 w-4 accent-[#F2A900]"
                      />
                      <span className="text-[10px] font-black uppercase text-[#2D1B08]">{service.label}</span>
                    </div>
                  ))}
                </div>

                <div className="space-y-4">
                  <Label className="text-sm font-black text-[#2D1B08]">Autres Services</Label>
                  <div className="flex flex-wrap gap-2">
                    {amenities.map((amenity, index) => (
                      <Badge
                        key={index}
                        variant="outline"
                        className="border-[#1B5E20] text-[#1B5E20] font-bold px-4 py-2 text-[10px] uppercase"
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
                      placeholder="Ajouter un service (Ex: Navette Aéroport)..."
                      className="border-[#EBE3D5] focus:border-[#F2A900]"
                    />
                    <Button
                      onClick={handleAddAmenity}
                      className="bg-[#1B5E20] hover:bg-[#15490F] text-white shrink-0"
                    >
                      <Plus className="h-4 w-4 mr-2" />
                      AJOUTER
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Certification Discovery Tracker */}
            <div className="bg-[#2D1B08] rounded-2xl p-8 text-white shadow-xl relative overflow-hidden">
               <div className="absolute top-0 right-0 w-32 h-32 bg-[#F2A900]/10 rounded-full -mr-16 -mt-16 blur-2xl" />
               <div className="relative z-10">
                  <div className="flex items-center gap-3 mb-6">
                    <div className={cn("h-10 w-10 rounded-full flex items-center justify-center shadow-lg transition-all", isVerified ? "bg-emerald-500" : "bg-[#F2A900]")}>
                      <Award size={24} className={isVerified ? "text-white" : "text-[#2D1B08]"} />
                    </div>
                    <div>
                      <h3 className="text-lg font-black uppercase tracking-tighter">Certification Discovery</h3>
                      <p className="text-[10px] font-bold text-white/40 uppercase tracking-widest">Gagnez en visibilité & crédibilité</p>
                    </div>
                  </div>

                  <div className="space-y-4 mb-8">
                    <div className="flex items-center justify-between text-[10px] font-black uppercase tracking-widest">
                       <span>Progression du Badge</span>
                       <span className="text-[#F2A900]">60%</span>
                    </div>
                    <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                       <div className="h-full bg-gradient-to-r from-[#F2A900] to-[#FFD700] rounded-full w-[60%]" />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3 mb-6">
                    <div className="flex items-center gap-2 bg-white/5 p-3 rounded-xl border border-white/10">
                       <Check size={14} className="text-emerald-500" />
                       <span className="text-[9px] font-bold uppercase tracking-tight text-white/70">Profil Complet</span>
                    </div>
                    <div className="flex items-center gap-2 bg-white/5 p-3 rounded-xl border border-white/10">
                       <Check size={14} className="text-emerald-500" />
                       <span className="text-[9px] font-bold uppercase tracking-tight text-white/70">Photos HD</span>
                    </div>
                    <div className="flex items-center gap-2 bg-white/5 p-3 rounded-xl border border-white/10 opacity-40">
                       <div className="h-3.5 w-3.5 rounded-full border border-white/50" />
                       <span className="text-[9px] font-bold uppercase tracking-tight text-white/70">Visite terrain</span>
                    </div>
                    <div className="flex items-center gap-2 bg-white/5 p-3 rounded-xl border border-white/10 opacity-40">
                       <div className="h-3.5 w-3.5 rounded-full border border-white/50" />
                       <span className="text-[9px] font-bold uppercase tracking-tight text-white/70">Validation Admin</span>
                    </div>
                  </div>

                  <Button className="w-full bg-[#F2A900] text-[#2D1B08] hover:bg-[#D49400] font-black uppercase text-xs h-12 rounded-xl shadow-xl shadow-[#F2A900]/10">
                    DEMANDER LA CERTIFICATION
                  </Button>
               </div>
            </div>

            {/* Preview Card */}
            <div className="bg-white rounded-2xl border-2 border-[#EBE3D5] p-6 text-[#2D1B08] shadow-sm">
              <h3 className="text-lg font-black mb-4 uppercase tracking-tighter">Aperçu Visiteur</h3>
              <div className="space-y-4 mb-6">
                <div className="flex justify-between items-center text-sm font-medium">
                  <span className="text-gray-400">Page active</span>
                  <Badge className="bg-emerald-50 text-emerald-600 border-none rounded-full px-3 py-1 font-black">OUI</Badge>
                </div>
                <div className="flex justify-between items-center text-sm font-medium">
                  <span className="text-gray-400">Thème visuel</span>
                  <Badge variant="outline" className="border-[#2D1B08] text-[#2D1B08] rounded-full px-3 py-1 font-black">TERRE DE SIENNE</Badge>
                </div>
              </div>
              <Link to="/establishment/1">
                <Button variant="outline" className="w-full border-[#2D1B08] text-[#2D1B08] hover:bg-[#2D1B08] hover:text-white font-black h-12 rounded-xl transition-all">
                  <Eye className="h-4 w-4 mr-2" />
                  VOIR COMME VISITEUR
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
