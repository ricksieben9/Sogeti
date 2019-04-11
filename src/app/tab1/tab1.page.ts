import { Component } from '@angular/core';
import { Platform, AlertController } from '@ionic/angular';
import { LocalNotifications, ELocalNotificationTriggerUnit } from '@ionic-native/local-notifications/ngx';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {
  scheduled = [];

constructor(private plt: Platform, private localNotifications: LocalNotifications, 
    private alertCtrl: AlertController){
      this.plt.ready().then(() =>{
        this.localNotifications.on('click').subscribe(res => {
          console.log('click: ', res);
          let msg = res.data ? res.data.mydata : '';
          this.showAlert(res.title, res.text, msg);
        });

        this.localNotifications.on('trigger').subscribe(res => {
          console.log('trigger: ', res);
          let msg = res.data ? res.data.mydata : '';
          this.showAlert(res.title, res.text, msg);
        });
      })
}
scheduleNotification(){
  this.localNotifications.schedule({
    id: 1,
    title: 'Let op!',
    text: 'Pieter heeft medicatie nodig',
    data: { mydata: 'My hidden message is this'},
    trigger: { in: 5, unit: ELocalNotificationTriggerUnit.SECOND },
    //foreground: true
  });
}

recurringNotification(){
  this.localNotifications.schedule({
    id: 22,
    title: 'Recurring ',
    text: 'Heeft Peter zijn medicatie ingenomen?',
    trigger: { every: ELocalNotificationTriggerUnit.MINUTE }
  });
}

repeatingDaily(){
  this.localNotifications.schedule({
    id: 42,
    title: 'Goede Morgen ',
    text: 'Tijd om medicatie te geven',
    trigger: { every: { hour: 9, minute: 25} }
  });
}

getAll(){
  this.localNotifications.getAll().then(res => {
    this.scheduled = res;
  });
}

showAlert(header, sub, msg){
  this.alertCtrl.create({
    header: header,
    subHeader: sub,
    message: msg,
    buttons: ['Ok']
  }).then(alert => alert.present());
}

}
