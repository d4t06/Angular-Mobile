import { CurrentCategory } from '@/app/services/current-cateogory.service';
import { Component, inject } from '@angular/core';
import { ButtonComponent } from '../../share/components/button/button.component';
import { SkeletonComponent } from '../../share/components/skeleton/skeleton.component';
import { FilterStore } from '@/app/stores/filter.store';
import { GetProductService } from '@/app/services/get-product.service';
import { CategoryStore } from '@/app/stores/category.store';
import { ProductStore } from '@/app/stores/product.store';
import { newArray } from '@/app/share/utils/appHelper';

type BrandFilter = {
   value: Brand | 'clear';
   by: 'brands';
};

type PriceRangeFilter = {
   value: PriceRange | undefined;
   by: 'price';
};

const classes = {
   btn: 'py-[2px] px-[10px] mt-2 ml-2 text-[15px]',
};

@Component({
   standalone: true,
   selector: 'app-filter',
   template: `
      <h5 class=" mb-1 sm:mb-2 font-medium">Brand</h5>
      <div
         [class]="
            'flex flex-wrap -mt-2 -ml-2 ' +
            (productStore.state.status === 'loading' ? 'disabled' : '')
         ">
         @if (categoryLoading.getValue()) {
            @for (key of newArray(5); track $index) {
               <app-skeleton className="h-[28px] w-[100px] flex-shrink-0 mt-2 ml-2" />
            }
         } @else {
            <app-button
               [props]="{
                  colors: 'second',
                  size: 'clear',
                  class: 'py-[2px] px-[10px] mt-2 ml-2 text-[15px]',
                  fontWeight: 'thin',
                  active: !filterStore.state.brands.length,
               }"
               (click)="handleFilter({ by: 'brands', value: 'clear' })">
               All
            </app-button>
            @for (b of currentCategory.brandsByCategory(); track $index) {
               <app-button
                  [props]="{
                     colors: 'second',
                     size: 'clear',
                     class: classes.btn,
                     fontWeight: 'thin',
                     active: filterState.brands.includes(b),
                  }"
                  (click)="handleFilter({ by: 'brands', value: b })">
                  {{ b.name }}
               </app-button>
            }
         }
      </div>

      <h5 class="mt-4 mb-1 sm:mb-2 font-medium">Price range</h5>
      <div
         [class]="
            'flex flex-wrap -mt-2 -ml-2 ' +
            (productStore.state.status === 'loading' ? 'disabled' : '')
         ">
         @if (categoryLoading.getValue()) {
            @for (key of newArray(5); track $index) {
               <app-skeleton className="h-[28px] w-[100px] flex-shrink-0 mt-2 ml-2" />
            }
         } @else {
            <app-button
               [props]="{
                  colors: 'second',
                  size: 'clear',
                  fontWeight: 'thin',
                  class: classes.btn,
                  active: !filterStore.state.price,
               }"
               (click)="handleFilter({ by: 'price', value: undefined })">
               All
            </app-button>
            @for (p of currentCategory.pricesByCategory(); track $index) {
               <app-button
                  [props]="{
                     colors: 'second',
                     size: 'clear',
                     fontWeight: 'thin',
                     class: 'py-[2px] px-[10px] mt-2 ml-2',
                     active: filterState.price?.id === p.id,
                  }"
                  (click)="handleFilter({ by: 'price', value: p })">
                  {{ p.label }}
               </app-button>
            }
         }
      </div>
   `,
   imports: [ButtonComponent, SkeletonComponent],
})
export class FilterComponent {
   filterStore = inject(FilterStore);
   categoryStore = inject(CategoryStore);
   productStore = inject(ProductStore);

   currentCategory = inject(CurrentCategory);
   getProduct = inject(GetProductService);

   filterState = this.filterStore.state;

   newArray = newArray;
   categoryLoading = this.categoryStore.loadingSubj;

   showResult(params: Partial<FilterStore['state']>) {
      return this.getProduct.getProducts({ ...params, replace: true });
   }

   handleFilter = ({ by, value }: BrandFilter | PriceRangeFilter) => {
      let newFilters = { ...this.filterStore.state };

      if (by === 'brands') {
         if (!newFilters.brands.length && value === 'clear') return;
         let newBrands = [...newFilters.brands];

         if (value === 'clear') newBrands = [];
         else {
            const index = newBrands.indexOf(value);

            if (index === -1) newBrands.push(value);
            else newBrands.splice(index, 1);
         }

         newFilters['brands'] = newBrands;
      } else if (by === 'price') {
         if (!value && !newFilters.price) return;

         if (value?.id === newFilters.price?.id) newFilters['price'] = undefined;
         else newFilters['price'] = value;
      }

      this.filterStore.storingFilters(newFilters);
      this.showResult(newFilters);
   };

   classes = classes;
}
