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
// import { getReviewStats, getRecentReviews } from '@/lib/mockReviews';
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

  // const handleViewReviews = (e: React.MouseEvent) => {
  //   e.stopPropagation();
  //   setIsReviewsModalOpen(true);
  // };

  // Vérifier si l'utilisateur peut laisser un avis
  // En mode développement, on affiche le bouton pour tous les utilisateurs
  const canLeaveReviewForAccommodation = true; // Toujours visible pour le développement

  // Récupérer les données des avis
  // const reviewStats = getReviewStats(accommodation.id, 'accommodation');
  // const recentReviews = getRecentReviews(accommodation.id, 'accommodation', 2);

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
        <Card className="hover:shadow-xl transition-all duration-300 overflow-hidden border-[#EBE3D5] bg-white group">
          <div className="flex flex-col md:flex-row">
            <div className="relative w-full md:w-80 h-64 md:h-auto flex-shrink-0">
              <img
                src={accommodation.image}
                alt={accommodation.name}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
              {accommodation.featured && (
                <Badge className="absolute top-4 left-4 bg-[#F2A900] text-white font-black uppercase tracking-tighter shadow-lg border-none px-3 py-1">
                  Recommandé
                </Badge>
              )}
              <Button
                size="sm"
                variant="ghost"
                className="absolute top-4 right-4 h-10 w-10 p-0 rounded-full bg-white/90 backdrop-blur-sm shadow-md hover:bg-white"
                onClick={handleFavorite}
              >
                <Heart className={`h-5 w-5 ${isFavorited ? 'fill-[#E11D48] text-[#E11D48]' : 'text-[#5D4037]'}`} />
              </Button>
            </div>

            <CardContent className="p-6 md:p-8 flex-1 flex flex-col">
              <div className="flex justify-between items-start mb-4">
                <div className="flex-1">
                  <h3 className="font-black text-2xl text-[#2D1B08] mb-2 uppercase tracking-tighter group-hover:text-[#F2A900] transition-colors">{accommodation.name}</h3>
                  <div className="flex flex-wrap items-center gap-4 text-sm text-[#5D4037] font-bold">
                    <div className="flex items-center gap-1.5 bg-[#F2A900]/10 px-2 py-1 rounded-md text-[#F2A900]">
                      {getTypeIcon(accommodation.type)}
                      <span className="uppercase text-[10px] tracking-widest">{accommodation.type}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <MapPin className="h-4 w-4 text-[#1B5E20]" />
                      <span>{accommodation.location}</span>
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="font-black text-2xl text-[#F2A900] tracking-tighter">{accommodation.price}</div>
                  <div className="text-[10px] font-black uppercase tracking-widest text-[#5D4037]/60">
                    {accommodation.type === 'Restaurant' ? 'par personne' : 'par nuit'}
                  </div>
                </div>
              </div>

              <div className="flex items-center space-x-1 mb-4">
                <div className="flex">
                  {[1, 2, 3, 4, 5].map((s) => (
                    <Star key={s} className={`h-4 w-4 ${s <= Math.floor(accommodation.rating) ? 'fill-[#F2A900] text-[#F2A900]' : 'text-[#EBE3D5]'}`} />
                  ))}
                </div>
                <span className="font-black text-[#2D1B08] ml-2">{accommodation.rating}</span>
                <span className="text-xs font-bold text-[#5D4037]/60">({accommodation.reviews} avis)</span>
              </div>

              <p className="text-[#5D4037] mb-6 line-clamp-2 font-medium leading-relaxed">{accommodation.description}</p>

              <div className="mt-auto flex flex-col sm:flex-row sm:items-center justify-between gap-6 pt-6 border-t border-[#EBE3D5]">
                <div className="flex flex-wrap gap-2">
                  {accommodation.amenities.slice(0, 4).map((amenity, index) => (
                    <Badge key={index} variant="outline" className="border-[#EBE3D5] text-[#5D4037] bg-[#FFFDFB] font-bold text-[10px] px-2 py-0.5">
                      {getAmenityIcon(amenity)}
                      <span className="ml-1.5">{amenity}</span>
                    </Badge>
                  ))}
                </div>

                <div className="flex flex-wrap gap-3">
                  <Button
                    variant="outline"
                    size="sm"
                    className="border-[#F2A900] text-[#F2A900] hover:bg-[#F2A900]/10 font-black uppercase tracking-tighter px-6 rounded-lg h-11"
                    onClick={handleViewDetails}
                  >
                    <Eye className="h-4 w-4 mr-2" />
                    Détails
                  </Button>
                  <Button
                    onClick={handleBooking}
                    className="bg-[#1B5E20] hover:bg-[#144718] text-white font-black uppercase tracking-tighter px-6 rounded-lg h-11 shadow-md shadow-emerald-900/10"
                    size="sm"
                  >
                    <Calendar className="h-4 w-4 mr-2" />
                    Réserver
                  </Button>
                  {canLeaveReviewForAccommodation && (
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={handleReview}
                      className="border-[#EBE3D5] text-[#5D4037] hover:bg-[#EBE3D5]/20 font-black uppercase tracking-tighter px-4 rounded-lg h-11"
                    >
                      <Star className="h-4 w-4 mr-2 text-[#F2A900]" />
                      Avis
                    </Button>
                  )}
                </div>
              </div>
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
      <Card className="hover:shadow-2xl transition-all duration-500 cursor-pointer group overflow-hidden border-2 border-[#EBE3D5] hover:border-[#F2A900] bg-white flex flex-col h-full rounded-2xl">
        <div className="relative h-64 overflow-hidden">
          <img
            src={accommodation.image}
            alt={accommodation.name}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-60"></div>

          {accommodation.featured && (
            <Badge className="absolute top-4 left-4 bg-[#F2A900] text-white font-black uppercase tracking-tighter border-none px-3 py-1 shadow-lg">
              Recommandé
            </Badge>
          )}

          <Button
            size="sm"
            variant="ghost"
            className="absolute top-4 right-4 h-10 w-10 p-0 rounded-full bg-white/90 backdrop-blur-sm shadow-md hover:bg-white transition-all transform hover:scale-110"
            onClick={handleFavorite}
          >
            <Heart className={`h-5 w-5 ${isFavorited ? 'fill-[#E11D48] text-[#E11D48]' : 'text-[#5D4037]'}`} />
          </Button>

          <div className="absolute bottom-4 left-4 text-white">
            <div className="flex items-center gap-1.5 bg-black/40 backdrop-blur-md px-2 py-1 rounded-md mb-2">
              <span className="text-[#F2A900]">{getTypeIcon(accommodation.type)}</span>
              <span className="uppercase text-[9px] font-black tracking-[0.2em]">{accommodation.type}</span>
            </div>
          </div>
        </div>

        <CardContent className="p-6 flex flex-col flex-1">
          <div className="flex items-start justify-between mb-3">
            <h3 className="font-black text-xl text-[#2D1B08] group-hover:text-[#F2A900] transition-colors line-clamp-1 uppercase tracking-tighter">
              {accommodation.name}
            </h3>
            <div className="flex items-center gap-1 bg-[#F2A900]/10 px-2 py-1 rounded text-[#F2A900] font-black text-sm">
              <Star className="h-3 w-3 fill-current" />
              <span>{accommodation.rating}</span>
            </div>
          </div>

          <div className="flex items-center gap-2 text-xs font-bold text-[#5D4037]/70 mb-4">
            <MapPin className="h-3.5 w-3.5 text-[#1B5E20]" />
            <span className="uppercase tracking-wide">{accommodation.location}</span>
          </div>

          <p className="text-[#5D4037] text-sm mb-6 line-clamp-2 font-medium leading-relaxed">{accommodation.description}</p>

          <div className="flex flex-wrap gap-1.5 mb-6">
            {accommodation.amenities.slice(0, 3).map((amenity, index) => (
              <Badge key={index} variant="outline" className="border-[#EBE3D5] text-[#5D4037]/80 bg-[#FFFDFB] font-bold text-[9px] px-2 py-0.5">
                {getAmenityIcon(amenity)}
                <span className="ml-1 uppercase tracking-tight">{amenity}</span>
              </Badge>
            ))}
            {accommodation.amenities.length > 3 && (
              <Badge variant="outline" className="border-[#EBE3D5] text-[#5D4037]/60 font-black text-[9px]">
                +{accommodation.amenities.length - 3}
              </Badge>
            )}
          </div>

          <div className="mt-auto border-t border-[#EBE3D5]/50 pt-4 flex items-center justify-between">
            <div className="flex flex-col">
              <span className="font-black text-2xl text-[#2D1B08] tracking-tighter leading-none">{accommodation.price}</span>
              <span className="text-[9px] font-black uppercase tracking-[0.1em] text-[#5D4037]/60 mt-1">
                {accommodation.type === 'Restaurant' ? 'par personne' : 'par nuit'}
              </span>
            </div>

            <div className="flex gap-2">
              <Button
                variant="outline"
                size="sm"
                className="border-[#EBE3D5] text-[#5D4037] hover:bg-[#EBE3D5]/20 font-black uppercase tracking-tighter px-4 rounded-lg h-10"
                onClick={handleViewDetails}
              >
                <Eye className="h-4 w-4" />
              </Button>
              <Button
                onClick={handleBooking}
                className="bg-[#F2A900] hover:bg-[#D49400] text-white font-black uppercase tracking-tighter px-4 rounded-lg h-10 shadow-lg shadow-orange-900/10"
                size="sm"
              >
                Réserver
              </Button>
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
