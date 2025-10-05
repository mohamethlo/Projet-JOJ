import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Calendar, Clock, MapPin, Users, CheckCircle, UserPlus } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import TicketModal from '@/components/tickets/TicketModal';

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

interface EventRegistrationModalProps {
  isOpen: boolean;
  onClose: () => void;
  event: EventProps;
}

const EventRegistrationModal: React.FC<EventRegistrationModalProps> = ({ isOpen, onClose, event }) => {
  const [step, setStep] = useState(1);
  const [isTicketModalOpen, setIsTicketModalOpen] = useState(false);
  const [ticketData, setTicketData] = useState<any>(null);
  const [formData, setFormData] = useState({
    contactInfo: {
      name: '',
      email: '',
      phone: '',
      age: ''
    },
    additionalInfo: {
      experience: '',
      motivation: '',
      dietaryRestrictions: '',
      accessibility: ''
    },
    emergencyContact: {
      name: '',
      phone: '',
      relationship: ''
    }
  });

  const experienceLevels = [
    'Débutant',
    'Intermédiaire', 
    'Avancé',
    'Expert',
    'Pas d\'expérience requise'
  ];

  const relationships = [
    'Parent',
    'Conjoint(e)',
    'Frère/Sœur',
    'Ami(e)',
    'Autre'
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
      id: `EVENT-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      type: 'event' as const,
      title: event.title,
      description: event.description,
      date: event.date,
      time: event.time,
      location: event.location,
      price: event.price,
      customerName: formData.contactInfo.name,
      customerEmail: formData.contactInfo.email,
      customerPhone: formData.contactInfo.phone,
      status: 'confirmed' as const,
      bookingDate: new Date().toLocaleDateString('fr-FR'),
      qrCode: `QR-${Date.now()}`,
      additionalInfo: {
        participants: 1,
        specialRequests: formData.additionalInfo.dietaryRestrictions || formData.additionalInfo.accessibility
      }
    };

    setTicketData(ticket);
    setStep(3);
  };

  const handleClose = () => {
    setStep(1);
    setFormData({
      contactInfo: { name: '', email: '', phone: '', age: '' },
      additionalInfo: { experience: '', motivation: '', dietaryRestrictions: '', accessibility: '' },
      emergencyContact: { name: '', phone: '', relationship: '' }
    });
    setTicketData(null);
    setIsTicketModalOpen(false);
    onClose();
  };

  const handleShowTicket = () => {
    setIsTicketModalOpen(true);
  };

  const availableSpots = event.capacity - event.registered;

  return (
    <>
      <Dialog open={isOpen} onOpenChange={handleClose}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center space-x-2">
              <UserPlus className="h-5 w-5 text-blue-500" />
              <span>Inscription - {event.title}</span>
            </DialogTitle>
          </DialogHeader>

          <div className="space-y-6">
            {/* Informations sur l'événement */}
            <div className="bg-gray-50 rounded-lg p-4">
              <div className="flex items-start space-x-4">
                <img
                  src={event.image}
                  alt={event.title}
                  className="w-20 h-20 rounded-lg object-cover"
                />
                <div className="flex-1">
                  <h3 className="font-semibold text-lg">{event.title}</h3>
                  <div className="flex items-center space-x-4 text-sm text-gray-600 mt-2">
                    <div className="flex items-center space-x-1">
                      <Calendar className="h-4 w-4" />
                      <span>{event.date}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Clock className="h-4 w-4" />
                      <span>{event.time}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <MapPin className="h-4 w-4" />
                      <span>{event.location}</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between mt-3">
                    <Badge variant="outline" className="text-green-600 border-green-600">
                      {event.price}
                    </Badge>
                    <div className="flex items-center space-x-1 text-sm text-gray-600">
                      <Users className="h-4 w-4" />
                      <span>{availableSpots} places restantes</span>
                    </div>
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
                      <Label htmlFor="age">Âge</Label>
                      <Input
                        id="age"
                        type="number"
                        value={formData.contactInfo.age}
                        onChange={(e) => handleInputChange('contactInfo.age', e.target.value)}
                        placeholder="Votre âge"
                        min="1"
                        max="120"
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
                  <h3 className="text-lg font-semibold mb-4">Informations complémentaires</h3>
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="experience">Niveau d'expérience</Label>
                      <Select value={formData.additionalInfo.experience} onValueChange={(value) => handleInputChange('additionalInfo.experience', value)}>
                        <SelectTrigger>
                          <SelectValue placeholder="Sélectionnez votre niveau" />
                        </SelectTrigger>
                        <SelectContent>
                          {experienceLevels.map((level) => (
                            <SelectItem key={level} value={level}>
                              {level}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <Label htmlFor="motivation">Motivation (optionnel)</Label>
                      <Textarea
                        id="motivation"
                        value={formData.additionalInfo.motivation}
                        onChange={(e) => handleInputChange('additionalInfo.motivation', e.target.value)}
                        placeholder="Pourquoi souhaitez-vous participer à cet événement ?"
                        rows={3}
                      />
                    </div>

                    <div>
                      <Label htmlFor="dietary">Restrictions alimentaires (optionnel)</Label>
                      <Input
                        id="dietary"
                        value={formData.additionalInfo.dietaryRestrictions}
                        onChange={(e) => handleInputChange('additionalInfo.dietaryRestrictions', e.target.value)}
                        placeholder="Allergies, régime spécial..."
                      />
                    </div>

                    <div>
                      <Label htmlFor="accessibility">Besoins d'accessibilité (optionnel)</Label>
                      <Input
                        id="accessibility"
                        value={formData.additionalInfo.accessibility}
                        onChange={(e) => handleInputChange('additionalInfo.accessibility', e.target.value)}
                        placeholder="Mobilité réduite, assistance..."
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold mb-4">Contact d'urgence</h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <Label htmlFor="emergency-name">Nom</Label>
                      <Input
                        id="emergency-name"
                        value={formData.emergencyContact.name}
                        onChange={(e) => handleInputChange('emergencyContact.name', e.target.value)}
                        placeholder="Nom du contact"
                      />
                    </div>
                    <div>
                      <Label htmlFor="emergency-phone">Téléphone</Label>
                      <Input
                        id="emergency-phone"
                        type="tel"
                        value={formData.emergencyContact.phone}
                        onChange={(e) => handleInputChange('emergencyContact.phone', e.target.value)}
                        placeholder="+221 XX XXX XX XX"
                      />
                    </div>
                    <div>
                      <Label htmlFor="relationship">Relation</Label>
                      <Select value={formData.emergencyContact.relationship} onValueChange={(value) => handleInputChange('emergencyContact.relationship', value)}>
                        <SelectTrigger>
                          <SelectValue placeholder="Relation" />
                        </SelectTrigger>
                        <SelectContent>
                          {relationships.map((rel) => (
                            <SelectItem key={rel} value={rel}>
                              {rel}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>

                <div className="flex justify-end space-x-3">
                  <Button variant="outline" onClick={() => setStep(1)}>
                    Précédent
                  </Button>
                  <Button onClick={handleSubmit}>
                    Confirmer l'inscription
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
                  <h3 className="text-2xl font-bold text-green-600 mb-2">Inscription confirmée !</h3>
                  <p className="text-gray-600 mb-4">
                    Votre inscription à <strong>{event.title}</strong> a été confirmée avec succès.
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

export default EventRegistrationModal;
