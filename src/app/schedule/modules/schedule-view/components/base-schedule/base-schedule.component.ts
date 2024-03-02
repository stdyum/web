import { ChangeDetectionStrategy, Component, inject, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Schedule, ScheduleGeneralLesson, ScheduleLesson } from '@schedule/entities/schedule';
import { IModeCalculator } from '@schedule/modules/schedule-view/components/base-schedule/mode-calculators/base-mode-calculator';
import { BaseScheduleService } from '@schedule/modules/schedule-view/components/base-schedule/base-schedule.service';

@Component({
  selector: 'base-schedule',
  templateUrl: './base-schedule.component.html',
  styleUrls: ['./base-schedule.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BaseScheduleComponent implements OnInit {
  @Input({ required: true }) schedule!: Schedule;
  modeCalculator$!: Observable<IModeCalculator>;

  private service = inject(BaseScheduleService);

  ngOnInit(): void {
    this.service.reset();
    this.modeCalculator$ = this.service.modeCalculator$;
  }

  groupLessonByTime(lesson: ScheduleLesson | ScheduleGeneralLesson): string {
    const groupScheduleLessonByTime = (lesson: ScheduleLesson): string =>
      `${lesson.startTime.toISO()}-${lesson.endTime.toISO()}`;

    const groupGeneralScheduleLessonByTime = (lesson: ScheduleGeneralLesson): string =>
      `${lesson.startTimeMinutes.toISO()}-${lesson.endTimeMinutes.toISO()}`;
    return 'startTime' in lesson
      ? groupScheduleLessonByTime(lesson)
      : groupGeneralScheduleLessonByTime(lesson);
  }
}
