import { Component, OnInit, Input } from '@angular/core';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  @Input() sidenav: any;
  username: string | null = null;

  constructor(private authService: AuthService) {}

  ngOnInit() {
    this.authService.getUserState().subscribe(user => {
      this.username = user ? user.email : null;
    });
  }

  logout() {
    this.authService.logout().then(() => {
      // Optionally, you can redirect or perform additional actions after logout
    }).catch(error => {
      console.error('Error al cerrar sesión:', error);
    });
  }
}
