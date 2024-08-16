import { environment } from '@/environment/environment';
import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { ProductDetailStore } from '../stores/product-detail.store';
import { ActivatedRoute } from '@angular/router';

@Injectable()
export class GetProductDetailService {
   productDetailStore = inject(ProductDetailStore);

   http = inject(HttpClient);
   activeRoute = inject(ActivatedRoute);

   PRODUCT_URL = environment.apiEndpoint + '/products';
   routerParams: Record<string, string> = {};

   constructor() {
      this.activeRoute.params.subscribe(data => (this.routerParams = data));
   }

   getProduct() {
      return this.http
         .get<{
            data: ProductDetail;
         }>(`${this.PRODUCT_URL}/${this.routerParams['productAscii']}`)
         .subscribe({
            next: res => {
               this.productDetailStore.setProduct(res.data);
            },
            error: () => {
               this.productDetailStore.status.next('error');
            },
         });
   }
}
