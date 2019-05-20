import {Component} from '@angular/core';

import {NavController, Platform} from '@ionic/angular';
import {SplashScreen} from '@ionic-native/splash-screen/ngx';
import {StatusBar} from '@ionic-native/status-bar/ngx';
import {LocalNotifications} from '@ionic-native/local-notifications/ngx';
import {Router} from '@angular/router';
import {AuthService} from './services/auth/auth.service';
import {ConnectionStatus, NetworkService} from './services/connection/network.service';
import {OfflineManagerService} from './services/offline/offline-manager.service';
import { FCM } from '@ionic-native/fcm/ngx';


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
        private authService: AuthService,
        private fcm: FCM,
    ) {
        this.initializeApp();
    }

    initializeApp() {
        this.platform.ready().then(() => {
            this.statusBar.styleDefault();
            this.splashScreen.hide();
            this.fcm.getToken().then(token => {
                console.log(token);
            });
            this.fcm.onTokenRefresh().subscribe(token => {
                console.log(token);
            });
            this.fcm.onNotification().subscribe(data => {
                console.log(data);
                if (data.wasTapped) {
                    console.log('Received in background');
                    this.router.navigateByUrl('/intakeMoment/' + data.id);
                } else {
                    console.log('Received in foreground');
                    this.router.navigateByUrl('/intakeMoment/' + data.id);
                }
            });
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
