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

    // Descending sort of notifications date
    sortOnDate(notifications) {
        notifications.sort((a, b) => {
            return this.getTime(new Date(b.intake_start_time)) - this.getTime(new Date(a.intake_start_time));
        });
    }

    // Get time from intake_start_time string
    getTime(date?: Date) {
        return date != null ? date.getTime() : 0;
    }
}
