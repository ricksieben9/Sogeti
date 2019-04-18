import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { of } from 'rxjs';

import { environment } from './../../environments/environment';

@Injectable({
	providedIn: 'root'
})

export class ConnService{

    private authServer = environment.apiServerAddress;

    constructor(private httpClient: HttpClient) { }

    isConnected(): boolean{
        this.httpClient.get<boolean>(`${this.authServer}/auth/check-connection`).pipe(
            catchError((err) => {
                return of(false);
            })
        ).subscribe((res) => {
            return res;
        });
        return false;
    }
}