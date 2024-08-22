import { environment } from '@/environment/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable, inject, isDevMode } from '@angular/core';
import { delay } from 'rxjs';

const RATING_URL = environment.apiEndpoint + '/product-ratings';

@Injectable()
export default class RatingAverage {
   average: number;
   status: 'loading' | 'success' | 'error' = 'loading';

   http = inject(HttpClient);

   getRatingAverage(productId: number) {
      this.status = 'loading';

      this.http
         .get<{
            data: {
               average: string;
            };
         }>(`${RATING_URL}/avg`, {
            params: { product_id: productId },
         })
         .pipe(delay(isDevMode() ? 600 : 0))
         .subscribe({
            next: res => {
               this.average = +res.data.average;
               this.status = 'success';
            },
            error: () => {
               this.status = 'error';
            },
         });
   }
}
