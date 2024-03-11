import {
  IModeCalculator,
  MarkupEntry,
  Row,
} from '@schedule/modules/schedule-view/components/base-schedule/mode-calculators/base-mode-calculator';
import {
  GeneralSchedule,
  Schedule,
  ScheduleGeneralLesson,
  ScheduleLesson,
} from '@schedule/entities/schedule';
import { DateObjectUnits, DateTime, DurationLikeObject } from 'luxon';
import { groupBy } from '@shared/arrays/groupBy';

export class TimeModeCalculator implements IModeCalculator {
  private static scale = 2.25;

  rows!: Row[];
  days!: string[];
  markup!: MarkupEntry[];
  instantRouting = false;

  private start!: DateTime;
  private yOffset!: number;

  initSchedule(schedule: Schedule): void {
    const datelessParams: DateObjectUnits = {
      year: 0,
      month: 0,
      day: 0,
    };
    const dates = schedule.lessons.flatMap(v => [
      v.startTime.set(datelessParams),
      v.endTime.set(datelessParams),
    ]);

    this.start = schedule.info.startDate;
    this.yOffset = this.yTime(
      dates.reduce((a, b) => (a < b ? a : b), schedule.lessons[0].startTime)
    );

    this.days = [];
    const amount = schedule.info.endDate.diff(schedule.info.startDate, 'days').get('days') + 1;
    for (let i = 0; i < amount; i++) {
      const duration: DurationLikeObject = {};
      duration['days'] = i;
      this.days.push(schedule.info.startDate.plus(duration).toFormat('MMM dd EEE'));
    }

    this.init(schedule, dates);
  }

  initGeneralSchedule(schedule: GeneralSchedule): void {
    const datelessParams: DateObjectUnits = {
      year: 0,
      month: 0,
      day: 0,
    };
    const dates = schedule.lessons.flatMap(v => [
      v.startTime.set(datelessParams),
      v.endTime.set(datelessParams),
    ]);

    const dayIndexes = schedule.lessons.map(l => l.dayIndex);
    this.start = DateTime.fromMillis(0).set({ weekday: Math.min(...dayIndexes) - 1 });

    this.yOffset = this.yTime(
      dates.reduce((a, b) => (a < b ? a : b), schedule.lessons[0].startTime)
    );

    this.days = [];
    for (let i = Math.min(...dayIndexes) - 1; i < Math.max(...dayIndexes); i++) {
      const duration: DurationLikeObject = {};
      duration['days'] = i;
      this.days.push(this.getWeekdayByDayIndex(i));
    }

    this.init(schedule, dates);
  }

  groupLessons(lessons: ScheduleLesson[]): ScheduleLesson[][] {
    return Object.values(
      groupBy(
        lessons,
        (lesson: ScheduleLesson) => `${lesson.startTime.toISO()}-${lesson.endTime.toISO()}`
      )
    );
  }

  init(schedule: Schedule | GeneralSchedule, dates: DateTime[]): void {
    const timeOffset = 15;

    this.rows = [...new Set(dates)].map(
      d => <Row>{ title: d.toFormat('hh:mm a'), y: this.yTime(d) - timeOffset - this.yOffset }
    );

    this.markup = this.rows.map(r => <MarkupEntry>{ y: r.y + timeOffset });
  }

  height(lessons: (ScheduleLesson | ScheduleGeneralLesson)[]): number {
    const start = lessons[0].startTime;
    const end = lessons[0].endTime;

    return end.diff(start, 'minute').minutes * TimeModeCalculator.scale;
  }

  width(_: ScheduleLesson[]): number {
    return 200;
  }

  y(lessons: (ScheduleLesson | ScheduleGeneralLesson)[]): number {
    const date = lessons[0].startTime;
    return this.yTime(date) - this.yOffset;
  }

  x(lessons: (ScheduleLesson | ScheduleGeneralLesson)[]): number {
    const date = lessons[0].startTime;
    return Math.floor(date.diff(this.start, 'day').days) + 1;
  }

  styles(_: ScheduleLesson[]): any {
    return {};
  }

  private yTime(date: DateTime): number {
    return (date.hour * 60 + date.minute) * TimeModeCalculator.scale;
  }

  private getWeekdayByDayIndex(index: number): string {
    const date = new Date();
    date.setDate(date.getDate() - date.getDay() + index);
    return date.toLocaleDateString(undefined, { weekday: 'long' });
  }
}
