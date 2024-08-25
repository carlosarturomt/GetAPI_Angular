import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '@services/auth.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
})
export class SignUpComponent {
  email = '';
  password = '';

  constructor(private authService: AuthService, private router: Router) {}

  async signUp() {
    try {
      await this.authService.signUp(this.email, this.password);
      alert('Registro exitoso');
      this.router.navigate(['/home']);
    } catch (error) {
      alert('Error en el registro');
    }
  }
}
