import {Component} from '@angular/core';
import {NavController} from '@ionic/angular';
import {NotificationService} from '../../services/notification/notification.service';
import {IntakeMomentService} from '../../services/intake-moment/intake-moment.service';
import {IntakeMomentDetailInterface} from '../../models/intake-moment-detail.interface';

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


    // Notification page is opened
    ionViewWillEnter() {
        this.refresh();
    }


    // Get Intake moments cancel old schedules and schedule new notifications
    refresh() {
        this.loadIntakeMoments();
        this.notification.cancelAll();
        this.scheduleNotifications();
    }


    // Get intake moments from server
    loadIntakeMoments() {
        const add_minutes = function (dt, minutes) {
            return new Date(dt.getTime() + minutes * 60000);
        };
        this.intakeMomentService.getAllIntakeMoments().subscribe(res => {
            this.sortOnDate(res); // Sort result
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

    // Schedule local notifications to current device
    scheduleNotifications() {
        try {
            // Schedule all notifications to phone
            for (const notification of this.notifications) {
                this.notification.scheduleNotification(notification);
            }
        } catch (e) {
        }
    }


    // When Notification item is clicked
    openIntakeMoment(intake) {
        this.navCtrl.navigateForward('/intakeMoment/' + intake.id);
    }


    // Checks if Notification item is in the Past or Future
    checkDate(notification) {
        const notificationDate = new Date (notification.intake_start_time);
        if (notificationDate < new Date()) {
            return false;
        } else {
            return true;
        }
    }


    // Get time from intake_start_time string
    getTime(date?: Date) {
        return date != null ? date.getTime() : 0;
    }


    // Descending sort of notifications date
    sortOnDate(notifications) {
        notifications.sort((a: IntakeMomentDetailInterface, b: IntakeMomentDetailInterface) => {
             return this.getTime(new Date(b.intake_start_time)) - this.getTime(new Date(a.intake_start_time));
         });
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


    // Refresh intakeMoments/notifications when "Scroll to Refresh" is triggered
    doRefresh(event) {
        this.refresh();
        setTimeout(() => {
            event.target.complete();
        }, 2000);
    }
}
