import {NgModule} from '@angular/core';
import {PreloadAllModules, RouterModule, Routes} from '@angular/router';
import {LoginGuard} from './guards/login.guard';

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
    },
    {
        path: 'intakeMoment/:id',
        loadChildren: './pages/intake-moment-detail/intake-moment-detail.module#IntakeMomentDetailPageModule',
        canActivate: [LoginGuard]
    },
    {
        path: 'receiver/:id/intakeMoments',
        loadChildren: './pages/receivers/receivers-intake-moments/receivers-intake-moments.module#ReceiversIntakeMomentsPageModule',
        canActivate: [LoginGuard]
    },
    {
        path: 'medicine-detail/:id',
        loadChildren: './pages/medicine-detail/medicine-detail.module#MedicineDetailPageModule',
        canActivate: [LoginGuard]
    }


];

@NgModule({
    imports: [
        RouterModule.forRoot(routes, {preloadingStrategy: PreloadAllModules})
    ],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
