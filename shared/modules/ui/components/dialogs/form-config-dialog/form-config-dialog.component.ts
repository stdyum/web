import { Component, inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormConfig } from '@shared/modules/ui/entities/form.config';
import { DefaultFormComponent } from '@ui/forms/default-form/default-form.component';

@Component({
  selector: 'form-config-dialog',
  standalone: true,
  imports: [DefaultFormComponent],
  templateUrl: './form-config-dialog.component.html',
  styleUrl: './form-config-dialog.component.scss',
})
export class FormConfigDialogComponent {
  data = inject<FormConfig<any>>(MAT_DIALOG_DATA);
  private dialogRef = inject(MatDialogRef);

  submit(data: any): void {
    this.dialogRef.close(data);
  }
}
