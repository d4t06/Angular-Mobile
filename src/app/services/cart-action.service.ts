import { environment } from '@/environment/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Router } from '@angular/router';
import { CartStore } from '../stores/cart.store';

type Add = {
  variant: 'add';
  cartItem: CartItemSchema;
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

  isFetching = false;

  router = inject(Router);
  http = inject(HttpClient);
  // const navigate = useNavigate();
  // const location = useLocation();

  actions = (props: Add | Edit | Delete) => {
    this.isFetching = true;

    switch (props.variant) {
      case 'add':
        this.http
          .post(environment.apiEndpoint + '/cart-items', props.cartItem)
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
          .put<{ data: number }>(
            `${environment.apiEndpoint}/cart-items/${id}`,
            cartItem
          )
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
            },
            error: (err) => {
              this.isFetching = false;
            },
            complete: () => {
              this.isFetching = false;
            },
          });
        // const res = await privateRequest.put(`${CART_ITEM_URL}/${id}`, cartItem);

        // const price = res.data.data;

        // if (change === "amount")
        //    dispatch(
        //       setCart({ variant: "update", change: "amount", cartItem, index })
        //    );
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
          //  dispatch(
          //    setCart({
          //      cartItem,
          //      variant: 'update',
          //      change: 'whole',
          //      index,
          //      price,
          //    })
          //  );

          // if have have cart item
          if (foundedCartItemIndex !== -1) {
            const foundedCartItem =
              this.cartStore.cartItems[foundedCartItemIndex].item;

            this.http
              .delete(
                `${environment.apiEndpoint}/cart-items/${foundedCartItem.id}`
              )
              .subscribe({
                complete: () => {},
                error: (err) => {
                  console.log(err);
                },
              });
            // await privateRequest.delete(
            //   `${CART_ITEM_URL}/${foundedCartItem.id}`
            // );

            // dispatch(
            //   setCart({
            //     variant: 'delete',
            //     index: foundedCartItemIndex,
            //   })
            // );
          }
        }

        break;
      }
      case 'delete': {
        const { index, id } = props;
        this.http
          .delete(`${environment.apiEndpoint}/cart-items/${id}`)
          .subscribe({
            complete: () => {},
            error: (err) => console.log(err),
          });
        //   await privateRequest.delete(`${CART_ITEM_URL}/${id}`);
        //   dispatch(setCart({ variant: 'delete', index }));

        break;
      }
    }
  };
}
