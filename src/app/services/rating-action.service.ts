import { environment } from '@/environment/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable, inject, isDevMode } from '@angular/core';
import { delay } from 'rxjs';

type Add = {
   variant: 'add';
   rating: RatingSchema;
};

type Approve = {
   variant: 'approve';
   id: number;
   index: number;
};

type Delete = {
   variant: 'delete';
   id: number;
   index: number;
};

const RATING_URL = environment.apiEndpoint + '/product-ratings';

@Injectable()
export default class RatingActionService {
   http = inject(HttpClient);

   isFetching = false;

   action(props: Add | Approve | Delete) {
      this.isFetching = true;

      switch (props.variant) {
         case 'add': {
            return this.http
               .post(RATING_URL, props.rating)
               .pipe(delay(isDevMode() ? 600 : 0))
               .subscribe({
                  next: () => {
                     this.isFetching = false;
                  },
                  error: err => {
                     console.log(err);
                     this.isFetching = false;
                  },
               });
         }
      }

      return;
   }
}
