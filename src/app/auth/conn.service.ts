import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, map } from 'rxjs/operators';
import { of, Observable } from 'rxjs';

import { environment } from './../../environments/environment';

@Injectable({
    providedIn: 'root'
})

export class ConnService {

    private authServer = environment.apiServerAddress;

    constructor(private httpClient: HttpClient) { }

    isConnected() {
        return this.httpClient.get<boolean>(`${this.authServer}/conn`);
    }
}