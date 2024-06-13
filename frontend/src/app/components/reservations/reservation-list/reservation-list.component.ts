import { Component, OnDestroy, OnInit } from '@angular/core';
import { ReservationResponse } from '../../../shared/models/ReservationResponse.model';
import { AuthService } from "../../../services/auth.service";
import { ReservationService } from "../../../services/reservation.service";
import { Subscription } from "rxjs";

@Component({
  selector: 'app-reservation-info',
  templateUrl: './reservation-list.component.html',
  styleUrls: ['./reservation-list.component.scss'],
})
export class ReservationListComponent implements OnInit, OnDestroy {
  reservations: ReservationResponse[];
  private subscriptions: Subscription = new Subscription();

  constructor(private reservationService: ReservationService, private authService: AuthService) {
  }

  ngOnInit() {
    this.subscriptions.add(this.authService.getUserInfo().subscribe(res => {
      console.log('CurrentUserID' + res.user.id)
      this.loadReservations()
    }))
  }

  loadReservations() {
    this.subscriptions.add(
      this.reservationService.viewReservationsByUserId().subscribe(data => {
        this.reservations = data.length > 0 ? data : [];
        console.log(this.reservations);
      })
    );

  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
}
