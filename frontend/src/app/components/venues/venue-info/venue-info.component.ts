import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DataService } from '../../../services/data.service';
import { Venue } from '../../../venue.model';
import { Reservation } from "../../../reservation.model";

@Component({
  selector: 'app-venue-info',
  templateUrl: './venue-info.component.html',
  styleUrls: ['./venue-info.component.scss']
})
export class VenueInfoComponent implements OnInit {
  venue!: Venue;
  reservation: Reservation = {
    id: '',
    customerName: '',
    customerEmail: '',
    customerPhone: '',
    venueId: '',
    venueName: '',
    reservationDate: '',
    reservationTime: '',
    numGuests: 0,
    specialRequests: [],
    status: 'pending'
  };

  constructor(private route: ActivatedRoute, private dataService: DataService, private router: Router) {
  }

  ngOnInit(): void {
    const venueId = this.route.snapshot.paramMap.get('id');
    if (venueId) {
      this.dataService.getVenueById(venueId).subscribe(data => {
        this.venue = data;
        this.reservation.venueId = this.venue._id || '';
        this.reservation.venueName = this.venue.name;
        console.log('found entry!', data)
      });
    }
  }

  createReservation(): void {
    const reservationData = {
      venueId: this.venue._id,
      reservationDateTime: new Date(`${this.reservation.reservationDate}T${this.reservation.reservationTime}`),
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
