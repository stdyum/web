import { Component, input } from '@angular/core';

import { MatButtonModule } from '@angular/material/button';
import { TranslateComponent } from '@shared/modules/ui/utils/translate/translate.component';
import { TranslatePipe } from 'i18n';

@Component({
  selector: 'warn-button',
  template:
    '<button class="button-error" mat-flat-button [disabled]="disabled()"><ng-content></ng-content>{{key | translate}}</button>',
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
export class WarnButtonComponent extends TranslateComponent {
  disabled = input<boolean>(false);
}
