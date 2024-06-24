import { Component, OnDestroy, OnInit } from '@angular/core';
import { Venue } from "../../../shared/models/venue.model";
import { Subscription } from "rxjs";
import { VenueService } from "../../../services/venue.service";

@Component({
  selector: 'app-my-venues-list',
  templateUrl: './my-venues-list.component.html',
  styleUrls: ['./my-venues-list.component.scss']
})
export class MyVenuesListComponent implements OnInit, OnDestroy {
  editingVenues: Set<string> = new Set();
  venuesList!: Venue[];

  private subscriptions: Subscription = new Subscription();

  constructor(private venueService: VenueService) {

  }

  loadVenues() {
    this.subscriptions.add(
      this.venueService.viewVenuesByUserId().subscribe(data => {
        this.venuesList = data.length > 0 ? data : [];
      })
    );
  }

  deleteVenue(id:string) {
    this.subscriptions.add(
      this.venueService.deleteVenue(id).subscribe(() => {
        this.venuesList = this.venuesList.filter(venue => venue.venueId !== id);
      })
    );
  }
  editVenue(id:string){
    this.editingVenues.add(id);
  }

  saveVenue(venue: Venue) {
    this.editingVenues.delete(venue.venueId);
    this.subscriptions.add(
      this.venueService.updateVenue(venue.venueId, venue).subscribe(() => {
        venue.updatedAt = new Date();
      })
    );
  }

  cancelEdit(id: string) {
    this.editingVenues.delete(id);
    this.loadVenues();
  }

  ngOnInit() {
    this.loadVenues();
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }

}
