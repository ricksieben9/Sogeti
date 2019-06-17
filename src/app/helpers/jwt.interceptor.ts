import {Injectable} from '@angular/core';
import {HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpResponse} from '@angular/common/http';
import {Observable} from 'rxjs';

import {AuthService} from '../services/auth/auth.service';
import {tap} from "rxjs/internal/operators/tap";

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
    constructor(private authenticationService: AuthService) {}

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        // Add authorization header with jwt token if available
        if (this.authenticationService.isLoggedIn) {
            const currentUser = JSON.parse(localStorage.getItem('CURRENT_USER'));
            if (currentUser && currentUser.token) {
                request = request.clone({
                    setHeaders: {
                        Authorization: `Bearer ${currentUser.token}`
                    }
                });
            }
        }
        return next.handle(request);
    }
}

@Injectable()
export class JwtResponseInterceptor implements HttpInterceptor {
    constructor(private authenticationService: AuthService) {}

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

        return next.handle(req).pipe(tap((event: HttpEvent<any>) => {
            if (this.authenticationService.isLoggedIn) {
                if (event instanceof HttpResponse) {
                    if (event.headers.get('token')) {
                        const user = JSON.parse(localStorage.getItem('CURRENT_USER'));
                        user.token = event.headers.get('token');
                        localStorage.setItem('CURRENT_USER', JSON.stringify(user));
                    }
                }
            }
            return event;
        }));

    }
}
