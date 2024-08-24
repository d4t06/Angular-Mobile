import { MoneyPipe } from '@/app/pipes/money.pipe';
import { Component, inject } from '@angular/core';
import { ButtonComponent } from '../../share/components/button/button.component';
import { CartStore } from '@/app/stores/cart.store';

@Component({
   standalone: true,
   selector: 'app-check-out-price',
   templateUrl: './check-out-price.component.html',
   imports: [MoneyPipe, ButtonComponent],
})
export class CheckOutPriceComponent {
   cartStore = inject(CartStore);

   totalPrice = 0;

   ngDoCheck() {
      this.totalPrice = this.cartStore.cartItems.reduce((prev, cur) => {
         if (this.cartStore.selectedCartItemId.includes(cur.item.id))
            return (prev += cur.item.amount * cur.price);
         return prev;
      }, 0);
   }

   classes = {
      h5: 'text-medium text-[#3f3f3f] font-[500]',
   };
}
