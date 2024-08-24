import { environment } from '@/environment/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, inject, isDevMode } from '@angular/core';
import { delay } from 'rxjs';
import { AuthStore } from '../stores/auth.store';

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
   authStore = inject(AuthStore);
   http = inject(HttpClient);

   isFetching = false;

   action(props: Add | Approve | Delete) {
      this.isFetching = true;

      const headers = new HttpHeaders({
         Authorization: `Bearer ${this.authStore.user?.token}`,
      });

      switch (props.variant) {
         case 'add': {
            return this.http
               .post(RATING_URL, props.rating, { headers: headers })
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
