import {Component} from '@angular/core';

import {Platform} from '@ionic/angular';
import {SplashScreen} from '@ionic-native/splash-screen/ngx';
import {StatusBar} from '@ionic-native/status-bar/ngx';
import {ConnectionStatus, NetworkService} from './services/connection/network.service';
import {OfflineManagerService} from './services/offline/offline-manager.service';


@Component({
    selector: 'app-root',
    templateUrl: 'app.component.html'
})
export class AppComponent {
    private networkService: NetworkService;
    private offlineManager: OfflineManagerService;
    constructor(
        private platform: Platform,
        private splashScreen: SplashScreen,
        private statusBar: StatusBar
    ) {
        this.initializeApp();
    }

    initializeApp() {
        this.platform.ready().then(() => {
            this.statusBar.styleDefault();
            this.splashScreen.hide();
        });
    }
}
