import { useState, useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';
import { getTickets, cancelTicket } from '@/services/ticketService';
import { Ticket, TicketFilters } from '@/types/ticket';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { TicketCard } from '@/components/tickets/TicketCard';
import { TicketFilters as Filters } from '@/components/tickets/TicketFilters';
import { Plus, Calendar as CalendarIcon, Filter, Search } from 'lucide-react';
import { toast } from 'sonner';

export default function MesTickets() {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('all');
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState<Partial<TicketFilters>>({
    type: 'all',
    status: 'all',
    dateRange: { from: null, to: null },
  });
  const [isMobileFiltersOpen, setIsMobileFiltersOpen] = useState(false);

  // Récupération des tickets avec filtrage
  useEffect(() => {
    const fetchTickets = async () => {
      if (!user?.id) return;
      setIsLoading(true);
      try {
        const data = await getTickets(user.id, filters as TicketFilters);
        setTickets(data);
      } catch (error) {
        console.error('Erreur lors de la récupération des tickets:', error);
        toast.error('Erreur lors de la récupération des tickets');
      } finally {
        setIsLoading(false);
      }
    };
    fetchTickets();
  }, [user?.id, filters]);

  // Filtrer les tickets en fonction de l'onglet actif et de la recherche
  const filteredTickets = tickets.filter(ticket => {
    const now = new Date();
    const ticketDate = new Date(ticket.date);
    
    // Filtre par onglet
    if (activeTab === 'upcoming') {
      if (ticketDate < now) return false;
    } else if (activeTab === 'past') {
      if (ticketDate >= now) return false;
    }
    
    // Filtre par recherche
    if (searchTerm) {
      const searchLower = searchTerm.toLowerCase();
      const matchesSearch = 
        ticket.title.toLowerCase().includes(searchLower) ||
        ticket.location.toLowerCase().includes(searchLower) ||
        ticket.description?.toLowerCase().includes(searchLower);
      if (!matchesSearch) return false;
    }
    
    return true;
  });

  // Gestion de l'annulation d'un ticket
  const handleCancelTicket = async (ticketId: string) => {
    try {
      await cancelTicket(ticketId);
      toast.success('La réservation a été annulée avec succès.');
      // Recharger les tickets
      if (user?.id) {
        const data = await getTickets(user.id, filters as TicketFilters);
        setTickets(data);
      }
    } catch (error) {
      toast.error('Une erreur est survenue lors de l\'annulation de la réservation.');
    }
  };

  // Mise à jour des filtres
  const handleFilterChange = (newFilters: Partial<TicketFilters>) => {
    setFilters(prev => ({
      ...prev,
      ...newFilters,
    }));
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
        <h1 className="text-3xl font-bold mb-4 md:mb-0">Mes Tickets</h1>
        <div className="flex space-x-2 w-full md:w-auto">
          <Button 
            variant="outline" 
            className="md:hidden"
            onClick={() => setIsMobileFiltersOpen(!isMobileFiltersOpen)}
          >
            <Filter className="h-4 w-4 mr-2" />
            Filtres
          </Button>
        </div>
      </div>

      {/* Barre de recherche */}
      <div className="mb-6">
        <div className="relative max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <input
            type="text"
            placeholder="Rechercher un ticket..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Filtres - Version desktop */}
        <div className="hidden lg:block">
          <div className="sticky top-6">
            <h2 className="text-xl font-semibold mb-4">Filtres</h2>
            <Filters 
              filters={filters} 
              onFilterChange={handleFilterChange} 
            />
          </div>
        </div>

        {/* Filtres - Version mobile */}
        {isMobileFiltersOpen && (
          <div className="lg:hidden mb-6 p-4 bg-gray-50 rounded-lg">
            <Filters 
              filters={filters} 
              onFilterChange={(newFilters) => {
                handleFilterChange(newFilters);
                setIsMobileFiltersOpen(false);
              }} 
            />
          </div>
        )}
        
        {/* Liste des tickets */}
        <div className="lg:col-span-3">
          <Tabs 
            defaultValue="all" 
            className="w-full"
            onValueChange={setActiveTab}
          >
            <TabsList className="grid w-full grid-cols-3 mb-6">
              <TabsTrigger value="all">Tous</TabsTrigger>
              <TabsTrigger value="upcoming">À venir</TabsTrigger>
              <TabsTrigger value="past">Passés</TabsTrigger>
            </TabsList>

            <TabsContent value={activeTab} className="space-y-4">
              {filteredTickets.length > 0 ? (
                filteredTickets.map((ticket) => (
                  <TicketCard 
                    key={ticket.id} 
                    ticket={ticket} 
                    onCancel={handleCancelTicket}
                  />
                ))
              ) : (
                <div className="text-center py-12 bg-white rounded-lg border">
                  <CalendarIcon className="mx-auto h-12 w-12 text-gray-400" />
                  <h3 className="mt-4 text-lg font-medium text-gray-900">Aucun ticket trouvé</h3>
                  <p className="mt-1 text-gray-500 mb-4">
                    {activeTab === 'upcoming' 
                      ? 'Vous n\'avez pas de réservations à venir.' 
                      : activeTab === 'past'
                        ? 'Vous n\'avez pas encore d\'historique de réservations.'
                        : 'Aucune réservation ne correspond à vos critères de recherche.'}
                  </p>
                  <Button>
                    <Plus className="h-4 w-4 mr-2" />
                    Nouvelle réservation
                  </Button>
                </div>
              )}
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}