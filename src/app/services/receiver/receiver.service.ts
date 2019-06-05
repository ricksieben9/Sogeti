import { Injectable } from '@angular/core';
import {ApiService} from "../api/api.service";
import {Observable} from "rxjs";
import {ReceiverDetailInterface} from "../../models/receiver-detail.interface";

@Injectable({
  providedIn: 'root'
})
export class ReceiverService {

  constructor(private api: ApiService) { }

  public getReceiver(id:number): Observable<ReceiverDetailInterface>
  {
    return this.api.getReceiver(id,true);
  }
}
