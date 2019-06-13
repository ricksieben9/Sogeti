import {Injectable} from '@angular/core';
import {AlertController, Platform} from '@ionic/angular';
import {FCM} from '@ionic-native/fcm/ngx';
import {Router} from '@angular/router';
import {GroupService} from '../group/group.service';
import { LocalNotifications } from '@ionic-native/local-notifications/ngx';
import {formatDate} from '@angular/common';

@Injectable({
    providedIn: 'root'
})
export class NotificationService {

    constructor(private plt: Platform, private localNotifications: LocalNotifications, private alertCtrl: AlertController, private fcm: FCM,
                private router: Router, private groupService: GroupService) {
        // On load subscribe to FCM topics
        this.subscribeToGroups(this.fcm);
        // Subscribe on push notifications
        this.fcm.onNotification().subscribe(data => {
            if (data.wasTapped) {
                // Do if app is in background/closed
                this.router.navigateByUrl('/intakeMoment/' + data.id);
            } else {
                // Do if app is on foreground
                this.showAlert('Toedienmoment overtijd!', 'Waarschuwing',
                    'De toedienmoment van ' + data.name + ' op ' + formatDate(data.time, 'dd-MM-yyyy', 'en-US') + ' is overtijd!');
            }
        });
    }

    // Notification content
    scheduleNotification(notification) {
        this.localNotifications.schedule({
            id: notification.id,
            title: 'Melding',
            text: 'Medicatie melding!',
            data: '',
            trigger: {at: new Date(notification.intake_start_time)},
            foreground: true,
            wakeup: true,
            priority: 2,
            vibrate: true,
            launch: true,
            silent: false
        });
    }


    // When notification is clicked
    showAlert(header, sub, msg) {
        this.alertCtrl.create({
            header: header,
            subHeader: sub,
            message: msg,
            buttons: ['Ok'],
        }).then(alert => alert.present());
    }

    cancelAll() {
        this.localNotifications.cancelAll();
    }

    subscribeToGroups(fcm: FCM) {
        // Get old groups if exist
        let subscribeTopics = JSON.parse(localStorage.getItem('subscribeTopics'));
        // Unsubscribe from old group(s)
        if (subscribeTopics) {
            subscribeTopics.forEach(function (t) {
                fcm.unsubscribeFromTopic('Group' + t);
            });
            localStorage.removeItem('subscribeTopics');
        }
        // Subscribe to topic (Group)
        this.groupService.getGroupsOfDispenser().subscribe(
            data => {
                subscribeTopics = data;
            },
            error => {
                console.log(error);
            },
            () => {
                subscribeTopics = subscribeTopics.map(function (t) {
                    fcm.subscribeToTopic('Group' + t.id);
                    return t.id;
                });
                localStorage.setItem('subscribeTopics', JSON.stringify(subscribeTopics));
            });
    }
}
