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
      this.reservation.customerName = res.user.name;
      this.reservation.customerId = res.user.id;
      this.reservation.customerEmail = res.user.email;
      this.reservation.customerPhone = res.user.phone;
    }))
    const venueId = this.route.snapshot.paramMap.get('id');
    if (venueId) {
      this.subscriptions.add(this.venueService.getVenueById(venueId).subscribe(data => {
        this.reservation.venueId = this.currentVenue._id || '';
        this.reservation.venueName = this.currentVenue.name;
        console.log(
          'found entry!',
          data,
          `\n Form acquired reservation ID: ${this.reservation.venueId} \n Form acquired reservation name: ${this.reservation.venueName}`
        );
      }));
    }
  }

  createReservation(): void {
    const reservationData: ReservationResponse = {
      venueId: this.currentVenue._id,
      venueName: this.currentVenue.name,
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
    this.subscriptions.add(this.reservationService.createReservation(reservationData).subscribe(response => {
      console.log('Reservation created:', reservationData, response);
      this.router.navigate(['/venues']);
    }));
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe()
  }

}
