import { NgModule } from '@angular/core';
import { FileListSelectComponent } from '@shared/modules/ui/components/files/file-list-select/file-list-select.component';

@NgModule({
  imports: [FileListSelectComponent],
  exports: [FileListSelectComponent],
})
export class FilesModule {}
