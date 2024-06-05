import { Component, OnInit } from '@angular/core';
import { DataService } from "../../../services/data.service";
import { Venue } from "../../../venue.model";

@Component({
  selector: 'app-venue-list',
  templateUrl: './venue-list.component.html',
  styleUrls: ['./venue-list.component.scss']
})
export class VenueListComponent implements OnInit {
  venueData!: Venue[];
  subscription = this.dataService.createVenue(
    {
      name: "Palat",
      address: "Palace Str. 3224",
      city: "Oradea",
      state: "Romania",
      zip: "370002",
      country: "Romania",
      capacity: 320,
      type: "Restaurant",
      createdAt: Date.now(),
      updatedAt: Date.now()
    }).subscribe(data => {
    console.log(data)
    this.venueData.push(data);
  })

  constructor(private dataService: DataService) {
  }

  ngOnInit() {
    this.dataService.viewVenues().subscribe(data => {
      this.venueData = data;
    })
  }

  viewVenue(id) {
    console.log(id)
  }

  updateData() {
    this.dataService.viewVenues().subscribe(data => {
      this.venueData = data;
      console.log('data updated')
    })
  }

  deleteVenue(id) {
    this.dataService.deleteVenue(id).subscribe(data => {
      console.log(data)
      this.updateData()
    })

  }
}
