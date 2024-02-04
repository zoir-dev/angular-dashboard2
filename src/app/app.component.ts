import {
  Component,
  Inject,
  OnDestroy,
  OnInit,
  PLATFORM_ID,
} from '@angular/core';
import {
  Event,
  NavigationCancel,
  NavigationEnd,
  NavigationError,
  NavigationStart,
  Router,
  RouterOutlet,
} from '@angular/router';
import { NgIf, isPlatformBrowser } from '@angular/common';
import { Auth } from '@angular/fire/auth';
import { Subject } from 'rxjs';
import { NzSpinModule } from 'ng-zorro-antd/spin';

import { LoadingBarRouterModule } from '@ngx-loading-bar/router';

import { AppModule } from './app.module';
import { ThemeService } from './shared/services/theme/theme.service';
import { AuthService } from './shared/services/auth/auth.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    AppModule,
    NgIf,
    NzSpinModule,
    LoadingBarRouterModule,
  ],
  templateUrl: './app.component.html',
})
export class AppComponent implements OnDestroy, OnInit {
  showLoadingIndicator = true;
  finish$ = new Subject();

  constructor(
    private theme: ThemeService,
    @Inject(PLATFORM_ID) private platformId: Object,
    private authService: AuthService,
    private auth: Auth,
    private router: Router
  ) {
    this.router.events.subscribe((routerEvent: Event) => {
      if (routerEvent instanceof NavigationStart) {
        this.showLoadingIndicator = true;
      } else if (
        routerEvent instanceof NavigationEnd ||
        routerEvent instanceof NavigationError ||
        routerEvent instanceof NavigationCancel
      ) {
        this.showLoadingIndicator = false;
      }
    });
  }

  ngOnInit(): void {
    this.authService.loading$.next(true);
    this.auth.onAuthStateChanged((val) => {
      if (val != null) {
        this.authService.userInfo$.next({
          name: val?.displayName,
          email: val?.email,
          img: val?.photoURL,
        });
      }
      this.authService.loading$.next(false);
    });
    if (isPlatformBrowser(this.platformId)) {
      this.theme.changeMode(
        JSON.parse(localStorage.getItem('theme') || 'true')
      );
    }
  }

  ngOnDestroy(): void {
    this.finish$.next(null);
    this.finish$.unsubscribe();
  }
}
