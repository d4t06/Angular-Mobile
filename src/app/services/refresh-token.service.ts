import { Injectable, inject } from '@angular/core';
import { AuthStore } from '../stores/auth.store';
import { HttpClient } from '@angular/common/http';
import { sleep } from '../share/utils/appHelper';

@Injectable()
export class RefreshToken {
  authStore = inject(AuthStore);
  http = inject(HttpClient);

  async refresh() {
    await sleep(2000);


    this.authStore.storingAuth({
      loading: false,
    });


    // return this.http
    //   .get(environment.apiEndpoint + '/auth/refresh', { withCredentials: true })
    //   .subscribe({
    //     next: (res: any) => {
    //       const data = res.data as AuthResponse;

    //       this.authStore.storingAuth({
    //         user: {
    //           role: data.userInfo.role,
    //           token: data.token,
    //           username: data.userInfo.username,
    //         },
    //         loading: false,
    //       });

    //       // this.authStore.loading.set(false)

    //       return data.token;
    //     },
    //     error: (err) => {
    //       console.log(err);
    //     },
    //   });
  }
}
