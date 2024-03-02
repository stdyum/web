import {
  ChangeDetectionStrategy,
  Component,
  inject,
  Input,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { TextInputComponent } from '@ui/inputs/text-input/text-input.component';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  FormGroupDirective,
  ReactiveFormsModule,
} from '@angular/forms';
import { ItemsSelectComponent } from '@ui/selects/items-select/items-select.component';
import { SearchableSelectComponent } from '@ui/selects/searchable-select/searchable-select.component';
import { AutocompleteTextComponent } from '@ui/selects/autocomplete-text/autocomplete-text.component';
import {
  FileFormElementTypeConfig,
  FormConfig,
  FormConfigElement,
  FormConfigElements,
  FormConfigElementTypes,
} from '@shared/modules/ui/entities/form.config';
import { DateTimeRangePickerComponent } from '@shared/modules/ui/components/pickers/date-time-range-picker/date-time-range-picker.component';
import { DateRangePickerComponent } from '@shared/modules/ui/components/pickers/date-range-picker/date-range-picker.component';
import { NumberInputComponent } from '@ui/inputs/number-input/number-input.component';
import { ColorInputComponent } from '@ui/inputs/color-input/color-input.component';
import { ColorSelectComponent } from '@ui/selects/color-select/color-select.component';
import { TimePickerViewComponent } from '@shared/modules/ui/components/datetime/time-picker-view/time-picker-view.component';
import { FileListSelectComponent } from '@shared/modules/ui/components/files/file-list-select/file-list-select.component';
import { Subscription, take } from 'rxjs';
import { File } from '@shared/modules/ui/entities/file';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'simple-form-config-builder',
  templateUrl: './form-config-builder.component.html',
  styleUrls: ['./form-config-builder.component.scss'],
  imports: [
    CommonModule,
    TextInputComponent,
    ReactiveFormsModule,
    ItemsSelectComponent,
    SearchableSelectComponent,
    AutocompleteTextComponent,
    DateRangePickerComponent,
    DateTimeRangePickerComponent,
    NumberInputComponent,
    ColorInputComponent,
    ColorSelectComponent,
    TimePickerViewComponent,
    FileListSelectComponent,
  ],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FormConfigBuilderComponent<T extends FormConfigElements<T>>
  implements OnInit, OnDestroy
{
  @Input({ required: true }) config!: FormConfig<T>;

  formDirective = inject(FormGroupDirective);

  protected readonly Types = FormConfigElementTypes;

  private http = inject(HttpClient);
  private subscriptions: Subscription[] = [];

  get formConfigEntries(): [string, FormConfigElement<any>][] {
    return Object.entries(this.config.elements ?? {});
  }

  ngOnInit(): void {
    this.initFormControls(this.formDirective.form);
  }

  trackBy = (_: number, el: [string, FormConfigElement<any>]) => el[0];

  getControlByName(name: string): FormControl | null {
    return this.formDirective.form.controls[name] as FormControl | null;
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(s => s.unsubscribe());
  }

  private initFormControls(form: FormGroup): void {
    this.formConfigEntries.forEach(([name, config]) => {
      switch (config.type) {
        case FormConfigElementTypes.FILE_LIST:
          this.initFileConfig(form.controls[name], config.typeConfig);
      }
    });
  }

  private initFileConfig(control: AbstractControl, typeConfig: FileFormElementTypeConfig): void {
    const upload = (file: File): void => {
      if (!typeConfig.instantUpload || !typeConfig.upload) return;

      const formData = new FormData();
      formData.append(typeConfig.upload?.formDataFieldName ?? 'file', file);

      this.http
        .request(typeConfig.upload.method, typeConfig.upload.url, { body: formData })
        .pipe(take(1))
        .subscribe(() => (file.loaded = true));
    };

    const s = control.valueChanges.subscribe((files: File[] | null) => {
      console.log(files);
      files?.filter(f => !f.loaded).map(f => upload(f));
    });
    this.subscriptions.push(s);
  }
}
