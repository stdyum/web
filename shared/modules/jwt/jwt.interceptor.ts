import {
  HttpErrorResponse,
  HttpHandlerFn,
  HttpInterceptorFn,
  HttpRequest,
  HttpResponse,
} from '@angular/common/http';
import { inject } from '@angular/core';
import { JwtService } from './jwt.service';
import { catchError, filter, map, mergeMap, Observable, take, tap, throwError } from 'rxjs';
import { Router } from '@angular/router';

export const jwtInterceptor: HttpInterceptorFn = (
  req: HttpRequest<any>,
  next: HttpHandlerFn
): Observable<any> => {
  if (!req.url.startsWith('api') || req.url === JwtService.UPDATE_URL) return next(req);

  const service = inject(JwtService);
  const router = inject(Router);

  const setTokensPipe = tap((e: HttpResponse<any>) => {
    if (!e?.body?.tokens) return;
    service.access = e.body.tokens.access;
    service.refresh = e.body.tokens.refresh;
  });

  const nextWithToken = () =>
    next(addToken())
      .pipe(filter(e => e instanceof HttpResponse))
      .pipe(map(e => e as HttpResponse<any>))
      .pipe(catchError(onError));

  const addToken = (): HttpRequest<any> => {
    return req.clone({ setHeaders: { Authorization: service.access } });
  };

  const updateAndExecute = (): Observable<any> =>
    service.update().pipe(setTokensPipe, mergeMap(nextWithToken));

  const waitUpdateAndExecute = (): Observable<any> =>
    service.updatingChanges
      .pipe(
        filter(v => !v),
        take(1)
      )
      .pipe(mergeMap(nextWithToken));

  const onError = (err: any): Observable<any> => {
    if (!(err instanceof HttpErrorResponse)) return throwError(() => err);
    const httpErr: HttpErrorResponse = err as HttpErrorResponse;
    if (httpErr.status !== 401) return throwError(() => err);

    service.removeTokens();
    router.navigate(['']).then();
    return throwError(() => err);
  };

  if (service.isUpdating) return waitUpdateAndExecute();
  if (service.isMustUpdate()) return updateAndExecute();

  if (service.isNeedUpdate()) {
    service.update().pipe(take(1), setTokensPipe).subscribe();
    return nextWithToken();
  }

  return nextWithToken();
};
