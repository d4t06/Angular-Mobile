import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { CartStore } from '../stores/cart.store';
import { environment } from '@/environment/environment';
import { AuthStore } from '../stores/auth.store';
import { Router } from '@angular/router';

@Injectable()
export class GetCartService {
   cartStore = inject(CartStore);
   auth = inject(AuthStore);
   router = inject(Router);

   status: 'loading' | 'successful' | 'error' = 'loading';

   http = inject(HttpClient);

   getCart() {
      if (this.auth.user)
         this.http
            .get<{
               data: CartItemDetail[];
            }>(`${environment.apiEndpoint}/cart-items/${this.auth.user.username}`)
            .subscribe({
               next: res => {
                  this.cartStore.setCart({
                     variant: 'replace',
                     cartItems: res.data,
                  });
               },
               error: () => {
                  this.status = 'error';
               },
               complete: () => {
                  this.status = 'successful';
               },
            });
   }

   //   constructor() {
   //     this.auth.loading.subscribe((loading) => {
   //       if (!loading) {
   //         console.log('check loading', loading);

   //         if (!this.auth.user) this.router.navigateByUrl('/');
   //         else
   //           this.getCart()
   //       }
   //     });
   //   }
}
