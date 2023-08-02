/* eslint-disable eqeqeq */
/* eslint-disable @typescript-eslint/naming-convention */
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BaseHelper } from '../utils/baseHelper';
import { throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class APIBaseService {
  constructor(
    public http: HttpClient,
    public b: BaseHelper,
  ) { }



  getHeader(params = {}) {
    // return {
    //   headers: new HttpHeaders({
    //     Authorization: this.g.jws,
    //   }),
    //   params,
    // };
  }
  errorHandle(err: any) {
    this.b.loadLoading(false);
    let message = err?.error?.error ? err.error.error : err.message;
    if (err.status == '0') {
      message = 'Failed reaching server!!!.Make sure you are connected to internet or camp site network.';
    }
    if (!message) {
      message = 'Opps!!! .Unknown Error.Make sure you are connected and retry.';
    }
    this.b.errorToast(message);
    return throwError(() => new Error(err));
  }
}
