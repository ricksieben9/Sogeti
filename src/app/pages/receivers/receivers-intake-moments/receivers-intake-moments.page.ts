import {Component} from '@angular/core';
import {NavController} from '@ionic/angular';
import {IntakeMomentService} from '../../../services/intake-moment/intake-moment.service';
import {ActivatedRoute} from '@angular/router';
import {ReceiverService} from '../../../services/receiver/receiver.service';
import {IntakeMomentDetailInterface} from "../../../models/intake-moment-detail.interface";

@Component({
  selector: 'app-receivers-intake-moments',
  templateUrl: './receivers-intake-moments.page.html',
  styleUrls: ['./receivers-intake-moments.page.scss'],
})

export class ReceiversIntakeMomentsPage {

  intakeMoments: any;
  receiverName: string;

  constructor(public navCtrl: NavController,
              private route: ActivatedRoute,
              private intakeMomentService: IntakeMomentService,
              private receiverService: ReceiverService) {}

  ionViewWillEnter() {
    this.loadIntakeMoments();
  }

  // Get intakemoments of receiver from service
  private loadIntakeMoments() {
    const id = +this.route.snapshot.paramMap.get('id');
    this.receiverService.getReceiver(id).subscribe(res => {
      this.receiverName = res[0].name;
    });
    this.intakeMomentService.getAllIntakeMomentsOfReceiver(id).subscribe(res => {
      this.sortOnDate(res);
      this.intakeMoments = res;
    });
  }

  // Descending sort of intakemoments on date
  sortOnDate(intakemoments) {
    if (intakemoments) {
      intakemoments.sort((a: IntakeMomentDetailInterface, b: IntakeMomentDetailInterface) => {
        return this.getTime(new Date(b.intake_start_time)) - this.getTime(new Date(a.intake_start_time));
      });
    }
  }

  // Get time from intake_start_time string
  getTime(date?: Date) {
    return date != null ? date.getTime() : 0;
  }

  // Navigate to intakemoment detail page
  openIntakeMoment(intake) {
    this.navCtrl.navigateForward('/intakeMoment/' + intake.id);
  }

  // Check if date is today or later
  checkDate(intakeMoment) {
    const intakeMomentDate = new Date (intakeMoment.intake_start_time);
    return intakeMomentDate >= new Date();
  }

  // Checks if all medicines are given of a certain intake moment
  isFinished(intakeMoment) {
    let finished = true;
    for (const medicine of intakeMoment.intake_moment_medicines) {
      if (medicine.completed_at == null) {
        finished = false;
      }
    }
    return finished;
  }

  // Navigate back to group page
  back() {
    this.navCtrl.navigateBack('/tabs/groups');
  }
}
