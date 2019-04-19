import { Component } from '@angular/core';
import { ConnService } from '../../auth/conn.service';
import { timer } from 'rxjs';
import { LocalNotifications } from '@ionic-native/local-notifications/ngx';


@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss']
})

export class TabsPage {

  private connected: boolean = false;
  private timeSinceConnected: number;
  private timeSinceDisconnected: number;

  constructor(private connService: ConnService, private localNotifications: LocalNotifications){

    timer(1, 3000).subscribe(val => {
      this.getConnectedState();
    });

  }

  getConnectedState() {
    this.connService.isConnected().subscribe(res => {
      if(this.connected == false){
        this.timeSinceConnected = Date.now();
        console.log(this.timeSinceConnected);

        this.localNotifications.schedule({
          id: 1,
          text: "U bent nu verbonden met de server",
          sound: 'file"://beep.caf'
        });
      }
      this.connected = res;
    },
      (err) => {
        if(this.connected){
          this.timeSinceDisconnected = Date.now();
          console.log(this.timeSinceDisconnected);
        }
        this.connected = false;
      });
  }
}
