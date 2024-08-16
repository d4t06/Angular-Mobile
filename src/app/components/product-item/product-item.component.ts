import { Component, Input, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ButtonComponent } from '../../share/components/button/button.component';
import { MoneyPipe } from '@/app/pipes/money.pipe';
import { VariantBox } from './variant-box/variant-box.component';
import { Subject } from 'rxjs';

@Component({
   selector: 'app-product-item',
   standalone: true,
   templateUrl: './product-item.component.html',
   imports: [RouterLink, ButtonComponent, MoneyPipe, VariantBox],
})
export class ProductItemComponent {
   @Input() product!: Product;

   activeVariant = signal<ProductVariantDetail | undefined>(undefined);

   //   variantEmitter = new Subject<ProductVariantDetail>();

   //   onSetActiveVariant(v: ProductVariantDetail) {
   //     this.variantEmitter.next(v);
   //   }

   setActiveVariant = (v: ProductVariantDetail) => this.activeVariant.set(v);

   findDefaultStorage = (): ProductVariantDetail | undefined => {
      return this.product.variants.find(
         v => v.id === this.product.default_variant.variant_id
      );
   };

   ngOnInit() {
      const defaultVariant = this.findDefaultStorage();
      this.activeVariant.set(defaultVariant);
   }
}
