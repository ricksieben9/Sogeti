import { Injectable } from '@angular/core';
import {AlertController, Platform} from '@ionic/angular';
import {ELocalNotificationTriggerUnit, LocalNotifications} from '@ionic-native/local-notifications/ngx';
import {FCM} from '@ionic-native/fcm/ngx';
import {Router} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  history = [];
  subscribeTopics = [];

  constructor(private plt: Platform, private localNotifications: LocalNotifications, private alertCtrl: AlertController, private fcm: FCM,
              private router: Router) {
    this.fcm.getToken().then(token => {
      console.log(token);
    });
    this.fcm.onTokenRefresh().subscribe(token => {
      console.log(token);
    });
    this.fcm.onNotification().subscribe(data => {
      console.log(data);
      if (data.wasTapped) {
        console.log('Received in background');
        this.router.navigateByUrl('/intakeMoment/' + data.id);
      } else {
        console.log('Received in foreground');
        this.router.navigateByUrl('/intakeMoment/' + data.id);
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

  subscribeToTopic(groupId) {
      this.fcm.subscribeToTopic(groupId);
  }
}
