import { Routes } from '@angular/router';
import { PanelComponent } from './panel.component';

export const routes: Routes = [
  {
    path: '',
    component: PanelComponent,
    children: [
      {
        path: '',
        loadChildren: () =>
          import('@panel/modules/panel-admin-tables/panel-admin-tables.module').then(
            m => m.PanelAdminTablesModule
          ),
      },
    ],
  },
];
