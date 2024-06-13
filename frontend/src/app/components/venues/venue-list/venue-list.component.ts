import { Component, OnDestroy } from '@angular/core';
import { VenueService } from '../../../services/venue.service';
import { Venue } from '../../../shared/models/venue.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-venue-list',
  templateUrl: './venue-list.component.html',
  styleUrls: ['./venue-list.component.scss'],
})
export class VenueListComponent implements OnDestroy {
  venueData!: Venue[];

  subscriptions: Subscription[] = [];

  constructor(private venueService: VenueService) {
    this.updateData();
  }

  createVenue() {
    let mockVenueData: Venue = {
      name: crypto.randomUUID(),
      address: 'Palace Str. 3224',
      city: 'Oradea',
      state: 'Romania',
      zip: '370002',
      country: 'Romania',
      capacity: Math.floor(Math.random()*200),
      type: 'Restaurant',
      createdAt: new Date(),
      amenities: ['Pool', 'Jazz Band', 'Smoking area'],
    };
    this.subscriptions.push(
      this.venueService.createVenue(mockVenueData).subscribe(data => {
        this.venueData.push(mockVenueData);
        this.updateData();
        console.log(mockVenueData, data);
      })
    );
  }

  bookVenue(venue) {
    console.log(`Venue ${venue.name} clicked`);
  }

  updateData() {
    this.subscriptions.push(
      this.venueService.viewVenues().subscribe(data => {
        this.venueData = data;
        console.log('Data updated from API');
      })
    );
  }

  deleteVenue(id) {
    this.subscriptions.push(
      this.venueService.deleteVenue(id).subscribe(data => {
        console.log(data);
        this.venueData = this.venueData.filter(venue => venue._id !== id);
        console.log('VenueService deleted from frontend');
      })
    );
  }

  ngOnDestroy() {
    this.subscriptions.forEach(subscription => subscription.unsubscribe());
  }
}
