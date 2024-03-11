import { ChangeDetectionStrategy, Component, inject, ViewChild } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { SearchScheduleFormData } from '@schedule/dialogs/search-schedule-dialog/search-schedule-dialog.dto';
import { FormConfig, FormConfigElementTypes } from '@shared/modules/ui/entities/form.config';
import { Validators } from '@angular/forms';
import { DateTime } from 'luxon';
import { ScheduleGeneralLesson, ScheduleLesson } from '@schedule/entities/schedule';
import { ScheduleAddLessonService } from '@schedule/modules/schedule-edit/dialogs/schedule-add-lesson-dialog/schedule-add-lesson-dialog.service';
import { provideTranslationGroup } from 'i18n';
import { ScheduleAddGeneralLessonFormConfig } from '@schedule/modules/schedule-edit/dialogs/schedule-add-genral-lesson-dialog/schedule-add-general-lesson-dialog.dto';
import { Time } from '@shared/modules/ui/components/datetime/time-picker-view/time-picker-view.component';
import { DefaultFormComponent } from '@ui/forms/default-form/default-form.component';

@Component({
  selector: 'app-schedule-add-general-lesson-dialog',
  templateUrl: './schedule-add-general-lesson-dialog.component.html',
  styleUrls: ['./schedule-add-general-lesson-dialog.component.scss'],
  providers: [provideTranslationGroup(['schedule', 'edit', 'addGeneralLesson'])],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ScheduleAddGeneralLessonDialogComponent {
  @ViewChild(DefaultFormComponent, { static: true })
  public formComponent!: DefaultFormComponent<any, any, any>;

  private dialog = inject(MatDialogRef);
  private service = inject(ScheduleAddLessonService);
  private config = inject<ScheduleGeneralLesson | null>(MAT_DIALOG_DATA);
  private timezoneOffsetMinutes = new Date().getTimezoneOffset();

  formConfig: FormConfig<ScheduleAddGeneralLessonFormConfig> = {
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
      dayIndex: {
        type: FormConfigElementTypes.NUMBER,
        typeConfig: { label: 'dayNumber' },
        initial: !!this.config ? this.config.dayIndex + 1 : undefined,
        transform: v => v - 1,
        validators: [Validators.required],
      },
      startTime: {
        type: FormConfigElementTypes.TIME,
        typeConfig: { label: 'startTime' },
        initial: this.extractTime(this.config?.startTime),
        transform: (v: Time) =>
          (v.hours * 60 + v.minutes + this.timezoneOffsetMinutes) * 60000000000,
        validators: [Validators.required],
      },
      endTime: {
        type: FormConfigElementTypes.TIME,
        typeConfig: { label: 'endTime' },
        initial: this.extractTime(this.config?.endTime),
        transform: (v: Time) =>
          (v.hours * 60 + v.minutes + this.timezoneOffsetMinutes) * 60000000000,
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
      startTime: DateTime.fromSeconds(
        (raw.startTime.minutes + raw.startTime.hours * 60 + this.timezoneOffsetMinutes) * 60
      ).set({ weekday: raw.dayIndex - 2 }),
      endTime: DateTime.fromSeconds(
        (raw.endTime.minutes + raw.endTime.hours * 60 + this.timezoneOffsetMinutes) * 60
      ).set({ weekday: raw.dayIndex - 2 }),
    };

    this.dialog.close({ dto: data, lesson: lesson });
  }

  private extractTime(datetime: DateTime | null | undefined): Time | undefined {
    return datetime
      ? {
          hours: datetime.hour,
          minutes: datetime.minute,
        }
      : undefined;
  }
}
