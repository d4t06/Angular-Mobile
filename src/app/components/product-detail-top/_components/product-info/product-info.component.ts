import { ProductDetailStore } from '@/app/stores/product-detail.store';
import {
   Component,
   EventEmitter,
   HostBinding,
   Output,
   ViewChild,
   inject,
} from '@angular/core';
import { ButtonComponent } from '../../../../share/components/button/button.component';
import { GetDefautlCombine } from '@/app/services/get-default-combine';
import { ProductInfoVariantItem } from './_components/product-info-variant-item.component';
import { ProductDetailInfoSkeleton } from './_components/proudct-detail-top-skeleton.component';
import { PushFrameComponent } from '../../../../share/components/push-frame/push-frame.component';
import { MoneyPipe } from '@/app/pipes/money.pipe';
import { CartAction } from '@/app/services/cart-action.service';
import { ModalComponent } from '../../../../share/components/modal/modal.component';
import { AuthStore } from '@/app/stores/auth.store';

const classes = {
   label: 'text-lg font-medium text-[#3f3f3f] leading-[1.2]',
};

@Component({
   selector: 'app-product-info',
   standalone: true,
   imports: [
      MoneyPipe,
      ProductDetailInfoSkeleton,
      ProductInfoVariantItem,
      ButtonComponent,
      PushFrameComponent,
      ModalComponent,
   ],
   templateUrl: './product-info.component.html',
   providers: [GetDefautlCombine, CartAction],
})
export class ProductInfoComponent {
   @Output() changeColor = new EventEmitter<ProductColor>();
   @HostBinding('class') hostClass = 'block';

   authStore = inject(AuthStore);
   productDetail = inject(ProductDetailStore);

   getDefaultCobimeService = inject(GetDefautlCombine);
   cartActions = inject(CartAction);

   color: ProductColor;
   variant: ProductVariant;

   currentCombine: ProductCombine | undefined;
   productVariantWithDefaultCombine: ProductVariant[] = [];

   @ViewChild(ModalComponent, { static: true })
   modalComponent: ModalComponent;

   ngOnInit() {
      // get deafult variant and default color from getDefaultCombine service
      this.productDetail.status.subscribe(() => {
         if (this.productDetail.product) {
            this.getDefaultCobimeService.getDefaultCombine(this.productDetail.product);

            const color = this.getDefaultCobimeService.color;
            this.color = color;

            this.variant = this.getDefaultCobimeService.variant;
            this.changeColor.emit(color);
         }
      });
   }

   // after getDefaultCombine run will trigger the code below to assin new current combine
   ngDoCheck() {
      if (!this.color || !this.variant || !this.productDetail.product) return;

      this.currentCombine = this.productDetail.product.combines.find(
         c => c.color_id === this.color.id && c.variant_id === this.variant.id
      );
   }

   findDefaultCombineOfVariant = (variant: ProductVariant) => {
      if (!this.productDetail.product) return;

      return this.productDetail.product.combines.find(
         c => c.id === variant.default_combine.combine_id
      );
   };

   openModal() {
      this.modalComponent.open();
   }

   close() {
      this.modalComponent.close();
   }

   handleBuyProduct() {
      if (!this.color || !this.variant || !this.productDetail.product) return;

      if (!this.authStore.user) return this.openModal();

      const schema: CartItemSchema = {
         amount: 1,
         color_id: this.color.id,
         product_id: this.productDetail.product.id,
         username: this.authStore.user.username,
         variant_id: this.variant.id,
      };

      this.cartActions.actions({ variant: 'add', cartItem: schema });
   }

   classes = classes;
}
