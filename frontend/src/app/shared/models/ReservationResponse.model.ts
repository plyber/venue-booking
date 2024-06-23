export interface ReservationResponse {
  reservationId?: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  venueId: string;
  createdAt: string;
  updatedAt?: string;
  customerId?: string;
  venueName: string;
  reservationDateTime: string;
  numGuests: number;
  specialRequests?: string;
  status: 'pending' | 'confirmed' | 'cancelled';
}
