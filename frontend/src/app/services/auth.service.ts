import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Credentials } from '../shared/models/Credentials.model';
import { User } from "../shared/models/user";

@Injectable({
  providedIn: 'root',
})
export class AuthService {

  private loggedIn = new BehaviorSubject<boolean>(this.hasToken());
  private apiUrl = 'http://localhost:5000';
  userInfo?: any;

  constructor(private http: HttpClient) {
    this.getUserInfo().subscribe(response=>{
      this.userInfo=response.user;
    })
  }

  get isLoggedIn(): Observable<boolean> {
    return this.loggedIn.asObservable();
  }

  hasToken(): boolean {
    return !!localStorage.getItem('token');
  }

  login(credentials: Credentials) {
    return this.http.post<any>(
      `${this.apiUrl}/login`,
      credentials,
    ).pipe(
      tap(res => {
        if (res.token) {
          console.log('LOGIN TOKEN?:' + this.hasToken())
          localStorage.setItem('token', res.token);
          this.loggedIn.next(true);
        }
      })
    );
  }

  getUserInfo(): Observable<any> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Authorization': token
    });
    return this.http.get<User>(`${this.apiUrl}/user-info`, {headers})
      .pipe(
        tap(res => {
          this.userInfo = res.user;
          console.log(this.userInfo)
        })
      );
  }

  saveUser(user: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/save-user`, user);
  }

  logout() {
    localStorage.removeItem('token');
    console.log('LOGOUT TOKEN?:' + this.hasToken())
    this.loggedIn.next(false);
  }

  register(credentials: Credentials) {
    return this.http.post<any>(
      `${this.apiUrl}/register`,
      credentials,
    );
  }

}
