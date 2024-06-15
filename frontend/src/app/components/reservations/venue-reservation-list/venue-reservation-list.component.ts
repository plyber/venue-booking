import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { ReservationService } from '../../../services/reservation.service';
import { ReservationResponse } from "../../../shared/models/ReservationResponse.model";

@Component({
  selector: 'app-venue-reservation-list',
  templateUrl: './venue-reservation-list.component.html',
  styleUrls: ['./venue-reservation-list.component.scss']
})
export class VenueReservationListComponent implements OnInit, OnDestroy {
  reservationsList!: ReservationResponse[];
  editingReservations: Set<string> = new Set();
  private subscriptions: Subscription = new Subscription();

  constructor(private reservationService: ReservationService) { }

  ngOnInit() {
    this.loadReservations();
  }


  loadReservations() {
    this.subscriptions.add(
        this.reservationService.getReservationsByOwner().subscribe(data => {
          this.reservationsList = data.length > 0 ? data : [];
        })
    );
  }

  confirmReservation(id: string) {
    const updatedReservation = { status: 'confirmed' };
    this.subscriptions.add(
        this.reservationService.updateReservation(id, updatedReservation).subscribe(data => {
          console.log('Reservation confirmed:', data);
          const reservation = this.reservationsList.find(res => res._id === id);
          if (reservation) {
            reservation.status = 'confirmed';
          }
        })
    );
  }
  pendingReservation(id:string){
    const updatedReservation = { status: 'pending' };
    this.subscriptions.add(
        this.reservationService.updateReservation(id, updatedReservation).subscribe(data => {
          console.log('Reservation pending:', data);
          const reservation = this.reservationsList.find(res => res._id === id);
          if (reservation) {
            reservation.status = 'pending';
          }
        })
    );
  }
  cancelReservation(id: string) {
    const updatedReservation = { status: 'Canceled' };
    this.subscriptions.add(
        this.reservationService.updateReservation(id, updatedReservation).subscribe(data => {
          console.log('Reservation canceled:', data);
          const reservation = this.reservationsList.find(res => res._id === id);
          if (reservation) {
            reservation.status = 'cancelled';
          }
        })
    );
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
}
