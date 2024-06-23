import { Component, Input, OnInit } from '@angular/core';
import { Venue } from '../../../shared/models/venue.model';

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
        if (this.venueCard.images) {
            setInterval(() => {
                this.current = ++this.current % this.venueCard.images.length;
            }, 3000);

        }
    }
}
