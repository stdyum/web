import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { PanelAdminGroupsService } from '@panel/modules/panel-admin-tables/services/panel-admin-groups.service';
import { SmartTableConfig } from '@shared/modules/ui/components/tables/smart-table/smart-table.component';
import { GroupFormConfig } from '@panel/modules/panel-admin-tables/components/panel-admin-tables-page-groups/panel-admin-tables-page-groups.dto';
import { FormConfigElementTypes } from '@shared/modules/ui/entities/form.config';
import { Validators } from '@angular/forms';
import { PanelAdminRoomsService } from '@panel/modules/panel-admin-tables/services/panel-admin-rooms.service';

@Component({
  selector: 'panel-admin-tables-page-rooms',
  templateUrl: './panel-admin-tables-page-rooms.component.html',
  styleUrl: './panel-admin-tables-page-rooms.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PanelAdminTablesPageRoomsComponent {
  private panelAdminRoomsService = inject(PanelAdminRoomsService);

  tableConfig: SmartTableConfig<any, GroupFormConfig> = {
    crudService: this.panelAdminRoomsService,
    addDialogConfig: {
      elements: {
        name: {
          type: FormConfigElementTypes.TEXT,
          typeConfig: {
            label: 'name',
          },
          validators: [Validators.required],
        },
      },
    },
  };
}
