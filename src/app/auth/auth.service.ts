import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap, catchError } from 'rxjs/operators';
import { Observable, BehaviorSubject, throwError, of } from 'rxjs';

import { User } from './user';
import { AuthResponse } from './auth-response';
import { Router } from '@angular/router';

@Injectable({
	providedIn: 'root'
})
export class AuthService {

	AUTH_SERVER_ADDRESS: string = 'http://localhost:3000';
	authSubject = new BehaviorSubject(false);

	constructor(private httpClient: HttpClient, private router: Router) {
	}

	login(user: User): Observable<AuthResponse> {
		return this.httpClient.post(`${this.AUTH_SERVER_ADDRESS}/auth/login`, user).pipe(
			tap((res: AuthResponse) => {
				if (res) {
					res.status = 200;
					if (res.role.toLowerCase() != "admin") {
						localStorage.setItem("CURRENT_USER", JSON.stringify(res));
						this.authSubject.next(true);
					}
					else {
						res.status = 401;
						res.error = {
							response: "Gebruikers met de rol Admin hebben geen toegang tot de app."
						};
					}
				}
			}),
			catchError((err: AuthResponse) => {
				return of(err);
			})
		);
	}

	pinlogin(pincode: number): Observable<AuthResponse> {
		if (JSON.parse(localStorage.getItem("PIN_CODE_USER")).pin == pincode.toString()) {
			this.authSubject.next(true);
			return of(JSON.parse(localStorage.getItem("CURRENT_USER")));
		}
		else {
			return of({ username: "", token: "", role: "", name: "", status: 401, error: { response: "Pincode incorrect." } });
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