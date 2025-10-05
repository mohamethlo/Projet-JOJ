import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Calendar, Clock, Users, CheckCircle, UserPlus, Star, Calculator, Info, MapPin } from 'lucide-react';
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

  const roomTypes = [
    'Chambre Standard',
    'Chambre Supérieure',
    'Suite',
    'Chambre Familiale',
    'Chambre Deluxe',
    'Villa'
  ];

  const guestOptions = [
    '1 personne',
    '2 personnes',
    '3 personnes',
    '4 personnes',
    '5 personnes',
    '6 personnes',
    'Plus de 6 personnes'
  ];

  const roomOptions = [
    '1 chambre',
    '2 chambres',
    '3 chambres',
    '4 chambres',
    'Plus de 4 chambres'
  ];

  const handleInputChange = (field: string, value: string) => {
    if (field.includes('.')) {
      const [parent, child] = field.split('.');
      setFormData(prev => ({
        ...prev,
        [parent]: {
          ...prev[parent as keyof typeof prev],
          [child]: value
        }
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [field]: value
      }));
    }
  };

  const calculateTotalPrice = () => {
    const basePrice = parseInt(accommodation.price.replace(/[^\d]/g, '')) || 0;
    const checkInDate = new Date(formData.bookingDetails.checkIn);
    const checkOutDate = new Date(formData.bookingDetails.checkOut);
    const nights = Math.ceil((checkOutDate.getTime() - checkInDate.getTime()) / (1000 * 60 * 60 * 24));
    const rooms = parseInt(formData.bookingDetails.rooms) || 1;
    
    return basePrice * nights * rooms;
  };

  const handleSubmit = () => {
    // Générer les données du ticket
    const totalPrice = calculateTotalPrice();
    const ticket = {
      id: `ACCOMMODATION-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      type: 'accommodation' as const,
      title: `Réservation - ${accommodation.name}`,
      description: `Séjour du ${formData.bookingDetails.checkIn} au ${formData.bookingDetails.checkOut}`,
      date: formData.bookingDetails.checkIn,
      time: accommodation.checkIn || '14h00',
      location: accommodation.location,
      price: `${totalPrice.toLocaleString()} FCFA`,
      customerName: formData.contactInfo.name,
      customerEmail: formData.contactInfo.email,
      customerPhone: formData.contactInfo.phone,
      status: 'confirmed' as const,
      bookingDate: new Date().toLocaleDateString('fr-FR'),
      qrCode: `QR-${Date.now()}`,
      additionalInfo: {
        accommodationName: accommodation.name,
        checkIn: formData.bookingDetails.checkIn,
        checkOut: formData.bookingDetails.checkOut,
        guests: formData.bookingDetails.guests,
        rooms: formData.bookingDetails.rooms,
        roomType: formData.bookingDetails.roomType,
        specialRequests: formData.bookingDetails.specialRequests
      }
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
    setIsTicketModalOpen(false);
    onClose();
  };

  const handleDialogClose = (open: boolean) => {
    if (!open) {
      // Si on est à l'étape 3 (confirmation), on ne ferme pas automatiquement
      if (step === 3) {
        return;
      }
      
      // Vérifier s'il y a des données saisies
      const hasData = formData.contactInfo.name || formData.contactInfo.email || formData.contactInfo.phone ||
                     formData.bookingDetails.checkIn || formData.bookingDetails.checkOut || formData.bookingDetails.guests;
      
      if (hasData) {
        // Demander confirmation avant de fermer
        const confirmed = window.confirm(
          'Vous avez saisi des informations. Êtes-vous sûr de vouloir annuler la réservation ?'
        );
        if (!confirmed) {
          return; // Ne pas fermer si l'utilisateur annule
        }
      }
      
      // Fermer normalement
      handleClose();
    }
  };

  const handleShowTicket = () => {
    setIsTicketModalOpen(true);
  };

  const totalPrice = calculateTotalPrice();
  const nights = formData.bookingDetails.checkIn && formData.bookingDetails.checkOut ? 
    Math.ceil((new Date(formData.bookingDetails.checkOut).getTime() - new Date(formData.bookingDetails.checkIn).getTime()) / (1000 * 60 * 60 * 24)) : 0;

  return (
    <>
      <Dialog open={isOpen} onOpenChange={handleDialogClose}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <UserPlus className="h-5 w-5 text-blue-500" />
                <span>Réservation - {accommodation.name}</span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="text-sm text-gray-500">Étape {step}/3</span>
                <div className="flex space-x-1">
                  {[1, 2, 3].map((stepNumber) => (
                    <div
                      key={stepNumber}
                      className={`w-2 h-2 rounded-full ${
                        stepNumber <= step ? 'bg-blue-500' : 'bg-gray-300'
                      }`}
                    />
                  ))}
                </div>
              </div>
            </DialogTitle>
          </DialogHeader>

          <div className="space-y-6">
            {/* Informations sur l'hébergement */}
            <div className="bg-gray-50 rounded-lg p-4">
              <div className="flex items-start space-x-4">
                <img
                  src={accommodation.image}
                  alt={accommodation.name}
                  className="w-20 h-20 rounded-lg object-cover"
                />
                <div className="flex-1">
                  <h3 className="font-semibold text-lg">{accommodation.name}</h3>
                  <div className="flex items-center space-x-4 text-sm text-gray-600 mt-2">
                    <div className="flex items-center space-x-1">
                      <MapPin className="h-4 w-4" />
                      <span>{accommodation.location}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Star className="h-4 w-4 text-yellow-500 fill-current" />
                      <span>{accommodation.rating} ({accommodation.reviews} avis)</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between mt-3">
                    <Badge variant="outline" className="text-blue-600 border-blue-600">
                      {accommodation.price} {accommodation.type === 'Restaurant' ? 'par personne' : 'par nuit'}
                    </Badge>
                    <Badge variant="outline" className="text-green-600 border-green-600">
                      {accommodation.availability}
                    </Badge>
                  </div>
                </div>
              </div>
            </div>

            {step === 1 && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold mb-4">Informations personnelles</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="name" className="text-sm font-medium">
                        Nom complet <span className="text-red-500">*</span>
                      </Label>
                      <Input
                        id="name"
                        value={formData.contactInfo.name}
                        onChange={(e) => handleInputChange('contactInfo.name', e.target.value)}
                        placeholder="Votre nom complet"
                        required
                        className={!formData.contactInfo.name ? 'border-red-300' : ''}
                      />
                    </div>
                    <div>
                      <Label htmlFor="email" className="text-sm font-medium">
                        Email <span className="text-red-500">*</span>
                      </Label>
                      <Input
                        id="email"
                        type="email"
                        value={formData.contactInfo.email}
                        onChange={(e) => handleInputChange('contactInfo.email', e.target.value)}
                        placeholder="votre@email.com"
                        required
                        className={!formData.contactInfo.email ? 'border-red-300' : ''}
                      />
                    </div>
                    <div>
                      <Label htmlFor="phone" className="text-sm font-medium">
                        Téléphone <span className="text-red-500">*</span>
                      </Label>
                      <Input
                        id="phone"
                        type="tel"
                        value={formData.contactInfo.phone}
                        onChange={(e) => handleInputChange('contactInfo.phone', e.target.value)}
                        placeholder="+221 XX XXX XX XX"
                        required
                        className={!formData.contactInfo.phone ? 'border-red-300' : ''}
                      />
                    </div>
                    <div>
                      <Label htmlFor="nationality">Nationalité</Label>
                      <Input
                        id="nationality"
                        value={formData.contactInfo.nationality}
                        onChange={(e) => handleInputChange('contactInfo.nationality', e.target.value)}
                        placeholder="Votre nationalité"
                      />
                    </div>
                  </div>
                </div>

                <div className="flex justify-between">
                  <Button variant="outline" onClick={handleClose} className="text-red-600 border-red-600 hover:bg-red-50">
                    Annuler la réservation
                  </Button>
                  <Button 
                    onClick={() => setStep(2)}
                    disabled={!formData.contactInfo.name || !formData.contactInfo.email || !formData.contactInfo.phone}
                    className="bg-blue-600 hover:bg-blue-700"
                  >
                    Suivant
                  </Button>
                </div>
              </div>
            )}

            {step === 2 && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold mb-4">Détails de la réservation</h3>
                  
                  {/* Information importante */}
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-4">
                    <div className="flex items-start space-x-3">
                      <div className="flex-shrink-0">
                        <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center">
                          <Info className="text-blue-600 text-sm font-bold">!</Info>
                        </div>
                      </div>
                      <div>
                        <h4 className="text-sm font-semibold text-blue-800 mb-1">Politique de réservation</h4>
                        <p className="text-sm text-blue-700">
                          Annulation gratuite jusqu'à 24h avant l'arrivée. 
                          <strong> Arrivée : {accommodation.checkIn || '14h00'} - Départ : {accommodation.checkOut || '12h00'}</strong>
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="checkIn">Date d'arrivée *</Label>
                        <Input
                          id="checkIn"
                          type="date"
                          value={formData.bookingDetails.checkIn}
                          onChange={(e) => handleInputChange('bookingDetails.checkIn', e.target.value)}
                          required
                        />
                      </div>
                      <div>
                        <Label htmlFor="checkOut">Date de départ *</Label>
                        <Input
                          id="checkOut"
                          type="date"
                          value={formData.bookingDetails.checkOut}
                          onChange={(e) => handleInputChange('bookingDetails.checkOut', e.target.value)}
                          required
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="guests">Nombre d'invités *</Label>
                        <Select value={formData.bookingDetails.guests} onValueChange={(value) => handleInputChange('bookingDetails.guests', value)}>
                          <SelectTrigger>
                            <SelectValue placeholder="Nombre d'invités" />
                          </SelectTrigger>
                          <SelectContent>
                            {guestOptions.map((option) => (
                              <SelectItem key={option} value={option}>
                                {option}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <Label htmlFor="rooms">Nombre de chambres *</Label>
                        <Select value={formData.bookingDetails.rooms} onValueChange={(value) => handleInputChange('bookingDetails.rooms', value)}>
                          <SelectTrigger>
                            <SelectValue placeholder="Nombre de chambres" />
                          </SelectTrigger>
                          <SelectContent>
                            {roomOptions.map((option) => (
                              <SelectItem key={option} value={option}>
                                {option}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="roomType">Type de chambre</Label>
                      <Select value={formData.bookingDetails.roomType} onValueChange={(value) => handleInputChange('bookingDetails.roomType', value)}>
                        <SelectTrigger>
                          <SelectValue placeholder="Sélectionnez le type de chambre" />
                        </SelectTrigger>
                        <SelectContent>
                          {roomTypes.map((type) => (
                            <SelectItem key={type} value={type}>
                              {type}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <Label htmlFor="specialRequests">Demandes spéciales</Label>
                      <Textarea
                        id="specialRequests"
                        value={formData.bookingDetails.specialRequests}
                        onChange={(e) => handleInputChange('bookingDetails.specialRequests', e.target.value)}
                        placeholder="Préférences alimentaires, besoins d'accessibilité, célébrations spéciales..."
                        rows={3}
                      />
                    </div>
                  </div>
                </div>

                {/* Calcul du prix */}
                {formData.bookingDetails.checkIn && formData.bookingDetails.checkOut && (
                  <Card className="border-green-200 bg-green-50">
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <h4 className="font-semibold text-green-900">Estimation du coût</h4>
                          <p className="text-sm text-green-700">
                            {nights} nuit{nights > 1 ? 's' : ''} × {formData.bookingDetails.rooms || '1'} chambre{(formData.bookingDetails.rooms && parseInt(formData.bookingDetails.rooms) > 1) ? 's' : ''}
                          </p>
                        </div>
                        <div className="text-right">
                          <div className="text-xl font-bold text-green-900">
                            {totalPrice.toLocaleString()} FCFA
                          </div>
                          <p className="text-xs text-green-600">
                            Prix total estimé
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                )}

                <div>
                  <h3 className="text-lg font-semibold mb-4">Informations complémentaires</h3>
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="transportation">Transport</Label>
                        <Select value={formData.additionalInfo.transportation} onValueChange={(value) => handleInputChange('additionalInfo.transportation', value)}>
                          <SelectTrigger>
                            <SelectValue placeholder="Besoin de transport ?" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="none">Pas de transport nécessaire</SelectItem>
                            <SelectItem value="airport">Transfert aéroport</SelectItem>
                            <SelectItem value="city">Transport en ville</SelectItem>
                            <SelectItem value="tour">Transport pour excursions</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <Label htmlFor="celebration">Célébration spéciale</Label>
                        <Input
                          id="celebration"
                          value={formData.additionalInfo.celebration}
                          onChange={(e) => handleInputChange('additionalInfo.celebration', e.target.value)}
                          placeholder="Anniversaire, lune de miel, etc."
                        />
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="dietaryRestrictions">Restrictions alimentaires</Label>
                      <Input
                        id="dietaryRestrictions"
                        value={formData.additionalInfo.dietaryRestrictions}
                        onChange={(e) => handleInputChange('additionalInfo.dietaryRestrictions', e.target.value)}
                        placeholder="Allergies, régime spécial..."
                      />
                    </div>

                    <div>
                      <Label htmlFor="accessibility">Besoins d'accessibilité</Label>
                      <Input
                        id="accessibility"
                        value={formData.additionalInfo.accessibility}
                        onChange={(e) => handleInputChange('additionalInfo.accessibility', e.target.value)}
                        placeholder="Mobilité réduite, assistance..."
                      />
                    </div>

                    <div>
                      <Label htmlFor="additionalServices">Services supplémentaires</Label>
                      <Input
                        id="additionalServices"
                        value={formData.additionalInfo.additionalServices}
                        onChange={(e) => handleInputChange('additionalInfo.additionalServices', e.target.value)}
                        placeholder="Spa, restaurant, excursions..."
                      />
                    </div>
                  </div>
                </div>

                <div className="flex justify-between">
                  <div className="flex space-x-3">
                    <Button variant="outline" onClick={handleClose} className="text-red-600 border-red-600 hover:bg-red-50">
                      Annuler
                    </Button>
                    <Button variant="outline" onClick={() => setStep(1)}>
                      Précédent
                    </Button>
                  </div>
                  <Button 
                    onClick={handleSubmit}
                    disabled={!formData.bookingDetails.checkIn || !formData.bookingDetails.checkOut || !formData.bookingDetails.guests || !formData.bookingDetails.rooms}
                    className="bg-green-600 hover:bg-green-700"
                  >
                    Confirmer la réservation
                  </Button>
                </div>
              </div>
            )}

            {step === 3 && (
              <div className="text-center space-y-6">
                <div className="flex justify-center">
                  <CheckCircle className="h-16 w-16 text-green-500" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-green-600 mb-2">Réservation confirmée !</h3>
                  <p className="text-gray-600 mb-4">
                    Votre réservation à <strong>{accommodation.name}</strong> a été confirmée avec succès.
                  </p>
                  <p className="text-sm text-gray-500">
                    Un email de confirmation a été envoyé à {formData.contactInfo.email}
                  </p>
                </div>

                <div className="flex justify-center space-x-3">
                  <Button variant="outline" onClick={handleShowTicket}>
                    Voir le ticket
                  </Button>
                  <Button onClick={handleClose}>
                    Fermer
                  </Button>
                </div>
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
