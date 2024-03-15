import { Component, inject } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';
import { filter, map } from 'rxjs';
import { availableParams, TablePage } from '@panel/modules/panel-admin-tables/models/table_page';

@Component({
  selector: 'panel-admin-tables-sidenav',
  templateUrl: './panel-admin-tables-sidenav.component.html',
  styleUrl: './panel-admin-tables-sidenav.component.scss',
})
export class PanelAdminTablesSidenavComponent {
  items: NavigationItem[] = [
    {
      id: 'groups',
      key: 'groups',
      url: '../groups',
      icon: 'groups',
    },
    {
      id: 'rooms',
      key: 'rooms',
      url: '../rooms',
      icon: 'meeting_room',
    },
    {
      id: 'subjects',
      key: 'subjects',
      url: '../subjects',
      icon: 'book_2',
    },
    {
      id: 'teachers',
      key: 'teachers',
      url: '../teachers',
      icon: 'engineering',
    },
  ];

  private router = inject(Router);
  private activatedRoute = inject(ActivatedRoute);
  selectedTablePage = toSignal(
    this.activatedRoute.params
      .pipe(filter(this.assertValidPage.bind(this)))
      .pipe(map(params => params['table'] as TablePage))
  );

  private assertValidPage(params: Params): boolean {
    if (!availableParams.find(v => v === params['table'])) {
      this.router.navigate(['../groups'], { relativeTo: this.activatedRoute }).then();
      return false;
    }

    return true;
  }
}

interface NavigationItem {
  id: string;
  key: string;
  url: string;
  icon: string;
}
