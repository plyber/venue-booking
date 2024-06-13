import { Injectable } from '@angular/core';
import { catchError, Observable, of, tap, throwError } from "rxjs";
import { ReservationResponse } from "../shared/models/ReservationResponse.model";
import { HttpClient, HttpErrorResponse } from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class ReservationService {
  private apiUrl = 'http://localhost:5000';
  private reservationsCache: ReservationResponse[] | null = null; // Local cache for reservations

  constructor(private http: HttpClient) {
  }

  private getAuthHeaders() {
    const token = localStorage.getItem('token');
    console.log('Auth Token:', token);  // Debug statement
    return token ? { headers: { Authorization: `Bearer ${token}` } } : {};
  }

  createReservation(reservation: any): Observable<ReservationResponse> {
    return this.http.post<ReservationResponse>(
      `${this.apiUrl}/create-reservation`,
      reservation
    ).pipe(tap(newReservation => {
        if (this.reservationsCache) {
          this.reservationsCache.push(newReservation)
        } else {
          this.reservationsCache = [newReservation]
        }
      }),
      catchError(this.handleError));
  }

  updateReservation(id: string, reservation: any): Observable<ReservationResponse> {
    return this.http.put<ReservationResponse>(`${this.apiUrl}/update-reservation/${id}`, reservation)
      .pipe(
        tap(updatedReservation => {
          if (this.reservationsCache) {
            const index = this.reservationsCache.findIndex(res => res._id === id);
            if (index !== -1) {
              this.reservationsCache[index] = updatedReservation;
            }
          }
        }),
        catchError(this.handleError)
      );
  }

  deleteReservation(id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/delete-reservation/${id}`)
      .pipe(
        tap(() => {
          if (this.reservationsCache) {
            this.reservationsCache = this.reservationsCache.filter(res => res._id !== id);
          }
        }),
        catchError(this.handleError)
      );
  }

  viewReservationsByUserId(): Observable<ReservationResponse[]> {
    if (this.reservationsCache) {
      return of(this.reservationsCache);
    }
    return this.http.get<ReservationResponse[]>(
      `${this.apiUrl}/view-reservations`,
      this.getAuthHeaders()
    ).pipe(
      tap(reservations => {
        console.log('Reservations fetched:', reservations);  // Debug statement
        this.reservationsCache = reservations;
      }),  // Cache fetched data
      catchError(this.handleError)
    );
  }


  private handleError(error: HttpErrorResponse) {
    console.error('An error occurred:', error.error);
    return throwError(() => new Error('Something bad happened; please try again later.'));
  }
}
