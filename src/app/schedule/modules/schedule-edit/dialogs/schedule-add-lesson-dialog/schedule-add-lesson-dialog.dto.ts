import {
  DateRangeFormElementValue,
  FormConfigElement,
} from '@shared/modules/ui/entities/form.config';
import { DateTime } from 'luxon';

export interface ScheduleAddLessonFormData {
  subjectId?: string | null;
  teacherId?: string | null;
  groupId?: string | null;
  roomId?: string | null;
  primaryColor?: string | null;
  secondaryColor?: string | null;
  lessonIndex?: number | null;
  startTime?: DateTime | null;
  endTime?: DateTime | null;
}

export interface ScheduleAddLessonFormConfig {
  subjectId: FormConfigElement;
  teacherId: FormConfigElement;
  groupId: FormConfigElement;
  roomId: FormConfigElement;
  primaryColor: FormConfigElement;
  secondaryColor: FormConfigElement;
  lessonIndex: FormConfigElement<number>;
  range: FormConfigElement<DateRangeFormElementValue>;
}
