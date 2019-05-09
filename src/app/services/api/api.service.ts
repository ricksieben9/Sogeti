import { OfflineManagerService } from '../offline/offline-manager.service';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { NetworkService, ConnectionStatus } from '../connection/network.service';
import { Storage } from '@ionic/storage';
import {Observable, from, of} from 'rxjs';
import { tap, map, catchError } from 'rxjs/operators';
import {environment} from '../../../environments/environment';
import {AuthResponse} from '../../models/auth-response';
import {Request} from '../../models/request';



@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private API_STORAGE_KEY = 'specialkey';
  private API_URL = environment.apiServerAddress;

  constructor(private http: HttpClient, private networkService: NetworkService, private storage: Storage,
              private offlineManager: OfflineManagerService) { }

  login(req: Request): Observable<AuthResponse>  {
    return this.http.post(`${this.API_URL}/auth/login`, req).pipe(
        tap((res: AuthResponse) => {
          if (res) {
            res.status = 200;
            if (res.role.toLowerCase() !== 'admin') {
              localStorage.setItem('CURRENT_USER', JSON.stringify(res));
              // this.authSubject.next(true);
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



  // Save result of API requests
  private setLocalData(key, data) {
    localStorage.set(`${this.API_STORAGE_KEY}-${key}`, data);
  }

  // Get cached API result
  private getLocalData(key) {
    return localStorage.get(`${this.API_STORAGE_KEY}-${key}`);
  }
}
