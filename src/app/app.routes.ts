import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth/auth.guard';

export const routes: Routes = [
  {
    path:'',
    loadComponent:()=>import('./layouts/main/main.component').then(m=>m.MainComponent)
  },
  {
    path:'sign',
    loadComponent:()=>import('./pages/sign/sign.component').then(s=>s.SignComponent),
    canActivate:[authGuard]
  },
  {
    path:'login',
    loadComponent:()=>import('./pages/login/login.component').then(s=>s.LoginComponent),
    canActivate:[authGuard]
  },
];
