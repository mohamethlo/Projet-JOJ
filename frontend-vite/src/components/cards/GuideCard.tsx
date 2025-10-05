import React, { useState } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Star, MapPin, CheckCircle, Calendar, Heart, Clock, Award, Users, MessageCircle, Eye } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { getGuideReviews, getReviewStats, getRecentReviews } from '@/lib/mockReviews';
import { GuideDetailsModal, GuideBookingModal, GuideContactModal, ReviewModal, ReviewsModal } from '@/components/modals';

interface GuideProps {
  id: string;
  name: string;
  avatar: string;
  languages: string[];
  specialties: string[];
  rating: number;
  reviews: number;
  price: string;
  location: string;
  isVerified: boolean;
  availability: string;
  description: string;
  experience?: string;
  toursCompleted?: number;
  responseTime?: string;
  badge?: string;
  featured?: boolean;
  type?: string;
  viewMode?: 'grid' | 'list';
}

const GuideCard: React.FC<{ 
  guide: GuideProps; 
  viewMode?: 'grid' | 'list';
  availabilityData?: any[];
}> = ({ 
  guide, 
  viewMode = 'grid',
  availabilityData = []
}) => {
  const { user } = useAuth();
  const [isFavorited, setIsFavorited] = useState(false);
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);
  const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);
  const [isReviewsModalOpen, setIsReviewsModalOpen] = useState(false);

  const handleFavorite = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsFavorited(!isFavorited);
  };

  const handleReservation = () => {
    setIsBookingModalOpen(true);
  };

  const handleContact = () => {
    setIsContactModalOpen(true);
  };

  const handleReview = () => {
    setIsReviewModalOpen(true);
  };

  const handleViewReviews = () => {
    setIsReviewsModalOpen(true);
  };

  const handleViewDetails = () => {
    setIsDetailsModalOpen(true);
  };

  // Vérifier si l'utilisateur peut laisser un avis
  // Les guides ne peuvent pas laisser d'avis sur d'autres guides
  const canLeaveReviewForGuide = user?.role !== 'guide';

  // Récupérer les données des avis
  const guideReviews = getGuideReviews(guide.id);
  const reviewStats = getReviewStats(guide.id, 'guide');
  const recentReviews = getRecentReviews(guide.id, 'guide', 2);

  if (viewMode === 'list') {
    return (
      <>
      <Card className="hover:shadow-lg transition-shadow cursor-pointer">
        <CardContent className="p-6">
          <div className="flex items-start space-x-4">
            <Avatar className="h-20 w-20">
              <AvatarImage src={guide.avatar} alt={guide.name} />
              <AvatarFallback>{guide.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
            </Avatar>
            
            <div className="flex-1 min-w-0">
              <div className="flex items-start justify-between">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center space-x-2 mb-1">
                    <h3 className="text-lg font-semibold truncate">{guide.name}</h3>
                    {guide.isVerified && (
                      <CheckCircle className="h-4 w-4 text-blue-500" />
                    )}
                    {guide.badge && (
                      <Badge variant="secondary" className="text-xs">
                        {guide.badge}
                      </Badge>
                    )}
                  </div>
                  
                  <div className="flex items-center space-x-4 text-sm text-gray-600 mb-2">
                    <div className="flex items-center space-x-1">
                      <MapPin className="h-4 w-4" />
                      <span>{guide.location}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Star className="h-4 w-4 text-yellow-500" />
                      <span>{guide.rating}</span>
                      <span>({guide.reviews})</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Clock className="h-4 w-4" />
                      <span>{guide.responseTime}</span>
                    </div>
                  </div>
                  
                  <p className="text-sm text-gray-600 mb-3 line-clamp-2">
                    {guide.description}
                  </p>
                  
                  <div className="flex flex-wrap gap-1 mb-3">
                    {guide.specialties.slice(0, 3).map((specialty, index) => (
                      <Badge key={index} variant="outline" className="text-xs">
                        {specialty}
                      </Badge>
                    ))}
                    {guide.specialties.length > 3 && (
                      <Badge variant="outline" className="text-xs">
                        +{guide.specialties.length - 3}
                      </Badge>
                    )}
                  </div>
                </div>
                
                <div className="flex flex-col items-end space-y-2 ml-4">
                  <div className="text-right">
                    <div className="text-lg font-bold text-green-600">{guide.price}</div>
                    <div className="text-xs text-gray-500">par jour</div>
                  </div>
                  
                  <div className="flex flex-wrap gap-2">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={handleViewDetails}
                      className="border-gray-300 text-gray-700 hover:bg-gray-50"
                    >
                      <Eye className="h-4 w-4 mr-1" />
                      Détails
                    </Button>
                    <Button
                      size="sm"
                      onClick={handleReservation}
                      className="bg-blue-600 hover:bg-blue-700"
                    >
                      Réserver
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={handleContact}
                      className="text-green-600 border-green-600 hover:bg-green-50"
                    >
                      <MessageCircle className="h-4 w-4 mr-1" />
                      Contact
                    </Button>
                    {canLeaveReviewForGuide && (
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={handleReview}
                        className="text-yellow-600 border-yellow-600 hover:bg-yellow-50"
                      >
                        Avis
                      </Button>
                    )}
                  </div>
                </div>
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
          </div>
        </CardContent>
      </Card>

      {/* Modales */}
      <GuideDetailsModal
        isOpen={isDetailsModalOpen}
        onClose={() => setIsDetailsModalOpen(false)}
        guide={guide}
        availabilityData={availabilityData}
      />

      <GuideBookingModal
        isOpen={isBookingModalOpen}
        onClose={() => setIsBookingModalOpen(false)}
        guide={guide}
      />

      <GuideContactModal
        isOpen={isContactModalOpen}
        onClose={() => setIsContactModalOpen(false)}
        guide={guide}
      />

      <ReviewModal
        isOpen={isReviewModalOpen}
        onClose={() => setIsReviewModalOpen(false)}
        targetId={guide.id}
        targetType="guide"
        targetName={guide.name}
      />

      <ReviewsModal
        isOpen={isReviewsModalOpen}
        onClose={() => setIsReviewsModalOpen(false)}
        targetId={guide.id}
        targetType="guide"
        targetName={guide.name}
        canInteract={canLeaveReviewForGuide}
      />
    </>
    );
  }

  return (
    <>
    <Card className="hover:shadow-lg transition-shadow cursor-pointer h-full">
      <CardContent className="p-6 h-full flex flex-col">
        <div className="flex items-start justify-between mb-4">
          <Avatar className="h-16 w-16">
            <AvatarImage src={guide.avatar} alt={guide.name} />
            <AvatarFallback>{guide.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
          </Avatar>
          
          <div className="flex items-center space-x-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={handleFavorite}
              className={`p-1 ${isFavorited ? 'text-red-500' : 'text-gray-400'}`}
            >
              <Heart className={`h-4 w-4 ${isFavorited ? 'fill-current' : ''}`} />
            </Button>
            {guide.featured && (
              <Badge variant="secondary" className="text-xs">
                <Award className="h-3 w-3 mr-1" />
                Vedette
              </Badge>
            )}
          </div>
        </div>

        <div className="flex-1">
          <div className="flex items-center space-x-2 mb-2">
            <h3 className="text-lg font-semibold">{guide.name}</h3>
            {guide.isVerified && (
              <CheckCircle className="h-4 w-4 text-blue-500" />
            )}
          </div>
          
          <div className="flex items-center space-x-1 text-sm text-gray-600 mb-2">
            <MapPin className="h-4 w-4" />
            <span>{guide.location}</span>
          </div>
          
          <div className="flex items-center space-x-4 text-sm mb-3">
            <div className="flex items-center space-x-1">
              <Star className="h-4 w-4 text-yellow-500" />
              <span className="font-medium">{guide.rating}</span>
              <span className="text-gray-500">({guide.reviews})</span>
            </div>
            <div className="flex items-center space-x-1">
              <Users className="h-4 w-4 text-gray-400" />
              <span className="text-gray-500">{guide.toursCompleted || 0}</span>
            </div>
          </div>
          
          <p className="text-sm text-gray-600 mb-4 line-clamp-3">
            {guide.description}
          </p>
          
          <div className="flex flex-wrap gap-1 mb-4">
            {guide.specialties.slice(0, 2).map((specialty, index) => (
              <Badge key={index} variant="outline" className="text-xs">
                {specialty}
              </Badge>
            ))}
            {guide.specialties.length > 2 && (
              <Badge variant="outline" className="text-xs">
                +{guide.specialties.length - 2}
              </Badge>
            )}
          </div>

          {/* Affichage des avis publics */}
          {reviewStats.totalReviews > 0 && (
            <div className="mb-4 p-3 bg-gray-50 rounded-lg">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center space-x-2">
                  <Star className="h-4 w-4 text-yellow-500" />
                  <span className="text-sm font-medium">
                    {reviewStats.averageRating.toFixed(1)} ({reviewStats.totalReviews} avis)
                  </span>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleViewReviews}
                  className="text-blue-600 hover:text-blue-700 p-0 h-auto"
                >
                  Voir tout
                </Button>
              </div>
              
              {recentReviews.length > 0 && (
                <div className="space-y-2">
                  {recentReviews.map((review) => (
                    <div key={review.id} className="text-xs">
                      <div className="flex items-center space-x-1 mb-1">
                        <div className="flex">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`h-3 w-3 ${
                                i < review.rating ? 'text-yellow-500 fill-current' : 'text-gray-300'
                              }`}
                            />
                          ))}
                        </div>
                        <span className="font-medium">{review.author.name}</span>
                      </div>
                      <p className="text-gray-600 line-clamp-2">{review.content}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>

        <div className="mt-auto">
          <div className="flex items-center justify-between mb-4">
            <div>
              <div className="text-lg font-bold text-green-600">{guide.price}</div>
              <div className="text-xs text-gray-500">par jour</div>
            </div>
            <div className="text-right">
              <div className="text-xs text-gray-500">{guide.availability}</div>
              {guide.responseTime && (
                <div className="text-xs text-gray-500">Répond en {guide.responseTime}</div>
              )}
            </div>
          </div>
          
          <div className="flex flex-wrap gap-2">
            <Button
              variant="outline"
              onClick={handleViewDetails}
              className="flex-1 min-w-0 border-gray-300 text-gray-700 hover:bg-gray-50"
            >
              <Eye className="h-4 w-4 mr-1" />
              Détails
            </Button>
            <Button
              onClick={handleReservation}
              className="flex-1 min-w-0 bg-blue-600 hover:bg-blue-700"
            >
              Réserver
            </Button>
            <Button
              variant="outline"
              onClick={handleContact}
              className="flex-1 min-w-0 text-green-600 border-green-600 hover:bg-green-50"
            >
              <MessageCircle className="h-4 w-4 mr-1" />
              Contact
            </Button>
            {canLeaveReviewForGuide && (
              <Button
                variant="outline"
                onClick={handleReview}
                className="flex-1 min-w-0 text-yellow-600 border-yellow-600 hover:bg-yellow-50"
              >
                Avis
              </Button>
            )}
          </div>
        </div>
      </CardContent>
    </Card>

    {/* Modales */}
    <GuideDetailsModal
      isOpen={isDetailsModalOpen}
      onClose={() => setIsDetailsModalOpen(false)}
      guide={guide}
      availabilityData={availabilityData}
    />

    <GuideBookingModal
      isOpen={isBookingModalOpen}
      onClose={() => setIsBookingModalOpen(false)}
      guide={guide}
    />

    <GuideContactModal
      isOpen={isContactModalOpen}
      onClose={() => setIsContactModalOpen(false)}
      guide={guide}
    />

    <ReviewModal
      isOpen={isReviewModalOpen}
      onClose={() => setIsReviewModalOpen(false)}
      targetId={guide.id}
      targetType="guide"
      targetName={guide.name}
    />

    <ReviewsModal
      isOpen={isReviewsModalOpen}
      onClose={() => setIsReviewsModalOpen(false)}
      targetId={guide.id}
      targetType="guide"
      targetName={guide.name}
      canInteract={canLeaveReviewForGuide}
    />
  </>
  );
};

export default GuideCard;
