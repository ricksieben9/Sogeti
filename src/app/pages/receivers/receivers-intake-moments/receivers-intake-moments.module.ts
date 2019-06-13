import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { ReceiversIntakeMomentsPage } from './receivers-intake-moments.page';
import {NetworkModule} from '../../../modules/network/network.module';

const routes: Routes = [
  {
    path: '',
    component: ReceiversIntakeMomentsPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes),
    NetworkModule
  ],
  declarations: [ReceiversIntakeMomentsPage]
})
export class ReceiversIntakeMomentsPageModule {}
