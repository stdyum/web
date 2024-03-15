import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { SmartTableConfig } from '@shared/modules/ui/components/tables/smart-table/smart-table.component';
import { PanelAdminGroupsService } from '@panel/modules/panel-admin-tables/services/panel-admin-groups.service';
import { FormConfigElementTypes } from '@shared/modules/ui/entities/form.config';
import { Validators } from '@angular/forms';
import { GroupFormConfig } from '@panel/modules/panel-admin-tables/components/panel-admin-tables-page-groups/panel-admin-tables-page-groups.dto';

@Component({
  selector: 'panel-admin-tables-page-groups',
  templateUrl: './panel-admin-tables-page-groups.component.html',
  styleUrl: './panel-admin-tables-page-groups.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PanelAdminTablesPageGroupsComponent {
  private panelAdminGroupsService = inject(PanelAdminGroupsService);

  tableConfig: SmartTableConfig<any, GroupFormConfig> = {
    crudService: this.panelAdminGroupsService,
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
