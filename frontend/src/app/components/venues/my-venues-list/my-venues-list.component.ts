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
        console.log(this.venuesList)
      })
    );
  }

  //TODO implement reservations tied to each venue
  deleteVenue(id) {
    this.subscriptions.add(
      this.venueService.deleteVenue(id).subscribe(data => {
        console.log(data);
        this.venuesList = this.venuesList.filter(venue => venue._id !== id);
        console.log('VenueService deleted from frontend');
      })
    );
  }
  editVenue(id:string){
    this.editingVenues.add(id);
  }

  saveVenue(venue: Venue) {
    this.editingVenues.delete(venue._id);
    this.subscriptions.add(
      this.venueService.updateVenue(venue._id, venue).subscribe(data => {
        console.log('Venue updated:', data);
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
