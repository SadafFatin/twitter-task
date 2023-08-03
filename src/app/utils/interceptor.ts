/* eslint-disable max-len */

import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpResponse,
  HttpErrorResponse,
} from '@angular/common/http';
import { Observable, from, throwError } from 'rxjs';
import { map, catchError, tap, switchMap } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { BaseHelper } from './baseHelper';
import { environment } from 'src/environments/environment';
export const maxRetries = 1;
export const delayMs = 6500;

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  token: string | null | undefined;

  constructor(private b: BaseHelper) {

  }


  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {

    const getResult = (this.b.getStorage(this.b.USER_DATA));

    return from(getResult)
      .pipe(

        switchMap((getResult) => {
          this.token = getResult.value;
          console.log(this.token);
          this.b.loadLoading(true);
          console.log('<<--------HttpEvent-------->>>');
          if (this.token || true) {
            request = request.clone({
              setHeaders: {
                'X-Jwt-Token': 'Bearer ' + this.token?.toString(),
              },
            });
          }
          if (!request.headers.has('Content-Type')) {
            request = request.clone({
              setHeaders: {
                'content-type': 'application/json',
              },
            });
          }
          request = request.clone({
            headers: request.headers.set('Accept', 'application/json'),
          });

          return next.handle(request).pipe(
            map((event: HttpEvent<any>) => {
              if (event instanceof HttpResponse) {
                if (environment.development) {
                  console.log('<<--------HttpResponse-------->>>\n', event);
                }
                this.b.loadLoading(false);
                if(event?.body.error === 'Invalid or Expired JWT'){
                  this.b.logout();
                  return event;
                }
              }

              return event;
            }),
            catchError((error: HttpErrorResponse) => {
              if (environment.development) {
                console.log('<<--------HttpErrorResponse-------->>>\n', error);
              }
              this.b.loadLoading(false);
              return throwError(error);
            })
          );

        })

    );
  }
}


