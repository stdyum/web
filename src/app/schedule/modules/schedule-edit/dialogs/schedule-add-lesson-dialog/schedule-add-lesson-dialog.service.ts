import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, map, Observable, of, pipe, switchMap, UnaryFunction } from 'rxjs';
import { filterNotNull } from '@shared/rxjs/pipes/filterNotNull.pipe';
import { SelectItem, SelectItems } from '@shared/modules/ui/entities/select';
import {
  ScheduleTypeEntry,
  ScheduleTypes,
} from '@schedule/modules/schedule-edit/dialogs/schedule-add-lesson-dialog/schedule-add-lesson-dialog.entities';
import { StudyPlacesService } from '@shared/services/study-places.service';

@Injectable({
  providedIn: 'root',
})
export class ScheduleAddLessonService {
  private http = inject(HttpClient);
  private studyPlacesService = inject(StudyPlacesService);

  get subjects$(): Observable<SelectItems> {
    return this.getType('subjects');
  }

  get teachers$(): Observable<SelectItems> {
    return this.getType('teachers');
  }

  get groups$(): Observable<SelectItems> {
    return this.getType('groups');
  }

  get rooms$(): Observable<SelectItems> {
    return this.getType('rooms');
  }

  //todo get from backend
  get primaryColors$(): Observable<SelectItems> {
    return of([
      {
        id: '#ffffff',
        value: '#ffffff',
        display: 'white',
      },
      {
        id: '#99ff99',
        value: '#99ff99',
        display: 'lime',
      },
      {
        id: '#9999ff',
        value: '#9999ff',
        display: 'purple',
      },
    ] as SelectItem[]).pipe();
  }

  //todo
  get secondaryColors$(): Observable<SelectItems> {
    return of([
      {
        id: '#ffffff',
        value: '#ffffff',
        display: 'white',
      },
      {
        id: '#99ff99',
        value: '#99ff99',
        display: 'lime',
      },
      {
        id: '#9999ff',
        value: '#9999ff',
        display: 'purple',
      },
    ] as SelectItem[]).pipe();
  }

  private getType(type: string): Observable<SelectItem[]> {
    return this.studyPlacesService.userEnrollment
      .pipe(
        switchMap(e =>
          this.http.get<{
            items: { id: string; name: string }[];
          }>(`api/registry/v1/${type}`, {
            params: {
              studyPlaceId: e.studyPlaceId,
              perPage: 1000000, //todo use pagination
            },
          })
        )
      )
      .pipe(
        map(v =>
          v.items.map(
            i =>
              <SelectItem>{
                id: i.id,
                value: i.id,
                display: i.name,
              }
          )
        )
      );
  }
}
