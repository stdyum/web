import { Pipe, PipeTransform } from '@angular/core';
import { ScheduleLesson } from '@schedule/entities/schedule';
import { IModeCalculator } from '@schedule/modules/schedule-view/components/base-schedule/mode-calculators/base-mode-calculator';

@Pipe({
  name: 'scheduleModeGroupLessons',
})
export class ScheduleModeGroupLessonsPipe implements PipeTransform {
  transform(lessons: ScheduleLesson[], mode: IModeCalculator): ScheduleLesson[][] {
    return mode.groupLessons(lessons);
  }
}
