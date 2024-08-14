import { Component, inject } from '@angular/core';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { ButtonComponent } from '../../share/components/button/button.component';
import { AuthStore } from '@/app/stores/auth.store';

@Component({
  selector: 'app-auth-layout',
  standalone: true,
  imports: [RouterLink, RouterOutlet, ButtonComponent],
  templateUrl: './auth-layout.component.html',
})
export class AuthLayoutComponent {
  authStore = inject(AuthStore);
  router = inject(Router);

  ngOnInit() {
    this.authStore.loading.subscribe(() => {
      if (this.authStore.user) this.router.navigateByUrl('/');
    });
  }
}
