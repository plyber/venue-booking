import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Venue } from "../venue.model";

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private apiUrl = 'http://localhost:5000';

  constructor(private http: HttpClient) { }

  createReservation(reservation: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/create-reservation`, reservation);
  }

  updateReservation(id: string, reservation: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/update-reservation/${id}`, reservation);
  }

  deleteReservation(id: string): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/delete-reservation/${id}`);
  }

  viewReservations(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/view-reservations`);
  }


  createVenue(venue: Venue): Observable<any> {
    return this.http.post<Venue>(`${this.apiUrl}/create-venue`, venue);
  }

  updateVenue(id: string, venue: any): Observable<any> {
    return this.http.put<Venue>(`${this.apiUrl}/update-venue/${id}`, venue);
  }

  deleteVenue(id: string): Observable<any> {
    return this.http.delete<Venue>(`${this.apiUrl}/delete-venue/${id}`);
  }

  viewVenues(): Observable<any[]> {
    return this.http.get<Venue[]>(`${this.apiUrl}/view-venues`);
  }
  getVenueById(id: string): Observable<Venue> {
    return this.http.get<Venue>(`${this.apiUrl}/view-venue/${id}`);
  }
}
