import { Component, OnInit, ViewChild } from '@angular/core';
import { Breakpoints, BreakpointObserver } from '@angular/cdk/layout';
import { MatSidenav } from '@angular/material/sidenav';
import { filter } from 'rxjs/operators';
import { AuthService } from '../services/auth.service';
import { UntilDestroy, untilDestroyed } from '@shared';

@UntilDestroy()
@Component({
  selector: 'app-shell',
  templateUrl: './shell.component.html',
  styleUrls: ['./shell.component.scss'],
})
export class ShellComponent implements OnInit {
  @ViewChild('sidenav', { static: false }) sidenav!: MatSidenav;
  user: any = null;

  constructor(
    private breakpoint: BreakpointObserver,
    private authService: AuthService
  ) {}

  ngOnInit() {
    // Automatically close side menu on screens > small breakpoint
    this.breakpoint
      .observe([Breakpoints.Small, Breakpoints.XSmall])
      .pipe(
        filter(({ matches }) => !matches),
        untilDestroyed(this)
      )
      .subscribe(() => this.sidenav.close());

    // Subscribe to the user's authentication state
    this.authService.getUserState().pipe(untilDestroyed(this)).subscribe(user => {
      this.user = user;
    });
  }

  logout() {
    this.authService.logout().then(() => {
      this.user = null;
      // Optionally, you could redirect the user to the login page
    }).catch(error => {
      console.error('Error al cerrar sesión:', error);
    });
  }
}
