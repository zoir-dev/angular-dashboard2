import { NgModule } from '@angular/core';
import { CommonModule, NgIf } from '@angular/common';
import { provideAuth } from '@angular/fire/auth';
import { environment } from '../environments/environment';
import { provideFirebaseApp } from '@angular/fire/app';
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

import { NzSpinModule } from 'ng-zorro-antd/spin';
import { NzDrawerModule } from 'ng-zorro-antd/drawer';

import { LoadingBarRouterModule } from '@ngx-loading-bar/router';

import { DrawerComponent } from './pages/home/drawer/drawer.component';
import { SidebarComponent } from './layouts/main/sidebar/sidebar.component';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    provideFirebaseApp(() => initializeApp(environment.firebaseConfig)),
    provideAuth(() => getAuth()),
    NzSpinModule,
    NzDrawerModule,
    LoadingBarRouterModule,
    NgIf,
    DrawerComponent,
    SidebarComponent,
  ],
  exports: [
    NzSpinModule,
    NzDrawerModule,
    LoadingBarRouterModule,
    NgIf,
    DrawerComponent,
    SidebarComponent,
  ],
})
export class AppModule {}
