import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AngularFireModule } from '@angular/fire/compat';
import { AsyncPipe, NgFor, NgIf } from '@angular/common';

import { NzInputModule } from 'ng-zorro-antd/input';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzCheckboxModule } from 'ng-zorro-antd/checkbox';
import { MainLayout } from '../../layouts/main/main.component';
import { NzSpinModule } from 'ng-zorro-antd/spin';

import { environment } from '../../../environments/environment';
import { PingIconComponent } from './components/ping-icon/ping-icon.component';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    MainLayout,
    NgIf,
    NgFor,
    AsyncPipe,
    NzInputModule,
    NzIconModule,
    NzButtonModule,
    NzCheckboxModule,
    NzSpinModule,
    PingIconComponent,
  ],
  exports: [
    MainLayout,
    NgIf,
    NgFor,
    AsyncPipe,
    NzInputModule,
    NzIconModule,
    NzButtonModule,
    NzCheckboxModule,
    NzSpinModule,
    PingIconComponent,
  ],
})
export class TodoModule {}
