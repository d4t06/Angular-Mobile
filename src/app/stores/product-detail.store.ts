import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProductDetailStore {
  product: ProductDetail | null;
  status = new BehaviorSubject<'loading' | 'successful' | 'error'>('loading');

  setProduct(payload: ProductDetail) {
    this.product = payload;
    this.status.next('successful');
  }
}
