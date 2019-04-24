import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabsPage } from './tabs.page';
import { LoginGuard } from '../../guards/login.guard';

const routes: Routes = [
  {
    path: 'tabs',
    component: TabsPage,
    canActivateChild: [LoginGuard],
    children: [
      {
        path: 'meldingen',
        children: [
          {
            path: '',
            loadChildren: '../meldingen/meldingen.module#MeldingenPageModule'
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
        path: 'ontvangers',
        children: [
          {
            path: '',
            loadChildren: '../ontvangers/ontvangers.module#OntvangersPageModule'
          }
        ]
      },
            {
        path: 'profiel',
        children: [
          {
            path: '',
            loadChildren: '../profiel/profiel.module#ProfielPageModule'
          }
        ]
      },
      {
        path: '',
        redirectTo: '/tabs/meldingen',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: '',
    redirectTo: '/tabs/meldingen',
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
