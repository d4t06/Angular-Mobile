import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ButtonComponent } from '../../share/components/button/button.component';
import { FilterStore } from '@/app/stores/filter.store';
import { GetProductService } from '@/app/services/get-product.service';
import { ProductStore } from '@/app/stores/product.store';

@Component({
   standalone: true,
   selector: 'app-sort',
   template: `
      <div [class]="classes.container">
         <h5 class="sm:mr-[14px] translate-y-[1px] font-medium">Sort</h5>
         <div
            [class]="
               classes.btnContainer +
               (productStore.state.status === 'loading' ||
               productStore.state.status === 'more-loading'
                  ? ' disabled'
                  : '')
            ">
            <app-button
               [props]="{
                  class: classes.btn,
                  colors: 'second',
                  fontWeight: 'thin',
                  active: !filterStore.state.sort,
               }"
               (click)="handleSort()">
               Newest
            </app-button>

            @for (s of sortOpts; track $index) {
               <app-button
                  [props]="{
                     class: classes.btn,
                     colors: 'second',
                     fontWeight: 'thin',
                     active: filterStore.state.sort?.id === s.id,
                  }"
                  (click)="handleSort($index)">
                  {{ s.name }}
               </app-button>
            }
         </div>
      </div>
   `,
   imports: [ButtonComponent],
})
export class SortComponent {
   filterStore = inject(FilterStore);
   productStore = inject(ProductStore);

   activeRoute = inject(ActivatedRoute);
   getProduct = inject(GetProductService);

   routerParams: Record<string, string> = {};

   sortOpts: SortOption[] = [
      {
         id: 0,
         name: 'Low price',
         column: 'price',
         type: 'asc',
      },
      {
         id: 1,
         name: 'High price',
         column: 'price',
         type: 'desc',
      },
      {
         id: 2,
         name: 'Best seller',
         column: 'price',
         type: 'desc',
      },
   ];

   classes = {
      container: 'flex flex-col md:flex-row md:mt-3 md:items-center',
      btnContainer: 'flex flex-wrap sm:-mt-2 -mx-2 sm:mx-0',
      active: 'text-[#cd1818] font-[500]',
      btn: 'py-1 px-3 flex-shrink-0 mt-2 ml-2 text-[15px]',
   };

   ngOnInit() {
      this.activeRoute.params.subscribe(p => {
         return this.filterStore.storingFilters({ sort: undefined });
      });
   }

   handleSort(index?: number) {
      if (index === undefined) {
         if (!this.filterStore.state.sort) return;
         this.filterStore.storingFilters({ sort: undefined });
      } else {
         if (this.filterStore.state.sort?.id === this.sortOpts[index].id) return;
         this.filterStore.storingFilters({ sort: this.sortOpts[index] });
      }

      this.getProduct.getProducts({ replace: true });
   }
}
