import { Component, EventEmitter, Input, Output } from '@angular/core';
import { DataService } from "../../../services/data.service";

@Component({
  selector: 'app-venue-card',
  templateUrl: './venue-card.component.html',
  styleUrls: ['./venue-card.component.scss']
})
export class VenueCardComponent {
  @Input() _id: string;
  @Input() name: string;
  @Input() address: string;
  @Input() city: string;
  @Input() state: string;
  @Input() zip: string;
  @Input() country: string;
  @Input() capacity: number;
  @Input() type: string;
  @Input() amenities?: string[];
  @Input() images?: string[];
  @Input() createdAt?: Date;
  @Input() updatedAt?: Date;
  constructor(private dataService: DataService){
  }
}
