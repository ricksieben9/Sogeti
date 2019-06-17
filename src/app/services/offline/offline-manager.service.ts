import {Injectable} from '@angular/core';
import {of, forkJoin} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {environment} from "../../../environments/environment";
import {tap} from "rxjs/operators";

const STORAGE_REQ_KEY = 'storedreq';

interface StoredRequest {
  url: string;
  type: string;
  data: any;
  time: number;
  id: string;
}

@Injectable({
  providedIn: 'root'
})
export class OfflineManagerService {

  constructor(private http: HttpClient) {}

   checkForEvents() {

    const requests: [] = JSON.parse(localStorage.getItem(STORAGE_REQ_KEY));
    // Send all requests and remove from local storage
    if (requests && requests.length > 0) {
      this.sendRequests(requests);
      localStorage.removeItem(STORAGE_REQ_KEY);
    } else {
      return of(false);
    }
  }

  storeRequest(url, type, data) {
    const action: StoredRequest = {
      url: url,
      type: type,
      data: data,
      time: new Date().getTime(),
      id: Math.random().toString(36).replace(/[^a-z]+/g, '').substr(0, 5)
    };

    let storedObj = JSON.parse(localStorage.getItem(STORAGE_REQ_KEY));

    if (storedObj) {
      storedObj.push(action);
    } else {
      storedObj = [action];
    }
    // Save old & new local transactions back to Storage
    localStorage.setItem(STORAGE_REQ_KEY, JSON.stringify(storedObj));

    return localStorage.getItem(STORAGE_REQ_KEY);
  }

  async sendRequests(operations: StoredRequest[]) {
    const obs = [];
    for (const op of operations) {
      if (op.type === 'PATCH') {
         const oneObs = this.http.patch(op.url, op.data).subscribe();
         obs.push(oneObs);
      } else if (op.type === 'DELETE') {
          const oneObs = this.http.request(op.type, op.url, {body: op.data}).subscribe();
          obs.push(oneObs);
      }
      // refresh token fires immediately after connection is established
      else if (op.url === `${environment.apiServerAddress}` + '/auth/refreshToken'){
        this.http.post(op.url, {username: op.data}).subscribe();
      }
    }

    // Send out all local events and return once they are finished
    return await forkJoin(obs);
  }
}
