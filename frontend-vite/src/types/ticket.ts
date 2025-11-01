export type TicketType = 'guide' | 'event' | 'accommodation';
export type TicketStatus = 'confirmed' | 'pending' | 'cancelled' | 'completed';

export interface Ticket {
  id: string;
  type: TicketType;
  title: string;
  description?: string;
  date: string;
  time?: string;
  location: string;
  price: number | string;
  currency: string;
  customerName: string;
  customerEmail: string;
  customerPhone?: string;
  status: TicketStatus;
  bookingDate: string;
  qrCode?: string;
  additionalInfo?: {
    duration?: string;
    participants?: number;
    checkIn?: string;
    checkOut?: string;
    roomType?: string;
    specialRequests?: string;
  };
}

export interface TicketFilters {
  type: TicketType | 'all';
  status: TicketStatus | 'all';
  search?: string;
  dateRange?: {
    from: Date | null;
    to: Date | null;
  };
}
