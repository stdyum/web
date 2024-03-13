import { NgModule } from '@angular/core';

import { PanelComponent } from './panel.component';
import { RouterModule } from '@angular/router';
import { routes } from './panel.routes';
import { provideTranslationSuffix } from 'i18n';

@NgModule({
  declarations: [PanelComponent],
  imports: [RouterModule.forChild(routes)],
  providers: [provideTranslationSuffix('panel')],
})
export class PanelModule {}
