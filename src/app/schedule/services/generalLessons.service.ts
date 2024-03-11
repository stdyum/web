import { inject, Injectable } from '@angular/core';
import { CrudService } from '@shared/services/crud.service';
import { ScheduleGeneralLessonSchema, ScheduleLesson } from '@schedule/entities/schedule';
import { ScheduleService } from '@schedule/services/schedule.service';
import { ScheduleAddLessonFormData } from '@schedule/modules/schedule-edit/dialogs/schedule-add-lesson-dialog/schedule-add-lesson-dialog.dto';
import { take } from 'rxjs';
import { StudyPlacesService } from '@shared/services/study-places.service';

@Injectable({ providedIn: 'root' })
export class GeneralLessonsService extends CrudService<ScheduleLesson, ScheduleAddLessonFormData> {
  private studyPlacesService = inject(StudyPlacesService);
  private service = inject(ScheduleService);

  constructor() {
    super('api/schedule/v1/lessons/general');
    this.studyPlacesService.userEnrollment
      .pipe(take(1))
      .subscribe(e => (this.query = { studyPlaceId: e.studyPlaceId }));

    this.schema = ScheduleGeneralLessonSchema;

    this.onAction = {
      POST: (response, _, data) => {
        const lessons = [...this.service.lessons];
        lessons.push({ ...response.list[0], ...data });
        this.service.lessons = lessons;
      },
      PUT: (_, request, data) => {
        const lessons = [...this.service.lessons];
        for (let i = 0; i < lessons.length; i++) {
          if (lessons[i].id !== request.id) continue;

          console.log(JSON.parse(JSON.stringify(lessons[i])));
          lessons[i] = { ...lessons[i], ...data };
          console.log(lessons[i]);
        }
        this.service.lessons = lessons;
      },
      DELETE: (_, request) => {
        this.service.lessons = this.service.lessons.filter(l => l.id !== request.id);
      },
    };
  }
}
