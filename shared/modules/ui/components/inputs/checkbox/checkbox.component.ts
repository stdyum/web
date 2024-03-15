import { ChangeDetectionStrategy, Component, forwardRef, signal } from '@angular/core';
import { MatCheckbox, MatCheckboxChange } from '@angular/material/checkbox';
import { NG_VALUE_ACCESSOR, ReactiveFormsModule } from '@angular/forms';
import { MatFormControlValueAccessorComponent } from '@shared/modules/ui/utils/form/mat-form-control-value-accessor.component';
import { TranslatePipe } from 'i18n';

export type CheckboxState = 'checked' | 'unchecked' | 'indeterminate' | null | boolean;

@Component({
  selector: 'checkbox',
  standalone: true,
  imports: [MatCheckbox, ReactiveFormsModule, TranslatePipe],
  templateUrl: './checkbox.component.html',
  styleUrl: './checkbox.component.scss',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => CheckboxComponent),
      multi: true,
    },
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CheckboxComponent extends MatFormControlValueAccessorComponent<CheckboxState> {
  value = signal<CheckboxState>('unchecked');

  onCheck(event: MatCheckboxChange): void {
    const value = event.checked ? 'checked' : 'unchecked';

    this.control.setValue(value);
    this.value.set(value);
  }

  override writeValue(value: CheckboxState): void {
    super.writeValue(value);
    this.value.set(value);
  }
}
