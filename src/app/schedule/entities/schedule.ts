import { DateTime } from 'luxon';
import { z } from 'zod';

export interface ScheduleLesson {
  id: string;
  studyPlaceId: string;
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
  endTimeMinutes: DateTime;
  startTimeMinutes: DateTime;
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
  columnName: string;
  startDate: DateTime;
  endDate: DateTime;
}

export interface GeneralScheduleInfo {
  studyPlaceId: string;
  column: string;
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

export interface StudyPlaceInfo {
  id: string;
  title: string;
}

export const ScheduleLessonSchema = z.object({
  id: z.string(),
  studyPlaceId: z.string(),
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
    columnName: z.string(),
  }),
});

export const ScheduleGeneralLessonSchema = z
  .object({
    id: z.string(),
    studyPlaceID: z.string(),
    endTimeMinutes: z.number().transform(dt => DateTime.fromSeconds(dt * 60)),
    startTimeMinutes: z.number().transform(dt => DateTime.fromSeconds(dt * 60)),
    dayIndex: z.number(),
    primaryColor: z.string(),
    secondaryColor: z.string(),
    lessonIndex: z.number(),
    subject: z.string(),
    group: z.string(),
    teacher: z.string(),
    room: z.string(),
    subjectID: z.string(),
    groupID: z.string(),
    teacherID: z.string(),
    roomID: z.string(),
  })
  .transform(l => {
    l.startTimeMinutes = l.startTimeMinutes.set({ weekday: l.dayIndex - 1 });
    l.endTimeMinutes = l.endTimeMinutes.set({ weekday: l.dayIndex - 1 });
    return l;
  });

export const GeneralScheduleSchema = z.object({
  lessons: z.array(ScheduleGeneralLessonSchema).or(z.null()),
  info: z.object({
    studyPlaceId: z.object({
      id: z.string(),
    }),
    type: z.string(),
    typeName: z.string(),
  }),
});
