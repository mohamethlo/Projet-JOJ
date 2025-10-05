import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { 
  Download, 
  Share2, 
  Calendar, 
  MapPin, 
  User, 
  Phone, 
  Mail,
  QrCode,
  CheckCircle,
  Clock
} from 'lucide-react';

interface TicketData {
  id: string;
  type: 'guide' | 'event' | 'accommodation';
  title: string;
  description: string;
  date: string;
  time?: string;
  location: string;
  price: string;
  customerName: string;
  customerEmail: string;
  customerPhone?: string;
  status: 'confirmed' | 'pending' | 'cancelled';
  bookingDate: string;
  qrCode: string;
  additionalInfo?: {
    duration?: string;
    participants?: number;
    checkIn?: string;
    checkOut?: string;
    roomType?: string;
    specialRequests?: string;
  };
}

interface TicketModalProps {
  isOpen: boolean;
  onClose: () => void;
  ticketData: TicketData;
}

const TicketModal: React.FC<TicketModalProps> = ({ isOpen, onClose, ticketData }) => {
  const [qrCodeData, setQrCodeData] = useState<string>('');

  // Générer le QR code (simulation avec une URL)
  useEffect(() => {
    console.log('TicketModal - isOpen:', isOpen);
    console.log('TicketModal - ticketData:', ticketData);
    
    if (ticketData) {
      // En réalité, on utiliserait une librairie comme qrcode.js
      // Pour la démo, on génère une URL avec les données du ticket
      const qrData = {
        id: ticketData.id,
        type: ticketData.type,
        date: ticketData.date,
        customer: ticketData.customerName
      };
      setQrCodeData(JSON.stringify(qrData));
    }
  }, [ticketData, isOpen]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'confirmed': return 'bg-green-100 text-green-800 border-green-200';
      case 'pending': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'cancelled': return 'bg-red-100 text-red-800 border-red-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'confirmed': return 'Confirmé';
      case 'pending': return 'En attente';
      case 'cancelled': return 'Annulé';
      default: return 'Inconnu';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'guide': return '👨‍🏫';
      case 'event': return '🎫';
      case 'accommodation': return '🏨';
      default: return '📋';
    }
  };

  const handlePrint = () => {
    window.print();
  };

  const handleDownload = () => {
    // Simulation de téléchargement
    alert('Ticket téléchargé avec succès !');
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: `Ticket - ${ticketData.title}`,
        text: `Votre ticket pour ${ticketData.title}`,
        url: window.location.href
      });
    } else {
      // Fallback : copier le lien
      navigator.clipboard.writeText(window.location.href);
      alert('Lien copié dans le presse-papiers !');
    }
  };

  console.log('TicketModal - Rendu du composant, isOpen:', isOpen);
  
  if (!ticketData) {
    console.log('TicketModal - Pas de ticketData, fermeture du modal');
    return null;
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto z-[10000]">
        <DialogHeader>
          <DialogTitle className="flex items-center space-x-2">
            <CheckCircle className="h-5 w-5 text-green-500" />
            <span>Ticket de Réservation</span>
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          {/* Tickets en bandes horizontales */}
          <div className="space-y-3">
            {/* Ticket Principal - Bande horizontale */}
            <div className="bg-white border-2 border-dashed border-gray-300 rounded-lg overflow-hidden shadow-sm">
              <div className="flex items-center h-24">
                {/* QR Code - Côté gauche */}
                <div className="flex-shrink-0 w-20 h-20 bg-white border-r border-gray-200 flex items-center justify-center">
                  <div className="text-center">
                    <QrCode className="h-8 w-8 text-gray-600 mx-auto mb-1" />
                    <p className="text-xs text-gray-500 font-mono">{ticketData.id.slice(-6)}</p>
                  </div>
                </div>
                
                {/* Informations principales - Centre */}
                <div className="flex-1 px-4 py-2">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-bold text-lg text-gray-900">{ticketData.title}</h3>
                      <div className="flex items-center space-x-4 text-sm text-gray-600">
                        <div className="flex items-center space-x-1">
                          <Calendar className="h-3 w-3" />
                          <span>{ticketData.date}</span>
                        </div>
                        {ticketData.time && (
                          <div className="flex items-center space-x-1">
                            <Clock className="h-3 w-3" />
                            <span>{ticketData.time}</span>
                          </div>
                        )}
                        <div className="flex items-center space-x-1">
                          <MapPin className="h-3 w-3" />
                          <span>{ticketData.location}</span>
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-lg font-bold text-green-600">{ticketData.price}</p>
                      <Badge className={`${getStatusColor(ticketData.status)} border text-xs`}>
                        {getStatusText(ticketData.status)}
                      </Badge>
                    </div>
                  </div>
                </div>
                
                {/* Type et icône - Côté droit */}
                <div className="flex-shrink-0 w-16 h-20 bg-gray-50 border-l border-gray-200 flex flex-col items-center justify-center">
                  <div className="text-2xl mb-1">{getTypeIcon(ticketData.type)}</div>
                  <p className="text-xs text-gray-500 font-medium capitalize">{ticketData.type}</p>
                </div>
              </div>
            </div>

            {/* Ticket Client - Bande horizontale */}
            <div className="bg-white border-2 border-dashed border-blue-300 rounded-lg overflow-hidden shadow-sm">
              <div className="flex items-center h-20">
                {/* QR Code - Côté gauche */}
                <div className="flex-shrink-0 w-20 h-20 bg-white border-r border-gray-200 flex items-center justify-center">
                  <div className="text-center">
                    <QrCode className="h-8 w-8 text-blue-600 mx-auto mb-1" />
                    <p className="text-xs text-gray-500 font-mono">{ticketData.id.slice(-6)}</p>
                  </div>
                </div>
                
                {/* Informations client - Centre */}
                <div className="flex-1 px-4 py-2">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-bold text-lg text-gray-900">{ticketData.customerName}</h3>
                      <div className="flex items-center space-x-4 text-sm text-gray-600">
                        <div className="flex items-center space-x-1">
                          <Mail className="h-3 w-3" />
                          <span>{ticketData.customerEmail}</span>
                        </div>
                        {ticketData.customerPhone && (
                          <div className="flex items-center space-x-1">
                            <Phone className="h-3 w-3" />
                            <span>{ticketData.customerPhone}</span>
                          </div>
                        )}
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-gray-600">Réservé le</p>
                      <p className="text-sm font-medium">{ticketData.bookingDate}</p>
                    </div>
                  </div>
                </div>
                
                {/* Type et icône - Côté droit */}
                <div className="flex-shrink-0 w-16 h-20 bg-blue-50 border-l border-gray-200 flex flex-col items-center justify-center">
                  <User className="h-6 w-6 text-blue-600 mb-1" />
                  <p className="text-xs text-blue-600 font-medium">CLIENT</p>
                </div>
              </div>
            </div>

            {/* Informations supplémentaires si disponibles */}
            {ticketData.additionalInfo && (
              <div className="bg-white border-2 border-dashed border-gray-300 rounded-lg overflow-hidden shadow-sm">
                <div className="flex items-center h-16">
                  <div className="flex-shrink-0 w-20 h-16 bg-gray-50 border-r border-gray-200 flex items-center justify-center">
                    <div className="text-center">
                      <span className="text-lg">ℹ️</span>
                    </div>
                  </div>
                  
                  <div className="flex-1 px-4 py-2">
                    <div className="flex items-center space-x-6 text-sm">
                      {ticketData.additionalInfo.duration && (
                        <div>
                          <span className="font-medium">Durée:</span> {ticketData.additionalInfo.duration}
                        </div>
                      )}
                      {ticketData.additionalInfo.participants && (
                        <div>
                          <span className="font-medium">Participants:</span> {ticketData.additionalInfo.participants}
                        </div>
                      )}
                      {ticketData.additionalInfo.checkIn && (
                        <div>
                          <span className="font-medium">Check-in:</span> {ticketData.additionalInfo.checkIn}
                        </div>
                      )}
                      {ticketData.additionalInfo.checkOut && (
                        <div>
                          <span className="font-medium">Check-out:</span> {ticketData.additionalInfo.checkOut}
                        </div>
                      )}
                      {ticketData.additionalInfo.roomType && (
                        <div>
                          <span className="font-medium">Chambre:</span> {ticketData.additionalInfo.roomType}
                        </div>
                      )}
                    </div>
                  </div>
                  
                  <div className="flex-shrink-0 w-16 h-16 bg-gray-50 border-l border-gray-200 flex items-center justify-center">
                    <span className="text-lg">📋</span>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Actions */}
          <div className="flex justify-center space-x-4">
            <Button
              variant="outline"
              onClick={handlePrint}
              className="flex items-center space-x-2"
            >
              <span>🖨️</span>
              <span>Imprimer</span>
            </Button>
            
            <Button
              variant="outline"
              onClick={handleDownload}
              className="flex items-center space-x-2"
            >
              <Download className="h-4 w-4" />
              <span>Télécharger</span>
            </Button>
            
            <Button
              variant="outline"
              onClick={handleShare}
              className="flex items-center space-x-2"
            >
              <Share2 className="h-4 w-4" />
              <span>Partager</span>
            </Button>
          </div>

          {/* Instructions */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <h4 className="font-medium text-blue-900 mb-2">Instructions importantes</h4>
            <ul className="text-sm text-blue-800 space-y-1">
              <li>• Présentez ce ticket à l'arrivée</li>
              <li>• Gardez une copie sur votre téléphone</li>
              <li>• Contactez-nous en cas de problème</li>
              <li>• Le QR code permet la vérification rapide</li>
            </ul>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default TicketModal;
