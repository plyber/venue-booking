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
  venuesList!: Venue[];

  private subscriptions: Subscription = new Subscription();

  constructor(private venueService: VenueService) {
    this.loadVenues();
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
    this.subscriptions.add(
      this.venueService.createVenue(mockVenueData).subscribe(data => {
        this.venuesList.push(mockVenueData);
        this.loadVenues();
        console.log(mockVenueData, data);
      })
    );
  }

  bookVenue(venue) {
    console.log(`Venue ${venue.name} clicked`);
  }

  loadVenues() {
    this.subscriptions.add(
      this.venueService.viewVenues().subscribe(data => {
        this.venuesList = data.length > 0 ? data : [];
      })
    );
  }

  deleteVenue(id) {
    this.subscriptions.add(
      this.venueService.deleteVenue(id).subscribe(data => {
        console.log(data);
        this.venuesList = this.venuesList.filter(venue => venue._id !== id);
        console.log('VenueService deleted from frontend');
      })
    );
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }
}
