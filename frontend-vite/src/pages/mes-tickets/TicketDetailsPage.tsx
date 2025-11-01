import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { getTicketById } from '@/services/ticketService';
import { Ticket } from '@/types/ticket';
import TicketModal from '@/components/tickets/TicketModal';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Loader2 } from 'lucide-react';
import { toast } from 'sonner';

export default function TicketDetailsPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [ticket, setTicket] = useState<Ticket | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(true);

  useEffect(() => {
    const fetchTicket = async () => {
      if (!id) {
        toast.error('ID du ticket manquant');
        navigate('/mes-tickets');
        return;
      }

      setIsLoading(true);
      try {
        const ticketData = await getTicketById(id);
        // Vérifier que le ticket appartient à l'utilisateur
        if (user?.id && ticketData.customerEmail !== user.email) {
          toast.error('Vous n\'avez pas accès à ce ticket');
          navigate('/mes-tickets');
          return;
        }
        setTicket(ticketData as Ticket);
      } catch (error) {
        console.error('Erreur lors de la récupération du ticket:', error);
        toast.error('Erreur lors de la récupération du ticket');
        navigate('/mes-tickets');
      } finally {
        setIsLoading(false);
      }
    };

    fetchTicket();
  }, [id, user?.email, navigate]);

  const handleCloseModal = () => {
    setIsModalOpen(false);
    navigate('/mes-tickets');
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-center">
          <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4 text-primary" />
          <p className="text-gray-600">Chargement du ticket...</p>
        </div>
      </div>
    );
  }

  if (!ticket) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center py-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Ticket non trouvé</h2>
          <p className="text-gray-600 mb-6">Le ticket demandé n'existe pas ou vous n'y avez pas accès.</p>
          <Button onClick={() => navigate('/mes-tickets')}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Retour aux tickets
          </Button>
        </div>
      </div>
    );
  }

  // Convertir Ticket en TicketData pour le modal
  const ticketData = {
    id: ticket.id,
    type: ticket.type,
    title: ticket.title,
    description: ticket.description || '',
    date: ticket.date,
    time: ticket.time,
    location: ticket.location,
    price: typeof ticket.price === 'number' ? `${ticket.price} ${ticket.currency}` : ticket.price,
    customerName: ticket.customerName,
    customerEmail: ticket.customerEmail,
    customerPhone: undefined,
    status: ticket.status,
    bookingDate: ticket.bookingDate,
    qrCode: ticket.id,
    additionalInfo: ticket.additionalInfo
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <Button
        variant="ghost"
        onClick={() => navigate('/mes-tickets')}
        className="mb-4"
      >
        <ArrowLeft className="h-4 w-4 mr-2" />
        Retour aux tickets
      </Button>
      <TicketModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        ticketData={ticketData}
      />
    </div>
  );
}

