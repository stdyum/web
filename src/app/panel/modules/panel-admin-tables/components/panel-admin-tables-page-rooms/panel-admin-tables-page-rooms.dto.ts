import { FormConfigElement, FormConfigElements } from '@shared/modules/ui/entities/form.config';

export interface RoomFormData {
  name?: string | null;
}

export interface RoomFormConfig extends FormConfigElements<any> {
  name: FormConfigElement;
}
