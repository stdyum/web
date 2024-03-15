import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  inject,
  Input,
  OnDestroy,
  OnInit,
  signal,
  ViewChild,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { CrudService } from '@shared/services/crud.service';
import { map, Observable, of, Subscription, switchMap, take } from 'rxjs';
import { z } from 'zod';
import { PrimaryButtonComponent } from '@shared/modules/ui/components/buttons/primary-button.component';
import { WarnButtonComponent } from '@shared/modules/ui/components/buttons/warn-button.component';
import { FormConfig, FormConfigElements } from '@shared/modules/ui/entities/form.config';
import { MatDialog } from '@angular/material/dialog';
import { FormConfigDialogComponent } from '@shared/modules/ui/components/dialogs/form-config-dialog/form-config-dialog.component';
import { ConfirmationDialogComponent } from '@shared/modules/ui/components/dialogs/confirmation-dialog/confirmation-dialog.component';
import { filterNotNull } from '@shared/rxjs/pipes/filterNotNull.pipe';
import { CheckboxComponent, CheckboxState } from '@ui/inputs/checkbox/checkbox.component';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { MatSort, MatSortHeader } from '@angular/material/sort';

export interface SmartTableConfig<
  T,
  AddFC extends FormConfigElements<T>,
  EditFC extends FormConfigElements<T> = AddFC,
> {
  crudService: CrudService<T>;
  addDialogConfig: FormConfig<AddFC>;
  editDialogConfig?: FormConfig<EditFC>;
}

interface Items<T> {
  columns: string[];
  items: T[];
  service: CrudService<T>;
}

