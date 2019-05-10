import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AgendaPage } from './agenda.page';

import { NgCalendarModule } from 'ionic2-calendar';
import { NetworkModule } from '../../modules/network/network.module';




@NgModule({
    imports: [
        IonicModule,
        CommonModule,
        FormsModule,
        RouterModule.forChild([{path: '', component: AgendaPage}]),
        NgCalendarModule,
        NetworkModule
    ],
  declarations: [AgendaPage]
})
export class AgendaPageModule {}
