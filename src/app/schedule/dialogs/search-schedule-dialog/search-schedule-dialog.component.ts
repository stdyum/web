import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DefaultFormComponent } from '@ui/forms/default-form/default-form.component';
import { Validators } from '@angular/forms';
import {
  SearchScheduleFormConfig,
  SearchScheduleFormData,
} from '@schedule/dialogs/search-schedule-dialog/search-schedule-dialog.dto';
import { SearchScheduleDialogService } from '@schedule/dialogs/search-schedule-dialog/search-schedule-dialog.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormConfig, FormConfigElementTypes } from '@shared/modules/ui/entities/form.config';
import { DateTime } from 'luxon';
import { CharacterComponent } from '@ui/images/character.component';
import { provideTranslationSuffix } from 'i18n';

@Component({
  selector: 'app-search-schedule-dialog',
  standalone: true,
  imports: [CommonModule, DefaultFormComponent, CharacterComponent],
  templateUrl: './search-schedule-dialog.component.html',
  styleUrls: ['./search-schedule-dialog.component.scss'],
  providers: [provideTranslationSuffix('search')],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SearchScheduleDialogComponent {
  private dialog = inject(MatDialogRef);
  private service = inject(SearchScheduleDialogService);
  private config = inject<SearchScheduleFormData>(MAT_DIALOG_DATA);
  formConfig: FormConfig<SearchScheduleFormConfig> = {
    elements: {
      column: {
        type: FormConfigElementTypes.SELECT,
        typeConfig: {
          label: 'column',
          items: ['group', 'teacher', 'subject', 'room'],
        },
        initial: this.config.column!,
        validators: [Validators.required],
      },
      columnId: {
        type: FormConfigElementTypes.SEARCHABLE_SELECT,
        typeConfig: {
          label: 'columnName',
          items: [],
        },
        dependable: {
          dependsOn: 'column',
          cacheable: true,
          dependsItems: (item, value) => this.service.getTypeNames(item, value.studyPlaceID),
        },
        initial: this.config.columnId!,
        validators: [Validators.required],
      },
      range: {
        type: FormConfigElementTypes.DATE_RANGE,
        typeConfig: {
          label: 'range',
          expand: true,
          startControlName: 'startDate',
          endControlName: 'endDate',
          utc: true,
        },
        initial: {
          start: this.config.startDate ?? null,
          end: this.config.endDate ?? null,
        },
        formatter: (date: DateTime) => date?.toISO(),
      },
    },
  };

  onSubmit(data: SearchScheduleFormData): void {
    this.dialog.close(data);
  }
}
