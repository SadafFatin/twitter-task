/* eslint-disable max-len */

import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpResponse,
  HttpErrorResponse,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map, catchError, tap } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { BaseHelper } from './baseHelper';
import { environment } from 'src/environments/environment';
export const maxRetries = 1;
export const delayMs = 6500;

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  token: string | null | undefined;

  constructor(private b: BaseHelper) {
    this.loadToken();
  }

  async loadToken() {
    if (!this.token) {
      this.token = (await this.b.getStorage(this.b.USER_DATA)).value;
    }
  }

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {


    this.b.loadLoading(true);
    console.log('<<--------HttpEvent-------->>>');
    if (this.token) {
      request = request.clone({
        setHeaders: {
          'X-Jwt-Token': 'Bearer ' + this.token,
        },
      });
    }
    // if (!request.headers.has('Content-Type')) {
    //   request = request.clone({
    //     setHeaders: {
    //       'content-type': 'application/json',
    //     },
    //   });
    // }
    // request = request.clone({
    //   headers: request.headers.set('Accept', 'application/json'),
    // });

    return next.handle(request).pipe(
      map((event: HttpEvent<any>) => {
        if (event instanceof HttpResponse) {
          if (environment.development) {
            console.log('<<--------HttpResponse-------->>>\n', event);
          }
          this.b.loadLoading(false);
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
  }



}




      // retryWhen((error) =>
      //   error.pipe(
      //     mergeMap((errorItem, index) => {
      //       if (index < maxRetries) {
      //         console.log('Failed request found and retrying');
      //         return of(error).pipe(
      //           tap((err: any) => console.log(`Retrying ${err.url}. Retry count ${index + 1}`)),
      //           delay(delayMs)
      //         );
      //       }
      //       throw errorItem;
      //     })
      //   )
      // ),
