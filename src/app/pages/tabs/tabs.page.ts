import { Component } from '@angular/core';
import { ConnService } from '../../auth/conn.service';
import { timer } from 'rxjs';


@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss']
})

export class TabsPage {

  private connected: boolean;
  private timeSinceConnected: number;
  private timeSinceDisconnected: number;

  constructor(private connService: ConnService){
    timer(1000, 3000).subscribe(val => {
      this.getConnectedState();
    });

  }

  getConnectedState() {
    this.connService.isConnected().subscribe(res => {
      if(this.connected == false){
        this.timeSinceConnected = Date.now();
        console.log(this.timeSinceConnected);
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
