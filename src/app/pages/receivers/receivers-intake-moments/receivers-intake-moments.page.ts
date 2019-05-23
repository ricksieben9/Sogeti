import { Component, OnInit } from '@angular/core';
import {NavController} from "@ionic/angular";
import {IntakeMomentService} from "../../../services/intake-moment/intake-moment.service";
import {ActivatedRoute} from "@angular/router";
import {ReceiverService} from "../../../services/receiver/receiver.service";

@Component({
  selector: 'app-receivers-intake-moments',
  templateUrl: './receivers-intake-moments.page.html',
  styleUrls: ['./receivers-intake-moments.page.scss'],
})
export class ReceiversIntakeMomentsPage implements OnInit {

  intakeMoments: any;
  receiverName: string;

  constructor(public navCtrl: NavController,
              private route: ActivatedRoute,
              private intakeMomentService: IntakeMomentService,
              private receiverService: ReceiverService) { }

  ngOnInit() {
    this.loadIntakeMoments();
  }

  private loadIntakeMoments() {
    const id = +this.route.snapshot.paramMap.get('id');
    this.receiverService.getReceiver(id).subscribe(res => {
      this.receiverName = res[0].name;
    });
    this.intakeMomentService.getAllIntakeMomentsOfReceiver(id).subscribe(res => {
      this.intakeMoments = res;
    });
  }

  openIntakeMoment(intake) {
    this.navCtrl.navigateForward('/intakeMoment/' + intake.id);
  }

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

  back() {
    this.navCtrl.navigateBack('/tabs/groups');
  }
}
