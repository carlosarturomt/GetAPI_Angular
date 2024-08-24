import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.scss'],
})
export class LogoutComponent {
  constructor(private authService: AuthService) {}

  async logout() {
    try {
      await this.authService.logout();
      alert('Sesión cerrada');
    } catch (error) {
      alert('Error al cerrar sesión');
    }
  }
}
