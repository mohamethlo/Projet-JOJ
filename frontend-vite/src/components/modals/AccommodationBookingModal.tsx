import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { CheckCircle, UserPlus, Star, Info, MapPin, Calendar, Users, Phone, Mail, Globe, Sparkles } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import TicketModal from '@/components/tickets/TicketModal';

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
  roomName?: string;
  roomType?: string;
}

interface AccommodationBookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  accommodation: AccommodationProps;
}

const AccommodationBookingModal: React.FC<AccommodationBookingModalProps> = ({ isOpen, onClose, accommodation }) => {
  const [step, setStep] = useState(1);
  const [isTicketModalOpen, setIsTicketModalOpen] = useState(false);
  const [ticketData, setTicketData] = useState<any>(null);
  const [formData, setFormData] = useState({
    contactInfo: {
      name: '',
      email: '',
      phone: '',
      nationality: ''
    },
    bookingDetails: {
      checkIn: '',
      checkOut: '',
      guests: '',
      rooms: '',
      roomType: '',
      specialRequests: ''
    },
    additionalInfo: {
      transportation: '',
      dietaryRestrictions: '',
      accessibility: '',
      celebration: '',
      additionalServices: ''
    }
  });

  useEffect(() => {
    if (isOpen && accommodation.roomType) {
      setFormData(prev => ({
        ...prev,
        bookingDetails: {
          ...prev.bookingDetails,
          roomType: accommodation.roomName || accommodation.roomType || '',
          guests: accommodation.capacity ? `${accommodation.capacity} personne${accommodation.capacity > 1 ? 's' : ''}` : prev.bookingDetails.guests,
          rooms: '1 chambre'
        }
      }));
    }
  }, [isOpen, accommodation]);

  const guestOptions = ['1 personne', '2 personnes', '3 personnes', '4 personnes', '5 personnes', '6 personnes', 'Plus de 6 personnes'];
  const roomOptions = ['1 chambre', '2 chambres', '3 chambres', '4 chambres', 'Plus de 4 chambres'];
  const roomTypes = ['Chambre Standard', 'Chambre Supérieure', 'Suite', 'Chambre Familiale', 'Chambre Deluxe', 'Villa'];

  const handleInputChange = (field: string, value: string) => {
    if (field.includes('.')) {
      const [parent, child] = field.split('.');
      setFormData(prev => ({
        ...prev,
        [parent]: { ...prev[parent as keyof typeof prev], [child]: value }
      }));
    } else {
      setFormData(prev => ({ ...prev, [field]: value }));
    }
  };

  const calculateTotalPrice = () => {
    const basePrice = parseInt(accommodation.price.replace(/[^\d]/g, '')) || 0;
    if (!formData.bookingDetails.checkIn || !formData.bookingDetails.checkOut) return basePrice;
    
    const checkInDate = new Date(formData.bookingDetails.checkIn);
    const checkOutDate = new Date(formData.bookingDetails.checkOut);
    const nights = Math.max(1, Math.ceil((checkOutDate.getTime() - checkInDate.getTime()) / (1000 * 60 * 60 * 24)));
    const rooms = parseInt(formData.bookingDetails.rooms) || 1;

    return basePrice * nights * rooms;
  };

  const handleSubmit = () => {
    const totalPrice = calculateTotalPrice();
    const ticket = {
      id: `ACC-${Date.now()}`,
      type: 'accommodation' as const,
      title: `Réservation - ${accommodation.name}`,
      description: `Séjour du ${formData.bookingDetails.checkIn} au ${formData.bookingDetails.checkOut}`,
      date: formData.bookingDetails.checkIn,
      time: accommodation.checkIn || '14:00',
      location: accommodation.location,
      price: `${totalPrice.toLocaleString()} FCFA`,
      customerName: formData.contactInfo.name,
      customerEmail: formData.contactInfo.email,
      customerPhone: formData.contactInfo.phone,
      status: 'confirmed' as const,
      bookingDate: new Date().toLocaleDateString('fr-FR'),
      qrCode: `QR-${Date.now()}`,
      additionalInfo: { ...formData.bookingDetails }
    };
    setTicketData(ticket);
    setStep(3);
  };

  const handleClose = () => {
    setStep(1);
    setFormData({
      contactInfo: { name: '', email: '', phone: '', nationality: '' },
      bookingDetails: { checkIn: '', checkOut: '', guests: '', rooms: '', roomType: '', specialRequests: '' },
      additionalInfo: { transportation: '', dietaryRestrictions: '', accessibility: '', celebration: '', additionalServices: '' }
    });
    setTicketData(null);
    onClose();
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
      <Dialog open={isOpen} onOpenChange={(open) => !open && handleClose()}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto p-0 border-none bg-[#FFFDFB] rounded-[2rem] shadow-2xl custom-scrollbar">
          {/* Header Image/Banner */}
          <div className="relative h-40 bg-[#2D1B08] overflow-hidden">
             <div className="absolute inset-0 bg-gradient-to-r from-[#2D1B08] via-[#2D1B08]/80 to-transparent z-10" />
             <img src={accommodation.image} alt={accommodation.name} className="w-full h-full object-cover opacity-50" />
             <div className="absolute inset-0 z-20 p-8 flex flex-col justify-end">
                <div className="flex items-center gap-2 mb-2">
                    <Badge className="bg-[#F2A900] text-[#2D1B08] font-black uppercase tracking-widest text-[9px] border-none">
                        Étape {step} sur 3
                    </Badge>
                    <div className="flex gap-1.5 ml-2">
                        {[1, 2, 3].map(s => (
                            <div key={s} className={`h-1.5 rounded-full transition-all duration-500 ${s === step ? 'w-8 bg-[#F2A900]' : 'w-2 bg-white/20'}`} />
                        ))}
                    </div>
                </div>
                <DialogTitle className="text-2xl sm:text-3xl font-black text-white uppercase tracking-tighter leading-none">
                    {step === 3 ? "Confirmation" : `Réserver votre séjour`}
                </DialogTitle>
             </div>
             <Sparkles className="absolute top-6 right-6 h-8 w-8 text-[#F2A900]/20" />
          </div>

          <div className="p-8 space-y-8">
            {/* Summary Card (Floating style) */}
            {step < 3 && (
                <div className="relative -mt-16 bg-white p-6 rounded-3xl shadow-2xl border border-[#EBE3D5] z-30">
                    <div className="flex items-center justify-between gap-4">
                        <div className="flex items-center gap-4">
                            <div className="h-14 w-14 rounded-2xl overflow-hidden border-2 border-[#F2A900]/20 shadow-inner">
                                <img src={accommodation.image} className="w-full h-full object-cover" />
                            </div>
                            <div>
                                <h3 className="font-black text-[#2D1B08] uppercase tracking-tighter leading-none mb-1">{accommodation.name}</h3>
                                <div className="flex items-center gap-1.5 text-[10px] font-bold text-gray-400">
                                    <MapPin className="h-3 w-3 text-[#F2A900]" />
                                    <span>{accommodation.location}</span>
                                    <Star className="h-3 w-3 fill-[#F2A900] text-[#F2A900] ml-1" />
                                    <span>{accommodation.rating}</span>
                                </div>
                            </div>
                        </div>
                        <div className="text-right">
                            <div className="text-xl font-black text-[#2D1B08] tracking-tighter">{accommodation.price}</div>
                            <div className="text-[8px] font-black uppercase tracking-widest text-gray-400">par nuit</div>
                        </div>
                    </div>
                </div>
            )}

            {step === 1 && (
              <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
                <div className="space-y-6">
                  <h3 className="text-xs font-black text-[#2D1B08] uppercase tracking-[0.2em] flex items-center gap-2">
                    <UserPlus className="h-4 w-4 text-[#F2A900]" />
                    Vos Coordonnées
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div className="space-y-2">
                      <Label className="text-[10px] font-black uppercase tracking-widest text-gray-500 ml-1">Nom Complet</Label>
                      <Input
                        value={formData.contactInfo.name}
                        onChange={(e) => handleInputChange('contactInfo.name', e.target.value)}
                        placeholder="Ex: Moussa Ndiaye"
                        className="h-12 bg-white rounded-xl border-[#EBE3D5] focus:border-[#F2A900] focus:ring-[#F2A900]/10 font-bold"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label className="text-[10px] font-black uppercase tracking-widest text-gray-500 ml-1">Email professionnel</Label>
                      <Input
                        type="email"
                        value={formData.contactInfo.email}
                        onChange={(e) => handleInputChange('contactInfo.email', e.target.value)}
                        placeholder="moussa@exemple.com"
                        className="h-12 bg-white rounded-xl border-[#EBE3D5] focus:border-[#F2A900] focus:ring-[#F2A900]/10 font-bold"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label className="text-[10px] font-black uppercase tracking-widest text-gray-500 ml-1">Téléphone</Label>
                      <Input
                        type="tel"
                        value={formData.contactInfo.phone}
                        onChange={(e) => handleInputChange('contactInfo.phone', e.target.value)}
                        placeholder="+221 XX XXX XX XX"
                        className="h-12 bg-white rounded-xl border-[#EBE3D5] focus:border-[#F2A900] focus:ring-[#F2A900]/10 font-bold"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label className="text-[10px] font-black uppercase tracking-widest text-gray-500 ml-1">Nationalité</Label>
                      <Input
                        value={formData.contactInfo.nationality}
                        onChange={(e) => handleInputChange('contactInfo.nationality', e.target.value)}
                        placeholder="Ex: Sénégalaise"
                        className="h-12 bg-white rounded-xl border-[#EBE3D5] focus:border-[#F2A900] focus:ring-[#F2A900]/10 font-bold"
                      />
                    </div>
                  </div>
                </div>

                <div className="flex justify-end pt-4">
                  <Button
                    onClick={() => setStep(2)}
                    disabled={!formData.contactInfo.name || !formData.contactInfo.email || !formData.contactInfo.phone}
                    className="bg-[#2D1B08] hover:bg-black text-[#F2A900] font-black uppercase tracking-widest h-12 px-10 rounded-xl shadow-xl transition-all disabled:opacity-50"
                  >
                    Continuer vers le séjour
                  </Button>
                </div>
              </div>
            )}

            {step === 2 && (
              <div className="space-y-8 animate-in fade-in slide-in-from-right-4 duration-500">
                <div className="space-y-6">
                  <h3 className="text-xs font-black text-[#2D1B08] uppercase tracking-[0.2em] flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-[#F2A900]" />
                    Détails du Séjour
                  </h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div className="space-y-2">
                      <Label className="text-[10px] font-black uppercase tracking-widest text-gray-500 ml-1">Arrivée</Label>
                      <Input
                        type="date"
                        value={formData.bookingDetails.checkIn}
                        onChange={(e) => handleInputChange('bookingDetails.checkIn', e.target.value)}
                        className="h-12 bg-white rounded-xl border-[#EBE3D5] focus:border-[#F2A900] font-bold"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label className="text-[10px] font-black uppercase tracking-widest text-gray-500 ml-1">Départ</Label>
                      <Input
                        type="date"
                        value={formData.bookingDetails.checkOut}
                        onChange={(e) => handleInputChange('bookingDetails.checkOut', e.target.value)}
                        className="h-12 bg-white rounded-xl border-[#EBE3D5] focus:border-[#F2A900] font-bold"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                    <div className="space-y-2">
                      <Label className="text-[10px] font-black uppercase tracking-widest text-gray-500 ml-1">Voyageurs</Label>
                      <Select value={formData.bookingDetails.guests} onValueChange={(v) => handleInputChange('bookingDetails.guests', v)}>
                        <SelectTrigger className="h-12 rounded-xl border-[#EBE3D5] font-bold"><SelectValue /></SelectTrigger>
                        <SelectContent>{guestOptions.map(o => <SelectItem key={o} value={o}>{o}</SelectItem>)}</SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                        <Label className="text-[10px] font-black uppercase tracking-widest text-gray-500 ml-1">Unités</Label>
                        <Select value={formData.bookingDetails.rooms} onValueChange={(v) => handleInputChange('bookingDetails.rooms', v)}>
                            <SelectTrigger className="h-12 rounded-xl border-[#EBE3D5] font-bold"><SelectValue /></SelectTrigger>
                            <SelectContent>{roomOptions.map(o => <SelectItem key={o} value={o}>{o}</SelectItem>)}</SelectContent>
                        </Select>
                    </div>
                    <div className="space-y-2">
                        <Label className="text-[10px] font-black uppercase tracking-widest text-gray-500 ml-1">Catégorie</Label>
                        <Select value={formData.bookingDetails.roomType} onValueChange={(v) => handleInputChange('bookingDetails.roomType', v)}>
                            <SelectTrigger className="h-12 rounded-xl border-[#EBE3D5] font-bold"><SelectValue /></SelectTrigger>
                            <SelectContent>{roomTypes.map(o => <SelectItem key={o} value={o}>{o}</SelectItem>)}</SelectContent>
                        </Select>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label className="text-[10px] font-black uppercase tracking-widest text-gray-500 ml-1">Demandes Spéciales</Label>
                    <Textarea
                      value={formData.bookingDetails.specialRequests}
                      onChange={(e) => handleInputChange('bookingDetails.specialRequests', e.target.value)}
                      placeholder="Souhaitez-vous ajouter quelque chose ?"
                      className="rounded-xl border-[#EBE3D5] focus:border-[#F2A900] font-medium"
                      rows={3}
                    />
                  </div>
                </div>

                {/* Price Preview Card */}
                <div className="bg-[#2D1B08] p-6 rounded-3xl text-white shadow-xl shadow-[#2D1B08]/20 flex items-center justify-between">
                    <div>
                        <p className="text-[9px] font-black uppercase tracking-[0.2em] text-[#F2A900] mb-1">Total Estimé</p>
                        <div className="flex items-baseline gap-2">
                            <span className="text-3xl font-black tracking-tighter">{calculateTotalPrice().toLocaleString()}</span>
                            <span className="text-sm font-bold text-white/60 uppercase">FCFA</span>
                        </div>
                    </div>
                    <Info className="h-5 w-5 text-white/20" />
                </div>

                <div className="flex justify-between items-center pt-4">
                  <Button variant="ghost" onClick={() => setStep(1)} className="text-[#5D4037] font-black uppercase tracking-widest text-[10px]">
                    Retour
                  </Button>
                  <Button
                    onClick={handleSubmit}
                    disabled={!formData.bookingDetails.checkIn || !formData.bookingDetails.checkOut || !formData.bookingDetails.guests}
                    className="bg-[#2D1B08] hover:bg-black text-[#F2A900] font-black uppercase tracking-widest h-12 px-12 rounded-xl shadow-xl transition-all"
                  >
                    Valider la réservation
                  </Button>
                </div>
              </div>
            )}

            {step === 3 && (
              <div className="text-center space-y-8 animate-in zoom-in-95 duration-500 py-6">
                <div className="relative inline-block">
                    <div className="absolute inset-0 bg-[#1B5E20]/20 rounded-full blur-2xl animate-pulse" />
                    <div className="relative w-24 h-24 bg-[#1B5E20] rounded-full flex items-center justify-center mx-auto shadow-2xl shadow-[#1B5E20]/40 border-4 border-white">
                        <CheckCircle className="h-12 w-12 text-white" />
                    </div>
                </div>
                <div>
                  <h3 className="text-3xl font-black text-[#2D1B08] uppercase tracking-tighter mb-2">Félicitations !</h3>
                  <p className="text-[#5D4037] font-medium max-w-sm mx-auto leading-relaxed">
                    Votre demande de réservation pour <span className="font-black text-[#2D1B08]">{accommodation.name}</span> a été transmise avec succès.
                  </p>
                </div>

                <div className="bg-[#F8F5F0] p-6 rounded-3xl border border-[#EBE3D5] text-left max-w-sm mx-auto">
                    <div className="flex items-center gap-3 mb-4">
                        <div className="w-10 h-10 rounded-xl bg-[#2D1B08] flex items-center justify-center text-[#F2A900]">
                            <TicketModal.icon className="h-5 w-5" />
                        </div>
                        <div>
                            <p className="text-[8px] font-black text-gray-400 uppercase tracking-widest">Référence Ticket</p>
                            <p className="text-sm font-black text-[#2D1B08]">#{ticketData?.id.split('-')[1]}</p>
                        </div>
                    </div>
                    <Button 
                        onClick={() => setIsTicketModalOpen(true)}
                        className="w-full bg-white hover:bg-gray-50 text-[#2D1B08] border-2 border-[#EBE3D5] font-black uppercase tracking-widest text-[10px] h-11 rounded-xl transition-all"
                    >
                        Accéder à mon Ticket
                    </Button>
                </div>

                <Button onClick={handleClose} variant="ghost" className="text-gray-400 font-bold uppercase tracking-widest text-[10px]">
                    Fermer la fenêtre
                </Button>
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>

      {/* Modal du ticket */}
      {ticketData && (
        <TicketModal
          isOpen={isTicketModalOpen}
          onClose={() => setIsTicketModalOpen(false)}
          ticketData={ticketData}
        />
      )}
    </>
  );
};

export default AccommodationBookingModal;
