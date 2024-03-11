import { DateTime } from 'luxon';
import { z } from 'zod';

export interface ScheduleLesson {
  id: string;
  studyPlaceId: string;
  type: 'current' | 'general';
  group: {
    id: string;
    name: string;
  };
  room: {
    id: string;
    name: string;
  };
  subject: {
    id: string;
    name: string;
  };
  teacher: {
    id: string;
    name: string;
  };
  startTime: DateTime;
  endTime: DateTime;
  lessonIndex: number;
  primaryColor: string;
  secondaryColor: string;
}

export interface ScheduleGeneralLesson {
  id?: string;
  studyPlaceId?: string;
  primaryColor: string;
  secondaryColor?: string;
  endTime: DateTime;
  startTime: DateTime;
  dayIndex: number;
  lessonIndex: number;
  subject: {
    id: string;
    name: string;
  };
  group: {
    id: string;
    name: string;
  };
  teacher: {
    id: string;
    name: string;
  };
  room: {
    id: string;
    name: string;
  };
}

export interface ScheduleInfo {
  studyPlaceId: string;
  column: string;
  columnId: string;
  columnName: string;
  startDate: DateTime;
  endDate: DateTime;
}

export interface GeneralScheduleInfo {
  studyPlaceId: string;
  column: string;
  columnId: string;
  columnName: string;
}

export interface Schedule {
  lessons: ScheduleLesson[];
  info: ScheduleInfo;
}

export interface GeneralSchedule {
  lessons: ScheduleGeneralLesson[];
  info: GeneralScheduleInfo;
}

export const ScheduleLessonSchema = z.object({
  id: z.string(),
  studyPlaceId: z.string(),
  type: z.string(),
  startTime: z
    .string()
    .datetime()
    .transform(dt => DateTime.fromISO(dt)),
  endTime: z
    .string()
    .datetime()
    .transform(dt => DateTime.fromISO(dt)),
  lessonIndex: z.number(),
  primaryColor: z.string(),
  secondaryColor: z.string(),
  group: z.object({
    id: z.string(),
    name: z.string(),
  }),
  room: z.object({
    id: z.string(),
    name: z.string(),
  }),
  subject: z.object({
    id: z.string(),
    name: z.string(),
  }),
  teacher: z.object({
    id: z.string(),
    name: z.string(),
  }),
});

export const ScheduleSchema = z.object({
  lessons: z.array(ScheduleLessonSchema).or(z.null()),
  info: z.object({
    studyPlaceId: z.string(),
    endDate: z
      .string()
      .datetime()
      .transform(dt => DateTime.fromISO(dt, { zone: 'utc' })),
    startDate: z
      .string()
      .datetime()
      .transform(dt => DateTime.fromISO(dt, { zone: 'utc' })),
    column: z.string(),
    columnId: z.string(),
    columnName: z.string(),
  }),
});

export const ScheduleGeneralLessonSchema = z
  .object({
    id: z.string(),
    studyPlaceId: z.string(),
    startTime: z.number().transform(ms => DateTime.fromMillis(ms / 1000000)),
    endTime: z.number().transform(ms => DateTime.fromMillis(ms / 1000000)),
    dayIndex: z.number(),
    primaryColor: z.string(),
    secondaryColor: z.string(),
    lessonIndex: z.number(),
    group: z.object({
      id: z.string(),
      name: z.string(),
    }),
    room: z.object({
      id: z.string(),
      name: z.string(),
    }),
    subject: z.object({
      id: z.string(),
      name: z.string(),
    }),
    teacher: z.object({
      id: z.string(),
      name: z.string(),
    }),
  })
  .transform(l => {
    l.startTime = l.startTime.set({ weekday: l.dayIndex - 1 });
    l.endTime = l.endTime.set({ weekday: l.dayIndex - 1 });
    return l;
  });

export const GeneralScheduleSchema = z.object({
  lessons: z.array(ScheduleGeneralLessonSchema).or(z.null()),
  info: z.object({
    studyPlaceId: z.string(),
    column: z.string(),
    columnId: z.string(),
    columnName: z.string(),
  }),
});
