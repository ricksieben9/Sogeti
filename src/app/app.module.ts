import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { Network} from '@ionic-native/network/ngx';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { IonicStorageModule } from '@ionic/storage';

import { AuthModule } from './services/auth/auth.module';
import { LocalNotifications } from '@ionic-native/local-notifications/ngx';


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
  	Network,
	StatusBar,
	SplashScreen,
	{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
	LocalNotifications
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
