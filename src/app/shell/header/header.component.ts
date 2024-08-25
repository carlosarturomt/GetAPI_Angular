import { Component, OnInit, Input } from '@angular/core';
import { AuthService } from '@services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
})
export class HeaderComponent implements OnInit {
  @Input() sidenav: any;
  user: any = null;
  username: string | null = null;

  constructor(private authService: AuthService) {}

  ngOnInit() {
    this.authService.getUserState().subscribe((user) => {
      this.user = user;
    });
  }

  logout() {
    this.authService
      .logout()
      .then(() => {
        // Optionally, you can redirect or perform additional actions after logout
      })
      .catch((error) => {
        console.error('Error al cerrar sesión:', error);
      });
  }
}
