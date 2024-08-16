import { Injectable } from '@angular/core';

type StateType = {
   brands: Brand[];
   price: PriceRange | undefined;
   sort: SortOption | undefined;
};

@Injectable({ providedIn: 'root' })
export class FilterStore {
   state: StateType = {
      brands: [],
      price: undefined,
      sort: undefined,
   };

   storingFilters(payload: Partial<StateType>) {
      Object.assign(this.state, payload);
   }
}
