import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {IntakeMomentDetailInterface} from '../models/intake-moment-detail.interface';
import {environment} from '../../environments/environment';
import {ApiService} from './api/api.service';

@Injectable({
    providedIn: 'root'
})
export class IntakeMomentService {

    constructor(private http: HttpClient, private api: ApiService) {
    }

    getAllIntakeMoments(): Observable<IntakeMomentDetailInterface> {
        return this.api.getAllIntakeMoments(true);
    }

    getIntakeMomentById(id: any): Observable<IntakeMomentDetailInterface> {
        return this.http.get<IntakeMomentDetailInterface>(`${environment.apiServerAddress}` + '/intakeMoment/mobile/' + id);
    }

    setIntakeMomentMedicineCompletion(id: any, elem: any): Observable<any> {
        return this.api.setIntakeMomentMedicineCompletion(id, elem);
    }

    removeIntakeMomentMedicineCompletion(id: any, elem: any): Observable<any> {
        return this.http.request<any>('delete', `${environment.apiServerAddress}` + '/intakeMoment/mobile/' + id, {body: elem});
    }
}
