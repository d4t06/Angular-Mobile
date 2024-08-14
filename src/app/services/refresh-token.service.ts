import { Injectable, inject, isDevMode } from '@angular/core';
import { AuthStore } from '../stores/auth.store';
import { HttpClient } from '@angular/common/http';
import { environment } from '@/environment/environment';
import { delay } from 'rxjs';

@Injectable()
export class RefreshToken {
  authStore = inject(AuthStore);
  http = inject(HttpClient);

  refresh() {
    // this.authStore.loading.next(false)

    return this.http
      .get(environment.apiEndpoint + '/auth/refresh', { withCredentials: true })
      .pipe(delay(isDevMode() ? 600 : 0))
      .subscribe({
        next: (res: any) => {
          const data = res.data as AuthResponse;

          this.authStore.storingAuth({
            role: data.userInfo.role,
            token: data.token,
            username: data.userInfo.username,
          });

          return data.token;
        },
        error: () => {
          this.authStore.loading.next(false);
        },
        complete: () => {
          this.authStore.loading.next(false);
        },
      });
  }
}
