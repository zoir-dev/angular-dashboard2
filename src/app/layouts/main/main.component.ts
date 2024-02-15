import { Component } from '@angular/core';
import { HeaderComponent } from '../../core/components/header/header.component';
import { SidebarComponent } from './sidebar/sidebar.component';

@Component({
  selector: 'main-layout',
  standalone: true,
  imports: [HeaderComponent, SidebarComponent],
  templateUrl: './main.component.html',
})
export class MainLayout {}
