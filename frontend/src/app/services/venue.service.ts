import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Venue } from "../shared/models/venue.model";
import { environment } from "../../../env.config.loader";

@Injectable({
  providedIn: 'root',
})
export class VenueService {
  private apiUrl = environment.AWS_BASEURL;

  constructor(private http: HttpClient) {
  }

  createVenue(venue: Venue): Observable<Venue> {
    return this.http.post<Venue>(`${this.apiUrl}/venue`, venue)
  }

  updateVenue(id: string, venue: Venue): Observable<Venue> {
    const venueCopy = { ...venue };
    delete venueCopy.venueId;
    return this.http.put<Venue>(`${this.apiUrl}/venue/${id}`, venueCopy);
  }

  deleteVenue(id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/venue/${id}`)
  }

  viewVenues(): Observable<Venue[]> {
    return this.http.get<Venue[]>(`${this.apiUrl}/venues`)
  }

  getVenueById(id: string): Observable<Venue> {
    return this.http.get<Venue>(`${this.apiUrl}/venue/${id}`);
  }

  viewVenuesByUserId(): Observable<Venue[]> {
    return this.http.get<Venue[]>(`${this.apiUrl}/venues/by-owner`,
      this.getAuthHeaders()
    )
  }

  private getAuthHeaders() {
    const token = localStorage.getItem('token');
    console.log('Auth Token:', token);  // Debug statement
    return token ? {headers: {Authorization: `Bearer ${token}`}} : {};
  }

}
