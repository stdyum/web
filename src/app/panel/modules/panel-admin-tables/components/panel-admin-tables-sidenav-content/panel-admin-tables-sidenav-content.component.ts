import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';
import { map } from 'rxjs';
import { availableParams, TablePage } from '@panel/modules/panel-admin-tables/models/table_page';
import { StudyPlacesService } from '@shared/services/study-places.service';

@Component({
  selector: 'panel-admin-tables-sidenav-content',
  templateUrl: './panel-admin-tables-sidenav-content.component.html',
  styleUrl: './panel-admin-tables-sidenav-content.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PanelAdminTablesSidenavContentComponent {
  private activatedRoute = inject(ActivatedRoute);
  selectedTable = toSignal(this.activatedRoute.params.pipe(map(this.parseParams.bind(this))));

  private studyPlacesService = inject(StudyPlacesService);
  enrollment = this.studyPlacesService.userEnrollment;

  private parseParams(params: Params): TablePage {
    const table = params['table'] as TablePage;
    return availableParams.find(v => v === table) ? table : availableParams[0];
  }
}
