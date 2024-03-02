import { Observable, tap, UnaryFunction } from 'rxjs';

export const debug = <T>(
  prefix: string = '-',
  copy = deepCopy
): UnaryFunction<Observable<T>, Observable<T>> =>
  tap({
    next: v => console.log(`[${prefix}] -> next`, copy(v)),
    error: v => console.error(`[${prefix}] -> error`, copy(v)),
    complete: () => console.log(`[${prefix}] -> completed`),
  });

const deepCopy = <T>(v: T): T => {
  if (!v) return v;
  return JSON.parse(JSON.stringify(v));
};
