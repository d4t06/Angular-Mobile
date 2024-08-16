import { ProductDetailStore } from '@/app/stores/product-detail.store';
import { Component, inject, Input } from '@angular/core';
import { TitleComponent } from '../../share/components/title/title.component';
import { ProductDescComponent } from './_components/product-desc/product-desc.component';
import { ProductSpecComponent } from './_components/product-spec/product-spec.component';

@Component({
   selector: 'app-product-detail-body',
   standalone: true,
   imports: [TitleComponent, ProductDescComponent, ProductSpecComponent],
   templateUrl: './product-detail-body.component.html',
})
export class ProductDetailBodyComponent {
   // @Input({ required: true }) loading: boolean;
   // @Input({ required: true }) product: ProductDetail;
   productDetail = inject(ProductDetailStore);
}
