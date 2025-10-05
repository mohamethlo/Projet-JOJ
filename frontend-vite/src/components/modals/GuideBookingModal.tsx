import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Calendar, Clock, MapPin, Users, CheckCircle, UserPlus, Star, Calculator } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import TicketModal from '@/components/tickets/TicketModal';
import CostEstimationModal from './CostEstimationModal';

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
}

interface GuideBookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  guide: GuideProps;
}

const GuideBookingModal: React.FC<GuideBookingModalProps> = ({ isOpen, onClose, guide }) => {
  const [step, setStep] = useState(1);
  const [isTicketModalOpen, setIsTicketModalOpen] = useState(false);
  const [isCostEstimationModalOpen, setIsCostEstimationModalOpen] = useState(false);
  const [ticketData, setTicketData] = useState<any>(null);
  const [formData, setFormData] = useState({
    contactInfo: {
      name: '',
      email: '',
      phone: '',
      nationality: ''
    },
    bookingDetails: {
      date: '',
      duration: '',
      groupSize: '',
      tourType: '',
      language: '',
      specialRequests: ''
    },
    additionalInfo: {
      accommodation: '',
      transportation: '',
      dietaryRestrictions: '',
      accessibility: '',
      interests: '',
      sitesToVisit: ''
    }
  });

  const durationOptions = [
    '2 heures',
    '4 heures (demi-journée)',
    '8 heures (journée complète)',
    '2 jours',
    '3 jours',
    'Personnalisé'
  ];

  const tourTypes = [
    'Visite culturelle',
    'Visite historique',
    'Visite gastronomique',
    'Visite nature/écologique',
    'Visite artisanale',
    'Visite religieuse',
    'Visite personnalisée'
  ];

  const groupSizes = [
    '1 personne',
    '2 personnes',
    '3-5 personnes',
    '6-10 personnes',
    '11-20 personnes',
    'Plus de 20 personnes'
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

  const handleSubmit = () => {
    // Générer les données du ticket
    const ticket = {
      id: `GUIDE-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      type: 'guide' as const,
      title: `Réservation avec ${guide.name}`,
      description: `Visite guidée avec ${guide.name} - ${formData.bookingDetails.tourType}`,
      date: formData.bookingDetails.date,
      time: 'À définir avec le guide',
      location: guide.location,
      price: guide.price,
      customerName: formData.contactInfo.name,
      customerEmail: formData.contactInfo.email,
      customerPhone: formData.contactInfo.phone,
      status: 'confirmed' as const,
      bookingDate: new Date().toLocaleDateString('fr-FR'),
      qrCode: `QR-${Date.now()}`,
      additionalInfo: {
        guideName: guide.name,
        duration: formData.bookingDetails.duration,
        groupSize: formData.bookingDetails.groupSize,
        tourType: formData.bookingDetails.tourType,
        language: formData.bookingDetails.language,
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
      bookingDetails: { date: '', duration: '', groupSize: '', tourType: '', language: '', specialRequests: '' },
      additionalInfo: { accommodation: '', transportation: '', dietaryRestrictions: '', accessibility: '', interests: '', sitesToVisit: '' }
    });
    setTicketData(null);
    setIsTicketModalOpen(false);
    onClose();
  };

  const handleShowTicket = () => {
    setIsTicketModalOpen(true);
  };

  return (
    <>
      <Dialog open={isOpen} onOpenChange={handleClose}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center space-x-2">
              <UserPlus className="h-5 w-5 text-blue-500" />
              <span>Réservation - {guide.name}</span>
            </DialogTitle>
          </DialogHeader>

          <div className="space-y-6">
            {/* Informations sur le guide */}
            <div className="bg-gray-50 rounded-lg p-4">
              <div className="flex items-start space-x-4">
                <img
                  src={guide.avatar}
                  alt={guide.name}
                  className="w-20 h-20 rounded-lg object-cover"
                />
                <div className="flex-1">
                  <h3 className="font-semibold text-lg">{guide.name}</h3>
                  <div className="flex items-center space-x-4 text-sm text-gray-600 mt-2">
                    <div className="flex items-center space-x-1">
                      <MapPin className="h-4 w-4" />
                      <span>{guide.location}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Star className="h-4 w-4 text-yellow-500 fill-current" />
                      <span>{guide.rating} ({guide.reviews} avis)</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between mt-3">
                    <Badge variant="outline" className="text-green-600 border-green-600">
                      {guide.price} par jour
                    </Badge>
                    <Badge variant="outline" className="text-blue-600 border-blue-600">
                      {guide.availability}
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
                      <Label htmlFor="name">Nom complet *</Label>
                      <Input
                        id="name"
                        value={formData.contactInfo.name}
                        onChange={(e) => handleInputChange('contactInfo.name', e.target.value)}
                        placeholder="Votre nom complet"
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="email">Email *</Label>
                      <Input
                        id="email"
                        type="email"
                        value={formData.contactInfo.email}
                        onChange={(e) => handleInputChange('contactInfo.email', e.target.value)}
                        placeholder="votre@email.com"
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="phone">Téléphone *</Label>
                      <Input
                        id="phone"
                        type="tel"
                        value={formData.contactInfo.phone}
                        onChange={(e) => handleInputChange('contactInfo.phone', e.target.value)}
                        placeholder="+221 XX XXX XX XX"
                        required
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

                <div className="flex justify-end space-x-3">
                  <Button variant="outline" onClick={handleClose}>
                    Annuler
                  </Button>
                  <Button 
                    onClick={() => setStep(2)}
                    disabled={!formData.contactInfo.name || !formData.contactInfo.email || !formData.contactInfo.phone}
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
                  
                  {/* Information importante sur les tickets */}
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-4">
                    <div className="flex items-start space-x-3">
                      <div className="flex-shrink-0">
                        <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center">
                          <span className="text-blue-600 text-sm font-bold">!</span>
                        </div>
                      </div>
                      <div>
                        <h4 className="text-sm font-semibold text-blue-800 mb-1">Information importante</h4>
                        <p className="text-sm text-blue-700">
                          Si vous souhaitez que le guide vous accompagne lors de visites de sites touristiques, 
                          <strong> vous êtes responsable des frais d'entrée du guide</strong> (tickets, billets d'entrée, etc.).
                        </p>
                        <p className="text-xs text-blue-600 mt-1">
                          Le prix affiché ne couvre que les services de guidage, pas les frais d'entrée aux sites.
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="date">Date souhaitée *</Label>
                        <Input
                          id="date"
                          type="date"
                          value={formData.bookingDetails.date}
                          onChange={(e) => handleInputChange('bookingDetails.date', e.target.value)}
                          required
                        />
                      </div>
                      <div>
                        <Label htmlFor="duration">Durée *</Label>
                        <Select value={formData.bookingDetails.duration} onValueChange={(value) => handleInputChange('bookingDetails.duration', value)}>
                          <SelectTrigger>
                            <SelectValue placeholder="Sélectionnez la durée" />
                          </SelectTrigger>
                          <SelectContent>
                            {durationOptions.map((duration) => (
                              <SelectItem key={duration} value={duration}>
                                {duration}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="groupSize">Taille du groupe *</Label>
                        <Select value={formData.bookingDetails.groupSize} onValueChange={(value) => handleInputChange('bookingDetails.groupSize', value)}>
                          <SelectTrigger>
                            <SelectValue placeholder="Nombre de personnes" />
                          </SelectTrigger>
                          <SelectContent>
                            {groupSizes.map((size) => (
                              <SelectItem key={size} value={size}>
                                {size}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <Label htmlFor="tourType">Type de visite *</Label>
                        <Select value={formData.bookingDetails.tourType} onValueChange={(value) => handleInputChange('bookingDetails.tourType', value)}>
                          <SelectTrigger>
                            <SelectValue placeholder="Type de visite" />
                          </SelectTrigger>
                          <SelectContent>
                            {tourTypes.map((type) => (
                              <SelectItem key={type} value={type}>
                                {type}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="language">Langue préférée</Label>
                      <Select value={formData.bookingDetails.language} onValueChange={(value) => handleInputChange('bookingDetails.language', value)}>
                        <SelectTrigger>
                          <SelectValue placeholder="Sélectionnez la langue" />
                        </SelectTrigger>
                        <SelectContent>
                          {guide.languages.map((language) => (
                            <SelectItem key={language} value={language}>
                              {language}
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
                        placeholder="Décrivez vos besoins spécifiques, lieux à visiter, etc."
                        rows={3}
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold mb-4">Informations complémentaires</h3>
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="accommodation">Hébergement</Label>
                        <Input
                          id="accommodation"
                          value={formData.additionalInfo.accommodation}
                          onChange={(e) => handleInputChange('additionalInfo.accommodation', e.target.value)}
                          placeholder="Nom de votre hôtel/auberge"
                        />
                      </div>
                      <div>
                        <Label htmlFor="transportation">Transport</Label>
                        <Select value={formData.additionalInfo.transportation} onValueChange={(value) => handleInputChange('additionalInfo.transportation', value)}>
                          <SelectTrigger>
                            <SelectValue placeholder="Besoin de transport ?" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="none">Pas de transport nécessaire</SelectItem>
                            <SelectItem value="car">Voiture privée</SelectItem>
                            <SelectItem value="minibus">Minibus</SelectItem>
                            <SelectItem value="bus">Bus</SelectItem>
                            <SelectItem value="other">Autre</SelectItem>
                          </SelectContent>
                        </Select>
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
                      <Label htmlFor="interests">Centres d'intérêt</Label>
                      <Input
                        id="interests"
                        value={formData.additionalInfo.interests}
                        onChange={(e) => handleInputChange('additionalInfo.interests', e.target.value)}
                        placeholder="Histoire, culture, nature, gastronomie..."
                      />
                    </div>

                    <div>
                      <Label htmlFor="sitesToVisit">Sites à visiter (optionnel)</Label>
                      <Textarea
                        id="sitesToVisit"
                        value={formData.additionalInfo.sitesToVisit || ''}
                        onChange={(e) => handleInputChange('additionalInfo.sitesToVisit', e.target.value)}
                        placeholder="Ex: Île de Gorée, Monument de la Renaissance, Lac Rose, etc."
                        rows={2}
                      />
                      <p className="text-xs text-gray-500 mt-1">
                        Précisez les sites que vous souhaitez visiter pour une meilleure estimation des coûts d'entrée.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="flex justify-between">
                  <Button 
                    variant="outline" 
                    onClick={() => setIsCostEstimationModalOpen(true)}
                    className="flex items-center space-x-2"
                  >
                    <Calculator className="h-4 w-4" />
                    <span>Estimer les coûts</span>
                  </Button>
                  
                  <div className="flex space-x-3">
                    <Button variant="outline" onClick={() => setStep(1)}>
                      Précédent
                    </Button>
                    <Button onClick={handleSubmit}>
                      Confirmer la réservation
                    </Button>
                  </div>
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
                    Votre réservation avec <strong>{guide.name}</strong> a été confirmée avec succès.
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

      {/* Modal d'estimation des coûts */}
      <CostEstimationModal
        isOpen={isCostEstimationModalOpen}
        onClose={() => setIsCostEstimationModalOpen(false)}
        guidePrice={guide.price}
        duration={formData.bookingDetails.duration}
        groupSize={formData.bookingDetails.groupSize}
        sitesToVisit={formData.additionalInfo.sitesToVisit}
      />
    </>
  );
};

export default GuideBookingModal;
