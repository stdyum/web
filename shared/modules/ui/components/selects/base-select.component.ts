import { ChangeDetectionStrategy, Component, inject, Input } from '@angular/core';
import { SelectItem, SelectItems } from '@shared/modules/ui/entities/select';
import { Observable, Subscription } from 'rxjs';
import { SelectsService } from '@ui/selects/selects.service';
import { MatFormControlValueAccessorComponent } from '@shared/modules/ui/utils/form/mat-form-control-value-accessor.component';

@Component({
  template: '',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BaseSelectComponent<V> extends MatFormControlValueAccessorComponent<V> {
  items$!: Observable<SelectItem<V>[]>;
  items!: SelectItem<V>[];

  private service = inject(SelectsService);
  private itemsSubscription!: Subscription;
  private controlSubscription!: Subscription;

  @Input({ required: true, alias: 'items' }) set _items(value: SelectItems<V>) {
    this.items$ = this.service.parseValue(value);
  }

  override ngAfterViewInit(): void {
    super.ngAfterViewInit();

    this.itemsSubscription = this.items$.subscribe(items => {
      this.items = items;
      const item = this.items.find(i => i.value === this.control.value);
      this.rawControl.setValue(item);
    });

    this.controlSubscription = this.control.valueChanges.subscribe(value => {
      const item = this.items.find(i => i.value === value);
      this.rawControl.setValue(item);
    });
  }

  trackBy = (_: number, item: SelectItem<V>) => item.id ?? item.value ?? null;

  override ngOnDestroy(): void {
    super.ngOnDestroy();

    this.itemsSubscription?.unsubscribe();
    this.controlSubscription?.unsubscribe();
  }
}
