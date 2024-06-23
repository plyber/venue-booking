export interface ReservationRequest {
  reservationId?: string;
  customerId:string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  createdAt: string;
  updatedAt?: string;
  venueId: string;
  venueName: string;
  reservationDate?: Date;
  reservationTime: string;
  numGuests: number;
  specialRequests?: string;
  status: 'pending' | 'confirmed' | 'cancelled';
}
