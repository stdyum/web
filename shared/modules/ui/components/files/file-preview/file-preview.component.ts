import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IconComponent } from '@ui/images/icon.component';
import { P2Component } from '@ui/text/p2.component';
import { MatTooltipModule } from '@angular/material/tooltip';

@Component({
  selector: 'file-preview',
  standalone: true,
  imports: [CommonModule, IconComponent, P2Component, MatTooltipModule],
  templateUrl: './file-preview.component.html',
  styleUrl: './file-preview.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FilePreviewComponent {
  @Input({ required: true }) file!: File;
  @Output() deleteFile = new EventEmitter<File>();
}