@Component({
  selector: 'table-smart',
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    PrimaryButtonComponent,
    WarnButtonComponent,
    CheckboxComponent,
    ReactiveFormsModule,
    MatSort,
    MatSortHeader,
  ],
  templateUrl: './smart-table.component.html',
  styleUrl: './smart-table.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SmartTableComponent<
    T extends { id: any },
    AddFC extends FormConfigElements<any>,
    EditFC extends FormConfigElements<any>,
  >
  implements OnInit, OnDestroy
{
  config!: SmartTableConfig<T, AddFC, EditFC>;
  itemsDataSource = new MatTableDataSource<T>([]);

  items = signal<Items<T> | null>(null);
  selectedItemsAmount = signal(0);

  headSelectedItemsFormControl = new FormControl<CheckboxState>('unchecked');
  selectedItemsFormControls: { [key: string]: FormControl<CheckboxState> } = {};

  private dialog = inject(MatDialog);
  private checkboxesSubscriptions: Subscription[] = [];

  @ViewChild(MatSort) set sort(sort: MatSort) {
    this.itemsDataSource.sort = sort;
  }

  @Input({ alias: 'config', required: true })
  set _config(config: SmartTableConfig<T, AddFC, EditFC>) {
    this.config = config;

    this.loadItems(config)
      .pipe(take(1))
      .subscribe(items => {
        this.items.set(items);
        this.itemsDataSource.data = items?.items ?? [];
      });

    this.initActions(config);
  }

  ngOnInit(): void {
    const subscription = this.headSelectedItemsFormControl.valueChanges.subscribe(value => {
      if (value === 'indeterminate') return;

      Object.values(this.selectedItemsFormControls).forEach(c => {
        if (c.value !== value) c.setValue(value);
      });
    });
    this.checkboxesSubscriptions.push(subscription);
  }

  getItemSelectionFormControl(item: T): FormControl<CheckboxState> {
    if (!this.selectedItemsFormControls[`${item.id}`]) {
      this.selectedItemsFormControls[`${item.id}`] = this.initItemFormControl(item);
    }

    return this.selectedItemsFormControls[`${item.id}`];
  }

  headerColumns(columns: string[]): string[] {
    return ['checkbox', ...columns];
  }

  rowColumns(columns: string[]): string[] {
    return ['checkbox', ...columns];
  }

  addItems(): void {
    this.config.addDialogConfig.value = null;

    this.dialog
      .open(FormConfigDialogComponent, { data: this.config.addDialogConfig })
      .afterClosed()
      .pipe(take(1))
      .pipe(filterNotNull())
      .pipe(switchMap(m => this.config.crudService.postList([m]).pipe(take(1))))
      .subscribe();
  }

  editItems(): void {
    const items = this.getSelectedItems();
    if (items.length !== 1) return;

    const dialogConfig = this.config.editDialogConfig
      ? this.config.editDialogConfig
      : this.config.addDialogConfig;

    dialogConfig.value = items[0];

    this.dialog
      .open(FormConfigDialogComponent, { data: dialogConfig })
      .afterClosed()
      .pipe(take(1))
      .pipe(filterNotNull())
      .pipe(switchMap(m => this.config.crudService.put(items[0].id, m).pipe(take(1))))
      .subscribe();
  }

  deleteItems(): void {
    const items = this.getSelectedItems();
    if (items.length == 0) return;

    const ids = items.map(item => item.id);

    this.dialog
      .open(ConfirmationDialogComponent, {
        data: {
          title: 'delete',
          description: `confirm deletion of ${items.length} items`,
          icon: 'delete',
          color: 'danger',
        },
      })
      .afterClosed()
      .pipe(filterNotNull())
      .pipe(switchMap(() => this.config.crudService.deleteList(ids).pipe(take(1))))
      .subscribe();
  }

  ngOnDestroy(): void {
    this.checkboxesSubscriptions.forEach(s => s.unsubscribe());
  }

  private initItemFormControl(_: T): FormControl<CheckboxState> {
    const control = new FormControl<CheckboxState>('unchecked');
    const subscription = control.valueChanges.subscribe(() => {
      this.recalculateHeadCheckboxValue();
    });

    this.checkboxesSubscriptions.push(subscription);

    return control;
  }

  private recalculateHeadCheckboxValue(): void {
    let checkedAmount = 0;
    for (let itemId in this.selectedItemsFormControls) {
      const value = this.selectedItemsFormControls[itemId].value;
      if (value === 'checked' || value === true) checkedAmount++;
    }

    let state: CheckboxState;
    switch (true) {
      case checkedAmount === 0:
        state = 'unchecked';
        break;
      case checkedAmount === this.items()?.items.length:
        state = 'checked';
        break;
      default:
        state = 'indeterminate';
        break;
    }

    this.selectedItemsAmount.set(checkedAmount);

    if (state !== this.headSelectedItemsFormControl.value)
      this.headSelectedItemsFormControl.setValue(state);
  }

  private loadItems(
    config?: SmartTableConfig<T, AddFC, EditFC> | null
  ): Observable<Items<T> | null> {
    if (!config?.crudService) return of(null);

    return config.crudService
      .list({ perPage: 1000 }, null, z.any())
      .pipe(map((p: any) => p.items as T[]))
      .pipe(
        map(
          items =>
            <Items<T>>{
              columns: Object.keys(items[0]),
              items: items,
              service: config.crudService,
            }
        )
      );
  }

  private getSelectedItems(): T[] {
    return (
      this.items()?.items?.filter(i => this.selectedItemsFormControls[i.id].value === 'checked') ??
      []
    );
  }

  private initActions(config?: SmartTableConfig<T, AddFC, EditFC> | null): void {
    if (!config) return;

    config.crudService.actions = {
      POST: response => {
        const items = this.items();
        items?.items?.push(...response);
        this.items.set(items);
        this.itemsDataSource.data = items?.items ?? [];
      },
      PUT: (_, request) => {
        const items = this.items();
        const i = items?.items?.findIndex(i => i.id === request.id);
        if (!!i && i >= 0 && items) {
          items.items[i] = { ...items.items[i], ...request };
        }

        this.items.set(items);
        this.itemsDataSource.data = items?.items ?? [];
      },
      DELETE: (_, request) => {
        request.forEach((ri: any) => {
          delete this.selectedItemsFormControls[ri];
        });
        this.selectedItemsAmount.set(0);
        this.headSelectedItemsFormControl.setValue('unchecked');

        const items = this.items();
        if (items) {
          items.items = items?.items?.filter(i => !request.find((ri: any) => ri === i.id));
        }
        this.items.set(items);
        this.itemsDataSource.data = items?.items ?? [];
      },
    };
  }
}
