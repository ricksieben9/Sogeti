import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {TabsPage} from './tabs.page';
import {LoginGuard} from '../../guards/login.guard';

const routes: Routes = [
  {
    path: 'tabs',
    component: TabsPage,
    canActivateChild: [LoginGuard],
    children: [
      {
        path: 'notifications',
        children: [
          {
            path: '',
            loadChildren: '../notifications/notifications.module#NotificationsPageModule'
          }
        ]
      },
      {
        path: 'agenda',
        children: [
          {
            path: '',
            loadChildren: '../agenda/agenda.module#AgendaPageModule'
          }
        ]
      },
      {
        path: 'groups',
        children: [
          {
            path: '',
            loadChildren: '../receivers/receivers.module#ReceiversPageModule'
          }
        ]
      },
            {
        path: 'profile',
        children: [
          {
            path: '',
            loadChildren: '../profile/profile.module#ProfilePageModule'
          }
        ]
      },
      {
        path: '',
        redirectTo: '/tabs/notifications',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: '',
    redirectTo: '/tabs/notifications',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class TabsPageRoutingModule {}
