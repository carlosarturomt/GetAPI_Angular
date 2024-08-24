import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss'],
})
export class SignUpComponent {
  email = '';
  password = '';

  constructor(private authService: AuthService) {}

  async signUp() {
    try {
      await this.authService.signUp(this.email, this.password);
      alert('Registro exitoso');
    } catch (error) {
      alert('Error en el registro');
    }
  }
}
