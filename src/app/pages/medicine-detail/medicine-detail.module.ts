import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {Routes, RouterModule} from '@angular/router';

import {IonicModule} from '@ionic/angular';

import {MedicineDetailPage} from './medicine-detail.page';
import {NetworkModule} from '../../modules/network/network.module';

const routes: Routes = [
    {
        path: '',
        component: MedicineDetailPage
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
    declarations: [MedicineDetailPage]
})
export class MedicineDetailPageModule {
}
