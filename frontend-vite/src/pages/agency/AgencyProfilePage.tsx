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
    Award,
    Camera,
    Check,
    Plane,
    Star,
    Users,
    TrendingUp
} from 'lucide-react';

const AgencyProfilePage: React.FC = () => {
    const [coverImage] = useState('https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?w=1920&h=600&fit=crop');
    const [profileImage] = useState('/images/nouveau_logo.jpeg');
    const [name, setName] = useState('Sénégal Aventures');
    const [tagline, setTagline] = useState('Découvrez le Sénégal authentique avec des experts passionnés');
    const [description, setDescription] = useState('Fondée en 2010, Sénégal Aventures est votre partenaire de confiance pour explorer les merveilles du Sénégal. Nous proposons des circuits sur-mesure pour tous les types de voyageurs — culturels, aventuriers ou amateurs de nature.');
    const [location, setLocation] = useState('Dakar, Almadies');
    const [phone, setPhone] = useState('+221 33 867 23 45');
    const [email, setEmail] = useState('contact@senegal-aventures.sn');
    const [website, setWebsite] = useState('www.senegal-aventures.sn');
    const [founded, setFounded] = useState('2010');
    const [license, setLicense] = useState('AGC-SN-2010-0047');
    const [specialties, setSpecialties] = useState([
        'Safari & Nature', 'Circuits Culturels', 'Éco-Tourisme',
        'Aventure & Randonnée', 'Séjours Balnéaires', 'Guide Multilingue'
    ]);
    const [newSpecialty, setNewSpecialty] = useState('');

    const handleAddSpecialty = () => {
        if (newSpecialty.trim()) {
            setSpecialties([...specialties, newSpecialty.trim()]);
            setNewSpecialty('');
        }
    };

    const handleRemoveSpecialty = (index: number) => {
        setSpecialties(specialties.filter((_, i) => i !== index));
    };

    const handleSave = () => {
        alert('Profil agence enregistré avec succès !');
    };

    return (
        <div className="min-h-screen bg-[#FFFDFB] pb-12">
            {/* Sticky Header */}
            <div className="bg-white border-b-2 border-[#EBE3D5] sticky top-0 z-20 shadow-sm">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 sm:py-4">
                    <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                        <div className="flex items-center gap-3 w-full sm:w-auto">
                            <Link to="/dashboard" className="shrink-0">
                                <Button variant="ghost" size="sm" className="text-[#5D4037] hover:text-[#2D1B08] h-8 sm:h-9 px-2 sm:px-3">
                                    <ArrowLeft className="h-4 w-4 sm:mr-2" />
                                    <span className="hidden sm:inline">Retour</span>
                                </Button>
                            </Link>
                            <div className="min-w-0">
                                <h1 className="text-xl sm:text-2xl font-black text-[#2D1B08] truncate">Profil Agence</h1>
                                <p className="text-xs sm:text-sm text-[#5D4037]/70 truncate">Gérez les informations de votre agence de voyage</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-2 w-full sm:w-auto">
                            <Link to="/establishment/agency-1" className="flex-1 sm:flex-initial">
                                <Button variant="outline" className="w-full border-[#F2A900] text-[#F2A900] hover:bg-[#F2A900] hover:text-white font-black text-xs sm:text-sm h-8 sm:h-10 px-2 sm:px-4">
                                    <Eye className="h-3.5 w-3.5 sm:mr-2" />
                                    <span className="hidden sm:inline">Aperçu public</span>
                                </Button>
                            </Link>
                            <Button onClick={handleSave} className="flex-1 sm:flex-initial bg-[#F2A900] hover:bg-[#D49400] text-white font-black text-xs sm:text-sm h-8 sm:h-10 px-2 sm:px-4">
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
                                    Images de l'agence
                                </h2>
                            </div>
                            <div className="p-4 sm:p-6 space-y-6">
                                {/* Cover */}
                                <div>
                                    <Label className="text-sm font-black text-[#2D1B08] mb-2 block">Photo de couverture</Label>
                                    <div className="relative h-48 rounded-xl overflow-hidden border-2 border-[#EBE3D5] group">
                                        <img src={coverImage} alt="Cover" className="w-full h-full object-cover" />
                                        <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                            <Button size="sm" className="bg-white text-[#2D1B08] hover:bg-[#F2A900] hover:text-white">
                                                <Upload className="h-4 w-4 mr-2" /> Changer
                                            </Button>
                                        </div>
                                    </div>
                                </div>
                                {/* Logo */}
                                <div>
                                    <Label className="text-sm font-black text-[#2D1B08] mb-2 block">Logo de l'agence</Label>
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
                                            <p className="text-sm text-[#5D4037] mb-2">Format recommandé : PNG transparent, 400x400px</p>
                                            <Button size="sm" variant="outline" className="border-[#F2A900] text-[#F2A900]">
                                                <Upload className="h-4 w-4 mr-2" /> Télécharger le logo
                                            </Button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Basic Info */}
                        <div className="bg-white rounded-2xl border-2 border-[#EBE3D5] overflow-hidden shadow-sm">
                            <div className="p-4 sm:p-6 border-b-2 border-[#EBE3D5]">
                                <h2 className="text-xl font-black text-[#2D1B08]">Informations générales</h2>
                            </div>
                            <div className="p-4 sm:p-6 space-y-4">
                                <div>
                                    <Label htmlFor="name" className="text-sm font-black text-[#2D1B08]">Nom de l'agence *</Label>
                                    <Input id="name" value={name} onChange={(e) => setName(e.target.value)}
                                        className="mt-1 border-[#EBE3D5] focus:border-[#F2A900] font-bold" />
                                </div>
                                <div>
                                    <Label htmlFor="tagline" className="text-sm font-black text-[#2D1B08]">Accroche / Slogan *</Label>
                                    <Input id="tagline" value={tagline} onChange={(e) => setTagline(e.target.value)}
                                        placeholder="Une phrase qui résume votre agence"
                                        className="mt-1 border-[#EBE3D5] focus:border-[#F2A900]" />
                                </div>
                                <div>
                                    <Label htmlFor="description" className="text-sm font-black text-[#2D1B08]">Description de l'agence *</Label>
                                    <Textarea id="description" value={description} onChange={(e) => setDescription(e.target.value)}
                                        rows={4} className="mt-1 border-[#EBE3D5] focus:border-[#F2A900] resize-none" />
                                    <p className="text-xs text-[#5D4037]/60 mt-1">{description.length} caractères</p>
                                </div>
                                <div className="grid sm:grid-cols-2 gap-4">
                                    <div>
                                        <Label htmlFor="founded" className="text-sm font-black text-[#2D1B08]">Année de fondation</Label>
                                        <Input id="founded" value={founded} onChange={(e) => setFounded(e.target.value)}
                                            placeholder="2010" className="mt-1 border-[#EBE3D5] focus:border-[#F2A900]" />
                                    </div>
                                    <div>
                                        <Label htmlFor="license" className="text-sm font-black text-[#2D1B08]">N° Licence MTAT</Label>
                                        <Input id="license" value={license} onChange={(e) => setLicense(e.target.value)}
                                            placeholder="AGC-SN-XXXX-XXXX" className="mt-1 border-[#EBE3D5] focus:border-[#F2A900]" />
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Contact */}
                        <div className="bg-white rounded-2xl border-2 border-[#EBE3D5] overflow-hidden shadow-sm">
                            <div className="p-4 sm:p-6 border-b-2 border-[#EBE3D5]">
                                <h2 className="text-xl font-black text-[#2D1B08]">Coordonnées</h2>
                            </div>
                            <div className="p-4 sm:p-6 space-y-4">
                                <div>
                                    <Label htmlFor="location" className="text-sm font-black text-[#2D1B08]">Siège social *</Label>
                                    <div className="relative mt-1">
                                        <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[#F2A900]" />
                                        <Input id="location" value={location} onChange={(e) => setLocation(e.target.value)}
                                            className="pl-10 border-[#EBE3D5] focus:border-[#F2A900]" />
                                    </div>
                                </div>
                                <div className="grid sm:grid-cols-2 gap-4">
                                    <div>
                                        <Label htmlFor="phone" className="text-sm font-black text-[#2D1B08]">Téléphone *</Label>
                                        <div className="relative mt-1">
                                            <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[#F2A900]" />
                                            <Input id="phone" value={phone} onChange={(e) => setPhone(e.target.value)}
                                                className="pl-10 border-[#EBE3D5] focus:border-[#F2A900]" />
                                        </div>
                                    </div>
                                    <div>
                                        <Label htmlFor="email" className="text-sm font-black text-[#2D1B08]">Email *</Label>
                                        <div className="relative mt-1">
                                            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[#F2A900]" />
                                            <Input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)}
                                                className="pl-10 border-[#EBE3D5] focus:border-[#F2A900]" />
                                        </div>
                                    </div>
                                </div>
                                <div>
                                    <Label htmlFor="website" className="text-sm font-black text-[#2D1B08]">Site web</Label>
                                    <div className="relative mt-1">
                                        <Globe className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[#F2A900]" />
                                        <Input id="website" value={website} onChange={(e) => setWebsite(e.target.value)}
                                            placeholder="www.monagence.sn" className="pl-10 border-[#EBE3D5] focus:border-[#F2A900]" />
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Specialties */}
                        <div className="bg-white rounded-2xl border-2 border-[#EBE3D5] overflow-hidden shadow-sm">
                            <div className="p-4 sm:p-6 border-b-2 border-[#EBE3D5]">
                                <h2 className="text-xl font-black text-[#2D1B08] flex items-center gap-2">
                                    <Award className="h-5 w-5 text-[#F2A900]" /> Spécialités & Types de circuits
                                </h2>
                            </div>
                            <div className="p-4 sm:p-6 space-y-4">
                                <div className="flex flex-wrap gap-2">
                                    {specialties.map((s, index) => (
                                        <Badge key={index} variant="outline"
                                            className="border-[#F2A900] text-[#6B4226] font-bold px-3 py-1.5 text-sm">
                                            <Plane className="h-3 w-3 mr-1.5 text-[#F2A900]" />
                                            {s}
                                            <button onClick={() => handleRemoveSpecialty(index)} className="ml-2 hover:text-red-600">
                                                <X className="h-3 w-3" />
                                            </button>
                                        </Badge>
                                    ))}
                                </div>
                                <div className="flex gap-2">
                                    <Input value={newSpecialty} onChange={(e) => setNewSpecialty(e.target.value)}
                                        onKeyPress={(e) => e.key === 'Enter' && handleAddSpecialty()}
                                        placeholder="Ajouter une spécialité (ex: Pèlerinage, Croisière...)"
                                        className="border-[#EBE3D5] focus:border-[#F2A900]" />
                                    <Button onClick={handleAddSpecialty} className="bg-[#F2A900] hover:bg-[#D49400] text-white shrink-0">
                                        <Plus className="h-4 w-4 mr-2" /> Ajouter
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right Sidebar */}
                    <div className="space-y-6">
                        {/* Status Card */}
                        <div className="bg-gradient-to-br from-[#F2A900] to-[#D49400] rounded-2xl p-6 text-white shadow-lg">
                            <h3 className="text-lg font-black mb-4">Statut de l'agence</h3>
                            <div className="space-y-3 text-sm">
                                {[
                                    'Licence vérifiée et active',
                                    'Profil public visible',
                                    'Réservations de circuits activées',
                                    'Certifiée MTAT Sénégal'
                                ].map((item, i) => (
                                    <div key={i} className="flex items-center gap-2">
                                        <Check className="h-4 w-4 shrink-0" />
                                        <span>{item}</span>
                                    </div>
                                ))}
                            </div>
                            <Link to="/establishment/agency-1">
                                <Button className="w-full mt-4 bg-white text-[#F2A900] hover:bg-[#FFFDFB] font-black">
                                    <Eye className="h-4 w-4 mr-2" /> Voir comme visiteur
                                </Button>
                            </Link>
                        </div>

                        {/* Statistics */}
                        <div className="bg-white rounded-2xl border-2 border-[#EBE3D5] overflow-hidden shadow-sm">
                            <div className="p-5 border-b-2 border-[#EBE3D5]">
                                <h3 className="text-lg font-black text-[#2D1B08]">Statistiques</h3>
                            </div>
                            <div className="p-5 space-y-4">
                                {[
                                    { icon: <Users className="h-4 w-4 text-[#F2A900]" />, label: 'Clients fidèles', value: '1,247' },
                                    { icon: <Plane className="h-4 w-4 text-[#F2A900]" />, label: 'Circuits proposés', value: '7' },
                                    { icon: <Star className="h-4 w-4 text-[#F2A900]" />, label: 'Note moyenne', value: '4.8/5' },
                                    { icon: <TrendingUp className="h-4 w-4 text-[#F2A900]" />, label: 'Avis reçus', value: '219' },
                                ].map((stat, i) => (
                                    <div key={i} className="flex items-center justify-between">
                                        <span className="text-sm text-[#5D4037] flex items-center gap-2">{stat.icon}{stat.label}</span>
                                        <span className="text-xl font-black text-[#2D1B08]">{stat.value}</span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Quick Actions */}
                        <div className="bg-white rounded-2xl border-2 border-[#EBE3D5] overflow-hidden shadow-sm">
                            <div className="p-5 border-b-2 border-[#EBE3D5]">
                                <h3 className="text-lg font-black text-[#2D1B08]">Actions rapides</h3>
                            </div>
                            <div className="p-5 space-y-2">
                                <Link to="/establishment/offers">
                                    <Button className="w-full justify-start bg-[#F2A900] hover:bg-[#D49400] text-white font-black mb-2">
                                        <Plus className="h-4 w-4 mr-2" /> Ajouter une offre
                                    </Button>
                                </Link>
                                <Link to="/agency/bookings">
                                    <Button variant="outline" className="w-full justify-start border-[#EBE3D5] hover:border-[#F2A900]">
                                        <Plane className="h-4 w-4 mr-2" /> Voir les réservations
                                    </Button>
                                </Link>
                                <Link to="/establishment/reviews">
                                    <Button variant="outline" className="w-full justify-start border-[#EBE3D5] hover:border-[#F2A900]">
                                        <Award className="h-4 w-4 mr-2" /> Nos avis clients
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

export default AgencyProfilePage;
