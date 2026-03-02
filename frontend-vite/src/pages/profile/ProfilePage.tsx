import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  User,
  MapPin,
  Globe,
  Heart,
  Edit3,
  Save,
  X,
  Camera,
  Shield,
  Award,
  LogOut,
  Eye,
  Phone,
  Mail,
  DollarSign,
  Languages,
  Briefcase,
  Plus,
  Trash2,
  Instagram,
  Twitter,
  Facebook
} from 'lucide-react';
import LanguageSelector from '@/components/profile/LanguageSelector';
import InterestSelector from '@/components/profile/InterestSelector';

// ─── Role helpers ─────────────────────────────────────────────

const getRoleBadgeColor = (role: string) => {
  switch (role) {
    case 'admin': return 'bg-red-100 text-red-800';
    case 'guide': return 'bg-blue-100 text-blue-800';
    case 'organizer': return 'bg-purple-100 text-purple-800';
    case 'security': return 'bg-slate-100 text-slate-800';
    case 'local': return 'bg-emerald-100 text-emerald-800';
    default: return 'bg-orange-100 text-orange-800';
  }
};

const getRoleLabel = (role: string) => {
  switch (role) {
    case 'tourist': return 'Touriste';
    case 'local': return 'Local';
    case 'guide': return 'Guide Touristique';
    case 'organizer': return 'Organisateur';
    case 'admin': return 'Administrateur';
    case 'security': return 'Sécurité';
    default: return role;
  }
};

// ─── Component ───────────────────────────────────────────────

