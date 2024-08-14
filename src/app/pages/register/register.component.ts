import {
  Component,
  ElementRef,
  inject,
  isDevMode,
  ViewChild,
} from '@angular/core';
import { loginClasses } from '../../share/classes/login';
import { ButtonComponent } from '../../share/components/button/button.component';
import { Router, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { environment } from '@/environment/environment';
import { delay } from 'rxjs';
import { AuthStore } from '@/app/stores/auth.store';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ButtonComponent, RouterLink, FormsModule],
  templateUrl: './register.component.html',
})
export class RegisterComponent {
  http = inject(HttpClient);
  router = inject(Router);
  authStore = inject(AuthStore);

  errorMessage = '';
  isFetching = false;

  username = '';
  password = '';
  confirmPassword = '';

  classes = loginClasses;

  ableToSubmit = false;

  @ViewChild('usernameInput') usernameInput: ElementRef;

  ngOnInit() {
    (this.usernameInput?.nativeElement as HTMLInputElement)?.focus();
  }

  ngDoCheck() {
    let match = this.password === this.confirmPassword;
    if (!this.password) match = false;

    this.ableToSubmit = !!this.username && match;
  }

  handleRegister() {
    if (!this.ableToSubmit) {
      this.errorMessage = 'Some things went wrong';
      return;
    }

    this.isFetching = true;

    this.http
      .post(environment.apiEndpoint + '/auth/register', {
        username: this.username,
        password: this.password,
      })
      .pipe(delay(isDevMode() ? 600 : 0))
      .subscribe({
        error: (err) => {
          this.isFetching = false;

          if (!+err?.status) {
            this.errorMessage = 'Register failed !';
          } else if (+err?.status === 409) {
            this.errorMessage = 'This user name had taken !';
          }
        },
        complete: () => {
          this.isFetching = false;
          this.router.navigateByUrl('/login');
        },
      });
  }
}
