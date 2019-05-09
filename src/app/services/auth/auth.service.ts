import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {tap, catchError} from 'rxjs/operators';
import {Observable, BehaviorSubject, throwError, of} from 'rxjs';

import {environment} from '../../../environments/environment';
import {Request} from '../../models/request';
import {AuthResponse} from '../../models/auth-response';
import {Router} from '@angular/router';

@Injectable({
    providedIn: 'root'
})
export class AuthService {

    private authServer = environment.apiServerAddress;
    private authSubject = new BehaviorSubject(false);

    constructor(private httpClient: HttpClient, private router: Router) {
    }

    login(req: Request): Observable<AuthResponse> {
        return this.httpClient.post(`${this.authServer}/auth/login`, req).pipe(
            tap((res: AuthResponse) => {
                if (res) {
                    res.status = 200;
                    if (res.role.toLowerCase() !== 'admin') {
                        localStorage.setItem('CURRENT_USER', JSON.stringify(res));
                        this.authSubject.next(true);
                    } else {
                        res.status = 401;
                        res.error = {
                            response: 'U heeft geen toegang tot de app.'
                        };
                    }
                }
            }),
            catchError((err: AuthResponse) => {
                return of(err);
            })
        );
    }

    pinLogin(pincode: number): Observable<AuthResponse> {
        if (JSON.parse(localStorage.getItem('PIN_CODE_USER')).pin === pincode) {
            this.authSubject.next(true);
            return of(JSON.parse(localStorage.getItem('CURRENT_USER')));
        } else {
            return of({username: '', token: '', role: '', name: '', status: 401, error: {response: 'Pincode incorrect.'}});
        }
    }

    logout() {
        this.authSubject.next(false);
        this.router.navigateByUrl('');
    }

    isLoggedIn() {
        return this.authSubject.value;
    }
}
