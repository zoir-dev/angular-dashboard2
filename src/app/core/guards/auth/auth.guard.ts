import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../../../shared/services/auth/auth.service';
import { inject } from '@angular/core';
import { UserInfo } from '../../../shared/types/userInfo';

export const authGuard: CanActivateFn = (route, state) => {
  let userInfo!: UserInfo;
  let loading: boolean = true;
  inject(AuthService).userInfo$.subscribe((val) => (userInfo = val));
  inject(AuthService).loading$.subscribe((val) => (loading = val));

  if (!loading && userInfo?.email === '') {
    inject(Router).navigate(['']);
    return false;
  } else {
    return true;
  }
};
