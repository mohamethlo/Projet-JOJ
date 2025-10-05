import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Calendar, 
  MapPin, 
  Users, 
  Clock, 
  Play, 
  Pause, 
  Trophy,
  Target,
  Activity,
  Eye,
  Star
} from 'lucide-react';
import { EventRegistrationModal, EventDetailsModal } from '@/components/modals';
import { ReviewModal, ReviewsModal } from '@/components/modals';
import { useAuth } from '@/context/AuthContext';

interface SportEventCardProps {
  event: {
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
    type: string;
    isLive?: boolean;
    liveData?: {
      score: string;
      minute: string;
      status: string;
      homeTeam: string;
      awayTeam: string;
      homeScore: number;
      awayScore: number;
      events: Array<{
        minute: string;
        type: string;
        team: string;
        player: string;
      }>;
    };
  };
  onRegister?: (id: string) => void;
}

const SportEventCard: React.FC<SportEventCardProps> = ({ event, onRegister }) => {
  const { user } = useAuth();
  const [isReservationModalOpen, setIsReservationModalOpen] = useState(false);
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);
  const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);
  const [isReviewsModalOpen, setIsReviewsModalOpen] = useState(false);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'En cours':
        return 'bg-red-100 text-red-700 border-red-200';
      case 'À venir':
        return 'bg-blue-100 text-blue-700 border-blue-200';
      case 'Terminé':
        return 'bg-gray-100 text-gray-700 border-gray-200';
      default:
        return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  // Valeurs par défaut si liveData n'est pas défini
  const liveData = event.liveData || {
    score: '0-0',
    minute: '0',
    status: 'À venir',
    homeTeam: 'Équipe A',
    awayTeam: 'Équipe B',
    homeScore: 0,
    awayScore: 0,
    events: []
  };

  const isLive = event.isLive || false;

  const getEventIcon = (type: string) => {
    switch (type) {
      case 'goal':
        return '⚽';
      case '3pt':
        return '🏀';
      case '2pt':
        return '🏀';
      case 'foul':
        return '⚠️';
      default:
        return '📊';
    }
  };

  const handleReserve = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsReservationModalOpen(true);
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
  const canLeaveReviewForSportEvent = user !== null;

  // Mock data pour les avis (à remplacer par les vraies données)
  const reviewStats = { averageRating: 4.5, totalReviews: 12 };
  const recentReviews = [
    { id: '1', author: { name: 'User 1' }, rating: 5, content: 'Excellent événement !' },
    { id: '2', author: { name: 'User 2' }, rating: 4, content: 'Très bien organisé.' }
  ];

  return (
    <>
      <Card className={`hover:shadow-xl transition-all duration-300 cursor-pointer group ${isLive ? 'ring-2 ring-red-200 bg-gradient-to-br from-red-50 to-white' : ''}`}>
        <CardContent className="p-6">
          {/* Header avec statut live */}
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-2">
              {isLive && (
                <div className="flex items-center space-x-1">
                  <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
                  <span className="text-xs font-medium text-red-600">EN DIRECT</span>
                </div>
              )}
              <Badge className={getStatusColor(liveData.status)}>
                {liveData.status}
              </Badge>
            </div>
            <div className="flex items-center space-x-1 text-sm text-gray-500">
              <Clock className="h-4 w-4" />
              <span>{event.time}</span>
            </div>
          </div>

          {/* Image et informations principales */}
          <div className="flex items-start space-x-4 mb-4">
            <img
              src={event.image}
              alt={event.title}
              className="w-20 h-20 rounded-lg object-cover"
              onError={(e) => {
                e.currentTarget.src = 'https://images.pexels.com/photos/274422/pexels-photo-274422.jpeg?auto=compress&cs=tinysrgb&w=400';
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
                  <span>{event.date}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <MapPin className="h-4 w-4" />
                  <span>{event.location}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Score et équipes (si événement live) */}
          {isLive && (
            <div className="bg-white border-2 border-red-200 rounded-lg p-4 mb-4">
              <div className="flex items-center justify-between">
                <div className="text-center flex-1">
                  <div className="font-bold text-lg">{liveData.homeTeam}</div>
                  <div className="text-3xl font-bold text-red-600">{liveData.homeScore}</div>
                </div>
                <div className="text-center px-4">
                  <div className="text-2xl font-bold text-gray-800">{liveData.score}</div>
                  <div className="text-xs text-gray-500">{liveData.minute}'</div>
                </div>
                <div className="text-center flex-1">
                  <div className="font-bold text-lg">{liveData.awayTeam}</div>
                  <div className="text-3xl font-bold text-red-600">{liveData.awayScore}</div>
                </div>
              </div>
            </div>
          )}

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

          {/* Informations de capacité */}
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-4 text-sm">
              <div className="flex items-center space-x-1">
                <Users className="h-4 w-4 text-gray-500" />
                <span>{event.registered}/{event.capacity} participants</span>
              </div>
              <Badge variant="outline" className="text-green-600 border-green-600">
                {event.price}
              </Badge>
            </div>
          </div>

          {/* Boutons d'action */}
          <div className="flex items-center justify-between">
            <div className="flex space-x-2">
              <Button
                variant="outline"
                size="sm"
                onClick={handleViewDetails}
                className="flex items-center space-x-1"
              >
                <Eye className="h-4 w-4" />
                <span>Détails</span>
              </Button>
              {canLeaveReviewForSportEvent && (
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
            <Button
              onClick={handleReserve}
              className="bg-blue-600 hover:bg-blue-700 text-white"
              size="sm"
            >
              <Trophy className="h-4 w-4 mr-1" />
              S'inscrire
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Modales */}
      <EventRegistrationModal
        isOpen={isReservationModalOpen}
        onClose={() => setIsReservationModalOpen(false)}
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

export default SportEventCard;
