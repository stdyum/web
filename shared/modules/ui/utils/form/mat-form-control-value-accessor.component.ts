import { AfterViewInit, Component, EventEmitter, Input, Output } from '@angular/core';

import { FormControlValueAccessorComponent } from '@shared/modules/ui/utils/form/form-control-value-accessor.component';
import { FormControl } from '@angular/forms';

@Component({
  template: '',
  imports: [],
  standalone: true,
})
export class MatFormControlValueAccessorComponent<T>
  extends FormControlValueAccessorComponent<T>
  implements AfterViewInit
{
  @Input() label?: string | null = null;
  @Input() placeholder?: string | null = null;
  @Input() type: string = 'text';
  @Input() hint?: string | null = null;
  @Input() showBottomSpace: boolean = true;

  @Output() onInit = new EventEmitter<this>();

  rawControl = new FormControl<any>(null);

  override ngAfterViewInit(): void {
    super.ngAfterViewInit();
    this.onInit.emit(this);
  }

  raw(): any {
    return this.rawControl.value ?? this.control.value;
  }
}
