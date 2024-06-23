import { Injectable, Injector } from '@angular/core';
import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { catchError, Observable, retry, throwError } from 'rxjs';
import { AuthService } from "../../services/auth.service";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

    constructor(private injector: Injector) {
    }

    intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
        const authService = this.injector.get(AuthService);
        const authToken = localStorage.getItem('token');
        const authReq = request.clone({
            headers: request.headers.set('Authorization', `Bearer ${authToken}`)
        });

        if (request.url === '/venues') {
            return next.handle(authReq);
        }

        return next.handle(authReq).pipe(
            retry(1),
            catchError((error: HttpErrorResponse) => {
                if (error.status === 401) {
                    authService.logout()
                }
                return throwError(() => new Error('Something bad happened; please try again later.'));
            })
        )
    }
}
