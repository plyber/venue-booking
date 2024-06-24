import { Component, OnDestroy, OnInit } from '@angular/core';
import { ReservationResponse } from '../../../shared/models/ReservationResponse.model';
import { ReservationService } from "../../../services/reservation.service";
import { Subscription } from "rxjs";

@Component({
  selector: 'app-reservation-info',
  templateUrl: './reservation-list.component.html',
  styleUrls: ['./reservation-list.component.scss'],
})
export class ReservationListComponent implements OnInit, OnDestroy {
  reservationsList!: ReservationResponse[];
  editingReservations: Set<string> = new Set();
  private subscriptions: Subscription = new Subscription();

  constructor(private reservationService: ReservationService) {
  }

  ngOnInit() {
    this.loadReservations()
  }

  loadReservations() {
    this.subscriptions.add(
      this.reservationService.getReservationsByUserId().subscribe(data => {
        this.reservationsList = data.length > 0 ? data : [];
      })
    );
  }
  editReservation(id: string) {
    this.editingReservations.add(id);
  }

  saveReservation(reservation: ReservationResponse) {
    this.editingReservations.delete(reservation.reservationId);
    reservation.updatedAt = new Date().toString();
    this.subscriptions.add(
      this.reservationService.updateReservation(reservation.reservationId, reservation).subscribe(() => {
      })
    );
  }

  deleteReservation(id: string) {
    this.subscriptions.add(
      this.reservationService.deleteReservation(id).subscribe(() => {
        this.reservationsList = this.reservationsList.filter(reservation => reservation.reservationId !== id);
      })
    );
  }

  cancelEdit(id: string) {
    this.editingReservations.delete(id);
    this.loadReservations();
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
}
