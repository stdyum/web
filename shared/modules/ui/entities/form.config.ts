import { FormControl, ValidatorFn } from '@angular/forms';
import { Observable } from 'rxjs';
import { SelectItems } from '@shared/modules/ui/entities/select';
import { DateTime } from 'luxon';
import { HttpClient } from '@angular/common/http';

export type FormValue<V extends Object> = V | Observable<V> | (() => FormValue<V>);

export interface HttpOnSubmitConfig {
  url: string;
  method: string;
  list?: boolean;
  options?: object;
}

export function httpOnSubmit(
  http: HttpClient,
  config: HttpOnSubmitConfig
): (body: any) => Observable<any> {
  return (body: any): Observable<any> => {
    return http.request(config.method, config.url, {
      ...config.options,
      body: config.list ? { list: [body] } : body,
    });
  };
}

export interface FormConfig<T extends FormConfigElements<T>, V extends Object = any> {
  elements: T;
  value?: FormValue<V>;
  onSubmit?: (body: any) => Observable<any>;
}

export interface BaseFormConfigElement<T> {
  control?: FormControl<T>;
  initial?: T;
  hidden?: boolean;
  validators?: ValidatorFn | ValidatorFn[];
  formatter?: (value: any) => any;
  transform?: (value: any) => T;
}

export interface DependedFormConfigElement<F = any, T = any> {
  dependsOn: string;
  cacheable?: boolean;
  dependsItems: (item: F, formValue: any) => T;
}

export interface DateRangeFormElementValue {
  start?: DateTime | null;
  end?: DateTime | null;
}

export type FormConfigElement<T = string> = BaseFormConfigElement<T> & {
  dependable?: DependedFormConfigElement;
} & (
    | {
        type: FormConfigElementTypes.TEXT;
        typeConfig: BaseFormElementTypeConfig<T>;
      }
    | {
        type: FormConfigElementTypes.NUMBER;
        typeConfig: BaseFormElementTypeConfig<T>;
      }
    | {
        type: FormConfigElementTypes.PASSWORD;
        typeConfig: BaseFormElementTypeConfig<T>;
      }
    | {
        type: FormConfigElementTypes.FILE;
        typeConfig: BaseFormElementTypeConfig<T> & FileFormElementTypeConfig;
      }
    | {
        type: FormConfigElementTypes.FILE_LIST;
        typeConfig: BaseFormElementTypeConfig<T> & FileFormElementTypeConfig;
      }
    | {
        type: FormConfigElementTypes.IMAGE;
        typeConfig: BaseFormElementTypeConfig<T>;
      }
    | {
        type: FormConfigElementTypes.CHECKBOX;
        typeConfig: BaseFormElementTypeConfig<T>;
      }
    | {
        type: FormConfigElementTypes.SELECT;
        typeConfig: BaseFormElementTypeConfig<T> & SelectFormElementTypeConfig<T>;
      }
    | {
        type: FormConfigElementTypes.SEARCHABLE_SELECT;
        typeConfig: BaseFormElementTypeConfig<T> & SelectFormElementTypeConfig<T>;
      }
    | {
        type: FormConfigElementTypes.AUTOCOMPLETE_TEXT;
        typeConfig: BaseFormElementTypeConfig<T> & SelectFormElementTypeConfig<T>;
      }
    | {
        type: FormConfigElementTypes.DATE_RANGE;
        typeConfig: BaseFormElementTypeConfig<T> & DateRangeFormElementTypeConfig;
      }
    | {
        type: FormConfigElementTypes.TIME;
        typeConfig: BaseFormElementTypeConfig<T>;
      }
    | {
        type: FormConfigElementTypes.DATE_TIME_RANGE;
        typeConfig: BaseFormElementTypeConfig<T> & DateRangeFormElementTypeConfig;
      }
    | {
        type: FormConfigElementTypes.COLOR;
        typeConfig: BaseFormElementTypeConfig<T>;
      }
    | {
        type: FormConfigElementTypes.COLOR_SELECT;
        typeConfig: BaseFormElementTypeConfig<T> & SelectFormElementTypeConfig<T>;
      }
  );

export interface BaseFormElementTypeConfig<V = string, R = string> {
  placeholder?: string;
  label?: string;
  hint?: string;
}

export interface SelectFormElementTypeConfig<V = string> {
  items: SelectItems<V>;
}

export interface FileFormElementTypeConfig {
  filetypes?: string | string[];
  upload?: {
    url: string;
    method: string;
    formDataFieldName?: string;
  };
  remove?: {
    url: string;
    method: string;
  };
  instantUpload?: boolean;
}

export interface DateRangeFormElementTypeConfig {
  startControlName?: string;
  endControlName?: string;
  expand?: boolean;
  utc?: boolean;
}

export type FormConfigElements<C> = { [K in keyof C]: FormConfigElement<any> };

export enum FormConfigElementTypes {
  TEXT,
  PASSWORD,
  NUMBER,
  FILE,
  FILE_LIST,
  IMAGE,
  CHECKBOX,
  SELECT,
  SEARCHABLE_SELECT,
  AUTOCOMPLETE_TEXT,
  DATE_RANGE,
  TIME,
  DATE_TIME_RANGE,
  COLOR,
  COLOR_SELECT,
}
