import { Component, Inject, OnDestroy, OnInit, PLATFORM_ID } from '@angular/core';
import { Event, NavigationCancel, NavigationEnd, NavigationError, NavigationStart, Router, RouterOutlet } from '@angular/router';
import {  NgIf, isPlatformBrowser } from '@angular/common';
import { AppModule } from './app.module';
import { Subject } from 'rxjs';
import { ThemeService } from './shared/services/theme/theme.service';
import { AuthService } from './shared/services/auth/auth.service';
import { Auth } from '@angular/fire/auth';
import { NzSpinModule } from 'ng-zorro-antd/spin';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [ RouterOutlet,AppModule,NgIf,NzSpinModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnDestroy,OnInit {
  showLoadingIndicator = true;

  finish$=new Subject()


  constructor( private theme: ThemeService, @Inject(PLATFORM_ID) private platformId: Object,private authService:AuthService, private auth:Auth,private router:Router) {
    if (isPlatformBrowser(platformId)) {
      this.theme.darkMode$.next(JSON.parse(localStorage.getItem('theme') || 'false'))
    }
    this.router.events.subscribe((routerEvent: Event) => {
      if (routerEvent instanceof NavigationStart) {
        this.showLoadingIndicator = true
      }
      if (routerEvent instanceof NavigationEnd) {
        this.showLoadingIndicator = false
      }
      if (routerEvent instanceof NavigationError) {
        this.showLoadingIndicator = false
      }
      if (routerEvent instanceof NavigationCancel) {
        this.showLoadingIndicator = false
      }
    });
  }

  ngOnInit(): void {
      this.auth.onAuthStateChanged(val=>{
        if(val!=null){
        this.authService.userInfo$.next({name:val?.displayName,email:val?.email,img:val?.photoURL})
      }})
      if(isPlatformBrowser(this.platformId)){
        this.theme.changeMode(JSON.parse(localStorage.getItem('theme')||''))
      }
      this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd ) {
        // Reload the page when navigation ends (i.e., when the user enters the page)
        // window.location.reload();
      }
    });

  }
  ngOnDestroy(): void {
      this.finish$.next(null)
      this.finish$.unsubscribe()
  }
}
