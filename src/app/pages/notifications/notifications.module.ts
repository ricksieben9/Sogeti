import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NotificationsPage } from './notifications.page';

import {NetworkModule} from '../../modules/network/network.module';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    RouterModule.forChild([{path: '', component: NotificationsPage}]),
    NetworkModule,
  ],
  declarations: [NotificationsPage]
})
export class NotificationsPageModule {}
