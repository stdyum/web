import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ScheduleAddLessonFormData } from '@schedule/modules/schedule-edit/dialogs/schedule-add-lesson-dialog/schedule-add-lesson-dialog.dto';
import { LessonsService } from '@schedule/services/lessons.service';
import { ScheduleLesson } from '@schedule/entities/schedule';

@Injectable({
  providedIn: 'root',
})
export class ScheduleAddLessonViewService {
  private scheduleLessonsService = inject(LessonsService);

  addLesson(dto: ScheduleAddLessonFormData, lesson: ScheduleLesson): Observable<ScheduleLesson> {
    return this.scheduleLessonsService.postList([dto], {}, lesson);
  }
}
