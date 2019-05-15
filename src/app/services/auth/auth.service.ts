import {Injectable} from '@angular/core';
import {tap, catchError} from 'rxjs/operators';
import {Observable, BehaviorSubject, throwError, of} from 'rxjs';

import {Request} from '../../models/request';
import {AuthResponse} from '../../models/auth-response';
import {Router} from '@angular/router';
import {ApiService} from '../api/api.service';

@Injectable({
    providedIn: 'root'
})
export class AuthService {

    private authSubject = new BehaviorSubject(false);

    constructor(private router: Router, private api: ApiService) {
    }

    login(req: Request): Observable<AuthResponse> {
        return this.api.login(req).pipe(tap((res: AuthResponse) => {
           if (res.role.toLocaleLowerCase() !== 'admin') {
               this.authSubject.next(true);
           }
        }));
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
