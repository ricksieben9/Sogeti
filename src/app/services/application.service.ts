import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import { ApplicationDetailInterface } from '../models/application.detail.interface';

@Injectable({
  providedIn: 'root'
})
export class ApplicationService {

  constructor(private http: HttpClient) { }

  getApplicationById(id: any): Observable<ApplicationDetailInterface> {
    return this.http.get<ApplicationDetailInterface>('http://localhost:3000/application/' + id);
  }
  setApplicationCompletion(id: any, elem: any): Observable<any> {
    return this.http.patch<any>('http://localhost:3000/application/' + id, elem);
  }
  removeApplicationCompletion(id: any, elem: any): Observable<any> {
    console.log(elem);
    return this.http.request<any>('delete', 'http://localhost:3000/application/' + id, {body: elem});
  }
}
