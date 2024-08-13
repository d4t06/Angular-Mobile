import { HttpClient } from '@angular/common/http';
import { Injectable, inject, isDevMode } from '@angular/core';
import { ProductStore } from '../stores/product.store';
import { ActivatedRoute } from '@angular/router';
import { environment } from '../../environment/environment';
import { FilterStore } from '../stores/filter.store';
import { delay } from 'rxjs';

const PRO_URL = environment.apiEndpoint + '/products';

type GetProductParam = {
  page: number;
  size: number;
  category_id: string;
  'brand_id[]': number[];
  'price[]': string[];
  q: string;
  column: string;
  type: string;
};

@Injectable()
export class GetProductService {
  http = inject(HttpClient);
  productStore = inject(ProductStore);
  filterStore = inject(FilterStore);

  activeRoute = inject(ActivatedRoute);

  routerParams: Record<string, string> = {};
  filterState = this.filterStore.state;

  constructor() {
    this.activeRoute.params.subscribe((data) => (this.routerParams = data));
  }

  getProducts(
    params: Partial<FilterStore['state']> & {
      replace?: boolean;
      page?: number;
      size?: number;
    }
  ) {
    const getProductParams: Partial<GetProductParam> = {};

    const state = {
      ...this.filterState,
      page: this.productStore.state.page,
      size: this.productStore.state.size,
      ...params,
    };

    getProductParams['size'] = state.size || 6;
    getProductParams['page'] = state.replace ? 1 : state.page || 1;

    if (this.routerParams['categoryId'])
      getProductParams['category_id'] = this.routerParams['categoryId'];

    if (state.brands.length)
      getProductParams['brand_id[]'] = state.brands.map((b) => b.id);

    if (state.price) {
      getProductParams['price[]'] = [
        state.price.from + '',
        state.price.to + '',
      ];
    }

    if (state.sort) {
      getProductParams['column'] = state.sort.column;
      getProductParams['type'] = state.sort.type;
    }

    this.productStore.storingProducts({
      status: params?.replace ? 'loading' : 'more-loading',
    });

    return this.http
      .get(PRO_URL, { params: getProductParams })
      .pipe(delay(isDevMode() ? 1000 : 0))
      .subscribe({
        next: (res: any) => {
          const data = res.data;
          this.productStore.storingProducts({
            page: getProductParams.page,
            size: getProductParams.size,
            count: data.count,
            products: data.products,
            status: 'successful',
            replace: params.replace,
            category_id: data.category_id,
          });
        },
        error: (err) => {
          console.log(err);
          this.productStore.storingProducts({
            status: 'error',
          });
        },
      });
  }
}
