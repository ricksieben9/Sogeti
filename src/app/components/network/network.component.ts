import {Component} from '@angular/core';
import {ConnectionStatus, NetworkService} from '../../services/connection/network.service';
import {OfflineManagerService} from '../../services/offline/offline-manager.service';

@Component({
  selector: 'NetworkComponent',
  templateUrl: './network.component.html',
  styleUrls: ['./network.component.scss'],
})
export class NetworkComponent {

  offline: boolean;

  constructor(private networkService: NetworkService,  private offlineManager: OfflineManagerService) {
    this.offline = false;

    // Subscribe to networkservice on networkchange set local bool to offline/online
    this.networkService.onNetworkChange().subscribe((status) => {
      if (status === ConnectionStatus.Offline) {
        this.offline = true;
      } else if (status === ConnectionStatus.Online) {
        this.offline = false;
        this.offlineManager.checkForEvents();
      }
    });
  }
}
