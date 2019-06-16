import {OfflineManagerService} from '../offline/offline-manager.service';
import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {ConnectionStatus, NetworkService} from '../connection/network.service';
import {from, of} from 'rxjs';
import {catchError, map, tap} from 'rxjs/operators';
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
    getAllIntakeMoments(forceRefresh: boolean = false) {

        if (this.networkService.getCurrentNetworkStatus() === ConnectionStatus.Offline || !forceRefresh) {
            // Return the cached data from Storage
            return of(JSON.parse(this.getLocalData('intakeMoments')));
        } else {
            // Return real API data and store it locally
            return this.http.get(`${this.API_URL}/intakeMoment/mobile/`).pipe(
                tap(res => {
                    this.setLocalData('intakeMoments', JSON.stringify(res));
                })
            );
        }
    }

    getAllIntakeMomentsOfReceiver(id: number, forceRefresh: boolean = false)  {

        if (this.networkService.getCurrentNetworkStatus() === ConnectionStatus.Offline || !forceRefresh) {
            // prepare the cached data from Storage
            const groups = JSON.parse(this.getLocalData('groups'));
            let moments = [];
            groups.forEach(function (group) {
                group.receivers.some(function (receiver) {
                    if (receiver.id === id) {
                        moments = receiver.intakeMoments;
                    }
                });
            });
            return of(moments);
        } else {
            // Return real API data and store it locally
            return this.http.get(`${this.API_URL}/intakeMoment/receiver/` + id).pipe(
                tap(res => {
                    const groups = JSON.parse(this.getLocalData('groups'));
                    groups.forEach(function (group) {
                        group.receivers.some(function (receiver) {
                            if (receiver.id === id) {
                                receiver.intakeMoments = res;
                            }
                        });
                    });
                    this.setLocalData('groups', JSON.stringify(groups));
                })
            );
        }
    }

  getIntakeMomentById(forceRefresh: boolean = false, id: any) {
      if (this.networkService.getCurrentNetworkStatus() === ConnectionStatus.Offline || !forceRefresh) {
          // Return the cached data from Storage
          return of(JSON.parse(this.getLocalData('intakeMoments'))).pipe(
              map(moments => moments.filter(moment => moment.id.toString() === id))
          );
      } else {
          // Return real API data
          return this.http.get(`${this.API_URL}/intakeMoment/mobile/` + id);
      }
  }

  setIntakeMomentMedicineCompletion(id: any, elem: any) {
    const url = `${environment.apiServerAddress}` + '/intakeMoment/mobile/' + id;
    if (this.networkService.getCurrentNetworkStatus() === ConnectionStatus.Offline) {
        // change locally stored intakemoments
        this.setIntakeMomentStatusOffline(id, elem);

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
        // change locally stored intakemoments
        this.setIntakeMomentStatusOffline(id, elem);

        // save api call
      return from(this.offlineManager.storeRequest(url, 'DELETE', elem));
    } else {
      // Return real API data
      return this.http.request<any>('delete', url, {body: elem});
    }
  }

    setIntakeMomentStatusOffline(id: any, elem: any) {
        const intakeMomentObservable = this.getIntakeMomentById(false, id);
        let intakeMomentMedicines = [];

        intakeMomentObservable.subscribe(
            data => {
                intakeMomentMedicines = (data[0].intake_moment_medicines[0].dosage !== null ? data[0].intake_moment_medicines : null);
                intakeMomentMedicines.forEach(function(medicine) {
                    if (medicine.medicine_id.id === elem.medicine_id.id) {
                        medicine.completed_at = elem.completed_at;
                    }
                });
            },
            error => {
                console.log(error);
            }, () => {
                const moments = JSON.parse(this.getLocalData('intakeMoments'));

                moments.forEach(function (moment) {
                    if (moment.id.toString() === id) {
                        moment.intake_moment_medicines = intakeMomentMedicines;
                    }
                });
                this.setLocalData('intakeMoments', JSON.stringify(moments));
            }
        );
    }
    // endregion

    // region groups
    getGroupsOfDispenser(forceRefresh: boolean = false)  {

        if (this.networkService.getCurrentNetworkStatus() === ConnectionStatus.Offline || !forceRefresh) {
            // Return the cached data from Storage
            return of(this.getLocalData('groups'));
        } else {
            // Return real API data and store it locally
            return this.http.get(`${this.API_URL}/group/mobile/`).pipe(
                tap(res => {
                    this.setLocalData('groups', JSON.stringify(res));
                })
            );
        }
    }
    // endregion

    // region receivers
    getReceiver(id: number, forceRefresh: boolean = false)  {

        if (this.networkService.getCurrentNetworkStatus() === ConnectionStatus.Offline || !forceRefresh) {
            // Return the cached data from Storage
            return of(JSON.parse(this.getLocalData('groups'))).pipe(
                map(group => group.map(g => g.receivers.filter(receiver => receiver.id === id)[0]))
            );

        } else {
            // Return real API data
            return this.http.get(`${this.API_URL}/receiver/` + id);
        }
    }
    // endregion

  // Save result of API requests
  private setLocalData(key, data) {
    localStorage.setItem(key, data);
  }

  // Get cached API result
  private getLocalData(key) {
    return localStorage.getItem(key);
  }
}
