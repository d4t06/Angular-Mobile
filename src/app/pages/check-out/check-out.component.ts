import { Component, inject } from '@angular/core';
import { TitleComponent } from '../../share/components/title/title.component';
import { ButtonComponent } from '../../share/components/button/button.component';
import { PushFrameComponent } from '../../share/components/push-frame/push-frame.component';
import { CheckOutPriceComponent } from '../../components/check-out-price/check-out-price.component';
import { GetCartService } from '@/app/services/get-cart.service';
import { CheckOutSkeleton } from './check-out-skeleton.component';
import { AuthStore } from '@/app/stores/auth.store';
import { Router } from '@angular/router';
import { CartStore } from '@/app/stores/cart.store';
import { CartItemComponent } from '@/app/components/cart-item/cart-item.component';

@Component({
  standalone: true,
  selector: 'app-check-out',
  templateUrl: './check-out.component.html',
  imports: [
    TitleComponent,
    ButtonComponent,
    PushFrameComponent,
    CheckOutPriceComponent,
    CheckOutSkeleton,
    CartItemComponent
  ],
  providers: [GetCartService],
})
export class CheckOutPageComponent {
  authStore = inject(AuthStore);
  cartStore = inject(CartStore)

  router = inject(Router);
  getCartService = inject(GetCartService);

  classes = {
    container: '',
  };

  ngOnInit() {
    this.authStore.loading.subscribe((loading) => {
      if (!loading) {
        console.log('check loading', loading);

        if (!this.authStore.user) this.router.navigateByUrl('/');
        else this.getCartService.getCart();
      }
    });
  }
}
