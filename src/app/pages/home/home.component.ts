import { Component } from '@angular/core';
import { MainLayout } from '../../layouts/main/main.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [MainLayout],
  templateUrl: './home.component.html',
})
export class HomeComponent {}
