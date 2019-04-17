import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { LoginGuard } from './auth/guard/login.guard';

const routes: Routes = [
  {
    path: '',
    loadChildren: './tabs/tabs.module#TabsPageModule',
    canActivate: [LoginGuard]
  },
  {
    path: 'login',
    loadChildren: './auth/login/login.module#LoginPageModule'
  },
  {
    path: 'registerpin',
    loadChildren: './auth/registerpin/registerpin.module#RegisterpinPageModule',
    canActivate: [LoginGuard]
  }

];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
