import { Component, OnDestroy, OnInit } from '@angular/core';
import { ReservationResponse } from '../../../shared/models/ReservationResponse.model';
import { ReservationService } from "../../../services/reservation.service";
import { Subscription } from "rxjs";
import { User } from "../../../shared/models/user";

@Component({
  selector: 'app-reservation-info',
  templateUrl: './reservation-list.component.html',
  styleUrls: ['./reservation-list.component.scss'],
})
export class ReservationListComponent implements OnInit, OnDestroy {
  reservationsList!: ReservationResponse[];
  private subscriptions: Subscription = new Subscription();
  protected user?:User;

  constructor(private reservationService: ReservationService) {
  }

  ngOnInit() {
    this.loadReservations()
  }

  loadReservations() {
    this.subscriptions.add(
      this.reservationService.viewReservationsByUserId().subscribe(data => {
        this.reservationsList = data.length > 0 ? data : [];
        console.log(this.reservationsList);
      })
    );
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
}
