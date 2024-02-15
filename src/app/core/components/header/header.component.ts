import { Component, Input, OnDestroy } from '@angular/core';
import { AsyncPipe, NgFor, NgIf } from '@angular/common';
import { RouterLink, RouterModule } from '@angular/router';

import { Subject, takeUntil } from 'rxjs';

import { NzAvatarModule } from 'ng-zorro-antd/avatar';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzToolTipModule } from 'ng-zorro-antd/tooltip';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';
import { NzIconModule } from 'ng-zorro-antd/icon';

import { Auth } from '@angular/fire/auth';

import { UserInfo } from '../../../shared/types/userInfo';
import { ThemeService } from '../../../shared/services/theme/theme.service';
import { AuthService } from '../../../shared/services/auth/auth.service';
import {
  capitalizeLetter,
  capitalizeWord,
} from '../../../shared/functions/capitalize';
import { CustomeImageComponent } from '../../../shared/themes/custome-image/custome-image.component';
import { DrawerService } from '../../../shared/services/drawer/drawer.service';

@Component({
  selector: 'app-header',
  standalone: true,
  host: { ngSkipHydration: 'true' },
  imports: [
    NgIf,
    NgFor,
    NzAvatarModule,
    NzButtonModule,
    RouterModule,
    AsyncPipe,
    NzToolTipModule,
    CustomeImageComponent,
    RouterLink,
    NzIconModule,
    NzDropDownModule,
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent implements OnDestroy {
  @Input() forAuth!: boolean;

  darkMode: boolean = false;
  userInfo!: UserInfo;
  loadingImg: boolean = true;

  unsubscribe$ = new Subject();

  constructor(
    private theme: ThemeService,
    private authService: AuthService,
    private auth: Auth,
    private msg: NzMessageService,
    public drawer: DrawerService,
  ) {
    this.theme.darkMode$
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((val) => (this.darkMode = val));
    this.authService.userInfo$
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((val: UserInfo) => (this.userInfo = val));
  }
  avatarText() {
    return capitalizeLetter(this.userInfo.name);
  }
  tooltipText() {
    return capitalizeWord(this.userInfo.name);
  }

  async logOut() {
    try {
      await this.auth.signOut();
      this.authService.logOut();
      this.msg.success('Successfully logged out');
    } catch (error: any) {
      this.msg.error(error.message);
    }
  }

  changeMode(val: any) {
    this.theme.changeMode(val.target.checked);
  }
  ngOnDestroy(): void {
    this.unsubscribe$.next(null);
    this.unsubscribe$.unsubscribe();
  }
}
