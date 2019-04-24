import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AgendaPage } from './agenda.page';

import { NgCalendarModule } from 'ionic2-calendar';



@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    RouterModule.forChild([{ path: '', component: AgendaPage }]),
    NgCalendarModule
  ],
  declarations: [AgendaPage]
})
export class AgendaPageModule {}
