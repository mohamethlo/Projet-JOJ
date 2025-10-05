import React, { useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { useLanguage } from '@/context/LanguageContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { 
  User, 
  Mail, 
  Phone, 
  MapPin, 
  Globe, 
  Heart, 
  Star, 
  Calendar,
  Edit3,
  Save,
  X,
  Camera,
  Shield,
  Award,
  MessageSquare,
  Users,
  Clock,
  LogOut
} from 'lucide-react';
import ProfileStats from '@/components/profile/ProfileStats';
import LanguageSelector from '@/components/profile/LanguageSelector';
import InterestSelector from '@/components/profile/InterestSelector';

const ProfilePage: React.FC = () => {
  const { user, updateProfile, logout } = useAuth();
  const { t } = useLanguage();
  const [isEditing, setIsEditing] = useState(false);
  const [showLogoutDialog, setShowLogoutDialog] = useState(false);
  const [editedProfile, setEditedProfile] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: user?.phone || '',
    location: user?.location || '',
    languages: user?.languages || [],
    interests: user?.interests || [],
    bio: user?.bio || ''
  });

  // Données mockées pour la démonstration
  const mockStats = {
    totalBookings: 12,
    totalReviews: 8,
    averageRating: 4.7,
    totalMatches: 15,
    responseTime: '2h',
    completionRate: 95
  };

  const mockReviews = [
    {
      id: 1,
      reviewer: 'Marie Dubois',
      rating: 5,
      comment: 'Excellent guide, très professionnel et passionné par l\'histoire du Sénégal.',
      date: '2024-01-10'
    },
    {
      id: 2,
      reviewer: 'Jean Martin',
      rating: 4,
      comment: 'Très bonne expérience, je recommande vivement.',
      date: '2024-01-08'
    }
  ];

  const handleSave = async () => {
    try {
      await updateProfile(editedProfile);
      setIsEditing(false);
      // TODO: Implémenter les toasts
      console.log('Profil mis à jour avec succès');
    } catch (error) {
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
      bio: user?.bio || ''
    });
    setIsEditing(false);
  };

  const handleLogout = () => {
    setShowLogoutDialog(true);
  };

  const confirmLogout = () => {
    logout();
    console.log('Déconnexion réussie');
  };

  const getRoleBadgeColor = (role: string) => {
    switch (role) {
      case 'admin': return 'bg-red-100 text-red-800';
      case 'guide': return 'bg-blue-100 text-blue-800';
      case 'organizer': return 'bg-green-100 text-green-800';
      case 'security': return 'bg-purple-100 text-purple-800';
      default: return 'bg-orange-100 text-orange-800';
    }
  };

  const getRoleIcon = (role: string) => {
    switch (role) {
      case 'admin': return <Shield className="h-4 w-4" />;
      case 'guide': return <Award className="h-4 w-4" />;
      case 'organizer': return <Calendar className="h-4 w-4" />;
      case 'security': return <Shield className="h-4 w-4" />;
      default: return <User className="h-4 w-4" />;
    }
  };

  // Configuration des onglets selon le rôle
  const getTabsForRole = (role: string) => {
    switch (role) {
      case 'tourist':
      case 'local':
        return [
          { value: 'overview', label: 'Aperçu' },
          { value: 'personal', label: 'Informations' },
          { value: 'bookings', label: 'Mes Réservations' },
          { value: 'reviews', label: 'Mes Avis' }
        ];
      case 'guide':
        return [
          { value: 'overview', label: 'Aperçu' },
          { value: 'personal', label: 'Informations' },
          { value: 'reviews', label: 'Avis Reçus' },
          { value: 'stats', label: 'Statistiques' }
        ];
      case 'organizer':
        return [
          { value: 'overview', label: 'Aperçu' },
          { value: 'personal', label: 'Informations' },
          { value: 'reviews', label: 'Avis Reçus' }
        ];
      case 'admin':
        return [
          { value: 'overview', label: 'Aperçu' },
          { value: 'personal', label: 'Informations' },
          { value: 'stats', label: 'Statistiques' }
        ];
      default:
        return [
          { value: 'overview', label: 'Aperçu' },
          { value: 'personal', label: 'Informations' }
        ];
    }
  };

  const userTabs = getTabsForRole(user?.role || 'tourist');

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

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      {/* Header du profil */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Mon Profil</h1>
          <p className="text-gray-600 mt-1">Gérez vos informations personnelles et vos préférences</p>
        </div>
        <Button
          onClick={() => setIsEditing(!isEditing)}
          variant={isEditing ? "outline" : "default"}
          className="flex items-center space-x-2"
        >
          {isEditing ? <X className="h-4 w-4" /> : <Edit3 className="h-4 w-4" />}
          <span>{isEditing ? 'Annuler' : 'Modifier'}</span>
        </Button>
      </div>

      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList className="grid w-full" style={{ gridTemplateColumns: `repeat(${userTabs.length}, 1fr)` }}>
          {userTabs.map((tab) => (
            <TabsTrigger key={tab.value} value={tab.value}>
              {tab.label}
            </TabsTrigger>
          ))}
        </TabsList>

        {/* Onglet Aperçu */}
        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Carte principale du profil */}
            <div className="lg:col-span-2">
              <Card>
                <CardHeader>
                  <div className="flex items-center space-x-4">
                    <div className="relative">
                      <Avatar className="h-20 w-20">
                        <AvatarImage src={user.avatar} />
                        <AvatarFallback className="text-lg">
                          {user.name.charAt(0).toUpperCase()}
                        </AvatarFallback>
                      </Avatar>
                      {isEditing && (
                        <Button
                          size="sm"
                          className="absolute -bottom-2 -right-2 h-8 w-8 rounded-full"
                          variant="secondary"
                        >
                          <Camera className="h-4 w-4" />
                        </Button>
                      )}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-2">
                        <h2 className="text-2xl font-bold">{user.name}</h2>
                        <Badge className={getRoleBadgeColor(user.role)}>
                          {getRoleIcon(user.role)}
                          <span className="ml-1">{t(user.role)}</span>
                        </Badge>
                      </div>
                      <p className="text-gray-600 mb-2">{user.email}</p>
                      {user.location && (
                        <div className="flex items-center text-gray-500">
                          <MapPin className="h-4 w-4 mr-1" />
                          <span>{user.location}</span>
                        </div>
                      )}
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {/* Langues */}
                    <div>
                      <h4 className="font-medium mb-2 flex items-center">
                        <Globe className="h-4 w-4 mr-2" />
                        Langues parlées
                      </h4>
                      <LanguageSelector
                        languages={editedProfile.languages}
                        onLanguagesChange={(languages) => setEditedProfile({...editedProfile, languages})}
                        disabled={!isEditing}
                      />
                    </div>

                    {/* Centres d'intérêt */}
                    <div>
                      <h4 className="font-medium mb-2 flex items-center">
                        <Heart className="h-4 w-4 mr-2" />
                        Centres d'intérêt
                      </h4>
                      <InterestSelector
                        interests={editedProfile.interests}
                        onInterestsChange={(interests) => setEditedProfile({...editedProfile, interests})}
                        disabled={!isEditing}
                      />
                    </div>

                    {/* Bio */}
                    {user.bio && (
                      <div>
                        <h4 className="font-medium mb-2">À propos</h4>
                        <p className="text-gray-600">{user.bio}</p>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Statistiques */}
            <div className="space-y-6">
              <ProfileStats stats={mockStats} role={user.role} />

              {/* Statut de vérification */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Shield className="h-5 w-5 mr-2" />
                    Vérification
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center space-x-2">
                    {user.isVerified ? (
                      <>
                        <div className="h-2 w-2 bg-green-500 rounded-full"></div>
                        <span className="text-sm text-green-600">Compte vérifié</span>
                      </>
                    ) : (
                      <>
                        <div className="h-2 w-2 bg-yellow-500 rounded-full"></div>
                        <span className="text-sm text-yellow-600">En attente de vérification</span>
                      </>
                    )}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>

        {/* Onglet Informations personnelles */}
        <TabsContent value="personal" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Informations personnelles</CardTitle>
              <CardDescription>
                Modifiez vos informations personnelles et vos préférences
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="name">Nom complet</Label>
                  <Input
                    id="name"
                    value={editedProfile.name}
                    onChange={(e) => setEditedProfile({...editedProfile, name: e.target.value})}
                    disabled={!isEditing}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={editedProfile.email}
                    onChange={(e) => setEditedProfile({...editedProfile, email: e.target.value})}
                    disabled={!isEditing}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Téléphone</Label>
                  <Input
                    id="phone"
                    value={editedProfile.phone}
                    onChange={(e) => setEditedProfile({...editedProfile, phone: e.target.value})}
                    disabled={!isEditing}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="location">Localisation</Label>
                  <Input
                    id="location"
                    value={editedProfile.location}
                    onChange={(e) => setEditedProfile({...editedProfile, location: e.target.value})}
                    disabled={!isEditing}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="bio">Biographie</Label>
                <Textarea
                  id="bio"
                  value={editedProfile.bio}
                  onChange={(e) => setEditedProfile({...editedProfile, bio: e.target.value})}
                  disabled={!isEditing}
                  placeholder="Parlez-nous de vous..."
                  rows={4}
                />
              </div>

              {isEditing && (
                <div className="flex space-x-4">
                  <Button onClick={handleSave} className="flex items-center space-x-2">
                    <Save className="h-4 w-4" />
                    <span>Sauvegarder</span>
                  </Button>
                  <Button onClick={handleCancel} variant="outline">
                    Annuler
                  </Button>
                </div>
              )}

              {/* Section de déconnexion */}
              <div className="pt-6 border-t">
                <h4 className="font-medium mb-4 text-red-600">Zone de danger</h4>
                <Button 
                  onClick={handleLogout} 
                  variant="destructive" 
                  className="flex items-center space-x-2"
                >
                  <LogOut className="h-4 w-4" />
                  <span>Se déconnecter</span>
                </Button>
                <p className="text-sm text-gray-500 mt-2">
                  Vous devrez vous reconnecter pour accéder à votre compte.
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Onglet Avis Reçus (Guide/Organisateur) */}
        {(user.role === 'guide' || user.role === 'organizer') && (
          <TabsContent value="reviews" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <MessageSquare className="h-5 w-5 mr-2" />
                  Avis reçus
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {mockReviews.map((review) => (
                    <div key={review.id} className="p-4 border rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-medium">{review.reviewer}</h4>
                        <div className="flex items-center">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`h-4 w-4 ${
                                i < review.rating ? 'text-yellow-400 fill-current' : 'text-gray-300'
                              }`}
                            />
                          ))}
                        </div>
                      </div>
                      <p className="text-gray-600 mb-2">{review.comment}</p>
                      <p className="text-sm text-gray-500">{review.date}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        )}

        {/* Onglet Statistiques (Guide/Admin) */}
        {(user.role === 'guide' || user.role === 'admin') && (
          <TabsContent value="stats" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Award className="h-5 w-5 mr-2" />
                  Statistiques détaillées
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ProfileStats stats={mockStats} role={user.role} />
              </CardContent>
            </Card>
          </TabsContent>
        )}
      </Tabs>

      {/* Dialog de confirmation de déconnexion */}
      {showLogoutDialog && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg max-w-md w-full mx-4">
            <h3 className="text-lg font-semibold mb-4">Déconnexion</h3>
            <p className="text-gray-600 mb-6">
              Êtes-vous sûr de vouloir vous déconnecter ? Vous devrez vous reconnecter pour accéder à votre compte.
            </p>
            <div className="flex space-x-2">
              <Button 
                variant="outline" 
                onClick={() => setShowLogoutDialog(false)}
                className="flex-1"
              >
                Annuler
              </Button>
              <Button 
                variant="destructive" 
                onClick={confirmLogout}
                className="flex-1"
              >
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
