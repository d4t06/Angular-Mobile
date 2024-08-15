import { MoneyPipe } from '@/app/pipes/money.pipe';
import {
  Component,
  HostBinding,
  Input,
  ViewChild,
  inject,
} from '@angular/core';
import { ButtonComponent } from '../../share/components/button/button.component';
import { ModalComponent } from '../../share/components/modal/modal.component';
import { VariantBox } from '../product-item/variant-box/variant-box.component';
import { VariantBoxComponent } from './variant-box/variant-box.component';
import { CartAction } from '@/app/services/cart-action.service';
import { ConfirmModalComponent } from "../../share/components/modal/confirm-modal.component";

@Component({
  selector: 'app-cart-item',
  standalone: true,
  imports: [
    MoneyPipe,
    ButtonComponent,
    ModalComponent,
    VariantBox,
    VariantBoxComponent,
    ConfirmModalComponent
],
  providers: [CartAction],
  templateUrl: './cart-item.component.html',
})
export class CartItemComponent {
  @Input({ required: true }) cartItem: CartItemDetail;
  @Input({ required: true }) index: number;
  @Input({ required: true }) checked: boolean;

  @HostBinding('class') hostClass = 'block';

  @ViewChild(ModalComponent) modalComponent: ModalComponent;

  action = inject(CartAction);

  openModal() {
    this.modalComponent.open();
  }

  close() {
    this.modalComponent.close();
  }

  classes = {
    imageFrame:
      'relative w-[70px] h-[70px] md:w-[90px] md:h-[90px] flex-shrink-0',
    variant:
      'flex flex-grow flex-col items-start md:items-center ml-[10px] space-y-[14px] md:flex-row md:space-y-0',
    checkBtn:
      'h-[24px] w-[24px] inline-flex item-center justify-center absolute rounded-[6px] left-[6px] bottom-[6px]',
  };
}
