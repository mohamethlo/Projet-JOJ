import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import {
  Building,
  MapPin,
  Star,
  Users,
  Phone,
  Mail,
  Globe,
  Clock,
  Wifi,
  Car,
  Utensils,
  Home,
  Bed,
  Eye,
  Edit,
  Trash2,
  CheckCircle,
  XCircle,
  AlertTriangle,
  MessageSquare,
  Calendar,
  DollarSign
} from 'lucide-react';

interface AccommodationData {
  id: string;
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

interface AccommodationDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  accommodation: AccommodationData;
  onEdit?: (accommodation: AccommodationData) => void;
  onDelete?: (accommodationId: string) => void;
  onSuspend?: (accommodationId: string) => void;
  onActivate?: (accommodationId: string) => void;
}

const AccommodationDetailsModal: React.FC<AccommodationDetailsModalProps> = ({
  isOpen,
  onClose,
  accommodation,
  onEdit,
  onDelete,
  onSuspend,
  onActivate
}) => {
  const [showFullDescription, setShowFullDescription] = useState(false);

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'Hôtel':
        return <Building className="h-5 w-5" />;
      case 'Restaurant':
        return <Utensils className="h-5 w-5" />;
      case 'Auberge':
        return <Home className="h-5 w-5" />;
      default:
        return <Bed className="h-5 w-5" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Disponible':
        return 'bg-green-100 text-green-700';
      case 'Indisponible':
        return 'bg-red-100 text-red-700';
      case 'En attente':
        return 'bg-yellow-100 text-yellow-700';
      case 'Suspendu':
        return 'bg-gray-100 text-gray-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  const getAmenityIcon = (amenity: string) => {
    switch (amenity.toLowerCase()) {
      case 'wifi':
        return <Wifi className="h-4 w-4" />;
      case 'parking':
        return <Car className="h-4 w-4" />;
      case 'restaurant':
        return <Utensils className="h-4 w-4" />;
      default:
        return <CheckCircle className="h-4 w-4" />;
    }
  };

  const handleAction = (action: string) => {
    switch (action) {
      case 'edit':
        onEdit?.(accommodation);
        break;
      case 'delete':
        if (window.confirm('Êtes-vous sûr de vouloir supprimer cet établissement ?')) {
          onDelete?.(accommodation.id);
          onClose();
        }
        break;
      case 'suspend':
        onSuspend?.(accommodation.id);
        break;
      case 'activate':
        onActivate?.(accommodation.id);
        break;
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center space-x-2">
            {getTypeIcon(accommodation.type)}
            <span>{accommodation.name}</span>
            <Badge className={getStatusColor(accommodation.availability)}>
              {accommodation.availability}
            </Badge>
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Image principale */}
          {accommodation.image && (
            <div className="w-full h-64 bg-gray-200 rounded-lg overflow-hidden">
              <img 
                src={accommodation.image} 
                alt={accommodation.name}
                className="w-full h-full object-cover"
              />
            </div>
          )}

          {/* Informations principales */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardContent className="p-4">
                <h3 className="font-semibold mb-3 flex items-center">
                  <Building className="h-5 w-5 text-blue-600 mr-2" />
                  Informations générales
                </h3>
                <div className="space-y-3">
                  <div className="flex items-center space-x-2">
                    <MapPin className="h-4 w-4 text-gray-500" />
                    <span className="text-sm">{accommodation.location}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Star className="h-4 w-4 text-yellow-500" />
                    <span className="text-sm">{accommodation.rating}/5 ({accommodation.reviews} avis)</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <DollarSign className="h-4 w-4 text-green-500" />
                    <span className="text-sm font-semibold">{accommodation.price}</span>
                  </div>
                  {accommodation.address && (
                    <div className="flex items-center space-x-2">
                      <MapPin className="h-4 w-4 text-gray-500" />
                      <span className="text-sm">{accommodation.address}</span>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4">
                <h3 className="font-semibold mb-3 flex items-center">
                  <MessageSquare className="h-5 w-5 text-purple-600 mr-2" />
                  Contact
                </h3>
                <div className="space-y-3">
                  {accommodation.phone && (
                    <div className="flex items-center space-x-2">
                      <Phone className="h-4 w-4 text-gray-500" />
                      <span className="text-sm">{accommodation.phone}</span>
                    </div>
                  )}
                  {accommodation.email && (
                    <div className="flex items-center space-x-2">
                      <Mail className="h-4 w-4 text-gray-500" />
                      <span className="text-sm">{accommodation.email}</span>
                    </div>
                  )}
                  {accommodation.website && (
                    <div className="flex items-center space-x-2">
                      <Globe className="h-4 w-4 text-gray-500" />
                      <a href={accommodation.website} target="_blank" rel="noopener noreferrer" className="text-sm text-blue-600 hover:underline">
                        Site web
                      </a>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Description */}
          <Card>
            <CardContent className="p-4">
              <h3 className="font-semibold mb-3">Description</h3>
              <p className="text-gray-700 leading-relaxed">
                {showFullDescription ? accommodation.description : `${accommodation.description.substring(0, 300)}...`}
              </p>
              {accommodation.description.length > 300 && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setShowFullDescription(!showFullDescription)}
                  className="mt-3"
                >
                  {showFullDescription ? 'Voir moins' : 'Lire la suite'}
                </Button>
              )}
            </CardContent>
          </Card>

          {/* Horaires et politiques */}
          {(accommodation.checkIn || accommodation.checkOut || accommodation.policies) && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {(accommodation.checkIn || accommodation.checkOut) && (
                <Card>
                  <CardContent className="p-4">
                    <h3 className="font-semibold mb-3 flex items-center">
                      <Clock className="h-5 w-5 text-orange-600 mr-2" />
                      Horaires
                    </h3>
                    <div className="space-y-2">
                      {accommodation.checkIn && (
                        <div className="flex items-center space-x-2">
                          <CheckCircle className="h-4 w-4 text-green-500" />
                          <span className="text-sm">Arrivée: {accommodation.checkIn}</span>
                        </div>
                      )}
                      {accommodation.checkOut && (
                        <div className="flex items-center space-x-2">
                          <XCircle className="h-4 w-4 text-red-500" />
                          <span className="text-sm">Départ: {accommodation.checkOut}</span>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              )}

              {accommodation.policies && accommodation.policies.length > 0 && (
                <Card>
                  <CardContent className="p-4">
                    <h3 className="font-semibold mb-3 flex items-center">
                      <AlertTriangle className="h-5 w-5 text-yellow-600 mr-2" />
                      Politiques
                    </h3>
                    <ul className="space-y-2">
                      {accommodation.policies.map((policy, index) => (
                        <li key={index} className="flex items-start space-x-2">
                          <div className="w-1.5 h-1.5 bg-gray-400 rounded-full mt-2 flex-shrink-0"></div>
                          <span className="text-sm">{policy}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              )}
            </div>
          )}

          {/* Équipements */}
          {accommodation.amenities && accommodation.amenities.length > 0 && (
            <Card>
              <CardContent className="p-4">
                <h3 className="font-semibold mb-3 flex items-center">
                  <CheckCircle className="h-5 w-5 text-green-600 mr-2" />
                  Équipements et services
                </h3>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                  {accommodation.amenities.map((amenity, index) => (
                    <div key={index} className="flex items-center space-x-2 p-2 bg-gray-50 rounded-lg">
                      {getAmenityIcon(amenity)}
                      <span className="text-sm">{amenity}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          {/* Galerie d'images */}
          {accommodation.images && accommodation.images.length > 0 && (
            <Card>
              <CardContent className="p-4">
                <h3 className="font-semibold mb-3 flex items-center">
                  <Eye className="h-5 w-5 text-purple-600 mr-2" />
                  Galerie d'images ({accommodation.images.length})
                </h3>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                  {accommodation.images.map((image, index) => (
                    <div key={index} className="relative group cursor-pointer">
                      <div className="w-full h-32 bg-gray-200 rounded-lg overflow-hidden">
                        <img 
                          src={image} 
                          alt={`Image ${index + 1}`}
                          className="w-full h-full object-cover transition-transform group-hover:scale-105"
                        />
                      </div>
                      <div className="absolute top-2 left-2 bg-black bg-opacity-70 text-white text-xs px-2 py-1 rounded">
                        {index + 1}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}
        </div>

        <DialogFooter className="flex justify-between">
          <div className="flex space-x-2">
            {accommodation.availability === 'Disponible' && (
              <Button
                variant="outline"
                className="border-yellow-500 text-yellow-600 hover:bg-yellow-50"
                onClick={() => handleAction('suspend')}
              >
                <AlertTriangle className="h-4 w-4 mr-2" />
                Suspendre
              </Button>
            )}
            {accommodation.availability === 'Suspendu' && (
              <Button
                className="bg-green-600 hover:bg-green-700"
                onClick={() => handleAction('activate')}
              >
                <CheckCircle className="h-4 w-4 mr-2" />
                Réactiver
              </Button>
            )}
            {accommodation.availability === 'Indisponible' && (
              <Button
                className="bg-green-600 hover:bg-green-700"
                onClick={() => handleAction('activate')}
              >
                <CheckCircle className="h-4 w-4 mr-2" />
                Activer
              </Button>
            )}
          </div>
          
          <div className="flex space-x-2">
            <Button variant="outline" onClick={() => handleAction('edit')}>
              <Edit className="h-4 w-4 mr-2" />
              Modifier
            </Button>
            <Button
              variant="outline"
              className="border-red-500 text-red-600 hover:bg-red-50"
              onClick={() => handleAction('delete')}
            >
              <Trash2 className="h-4 w-4 mr-2" />
              Supprimer
            </Button>
            <Button onClick={onClose}>
              Fermer
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default AccommodationDetailsModal;