import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: '',
    component: TabsPage,
    children: [
      {
        path: 'timeline',
        loadChildren: () => import('../timeline/tab1.module').then(m => m.Tab1PageModule)
      },
      {
        path: 'search',
        loadChildren: () => import('../search/tab2.module').then(m => m.Tab2PageModule)
      },
      {
        path: 'profile',
        loadChildren: () => import('../profile/tab3.module').then(m => m.Tab3PageModule)
      },
      {
        path: 'tweet',
        loadChildren: () => import('../tweet/tab4.module').then(m => m.Tab4PageModule)
      },
      {
        path: 'users',
        loadChildren: () => import('../users/tab5.module').then(m => m.Tab5PageModule)
      },

      {
        path: '',
        redirectTo: '/tabs/timeline',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: '',
    redirectTo: '/tabs/tab1',
    pathMatch: 'full'
  },
  {
    path: 'tab4',
    loadChildren: () => import('../tweet/tab4.module').then(m => m.Tab4PageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
})
export class TabsPageRoutingModule {}
