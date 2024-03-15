import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { routes } from './panel-admin-tables.routes';
import { PanelAdminTablesSidenavComponent } from '@panel/modules/panel-admin-tables/components/panel-admin-tables-sidenav/panel-admin-tables-sidenav.component';
import { PrimaryContainerComponent } from '@shared/modules/ui/components/containers/primary-container.component';
import { MatSidenavModule } from '@angular/material/sidenav';
import { IconComponent } from '@ui/images/icon.component';
import { PanelAdminTablesComponent } from '@panel/modules/panel-admin-tables/panel-admin-tables.component';
import { PanelAdminTablesSidenavContentComponent } from '@panel/modules/panel-admin-tables/components/panel-admin-tables-sidenav-content/panel-admin-tables-sidenav-content.component';
import { PanelAdminTablesPageSubjectsComponent } from './components/panel-admin-tables-page-subjects/panel-admin-tables-page-subjects.component';
import { PanelAdminTablesPageGroupsComponent } from '@panel/modules/panel-admin-tables/components/panel-admin-tables-page-groups/panel-admin-tables-page-groups.component';
import { PanelAdminTablesPageRoomsComponent } from '@panel/modules/panel-admin-tables/components/panel-admin-tables-page-rooms/panel-admin-tables-page-rooms.component';
import { PanelAdminTablesPageTeachersComponent } from './components/panel-admin-tables-page-teachers/panel-admin-tables-page-teachers.component';
import { UrlComponent } from '@ui/text/url.component';
import { ToggleButtonComponent } from '@shared/modules/ui/components/buttons/toggle-button.component';
import { SmartTableComponent } from '@shared/modules/ui/components/tables/smart-table/smart-table.component';

@NgModule({
  declarations: [
    PanelAdminTablesComponent,
    PanelAdminTablesSidenavComponent,
    PanelAdminTablesSidenavContentComponent,
    PanelAdminTablesPageGroupsComponent,
    PanelAdminTablesPageRoomsComponent,
    PanelAdminTablesPageSubjectsComponent,
    PanelAdminTablesPageTeachersComponent,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    PrimaryContainerComponent,
    MatSidenavModule,
    IconComponent,
    UrlComponent,
    ToggleButtonComponent,
    SmartTableComponent,
  ],
  exports: [PanelAdminTablesSidenavComponent],
})
export class PanelAdminTablesModule {}
