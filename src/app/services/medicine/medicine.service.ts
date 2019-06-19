import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {ApiService} from '../api/api.service';

@Injectable({
  providedIn: 'root'
})
export class MedicineService {

  constructor(private api: ApiService) { }

  getMedicineById(id: any): Observable<any> {
    return this.api.getMedicineById(true, id);
  }
}
