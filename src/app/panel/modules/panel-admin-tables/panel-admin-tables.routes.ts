import { Routes } from '@angular/router';
import { PanelAdminTablesComponent } from '@panel/modules/panel-admin-tables/panel-admin-tables.component';

export const routes: Routes = [
  {
    path: ':table',
    component: PanelAdminTablesComponent,
  },
];
