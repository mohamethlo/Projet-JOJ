import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
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
  Wind,
  Image as ImageIcon
} from 'lucide-react';
import { AccommodationDetailsModal, AccommodationBookingModal, ReviewModal, ReviewsModal } from '@/components/modals';
import useProtectedAction from '../../hooks/useProtectedAction';

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
  const navigate = useNavigate();
  const { performAction, AuthModalComponent } = useProtectedAction();
  const [isFavorited, setIsFavorited] = useState(false);
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);
  const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);
  const [isReviewsModalOpen, setIsReviewsModalOpen] = useState(false);

  const handleFavorite = (e: React.MouseEvent) => {
    e.stopPropagation();
    performAction(() => {
      setIsFavorited(!isFavorited);
    });
  };

  const handleBooking = (e: React.MouseEvent) => {
    e.stopPropagation();
    performAction(() => {
      setIsBookingModalOpen(true);
    });
  };

  const isAccommodation = ['Hôtel', 'Auberge', 'Villa', 'Résidence'].includes(accommodation.type);

  const handleViewRooms = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (isAccommodation) {
      navigate(`/establishment/${accommodation.id}?tab=rooms`);
    } else {
      setIsDetailsModalOpen(true);
    }
  };

  const isRestaurant = accommodation.type === 'Restaurant';

  const handleViewMenu = (e: React.MouseEvent) => {
    e.stopPropagation();
    navigate(`/establishment/${accommodation.id}?tab=menu`);
  };

  const handleViewDetails = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsDetailsModalOpen(true);
  };

  const handleReview = (e: React.MouseEvent) => {
    e.stopPropagation();
    performAction(() => {
      setIsReviewModalOpen(true);
    });
  };

  const canLeaveReviewForAccommodation = true;

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'Hôtel': return <Building className="h-4 w-4" />;
      case 'Restaurant': return <Utensils className="h-4 w-4" />;
      case 'Auberge': return <Home className="h-4 w-4" />;
      default: return <Bed className="h-4 w-4" />;
    }
  };

  const getAmenityIcon = (amenity: string) => {
    switch (amenity) {
      case 'WiFi': return <Wifi className="h-3 w-3" />;
      case 'Parking': return <Car className="h-3 w-3" />;
      case 'Piscine': return <Waves className="h-3 w-3" />;
      case 'Gym': return <Dumbbell className="h-3 w-3" />;
      case 'Climatisation': return <Wind className="h-3 w-3" />;
      default: return <Star className="h-3 w-3" />;
    }
  };

  if (viewMode === 'list') {
    return (
      <Card
        className="hover:shadow-xl transition-all duration-300 overflow-hidden border-[#EBE3D5] bg-white group rounded-2xl cursor-pointer"
        onClick={handleViewDetails}
      >
        <div className="flex flex-col md:flex-row">
          <div className="relative w-full md:w-80 h-64 md:h-auto flex-shrink-0 overflow-hidden bg-[#2D1B08]/5 flex items-center justify-center">
            {accommodation.image ? (
              <img
                src={accommodation.image}
                alt={accommodation.name}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
            ) : (
              <div className="flex flex-col items-center justify-center text-[#5D4037]/20">
                <ImageIcon className="w-12 h-12 mb-2" />
                <span className="text-[10px] font-black uppercase tracking-widest">Aucune photo</span>
              </div>
            )}
            {accommodation.featured && (
              <Badge className="absolute top-4 left-4 bg-[#F2A900] text-[#2D1B08] font-black uppercase tracking-tighter shadow-xl border-none px-4 py-1.5 rounded-full">
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
              <div className="flex-1 pr-4">
                <h3 className="font-black text-2xl text-[#2D1B08] mb-3 uppercase tracking-tighter group-hover:text-[#F2A900] transition-colors line-clamp-2 leading-tight">{accommodation.name}</h3>
                <div className="flex flex-wrap items-center gap-3 text-sm text-[#5D4037] font-bold">
                  <div className="flex items-center gap-1.5 bg-[#2D1B08] px-3 py-1.5 rounded-xl text-white shadow-md">
                    {getTypeIcon(accommodation.type)}
                    <span className="uppercase text-[10px] tracking-widest">{accommodation.type}</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-[#5D4037]/70">
                    <MapPin className="h-4 w-4 text-[#F2A900]" />
                    <span className="uppercase tracking-widest text-[10px]">{accommodation.location}</span>
                  </div>
                </div>
              </div>
              <div className="text-right flex-shrink-0">
                <div className="font-black text-3xl text-[#2D1B08] tracking-tighter">{accommodation.price}</div>
                <div className="text-[9px] font-black uppercase tracking-widest text-[#5D4037]/50 mt-1">
                  {accommodation.type === 'Restaurant' ? 'par personne' : 'par nuit'}
                </div>
              </div>
            </div>

            <div className="flex items-center space-x-1.5 mb-5 bg-gray-50 w-fit px-3 py-1.5 rounded-xl border border-gray-100">
              <div className="flex">
                {[1, 2, 3, 4, 5].map((s) => (
                  <Star key={s} className={`h-3.5 w-3.5 ${s <= Math.floor(accommodation.rating) ? 'fill-[#F2A900] text-[#F2A900]' : 'text-[#EBE3D5]'}`} />
                ))}
              </div>
              <span className="font-black text-[#2D1B08] text-sm ml-1">{accommodation.rating}</span>
              <span className="text-[10px] font-bold text-[#5D4037]/40 uppercase tracking-widest ml-1">({accommodation.reviews} avis)</span>
            </div>

            <p className="text-[#5D4037]/80 mb-6 line-clamp-2 font-medium leading-relaxed italic">"{accommodation.description}"</p>

            {/* ADAPTIVE COMPOSITION DETAILS (Villas vs Hotels) */}
            {(accommodation.type === 'Villa' || accommodation.type === 'Appartement' || accommodation.type === 'Résidence') && (
              <div className="flex flex-wrap gap-4 mb-5 p-4 bg-[#F8F5F0] rounded-2xl border border-[#EBE3D5]/50">
                <div className="flex items-center gap-2">
                  <div className="bg-white p-1.5 rounded-lg text-[#F2A900] shadow-sm"><Building className="h-4 w-4" /></div>
                  <div>
                    <div className="text-[9px] font-black text-gray-400 uppercase tracking-widest">Superficie</div>
                    <div className="text-sm font-black text-[#2D1B08]">{(accommodation as any).surface || '150'} m²</div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <div className="bg-white p-1.5 rounded-lg text-[#F2A900] shadow-sm"><Bed className="h-4 w-4" /></div>
                  <div>
                    <div className="text-[9px] font-black text-gray-400 uppercase tracking-widest">Chambres</div>
                    <div className="text-sm font-black text-[#2D1B08]">{(accommodation as any).bedrooms || '3'}</div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <div className="bg-white p-1.5 rounded-lg text-[#F2A900] shadow-sm"><Waves className="h-4 w-4" /></div>
                  <div>
                    <div className="text-[9px] font-black text-gray-400 uppercase tracking-widest">Salles de bain</div>
                    <div className="text-sm font-black text-[#2D1B08]">{(accommodation as any).bathrooms || '2'}</div>
                  </div>
                </div>
              </div>
            )}

            <div className="mt-auto flex flex-col sm:flex-row sm:items-center justify-between gap-6 pt-6 border-t border-[#EBE3D5]/50">
              <div className="flex flex-wrap gap-2">
                {accommodation.amenities.slice(0, 4).map((amenity, index) => (
                  <Badge key={index} variant="outline" className="border-[#EBE3D5] text-[#2D1B08] bg-[#FFFDFB] font-bold text-[10px] px-2.5 py-1 rounded-lg">
                    {getAmenityIcon(amenity)}
                    <span className="ml-1.5 uppercase tracking-tighter">{amenity}</span>
                  </Badge>
                ))}
              </div>

              <div className="flex flex-wrap gap-3">
                <Button
                  variant="outline"
                  size="sm"
                  className="border-[#EBE3D5] text-[#2D1B08] hover:bg-[#F8F5F0] font-black uppercase tracking-widest px-6 rounded-xl h-12 shadow-sm"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleViewDetails(e);
                  }}
                >
                  <Eye className="h-4 w-4 mr-2 text-gray-400" />
                  Aperçu
                </Button>
                <Button
                  onClick={handleBooking}
                  className="bg-[#2D1B08] hover:bg-black text-[#F2A900] font-black uppercase tracking-widest px-8 rounded-xl h-12 shadow-xl shadow-[#2D1B08]/10 hover:-translate-y-0.5 transition-all"
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
        <AccommodationDetailsModal isOpen={isDetailsModalOpen} onClose={() => setIsDetailsModalOpen(false)} accommodation={accommodation} />
        <AccommodationBookingModal isOpen={isBookingModalOpen} onClose={() => setIsBookingModalOpen(false)} accommodation={accommodation} />
        <ReviewModal isOpen={isReviewModalOpen} onClose={() => setIsReviewModalOpen(false)} targetId={accommodation.id} targetType="accommodation" targetName={accommodation.name} />
        <ReviewsModal isOpen={isReviewsModalOpen} onClose={() => setIsReviewsModalOpen(false)} targetId={accommodation.id} targetType="accommodation" targetName={accommodation.name} />
        {AuthModalComponent}
      </Card>
    );
  }

  return (
    <>
      <Card
        className="hover:shadow-2xl transition-all duration-500 cursor-pointer group overflow-hidden border-2 border-[#EBE3D5] hover:border-[#F2A900] bg-white flex flex-col h-full rounded-2xl"
        onClick={handleViewDetails}
      >
        <div className="relative h-64 overflow-hidden bg-[#2D1B08]/5 flex items-center justify-center p-2">
          <div className="w-full h-full relative rounded-2xl overflow-hidden shadow-inner">
            {accommodation.image ? (
              <img
                src={accommodation.image}
                alt={accommodation.name}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
              />
            ) : (
              <div className="flex flex-col items-center justify-center h-full text-[#5D4037]/20 bg-[#F8F5F0]">
                <ImageIcon className="w-12 h-12 mb-2" />
                <span className="text-[10px] font-black uppercase tracking-widest">Aucune photo</span>
              </div>
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-[#2D1B08]/90 via-black/20 to-transparent opacity-80 group-hover:opacity-100 transition-opacity duration-500"></div>
            {accommodation.featured && (
              <Badge className="absolute top-4 left-4 bg-[#F2A900] text-[#2D1B08] font-black uppercase tracking-tighter border-none px-3 py-1.5 shadow-lg rounded-full">
                Recommandé
              </Badge>
            )}
            <Button
              size="sm"
              variant="ghost"
              className="absolute top-4 right-4 h-10 w-10 p-0 rounded-full bg-white/20 backdrop-blur-md text-white hover:bg-white hover:text-[#E11D48] shadow-md transition-all transform hover:scale-110"
              onClick={handleFavorite}
            >
              <Heart className={`h-5 w-5 ${isFavorited ? 'fill-[#E11D48] text-[#E11D48]' : ''}`} />
            </Button>
            <div className="absolute bottom-4 left-4 text-white">
              <div className="flex items-center gap-1.5 bg-white/10 backdrop-blur-md px-3 py-1.5 rounded-xl border border-white/20">
                <span className="text-[#F2A900]">{getTypeIcon(accommodation.type)}</span>
                <span className="uppercase text-[9px] font-black tracking-widest">{accommodation.type}</span>
              </div>
            </div>
          </div>
        </div>

        <CardContent className="p-5 md:p-6 flex flex-col flex-1">
          <div className="flex items-start justify-between mb-2">
            <h3 className="font-black text-xl text-[#2D1B08] group-hover:text-[#F2A900] transition-colors line-clamp-1 uppercase tracking-tighter pr-2">
              {accommodation.name}
            </h3>
            <div className="flex flex-col items-end flex-shrink-0">
               <span className="font-black text-xl text-[#2D1B08] tracking-tighter leading-none">{accommodation.price}</span>
               <span className="text-[8px] font-black uppercase tracking-widest text-gray-400 mt-1">
                 {accommodation.type === 'Restaurant' ? 'par personne' : 'par nuit'}
               </span>
            </div>
          </div>

          <div className="flex items-center justify-between mb-4">
             <div className="flex items-center gap-1.5 text-[10px] font-bold text-[#5D4037]/70">
               <MapPin className="h-3 w-3 text-[#F2A900]" />
               <span className="uppercase tracking-widest">{accommodation.location}</span>
             </div>
             <div className="flex items-center gap-1 bg-[#2D1B08]/5 px-2 py-1 rounded-md text-[#2D1B08] font-black text-[10px] uppercase tracking-widest">
               <Star className="h-3 w-3 fill-[#F2A900] text-[#F2A900]" />
               <span>{accommodation.rating} <span className="opacity-40 font-bold ml-0.5">({accommodation.reviews})</span></span>
             </div>
          </div>

          <p className="text-[#5D4037]/80 text-sm mb-4 line-clamp-2 font-medium leading-relaxed italic">"{accommodation.description}"</p>

          {/* ADAPTIVE COMPOSITION DETAILS (GRID VIEW) */}
          {(accommodation.type === 'Villa' || accommodation.type === 'Appartement' || accommodation.type === 'Résidence') && (
            <div className="flex items-center justify-between gap-2 mb-4 p-3 bg-[#F8F5F0] rounded-xl border border-[#EBE3D5]/50">
               <div className="text-center flex-1">
                  <div className="text-[12px] font-black text-[#2D1B08]">{(accommodation as any).surface || '150'}<span className="text-[9px]">m²</span></div>
                  <div className="text-[7px] font-black text-gray-400 uppercase tracking-widest mt-0.5">Surface</div>
               </div>
               <div className="w-px h-6 bg-gray-200"></div>
               <div className="text-center flex-1">
                  <div className="text-[12px] font-black text-[#2D1B08]">{(accommodation as any).bedrooms || '3'}</div>
                  <div className="text-[7px] font-black text-gray-400 uppercase tracking-widest mt-0.5">Chambres</div>
               </div>
               <div className="w-px h-6 bg-gray-200"></div>
               <div className="text-center flex-1">
                  <div className="text-[12px] font-black text-[#2D1B08]">{(accommodation as any).bathrooms || '2'}</div>
                  <div className="text-[7px] font-black text-gray-400 uppercase tracking-widest mt-0.5">SdB</div>
               </div>
            </div>
          )}

          <div className="flex flex-wrap gap-1.5 mb-6 mt-auto">
            {accommodation.amenities.slice(0, 3).map((amenity, index) => (
              <Badge key={index} variant="outline" className="border-[#EBE3D5] text-[#2D1B08] bg-white font-bold text-[9px] px-2 py-1 rounded-md">
                {getAmenityIcon(amenity)}
                <span className="ml-1 uppercase tracking-tighter">{amenity}</span>
              </Badge>
            ))}
          </div>

          <div className="border-t border-[#EBE3D5]/50 pt-4 flex flex-wrap items-center justify-end gap-2">
              {canLeaveReviewForAccommodation && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleReview}
                  className="border-[#EBE3D5] text-[#5D4037] hover:bg-[#EBE3D5]/20 font-black uppercase tracking-tighter w-9 sm:w-auto sm:px-2.5 rounded-lg h-9 flex items-center justify-center transition-all bg-white flex-shrink-0"
                >
                  <Star className="h-3.5 w-3.5 text-[#F2A900]" />
                  <span className="hidden xl:inline ml-1 text-[9px]">Avis</span>
                </Button>
              )}
              {isAccommodation && (
                <Button
                  variant="outline"
                  size="sm"
                  className="border-[#1B5E20] text-[#1B5E20] hover:bg-[#1B5E20] hover:text-white font-black uppercase tracking-tighter w-9 sm:w-auto sm:px-2.5 rounded-lg h-9 flex items-center justify-center gap-1 transition-all flex-shrink-0"
                  onClick={handleViewRooms}
                >
                  <Bed className="h-3.5 w-3.5" />
                  <span className="hidden xl:inline text-[9px]">
                    Chambres
                  </span>
                </Button>
              )}
              {isRestaurant && (
                <Button
                  variant="outline"
                  size="sm"
                  className="border-[#F2A900] text-[#F2A900] hover:bg-[#F2A900] hover:text-white font-black uppercase tracking-tighter w-10 sm:w-auto sm:px-3 rounded-xl h-10 flex items-center justify-center gap-1.5 transition-all flex-shrink-0"
                  onClick={handleViewMenu}
                >
                  <Utensils className="h-4 w-4" />
                  <span className="hidden xl:inline text-[9px]">Menu</span>
                </Button>
              )}
              <Button
                onClick={handleBooking}
                className="bg-[#2D1B08] hover:bg-black text-[#F2A900] font-black uppercase tracking-widest px-4 rounded-xl h-10 shadow-lg shadow-[#2D1B08]/10 text-[10px] transition-all flex-shrink-0 hover:-translate-y-0.5"
                size="sm"
              >
                Réserver
              </Button>
            </div>
        </CardContent>
      </Card>

      <AccommodationDetailsModal isOpen={isDetailsModalOpen} onClose={() => setIsDetailsModalOpen(false)} accommodation={accommodation} />
      <AccommodationBookingModal isOpen={isBookingModalOpen} onClose={() => setIsBookingModalOpen(false)} accommodation={accommodation} />
      <ReviewModal isOpen={isReviewModalOpen} onClose={() => setIsReviewModalOpen(false)} targetId={accommodation.id} targetType="accommodation" targetName={accommodation.name} />
      <ReviewsModal isOpen={isReviewsModalOpen} onClose={() => setIsReviewsModalOpen(false)} targetId={accommodation.id} targetType="accommodation" targetName={accommodation.name} />
      {AuthModalComponent}
    </>
  );
};

export default AccommodationCard;
