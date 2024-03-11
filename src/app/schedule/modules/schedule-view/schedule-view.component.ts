import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
import { GeneralSchedule, Schedule } from '@schedule/entities/schedule';
import { SchedulePlugComponent } from '@schedule/modules/schedule-view/components/schedule-plug/schedule-plug.component';
import { map, merge, Observable, of, pipe, switchMap, tap } from 'rxjs';
import { State, useState } from 'state-mapper';
import { ActivatedRoute } from '@angular/router';
import { GetScheduleDTO } from '@schedule/entities/schedule.dto';
import { JwtService } from '@jwt/jwt.service';
import { ScheduleService } from '@schedule/services/schedule.service';
import { StudyPlacesService } from '@shared/services/study-places.service';

@Component({
  selector: 'schedule-view',
  templateUrl: './schedule-view.component.html',
  styleUrls: ['./schedule-view.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ScheduleViewComponent implements OnInit {
  schedule$!: Observable<State<Schedule | GeneralSchedule | null>>;

  protected readonly SchedulePlugComponent = SchedulePlugComponent;

  private route = inject(ActivatedRoute);
  private jwtService = inject(JwtService);
  private service = inject(ScheduleService);
  private studyPlaceService = inject(StudyPlacesService);

  ngOnInit(): void {
    const schedule$ = merge(this.route.params, this.route.queryParams, this.service.display$).pipe(
      useState(
        pipe(
          map(this.parseParams.bind(this)),
          switchMap(p => p ?? (this.jwtService.data ? null : this.getParamsFromStorage())),
          tap(p => this.saveParamsToStorage(p)),
          switchMap(p =>
            p?.general ? this.service.getGeneralSchedule(p) : this.service.getSchedule(p)
          ),
          map(s => (s?.lessons ? s : null)),
          tap({ error: () => this.removeParamsFromStorage() })
        )
      )
    );

    this.schedule$ = merge(
      schedule$,
      this.service.schedule$.pipe(
        map(
          s =>
            <State<Schedule>>{
              state: 'loaded',
              data: s,
            }
        )
      )
    );
  }

  private getParamsFromStorage(): GetScheduleDTO {
    const params = JSON.parse(localStorage.getItem('schedule') ?? 'null');
    params['general'] = this.service.display$.value === 'general';
    return params;
  }

  private saveParamsToStorage(p: GetScheduleDTO): void {
    localStorage.setItem('schedule', JSON.stringify(p));
  }

  private removeParamsFromStorage(): void {
    localStorage.removeItem('schedule');
  }

  private parseParams(): Observable<GetScheduleDTO> {
    return this.studyPlaceService.preferences$.pipe(
      map(([p, s]) => {
        const startTime = this.route.snapshot.queryParams['startDate'] ?? '2024-02-10T00:00:00Z';
        const endTime = this.route.snapshot.queryParams['endDate'] ?? '2024-03-01T00:00:00Z';

        const column = this.route.snapshot.params['column'] ?? p.schedule.column;
        const columnId = this.route.snapshot.params['columnId'] ?? p.schedule.columnId;

        return {
          studyPlaceId: s.studyPlaceId,
          column: column,
          columnId: columnId,
          from: startTime,
          to: endTime,
          general: this.service.display$.value === 'general',
        };
      })
    );
  }
}
