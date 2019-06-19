import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {NavController} from '@ionic/angular';
import {MedicineService} from '../../services/medicine/medicine.service';

@Component({
    selector: 'app-medicine-detail',
    templateUrl: './medicine-detail.page.html',
    styleUrls: ['./medicine-detail.page.scss'],
})
export class MedicineDetailPage implements OnInit {
    Id = null;
    medicineDetail;

    constructor(private activatedRoute: ActivatedRoute,
                private medicineService: MedicineService, private navCtrl: NavController) {
    }

    ngOnInit() {
        this.Id = this.activatedRoute.snapshot.paramMap.get('id');
        this.getMedicineDetail();
    }

    getMedicineDetail() {
        const medicineDetailObservable = this.medicineService.getMedicineById(this.Id);
        if (medicineDetailObservable) {
            medicineDetailObservable.subscribe(
                data => {
                    this.medicineDetail = data[0];
                },
                error => {
                    console.log(error);
                }
            );
        }
    }
}
