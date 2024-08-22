import { GetProductService } from '@/app/services/get-product.service';
import { CategoryStore } from '@/app/stores/category.store';
import { Component, inject } from '@angular/core';
import { SkeletonComponent } from '../../share/components/skeleton/skeleton.component';
import { ProductStore } from '@/app/stores/product.store';
import { ProductItemComponent } from '../../components/product-item/product-item.component';
import { newArray } from '@/app/share/utils/appHelper';
import { CurrentCategory } from '@/app/services/current-cateogory.service';
import { SortComponent } from '../../components/sort/sort.component';
import { ButtonComponent } from '../../share/components/button/button.component';
import { ActivatedRoute, Router } from '@angular/router';
import { NoResultComponent } from '@/app/share/components/no-result/no-product.component';

@Component({
   selector: 'app-search',
   standalone: true,
   imports: [
      SkeletonComponent,
      NoResultComponent,
      ProductItemComponent,
      SortComponent,
      ButtonComponent,
   ],
   providers: [GetProductService],
   templateUrl: './search.component.html',
})
export class SearchComponent {
   categoryStore = inject(CategoryStore);
   productStore = inject(ProductStore);

   getProductService = inject(GetProductService);
   activeRoute = inject(ActivatedRoute);

   newArray = newArray;

   handleGetMore() {
      this.getProductService.getProducts({ page: this.productStore.state.page + 1 });
   }

   ngOnInit() {
      this.activeRoute.params.subscribe(() => {
         this.categoryStore.loadingSubj.subscribe(() => {
            this.getProductService.getProducts({ replace: true });
         });
      });
   }
}
