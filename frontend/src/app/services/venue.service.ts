import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Venue } from "../shared/models/venue.model";

@Injectable({
    providedIn: 'root',
})
export class VenueService {
    private apiUrl = 'http://localhost:5000';

    constructor(private http: HttpClient) {
    }

    createVenue(venue: Venue): Observable<Venue> {
        return this.http.post<Venue>(`${this.apiUrl}/create-venue`, venue)
    }

    updateVenue(id: string, venue: Venue): Observable<Venue> {
        return this.http.put<Venue>(`${this.apiUrl}/update-venue/${id}`, venue)
    }


    deleteVenue(id: string): Observable<any> {
        return this.http.delete(`${this.apiUrl}/delete-venue/${id}`)
    }

    viewVenues(): Observable<Venue[]> {
        return this.http.get<Venue[]>(`${this.apiUrl}/view-venues`)
    }

    getVenueById(id: string): Observable<Venue> {
        return this.http.get<Venue>(`${this.apiUrl}/view-venue/${id}`);
    }

}
