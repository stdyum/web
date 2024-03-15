import { Inject, inject, Injectable, InjectionToken } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { z } from 'zod';
import { validate } from '@shared/rxjs/pipes/validate';
import { Observable, tap, UnaryFunction } from 'rxjs';

export const CRUD_URL_TOKEN = new InjectionToken<string>('crud url');

@Injectable()
export class CrudService<T, DTO = T, ID = string> {
  protected schema: z.Schema | null = null;
  protected query: any = {};
  protected onAction: { [key: string]: (response: any, request: any, data: any) => void } = {};
  private http = inject(HttpClient);

  constructor(@Inject(CRUD_URL_TOKEN) protected url: string) {}

  set actions(a: { [key: string]: (response: any, request: any, data: any) => void }) {
    this.onAction = a;
  }

  list(
    query: any = {},
    data: any = null,
    schema: z.Schema = z.array(this.schema ?? z.any())
  ): Observable<T[]> {
    return this.http
      .get<T[]>(this.url, { params: this.concatQuery(query) })
      .pipe(validate(schema))
      .pipe(this.applyAction('LIST', null, data));
  }

  get(id: ID, query: any = {}, data: any = null): Observable<T> {
    return this.http
      .get<T>(`${this.url}/${id}`, { params: this.concatQuery(query) })
      .pipe(validate(this.schema))
      .pipe(this.applyAction('GET', null, data));
  }

  put(id: ID, dto: DTO, query: any = {}, data: any = null): Observable<T> {
    return this.http
      .put<T>(this.url, { ...dto, id: id }, { params: this.concatQuery(query) })
      .pipe(this.applyAction('PUT', { ...dto, id: id }, data));
  }

  post(dto: DTO, query: any = {}, data: any = null): Observable<T> {
    return this.http
      .post<T>(this.url, dto, { params: this.concatQuery(query) })
      .pipe(validate(this.schema))
      .pipe(this.applyAction('POST', dto, data));
  }

  postList(dto: DTO[], query: any = {}, data: any = null): Observable<T> {
    return this.http
      .post<T>(this.url, { list: dto }, { params: this.concatQuery(query) })
      .pipe(validate(this.schema))
      .pipe(this.applyAction('POST', dto, data));
  }

  delete(id: ID, query: any = {}, previous: T | null = null, data: any = null): Observable<void> {
    return this.http
      .delete<void>(`${this.url}/${id}`, { params: this.concatQuery(query) })
      .pipe(this.applyAction('DELETE', previous, data));
  }

  deleteList(ids: ID[], query: any = {}, data: any = null): Observable<void> {
    return this.http
      .delete<void>(this.url, { params: this.concatQuery(query), body: { ids: ids } })
      .pipe(this.applyAction('DELETE', ids, data));
  }

  private applyAction<O, T, D>(
    action: string,
    previous: T | null = null,
    data: D | null = null
  ): UnaryFunction<Observable<O>, Observable<O>> {
    return tap(v => (this.onAction[action] ? this.onAction[action](v, previous, data) : null));
  }

  private concatQuery(query: any): any {
    return { ...this.query, ...query };
  }
}
