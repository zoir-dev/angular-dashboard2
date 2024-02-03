import { Component } from '@angular/core';
import { HeaderComponent } from '../../core/components/header/header.component';

@Component({
  selector: 'main-layout',
  standalone: true,
  imports: [HeaderComponent],
  templateUrl: './main.component.html',
})
export class MainLayout {

}
