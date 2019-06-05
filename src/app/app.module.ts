import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {RouteReuseStrategy} from '@angular/router';

import {IonicModule, IonicRouteStrategy} from '@ionic/angular';
import {SplashScreen} from '@ionic-native/splash-screen/ngx';
import {StatusBar} from '@ionic-native/status-bar/ngx';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';


import {Network} from '@ionic-native/network/ngx';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {RouterModule} from '@angular/router';
import {IonicStorageModule} from '@ionic/storage';

import {LocalNotifications} from '@ionic-native/local-notifications/ngx';
import {DateFormatterService} from './services/formatter/date-formatter.service';
import {IntakeMomentService} from './services/intake-moment/intake-moment.service';
import {JwtInterceptor} from './helpers/jwt.interceptor';


@NgModule({
    declarations: [AppComponent],
    entryComponents: [],
    imports: [
        BrowserModule,
        IonicModule.forRoot(),
        HttpClientModule,
        RouterModule.forRoot([]),
        IonicStorageModule.forRoot(),
        AppRoutingModule],
    providers: [
        DateFormatterService,
        Network,
        StatusBar,
        SplashScreen,
        {provide: RouteReuseStrategy, useClass: IonicRouteStrategy},
        {provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true},
        LocalNotifications,
        IntakeMomentService
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}
