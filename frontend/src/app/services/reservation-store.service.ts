import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable, tap } from "rxjs";
import { ReservationResponse } from "../shared/models/ReservationResponse.model";
import { ReservationService } from "./reservation.service";

@Injectable({
  providedIn: 'root'
})
export class ReservationStoreService {

  private userReservationsSubject = new BehaviorSubject<ReservationResponse[]>([]);
  private venueReservationSubject = new BehaviorSubject<ReservationResponse[]>([]);
  userReservations$: Observable<ReservationResponse[]> = this.userReservationsSubject.asObservable()
  venueReservations$: Observable<ReservationResponse[]> = this.userReservationsSubject.asObservable()

  constructor(private reservationService: ReservationService) {
  }
  createReservation(reservation){
    this.reservationService.createReservation(reservation).pipe(tap(
      newReservation =>{
        const reservations = this.userReservationsSubject.value;
        reservations.push(newReservation)
        this.userReservationsSubject.next([...reservations])
      }
    ))
  }
  loadUserReservations() {
    this.reservationService.getReservationsByUserId().pipe(tap(
      reservations => this.userReservationsSubject.next(reservations)
    )).subscribe()
  }

  loadVenueReservations(){
    this.reservationService.getReservationsByOwner().pipe(tap(
      reservations=>{
        this.venueReservationSubject.next(reservations)
      }
    ))
  }

}
