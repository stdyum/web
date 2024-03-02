import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialogModule } from '@angular/material/dialog';
import { MatPopup } from '@shared/material/popup/mat-popup.service';

@NgModule({
  imports: [CommonModule, MatDialogModule],
  providers: [MatPopup],
})
export class MatPopupModule {}