const ProfilePage: React.FC = () => {
  const { user, updateProfile, logout } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [showLogoutDialog, setShowLogoutDialog] = useState(false);

  // Common fields
  const [editedProfile, setEditedProfile] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: user?.phone || '',
    location: user?.location || '',
    languages: user?.languages || [],
    interests: user?.interests || [],
    bio: user?.bio || '',
  });

  // Guide-specific fields
  const [specialties, setSpecialties] = useState<string[]>(['Histoire & Culture', 'Gastronomie']);
  const [newSpecialty, setNewSpecialty] = useState('');
  const [guidingLanguages, setGuidingLanguages] = useState<string[]>(['Français', 'Anglais', 'Wolof']);
  const [newGuidingLang, setNewGuidingLang] = useState('');
  const [pricePerDay, setPricePerDay] = useState('35 000 FCFA');
  const [pricePerHalf, setPricePerHalf] = useState('20 000 FCFA');
  const [activityZone, setActivityZone] = useState('Dakar, Gorée, Saly, Saint-Louis');
  const [certifications, setCertifications] = useState<string[]>(['Guide Officiel Certifié', 'Premiers Secours']);
  const [newCert, setNewCert] = useState('');

  // Organizer-specific fields
  const [organizationName, setOrganizationName] = useState('');
  const [website, setWebsite] = useState('');
  const [eventTypes, setEventTypes] = useState<string[]>(['Concerts & Festivals', 'Mariages & Galas']);
  const [newEventType, setNewEventType] = useState('');
  const [socialInstagram, setSocialInstagram] = useState('');
  const [socialTwitter, setSocialTwitter] = useState('');
  const [socialFacebook, setSocialFacebook] = useState('');

  const handleSave = async () => {
    try {
      await updateProfile(editedProfile);
      setIsEditing(false);
    } catch {
      console.error('Erreur lors de la mise à jour du profil');
    }
  };

  const handleCancel = () => {
    setEditedProfile({
      name: user?.name || '',
      email: user?.email || '',
      phone: user?.phone || '',
      location: user?.location || '',
      languages: user?.languages || [],
      interests: user?.interests || [],
      bio: user?.bio || '',
    });
    setIsEditing(false);
  };

  if (!user) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <User className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <p className="text-gray-500">Veuillez vous connecter pour accéder à votre profil</p>
        </div>
      </div>
    );
  }

  const isGuide = user.role === 'guide';
  const isOrganizer = user.role === 'organizer';

  return (
    <div className="max-w-4xl mx-auto px-4 py-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-[#2D1B08]">Mon Profil</h1>
          <p className="text-[#5D4037]/70 mt-1 text-sm">Gérez vos informations — elles seront visibles sur votre page publique</p>
        </div>
        <div className="flex gap-2 flex-wrap">
          <Link to={`/user/me`}>
            <Button variant="outline" className="border-[#F2A900] text-[#F2A900] hover:bg-[#F2A900] hover:text-white font-black text-sm">
              <Eye className="h-4 w-4 mr-1.5" />
              Voir ma page publique
            </Button>
          </Link>
          <Button
            onClick={() => isEditing ? handleCancel() : setIsEditing(true)}
            variant={isEditing ? 'outline' : 'default'}
            className={isEditing ? '' : 'bg-[#2D1B08] hover:bg-[#1a0f04] font-black'}
          >
            {isEditing ? <X className="h-4 w-4 mr-1.5" /> : <Edit3 className="h-4 w-4 mr-1.5" />}
            {isEditing ? 'Annuler' : 'Modifier'}
          </Button>
        </div>
      </div>

      {/* Profile card */}
      <Card className="border-2 border-[#EBE3D5]">
        <CardContent className="pt-6">
          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-5">
            <div className="relative shrink-0">
              <Avatar className="h-24 w-24 sm:h-28 sm:w-28 border-4 border-white shadow-xl">
                <AvatarImage src={user.avatar} />
                <AvatarFallback className="text-3xl font-black text-[#F2A900] bg-[#FFF8E7]">
                  {user.name.charAt(0).toUpperCase()}
                </AvatarFallback>
              </Avatar>
              {isEditing && (
                <Button size="sm" className="absolute -bottom-2 -right-2 h-8 w-8 rounded-full bg-[#F2A900] hover:bg-[#D49400] p-0 shadow-lg">
                  <Camera className="h-4 w-4" />
                </Button>
              )}
            </div>
            <div className="flex-1 text-center sm:text-left">
              <div className="flex items-center justify-center sm:justify-start gap-2 flex-wrap mb-1">
                <h2 className="text-2xl font-black text-[#2D1B08]">{user.name}</h2>
                <Badge className={`${getRoleBadgeColor(user.role)} font-bold text-xs`}>
                  {getRoleLabel(user.role)}
                </Badge>
                {user.isVerified && (
                  <Badge className="bg-[#1B5E20] text-white font-bold text-xs border-none">
                    <Shield className="h-3 w-3 mr-1" />
                    Vérifié
                  </Badge>
                )}
              </div>
              <p className="text-[#5D4037] text-sm">{user.email}</p>
              {user.location && (
                <div className="flex items-center justify-center sm:justify-start gap-1 text-[#5D4037]/70 text-sm mt-1">
                  <MapPin className="h-3.5 w-3.5" />
                  <span>{user.location}</span>
                </div>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* ── Section 1: Infos personnelles (tous les rôles) ── */}
      <Card className="border-2 border-[#EBE3D5]">
        <CardHeader className="pb-3">
          <CardTitle className="text-lg font-black text-[#2D1B08] flex items-center gap-2">
            <User className="h-5 w-5 text-[#F2A900]" />
            Informations personnelles
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-5">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <Label htmlFor="name" className="font-black text-[#2D1B08] text-sm">Nom complet *</Label>
              <Input
                id="name"
                value={editedProfile.name}
                onChange={(e) => setEditedProfile({ ...editedProfile, name: e.target.value })}
                disabled={!isEditing}
                className="border-[#EBE3D5] focus:border-[#F2A900] disabled:opacity-70"
              />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="email" className="font-black text-[#2D1B08] text-sm">Email *</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[#5D4037]/50" />
                <Input
                  id="email"
                  type="email"
                  value={editedProfile.email}
                  onChange={(e) => setEditedProfile({ ...editedProfile, email: e.target.value })}
                  disabled={!isEditing}
                  className="pl-9 border-[#EBE3D5] focus:border-[#F2A900] disabled:opacity-70"
                />
              </div>
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="phone" className="font-black text-[#2D1B08] text-sm">Téléphone</Label>
              <div className="relative">
                <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[#5D4037]/50" />
                <Input
                  id="phone"
                  value={editedProfile.phone}
                  onChange={(e) => setEditedProfile({ ...editedProfile, phone: e.target.value })}
                  disabled={!isEditing}
                  className="pl-9 border-[#EBE3D5] focus:border-[#F2A900] disabled:opacity-70"
                />
              </div>
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="location" className="font-black text-[#2D1B08] text-sm">Localisation</Label>
              <div className="relative">
                <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[#5D4037]/50" />
                <Input
                  id="location"
                  value={editedProfile.location}
                  onChange={(e) => setEditedProfile({ ...editedProfile, location: e.target.value })}
                  disabled={!isEditing}
                  className="pl-9 border-[#EBE3D5] focus:border-[#F2A900] disabled:opacity-70"
                />
              </div>
            </div>
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="bio" className="font-black text-[#2D1B08] text-sm">Biographie</Label>
            <Textarea
              id="bio"
              value={editedProfile.bio}
              onChange={(e) => setEditedProfile({ ...editedProfile, bio: e.target.value })}
              disabled={!isEditing}
              placeholder="Parlez-nous de vous..."
              rows={3}
              className="border-[#EBE3D5] focus:border-[#F2A900] resize-none disabled:opacity-70"
            />
          </div>

          {/* Languages */}
          <div className="space-y-1.5">
            <Label className="font-black text-[#2D1B08] text-sm flex items-center gap-1.5">
              <Globe className="h-4 w-4 text-[#F2A900]" />
              Langues parlées
            </Label>
            <LanguageSelector
              languages={editedProfile.languages}
              onLanguagesChange={(languages) => setEditedProfile({ ...editedProfile, languages })}
              disabled={!isEditing}
            />
          </div>

          {/* Interests (tourist / local) */}
          {(user.role === 'tourist' || user.role === 'local') && (
            <div className="space-y-1.5">
              <Label className="font-black text-[#2D1B08] text-sm flex items-center gap-1.5">
                <Heart className="h-4 w-4 text-[#F2A900]" />
                Centres d'intérêt
              </Label>
              <InterestSelector
                interests={editedProfile.interests}
                onInterestsChange={(interests) => setEditedProfile({ ...editedProfile, interests })}
                disabled={!isEditing}
              />
            </div>
          )}
        </CardContent>
      </Card>

      {/* ── Section 2: Guide spécifique ── */}
      {isGuide && (
        <>
          {/* Tarifs */}
          <Card className="border-2 border-blue-100">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg font-black text-[#2D1B08] flex items-center gap-2">
                <DollarSign className="h-5 w-5 text-blue-500" />
                Tarifs de Guidage
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <Label className="font-black text-[#2D1B08] text-sm">Tarif demi-journée (≤4h)</Label>
                  <Input
                    value={pricePerHalf}
                    onChange={(e) => setPricePerHalf(e.target.value)}
                    disabled={!isEditing}
                    placeholder="ex: 20 000 FCFA"
                    className="border-[#EBE3D5] focus:border-blue-400 disabled:opacity-70"
                  />
                </div>
                <div className="space-y-1.5">
                  <Label className="font-black text-[#2D1B08] text-sm">Tarif journée complète (8h)</Label>
                  <Input
                    value={pricePerDay}
                    onChange={(e) => setPricePerDay(e.target.value)}
                    disabled={!isEditing}
                    placeholder="ex: 35 000 FCFA"
                    className="border-[#EBE3D5] focus:border-blue-400 disabled:opacity-70"
                  />
                </div>
              </div>
              <div className="space-y-1.5">
                <Label className="font-black text-[#2D1B08] text-sm flex items-center gap-1.5">
                  <MapPin className="h-4 w-4 text-blue-500" />
                  Zone d'activité
                </Label>
                <Input
                  value={activityZone}
                  onChange={(e) => setActivityZone(e.target.value)}
                  disabled={!isEditing}
                  placeholder="ex: Dakar, Gorée, Saint-Louis"
                  className="border-[#EBE3D5] focus:border-blue-400 disabled:opacity-70"
                />
              </div>
            </CardContent>
          </Card>

          {/* Langues de guidage */}
          <Card className="border-2 border-blue-100">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg font-black text-[#2D1B08] flex items-center gap-2">
                <Languages className="h-5 w-5 text-blue-500" />
                Langues de Guidage
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex flex-wrap gap-2">
                {guidingLanguages.map((lang) => (
                  <Badge key={lang} className="bg-blue-100 text-blue-700 font-bold px-3 py-1.5 border-none">
                    {lang}
                    {isEditing && (
                      <button onClick={() => setGuidingLanguages(guidingLanguages.filter(l => l !== lang))} className="ml-2 hover:text-red-500">
                        <X className="h-3 w-3" />
                      </button>
                    )}
                  </Badge>
                ))}
              </div>
              {isEditing && (
                <div className="flex gap-2">
                  <Input
                    value={newGuidingLang}
                    onChange={(e) => setNewGuidingLang(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' && newGuidingLang.trim()) {
                        setGuidingLanguages([...guidingLanguages, newGuidingLang.trim()]);
                        setNewGuidingLang('');
                      }
                    }}
                    placeholder="Ajouter une langue..."
                    className="border-[#EBE3D5] focus:border-blue-400"
                  />
                  <Button
                    type="button"
                    onClick={() => {
                      if (newGuidingLang.trim()) {
                        setGuidingLanguages([...guidingLanguages, newGuidingLang.trim()]);
                        setNewGuidingLang('');
                      }
                    }}
                    className="bg-blue-500 hover:bg-blue-600 text-white shrink-0"
                  >
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Spécialités */}
          <Card className="border-2 border-blue-100">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg font-black text-[#2D1B08] flex items-center gap-2">
                <Award className="h-5 w-5 text-blue-500" />
                Spécialités
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex flex-wrap gap-2">
                {specialties.map((s) => (
                  <Badge key={s} className="bg-blue-50 text-blue-700 font-bold px-3 py-1.5 border border-blue-200">
                    {s}
                    {isEditing && (
                      <button onClick={() => setSpecialties(specialties.filter(x => x !== s))} className="ml-2 hover:text-red-500">
                        <X className="h-3 w-3" />
                      </button>
                    )}
                  </Badge>
                ))}
              </div>
              {isEditing && (
                <div className="flex gap-2">
                  <Input
                    value={newSpecialty}
                    onChange={(e) => setNewSpecialty(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' && newSpecialty.trim()) {
                        setSpecialties([...specialties, newSpecialty.trim()]);
                        setNewSpecialty('');
                      }
                    }}
                    placeholder="ex: Histoire & Culture..."
                    className="border-[#EBE3D5] focus:border-blue-400"
                  />
                  <Button type="button" onClick={() => {
                    if (newSpecialty.trim()) { setSpecialties([...specialties, newSpecialty.trim()]); setNewSpecialty(''); }
                  }} className="bg-blue-500 hover:bg-blue-600 text-white shrink-0">
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Certifications */}
          <Card className="border-2 border-blue-100">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg font-black text-[#2D1B08] flex items-center gap-2">
                <Shield className="h-5 w-5 text-blue-500" />
                Certifications
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="space-y-2">
                {certifications.map((cert) => (
                  <div key={cert} className="flex items-center justify-between bg-blue-50 rounded-xl px-4 py-2.5">
                    <span className="font-bold text-blue-700 text-sm">{cert}</span>
                    {isEditing && (
                      <button onClick={() => setCertifications(certifications.filter(c => c !== cert))} className="text-red-400 hover:text-red-600">
                        <Trash2 className="h-4 w-4" />
                      </button>
                    )}
                  </div>
                ))}
              </div>
              {isEditing && (
                <div className="flex gap-2">
                  <Input
                    value={newCert}
                    onChange={(e) => setNewCert(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' && newCert.trim()) {
                        setCertifications([...certifications, newCert.trim()]);
                        setNewCert('');
                      }
                    }}
                    placeholder="ex: Guide Officiel Certifié..."
                    className="border-[#EBE3D5] focus:border-blue-400"
                  />
                  <Button type="button" onClick={() => {
                    if (newCert.trim()) { setCertifications([...certifications, newCert.trim()]); setNewCert(''); }
                  }} className="bg-blue-500 hover:bg-blue-600 text-white shrink-0">
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        </>
      )}

      {/* ── Section 3: Organizer spécifique ── */}
      {isOrganizer && (
        <>
          {/* Organisation */}
          <Card className="border-2 border-purple-100">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg font-black text-[#2D1B08] flex items-center gap-2">
                <Briefcase className="h-5 w-5 text-purple-500" />
                Mon Organisation
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-1.5">
                <Label className="font-black text-[#2D1B08] text-sm">Nom de l'organisation</Label>
                <Input
                  value={organizationName}
                  onChange={(e) => setOrganizationName(e.target.value)}
                  disabled={!isEditing}
                  placeholder="ex: Teranga Events"
                  className="border-[#EBE3D5] focus:border-purple-400 disabled:opacity-70"
                />
              </div>
              <div className="space-y-1.5">
                <Label className="font-black text-[#2D1B08] text-sm flex items-center gap-1.5">
                  <Globe className="h-4 w-4 text-purple-500" />
                  Site web
                </Label>
                <Input
                  value={website}
                  onChange={(e) => setWebsite(e.target.value)}
                  disabled={!isEditing}
                  placeholder="www.monorganisation.sn"
                  className="border-[#EBE3D5] focus:border-purple-400 disabled:opacity-70"
                />
              </div>
            </CardContent>
          </Card>

          {/* Types d'événements */}
          <Card className="border-2 border-purple-100">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg font-black text-[#2D1B08] flex items-center gap-2">
                <Award className="h-5 w-5 text-purple-500" />
                Types d'événements organisés
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex flex-wrap gap-2">
                {eventTypes.map((t) => (
                  <Badge key={t} className="bg-purple-100 text-purple-700 font-bold px-3 py-1.5 border-none">
                    {t}
                    {isEditing && (
                      <button onClick={() => setEventTypes(eventTypes.filter(x => x !== t))} className="ml-2 hover:text-red-500">
                        <X className="h-3 w-3" />
                      </button>
                    )}
                  </Badge>
                ))}
              </div>
              {isEditing && (
                <div className="flex gap-2">
                  <Input
                    value={newEventType}
                    onChange={(e) => setNewEventType(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' && newEventType.trim()) {
                        setEventTypes([...eventTypes, newEventType.trim()]);
                        setNewEventType('');
                      }
                    }}
                    placeholder="ex: Concerts & Festivals..."
                    className="border-[#EBE3D5] focus:border-purple-400"
                  />
                  <Button type="button" onClick={() => {
                    if (newEventType.trim()) { setEventTypes([...eventTypes, newEventType.trim()]); setNewEventType(''); }
                  }} className="bg-purple-500 hover:bg-purple-600 text-white shrink-0">
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Réseaux Sociaux */}
          <Card className="border-2 border-purple-100">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg font-black text-[#2D1B08] flex items-center gap-2">
                <Globe className="h-5 w-5 text-purple-500" />
                Réseaux Sociaux
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center gap-3">
                <div className="bg-pink-50 p-2 rounded-xl shrink-0"><Instagram className="h-4 w-4 text-pink-500" /></div>
                <Input
                  value={socialInstagram}
                  onChange={(e) => setSocialInstagram(e.target.value)}
                  disabled={!isEditing}
                  placeholder="@votre_compte"
                  className="border-[#EBE3D5] focus:border-pink-400 disabled:opacity-70"
                />
              </div>
              <div className="flex items-center gap-3">
                <div className="bg-sky-50 p-2 rounded-xl shrink-0"><Twitter className="h-4 w-4 text-sky-500" /></div>
                <Input
                  value={socialTwitter}
                  onChange={(e) => setSocialTwitter(e.target.value)}
                  disabled={!isEditing}
                  placeholder="@votre_compte"
                  className="border-[#EBE3D5] focus:border-sky-400 disabled:opacity-70"
                />
              </div>
              <div className="flex items-center gap-3">
                <div className="bg-blue-50 p-2 rounded-xl shrink-0"><Facebook className="h-4 w-4 text-blue-600" /></div>
                <Input
                  value={socialFacebook}
                  onChange={(e) => setSocialFacebook(e.target.value)}
                  disabled={!isEditing}
                  placeholder="Nom de votre page"
                  className="border-[#EBE3D5] focus:border-blue-400 disabled:opacity-70"
                />
              </div>
            </CardContent>
          </Card>
        </>
      )}

      {/* ── Save Button ── */}
      {isEditing && (
        <div className="flex gap-3">
          <Button onClick={handleSave} className="bg-[#1B5E20] hover:bg-[#15490F] text-white font-black">
            <Save className="h-4 w-4 mr-1.5" />
            Enregistrer les modifications
          </Button>
          <Button onClick={handleCancel} variant="outline" className="font-bold">
            Annuler
          </Button>
        </div>
      )}

      {/* ── Danger Zone ── */}
      <Card className="border-2 border-red-100">
        <CardContent className="pt-6">
          <h4 className="font-black text-red-600 mb-3">Zone de danger</h4>
          <Button
            onClick={() => setShowLogoutDialog(true)}
            variant="destructive"
            className="font-bold"
          >
            <LogOut className="h-4 w-4 mr-1.5" />
            Se déconnecter
          </Button>
        </CardContent>
      </Card>

      {/* Logout Dialog */}
      {showLogoutDialog && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white p-6 rounded-2xl max-w-md w-full shadow-2xl">
            <h3 className="text-lg font-black mb-3 text-[#2D1B08]">Se déconnecter ?</h3>
            <p className="text-[#5D4037] text-sm mb-5">
              Vous devrez vous reconnecter pour accéder à votre compte.
            </p>
            <div className="flex gap-3">
              <Button variant="outline" onClick={() => setShowLogoutDialog(false)} className="flex-1 font-bold">
                Annuler
              </Button>
              <Button variant="destructive" onClick={() => { logout(); }} className="flex-1 font-bold">
                Se déconnecter
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfilePage;
