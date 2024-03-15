import { FormConfigElement, FormConfigElements } from '@shared/modules/ui/entities/form.config';

export interface TeachersFormData {
  name?: string | null;
}

export interface TeachersFormConfig extends FormConfigElements<any> {
  name: FormConfigElement;
}
