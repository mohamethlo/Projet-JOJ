import { Ticket, TicketFilters } from '@/types/ticket';

// URL de base de l'API - à remplacer par votre URL réelle
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api';

/**
 * Récupère la liste des tickets d'un utilisateur avec filtrage
 */
export const getTickets = async (userId: string, filters: Partial<TicketFilters> = {}): Promise<Ticket[]> => {
  try {
    // Construction des paramètres de requête
    const params = new URLSearchParams();
    
    if (filters.type && filters.type !== 'all') params.append('type', filters.type);
    if (filters.status && filters.status !== 'all') params.append('status', filters.status);
    if (filters.search) params.append('search', filters.search);
    if (filters.dateRange?.from) params.append('dateFrom', filters.dateRange.from.toISOString());
    if (filters.dateRange?.to) params.append('dateTo', filters.dateRange.to.toISOString());

    const response = await fetch(`${API_URL}/users/${userId}/tickets?${params.toString()}`);
    
    if (!response.ok) {
      throw new Error('Erreur lors de la récupération des tickets');
    }

    return await response.json();
  } catch (error) {
    console.error('Erreur dans getTickets:', error);
    // En cas d'erreur, retourner des données de démonstration pour le développement
    return getMockTickets();
  }
};

/**
 * Récupère les détails d'un ticket spécifique
 */
export const getTicketById = async (ticketId: string): Promise<Ticket> => {
  try {
    const response = await fetch(`${API_URL}/tickets/${ticketId}`);
    
    if (!response.ok) {
      throw new Error('Ticket non trouvé');
    }

    return await response.json();
  } catch (error) {
    console.error('Erreur dans getTicketById:', error);
    // En cas d'erreur, chercher dans les tickets mockés
    const mockTickets = getMockTickets();
    const mockTicket = mockTickets.find(t => t.id === ticketId);
    if (mockTicket) {
      return mockTicket;
    }
    throw error;
  }
};

/**
 * Annule un ticket
 */
export const cancelTicket = async (ticketId: string): Promise<{ success: boolean }> => {
  try {
    const response = await fetch(`${API_URL}/tickets/${ticketId}/cancel`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error("Échec de l'annulation du ticket");
    }

    return { success: true };
  } catch (error) {
    console.error('Erreur dans cancelTicket:', error);
    throw error;
  }
};

/**
 * Fonction utilitaire pour générer des données de démonstration
 * À supprimer en production
 */
const getMockTickets = (): Ticket[] => {
  const types: Array<Ticket['type']> = ['guide', 'event', 'accommodation'];
  const statuses: Array<Ticket['status']> = ['confirmed', 'pending', 'cancelled', 'completed'];
  const titles = {
    guide: 'Visite guidée du musée',
    event: 'Concert en plein air',
    accommodation: 'Hôtel de luxe'
  };

  return Array.from({ length: 10 }, (_, i) => {
    const type = types[Math.floor(Math.random() * types.length)];
    const status = statuses[Math.floor(Math.random() * statuses.length)];
    const date = new Date();
    date.setDate(date.getDate() + Math.floor(Math.random() * 30) - 15); // Dates aléatoires dans les 15 prochains jours

    return {
      id: `ticket-${i + 1}`,
      type,
      title: `${titles[type]} #${i + 1}`,
      description: `Description détaillée pour ${titles[type].toLowerCase()}`,
      date: date.toISOString(),
      time: '14:00',
      location: type === 'accommodation' ? 'Paris, France' : 'Lieu de l\'événement',
      price: Math.floor(Math.random() * 200) + 50,
      currency: 'EUR',
      customerName: 'John Doe',
      customerEmail: 'john.doe@example.com',
      status,
      bookingDate: new Date(Date.now() - Math.floor(Math.random() * 30) * 24 * 60 * 60 * 1000).toISOString(),
      additionalInfo: {
        duration: '2h',
        participants: Math.floor(Math.random() * 5) + 1,
        ...(type === 'accommodation' ? {
          checkIn: '14:00',
          checkOut: '12:00',
          roomType: 'Chambre Standard'
        } : {})
      }
    };
  });
};