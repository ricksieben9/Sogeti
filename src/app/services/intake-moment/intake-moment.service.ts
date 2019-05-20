import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {IntakeMomentDetailInterface} from '../../models/intake-moment-detail.interface';
import {ApiService} from './../api/api.service';

@Injectable({
    providedIn: 'root'
})
export class IntakeMomentService {

    constructor(private api: ApiService) {
    }

    getAllIntakeMoments(): Observable<any> {
        return this.api.getAllIntakeMoments(true);
    }

    getIntakeMomentById(id: any): Observable<any> {
        return this.api.getIntakeMomentById(true, id);
    }

    setIntakeMomentMedicineCompletion(id: any, elem: any): Observable<any> {
        return this.api.setIntakeMomentMedicineCompletion(id, elem);
    }

    removeIntakeMomentMedicineCompletion(id: any, elem: any): Observable<any> {
        return this.api.removeIntakeMomentMedicineCompletion(id, elem);
    }
}
