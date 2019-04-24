import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { LoginGuard } from './guards/login.guard';

const routes: Routes = [
  {
	path: '',
	loadChildren: './pages/tabs/tabs.module#TabsPageModule',
	canActivate: [LoginGuard]
  },
  {
	path: 'login',
	loadChildren: './pages/login/login.module#LoginPageModule'
  },
  {
	path: 'registerpin',
	loadChildren: './pages/registerpin/registerpin.module#RegisterPinPageModule',
	canActivate: [LoginGuard]
  }
  { path: 'application/:id', loadChildren: './application-detail/application.detail.module#ApplicationDetailPageModule' }

];
@NgModule({
  imports: [
	RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
