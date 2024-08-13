import { Component, signal, effect, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { ButtonComponent } from '../../share/components/button/button.component';
import { loginClasses } from '../../share/classes/login';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environment/environment';
import { NgClass } from '@angular/common';
import { AuthStore } from '../../stores/auth.store';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterLink, ButtonComponent, FormsModule, NgClass],
  templateUrl: './login.component.html',
})
export class LoginComponent {
  http = inject(HttpClient);
  authStore = inject(AuthStore);
  router = inject(Router);

  username = '';
  password = '';
  errorMessage = '';
  isFetching = signal(false);

  loginClasses = loginClasses;
  LOGIN_URL = environment.apiEndpoint + '/auth/login';

  constructor() {
    effect(() => {});
  }

  handleLogin() {
    if (!this.username || !this.password) return;

    this.isFetching.set(true);

    this.http
      .post(this.LOGIN_URL, {
        username: this.username,
        password: this.password,
      })
      .subscribe({
        next: (res: any) => {
          console.log('check res', res);

          const data = res.data as AuthResponse;

          this.authStore.storingAuth({
            user: {
              role: data.userInfo.role,
              token: data.token,
              username: data.userInfo.username,
            },
          });

          this.router.navigateByUrl('/');
        },
        error: (err) => {
          console.log('check res', err);

          this.isFetching.set(false);
          //
          if (!+err?.status) {
            this.errorMessage = 'Login failed';
          } else if (+err?.status === 401) {
            this.errorMessage = 'Username or password is incorrect';
          }
        },
        complete: () => this.isFetching.set(false),
      });
  }
}
