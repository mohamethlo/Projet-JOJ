import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import {
  Bed,
  Plus,
  Search,
  Edit,
  Trash2,
  CheckCircle,
  XCircle,
  MapPin,
  Users,
  Wifi,
  Tv,
  Car,
  Coffee,
  Waves,
  ArrowLeft
} from 'lucide-react';
import { Link, Navigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

const RoomsPage: React.FC = () => {
  const { user } = useAuth();

  // Rediriger les restaurants vers leur dashboard
  if (user?.role === 'restaurant') {
    return <Navigate to="/dashboard" replace />;
  }

  const [searchTerm, setSearchTerm] = useState('');
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedRoom, setSelectedRoom] = useState<any>(null);
  const [isEditing, setIsEditing] = useState(false);

  const [rooms, setRooms] = useState([
    {
      id: '1',
      number: '101',
      type: 'Double',
      price: '25,000 FCFA',
      capacity: 2,
      status: 'Disponible',
      amenities: ['WiFi', 'TV', 'Climatisation', 'Salle de bain privée'],
      description: 'Chambre confortable avec vue sur la mer',
      images: ['https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=400', 'https://images.unsplash.com/photo-1582719471384-894fbb16e074?w=400']
    },
    {
      id: '2',
      number: '102',
      type: 'Suite Deluxe',
      price: '45,000 FCFA',
      capacity: 4,
      status: 'Occupée',
      amenities: ['WiFi', 'TV', 'Climatisation', 'Salle de bain privée', 'Balcon', 'Mini-bar'],
      description: 'Suite spacieuse avec balcon et vue panoramique',
      images: ['https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=400']
    },
    {
      id: '3',
      number: '103',
      type: 'Simple',
      price: '18,000 FCFA',
      capacity: 1,
      status: 'Disponible',
      amenities: ['WiFi', 'TV', 'Ventilateur'],
      description: 'Chambre simple et fonctionnelle',
      images: ['https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=400']
    },
    {
      id: '4',
      number: '201',
      type: 'Famille',
      price: '55,000 FCFA',
      capacity: 6,
      status: 'Réservée',
      amenities: ['WiFi', 'TV', 'Climatisation', 'Salle de bain privée', 'Salon', 'Cuisine équipée'],
      description: 'Chambre familiale spacieuse avec salon et cuisine',
      images: ['https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=400']
    }
  ]);

  const [formImages, setFormImages] = useState<string[]>(['']);

  const filteredRooms = rooms.filter(room =>
    room.number.toLowerCase().includes(searchTerm.toLowerCase()) ||
    room.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
    room.status.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAddRoom = () => {
    setSelectedRoom(null);
    setIsEditing(false);
    setFormImages(['']);
    setIsDialogOpen(true);
  };

  const handleEditRoom = (room: any) => {
    setSelectedRoom(room);
    setIsEditing(true);
    setFormImages(room.images && room.images.length > 0 ? [...room.images] : ['']);
    setIsDialogOpen(true);
  };

  const handleAddImageField = () => {
    setFormImages([...formImages, '']);
  };

  const handleRemoveImageField = (index: number) => {
    const newImages = [...formImages];
    newImages.splice(index, 1);
    setFormImages(newImages.length > 0 ? newImages : ['']);
  };

  const handleImageChange = (index: number, value: string) => {
    const newImages = [...formImages];
    newImages[index] = value;
    setFormImages(newImages);
  };

  const handleSaveRoom = () => {
    const numberInput = document.getElementById('number') as HTMLInputElement;
    const priceInput = document.getElementById('price') as HTMLInputElement;
    const capacityInput = document.getElementById('capacity') as HTMLInputElement;
    const descriptionInput = document.getElementById('description') as HTMLInputElement;
    const amenitiesInput = document.getElementById('amenities') as HTMLInputElement;

    // Nettoyer les URLs d'images (enlever les vides)
    const cleanedImages = formImages.filter(img => img.trim() !== '');
    if (cleanedImages.length === 0) {
      alert('Veuillez ajouter au moins une image.');
      return;
    }

    const roomData = {
      id: isEditing ? selectedRoom.id : Math.random().toString(36).substr(2, 9),
      number: numberInput.value,
      type: (document.querySelector('[data-placeholder="Sélectionner"]') as any)?.textContent || selectedRoom?.type || 'Simple',
      price: priceInput.value,
      capacity: parseInt(capacityInput.value),
      status: selectedRoom?.status || 'Disponible',
      description: descriptionInput.value,
      amenities: amenitiesInput.value.split(',').map(a => a.trim()),
      images: cleanedImages
    };

    if (isEditing) {
      setRooms(rooms.map(r => r.id === selectedRoom.id ? roomData : r));
    } else {
      setRooms([...rooms, roomData]);
    }

    setIsDialogOpen(false);
  };

  const handleDeleteRoom = (id: string) => {
    if (confirm('Êtes-vous sûr de vouloir supprimer cette chambre ?')) {
      setRooms(rooms.filter(room => room.id !== id));
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'Disponible':
        return <Badge className="bg-emerald-500 text-white">Disponible</Badge>;
      case 'Occupée':
        return <Badge className="bg-red-500 text-white">Occupée</Badge>;
      case 'Réservée':
        return <Badge className="bg-amber-500 text-white">Réservée</Badge>;
      case 'Maintenance':
        return <Badge className="bg-gray-500 text-white">Maintenance</Badge>;
      default:
        return <Badge>{status}</Badge>;
    }
  };

  const getAmenityIcon = (amenity: string) => {
    switch (amenity) {
      case 'WiFi':
        return <Wifi className="h-4 w-4" />;
      case 'TV':
        return <Tv className="h-4 w-4" />;
      case 'Parking':
        return <Car className="h-4 w-4" />;
      case 'Petit-déjeuner':
        return <Coffee className="h-4 w-4" />;
      case 'Piscine':
        return <Waves className="h-4 w-4" />;
      default:
        return null;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <Link to="/dashboard">
            <Button variant="ghost" size="sm" className="mb-4">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Retour
            </Button>
          </Link>
          <h1 className="text-3xl font-bold text-gray-900">Gestion des Chambres</h1>
          <p className="text-gray-600 mt-1">Gérez vos chambres et leur disponibilité</p>
        </div>
        <Button onClick={handleAddRoom} className="bg-emerald-600 hover:bg-emerald-700">
          <Plus className="h-4 w-4 mr-2" />
          Ajouter une chambre
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Total Chambres</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{rooms.length}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Disponibles</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-emerald-600">
              {rooms.filter(r => r.status === 'Disponible').length}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Occupées</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-red-600">
              {rooms.filter(r => r.status === 'Occupée').length}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Réservées</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-amber-600">
              {rooms.filter(r => r.status === 'Réservée').length}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Search */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex items-center space-x-2">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Rechercher une chambre par numéro, type ou statut..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Rooms Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredRooms.map((room) => (
          <Card key={room.id} className="overflow-hidden hover:shadow-lg transition-shadow">
            <div className="relative h-48">
              <img
                src={room.images[0]}
                alt={`Chambre ${room.number}`}
                className="w-full h-full object-cover"
              />
              <div className="absolute top-3 right-3 flex flex-col gap-2 scale-90 origin-top-right">
                {getStatusBadge(room.status)}
                {room.images.length > 1 && (
                  <Badge variant="secondary" className="bg-white/80 backdrop-blur-sm self-end">
                    +{room.images.length - 1} photo{room.images.length > 2 ? 's' : ''}
                  </Badge>
                )}
              </div>
            </div>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-xl">Chambre {room.number}</CardTitle>
                <span className="text-2xl font-bold text-emerald-600">{room.price}</span>
              </div>
              <p className="text-sm text-gray-600">{room.type}</p>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-center text-sm text-gray-600">
                  <Users className="h-4 w-4 mr-2" />
                  Capacité: {room.capacity} personne{room.capacity > 1 ? 's' : ''}
                </div>
                <p className="text-sm text-gray-600 line-clamp-2">{room.description}</p>
                <div className="flex flex-wrap gap-2">
                  {room.amenities.slice(0, 4).map((amenity, idx) => (
                    <div
                      key={idx}
                      className="flex items-center space-x-1 text-xs bg-gray-100 px-2 py-1 rounded"
                    >
                      {getAmenityIcon(amenity)}
                      <span>{amenity}</span>
                    </div>
                  ))}
                  {room.amenities.length > 4 && (
                    <span className="text-xs text-gray-500">+{room.amenities.length - 4}</span>
                  )}
                </div>
                <div className="flex items-center space-x-2 pt-2 border-t">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleEditRoom(room)}
                    className="flex-1"
                  >
                    <Edit className="h-4 w-4 mr-1" />
                    Modifier
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleDeleteRoom(room.id)}
                    className="text-red-600 hover:text-red-700 hover:bg-red-50"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Add/Edit Room Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>
              {isEditing ? 'Modifier la chambre' : 'Ajouter une nouvelle chambre'}
            </DialogTitle>
            <DialogDescription>
              Remplissez les informations de la chambre
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="number">Numéro de chambre</Label>
                <Input id="number" defaultValue={selectedRoom?.number} placeholder="101" />
              </div>
              <div>
                <Label htmlFor="type">Type de chambre</Label>
                <Select defaultValue={selectedRoom?.type}>
                  <SelectTrigger>
                    <SelectValue placeholder="Sélectionner" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Simple">Simple</SelectItem>
                    <SelectItem value="Double">Double</SelectItem>
                    <SelectItem value="Suite Deluxe">Suite Deluxe</SelectItem>
                    <SelectItem value="Famille">Famille</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="price">Prix par nuit</Label>
                <Input id="price" defaultValue={selectedRoom?.price} placeholder="25,000 FCFA" />
              </div>
              <div>
                <Label htmlFor="capacity">Capacité</Label>
                <Input id="capacity" type="number" defaultValue={selectedRoom?.capacity} placeholder="2" />
              </div>
            </div>
            <div>
              <Label htmlFor="status">Statut</Label>
              <Select defaultValue={selectedRoom?.status || 'Disponible'}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Disponible">Disponible</SelectItem>
                  <SelectItem value="Occupée">Occupée</SelectItem>
                  <SelectItem value="Réservée">Réservée</SelectItem>
                  <SelectItem value="Maintenance">Maintenance</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                defaultValue={selectedRoom?.description}
                placeholder="Description de la chambre..."
                rows={3}
              />
            </div>
            <div>
              <Label htmlFor="amenities">Équipements (séparés par des virgules)</Label>
              <Input
                id="amenities"
                defaultValue={selectedRoom?.amenities?.join(', ')}
                placeholder="WiFi, TV, Climatisation, Salle de bain privée"
              />
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <Label>Images de la chambre (URLs)</Label>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={handleAddImageField}
                  className="h-8 text-emerald-600 border-emerald-200 hover:bg-emerald-50"
                >
                  <Plus className="h-4 w-4 mr-1" />
                  Ajouter une image
                </Button>
              </div>

              <div className="grid gap-3">
                {formImages.map((url, index) => (
                  <div key={index} className="flex gap-2">
                    <div className="relative flex-1">
                      <Input
                        value={url}
                        onChange={(e) => handleImageChange(index, e.target.value)}
                        placeholder="https://images.unsplash.com/photo-..."
                        className="pr-10"
                      />
                      {url && (
                        <div className="absolute right-2 top-1/2 -translate-y-1/2 w-6 h-6 rounded overflow-hidden border">
                          <img src={url} alt="" className="w-full h-full object-cover" />
                        </div>
                      )}
                    </div>
                    {formImages.length > 1 && (
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        onClick={() => handleRemoveImageField(index)}
                        className="text-red-500 hover:text-red-600 hover:bg-red-50 shrink-0"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
              Annuler
            </Button>
            <Button onClick={handleSaveRoom} className="bg-emerald-600 hover:bg-emerald-700">
              {isEditing ? 'Enregistrer' : 'Ajouter'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default RoomsPage;

