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
    syncTime: Date;

    constructor(private networkService: NetworkService, private offlineManager: OfflineManagerService) {
        this.offline = false;
        this.syncTime = this.getTime();

        // subscribe to networkservice on networkchange set local bool to offline/online
        this.networkService.onNetworkChange().subscribe((status) => {
            if (status === ConnectionStatus.Offline) {
                this.offline = true;
                this.syncTime = this.getTime();
            } else if (status === ConnectionStatus.Online) {
                this.offline = false;
                this.offlineManager.checkForEvents();
                if (localStorage.getItem('syncTime')) {
                    localStorage.removeItem('syncTime');
                }
            }
        });
    }

    // Get and save time when offline
    getTime() {
        let d: Date;
        if (localStorage.getItem('syncTime') === null) {
            d = new Date();
            localStorage.setItem('syncTime', d.toString());
        } else {
            d = new Date(localStorage.getItem('syncTime'));
        }
        return d;
    }
}
