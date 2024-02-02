import { Component } from '@angular/core';
import { HeaderComponent } from '../../core/components/header/header.component';

@Component({
  selector: 'app-main',
  standalone: true,
  imports: [HeaderComponent],
  templateUrl: './main.component.html',
  styleUrl: './main.component.css'
})
export class MainComponent {

}