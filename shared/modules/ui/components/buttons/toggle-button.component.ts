import { Component, input, Input } from '@angular/core';

import { MatButtonModule } from '@angular/material/button';
import { TranslateComponent } from '@shared/modules/ui/utils/translate/translate.component';
import { TranslatePipe } from 'i18n';

@Component({
  selector: 'toggle-button',
  template:
    '<button [class]="class(toggled())" mat-flat-button><ng-content></ng-content>{{key | translate}}</button>',
  styles: [
    `
      :host {
        cursor: pointer;
      }

      button {
        width: 100%;
      }
    `,
  ],
  imports: [MatButtonModule, TranslatePipe],
  standalone: true,
})
export class ToggleButtonComponent extends TranslateComponent {
  @Input() defaultState: 'primary' | 'secondary' | 'tertiary' | 'error' = 'primary';
  @Input() toggleState: 'primary' | 'secondary' | 'tertiary' | 'error' = 'secondary';
  toggled = input<boolean>(false);

  class(toggled: boolean): string {
    return toggled ? `button-${this.toggleState}` : `button-${this.defaultState}`;
  }
}
