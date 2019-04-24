import {Component} from '@angular/core';
import {Platform, AlertController} from '@ionic/angular';
import {LocalNotifications, ELocalNotificationTriggerUnit} from '@ionic-native/local-notifications/ngx';

@Component({
    selector: 'app-notifications',
    templateUrl: 'notifications.page.html',
    styleUrls: ['notifications.page.scss']
})


export class NotificationsPage {
    history = [];


    constructor(private plt: Platform, private localNotifications: LocalNotifications, private alertCtrl: AlertController) {
        this.plt.ready().then(() => {
            this.localNotifications.on('click').subscribe(res => {
                const msg = res.data ? res.data.mydata : '';
                this.showAlert(res.title, res.text, msg);
            });
            this.localNotifications.on('trigger').subscribe(res => {
                const msg = res.data ? res.data.mydata : '';
                this.showAlert(res.title, res.text, msg);
            });
        });
    }

    // When tab is opened
    ionViewDidEnter() {
        this.loadHistory();
    }


    // Notification content
    scheduleNotification() {
        this.localNotifications.schedule({
            id: 1,
            title: 'Melding',
            text: 'Medicatie melding!',
            data: 'Pieter heeft medicatie nodig ' + this.getDate(),
            trigger: {in: 5, unit: ELocalNotificationTriggerUnit.SECOND},
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


    // Get current date for notification
    getDate() {
        const today = new Date();
        const date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
        const time = today.getHours() + ':' + today.getMinutes() + ':' + today.getSeconds();
        return date + '-' + time;
    }


    // Load history of notifications
    loadHistory() {
        this.localNotifications.getAll().then(res => {
            res.forEach(notification => {
                if (this.history.length === 0) {
                    this.history.push(notification);
                } else if (this.history[this.history.length - 1].data !== notification.data) {
                    this.history.push(notification);
                }
            });
        });
    }

// Remove notification history
    remove() {
        this.history = [];
    }
}
