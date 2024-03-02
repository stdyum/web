export type GetScheduleDTO = {
  column: string;
  columnId: string;
  studyPlaceId: string;
  from: string;
  to: string;
  general: boolean;
} | null;
