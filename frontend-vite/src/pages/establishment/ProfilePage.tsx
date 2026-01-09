import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { 
  Building2, 
  ArrowLeft, 
  Save,
  MapPin,
  Phone,
  Mail,
  Globe,
  Image as ImageIcon,
  Upload
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';

const ProfilePage: React.FC = () => {
  const { user } = useAuth();
  const establishmentType = user?.role === 'hotel' ? 'hotel' : 'restaurant';
  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <Link to="/dashboard">
          <Button variant="ghost" size="sm" className="mb-4">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Retour
          </Button>
        </Link>
        <h1 className="text-3xl font-bold text-gray-900">
          Profil {establishmentType === 'hotel' ? "de l'Hôtel" : 'du Restaurant'}
        </h1>
        <p className="text-gray-600 mt-1">
          Gérez les informations de votre {establishmentType === 'hotel' ? 'hôtel' : 'restaurant'}
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Form */}
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Informations générales</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="name">
                  Nom {establishmentType === 'hotel' ? "de l'hôtel" : 'du restaurant'}
                </Label>
                <Input id="name" defaultValue={establishmentType === 'hotel' ? "Hôtel Teranga" : "Restaurant La Teranga"} />
              </div>
              <div>
                <Label htmlFor="type">Type d'établissement</Label>
                <Input 
                  id="type" 
                  value={establishmentType === 'hotel' ? 'Hôtel' : 'Restaurant'}
                  disabled
                  className="bg-gray-100"
                />
              </div>
              <div>
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  defaultValue="Hôtel de charme au cœur de Dakar, offrant un accueil chaleureux et des services de qualité."
                  rows={4}
                />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Coordonnées</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="phone">Téléphone</Label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <Input id="phone" defaultValue="+221 33 849 70 00" className="pl-10" />
                  </div>
                </div>
                <div>
                  <Label htmlFor="email">Email</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <Input id="email" defaultValue="contact@hotel-teranga.sn" className="pl-10" />
                  </div>
                </div>
              </div>
              <div>
                <Label htmlFor="address">Adresse</Label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input id="address" defaultValue="Avenue Cheikh Anta Diop, Dakar" className="pl-10" />
                </div>
              </div>
              <div>
                <Label htmlFor="website">Site web</Label>
                <div className="relative">
                  <Globe className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input id="website" defaultValue="www.hotel-teranga.sn" className="pl-10" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Photos de l'établissement</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
                <ImageIcon className="h-12 w-12 mx-auto text-gray-400 mb-4" />
                <p className="text-gray-600 mb-2">Ajoutez des photos pour mettre en valeur votre établissement</p>
                <Button variant="outline">
                  <Upload className="h-4 w-4 mr-2" />
                  Télécharger des images
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Photo de profil</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="relative w-full h-48 bg-gray-100 rounded-lg overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1564501049412-61c2a3083791?w=400"
                  alt="Établissement"
                  className="w-full h-full object-cover"
                />
              </div>
              <Button variant="outline" className="w-full">
                <Upload className="h-4 w-4 mr-2" />
                Changer la photo
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Statistiques</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Note moyenne</span>
                <span className="font-semibold">4.8/5</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Total réservations</span>
                <span className="font-semibold">124</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Avis clients</span>
                <span className="font-semibold">89</span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <Button className="w-full bg-emerald-600 hover:bg-emerald-700">
                <Save className="h-4 w-4 mr-2" />
                Enregistrer les modifications
              </Button>
              <Button variant="outline" className="w-full">
                Aperçu public
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;

