import { Component, Input} from '@angular/core';
import { DataService } from "../../../services/data.service";
import { Reservation } from "../../../reservation.model";
import { ActivatedRoute, Router } from "@angular/router";
import { Venue } from "../../../venue.model";


@Component({
  selector: 'app-reservation-form',
  templateUrl: './reservation-form.component.html',
  styleUrls: ['./reservation-form.component.scss']
})
export class ReservationFormComponent {
  @Input() currentVenue!: Venue;

  reservation: Reservation = {
    customerName: '',
    customerEmail: '',
    customerPhone: '',
    venueId: '',
    venueName: '',
    reservationDate: null,
    reservationTime: '',
    numGuests: 0,
    status: 'pending'
  };
  constructor(private route: ActivatedRoute, private dataService: DataService, private router: Router) {
    const venueId = this.route.snapshot.paramMap.get('id');
    if (venueId) {
      this.dataService.getVenueById(venueId).subscribe(data => {
        this.reservation.venueId = this.currentVenue._id || '';
        this.reservation.venueName = this.currentVenue.name;
        console.log('found entry!', data, `\n Form acquired reservation ID: ${this.reservation.venueId} \n Form acquired reservation name: ${this.reservation.venueName}`)
      });
    }

  }
  createReservation(): void {
    const reservationData = {
      venueId: this.currentVenue._id,
      reservationDate: new Date(`${this.reservation.reservationDate}T${this.reservation.reservationTime}`),
      customerName: this.reservation.customerName,
      customerEmail: this.reservation.customerEmail,
      customerPhone: this.reservation.customerPhone,
      numGuests: this.reservation.numGuests,
      specialRequests: this.reservation.specialRequests,
      status: 'pending'
    };

    this.dataService.createReservation(reservationData).subscribe(response => {
      console.log('Reservation created:', reservationData, response);
      this.router.navigate(['/venues']);
    });
  }
}
