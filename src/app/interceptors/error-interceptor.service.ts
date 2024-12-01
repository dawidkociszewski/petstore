import {HttpInterceptorFn} from '@angular/common/http';
import {catchError, throwError} from 'rxjs';
import {inject} from '@angular/core';
import {NotificationService} from '../services/notification.service';
import {httpError} from '../const/alerts';

export const errorInterceptorFunctional: HttpInterceptorFn = (req, next) => {
  const utilsService = inject(NotificationService);
  return next(req).pipe(catchError(() => {
    return throwError(() => utilsService.showNotification(httpError));
  }));
}
