import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {ApplicationDetailInterface} from '../models/application.detail.interface';
import {environment} from '../../environments/environment';

@Injectable({
    providedIn: 'root'
})
export class ApplicationService {

    constructor(private http: HttpClient) {
    }

    getAllApplication(): Observable<ApplicationDetailInterface> {
        return this.http.get<ApplicationDetailInterface>(`${environment.apiServerAddress}` + '/application/');
    }

    getApplicationById(id: any): Observable<ApplicationDetailInterface> {
        return this.http.get<ApplicationDetailInterface>(`${environment.apiServerAddress}` + '/application/' + id);
    }

    setApplicationCompletion(id: any, elem: any): Observable<any> {
        return this.http.patch<any>(`${environment.apiServerAddress}` + '/application/' + id, elem);
    }

    removeApplicationCompletion(id: any, elem: any): Observable<any> {
        return this.http.request<any>('delete', `${environment.apiServerAddress}` + '/application/' + id, {body: elem});
    }
}
