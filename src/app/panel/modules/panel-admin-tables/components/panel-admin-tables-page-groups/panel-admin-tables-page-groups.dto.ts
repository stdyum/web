import { FormConfigElement, FormConfigElements } from '@shared/modules/ui/entities/form.config';

export interface GroupFormData {
  name?: string | null;
}

export interface GroupFormConfig extends FormConfigElements<any> {
  name: FormConfigElement;
}
