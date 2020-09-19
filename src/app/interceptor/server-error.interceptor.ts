import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { AlertService } from '../service/alert.service';
import { AuthService } from '../service/auth.service';

@Injectable()
export class ServerErrorInterceptor implements HttpInterceptor {
  constructor(
    private authService: AuthService,
    private alertService: AlertService
  ) {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    return next.handle(request).pipe(
      catchError((error: HttpErrorResponse) => {

        if (!environment.production) {
          console.error(error);
        }

        // UNAUTHORIZED
        if (error.status === 401) {
          this.alertService.addAlert(
            'Your session has been expired. Please log in again.',
            'danger'
          );
          this.authService.logout(true);
        }

        return throwError(error);
      })
    );
  }
}
