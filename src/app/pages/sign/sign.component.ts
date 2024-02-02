import { Component } from '@angular/core';
import { AuthComponent } from '../../core/components/auth/auth.component';
import { AuthLayout } from '../../layouts/auth/auth.component';

@Component({
  selector: 'app-sign',
  standalone: true,
  imports: [AuthComponent,AuthLayout],
  templateUrl: './sign.component.html',
  styleUrl: './sign.component.css'
})
export class SignComponent {

}
