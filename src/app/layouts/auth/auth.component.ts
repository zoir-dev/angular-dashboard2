import { Component } from '@angular/core';
import { HeaderComponent } from '../../core/components/header/header.component';
import {  RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-auth-layout',
  standalone: true,
  imports: [ RouterOutlet,HeaderComponent],
  templateUrl: './auth.component.html',
})
export class AuthLayout {

}
