import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of, tap } from 'rxjs';
import { Venue } from "../shared/models/venue.model";

@Injectable({
  providedIn: 'root',
})
export class VenueService {
  private apiUrl = 'http://localhost:5000';
  private venuesCache: Venue[] | null = null;

  constructor(private http: HttpClient) {
  }

  createVenue(venue: Venue): Observable<Venue> {
    return this.http.post<Venue>(`${this.apiUrl}/create-venue`, venue).pipe(
      tap(createdVenue => {
        if (this.venuesCache) {
          this.venuesCache.push(createdVenue);
        } else {
          this.venuesCache = [createdVenue];
        }
      })
    );
  }

  updateVenue(id: string, venue: Venue): Observable<Venue> {
    return this.http.put<Venue>(`${this.apiUrl}/update-venue/${id}`, venue).pipe(
      tap(updatedVenue => {
        const index = this.venuesCache?.findIndex(v => v._id === updatedVenue._id);
        if (index !== -1 && this.venuesCache) {
          this.venuesCache[index] = updatedVenue
        }
      })
    );
  }


  deleteVenue(id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/delete-venue/${id}`).pipe(
      tap(() => {
        this.venuesCache = this.venuesCache?.filter(venue => venue._id !== id);
      })
    );
  }

  viewVenues(): Observable<Venue[]> {
    if (this.venuesCache) {
      return of(this.venuesCache);
    } else {
      return this.http.get<Venue[]>(`${this.apiUrl}/view-venues`).pipe(
        tap(venues => this.venuesCache = venues)
      );
    }
  }

  getVenueById(id: string): Observable<Venue> {
    const venue = this.venuesCache?.find(v => v._id === id);
    if (venue) {
      return of(venue);
    } else {
      return this.http.get<Venue>(`${this.apiUrl}/view-venue/${id}`);
    }
  }

}
