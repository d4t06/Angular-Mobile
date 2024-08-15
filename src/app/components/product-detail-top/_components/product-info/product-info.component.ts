import { ProductDetailStore } from '@/app/stores/product-detail.store';
import { Component, HostBinding, inject } from '@angular/core';
import { ButtonComponent } from '../../../../share/components/button/button.component';
import { GetDefautlCombine } from '@/app/services/get-default-combine';
import { ProductInfoVariantItem } from './_components/product-info-variant-item.component';
import { ProductDetailInfoSkeleton } from './_components/proudct-detail-top-skeleton.component';
import { PushFrameComponent } from '../../../../share/components/push-frame/push-frame.component';
import { MoneyPipe } from '@/app/pipes/money.pipe';

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
  ],
  templateUrl: './product-info.component.html',
  styles: ``,
  providers: [GetDefautlCombine],
})
export class ProductInfoComponent {
  @HostBinding('class') hostClass = 'block'
  productDetail = inject(ProductDetailStore);

  getDefaultCobimeService = inject(GetDefautlCombine);

  color: ProductColor;
  variant: ProductVariant;

  currentCombine: ProductCombine | undefined;
  productVariantWithDefaultCombine: ProductVariant[] = [];

  ngOnInit() {
    // get deafult variant and default color from getDefaultCombine service
    this.productDetail.status.subscribe(() => {
      if (this.productDetail.product) {
        this.getDefaultCobimeService.getDefaultCombine(
          this.productDetail.product
        );

        this.color = this.getDefaultCobimeService.color;
        this.variant = this.getDefaultCobimeService.variant;
      }
    });
  }

  // after getDefaultCombine run will trigger the code below to assin new current combine
  ngDoCheck() {
    if (!this.color || !this.variant || !this.productDetail.product) return;

    this.currentCombine = this.productDetail.product.combines.find(
      (c) => c.color_id === this.color.id && c.variant_id === this.variant.id
    );
  }

  findDefaultCombineOfVariant = (variant: ProductVariant) => {
    if (!this.productDetail.product) return;

    return this.productDetail.product.combines.find(
      (c) => c.id === variant.default_combine.combine_id
    );
  };

  classes = classes;
}
