import {
  DateRangeFormElementValue,
  FormConfigElement,
} from '@shared/modules/ui/entities/form.config';
import { DateTime } from 'luxon';

export interface SearchScheduleFormData {
  studyPlaceID?: string | null;
  column?: string | null;
  columnId?: string | null;
  startDate?: DateTime | null;
  endDate?: DateTime | null;
}

export interface SearchScheduleFormConfig {
  column: FormConfigElement;
  columnId: FormConfigElement;
  range: FormConfigElement<DateRangeFormElementValue>;
}
