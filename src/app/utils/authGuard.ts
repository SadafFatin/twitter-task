import { Injectable } from '@angular/core';
import { BaseHelper } from './baseHelper';
import {  CanLoad } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanLoad {
  constructor(private b: BaseHelper) { }
  async canLoad() {
    const token = (await this.b.getStorage(this.b.USER_DATA)).value;
    if (token !== "null") {
      return true;
    } else {
      return false;
    }
  }
}
