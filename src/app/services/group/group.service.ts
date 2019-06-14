import {Injectable} from '@angular/core';
import {ApiService} from '../api/api.service';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GroupService {

  constructor(private api: ApiService) {}

  getGroupsOfDispenser(): Observable<any> {
    return this.api.getGroupsOfDispenser(true);
  }
}
