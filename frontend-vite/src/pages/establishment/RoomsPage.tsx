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
      image: 'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=400'
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
      image: 'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=400'
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
      image: 'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=400'
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
      image: 'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=400'
    }
  ]);

  const filteredRooms = rooms.filter(room =>
    room.number.toLowerCase().includes(searchTerm.toLowerCase()) ||
    room.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
    room.status.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAddRoom = () => {
    setSelectedRoom(null);
    setIsEditing(false);
    setIsDialogOpen(true);
  };

  const handleEditRoom = (room: any) => {
    setSelectedRoom(room);
    setIsEditing(true);
    setIsDialogOpen(true);
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
                src={room.image}
                alt={`Chambre ${room.number}`}
                className="w-full h-full object-cover"
              />
              <div className="absolute top-3 right-3">
                {getStatusBadge(room.status)}
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
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
              Annuler
            </Button>
            <Button className="bg-emerald-600 hover:bg-emerald-700">
              {isEditing ? 'Enregistrer' : 'Ajouter'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default RoomsPage;

