import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { TabsPageRoutingModule } from './tabs.router.module';

import { TabsPage } from './tabs.page';

import { Router } from '@angular/router';
import { Storage } from '@ionic/storage';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    TabsPageRoutingModule
  ],
  declarations: [TabsPage]
})
export class TabsPageModule {
  constructor(private storage: Storage, private router: Router) {
console.log("test");
    this.storage.get('ACCESS_KEY').then((val) => {
      if (!val) {
        this.router.navigateByUrl('login');
      }
      else {
        console.log(val);
      }
    });
  }

}
