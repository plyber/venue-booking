import { Injectable } from '@angular/core';
import { BehaviorSubject, catchError, Observable, tap, throwError } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Credentials } from '../shared/models/Credentials.model';
import { User } from "../shared/models/user";
import { environment } from "../../../env.config.loader";

@Injectable({
    providedIn: 'root',
})
export class AuthService {

    private loggedIn = new BehaviorSubject<boolean>(this.hasToken());
    private apiUrl = environment.AWS_BASEURL;
    private userSubject = new BehaviorSubject<User | null>(null);

    constructor(private http: HttpClient) {
    }

    get isLoggedIn(): Observable<boolean> {
        return this.loggedIn.asObservable();
    }

    get user(): Observable<User | null> {
        return this.userSubject.asObservable();
    }

    hasToken(): boolean {
        return !!localStorage.getItem('token');
    }

    login(credentials: Credentials) {
        return this.http.post<any>(`${this.apiUrl}/login`, credentials,).pipe(tap(res => {
            if (res.token) {
                console.log('LOGIN TOKEN?:' + this.hasToken())
                localStorage.setItem('token', res.token);
                this.userSubject.next({
                    password: res.password, username: res.username, userId: res.userId, type: res.type
                })
                this.loggedIn.next(true);
                console.log('Currently Logged User: ' + JSON.stringify(this.user))
                console.log('Local Storage Token: ' + localStorage.getItem('token'))
            }
        }), catchError(error => throwError(error)));
    }

    getUserInfo(): Observable<any> {
        return this.http.get<any>(`${this.apiUrl}/user-info`)
            .pipe(tap(res => {
                this.userSubject.next({
                    password: res.password, username: res.username, userId: res.userId, type: res.type, name: res.name, email: res.email, phone: res.phone
                })
                console.log(this.user)
            }), catchError(error => throwError(error)));
    }

    saveUser(data: User): Observable<any> {
        return this.http.put<any>(`${this.apiUrl}/user-info`, data).pipe(
            tap(res => {
                if (res.message === "User updated successfully") {
                    this.getUserInfo().subscribe();
                }
            }),
            catchError(error => throwError(error))
        );
    }

    logout() {
        localStorage.removeItem('token');
        console.log('LOGOUT TOKEN?:' + this.hasToken())
        this.loggedIn.next(false);
        this.userSubject.next(null)
    }

    register(credentials: Credentials) {
        return this.http.post<any>(`${this.apiUrl}/register`, credentials);
    }

}
