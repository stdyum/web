import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { PanelAdminRoomsService } from '@panel/modules/panel-admin-tables/services/panel-admin-rooms.service';
import { SmartTableConfig } from '@shared/modules/ui/components/tables/smart-table/smart-table.component';
import { GroupFormConfig } from '@panel/modules/panel-admin-tables/components/panel-admin-tables-page-groups/panel-admin-tables-page-groups.dto';
import { FormConfigElementTypes } from '@shared/modules/ui/entities/form.config';
import { Validators } from '@angular/forms';
import { PanelAdminSubjectsService } from '@panel/modules/panel-admin-tables/services/panel-admin-subjects.service';

@Component({
  selector: 'panel-admin-tables-page-subjects',
  templateUrl: './panel-admin-tables-page-subjects.component.html',
  styleUrl: './panel-admin-tables-page-subjects.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PanelAdminTablesPageSubjectsComponent {
  private panelAdminSubjectsService = inject(PanelAdminSubjectsService);

  tableConfig: SmartTableConfig<any, GroupFormConfig> = {
    crudService: this.panelAdminSubjectsService,
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
