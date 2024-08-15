

import { Component, inject } from '@angular/core';
import { ProductDetailStore } from '@/app/stores/product-detail.store';
import { newArray } from '@/app/share/utils/appHelper';
import { PushFrameComponent } from '@/app/share/components/push-frame/push-frame.component';
import { SkeletonComponent } from '@/app/share/components/skeleton/skeleton.component';
import {AttributeItem} from './attribute-item.component'

@Component({
   standalone: true,
   selector: 'app-product-spec',
   templateUrl: 'product-spec.component.html',
   imports: [PushFrameComponent, SkeletonComponent, AttributeItem]
})

export class ProductSpecComponent  {


   productDetail = inject(ProductDetailStore)

   newArray = newArray

   constructor() { }

   ngOnInit() { }
}