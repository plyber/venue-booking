import { Component, OnInit } from '@angular/core';
import { DataService } from '../../../services/data.service';
import { ReservationResponse } from '../../../shared/models/ReservationResponse.model';
import { AuthService } from "../../../services/auth.service";

@Component({
  selector: 'app-reservation-info',
  templateUrl: './reservation-list.component.html',
  styleUrls: ['./reservation-list.component.scss'],
})
export class ReservationListComponent implements OnInit {
  reservations: ReservationResponse[];
  currentUserId;
  constructor(private dataService: DataService, private authService: AuthService) {
    this.authService.getUserInfo().subscribe(res=>{
      this.currentUserId=res.user.id;
      console.log('CurrentUserID' + this.currentUserId)
    })
  }

  ngOnInit() {
    this.dataService.viewReservationsByUserId().subscribe(data => {
      //TODO Implement viewing reservations of the current logged in user, not all global reservations
      if(data.length>0){
        this.reservations=data;
      }
      console.log(this.reservations)
    });
  }
}
