import {Component} from '@angular/core';
import {ConnectionStatus, NetworkService} from '../../services/connection/network.service';

@Component({
  selector: 'NetworkComponent',
  templateUrl: './network.component.html',
  styleUrls: ['./network.component.scss'],
})
export class NetworkComponent {

  offline: boolean;
  constructor(private networkService: NetworkService) {
    this.offline = false;

    // subscribe to networkservice on networkchange set local bool to offline/online
    this.networkService.onNetworkChange().subscribe((status) => {
      if (status === ConnectionStatus.Offline) {
        this.offline = true;
      } else if (status === ConnectionStatus.Online) {
        this.offline = false;
      }
    });
  }
}
