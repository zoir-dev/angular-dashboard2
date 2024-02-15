import { Component } from '@angular/core';
import { NzDrawerModule } from 'ng-zorro-antd/drawer';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { RouterLink, RouterLinkActive } from '@angular/router';

import { NgFor } from '@angular/common';
import { CustomeImageComponent } from '../../../shared/themes/custome-image/custome-image.component';
import { DrawerService } from '../../../shared/services/drawer/drawer.service';

@Component({
  selector: 'app-drawer',
  standalone: true,
  imports: [
    NzDrawerModule,
    NzIconModule,
    CustomeImageComponent,
    RouterLink,
    RouterLinkActive,
    NgFor,
    NzIconModule,
  ],
  templateUrl: './drawer.component.html',
  styleUrl: './drawer.component.css',
})
export class DrawerComponent {
  links = [
    {
      icon: 'file-done',
      name: 'Todo',
      href: 'todo',
    },
    {
      icon: 'table',
      name: 'Table',
      href: 'table',
    },
  ];
  constructor(public drawer: DrawerService) {}
}
