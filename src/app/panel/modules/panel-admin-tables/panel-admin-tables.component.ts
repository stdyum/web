import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PrimaryContainerComponent } from '@shared/modules/ui/components/containers/primary-container.component';
import { MatSidenavContainer, MatSidenavModule } from '@angular/material/sidenav';
import { PrimaryButtonComponent } from '@shared/modules/ui/components/buttons/primary-button.component';
import { IconComponent } from '@ui/images/icon.component';
import { PanelAdminTablesModule } from '@panel/modules/panel-admin-tables/panel-admin-tables.module';

@Component({
  selector: 'app-panel-admin-tables',
  templateUrl: './panel-admin-tables.component.html',
  styleUrl: './panel-admin-tables.component.scss',
})
export class PanelAdminTablesComponent {}
