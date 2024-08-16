import { environment } from '@/environment/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable, Input, inject } from '@angular/core';
import { AuthStore } from '../stores/auth.store';
import { Router } from '@angular/router';

@Injectable()
export class LogoutService {
   http = inject(HttpClient);
   authStore = inject(AuthStore);
   router = inject(Router);

   isFetching = false;

   logout() {
      this.isFetching = true;

      return this.http
         .get(environment.apiEndpoint + '/auth/logout', { withCredentials: true })
         .subscribe({
            next: () => {
               this.authStore.storingAuth(null);
               this.router.navigateByUrl('/');
            },
            error: () => {
               this.isFetching = false;
            },
         });
   }
}
