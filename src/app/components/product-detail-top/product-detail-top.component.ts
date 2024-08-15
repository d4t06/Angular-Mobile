import { ProductDetailStore } from '@/app/stores/product-detail.store';
import { Component, inject } from '@angular/core';
import { PolicyComponent } from './_components/policy/policy.component';
import { ProductInfoComponent } from "./_components/product-info/product-info.component";

@Component({
  selector: 'app-product-detail-top',
  standalone: true,
  imports: [PolicyComponent, ProductInfoComponent],
  templateUrl: './product-detail-top.component.html',
})
export class ProductDetailTopComponent {
  productDetail = inject(ProductDetailStore);

  // @Input({ required: true }) loading: boolean;
  // @Input({ required: true }) product: ProductDetail;
}
