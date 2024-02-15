import { Component } from '@angular/core';
import { AuthComponent } from '../../core/components/auth/auth.component';
import { AuthLayout } from '../../layouts/auth/auth.component';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [AuthComponent, AuthLayout],
  templateUrl: './login.component.html',
})
export class LoginComponent {}
