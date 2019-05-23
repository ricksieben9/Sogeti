import { OfflineManagerService } from '../offline/offline-manager.service';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { NetworkService, ConnectionStatus } from '../connection/network.service';
import { from, of} from 'rxjs';
import { tap, map, catchError } from 'rxjs/operators';
import {environment} from '../../../environments/environment';
import {AuthResponse} from '../../models/auth-response';
import {Request} from '../../models/request';



@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private API_URL = environment.apiServerAddress;

  constructor(private http: HttpClient, private networkService: NetworkService,
              private offlineManager: OfflineManagerService) { }

  login(req: Request) {
    return this.http.post(`${this.API_URL}/auth/login`, req).pipe(
        tap((res: AuthResponse) => {
          if (res) {
            res.status = 200;
            if (res.role.toLowerCase() !== 'admin') {
              localStorage.setItem('CURRENT_USER', JSON.stringify(res));
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


    // region IntakeMoments
    getAllIntakeMoments(forceRefresh: boolean = false)  {

        if (this.networkService.getCurrentNetworkStatus() === ConnectionStatus.Offline || !forceRefresh) {
            // Return the cached data from Storage
            return from(this.getLocalData('intakeMoments'));
        } else {
            // Return real API data and store it locally
            return this.http.get(`${this.API_URL}/intakeMoment/mobile/`).pipe(
                tap(res => {
                    this.setLocalData('intakeMoment', JSON.stringify(res));
                })
            );
        }
    }

    getAllIntakeMomentsOfReceiver(id: number, forceRefresh: boolean = false)  {

        if (this.networkService.getCurrentNetworkStatus() === ConnectionStatus.Offline || !forceRefresh) {
            // Return the cached data from Storage
            return from(this.getLocalData('intakeMoments/receiver/' +id));
        } else {
            // Return real API data and store it locally
            return this.http.get(`${this.API_URL}/intakeMoment/receiver/`+id).pipe(
                tap(res => {
                    this.setLocalData('intakeMoments/receiver/'+id, JSON.stringify(res));
                })
            );
        }
    }

  getIntakeMomentById(forceRefresh: boolean = false, id: any) {
      if (this.networkService.getCurrentNetworkStatus() === ConnectionStatus.Offline || !forceRefresh) {
          // Return the cached data from Storage

          // return from(this.getLocalData('intakeMoments'));
      } else {
          // Return real API data and store it locally
          return this.http.get(`${this.API_URL}/intakeMoment/mobile/` + id).pipe(
              tap(res => {
                //  this.setLocalData('intakeMoment', JSON.stringify(res));
              })
          );
      }
  }

  setIntakeMomentMedicineCompletion(id: any, elem: any) {
    const url = `${environment.apiServerAddress}` + '/intakeMoment/mobile/' + id;
    if (this.networkService.getCurrentNetworkStatus() === ConnectionStatus.Offline) {
      // save api call
      return from(this.offlineManager.storeRequest(url, 'PATCH', elem));
    } else {
      // Return real API data
       return this.http.patch(url, elem);
    }
  }

  removeIntakeMomentMedicineCompletion(id: any, elem: any) {
    const url = `${environment.apiServerAddress}` + '/intakeMoment/mobile/' + id;
    if (this.networkService.getCurrentNetworkStatus() === ConnectionStatus.Offline) {
      // save api call
      return from(this.offlineManager.storeRequest(url, 'DELETE', elem));
    } else {
      // Return real API data
      return this.http.request<any>('delete', url, {body: elem});
    }
  }
    // endregion

    //region groups

    getGroupsOfDispenser(forceRefresh: boolean = false)  {

        if (this.networkService.getCurrentNetworkStatus() === ConnectionStatus.Offline || !forceRefresh) {
            // Return the cached data from Storage
            return from(this.getLocalData('groups'));
        } else {
            // Return real API data and store it locally
            return this.http.get(`${this.API_URL}/group/mobile/`).pipe(
                tap(res => {
                    this.setLocalData('groups', JSON.stringify(res));
                })
            );
        }
    }

    //end region

    //region receivers
    getReceiver(id:number, forceRefresh: boolean = false)  {

        if (this.networkService.getCurrentNetworkStatus() === ConnectionStatus.Offline || !forceRefresh) {
            // Return the cached data from Storage
            return of(JSON.parse(this.getLocalData('groups'))).pipe(
                map(group => group.map(group => group.receivers.filter(receiver => receiver.id === id)[0]))
            );

        } else {
            // Return real API data
            return this.http.get(`${this.API_URL}/receiver/`+id);
        }
    }
    //end region

  // Save result of API requests
  private setLocalData(key, data) {
    localStorage.setItem(key, data);
  }

  // Get cached API result
  private getLocalData(key) {
      return localStorage.getItem(key);
  }
}
