import { Injectable } from '@angular/core';
import {ApiService} from "../api/api.service";
import {Observable} from "rxjs";
import {GroupDetailInterface} from "../../models/group-detail.interface";

@Injectable({
  providedIn: 'root'
})
export class GroupService {

  constructor(private api: ApiService) {
  }

  getGroupsOfDispenser(): Observable<GroupDetailInterface> {
    return this.api.getGroupsOfDispenser(true);
  }
}
