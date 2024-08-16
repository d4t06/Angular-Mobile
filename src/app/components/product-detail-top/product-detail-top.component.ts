import { ProductDetailStore } from '@/app/stores/product-detail.store';
import { Component, ViewChild, inject } from '@angular/core';
import { PolicyComponent } from './_components/policy/policy.component';
import { ProductInfoComponent } from './_components/product-info/product-info.component';
import { SkeletonComponent } from '@/app/share/components/skeleton/skeleton.component';
import { SliderComponent } from '../slider/slider.component';

@Component({
  selector: 'app-product-detail-top',
  standalone: true,
  imports: [
    PolicyComponent,
    ProductInfoComponent,
    SkeletonComponent,
    SliderComponent,
  ],
  templateUrl: './product-detail-top.component.html',
})
export class ProductDetailTopComponent {
  productDetail = inject(ProductDetailStore);

  sliderImages: SliderImage[] = [];
}
