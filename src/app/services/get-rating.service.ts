import { Injectable, inject, isDevMode } from '@angular/core';
import RatingStore, { RatingState } from '../stores/rating.store';
import { HttpClient } from '@angular/common/http';
import { environment } from '@/environment/environment';
import { delay } from 'rxjs';

type GetRatings = {
   replace?: boolean;
   page?: number;
   size?: number;
   productId: number;
};

const RATING_URL = environment.apiEndpoint + '/product-ratings';

@Injectable()
class GetRatingService {
   ratingStore = inject(RatingStore);
   http = inject(HttpClient);

   getProductRatings({ page, productId, replace, size }: GetRatings) {
      const params = {
         page: page || 1,
         size: size || this.ratingStore.size || 1,
         productId,
      };

      if (replace)
         this.ratingStore.setRatingStore({ variant: 'status', payload: 'loading' });
      else
         this.ratingStore.setRatingStore({ variant: 'status', payload: 'more-loading' });

      return this.http
         .get<{ data: RatingState }>(RATING_URL, { params })
         .pipe(delay(isDevMode() ? 600 : 0))
         .subscribe(res => {
            this.ratingStore.setRatingStore({
               variant: 'storing',
               payload: { ...res.data, replace, status: 'success' },
            });
         });
   }
}

export default GetRatingService;
