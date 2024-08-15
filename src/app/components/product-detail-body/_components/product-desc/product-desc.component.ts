

import { ProductDetailStore } from '@/app/stores/product-detail.store';
import { Component, inject, OnInit } from '@angular/core';
import { SkeletonComponent } from "../../../../share/components/skeleton/skeleton.component";
import { HTMLPipe } from '@/app/pipes/html.pipe';

@Component({
   standalone: true,
   selector: 'app-product-desc',
   templateUrl: 'product-desc.component.html',
   imports: [SkeletonComponent, HTMLPipe]
})

export class ProductDescComponent  {


   productDetail = inject(ProductDetailStore)

   
   constructor() { }

   ngOnInit() { }
}