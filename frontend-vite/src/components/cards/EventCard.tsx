import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Calendar, MapPin, Users, Clock, Eye, UserPlus, Star } from 'lucide-react';
import { EventRegistrationModal, EventDetailsModal } from '@/components/modals';
import { ReviewModal, ReviewsModal } from '@/components/modals';
import { useAuth } from '@/context/AuthContext';
import { getReviewStats, getRecentReviews } from '@/lib/mockReviews';

interface EventProps {
  id: string;
  title: string;
  description: string;
  date: string;
  time: string;
  location: string;
  capacity: number;
  registered: number;
  price: string;
  image: string;
  organizer: string;
  category: string;
}

const EventCard: React.FC<{ 
  event: EventProps; 
  onRegister?: (id: string) => void;
  onViewDetails?: (id: string) => void;
}> = ({ 
  event, 
  onRegister,
  onViewDetails
}) => {
  const { user } = useAuth();
  const [isRegistrationModalOpen, setIsRegistrationModalOpen] = useState(false);
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);
  const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);
  const [isReviewsModalOpen, setIsReviewsModalOpen] = useState(false);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('fr-FR', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });
  };

  const spotsLeft = event.capacity - event.registered;

  const handleRegister = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsRegistrationModalOpen(true);
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

  // Vérifier si l'utilisateur peut laisser un avis (tous les utilisateurs connectés peuvent laisser un avis)
  const canLeaveReviewForEvent = user !== null;

  // Récupérer les données des avis
  const reviewStats = getReviewStats(event.id, 'event');
  const recentReviews = getRecentReviews(event.id, 'event', 2);

  return (
    <>
      <Card className="hover:shadow-xl transition-all duration-300 cursor-pointer group">
        <CardContent className="p-6">
          {/* Image et titre */}
          <div className="flex items-start space-x-4 mb-4">
            <img
              src={event.image}
              alt={event.title}
              className="w-20 h-20 rounded-lg object-cover"
              onError={(e) => {
                e.currentTarget.src = 'https://images.pexels.com/photos/1190298/pexels-photo-1190298.jpeg?auto=compress&cs=tinysrgb&w=400';
              }}
            />
            <div className="flex-1">
              <h3 className="font-bold text-lg mb-1 group-hover:text-blue-600 transition-colors">
                {event.title}
              </h3>
              <p className="text-gray-600 text-sm mb-2 line-clamp-2">
                {event.description}
              </p>
              <div className="flex items-center space-x-4 text-sm text-gray-500">
                <div className="flex items-center space-x-1">
                  <Calendar className="h-4 w-4" />
                  <span>{formatDate(event.date)}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Clock className="h-4 w-4" />
                  <span>{event.time}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Informations de l'événement */}
          <div className="space-y-3 mb-4">
            <div className="flex items-center space-x-2">
              <MapPin className="h-4 w-4 text-gray-500" />
              <span className="text-sm text-gray-700">{event.location}</span>
            </div>
            <div className="flex items-center space-x-2">
              <Users className="h-4 w-4 text-gray-500" />
              <span className="text-sm text-gray-700">
                {event.registered}/{event.capacity} participants
              </span>
              {spotsLeft <= 5 && spotsLeft > 0 && (
                <Badge variant="destructive" className="text-xs">
                  Plus que {spotsLeft} places !
                </Badge>
              )}
            </div>
          </div>

          {/* Section des avis */}
          {reviewStats.totalReviews > 0 && (
            <div className="border-t pt-4 mb-4">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center space-x-2">
                  <div className="flex items-center space-x-1">
                    <Star className="h-4 w-4 text-yellow-500 fill-current" />
                    <span className="font-medium">{reviewStats.averageRating}</span>
                  </div>
                  <span className="text-sm text-gray-600">
                    ({reviewStats.totalReviews} avis)
                  </span>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleViewReviews}
                  className="text-blue-600 hover:text-blue-700"
                >
                  Voir tous les avis
                </Button>
              </div>
              
              {recentReviews.length > 0 && (
                <div className="space-y-2">
                  {recentReviews.slice(0, 2).map((review) => (
                    <div key={review.id} className="text-sm">
                      <div className="flex items-center space-x-2 mb-1">
                        <span className="font-medium">{review.author.name}</span>
                        <div className="flex items-center">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`h-3 w-3 ${
                                i < review.rating ? 'text-yellow-500 fill-current' : 'text-gray-300'
                              }`}
                            />
                          ))}
                        </div>
                      </div>
                      <p className="text-gray-600 line-clamp-1">{review.content}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Prix et organisateur */}
          <div className="flex items-center justify-between mb-4">
            <div className="space-y-1">
              <Badge variant="outline" className="text-green-600 border-green-600">
                {event.price}
              </Badge>
              <p className="text-xs text-gray-500">Organisé par {event.organizer}</p>
            </div>
            <Badge variant="secondary">
              {event.category}
            </Badge>
          </div>

          {/* Boutons d'action */}
          <div className="flex flex-wrap gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={handleViewDetails}
              className="flex-1 min-w-0 border-gray-300 text-gray-700 hover:bg-gray-50"
            >
              <Eye className="h-4 w-4 mr-1" />
              Détails
            </Button>
            <Button
              onClick={handleRegister}
              disabled={spotsLeft === 0}
              className="flex-1 min-w-0 bg-blue-600 hover:bg-blue-700"
            >
              {spotsLeft === 0 ? (
                "Complet"
              ) : (
                <>
                  <UserPlus className="h-4 w-4 mr-1" />
                  S'inscrire
                </>
              )}
            </Button>
            {canLeaveReviewForEvent && (
              <Button
                variant="outline"
                size="sm"
                onClick={handleReview}
                className="flex-1 min-w-0 text-yellow-600 border-yellow-600 hover:bg-yellow-50"
              >
                <Star className="h-4 w-4 mr-1" />
                Avis
              </Button>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Modales */}
      <EventRegistrationModal
        isOpen={isRegistrationModalOpen}
        onClose={() => setIsRegistrationModalOpen(false)}
        event={event}
      />

      <EventDetailsModal
        isOpen={isDetailsModalOpen}
        onClose={() => setIsDetailsModalOpen(false)}
        event={event}
      />

      <ReviewModal
        isOpen={isReviewModalOpen}
        onClose={() => setIsReviewModalOpen(false)}
        targetId={event.id}
        targetType="event"
        targetName={event.title}
      />

      <ReviewsModal
        isOpen={isReviewsModalOpen}
        onClose={() => setIsReviewsModalOpen(false)}
        targetId={event.id}
        targetType="event"
        targetName={event.title}
      />
    </>
  );
};

export default EventCard;