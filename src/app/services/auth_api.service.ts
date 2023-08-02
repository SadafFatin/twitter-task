import { Injectable } from '@angular/core';
import { APIBaseService as BaseService } from './api_base.service';
import { domain } from 'src/environments/environment';
import { Observable, catchError, throwError } from 'rxjs';
import { LoginApiResp, SignupApiResp } from '../models/auth';

@Injectable({
  providedIn: 'root',
})
export class AuthService extends BaseService {

  login(body: any): Observable<LoginApiResp> {
    const url = `${domain}login`;
    return this.http.post<LoginApiResp>(url, body)
      .pipe(
        catchError((err) => {
          return this.errorHandle(err);
        })
      );

  }

  signup(body: any): Observable<SignupApiResp> {
    const url = `${domain}signup`;
    return this.http.post<SignupApiResp>(url, body)
      .pipe(
        catchError((err) => {
          return this.errorHandle(err);
        })
      );
  }



}

