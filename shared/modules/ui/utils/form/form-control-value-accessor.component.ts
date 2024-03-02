import { AfterViewInit, Component, inject, Injector, OnDestroy } from '@angular/core';

import { ControlValueAccessor, FormControl, NgControl } from '@angular/forms';
import { Subscription } from 'rxjs';

@Component({
  template: '',
  imports: [],
  standalone: true,
})
export class FormControlValueAccessorComponent<T>
  implements ControlValueAccessor, AfterViewInit, OnDestroy
{
  control = new FormControl<T | null>(null);

  changeSubscription?: Subscription;
  touchSubscription?: Subscription;

  protected injector = inject(Injector);

  ngAfterViewInit(): void {
    const c = this.injector.get(NgControl, null);
    if (!c) return;

    this.control.addValidators(c.control?.validator ?? []);
  }

  registerOnChange(fn: (v: T | null) => void): void {
    this.changeSubscription = this.control.valueChanges.subscribe(fn);
  }

  registerOnTouched(fn: () => void): void {
    this.touchSubscription = this.control.valueChanges.subscribe(fn);
  }

  writeValue(value: T | null): void {
    this.control.setValue(value);
  }

  setDisabledState(isDisabled: boolean): void {
    if (isDisabled) this.control.disable();
    else this.control.enable();
  }

  clear(e: Event | null = null): void {
    e?.preventDefault();
    this.control.setValue(null);
  }

  ngOnDestroy(): void {
    this.changeSubscription?.unsubscribe();
    this.touchSubscription?.unsubscribe();
  }
}
