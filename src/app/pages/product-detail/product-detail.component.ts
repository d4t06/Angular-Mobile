import { GetProductDetailService } from '@/app/services/get-product-detail.service';
import { Component, inject } from '@angular/core';
import { ProductDetailTopComponent } from '../../components/product-detail-top/product-detail-top.component';
import { ProductDetailBodyComponent } from '../../components/product-detail-body/product-detail-body.component';

@Component({
   standalone: true,
   selector: 'app-product-detail',
   templateUrl: './product-detail.component.html',
   providers: [GetProductDetailService],
   imports: [ProductDetailTopComponent, ProductDetailBodyComponent],
})
export class ProductDetailComponent {
   getProductDetail = inject(GetProductDetailService);

   ngOnInit() {
      this.getProductDetail.getProduct();
   }
}
