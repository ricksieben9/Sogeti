import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {IntakeMomentDetailInterface} from '../models/intake-moment-detail.interface';
import {environment} from '../../environments/environment';

@Injectable({
    providedIn: 'root'
})
export class IntakeMomentService {

    constructor(private http: HttpClient) {
    }

    getAllIntakeMoments(): Observable<IntakeMomentDetailInterface> {
        return this.http.get<IntakeMomentDetailInterface>(`${environment.apiServerAddress}` + '/intakeMoment/mobile/');
    }

    getIntakeMomentById(id: any): Observable<IntakeMomentDetailInterface> {
        return this.http.get<IntakeMomentDetailInterface>(`${environment.apiServerAddress}` + '/intakeMoment/mobile/' + id);
    }

    setIntakeMomentMedicineCompletion(id: any, elem: any): Observable<any> {
        return this.http.patch<any>(`${environment.apiServerAddress}` + '/intakeMoment/mobile/' + id, elem);
    }

    removeIntakeMomentMedicineCompletion(id: any, elem: any): Observable<any> {
        return this.http.request<any>('delete', `${environment.apiServerAddress}` + '/intakeMoment/mobile/' + id, {body: elem});
    }
}
