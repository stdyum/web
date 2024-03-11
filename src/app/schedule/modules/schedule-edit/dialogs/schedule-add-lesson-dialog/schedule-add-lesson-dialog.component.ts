import { ChangeDetectionStrategy, Component, inject, ViewChild } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { SearchScheduleFormData } from '@schedule/dialogs/search-schedule-dialog/search-schedule-dialog.dto';
import { FormConfig, FormConfigElementTypes } from '@shared/modules/ui/entities/form.config';
import { Validators } from '@angular/forms';
import { DateTime } from 'luxon';
import { ScheduleLesson } from '@schedule/entities/schedule';
import { ScheduleAddLessonService } from '@schedule/modules/schedule-edit/dialogs/schedule-add-lesson-dialog/schedule-add-lesson-dialog.service';
import { ScheduleAddLessonFormConfig } from '@schedule/modules/schedule-edit/dialogs/schedule-add-lesson-dialog/schedule-add-lesson-dialog.dto';
import { provideTranslationGroup } from 'i18n';
import { DefaultFormComponent } from '@ui/forms/default-form/default-form.component';

@Component({
  selector: 'app-schedule-add-lesson-dialog',
  templateUrl: './schedule-add-lesson-dialog.component.html',
  styleUrls: ['./schedule-add-lesson-dialog.component.scss'],
  providers: [provideTranslationGroup(['schedule', 'edit', 'addLesson'])],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ScheduleAddLessonDialogComponent {
  @ViewChild(DefaultFormComponent, { static: true })
  public formComponent!: DefaultFormComponent<any, any, any>;

  private dialog = inject(MatDialogRef);
  private service = inject(ScheduleAddLessonService);
  private config = inject<ScheduleLesson | null>(MAT_DIALOG_DATA);
  formConfig: FormConfig<ScheduleAddLessonFormConfig> = {
    elements: {
      subjectId: {
        type: FormConfigElementTypes.SEARCHABLE_SELECT,
        typeConfig: {
          label: 'subject',
          items: this.service.subjects$,
        },
        initial: this.config?.subject?.id,
        validators: [Validators.required],
      },
      teacherId: {
        type: FormConfigElementTypes.SEARCHABLE_SELECT,
        typeConfig: {
          label: 'teacher',
          items: this.service.teachers$,
        },
        initial: this.config?.teacher?.id,
        validators: [Validators.required],
      },
      groupId: {
        type: FormConfigElementTypes.SEARCHABLE_SELECT,
        typeConfig: {
          label: 'group',
          items: this.service.groups$,
        },
        initial: this.config?.group?.id,
        validators: [Validators.required],
      },
      roomId: {
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
          startControlName: 'startTime',
          endControlName: 'endTime',
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

  onSubmit(data: SearchScheduleFormData): void {
    const raw = this.formComponent.raw();

    const lesson = <ScheduleLesson>{
      subject: {
        id: raw.subjectId.value,
        name: raw.subjectId.display,
      },
      teacher: {
        id: raw.teacherId.value,
        name: raw.teacherId.display,
      },
      group: {
        id: raw.groupId.value,
        name: raw.groupId.display,
      },
      room: {
        id: raw.roomId.value,
        name: raw.roomId.display,
      },
      primaryColor: raw.primaryColor.value,
      secondaryColor: raw.secondaryColor.value,
      lessonIndex: raw.lessonIndex - 1,
      startTime: raw.range.start,
      endTime: raw.range.end,
    };

    this.dialog.close({ dto: data, lesson: lesson });
  }
}
