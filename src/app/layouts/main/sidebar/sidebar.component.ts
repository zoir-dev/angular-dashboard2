import { Component } from '@angular/core';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { DrawerService } from '../../../shared/services/drawer/drawer.service';
import { NgFor, NgIf } from '@angular/common';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [NzIconModule, NgFor, NgIf, RouterLink, RouterLinkActive],
  templateUrl: './sidebar.component.html',
})
export class SidebarComponent {
  links = [
    {
      path: '/todo',
      icon: 'file-done',
      name: 'Todo',
    },
    {
      path: '/table',
      icon: 'table',
      name: 'Table',
    },
  ];

  constructor(
    public sidebar: DrawerService,
    public router: Router,
  ) {}
}
