import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { marker } from '@biesbjerg/ngx-translate-extract-marker';

import { LoginComponent } from './login/login.component';
import { SignUpComponent } from './register/sign-up.component';

const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent,
    data: { title: marker('Login') },
  },
  {
    path: 'register',
    component: SignUpComponent,
    data: { title: marker('Register') },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [],
})
export class AuthRoutingModule {}
