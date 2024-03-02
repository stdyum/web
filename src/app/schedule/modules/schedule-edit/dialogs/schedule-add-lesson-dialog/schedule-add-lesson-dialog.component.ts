import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { SearchScheduleFormData } from '@schedule/dialogs/search-schedule-dialog/search-schedule-dialog.dto';
import { FormConfig, FormConfigElementTypes } from '@shared/modules/ui/entities/form.config';
import { Validators } from '@angular/forms';
import { DateTime } from 'luxon';
import { ScheduleLesson } from '@schedule/entities/schedule';
import { ScheduleAddLessonService } from '@schedule/modules/schedule-edit/dialogs/schedule-add-lesson-dialog/schedule-add-lesson-dialog.service';
import { ScheduleAddLessonFormConfig } from '@schedule/modules/schedule-edit/dialogs/schedule-add-lesson-dialog/schedule-add-lesson-dialog.dto';
import { provideTranslationGroup, provideTranslationSuffix } from 'i18n';

@Component({
  selector: 'app-schedule-add-lesson-dialog',
  templateUrl: './schedule-add-lesson-dialog.component.html',
  styleUrls: ['./schedule-add-lesson-dialog.component.scss'],
  providers: [provideTranslationGroup(['schedule', 'edit', 'addLesson'])],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ScheduleAddLessonDialogComponent implements OnInit {
  private dialog = inject(MatDialogRef);
  private service = inject(ScheduleAddLessonService);
  private config = inject<ScheduleLesson | null>(MAT_DIALOG_DATA);

  formConfig: FormConfig<ScheduleAddLessonFormConfig> = {
    elements: {
      subjectID: {
        type: FormConfigElementTypes.SEARCHABLE_SELECT,
        typeConfig: {
          label: 'subject',
          items: this.service.subjects$,
        },
        initial: this.config?.subject?.id,
        validators: [Validators.required],
      },
      teacherID: {
        type: FormConfigElementTypes.SEARCHABLE_SELECT,
        typeConfig: {
          label: 'teacher',
          items: this.service.teachers$,
        },
        initial: this.config?.teacher?.id,
        validators: [Validators.required],
      },
      groupID: {
        type: FormConfigElementTypes.SEARCHABLE_SELECT,
        typeConfig: {
          label: 'group',
          items: this.service.groups$,
        },
        initial: this.config?.group?.id,
        validators: [Validators.required],
      },
      roomID: {
        type: FormConfigElementTypes.SEARCHABLE_SELECT,
        typeConfig: {
          label: 'room',
          items: this.service.rooms$,
        },
        initial: this.config?.room?.id,
        validators: [Validators.required],
      },
      primaryColor: {
        type: FormConfigElementTypes.COLOR_SELECT,
        typeConfig: {
          label: 'primaryColor',
          items: this.service.primaryColors$,
        },
        initial: this.config?.primaryColor,
        validators: [Validators.required],
      },
      secondaryColor: {
        type: FormConfigElementTypes.COLOR_SELECT,
        typeConfig: {
          label: 'secondaryColor',
          items: this.service.secondaryColors$,
        },
        initial: this.config?.secondaryColor,
        validators: [Validators.required],
      },
      lessonIndex: {
        type: FormConfigElementTypes.NUMBER,
        typeConfig: { label: 'lessonNumber' },
        initial: !!this.config ? this.config.lessonIndex + 1 : undefined,
        transform: v => v - 1,
        validators: [Validators.required],
      },
      range: {
        type: FormConfigElementTypes.DATE_TIME_RANGE,
        typeConfig: {
          label: 'range',
          expand: true,
          startControlName: 'startDate',
          endControlName: 'endDate',
        },
        initial: {
          start: this.config?.startTime,
          end: this.config?.endTime,
        },
        formatter: (date: DateTime) => date.toISO(),
        validators: [Validators.required],
      },
    },
  };

  ngOnInit(): void {
    this.service.load();
  }

  onSubmit(data: SearchScheduleFormData): void {
    this.dialog.close(data);
  }
}
