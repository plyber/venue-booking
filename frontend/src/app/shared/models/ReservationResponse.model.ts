export interface ReservationResponse {
  _id?: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  venueId: string;
  createdAt: string;
  customerId?: string;
  venueName: string;
  reservationDateTime: string;
  updatedAt?: string;
  numGuests: number;
  specialRequests?: string;
  status: 'pending' | 'confirmed' | 'cancelled';
}
