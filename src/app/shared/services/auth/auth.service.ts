import { isPlatformBrowser } from '@angular/common';
import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  token$ = new BehaviorSubject<string>('');
  userInfo$ = new BehaviorSubject<any>({});
  loading$ = new BehaviorSubject<boolean>(false);
  isBrowser: boolean = false;
  constructor(@Inject(PLATFORM_ID) platformId: Object) {
    this.isBrowser = isPlatformBrowser(platformId);
    if (this.isBrowser) {
      let token;
      token = localStorage.getItem('token');
      this.token$.next(`${token}`);
    }
  }

  setToken(token: string) {
    if (this.isBrowser) {
      localStorage.setItem('token', token);
      this.token$.next(token);
    }
  }

  logOut() {
    if (this.isBrowser) {
      this.token$.next('');
      this.userInfo$.next({});
      localStorage.removeItem('token');
    }
  }
}
