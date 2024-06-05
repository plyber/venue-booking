import { Component, Input } from '@angular/core';
import { Venue } from "../../../venue.model";

@Component({
  selector: 'app-venue-card',
  templateUrl: './venue-card.component.html',
  styleUrls: ['./venue-card.component.scss']
})
export class VenueCardComponent {
  @Input() venueCard!:Venue;
  constructor(){
  }
}
