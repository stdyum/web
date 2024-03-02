import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormConfig, FormConfigElementTypes } from '@shared/modules/ui/entities/form.config';
import { Validators } from '@angular/forms';
import { SubmitOptions } from '@ui/forms/default-form/default-form.component';
import { LessonInfoFormConfig } from '@journal/modules/view/dialogs/journal-lesson-info-dialog/journal-lesson-info-dialog.form';

@Component({
  selector: 'journal-lesson-info-dialog',
  templateUrl: './journal-lesson-info-dialog.component.html',
  styleUrl: './journal-lesson-info-dialog.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class JournalLessonInfoDialogComponent {
  formConfig: FormConfig<LessonInfoFormConfig> = {
    elements: {
      typeID: {
        type: FormConfigElementTypes.SEARCHABLE_SELECT,
        typeConfig: {
          label: 'type',
          items: [],
        },
        validators: [Validators.required],
      },
      title: {
        type: FormConfigElementTypes.TEXT,
        typeConfig: {
          label: 'title',
        },
      },
      description: {
        type: FormConfigElementTypes.TEXT,
        typeConfig: {
          label: 'description',
        },
      },
      homework: {
        type: FormConfigElementTypes.TEXT,
        typeConfig: {
          label: 'homework',
        },
      },
      attachments: {
        type: FormConfigElementTypes.FILE_LIST,
        typeConfig: {
          label: 'attachments',
          instantUpload: true,
          upload: {
            url: 'api/v1/cdn/upload',
            method: 'POST',
          },
          hint: 'powered by likdn',
        },
      },
    },
  };

  options: SubmitOptions = {
    url: 'api/v1/user/login',
    method: 'PUT',
    subscribe: true,
  };
}
