import {  CanActivateFn } from '@angular/router';
import { AuthService } from '../../../shared/services/auth/auth.service';
import { inject } from '@angular/core';

export const authGuard: CanActivateFn = (route, state) => {
  let userInfo!:{name:string,email:string,img:string}
  inject(AuthService).userInfo$.subscribe(val=>userInfo=val)
  if(userInfo.email){
    return false
  }else{
    return true
  }
};
