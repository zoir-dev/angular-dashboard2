import { NgIf } from '@angular/common';
import { Component, Input } from '@angular/core';
import { NzIconModule } from 'ng-zorro-antd/icon';

@Component({
  selector: 'app-ping-icon',
  standalone: true,
  imports: [NzIconModule, NgIf],
  templateUrl: './ping-icon.component.html',
  styleUrl: './ping-icon.component.css',
})
export class PingIconComponent {
  @Input() type!: string;
  @Input() theme: 'outline' | 'twotone' = 'outline';
  @Input() color: string = 'bg-primary';
  @Input() animating!: boolean;
}
