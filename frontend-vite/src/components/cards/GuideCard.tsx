import React, { useState } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Star, MapPin, CheckCircle, Heart, Clock, Award, MessageCircle, Eye } from 'lucide-react';
import { GuideDetailsModal, GuideBookingModal, GuideContactModal } from '@/components/modals';

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
    const [isFavorited, setIsFavorited] = useState(false);
    const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);
    const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
    const [isContactModalOpen, setIsContactModalOpen] = useState(false);

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


    const handleViewDetails = () => {
      setIsDetailsModalOpen(true);
    };

    // Vérifier si l'utilisateur peut laisser un avis
    // Les guides ne peuvent pas laisser d'avis sur d'autres guides
    // const canLeaveReviewForGuide = user?.role !== 'guide';

    if (viewMode === 'list') {
      return (
        <>
          <Card className="hover:shadow-xl transition-all duration-300 overflow-hidden border-[#EBE3D5] bg-white group rounded-2xl">
            <CardContent className="p-0">
              <div className="flex flex-col md:flex-row">
                <div className="relative w-full md:w-64 h-64 md:h-auto flex-shrink-0">
                  <img
                    src={guide.avatar}
                    alt={guide.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-40"></div>
                  {guide.featured && (
                    <Badge className="absolute top-4 left-4 bg-[#F2A900] text-white font-black uppercase tracking-tighter shadow-lg border-none px-3 py-1">
                      Vedette
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

                <div className="p-6 md:p-8 flex-1 flex flex-col">
                  <div className="flex justify-between items-start mb-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <h3 className="font-black text-2xl text-[#2D1B08] group-hover:text-[#F2A900] transition-colors uppercase tracking-tighter line-clamp-1">{guide.name}</h3>
                        {guide.isVerified && (
                          <CheckCircle className="h-5 w-5 text-[#1B5E20]" />
                        )}
                      </div>

                      <div className="flex flex-wrap items-center gap-4 text-xs font-bold text-[#5D4037]/70">
                        <div className="flex items-center gap-1.5">
                          <MapPin className="h-4 w-4 text-[#1B5E20]" />
                          <span className="uppercase tracking-wide">{guide.location}</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <Clock className="h-4 w-4 text-[#F2A900]" />
                          <span>Réponse: {guide.responseTime}</span>
                        </div>
                      </div>
                    </div>

                    <div className="text-right">
                      <div className="font-black text-2xl text-[#F2A900] tracking-tighter leading-none">{guide.price}</div>
                      <div className="text-[10px] font-black uppercase tracking-widest text-[#5D4037]/60 mt-1">par jour</div>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 mb-6">
                    <div className="flex items-center gap-1 bg-[#F2A900]/10 px-2 py-1 rounded text-[#F2A900] font-black text-sm">
                      <Star className="h-4 w-4 fill-current" />
                      <span>{guide.rating}</span>
                    </div>
                    <span className="text-xs font-bold text-[#5D4037]/60">({guide.reviews} avis)</span>
                  </div>

                  <p className="text-[#5D4037] text-sm mb-6 line-clamp-2 font-medium leading-relaxed">{guide.description}</p>

                  <div className="flex flex-wrap gap-1.5 mb-8">
                    {guide.specialties.map((specialty, index) => (
                      <Badge key={index} variant="outline" className="border-[#EBE3D5] text-[#5D4037] bg-[#FFFDFB] font-bold text-[10px] px-2 py-0.5 uppercase tracking-tight">
                        {specialty}
                      </Badge>
                    ))}
                  </div>

                  <div className="mt-auto flex flex-col sm:flex-row sm:items-center justify-between gap-6 pt-6 border-t border-[#EBE3D5]">
                    <Badge className={`font-black uppercase tracking-widest text-[10px] px-3 py-1.5 border-none ${guide.availability === 'Disponible'
                      ? 'bg-[#1B5E20]/10 text-[#1B5E20]'
                      : 'bg-[#E11D48]/10 text-[#E11D48]'
                      }`}>
                      {guide.availability}
                    </Badge>

                    <div className="flex flex-wrap gap-3">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={handleViewDetails}
                        className="border-[#EBE3D5] text-[#5D4037] hover:bg-[#EBE3D5]/20 font-black uppercase tracking-tighter px-6 rounded-lg h-11"
                      >
                        <Eye className="h-4 w-4 mr-2" />
                        Détails
                      </Button>
                      <Button
                        size="sm"
                        onClick={handleReservation}
                        className="bg-[#1B5E20] hover:bg-[#144718] text-white font-black uppercase tracking-tighter px-6 rounded-lg h-11 shadow-md shadow-emerald-900/10"
                      >
                        Réserver
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={handleContact}
                        className="border-[#F2A900] text-[#F2A900] hover:bg-[#F2A900]/10 font-black uppercase tracking-tighter px-4 rounded-lg h-11"
                      >
                        <MessageCircle className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <GuideContactModal
            isOpen={isContactModalOpen}
            onClose={() => setIsContactModalOpen(false)}
            guide={guide}
          />
        </>
      );
    }

    return (
      <>
        <Card className="hover:shadow-2xl transition-all duration-500 cursor-pointer h-full border-2 border-[#EBE3D5] hover:border-[#F2A900] bg-white rounded-2xl flex flex-col group overflow-hidden">
          <div className="relative h-64 overflow-hidden">
            <Avatar className="h-full w-full rounded-none">
              <AvatarImage src={guide.avatar} alt={guide.name} className="object-cover group-hover:scale-110 transition-transform duration-700" />
              <AvatarFallback className="rounded-none bg-[#FFFDFB] text-[#2D1B08] font-black text-2xl">
                {guide.name.split(' ').map(n => n[0]).join('')}
              </AvatarFallback>
            </Avatar>
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-60"></div>

            <div className="absolute top-4 right-4 flex items-center space-x-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={handleFavorite}
                className={`h-10 w-10 p-0 rounded-full bg-white/90 backdrop-blur-sm shadow-md hover:bg-white transition-all transform hover:scale-110 ${isFavorited ? 'text-[#E11D48]' : 'text-[#5D4037]'}`}
              >
                <Heart className={`h-5 w-5 ${isFavorited ? 'fill-current' : ''}`} />
              </Button>
              {guide.featured && (
                <Badge className="bg-[#F2A900] text-white font-black uppercase tracking-tighter text-[10px] px-3 py-1 shadow-lg border-none">
                  Vedette
                </Badge>
              )}
            </div>

            <div className="absolute bottom-4 left-4 right-4 text-white">
              <div className="flex items-center gap-1.5 mb-2">
                <h3 className="font-black text-xl uppercase tracking-tighter line-clamp-1">{guide.name}</h3>
                {guide.isVerified && (
                  <CheckCircle className="h-4 w-4 text-[#F2A900]" />
                )}
              </div>
              <div className="flex items-center space-x-2 text-xs font-bold text-white/90 uppercase tracking-widest">
                <MapPin className="h-3.5 w-3.5 text-[#F2A900]" />
                <span>{guide.location}</span>
              </div>
            </div>
          </div>

          <CardContent className="p-6 flex flex-col flex-1">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-1 bg-[#F2A900]/10 px-2 py-1 rounded text-[#F2A900] font-black text-sm border border-[#F2A900]/10">
                <Star className="h-4 w-4 fill-current" />
                <span>{guide.rating}</span>
                <span className="text-[10px] font-bold text-[#5D4037]/60 ml-0.5">({guide.reviews})</span>
              </div>
              <div className="flex items-center gap-1 bg-[#1B5E20]/5 px-2 py-1 rounded text-[#1B5E20] font-black text-[10px] uppercase tracking-tighter">
                <Award className="h-3 w-3" />
                <span>{guide.toursCompleted || 0} Tours</span>
              </div>
            </div>

            <p className="text-[#5D4037] text-sm mb-6 line-clamp-3 font-medium leading-relaxed">
              {guide.description}
            </p>

            <div className="flex flex-wrap gap-1.5 mb-6 mt-auto">
              {guide.specialties.slice(0, 3).map((specialty, index) => (
                <Badge key={index} variant="outline" className="border-[#EBE3D5] text-[#5D4037]/80 bg-[#FFFDFB] font-bold text-[9px] px-2 py-0.5 uppercase tracking-tighter">
                  {specialty}
                </Badge>
              ))}
            </div>

            <div className="space-y-4 pt-6 border-t border-[#EBE3D5]">
              <div className="flex items-center justify-between">
                <div>
                  <div className="font-black text-2xl text-[#2D1B08] tracking-tighter leading-none">{guide.price}</div>
                  <div className="text-[9px] font-black uppercase tracking-widest text-[#5D4037]/60 mt-1">/ jour</div>
                </div>
                <Badge className={`font-black uppercase tracking-widest text-[9px] px-2 py-1 border-none shadow-sm ${guide.availability === 'Disponible'
                  ? 'bg-[#1B5E20]/10 text-[#1B5E20]'
                  : 'bg-[#E11D48]/10 text-[#E11D48]'
                  }`}>
                  {guide.availability}
                </Badge>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <Button
                  variant="outline"
                  onClick={handleViewDetails}
                  className="border-[#EBE3D5] text-[#5D4037] hover:bg-[#EBE3D5]/20 font-black uppercase tracking-tighter px-4 rounded-lg h-10"
                >
                  Profil
                </Button>
                <Button
                  onClick={handleReservation}
                  className="bg-[#F2A900] hover:bg-[#D49400] text-white font-black uppercase tracking-tighter rounded-lg h-10 shadow-lg shadow-orange-900/10"
                >
                  Réserver
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

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
      </>
    );
  };

export default GuideCard;
