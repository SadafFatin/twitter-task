import { Injectable } from '@angular/core';
import { APIBaseService as BaseService } from './api_base.service';
import { domain } from 'src/environments/environment';
import { Observable, catchError } from 'rxjs';
import { SignupApiResp } from '../models/auth';
import { FollowApiResponse, MakeTweetApiResponse, MyTweetsApiResponse, ProfileDetailApiResponse, TimeLineApiResponse, Tweet, UserListApiResponse } from '../models/tweet';

@Injectable({
  providedIn: 'root',
})
export class TweetService extends BaseService {

  //my
  myTimeLine(page = 1): Observable<TimeLineApiResponse> {
    const url = `${domain}timeline?page=${page}&size=30`;
    return this.http.get<TimeLineApiResponse>(url)
      .pipe(
        catchError((err) => {
          return this.errorHandle(err);
        })
      );
  }

  myTweets(page = 1): Observable<MyTweetsApiResponse> {
    const url = `${domain}my-tweets?page=${page}&size=30`;
    return this.http.get<MyTweetsApiResponse>(url)
      .pipe(
        catchError((err) => {
          return this.errorHandle(err);
        })
      );
  }

  makeTweet(body: any): Observable<MakeTweetApiResponse> {
    const url = `${domain}tweet`;
    return this.http.post<MakeTweetApiResponse>(url, body)
      .pipe(
        catchError((err) => {
          return this.errorHandle(err);
        })
      );
  }

  myAttributes(page=1,attribute='my-tweets'){
    const url = `${domain}${attribute}?page=${page}&size=30`;
    return this.http.get<ProfileDetailApiResponse>(url)
      .pipe(
        catchError((err) => {
          return this.errorHandle(err);
        })
      );
  }

  follow(body: any): Observable<FollowApiResponse> {
    const url = `${domain}follow`;
    return this.http.post<FollowApiResponse>(url, body)
      .pipe(
        catchError((err) => {
          return this.errorHandle(err);
        })
      );
  }

  unfollow(body: any): Observable<FollowApiResponse> {
    const url = `${domain}unfollow`;
    return this.http.post<FollowApiResponse>(url, body)
      .pipe(
        catchError((err) => {
          return this.errorHandle(err);
        })
      );
  }


  //users
  users(page = 1): Observable<UserListApiResponse> {
    const url = `${domain}users?page=${page}&size=30`;
    return this.http.get<UserListApiResponse>(url)
      .pipe(
        catchError((err) => {
          return this.errorHandle(err);
        })
      );
  }

  search(page = 1,body:any){
    const url = `${domain}search?page=${page}&size=30`;
    return this.http.post<UserListApiResponse>(url,body)
      .pipe(
        catchError((err) => {
          return this.errorHandle(err);
        })
      );
  }



  userAttributes(page=1,userid:number,attribute='tweet'){
    const url = `${domain}users/${userid}/${attribute}?page=${page}&size=30`;
    return this.http.get<ProfileDetailApiResponse>(url)
      .pipe(
        catchError((err) => {
          return this.errorHandle(err);
        })
      );
  }







  // signup(body: any): Observable<SignupApiResp> {
  //   const url = `${domain}signup`;
  //   return this.http.post<SignupApiResp>(url, body)
  //     .pipe(
  //       catchError((err) => {
  //         return this.errorHandle(err);
  //       })
  //     );
  // }



}

