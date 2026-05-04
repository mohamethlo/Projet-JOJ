import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  Building,
  MapPin,
  Star,
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
  DollarSign,
  ChevronLeft,
  ChevronRight,
  ShieldCheck,
  Check,
  Calendar,
  Waves,
  Dumbbell,
  Wind,
  Info,
  Map,
  Users
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
  host?: {
    id: string;
    name: string;
    avatar: string;
    role: string;
    propertyCount?: number;
    rating?: number;
  };
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
  const navigate = useNavigate();
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const images = accommodation.images && accommodation.images.length > 0 
    ? accommodation.images 
    : [accommodation.image];

  const isAccommodation = ['Hôtel', 'Auberge', 'Villa', 'Résidence'].includes(accommodation.type);

  const handleViewRooms = () => {
    navigate(`/establishment/${accommodation.id}?tab=rooms`);
    onClose();
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'Hôtel': return <Building className="h-5 w-5" />;
      case 'Restaurant': return <Utensils className="h-5 w-5" />;
      case 'Auberge': return <Home className="h-5 w-5" />;
      default: return <Bed className="h-5 w-5" />;
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'Disponible':
      case 'Ouvert':
        return <Badge className="bg-[#1B5E20] text-white border-none font-black text-[10px] uppercase tracking-widest px-3 py-1">Disponible</Badge>;
      case 'Indisponible':
      case 'Complet':
        return <Badge className="bg-[#E11D48] text-white border-none font-black text-[10px] uppercase tracking-widest px-3 py-1">Complet</Badge>;
      default:
        return <Badge className="bg-gray-500 text-white border-none font-black text-[10px] uppercase tracking-widest px-3 py-1">{status}</Badge>;
    }
  };

  const getAmenityIcon = (amenity: string) => {
    const a = amenity.toLowerCase();
    if (a.includes('wifi')) return <Wifi className="h-4 w-4" />;
    if (a.includes('parking')) return <Car className="h-4 w-4" />;
    if (a.includes('piscine')) return <Waves className="h-4 w-4" />;
    if (a.includes('restaurant')) return <Utensils className="h-4 w-4" />;
    if (a.includes('gym') || a.includes('sport')) return <Dumbbell className="h-4 w-4" />;
    if (a.includes('clim')) return <Wind className="h-4 w-4" />;
    if (a.includes('spa')) return <Waves className="h-4 w-4" />;
    return <CheckCircle className="h-4 w-4" />;
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
    <>
      <style>
        {`
          .custom-scrollbar::-webkit-scrollbar {
            width: 6px;
          }
          .custom-scrollbar::-webkit-scrollbar-track {
            background: transparent;
          }
          .custom-scrollbar::-webkit-scrollbar-thumb {
            background: #F2A900;
            border-radius: 10px;
          }
          .custom-scrollbar::-webkit-scrollbar-thumb:hover {
            background: #D49400;
          }
        `}
      </style>
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent aria-describedby={undefined} className="max-w-5xl p-0 overflow-hidden bg-white border-none rounded-3xl shadow-2xl h-[90vh] md:h-[85vh] flex flex-col [&>button]:hidden">
        <div className="flex flex-col md:flex-row flex-1 overflow-hidden">
          {/* Visual Section: Image Gallery */}
          <div className="w-full md:w-[40%] relative bg-black h-[35vh] md:h-full flex-shrink-0">
            <div className="h-full w-full relative overflow-hidden">
              <img
                src={images[activeImageIndex]}
                alt={accommodation.name}
                className="w-full h-full object-cover opacity-90 transition-opacity duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>

              {/* Navigation arrows for images */}
              {images.length > 1 && (
                <>
                  <button
                    onClick={() => setActiveImageIndex((prev) => (prev > 0 ? prev - 1 : images.length - 1))}
                    className="absolute left-3 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/40 backdrop-blur-md p-2 rounded-full shadow-lg transition-all text-white z-10"
                  >
                    <ChevronLeft className="h-4 w-4" />
                  </button>
                  <button
                    onClick={() => setActiveImageIndex((prev) => (prev < images.length - 1 ? prev + 1 : 0))}
                    className="absolute right-3 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/40 backdrop-blur-md p-2 rounded-full shadow-lg transition-all text-white z-10"
                  >
                    <ChevronRight className="h-4 w-4" />
                  </button>
                </>
              )}

              {/* Image counter */}
              <div className="absolute top-5 left-5 bg-black/60 backdrop-blur-md text-white px-3 py-1.5 rounded-full text-[10px] font-black tracking-widest z-10 border border-white/20">
                {activeImageIndex + 1} / {images.length}
              </div>

              {/* Status Badge */}
              <div className="absolute bottom-5 left-5 z-10">
                {getStatusBadge(accommodation.availability)}
              </div>
            </div>

            {/* Thumbnails */}
            {images.length > 1 && (
              <div className="absolute bottom-5 left-5 right-5 flex gap-2 overflow-x-auto p-1 scrollbar-hide z-10">
                {images.map((img: string, idx: number) => (
                  <button
                    key={idx}
                    onClick={() => setActiveImageIndex(idx)}
                    className={`relative h-12 w-16 rounded-xl overflow-hidden border-2 transition-all shrink-0 shadow-lg ${activeImageIndex === idx ? 'border-[#F2A900] scale-105' : 'border-white/50 opacity-60 hover:opacity-100 hover:scale-105'
                      }`}
                  >
                    <img src={img} alt="" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Info Section */}
          <div className="w-full md:w-[60%] flex flex-col bg-white relative h-[55vh] md:h-full">
            <div className="p-6 sm:p-8 flex-1 overflow-y-auto custom-scrollbar">
              <div className="flex justify-between items-start mb-4">
                <Badge className="bg-gradient-to-r from-[#F2A900] to-[#D49400] text-white border-none font-black text-[10px] uppercase tracking-widest px-4 py-1.5 shadow-md shadow-[#F2A900]/20">
                  {accommodation.type}
                </Badge>
                <button onClick={onClose} className="bg-[#F8F9FA] text-[#2D1B08]/40 hover:text-[#2D1B08] p-2 rounded-full hover:bg-[#EBE3D5] transition-colors">
                  <XCircle className="h-5 w-5" />
                </button>
              </div>

              <DialogHeader className="text-left p-0 mb-6">
                <DialogTitle className="text-3xl sm:text-4xl font-black text-[#2D1B08] leading-none mb-4 uppercase tracking-tighter">
                  {accommodation.name}
                </DialogTitle>
                <div className="flex flex-wrap items-center gap-4 text-sm font-bold text-[#5D4037]/70">
                  <div className="flex items-center gap-1.5">
                    <MapPin className="h-4 w-4 text-[#F2A900]" />
                    <span className="uppercase tracking-widest text-[11px]">{accommodation.location}</span>
                  </div>
                  <div className="flex items-center gap-1 bg-[#2D1B08]/5 px-2 py-1 rounded-md text-[#2D1B08] font-black text-[11px] uppercase tracking-widest">
                    <Star className="h-3.5 w-3.5 fill-[#F2A900] text-[#F2A900]" />
                    <span>{accommodation.rating} <span className="opacity-40 font-bold ml-0.5">({accommodation.reviews} avis)</span></span>
                  </div>
                </div>
              </DialogHeader>

              <div className="space-y-8">
                {/* Description */}
                <div>
                  <h3 className="text-[10px] font-black text-[#5D4037]/50 uppercase tracking-[0.2em] mb-3 flex items-center gap-2">
                    <span className="w-4 h-0.5 bg-[#F2A900] rounded-full"></span>
                    Présentation
                  </h3>
                  <p className="text-[#5D4037] leading-relaxed text-sm font-medium italic">
                    "{accommodation.description}"
                  </p>
                </div>

                {/* Équipements Grid */}
                {accommodation.amenities && accommodation.amenities.length > 0 && (
                  <div>
                    <h3 className="text-[10px] font-black text-[#5D4037]/50 uppercase tracking-[0.2em] mb-4 flex items-center gap-2">
                      <span className="w-4 h-0.5 bg-[#F2A900] rounded-full"></span>
                      Services & Équipements
                    </h3>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                      {accommodation.amenities.map((amenity: string) => (
                        <div key={amenity} className="flex items-center gap-3 p-3 rounded-xl bg-[#FDFCFB] border border-[#EBE3D5] hover:border-[#F2A900]/30 transition-colors group">
                          <div className="text-[#F2A900] group-hover:scale-110 transition-transform">
                            {getAmenityIcon(amenity)}
                          </div>
                          <span className="text-xs font-bold text-[#2D1B08]">{amenity}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Informations complémentaires */}
                <div className="bg-[#2D1B08]/5 rounded-2xl p-6 border border-[#2D1B08]/10">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {/* Infos Pratiques */}
                    <div className="space-y-6">
                      <h3 className="text-[10px] font-black text-[#2D1B08] uppercase tracking-[0.2em] mb-4 flex items-center gap-2">
                        <Info className="h-3.5 w-3.5" />
                        Infos Pratiques
                      </h3>
                      
                      <div className="grid grid-cols-1 gap-4">
                        {/* Horaires */}
                        {(accommodation.checkIn || accommodation.checkOut) && (
                          <div className="space-y-3">
                            <h4 className="text-[9px] text-[#5D4037]/60 font-black uppercase tracking-tighter flex items-center gap-1.5">
                              <Clock className="h-3.5 w-3.5 text-[#2D1B08]" /> Arrivée & Départ
                            </h4>
                            <div className="grid grid-cols-2 gap-2">
                              {accommodation.checkIn && (
                                <div className="flex items-center justify-between bg-white p-2.5 rounded-xl border border-[#2D1B08]/5 shadow-sm">
                                  <span className="text-[10px] font-bold text-gray-500">Arrivée</span>
                                  <span className="text-[10px] font-black text-[#2D1B08]">{accommodation.checkIn}</span>
                                </div>
                              )}
                              {accommodation.checkOut && (
                                <div className="flex items-center justify-between bg-white p-2.5 rounded-xl border border-[#2D1B08]/5 shadow-sm">
                                  <span className="text-[10px] font-bold text-gray-500">Départ</span>
                                  <span className="text-[10px] font-black text-[#2D1B08]">{accommodation.checkOut}</span>
                                </div>
                              )}
                            </div>
                          </div>
                        )}

                        {/* Contact */}
                        <div className="space-y-3">
                          <h4 className="text-[9px] text-[#5D4037]/60 font-black uppercase tracking-tighter flex items-center gap-1.5">
                            <Phone className="h-3.5 w-3.5 text-[#2D1B08]" /> Contact direct
                          </h4>
                          <div className="flex flex-wrap gap-3">
                            {accommodation.phone && (
                              <div className="flex items-center gap-2 text-[11px] font-bold text-[#2D1B08] bg-white px-3 py-2 rounded-xl border border-[#2D1B08]/5 shadow-sm">
                                <Phone className="h-3 w-3 text-[#F2A900]" /> {accommodation.phone}
                              </div>
                            )}
                            {accommodation.email && (
                              <div className="flex items-center gap-2 text-[11px] font-bold text-[#2D1B08] bg-white px-3 py-2 rounded-xl border border-[#2D1B08]/5 shadow-sm">
                                <Mail className="h-3 w-3 text-[#F2A900]" /> {accommodation.email}
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Hôte Section */}
                    {accommodation.host && (
                      <div className="space-y-4">
                        <h3 className="text-[10px] font-black text-[#2D1B08] uppercase tracking-[0.2em] mb-4 flex items-center gap-2">
                          <Users className="h-3.5 w-3.5" />
                          À propos de l'hôte
                        </h3>
                        
                        <div className="bg-white p-5 rounded-2xl border border-[#2D1B08]/5 shadow-sm hover:shadow-md transition-shadow">
                          <div className="flex items-center gap-4 mb-4">
                            <Avatar className="h-14 w-14 border-2 border-[#F2A900]/20">
                              <AvatarImage src={accommodation.host.avatar} />
                              <AvatarFallback className="bg-[#F2A900] text-white font-black text-xl">
                                {accommodation.host.name.charAt(0)}
                              </AvatarFallback>
                            </Avatar>
                            <div>
                              <div className="flex items-center gap-2">
                                <h4 className="font-black text-[#2D1B08] uppercase tracking-tighter">{accommodation.host.name}</h4>
                                <Badge className="bg-[#1B5E20] text-white text-[8px] font-black uppercase tracking-widest px-2 py-0.5">Vérifié</Badge>
                              </div>
                              <p className="text-[10px] font-bold text-gray-400 mt-0.5">{accommodation.host.role}</p>
                            </div>
                          </div>
                          
                          <div className="grid grid-cols-2 gap-4 mb-4 pt-4 border-t border-gray-50">
                            <div className="text-center">
                              <p className="text-lg font-black text-[#2D1B08]">{accommodation.host.propertyCount || 1}</p>
                              <p className="text-[8px] font-black text-gray-400 uppercase tracking-widest">Propriétés</p>
                            </div>
                            <div className="text-center border-l border-gray-50">
                              <p className="text-lg font-black text-[#2D1B08]">{accommodation.host.rating || 5.0}</p>
                              <p className="text-[8px] font-black text-gray-400 uppercase tracking-widest">Note moyenne</p>
                            </div>
                          </div>
                          
                          <Button 
                            variant="outline" 
                            className="w-full border-[#2D1B08] text-[#2D1B08] hover:bg-[#2D1B08] hover:text-white font-black uppercase tracking-widest text-[9px] h-10 rounded-xl"
                            onClick={() => {
                              navigate(`/user/${accommodation.host?.id}`);
                              onClose();
                            }}
                          >
                            Voir le portfolio complet
                          </Button>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Règlement */}
                  {accommodation.policies && accommodation.policies.length > 0 && (
                    <div className="mt-8 pt-6 border-t border-[#2D1B08]/10">
                      <h4 className="text-[9px] text-[#5D4037]/60 font-black uppercase tracking-tighter mb-4 flex items-center gap-1.5">
                        <ShieldCheck className="h-3.5 w-3.5 text-[#2D1B08]" /> Règlement intérieur & Conditions
                      </h4>
                      <ul className="grid grid-cols-1 sm:grid-cols-2 gap-y-3 gap-x-6">
                        {accommodation.policies.map((policy, idx) => (
                          <li key={idx} className="flex items-start gap-2.5 text-[11px] text-[#2D1B08] font-bold bg-white/50 p-2.5 rounded-xl border border-transparent hover:border-[#2D1B08]/5 transition-colors">
                            <Check className="h-3.5 w-3.5 text-[#1B5E20] shrink-0 mt-0.5" />
                            <span className="leading-tight">{policy}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Footer Action (Sticky) */}
            <div className="p-6 bg-[#FDFCFB] border-t border-[#EBE3D5] shrink-0 z-10">
              <div className="flex items-center justify-between mb-4 px-2">
                <div>
                  <p className="text-[10px] font-black text-[#5D4037]/60 uppercase tracking-widest">À partir de</p>
                  <p className="text-2xl font-black text-[#2D1B08] tracking-tighter">{accommodation.price}</p>
                </div>
                {isAccommodation && (
                   <Button
                    variant="ghost"
                    size="sm"
                    className="text-[#F2A900] hover:text-[#D49400] font-black uppercase tracking-widest text-[10px] p-0"
                    onClick={handleViewRooms}
                  >
                    Voir les chambres <ChevronRight className="ml-1 h-3.5 w-3.5" />
                  </Button>
                )}
              </div>

              {/* Admin Actions OR User Actions */}
              <div className="flex flex-wrap gap-2">
                {onEdit || onDelete ? (
                  <>
                    <div className="flex gap-2 w-full sm:w-auto">
                      <Button 
                        variant="outline" 
                        className="flex-1 sm:flex-none border-[#EBE3D5] text-[#2D1B08] font-black uppercase tracking-tighter rounded-xl h-12"
                        onClick={() => handleAction('edit')}
                      >
                        <Edit className="h-4 w-4 mr-2" /> Modifier
                      </Button>
                      <Button
                        variant="outline"
                        className="flex-1 sm:flex-none border-[#E11D48]/30 text-[#E11D48] hover:bg-[#E11D48] hover:text-white font-black uppercase tracking-tighter rounded-xl h-12"
                        onClick={() => handleAction('delete')}
                      >
                        <Trash2 className="h-4 w-4 mr-2" /> Supprimer
                      </Button>
                    </div>
                    <div className="flex-1 flex gap-2">
                       {accommodation.availability === 'Disponible' || accommodation.availability === 'Ouvert' ? (
                        <Button
                          variant="outline"
                          className="flex-1 border-[#F2A900]/30 text-[#F2A900] hover:bg-[#F2A900] hover:text-white font-black uppercase tracking-tighter rounded-xl h-12"
                          onClick={() => handleAction('suspend')}
                        >
                          <AlertTriangle className="h-4 w-4 mr-2" /> Suspendre
                        </Button>
                      ) : (
                        <Button
                          className="flex-1 bg-[#1B5E20] hover:bg-[#15490F] text-white font-black uppercase tracking-tighter rounded-xl h-12"
                          onClick={() => handleAction('activate')}
                        >
                          <CheckCircle className="h-4 w-4 mr-2" /> Activer
                        </Button>
                      )}
                    </div>
                  </>
                ) : (
                  <div className="grid grid-cols-2 gap-3 w-full">
                    <Button
                      variant="outline"
                      className="border-[#2D1B08] text-[#2D1B08] font-black uppercase tracking-widest rounded-xl h-12"
                      onClick={() => navigate(`/establishment/${accommodation.id}`)}
                    >
                      <Building className="h-4 w-4 mr-2" /> Profil
                    </Button>
                    <Button
                      className="bg-[#2D1B08] hover:bg-black text-[#F2A900] font-black uppercase tracking-widest rounded-xl h-12 shadow-xl shadow-[#2D1B08]/20"
                      onClick={() => navigate(`/establishment/${accommodation.id}?tab=booking`)}
                    >
                      <Calendar className="h-4 w-4 mr-2" /> Réserver
                    </Button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
    </>
  );
};

export default AccommodationDetailsModal;