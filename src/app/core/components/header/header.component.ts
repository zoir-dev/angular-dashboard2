import { Component, Input, OnDestroy } from '@angular/core';
import { NzAvatarModule } from 'ng-zorro-antd/avatar';
import {NzButtonModule} from 'ng-zorro-antd/button'

import { ThemeService } from '../../../shared/services/theme/theme.service';
import { Subject, takeUntil } from 'rxjs';
import { AuthService } from '../../../shared/services/auth/auth.service';
import { AsyncPipe, NgIf } from '@angular/common';
import { Auth } from '@angular/fire/auth';
import { RouterModule } from '@angular/router';
import { UserInfo } from '../../../shared/types/userInfo';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzToolTipModule } from 'ng-zorro-antd/tooltip';


@Component({
  selector: 'app-header',
  standalone: true,
  imports: [NgIf, NzAvatarModule,NzButtonModule,RouterModule,AsyncPipe,NzToolTipModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements OnDestroy {
  @Input() forAuth!: boolean

  darkMode: boolean = false;
  userInfo!:UserInfo

  unsubscribe$=new Subject()

  constructor(private theme: ThemeService,private authService:AuthService,private auth:Auth,private msg:NzMessageService) {
    this.theme.darkMode$.pipe(takeUntil(this.unsubscribe$)).subscribe(val => this.darkMode = val)
    this.authService.userInfo$.pipe(takeUntil(this.unsubscribe$)).subscribe((val:UserInfo)=>this.userInfo=val)
  }

  async logOut(){
    try {
      await  this.auth.signOut()
      this.authService.logOut()
      this.msg.success("Successfully logged out")

    } catch (error:any) {
      this.msg.error(error.message)
    }
  }

  changeMode(val: any) {
    this.theme.changeMode(val.target.checked)
  }
  ngOnDestroy(): void {
    this.unsubscribe$.next(null)
    this.unsubscribe$.unsubscribe()
  }

}
