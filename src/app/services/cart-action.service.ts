import { environment } from '@/environment/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Router } from '@angular/router';
import { CartStore } from '../stores/cart.store';
import { AuthStore } from '../stores/auth.store';

type Add = {
  variant: 'add';
  cartItem: CartItemSchema;
};

type Select = {
  variant: 'select';
  id: number;
};

type Edit = {
  variant: 'edit';
  cartItem: CartItemSchema;
  id: number;
  index: number;
  change: 'amount' | 'whole';
};

type Delete = {
  variant: 'delete';
  id: number;
  index: number;
};

@Injectable()
export class CartAction {
  cartStore = inject(CartStore);
  authStore = inject(AuthStore);

  isFetching = false;

  router = inject(Router);
  http = inject(HttpClient);

  CART_URL = environment.apiEndpoint + '/cart-items';
  // const navigate = useNavigate();
  // const location = useLocation();

  actions = (props: Add | Edit | Delete | Select) => {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.authStore.user?.token}`,
    });


    // case select no need to call api
    if (props.variant === 'select') {
      return this.cartStore.selectCartItem([props.id]);
    }

    this.isFetching = true;

    switch (props.variant) {
      case 'add':
        this.http
          .post(this.CART_URL, props.cartItem, { headers: headers })
          .subscribe({
            complete: () => {
              this.router.navigateByUrl('/check-out');
            },
            error: (err) => console.log(err),
          });

        break;
      case 'edit': {
        const { cartItem, change, id, index } = props;

        this.http
          .put<{ data: number }>(`${this.CART_URL}/${id}`, cartItem, {
            headers: headers,
          })
          .subscribe({
            next: (res) => {
              const price = res.data;

              if (change === 'amount') {
                this.cartStore.setCart({
                  variant: 'update',
                  change: 'amount',
                  cartItem,
                  index,
                });
              }

              if (change === 'whole') {
                const foundedCartItemIndex = this.cartStore.cartItems.findIndex(
                  (c) =>
                    c.item.product_ascii === cartItem.product_ascii &&
                    c.item.color_id === cartItem.color_id &&
                    c.item.variant_id === cartItem.variant_id
                );

                // update before
                this.cartStore.setCart({
                  cartItem,
                  variant: 'update',
                  change: 'whole',
                  index,
                  price,
                });

                // if have same cart item
                if (foundedCartItemIndex !== -1) {
                  const foundedCartItem =
                    this.cartStore.cartItems[foundedCartItemIndex].item;

                  this.http
                    .delete(`${this.CART_URL}/${foundedCartItem.id}`)
                    .subscribe({
                      complete: () => {
                        this.cartStore.setCart({
                          variant: 'delete',
                          index: foundedCartItemIndex,
                        });
                      },
                      error: (err) => {
                        console.log(err);
                      },
                    });
                }
              }
            },
            error: (err) => {
              this.isFetching = false;
              console.log(err);
            },
            complete: () => {
              this.isFetching = false;
            },
          });

        break;
      }
      case 'delete': {
        const { index, id } = props;

        this.http.delete(`${this.CART_URL}/${id}`, {headers}).subscribe({
          complete: () => {
            this.cartStore.setCart({ variant: 'delete', index });
            this.isFetching = false;
          },
          error: (err) => {
            console.log(err);
            this.isFetching = false;
          },
        });

        break;
      }
    }
  };
}
