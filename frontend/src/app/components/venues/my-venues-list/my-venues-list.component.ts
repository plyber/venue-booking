import { Component, OnInit } from '@angular/core';
import { Venue } from "../../../shared/models/venue.model";
import { Subscription } from "rxjs";
import { VenueService } from "../../../services/venue.service";

@Component({
  selector: 'app-my-venues-list',
  templateUrl: './my-venues-list.component.html',
  styleUrls: ['./my-venues-list.component.scss']
})
export class MyVenuesListComponent implements OnInit {
  venuesList!: Venue[];

  private subscriptions: Subscription = new Subscription();

  constructor(private venueService: VenueService) {

  }

  loadVenues() {
    this.subscriptions.add(
      this.venueService.viewVenuesByUserId().subscribe(data => {
        this.venuesList = data.length > 0 ? data : [];
        console.log(this.venuesList)
      })
    );
  }

  ngOnInit() {
    this.loadVenues();
  }

}
