import { Component, OnDestroy, OnInit } from '@angular/core';
import { VenueService } from '../../../services/venue.service';
import { Venue } from '../../../shared/models/venue.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-venue-list',
  templateUrl: './venue-list.component.html',
  styleUrls: ['./venue-list.component.scss'],
})
export class VenueListComponent implements OnDestroy, OnInit {
  venuesList!: Venue[];

  private subscriptions: Subscription = new Subscription();

  constructor(private venueService: VenueService) {
  }

  ngOnInit() {
    this.loadVenues();
  }

  createVenue() {
    let mockVenueData: Venue = {
      ownerId: '6669a4b490c2d7eadb5de248',
      name: "Cool Restaurant",
      address: 'Palace Str. 3224',
      city: 'Oradea',
      state: 'Romania',
      zip: '370002',
      country: 'Romania',
      capacity: Math.floor(Math.random() * 200),
      type: 'Restaurant',
      amenities: ['Pool', 'Jazz Band', 'Smoking area'],
      images: ['https://cdn.cluj.com/ghidlocalcom/sites/2/2017/07/crinul-alb-7-800x600.jpg',
        'https://scontent.ftsr1-1.fna.fbcdn.net/v/t39.30808-6/306396430_5222565141174085_7806083091093507299_n.jpg?_nc_cat=100&ccb=1-7&_nc_sid=5f2048&_nc_ohc=Czz5iiyMhDEQ7kNvgGqNgiE&_nc_ht=scontent.ftsr1-1.fna&oh=00_AYDxwDFvIs9UCFnE4IIuHxKeK0Q20aL8jAC3JQXrIHg9vA&oe=66735E56',
        'https://crinulalboradea.ro/wp-content/themes/backbone/assets/images/section-gallery/Crinul-Alb---0007.jpg'],
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    this.subscriptions.add(
      this.venueService.createVenue(mockVenueData).subscribe(() => {
        this.venuesList.push(mockVenueData);
        this.loadVenues();
      })
    );
  }

  loadVenues() {
    this.subscriptions.add(
      this.venueService.viewVenues().subscribe(data => {
        this.venuesList = data.length > 0 ? data : [];
      })
    );
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }
}
