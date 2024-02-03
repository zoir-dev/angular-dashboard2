import { Component, OnDestroy } from '@angular/core';
import { HeaderComponent } from '../../core/components/header/header.component';
import { Router, RouterOutlet } from '@angular/router';
import { AuthService } from '../../shared/services/auth/auth.service';
import { UserInfo } from '../../shared/types/userInfo';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'auth-layout',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent],
  templateUrl: './auth.component.html',
})
export class AuthLayout implements OnDestroy {
  userInfo!: UserInfo;
  unsubscribe$ = new Subject();

  constructor(private router: Router, private authService: AuthService) {
    this.authService.userInfo$
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((val) => (this.userInfo = val));
    this.authService.loading$
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((val) => {
        if (!val && this.userInfo.email) {
          this.router.navigate(['']);
        }
      });
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next(null);
    this.unsubscribe$.unsubscribe();
  }
}
