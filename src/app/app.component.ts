import {Component} from '@angular/core';

import {NavController, Platform} from '@ionic/angular';
import {SplashScreen} from '@ionic-native/splash-screen/ngx';
import {StatusBar} from '@ionic-native/status-bar/ngx';
import {LocalNotifications} from '@ionic-native/local-notifications/ngx';
import {Router} from '@angular/router';
import {AuthService} from './services/auth/auth.service';
import {NetworkService} from './services/connection/network.service';
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
        private statusBar: StatusBar,
        private localNotifications: LocalNotifications,
        private navCtrl: NavController,
        private router: Router,
        private authService: AuthService
    ) {
        this.initializeApp();
    }

    initializeApp() {
        this.platform.ready().then(() => {
            this.statusBar.styleDefault();
            this.splashScreen.hide();
            this.localNotifications.on('click').subscribe(res => {
                this.router.navigateByUrl('/intakeMoment/' + res.id);
                if (!this.authService.isLoggedIn) {
                    this.navCtrl.back();
                }
            });
            this.localNotifications.on('trigger').subscribe(res => {
                this.router.navigateByUrl('/intakeMoment/' + res.id);
                if (!this.authService.isLoggedIn) {
                    this.navCtrl.back();
                }
            });
        });
    }
}
