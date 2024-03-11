import { inject, Injectable } from '@angular/core';
import { catchError, map, Observable, of, switchMap } from 'rxjs';
import { SelectItem } from '@shared/modules/ui/entities/select';
import { StudyPlacesService } from '@shared/services/study-places.service';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class SearchScheduleDialogService {
  private http = inject(HttpClient);
  private studyPlacesService = inject(StudyPlacesService);

  studyPlaceList$ = this.studyPlacesService.getStudyPlaces({ isSchedulePublic: true }).pipe(
    map(v =>
      v.map(
        s =>
          <SelectItem>{
            display: s.name,
            value: s.id,
          }
      )
    )
  );

  getTypeNames(type: string, studyPlaceId: string | null = null): Observable<SelectItem[]> {
    return this.studyPlacesService.userEnrollment
      .pipe(
        switchMap(e =>
          this.http.get<{ items: { id: string; name: string }[] }>(`api/registry/v1/${type}s`, {
            params: {
              studyPlaceId: studyPlaceId ?? e.studyPlaceId ?? '',
              perPage: 1000000,
            },
          })
        )
      )
      .pipe(map(v => v.items.map(this.convertType.bind(this)) ?? []))
      .pipe(catchError(() => of([])));
  }

  private convertType(type: { id: string; name: string }): SelectItem {
    return {
      id: type.id,
      value: type.id,
      display: type.name,
    };
  }
}
