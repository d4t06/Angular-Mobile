import { Component, Inject, effect, inject } from '@angular/core';
import { GetProductService } from '../../services/get-product.service';
import { ProductStore } from '../../stores/product.store';
import { CurrentCategory } from '../../services/current-cateogory.service';
import { ProductItemComponent } from '../../components/product-item/product-item.component';
import { AuthStore } from '../../stores/auth.store';
import { NoProductComponent } from '@/app/share/components/no-product/no-product.component';
import { ProductSkeletonComponent } from '@/app/share/components/skeleton/product-skeleton/product-skeleton.component';
import { SkeletonComponent } from '@/app/share/components/skeleton/skeleton.component';
import { newArray } from '@/app/share/utils/appHelper';
import { SortComponent } from '../../components/sort/sort.component';
import { ActivatedRoute } from '@angular/router';
import { FilterComponent } from '../../components/filter/filter.component';
import { CategoryStore } from '@/app/stores/category.store';
import { ButtonComponent } from '../../share/components/button/button.component';
import { Subscription, switchAll, switchMap } from 'rxjs';
import { PushFrameComponent } from "../../share/components/push-frame/push-frame.component";

@Component({
  selector: 'app-product',
  standalone: true,
  templateUrl: './product.component.html',
  providers: [GetProductService, CurrentCategory],
  imports: [
    ProductItemComponent,
    NoProductComponent,
    ProductSkeletonComponent,
    SkeletonComponent,
    SortComponent,
    FilterComponent,
    ButtonComponent,
    PushFrameComponent
],
})
export class ProductComponent {
  productStore = inject(ProductStore);
  authStore = inject(AuthStore);
  categoryStore = inject(CategoryStore);

  activeRouter = inject(ActivatedRoute);

  getProductService = inject(GetProductService);
  currentCategoryService = inject(CurrentCategory);

  productState = this.productStore.state;
  activeRouteSub: Subscription;

  newArray = newArray;

  ngOnInit() {
    // this.activeRouteSub = this.categoryStore.finishEmitter
    //   .pipe(switchMap(() => this.activeRouter.params))
    //   .subscribe(() => {
    //     console.log('get product', +this.currentCategoryService.routeParams['categoryId'],
    //     this.productState.category_id);
    //     this.getProductService.getProducts({ replace: true });
    //   });
    this.activeRouter.params.subscribe(() => {
      this.getProductService.getProducts({ replace: true });
    });
  }

  // ngOnDestroy() {
  //   this.activeRouteSub.unsubscribe();
  // }

  handleGetMore() {
    this.getProductService.getProducts({ page: this.productState.page + 1 });
  }
}
