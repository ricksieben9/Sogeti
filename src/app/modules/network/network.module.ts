import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {NetworkComponent} from '../../components/network/network.component';
import {IonicModule} from '@ionic/angular';

@NgModule({
  declarations: [NetworkComponent],
  imports: [
    IonicModule,
    CommonModule
  ],
  exports: [
    NetworkComponent
  ]
})
export class NetworkModule { }
