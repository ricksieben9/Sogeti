import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import {timeout} from 'rxjs/operators';

export enum ConnectionStatus {
  Online,
  Offline
}

@Injectable({
  providedIn: 'root'
})
export class NetworkService {

  private status: BehaviorSubject<ConnectionStatus> = new BehaviorSubject(ConnectionStatus.Offline);

  constructor(private httpClient: HttpClient) {
    this.status.next(ConnectionStatus.Online);
    }

    checkConnection() {
      this.httpClient.get(environment.apiServerAddress + '/connection').pipe(timeout(5000)).subscribe(
          data => this.status.next(ConnectionStatus.Online),
          error => this.status.next(ConnectionStatus.Offline));
    }

  onNetworkChange(): Observable<ConnectionStatus> {
    return this.status.asObservable();
  }

  public getCurrentNetworkStatus(): ConnectionStatus {
    return this.status.getValue();
  }
}
