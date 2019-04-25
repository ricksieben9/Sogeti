import { Component } from '@angular/core';
import { Platform, AlertController } from '@ionic/angular';
import { LocalNotifications, ELocalNotificationTriggerUnit } from '@ionic-native/local-notifications/ngx';

@Component({
  selector: 'app-tab1',
  templateUrl: 'notifications.page.html',
  styleUrls: ['notifications.page.scss']
})
export class NotificationsPage {
  scheduled = [];

  constructor(private plt: Platform, private localNotifications: LocalNotifications,
    private alertCtrl: AlertController) {
    this.plt.ready().then(() => {
      this.localNotifications.on('click').subscribe(res => {
        let msg = res.data ? res.data.mydata : '';
        this.showAlert(res.title, res.text, msg);
      });

      this.localNotifications.on('trigger').subscribe(res => {
        let msg = res.data ? res.data.mydata : '';
        this.showAlert(res.title, res.text, msg);
      });
    })
  }
  scheduleNotification() {
    this.localNotifications.schedule({
      id: 1,
      title: 'Melding',
      text: 'Medicatie melding!',
      data: 'Pieter heeft medicatie nodig ' + this.getDate(),
      trigger: { in: 5, unit: ELocalNotificationTriggerUnit.SECOND },
      foreground: true
    });
  }

  recurringNotification() {
    this.localNotifications.schedule({
      id: 2,
      title: 'Herrinnering',
      text: 'Medicatie herinnering!',
      data: 'Heeft Peter zijn medicatie ingenomen? ' + this.getDate(),
      trigger: { every: ELocalNotificationTriggerUnit.MINUTE },
      foreground: true
    });
  }

  repeatingDaily() {
    this.localNotifications.schedule({
      id: 3,
      title: 'Melding',
      text: 'Medicatie melding!',
      data: 'Pieter heeft medicatie nodig ' + this.getDate(),
      trigger: { every: { hour: 13, minute: 20 } },
      foreground: true
    });
  }


  showAlert(header, sub, msg) {
    this.alertCtrl.create({
      header: header,
      subHeader: sub,
      message: msg,
      buttons: ['Ok']
    }).then(alert => alert.present());
  }

  getDate() {

    var today = new Date();
    var date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
    var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();

    return date + '-' + time;

  }

  getAll() {
    this.localNotifications.getAll().then(res => {
      this.scheduled = res;
    });
  }

  ionViewDidEnter() {
    this.getAll();
  }

  removeAll() {
    this.scheduled = [];
  }

}
