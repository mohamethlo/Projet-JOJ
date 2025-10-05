import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { 
  Calendar, 
  Clock, 
  MapPin, 
  Users, 
  Star, 
  Share2, 
  Heart, 
  Download,
  ExternalLink,
  Phone,
  Mail,
  Globe,
  User,
  DollarSign,
  Info,
  CheckCircle,
  AlertCircle
} from 'lucide-react';

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

interface EventDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  event: EventProps;
}

const EventDetailsModal: React.FC<EventDetailsModalProps> = ({ isOpen, onClose, event }) => {
  const [isLiked, setIsLiked] = useState(false);
  const [isShared, setIsShared] = useState(false);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('fr-FR', {
      weekday: 'long',
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });
  };

  const formatTime = (timeString: string) => {
    return timeString;
  };

  const spotsLeft = event.capacity - event.registered;
  const registrationPercentage = Math.round((event.registered / event.capacity) * 100);

  // Mock data pour les détails supplémentaires
  const eventDetails = {
    fullDescription: `${event.description} Cet événement exceptionnel vous permettra de découvrir les richesses culturelles du Sénégal à travers une expérience immersive et authentique. Notre équipe d'organisateurs expérimentés s'assure que chaque participant vive un moment inoubliable.`,
    requirements: [
      'Âge minimum : 16 ans',
      'Certificat médical récent (pour les activités sportives)',
      'Assurance voyage recommandée',
      'Vêtements adaptés à la météo'
    ],
    includes: [
      'Accès à toutes les activités',
      'Repas traditionnels',
      'Transport sur site',
      'Guide professionnel',
      'Souvenirs artisanaux'
    ],
    organizer: {
      name: event.organizer,
      avatar: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=150',
      rating: 4.8,
      totalEvents: 45,
      verified: true,
      contact: {
        phone: '+221 77 123 45 67',
        email: 'contact@organisateur.sn',
        website: 'www.organisateur.sn'
      }
    },
    gallery: [
      'https://images.pexels.com/photos/1190298/pexels-photo-1190298.jpeg?auto=compress&cs=tinysrgb&w=400',
      'https://images.pexels.com/photos/1190297/pexels-photo-1190297.jpeg?auto=compress&cs=tinysrgb&w=400',
      'https://images.pexels.com/photos/1190296/pexels-photo-1190296.jpeg?auto=compress&cs=tinysrgb&w=400',
      'https://images.pexels.com/photos/1190295/pexels-photo-1190295.jpeg?auto=compress&cs=tinysrgb&w=400'
    ],
    reviews: {
      average: 4.3,
      total: 8,
      recent: [
        { author: 'Sophie M.', rating: 5, comment: 'Événement fantastique, très bien organisé !' },
        { author: 'Ahmed K.', rating: 4, comment: 'Belle expérience culturelle.' }
      ]
    }
  };

  const handleLike = () => {
    setIsLiked(!isLiked);
  };

  const handleShare = () => {
    setIsShared(true);
    // Simulation du partage
    if (navigator.share) {
      navigator.share({
        title: event.title,
        text: event.description,
        url: window.location.href
      });
    } else {
      // Fallback pour les navigateurs qui ne supportent pas l'API Share
      navigator.clipboard.writeText(window.location.href);
      alert('Lien copié dans le presse-papiers !');
    }
    setTimeout(() => setIsShared(false), 2000);
  };

  const handleDownload = () => {
    // Simulation du téléchargement d'informations
    const eventInfo = `
${event.title}
${formatDate(event.date)} à ${formatTime(event.time)}
${event.location}

${eventDetails.fullDescription}

Organisé par: ${event.organizer}
Prix: ${event.price}
Places disponibles: ${spotsLeft}/${event.capacity}

Contact: ${eventDetails.organizer.contact.phone}
Email: ${eventDetails.organizer.contact.email}
    `;
    
    const blob = new Blob([eventInfo], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${event.title.replace(/\s+/g, '_')}_details.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Info className="h-5 w-5 text-blue-500" />
              <span>Détails de l'événement</span>
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
          {/* Image principale et informations de base */}
          <div className="relative">
            <img
              src={event.image}
              alt={event.title}
              className="w-full h-64 object-cover rounded-lg"
              onError={(e) => {
                e.currentTarget.src = 'https://images.pexels.com/photos/1190298/pexels-photo-1190298.jpeg?auto=compress&cs=tinysrgb&w=400';
              }}
            />
            <div className="absolute top-4 left-4">
              <Badge className="bg-blue-600 text-white">
                {event.category}
              </Badge>
            </div>
            <div className="absolute top-4 right-4">
              <Badge variant="outline" className="bg-white/90 text-green-600 border-green-600">
                {event.price}
              </Badge>
            </div>
          </div>

          {/* Titre et informations principales */}
          <div className="space-y-4">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">{event.title}</h1>
              <div className="flex items-center space-x-6 text-gray-600">
                <div className="flex items-center space-x-2">
                  <Calendar className="h-5 w-5" />
                  <span className="font-medium">{formatDate(event.date)}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Clock className="h-5 w-5" />
                  <span className="font-medium">{formatTime(event.time)}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <MapPin className="h-5 w-5" />
                  <span className="font-medium">{event.location}</span>
                </div>
              </div>
            </div>

            {/* Barre de progression des inscriptions */}
            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-600">Inscriptions</span>
                <span className="font-medium">{event.registered}/{event.capacity} participants</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${registrationPercentage}%` }}
                ></div>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-500">{registrationPercentage}% complet</span>
                {spotsLeft <= 5 && spotsLeft > 0 && (
                  <Badge variant="destructive" className="text-xs">
                    Plus que {spotsLeft} places !
                  </Badge>
                )}
              </div>
            </div>
          </div>

          {/* Description complète */}
          <div className="space-y-4">
            <h2 className="text-xl font-semibold">À propos de cet événement</h2>
            <p className="text-gray-700 leading-relaxed">{eventDetails.fullDescription}</p>
          </div>

          {/* Galerie d'images */}
          <div className="space-y-4">
            <h2 className="text-xl font-semibold">Galerie</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {eventDetails.gallery.map((image, index) => (
                <img
                  key={index}
                  src={image}
                  alt={`${event.title} - Image ${index + 1}`}
                  className="w-full h-24 object-cover rounded-lg cursor-pointer hover:opacity-80 transition-opacity"
                  onClick={() => window.open(image, '_blank')}
                />
              ))}
            </div>
          </div>

          {/* Informations pratiques */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Ce qui est inclus */}
            <Card>
              <CardContent className="p-4">
                <h3 className="font-semibold mb-3 flex items-center">
                  <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
                  Ce qui est inclus
                </h3>
                <ul className="space-y-2">
                  {eventDetails.includes.map((item, index) => (
                    <li key={index} className="flex items-center text-sm text-gray-600">
                      <div className="w-2 h-2 bg-green-500 rounded-full mr-3"></div>
                      {item}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            {/* Prérequis */}
            <Card>
              <CardContent className="p-4">
                <h3 className="font-semibold mb-3 flex items-center">
                  <AlertCircle className="h-5 w-5 text-orange-500 mr-2" />
                  Prérequis
                </h3>
                <ul className="space-y-2">
                  {eventDetails.requirements.map((requirement, index) => (
                    <li key={index} className="flex items-center text-sm text-gray-600">
                      <div className="w-2 h-2 bg-orange-500 rounded-full mr-3"></div>
                      {requirement}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>

          {/* Organisateur */}
          <Card>
            <CardContent className="p-4">
              <h3 className="font-semibold mb-4">Organisateur</h3>
              <div className="flex items-start space-x-4">
                <Avatar className="h-16 w-16">
                  <AvatarImage src={eventDetails.organizer.avatar} alt={eventDetails.organizer.name} />
                  <AvatarFallback>
                    {eventDetails.organizer.name.split(' ').map(n => n[0]).join('')}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-2">
                    <h4 className="font-semibold text-lg">{eventDetails.organizer.name}</h4>
                    {eventDetails.organizer.verified && (
                      <Badge variant="outline" className="text-green-600 border-green-600">
                        Vérifié
                      </Badge>
                    )}
                  </div>
                  <div className="flex items-center space-x-4 text-sm text-gray-600 mb-3">
                    <div className="flex items-center space-x-1">
                      <Star className="h-4 w-4 text-yellow-500 fill-current" />
                      <span>{eventDetails.organizer.rating}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Calendar className="h-4 w-4" />
                      <span>{eventDetails.organizer.totalEvents} événements</span>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2 text-sm">
                      <Phone className="h-4 w-4 text-gray-500" />
                      <span>{eventDetails.organizer.contact.phone}</span>
                    </div>
                    <div className="flex items-center space-x-2 text-sm">
                      <Mail className="h-4 w-4 text-gray-500" />
                      <span>{eventDetails.organizer.contact.email}</span>
                    </div>
                    <div className="flex items-center space-x-2 text-sm">
                      <Globe className="h-4 w-4 text-gray-500" />
                      <a 
                        href={`https://${eventDetails.organizer.contact.website}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:underline flex items-center space-x-1"
                      >
                        <span>{eventDetails.organizer.contact.website}</span>
                        <ExternalLink className="h-3 w-3" />
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Avis récents */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold">Avis récents</h2>
              <div className="flex items-center space-x-2">
                <div className="flex items-center space-x-1">
                  <Star className="h-5 w-5 text-yellow-500 fill-current" />
                  <span className="font-medium">{eventDetails.reviews.average}</span>
                </div>
                <span className="text-gray-600">({eventDetails.reviews.total} avis)</span>
              </div>
            </div>
            <div className="space-y-3">
              {eventDetails.reviews.recent.map((review, index) => (
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
                <DollarSign className="h-3 w-3 mr-1" />
                {event.price}
              </Badge>
              <Button className="bg-blue-600 hover:bg-blue-700 text-white">
                S'inscrire maintenant
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default EventDetailsModal;
