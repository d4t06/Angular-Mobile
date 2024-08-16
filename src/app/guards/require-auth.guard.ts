import { inject } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AuthStore } from '../stores/auth.store';

export const RequireAuthGuard = (
   router: ActivatedRouteSnapshot,
   state: RouterStateSnapshot
) => {
   const authStore = inject(AuthStore);

   authStore.loading.pipe();
};
