import { Injectable, inject } from '@angular/core';
import { AuthStore } from '../stores/auth.store';
import { HttpClient } from '@angular/common/http';
import { environment } from '@/environment/environment';

@Injectable()
export class RefreshToken {
  authStore = inject(AuthStore);
  http = inject(HttpClient);

  refresh() {
    // this.authStore.storingAuth({
    //   loading: false,
    // });

    return this.http
      .get(environment.apiEndpoint + '/auth/refresh', { withCredentials: true })
      .subscribe({
        next: (res: any) => {
          const data = res.data as AuthResponse;

          this.authStore.storingAuth({
            user: {
              role: data.userInfo.role,
              token: data.token,
              username: data.userInfo.username,
            },
            loading: false,
          });

          return data.token;
        },
        error: () => {
          this.authStore.storingAuth({
            loading: false,
          });
        },
      });
  }
}
