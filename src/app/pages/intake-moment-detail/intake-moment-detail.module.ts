import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {Routes, RouterModule} from '@angular/router';

import {IonicModule} from '@ionic/angular';

import {IntakeMomentDetailPage} from './intake-moment-detail.page';
import {NetworkModule} from '../../modules/network/network.module';

const routes: Routes = [
  {
    path: '',
    component: IntakeMomentDetailPage
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
  declarations: [IntakeMomentDetailPage]
})
export class IntakeMomentDetailPageModule {}
