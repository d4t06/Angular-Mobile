import { CartAction } from '@/app/services/cart-action.service';
import { Component, Input } from '@angular/core';

type HandleCartItemAction = {
  cartItem: Partial<CartItemSchema>;
  change: 'variant' | 'amount';
};

@Component({
  standalone: true,
  selector: 'app-cart-item-variant-box',
  templateUrl: './variant-box.component.html',
})
export class VariantBoxComponent {
  @Input({ required: true }) cartItem: CartItemDetail;
  @Input({ required: true }) actions: CartAction['actions'];
  @Input({ required: true }) index: number;

  handleCartItemAction(props: HandleCartItemAction) {
    const {
      item: { product, ...rest },
    } = this.cartItem;

    const schema: CartItemSchema = {
      ...rest,
      ...props.cartItem,
    };

    switch (props.change) {
      case 'amount':
        this.actions({
          variant: 'edit',
          cartItem: schema,
          change: 'amount',
          index: this.index,
          id: this.cartItem.item.id,
        });

        break;
      case 'variant':
        this.actions({
          variant: 'edit',
          cartItem: schema,
          change: 'whole',
          index: this.index,
          id: this.cartItem.item.id,
        });

        break;
    }
  }

  classes = {
    container:
      'flex flex-col space-y-[10px] md:space-y-0 md:space-x-[16px] md:flex-row ',
    variantLabel: 'text-[#3f3f3f] font-[500]',
    button: 'hover:bg-[#e1e1e1] border-[#e1e1e1] h-full px-[6px]',

    select:
      'px-[14px] h-[32px] border border-[#e1e1e1] bg-[#fff] hover:bg-[#f1f1f1] cursor-pointer rounded-[99px] font-[500] text-[14px] text-[#333] text-[500]',
    quantityBox:
      'inline-flex h-[32px] border-[#e1e1e1] border  justify-between  overflow-hidden items-center text-[#333] rounded-[99px] bg-[#fff]',
  };
}
