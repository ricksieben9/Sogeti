import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {IntakeMomentService} from '../../services/intake-moment/intake-moment.service';
import {NavController} from '@ionic/angular';

@Component({
    selector: 'app-intake-moment-detail',
    templateUrl: './intake-moment-detail.page.html',
    styleUrls: ['./intake-moment-detail.page.scss'],
})
export class IntakeMomentDetailPage implements OnInit {
    Id = null;
    intakeMomentMedicines = [];
    intakeMomentDetail;
    range;

    constructor(private activatedRoute: ActivatedRoute,
                private intakeMomentService: IntakeMomentService, private navCtrl: NavController) {
    }


    ngOnInit() {
        this.Id = this.activatedRoute.snapshot.paramMap.get('id');
        this.getIntakeMomentDetail();
    }

    getIntakeMomentDetail() {
        const intakeMomentObservable = this.intakeMomentService.getIntakeMomentById(this.Id);
        if (intakeMomentObservable) {
            intakeMomentObservable.subscribe(
                data => {
                    this.intakeMomentMedicines = (data[0].intake_moment_medicines[0].dosage !== null ? data[0].intake_moment_medicines : null);
                    this.intakeMomentDetail = data[0];
                },
                error => {
                    console.log(error);
                });
        }
    }

    submit() {
        this.intakeMomentMedicines.forEach((elem) => {
            if (elem.checked) {
                elem.completed_at = new Date();
                delete (elem.checked);
                this.intakeMomentService.setIntakeMomentMedicineCompletion(this.Id, elem).subscribe();
            }
        });
    }

    delete(item) {
        item.completed_at = null;
        this.intakeMomentService.removeIntakeMomentMedicineCompletion(this.Id, item).subscribe();
    }

    canSend(): boolean {
        this.range = this.intakeMomentMedicines.filter(elem =>  elem.checked === true).length + '/'
            + this.intakeMomentMedicines.filter(elem => elem.completed_at === null).length;
        return this.intakeMomentMedicines.filter(elem => elem.completed_at === null).length === 0;
    }

    isDone(): boolean {
        return this.intakeMomentMedicines.filter(elem => elem.completed_at !== null).length > 0;
    }

    isEnabled(): boolean {
        return this.intakeMomentMedicines.filter(elem => elem.checked === true).length > 0;
    }

    forward(id) {
        this.navCtrl.navigateForward('/medicine-detail/' + id);
    }
}
