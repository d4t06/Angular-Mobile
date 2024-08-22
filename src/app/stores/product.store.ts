import { Injectable } from '@angular/core';

type StateType = {
   status: '' | 'loading' | 'more-loading' | 'successful' | 'error';
   page: number;
   products: Product[];
   count: number;
   size: number;
   category_id: number | null;
};

@Injectable({
   providedIn: 'root',
})
export class ProductStore {
   state: StateType = {
      status: 'loading',
      products: [],
      count: 0,
      page: 1,
      size: 1,
      category_id: null,
   };

   storingProducts(payload: Partial<StateType> & { replace?: boolean }) {
      if (payload.replace) Object.assign(this.state, payload);
      else payload.products = [...this.state.products, ...(payload.products || [])];
      Object.assign(this.state, payload);
   }
}
