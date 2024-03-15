import { inject, Injectable } from '@angular/core';
import { CrudService } from '@shared/services/crud.service';
import { Group } from '@shared/entities/types';
import { StudyPlacesService } from '@shared/services/study-places.service';
import { take } from 'rxjs';
import { debug } from '@shared/rxjs/pipes/debug.pipe';

@Injectable({
  providedIn: 'root',
})
export class PanelAdminRoomsService extends CrudService<Group> {
  private studyPlacesService = inject(StudyPlacesService);

  constructor() {
    super('api/registry/v1/rooms');

    this.studyPlacesService.userEnrollment
      .pipe(take(1))
      .pipe(debug())
      .subscribe(e => (this.query = { studyPlaceId: e.studyPlaceId }));
  }
}
