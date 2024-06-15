export interface ReservationRequest {
  id?: string;
  customerId:string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  createdAt: string;
  venueId: string;
  venueName: string;
  reservationDate?: Date;
  reservationTime: string;
  numGuests: number;
  specialRequests?: string;
  status: 'pending' | 'confirmed' | 'cancelled';
}
