import { Component, OnInit } from '@angular/core';
import { ConnService } from '../../auth/conn.service';


@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss']
})

export class TabsPage implements OnInit {

  private connected: boolean;

  constructor(private connService: ConnService){ }

  ngOnInit() {
    this.connService.isConnected().subscribe(res => {
      this.connected = res;
    },
    (err) => {
      this.connected = false;
    });
  }
}
