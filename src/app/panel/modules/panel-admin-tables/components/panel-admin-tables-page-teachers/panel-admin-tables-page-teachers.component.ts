import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { SmartTableConfig } from '@shared/modules/ui/components/tables/smart-table/smart-table.component';
import { GroupFormConfig } from '@panel/modules/panel-admin-tables/components/panel-admin-tables-page-groups/panel-admin-tables-page-groups.dto';
import { FormConfigElementTypes } from '@shared/modules/ui/entities/form.config';
import { Validators } from '@angular/forms';
import { PanelAdminTeachersService } from '@panel/modules/panel-admin-tables/services/panel-admin-teachers.service';

@Component({
  selector: 'panel-admin-tables-page-teachers',
  templateUrl: './panel-admin-tables-page-teachers.component.html',
  styleUrl: './panel-admin-tables-page-teachers.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PanelAdminTablesPageTeachersComponent {
  private panelAdminTeachersService = inject(PanelAdminTeachersService);

  tableConfig: SmartTableConfig<any, GroupFormConfig> = {
    crudService: this.panelAdminTeachersService,
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
