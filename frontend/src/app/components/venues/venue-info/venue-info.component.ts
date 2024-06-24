import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { VenueService } from '../../../services/venue.service';
import { Venue } from '../../../shared/models/venue.model';

@Component({
  selector: 'app-venue-info',
  templateUrl: './venue-info.component.html',
  styleUrls: ['./venue-info.component.scss'],
})
export class VenueInfoComponent implements OnInit {
  venue!: Venue;
  current = 0;

  constructor(
    private route: ActivatedRoute,
    private venueService: VenueService
  ) {}

  ngOnInit() {
    const venueId = this.route.snapshot.paramMap.get('id');
    if (venueId) {
      this.venueService.getVenueById(venueId).subscribe(data => {
        this.venue = data;
        this.startImageRotation();
      });
    }
  }

  startImageRotation() {
    if (this.venue?.images && this.venue.images.length > 0) {
      setInterval(() => {
        this.current = ++this.current % this.venue.images.length;
      }, 3000);
    }
  }
}
