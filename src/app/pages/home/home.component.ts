import { Component, inject } from '@angular/core';
import { SliderComponent } from '../../components/slider/slider.component';
import { CategoryStore } from '@/app/stores/category.store';
import { SkeletonComponent } from '../../share/components/skeleton/skeleton.component';
import { ProductStore } from '@/app/stores/product.store';
import { GetProductService } from '@/app/services/get-product.service';
import { ActivatedRoute } from '@angular/router';
import { ProductItemComponent } from '../../components/product-item/product-item.component';
import { newArray } from '@/app/share/utils/appHelper';
import { CurrentCategory } from '@/app/services/current-cateogory.service';
import { NoResultComponent } from '@/app/share/components/no-result/no-product.component';

@Component({
   selector: 'app-home',
   standalone: true,
   imports: [
      SliderComponent,
      SkeletonComponent,
      NoResultComponent,
      ProductItemComponent,
   ],
   providers: [GetProductService, CurrentCategory],
   templateUrl: './home.component.html',
})
export class HomeComponent {
   productStore = inject(ProductStore);
   categoryStore = inject(CategoryStore);

   getProductService = inject(GetProductService);
   currentCategory = inject(CurrentCategory);
   activeRoute = inject(ActivatedRoute);

   sliderImages: SliderImage[] = [];
   newArray = newArray;

   ngOnInit() {
      this.categoryStore.loadingSubj.subscribe(() => {
         const homeCategory = this.categoryStore.categories.find(
            c => c.name_ascii === 'home'
         );
         if (homeCategory)
            this.sliderImages = homeCategory.category_slider.slider.slider_images;
      });

      this.activeRoute.params.subscribe(() => {
         this.getProductService.getProducts({ replace: true, size: 6 });
      });
   }
}
