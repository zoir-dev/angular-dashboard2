import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth/auth.guard';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./pages/home/home.component').then((s) => s.HomeComponent),
  },
  {
    path: 'sign',
    loadComponent: () =>
      import('./pages/sign/sign.component').then((s) => s.SignComponent),
    canActivate: [authGuard],
  },
  {
    path: 'login',
    loadComponent: () =>
      import('./pages/login/login.component').then((s) => s.LoginComponent),
    canActivate: [authGuard],
  },
  {
    path: 'todo',
    loadComponent: () =>
      import('./pages/todo/todo.component').then((t) => t.TodoComponent),
  },
  {
    path: 'table',
    loadComponent: () =>
      import('./pages/table/table.component').then((t) => t.TableComponent),
  },
];
