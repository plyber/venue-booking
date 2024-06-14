import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { VenueService } from '../../../services/venue.service';
import { Venue } from '../../../shared/models/venue.model';

@Component({
  selector: 'app-venue-info',
  templateUrl: './venue-info.component.html',
  styleUrls: ['./venue-info.component.scss'],
})
export class VenueInfoComponent {
  venue!: Venue;
  constructor(
    private route: ActivatedRoute,
    private dataService: VenueService
  ) {
    const venueId = this.route.snapshot.paramMap.get('id');
    if (venueId) {
      this.dataService.getVenueById(venueId).subscribe(data => {
        this.venue = data;
        console.log('Found entry!', data);
      });
    }
  }
}
