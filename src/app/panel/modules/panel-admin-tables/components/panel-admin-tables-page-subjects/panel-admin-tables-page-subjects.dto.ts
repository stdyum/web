import { FormConfigElement, FormConfigElements } from '@shared/modules/ui/entities/form.config';

export interface SubjectFormData {
  name?: string | null;
}

export interface SubjectFormConfig extends FormConfigElements<any> {
  name: FormConfigElement;
}
