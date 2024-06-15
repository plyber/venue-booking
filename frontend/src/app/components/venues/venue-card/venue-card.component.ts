import { Component, Input, OnInit } from '@angular/core';
import { Venue } from '../../../shared/models/venue.model';
import { animate, style, transition, trigger } from "@angular/animations";

@Component({
  selector: 'app-venue-card',
  templateUrl: './venue-card.component.html',
  styleUrls: ['./venue-card.component.scss'],
})

export class VenueCardComponent implements OnInit {
  @Input() venueCard!: Venue;
  current = 0;

  constructor() {
  }

  ngOnInit() {
    setInterval(() => {
      this.current = ++this.current % this.venueCard.images.length;
    }, 3000);
  }
}
