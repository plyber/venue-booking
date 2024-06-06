export interface Reservation {
  id?: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  venueId: string;
  venueName: string;
  reservationDate?: Date;
  reservationTime: string;
  numGuests: number;
  specialRequests?: string[];
  status: 'pending' | 'confirmed' | 'cancelled';
}
