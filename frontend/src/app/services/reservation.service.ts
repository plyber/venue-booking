import { Injectable } from '@angular/core';
import { Observable, throwError } from "rxjs";
import { ReservationResponse } from "../shared/models/ReservationResponse.model";
import { HttpClient, HttpErrorResponse } from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class ReservationService {
  private apiUrl = 'http://localhost:5000';

  constructor(private http: HttpClient) {
  }

  createReservation(reservation: any): Observable<ReservationResponse> {
    return this.http.post<ReservationResponse>(
      `${this.apiUrl}/create-reservation`,
      reservation,
      this.getAuthHeaders()
    )
  }

  updateReservation(id: string, reservation: any): Observable<ReservationResponse> {
    const reservationCopy = {...reservation}
    delete reservationCopy._id
    return this.http.put<ReservationResponse>(`${this.apiUrl}/update-reservation/${id}`, reservationCopy, this.getAuthHeaders())
  }

  deleteReservation(id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/delete-reservation/${id}`, this.getAuthHeaders())
  }

  viewReservationsByUserId(): Observable<ReservationResponse[]> {
    console.log('Data updated from API');
    return this.http.get<ReservationResponse[]>(
      `${this.apiUrl}/view-reservations`,
      this.getAuthHeaders()
    )
  }

  getReservationsByOwner(): Observable<ReservationResponse[]> {
    return this.http.get<ReservationResponse[]>(`${this.apiUrl}/reservations/by-owner`,this.getAuthHeaders());
  }

  private getAuthHeaders() {
    const token = localStorage.getItem('token');
    console.log('Auth Token:', token);  // Debug statement
    return token ? {headers: {Authorization: `Bearer ${token}`}} : {};
  }

  private handleError(error: HttpErrorResponse) {
    console.error('An error occurred:', error.error);
    return throwError(() => new Error('Something bad happened; please try again later.'));
  }
}
