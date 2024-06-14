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
      ownerId: '6669a4b490c2d7eadb5de248',
      name: crypto.randomUUID(),
      address: 'Palace Str. 3224',
      city: 'Oradea',
      state: 'Romania',
      zip: '370002',
      country: 'Romania',
      capacity: Math.floor(Math.random()*200),
      type: 'Restaurant',
      amenities: ['Pool', 'Jazz Band', 'Smoking area'],
      images: ['https://dynamic-media-cdn.tripadvisor.com/media/photo-o/18/60/5e/15/restaurant.jpg?w=1200&h=-1&s=1'],
      createdAt: new Date(),
      updatedAt: new Date(),
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

  bookmarkVenue(id) {
    // this.subscriptions.add(
    //   this.venueService.deleteVenue(id).subscribe(data => {
    //     console.log(data);
    //     this.venuesList = this.venuesList.filter(venue => venue._id !== id);
    //     console.log('VenueService deleted from frontend');
    //   })
    // );
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }
}
