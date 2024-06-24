import { Component, Input, OnDestroy } from '@angular/core';
import { VenueService } from '../../../services/venue.service';
import { ReservationRequest } from '../../../shared/models/ReservationRequest.model';
import { ActivatedRoute, Router } from '@angular/router';
import { Venue } from '../../../shared/models/venue.model';
import { ReservationResponse } from '../../../shared/models/ReservationResponse.model';
import { AuthService } from "../../../services/auth.service";
import { Subscription } from "rxjs";
import { ReservationService } from "../../../services/reservation.service";

@Component({
  selector: 'app-reservation-form',
  templateUrl: './reservation-form.component.html',
  styleUrls: ['./reservation-form.component.scss'],
})
export class ReservationFormComponent implements OnDestroy {
  @Input() currentVenue!: Venue;
  private subscriptions: Subscription = new Subscription();
  reservation: ReservationRequest = {
    venueId: '',
    venueName: '',
    reservationDate: null,
    reservationTime: null,
    createdAt: new Date().toString(),
    customerId: '',
    customerName: '',
    customerEmail: '',
    customerPhone: '',
    numGuests: 0,
    specialRequests: '',
    status: 'pending',
  };

  constructor(
    private route: ActivatedRoute,
    private reservationService: ReservationService,
    private venueService: VenueService,
    private authService: AuthService,
    private router: Router
  ) {
    this.subscriptions.add(this.authService.getUserInfo().subscribe(res => {
      this.reservation.customerName = res.name;
      this.reservation.customerId = res.userId;
      this.reservation.customerEmail = res.email;
      this.reservation.customerPhone = res.phone;
    }))
    const venueId = this.route.snapshot.paramMap.get('id');
    if (venueId) {
      this.subscriptions.add(this.venueService.getVenueById(venueId).subscribe(() => {
        this.reservation.venueId = this.currentVenue.venueId || '';
        this.reservation.venueName = this.currentVenue.name;
      }));
    }
  }

  createReservation(): void {
    const reservationData: ReservationResponse = {
      venueId: this.currentVenue.venueId,
      venueName: this.currentVenue.name,
      createdAt: new Date().toString(),
      reservationDateTime: new Date(
        `${this.reservation.reservationDate}T${this.reservation.reservationTime}`
      ).toString(),
      customerId: this.reservation.customerId,
      customerName: this.reservation.customerName,
      customerEmail: this.reservation.customerEmail,
      customerPhone: this.reservation.customerPhone,
      numGuests: this.reservation.numGuests,
      specialRequests: this.reservation.specialRequests,
      status: 'pending',
    };
    this.subscriptions.add(this.reservationService.createReservation(reservationData).subscribe(() => {
      this.router.navigate(['/venues']);
    }));
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe()
  }

}
