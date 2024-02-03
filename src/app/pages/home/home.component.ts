import { Component } from '@angular/core';
import {  MainLayout } from '../../layouts/main/main.component';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [MainLayout,RouterLink],
  templateUrl: './home.component.html',
})
export class HomeComponent {

}
