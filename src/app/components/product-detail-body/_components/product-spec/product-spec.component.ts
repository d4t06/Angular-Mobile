import { Component, Type, inject } from '@angular/core';
import { ProductDetailStore } from '@/app/stores/product-detail.store';
import { newArray } from '@/app/share/utils/appHelper';
import { PushFrameComponent } from '@/app/share/components/push-frame/push-frame.component';
import { SkeletonComponent } from '@/app/share/components/skeleton/skeleton.component';
import { GetCategoryAttribute } from './getCategoryAttribute.service';

export interface AttributePair extends CategoryAttribute {
   value: string;
}

@Component({
   standalone: true,
   selector: 'app-product-spec',
   templateUrl: 'product-spec.component.html',
   imports: [PushFrameComponent, SkeletonComponent],
   providers: [GetCategoryAttribute],
})
export class ProductSpecComponent {
   productDetail = inject(ProductDetailStore);

   newArray = newArray;

   attributeOrder: string[] = [];
   attributePair: AttributePair[] = [];

   getAttributePair = inject(GetCategoryAttribute);

   constructor() {}

   ngOnInit() {
      this.productDetail.status.subscribe(() => {
         if (this.productDetail.product) {
            this.getAttributePair.getAttributePair(this.productDetail.product);

            this.attributePair = this.getAttributePair.attributePair;
         }
      });
   }
}
