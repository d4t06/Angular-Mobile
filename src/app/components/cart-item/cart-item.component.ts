import { MoneyPipe } from '@/app/pipes/money.pipe';
import { Component, HostBinding, Input, inject } from '@angular/core';
import { ButtonComponent } from '../../share/components/button/button.component';
import { ModalComponent } from '../../share/components/modal/modal.component';
import { VariantBox } from '../product-item/variant-box/variant-box.component';
import { VariantBoxComponent } from './variant-box/variant-box.component';
import { CartAction } from '@/app/services/cart-action.service';

@Component({
  selector: 'app-cart-item',
  standalone: true,
  imports: [
    MoneyPipe,
    ButtonComponent,
    ModalComponent,
    VariantBox,
    VariantBoxComponent,
  ],
  providers: [CartAction],
  templateUrl: './cart-item.component.html',
})
export class CartItemComponent {
  @Input({ required: true }) cartItem: CartItemDetail;
  @Input({ required: true }) index: number;
  @Input({ required: true }) checked: boolean;

  @HostBinding('class') hostClass = 'block';

  action = inject(CartAction);

  classes = {
    imageFrame:
      'relative w-[70px] h-[70px] md:w-[90px] md:h-[90px] flex-shrink-0',
    variant:
      'flex flex-grow flex-col items-start md:items-center ml-[10px] space-y-[14px] md:flex-row md:space-y-0',
    checkBtn:
      'h-[24px] w-[24px] inline-flex item-center justify-center absolute rounded-[6px] left-[6px] bottom-[6px]',
  };
}
