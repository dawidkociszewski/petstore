import {HttpInterceptorFn} from '@angular/common/http';
import {LoaderService} from '../services/loader.service';
import {inject} from '@angular/core';
import {Subscription} from 'rxjs';
import {finalize} from 'rxjs/operators';

export const loaderInterceptorFunctional: HttpInterceptorFn = (req, next) => {
  const spinnerSubscription: Subscription = inject(LoaderService).loader$.subscribe();
  return next(req).pipe(finalize(() => spinnerSubscription.unsubscribe()));
}
