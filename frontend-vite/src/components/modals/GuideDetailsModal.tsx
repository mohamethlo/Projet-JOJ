import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { 
  Star, 
  MapPin, 
  Clock, 
  Award, 
  Users, 
  MessageCircle, 
  Phone, 
  Mail, 
  Globe,
  Calendar,
  CheckCircle,
  Heart,
  Share2,
  Download,
  ExternalLink,
  Languages,
  BookOpen,
  Trophy,
  User
} from 'lucide-react';

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

interface GuideDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  guide: GuideProps;
  availabilityData?: any[];
}

const GuideDetailsModal: React.FC<GuideDetailsModalProps> = ({ isOpen, onClose, guide, availabilityData = [] }) => {
  const [isLiked, setIsLiked] = useState(false);
  const [isShared, setIsShared] = useState(false);
  const [isTimeSlotsModalOpen, setIsTimeSlotsModalOpen] = useState(false);
  const [selectedDayForTimeSlots, setSelectedDayForTimeSlots] = useState<any>(null);

  // Fonction pour ouvrir le modal des créneaux
  const handleViewTimeSlots = (day: any) => {
    setSelectedDayForTimeSlots(day);
    setIsTimeSlotsModalOpen(true);
  };

  // Fonction pour fermer le modal des créneaux
  const handleCloseTimeSlotsModal = () => {
    console.log('Fermeture du modal des créneaux');
    setIsTimeSlotsModalOpen(false);
    setSelectedDayForTimeSlots(null);
  };

  // Gestion de la touche Échap
  useEffect(() => {
    const handleEscapeKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && isTimeSlotsModalOpen) {
        handleCloseTimeSlotsModal();
      }
    };

    if (isTimeSlotsModalOpen) {
      document.addEventListener('keydown', handleEscapeKey);
      return () => document.removeEventListener('keydown', handleEscapeKey);
    }
  }, [isTimeSlotsModalOpen]);

  // Fonctions pour les actions
  const handleLike = () => {
    setIsLiked(!isLiked);
  };

  const handleShare = () => {
    setIsShared(!isShared);
    // Simulation de partage
    if (navigator.share) {
      navigator.share({
        title: `Guide ${guide.name}`,
        text: `Découvrez ${guide.name}, guide certifié à ${guide.location}`,
        url: window.location.href
      });
    } else {
      alert('Fonction de partage activée !');
    }
  };

  const handleDownload = () => {
    // Simulation de téléchargement
    alert('Téléchargement des informations du guide...');
  };


  // Mock data pour les détails supplémentaires
  const guideDetails = {
    fullDescription: `${guide.description} Guide expérimenté et passionné, je vous accompagne dans la découverte des merveilles du Sénégal. Avec mes années d'expérience et ma connaissance approfondie de la culture locale, je vous garantis une expérience authentique et mémorable.`,
    achievements: [
      'Guide certifié par l\'Office National du Tourisme',
      'Plus de 500 visites réussies',
      'Spécialiste reconnu en histoire sénégalaise',
      'Formation en gestion de groupes'
    ],
    services: [
      'Visites guidées personnalisées',
      'Transport inclus (optionnel)',
      'Traduction en temps réel',
      'Conseils pratiques pour votre séjour',
      'Réservation de restaurants locaux',
      'Accompagnement shopping'
    ],
    contact: {
      phone: '+221 77 123 45 67',
      email: 'contact@guide.sn',
      website: 'www.guide-senegal.sn',
      whatsapp: '+221 77 123 45 67'
    },
    gallery: [
      'https://images.pexels.com/photos/1190298/pexels-photo-1190298.jpeg?auto=compress&cs=tinysrgb&w=400',
      'https://images.pexels.com/photos/1190297/pexels-photo-1190297.jpeg?auto=compress&cs=tinysrgb&w=400',
      'https://images.pexels.com/photos/1190296/pexels-photo-1190296.jpeg?auto=compress&cs=tinysrgb&w=400',
      'https://images.pexels.com/photos/1190295/pexels-photo-1190295.jpeg?auto=compress&cs=tinysrgb&w=400'
    ],
    reviews: {
      average: guide.rating,
      total: guide.reviews,
      recent: [
        { author: 'Marie D.', rating: 5, comment: 'Guide exceptionnel, très cultivé et à l\'écoute !' },
        { author: 'Jean M.', rating: 4, comment: 'Belle expérience, guide professionnel.' }
      ]
    },
    availability: {
      today: 'Disponible',
      tomorrow: 'Disponible',
      thisWeek: '3 créneaux libres'
    }
  };

  return (
    <>
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <User className="h-5 w-5 text-blue-500" />
              <span>Détails du guide</span>
            </div>
            <div className="flex items-center space-x-2">
              <Button
                variant="outline"
                size="sm"
                onClick={handleLike}
                className={isLiked ? 'text-red-500 border-red-500' : ''}
              >
                <Heart className={`h-4 w-4 ${isLiked ? 'fill-current' : ''}`} />
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={handleShare}
                className={isShared ? 'text-green-500 border-green-500' : ''}
              >
                <Share2 className="h-4 w-4" />
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={handleDownload}
              >
                <Download className="h-4 w-4" />
              </Button>
            </div>
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Profil principal */}
          <div className="flex items-start space-x-6">
            <Avatar className="h-24 w-24">
              <AvatarImage src={guide.avatar} alt={guide.name} />
              <AvatarFallback>
                {guide.name.split(' ').map(n => n[0]).join('')}
              </AvatarFallback>
            </Avatar>
            
            <div className="flex-1">
              <div className="flex items-center space-x-3 mb-2">
                <h1 className="text-3xl font-bold text-gray-900">{guide.name}</h1>
                {guide.isVerified && (
                  <Badge variant="outline" className="text-green-600 border-green-600">
                    <CheckCircle className="h-3 w-3 mr-1" />
                    Vérifié
                  </Badge>
                )}
                {guide.featured && (
                  <Badge className="bg-yellow-100 text-yellow-700">
                    <Star className="h-3 w-3 mr-1" />
                    Recommandé
                  </Badge>
                )}
              </div>
              
              <div className="flex items-center space-x-6 text-gray-600 mb-4">
                <div className="flex items-center space-x-2">
                  <MapPin className="h-5 w-5" />
                  <span className="font-medium">{guide.location}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Star className="h-5 w-5 text-yellow-500 fill-current" />
                  <span className="font-medium">{guide.rating}</span>
                  <span className="text-sm">({guide.reviews} avis)</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Clock className="h-5 w-5" />
                  <span className="font-medium">{guide.availability}</span>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="text-2xl font-bold text-green-600">{guide.price}</div>
                <div className="text-sm text-gray-500">par jour</div>
              </div>
            </div>
          </div>

          {/* Description complète */}
          <div className="space-y-4">
            <h2 className="text-xl font-semibold">À propos de ce guide</h2>
            <p className="text-gray-700 leading-relaxed">{guideDetails.fullDescription}</p>
          </div>

          {/* Informations détaillées */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Spécialités et langues */}
            <Card>
              <CardContent className="p-4">
                <h3 className="font-semibold mb-3 flex items-center">
                  <BookOpen className="h-5 w-5 text-blue-500 mr-2" />
                  Spécialités
                </h3>
                <div className="flex flex-wrap gap-2 mb-4">
                  {guide.specialties.map((specialty, index) => (
                    <Badge key={index} variant="outline" className="text-blue-600 border-blue-600">
                      {specialty}
                    </Badge>
                  ))}
                </div>
                
                <h3 className="font-semibold mb-3 flex items-center">
                  <Languages className="h-5 w-5 text-green-500 mr-2" />
                  Langues parlées
                </h3>
                <div className="flex flex-wrap gap-2">
                  {guide.languages.map((language, index) => (
                    <Badge key={index} variant="outline" className="text-green-600 border-green-600">
                      {language}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Statistiques */}
            <Card>
              <CardContent className="p-4">
                <h3 className="font-semibold mb-3 flex items-center">
                  <Trophy className="h-5 w-5 text-purple-500 mr-2" />
                  Statistiques
                </h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Expérience</span>
                    <span className="font-medium">{guide.experience || 'Non spécifiée'}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Tours complétés</span>
                    <span className="font-medium">{guide.toursCompleted || 0}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Temps de réponse</span>
                    <span className="font-medium">{guide.responseTime || 'Non spécifié'}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Note moyenne</span>
                    <div className="flex items-center space-x-1">
                      <Star className="h-4 w-4 text-yellow-500 fill-current" />
                      <span className="font-medium">{guide.rating}</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Réalisations et services */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardContent className="p-4">
                <h3 className="font-semibold mb-3 flex items-center">
                  <Award className="h-5 w-5 text-yellow-500 mr-2" />
                  Réalisations
                </h3>
                <ul className="space-y-2">
                  {guideDetails.achievements.map((achievement, index) => (
                    <li key={index} className="flex items-center text-sm text-gray-600">
                      <div className="w-2 h-2 bg-yellow-500 rounded-full mr-3"></div>
                      {achievement}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4">
                <h3 className="font-semibold mb-3 flex items-center">
                  <Users className="h-5 w-5 text-green-500 mr-2" />
                  Services inclus
                </h3>
                <ul className="space-y-2">
                  {guideDetails.services.map((service, index) => (
                    <li key={index} className="flex items-center text-sm text-gray-600">
                      <div className="w-2 h-2 bg-green-500 rounded-full mr-3"></div>
                      {service}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>

          {/* Galerie d'images */}
          <div className="space-y-4">
            <h2 className="text-xl font-semibold">Galerie</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {guideDetails.gallery.map((image, index) => (
                <img
                  key={index}
                  src={image}
                  alt={`${guide.name} - Image ${index + 1}`}
                  className="w-full h-24 object-cover rounded-lg cursor-pointer hover:opacity-80 transition-opacity"
                  onClick={() => window.open(image, '_blank')}
                />
              ))}
            </div>
          </div>

          {/* Contact */}
          <Card>
            <CardContent className="p-4">
              <h3 className="font-semibold mb-4">Contact</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-3">
                  <div className="flex items-center space-x-2 text-sm">
                    <Phone className="h-4 w-4 text-gray-500" />
                    <span>{guideDetails.contact.phone}</span>
                  </div>
                  <div className="flex items-center space-x-2 text-sm">
                    <Mail className="h-4 w-4 text-gray-500" />
                    <span>{guideDetails.contact.email}</span>
                  </div>
                </div>
                <div className="space-y-3">
                  <div className="flex items-center space-x-2 text-sm">
                    <Globe className="h-4 w-4 text-gray-500" />
                    <a 
                      href={`https://${guideDetails.contact.website}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:underline flex items-center space-x-1"
                    >
                      <span>{guideDetails.contact.website}</span>
                      <ExternalLink className="h-3 w-3" />
                    </a>
                  </div>
                  <div className="flex items-center space-x-2 text-sm">
                    <MessageCircle className="h-4 w-4 text-gray-500" />
                    <span>WhatsApp: {guideDetails.contact.whatsapp}</span>
                  </div>
                </div>
              </div>
            </CardContent>
            </Card>

            {/* Tableau de disponibilité */}
            {availabilityData && availabilityData.length > 0 && (
              <Card>
                <CardContent className="p-4">
                  <h3 className="font-semibold mb-3 flex items-center">
                    <Calendar className="h-5 w-5 text-blue-500 mr-2" />
                    Disponibilité (7 prochains jours)
                  </h3>
                  <div className="overflow-x-auto">
                    <table className="w-full border-collapse border border-gray-300">
                      <thead>
                        <tr className="bg-gray-50">
                          <th className="border border-gray-300 px-3 py-2 text-left font-medium text-sm">Jour</th>
                          <th className="border border-gray-300 px-3 py-2 text-left font-medium text-sm">Date</th>
                          <th className="border border-gray-300 px-3 py-2 text-left font-medium text-sm">Statut</th>
                          <th className="border border-gray-300 px-3 py-2 text-left font-medium text-sm">Créneaux disponibles</th>
                        </tr>
                      </thead>
                      <tbody>
                        {availabilityData.map((day, index) => (
                          <tr key={day.date} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                            <td className="border border-gray-300 px-3 py-2 font-medium text-sm">
                              {day.dayName}
                            </td>
                            <td className="border border-gray-300 px-3 py-2 text-sm">
                              {new Date(day.date).toLocaleDateString('fr-FR')}
                            </td>
                            <td className="border border-gray-300 px-3 py-2">
                              {day.isAvailable ? (
                                <Badge variant="default" className="bg-green-100 text-green-800 text-xs">
                                  Disponible
                                </Badge>
                              ) : (
                                <Badge variant="destructive" className="text-xs">
                                  {day.reason || 'Indisponible'}
                                </Badge>
                              )}
                            </td>
                            <td className="border border-gray-300 px-3 py-2">
                              {day.timeSlots ? (
                                <div className="flex flex-wrap gap-1 items-center">
                                  {day.timeSlots
                                    .filter(slot => slot.status === 'available')
                                    .slice(0, 3)
                                    .map(slot => (
                                      <Badge key={slot.time} variant="outline" className="text-xs">
                                        {slot.time}
                                      </Badge>
                                    ))
                                  }
                                  {day.timeSlots.filter(slot => slot.status === 'available').length > 3 && (
                                    <Button
                                      variant="outline"
                                      size="sm"
                                      className="text-xs h-6 px-2"
                                      onClick={() => handleViewTimeSlots(day)}
                                    >
                                      Voir plus ({day.timeSlots.filter(slot => slot.status === 'available').length - 3})
                                    </Button>
                                  )}
                                </div>
                              ) : (
                                <span className="text-gray-500 text-sm">-</span>
                              )}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                  
                  {/* Légende */}
                  <div className="mt-4 p-3 bg-gray-50 rounded-lg">
                    <h4 className="text-sm font-medium mb-2">Légende :</h4>
                    <div className="flex flex-wrap gap-4 text-xs">
                      <div className="flex items-center space-x-2">
                        <div className="w-3 h-3 bg-green-500 rounded"></div>
                        <span>Disponible</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <div className="w-3 h-3 bg-red-500 rounded"></div>
                        <span>Réservé</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <div className="w-3 h-3 bg-yellow-500 rounded"></div>
                        <span>Pause</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <div className="w-3 h-3 bg-gray-500 rounded"></div>
                        <span>Limite atteinte</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

          {/* Avis récents */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold">Avis récents</h2>
              <div className="flex items-center space-x-2">
                <div className="flex items-center space-x-1">
                  <Star className="h-5 w-5 text-yellow-500 fill-current" />
                  <span className="font-medium">{guideDetails.reviews.average}</span>
                </div>
                <span className="text-gray-600">({guideDetails.reviews.total} avis)</span>
              </div>
            </div>
            <div className="space-y-3">
              {guideDetails.reviews.recent.map((review, index) => (
                <div key={index} className="border rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center space-x-2">
                      <User className="h-4 w-4 text-gray-500" />
                      <span className="font-medium">{review.author}</span>
                    </div>
                    <div className="flex items-center">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`h-4 w-4 ${
                            i < review.rating ? 'text-yellow-500 fill-current' : 'text-gray-300'
                          }`}
                        />
                      ))}
                    </div>
                  </div>
                  <p className="text-gray-700 text-sm">{review.comment}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center justify-between pt-4 border-t">
            <div className="flex items-center space-x-4">
              <Button variant="outline" onClick={onClose}>
                Fermer
              </Button>
              <Button variant="outline" onClick={handleDownload}>
                <Download className="h-4 w-4 mr-2" />
                Télécharger les infos
              </Button>
            </div>
            <div className="flex items-center space-x-2">
              <Badge variant="outline" className="text-green-600 border-green-600">
                {guide.price}
              </Badge>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>

    {/* Modal des créneaux de disponibilité - Portail */}
    {isTimeSlotsModalOpen && selectedDayForTimeSlots && (
      <div 
        className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[9999]"
        onClick={(e) => {
          if (e.target === e.currentTarget) {
            handleCloseTimeSlotsModal();
          }
        }}
      >
        <div 
          className="bg-white rounded-lg p-6 max-w-2xl w-full mx-4 max-h-[80vh] overflow-y-auto shadow-2xl"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold">
              Créneaux disponibles - {selectedDayForTimeSlots.dayName} {new Date(selectedDayForTimeSlots.date).toLocaleDateString('fr-FR')}
            </h2>
            <Button 
              variant="outline" 
              size="sm"
              onClick={handleCloseTimeSlotsModal}
              className="hover:bg-red-50 hover:border-red-300"
            >
              ✕
            </Button>
          </div>

          <div className="space-y-4">
            {/* Tous les créneaux du jour */}
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
              {selectedDayForTimeSlots.timeSlots?.map((slot: any) => (
                <div
                  key={slot.time}
                  className={`p-3 rounded-lg border text-center ${
                    slot.status === 'available'
                      ? 'bg-green-50 border-green-200 text-green-800'
                      : slot.status === 'booked'
                      ? 'bg-red-50 border-red-200 text-red-800'
                      : slot.status === 'break'
                      ? 'bg-yellow-50 border-yellow-200 text-yellow-800'
                      : 'bg-gray-50 border-gray-200 text-gray-800'
                  }`}
                >
                  <div className="font-medium text-sm">
                    {slot.time} - {slot.nextTime}
                  </div>
                  <div className="text-xs mt-1">
                    {slot.status === 'available' && 'Disponible'}
                    {slot.status === 'booked' && 'Réservé'}
                    {slot.status === 'break' && 'Pause'}
                    {slot.status === 'unavailable' && slot.reason}
                  </div>
                </div>
              ))}
            </div>

            {/* Légende */}
            <div className="mt-6 p-4 bg-gray-50 rounded-lg">
              <h4 className="text-sm font-medium mb-3">Légende :</h4>
              <div className="grid grid-cols-2 gap-3 text-xs">
                <div className="flex items-center space-x-2">
                  <div className="w-4 h-4 bg-green-500 rounded"></div>
                  <span>Disponible</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-4 h-4 bg-red-500 rounded"></div>
                  <span>Réservé</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-4 h-4 bg-yellow-500 rounded"></div>
                  <span>Pause</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-4 h-4 bg-gray-500 rounded"></div>
                  <span>Indisponible</span>
                </div>
              </div>
            </div>
          </div>

          <div className="flex justify-end mt-6">
            <Button 
              variant="outline" 
              onClick={handleCloseTimeSlotsModal}
              className="hover:bg-gray-50"
            >
              Fermer
            </Button>
          </div>
        </div>
      </div>
    )}
    </>
  );
};

export default GuideDetailsModal;
