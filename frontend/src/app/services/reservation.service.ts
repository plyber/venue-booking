import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from "rxjs";
import { ReservationResponse } from "../shared/models/ReservationResponse.model";
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { environment } from "../../../env.config.loader";

@Injectable({
  providedIn: 'root'
})
export class ReservationService {
  private apiUrl = environment.AWS_BASEURL;

  constructor(private http: HttpClient) {
  }

  createReservation(reservation: any): Observable<ReservationResponse> {
    return this.http.post<ReservationResponse>(
      `${this.apiUrl}/reservation`,
      reservation
    )
  }

  updateReservation(id: string, reservation: any): Observable<ReservationResponse> {
    return this.http.put<ReservationResponse>(`${this.apiUrl}/reservation/${id}`, reservation)
  }

  deleteReservation(id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/reservation/${id}`)
  }

  getReservationsByUserId(): Observable<ReservationResponse[]> {
    return this.http.get<ReservationResponse[]>(
      `${this.apiUrl}/reservations`)
  }

  getReservationsByOwner(): Observable<ReservationResponse[]> {
    return this.http.get<ReservationResponse[]>(`${this.apiUrl}/reservations/by-owner`)
  }

  private handleError(error: HttpErrorResponse) {
    console.error('An error occurred:', error.message);
    return throwError(() => new Error('Something bad happened; please try again later.'));
  }
}
