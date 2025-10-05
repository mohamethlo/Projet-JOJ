import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { 
  Star, 
  MapPin, 
  Calendar, 
  Heart, 
  Eye,
  Building,
  Utensils,
  Home,
  Bed,
  Wifi,
  Car,
  Waves,
  Dumbbell,
  Wind
} from 'lucide-react';
import { getReviewStats, getRecentReviews } from '@/lib/mockReviews';
import { AccommodationDetailsModal, AccommodationBookingModal, ReviewModal, ReviewsModal } from '@/components/modals';

interface AccommodationProps {
  id: string;
  name: string;
  description: string;
  type: string;
  location: string;
  rating: number;
  reviews: number;
  price: string;
  image: string;
  amenities: string[];
  featured: boolean;
  availability: string;
  capacity?: number;
  checkIn?: string;
  checkOut?: string;
}

interface AccommodationCardProps {
  accommodation: AccommodationProps;
  viewMode: 'grid' | 'list';
}

const AccommodationCard: React.FC<AccommodationCardProps> = ({ accommodation, viewMode }) => {
  const [isFavorited, setIsFavorited] = useState(false);
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);
  const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);
  const [isReviewsModalOpen, setIsReviewsModalOpen] = useState(false);

  const handleFavorite = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsFavorited(!isFavorited);
  };

  const handleBooking = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsBookingModalOpen(true);
  };

  const handleViewDetails = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsDetailsModalOpen(true);
  };

  const handleReview = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsReviewModalOpen(true);
  };

  const handleViewReviews = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsReviewsModalOpen(true);
  };

  // Vérifier si l'utilisateur peut laisser un avis
  // En mode développement, on affiche le bouton pour tous les utilisateurs
  const canLeaveReviewForAccommodation = true; // Toujours visible pour le développement

  // Récupérer les données des avis
  const reviewStats = getReviewStats(accommodation.id, 'accommodation');
  const recentReviews = getRecentReviews(accommodation.id, 'accommodation', 2);

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'Hôtel':
        return <Building className="h-4 w-4" />;
      case 'Restaurant':
        return <Utensils className="h-4 w-4" />;
      case 'Auberge':
        return <Home className="h-4 w-4" />;
      default:
        return <Bed className="h-4 w-4" />;
    }
  };

  const getAmenityIcon = (amenity: string) => {
    switch (amenity) {
      case 'WiFi':
        return <Wifi className="h-3 w-3" />;
      case 'Parking':
        return <Car className="h-3 w-3" />;
      case 'Piscine':
        return <Waves className="h-3 w-3" />;
      case 'Gym':
        return <Dumbbell className="h-3 w-3" />;
      case 'Climatisation':
        return <Wind className="h-3 w-3" />;
      default:
        return <Star className="h-3 w-3" />;
    }
  };

  if (viewMode === 'list') {
    return (
      <>
        <Card className="hover:shadow-lg transition-shadow duration-300 overflow-hidden">
          <div className="flex">
            <div className="relative w-64 h-48 flex-shrink-0">
              <img 
                src={accommodation.image} 
                alt={accommodation.name}
                className="w-full h-full object-cover"
              />
              {accommodation.featured && (
                <Badge className="absolute top-2 left-2 bg-orange-500 text-white">
                  Recommandé
                </Badge>
              )}
              <Button
                size="sm"
                variant="ghost"
                className="absolute top-2 right-2 h-8 w-8 p-0 rounded-full bg-white shadow-md hover:bg-gray-50"
                onClick={handleFavorite}
              >
                <Heart className={`h-4 w-4 ${isFavorited ? 'fill-red-500 text-red-500' : 'text-gray-400'}`} />
              </Button>
            </div>
            
            <CardContent className="p-6 flex-1">
              <div className="flex justify-between items-start mb-3">
                <div>
                  <h3 className="font-bold text-xl text-gray-900 mb-1">{accommodation.name}</h3>
                  <div className="flex items-center space-x-2 text-sm text-gray-600 mb-2">
                    {getTypeIcon(accommodation.type)}
                    <span>{accommodation.type}</span>
                    <span>•</span>
                    <MapPin className="h-4 w-4" />
                    <span>{accommodation.location}</span>
                  </div>
                  <div className="flex items-center space-x-1 text-sm">
                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    <span className="font-semibold">{accommodation.rating}</span>
                    <span className="text-gray-500">({accommodation.reviews} avis)</span>
                  </div>
                </div>
                <div className="text-right">
                  <div className="font-bold text-xl text-blue-600">{accommodation.price}</div>
                  <div className="text-xs text-gray-500">
                    {accommodation.type === 'Restaurant' ? 'par personne' : 'par nuit'}
                  </div>
                </div>
              </div>
              
              <p className="text-gray-600 mb-4 line-clamp-2">{accommodation.description}</p>
              
              <div className="flex items-center justify-between">
                <div className="flex flex-wrap gap-1">
                  {accommodation.amenities.slice(0, 4).map((amenity, index) => (
                    <Badge key={index} variant="outline" className="text-xs flex items-center space-x-1">
                      {getAmenityIcon(amenity)}
                      <span>{amenity}</span>
                    </Badge>
                  ))}
                  {accommodation.amenities.length > 4 && (
                    <Badge variant="outline" className="text-xs">
                      +{accommodation.amenities.length - 4}
                    </Badge>
                  )}
                </div>
                
                <div className="flex gap-2">
                  <Button 
                    variant="outline" 
                    size="sm"
                    className="hover:bg-gray-50"
                    onClick={handleViewDetails}
                  >
                    <Eye className="h-4 w-4 mr-1" />
                    Détails
                  </Button>
                  <Button 
                    onClick={handleBooking}
                    className="bg-blue-600 hover:bg-blue-700 text-white"
                    size="sm"
                  >
                    <Calendar className="h-4 w-4 mr-1" />
                    Réserver
                  </Button>
                  {canLeaveReviewForAccommodation && (
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={handleReview}
                      className="text-yellow-600 border-yellow-600 hover:bg-yellow-50"
                    >
                      <Star className="h-4 w-4 mr-1" />
                      Avis
                    </Button>
                  )}
                </div>
              </div>
              
              {/* Section des avis pour le mode liste */}
              {reviewStats.totalReviews > 0 && (
                <div className="mt-4 p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center space-x-2">
                      <div className="flex items-center space-x-1">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <Star
                            key={star}
                            className={`h-3 w-3 ${
                              star <= Math.round(reviewStats.averageRating)
                                ? 'text-yellow-400 fill-current'
                                : 'text-gray-300'
                            }`}
                          />
                        ))}
                      </div>
                      <span className="text-sm font-semibold">{reviewStats.averageRating.toFixed(1)}</span>
                      <span className="text-xs text-gray-500">({reviewStats.totalReviews} avis)</span>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={handleViewReviews}
                      className="text-xs text-blue-600 hover:text-blue-700 p-1 h-auto"
                    >
                      Voir tous
                    </Button>
                  </div>
                  
                  {/* Avis récents */}
                  {recentReviews.length > 0 && (
                    <div className="space-y-2">
                      {recentReviews.map((review) => (
                        <div key={review.id} className="text-xs">
                          <div className="flex items-center space-x-1 mb-1">
                            <span className="font-medium">{review.author.name}</span>
                            <div className="flex items-center space-x-1">
                              {[1, 2, 3, 4, 5].map((star) => (
                                <Star
                                  key={star}
                                  className={`h-2 w-2 ${
                                    star <= review.rating
                                      ? 'text-yellow-400 fill-current'
                                      : 'text-gray-300'
                                  }`}
                                />
                              ))}
                            </div>
                          </div>
                          <p className="text-gray-600 line-clamp-2">{review.content}</p>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </CardContent>
          </div>
        </Card>

        {/* Modales */}
        <AccommodationDetailsModal
          isOpen={isDetailsModalOpen}
          onClose={() => setIsDetailsModalOpen(false)}
          accommodation={accommodation}
        />

        <AccommodationBookingModal
          isOpen={isBookingModalOpen}
          onClose={() => setIsBookingModalOpen(false)}
          accommodation={accommodation}
        />

        <ReviewModal
          isOpen={isReviewModalOpen}
          onClose={() => setIsReviewModalOpen(false)}
          targetId={accommodation.id}
          targetType="accommodation"
          targetName={accommodation.name}
        />

        <ReviewsModal
          isOpen={isReviewsModalOpen}
          onClose={() => setIsReviewsModalOpen(false)}
          targetId={accommodation.id}
          targetType="accommodation"
          targetName={accommodation.name}
        />
      </>
    );
  }

  return (
    <>
      <Card className="hover:shadow-xl transition-all duration-300 cursor-pointer group overflow-hidden">
        <div className="relative h-48">
          <img 
            src={accommodation.image} 
            alt={accommodation.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
          {accommodation.featured && (
            <Badge className="absolute top-3 left-3 bg-orange-500 text-white">
              Recommandé
            </Badge>
          )}
          <Button
            size="sm"
            variant="ghost"
            className="absolute top-3 right-3 h-8 w-8 p-0 rounded-full bg-white shadow-md hover:bg-gray-50"
            onClick={handleFavorite}
          >
            <Heart className={`h-4 w-4 ${isFavorited ? 'fill-red-500 text-red-500' : 'text-gray-400'}`} />
          </Button>
        </div>
        
        <CardContent className="p-4">
          <div className="flex items-start justify-between mb-2">
            <div>
              <h3 className="font-bold text-lg text-gray-900 group-hover:text-blue-600 transition-colors line-clamp-1">
                {accommodation.name}
              </h3>
              <div className="flex items-center space-x-2 text-sm text-gray-600 mt-1">
                {getTypeIcon(accommodation.type)}
                <span>{accommodation.type}</span>
                <span>•</span>
                <MapPin className="h-3 w-3" />
                <span className="line-clamp-1">{accommodation.location}</span>
              </div>
            </div>
            <div className="flex items-center space-x-1 text-sm">
              <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
              <span className="font-semibold">{accommodation.rating}</span>
            </div>
          </div>
          
          <p className="text-gray-600 text-sm mb-3 line-clamp-2">{accommodation.description}</p>
          
          <div className="flex flex-wrap gap-1 mb-3">
            {accommodation.amenities.slice(0, 3).map((amenity, index) => (
              <Badge key={index} variant="outline" className="text-xs flex items-center space-x-1">
                {getAmenityIcon(amenity)}
                <span>{amenity}</span>
              </Badge>
            ))}
            {accommodation.amenities.length > 3 && (
              <Badge variant="outline" className="text-xs">
                +{accommodation.amenities.length - 3}
              </Badge>
            )}
          </div>
          
          {/* Section des avis pour le mode grille */}
          {reviewStats.totalReviews > 0 && (
            <div className="mb-3 p-3 bg-gray-50 rounded-lg">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center space-x-2">
                  <div className="flex items-center space-x-1">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star
                        key={star}
                        className={`h-3 w-3 ${
                          star <= Math.round(reviewStats.averageRating)
                            ? 'text-yellow-400 fill-current'
                            : 'text-gray-300'
                        }`}
                      />
                    ))}
                  </div>
                  <span className="text-sm font-semibold">{reviewStats.averageRating.toFixed(1)}</span>
                  <span className="text-xs text-gray-500">({reviewStats.totalReviews} avis)</span>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleViewReviews}
                  className="text-xs text-blue-600 hover:text-blue-700 p-1 h-auto"
                >
                  Voir tous
                </Button>
              </div>
              
              {/* Avis récents */}
              {recentReviews.length > 0 && (
                <div className="space-y-2">
                  {recentReviews.map((review) => (
                    <div key={review.id} className="text-xs">
                      <div className="flex items-center space-x-1 mb-1">
                        <span className="font-medium">{review.author.name}</span>
                        <div className="flex items-center space-x-1">
                          {[1, 2, 3, 4, 5].map((star) => (
                            <Star
                              key={star}
                              className={`h-2 w-2 ${
                                star <= review.rating
                                  ? 'text-yellow-400 fill-current'
                                  : 'text-gray-300'
                              }`}
                            />
                          ))}
                        </div>
                      </div>
                      <p className="text-gray-600 line-clamp-2">{review.content}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
          
          <div className="flex items-center justify-between">
            <div>
              <span className="font-bold text-lg text-blue-600">{accommodation.price}</span>
              <div className="text-xs text-gray-500">
                {accommodation.type === 'Restaurant' ? 'par personne' : 'par nuit'}
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <Button 
                variant="outline" 
                size="sm"
                className="hover:bg-gray-50 w-full"
                onClick={handleViewDetails}
              >
                <Eye className="h-4 w-4 mr-1" />
                Détails
              </Button>
              <Button 
                onClick={handleBooking}
                className="bg-blue-600 hover:bg-blue-700 text-white w-full"
                size="sm"
              >
                <Calendar className="h-4 w-4 mr-1" />
                Réserver
              </Button>
              {canLeaveReviewForAccommodation && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleReview}
                  className="text-yellow-600 border-yellow-600 hover:bg-yellow-50 w-full"
                >
                  <Star className="h-4 w-4 mr-1" />
                  Avis
                </Button>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Modales */}
      <AccommodationDetailsModal
        isOpen={isDetailsModalOpen}
        onClose={() => setIsDetailsModalOpen(false)}
        accommodation={accommodation}
      />

      <AccommodationBookingModal
        isOpen={isBookingModalOpen}
        onClose={() => setIsBookingModalOpen(false)}
        accommodation={accommodation}
      />

      <ReviewModal
        isOpen={isReviewModalOpen}
        onClose={() => setIsReviewModalOpen(false)}
        targetId={accommodation.id}
        targetType="accommodation"
        targetName={accommodation.name}
      />

      <ReviewsModal
        isOpen={isReviewsModalOpen}
        onClose={() => setIsReviewsModalOpen(false)}
        targetId={accommodation.id}
        targetType="accommodation"
        targetName={accommodation.name}
      />



    </>
  );
};

export default AccommodationCard;
