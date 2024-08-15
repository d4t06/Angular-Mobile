import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class CartStore {
  cartItems: CartItemDetail[] = [];
  payMethod: 'cash' | 'credit-cart' = 'cash';
  selectedCartItemId: number[] = [];

  setCart(
    payload:
      | {
          variant: 'replace';
          cartItems: CartItemDetail[];
        }
      | {
          variant: 'update';
          cartItem: Partial<CartItemSchema>;
          index: number;
          price: number;
          change: 'whole';
        }
      | {
          variant: 'update';
          cartItem: Partial<CartItemSchema>;
          index: number;
          change: 'amount';
        }
      | {
          variant: 'delete';
          index: number;
        }
  ) {
    switch (payload.variant) {
      case 'replace':
        this.cartItems = payload.cartItems;
        break;
      case 'update': {
        const { change, cartItem, index } = payload;

        Object.assign(this.cartItems[index].item, cartItem);

        if (change === 'whole') {
          this.cartItems[index].price = payload.price;
        }
        break;
      }
      case 'delete':
        this.cartItems.splice(payload.index, 1);
        break;
    }
  }

  selectCartItem(payload: number[]) {
    payload.forEach((id) => {
      const index = this.selectedCartItemId.findIndex((i) => id === i);
      if (index === -1) this.selectedCartItemId.push(id);
      else this.selectedCartItemId.splice(index, 1);
    });
  }
}
