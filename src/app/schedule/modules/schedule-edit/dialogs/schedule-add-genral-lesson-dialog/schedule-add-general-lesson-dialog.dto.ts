import {
  DateRangeFormElementValue,
  FormConfigElement,
} from '@shared/modules/ui/entities/form.config';
import { DateTime } from 'luxon';
import { Time } from '@shared/modules/ui/components/datetime/time-picker-view/time-picker-view.component';

export interface ScheduleAddGeneralLessonFormData {
  subjectId?: string | null;
  teacherId?: string | null;
  groupId?: string | null;
  roomId?: string | null;
  primaryColor?: string | null;
  secondaryColor?: string | null;
  lessonIndex?: number | null;
  dayIndex?: number | null;
  startTime?: number | null;
  endTime?: number | null;
}

export interface ScheduleAddGeneralLessonFormConfig {
  subjectId: FormConfigElement;
  teacherId: FormConfigElement;
  groupId: FormConfigElement;
  roomId: FormConfigElement;
  primaryColor: FormConfigElement;
  secondaryColor: FormConfigElement;
  lessonIndex: FormConfigElement<number>;
  dayIndex: FormConfigElement<number>;
  startTime: FormConfigElement<number | Time>;
  endTime: FormConfigElement<number | Time>;
}
