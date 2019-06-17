import {Injectable} from '@angular/core';
import {tap} from 'rxjs/operators';
import {Observable, BehaviorSubject, of, from} from 'rxjs';

import {Request} from '../../models/request';
import {AuthResponse} from '../../models/auth-response';
import {Router} from '@angular/router';
import {ApiService} from '../api/api.service';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import * as bcrypt from 'bcryptjs';

@Injectable({
    providedIn: 'root'
})
export class AuthService {

    private authServer;
    private authSubject;

    constructor(private httpClient: HttpClient, private router: Router, private api: ApiService) {
        this.authServer = environment.apiServerAddress;
        this.authSubject = new BehaviorSubject(false);
    }

    login(req: Request): Observable<AuthResponse> {
        return this.api.login(req).pipe(tap((res: AuthResponse) => {
            if (res.role) {
                if (res.role.toLocaleLowerCase() !== 'admin') {
                    this.authSubject.next(true);
                }
            }
        }));
    }

    pinLogin(pincode: number): Observable<AuthResponse> {
        const pinFromDB = JSON.parse(localStorage.getItem('PIN_CODE_USER')).pin;
        const aSubject = this.authSubject.next(true);
        return from(bcrypt.compare(pincode.toString(), pinFromDB).then(function(res: AuthResponse, err) {
            if (err) {
                return err;
            } else {
                if (res) {
                    aSubject;
                    return of(JSON.parse(localStorage.getItem('CURRENT_USER')));
                }
            }
        }));
    }

    refreshToken() {
        this.api.refreshToken();
    }

    logout() {
        this.authSubject.next(false);
        this.router.navigateByUrl('');
    }

    public get isLoggedIn() {
        return this.authSubject.value;
    }
}
