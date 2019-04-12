import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/operators';
import { Observable, BehaviorSubject } from 'rxjs';

import { Storage } from '@ionic/storage';
import { User } from './user';
import { AuthResponse } from './auth-response';

@Injectable({
	providedIn: 'root'
})
export class AuthService {

	AUTH_SERVER_ADDRESS: string = 'http://localhost:3000';
	authSubject = new BehaviorSubject(false);

	constructor(private httpClient: HttpClient, private storage: Storage) {
	}

	login(user: User): Observable<AuthResponse> {
		return this.httpClient.post(`${this.AUTH_SERVER_ADDRESS}/auth/login`, user).pipe(
			tap(async (res: AuthResponse) => {
				if (res) {
					await this.storage.set("ACCESS_TOKEN", res.token);
					this.authSubject.next(true);
				}
			})
		);
	}

	async logout() {
		await this.storage.remove("ACCESS_TOKEN");
		this.authSubject.next(false);
	}

	isLoggedIn() {
		return this.authSubject.asObservable();
	}
}