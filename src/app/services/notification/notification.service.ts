import { Injectable } from '@angular/core';
import {AlertController, Platform} from '@ionic/angular';
import {ELocalNotificationTriggerUnit, LocalNotifications} from '@ionic-native/local-notifications/ngx';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  history = [];

  constructor(private plt: Platform, private localNotifications: LocalNotifications, private alertCtrl: AlertController) { }

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
}
