import { NgModule } from '@angular/core';
import { ConfirmationDialogComponent } from '@shared/modules/ui/components/dialogs/confirmation-dialog/confirmation-dialog.component';
import { FormConfigDialogComponent } from '@shared/modules/ui/components/dialogs/form-config-dialog/form-config-dialog.component';

@NgModule({
  imports: [ConfirmationDialogComponent, FormConfigDialogComponent],
  exports: [ConfirmationDialogComponent, FormConfigDialogComponent],
})
export class DialogsModule {}
