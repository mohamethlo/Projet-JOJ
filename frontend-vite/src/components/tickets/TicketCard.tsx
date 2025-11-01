import { useState, useEffect } from 'react';
import { Ticket } from '@/types/ticket';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Download, Share2, Trash2, ExternalLink, Calendar, Clock, User, QrCode } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { QRCode } from 'react-qr-code';

interface TicketCardProps {
  ticket: Ticket;
  onCancel?: (ticketId: string) => void;
}

export const TicketCard = ({ ticket, onCancel }: TicketCardProps) => {
  const navigate = useNavigate();
  const [qrCodeClient, setQrCodeClient] = useState<string>('');
  const [qrCodeGuide, setQrCodeGuide] = useState<string>('');

  // Générer les données du QR code Client (pour vérification de la commande)
  useEffect(() => {
    const clientQrData = {
      type: 'client_verification',
      ticketId: ticket.id,
      customerEmail: ticket.customerEmail,
      customerName: ticket.customerName,
      date: ticket.date,
      location: ticket.location,
      status: ticket.status
    };
    setQrCodeClient(JSON.stringify(clientQrData));

    // Générer les données du QR code Guide (pour suivi de la visite)
    const guideQrData = {
      type: 'guide_tracking',
      ticketId: ticket.id,
      bookingDate: ticket.bookingDate,
      eventDate: ticket.date,
      eventTime: ticket.time,
      location: ticket.location,
      ticketType: ticket.type,
      customerName: ticket.customerName,
      participants: ticket.additionalInfo?.participants || 1,
      duration: ticket.additionalInfo?.duration
    };
    setQrCodeGuide(JSON.stringify(guideQrData));
  }, [ticket]);
  
  const getStatusBadgeVariant = () => {
    switch (ticket.status) {
      case 'confirmed':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'cancelled':
        return 'bg-red-100 text-red-800 border-red-200';
      case 'completed':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getTypeIcon = () => {
    switch (ticket.type) {
      case 'guide':
        return '👨‍🏫';
      case 'event':
        return '🎫';
      case 'accommodation':
        return '🏨';
      default:
        return '📋';
    }
  };

  const handleViewDetails = () => {
    navigate(`/mes-tickets/${ticket.id}`);
  };

  const handleCancel = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (onCancel) {
      onCancel(ticket.id);
    }
  };

  return (
    <div 
      className="border rounded-lg overflow-hidden hover:shadow-md transition-shadow cursor-pointer"
      onClick={handleViewDetails}
    >
      <div className="bg-white p-4">
        <div className="flex justify-between items-start">
          <div>
            <div className="flex items-center space-x-2">
              <span className="text-2xl">{getTypeIcon()}</span>
              <h3 className="text-lg font-semibold">{ticket.title}</h3>
            </div>
            <div className="mt-1 flex items-center text-sm text-gray-500">
              <Calendar className="h-4 w-4 mr-1" />
              {format(new Date(ticket.date), 'PPP', { locale: fr })}
              {ticket.time && ` • ${ticket.time}`}
            </div>
          </div>
          <Badge className={getStatusBadgeVariant()}>
            {getStatusText(ticket.status)}
          </Badge>
        </div>

        <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="space-y-1">
            <p className="text-sm text-gray-500">Lieu</p>
            <p className="font-medium">{ticket.location}</p>
          </div>
          <div className="space-y-1">
            <p className="text-sm text-gray-500">Prix</p>
            <p className="font-medium">{ticket.price} {ticket.currency}</p>
          </div>
          <div className="space-y-1">
            <p className="text-sm text-gray-500">Réservé le</p>
            <p className="font-medium">
              {format(new Date(ticket.bookingDate), 'PPP', { locale: fr })}
            </p>
          </div>
        </div>

        {ticket.additionalInfo && (
          <div className="mt-4 pt-4 border-t">
            <h4 className="text-sm font-medium mb-2">Détails supplémentaires</h4>
            <div className="grid grid-cols-2 gap-2 text-sm">
              {ticket.additionalInfo.duration && (
                <div className="flex items-center">
                  <Clock className="h-4 w-4 mr-1 text-gray-400" />
                  <span>{ticket.additionalInfo.duration}</span>
                </div>
              )}
              {ticket.additionalInfo.participants && (
                <div className="flex items-center">
                  <User className="h-4 w-4 mr-1 text-gray-400" />
                  <span>{ticket.additionalInfo.participants} personne(s)</span>
                </div>
              )}
              {ticket.additionalInfo.roomType && (
                <div className="col-span-2 flex items-center">
                  <span className="mr-1">🏠</span>
                  <span>{ticket.additionalInfo.roomType}</span>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Codes QR - Version compacte */}
        {qrCodeClient && qrCodeGuide && (
          <div className="mt-4 pt-4 border-t">
            <h4 className="text-sm font-medium mb-3 flex items-center gap-2">
              <QrCode className="h-4 w-4" />
              Codes QR du ticket
            </h4>
            <div className="grid grid-cols-2 gap-4">
              {/* QR Code Client - Pour vérifier la commande */}
              <div className="flex flex-col items-center p-3 bg-white border border-gray-200 rounded-lg">
                <p className="text-xs font-medium text-gray-600 mb-2">Code Client</p>
                <p className="text-[10px] text-gray-500 mb-1 text-center">Pour vérifier votre réservation</p>
                <div className="bg-white p-2 rounded border-2 border-gray-200">
                  <QRCode
                    value={qrCodeClient}
                    size={80}
                    style={{ height: "auto", maxWidth: "100%", width: "100%" }}
                  />
                </div>
                <p className="text-[10px] text-gray-500 font-mono mt-1">{ticket.id.slice(-6)}</p>
              </div>
              
              {/* QR Code Guide - Pour le suivi de visite */}
              <div className="flex flex-col items-center p-3 bg-gradient-to-br from-blue-50 to-white border-2 border-blue-200 rounded-lg">
                <p className="text-xs font-medium text-blue-800 mb-2">Code Guide</p>
                <p className="text-[10px] text-blue-600 mb-1 text-center">Pour le guide - Suivi visite</p>
                <div className="bg-white p-2 rounded border-2 border-blue-300 shadow-sm">
                  <QRCode
                    value={qrCodeGuide}
                    size={80}
                    style={{ height: "auto", maxWidth: "100%", width: "100%" }}
                  />
                </div>
                <p className="text-[10px] text-gray-500 font-mono mt-1">Guide</p>
              </div>
            </div>
            <p className="text-xs text-gray-500 text-center mt-2">
              <span className="font-medium">Code Client:</span> Scannez pour vérifier votre commande • 
              <span className="font-medium"> Code Guide:</span> Pour le suivi de la visite guidée
            </p>
          </div>
        )}
      </div>

      <div className="bg-gray-50 px-4 py-3 flex justify-end space-x-2">
        <Button 
          variant="outline" 
          size="sm" 
          onClick={(e) => {
            e.stopPropagation();
            // TODO: Implémenter le téléchargement du ticket
          }}
        >
          <Download className="h-4 w-4 mr-2" />
          Télécharger
        </Button>
        <Button 
          variant="outline" 
          size="sm" 
          onClick={(e) => {
            e.stopPropagation();
            // TODO: Implémenter le partage
          }}
        >
          <Share2 className="h-4 w-4 mr-2" />
          Partager
        </Button>
        {ticket.status === 'pending' && (
          <Button 
            variant="outline" 
            size="sm" 
            className="text-red-600 border-red-200 hover:bg-red-50"
            onClick={handleCancel}
          >
            <Trash2 className="h-4 w-4 mr-2" />
            Annuler
          </Button>
        )}
      </div>
    </div>
  );
};

const getStatusText = (status: string) => {
  switch (status) {
    case 'confirmed':
      return 'Confirmé';
    case 'pending':
      return 'En attente';
    case 'cancelled':
      return 'Annulé';
    case 'completed':
      return 'Terminé';
    default:
      return status;
  }
};

export default TicketCard;