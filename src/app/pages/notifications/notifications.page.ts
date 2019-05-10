import {Component} from '@angular/core';
import {NavController} from '@ionic/angular';
import {NotificationService} from '../../services/notification/notification.service';
import {IntakeMomentService} from '../../services/intake-moment/intake-moment.service';

@Component({
    selector: 'app-notifications',
    templateUrl: 'notifications.page.html',
    styleUrls: ['notifications.page.scss']
})


export class NotificationsPage {

   notifications: any;


    constructor(public navCtrl: NavController, private notification: NotificationService,
                private intakeMomentService: IntakeMomentService) {

        this.loadIntakeMoments();
        this.scheduleNotifications();
    }



    loadIntakeMoments() {
        const add_minutes = function (dt, minutes) {
            return new Date(dt.getTime() + minutes * 60000);
        };
        this.intakeMomentService.getAllIntakeMoments().subscribe(res => {
            this.notifications = res;
        }, error => {
        }, () => {
            for (const data of this.notifications) {
                const event = {
                    id: data.id,
                    title: data.receiver_id.name,
                    startTime: new Date(data.intake_start_time),
                    endTime: add_minutes(new Date(data.intake_start_time), 30),
                    desc: data.remark
                };
            }
        });
    }

    scheduleNotifications() {
        try {
            // Schedule all notifications to phone
            for (const notification of this.notifications) {
                this.notification.scheduleNotification(notification);
            }
        } catch (e) {
        }
    }

    openIntakeMoment(intake) {
        this.navCtrl.navigateForward('/intakeMoment/' + intake.id);
    }
}
