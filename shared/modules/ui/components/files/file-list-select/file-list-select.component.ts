import { ChangeDetectionStrategy, Component, forwardRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatFormControlValueAccessorComponent } from '@shared/modules/ui/utils/form/mat-form-control-value-accessor.component';
import { MatInputModule } from '@angular/material/input';
import { TranslatePipe } from 'i18n';
import { FilePreviewComponent } from '@shared/modules/ui/components/files/file-preview/file-preview.component';
import { Head3Component } from '@ui/text/head3.component';
import { Head4Component } from '@ui/text/head4.component';
import { NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'file-list-select',
  standalone: true,
  imports: [
    CommonModule,
    MatInputModule,
    TranslatePipe,
    FilePreviewComponent,
    Head3Component,
    Head4Component,
  ],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => FileListSelectComponent),
      multi: true,
    },
  ],
  templateUrl: './file-list-select.component.html',
  styleUrl: './file-list-select.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FileListSelectComponent extends MatFormControlValueAccessorComponent<File[]> {
  dragEvent(e: Event): void {
    e.preventDefault();
  }

  onDrop(e: DragEvent): void {
    e.preventDefault();
    e.stopPropagation();

    this.onSelect(e.dataTransfer?.files ?? null);
  }

  fileSelect(e: Event): void {
    e.preventDefault();
    e.stopPropagation();

    this.onSelect((e.target as HTMLInputElement).files);
  }

  deleteFile(file: File): void {
    //fixes popup close
    setTimeout(() => this.control.setValue((this.control.value ?? []).filter(f => f !== file)));
  }

  private onSelect(list: FileList | null): void {
    const files: File[] = this.convertFileList(list);
    this.control.setValue([...(this.control.value ?? []), ...files]);
  }

  private convertFileList(list: FileList | null): File[] {
    if (!list) return [];

    const files: File[] = [];
    for (let i = 0; i < list.length; i++) {
      const file: File = list[i];
      files.push(file);
    }

    return files;
  }
}
