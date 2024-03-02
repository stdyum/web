import { FormConfigElement } from '@shared/modules/ui/entities/form.config';

export interface LessonInfoFormData {
  typeID?: string | null;
  title?: string | null;
  description?: string | null;
  homework?: string | null;
  attachments?: string | null;
}

export interface LessonInfoFormConfig {
  typeID: FormConfigElement;
  title: FormConfigElement;
  description: FormConfigElement;
  homework: FormConfigElement;
  attachments: FormConfigElement;
}
